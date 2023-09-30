import { Request, Response } from "express";
import Routers from "../RouterController";
import { randomKodeNumberSampah } from "../../helpers/utils";
import JenisBarang from "../../db/models/JenisBarang";
import error, { success } from "../../helpers/response";


class JenisBarangController extends Routers {
  constructor() {
    super();
    this.router.get("/product/jenis", this.tambahJenisBarang.bind(this));
  }

  async tambahJenisBarang(req: Request, res: Response) {
    try {
      const { jenis_barang, satuan, harga_pertama , harga_kedua } = req.body;
      const kodeBarang: string = randomKodeNumberSampah("KB-");
    
      const rows = await JenisBarang.create({
        kode_barang: kodeBarang,
        jenis_barang,
        satuan,
        harga_pertama,
        harga_kedua
      });
      success(rows , "Create Jenis Barang!", res);
    } catch (err:any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default JenisBarangController;
