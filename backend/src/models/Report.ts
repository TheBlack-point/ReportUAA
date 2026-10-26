import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/sequelize_connection';

const sequelize = sequelizeConnection.getSequelize();

interface IReport extends Model {
  idReport: number;
  dateCreated: string;
  elementCode: string;
  description: string;
  issueType: string;
  priority: number;
  status: 'Pendiente' | 'En Proceso' | 'Resuelto';
  inspectionVisit: boolean;
  notes: string | null;
  fk_idReporter: number;
  fk_idLocation: number;
  fk_idArea: number;
  fk_idTechnician: number | null;
}

const Report = sequelize.define<IReport>(
  'Report',
  {
    idReport: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    elementCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    issueType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Resuelto'),
      allowNull: false,
      defaultValue: 'Pendiente',
    },
    inspectionVisit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fk_idReporter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_idLocation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_idArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_idTechnician: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { tableName: 'Report', timestamps: false }
);

export default Report;