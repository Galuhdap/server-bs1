import { Request, Response } from "express";
import Nasabah from "../../db/models/Nasabah";
import Routers from "../RouterController";
import error, { statusFalse, statusTrue, success } from "../../helpers/response";
import TarikSaldoNasabahs from "../../db/models/Tariksaldonasabah";
import SetorSampah from "../../db/models/SetorSampahs";
import DetailSampahNasabahs from "../../db/models/DetailSampahNasabah";
import Admins from "../../db/models/Admin";

class NasabahController extends Routers {
  constructor() {
    super();
    this.router.get("/allnasabah", this.allNasabah.bind(this));
    this.router.get("/nasabah", this.getAllNasabah.bind(this));
    this.router.get("/nasabahByid", this.getNasabahById.bind(this));
    this.router.get("/cek/nasabahByid", this.getNasabahByIdCek.bind(this));
  }

  async allNasabah(req: Request, res: Response) {
    try {
      const {kode_super_admin} = req.body;
      const row = await Nasabah.findAll({
        include: [
          {
            model: DetailSampahNasabahs,
          },
        ],
        where:{
          kode_super_admin
        }
      });
      success({row}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }
  async getAllNasabah(req: Request, res: Response) {
    try {
      const {kode_admin} = req.body;
      const row = await Nasabah.findAll({
        include: [
          {
            model: DetailSampahNasabahs,
          },
        ],
        where: {
          kode_admin
        }
      });
      success({row}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getNasabahById(req: Request, res: Response) {
    try {
      const { kode_user } = req.body;
      const row = await Nasabah.findAll({
        include: [
          {
            model: DetailSampahNasabahs,
          },
        ],
        where: {
          kode_user
        }
      });

      success({row}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getNasabahByIdCek(req: Request, res: Response) {
    try {
      const { kode_nasabah } = req.body;
      const row = await Nasabah.findByPk(kode_nasabah);

      if(!row){
        statusFalse("Datas Nasabah False" , res);
        return false;
      } else {
        statusTrue("Datas Nasabah True" , res);
        return true;
      }

     
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async editNasabahById(req: Request, res: Response) {
    try {
      const { kodeNasabah, nama_nasabah , rt, rw, no_telp, alamat} = req.body;
      const user = await Nasabah.findByPk(kodeNasabah);

      if(!user) return error({ message: "Masukan input yang benar B " }, req.originalUrl, 402, res);

      const rows = await Nasabah.update({
        nama_nasabah,
        rt,
        rw,
        no_telp,
        alamat,
      },{
        where:{
          kode_nasabah:user["kode_nasabah"]
        }
      })

      success({rows}, "Succes Sampah Admin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async dataSampah(req: Request, res: Response) {
    try {
        const {kodeNasabah} = req.body;
        const user = await Nasabah.findByPk(kodeNasabah);

        if(!user) return error({ message: "user tidak ada" }, req.originalUrl, 402, res);

       const datas = await DetailSampahNasabahs.findAll({
        where:{
            kode_nasabah:user['kode_nasabah']
        }
       })
      success({datas}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }


  async cekRiwayatTransaksiById(req: Request, res: Response) {
    try {
        const {kodeNasabah} = req.body;
        const user = await Nasabah.findByPk(kodeNasabah);

        if(!user) return error({ message: "user tidak ada" }, req.originalUrl, 402, res);

        const riwayatTarikSaldo = await TarikSaldoNasabahs.findAll({
            attributes:['jumlah_penarikan'],
            where:{
                kode_nasabah:user['kode_nasabah']
            }
        });

        const riwayatSetorSampah  = await SetorSampah.findAll({
            attributes:['berat'],
            where:{
                kode_nasabah:user['kode_nasabah']
            }
        })


      success({riwayatTarikSaldo ,  riwayatSetorSampah}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async penarikanDana(req: Request, res: Response) {
    try {
        const {kodeNasabah} = req.body;
        const user = await Nasabah.findByPk(kodeNasabah);

        if(!user) return error({ message: "user tidak ada" }, req.originalUrl, 402, res);

        const riwayatTarikSaldo = await TarikSaldoNasabahs.findAll({
            attributes:['jumlah_penarikan'],
            where:{
                kode_nasabah:user['kode_nasabah']
            }
        });

        const riwayatSaldoSampah  = await DetailSampahNasabahs.findAll({
            attributes:['saldo'],
            where:{
                kode_nasabah:user['kode_nasabah']
            }
        })


      success({riwayatTarikSaldo ,  riwayatSaldoSampah}, "Datas Sampah Nasabah", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }


}

export default NasabahController;
