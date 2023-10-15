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

class TransaksiTarikSaldoController extends Routers {
  constructor() {
    super();
    this.router.post("/service/saldo", this.tarikSaldo.bind(this));
    this.router.post("/service/validasi", this.validasiPenarikanSaldo.bind(this));
    this.router.get("/service/cek", this.riwayatPenarikanSaldo.bind(this));
    this.router.get(
      "/service/ceknasabah",
      this.riwayatPenarikanSaldoNasabah.bind(this)
    );
    this.router.get(
      "/service/cekadmin",
      this.riwayatPenarikanSaldoAdmin.bind(this)
    );
    this.router.post("/service/biayaadmin", this.biayaAdmin.bind(this));
    this.router.get("/service/biayaadmin", this.getBiayaAdmin.bind(this));
    this.router.post("/service/up/biayaadmin", this.updateBiayaAdmin.bind(this));
  }

  async tarikSaldo(req: Request, res: Response) {
    try {
      const { jumlah_penarikan, pin, kode_nasabah, kode_admin } = req.body;

      const kodeNasabah = await Nasabah.findByPk(kode_nasabah);
      const saldoNasabah = await DetailSampahNasabahs.findAll({
        where: {
          kode_nasabah: kode_nasabah,
        },
      });
      const biayaAdmin = await Biayaadmins.findAll();
      console.log("Ini Biaya Admin :" + biayaAdmin);
      if (!kodeNasabah || !saldoNasabah || !biayaAdmin)
        return error(
          { message: "Masukan input yang benar" },
          req.originalUrl,
          402,
          res
        );

      const kodeTariksaldo: string = randomKodeNumberSampah("KTS-");
      const kodeInvoice: string = randomKodeNumberSampah("KNI-");

      if (pin === kodeNasabah!["pin"]) {
        let status = false;

        if (
          saldoNasabah[0]["saldo"]! > 10000 &&
          jumlah_penarikan <= saldoNasabah[0]["saldo"]!
        ) {
          const saldoAkhir =
            saldoNasabah[0]["saldo"]! -
            jumlah_penarikan -
            biayaAdmin[0]["harga"]!;

          await TarikSaldoNasabahs.create({
            kode_biaya: biayaAdmin[0]["kode_biayaAdmin"]!,
            kode_tariksaldo: kodeTariksaldo,
            nomor_invoice: kodeInvoice,
            jumlah_penarikan,
            saldo_akhir: saldoAkhir,
            status,
            kode_nasabah: kodeNasabah["kode_nasabah"],
            kode_admin: kode_admin,
          });

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
              saldo: saldoAkhir,
            },
            {
              where: {
                kode_admin: kode_admin,
              },
            }
          );
        } else {
          error(
            { message: "Saldo Tidak Mencukupi" },
            req.originalUrl,
            402,
            res
          );
        }
      } else {
        error({ message: "Pin Tidak Cocok" }, req.originalUrl, 402, res);
      }

      success({}, "Succes Tarik Saldo!", res);
    } catch (err: any) {
      console.log(err.message);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async validasiPenarikanSaldo(req: Request, res: Response) {
    try {
      const {kode_nasabah} = req.body;
      const rows = await TarikSaldoNasabahs.update({
        status: true,
      }, 
      {
        where: {
          kode_nasabah: kode_nasabah,
        },
      });
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
        include: [{ model: Biayaadmins }],
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
        include: [{ model: Biayaadmins }],
        where: {
          kode_nasabah,
          status : true
        },
      });
      success({ rows }, "Datas Admin By Kode Admin", res);
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
        include: [{ model: Biayaadmins }],
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

  async biayaAdmin(req: Request, res: Response) {
    const { harga, kode_super_induk } = req.body;

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
        where:{
          kode_super_induk
        }
      })
      success({ rows }, "get Biaya Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }


  async updateBiayaAdmin(req: Request, res: Response) {
    const { harga, kode_biayaAdmin } = req.body;
    try {
      const rows = await Biayaadmins.update({
        harga
      },{
        where:{
          kode_biayaAdmin
        }
      })
      success({ rows }, "Create Biaya Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default TransaksiTarikSaldoController;
