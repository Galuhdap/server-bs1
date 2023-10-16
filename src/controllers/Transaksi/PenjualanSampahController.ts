import { Request, Response } from "express";
import Admins from "../../db/models/Admin";
import JenisBarang from "../../db/models/JenisBarang";
import JenisSampahKerings from "../../db/models/JenisSamapahKerings";
import SuperAdmins from "../../db/models/SuperAdmin";
import error, { success } from "../../helpers/response";
import randomKodeNumber, { randomKodeNumberSampah } from "../../helpers/utils";
import Routers from "../RouterController";
import SusutSampahAdmins from "../../db/models/Susutsampahadmin";
import DetailSampahBs from "../../db/models/DetailSampahBS";
import PenjualanSampahInduks from "../../db/models/Penjualansampahinduk";
import SusutSampahInduks from "../../db/models/Susutsampahinduk";
import DetailSampahSuperAdmins from "../../db/models/Detailsampahsuperadmin";



class PenjualanSampahController extends Routers{
    constructor(){
        super();
        this.router.post("/transaksi/sampah/induk", this.penjualanSampahInduk.bind(this));
        this.router.get("/transaksi/sampah/induk", this.getPenjualanSampahInduk.bind(this));
        this.router.post("/transaksi/sampah/susut", this.susutSampahInduk.bind(this));
        this.router.get("/transaksi/sampah/susut", this.getSusutSampahInduk.bind(this));
        this.router.post("/transaksi/sampah/susut/induk", this.susutSampahInduk.bind(this));
    }

    

    async penjualanSampahInduk(req: Request, res: Response) {
        try {
          const { kode_sampah, kode_barang, berat,harga,catatan,nama_pembeli, kode_super_admin } = req.body;
    
          const kodeSuperAdmin = await SuperAdmins.findByPk(kode_super_admin);
          const kodeBarang = await JenisBarang.findByPk(kode_barang);
          const kodeSampah = await JenisSampahKerings.findByPk(kode_sampah);
    
          if (!kodeSuperAdmin || !kodeBarang || !kodeSampah) {
            return error({ message: "Masukan input yang benar" }, req.originalUrl, 402, res);
          }
    
          
          const kodePenjualanInduk: string = randomKodeNumberSampah("KPSI-");

          const total = berat * harga;

          const rows = await PenjualanSampahInduks.create({
            kode_penjualan_induk: kodePenjualanInduk,
            kode_sampah:kodeSampah!["kode_sampah"],
            kode_barang: kodeBarang!["kode_barang"],
            berat,
            harga,
            total,
            catatan,
            kode_super_admin:kodeSuperAdmin["kode_super_admin"],
            nama_pembeli,
          });

          success({rows, "Total Yang di peroleh" : total } , "Succes Penjualan Sampah!", res);
        } catch (err:any) {
          console.log(err);
          error({ error: err.message }, req.originalUrl, 403, res);
        }
      }

    async susutSampahInduk(req: Request, res: Response) {
        try {
          const { kode_sampah, kode_barang, berat, harga ,catatan, kode_super_admin, nama_pembeli } = req.body;
  
          const kodeSuperAdmin = await SuperAdmins.findByPk(kode_super_admin);
          const kodeBarang = await JenisBarang.findByPk(kode_barang);
          const kodeSampah = await JenisSampahKerings.findByPk(kode_sampah);
    
          if(!kodeSuperAdmin) return error({ message: "Masukan input yang benar P" }, req.originalUrl, 402, res);
          if(!kodeBarang) return error({ message: "Masukan input yang benar B " }, req.originalUrl, 402, res);
          if(!kodeSampah) return error({ message: "Masukan input yang benar s " }, req.originalUrl, 402, res);
    
          
          const kodeSusutSampah: string = randomKodeNumberSampah("KSSI-");
    
          const total = berat * harga;

          const rows = await SusutSampahInduks.create({
            kode_susut_induk: kodeSusutSampah,
            kode_sampah:kodeSampah!["kode_sampah"],
            kode_barang: kodeBarang!["kode_barang"],
            berat,
            harga,
            total,
            catatan,
            kode_super_admin:kodeSuperAdmin["kode_super_admin"],
            nama_pembeli
          });

          const admin = await DetailSampahSuperAdmins.findAll({
            where:{
              kode_super_admin
            }
          })

          const _berat = admin[0]["berat"]! - berat;
          const _total = admin[0]["saldo"]! + total;


          const updateSusutSampah = await DetailSampahSuperAdmins.update({
            berat:_berat,
            saldo:_total,
          }, {
            where:{
              kode_super_admin:kodeSuperAdmin["kode_super_admin"],
            }
          })

          success({rows} , "Succes Jual Sampah!", res);
        } catch (err:any) {
          console.log(err);
          error({ error: err.message }, req.originalUrl, 403, res);
        }
      }

      async detailSampah(req:Request , res:Response){
        try {
          const {kodePenjulan} = req.body;

          const rows = await SusutSampahAdmins.findAll({
            where:{
              kode_susut_sampah_bs:kodePenjulan
            }
          });
          success({rows} , "Succes Setor Sampah!", res);
        } catch (err:any) {
          console.log(err);
          error({ error: err.message }, req.originalUrl, 403, res);
        }
      }

      async getPenjualanSampahInduk(req:Request , res:Response){
        try {
          const {kode_super_admin} = req.body;
          const rows = await PenjualanSampahInduks.findAll({
            where:{
              kode_super_admin
            }
          });
          success({rows} , "Succes Setor Sampah!", res);
        } catch (err:any) {
          console.log(err);
          error({ error: err.message }, req.originalUrl, 403, res);
        }
      }
      async getSusutSampahInduk(req:Request , res:Response){
        try {
          const {kode_super_admin} = req.body;
          const rows = await SusutSampahInduks.findAll({
            where:{
              kode_super_admin
            }
          });
          success({rows} , "Succes Setor Sampah!", res);
        } catch (err:any) {
          console.log(err);
          error({ error: err.message }, req.originalUrl, 403, res);
        }
      }
}

export default PenjualanSampahController;