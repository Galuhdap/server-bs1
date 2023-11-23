import { Request, Response } from "express";
import Routers from "../RouterController";
import VerifyAuth from "../../middleware/VerifyAuth";
import randomKodeNumber, { randomKodeNumberSampah } from "../../helpers/utils";
import SetorSampah from "../../db/models/SetorSampahs";
import error, { success } from "../../helpers/response";
import DetailSampahNasabahs from "../../db/models/DetailSampahNasabah";
import JenisBarang from "../../db/models/JenisBarang";
import DetailSampahBs from "../../db/models/DetailSampahBS";
import Penimbang from "../../db/models/Penimbang";
import Nasabah from "../../db/models/Nasabah";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";
import TarikSaldoNasabahs from "../../db/models/Tariksaldonasabah";
import Biayaadmins from "../../db/models/Biayaadmin";
import Tombol from "../../db/models/Tombol";
import DetailSampahSuperAdmins from "../../db/models/Detailsampahsuperadmin";
import TarikSaldoAdmins from "../../db/models/Tariksaldoadmin";
import Admins from "../../db/models/Admin";
import SuperAdmins from "../../db/models/SuperAdmin";
import TarikKeuntunganAdmins from "../../db/models/Tarikkeuntunganadmin";

class TransaksiTarikSaldoController extends Routers {
  constructor() {
    super();
    this.router.get("/tombol/admin", this.cekStatusTombolAdmin.bind(this));
    this.router.post("/tombol/admin", this.selectTombolAdmin.bind(this));
    this.router.post("/service/saldo", this.tarikSaldo.bind(this));
    this.router.post("/service/saldo/admin", this.tarikSaldoAdmin.bind(this));
    this.router.delete("/service/saldo/admin", this.hapusTarikSaldoAdmin.bind(this));
    this.router.post(
      "/service/validasi",
      this.validasiPenarikanSaldo.bind(this)
    );
    this.router.get("/service/cek", this.riwayatPenarikanSaldo.bind(this));
    this.router.get(
      "/service/cek/admin",
      this.cekPenarikanSaldoAdmin.bind(this)
    );
    this.router.get(
      "/service/cek/induk",
      this.cekPenarikanSaldoInduk.bind(this)
    );
    this.router.get(
      "/service/cekinduk",
      this.riwayatPenarikanSaldoAdminByInduk.bind(this)
    );
    this.router.get(
      "/service/ceknasabah",
      this.riwayatPenarikanSaldoNasabah.bind(this)
    );

    this.router.get(
      "/service/totalnasabah",
      this.totalPenarikanSaldoNasabah.bind(this)
    );
    this.router.get(
      "/service/cekadmin",
      this.riwayatPenarikanSaldoAdmin.bind(this)
    );
    this.router.post("/service/biayaadmin", this.biayaAdmin.bind(this));
    this.router.get("/service/biayaadmin", this.getBiayaAdmin.bind(this));
    this.router.post(
      "/service/up/biayaadmin",
      this.updateBiayaAdmin.bind(this)
    );
    this.router.post(
      "/service/keuntungan",
      this.tarikKeuntunganAdmin.bind(this)
    );
    this.router.delete(
      "/service/keuntungan",
      this.deleteTarikKeuntunganAdmin.bind(this)
    );
    this.router.get(
      "/service/keuntungan/admin",
      this.getTarikKeuntunganAdmin.bind(this)
    );
    this.router.get(
      "/service/keuntungan/induk",
      this.getTarikKeuntunganSuper.bind(this)
    );
  }

  async tarikSaldo(req: Request, res: Response) {
    try {
      const {
        kode_invoice,
        jumlah_penarikan,
        pin,
        kode_nasabah,
        kode_admin,
        kode_super_admin,
      } = req.body;

      const kodeNasabah = await Nasabah.findByPk(kode_nasabah);
      const saldoNasabah = await DetailSampahNasabahs.findAll({
        where: {
          kode_nasabah: kode_nasabah,
        },
      });
      const saldoBS = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });
      const biayaAdmin = await Biayaadmins.findAll();

