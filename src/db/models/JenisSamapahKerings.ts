import { BelongsTo, DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";
import JenisBarang from "./JenisBarang";

interface JenisSampahKeringsAttributes {
  kode_sampah?: string;
  jenis_sampah?: string | null;
  kode_super_induk?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface JenisSampahKeringsInput
  extends Optional<JenisSampahKeringsAttributes, "kode_sampah"> {}
export interface JenisSampahKeringsOutput
  extends Required<JenisSampahKeringsAttributes> {}

class JenisSampahKerings
  extends Model<JenisSampahKeringsAttributes, JenisSampahKeringsInput>
  implements JenisSampahKeringsAttributes
{
  kode_sampah!: string;
  jenis_sampah!: string | null;
  kode_super_induk!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

JenisSampahKerings.init(
  {
    kode_sampah: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    jenis_sampah: {
      type: DataTypes.STRING,
    },
    kode_super_induk: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);
JenisSampahKerings.hasMany(JenisBarang, { foreignKey: 'kode_sampah' });

export default JenisSampahKerings;
