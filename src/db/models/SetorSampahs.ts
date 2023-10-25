import {DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect"
import Nasabah from './Nasabah';
import Penimbang from './Penimbang';
import JenisSampahKering from './JenisSamapahKerings';
import JenisBarang from './JenisBarang';

interface SetorSampahAttributes {
  kode_setor?: string | null,
  berat?: number | null,
  catatan?: string | null,
  total?: number | null,
  kode_nasabah?: string | null,
  kode_admin?: string | null,
  kode_penimbang?: string | null,
  kode_super_admin?: string | null,
  kode_sampah?: string | null,
  kode_barang?: string | null,
  

  createdAt?: Date,
  updateAt?: Date
}

export interface SetorSampahInput extends Optional<SetorSampahAttributes, 'kode_setor'>{}
export interface SetorSampahOutput extends Required<SetorSampahAttributes>{}

class SetorSampah extends Model<SetorSampahAttributes, SetorSampahInput> implements SetorSampahAttributes{
  kode_setor!: string | null;
  berat!: number | null;
  catatan!: string | null;
  total!: number | null;
  kode_nasabah!: string | null;
  kode_admin!: string | null;
  kode_penimbang!: string | null;
  kode_super_admin!: string | null;
  kode_sampah!: string | null;
  kode_barang!: string | null;


  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

SetorSampah.init({
  kode_setor: {
    allowNull: true,
    primaryKey: true,
    unique:true,
    type: DataTypes.STRING
  },
  berat: {
    type: DataTypes.DOUBLE
  },
  total: {
    type: DataTypes.DOUBLE
  },
  catatan: {
    type: DataTypes.STRING
  },
  kode_nasabah: {
    allowNull: true,
    type: DataTypes.STRING
  },
  kode_admin: {
    allowNull: true,
    type: DataTypes.STRING
  },
  kode_penimbang: {
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

SetorSampah.belongsTo(Nasabah, { foreignKey: 'kode_nasabah' });
SetorSampah.belongsTo(Penimbang, { foreignKey: 'kode_penimbang' });
SetorSampah.belongsTo(JenisSampahKering, { foreignKey: 'kode_sampah' });
SetorSampah.belongsTo(JenisBarang, { foreignKey: 'kode_barang' });
export default SetorSampah;