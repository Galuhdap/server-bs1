import { BelongsTo, DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/dbConnect";

interface UsersAttributes {
  kode_reg?: string;
  password?: string | null;
  refresh_token?: string | null;
  role?: string | null;

  createdAt?: Date;
  updateAt?: Date;
}

export interface UsersInput extends Optional<UsersAttributes, "kode_reg"> {}
export interface UsersOutput extends Required<UsersAttributes> {}

class Users
  extends Model<UsersAttributes, UsersInput>
  implements UsersAttributes
{
  kode_reg!: string;
  password!: string | null;
  refresh_token!: string | null;
  role!: string | null;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

}

Users.init(
  {
    kode_reg: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default Users;
