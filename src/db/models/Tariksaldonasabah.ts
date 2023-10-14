import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import Biayaadmins from "./Biayaadmin";

interface TarikSaldoNasabahsAttributes {
  kode_tariksaldo?: string | null;
  nomor_invoice?: string | null;
  jumlah_penarikan?: number | null;
  saldo_akhir?: number | null;
  status?: boolean | null;
  kode_nasabah?: string | null;
  kode_admin?: string | null;
  kode_biaya?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface TarikSaldoNasabahsInput
  extends Optional<TarikSaldoNasabahsAttributes, "kode_tariksaldo"> {}
export interface TarikSaldoNasabahsOutput
  extends Required<TarikSaldoNasabahsAttributes> {}

class TarikSaldoNasabahs
  extends Model<TarikSaldoNasabahsAttributes, TarikSaldoNasabahsInput>
  implements TarikSaldoNasabahsAttributes
{
  kode_tariksaldo!: string | null;
  nomor_invoice!: string | null;
  jumlah_penarikan!: number | null;
  saldo_akhir!: number | null;
  status!: boolean | null;
  kode_nasabah!: string | null;
  kode_admin!: string | null;
  kode_biaya!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

TarikSaldoNasabahs.init(
  {
    kode_biaya: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    kode_tariksaldo: {
      type: DataTypes.STRING,
    },
    nomor_invoice: {
      unique: true,
      type: DataTypes.STRING,
    },
    jumlah_penarikan: {
      type: DataTypes.INTEGER,
    },
    saldo_akhir: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    kode_nasabah: {
      type: DataTypes.STRING,
    },
    kode_admin: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

TarikSaldoNasabahs.hasMany(Biayaadmins, { foreignKey: "kode_biayaAdmin" });

export default TarikSaldoNasabahs;
