import sequelize from '../config/sequelize_connection';
import User from './User';
import Reporter from './Reporter';
import Technician from './Technician';
import Area from './Area';
import Location from './Location';
import Report from './Report';
import PhotoEvidence from './PhotoEvidence';

//User 1:1 Reporter
User.hasOne(Reporter, { foreignKey: 'fk_idUser' });
Reporter.belongsTo(User, { foreignKey: 'fk_idUser' });

//User 1:1 Technician
User.hasOne(Technician, { foreignKey: 'fk_idUser' });
Technician.belongsTo(User, { foreignKey: 'fk_idUser' });

//Reporter 1:n Report
Reporter.hasMany(Report, { foreignKey: 'fk_idReporter', onDelete: 'RESTRICT' });
Report.belongsTo(Reporter, { foreignKey: 'fk_idReporter', onDelete: 'RESTRICT' });

//Technician 1:n Report (optional: a report may not have a technician)
Technician.hasMany(Report, { foreignKey: 'fk_idTechnician', onDelete: 'SET NULL' });
Report.belongsTo(Technician, { foreignKey: 'fk_idTechnician', onDelete: 'SET NULL' });

//Location 1:n Report
Location.hasMany(Report, { foreignKey: 'fk_idLocation', onDelete: 'RESTRICT' });
Report.belongsTo(Location, { foreignKey: 'fk_idLocation', onDelete: 'RESTRICT' });

//Area 1:n Report
Area.hasMany(Report, { foreignKey: 'fk_idArea', onDelete: 'RESTRICT' });
Report.belongsTo(Area, { foreignKey: 'fk_idArea', onDelete: 'RESTRICT' });

//Report 1:n PhotoEvidence (0 - 3 fotos)
Report.hasMany(PhotoEvidence, { foreignKey: 'fk_idReport', onDelete: 'CASCADE' });
PhotoEvidence.belongsTo(Report, { foreignKey: 'fk_idReport', onDelete: 'CASCADE' });



export { sequelize, User, Reporter, Technician, Area, Location, Report, PhotoEvidence };