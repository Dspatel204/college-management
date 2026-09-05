export interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  avatar: string;
  admissionDate?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  status?: "active" | "inactive" | "graduated";
  enrolledCourses?: string[];
}

export interface Faculty {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  avatar: string;
  assignedSubjects: string[];
  assignedClasses: string[];
  qualification: string;
  joinDate: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  facultyId: string;
  department: string;
  semester: number;
  room: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: "present" | "absent" | "late";
  subject: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  type: "tuition" | "exam" | "library" | "hostel" | "lab";
  amount: number;
  paid: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "partial" | "pending" | "overdue";
  receiptNo?: string;
}

export interface ExamSchedule {
  id: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  department: string;
  semester: number;
  type: "midterm" | "final" | "internal";
}

export interface ExamResult {
  id: string;
  studentId: string;
  subject: string;
  examType: "midterm" | "final" | "internal";
  marksObtained: number;
  totalMarks: number;
  grade: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  semester: number;
  teacher: string;
  description: string;
}

export const DEPARTMENTS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];

export const SUBJECTS = ["Data Structures", "Operating Systems", "DBMS", "Computer Networks", "Mathematics"];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const TIME_SLOTS = [
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 1:00",
  "2:00 - 3:00",
  "3:00 - 4:00",
  "4:00 - 5:00",
];

export const STUDENTS: Student[] = [
  { id: "s1", name: "Rahul Kumar", rollNo: "CS2024001", department: "Computer Science", semester: 4, email: "rahul@college.com", phone: "9876543210", avatar: "RK", admissionDate: "2022-07-15", address: "123 Main St, Delhi", guardianName: "Suresh Kumar", guardianPhone: "9876000001", status: "active", enrolledCourses: ["c1", "c2", "c3"] },
  { id: "s2", name: "Priya Singh", rollNo: "CS2024002", department: "Computer Science", semester: 4, email: "priya@college.com", phone: "9876543211", avatar: "PS", admissionDate: "2022-07-15", address: "456 Park Ave, Mumbai", guardianName: "Rajesh Singh", guardianPhone: "9876000002", status: "active", enrolledCourses: ["c1", "c2"] },
  { id: "s3", name: "Amit Patel", rollNo: "CS2024003", department: "Computer Science", semester: 4, email: "amit@college.com", phone: "9876543212", avatar: "AP", admissionDate: "2022-07-16", address: "789 Lake Rd, Ahmedabad", guardianName: "Dinesh Patel", guardianPhone: "9876000003", status: "active", enrolledCourses: ["c1", "c3"] },
  { id: "s4", name: "Neha Sharma", rollNo: "EC2024001", department: "Electronics", semester: 4, email: "neha@college.com", phone: "9876543213", avatar: "NS", admissionDate: "2022-07-17", address: "321 Hill View, Pune", guardianName: "Vinod Sharma", guardianPhone: "9876000004", status: "active", enrolledCourses: ["c6", "c7"] },
  { id: "s5", name: "Vikram Joshi", rollNo: "ME2024001", department: "Mechanical", semester: 4, email: "vikram@college.com", phone: "9876543214", avatar: "VJ", admissionDate: "2022-07-18", address: "654 Green Park, Jaipur", guardianName: "Mohan Joshi", guardianPhone: "9876000005", status: "active", enrolledCourses: ["c8"] },
  { id: "s6", name: "Sneha Reddy", rollNo: "CS2024004", department: "Computer Science", semester: 2, email: "sneha@college.com", phone: "9876543215", avatar: "SR", admissionDate: "2023-07-15", address: "987 Temple St, Hyderabad", guardianName: "Venkat Reddy", guardianPhone: "9876000006", status: "active", enrolledCourses: ["c5"] },
  { id: "s7", name: "Arjun Verma", rollNo: "EC2024002", department: "Electronics", semester: 2, email: "arjun@college.com", phone: "9876543216", avatar: "AV", admissionDate: "2023-07-16", address: "147 Station Rd, Bangalore", guardianName: "Anil Verma", guardianPhone: "9876000007", status: "active", enrolledCourses: ["c6"] },
  { id: "s8", name: "Kavita Nair", rollNo: "CE2024001", department: "Civil", semester: 6, email: "kavita@college.com", phone: "9876543217", avatar: "KN", admissionDate: "2021-07-15", address: "258 Beach Rd, Kochi", guardianName: "Ramesh Nair", guardianPhone: "9876000008", status: "active", enrolledCourses: ["c9"] },
  { id: "s9", name: "Rohit Mehta", rollNo: "EE2024001", department: "Electrical", semester: 6, email: "rohit@college.com", phone: "9876543218", avatar: "RM", admissionDate: "2021-07-16", address: "369 River View, Lucknow", guardianName: "Prakash Mehta", guardianPhone: "9876000009", status: "active", enrolledCourses: ["c10"] },
  { id: "s10", name: "Ananya Das", rollNo: "CS2024005", department: "Computer Science", semester: 6, email: "ananya@college.com", phone: "9876543219", avatar: "AD", admissionDate: "2021-07-17", address: "741 Market St, Kolkata", guardianName: "Subhash Das", guardianPhone: "9876000010", status: "active", enrolledCourses: ["c4"] },
];

export const FACULTY: Faculty[] = [
  { id: "f1", name: "Prof. Gupta", employeeId: "FAC001", department: "Computer Science", designation: "Professor", email: "gupta@college.com", phone: "9800000001", avatar: "PG", assignedSubjects: ["Data Structures"], assignedClasses: ["CS Sem-4"], qualification: "Ph.D. Computer Science", joinDate: "2010-08-01" },
  { id: "f2", name: "Dr. Sharma", employeeId: "FAC002", department: "Computer Science", designation: "Associate Professor", email: "sharma@college.com", phone: "9800000002", avatar: "DS", assignedSubjects: ["Operating Systems"], assignedClasses: ["CS Sem-4"], qualification: "Ph.D. Systems Engineering", joinDate: "2012-07-15" },
  { id: "f3", name: "Prof. Mishra", employeeId: "FAC003", department: "Computer Science", designation: "Professor", email: "mishra@college.com", phone: "9800000003", avatar: "PM", assignedSubjects: ["DBMS"], assignedClasses: ["CS Sem-4", "CE Sem-6"], qualification: "Ph.D. Database Systems", joinDate: "2008-01-10" },
  { id: "f4", name: "Dr. Verma", employeeId: "FAC004", department: "Computer Science", designation: "Assistant Professor", email: "verma@college.com", phone: "9800000004", avatar: "DV", assignedSubjects: ["Computer Networks"], assignedClasses: ["CS Sem-6"], qualification: "Ph.D. Networking", joinDate: "2015-06-20" },
  { id: "f5", name: "Prof. Rao", employeeId: "FAC005", department: "Computer Science", designation: "Professor", email: "rao@college.com", phone: "9800000005", avatar: "PR", assignedSubjects: ["Mathematics"], assignedClasses: ["CS Sem-2"], qualification: "Ph.D. Applied Mathematics", joinDate: "2005-08-01" },
  { id: "f6", name: "Dr. Iyer", employeeId: "FAC006", department: "Electronics", designation: "Associate Professor", email: "iyer@college.com", phone: "9800000006", avatar: "DI", assignedSubjects: ["Digital Electronics"], assignedClasses: ["EC Sem-2"], qualification: "Ph.D. VLSI Design", joinDate: "2011-07-01" },
  { id: "f7", name: "Prof. Nair", employeeId: "FAC007", department: "Electronics", designation: "Professor", email: "nair@college.com", phone: "9800000007", avatar: "PN", assignedSubjects: ["Signal Processing"], assignedClasses: ["EC Sem-4"], qualification: "Ph.D. Signal Processing", joinDate: "2009-08-15" },
  { id: "f8", name: "Dr. Singh", employeeId: "FAC008", department: "Mechanical", designation: "Professor", email: "singh@college.com", phone: "9800000008", avatar: "DrS", assignedSubjects: ["Thermodynamics"], assignedClasses: ["ME Sem-4"], qualification: "Ph.D. Thermal Engineering", joinDate: "2007-01-05" },
];

export const INITIAL_TIMETABLE: TimetableEntry[] = [
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
  { id: "tt12", day: "Friday", time: "2:00 - 3:00", subject: "Data Structures", facultyId: "f1", department: "Computer Science", semester: 4, room: "Lab-1" },
];

const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
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
  { studentId: "s5", date: yesterday, status: "present", subject: "Mathematics" },
];

