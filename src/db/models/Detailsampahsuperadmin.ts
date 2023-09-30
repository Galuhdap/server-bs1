import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import Nasabah from "./Nasabah";

interface DetailSampahSuperAdminsAttributes {
  kode_detail_sampah?: string;
  berat?: number | null;
  saldo?: number | null;
  kode_super_admin?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface DetailSampahSuperAdminsInput
  extends Optional<DetailSampahSuperAdminsAttributes, "kode_detail_sampah"> {}
export interface DetailSampahSuperAdminsOutput
  extends Required<DetailSampahSuperAdminsAttributes> {}

class DetailSampahSuperAdmins
  extends Model<
    DetailSampahSuperAdminsAttributes,
    DetailSampahSuperAdminsInput
  >
  implements DetailSampahSuperAdminsAttributes
{
  kode_detail_sampah!: string;
  berat!: number | null;
  saldo!: number | null;
  kode_super_admin!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

DetailSampahSuperAdmins.init(
  {
    kode_detail_sampah: {
      allowNull: true,
      primaryKey: true,
      type: DataTypes.STRING
    },
    kode_super_admin: {
      allowNull: true,
      type: DataTypes.STRING
    },
    berat: {
      allowNull: true,
      type: DataTypes.DOUBLE
    },
    saldo: {
      allowNull: true,
      type: DataTypes.DOUBLE
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

DetailSampahSuperAdmins.hasOne(Nasabah, { foreignKey: 'kode_nasabah' });

export default DetailSampahSuperAdmins;
