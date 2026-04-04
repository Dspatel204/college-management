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
  { studentId: "s1", date: yesterday, status: "present", subject: "DBMS" },
  { studentId: "s2", date: yesterday, status: "absent", subject: "DBMS" },
  { studentId: "s3", date: yesterday, status: "present", subject: "DBMS" },
];
