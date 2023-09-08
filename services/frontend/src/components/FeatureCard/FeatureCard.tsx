import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './FeatureCard.module.css'
import Image from '../../../node_modules/next/image';
import { StaticImport } from '../../../node_modules/next/dist/shared/lib/get-img-props';

type Card = {
  icon: string | StaticImport;
  title:string | ReactNode;
  subtitle:string | ReactNode;
}

const FeatureCard = ({icon, title, subtitle}: Card ) => {
  return (
   <div className={styles.card}>
    <Image src={icon} alt="card-icon" width={50} height={50}/>
    <div>
    <h3>{title}</h3>
    <p className={styles.subtitle}>{subtitle}</p>
    </div>

   </div>
  );
};

export default FeatureCard;
