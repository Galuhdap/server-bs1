import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"

interface AdminsAttributes {
  kode_admin?: string | null,
  nama_bs?: string | null,
  no_telp?: string | null,
  rt?: string | null,
  rw?: number | null,
  kode_user?: string | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface AdminsInput extends Optional<AdminsAttributes, 'kode_admin'>{}
export interface AdminsOutput extends Required<AdminsAttributes>{}

class Admins extends Model<AdminsAttributes, AdminsInput> implements AdminsAttributes{
  kode_admin!: string | null;
  nama_bs!: string | null;
  no_telp!: string | null;
  rt!: string | null;
  rw!: number | null;
  kode_user!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

Admins.init({

  kode_admin:{
    allowNull:true,
    unique:true,
    primaryKey:true,
    type: DataTypes.STRING
  },
  nama_bs: {
    type: DataTypes.STRING
  },
  no_telp: {
    type: DataTypes.STRING
  },
  rt: {
    type: DataTypes.STRING
  },
  rw: {
    type: DataTypes.STRING
  },
  kode_user:{
    unique:true,
    type: DataTypes.STRING
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})

// Admin.belongsTo(Rw, { foreignKey: 'id_rw' });
export default Admins;