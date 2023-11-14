import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import TarikSaldoNasabahs from './Tariksaldonasabah';

interface CatatPengeluaranSuperAdminsAttributes {
  kode_pengeluaran?: string | null,
  nama_pengeluaran?: string | null,
  harga?: number | null,
  catatan?: string | null,
  kode_super_admin?: string | null,
  createdAt?: Date,
  updateAt?: Date
}

export interface CatatPengeluaranSuperAdminsInput extends Optional<CatatPengeluaranSuperAdminsAttributes, 'kode_pengeluaran'>{}
export interface CatatPengeluaranSuperAdminsOutput extends Required<CatatPengeluaranSuperAdminsAttributes>{}

class CatatPengeluaranSuperAdmins extends Model<CatatPengeluaranSuperAdminsAttributes, CatatPengeluaranSuperAdminsInput> implements CatatPengeluaranSuperAdminsAttributes{
  kode_pengeluaran!: string | null;
  nama_pengeluaran!: string | null;
  harga!: number | null;
  catatan!: string | null;
  kode_super_admin!: string | null;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

CatatPengeluaranSuperAdmins.init({

  kode_pengeluaran: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },

  nama_pengeluaran: {
    type: DataTypes.STRING
  },
  harga: {
    type: DataTypes.INTEGER
  },
  catatan: {
    type: DataTypes.STRING
  },
  kode_super_admin: {
    type: DataTypes.STRING
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})
// CatatPengeluaranSuperAdmins.hasMany(TarikSaldoNasabahs,{ foreignKey: 'kode_biayaAdmin' })
export default CatatPengeluaranSuperAdmins;