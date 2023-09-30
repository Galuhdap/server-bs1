import { Request, Response } from "express";
import bcrypt from "bcrypt";
import error, { success } from "../../helpers/response";
import randomKodeNumber from "../../helpers/utils";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  jwtaccesToken,
  jwtrefreshToken,
  jwtAccestokenExp,
  jwtRefreshtokenExp,
} from "../../config/env";

dotenv.config();

export const matchPassword = async (
  password: string,
  payload: any,
  res: Response,
  req: Request
) => {
  const match= await bcrypt.compare(password, payload);
  if (!match)
    return error({ message: "Password Tidak Sama" }, req.originalUrl, 100, res);
   
    return match;
};

  

export const accesTokenJwt = (payload: any) => {
  const accesToken = Jwt.sign(payload, jwtaccesToken as string, {
    expiresIn: jwtAccestokenExp,
  });

  return accesToken;
};

export const refreshTokenJwt = (payload: any) => {
  const refreshToken = Jwt.sign(payload, jwtrefreshToken as string, {
    expiresIn: jwtRefreshtokenExp,
  });
  return refreshToken;
};

export const secretJwt = async (password:any) => {
    const salt: any = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
}
