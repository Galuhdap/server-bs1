import { Request, Response } from "express";
import Routers from "../RouterController";

import VerifyAuth from "../../middleware/VerifyAuth";
import Admin from "../../db/models/Admin";
import SetorSampah from "../../db/models/SetorSampahs";
import error, { success } from "../../helpers/response";
import sequelizeConnection from "../../config/dbConnect";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";
import JenisBarang from "../../db/models/JenisBarang";
import { Op } from "sequelize";
import TarikSaldoNasabahs from "../../db/models/Tariksaldonasabah";
import Biayaadmins from "../../db/models/Biayaadmin";
import Penimbang from "../../db/models/Penimbang";

class PenimbangController extends Routers {
  verfyJwt = new VerifyAuth();

  constructor() {
    super();
    this.router.get(
      "/penimbang",
      this.getAllPenimbang.bind(this)
    );
    this.router.get("/penimbangbyid", this.getPenimbangById.bind(this));
  }

  async getAllPenimbang(req: Request, res: Response) {
    try {
      const row = await Penimbang.findAll();
      success({row}, "Datas Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getPenimbangById(req: Request, res: Response) {
    try {
      const { kode_penimbang } = req.body;
      const row = await Penimbang.findAll({
        where: {
          kode_penimbang
        }
      })
      success({row}, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

}

export default PenimbangController;
