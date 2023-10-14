import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import TarikSaldoNasabahs from './Tariksaldonasabah';

interface BiayaadminsAttributes {
  kode_biayaAdmin?: string | null,
  harga?: number | null,
  kode_super_induk?: string | null,
  createdAt?: Date,
  updateAt?: Date
}

export interface BiayaadminsInput extends Optional<BiayaadminsAttributes, 'kode_biayaAdmin'>{}
export interface BiayaadminsOutput extends Required<BiayaadminsAttributes>{}

class Biayaadmins extends Model<BiayaadminsAttributes, BiayaadminsInput> implements BiayaadminsAttributes{
  kode_biayaAdmin!: string | null;
  harga!: number | null;
  kode_super_induk!: string | null;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

Biayaadmins.init({

  kode_biayaAdmin: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },

  harga: {
    type: DataTypes.INTEGER
  },
  kode_super_induk: {
    type: DataTypes.STRING
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})
// Biayaadmins.hasMany(TarikSaldoNasabahs,{ foreignKey: 'kode_biayaAdmin' })
export default Biayaadmins;