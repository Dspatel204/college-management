const { Op } = require('sequelize');
const {
  Student, Faculty, Timetable, Attendance,
  Fee, ExamSchedule, ExamResult, Course,
} = require('../models');

// ─── Grade helper ─────────────────────────────────────────────────────────────
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENTS
// ═══════════════════════════════════════════════════════════════════════════════

const getStudents = async (req, res) => {
  try {
    const { department, semester, status, search } = req.query;
    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester);
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { rollNo: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }
    const students = await Student.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(students);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, rollNo, email, phone } = req.body;
    if (!name || !rollNo || !email || !phone) {
      return res.status(400).json({ message: 'Required fields: name, rollNo, email, phone' });
    }
    const student = await Student.create({ ...req.body, status: req.body.status || 'active' });
    res.status(201).json(student);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Roll number or email already exists' });
    }
    res.status(500).json({ message: e.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await student.update(req.body);
    res.json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FACULTY
// ═══════════════════════════════════════════════════════════════════════════════

const getFaculty = async (req, res) => {
  try {
    const { department, search } = req.query;
    const where = {};
    if (department) where.department = department;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { employeeId: { [Op.iLike]: `%${search}%` } },
      ];
    }
    const faculty = await Faculty.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(faculty);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { name, employeeId, department, designation, email, phone } = req.body;
    if (!name || !employeeId || !department || !designation || !email || !phone) {
      return res.status(400).json({ message: 'Required fields: name, employeeId, department, designation, email, phone' });
    }
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Employee ID or email already exists' });
    }
    res.status(500).json({ message: e.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    await faculty.update(req.body);
    res.json(faculty);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    await faculty.destroy();
    res.json({ message: 'Faculty deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TIMETABLE
// ═══════════════════════════════════════════════════════════════════════════════

const getTimetable = async (req, res) => {
  try {
    const { department, semester } = req.query;
    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester);
    const entries = await Timetable.findAll({ where, order: [['day', 'ASC'], ['time', 'ASC']] });
    res.json(entries);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.create(req.body);
    res.status(201).json(entry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Timetable entry not found' });
    await entry.destroy();
    res.json({ message: 'Entry deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ATTENDANCE
// ═══════════════════════════════════════════════════════════════════════════════

const getAttendance = async (req, res) => {
  try {
    const { date, subject, studentId } = req.query;
    const where = {};
    if (date) where.date = date;
    if (subject) where.subject = subject;
    if (studentId) where.studentId = studentId;
    const records = await Attendance.findAll({ where, order: [['date', 'DESC']] });
    res.json(records);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const saveAttendance = async (req, res) => {
  try {
    const { date, subject, records } = req.body;
    if (!date || !subject || !Array.isArray(records)) {
      return res.status(400).json({ message: 'date, subject, and records[] are required' });
    }
    // Upsert attendance for each student
    const saved = await Promise.all(
      records.map(({ studentId, status }) =>
        Attendance.upsert({ studentId, date, subject, status })
      )
    );
    res.json({ message: `Attendance saved for ${saved.length} students`, count: saved.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FEES
// ═══════════════════════════════════════════════════════════════════════════════

const getFees = async (req, res) => {
  try {
    const { studentId, status } = req.query;
    const where = {};
    if (studentId) where.studentId = studentId;
    if (status) where.status = status;
    const fees = await Fee.findAll({ where, order: [['dueDate', 'ASC']] });
    res.json(fees);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createFee = async (req, res) => {
  try {
    const { studentId, type, amount } = req.body;
    if (!studentId || !type || !amount) {
      return res.status(400).json({ message: 'Required fields: studentId, type, amount' });
    }
    const fee = await Fee.create({ ...req.body, status: req.body.status || 'pending' });
    res.status(201).json(fee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByPk(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee record not found' });
    await fee.update(req.body);
    res.json(fee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXAM SCHEDULES
// ═══════════════════════════════════════════════════════════════════════════════

const getExamSchedules = async (req, res) => {
  try {
    const { department, semester, type } = req.query;
    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester);
    if (type) where.type = type;
    const exams = await ExamSchedule.findAll({ where, order: [['date', 'ASC']] });
    res.json(exams);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createExamSchedule = async (req, res) => {
  try {
    const { subject, date, time, room } = req.body;
    if (!subject || !date || !time || !room) {
      return res.status(400).json({ message: 'Required fields: subject, date, time, room' });
    }
    const exam = await ExamSchedule.create(req.body);
    res.status(201).json(exam);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXAM RESULTS
// ═══════════════════════════════════════════════════════════════════════════════

const getExamResults = async (req, res) => {
  try {
    const { studentId, subject, examType, department, semester } = req.query;
    const where = {};
    if (studentId) where.studentId = studentId;
    if (subject) where.subject = subject;
    if (examType) where.examType = examType;
    const results = await ExamResult.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createExamResult = async (req, res) => {
  try {
    const { studentId, subject, marksObtained, totalMarks } = req.body;
    if (!studentId || !subject || marksObtained == null || !totalMarks) {
      return res.status(400).json({ message: 'Required fields: studentId, subject, marksObtained, totalMarks' });
    }
    const percentage = (marksObtained / totalMarks) * 100;
    const grade = calculateGrade(percentage);
    const result = await ExamResult.create({ ...req.body, grade });
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateExamResult = async (req, res) => {
  try {
    const result = await ExamResult.findByPk(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    if (req.body.marksObtained != null && req.body.totalMarks) {
      const pct = (req.body.marksObtained / req.body.totalMarks) * 100;
      req.body.grade = calculateGrade(pct);
    }
    await result.update(req.body);
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteExamResult = async (req, res) => {
  try {
    const result = await ExamResult.findByPk(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    await result.destroy();
    res.json({ message: 'Result deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COURSES
// ═══════════════════════════════════════════════════════════════════════════════

const getCourses = async (req, res) => {
  try {
    const { department, semester } = req.query;
    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester);
    const courses = await Course.findAll({ where, order: [['code', 'ASC']] });
    res.json(courses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, code, department } = req.body;
    if (!name || !code || !department) {
      return res.status(400).json({ message: 'Required fields: name, code, department' });
    }
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Course code already exists' });
    }
    res.status(500).json({ message: e.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.update(req.body);
    res.json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.destroy();
    res.json({ message: 'Course deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// REPORTS
// ═══════════════════════════════════════════════════════════════════════════════

const getReports = async (req, res) => {
  try {
    const { department } = req.query;
    const studentWhere = department ? { department } : {};

    const students = await Student.findAll({ where: studentWhere });
    const allAttendance = await Attendance.findAll();
    const allFees = await Fee.findAll();

    // Build student report
    const studentReport = students.map((s) => {
      const attRecords = allAttendance.filter((a) => a.studentId === s.id);
      const feeRecords = allFees.filter((f) => f.studentId === s.id);
      const totalFee = feeRecords.reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);
      const paidFee = feeRecords.reduce((sum, f) => sum + parseFloat(f.paid || 0), 0);
      const presentClasses = attRecords.filter((a) => a.status === 'present').length;
      const totalClasses = attRecords.length;
      return {
        ...s.toJSON(),
        attendanceRate: totalClasses ? Math.round((presentClasses / totalClasses) * 100) : 0,
        totalClasses,
        presentClasses,
        totalFee,
        paidFee,
        feeStatus: paidFee >= totalFee && totalFee > 0 ? 'paid' : paidFee > 0 ? 'partial' : 'pending',
      };
    });

    // Attendance by subject
    const subjectMap = {};
    allAttendance.forEach((a) => {
      if (!subjectMap[a.subject]) subjectMap[a.subject] = { subject: a.subject, total: 0, present: 0, absent: 0, late: 0 };
      subjectMap[a.subject].total++;
      subjectMap[a.subject][a.status]++;
    });
    const attendanceBySubject = Object.values(subjectMap).map((s) => ({
      ...s,
      rate: s.total ? Math.round((s.present / s.total) * 100) : 0,
    }));

    // Fee by department
    const deptFeeMap = {};
    for (const s of students) {
      if (!deptFeeMap[s.department]) {
        deptFeeMap[s.department] = { department: s.department, total: 0, collected: 0 };
      }
      const feeRecords = allFees.filter((f) => f.studentId === s.id);
      deptFeeMap[s.department].total += feeRecords.reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);
      deptFeeMap[s.department].collected += feeRecords.reduce((sum, f) => sum + parseFloat(f.paid || 0), 0);
    }
    const feeByDept = Object.values(deptFeeMap).map((d) => ({
      ...d,
      pending: d.total - d.collected,
      rate: d.total ? Math.round((d.collected / d.total) * 100) : 0,
    }));

    const totalFees = allFees.reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);
    const totalCollected = allFees.reduce((sum, f) => sum + parseFloat(f.paid || 0), 0);

    res.json({ studentReport, attendanceBySubject, feeByDept, totals: { totalFees, totalCollected } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getStudents, getStudentById, createStudent, updateStudent, deleteStudent,
  getFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty,
  getTimetable, createTimetableEntry, deleteTimetableEntry,
  getAttendance, saveAttendance,
  getFees, createFee, updateFee,
  getExamSchedules, createExamSchedule,
  getExamResults, createExamResult, updateExamResult, deleteExamResult,
  getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
  getReports,
};
