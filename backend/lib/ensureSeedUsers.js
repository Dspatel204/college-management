const bcrypt = require('bcryptjs');
const {
  User, Student, Faculty, Course,
  Timetable, Attendance, Fee, ExamSchedule, ExamResult
} = require('../models');
const collegeData = require('../models/collegeData');

const SEED_USERS = [
  {
    name: 'Dr. Sharma',
    email: 'admin@college.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Prof. Gupta',
    email: 'teacher@college.com',
    password: 'teacher123',
    role: 'teacher',
  },
  {
    name: 'Rahul Kumar',
    email: 'student@college.com',
    password: 'student123',
    role: 'student',
  },
];

async function ensureSeedUsers() {
  try {
    for (const u of SEED_USERS) {
      const existing = await User.findOne({ where: { email: u.email } });
      if (!existing) {
        const hashed = await bcrypt.hash(u.password, 12);
        await User.create({ ...u, password: hashed });
        console.log(`✅ Seeded demo user: [${u.role}] ${u.email}`);
      }
    }

    // Seed courses if table is empty
    const courseCount = await Course.count();
    if (courseCount === 0 && collegeData.courses?.length) {
      for (const c of collegeData.courses) {
        await Course.create({
          name: c.name,
          code: c.code,
          department: c.department,
          credits: c.credits,
          semester: c.semester,
          teacher: c.teacher,
          description: c.description,
        }).catch(() => {});
      }
      console.log('✅ Seeded initial courses');
    }

    // Seed faculty if table is empty
    const facultyCount = await Faculty.count();
    if (facultyCount === 0 && collegeData.faculty?.length) {
      for (const f of collegeData.faculty) {
        await Faculty.create({
          name: f.name,
          employeeId: f.employeeId,
          department: f.department,
          designation: f.designation,
          email: f.email,
          phone: f.phone,
          avatar: f.avatar,
          assignedSubjects: f.assignedSubjects,
          assignedClasses: f.assignedClasses,
          qualification: f.qualification,
          joinDate: f.joinDate,
        }).catch(() => {});
      }
      console.log('✅ Seeded initial faculty members');
    }

    // Seed students if table is empty
    const studentCount = await Student.count();
    if (studentCount === 0 && collegeData.students?.length) {
      for (const s of collegeData.students) {
        await Student.create({
          name: s.name,
          rollNo: s.rollNo,
          department: s.department,
          semester: s.semester,
          email: s.email,
          phone: s.phone,
          avatar: s.avatar,
          admissionDate: s.admissionDate,
          address: s.address,
          guardianName: s.guardianName,
          guardianPhone: s.guardianPhone,
          status: s.status || 'active',
          enrolledCourses: s.enrolledCourses || [],
        }).catch(() => {});
      }
      console.log('✅ Seeded initial student records');
    }

    // Seed timetable if empty
    const timetableCount = await Timetable.count();
    if (timetableCount === 0 && collegeData.timetable?.length) {
      for (const t of collegeData.timetable) {
        await Timetable.create({
          day: t.day,
          time: t.time,
          subject: t.subject,
          facultyId: t.facultyId,
          department: t.department,
          semester: t.semester,
          room: t.room,
        }).catch(() => {});
      }
      console.log('✅ Seeded initial timetable entries');
    }

    // Seed attendance if empty
    const attendanceCount = await Attendance.count();
    if (attendanceCount === 0 && collegeData.attendance?.length) {
      for (const a of collegeData.attendance) {
        await Attendance.create({
          studentId: a.studentId,
          date: a.date,
          subject: a.subject,
          status: a.status,
        }).catch(() => {});
      }
      console.log('✅ Seeded initial attendance records');
    }

    // Seed fees if empty
    const feeCount = await Fee.count();
    if (feeCount === 0 && collegeData.fees?.length) {
      for (const f of collegeData.fees) {
        await Fee.create({
          studentId: f.studentId,
          type: f.type,
          amount: f.amount,
          paid: f.paid || 0,
          dueDate: f.dueDate,
          paidDate: f.paidDate,
          status: f.status || 'pending',
          receiptNo: f.receiptNo,
        }).catch(() => {});
      }
      console.log('✅ Seeded initial fee records');
    }

    // Seed exam schedules if empty
    const examCount = await ExamSchedule.count();
    if (examCount === 0 && collegeData.examSchedules?.length) {
      for (const e of collegeData.examSchedules) {
        await ExamSchedule.create({
          subject: e.subject,
          date: e.date,
          time: e.time,
          room: e.room,
          department: e.department,
          semester: e.semester,
          type: e.type || 'internal',
        }).catch(() => {});
      }
      console.log('✅ Seeded initial exam schedules');
    }

    // Seed exam results if empty
    const resultCount = await ExamResult.count();
    if (resultCount === 0 && collegeData.examResults?.length) {
      for (const r of collegeData.examResults) {
        await ExamResult.create({
          studentId: r.studentId,
          subject: r.subject,
          examType: r.examType || 'internal',
          marksObtained: r.marksObtained,
          totalMarks: r.totalMarks,
          grade: r.grade,
        }).catch(() => {});
      }
      console.log('✅ Seeded initial exam results');
    }
  } catch (err) {
    console.warn('⚠️ Seed data notice:', err.message);
  }
}

module.exports = { ensureSeedUsers, SEED_USERS };

