import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import TarikSaldoNasabahs from './Tariksaldonasabah';

interface CatatPengeluaranAdminsAttributes {
  kode_pengeluaran?: string | null,
  nama_pengeluaran?: string | null,
  harga?: number | null,
  catatan?: string | null,
  kode_admin?: string | null,
  kode_super_admin?: string | null,
  createdAt?: Date,
  updateAt?: Date
}

export interface CatatPengeluaranAdminsInput extends Optional<CatatPengeluaranAdminsAttributes, 'kode_pengeluaran'>{}
export interface CatatPengeluaranAdminsOutput extends Required<CatatPengeluaranAdminsAttributes>{}

class CatatPengeluaranAdmins extends Model<CatatPengeluaranAdminsAttributes, CatatPengeluaranAdminsInput> implements CatatPengeluaranAdminsAttributes{
  kode_pengeluaran!: string | null;
  nama_pengeluaran!: string | null;
  harga!: number | null;
  catatan!: string | null;
  kode_admin!: string | null;
  kode_super_admin!: string | null;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

CatatPengeluaranAdmins.init({

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
  kode_admin: {
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
// CatatPengeluaranAdmins.hasMany(TarikSaldoNasabahs,{ foreignKey: 'kode_biayaAdmin' })
export default CatatPengeluaranAdmins;