import express, { Express } from 'express';
import JenisBarangController from './JenisBarangController';
import JenisSampahController from './JenisSampahController';

export function SampahIndex (){
  const app: Express= express()

  app.use(new JenisBarangController().router);
  app.use(new JenisSampahController().router);

  return app;
}