export const INITIAL_FEES: FeeRecord[] = [
  { id: "f1", studentId: "s1", type: "tuition", amount: 50000, paid: 50000, dueDate: "2024-06-15", paidDate: "2024-06-10", status: "paid", receiptNo: "REC-2024-001" },
  { id: "f2", studentId: "s1", type: "exam", amount: 2000, paid: 2000, dueDate: "2024-07-01", paidDate: "2024-06-28", status: "paid", receiptNo: "REC-2024-002" },
  { id: "f3", studentId: "s2", type: "tuition", amount: 50000, paid: 25000, dueDate: "2024-06-15", status: "partial" },
  { id: "f4", studentId: "s2", type: "library", amount: 1500, paid: 0, dueDate: "2024-05-01", status: "overdue" },
  { id: "f5", studentId: "s3", type: "tuition", amount: 50000, paid: 0, dueDate: "2024-06-15", status: "pending" },
  { id: "f6", studentId: "s4", type: "tuition", amount: 45000, paid: 45000, dueDate: "2024-06-15", paidDate: "2024-06-12", status: "paid", receiptNo: "REC-2024-003" },
  { id: "f7", studentId: "s5", type: "hostel", amount: 30000, paid: 30000, dueDate: "2024-06-01", paidDate: "2024-05-28", status: "paid", receiptNo: "REC-2024-004" },
  { id: "f8", studentId: "s6", type: "tuition", amount: 50000, paid: 0, dueDate: "2024-07-15", status: "pending" },
  { id: "f9", studentId: "s7", type: "lab", amount: 5000, paid: 5000, dueDate: "2024-06-01", paidDate: "2024-05-30", status: "paid", receiptNo: "REC-2024-005" },
  { id: "f10", studentId: "s8", type: "tuition", amount: 40000, paid: 20000, dueDate: "2024-06-15", status: "partial" },
  { id: "f11", studentId: "s9", type: "exam", amount: 2500, paid: 0, dueDate: "2024-05-15", status: "overdue" },
  { id: "f12", studentId: "s10", type: "tuition", amount: 50000, paid: 50000, dueDate: "2024-06-15", paidDate: "2024-06-14", status: "paid", receiptNo: "REC-2024-006" },
];

export const EXAM_SCHEDULES: ExamSchedule[] = [
  { id: "e1", subject: "Data Structures", date: "2024-04-15", time: "10:00 AM - 1:00 PM", room: "Hall A", department: "Computer Science", semester: 4, type: "midterm" },
  { id: "e2", subject: "Operating Systems", date: "2024-04-17", time: "10:00 AM - 1:00 PM", room: "Hall B", department: "Computer Science", semester: 4, type: "midterm" },
  { id: "e3", subject: "DBMS", date: "2024-04-19", time: "2:00 PM - 5:00 PM", room: "Hall A", department: "Computer Science", semester: 4, type: "midterm" },
  { id: "e4", subject: "Mathematics", date: "2024-04-20", time: "10:00 AM - 1:00 PM", room: "Hall C", department: "Computer Science", semester: 2, type: "midterm" },
  { id: "e5", subject: "Computer Networks", date: "2024-04-22", time: "2:00 PM - 5:00 PM", room: "Hall B", department: "Computer Science", semester: 6, type: "final" },
  { id: "e6", subject: "Data Structures", date: "2024-05-10", time: "10:00 AM - 1:00 PM", room: "Hall A", department: "Computer Science", semester: 4, type: "internal" },
];

export const EXAM_RESULTS: ExamResult[] = [
  { id: "r1", studentId: "s1", subject: "Data Structures", examType: "midterm", marksObtained: 82, totalMarks: 100, grade: "A" },
  { id: "r2", studentId: "s1", subject: "Operating Systems", examType: "midterm", marksObtained: 75, totalMarks: 100, grade: "B+" },
  { id: "r3", studentId: "s1", subject: "DBMS", examType: "midterm", marksObtained: 90, totalMarks: 100, grade: "A+" },
  { id: "r4", studentId: "s2", subject: "Data Structures", examType: "midterm", marksObtained: 88, totalMarks: 100, grade: "A" },
  { id: "r5", studentId: "s2", subject: "Operating Systems", examType: "midterm", marksObtained: 65, totalMarks: 100, grade: "B" },
  { id: "r6", studentId: "s3", subject: "Data Structures", examType: "midterm", marksObtained: 45, totalMarks: 100, grade: "D" },
  { id: "r7", studentId: "s3", subject: "DBMS", examType: "midterm", marksObtained: 72, totalMarks: 100, grade: "B+" },
  { id: "r8", studentId: "s6", subject: "Mathematics", examType: "midterm", marksObtained: 91, totalMarks: 100, grade: "A+" },
  { id: "r9", studentId: "s10", subject: "Computer Networks", examType: "final", marksObtained: 78, totalMarks: 100, grade: "B+" },
  { id: "r10", studentId: "s8", subject: "DBMS", examType: "midterm", marksObtained: 85, totalMarks: 100, grade: "A" },
];

export const COURSES: Course[] = [
  { id: "c1", name: "Data Structures & Algorithms", code: "CS301", department: "Computer Science", credits: 4, semester: 4, teacher: "Prof. Gupta", description: "Fundamental data structures and algorithmic techniques" },
  { id: "c2", name: "Operating Systems", code: "CS302", department: "Computer Science", credits: 4, semester: 4, teacher: "Dr. Sharma", description: "OS concepts, process management, memory management" },
  { id: "c3", name: "Database Management Systems", code: "CS303", department: "Computer Science", credits: 3, semester: 4, teacher: "Prof. Mishra", description: "Relational databases, SQL, normalization" },
  { id: "c4", name: "Computer Networks", code: "CS304", department: "Computer Science", credits: 3, semester: 6, teacher: "Dr. Verma", description: "Network protocols, TCP/IP, routing algorithms" },
  { id: "c5", name: "Engineering Mathematics", code: "MA201", department: "Computer Science", credits: 4, semester: 2, teacher: "Prof. Rao", description: "Linear algebra, calculus, probability" },
  { id: "c6", name: "Digital Electronics", code: "EC201", department: "Electronics", credits: 4, semester: 2, teacher: "Dr. Iyer", description: "Logic gates, combinational circuits, sequential circuits" },
  { id: "c7", name: "Signal Processing", code: "EC301", department: "Electronics", credits: 3, semester: 4, teacher: "Prof. Nair", description: "Signals, systems, Fourier transforms" },
  { id: "c8", name: "Thermodynamics", code: "ME201", department: "Mechanical", credits: 4, semester: 4, teacher: "Dr. Singh", description: "Laws of thermodynamics, heat transfer" },
  { id: "c9", name: "Structural Analysis", code: "CE301", department: "Civil", credits: 4, semester: 6, teacher: "Prof. Das", description: "Analysis of determinate and indeterminate structures" },
  { id: "c10", name: "Power Systems", code: "EE301", department: "Electrical", credits: 3, semester: 6, teacher: "Dr. Rao", description: "Power generation, transmission, distribution" },
];

export function getStudentName(id: string): string {
  return STUDENTS.find((s) => s.id === id)?.name ?? "Unknown";
}

export function getStudentById(id: string): Student | undefined {
  return STUDENTS.find((s) => s.id === id);
}

export function getFacultyById(id: string): Faculty | undefined {
  return FACULTY.find((f) => f.id === id);
}

export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

// ─── Placement & Career Types & Initial Data ────────────────────────────────
export interface PlacementDrive {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  packageLPA: number;
  eligibilityCgpa: number;
  minAttendanceRate: number;
  allowedBacklogs: number;
  eligibleDepartments: string[];
  driveDate: string;
  location: string;
  type: "Full-Time" | "Internship" | "Pre-Placement Offer";
  status: "Upcoming" | "Active" | "Completed";
  description: string;
  registeredCount: number;
  shortlistedCount: number;
  placedCount: number;
}

export interface StudentPlacementProfile {
  studentId: string;
  cgpa: number;
  resumeScore: number;
  skills: string[];
  certifications: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  placementStatus: "Searching" | "Shortlisted" | "Placed" | "Opted Out";
  placedCompany?: string;
  packageOffered?: number;
}

export interface PlacementApplication {
  id: string;
  driveId: string;
  studentId: string;
  appliedDate: string;
  status: "Applied" | "Shortlisted" | "Interview Scheduled" | "Offered" | "Rejected";
  notes?: string;
}

