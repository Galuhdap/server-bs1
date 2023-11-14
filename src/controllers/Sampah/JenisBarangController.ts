import { Request, Response } from "express";
import Routers from "../RouterController";
import { randomKodeNumberSampah } from "../../helpers/utils";
import JenisBarang from "../../db/models/JenisBarang";
import error, { success } from "../../helpers/response";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";
import { where } from "sequelize";

class JenisBarangController extends Routers {
  constructor() {
    super();
    this.router.get("/product/jenis", this.getJenisBarang.bind(this));
    this.router.post("/product/jenis", this.tambahJenisBarang.bind(this));
    this.router.post("/product/edit", this.editJenisBarang.bind(this));
    this.router.delete("/product/hapus", this.hapusJenisBarang.bind(this));
  }

  async getJenisBarang(req: Request, res: Response) {
    try {
      const rows = await JenisBarang.findAll({});
      success(rows, "Get Jenis Barang!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async tambahJenisBarang(req: Request, res: Response) {
    try {
      const {
        jenis_barang,
        satuan,
        harga_pertama,
        keuntungan_pertama,
        keuntungan_kedua,
        harga_kedua,
        kode_sampah,
        kode_super_induk,
      } = req.body;
      const kodeBarang: string = randomKodeNumberSampah("KB-");

      // const sampah = JenisSampahKerings.findAll({where: kode_sampah});
      // if (sampah == null) error({ error: "Sampah Tidak Ada" }, req.originalUrl, 403, res);

      const total_pertama = harga_pertama - keuntungan_pertama;
      const total_kedua = harga_kedua - keuntungan_kedua;

      const rows = await JenisBarang.create({
        kode_barang: kodeBarang,
        jenis_barang,
        satuan,
        harga_pertama,
        keuntungan_pertama,
        total_pertama,
        harga_kedua,
        keuntungan_kedua,
        total_kedua,
        kode_sampah,
        kode_super_induk,
      });

      success(rows, "Create Jenis Barang!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async editJenisBarang(req: Request, res: Response) {
    try {
      const { jenis_barang, harga_pertama,keuntungan_pertama ,  harga_kedua, keuntungan_kedua, kode_barang } =
        req.body;

        const total_pertama = harga_pertama - keuntungan_pertama;
        const total_kedua = harga_kedua - keuntungan_kedua;

      const rows = await JenisBarang.update(
        {
          jenis_barang,
          harga_pertama,
          keuntungan_pertama,
          total_pertama,
          harga_kedua,
          keuntungan_kedua,
          total_kedua
        },
        {
          where: {
            kode_barang,
          },
        }
      );
      success(rows, "Edit Jenis Barang!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async hapusJenisBarang(req: Request, res: Response) {
    try {
      const { kode_barang } = req.body;
      const rows = await JenisBarang.destroy({
        where: {
          kode_barang,
        },
      });
      success(rows, "Edit Jenis Barang!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default JenisBarangController;
