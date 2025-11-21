const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HealthRecord = sequelize.define('HealthRecord', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    symptoms: {
      type: DataTypes.TEXT,
    },
    vitals: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return HealthRecord;
};
