import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize_connection';

interface IReporter extends Model {
  idReporter: number;
  fk_idUser: number;
}

const Reporter = sequelize.define<IReporter>(
  'Reporter',
  {
    idReporter: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: 'Reporter', timestamps: false }
);

export default Reporter;