const sequelize = require('../config/database');
const User = require('./User');
const Student = require('./Student');
const Faculty = require('./Faculty');
const Fee = require('./Fee');
const Attendance = require('./Attendance');
const Course = require('./Course');
const Timetable = require('./Timetable');
const { ExamSchedule, ExamResult } = require('./Exam');

// ─── Sync all tables ──────────────────────────────────────────────────────────
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
    await sequelize.sync({ alter: true }); // alter=true safely updates columns
    console.log('All models synced');
  } catch (err) {
    console.error('Database sync failed:', err.message);
    throw err;
  }
};

module.exports = {
  sequelize,
  syncDatabase,
  User,
  Student,
  Faculty,
  Fee,
  Attendance,
  Course,
  Timetable,
  ExamSchedule,
  ExamResult,
};