      if (!kodeNasabah || !saldoNasabah || !biayaAdmin)
        return error(
          { message: "Masukan input yang benar" },
          req.originalUrl,
          402,
          res
        );

      const kodeTariksaldo: string = randomKodeNumberSampah("KTS-");

      if (pin === kodeNasabah!["pin"]) {
        let status = false;

        const saldoAkhir =
          saldoNasabah[0]["saldo"]! -
          jumlah_penarikan -
          biayaAdmin[0]["harga"]!;

        const saldoAkhirBs = saldoBS[0]["saldo"]! - saldoAkhir;

        await TarikSaldoNasabahs.create({
          kode_biayaAdmin: biayaAdmin[0]["kode_biayaAdmin"]!,
          kode_tariksaldo: kodeTariksaldo,
          nomor_invoice: kode_invoice,
          jumlah_penarikan,
          saldo_akhir: saldoAkhir,
          status,
          kode_nasabah: kodeNasabah["kode_nasabah"],
          kode_admin: kode_admin,
          kode_super_admin,
        });
      } else {
        error({ message: "Pin Tidak Cocok" }, req.originalUrl, 402, res);
      }

      success({}, "Succes Tarik Saldo!", res);
    } catch (err: any) {
      console.log(err.message);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async tarikSaldoAdmin(req: Request, res: Response) {
    try {
      const { kode_invoice, jumlah_penarikan, kode_super_admin, kode_admin } =
        req.body;

      const kodeAdmin = await Admins.findByPk(kode_admin);

      if (!kodeAdmin)
        return error(
          { message: "Masukan input yang benar Kode Admin" },
          req.originalUrl,
          402,
          res
        );

      let status = false;
      const kodeTariksaldo: string = randomKodeNumberSampah("KTS-");
      const saldoAdmin = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const saldoSuperAdmin = await DetailSampahSuperAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });
      const biayaAdmin = await Biayaadmins.findAll();

      const saldoAkhir =
        saldoAdmin[0]["saldo_sekarang"]! -
        jumlah_penarikan -
        biayaAdmin[0]["harga"]!;

      const saldoCash = saldoAdmin[0]["saldo_cash"]! + jumlah_penarikan;

      const saldoAkhirSuperAdmin =
        saldoSuperAdmin[0]["saldo_penjualan"]! -
        jumlah_penarikan -
        biayaAdmin[0]["harga"]!;

      const keuntungan = saldoSuperAdmin[0]["saldo"]! + biayaAdmin[0]["harga"]!;

      await TarikSaldoAdmins.create({
        kode_biayaAdmin: biayaAdmin[0]["kode_biayaAdmin"]!,
        kode_tariksaldo: kodeTariksaldo,
        nomor_invoice: kode_invoice,
        jumlah_penarikan,
        saldo_akhir: saldoAkhir,
        status,
        kode_super_admin,
        kode_admin: kode_admin,
      });

      await DetailSampahBs.update(
        {
          saldo_sekarang: saldoAkhir,
          saldo_cash: saldoCash,
        },
        {
          where: {
            kode_admin: kode_admin,
          },
        }
      );

      await DetailSampahSuperAdmins.update(
        {
          saldo: keuntungan,
          saldo_penjualan: saldoAkhirSuperAdmin,
        },
        {
          where: {
            kode_super_admin,
          },
        }
      );

      success({}, "Succes Tarik Saldo Admin!", res);
    } catch (err: any) {
      console.log(err.message);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async hapusTarikSaldoAdmin(req: Request, res: Response) {
    try {
      const { kode_tariksaldo, jumlah_penarikan, kode_super_admin, kode_admin } =
        req.body;

      const kodeAdmin = await Admins.findByPk(kode_admin);

      if (!kodeAdmin)
        return error(
          { message: "Masukan input yang benar Kode Admin" },
          req.originalUrl,
          402,
          res
        );

      const saldoAdmin = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const saldoSuperAdmin = await DetailSampahSuperAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });
      const biayaAdmin = await Biayaadmins.findAll();

      const saldoAkhir =
        saldoAdmin[0]["saldo_sekarang"]! +
        jumlah_penarikan +
        biayaAdmin[0]["harga"]!;

      const saldoCash = saldoAdmin[0]["saldo_cash"]! - jumlah_penarikan;

      const saldoAkhirSuperAdmin =
        saldoSuperAdmin[0]["saldo_penjualan"]! +
        jumlah_penarikan 

      const keuntungan = saldoSuperAdmin[0]["saldo"]! - biayaAdmin[0]["harga"]!;

      await TarikSaldoAdmins.destroy({
        where:{
          kode_tariksaldo
        }
      })

      await DetailSampahBs.update(
        {
          saldo_sekarang: saldoAkhir,
          saldo_cash: saldoCash,
        },
        {
          where: {
            kode_admin: kode_admin,
          },
        }
      );

      await DetailSampahSuperAdmins.update(
        {
          saldo: keuntungan,
          saldo_penjualan: saldoAkhirSuperAdmin,
        },
        {
          where: {
            kode_super_admin,
          },
        }
      );

      success({}, "Succes Tarik Saldo Admin!", res);
    } catch (err: any) {
      console.log(err.message);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async validasiPenarikanSaldo(req: Request, res: Response) {
    try {
      const { jumlah_penarikan, nomor_invoice, kode_admin, kode_nasabah } =
        req.body;
      const saldoNasabah = await DetailSampahNasabahs.findAll({
        where: {
          kode_nasabah: kode_nasabah,
        },
      });
      const saldoBS = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });
      const biayaAdmin = await Biayaadmins.findAll();

      const saldoAkhir =
        saldoNasabah[0]["saldo"]! - jumlah_penarikan - biayaAdmin[0]["harga"]!;

      const saldoAkhirBs =
        saldoBS[0]["saldo"]! - jumlah_penarikan - biayaAdmin[0]["harga"]!;
      const saldoCash = saldoBS[0]["saldo_cash"]! - jumlah_penarikan;

      const keuntungan =
        saldoBS[0]["saldo_sekarang"]! + biayaAdmin[0]["harga"]!;

      const rows = await TarikSaldoNasabahs.update(
        {
          status: true,
        },
        {
          where: {
            nomor_invoice,
          },
        }
      );
      await DetailSampahNasabahs.update(
        {
          saldo: saldoAkhir,
        },
        {
          where: {
            kode_nasabah: kode_nasabah,
          },
        }
      );

      await DetailSampahBs.update(
        {
          saldo: keuntungan,
          saldo_cash: saldoCash,
        },
        {
          where: {
            kode_admin: kode_admin,
          },
        }
      );
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async riwayatPenarikanSaldo(req: Request, res: Response) {
    try {
      const rows = await TarikSaldoNasabahs.findAll({
        attributes: [
          "nomor_invoice",
          "kode_nasabah",
          "kode_admin",
          "jumlah_penarikan",
          "status",
          "createdAt",
        ],
        include: [
          { model: Biayaadmins },
          { model: Admins },
          { model: Nasabah },
        ],
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async riwayatPenarikanSaldoNasabah(req: Request, res: Response) {
    try {
      const { kode_nasabah } = req.body;
      const rows = await TarikSaldoNasabahs.findAll({
        attributes: [
          "nomor_invoice",
          "kode_nasabah",
          "jumlah_penarikan",
          "status",
          "createdAt",
        ],
        include: [
          { model: Biayaadmins },
          { model: Admins },
          { model: Nasabah },
        ],
        where: {
          kode_nasabah,
        },
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async totalPenarikanSaldoNasabah(req: Request, res: Response) {
    try {
      const { kode_nasabah } = req.body;

      const rows = await TarikSaldoNasabahs.sum("jumlah_penarikan", {
        where: {
          kode_nasabah,
        },
      });
      success({ rows }, "Total Penarikan saldo By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async riwayatPenarikanSaldoAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await TarikSaldoNasabahs.findAll({
        attributes: [
          "nomor_invoice",
          "kode_nasabah",
          "kode_admin",
          "jumlah_penarikan",
          "status",
          "createdAt",
        ],
        include: [
          { model: Biayaadmins },
          { model: Admins },
          { model: Nasabah },
        ],
        where: {
          kode_admin,
        },
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async riwayatPenarikanSaldoAdminByInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await TarikSaldoNasabahs.findAll({
        attributes: [
          "nomor_invoice",
          "kode_nasabah",
          "kode_admin",
          "jumlah_penarikan",
          "status",
          "createdAt",
        ],
        include: [
          { model: Biayaadmins },
          { model: Admins },
          { model: Nasabah },
        ],
        where: {
          kode_super_admin,
        },
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async cekPenarikanSaldoAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;
      const rows = await TarikSaldoAdmins.findAll({
        attributes: [
          "nomor_invoice",
          "kode_super_admin",
          "kode_admin",
          "jumlah_penarikan",
          "status",
          "createdAt",
        ],
        include: [
          { model: Biayaadmins },
          { model: Admins },
          { model: SuperAdmins },
        ],
        where: {
          kode_admin,
        },
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async cekPenarikanSaldoInduk(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const rows = await TarikSaldoAdmins.findAll({
        attributes: [
          "nomor_invoice",
          "kode_super_admin",
          "kode_admin",
          "jumlah_penarikan",
          "status",
          "createdAt",
        ],
        include: [
          { model: Biayaadmins },
          { model: Admins },
          { model: SuperAdmins },
        ],
        where: {
          kode_super_admin,
        },
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async biayaAdmin(req: Request, res: Response) {
    const { harga, kode_super_induk } = req.body;

    const kodeAdmin = await SuperAdmins.findByPk(kode_super_induk);

    if (!kodeAdmin)
      return error({ message: "NOT FOUND" }, req.originalUrl, 402, res);

    const kodeBiayaAdmin: string = randomKodeNumberSampah("KBA-");
    const kodeBiaya: string = randomKodeNumberSampah("KA-");
    try {
      const rows = await Biayaadmins.create({
        kode_biayaAdmin: kodeBiayaAdmin,
        kode_super_induk,
        harga,
      });
      success({ rows }, "Create Biaya Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getBiayaAdmin(req: Request, res: Response) {
    const { kode_super_induk } = req.body;

    try {
      const rows = await Biayaadmins.findAll({
        where: {
          kode_super_induk,
        },
      });
      success({ rows }, "get Biaya Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async updateBiayaAdmin(req: Request, res: Response) {
    const { harga, kode_biayaAdmin } = req.body;
    try {
      const rows = await Biayaadmins.update(
        {
          harga,
        },
        {
          where: {
            kode_biayaAdmin,
          },
        }
      );
      success({ rows }, "Create Biaya Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async selectTombolAdmin(req: Request, res: Response) {
    const { tombol1, kode_admin } = req.body;
    try {
      const rows = await Tombol.update(
        {
          tombol1,
        },
        {
          where: {
            kode_admin,
          },
        }
      );
      success({ rows }, "Tombol Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  
  async cekStatusTombolAdmin(req: Request, res: Response) {
    const { kode_admin } = req.body;
    try {
      const rows = await Tombol.findAll({
        where: {
          kode_admin,
        },
      });
      success({ rows }, "Tombol Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async tarikKeuntunganAdmin(req: Request, res: Response) {
    try {
      const { nomor_invoice, jumlah_penarikan, kode_super_admin, kode_admin } =
        req.body;

      const kodeAdmin = await Admins.findByPk(kode_admin);

      if (!kodeAdmin)
        return error(
          { message: "Masukan input yang benar Kode Admin" },
          req.originalUrl,
          402,
          res
        );

      const kodeTariksaldo: string = randomKodeNumberSampah("TKA-");

      const saldoAdmin = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const saldoSuperAdmin = await DetailSampahSuperAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });

      await TarikKeuntunganAdmins.create({
        kode_tariksaldo: kodeTariksaldo,
        nomor_invoice,
        jumlah_penarikan,
        kode_super_admin,
        kode_admin: kode_admin,
      });

      const saldoAkhirSuperAdmin =
        saldoSuperAdmin[0]["saldo_penjualan"]! - jumlah_penarikan;

      const saldoKeuntunganAdmin = saldoAdmin[0]["saldo"]! - jumlah_penarikan;

      const saldoCash = saldoAdmin[0]["keuntungan_cash"]! + jumlah_penarikan;

      await DetailSampahBs.update(
        {
          saldo: saldoKeuntunganAdmin,
          keuntungan_cash: saldoCash,
        },
        {
          where: {
            kode_admin: kode_admin,
          },
        }
      );

      await DetailSampahSuperAdmins.update(
        {
          saldo_penjualan: saldoAkhirSuperAdmin,
        },
        {
          where: {
            kode_super_admin,
          },
        }
      );
      success({}, "Succes Tarik Saldo Keuntungan Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async deleteTarikKeuntunganAdmin(req: Request, res: Response) {
    try {
      const { kode_tariksaldo, jumlah_penarikan, kode_super_admin, kode_admin } =
        req.body;

      const kodeAdmin = await Admins.findByPk(kode_admin);

      if (!kodeAdmin)
        return error(
          { message: "Masukan input yang benar Kode Admin" },
          req.originalUrl,
          402,
          res
        );

      const saldoAdmin = await DetailSampahBs.findAll({
        where: {
          kode_admin,
        },
      });

      const saldoSuperAdmin = await DetailSampahSuperAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });

      await TarikKeuntunganAdmins.destroy({
        where:{
          kode_tariksaldo
        }
      })

      const saldoAkhirSuperAdmin =
        saldoSuperAdmin[0]["saldo_penjualan"]! + jumlah_penarikan;

      const saldoKeuntunganAdmin = saldoAdmin[0]["saldo"]! + jumlah_penarikan;

      const saldoCash = saldoAdmin[0]["keuntungan_cash"]! - jumlah_penarikan;

      await DetailSampahBs.update(
        {
          saldo: saldoKeuntunganAdmin,
          keuntungan_cash: saldoCash,
        },
        {
          where: {
            kode_admin: kode_admin,
          },
        }
      );

      await DetailSampahSuperAdmins.update(
        {
          saldo_penjualan: saldoAkhirSuperAdmin,
        },
        {
          where: {
            kode_super_admin,
          },
        }
      );
      success({}, "Succes DELETE Tarik Saldo Keuntungan Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getTarikKeuntunganAdmin(req: Request, res: Response) {
    try {
      const { kode_admin } = req.body;

      const kodeAdmin = await Admins.findByPk(kode_admin);

      if (!kodeAdmin)
        return error(
          { message: "Masukan input yang benar Kode Admin" },
          req.originalUrl,
          402,
          res
        );

      const rows = await TarikKeuntunganAdmins.findAll({
        where: {
          kode_admin,
        },
      });

      success({ rows }, "Tarik Keuntungan Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getTarikKeuntunganSuper(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;

      const rows = await TarikKeuntunganAdmins.findAll({
        where: {
          kode_super_admin,
        },
      });

      success({ rows }, "Tarik Keuntungan Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default TransaksiTarikSaldoController;
