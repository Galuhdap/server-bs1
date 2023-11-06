import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import Biayaadmins from "./Biayaadmin";
import SuperAdmins from "./SuperAdmin";
import Admins from "./Admin";

interface TarikSaldoAdminsAttributes {
  kode_tariksaldo?: string | null;
  nomor_invoice?: string | null;
  jumlah_penarikan?: number | null;
  saldo_akhir?: number | null;
  status?: boolean | null;
  kode_super_admin?: string | null;
  kode_admin?: string | null;
  kode_biayaAdmin?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface TarikSaldoAdminsInput
  extends Optional<TarikSaldoAdminsAttributes, "kode_tariksaldo"> {}
export interface TarikSaldoAdminsOutput
  extends Required<TarikSaldoAdminsAttributes> {}

class TarikSaldoAdmins
  extends Model<TarikSaldoAdminsAttributes, TarikSaldoAdminsInput>
  implements TarikSaldoAdminsAttributes
{
  kode_tariksaldo!: string | null;
  nomor_invoice!: string | null;
  jumlah_penarikan!: number | null;
  saldo_akhir!: number | null;
  status!: boolean | null;
  kode_super_admin!: string | null;
  kode_admin!: string | null;
  kode_biayaAdmin!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

TarikSaldoAdmins.init(
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
    kode_super_admin: {
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

TarikSaldoAdmins.belongsTo(Biayaadmins, { foreignKey: 'kode_biayaAdmin' });
TarikSaldoAdmins.belongsTo(SuperAdmins, { foreignKey: 'kode_super_admin' });
TarikSaldoAdmins.belongsTo(Admins, { foreignKey: 'kode_admin' });

export default TarikSaldoAdmins;
