import {BelongsTo, DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect";

interface KasAdminsAttributes {
  kode_kas_admin?: string,
  kode_setor_sampah?: string | null,
  kode_susut_sampah_bs?: number | null,
  kode_admin?: number | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface KasAdminsInput extends Optional<KasAdminsAttributes, 'kode_kas_admin'>{}
export interface KasAdminsOutput extends Required<KasAdminsAttributes>{}

class KasAdmins extends Model<KasAdminsAttributes, KasAdminsInput> implements KasAdminsAttributes{
  kode_kas_admin!: string;
  kode_setor_sampah!: string | null;
  kode_susut_sampah_bs!: number | null;
  kode_admin!: number | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  
}

KasAdmins.init({
  kode_kas_admin: {
    allowNull: false,
    unique:true,
    primaryKey: true,
    type: DataTypes.STRING
  },
   kode_setor_sampah: {
    type: DataTypes.STRING
  },
  kode_susut_sampah_bs: {
    type: DataTypes.INTEGER
  },
  kode_admin: {
    type: DataTypes.DOUBLE
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})

export default KasAdmins;