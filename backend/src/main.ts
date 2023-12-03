import { NestFactory } from '@nestjs/core';
import * as spdy from 'spdy';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ServerOptions } from 'spdy';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const spdyOpts: ServerOptions = {
    key: fs.readFileSync(path.join(__dirname, '../certs/ssl-key.pem')),
    cert: fs.readFileSync(
      path.join(__dirname, '../certs/certificate_chain.pem'),
    ),
  };

  const server = spdy.createServer(
    spdyOpts,
    app.getHttpAdapter().getInstance(),
  );

  server.on('error', (error) => {
    console.error('Server error:', error);
  });

  const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Sofit')
    .setDescription('The Sofit API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
