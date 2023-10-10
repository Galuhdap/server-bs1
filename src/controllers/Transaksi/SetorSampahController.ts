import { Request, Response } from "express";
import Routers from "../RouterController";
import VerifyAuth from "../../middleware/VerifyAuth";
import randomKodeNumber from "../../helpers/utils";
import SetorSampah from "../../db/models/SetorSampahs";
import error, { success } from "../../helpers/response";
import DetailSampahNasabahs from "../../db/models/DetailSampahNasabah";
import JenisBarang from "../../db/models/JenisBarang";
import DetailSampahBs from "../../db/models/DetailSampahBS";
import Penimbang from "../../db/models/Penimbang";
import Nasabah from "../../db/models/Nasabah";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";
import Admins from "../../db/models/Admin";
import { Op } from "sequelize";
import sequelizeConnection from "../../config/dbConnect";
import SuperAdmins from "../../db/models/SuperAdmin";
import SusutSampahAdmins from "../../db/models/Susutsampahadmin";
import DetailSampahSuperAdmins from "../../db/models/Detailsampahsuperadmin";

class SetorSampahController extends Routers {
  constructor() {
    super();

    this.router.post("/setor/sampah", this.setorSampahNasabah.bind(this));
    this.router.get("/setor/getsampah", this.getSetorSampahAdmin.bind(this));
    this.router.get("/setor/sampah", this.getSetorSampahId.bind(this));
    this.router.post("/setor/sampah/susut", this.setorSampahAdmin.bind(this));
  }

