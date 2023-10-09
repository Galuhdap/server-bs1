import { Request, Response } from "express";
import Routers from "../RouterController";
import { randomKodeNumberSampah } from "../../helpers/utils";
import JenisBarang from "../../db/models/JenisBarang";
import error, { success } from "../../helpers/response";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";


class JenisBarangController extends Routers {
  constructor() {
    super();
    this.router.get("/product/jenis", this.getJenisBarang.bind(this));
    this.router.post("/product/jenis", this.tambahJenisBarang.bind(this));
  }

  async getJenisBarang(req: Request, res: Response) {
    try {
      const rows = await JenisBarang.findAll({
        include: [
          {
            model: JenisSampahKerings,
          },
        ],
      })
      success(rows , "Get Jenis Barang!", res);
    } catch (err:any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async tambahJenisBarang(req: Request, res: Response) {
    try {
      const { jenis_barang, satuan, harga_pertama , harga_kedua, kode_sampah } = req.body;
      const kodeBarang: string = randomKodeNumberSampah("KB-");

      // const sampah = JenisSampahKerings.findAll({where: kode_sampah});
      // if (sampah == null) error({ error: "Sampah Tidak Ada" }, req.originalUrl, 403, res);

      const rows = await JenisBarang.create({
        kode_barang: kodeBarang,
        jenis_barang,
        satuan,
        harga_pertama,
        harga_kedua,
        kode_sampah
      });
      success(rows , "Create Jenis Barang!", res);
    } catch (err:any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default JenisBarangController;
