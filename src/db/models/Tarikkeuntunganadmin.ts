import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import TarikSaldoNasabahs from './Tariksaldonasabah';

interface TarikKeuntunganAdminsAttributes {
  kode_tariksaldo?: string | null,
  nomor_invoice?: string | null,
  jumlah_penarikan?: number | null,
  kode_admin?: string | null,
  kode_super_admin?: string | null,
  createdAt?: Date,
  updateAt?: Date
}

export interface TarikKeuntunganAdminsInput extends Optional<TarikKeuntunganAdminsAttributes, 'kode_tariksaldo'>{}
export interface TarikKeuntunganAdminsOutput extends Required<TarikKeuntunganAdminsAttributes>{}

class TarikKeuntunganAdmins extends Model<TarikKeuntunganAdminsAttributes, TarikKeuntunganAdminsInput> implements TarikKeuntunganAdminsAttributes{
  kode_tariksaldo!: string | null;
  nomor_invoice!: string | null;
  jumlah_penarikan!: number | null;
  kode_admin!: string | null;
  kode_super_admin!: string | null;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

TarikKeuntunganAdmins.init({

  kode_tariksaldo: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },

  nomor_invoice: {
    type: DataTypes.STRING
  },
  jumlah_penarikan: {
    type: DataTypes.INTEGER
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
// TarikKeuntunganAdmins.hasMany(TarikSaldoNasabahs,{ foreignKey: 'kode_biayaAdmin' })
export default TarikKeuntunganAdmins;