export const INITIAL_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: "pd1",
    companyName: "Google Cloud",
    logo: "G",
    role: "Associate Cloud Engineer",
    packageLPA: 24.5,
    eligibilityCgpa: 8.0,
    minAttendanceRate: 75,
    allowedBacklogs: 0,
    eligibleDepartments: ["Computer Science", "Electronics"],
    driveDate: "2024-05-20",
    location: "Campus Auditorium / Virtual",
    type: "Full-Time",
    status: "Upcoming",
    description: "Designing scalable distributed systems and deploying enterprise applications on GCP.",
    registeredCount: 38,
    shortlistedCount: 12,
    placedCount: 0,
  },
  {
    id: "pd2",
    companyName: "Microsoft",
    logo: "M",
    role: "Software Development Engineer (SDE-1)",
    packageLPA: 21.0,
    eligibilityCgpa: 7.5,
    minAttendanceRate: 75,
    allowedBacklogs: 0,
    eligibleDepartments: ["Computer Science", "Electronics", "Electrical"],
    driveDate: "2024-05-25",
    location: "Main Seminar Hall",
    type: "Full-Time",
    status: "Active",
    description: "Full-stack development, Azure services integration, and algorithms.",
    registeredCount: 45,
    shortlistedCount: 15,
    placedCount: 4,
  },
  {
    id: "pd3",
    companyName: "Tata Consultancy Services (TCS Digital)",
    logo: "TCS",
    role: "Digital Systems Specialist",
    packageLPA: 9.0,
    eligibilityCgpa: 6.5,
    minAttendanceRate: 70,
    allowedBacklogs: 1,
    eligibleDepartments: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"],
    driveDate: "2024-04-10",
    location: "Lab Complex 3",
    type: "Full-Time",
    status: "Completed",
    description: "Enterprise software modernization and automation solutions.",
    registeredCount: 65,
    shortlistedCount: 28,
    placedCount: 18,
  },
  {
    id: "pd4",
    companyName: "Infosys Wings",
    logo: "INF",
    role: "Specialist Programmer",
    packageLPA: 9.5,
    eligibilityCgpa: 7.0,
    minAttendanceRate: 75,
    allowedBacklogs: 0,
    eligibleDepartments: ["Computer Science", "Electronics", "Electrical"],
    driveDate: "2024-06-05",
    location: "Virtual Campus Drive",
    type: "Full-Time",
    status: "Upcoming",
    description: "Full stack Java/Spring Boot & React development.",
    registeredCount: 29,
    shortlistedCount: 0,
    placedCount: 0,
  },
];

export const INITIAL_STUDENT_PLACEMENTS: StudentPlacementProfile[] = [
  { studentId: "s1", cgpa: 8.8, resumeScore: 92, skills: ["React", "TypeScript", "Node.js", "Python", "DSA"], certifications: ["AWS Certified Developer", "Meta Frontend Specialization"], githubUrl: "github.com/rahulkumar", linkedinUrl: "linkedin.com/in/rahulkumar", placementStatus: "Shortlisted" },
  { studentId: "s2", cgpa: 8.5, resumeScore: 88, skills: ["Java", "Spring Boot", "MySQL", "Docker"], certifications: ["Oracle Java SE", "Docker Essentials"], githubUrl: "github.com/priyasingh", linkedinUrl: "linkedin.com/in/priyasingh", placementStatus: "Shortlisted" },
  { studentId: "s3", cgpa: 6.8, resumeScore: 65, skills: ["C++", "HTML/CSS", "JavaScript"], certifications: ["Python for Beginners"], placementStatus: "Searching" },
  { studentId: "s4", cgpa: 8.2, resumeScore: 85, skills: ["VLSI", "Verilog", "Embedded C", "IoT"], certifications: ["Embedded Systems Certification"], placementStatus: "Searching" },
  { studentId: "s5", cgpa: 7.9, resumeScore: 78, skills: ["AutoCAD", "SolidWorks", "ANSYS", "Python"], certifications: ["Certified CAD Professional"], placementStatus: "Searching" },
  { studentId: "s8", cgpa: 8.9, resumeScore: 90, skills: ["Structural Design", "Revit", "STAAD.Pro", "GIS"], certifications: ["BIM Professional"], placementStatus: "Placed", placedCompany: "L&T Construction", packageOffered: 8.5 },
  { studentId: "s9", cgpa: 8.1, resumeScore: 82, skills: ["Power Electronics", "MATLAB", "PLC/SCADA"], certifications: ["Siemens Automation"], placementStatus: "Searching" },
  { studentId: "s10", cgpa: 8.6, resumeScore: 89, skills: ["React", "Go", "Kubernetes", "PostgreSQL"], certifications: ["CKA Certified", "GCP Associate"], placementStatus: "Placed", placedCompany: "Microsoft", packageOffered: 21.0 },
];

export const INITIAL_APPLICATIONS: PlacementApplication[] = [
  { id: "app1", driveId: "pd2", studentId: "s1", appliedDate: "2024-04-18", status: "Interview Scheduled", notes: "Cleared Coding round (Rank #2)" },
  { id: "app2", driveId: "pd2", studentId: "s2", appliedDate: "2024-04-18", status: "Interview Scheduled", notes: "Cleared Technical Assessment" },
  { id: "app3", driveId: "pd2", studentId: "s10", appliedDate: "2024-04-18", status: "Offered", notes: "Final offer rolled out - ₹21 LPA" },
  { id: "app4", driveId: "pd1", studentId: "s1", appliedDate: "2024-04-22", status: "Shortlisted", notes: "Selected for Round 2 Technical" },
  { id: "app5", driveId: "pd3", studentId: "s8", appliedDate: "2024-04-01", status: "Offered", notes: "Offered L&T Core Role" },
];

// ─── Broadcast Alert Templates ──────────────────────────────────────────────
export interface BroadcastAlert {
  id: string;
  title: string;
  category: "attendance" | "fee" | "exam" | "placement" | "urgent";
  subject: string;
  message: string;
  targetAudience: "all" | "low_attendance" | "fee_pending" | "final_year" | "custom";
  channels: ("whatsapp" | "sms" | "email")[];
  createdAt: string;
  sentCount: number;
  status: "Sent" | "Scheduled" | "Draft";
}

export const INITIAL_BROADCAST_ALERTS: BroadcastAlert[] = [
  {
    id: "ba1",
    title: "Attendance Shortage Critical Warning",
    category: "attendance",
    subject: "Urgent: Attendance Below 75% Notice",
    message: "Dear Student/Parent, Your current attendance is below the mandatory 75% threshold. Please meet your HOD immediately to avoid exam debarment.",
    targetAudience: "low_attendance",
    channels: ["whatsapp", "sms", "email"],
    createdAt: "2024-04-18",
    sentCount: 24,
    status: "Sent",
  },
  {
    id: "ba2",
    title: "Semester Fee Due Reminder",
    category: "fee",
    subject: "Reminder: Semester Fee Clearance Deadline",
    message: "Dear Student, Kindly clear your outstanding semester tuition fees before 25th April to avoid late fee penalties and hall ticket hold.",
    targetAudience: "fee_pending",
    channels: ["whatsapp", "email"],
    createdAt: "2024-04-15",
    sentCount: 38,
    status: "Sent",
  },
  {
    id: "ba3",
    title: "Google Cloud Campus Drive Registration Open",
    category: "placement",
    subject: "Google Cloud Placement Drive - Register Now",
    message: "Eligible Final Year CS/EC students (CGPA >= 8.0, zero backlogs) are invited to register for the Google Cloud campus recruitment drive before 15th May.",
    targetAudience: "final_year",
    channels: ["whatsapp", "email"],
    createdAt: "2024-04-20",
    sentCount: 52,
    status: "Sent",
  },
];

// ─── 1. Gamification & Leaderboard Models ────────────────────────────────────
export interface LeaderboardEntry {
  studentId: string;
  rank: number;
  totalXp: number;
  level: number;
  attendanceStreak: number;
  badges: string[];
  recentAchievement: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: "academic" | "attendance" | "technical" | "leadership";
  rarity: "Gold" | "Silver" | "Diamond" | "Legendary";
}

