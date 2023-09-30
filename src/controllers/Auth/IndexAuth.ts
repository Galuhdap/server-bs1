import AdminAuthController from "./AuthController";

import express, { Express } from 'express';

export function AuthIndex (){
  const app: Express= express()

  // app.use(new AdminAuthController().router);
  // app.use(new NasabahAuthController().router);
  // app.use(new PenimbangAuthController().router);
  app.use(new AdminAuthController().router);

  return app;
}

