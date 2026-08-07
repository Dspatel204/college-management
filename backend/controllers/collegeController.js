const {
  students,
  faculty,
  timetable,
  attendance,
  fees,
  examSchedules,
  examResults,
  courses
} = require('../models/collegeData');

const getStudents = (req, res) => {
  res.json(students);
};

const getStudentById = (req, res) => {
  const student = students.find((item) => item.id === req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

const getFaculty = (req, res) => {
  res.json(faculty);
};

const getTimetable = (req, res) => {
  res.json(timetable);
};

const getAttendance = (req, res) => {
  res.json(attendance);
};

const getFees = (req, res) => {
  res.json(fees);
};

const getExamSchedules = (req, res) => {
  res.json(examSchedules);
};

const getExamResults = (req, res) => {
  res.json(examResults);
};

const getCourses = (req, res) => {
  res.json(courses);
};

module.exports = {
  getStudents,
  getStudentById,
  getFaculty,
  getTimetable,
  getAttendance,
  getFees,
  getExamSchedules,
  getExamResults,
  getCourses
};