export const INITIAL_BADGES: BadgeItem[] = [
  { id: "b1", title: "100% Attendance Hero", icon: "🔥", description: "Maintained 30 days perfect continuous attendance", category: "attendance", rarity: "Gold" },
  { id: "b2", title: "Code Ninja", icon: "⚡", description: "Solved 100+ Data Structure & Algorithm problems", category: "technical", rarity: "Diamond" },
  { id: "b3", title: "Academic Ace (GPA > 9.0)", icon: "🎓", description: "Secured top 1 percentile semester grade", category: "academic", rarity: "Legendary" },
  { id: "b4", title: "Hackathon Champion", icon: "🏆", description: "Won 1st prize at Inter-College Hackathon 2024", category: "technical", rarity: "Legendary" },
  { id: "b5", title: "Community Leader", icon: "🌟", description: "Organized successful open-source student workshop", category: "leadership", rarity: "Silver" },
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { studentId: "s1", rank: 1, totalXp: 3450, level: 12, attendanceStreak: 45, badges: ["b1", "b2", "b3", "b4"], recentAchievement: "Won Inter-College Hackathon #1" },
  { studentId: "s8", rank: 2, totalXp: 3200, level: 11, attendanceStreak: 38, badges: ["b1", "b3", "b5"], recentAchievement: "Secured L&T PPO with 9.2 CGPA" },
  { studentId: "s10", rank: 3, totalXp: 3050, level: 11, attendanceStreak: 32, badges: ["b2", "b3", "b4"], recentAchievement: "Cracked Microsoft Campus Drive" },
  { studentId: "s2", rank: 4, totalXp: 2780, level: 9, attendanceStreak: 28, badges: ["b1", "b2"], recentAchievement: "Cleared Oracle Java Certification" },
  { studentId: "s4", rank: 5, totalXp: 2600, level: 8, attendanceStreak: 25, badges: ["b2", "b5"], recentAchievement: "Designed IoT Smart Campus Sensor" },
  { studentId: "s6", rank: 6, totalXp: 2400, level: 7, attendanceStreak: 20, badges: ["b1", "b3"], recentAchievement: "Scored 91/100 in Mathematics" },
  { studentId: "s9", rank: 7, totalXp: 2150, level: 6, attendanceStreak: 18, badges: ["b5"], recentAchievement: "Completed PLC Automation Capstone" },
  { studentId: "s5", rank: 8, totalXp: 1950, level: 5, attendanceStreak: 15, badges: ["b2"], recentAchievement: "CAD Design Contest Runner-Up" },
];

// ─── 2. Hostel & Dormitory Models ───────────────────────────────────────────
export interface HostelRoom {
  id: string;
  roomNumber: string;
  block: "Block A (Boys)" | "Block B (Boys)" | "Block C (Girls)";
  floor: number;
  type: "Single AC" | "Double AC" | "Triple Non-AC" | "Double Non-AC";
  capacity: number;
  occupied: number;
  occupants: string[]; // studentIds
  monthlyFee: number;
  status: "Available" | "Full" | "Maintenance";
}

export interface OutingPass {
  id: string;
  studentId: string;
  reason: string;
  departureTime: string;
  expectedReturn: string;
  actualReturn?: string;
  destination: string;
  guardianNotified: boolean;
  status: "Pending" | "Approved" | "Checked Out" | "Returned" | "Rejected";
  approvedBy?: string;
}

export interface HostelComplaint {
  id: string;
  studentId: string;
  roomNumber: string;
  category: "Electricity" | "Plumbing" | "WiFi / Internet" | "Cleanliness" | "Furniture";
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
}

export const INITIAL_HOSTEL_ROOMS: HostelRoom[] = [
  { id: "hr1", roomNumber: "A-101", block: "Block A (Boys)", floor: 1, type: "Double AC", capacity: 2, occupied: 2, occupants: ["s1", "s3"], monthlyFee: 8500, status: "Full" },
  { id: "hr2", roomNumber: "A-102", block: "Block A (Boys)", floor: 1, type: "Double AC", capacity: 2, occupied: 1, occupants: ["s5"], monthlyFee: 8500, status: "Available" },
  { id: "hr3", roomNumber: "A-201", block: "Block A (Boys)", floor: 2, type: "Single AC", capacity: 1, occupied: 1, occupants: ["s9"], monthlyFee: 12000, status: "Full" },
  { id: "hr4", roomNumber: "A-202", block: "Block A (Boys)", floor: 2, type: "Triple Non-AC", capacity: 3, occupied: 1, occupants: ["s7"], monthlyFee: 5500, status: "Available" },
  { id: "hr5", roomNumber: "C-101", block: "Block C (Girls)", floor: 1, type: "Double AC", capacity: 2, occupied: 2, occupants: ["s2", "s4"], monthlyFee: 8500, status: "Full" },
  { id: "hr6", roomNumber: "C-102", block: "Block C (Girls)", floor: 1, type: "Double AC", capacity: 2, occupied: 1, occupants: ["s6"], monthlyFee: 8500, status: "Available" },
  { id: "hr7", roomNumber: "C-201", block: "Block C (Girls)", floor: 2, type: "Single AC", capacity: 1, occupied: 1, occupants: ["s8"], monthlyFee: 12000, status: "Full" },
  { id: "hr8", roomNumber: "C-202", block: "Block C (Girls)", floor: 2, type: "Double Non-AC", capacity: 2, occupied: 1, occupants: ["s10"], monthlyFee: 6500, status: "Available" },
];

export const INITIAL_OUTING_PASSES: OutingPass[] = [
  { id: "op1", studentId: "s1", reason: "Attending Hackathon Grand Finale at Tech Park", departureTime: "2024-04-20 08:00", expectedReturn: "2024-04-21 20:00", destination: "Bangalore Tech Park", guardianNotified: true, status: "Approved", approvedBy: "Warden Mr. Verma" },
  { id: "op2", studentId: "s2", reason: "Weekend Family Visit", departureTime: "2024-04-19 17:00", expectedReturn: "2024-04-21 21:00", destination: "Mumbai Residence", guardianNotified: true, status: "Returned", approvedBy: "Warden Mrs. Deshmukh", actualReturn: "2024-04-21 20:30" },
  { id: "op3", studentId: "s3", reason: "Medical Appointment & Eye Checkup", departureTime: "2024-04-22 14:00", expectedReturn: "2024-04-22 18:30", destination: "City Care Hospital", guardianNotified: true, status: "Pending" },
];

export const INITIAL_HOSTEL_COMPLAINTS: HostelComplaint[] = [
  { id: "hc1", studentId: "s1", roomNumber: "A-101", category: "WiFi / Internet", title: "High latency on 2nd floor router", description: "WiFi connection drops during evening hours in Room 101.", status: "In Progress", createdAt: "2024-04-18" },
  { id: "hc2", studentId: "s2", roomNumber: "C-101", category: "Plumbing", title: "Bathroom tap leak", description: "Hot water tap has a continuous minor leak.", status: "Resolved", createdAt: "2024-04-15" },
];

// ─── 3. Alumni Network & Mentorship Models ──────────────────────────────────
export interface AlumniProfile {
  id: string;
  name: string;
  batchYear: number;
  department: string;
  currentCompany: string;
  role: string;
  location: string;
  avatar: string;
  linkedinUrl: string;
  mentorshipAvailable: boolean;
  specialties: string[];
  bio: string;
}

export interface MentorshipSession {
  id: string;
  alumniId: string;
  studentId: string;
  topic: string;
  sessionDate: string;
  meetingLink: string;
  status: "Confirmed" | "Completed" | "Pending";
}

export const INITIAL_ALUMNI: AlumniProfile[] = [
  { id: "al1", name: "Aakash Mehta", batchYear: 2020, department: "Computer Science", currentCompany: "Google", role: "Senior Software Engineer", location: "San Francisco / Remote", avatar: "AM", linkedinUrl: "linkedin.com/in/aakashmehta", mentorshipAvailable: true, specialties: ["Distributed Systems", "FAANG Interview Prep", "System Design"], bio: "Ex-President of Coding Club. Passionate about helping students crack Tier-1 product companies." },
  { id: "al2", name: "Divya Krishnan", batchYear: 2021, department: "Electronics", currentCompany: "Apple", role: "Hardware Systems Architect", location: "Austin, Texas", avatar: "DK", linkedinUrl: "linkedin.com/in/divyakrishnan", mentorshipAvailable: true, specialties: ["VLSI Design", "Semiconductor Careers", "MS in US Guidance"], bio: "Working on Apple Silicon chip architecture. Happy to advise students interested in Core Electronics." },
  { id: "al3", name: "Siddharth Rao", batchYear: 2019, department: "Computer Science", currentCompany: "Microsoft", role: "Principal Cloud Solution Specialist", location: "Bangalore", avatar: "SR", linkedinUrl: "linkedin.com/in/siddharthrao", mentorshipAvailable: true, specialties: ["Azure Cloud", "DevOps & SRE", "Resume Optimization"], bio: "Organizes annual campus cloud bootcamps. Open for mock interviews and resume reviews." },
  { id: "al4", name: "Pooja Banerjee", batchYear: 2022, department: "Mechanical", currentCompany: "Tesla", role: "Thermal Dynamics Specialist", location: "Fremont, CA", avatar: "PB", linkedinUrl: "linkedin.com/in/poojabanerjee", mentorshipAvailable: false, specialties: ["Electric Vehicles", "Thermal Engineering", "CAD & Simulation"], bio: "Specialized in EV battery thermal runaway prevention systems." },
];

