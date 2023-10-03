import express, { Express } from 'express';
import AdminController from './AdminController';
import NasabahController from './NasabahController';
import PenimbangController from './PenimbangController';
import SuperAdminController from './SuperAdminController';

export function UserIndex (){
  const app: Express= express()

  // app.use(new AdminAuthController().router);
  // app.use(new NasabahAuthController().router);
  // app.use(new PenimbangAuthController().router);
  app.use(new AdminController().router);
  app.use(new NasabahController().router);
  app.use(new PenimbangController().router);
  app.use(new SuperAdminController().router);

  return app;
}

