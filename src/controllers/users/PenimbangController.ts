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
import DetailSampahBs from "../../db/models/DetailSampahBS";

class PenimbangController extends Routers {
  verfyJwt = new VerifyAuth();

  constructor() {
    super();
    this.router.get(
      "/allpenimbang",
      this.allPenimbang.bind(this)
    );
    this.router.get(
      "/penimbang",
      this.getAllPenimbang.bind(this)
    );
    this.router.get("/penimbangbyid", this.getPenimbangById.bind(this));
  }

  async allPenimbang(req: Request, res: Response) {
    try {
      const {kode_super_admin} = req.body;
      const row = await Penimbang.findAll({
        where:{
          kode_super_admin
        }
      });
      success({row}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async getAllPenimbang(req: Request, res: Response) {
    try {
      const {kode_admin} = req.body;
      const row = await Penimbang.findAll({
        where: {
          kode_admin
        }
      });
      const sampah = await DetailSampahBs.findAll({
        where: {
          kode_admin
        }
      });
      success({row, sampah}, "Datas Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getPenimbangById(req: Request, res: Response) {
    try {
      const { kode_user } = req.body;
      const row = await Penimbang.findAll({
        where: {
          kode_user
        }
      });
      console.log(row[0]['kode_admin']);
      const sampah = await DetailSampahBs.findAll({
        where: {
          kode_admin: row[0]['kode_admin']
        }
      });
      success({row, sampah}, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

}

export default PenimbangController;
