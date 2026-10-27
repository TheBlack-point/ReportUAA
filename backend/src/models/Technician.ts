import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/sequelize_connection.ts';

const sequelize = sequelizeConnection.getSequelize();

interface ITechnician extends Model {
  idTechnician: number;
  fk_idUser: number;
  specialty: string;
}

const Technician = sequelize.define<ITechnician>(
  'Technician',
  {
    idTechnician: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    specialty: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { tableName: 'Technician', timestamps: false }
);

export default Technician;