import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/sequelize_connection.ts';

const sequelize = sequelizeConnection.getSequelize();

interface IArea extends Model {
  idArea: number;
  name: string;
}

const Area = sequelize.define<IArea>(
  'Area',
  {
    idArea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  { tableName: 'Area', timestamps: false }
);

export default Area;