const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExamSchedule = sequelize.define('ExamSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subject: { type: DataTypes.STRING(100), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING(20), allowNull: false },
  room: { type: DataTypes.STRING(50), allowNull: false },
  department: { type: DataTypes.STRING(100), allowNull: true },
  semester: { type: DataTypes.INTEGER, allowNull: true },
  type: {
    type: DataTypes.ENUM('midterm', 'final', 'internal'),
    defaultValue: 'internal',
  },
}, {
  tableName: 'exam_schedules',
  timestamps: true,
});

const ExamResult = sequelize.define('ExamResult', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: { type: DataTypes.STRING(100), allowNull: false },
  subject: { type: DataTypes.STRING(100), allowNull: false },
  examType: {
    type: DataTypes.ENUM('midterm', 'final', 'internal'),
    defaultValue: 'internal',
  },
  marksObtained: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  totalMarks: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  grade: { type: DataTypes.STRING(5), allowNull: true },
}, {
  tableName: 'exam_results',
  timestamps: true,
});

module.exports = { ExamSchedule, ExamResult };
