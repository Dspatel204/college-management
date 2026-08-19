const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fee = sequelize.define('Fee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: { type: DataTypes.STRING(100), allowNull: false },
  type: {
    type: DataTypes.ENUM('tuition', 'exam', 'library', 'hostel', 'lab'),
    allowNull: false,
  },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paid: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  dueDate: { type: DataTypes.DATEONLY, allowNull: true },
  paidDate: { type: DataTypes.DATEONLY, allowNull: true },
  status: {
    type: DataTypes.ENUM('paid', 'partial', 'pending', 'overdue'),
    defaultValue: 'pending',
  },
  receiptNo: { type: DataTypes.STRING(50), allowNull: true },
  razorpayOrderId: { type: DataTypes.STRING, allowNull: true },
  razorpayPaymentId: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'fees',
  timestamps: true,
});

module.exports = Fee;
