const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(150), allowNull: false },
  code: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  department: { type: DataTypes.STRING(100), allowNull: false },
  credits: { type: DataTypes.INTEGER, defaultValue: 3 },
  semester: { type: DataTypes.INTEGER, allowNull: true },
  teacher: { type: DataTypes.STRING(100), allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;
