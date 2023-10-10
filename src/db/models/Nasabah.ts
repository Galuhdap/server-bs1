import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import DetailSampahNasabahs from './DetailSampahNasabah';

interface NasabahAttributes {
  kode_nasabah?: string | null,
  nama_nasabah?: string | null,
  rt?: string | null,
  rw?: string | null,
  no_telp?: string | null,
  alamat?: string | null,
  pin?: string | null,
  kode_user?: string | null,
  kode_super_admin?: string | null,
  kode_admin?: string | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface NasabahInput extends Optional<NasabahAttributes, 'kode_nasabah'>{}
export interface NasabahOutput extends Required<NasabahAttributes>{}

class Nasabah extends Model<NasabahAttributes, NasabahInput> implements NasabahAttributes{
  kode_nasabah!: string | null;
  nama_nasabah!: string | null;
  rt!: string | null;
  rw!: string | null;
  no_telp!: string | null;
  alamat!: string | null;
  pin!: string | null;
  kode_user!: string | null;
  kode_super_admin!: string | null;
  kode_admin!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

Nasabah.init({

  kode_nasabah:{
    allowNull:true,
    unique:true,
    primaryKey:true,
    type: DataTypes.STRING
  },

  nama_nasabah: {
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
  pin: {
    type: DataTypes.TEXT
  },
  kode_user:{
    unique:true,
    type: DataTypes.STRING
  },
  kode_admin:{
    unique:true,
    type: DataTypes.STRING
  },
  kode_super_admin:{
    unique:true,
    type: DataTypes.STRING
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})

Nasabah.hasMany(DetailSampahNasabahs, { foreignKey: 'kode_nasabah' });

export default Nasabah;