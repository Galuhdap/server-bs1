import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import Nasabah from './Nasabah';
import Penimbang from './Penimbang';
import JenisSampahKering from './JenisSamapahKerings';
import JenisBarang from './JenisBarang';
import SuperAdmins from './SuperAdmin';

interface SusutSampahInduksAttributes {
  kode_susut_induk?: string | null,
  berat?: number | null,
  harga?: number | null,
  total?: number | null,
  catatan?: string | null,
  nama_pembeli?: string | null,
  kode_super_admin?: string | null,
  kode_sampah?: string | null,
  kode_barang?: string | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface SusutSampahInduksInput extends Optional<SusutSampahInduksAttributes, 'kode_susut_induk'>{}
export interface SusutSampahInduksOutput extends Required<SusutSampahInduksAttributes>{}

class SusutSampahInduks extends Model<SusutSampahInduksAttributes, SusutSampahInduksInput> implements SusutSampahInduksAttributes{
  kode_susut_induk!: string | null;
  berat!: number | null;
  harga!: number | null;
  total!: number | null;
  catatan!: string | null;
  nama_pembeli!: string | null;
  kode_super_admin!: string | null;
  kode_sampah!: string | null;
  kode_barang!: string | null;


  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

SusutSampahInduks.init({
  kode_susut_induk: {
    allowNull: true,
    primaryKey: true,
    unique:true,
    type: DataTypes.STRING
  },
  berat: {
    type: DataTypes.DOUBLE
  },
  harga: {
    type: DataTypes.DOUBLE
  },
  total: {
    type: DataTypes.DOUBLE
  },
  catatan: {
    type: DataTypes.STRING
  },
  nama_pembeli: {
    allowNull: true,
    type: DataTypes.STRING
  },
  kode_super_admin: {
    allowNull: true,
    type: DataTypes.STRING
  },
  kode_sampah: {
    allowNull: true,
    type: DataTypes.STRING
  },
  kode_barang: {
    allowNull: true,
    type: DataTypes.STRING
  },

},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})


SusutSampahInduks.belongsTo(SuperAdmins, { foreignKey: 'kode_super_admin' });
SusutSampahInduks.belongsTo(JenisSampahKering, { foreignKey: 'kode_sampah' });
SusutSampahInduks.belongsTo(JenisBarang, { foreignKey: 'kode_barang' });
export default SusutSampahInduks;