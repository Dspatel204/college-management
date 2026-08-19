const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(100), allowNull: false },
  rollNo: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  department: { type: DataTypes.STRING(100), allowNull: false },
  semester: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(20), allowNull: false },
  avatar: { type: DataTypes.STRING, allowNull: true },
  admissionDate: { type: DataTypes.DATEONLY, allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  guardianName: { type: DataTypes.STRING(100), allowNull: true },
  guardianPhone: { type: DataTypes.STRING(20), allowNull: true },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'graduated'),
    defaultValue: 'active',
  },
  enrolledCourses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  tableName: 'students',
  timestamps: true,
});

module.exports = Student;
