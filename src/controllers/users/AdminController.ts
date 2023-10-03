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

class AdminController extends Routers {
  verfyJwt = new VerifyAuth();

  constructor() {
    super();
    this.router.get(
      "/admin",
      this.getAllAdmin.bind(this)
    );
    this.router.get("/cek/sampah/admin", this.cekSampahAdmin.bind(this));
    this.router.get("/adminbyid", this.getAdminById.bind(this));
  }

  async getAllAdmin(req: Request, res: Response) {
    try {
      const row = await Admin.findAll();
      success({row}, "Datas Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getAdminById(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const row = await Admin.findAll({
        where: {
          kode_admin: kode_admin
        }
      })
      success({row}, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async cekSampahAdmin(req: Request, res: Response) {
    try {
      const { kodeAdmin } = req.body;

      const sm = await JenisSampahKerings.findAll({
        attributes:["kode_sampah"],
        raw:true,
      });

      const kodeSampahArray = sm.map((barang: any) => barang.kode_sampah);

      const sms = await JenisBarang.findAll({
        attributes:["kode_barang"],
        raw:true,
      });

      const kodeBarangArray = sms.map((barang: any) => barang.kode_barang);

      const rows = await SetorSampah.findAll({
        attributes: [
          'kode_sampah',
          'kode_barang',
          [sequelizeConnection.fn('SUM', sequelizeConnection.col('berat')), 'total_berat'],
        ],
        where: {
          kode_admin: kodeAdmin,
          kode_sampah: {
            [Op.in]: kodeSampahArray
          },
          kode_barang: {
            [Op.in]: kodeBarangArray,
          },
        },
        group: ['kode_sampah', 'kode_barang'], // Menambahkan GROUP BY berdasarkan kolom kode_sampah dan kode_barang
        raw: true, // Memberi tahu Sequelize untuk mengembalikan hasil tanpa model
      });

      success({rows}, "Datas Sampah Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default AdminController;
