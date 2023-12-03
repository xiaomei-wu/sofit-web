#!/bin/bash
set -euxo pipefail

CA_DIR="ca"
CERTS_DIR="ca/certs"
PFX_PASS="testing"

if [ -f "$CERTS_DIR/ca_root.pem" ]; then
  echo "Root CA already exists."
else

  mkdir -p $CERTS_DIR

  # generate self-signed root ca
  cfssl genkey -initca $CA_DIR/ca_root.json | cfssljson -bare $CERTS_DIR/ca_root

  # generate intermediate ca
  cfssl genkey $CA_DIR/ca_basic.json | cfssljson -bare $CERTS_DIR/ca_basic
  cfssl sign -config $CA_DIR/config.json -profile ca -ca $CERTS_DIR/ca_root.pem -ca-key $CERTS_DIR/ca_root-key.pem $CERTS_DIR/ca_basic.csr | cfssljson -bare $CERTS_DIR/ca_basic

  # generate SSL Certificate
  cfssl genkey $CA_DIR/ssl.json | cfssljson -bare $CERTS_DIR/ssl
  cfssl sign -config $CA_DIR/config.json -profile server -ca $CERTS_DIR/ca_basic.pem -ca-key $CERTS_DIR/ca_basic-key.pem $CERTS_DIR/ssl.csr | cfssljson -bare $CERTS_DIR/ssl

fi

if [ -f "$CERTS_DIR/certificate_chain.pem" ]; then
  echo "Certificate chain already exists."
else
  # concatenate certificates into certificate chain to use in NODE_EXTRA_CA_CERTS environment variable
  cat $CERTS_DIR/ssl.pem $CERTS_DIR/ca_basic.pem $CERTS_DIR/ca_root.pem > $CERTS_DIR/certificate_chain.pem
fi

echo "Copying certs..."
# backend
cp $CERTS_DIR/ca_root.pem backend/certs/root.pem
cp $CERTS_DIR/ca_basic.pem backend/certs/basic.pem
cp $CERTS_DIR/ssl-key.pem backend/certs/ssl-key.pem
cp $CERTS_DIR/certificate_chain.pem backend/certs/certificate_chain.pem
chmod 644 backend/certs/*.pem

# frontend
cp $CERTS_DIR/ca_root.pem frontend/public/certs/root.pem
cp $CERTS_DIR/ca_basic.pem frontend/public/certs/basic.pem
chmod 644 frontend/public/certs/*.pem