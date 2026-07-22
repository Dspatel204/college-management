const DEPARTMENTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];
const SUBJECTS = ["Data Structures", "Operating Systems", "DBMS", "Computer Networks", "Mathematics"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = [
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 1:00",
  "2:00 - 3:00",
  "3:00 - 4:00",
  "4:00 - 5:00"
];
const STUDENTS = [
  { id: "s1", name: "Rahul Kumar", rollNo: "CS2024001", department: "Computer Science", semester: 4, email: "rahul@college.com", phone: "9876543210", avatar: "RK", admissionDate: "2022-07-15", address: "123 Main St, Delhi", guardianName: "Suresh Kumar", guardianPhone: "9876000001", status: "active", enrolledCourses: ["c1", "c2", "c3"] },
  { id: "s2", name: "Priya Singh", rollNo: "CS2024002", department: "Computer Science", semester: 4, email: "priya@college.com", phone: "9876543211", avatar: "PS", admissionDate: "2022-07-15", address: "456 Park Ave, Mumbai", guardianName: "Rajesh Singh", guardianPhone: "9876000002", status: "active", enrolledCourses: ["c1", "c2"] },
  { id: "s3", name: "Amit Patel", rollNo: "CS2024003", department: "Computer Science", semester: 4, email: "amit@college.com", phone: "9876543212", avatar: "AP", admissionDate: "2022-07-16", address: "789 Lake Rd, Ahmedabad", guardianName: "Dinesh Patel", guardianPhone: "9876000003", status: "active", enrolledCourses: ["c1", "c3"] },
  { id: "s4", name: "Neha Sharma", rollNo: "EC2024001", department: "Electronics", semester: 4, email: "neha@college.com", phone: "9876543213", avatar: "NS", admissionDate: "2022-07-17", address: "321 Hill View, Pune", guardianName: "Vinod Sharma", guardianPhone: "9876000004", status: "active", enrolledCourses: ["c6", "c7"] },
  { id: "s5", name: "Vikram Joshi", rollNo: "ME2024001", department: "Mechanical", semester: 4, email: "vikram@college.com", phone: "9876543214", avatar: "VJ", admissionDate: "2022-07-18", address: "654 Green Park, Jaipur", guardianName: "Mohan Joshi", guardianPhone: "9876000005", status: "active", enrolledCourses: ["c8"] },
  { id: "s6", name: "Sneha Reddy", rollNo: "CS2024004", department: "Computer Science", semester: 2, email: "sneha@college.com", phone: "9876543215", avatar: "SR", admissionDate: "2023-07-15", address: "987 Temple St, Hyderabad", guardianName: "Venkat Reddy", guardianPhone: "9876000006", status: "active", enrolledCourses: ["c5"] },
  { id: "s7", name: "Arjun Verma", rollNo: "EC2024002", department: "Electronics", semester: 2, email: "arjun@college.com", phone: "9876543216", avatar: "AV", admissionDate: "2023-07-16", address: "147 Station Rd, Bangalore", guardianName: "Anil Verma", guardianPhone: "9876000007", status: "active", enrolledCourses: ["c6"] },
  { id: "s8", name: "Kavita Nair", rollNo: "CE2024001", department: "Civil", semester: 6, email: "kavita@college.com", phone: "9876543217", avatar: "KN", admissionDate: "2021-07-15", address: "258 Beach Rd, Kochi", guardianName: "Ramesh Nair", guardianPhone: "9876000008", status: "active", enrolledCourses: ["c9"] },
  { id: "s9", name: "Rohit Mehta", rollNo: "EE2024001", department: "Electrical", semester: 6, email: "rohit@college.com", phone: "9876543218", avatar: "RM", admissionDate: "2021-07-16", address: "369 River View, Lucknow", guardianName: "Prakash Mehta", guardianPhone: "9876000009", status: "active", enrolledCourses: ["c10"] },
  { id: "s10", name: "Ananya Das", rollNo: "CS2024005", department: "Computer Science", semester: 6, email: "ananya@college.com", phone: "9876543219", avatar: "AD", admissionDate: "2021-07-17", address: "741 Market St, Kolkata", guardianName: "Subhash Das", guardianPhone: "9876000010", status: "active", enrolledCourses: ["c4"] }
];
const FACULTY = [
  { id: "f1", name: "Prof. Gupta", employeeId: "FAC001", department: "Computer Science", designation: "Professor", email: "gupta@college.com", phone: "9800000001", avatar: "PG", assignedSubjects: ["Data Structures"], assignedClasses: ["CS Sem-4"], qualification: "Ph.D. Computer Science", joinDate: "2010-08-01" },
  { id: "f2", name: "Dr. Sharma", employeeId: "FAC002", department: "Computer Science", designation: "Associate Professor", email: "sharma@college.com", phone: "9800000002", avatar: "DS", assignedSubjects: ["Operating Systems"], assignedClasses: ["CS Sem-4"], qualification: "Ph.D. Systems Engineering", joinDate: "2012-07-15" },
  { id: "f3", name: "Prof. Mishra", employeeId: "FAC003", department: "Computer Science", designation: "Professor", email: "mishra@college.com", phone: "9800000003", avatar: "PM", assignedSubjects: ["DBMS"], assignedClasses: ["CS Sem-4", "CE Sem-6"], qualification: "Ph.D. Database Systems", joinDate: "2008-01-10" },
  { id: "f4", name: "Dr. Verma", employeeId: "FAC004", department: "Computer Science", designation: "Assistant Professor", email: "verma@college.com", phone: "9800000004", avatar: "DV", assignedSubjects: ["Computer Networks"], assignedClasses: ["CS Sem-6"], qualification: "Ph.D. Networking", joinDate: "2015-06-20" },
  { id: "f5", name: "Prof. Rao", employeeId: "FAC005", department: "Computer Science", designation: "Professor", email: "rao@college.com", phone: "9800000005", avatar: "PR", assignedSubjects: ["Mathematics"], assignedClasses: ["CS Sem-2"], qualification: "Ph.D. Applied Mathematics", joinDate: "2005-08-01" },
  { id: "f6", name: "Dr. Iyer", employeeId: "FAC006", department: "Electronics", designation: "Associate Professor", email: "iyer@college.com", phone: "9800000006", avatar: "DI", assignedSubjects: ["Digital Electronics"], assignedClasses: ["EC Sem-2"], qualification: "Ph.D. VLSI Design", joinDate: "2011-07-01" },
  { id: "f7", name: "Prof. Nair", employeeId: "FAC007", department: "Electronics", designation: "Professor", email: "nair@college.com", phone: "9800000007", avatar: "PN", assignedSubjects: ["Signal Processing"], assignedClasses: ["EC Sem-4"], qualification: "Ph.D. Signal Processing", joinDate: "2009-08-15" },
  { id: "f8", name: "Dr. Singh", employeeId: "FAC008", department: "Mechanical", designation: "Professor", email: "singh@college.com", phone: "9800000008", avatar: "DrS", assignedSubjects: ["Thermodynamics"], assignedClasses: ["ME Sem-4"], qualification: "Ph.D. Thermal Engineering", joinDate: "2007-01-05" }
];
const INITIAL_TIMETABLE = [
  { id: "tt1", day: "Monday", time: "9:00 - 10:00", subject: "Data Structures", facultyId: "f1", department: "Computer Science", semester: 4, room: "CS-101" },
  { id: "tt2", day: "Monday", time: "10:00 - 11:00", subject: "Operating Systems", facultyId: "f2", department: "Computer Science", semester: 4, room: "CS-102" },
  { id: "tt3", day: "Monday", time: "11:00 - 12:00", subject: "DBMS", facultyId: "f3", department: "Computer Science", semester: 4, room: "CS-103" },
  { id: "tt4", day: "Tuesday", time: "9:00 - 10:00", subject: "Mathematics", facultyId: "f5", department: "Computer Science", semester: 2, room: "CS-201" },
  { id: "tt5", day: "Tuesday", time: "10:00 - 11:00", subject: "Data Structures", facultyId: "f1", department: "Computer Science", semester: 4, room: "CS-101" },
  { id: "tt6", day: "Wednesday", time: "9:00 - 10:00", subject: "Computer Networks", facultyId: "f4", department: "Computer Science", semester: 6, room: "CS-301" },
  { id: "tt7", day: "Wednesday", time: "11:00 - 12:00", subject: "Operating Systems", facultyId: "f2", department: "Computer Science", semester: 4, room: "CS-102" },
  { id: "tt8", day: "Thursday", time: "9:00 - 10:00", subject: "Digital Electronics", facultyId: "f6", department: "Electronics", semester: 2, room: "EC-101" },
  { id: "tt9", day: "Thursday", time: "10:00 - 11:00", subject: "Signal Processing", facultyId: "f7", department: "Electronics", semester: 4, room: "EC-201" },
  { id: "tt10", day: "Friday", time: "9:00 - 10:00", subject: "Thermodynamics", facultyId: "f8", department: "Mechanical", semester: 4, room: "ME-101" },
  { id: "tt11", day: "Friday", time: "10:00 - 11:00", subject: "DBMS", facultyId: "f3", department: "Computer Science", semester: 4, room: "CS-103" },
  { id: "tt12", day: "Friday", time: "2:00 - 3:00", subject: "Data Structures", facultyId: "f1", department: "Computer Science", semester: 4, room: "Lab-1" }
];
const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 864e5).toISOString().split("T")[0];
const INITIAL_ATTENDANCE = [
  { studentId: "s1", date: today, status: "present", subject: "Data Structures" },
  { studentId: "s2", date: today, status: "present", subject: "Data Structures" },
  { studentId: "s3", date: today, status: "absent", subject: "Data Structures" },
  { studentId: "s4", date: today, status: "late", subject: "Operating Systems" },
  { studentId: "s5", date: today, status: "present", subject: "Mathematics" },
  { studentId: "s6", date: today, status: "present", subject: "Data Structures" },
  { studentId: "s7", date: today, status: "absent", subject: "Operating Systems" },
  { studentId: "s8", date: today, status: "present", subject: "DBMS" },
  { studentId: "s9", date: today, status: "present", subject: "Mathematics" },
  { studentId: "s10", date: today, status: "late", subject: "Computer Networks" },
  { studentId: "s1", date: yesterday, status: "present", subject: "DBMS" },
  { studentId: "s2", date: yesterday, status: "absent", subject: "DBMS" },
  { studentId: "s3", date: yesterday, status: "present", subject: "DBMS" },
  { studentId: "s4", date: yesterday, status: "present", subject: "Operating Systems" },
  { studentId: "s5", date: yesterday, status: "present", subject: "Mathematics" }
];
const INITIAL_FEES = [
  { id: "f1", studentId: "s1", type: "tuition", amount: 5e4, paid: 5e4, dueDate: "2024-06-15", paidDate: "2024-06-10", status: "paid", receiptNo: "REC-2024-001" },
  { id: "f2", studentId: "s1", type: "exam", amount: 2e3, paid: 2e3, dueDate: "2024-07-01", paidDate: "2024-06-28", status: "paid", receiptNo: "REC-2024-002" },
  { id: "f3", studentId: "s2", type: "tuition", amount: 5e4, paid: 25e3, dueDate: "2024-06-15", status: "partial" },
  { id: "f4", studentId: "s2", type: "library", amount: 1500, paid: 0, dueDate: "2024-05-01", status: "overdue" },
  { id: "f5", studentId: "s3", type: "tuition", amount: 5e4, paid: 0, dueDate: "2024-06-15", status: "pending" },
  { id: "f6", studentId: "s4", type: "tuition", amount: 45e3, paid: 45e3, dueDate: "2024-06-15", paidDate: "2024-06-12", status: "paid", receiptNo: "REC-2024-003" },
  { id: "f7", studentId: "s5", type: "hostel", amount: 3e4, paid: 3e4, dueDate: "2024-06-01", paidDate: "2024-05-28", status: "paid", receiptNo: "REC-2024-004" },
  { id: "f8", studentId: "s6", type: "tuition", amount: 5e4, paid: 0, dueDate: "2024-07-15", status: "pending" },
  { id: "f9", studentId: "s7", type: "lab", amount: 5e3, paid: 5e3, dueDate: "2024-06-01", paidDate: "2024-05-30", status: "paid", receiptNo: "REC-2024-005" },
  { id: "f10", studentId: "s8", type: "tuition", amount: 4e4, paid: 2e4, dueDate: "2024-06-15", status: "partial" },
  { id: "f11", studentId: "s9", type: "exam", amount: 2500, paid: 0, dueDate: "2024-05-15", status: "overdue" },
  { id: "f12", studentId: "s10", type: "tuition", amount: 5e4, paid: 5e4, dueDate: "2024-06-15", paidDate: "2024-06-14", status: "paid", receiptNo: "REC-2024-006" }
];
const EXAM_SCHEDULES = [
  { id: "e1", subject: "Data Structures", date: "2024-04-15", time: "10:00 AM - 1:00 PM", room: "Hall A", department: "Computer Science", semester: 4, type: "midterm" },
  { id: "e2", subject: "Operating Systems", date: "2024-04-17", time: "10:00 AM - 1:00 PM", room: "Hall B", department: "Computer Science", semester: 4, type: "midterm" },
  { id: "e3", subject: "DBMS", date: "2024-04-19", time: "2:00 PM - 5:00 PM", room: "Hall A", department: "Computer Science", semester: 4, type: "midterm" },
  { id: "e4", subject: "Mathematics", date: "2024-04-20", time: "10:00 AM - 1:00 PM", room: "Hall C", department: "Computer Science", semester: 2, type: "midterm" },
  { id: "e5", subject: "Computer Networks", date: "2024-04-22", time: "2:00 PM - 5:00 PM", room: "Hall B", department: "Computer Science", semester: 6, type: "final" },
  { id: "e6", subject: "Data Structures", date: "2024-05-10", time: "10:00 AM - 1:00 PM", room: "Hall A", department: "Computer Science", semester: 4, type: "internal" }
];
const EXAM_RESULTS = [
  { id: "r1", studentId: "s1", subject: "Data Structures", examType: "midterm", marksObtained: 82, totalMarks: 100, grade: "A" },
  { id: "r2", studentId: "s1", subject: "Operating Systems", examType: "midterm", marksObtained: 75, totalMarks: 100, grade: "B+" },
  { id: "r3", studentId: "s1", subject: "DBMS", examType: "midterm", marksObtained: 90, totalMarks: 100, grade: "A+" },
  { id: "r4", studentId: "s2", subject: "Data Structures", examType: "midterm", marksObtained: 88, totalMarks: 100, grade: "A" },
  { id: "r5", studentId: "s2", subject: "Operating Systems", examType: "midterm", marksObtained: 65, totalMarks: 100, grade: "B" },
  { id: "r6", studentId: "s3", subject: "Data Structures", examType: "midterm", marksObtained: 45, totalMarks: 100, grade: "D" },
  { id: "r7", studentId: "s3", subject: "DBMS", examType: "midterm", marksObtained: 72, totalMarks: 100, grade: "B+" },
  { id: "r8", studentId: "s6", subject: "Mathematics", examType: "midterm", marksObtained: 91, totalMarks: 100, grade: "A+" },
  { id: "r9", studentId: "s10", subject: "Computer Networks", examType: "final", marksObtained: 78, totalMarks: 100, grade: "B+" },
  { id: "r10", studentId: "s8", subject: "DBMS", examType: "midterm", marksObtained: 85, totalMarks: 100, grade: "A" }
];
const COURSES = [
  { id: "c1", name: "Data Structures & Algorithms", code: "CS301", department: "Computer Science", credits: 4, semester: 4, teacher: "Prof. Gupta", description: "Fundamental data structures and algorithmic techniques" },
  { id: "c2", name: "Operating Systems", code: "CS302", department: "Computer Science", credits: 4, semester: 4, teacher: "Dr. Sharma", description: "OS concepts, process management, memory management" },
  { id: "c3", name: "Database Management Systems", code: "CS303", department: "Computer Science", credits: 3, semester: 4, teacher: "Prof. Mishra", description: "Relational databases, SQL, normalization" },
  { id: "c4", name: "Computer Networks", code: "CS304", department: "Computer Science", credits: 3, semester: 6, teacher: "Dr. Verma", description: "Network protocols, TCP/IP, routing algorithms" },
  { id: "c5", name: "Engineering Mathematics", code: "MA201", department: "Computer Science", credits: 4, semester: 2, teacher: "Prof. Rao", description: "Linear algebra, calculus, probability" },
  { id: "c6", name: "Digital Electronics", code: "EC201", department: "Electronics", credits: 4, semester: 2, teacher: "Dr. Iyer", description: "Logic gates, combinational circuits, sequential circuits" },
  { id: "c7", name: "Signal Processing", code: "EC301", department: "Electronics", credits: 3, semester: 4, teacher: "Prof. Nair", description: "Signals, systems, Fourier transforms" },
  { id: "c8", name: "Thermodynamics", code: "ME201", department: "Mechanical", credits: 4, semester: 4, teacher: "Dr. Singh", description: "Laws of thermodynamics, heat transfer" },
  { id: "c9", name: "Structural Analysis", code: "CE301", department: "Civil", credits: 4, semester: 6, teacher: "Prof. Das", description: "Analysis of determinate and indeterminate structures" },
  { id: "c10", name: "Power Systems", code: "EE301", department: "Electrical", credits: 3, semester: 6, teacher: "Dr. Rao", description: "Power generation, transmission, distribution" }
];
function getStudentName(id) {
  return STUDENTS.find((s) => s.id === id)?.name ?? "Unknown";
}
function getStudentById(id) {
  return STUDENTS.find((s) => s.id === id);
}
function getFacultyById(id) {
  return FACULTY.find((f) => f.id === id);
}
function calculateGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}
export {
  COURSES as C,
  DEPARTMENTS as D,
  EXAM_SCHEDULES as E,
  FACULTY as F,
  INITIAL_ATTENDANCE as I,
  STUDENTS as S,
  TIME_SLOTS as T,
  INITIAL_FEES as a,
  SUBJECTS as b,
  getStudentById as c,
  INITIAL_TIMETABLE as d,
  DAYS as e,
  getFacultyById as f,
  getStudentName as g,
  EXAM_RESULTS as h,
  calculateGrade as i
};