export const INITIAL_MENTORSHIPS: MentorshipSession[] = [
  { id: "ms1", alumniId: "al1", studentId: "s1", topic: "FAANG SDE-1 Mock Coding & System Design", sessionDate: "2024-04-26 19:00", meetingLink: "meet.google.com/xyz-code-prep", status: "Confirmed" },
  { id: "ms2", alumniId: "al3", studentId: "s10", topic: "Cloud Architecture Resume Review", sessionDate: "2024-04-28 18:00", meetingLink: "teams.microsoft.com/cloud-review", status: "Confirmed" },
];

// ─── 4. AI Question Paper & Quiz Models ─────────────────────────────────────
export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-3 index
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: "q1", subject: "Data Structures", question: "What is the worst-case time complexity of searching an element in a Balanced Binary Search Tree (AVL Tree)?", options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], correctAnswer: 1, explanation: "AVL Trees maintain height balance strictly at log N, guaranteeing O(log N) lookup.", difficulty: "Easy" },
  { id: "q2", subject: "Data Structures", question: "Which data structure is primarily used in Dijkstra's Shortest Path Algorithm for optimal performance?", options: ["FIFO Queue", "Min-Heap / Priority Queue", "Stack", "Binary Search Tree"], correctAnswer: 1, explanation: "Min-Heap allows extracting the minimum distance vertex in O(log V) time.", difficulty: "Medium" },
  { id: "q3", subject: "Operating Systems", question: "What condition is NOT necessary for a Deadlock to occur according to Coffman conditions?", options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"], correctAnswer: 2, explanation: "No Preemption is the condition. If preemption is allowed, deadlock cannot occur.", difficulty: "Medium" },
  { id: "q4", subject: "DBMS", question: "Which normal form deals with removing Transitive Functional Dependencies?", options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"], correctAnswer: 2, explanation: "3NF requires a table to be in 2NF and have no non-prime attribute transitively dependent on the primary key.", difficulty: "Easy" },
  { id: "q5", subject: "Computer Networks", question: "In the TCP 3-way handshake, what flags are sent in the second packet from Server to Client?", options: ["SYN", "ACK", "SYN + ACK", "FIN + ACK"], correctAnswer: 2, explanation: "The server responds with SYN + ACK to acknowledge the client's SYN and synchronize its own sequence number.", difficulty: "Easy" },
];

// ─── 5. NAAC & NIRF Accreditation Models ────────────────────────────────────
export interface NaacCriteriaScore {
  criteriaNumber: number;
  title: string;
  weightage: number;
  scoreObtained: number; // out of weightage
  grade: "A++" | "A+" | "A" | "B++" | "B+" | "B";
  keyMetrics: { label: string; value: string; status: "Compliant" | "Action Required" | "Strong" }[];
}

export const INITIAL_NAAC_CRITERIA: NaacCriteriaScore[] = [
  { criteriaNumber: 1, title: "Curricular Aspects (NEP 2020 & CBCS)", weightage: 100, scoreObtained: 92, grade: "A++", keyMetrics: [{ label: "Value-Added Courses", value: "24 Courses Offered", status: "Strong" }, { label: "Curriculum Feedback Collection", value: "98% Compliance", status: "Compliant" }] },
  { criteriaNumber: 2, title: "Teaching-Learning & Evaluation", weightage: 350, scoreObtained: 322, grade: "A+", keyMetrics: [{ label: "Student-Faculty Ratio (SFR)", value: "1:15 (UGC Norm)", status: "Strong" }, { label: "PhD Qualified Faculty", value: "72% Faculty", status: "Compliant" }, { label: "Experiential Learning & LMS", value: "100% Digital", status: "Strong" }] },
  { criteriaNumber: 3, title: "Research, Innovations & Extension", weightage: 110, scoreObtained: 96, grade: "A+", keyMetrics: [{ label: "Scopus / SCI Indexed Papers", value: "148 Published", status: "Strong" }, { label: "Funded Research Grants", value: "₹1.42 Crores", status: "Compliant" }, { label: "Patents Published / Granted", value: "18 Patents", status: "Strong" }] },
  { criteriaNumber: 4, title: "Infrastructure & Learning Resources", weightage: 100, scoreObtained: 95, grade: "A++", keyMetrics: [{ label: "ICT Enabled Smart Classrooms", value: "100% Classrooms", status: "Strong" }, { label: "Library E-Journals (NDLI/IEEE)", value: "15,000+ Subscriptions", status: "Strong" }, { label: "High-Speed Campus WiFi", value: "1 Gbps Dedicated", status: "Compliant" }] },
  { criteriaNumber: 5, title: "Student Support & Progression", weightage: 140, scoreObtained: 128, grade: "A+", keyMetrics: [{ label: "Placement & Higher Studies Rate", value: "86.4% Placed", status: "Strong" }, { label: "Govt / Institutional Freeships", value: "48% Beneficiaries", status: "Compliant" }, { label: "Competitive Exam Qualifiers (GATE/CAT)", value: "34 Students", status: "Compliant" }] },
  { criteriaNumber: 6, title: "Governance, Leadership & Management", weightage: 100, scoreObtained: 89, grade: "A", keyMetrics: [{ label: "Faculty Development Programs", value: "94% Attendance", status: "Compliant" }, { label: "Internal Financial Audit", value: "Completed & Cleared", status: "Strong" }] },
  { criteriaNumber: 7, title: "Institutional Values & Best Practices", weightage: 100, scoreObtained: 94, grade: "A++", keyMetrics: [{ label: "Green Audit & Solar Energy", value: "150 kW On-Grid Solar", status: "Strong" }, { label: "Gender Sensitization Programs", value: "Quarterly Audits", status: "Strong" }] },
];

// ─── 6. Govt Scholarship & Fee Waiver Models ────────────────────────────────
export interface ScholarshipScheme {
  id: string;
  name: string;
  provider: "National Scholarship Portal (Central)" | "State Social Welfare DBT" | "AICTE Pragati / Saksham" | "Institutional Merit & EWS";
  benefitAmount: string;
  category: "SC / ST / OBC" | "Minority" | "Girls in Tech" | "Merit / EWS" | "All Eligible";
  deadline: string;
  eligibilityCgpa: number;
  maxAnnualIncome: number; // in INR
  status: "Applications Open" | "Verification Underway" | "Disbursal In Progress";
}

export interface StudentScholarshipApplication {
  id: string;
  schemeId: string;
  studentId: string;
  appliedDate: string;
  annualFamilyIncome: number;
  categoryClaimed: string;
  verifiedDocuments: { docName: string; verified: boolean }[];
  sanctionedAmount: number;
  status: "Applied" | "College Verified" | "Govt Approved" | "DBT Disbursed" | "Rejected";
}

export const INITIAL_SCHOLARSHIP_SCHEMES: ScholarshipScheme[] = [
  { id: "sc1", name: "Central Sector Post-Matric Scholarship (NSP)", provider: "National Scholarship Portal (Central)", benefitAmount: "100% Tuition Fee + ₹12,000 Maintenance", category: "SC / ST / OBC", deadline: "2024-10-31", eligibilityCgpa: 6.0, maxAnnualIncome: 250000, status: "Applications Open" },
  { id: "sc2", name: "AICTE Pragati Scholarship for Girl Students", provider: "AICTE Pragati / Saksham", benefitAmount: "₹50,000 per annum for tuition & books", category: "Girls in Tech", deadline: "2024-11-15", eligibilityCgpa: 6.5, maxAnnualIncome: 800000, status: "Applications Open" },
  { id: "sc3", name: "Institutional Merit-cum-Means (EWS Freeship)", provider: "Institutional Merit & EWS", benefitAmount: "50% to 100% Tuition Fee Waiver", category: "Merit / EWS", deadline: "2024-09-30", eligibilityCgpa: 8.0, maxAnnualIncome: 500000, status: "Verification Underway" },
  { id: "sc4", name: "State Minority Welfare Higher Education Scholarship", provider: "State Social Welfare DBT", benefitAmount: "₹30,000 Direct Bank Transfer", category: "Minority", deadline: "2024-10-15", eligibilityCgpa: 6.0, maxAnnualIncome: 300000, status: "Disbursal In Progress" },
];

export const INITIAL_SCHOLARSHIP_APPLICATIONS: StudentScholarshipApplication[] = [
  { id: "sa1", schemeId: "sc1", studentId: "s3", appliedDate: "2024-08-15", annualFamilyIncome: 180000, categoryClaimed: "OBC", verifiedDocuments: [{ docName: "Income Certificate (Tehsildar)", verified: true }, { docName: "Caste Validity Certificate", verified: true }, { docName: "Aadhaar Linked Bank Passbook", verified: true }], sanctionedAmount: 50000, status: "DBT Disbursed" },
  { id: "sa2", schemeId: "sc2", studentId: "s2", appliedDate: "2024-08-20", annualFamilyIncome: 450000, categoryClaimed: "Girls in Tech", verifiedDocuments: [{ docName: "Income Certificate", verified: true }, { docName: "12th Board Marksheet", verified: true }], sanctionedAmount: 50000, status: "Govt Approved" },
  { id: "sa3", schemeId: "sc3", studentId: "s6", appliedDate: "2024-09-01", annualFamilyIncome: 220000, categoryClaimed: "Merit / EWS", verifiedDocuments: [{ docName: "EWS Certificate", verified: true }, { docName: "Semester Grade Card (CGPA 9.1)", verified: true }], sanctionedAmount: 25000, status: "College Verified" },
];

// ─── 7. NEP 2020 Mandatory Industrial Internship Models ─────────────────────
export interface InternshipOpportunity {
  id: string;
  title: string;
  organization: string;
  stream: "Engineering / IT" | "Commerce & Management" | "Pharmacy & Health" | "Core Science & Arts";
  durationWeeks: number;
  credits: number;
  stipend: string;
  location: string;
  type: "Industrial Training" | "Corporate Internship" | "Research Lab" | "Hospital Rotation";
  openings: number;
}

export interface StudentInternshipEnrollment {
  id: string;
  internshipId?: string;
  studentId: string;
  organizationName: string;
  role: string;
  startDate: string;
  endDate: string;
  nocIssued: boolean;
  nocReferenceNo?: string;
  weeklyLogbookCompleted: number; // e.g. 6 of 6 weeks
  creditsAwarded: number;
  status: "NOC Issued" | "In Progress" | "Logbook Submitted" | "Credits Approved";
}

export const INITIAL_INTERNSHIPS: InternshipOpportunity[] = [
  { id: "in1", title: "Full Stack Software Development Intern", organization: "Tata Consultancy Services", stream: "Engineering / IT", durationWeeks: 8, credits: 4, stipend: "₹18,000 / month", location: "Bangalore / Hybrid", type: "Industrial Training", openings: 15 },
  { id: "in2", title: "Financial Analyst & Auditing Trainee", organization: "Deloitte India", stream: "Commerce & Management", durationWeeks: 6, credits: 3, stipend: "₹15,000 / month", location: "Mumbai / Remote", type: "Corporate Internship", openings: 10 },
  { id: "in3", title: "Hospital Clinical Pharmacy & Drug Formulation", organization: "Apollo Hospitals", stream: "Pharmacy & Health", durationWeeks: 8, credits: 4, stipend: "₹12,000 / month", location: "Hyderabad", type: "Hospital Rotation", openings: 8 },
  { id: "in4", title: "Data Science & Geo-Spatial Analytics", organization: "ISRO Remote Sensing Centre", stream: "Core Science & Arts", durationWeeks: 6, credits: 3, stipend: "₹10,000 / month", location: "Dehradun", type: "Research Lab", openings: 6 },
];

export const INITIAL_STUDENT_INTERNSHIPS: StudentInternshipEnrollment[] = [
  { id: "si1", internshipId: "in1", studentId: "s1", organizationName: "Tata Consultancy Services", role: "Software Intern", startDate: "2024-05-15", endDate: "2024-07-15", nocIssued: true, nocReferenceNo: "CHUB/NOC/2024/001", weeklyLogbookCompleted: 8, creditsAwarded: 4, status: "Credits Approved" },
  { id: "si2", internshipId: "in2", studentId: "s2", organizationName: "Deloitte India", role: "Audit Trainee", startDate: "2024-06-01", endDate: "2024-07-15", nocIssued: true, nocReferenceNo: "CHUB/NOC/2024/002", weeklyLogbookCompleted: 5, creditsAwarded: 0, status: "In Progress" },
];

// ─── 8. UGC Mandatory Anti-Ragging & Grievance Cell Models ──────────────────
export interface GrievanceCase {
  id: string;
  ticketNo: string;
  category: "Anti-Ragging Incident" | "Internal Complaints (ICC - Women Safety)" | "Academic & Exam Evaluation" | "Hostel & Campus Facility";
  submittedBy: string; // Student Name or "Anonymous / Confidential"
  studentId?: string;
  incidentDate: string;
  location: string;
  description: string;
  confidentialityLevel: "Strictly Confidential" | "Standard";
  committeeAssigned: "Anti-Ragging Squad" | "Internal Complaints Committee (ICC)" | "Student Grievance Redressal (SGRC)";
  status: "Reported" | "Inquiry Scheduled" | "Action Taken" | "Closed & Resolved";
  actionTakenNotes?: string;
}

export const INITIAL_GRIEVANCES: GrievanceCase[] = [
  { id: "gr1", ticketNo: "AR-2024-004", category: "Anti-Ragging Incident", submittedBy: "Anonymous / Confidential", incidentDate: "2024-04-10", location: "Hostel Block A 1st Floor Common Room", description: "Verbal intimidation and demand for junior assignments submission by senior students.", confidentialityLevel: "Strictly Confidential", committeeAssigned: "Anti-Ragging Squad", status: "Action Taken", actionTakenNotes: "Disciplinary committee issued formal reprimand, notified parents, and mandated 2 weeks campus community service. Zero tolerance enforced." },
  { id: "gr2", ticketNo: "ICC-2024-002", category: "Internal Complaints (ICC - Women Safety)", submittedBy: "Anonymous / Confidential", incidentDate: "2024-04-12", location: "Library Complex Entrance", description: "Inappropriate remarks passed by non-college trespassers near campus gate.", confidentialityLevel: "Strictly Confidential", committeeAssigned: "Internal Complaints Committee (ICC)", status: "Closed & Resolved", actionTakenNotes: "Campus security intensified with biometric barrier and 24/7 CCTV surveillance installed at gate." },
  { id: "gr3", ticketNo: "SGRC-2024-011", category: "Academic & Exam Evaluation", submittedBy: "Rahul Kumar", studentId: "s1", incidentDate: "2024-04-16", location: "Exam Evaluation Cell", description: "Request for answer script re-evaluation for Midterm DBMS paper.", confidentialityLevel: "Standard", committeeAssigned: "Student Grievance Redressal (SGRC)", status: "Closed & Resolved", actionTakenNotes: "Script re-checked by external evaluator; 4 marks updated in ledger." },
];

// ─── 9. Smart Digital Library & E-Resources Models ──────────────────────────
export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: "Computer Science" | "Electronics" | "Management" | "Mechanical" | "Civil" | "Basic Sciences";
  rackLocation: string; // e.g. "Rack CS-04 / Shelf 2"
  totalCopies: number;
  availableCopies: number;
  edition: string;
  publisher: string;
  year: number;
  coverImage?: string;
}

