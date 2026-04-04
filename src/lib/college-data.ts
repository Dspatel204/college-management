export interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  avatar: string;
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

export const STUDENTS: Student[] = [
  { id: "s1", name: "Rahul Kumar", rollNo: "CS2024001", department: "Computer Science", semester: 4, email: "rahul@college.com", phone: "9876543210", avatar: "RK" },
  { id: "s2", name: "Priya Singh", rollNo: "CS2024002", department: "Computer Science", semester: 4, email: "priya@college.com", phone: "9876543211", avatar: "PS" },
  { id: "s3", name: "Amit Patel", rollNo: "CS2024003", department: "Computer Science", semester: 4, email: "amit@college.com", phone: "9876543212", avatar: "AP" },
  { id: "s4", name: "Neha Sharma", rollNo: "EC2024001", department: "Electronics", semester: 4, email: "neha@college.com", phone: "9876543213", avatar: "NS" },
  { id: "s5", name: "Vikram Joshi", rollNo: "ME2024001", department: "Mechanical", semester: 4, email: "vikram@college.com", phone: "9876543214", avatar: "VJ" },
  { id: "s6", name: "Sneha Reddy", rollNo: "CS2024004", department: "Computer Science", semester: 2, email: "sneha@college.com", phone: "9876543215", avatar: "SR" },
  { id: "s7", name: "Arjun Verma", rollNo: "EC2024002", department: "Electronics", semester: 2, email: "arjun@college.com", phone: "9876543216", avatar: "AV" },
  { id: "s8", name: "Kavita Nair", rollNo: "CE2024001", department: "Civil", semester: 6, email: "kavita@college.com", phone: "9876543217", avatar: "KN" },
  { id: "s9", name: "Rohit Mehta", rollNo: "EE2024001", department: "Electrical", semester: 6, email: "rohit@college.com", phone: "9876543218", avatar: "RM" },
  { id: "s10", name: "Ananya Das", rollNo: "CS2024005", department: "Computer Science", semester: 6, email: "ananya@college.com", phone: "9876543219", avatar: "AD" },
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

export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}
