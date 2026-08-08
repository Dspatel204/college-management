const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

router.get('/students', collegeController.getStudents);
router.post('/students', collegeController.createStudent);
router.get('/students/:id', collegeController.getStudentById);
router.put('/students/:id', collegeController.updateStudent);
router.delete('/students/:id', collegeController.deleteStudent);

router.get('/faculty', collegeController.getFaculty);
router.post('/faculty', collegeController.createFaculty);
router.get('/faculty/:id', collegeController.getFacultyById);
router.put('/faculty/:id', collegeController.updateFaculty);
router.delete('/faculty/:id', collegeController.deleteFaculty);

router.get('/timetable', collegeController.getTimetable);
router.post('/timetable', collegeController.createTimetableEntry);
router.delete('/timetable/:id', collegeController.deleteTimetableEntry);

router.get('/attendance', collegeController.getAttendance);
router.post('/attendance', collegeController.saveAttendance);

router.get('/fees', collegeController.getFees);
router.post('/fees', collegeController.createFee);
router.put('/fees/:id', collegeController.updateFee);

router.get('/exams', collegeController.getExamSchedules);
router.post('/exams', collegeController.createExamSchedule);

router.get('/results', collegeController.getExamResults);
router.post('/results', collegeController.createExamResult);
router.put('/results/:id', collegeController.updateExamResult);
router.delete('/results/:id', collegeController.deleteExamResult);

router.get('/courses', collegeController.getCourses);
router.post('/courses', collegeController.createCourse);
router.get('/courses/:id', collegeController.getCourseById);
router.put('/courses/:id', collegeController.updateCourse);
router.delete('/courses/:id', collegeController.deleteCourse);

router.get('/reports', collegeController.getReports);

module.exports = router;
