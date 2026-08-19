const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// ─── Students ─────────────────────────────────────────────────────────────────
router.get('/students', authMiddleware, collegeController.getStudents);
router.post('/students', authMiddleware, requireRole('admin'), collegeController.createStudent);
router.get('/students/:id', authMiddleware, collegeController.getStudentById);
router.put('/students/:id', authMiddleware, requireRole('admin'), collegeController.updateStudent);
router.delete('/students/:id', authMiddleware, requireRole('admin'), collegeController.deleteStudent);

// ─── Faculty ──────────────────────────────────────────────────────────────────
router.get('/faculty', authMiddleware, collegeController.getFaculty);
router.post('/faculty', authMiddleware, requireRole('admin'), collegeController.createFaculty);
router.get('/faculty/:id', authMiddleware, collegeController.getFacultyById);
router.put('/faculty/:id', authMiddleware, requireRole('admin'), collegeController.updateFaculty);
router.delete('/faculty/:id', authMiddleware, requireRole('admin'), collegeController.deleteFaculty);

// ─── Timetable ────────────────────────────────────────────────────────────────
router.get('/timetable', authMiddleware, collegeController.getTimetable);
router.post('/timetable', authMiddleware, requireRole('admin', 'teacher'), collegeController.createTimetableEntry);
router.delete('/timetable/:id', authMiddleware, requireRole('admin'), collegeController.deleteTimetableEntry);

// ─── Attendance ───────────────────────────────────────────────────────────────
router.get('/attendance', authMiddleware, collegeController.getAttendance);
router.post('/attendance', authMiddleware, requireRole('admin', 'teacher'), collegeController.saveAttendance);

// ─── Fees ─────────────────────────────────────────────────────────────────────
router.get('/fees', authMiddleware, collegeController.getFees);
router.post('/fees', authMiddleware, requireRole('admin'), collegeController.createFee);
router.put('/fees/:id', authMiddleware, requireRole('admin'), collegeController.updateFee);

// ─── Exams ────────────────────────────────────────────────────────────────────
router.get('/exams', authMiddleware, collegeController.getExamSchedules);
router.post('/exams', authMiddleware, requireRole('admin', 'teacher'), collegeController.createExamSchedule);

// ─── Results ──────────────────────────────────────────────────────────────────
router.get('/results', authMiddleware, collegeController.getExamResults);
router.post('/results', authMiddleware, requireRole('admin', 'teacher'), collegeController.createExamResult);
router.put('/results/:id', authMiddleware, requireRole('admin', 'teacher'), collegeController.updateExamResult);
router.delete('/results/:id', authMiddleware, requireRole('admin'), collegeController.deleteExamResult);

// ─── Courses ──────────────────────────────────────────────────────────────────
router.get('/courses', authMiddleware, collegeController.getCourses);
router.post('/courses', authMiddleware, requireRole('admin'), collegeController.createCourse);
router.get('/courses/:id', authMiddleware, collegeController.getCourseById);
router.put('/courses/:id', authMiddleware, requireRole('admin'), collegeController.updateCourse);
router.delete('/courses/:id', authMiddleware, requireRole('admin'), collegeController.deleteCourse);

// ─── Reports ──────────────────────────────────────────────────────────────────
router.get('/reports', authMiddleware, requireRole('admin'), collegeController.getReports);

module.exports = router;
