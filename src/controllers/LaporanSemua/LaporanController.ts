import { Request, Response } from "express";
import Routers from "../RouterController";
import { randomKodeNumberSampah } from "../../helpers/utils";
import JenisBarang from "../../db/models/JenisBarang";
import error, { success } from "../../helpers/response";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";
import { where } from "sequelize";
import Nasabah from "../../db/models/Nasabah";
import Penimbang from "../../db/models/Penimbang";
import Admins from "../../db/models/Admin";
import SusutSampahInduks from "../../db/models/Susutsampahinduk";
import TarikSaldoAdmins from "../../db/models/Tariksaldoadmin";
import TarikSaldoNasabahs from "../../db/models/Tariksaldonasabah";
import SusutSampahAdmins from "../../db/models/Susutsampahadmin";
import SetorSampah from "../../db/models/SetorSampahs";
import { group } from "console";
import sequelizeConnection from "../../config/dbConnect";
import SuperAdmins from "../../db/models/SuperAdmin";

class LaporanController extends Routers {
  constructor() {
    super();
    this.router.get(
      "/laporan/pengguna/induk",
      this.totalPengunaInduk.bind(this)
    );
    this.router.get(
      "/laporan/nasabah/induk",
      this.totalNasabahInduk.bind(this)
    );
    this.router.get(
      "/laporan/penimbang/induk",
      this.totalPenimbangInduk.bind(this)
    );
    this.router.get("/laporan/admin/induk", this.totalAdminBSInduk.bind(this));
    this.router.get(
      "/laporan/saldomasuk/induk",
      this.totalSaldoMasukInduk.bind(this)
    );
    this.router.get(
      "/laporan/saldokeluar/induk",
      this.totalSaldoKeluarInduk.bind(this)
    );
    this.router.get(
      "/laporan/penjualansampah/induk",
      this.totalPenjualanSampahInduk.bind(this)
    );
    this.router.get(
      "/laporan/sampahmasuk/induk",
      this.totalSampahMasukInduk.bind(this)
    );
    this.router.get(
      "/laporan/sampahnasabah/induk",
      this.totalSampahNasabahInduk.bind(this)
    );
    this.router.get(
      "/laporan/sampahadmin/induk",
      this.totalSampahAdminInduk.bind(this)
    );
    this.router.get("/laporan/sampah/induk", this.totalSampahInduk.bind(this));
    this.router.get(
      "/laporan/totalsampah/induk",
      this.totalSemuaSampahInduk.bind(this)
    );
    this.router.get(
      "/laporan/totalsampah",
      this.totalSemuaSampahBarang.bind(this)
    );
    this.router.get(
      "/laporan/pengguna/admin",
      this.totalPengunaAdmin.bind(this)
    );
    this.router.get("/laporan/nasabah/admin", this.totalNasabahBS.bind(this));
    this.router.get(
      "/laporan/penimbang/admin",
      this.totalPenimbangBS.bind(this)
    );
    this.router.get(
      "/laporan/saldomasuk/admin",
      this.totalSaldoMasukAdmin.bind(this)
    );
    this.router.get(
      "/laporan/saldokeluar/admin",
      this.totalSaldoKeluarAdmin.bind(this)
    );
    this.router.get(
      "/laporan/test",
      this.test.bind(this)
    );
    this.router.get(
      "/laporan/penjualansampah/admin",
      this.totalPenjualanSampahAdmin.bind(this)
    );
    this.router.get(
      "/laporan/sampahmasuk/admin",
      this.totalSampahMasukAdmin.bind(this)
    );
    this.router.get(
      "/laporan/sampahnasabah/admin",
      this.totalSampahNasabahAdmin.bind(this)
    );
    this.router.get("/laporan/sampah/admin", this.totalSampahAdmin.bind(this));
    this.router.get(
      "/laporan/totalsampah/admin",
      this.totalSemuaSampahAdmin.bind(this)
    );
  }

  async totalPengunaInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows1 = await Nasabah.count({
        where: {
          kode_super_admin,
        },
      });
      const rows2 = await Penimbang.count({
        where: {
          kode_super_admin,
        },
      });
      const rows3 = await Admins.count({
        where: {
          kode_super_admin,
        },
      });

