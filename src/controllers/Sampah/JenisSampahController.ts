import { Request, Response } from "express";
import Routers from "../RouterController";
import { randomKodeNumberSampah } from "../../helpers/utils";

import error, { success } from "../../helpers/response";
import JenisSampahKering from "../../db/models/JenisSamapahKerings";
import JenisBarang from "../../db/models/JenisBarang";
import { where } from "sequelize";
import JenisSampahKerings from './../../db/models/JenisSamapahKerings';

class JenisSampahController extends Routers {
  constructor() {
    super();
    this.router.get("/product/sampah", this.getAllJenisSampah.bind(this));
    this.router.get("/product/ceksampah", this.getJenisSampah.bind(this));
    this.router.get("/product/sampah/admin", this.getAllJenisSampahByAdmin.bind(this));
    this.router.get("/product/sampah/admins", this.getJenisSampahByAdmin.bind(this));
    this.router.post("/product/sampah", this.tambahJenisSampah.bind(this));
    this.router.post("/product/sampahedit", this.editJenisSampah.bind(this));
  }

  async getAllJenisSampah(req: Request, res: Response) {
    try {
      const rows = await JenisSampahKering.findAll({
        include: [
          {
            model: JenisBarang,
          },
        ],
      });

      success(rows, "Get Jenis Sampah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getAllJenisSampahByAdmin(req: Request, res: Response) {
    const {kode_super_induk} = req.body;
    try {
      const rows = await JenisBarang.findAll({

        where:{
          kode_super_induk
        }
      });

      success(rows, "Get Jenis Sampah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getJenisSampahByAdmin(req: Request, res: Response) {
    const {kode_super_induk} = req.body;
    try {
      const rows = await JenisSampahKerings.findAll({
        include:[
          {
            model:JenisBarang
          }
        ],
        where:{
          kode_super_induk
        }
      });

      success(rows, "Get Jenis Sampah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async tambahJenisSampah(req: Request, res: Response) {
    try {
      const { jenis_sampah, kode_super_induk } = req.body;
      const kodeSampah: string = randomKodeNumberSampah("KS-");
      const rows = await JenisSampahKering.create({
        kode_super_induk,
        kode_sampah: kodeSampah,
        jenis_sampah,
      });
      success(rows, "Create Jenis Sampah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async editJenisSampah(req: Request, res: Response) {
    try {
      const { jenis_sampah, kode_sampah } = req.body;

      const rows = await JenisSampahKering.update(
        {
          jenis_sampah,
        },
        {
          where: {
            kode_sampah,
          },
        }
      );
      success(rows, "Update Jenis Sampah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getJenisSampah(req: Request, res: Response) {
    const {kode_sampah} = req.body;
    try {
      const rows = await JenisSampahKering.findAll({
        include: [
          {
            model: JenisBarang,
          },
        ],
        where:{
          kode_sampah
        }
      });

      success(rows, "Get Jenis Sampah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default JenisSampahController;
