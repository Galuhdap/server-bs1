import express, { Express } from 'express';
import SetorSampahController from './SetorSampahController';
import TransaksiTarikSaldoController from './TarikSaldoController';
import PenjualanSampahController from './PenjualanSampahController';

export function TransaksiIndex (){
  const app: Express= express()

  app.use(new SetorSampahController().router);
  app.use(new TransaksiTarikSaldoController().router);
  app.use(new PenjualanSampahController().router);

  return app;
}