export interface BookIssueRecord {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: "Issued" | "Returned" | "Overdue" | "Renewed";
  overdueFine: number; // ₹2/day
}

export interface EResourceItem {
  id: string;
  title: string;
  provider: "National Digital Library (NDLI)" | "NPTEL / SWAYAM" | "IEEE Xplore" | "Open Access Textbook" | "SpringerLink";
  category: string;
  type: "PDF Textbook" | "Video Lecture Series" | "Research Paper Journal" | "Standard Code";
  accessUrl: string;
  downloadsCount: number;
  rating: number;
}

export const INITIAL_LIBRARY_BOOKS: LibraryBook[] = [
  { id: "lb1", isbn: "978-0131103627", title: "The C Programming Language (ANSI C)", author: "Brian W. Kernighan, Dennis M. Ritchie", category: "Computer Science", rackLocation: "Rack CS-01 / Shelf A", totalCopies: 12, availableCopies: 5, edition: "2nd Edition", publisher: "Prentice Hall", year: 2018 },
  { id: "lb2", isbn: "978-0262033848", title: "Introduction to Algorithms (CLRS)", author: "Thomas H. Cormen, Charles E. Leiserson", category: "Computer Science", rackLocation: "Rack CS-03 / Shelf B", totalCopies: 15, availableCopies: 4, edition: "3rd Edition", publisher: "MIT Press", year: 2020 },
  { id: "lb3", isbn: "978-0070593787", title: "Microelectronic Circuits: Theory & Applications", author: "Adel S. Sedra, Kenneth C. Smith", category: "Electronics", rackLocation: "Rack EC-02 / Shelf C", totalCopies: 8, availableCopies: 2, edition: "7th Edition", publisher: "Oxford University Press", year: 2019 },
  { id: "lb4", isbn: "978-9332518742", title: "Database System Concepts", author: "Abraham Silberschatz, Henry F. Korth", category: "Computer Science", rackLocation: "Rack CS-05 / Shelf A", totalCopies: 10, availableCopies: 6, edition: "6th Edition", publisher: "McGraw-Hill", year: 2021 },
  { id: "lb5", isbn: "978-0134444390", title: "Principles of Marketing (Indian Edition)", author: "Philip Kotler, Gary Armstrong", category: "Management", rackLocation: "Rack MG-01 / Shelf B", totalCopies: 6, availableCopies: 3, edition: "17th Edition", publisher: "Pearson", year: 2022 },
  { id: "lb6", isbn: "978-0130669292", title: "Fluid Mechanics & Turbo Machines", author: "Frank M. White", category: "Mechanical", rackLocation: "Rack ME-04 / Shelf D", totalCopies: 7, availableCopies: 3, edition: "8th Edition", publisher: "McGraw-Hill", year: 2020 },
];

