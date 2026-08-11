const { mongoConnected } = require('../server');
const { Student, Faculty, Timetable, Attendance, Fee, ExamSchedule, ExamResult, Course } = require('../models');
const { readJsonFile, writeJsonFile } = require('../data-store');

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
    if (mongoConnected) {
      const students = await Student.find();
      res.json(students);
    } else {
      const students = readJsonFile('students.json', []);
      res.json(students);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    if (mongoConnected) {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json(student);
    } else {
      const students = readJsonFile('students.json', []);
      const student = students.find((item) => item.id === req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json(student);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createStudent = async (req, res) => {
  try {
    if (!req.body.name || !req.body.rollNo || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (mongoConnected) {
      const student = await Student.create({
        ...req.body,
        status: req.body.status || 'active'
      });
      res.status(201).json(student);
    } else {
      const students = readJsonFile('students.json', []);
      const student = {
        id: `s${Date.now()}`,
        ...req.body,
        status: req.body.status || 'active'
      };
      students.push(student);
      writeJsonFile('students.json', students);
      res.status(201).json(student);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    if (mongoConnected) {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json(student);
    } else {
      const students = readJsonFile('students.json', []);
      const index = students.findIndex((item) => item.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Student not found' });
      students[index] = { ...students[index], ...req.body };
      writeJsonFile('students.json', students);
      res.json(students[index]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    if (mongoConnected) {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json({ message: 'Student deleted successfully' });
    } else {
      const students = readJsonFile('students.json', []);
      const index = students.findIndex((item) => item.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Student not found' });
      students.splice(index, 1);
      writeJsonFile('students.json', students);
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFaculty = async (req, res) => {
  try {
    if (mongoConnected) {
      const faculty = await Faculty.find();
      res.json(faculty);
    } else {
      const faculty = readJsonFile('faculty.json', []);
      res.json(faculty);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    if (mongoConnected) {
      const item = await Faculty.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Faculty not found' });
      res.json(item);
    } else {
      const faculty = readJsonFile('faculty.json', []);
      const item = faculty.find((entry) => entry.id === req.params.id);
      if (!item) return res.status(404).json({ message: 'Faculty not found' });
      res.json(item);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createFaculty = async (req, res) => {
  try {
    if (!req.body.name || !req.body.employeeId || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (mongoConnected) {
      const item = await Faculty.create({
        ...req.body,
        assignedSubjects: req.body.assignedSubjects || [],
        assignedClasses: req.body.assignedClasses || []
      });
      res.status(201).json(item);
    } else {
      const faculty = readJsonFile('faculty.json', []);
      const item = {
        id: `f${Date.now()}`,
        ...req.body,
        assignedSubjects: req.body.assignedSubjects || [],
        assignedClasses: req.body.assignedClasses || []
      };
      faculty.push(item);
      writeJsonFile('faculty.json', faculty);
      res.status(201).json(item);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    if (mongoConnected) {
      const item = await Faculty.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: 'Faculty not found' });
      res.json(item);
    } else {
      const faculty = readJsonFile('faculty.json', []);
      const index = faculty.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Faculty not found' });
      faculty[index] = { ...faculty[index], ...req.body };
      writeJsonFile('faculty.json', faculty);
      res.json(faculty[index]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    if (mongoConnected) {
      const item = await Faculty.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Faculty not found' });
      res.json({ message: 'Faculty deleted successfully' });
    } else {
      const faculty = readJsonFile('faculty.json', []);
      const index = faculty.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Faculty not found' });
      faculty.splice(index, 1);
      writeJsonFile('faculty.json', faculty);
      res.json({ message: 'Faculty deleted successfully' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getTimetable = async (req, res) => {
  try {
    if (mongoConnected) {
      const timetable = await Timetable.find();
      res.json(timetable);
    } else {
      const timetable = readJsonFile('timetable.json', []);
      res.json(timetable);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createTimetableEntry = async (req, res) => {
  try {
    if (!req.body.day || !req.body.time || !req.body.subject || !req.body.facultyId || !req.body.room) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (mongoConnected) {
      const entry = await Timetable.create(req.body);
      res.status(201).json(entry);
    } else {
      const timetable = readJsonFile('timetable.json', []);
      const entry = {
        id: `tt${Date.now()}`,
        ...req.body
      };
      timetable.push(entry);
      writeJsonFile('timetable.json', timetable);
      res.status(201).json(entry);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteTimetableEntry = async (req, res) => {
  try {
    if (mongoConnected) {
      const entry = await Timetable.findByIdAndDelete(req.params.id);
      if (!entry) return res.status(404).json({ message: 'Timetable entry not found' });
      res.json({ message: 'Timetable entry deleted successfully' });
    } else {
      const timetable = readJsonFile('timetable.json', []);
      const index = timetable.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Timetable entry not found' });
      timetable.splice(index, 1);
      writeJsonFile('timetable.json', timetable);
      res.json({ message: 'Timetable entry deleted successfully' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    if (mongoConnected) {
      let query = {};
      if (req.query.date) query.date = req.query.date;
      if (req.query.subject) query.subject = req.query.subject;
      const records = await Attendance.find(query);
      res.json(records);
    } else {
      let records = readJsonFile('attendance.json', []);
      if (req.query.date) records = records.filter((entry) => entry.date === req.query.date);
      if (req.query.subject) records = records.filter((entry) => entry.subject === req.query.subject);
      res.json(records);
    }
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

    if (mongoConnected) {
      await Attendance.deleteMany({ date, subject });
      const nextRecords = records.map((record) => ({ ...record, date, subject }));
      await Attendance.insertMany(nextRecords);
      res.status(201).json(nextRecords);
    } else {
      let attendance = readJsonFile('attendance.json', []);
      attendance = attendance.filter((entry) => !(entry.date === date && entry.subject === subject));
      const nextRecords = records.map((record) => ({ ...record, date, subject }));
      attendance = [...attendance, ...nextRecords];
      writeJsonFile('attendance.json', attendance);
      res.status(201).json(nextRecords);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFees = async (req, res) => {
  try {
    if (mongoConnected) {
      const fees = await Fee.find();
      res.json(fees);
    } else {
      const fees = readJsonFile('fees.json', []);
      res.json(fees);
    }
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

    if (mongoConnected) {
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
    } else {
      const fees = readJsonFile('fees.json', []);
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
      fees.push(fee);
      writeJsonFile('fees.json', fees);
      res.status(201).json(fee);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateFee = async (req, res) => {
  try {
    if (mongoConnected) {
      const fee = await Fee.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!fee) return res.status(404).json({ message: 'Fee record not found' });
      res.json(fee);
    } else {
      const fees = readJsonFile('fees.json', []);
      const index = fees.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Fee record not found' });
      fees[index] = { ...fees[index], ...req.body };
      writeJsonFile('fees.json', fees);
      res.json(fees[index]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getExamSchedules = async (req, res) => {
  try {
    if (mongoConnected) {
      const schedules = await ExamSchedule.find();
      res.json(schedules);
    } else {
      const schedules = readJsonFile('examSchedules.json', []);
      res.json(schedules);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createExamSchedule = async (req, res) => {
  try {
    if (!req.body.subject || !req.body.date || !req.body.time || !req.body.room) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (mongoConnected) {
      const entry = await ExamSchedule.create({
        ...req.body,
        department: req.body.department || 'Computer Science',
        semester: Number(req.body.semester) || 4,
        type: req.body.type || 'midterm'
      });
      res.status(201).json(entry);
    } else {
      const schedules = readJsonFile('examSchedules.json', []);
      const entry = {
        id: `e${Date.now()}`,
        department: 'Computer Science',
        semester: 4,
        type: 'midterm',
        ...req.body
      };
      schedules.push(entry);
      writeJsonFile('examSchedules.json', schedules);
      res.status(201).json(entry);
    }
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

    if (mongoConnected) {
      const result = await ExamResult.create({
        studentId,
        subject,
        examType,
        marksObtained: obtained,
        totalMarks: total,
        grade: calculateGrade((obtained / total) * 100),
      });
      res.status(201).json(result);
    } else {
      const results = readJsonFile('examResults.json', []);
      const result = {
        id: `r${Date.now()}`,
        studentId,
        subject,
        examType,
        marksObtained: obtained,
        totalMarks: total,
        grade: calculateGrade((obtained / total) * 100),
      };
      results.push(result);
      writeJsonFile('examResults.json', results);
      res.status(201).json(result);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getExamResults = async (req, res) => {
  try {
    const { studentId, subject, examType, department, semester } = req.query;

    if (mongoConnected) {
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
    } else {
      let results = readJsonFile('examResults.json', []);
      if (studentId) results = results.filter((entry) => entry.studentId === studentId);
      if (subject) results = results.filter((entry) => entry.subject === subject);
      if (examType) results = results.filter((entry) => entry.examType === examType);

      if (department || semester) {
        const students = readJsonFile('students.json', []);
        const studentIds = students
          .filter((s) => {
            const matchDept = !department || s.department === department;
            const matchSem = !semester || s.semester === Number(semester);
            return matchDept && matchSem;
          })
          .map((s) => s.id);
        results = results.filter((entry) => studentIds.includes(entry.studentId));
      }

      res.json(results);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateExamResult = async (req, res) => {
  try {
    if (mongoConnected) {
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
    } else {
      const results = readJsonFile('examResults.json', []);
      const index = results.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Result not found' });

      const existing = results[index];
      const merged = { ...existing, ...req.body };
      if (req.body.marksObtained !== undefined || req.body.totalMarks !== undefined) {
        const obtained = Number(merged.marksObtained ?? existing.marksObtained);
        const total = Number(merged.totalMarks ?? existing.totalMarks);
        merged.marksObtained = obtained;
        merged.totalMarks = total;
        merged.grade = calculateGrade((obtained / total) * 100);
      }
      results[index] = merged;
      writeJsonFile('examResults.json', results);
      res.json(results[index]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteExamResult = async (req, res) => {
  try {
    if (mongoConnected) {
      const result = await ExamResult.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json({ message: 'Result not found' });
      res.json({ message: 'Result deleted successfully' });
    } else {
      const results = readJsonFile('examResults.json', []);
      const index = results.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Result not found' });
      results.splice(index, 1);
      writeJsonFile('examResults.json', results);
      res.json({ message: 'Result deleted successfully' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getCourses = async (req, res) => {
  try {
    if (mongoConnected) {
      const courses = await Course.find();
      res.json(courses);
    } else {
      const courses = readJsonFile('courses.json', []);
      res.json(courses);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    if (mongoConnected) {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json(course);
    } else {
      const courses = readJsonFile('courses.json', []);
      const course = courses.find((entry) => entry.id === req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json(course);
    }
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

    if (mongoConnected) {
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
    } else {
      const courses = readJsonFile('courses.json', []);
      const course = {
        id: `c${Date.now()}`,
        name,
        code,
        department,
        credits: Number(credits),
        semester: Number(semester),
        teacher,
        description,
      };
      courses.push(course);
      writeJsonFile('courses.json', courses);
      res.status(201).json(course);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    if (mongoConnected) {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json(course);
    } else {
      const courses = readJsonFile('courses.json', []);
      const index = courses.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Course not found' });
      courses[index] = { ...courses[index], ...req.body };
      writeJsonFile('courses.json', courses);
      res.json(courses[index]);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    if (mongoConnected) {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.json({ message: 'Course deleted successfully' });
    } else {
      const courses = readJsonFile('courses.json', []);
      const index = courses.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Course not found' });
      courses.splice(index, 1);
      writeJsonFile('courses.json', courses);
      res.json({ message: 'Course deleted successfully' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getReports = async (req, res) => {
  try {
    const { department } = req.query;

    if (mongoConnected) {
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
    } else {
      const students = department ? readJsonFile('students.json', []).filter((s) => s.department === department) : readJsonFile('students.json', []);
      const studentIds = students.map((s) => s.id);
      const [attendance, fees] = [readJsonFile('attendance.json', []), readJsonFile('fees.json', [])];

      const studentReport = students.map((student) => {
        const studentAttendance = attendance.filter((a) => a.studentId === student.id);
        const present = studentAttendance.filter((a) => a.status === 'present').length;
        const total = studentAttendance.length;
        const studentFees = fees.filter((f) => f.studentId === student.id);
        const totalFee = studentFees.reduce((s, f) => s + Number(f.amount), 0);
        const paidFee = studentFees.reduce((s, f) => s + Number(f.paid), 0);

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

      const attendanceBySubject = {};
      attendance.forEach((a) => {
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

      const feeByDept = {};
      fees.forEach((f) => {
        const student = students.find((s) => s.id === f.studentId);
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

      const totalFees = fees.reduce((s, f) => s + Number(f.amount), 0);
      const totalCollected = fees.reduce((s, f) => s + Number(f.paid), 0);

      res.json({
        studentReport,
        attendanceBySubject: attendanceBySubjectList,
        feeByDept: feeByDeptList,
        totals: { totalFees, totalCollected },
      });
    }
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
