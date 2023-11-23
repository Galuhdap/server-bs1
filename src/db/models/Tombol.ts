import {BelongsTo, DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect";
import JenisSampahKerings from './JenisSamapahKerings';

interface TombolAttributes {
  id?: number,
  tombol1?: boolean | null,
  kode_admin?: string | null;
  kode_super_induk?: string | null;
  createdAt?: Date,
  updateAt?: Date
}

export interface TombolInput extends Optional<TombolAttributes, 'id'>{}
export interface TombolOutput extends Required<TombolAttributes>{}

class Tombol extends Model<TombolAttributes, TombolInput> implements TombolAttributes{
  id!: number;
  tombol1!: boolean | null;
  kode_admin!: string | null;
  kode_super_induk!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  
}

Tombol.init({
  id: {
    allowNull: false,
    unique:true,
    primaryKey: true,
    autoIncrement:true,
    type: DataTypes.STRING
  },
  tombol1: {
    type: DataTypes.STRING
  },
  kode_admin: {
    type: DataTypes.STRING,
  },
  kode_super_induk: {
    type: DataTypes.STRING,
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})




export default Tombol;