export const INITIAL_BOOK_ISSUES: BookIssueRecord[] = [
  { id: "bi1", bookId: "lb2", studentId: "s1", issueDate: "2024-04-01", dueDate: "2024-04-15", returnDate: "2024-04-14", status: "Returned", overdueFine: 0 },
  { id: "bi2", bookId: "lb1", studentId: "s3", issueDate: "2024-04-05", dueDate: "2024-04-19", status: "Overdue", overdueFine: 12 },
  { id: "bi3", bookId: "lb4", studentId: "s2", issueDate: "2024-04-12", dueDate: "2024-04-26", status: "Issued", overdueFine: 0 },
  { id: "bi4", bookId: "lb3", studentId: "s4", issueDate: "2024-04-10", dueDate: "2024-04-24", status: "Renewed", overdueFine: 0 },
];

export const INITIAL_E_RESOURCES: EResourceItem[] = [
  { id: "er1", title: "Data Structures & Algorithms in C++", provider: "NPTEL / SWAYAM", category: "Computer Science", type: "Video Lecture Series", accessUrl: "https://nptel.ac.in/courses/106102064", downloadsCount: 1420, rating: 4.9 },
  { id: "er2", title: "Deep Learning Neural Networks & Transformers", provider: "IEEE Xplore", category: "Artificial Intelligence", type: "Research Paper Journal", accessUrl: "https://ieeexplore.ieee.org", downloadsCount: 880, rating: 4.8 },
  { id: "er3", title: "Indian Financial System & Corporate Accounting", provider: "National Digital Library (NDLI)", category: "Commerce", type: "PDF Textbook", accessUrl: "https://ndl.iitkgp.ac.in", downloadsCount: 650, rating: 4.7 },
  { id: "er4", title: "VLSI Digital Circuit Design Handbook", provider: "SpringerLink", category: "Electronics", type: "PDF Textbook", accessUrl: "https://link.springer.com", downloadsCount: 430, rating: 4.6 },
];

// ─── 10. Campus Transport & GPS Bus Tracking Models ─────────────────────────
export interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string; // e.g. "North Corridor Express (Hebbal to Campus)"
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  attendantName: string;
  attendantPhone: string;
  totalSeats: number;
  assignedStudents: number;
  currentStop: string;
  nextStop: string;
  currentSpeedKmH: number;
  status: "En Route" | "At Station" | "Completed" | "Maintenance";
  stops: { stopName: string; morningPickupTime: string; eveningDropTime: string; feePerSemester: number }[];
}

export interface StudentBusPass {
  id: string;
  studentId: string;
  routeId: string;
  pickupStop: string;
  passNumber: string;
  validUpto: string;
  feeStatus: "Paid" | "Pending";
  amountPaid: number;
  qrToken: string;
}

export const INITIAL_BUS_ROUTES: BusRoute[] = [
  {
    id: "br1",
    routeNumber: "Route 01",
    routeName: "City Central - Station - Campus",
    vehicleNumber: "KA-01-F-4589",
    driverName: "Rameshwar Yadav",
    driverPhone: "+91 98451 23411",
    attendantName: "Suresh Gowda",
    attendantPhone: "+91 98451 23412",
    totalSeats: 48,
    assignedStudents: 42,
    currentStop: "Railway Station Cross",
    nextStop: "Tech Circle",
    currentSpeedKmH: 38,
    status: "En Route",
    stops: [
      { stopName: "Majestic City Centre", morningPickupTime: "07:15 AM", eveningDropTime: "05:45 PM", feePerSemester: 12000 },
      { stopName: "Railway Station Cross", morningPickupTime: "07:30 AM", eveningDropTime: "05:30 PM", feePerSemester: 11000 },
      { stopName: "Tech Circle", morningPickupTime: "07:50 AM", eveningDropTime: "05:10 PM", feePerSemester: 9000 },
      { stopName: "College Main Gate", morningPickupTime: "08:15 AM", eveningDropTime: "04:45 PM", feePerSemester: 0 },
    ],
  },
  {
    id: "br2",
    routeNumber: "Route 02",
    routeName: "Airport Highway - Yelahanka - Campus",
    vehicleNumber: "KA-04-E-8821",
    driverName: "Balaram Naidu",
    driverPhone: "+91 94480 77123",
    attendantName: "Manjunath K.",
    attendantPhone: "+91 94480 77124",
    totalSeats: 52,
    assignedStudents: 49,
    currentStop: "Yelahanka Police Station",
    nextStop: "Kogilu Junction",
    currentSpeedKmH: 45,
    status: "En Route",
    stops: [
      { stopName: "Hebbal Flyover", morningPickupTime: "07:10 AM", eveningDropTime: "05:50 PM", feePerSemester: 13000 },
      { stopName: "Yelahanka Police Station", morningPickupTime: "07:35 AM", eveningDropTime: "05:25 PM", feePerSemester: 10500 },
      { stopName: "Kogilu Junction", morningPickupTime: "07:55 AM", eveningDropTime: "05:05 PM", feePerSemester: 8500 },
      { stopName: "College Main Gate", morningPickupTime: "08:20 AM", eveningDropTime: "04:40 PM", feePerSemester: 0 },
    ],
  },
  {
    id: "br3",
    routeNumber: "Route 03",
    routeName: "South Ring Road - Bannerghatta - Campus",
    vehicleNumber: "KA-05-AB-3104",
    driverName: "Mohammed Farooq",
    driverPhone: "+91 97410 99881",
    attendantName: "Gopal Krishna",
    attendantPhone: "+91 97410 99882",
    totalSeats: 45,
    assignedStudents: 36,
    currentStop: "College Main Gate",
    nextStop: "Trip Completed",
    currentSpeedKmH: 0,
    status: "At Station",
    stops: [
      { stopName: "Jayanagar 4th Block", morningPickupTime: "07:05 AM", eveningDropTime: "06:00 PM", feePerSemester: 14000 },
      { stopName: "BTM Layout", morningPickupTime: "07:25 AM", eveningDropTime: "05:40 PM", feePerSemester: 12500 },
      { stopName: "Silk Board Junction", morningPickupTime: "07:45 AM", eveningDropTime: "05:20 PM", feePerSemester: 11000 },
      { stopName: "College Main Gate", morningPickupTime: "08:25 AM", eveningDropTime: "04:35 PM", feePerSemester: 0 },
    ],
  },
];

export const INITIAL_STUDENT_BUS_PASSES: StudentBusPass[] = [
  { id: "bp1", studentId: "s1", routeId: "br1", pickupStop: "Railway Station Cross", passNumber: "PASS-2024-R01-042", validUpto: "2024-12-31", feeStatus: "Paid", amountPaid: 11000, qrToken: "QR-BUS-R1-S1-VALID" },
  { id: "bp2", studentId: "s2", routeId: "br2", pickupStop: "Hebbal Flyover", passNumber: "PASS-2024-R02-019", validUpto: "2024-12-31", feeStatus: "Paid", amountPaid: 13000, qrToken: "QR-BUS-R2-S2-VALID" },
  { id: "bp3", studentId: "s5", routeId: "br3", pickupStop: "BTM Layout", passNumber: "PASS-2024-R03-011", validUpto: "2024-12-31", feeStatus: "Paid", amountPaid: 12500, qrToken: "QR-BUS-R3-S5-VALID" },
];

