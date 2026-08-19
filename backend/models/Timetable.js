const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  day: { type: DataTypes.STRING(20), allowNull: false },
  time: { type: DataTypes.STRING(30), allowNull: false },
  subject: { type: DataTypes.STRING(100), allowNull: false },
  facultyId: { type: DataTypes.STRING(100), allowNull: false },
  department: { type: DataTypes.STRING(100), allowNull: false },
  semester: { type: DataTypes.INTEGER, allowNull: false },
  room: { type: DataTypes.STRING(50), allowNull: false },
}, {
  tableName: 'timetable',
  timestamps: true,
});

module.exports = Timetable;
