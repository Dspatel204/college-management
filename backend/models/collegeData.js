const students = [
  {
    id: 's1',
    name: 'Rahul Kumar',
    rollNo: 'CS2024001',
    department: 'Computer Science',
    semester: 4,
    email: 'rahul@college.com',
    phone: '9876543210',
    avatar: 'RK',
    admissionDate: '2022-07-15',
    address: '123 Main St, Delhi',
    guardianName: 'Suresh Kumar',
    guardianPhone: '9876000001',
    status: 'active',
    enrolledCourses: ['c1', 'c2', 'c3']
  },
  {
    id: 's2',
    name: 'Priya Singh',
    rollNo: 'CS2024002',
    department: 'Computer Science',
    semester: 4,
    email: 'priya@college.com',
    phone: '9876543211',
    avatar: 'PS',
    admissionDate: '2022-07-15',
    address: '456 Park Ave, Mumbai',
    guardianName: 'Rajesh Singh',
    guardianPhone: '9876000002',
    status: 'active',
    enrolledCourses: ['c1', 'c2']
  },
  {
    id: 's3',
    name: 'Amit Patel',
    rollNo: 'CS2024003',
    department: 'Computer Science',
    semester: 4,
    email: 'amit@college.com',
    phone: '9876543212',
    avatar: 'AP',
    admissionDate: '2022-07-16',
    address: '789 Lake Rd, Ahmedabad',
    guardianName: 'Dinesh Patel',
    guardianPhone: '9876000003',
    status: 'active',
    enrolledCourses: ['c1', 'c3']
  }
];

const faculty = [
  {
    id: 'f1',
    name: 'Prof. Gupta',
    employeeId: 'FAC001',
    department: 'Computer Science',
    designation: 'Professor',
    email: 'gupta@college.com',
    phone: '9800000001',
    avatar: 'PG',
    assignedSubjects: ['Data Structures'],
    assignedClasses: ['CS Sem-4'],
    qualification: 'Ph.D. Computer Science',
    joinDate: '2010-08-01'
  },
  {
    id: 'f2',
    name: 'Dr. Sharma',
    employeeId: 'FAC002',
    department: 'Computer Science',
    designation: 'Associate Professor',
    email: 'sharma@college.com',
    phone: '9800000002',
    avatar: 'DS',
    assignedSubjects: ['Operating Systems'],
    assignedClasses: ['CS Sem-4'],
    qualification: 'Ph.D. Systems Engineering',
    joinDate: '2012-07-15'
  }
];

const timetable = [
  { id: 'tt1', day: 'Monday', time: '9:00 - 10:00', subject: 'Data Structures', facultyId: 'f1', department: 'Computer Science', semester: 4, room: 'CS-101' },
  { id: 'tt2', day: 'Monday', time: '10:00 - 11:00', subject: 'Operating Systems', facultyId: 'f2', department: 'Computer Science', semester: 4, room: 'CS-102' },
  { id: 'tt3', day: 'Tuesday', time: '9:00 - 10:00', subject: 'DBMS', facultyId: 'f1', department: 'Computer Science', semester: 4, room: 'CS-103' }
];

const attendance = [
  { studentId: 's1', date: '2026-08-07', status: 'present', subject: 'Data Structures' },
  { studentId: 's2', date: '2026-08-07', status: 'present', subject: 'Data Structures' },
  { studentId: 's3', date: '2026-08-07', status: 'absent', subject: 'Data Structures' }
];

const fees = [
  { id: 'f1', studentId: 's1', type: 'tuition', amount: 50000, paid: 50000, dueDate: '2026-08-15', paidDate: '2026-08-10', status: 'paid', receiptNo: 'REC-001' },
  { id: 'f2', studentId: 's2', type: 'exam', amount: 2000, paid: 1000, dueDate: '2026-08-20', status: 'partial' },
  { id: 'f3', studentId: 's3', type: 'tuition', amount: 50000, paid: 0, dueDate: '2026-08-15', status: 'pending' }
];

const examSchedules = [
  { id: 'e1', subject: 'Data Structures', date: '2026-08-15', time: '10:00 AM - 1:00 PM', room: 'Hall A', department: 'Computer Science', semester: 4, type: 'midterm' },
  { id: 'e2', subject: 'Operating Systems', date: '2026-08-17', time: '10:00 AM - 1:00 PM', room: 'Hall B', department: 'Computer Science', semester: 4, type: 'midterm' }
];

const examResults = [
  { id: 'r1', studentId: 's1', subject: 'Data Structures', examType: 'midterm', marksObtained: 82, totalMarks: 100, grade: 'A' },
  { id: 'r2', studentId: 's2', subject: 'Data Structures', examType: 'midterm', marksObtained: 88, totalMarks: 100, grade: 'A' },
  { id: 'r3', studentId: 's3', subject: 'Operating Systems', examType: 'midterm', marksObtained: 45, totalMarks: 100, grade: 'D' }
];

const courses = [
  { id: 'c1', name: 'Data Structures & Algorithms', code: 'CS301', department: 'Computer Science', credits: 4, semester: 4, teacher: 'Prof. Gupta', description: 'Fundamental data structures and algorithmic techniques' },
  { id: 'c2', name: 'Operating Systems', code: 'CS302', department: 'Computer Science', credits: 4, semester: 4, teacher: 'Dr. Sharma', description: 'OS concepts, process management, memory management' },
  { id: 'c3', name: 'Database Management Systems', code: 'CS303', department: 'Computer Science', credits: 3, semester: 4, teacher: 'Prof. Mishra', description: 'Relational databases, SQL, normalization' }
];

const SUBJECTS = ['Data Structures', 'Operating Systems', 'DBMS'];
const DEPARTMENTS = ['Computer Science'];

module.exports = {
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
};
