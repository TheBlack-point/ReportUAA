import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/sequelize_connection';

const sequelize = sequelizeConnection.getSequelize();

interface ILocation extends Model {
  idLocation: number;
  building: string;
  classroom: string;
  type: string | null;
}

const Location = sequelize.define<ILocation>(
  'Location',
  {
    idLocation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    building: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    classroom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  { tableName: 'Location', timestamps: false }
);

export default Location;