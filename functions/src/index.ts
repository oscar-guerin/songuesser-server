import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express, { Express } from 'express';
import { INestApplication } from '@nestjs/common';

const server: Express = express();

const createNestServer = async (expressInstance: express.Express) => {
  const app: INestApplication = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};


createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err: any) => console.error('Nest broken', err));

export const api: any = functions.https.onRequest(server);
