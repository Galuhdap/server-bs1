import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import Admins from "./Admin";

interface DetailSampahBsAttributes {
  kode_detail_sampah?: string | null;
  berat?: number | null;
  saldo?: number | null;
  berat_sekarang?: number | null;
  saldo_sekarang?: number | null;
  kode_admin?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface DetailSampahBsInput
  extends Optional<DetailSampahBsAttributes, "kode_detail_sampah"> {}
export interface DetailSampahBsOutput
  extends Required<DetailSampahBsAttributes> {}

class DetailSampahBs
  extends Model<DetailSampahBsAttributes, DetailSampahBsInput>
  implements DetailSampahBsAttributes
{
  kode_detail_sampah!: string | null;
  berat!: number | null;
  saldo!: number | null;
  berat_sekarang!: number | null;
  saldo_sekarang!: number | null;
  kode_admin!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

DetailSampahBs.init(
  {
    kode_detail_sampah: {
      allowNull: true,
      primaryKey: true,
      type: DataTypes.STRING
    },
    kode_admin: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    berat: {
      allowNull: true,
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
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

DetailSampahBs.hasOne(Admins, { foreignKey: 'kode_admin' });

export default DetailSampahBs;
