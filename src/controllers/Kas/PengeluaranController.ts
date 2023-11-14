import { Request, Response } from "express";
import error, { success } from "../../helpers/response";
import Routers from "../RouterController";
import CatatPengeluaranSuperAdmins from "../../db/models/Catatpengeluaransuperadmin";
import { randomKodeNumberSampah } from "../../helpers/utils";
import DetailSampahSuperAdmins from "../../db/models/Detailsampahsuperadmin";
import SuperAdmins from "../../db/models/SuperAdmin";
import CatatPengeluaranAdmins from "../../db/models/Catatpengeluaranadmin";
import Admins from "../../db/models/Admin";
import DetailSampahBs from "../../db/models/DetailSampahBS";

class PengeluaranController extends Routers {
  constructor() {
    super();
    this.router.get("/kas/pengeluaran/induk", this.getpengeluaranSA.bind(this));
    this.router.post("/kas/pengeluaran/induk", this.pengeluaranSA.bind(this));
    this.router.get("/kas/pengeluaran/admin", this.getpengeluaranAdmin.bind(this));
    this.router.post("/kas/pengeluaran/admin", this.pengeluaranAdmin.bind(this));
  }

  async pengeluaranSA(req: Request, res: Response) {
    try {
      const { nama_pengeluaran, harga, catatan, kode_super_admin } = req.body;

      const kodeSuperAdmin = await SuperAdmins.findByPk(kode_super_admin);
      if (!kodeSuperAdmin)
        return error(
          { message: "Masukan input yang benar P" },
          req.originalUrl,
          402,
          res
        );
      const kodePengaluaran: string = randomKodeNumberSampah("KPI-");

      const rows = await CatatPengeluaranSuperAdmins.create({
        kode_pengeluaran: kodePengaluaran,
        nama_pengeluaran,
        harga,
        catatan,
        kode_super_admin,
      });

      const admin = await DetailSampahSuperAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });

      const _total = admin[0]["saldo"]! - harga;
      const _saldoPenjualan = admin[0]["saldo_penjualan"]! - harga;

      await DetailSampahSuperAdmins.update(
        {
          saldo: _total,
          saldo_penjualan: _saldoPenjualan
        },
        {
          where: {
            kode_super_admin: kodeSuperAdmin["kode_super_admin"],
          },
        }
      );

      success(rows, "Tambah Pengeluaran Super Admin", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getpengeluaranSA(req: Request, res: Response) {
    try {

        const {kode_super_admin} = req.body;

      const rows = await CatatPengeluaranSuperAdmins.findAll({
        where:{
            kode_super_admin
        }
      });

      success(rows, "Pengeluaran Super Admin", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async pengeluaranAdmin(req: Request, res: Response) {
    try {
      const { nama_pengeluaran, harga, catatan, kode_admin, kode_super_admin } =
        req.body;

      const kodeSuperAdmin = await SuperAdmins.findByPk(kode_super_admin);

      const kodeAdmin = await Admins.findByPk(kode_admin);

      if (!kodeAdmin)
        return error(
          { message: "Masukan input yang benar Kode Admin" },
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
      const kodePengaluaran: string = randomKodeNumberSampah("KPI-");

      const rows = await CatatPengeluaranAdmins.create({
        kode_pengeluaran: kodePengaluaran,
        nama_pengeluaran,
        harga,
        catatan,
        kode_admin,
        kode_super_admin,
      });

      const saldoAdmin = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const _total = saldoAdmin[0]["saldo"]! - harga;

      await DetailSampahBs.update(
        {
          saldo: _total,
        },
        {
          where: {
            kode_admin: kode_admin,
          },
        }
      );

      success(rows, "Tambah Pengeluaran  Admin", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getpengeluaranAdmin(req: Request, res: Response) {
    try {

        const {kode_admin} = req.body;


      const rows = await CatatPengeluaranAdmins.findAll({
        where:{
            kode_admin
        }
      });

      success(rows, "Pengeluaran Admin", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default PengeluaranController;