      var total = rows1 + rows2 + rows3;
      success(total, "Total Pengguna!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalPengunaAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows1 = await Nasabah.count({
        where: {
          kode_admin,
        },
      });
      const rows2 = await Penimbang.count({
        where: {
          kode_admin,
        },
      });

      var total = rows1 + rows2;
      success(total, "Total Pengguna!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalNasabahInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await Nasabah.count({
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Nasabah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalNasabahBS(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await Nasabah.count({
        where: {
          kode_admin,
        },
      });
      success(rows, "Total Nasabah!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async totalPenimbangInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await Penimbang.count({
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Penimbang!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalPenimbangBS(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await Penimbang.count({
        where: {
          kode_admin,
        },
      });
      success(rows, "Total Penimbang!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalAdminBSInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await Admins.count({
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total AdminBS!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSaldoMasukInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SusutSampahInduks.sum("total", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Saldo Masuk Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSaldoKeluarInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await TarikSaldoAdmins.sum("jumlah_penarikan", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Saldo Keluar Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSaldoMasukAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await TarikSaldoAdmins.sum("jumlah_penarikan", {
        where: {
          kode_admin,
        },
      });
      success(rows, "Total Saldo Masuk Admin!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSaldoKeluarAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await TarikSaldoNasabahs.sum("jumlah_penarikan", {
        where: {
          kode_admin,
        },
      });
      success(rows, "Total Saldo Keluar Admin!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalPenjualanSampahInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SusutSampahInduks.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Penjualan Sampah Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSampahMasukInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SusutSampahAdmins.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Sampah Masuk Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalPenjualanSampahAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await SusutSampahAdmins.sum("berat", {
        where: {
          kode_admin_bs: kode_admin,
        },
      });
      success(rows, "Total Penjualan Sampah Admin!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSampahMasukAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await SetorSampah.sum("berat", {
        where: {
          kode_admin,
        },
      });
      success(rows, "Total Sampah Masuk Admin!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSemuaSampahInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SetorSampah.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      const rows2 = await SusutSampahAdmins.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      const rows3 = await SusutSampahInduks.sum("berat", {
        where: {
          kode_super_admin,
        },
      });

      var totals = rows + rows2 + rows3;

      success(totals, "Total Sampah Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSemuaSampahAdmin(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SetorSampah.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      const rows2 = await SusutSampahAdmins.sum("berat", {
        where: {
          kode_super_admin,
        },
      });

      var totals = rows + rows2;

      success(totals, "Total Sampah Admmin!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSampahNasabahInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SetorSampah.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Sampah Masuk Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSampahAdminInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SusutSampahAdmins.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Sampah BS Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async totalSampahInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await SusutSampahInduks.sum("berat", {
        where: {
          kode_super_admin,
        },
      });
      success(rows, "Total Sampah  Induk!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSampahNasabahAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await SetorSampah.sum("berat", {
        where: {
          kode_admin,
        },
      });
      success(rows, "Total Sampah Masuk !", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSampahAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await SusutSampahAdmins.sum("berat", {
        where: {
          kode_admin_bs: kode_admin,
        },
      });
      success(rows, "Total Sampah BS !", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalSemuaSampahBarang(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const results = await SusutSampahAdmins.findAll({
        attributes: [
          "kode_admin_bs",
          "kode_sampah",
          "kode_barang",
          [
            sequelizeConnection.fn("SUM", sequelizeConnection.col("berat")),
            "total Barang",
          ],
        ],

        include: [
          {
            model: Admins,
          },
          {
            model: JenisSampahKerings,
          },
          {
            model: JenisBarang,
          },
        ],
        group: ["kode_admin_bs"],
        where: {
          kode_super_admin,
        },
      });
      success(results, "Total Semua Sampah BS !", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async test(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const results = await SusutSampahAdmins.findAll({
        // attributes: [
        //   "kode_admin_bs",
        //   // "kode_barang",
        //   [
        //     sequelizeConnection.fn("SUM", sequelizeConnection.col("berat")),
        //     "total Barang",
        //   ],
        // ],
        group: ["kode_admin_bs"],
        include: [
          {
            model: Admins,
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
      success(results, "Total Semua Sampah BS !", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default LaporanController;
