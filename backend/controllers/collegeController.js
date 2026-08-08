const {
  students,
  faculty,
  timetable,
  attendance,
  fees,
  examSchedules,
  examResults,
  courses,
  SUBJECTS,
  DEPARTMENTS
} = require('../models/collegeData');

let studentStore = [...students];
let facultyStore = [...faculty];
let timetableStore = [...timetable];
let attendanceStore = [...attendance];
let feeStore = [...fees];
let examScheduleStore = [...examSchedules];
let examResultStore = [...examResults];
let courseStore = [...courses];

const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

const getStudents = (req, res) => {
  res.json(studentStore);
};

const getStudentById = (req, res) => {
  const student = studentStore.find((item) => item.id === req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

const createStudent = (req, res) => {
  if (!req.body.name || !req.body.rollNo || !req.body.email || !req.body.phone) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const student = {
    id: `s${Date.now()}`,
    ...req.body,
    status: req.body.status || 'active'
  };

  studentStore.push(student);
  res.status(201).json(student);
};

const updateStudent = (req, res) => {
  const index = studentStore.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  studentStore[index] = { ...studentStore[index], ...req.body };
  res.json(studentStore[index]);
};

const deleteStudent = (req, res) => {
  const index = studentStore.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  studentStore.splice(index, 1);
  res.json({ message: 'Student deleted successfully' });
};

const getFaculty = (req, res) => {
  res.json(facultyStore);
};

const getFacultyById = (req, res) => {
  const item = facultyStore.find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Faculty not found' });
  res.json(item);
};

const createFaculty = (req, res) => {
  if (!req.body.name || !req.body.employeeId || !req.body.email || !req.body.phone) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const item = {
    id: `f${Date.now()}`,
    ...req.body,
    assignedSubjects: req.body.assignedSubjects || [],
    assignedClasses: req.body.assignedClasses || []
  };

  facultyStore.push(item);
  res.status(201).json(item);
};

const updateFaculty = (req, res) => {
  const index = facultyStore.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Faculty not found' });

  facultyStore[index] = { ...facultyStore[index], ...req.body };
  res.json(facultyStore[index]);
};

const deleteFaculty = (req, res) => {
  const index = facultyStore.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Faculty not found' });

  facultyStore.splice(index, 1);
  res.json({ message: 'Faculty deleted successfully' });
};

const getTimetable = (req, res) => {
  res.json(timetableStore);
};

const createTimetableEntry = (req, res) => {
  if (!req.body.day || !req.body.time || !req.body.subject || !req.body.facultyId || !req.body.room) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const entry = {
    id: `tt${Date.now()}`,
    ...req.body
  };

  timetableStore.push(entry);
  res.status(201).json(entry);
};

const deleteTimetableEntry = (req, res) => {
  const index = timetableStore.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Timetable entry not found' });

  timetableStore.splice(index, 1);
  res.json({ message: 'Timetable entry deleted successfully' });
};

const getAttendance = (req, res) => {
  const { date, subject } = req.query;
  let result = attendanceStore;

  if (date) result = result.filter((entry) => entry.date === date);
  if (subject) result = result.filter((entry) => entry.subject === subject);

  res.json(result);
};

const saveAttendance = (req, res) => {
  const { date, subject, records = [] } = req.body;
  if (!date || !subject) {
    return res.status(400).json({ message: 'Date and subject are required' });
  }

  attendanceStore = attendanceStore.filter((entry) => !(entry.date === date && entry.subject === subject));
  const nextRecords = records.map((record) => ({ ...record, date, subject }));
  attendanceStore = [...attendanceStore, ...nextRecords];

  res.status(201).json(nextRecords);
};

const getFees = (req, res) => {
  res.json(feeStore);
};

const createFee = (req, res) => {
  if (!req.body.studentId || !req.body.amount) {
    return res.status(400).json({ message: 'Student and amount are required' });
  }

  const amount = Number(req.body.amount);
  const paid = Number(req.body.paid ?? amount);
  const fee = {
    id: `f${Date.now()}`,
    studentId: req.body.studentId,
    type: req.body.type || 'tuition',
    amount,
    paid,
    dueDate: req.body.dueDate || new Date().toISOString().split('T')[0],
    paidDate: req.body.paidDate || new Date().toISOString().split('T')[0],
    status: req.body.status || (paid >= amount ? 'paid' : paid > 0 ? 'partial' : 'pending'),
    receiptNo: req.body.receiptNo || `REC-${Date.now().toString().slice(-6)}`
  };

  feeStore.push(fee);
  res.status(201).json(fee);
};

const updateFee = (req, res) => {
  const index = feeStore.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Fee record not found' });

  feeStore[index] = { ...feeStore[index], ...req.body };
  res.json(feeStore[index]);
};

const getExamSchedules = (req, res) => {
  res.json(examScheduleStore);
};

const createExamSchedule = (req, res) => {
  if (!req.body.subject || !req.body.date || !req.body.time || !req.body.room) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  const entry = {
    id: `e${Date.now()}`,
    department: 'Computer Science',
    semester: 4,
    type: 'midterm',
    ...req.body
  };

  examScheduleStore.push(entry);
  res.status(201).json(entry);
};

const getExamResults = (req, res) => {
  const { studentId, subject, examType, department, semester } = req.query;
  let result = [...examResultStore];

  if (studentId) result = result.filter((entry) => entry.studentId === studentId);
  if (subject) result = result.filter((entry) => entry.subject === subject);
  if (examType) result = result.filter((entry) => entry.examType === examType);

  if (department || semester) {
    const studentIds = (department || semester)
      ? studentStore
          .filter((s) => {
            const matchDept = !department || s.department === department;
            const matchSem = !semester || s.semester === Number(semester);
            return matchDept && matchSem;
          })
          .map((s) => s.id)
      : studentStore.map((s) => s.id);
    result = result.filter((entry) => studentIds.includes(entry.studentId));
  }

  res.json(result);
};

const updateExamResult = (req, res) => {
  const index = examResultStore.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Result not found' });

  const existing = examResultStore[index];
  const merged = { ...existing, ...req.body };
  if (req.body.marksObtained !== undefined || req.body.totalMarks !== undefined) {
    const obtained = Number(merged.marksObtained ?? existing.marksObtained);
    const total = Number(merged.totalMarks ?? existing.totalMarks);
    merged.marksObtained = obtained;
    merged.totalMarks = total;
    merged.grade = calculateGrade((obtained / total) * 100);
  }
  examResultStore[index] = merged;
  res.json(examResultStore[index]);
};

const deleteExamResult = (req, res) => {
  const index = examResultStore.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Result not found' });

  examResultStore.splice(index, 1);
  res.json({ message: 'Result deleted successfully' });
};

const getReports = (req, res) => {
  const { department } = req.query;
  const students = department ? studentStore.filter((s) => s.department === department) : [...studentStore];

  const studentReport = students.map((student) => {
    const attendance = attendanceStore.filter((a) => a.studentId === student.id);
    const present = attendance.filter((a) => a.status === 'present').length;
    const total = attendance.length;
    const fees = feeStore.filter((f) => f.studentId === student.id);
    const totalFee = fees.reduce((s, f) => s + Number(f.amount), 0);
    const paidFee = fees.reduce((s, f) => s + Number(f.paid), 0);
    return {
      ...student,
      attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
      totalClasses: total,
      presentClasses: present,
      totalFee,
      paidFee,
      feeStatus: paidFee >= totalFee ? 'paid' : paidFee > 0 ? 'partial' : 'pending',
    };
  });

  const attendanceBySubject = SUBJECTS.map((subject) => {
    const records = attendanceStore.filter((a) => a.subject === subject);
    const present = records.filter((a) => a.status === 'present').length;
    const absent = records.filter((a) => a.status === 'absent').length;
    const late = records.filter((a) => a.status === 'late').length;
    return {
      subject,
      total: records.length,
      present,
      absent,
      late,
      rate: records.length > 0 ? Math.round((present / records.length) * 100) : 0,
    };
  });

  const feeByDept = DEPARTMENTS.map((dept) => {
    const deptStudents = studentStore.filter((s) => s.department === dept).map((s) => s.id);
    const fees = feeStore.filter((f) => deptStudents.includes(f.studentId));
    const total = fees.reduce((s, f) => s + Number(f.amount), 0);
    const collected = fees.reduce((s, f) => s + Number(f.paid), 0);
    return {
      department: dept,
      total,
      collected,
      pending: total - collected,
      rate: total > 0 ? Math.round((collected / total) * 100) : 0,
    };
  });

  const totalFees = feeStore.reduce((s, f) => s + Number(f.amount), 0);
  const totalCollected = feeStore.reduce((s, f) => s + Number(f.paid), 0);

  res.json({
    studentReport,
    attendanceBySubject,
    feeByDept,
    totals: { totalFees, totalCollected },
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getTimetable,
  createTimetableEntry,
  deleteTimetableEntry,
  getAttendance,
  saveAttendance,
  getFees,
  createFee,
  updateFee,
  getExamSchedules,
  createExamSchedule,
  getExamResults,
  createExamResult,
  updateExamResult,
  deleteExamResult,
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getReports
};
