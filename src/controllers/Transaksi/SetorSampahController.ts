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
    this.router.get(
      "/setor/sampah/hapus",
      this.hapusSetorSampahNasabah.bind(this)
    );
    this.router.get("/setor/getsampah", this.getSetorSampahAdmin.bind(this));
    this.router.get(
      "/setor/getsampah/induk",
      this.getSetorSampahAdminByInduk.bind(this)
    );
    this.router.get(
      "/setor/getsampah/admin",
      this.getSetorSampahNasabahByAdmin.bind(this)
    );
    this.router.get(
      "/setor/getsampah/nas",
      this.getSetorSampahNasabah.bind(this)
    );
    this.router.get(
      "/setor/total/nas",
      this.totalSetorSampahNasabah.bind(this)
    );
    this.router.get("/setor/sampah", this.getSetorSampahId.bind(this));
    this.router.get(
      "/setor/sampah/nasabah",
      this.getSetorSampahNasabahByInduk.bind(this)
    );
    this.router.post("/setor/sampah/susut", this.setorSampahAdmin.bind(this));
    this.router.get(
      "/setor/sampah/search",
      this.searchSetorSampahAdminByInduk.bind(this)
    );
  }

  async getSetorSampahId(req: Request, res: Response) {
    try {
      const { kode_penimbang } = req.body;
      const row = await SetorSampah.findAll({
        include: [
          {
            model: Nasabah,
          },
          {
            model: Penimbang,
          },
          {
            model: Admins,
          },
          {
            model: SuperAdmins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
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

  async getSetorSampahNasabahByAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const row = await SetorSampah.findAll({
        include: [
          {
            model: Nasabah,
          },
          {
            model: Penimbang,
          },
          {
            model: Admins,
          },
          {
            model: SuperAdmins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
        where: {
          kode_admin,
        },
      });
      success({ row }, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getSetorSampahNasabah(req: Request, res: Response) {
    try {
      const { kode_nasabah } = req.body;
      const row = await SetorSampah.findAll({
        include: [
          {
            model: Nasabah,
          },
          {
            model: Penimbang,
          },
          {
            model: Admins,
          },
          {
            model: SuperAdmins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
        where: {
          kode_nasabah,
        },
      });
      success({ row }, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSetorSampahNasabah(req: Request, res: Response) {
    try {
      const { kode_nasabah } = req.body;
      const row = await SetorSampah.sum("total",{
        where:{
          kode_nasabah
        }
      })
      success({ row }, "Total Setor Nasabah", res);
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
        kode_super_admin,
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
        kode_super_admin,
      });

      const bers = await SetorSampah.sum("berat", {
        where: { kode_nasabah: kodeNasabah!["kode_nasabah"] },
      });

      const beratsampahnasabah = await DetailSampahNasabahs.sum(
        "berat_sekarang",
        { where: { kode_nasabah: kodeNasabah!["kode_nasabah"] } }
      );
      const saldosampahnasabah = await DetailSampahNasabahs.sum(
        "saldo_sekarang",
        { where: { kode_nasabah: kodeNasabah!["kode_nasabah"] } }
      );

      const ceksaldo = berat * kodeBarang!["harga_pertama"]!;
      const saldos = await DetailSampahNasabahs.findAll({
        where: {
          kode_nasabah,
        },
      });

      const cekBeratAdmins = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const totals = saldos[0]["saldo"]! + total;

      const _beratAdmin = cekBeratAdmins[0]["berat"]! + berat;

      // validasi jika datetime sudah berubah hari maka , berat sekarang dan saldo sekarang akan reset menjadi 0

      const updateSampahNasabah = await DetailSampahNasabahs.update(
        {
          berat: bers,
          saldo: totals,
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
          berat: _beratAdmin,
          berat_sekarang: cekBeratAdmin,
          saldo_sekarang: cekSaldoAdmin,
        },
        {
          where: {
            kode_admin: kodeAdmins!["kode_admin"],
          },
        }
      );

      success({ rows }, "Succes Setor Sampah!", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async hapusSetorSampahNasabah(req: Request, res: Response) {
    try {
      const {
        kodeSetor,
        berat,
        saldo,
        kode_nasabah,
        kode_admin,
      } = req.body;

      const kodeNasabah = await DetailSampahNasabahs.findAll({
        where: { kode_nasabah },
      });
      const kodeBs = await DetailSampahBs.findAll({
        where: { kode_admin },
      });

      const row = SetorSampah.destroy({
        where: {
          kode_setor: kodeSetor,
        },
      });

      await DetailSampahNasabahs.update(
        {
          berat: kodeNasabah[0]["berat"]! - berat,
          saldo: kodeNasabah[0]["saldo"]! - saldo,
        },
        {
          where: {
            kode_nasabah,
          },
        }
      );

      await DetailSampahBs.update(
        {
          berat: kodeBs[0]["berat"]! - berat,
        },
        {
          where: {
            kode_admin,
          },
        }
      );

      success({ row }, "Succes Hapus Setor Sampah!", res);
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
        kode_admin,
        kode_super_admin,
      } = req.body;

      const kodeAdminBS = await Admins.findByPk(kode_admin);
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
        "KPA-",
        kodeAdminBS["rw"],
      );

      const harga = berat * kodeBarang!["harga_kedua"]!;

      const rows = await SusutSampahAdmins.create({
        kode_susut_sampah_bs: kodeSusutSampah,
        kode_sampah: kodeSampah!["kode_sampah"],
        kode_barang: kodeBarang!["kode_barang"],
        berat,
        harga,
        catatan,
        kode_admin_bs: kode_admin,
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

      const bs = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const admin = await DetailSampahSuperAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });

      const cekBerat = bs[0]["berat"]! - berat;
      const saldo = bs[0]["saldo"]! + harga;
      const _saldo = bs[0]["saldo_sekarang"]! + harga;

      const cekberatAdmin = admin[0]["berat"]! + berat;

      const updateSampahBS = await DetailSampahBs.update(
        {
          berat: cekBerat,
          saldo: saldo,
          saldo_sekarang: _saldo,
        },
        {
          where: {
            kode_admin: kodeAdminBS!["kode_admin"],
          },
        }
      );

      const updateSampahInduk = await DetailSampahSuperAdmins.update(
        {
          berat: cekberatAdmin,
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
        include:[
          {
            model: Admins,
          },
          {
            model: SuperAdmins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
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

  async getSetorSampahAdminByInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;

      const kodeAdminBS = await SuperAdmins.findByPk(kode_super_admin);

      if (!kodeAdminBS)
        return error(
          { message: "Masukan input yang bena N" },
          req.originalUrl,
          402,
          res
        );

      const rows = await SusutSampahAdmins.findAll({
        include:[
          {
            model: Admins,
          },
          {
            model: SuperAdmins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
        where: {
          kode_super_admin,
        },
      });

      success({ rows }, "Get Setor Sampah!", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getSetorSampahNasabahByInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;

      const kodeAdminBS = await SuperAdmins.findByPk(kode_super_admin);

      if (!kodeAdminBS)
        return error(
          { message: "Masukan input yang bena N" },
          req.originalUrl,
          402,
          res
        );

      const rows = await SetorSampah.findAll({
        include: [
          {
            model: Nasabah,
          },
          {
            model: Penimbang,
          },
          {
            model: Admins,
          },
          {
            model: SuperAdmins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
        where: {
          kode_super_admin,
        },
      });

      success({ rows }, "Get Setor Sampah!", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async searchSetorSampahAdminByInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin, nilai_yang_dicari } = req.body;

      const kodeAdminBS = await SuperAdmins.findByPk(kode_super_admin);

      if (!kodeAdminBS)
        return error(
          { message: "Masukan input yang bena N" },
          req.originalUrl,
          402,
          res
        );

      const rows = await SusutSampahAdmins.findAll({
        where: {
          kode_super_admin,
          [Op.or]: [
            {
              kode_susut_sampah_bs: {
                [Op.like]: "",
              },
            },
            {
              kode_susut_sampah_bs: {
                [Op.is]: null, // Ini akan mencocokkan semua baris di mana kode_susut_sampah_bs adalah NULL
              },
            },
          ],
        },
      });

      // await SusutSampahAdmins.sequelize?.query('SELECT * FROM ')

      success({ rows }, "Get Setor Sampah!", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default SetorSampahController;
