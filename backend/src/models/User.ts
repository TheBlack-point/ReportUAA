import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/sequelize_connection';

const sequelize = sequelizeConnection.getSequelize();

interface IUser extends Model {
  idUser: number;
  name: string;
  email: string;
}

const User = sequelize.define<IUser>(
  'User',
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
  },
  { tableName: 'User', timestamps: false }
);

export default User;