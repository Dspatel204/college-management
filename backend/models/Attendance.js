const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: { type: DataTypes.STRING(100), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  subject: { type: DataTypes.STRING(100), allowNull: false },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late'),
    allowNull: false,
  },
}, {
  tableName: 'attendance',
  timestamps: true,
});

module.exports = Attendance;
