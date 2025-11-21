const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize);
const HealthRecord = require('./healthRecord')(sequelize);
const Appointment = require('./appointment')(sequelize);
const Prescription = require('./prescription')(sequelize);

// Associations
User.hasMany(HealthRecord, { foreignKey: 'userId' });
HealthRecord.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'patientId', as: 'patientAppointments' });
User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'doctorAppointments' });
Appointment.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

User.hasMany(Prescription, { foreignKey: 'doctorId', as: 'givenPrescriptions' });
User.hasMany(Prescription, { foreignKey: 'patientId', as: 'receivedPrescriptions' });

module.exports = { sequelize, User, HealthRecord, Appointment, Prescription };
