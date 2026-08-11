const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  admissionDate: { type: String },
  address: { type: String },
  guardianName: { type: String },
  guardianPhone: { type: String },
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
  enrolledCourses: [{ type: String }]
}, { timestamps: true });

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  assignedSubjects: [{ type: String }],
  assignedClasses: [{ type: String }],
  qualification: { type: String, required: true },
  joinDate: { type: String, required: true }
}, { timestamps: true });

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  facultyId: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  room: { type: String, required: true }
}, { timestamps: true });

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  subject: { type: String, required: true }
}, { timestamps: true });

const feeSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  type: { type: String, enum: ['tuition', 'exam', 'library', 'hostel', 'lab'], required: true },
  amount: { type: Number, required: true },
  paid: { type: Number, required: true },
  dueDate: { type: String, required: true },
  paidDate: { type: String },
  status: { type: String, enum: ['paid', 'partial', 'pending', 'overdue'], required: true },
  receiptNo: { type: String }
}, { timestamps: true });

const examScheduleSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  type: { type: String, enum: ['midterm', 'final', 'internal'], required: true }
}, { timestamps: true });

const examResultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  subject: { type: String, required: true },
  examType: { type: String, enum: ['midterm', 'final', 'internal'], required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String, required: true }
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  semester: { type: Number, required: true },
  teacher: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['general', 'academic', 'exam', 'event', 'urgent'], required: true },
  postedBy: { type: String, required: true },
  date: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  audience: { type: String, enum: ['all', 'students', 'faculty'], required: true }
}, { timestamps: true });

module.exports = {
  Student: mongoose.model('Student', studentSchema),
  Faculty: mongoose.model('Faculty', facultySchema),
  Timetable: mongoose.model('Timetable', timetableSchema),
  Attendance: mongoose.model('Attendance', attendanceSchema),
  Fee: mongoose.model('Fee', feeSchema),
  ExamSchedule: mongoose.model('ExamSchedule', examScheduleSchema),
  ExamResult: mongoose.model('ExamResult', examResultSchema),
  Course: mongoose.model('Course', courseSchema),
  Notice: mongoose.model('Notice', noticeSchema),
};
