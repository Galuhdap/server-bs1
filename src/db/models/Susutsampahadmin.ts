import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import Nasabah from './Nasabah';
import Penimbang from './Penimbang';
import JenisSampahKering from './JenisSamapahKerings';
import JenisBarang from './JenisBarang';

interface SusutSampahAdminsAttributes {
  kode_susut_sampah_bs?: string | null,
  berat?: number | null,
  harga?: number | null,
  catatan?: string | null,
  kode_admin_bs?: string | null,
  kode_super_admin?: string | null,
  kode_sampah?: string | null,
  kode_barang?: string | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface SusutSampahAdminsInput extends Optional<SusutSampahAdminsAttributes, 'kode_susut_sampah_bs'>{}
export interface SusutSampahAdminsOutput extends Required<SusutSampahAdminsAttributes>{}

class SusutSampahAdmins extends Model<SusutSampahAdminsAttributes, SusutSampahAdminsInput> implements SusutSampahAdminsAttributes{
  kode_susut_sampah_bs!: string | null;
  berat!: number | null;
  harga!: number | null;
  catatan!: string | null;
  kode_admin_bs!: string | null;
  kode_super_admin!: string | null;
  kode_sampah!: string | null;
  kode_barang!: string | null;


  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

SusutSampahAdmins.init({
  kode_susut_sampah_bs: {
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
  catatan: {
    type: DataTypes.STRING
  },
  kode_admin_bs: {
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

// SusutSampahAdmins.belongsTo(Nasabah, { foreignKey: 'kode_nasabah' });
// SusutSampahAdmins.belongsTo(Penimbang, { foreignKey: 'kode_penimbang' });
// SusutSampahAdmins.belongsTo(JenisSampahKering, { foreignKey: 'kode_sampah' });
// SusutSampahAdmins.belongsTo(JenisBarang, { foreignKey: 'kode_barang' });
export default SusutSampahAdmins;