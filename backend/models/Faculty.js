const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faculty = sequelize.define('Faculty', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(100), allowNull: false },
  employeeId: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  department: { type: DataTypes.STRING(100), allowNull: false },
  designation: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(20), allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: true },
  assignedSubjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  assignedClasses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  qualification: { type: DataTypes.STRING(200), allowNull: true },
  joinDate: { type: DataTypes.DATEONLY, allowNull: true },
}, {
  tableName: 'faculty',
  timestamps: true,
});

module.exports = Faculty;