  async getSetorSampahId(req: Request, res: Response) {
    try {
      const { kode_penimbang } = req.body;
      const row = await SetorSampah.findAll({
        where: {
          kode_penimbang,
        },
      });
      success({ row }, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async setorSampahNasabah(req: Request, res: Response) {
    try {
      const {
        kode_sampah,
        kode_barang,
        berat,
        catatan,
        kode_nasabah,
        kode_penimbang,
        kode_admin,
      } = req.body;

      const kodeNasabah = await Nasabah.findByPk(kode_nasabah);
      const kodePenimbang = await Penimbang.findByPk(kode_penimbang);
      const kodeAdmins = await Admins.findByPk(kode_admin);
      const kodeBarang = await JenisBarang.findByPk(kode_barang);
      const kodeSampah = await JenisSampahKerings.findByPk(kode_sampah);

      if (
        !kodeNasabah ||
        !kodePenimbang ||
        !kodeBarang ||
        !kodeSampah ||
        !kodeAdmins
      )
        return error(
          { message: "Masukan input yang bena N" },
          req.originalUrl,
          402,
          res
        );

      const kodeSetor: string = randomKodeNumber(
        "KS-",
        kodeNasabah["rw"],
        kodeNasabah["rt"]
      );

      const total = kodeBarang["harga_pertama"]! * berat;

      const rows = await SetorSampah.create({
        kode_setor: kodeSetor,
        kode_sampah: kodeSampah!["kode_sampah"],
        kode_barang: kodeBarang!["kode_barang"],
        berat,
        total,
        catatan,
        kode_nasabah: kodeNasabah!["kode_nasabah"],
        kode_penimbang: kodePenimbang!["kode_penimbang"],
        kode_admin: kodeAdmins!["kode_admin"],
      });

      const bers = await SetorSampah.sum("berat", {
        where: { kode_nasabah: kodeNasabah!["kode_nasabah"] },
      });
      const berss = await SetorSampah.sum("total", {
        where: { kode_nasabah: kodeNasabah!["kode_nasabah"] },
      });

      console.log(bers);

      const beratsampahnasabah = await DetailSampahNasabahs.sum(
        "berat_sekarang",
        { where: { kode_nasabah: kodeNasabah!["kode_nasabah"] } }
      );
      const saldosampahnasabah = await DetailSampahNasabahs.sum(
        "saldo_sekarang",
        { where: { kode_nasabah: kodeNasabah!["kode_nasabah"] } }
      );

      const ceksaldo = berat * kodeBarang!["harga_pertama"]!;

      //validasi jika datetime sudah berubah hari maka , berat sekarang dan saldo sekarang akan reset menjadi 0

      const updateSampahNasabah = await DetailSampahNasabahs.update(
        {
          berat: bers,
          saldo: berss,
          berat_sekarang: beratsampahnasabah + berat, //harusnya reset
          saldo_sekarang: saldosampahnasabah * ceksaldo, //harusnya reset
          kode_admin: kodeAdmins!["kode_admin"],
        },
        {
          where: {
            kode_nasabah: kode_nasabah,
          },
        }
      );

      const date = new Date().toISOString().slice(0, 10);

      const cekBeratAdmin = await DetailSampahNasabahs.sum("berat_sekarang", {
        where: {
          [Op.and]: [
            sequelizeConnection.literal(`DATE(createdAt) = '${date}'`),
            {
              kode_admin: kodeAdmins!["kode_admin"],
            },
          ],
        },
      });
      const cekSaldoAdmin = await DetailSampahNasabahs.sum("saldo_sekarang", {
        where: {
          [Op.and]: [
            sequelizeConnection.literal(`DATE(createdAt) = '${date}'`),
            {
              kode_admin: kodeAdmins!["kode_admin"],
            },
          ],
        },
      });

      const updateSampahBS = await DetailSampahBs.update(
        {
          berat: bers,
          berat_sekarang: cekBeratAdmin,
          saldo_sekarang: cekSaldoAdmin,
        },
        {
          where: {
            kode_admin: kodeAdmins!["kode_admin"],
          },
        }
      );

      success(
        { rows, updateSampahNasabah, updateSampahBS },
        "Succes Setor Sampah!",
        res
      );
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async setorSampahAdmin(req: Request, res: Response) {
    try {
      const {
        kode_sampah,
        kode_barang,
        berat,
        catatan,
        kode_bs,
        kode_super_admin,
      } = req.body;

      const kodeAdminBS = await Admins.findByPk(kode_bs);
      const kodeSuperAdmin = await SuperAdmins.findByPk(kode_super_admin);
      const kodeBarang = await JenisBarang.findByPk(kode_barang);
      const kodeSampah = await JenisSampahKerings.findByPk(kode_sampah);

      if (!kodeAdminBS)
        return error(
          { message: "Masukan input yang bena N" },
          req.originalUrl,
          402,
          res
        );
      if (!kodeSuperAdmin)
        return error(
          { message: "Masukan input yang benar P" },
          req.originalUrl,
          402,
          res
        );
      if (!kodeBarang)
        return error(
          { message: "Masukan input yang benar B " },
          req.originalUrl,
          402,
          res
        );
      if (!kodeSampah)
        return error(
          { message: "Masukan input yang benar s " },
          req.originalUrl,
          402,
          res
        );

      const kodeSusutSampah: string = randomKodeNumber(
        "KSSBS-",
        kodeAdminBS["rw"],
        kodeAdminBS["rt"]
      );

      const harga = berat * kodeBarang!["harga_kedua"]!;

      const rows = await SusutSampahAdmins.create({
        kode_susut_sampah_bs: kodeSusutSampah,
        kode_sampah: kodeSampah!["kode_sampah"],
        kode_barang: kodeBarang!["kode_barang"],
        berat,
        harga,
        catatan,
        kode_admin_bs: kode_bs,
        kode_super_admin: kode_super_admin,
      });

      const beratss = await SusutSampahAdmins.sum("berat", {
        where: { kode_admin_bs: kodeAdminBS!["kode_admin"] },
      });
      const cekHarga = await SusutSampahAdmins.sum("harga", {
        where: { kode_admin_bs: kodeAdminBS!["kode_admin"] },
      });
      const cek = await DetailSampahBs.sum("berat", {
        where: { kode_admin: kodeAdminBS!["kode_admin"] },
      });

      const berats = cek - berat;

      const updateSampahBS = await DetailSampahBs.update(
        {
          berat: berats,
          saldo: cekHarga,
        },
        {
          where: {
            kode_admin: kodeAdminBS!["kode_admin"],
          },
        }
      );

      const updateSampahInduk = await DetailSampahSuperAdmins.update(
        {
          berat: beratss,
        },
        {
          where: {
            kode_super_admin: kodeSuperAdmin["kode_super_admin"],
          },
        }
      );

      success(
        { rows, "Total Yang di peroleh": harga, updateSampahBS },
        "Succes Setor Sampah!",
        res
      );
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getSetorSampahAdmin(req: Request, res: Response) {
    try {
      const { kode_bs } = req.body;

      const kodeAdminBS = await Admins.findByPk(kode_bs);

      if (!kodeAdminBS)
        return error(
          { message: "Masukan input yang bena N" },
          req.originalUrl,
          402,
          res
        );

      const rows = await SusutSampahAdmins.findAll({
        where: {
          kode_admin_bs: kode_bs,
        },
      });

      success({ rows }, "Get Setor Sampah!", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default SetorSampahController;
