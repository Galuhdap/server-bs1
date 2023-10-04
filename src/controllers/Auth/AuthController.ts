import { Request, Response } from "express";
import Routers from "../RouterController";
import bcrypt from "bcrypt";
import error, { success } from "./../../helpers/response";
import randomKodeNumber, { randomKodeNumberSampah } from "../../helpers/utils";
import dotenv from "dotenv";
import { accesTokenJwt, matchPassword, refreshTokenJwt, secretJwt } from "./AuthConfig";
import Users from "../../db/models/Users";
import DetailSampahBs from "../../db/models/DetailSampahBS";
import DetailSampahNasabahs from "../../db/models/DetailSampahNasabah";
import Nasabah from "../../db/models/Nasabah";
import Penimbang from "../../db/models/Penimbang";
import Admin from './../../db/models/Admin';
import SuperAdmins from "../../db/models/SuperAdmin";
import DetailSampahSuperAdmins from "../../db/models/Detailsampahsuperadmin";



dotenv.config();

class AdminAuthController extends Routers {


  constructor() {
    super();
    this.router.post("/auth/login", this.login.bind(this));

    this.router.post("/auth/reg/nas", this.registerNasabah.bind(this));
    this.router.post("/auth/reg/adm", this.registerAdmin.bind(this));
    this.router.post("/auth/reg/pen", this.registerPenimbang.bind(this));
    this.router.post("/auth/reg/sup/adm", this.registerSuperAdmin.bind(this));

    this.router.delete("/auth/logout", this.logout.bind(this));
  }

  async login(req: Request, res: Response) {
    try {
      const { kode_reg, password } = req.body;

      // const user = await this.authService.userFindone(kode_reg);
      const user = await Users.findOne({
        where: { kode_reg: kode_reg },
      });

      await matchPassword(password, user?.password as string, res, req);

      const kodeReg = user?.kode_reg;
      const role = user?.role;

      const allDatas = {
        kodeReg,
        role,
      };

      const accesToken = accesTokenJwt(allDatas)

      await Users.update(
        { refresh_token: refreshTokenJwt(allDatas) },
        { where: { kode_reg: kode_reg } }
      );

      res.cookie("refreshTokenAdmin" , refreshTokenJwt(allDatas), {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })

      success(accesToken , "Create Token!", res);
    } catch (err: any) {
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async registerNasabah(req: Request, res: Response) {
    try {
      const { nama_nasabah,rt,  rw ,no_telp, alamat, pin,  password} = req.body;


      const kodeNasabah: string = randomKodeNumber("KN-", rw, rt);
      const kodeReg: string = randomKodeNumber("KR-", rw, rt);
      const kodeDetailSampah: string = randomKodeNumberSampah("KDS-");
      const admins = await Admin.findAll({where: {rw:rw}});

      const salt: any = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const hashPin = await bcrypt.hash(pin, salt);

      const user = await Users.create({
        kode_reg: kodeReg,
        password: hashPassword,
        role:"nasabah"
      })

      

      const result = await Nasabah.create({
        kode_nasabah: kodeNasabah,
        nama_nasabah,
        rt,
        rw,
        no_telp,
        alamat,
        pin: hashPin,
        kode_user: kodeReg,
        kode_admin:admins[0]["kode_admin"],
      });

      const dsn = await DetailSampahNasabahs.create({
        kode_detail_sampah:kodeDetailSampah,
        kode_nasabah:kodeNasabah,
        berat:0,
        saldo:0,
        berat_sekarang:0,
        saldo_sekarang:0,
        kode_admin: admins[0]["kode_admin"],
      });

      success({user, result , dsn}, "Succes Register!", res);
    } catch (err: any) {
        console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async registerAdmin(req: Request, res: Response) {
    try {
      const { nama_bs,rw , rt,  no_telp, password,  } = req.body;


      const kodeAdmin: string = randomKodeNumber("KA-", rw , rt);
      const kodeReg: string = randomKodeNumber("KR-", rw,rt);
      const kodeDetailSampah: string = randomKodeNumberSampah("KDS-");

      const salt: any = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        kode_reg: kodeReg,
        password: hashPassword,
        role:"admin"
      })

      const result = await Admin.create({
        kode_admin: kodeAdmin,
        nama_bs,
        no_telp,
        rt,
        rw,
        kode_user: kodeReg,
      });

      const detailsampahBS = await DetailSampahBs.create({
        kode_detail_sampah:kodeDetailSampah,
        kode_admin:kodeAdmin,
        berat:0,
        saldo:0,
        berat_sekarang:0,
        saldo_sekarang:0,
      });

      success({user, result , detailsampahBS}, "Succes Register!", res);
    } catch (err: any) {
        console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async registerPenimbang(req: Request, res: Response) {
    try {
        const { nama_penimbang,rt,rw, no_telp, alamat,  password, kode_admin } = req.body;


      const kodePenimbang: string = randomKodeNumber("KP-", rw , rt);
      const kodeReg: string = randomKodeNumber("KR-",rw , rt);

      const salt: any = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        kode_reg: kodeReg,
        password: hashPassword,
        role:"penimbang"
      })

      const admins = await Admin.findAll({where: {rw:rw}});

      const result = await Penimbang.create({
        kode_penimbang: kodePenimbang,
        nama_penimbang,
        rt,
        rw,
        no_telp,
        alamat,
        kode_user: kodeReg,
        kode_admin: admins[0]["kode_admin"]
      });

      success({user, result}, "Succes Register!", res);
    } catch (err: any) {
        console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }

  async registerSuperAdmin(req: Request, res: Response) {
    try {
        const { nama_super_admin,no_telp, alamat,  password } = req.body;


      const kodeSuperAdmin: string = randomKodeNumberSampah("KSA-");
      const kodeReg: string = randomKodeNumberSampah("KR-");
      const kodeDetailSampah: string = randomKodeNumberSampah("KDS-");

      const salt: any = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        kode_reg: kodeReg,
        password: hashPassword,
        role:"superadmin"
      })

      const result = await SuperAdmins.create({
        kode_super_admin:kodeSuperAdmin,
        nama_super_admin,
        no_telp,
        alamat,
        kode_user:kodeReg
      })

      const detailsampahSuperadmin = await DetailSampahSuperAdmins.create({
        kode_detail_sampah:kodeDetailSampah,
        kode_super_admin:kodeSuperAdmin,
        berat:0,
        saldo:0,
      });

      success({user, result, detailsampahSuperadmin}, "Succes Register!", res);
    } catch (err: any) {
        console.log(err);
      error({ error: err.message }, req.originalUrl, 403, res);
    }
  }


  async logout(req: Request, res: Response) {
    try {
        const {kode_reg} = req.body;
        await Users.update(
            { refresh_token: null },
            { where: { kode_reg: kode_reg } }
          );

          res.clearCookie('refreshTokenAdmin');
          success("", "Succes Logout!", res);
    } catch (err:any) {
        error({ error: err.message }, req.originalUrl, 403, res);
    }
       
  }
}

export default AdminAuthController;
