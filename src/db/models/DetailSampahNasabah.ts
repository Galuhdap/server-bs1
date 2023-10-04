import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import Nasabah from "./Nasabah";

interface DetailSampahNasabahsAttributes {
  kode_detail_sampah?: string;
  berat?: number | null;
  saldo?: number | null;
  berat_sekarang?: number | null;
  saldo_sekarang?: number | null;
  kode_nasabah?: string | null;
  kode_admin?: string | null;
  kode_penimbang?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface DetailSampahNasabahsInput
  extends Optional<DetailSampahNasabahsAttributes, "kode_detail_sampah"> {}
export interface DetailSampahNasabahsOutput
  extends Required<DetailSampahNasabahsAttributes> {}

class DetailSampahNasabahs
  extends Model<
    DetailSampahNasabahsAttributes,
    DetailSampahNasabahsInput
  >
  implements DetailSampahNasabahsAttributes
{
  kode_detail_sampah!: string;
  berat!: number | null;
  saldo!: number | null;
  berat_sekarang!: number | null;
  saldo_sekarang!: number | null;
  kode_nasabah!: string | null;
  kode_admin!: string | null;
  kode_penimbang!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

DetailSampahNasabahs.init(
  {
    kode_detail_sampah: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    kode_nasabah: {
      allowNull: true,
      type: DataTypes.STRING,
      
    },
    berat: {
      allowNull:true,
      type: DataTypes.DOUBLE,
    },
    saldo: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    berat_sekarang: {
      allowNull: true,
      type: DataTypes.DOUBLE,

    },
    saldo_sekarang: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    kode_admin: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    kode_penimbang: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

// DetailSampahNasabahs.hasMany(Nasabah, { foreignKey: 'kode_nasabah' });
// DetailSampahNasabahs.hasMany(Nasabah, { foreignKey: 'kode_nasabah' });

export default DetailSampahNasabahs;
