import express, { Express } from 'express';
import PengeluaranController from './PengeluaranController';


export function KasIndex (){
  const app: Express= express()

  app.use(new PengeluaranController().router);
//   app.use(new JenisSampahController().router);

  return app;
}

