import { Request, Response } from "express";
import Routers from "../RouterController";
import { randomKodeNumberSampah } from "../../helpers/utils";

import error, { success } from "../../helpers/response";
import JenisSampahKering from "../../db/models/JenisSamapahKerings";
import JenisBarang from "../../db/models/JenisBarang";


class JenisSampahController extends Routers {
  constructor() {
    super();
    this.router.get("/product/sampah", this.getAllJenisSampah.bind(this));
    this.router.post("/product/sampah", this.tambahJenisSampah.bind(this));
  }

  async getAllJenisSampah(req: Request, res: Response) {
    try {
    
      const rows = await JenisSampahKering.findAll({
        include: [
          {
            model: JenisBarang,
          },
        ],
      });

      success(rows , "Get Jenis Sampah!", res);
    } catch (err:any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async tambahJenisSampah(req: Request, res: Response) {
    try {
      const { jenis_sampah } = req.body;
      const kodeSampah: string = randomKodeNumberSampah("KS-");
    
      const rows = await JenisSampahKering.create({
        kode_sampah: kodeSampah,
        jenis_sampah,
      })
      success(rows , "Create Jenis Sampah!", res);
    } catch (err:any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
}

export default JenisSampahController;
