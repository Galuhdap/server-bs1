import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import DetailSampahBs from './DetailSampahBS';

interface PenimbangAttributes {
  kode_penimbang?: string | null,
  nama_penimbang?: string | null,
  rt?: string | null,
  rw?: string | null,
  no_telp?: string | null,
  alamat?: string | null,
  kode_admin?: string | null,
  kode_user?: string | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface PenimbangInput extends Optional<PenimbangAttributes, 'kode_penimbang'>{}
export interface PenimbangOutput extends Required<PenimbangAttributes>{}

class Penimbang extends Model<PenimbangAttributes, PenimbangInput> implements PenimbangAttributes{
  kode_penimbang!: string | null;
  nama_penimbang!: string | null;
  rt!: string | null;
  rw!: string | null;
  no_telp!: string | null;
  alamat!: string | null;
  kode_admin!: string | null;
  kode_user!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

Penimbang.init({

  kode_penimbang:{
    allowNull:false,
    unique:true,
    primaryKey:true,
    type: DataTypes.STRING
  },

  nama_penimbang: {
    type: DataTypes.STRING
  },
  rt: {
    type: DataTypes.STRING
  },
  rw: {
    type: DataTypes.STRING
  },
  no_telp: {
    type: DataTypes.STRING
  },
  alamat: {
    type: DataTypes.STRING
  },
  kode_admin:{
    unique:true,
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

Penimbang.hasMany(DetailSampahBs, { foreignKey: 'kode_admin' });
export default Penimbang;