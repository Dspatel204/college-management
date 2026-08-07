const express = require('express');
const router = express.Router();
const {
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
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/collegeController');

router.get('/students', getStudents);
router.post('/students', createStudent);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

router.get('/faculty', getFaculty);
router.post('/faculty', createFaculty);
router.get('/faculty/:id', getFacultyById);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

router.get('/timetable', getTimetable);
router.post('/timetable', createTimetableEntry);
router.delete('/timetable/:id', deleteTimetableEntry);

router.get('/attendance', getAttendance);
router.post('/attendance', saveAttendance);

router.get('/fees', getFees);
router.post('/fees', createFee);
router.put('/fees/:id', updateFee);

router.get('/exams', getExamSchedules);
router.post('/exams', createExamSchedule);
router.get('/results', getExamResults);
router.post('/results', createExamResult);

router.get('/courses', getCourses);
router.post('/courses', createCourse);
router.get('/courses/:id', getCourseById);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;
