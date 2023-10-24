import express, { Express } from 'express';
import LaporanController from './LaporanController';

export function LaporanIndex (){
  const app: Express= express()

  app.use(new LaporanController().router);

  return app;
}

