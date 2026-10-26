import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/sequelize_connection';

const sequelize = sequelizeConnection.getSequelize();

interface IPhotoEvidence extends Model {
  idPhoto: number;
  filePath: string | null;
  uploadedDate: string;
  fk_idReport: number;
}

const PhotoEvidence = sequelize.define<IPhotoEvidence>(
  'PhotoEvidence',
  {
    idPhoto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    uploadedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fk_idReport: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'PhotoEvidence', timestamps: false }
);

// Rule: a report can have 0-3 photos
PhotoEvidence.beforeCreate(async (photo) => {
  const total = await PhotoEvidence.count({
    where: { fk_idReport: photo.fk_idReport },
  });
  if (total >= 3) {
    throw new Error('Un reporte no puede tener más de 3 fotos.');
  }
});

export default PhotoEvidence;