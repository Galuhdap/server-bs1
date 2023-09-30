import { NextFunction, Response, Request } from "express";
import error, { success } from "../helpers/response";
import Jwt from "jsonwebtoken";
import env from "dotenv";
import Routers from "../controllers/RouterController";
import Users from "../db/models/Users";

env.config();

class VerifyAuth extends Routers {
  constructor() {
    super();
    this.router.get("/reftoken", this.refreshToken.bind(this));
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeaders = req.headers["authorization"];
      const token = authHeaders && authHeaders.split(" ")[1];
      if (token == null)
        return error({ msg: "Token Is Null" }, req.originalUrl, 401, res);
      Jwt.verify(token, process.env.ACCES_TOKEN as string, (err, decoded) => {
        if (err)
          return error({ msg: "Token Expaied" }, req.originalUrl, 401, res);
        req.body.kode_reg = decoded;
        next();
      });
    } catch (err:any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshTokenAdmin;
      if (!refreshToken)
        return error({ message: "Token not valid" }, req.originalUrl, 401, res);

      const user = await Users.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!user)
        return error({ message: "User Not Found" }, req.originalUrl, 401, res);

      Jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN as string,
        (err: any, decoded: any) => {
          if (err) return error({ msg: "" }, req.originalUrl, 403, res);
          const kodeReg = user?.kode_reg;
          const role = user?.role;
    
          const allDatas = {
            kodeReg,
            role,
          };

          const accesToken = Jwt.sign(
            allDatas,
            process.env.ACCES_TOKEN as string,
            {
              expiresIn: "15s",
            }
          );

          success(accesToken, "Create Token!", res);
        }
      );
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default VerifyAuth;