// ─── 11. Campus Life, Clubs & Tech-Fest Models ──────────────────────────────
export interface StudentClub {
  id: string;
  name: string;
  category: "Technical / Coding" | "Robotics & AI" | "Cultural & Arts" | "Social Service & NSS/NCC" | "Sports & Athletics" | "Entrepreneurship";
  leadStudentName: string;
  leadStudentId: string;
  facultyCoordinator: string;
  memberCount: number;
  description: string;
  meetingSchedule: string;
  logoEmoji: string;
  achievements: string[];
}

export interface CampusEvent {
  id: string;
  title: string;
  festName: string; // e.g. "INVICTUS 2024 - Annual Tech Fest"
  category: "Hackathon" | "Cultural Fest" | "Robotics Arena" | "Sports Meet" | "Guest Keynote" | "Management Conclave";
  date: string;
  venue: string;
  prizePool: string;
  registrationFee: string;
  coordinatorContact: string;
  registeredCount: number;
  status: "Registrations Open" | "Ongoing" | "Completed";
  description: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  studentId: string;
  studentName: string;
  registeredDate: string;
  certificateIssued: boolean;
  status: "Confirmed" | "Attended" | "Winner - 1st Prize" | "Runner-Up";
}

export const INITIAL_CLUBS: StudentClub[] = [
  { id: "cl1", name: "Google Developer Student Club (GDSC)", category: "Technical / Coding", leadStudentName: "Rahul Kumar", leadStudentId: "s1", facultyCoordinator: "Dr. Rajesh Sharma (HOD CS)", memberCount: 145, description: "Hands-on workshops in Web, Cloud, Flutter, and Open Source Software.", meetingSchedule: "Every Wednesday 4:30 PM (CS Lab 3)", logoEmoji: "💻", achievements: ["National Smart India Hackathon Top 5", "Published 6 Open-Source Libraries"] },
  { id: "cl2", name: "Autonomous Robotics & Drone Cell", category: "Robotics & AI", leadStudentName: "Vikram Patil", leadStudentId: "s4", facultyCoordinator: "Prof. Sunita Rao", memberCount: 68, description: "Building autonomous line followers, combat robots, and agricultural drones.", meetingSchedule: "Every Friday 4:00 PM (Mechatronics Lab)", logoEmoji: "🤖", achievements: ["1st Prize at IIT Bombay Techfest Robotics", "Patent for Seed Dropping Drone"] },
  { id: "cl3", name: "Rotaract & NSS Youth Brigade", category: "Social Service & NSS/NCC", leadStudentName: "Priya Singh", leadStudentId: "s2", facultyCoordinator: "Dr. Ananya Sen", memberCount: 120, description: "Community social welfare, annual blood donation camps, and rural school literacy drives.", meetingSchedule: "Alternate Saturdays (Auditorium)", logoEmoji: "🤝", achievements: ["Collected 500+ Blood Units", "Educated 300+ Rural School Children"] },
  { id: "cl4", name: "Music, Drama & Cultural Society (DHWANI)", category: "Cultural & Arts", leadStudentName: "Neha Gupta", leadStudentId: "s6", facultyCoordinator: "Prof. K. Venkatesh", memberCount: 95, description: "Battle of Bands, classical dance concerts, street plays, and fest orchestration.", meetingSchedule: "Every Thursday 5:00 PM (Amphitheatre)", logoEmoji: "🎭", achievements: ["State Inter-University Cultural Trophy 2023", "Recorded Original College Anthem"] },
];

export const INITIAL_EVENTS: CampusEvent[] = [
  { id: "ev1", title: "HACK-VORTEX 36-Hour National Hackathon", festName: "INVICTUS 2024 Tech Fest", category: "Hackathon", date: "2024-05-18", venue: "Central Computer Center & Campus Auditorium", prizePool: "₹2,50,000 Cash + Cloud Credits", registrationFee: "Free for Students", coordinatorContact: "Rahul Kumar (+91 98765 43210)", registeredCount: 240, status: "Registrations Open", description: "36-Hour non-stop hackathon on AI/ML, Web3, FinTech, and Clean Energy solutions." },
  { id: "ev2", title: "ROBO-WARS: 15kg Combat Arena", festName: "INVICTUS 2024 Tech Fest", category: "Robotics Arena", date: "2024-05-19", venue: "Mechanical Workshop Quadrangle", prizePool: "₹75,000 Cash", registrationFee: "₹500 / Team", coordinatorContact: "Vikram Patil (+91 91234 56789)", registeredCount: 42, status: "Registrations Open", description: "Extreme robot combat showdown with spinning blades, flippers, and wedge bots." },
  { id: "ev3", title: "TARANG Annual Inter-College Cultural Extravaganza", festName: "TARANG 2024", category: "Cultural Fest", date: "2024-06-02", venue: "Open Air Amphitheatre", prizePool: "₹1,50,000 Cash + Trophies", registrationFee: "Free", coordinatorContact: "Neha Gupta (+91 98111 22334)", registeredCount: 520, status: "Registrations Open", description: "Rock band night, fusion dance championship, fashion runway, and celebrity DJ concert." },
];

export const INITIAL_EVENT_REGISTRATIONS: EventRegistration[] = [
  { id: "er1", eventId: "ev1", studentId: "s1", studentName: "Rahul Kumar", registeredDate: "2024-04-18", certificateIssued: true, status: "Confirmed" },
  { id: "er2", eventId: "ev1", studentId: "s10", studentName: "Arjun Verma", registeredDate: "2024-04-19", certificateIssued: true, status: "Confirmed" },
  { id: "er3", eventId: "ev2", studentId: "s4", studentName: "Vikram Patil", registeredDate: "2024-04-20", certificateIssued: false, status: "Confirmed" },
];

// ─── 12. Smart Attendance Kiosk & Faculty Leave Models ──────────────────────
export interface AttendancePunch {
  id: string;
  personType: "Student" | "Faculty";
  personId: string;
  personName: string;
  department: string;
  punchTime: string;
  punchType: "In" | "Out";
  verificationMethod: "QR Code Scan" | "Biometric Fingerprint" | "Geofenced Mobile Tap";
  status: "On Time" | "Late Punch" | "Overtime";
}

export interface FacultyLeaveRequest {
  id: string;
  facultyId: string;
  facultyName: string;
  department: string;
  leaveType: "Casual Leave (CL)" | "Medical Leave (ML)" | "Earned Leave (EL)" | "On-Duty (OD) / Conference";
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  substituteFaculty: string;
  status: "Pending Principal Approval" | "Approved" | "Rejected";
  approvedDate?: string;
}

export const INITIAL_ATTENDANCE_PUNCHES: AttendancePunch[] = [
  { id: "ap1", personType: "Faculty", personId: "f1", personName: "Dr. Rajesh Sharma", department: "Computer Science", punchTime: "2024-04-22 08:42 AM", punchType: "In", verificationMethod: "Biometric Fingerprint", status: "On Time" },
  { id: "ap2", personType: "Faculty", personId: "f2", personName: "Prof. Sunita Rao", department: "Electronics", punchTime: "2024-04-22 08:50 AM", punchType: "In", verificationMethod: "Geofenced Mobile Tap", status: "On Time" },
  { id: "ap3", personType: "Student", personId: "s1", personName: "Rahul Kumar", department: "Computer Science", punchTime: "2024-04-22 08:55 AM", punchType: "In", verificationMethod: "QR Code Scan", status: "On Time" },
  { id: "ap4", personType: "Student", personId: "s3", personName: "Amit Sharma", department: "Computer Science", punchTime: "2024-04-22 09:22 AM", punchType: "In", verificationMethod: "QR Code Scan", status: "Late Punch" },
  { id: "ap5", personType: "Student", personId: "s2", personName: "Priya Singh", department: "Electronics", punchTime: "2024-04-22 08:48 AM", punchType: "In", verificationMethod: "Geofenced Mobile Tap", status: "On Time" },
];

export const INITIAL_FACULTY_LEAVES: FacultyLeaveRequest[] = [
  { id: "fl1", facultyId: "f1", facultyName: "Dr. Rajesh Sharma", department: "Computer Science", leaveType: "On-Duty (OD) / Conference", startDate: "2024-05-02", endDate: "2024-05-04", totalDays: 3, reason: "Presenting IEEE Keynote paper on Machine Learning at IIT Delhi.", substituteFaculty: "Prof. Sunita Rao", status: "Approved", approvedDate: "2024-04-20" },
  { id: "fl2", facultyId: "f2", facultyName: "Prof. Sunita Rao", department: "Electronics", leaveType: "Casual Leave (CL)", startDate: "2024-05-10", endDate: "2024-05-11", totalDays: 2, reason: "Personal family commitment.", substituteFaculty: "Dr. Rajesh Sharma", status: "Pending Principal Approval" },
];
