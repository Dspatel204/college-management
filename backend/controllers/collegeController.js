const {
  Student,
  Faculty,
  Timetable,
  Attendance,
  Fee,
  ExamSchedule,
  ExamResult,
  Course,
} = require('../models');

const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createStudent = async (req, res) => {
  try {
    if (!req.body.name || !req.body.rollNo || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const student = await Student.create({
      ...req.body,
      status: req.body.status || 'active'
    });
    res.status(201).json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const item = await Faculty.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Faculty not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createFaculty = async (req, res) => {
  try {
    if (!req.body.name || !req.body.employeeId || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const item = await Faculty.create({
      ...req.body,
      assignedSubjects: req.body.assignedSubjects || [],
      assignedClasses: req.body.assignedClasses || []
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const item = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Faculty not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const item = await Faculty.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Faculty not found' });
    res.json({ message: 'Faculty deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find();
    res.json(timetable);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createTimetableEntry = async (req, res) => {
  try {
    if (!req.body.day || !req.body.time || !req.body.subject || !req.body.facultyId || !req.body.room) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const entry = await Timetable.create(req.body);
    res.status(201).json(entry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Timetable entry not found' });
    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    let query = {};
    if (req.query.date) query.date = req.query.date;
    if (req.query.subject) query.subject = req.query.subject;
    const records = await Attendance.find(query);
    res.json(records);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const saveAttendance = async (req, res) => {
  try {
    const { date, subject, records = [] } = req.body;
    if (!date || !subject) {
      return res.status(400).json({ message: 'Date and subject are required' });
    }

    await Attendance.deleteMany({ date, subject });
    const nextRecords = records.map((record) => ({ ...record, date, subject }));
    await Attendance.insertMany(nextRecords);

    res.status(201).json(nextRecords);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createFee = async (req, res) => {
  try {
    if (!req.body.studentId || !req.body.amount) {
      return res.status(400).json({ message: 'Student and amount are required' });
    }

    const amount = Number(req.body.amount);
    const paid = Number(req.body.paid ?? amount);
    const fee = await Fee.create({
      studentId: req.body.studentId,
      type: req.body.type || 'tuition',
      amount,
      paid,
      dueDate: req.body.dueDate || new Date().toISOString().split('T')[0],
      paidDate: req.body.paidDate || new Date().toISOString().split('T')[0],
      status: req.body.status || (paid >= amount ? 'paid' : paid > 0 ? 'partial' : 'pending'),
      receiptNo: req.body.receiptNo || `REC-${Date.now().toString().slice(-6)}`
    });
    res.status(201).json(fee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!fee) return res.status(404).json({ message: 'Fee record not found' });
    res.json(fee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getExamSchedules = async (req, res) => {
  try {
    const schedules = await ExamSchedule.find();
    res.json(schedules);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createExamSchedule = async (req, res) => {
  try {
    if (!req.body.subject || !req.body.date || !req.body.time || !req.body.room) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const entry = await ExamSchedule.create({
      ...req.body,
      department: req.body.department || 'Computer Science',
      semester: Number(req.body.semester) || 4,
      type: req.body.type || 'midterm'
    });
    res.status(201).json(entry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createExamResult = async (req, res) => {
  try {
    const { studentId, subject, examType, marksObtained, totalMarks } = req.body;
    if (!studentId || !subject || !examType || marksObtained === undefined || totalMarks === undefined) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const obtained = Number(marksObtained);
    const total = Number(totalMarks);
    const result = await ExamResult.create({
      studentId,
      subject,
      examType,
      marksObtained: obtained,
      totalMarks: total,
      grade: calculateGrade((obtained / total) * 100),
    });

    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getExamResults = async (req, res) => {
  try {
    const { studentId, subject, examType, department, semester } = req.query;
    let query = {};

    if (studentId) query.studentId = studentId;
    if (subject) query.subject = subject;
    if (examType) query.examType = examType;

    let results = await ExamResult.find(query);

    if (department || semester) {
      const studentQuery = {};
      if (department) studentQuery.department = department;
      if (semester) studentQuery.semester = Number(semester);
      const students = await Student.find(studentQuery).select('_id');
      const studentIds = students.map((s) => s._id);
      results = results.filter((entry) => studentIds.includes(entry.studentId));
    }

    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateExamResult = async (req, res) => {
  try {
    const result = await ExamResult.findById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });

    const merged = { ...result.toObject(), ...req.body };
    if (req.body.marksObtained !== undefined || req.body.totalMarks !== undefined) {
      const obtained = Number(merged.marksObtained ?? result.marksObtained);
      const total = Number(merged.totalMarks ?? result.totalMarks);
      merged.marksObtained = obtained;
      merged.totalMarks = total;
      merged.grade = calculateGrade((obtained / total) * 100);
    }

    const updated = await ExamResult.findByIdAndUpdate(req.params.id, merged, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteExamResult = async (req, res) => {
  try {
    const result = await ExamResult.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json({ message: 'Result deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, code, department, credits, semester, teacher, description } = req.body;
    if (!name || !code || !department || !credits || !semester || !teacher || !description) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const course = await Course.create({
      name,
      code,
      department,
      credits: Number(credits),
      semester: Number(semester),
      teacher,
      description,
    });
    res.status(201).json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getReports = async (req, res) => {
  try {
    const { department } = req.query;
    const studentQuery = department ? { department } : {};
    const students = await Student.find(studentQuery);

    const studentIds = students.map((s) => s._id);
    const [attendance, fees] = await Promise.all([
      Attendance.find({ studentId: { $in: studentIds } }),
      Fee.find({ studentId: { $in: studentIds } }),
    ]);

    const studentReport = students.map((student) => {
      const studentAttendance = attendance.filter((a) => a.studentId.toString() === student._id.toString());
      const present = studentAttendance.filter((a) => a.status === 'present').length;
      const total = studentAttendance.length;
      const studentFees = fees.filter((f) => f.studentId.toString() === student._id.toString());
      const totalFee = studentFees.reduce((s, f) => s + Number(f.amount), 0);
      const paidFee = studentFees.reduce((s, f) => s + Number(f.paid), 0);

      return {
        id: student._id,
        name: student.name,
        rollNo: student.rollNo,
        department: student.department,
        semester: student.semester,
        email: student.email,
        phone: student.phone,
        avatar: student.avatar,
        admissionDate: student.admissionDate,
        address: student.address,
        guardianName: student.guardianName,
        guardianPhone: student.guardianPhone,
        status: student.status,
        enrolledCourses: student.enrolledCourses,
        attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
        totalClasses: total,
        presentClasses: present,
        totalFee,
        paidFee,
        feeStatus: paidFee >= totalFee ? 'paid' : paidFee > 0 ? 'partial' : 'pending',
      };
    });

    const allAttendance = await Attendance.find();
    const attendanceBySubject = {};
    allAttendance.forEach((a) => {
      if (!attendanceBySubject[a.subject]) {
        attendanceBySubject[a.subject] = { subject: a.subject, total: 0, present: 0, absent: 0, late: 0 };
      }
      attendanceBySubject[a.subject].total += 1;
      attendanceBySubject[a.subject][a.status] += 1;
    });
    const attendanceBySubjectList = Object.values(attendanceBySubject).map((item) => ({
      ...item,
      rate: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0,
    }));

    const allFees = await Fee.find();
    const feeByDept = {};
    allFees.forEach((f) => {
      const student = students.find((s) => s._id.toString() === f.studentId.toString());
      if (!student) return;
      const dept = student.department;
      if (!feeByDept[dept]) {
        feeByDept[dept] = { department: dept, total: 0, collected: 0, pending: 0 };
      }
      feeByDept[dept].total += Number(f.amount);
      feeByDept[dept].collected += Number(f.paid);
    });
    const feeByDeptList = Object.values(feeByDept).map((item) => ({
      ...item,
      pending: item.total - item.collected,
      rate: item.total > 0 ? Math.round((item.collected / item.total) * 100) : 0,
    }));

    const totalFees = allFees.reduce((s, f) => s + Number(f.amount), 0);
    const totalCollected = allFees.reduce((s, f) => s + Number(f.paid), 0);

    res.json({
      studentReport,
      attendanceBySubject: attendanceBySubjectList,
      feeByDept: feeByDeptList,
      totals: { totalFees, totalCollected },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
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
