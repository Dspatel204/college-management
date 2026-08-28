const sequelize = require('../config/database');
const User = require('./User');
const Student = require('./Student');
const Faculty = require('./Faculty');
const Fee = require('./Fee');
const Attendance = require('./Attendance');
const Course = require('./Course');
const Timetable = require('./Timetable');
const { ExamSchedule, ExamResult } = require('./Exam');

// ─── Sync all tables with retry ─────────────────────────────────────────────
const syncDatabase = async (retries = 5, delay = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sequelize.authenticate();
      console.log('✅ PostgreSQL connected successfully');
      await sequelize.sync({ alter: true }); // alter=true safely updates columns
      console.log('✅ All database models synced');
      return true;
    } catch (err) {
      console.error(`⚠️ Database sync attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt === retries) {
        console.error('❌ Could not connect to PostgreSQL after multiple attempts.');
        throw err;
      }
      console.log(`Waiting ${delay / 1000}s before retrying database connection...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
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
