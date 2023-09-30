import {BelongsTo, DataTypes , Model , Optional} from 'sequelize';

import connection from "../../config/dbConnect";

interface JenisBarangAttributes {
  kode_barang?: string,
  jenis_barang?: string | null,
  satuan?: number | null,
  harga_pertama?: number | null,
  harga_kedua?: number | null,

  createdAt?: Date,
  updateAt?: Date
}

export interface JenisBarangInput extends Optional<JenisBarangAttributes, 'kode_barang'>{}
export interface JenisBarangOutput extends Required<JenisBarangAttributes>{}

class JenisBarang extends Model<JenisBarangAttributes, JenisBarangInput> implements JenisBarangAttributes{
  kode_barang!: string;
  jenis_barang!: string | null;
  satuan!: number | null;
  harga_pertama!: number | null;
  harga_kedua!: number | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
  
}

JenisBarang.init({
  kode_barang: {
    allowNull: false,
    unique:true,
    primaryKey: true,
    type: DataTypes.STRING
  },
  jenis_barang: {
    type: DataTypes.STRING
  },
  satuan: {
    type: DataTypes.INTEGER
  },
  harga_pertama: {
    type: DataTypes.DOUBLE
  },
  harga_kedua: {
    type: DataTypes.DOUBLE
  },
},{
  timestamps: true,
  sequelize: connection,
  underscored:false,
})

export default JenisBarang;