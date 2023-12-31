import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import Biayaadmins from "./Biayaadmin";
import Nasabah from "./Nasabah";
import Admins from "./Admin";

interface TarikSaldoNasabahsAttributes {
  kode_tariksaldo?: string | null;
  nomor_invoice?: string | null;
  jumlah_penarikan?: number | null;
  saldo_akhir?: number | null;
  status?: boolean | null;
  kode_nasabah?: string | null;
  kode_admin?: string | null;
  kode_biayaAdmin?: string | null;
  kode_super_admin?: string | null;

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
  kode_biayaAdmin!: string | null;
  kode_super_admin!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

TarikSaldoNasabahs.init(
  {
    kode_biayaAdmin: {
      type: DataTypes.STRING,
    },
    kode_tariksaldo: {
      allowNull: false,
      primaryKey: true,
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
    kode_super_admin: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

TarikSaldoNasabahs.belongsTo(Biayaadmins, { foreignKey: 'kode_biayaAdmin' });
TarikSaldoNasabahs.belongsTo(Nasabah, { foreignKey: 'kode_nasabah' });
TarikSaldoNasabahs.belongsTo(Admins, { foreignKey: 'kode_admin' });

export default TarikSaldoNasabahs;
