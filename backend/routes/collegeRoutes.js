const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  getFaculty,
  getTimetable,
  getAttendance,
  getFees,
  getExamSchedules,
  getExamResults,
  getCourses
} = require('../controllers/collegeController');

router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.get('/faculty', getFaculty);
router.get('/timetable', getTimetable);
router.get('/attendance', getAttendance);
router.get('/fees', getFees);
router.get('/exams', getExamSchedules);
router.get('/results', getExamResults);
router.get('/courses', getCourses);

module.exports = router;
