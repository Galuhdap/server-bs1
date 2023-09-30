import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"

interface BiayaadminsAttributes {
  kode_biayaAdmin?: string | null,
  harga?: number | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface BiayaadminsInput extends Optional<BiayaadminsAttributes, 'kode_biayaAdmin'>{}
export interface BiayaadminsOutput extends Required<BiayaadminsAttributes>{}

class Biayaadmins extends Model<BiayaadminsAttributes, BiayaadminsInput> implements BiayaadminsAttributes{
  kode_biayaAdmin!: string | null;
  harga!: number | null;

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
    type: DataTypes.STRING
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})


export default Biayaadmins;