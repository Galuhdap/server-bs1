import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"

interface SuperAdminsAttributes {
  kode_super_admin?: string | null,
  nama_super_admin?: string | null,
  no_telp?: string | null,
  alamat?: string | null,
  kode_user?: string | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface SuperAdminsInput extends Optional<SuperAdminsAttributes, 'kode_super_admin'>{}
export interface SuperAdminsOutput extends Required<SuperAdminsAttributes>{}

class SuperAdmins extends Model<SuperAdminsAttributes, SuperAdminsInput> implements SuperAdminsAttributes{
  kode_super_admin!: string | null;
  nama_super_admin!: string | null;
  no_telp!: string | null;
  alamat!: string | null;
  kode_user!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

SuperAdmins.init({
  kode_super_admin: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING
  },
  nama_super_admin: {
    type: DataTypes.STRING
  },
  no_telp: {
    type: DataTypes.STRING
  },
  alamat: {
    type: DataTypes.STRING
  },
  kode_user: {
    type: DataTypes.STRING
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})


export default SuperAdmins;