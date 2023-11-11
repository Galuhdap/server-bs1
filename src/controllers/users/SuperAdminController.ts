import { Request, Response } from "express";
import Nasabah from "../../db/models/Nasabah";
import Routers from "../RouterController";
import error, { statusFalse, statusTrue, success } from "../../helpers/response";
import TarikSaldoNasabahs from "../../db/models/Tariksaldonasabah";
import SetorSampah from "../../db/models/SetorSampahs";
import DetailSampahNasabahs from "../../db/models/DetailSampahNasabah";
import SuperAdmins from "../../db/models/SuperAdmin";
import DetailSampahSuperAdmins from "../../db/models/Detailsampahsuperadmin";

class SuperAdminController extends Routers {
  constructor() {
    super();
    this.router.get("/suadmin", this.getAllSuperAdmin.bind(this));
    this.router.get("/suadminbyid", this.getSuperAdminById.bind(this));
    this.router.get("/cek/suadminbyid", this.getSuperAdminByIdCek.bind(this));
  }

  async getAllSuperAdmin(req: Request, res: Response) {
    try {
      const row = await SuperAdmins.findAll({
        // include: [
        //   {
        //     model: DetailSampahSuperAdmins,
        //   },
        // ],
      });
      console.log(row);
      success({row}, "Datas Sampah SuAdmin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getSuperAdminById(req: Request, res: Response) {
    try {
      const { kode_user } = req.body;
      const row = await SuperAdmins.findAll({
        include: [
          {
            model: DetailSampahSuperAdmins,
          },
        ],
        where: {
          kode_user
        }
      });

      success({row}, "Datas Sampah SuAdmin", res);
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async getSuperAdminByIdCek(req: Request, res: Response) {
    try {
      const { kode_super_admin } = req.body;
      const row = await SuperAdmins.findByPk(kode_super_admin)
      if(!row){
        statusFalse("Datas Super Admin False" , res);
        return false;
      } else {
        statusTrue("Datas Super Admin True" , res);
        return true;
      }
    } catch (err: any) {
      console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async editSuperAdminById(req: Request, res: Response) {
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






}

export default SuperAdminController;
