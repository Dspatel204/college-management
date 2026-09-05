// ─── Frontend Mock & Offline Storage Engine + Commented Backend API ───────────
// This file provides complete client-side functionality with persistent LocalStorage,
// allowing the entire College Management System to run standalone on the frontend.
// The backend / API endpoints are clearly commented for reference.

import {
  STUDENTS,
  FACULTY,
  COURSES,
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  EXAM_SCHEDULES,
  EXAM_RESULTS,
  INITIAL_PLACEMENT_DRIVES,
  INITIAL_STUDENT_PLACEMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_BROADCAST_ALERTS,
  calculateGrade,
  type PlacementDrive,
  type StudentPlacementProfile,
  type PlacementApplication,
  type BroadcastAlert,
} from "@/lib/college-data";

// ─── Backend Axios Client (Commented for standalone frontend execution) ──────
/*
import axios, { type AxiosError, type AxiosResponse } from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://college-management-n6be.onrender.com/api";
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("college_token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
*/

const TOKEN_KEY = "college_token";
const USER_KEY = "college_user";

// ─── LocalStorage Persistence Keys ──────────────────────────────────────────
const KEYS = {
  STUDENTS: "college_students_data",
  FACULTY: "college_faculty_data",
  COURSES: "college_courses_data",
  TIMETABLE: "college_timetable_data",
  ATTENDANCE: "college_attendance_data",
  FEES: "college_fees_data",
  EXAMS: "college_exams_data",
  RESULTS: "college_results_data",
  PLACEMENT_DRIVES: "college_placement_drives",
  STUDENT_PLACEMENTS: "college_student_placements",
  APPLICATIONS: "college_placement_applications",
  BROADCAST_ALERTS: "college_broadcast_alerts",
};

// ─── Storage Helpers ────────────────────────────────────────────────────────
function getStore<T>(key: string, initialData: T[]): T[] {
  if (typeof window === "undefined") return initialData;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return initialData;
  }
}

function setStore<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// ─── Types ──────────────────────────────────────────────────────────────────
export type Student = {
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
};

export type Faculty = {
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
};

export type AttendanceRecord = {
  studentId: string;
  date: string;
  status: "present" | "absent" | "late";
  subject: string;
};

export type FeeRecord = {
  id: string;
  studentId: string;
  type: "tuition" | "exam" | "library" | "hostel" | "lab";
  amount: number;
  paid: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "partial" | "pending" | "overdue";
  receiptNo?: string;
};

export type ExamSchedule = {
  id: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  department: string;
  semester: number;
  type: "midterm" | "final" | "internal";
};

export type ExamResult = {
  id: string;
  studentId: string;
  subject: string;
  examType: "midterm" | "final" | "internal";
  marksObtained: number;
  totalMarks: number;
  grade: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  semester: number;
  teacher: string;
  description: string;
};

export type TimetableEntry = {
  id: string;
  day: string;
  time: string;
  subject: string;
  facultyId: string;
  department: string;
  semester: number;
  room: string;
};

export type ReportData = {
  studentReport: Array<{
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
    attendanceRate: number;
    totalClasses: number;
    presentClasses: number;
    totalFee: number;
    paidFee: number;
    feeStatus: "paid" | "partial" | "pending";
  }>;
  attendanceBySubject: Array<{
    subject: string;
    total: number;
    present: number;
    absent: number;
    late: number;
    rate: number;
  }>;
  feeByDept: Array<{
    department: string;
    total: number;
    collected: number;
    pending: number;
    rate: number;
  }>;
  totals: {
    totalFees: number;
    totalCollected: number;
  };
};

export type CreateStudentInput = {
  name: string;
  rollNo: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  status?: "active" | "inactive" | "graduated";
  enrolledCourses?: string[];
  avatar?: string;
};

export type UpdateStudentInput = Partial<CreateStudentInput>;

export type CreateFacultyInput = {
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  assignedSubjects?: string[];
  assignedClasses?: string[];
  qualification?: string;
  avatar?: string;
  joinDate?: string;
};

export type UpdateFacultyInput = Partial<CreateFacultyInput>;

export type SaveAttendancePayload = {
  date: string;
  subject: string;
  records: Array<{ studentId: string; status: "present" | "absent" | "late" }>;
};

export type CreateFeeInput = {
  studentId: string;
  type: "tuition" | "exam" | "library" | "hostel" | "lab";
  amount: number;
  paid?: number;
  dueDate?: string;
  paidDate?: string;
  status?: "paid" | "partial" | "pending" | "overdue";
  receiptNo?: string;
};

export type UpdateFeeInput = Partial<CreateFeeInput>;

export type CreateExamScheduleInput = {
  subject: string;
  date: string;
  time: string;
  room: string;
  department?: string;
  semester?: number;
  type?: "midterm" | "final" | "internal";
};

export type GetExamResultsParams = {
  studentId?: string;
  subject?: string;
  examType?: string;
  department?: string;
  semester?: string;
};

export type CreateExamResultInput = {
  studentId: string;
  subject: string;
  examType?: "midterm" | "final" | "internal";
  marksObtained: number;
  totalMarks: number;
};

export type UpdateExamResultInput = Partial<CreateExamResultInput>;

export type CreateCourseInput = {
  name: string;
  code: string;
  department: string;
  credits?: number;
  semester?: number;
  teacher?: string;
  description?: string;
};

export type UpdateCourseInput = Partial<CreateCourseInput>;

export type CreateTimetableEntryInput = {
  day: string;
  time: string;
  subject: string;
  facultyId: string;
  department: string;
  semester: number;
  room: string;
};

// ─── Auth API ────────────────────────────────────────────────────────────────
export async function loginUser(email: string, password?: string) {
  // [Backend API reference]:
  // const { data } = await api.post("/auth/login", { email, password });
  // return data;

  const normalized = email.trim().toLowerCase();
  let role: "admin" | "teacher" | "student" = "admin";
  let name = "Administrator";

  if (normalized.includes("student")) {
    role = "student";
    name = "Rahul Kumar (Student)";
  } else if (normalized.includes("teacher") || normalized.includes("faculty") || normalized.includes("prof")) {
    role = "teacher";
    name = "Prof. Gupta";
  } else {
    name = email.split("@")[0] ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1) : "Admin User";
  }

  const user = {
    id: "user_" + (role === "admin" ? "admin1" : role === "teacher" ? "f1" : "s1"),
    name,
    email: normalized,
    role,
    avatar: role === "student" ? "RK" : role === "teacher" ? "PG" : "AD",
  };

  const token = "mock_jwt_token_" + Date.now();
  return { token, user };
}

export async function registerUser(payload: { name: string; email: string; password?: string; role?: string }) {
  // [Backend API reference]:
  // const { data } = await api.post("/auth/register", payload);
  // return data;

  const role = (payload.role as "admin" | "teacher" | "student") || "student";
  const user = {
    id: "user_" + Date.now(),
    name: payload.name,
    email: payload.email,
    role,
    avatar: payload.name.slice(0, 2).toUpperCase(),
  };
  const token = "mock_jwt_token_" + Date.now();
  return { token, user };
}

export async function getMe() {
  // [Backend API reference]:
  // const { data } = await api.get("/auth/me");
  // return data;

  const stored = localStorage.getItem(USER_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    id: "user_admin1",
    name: "Admin",
    email: "admin@college.com",
    role: "admin",
    avatar: "AD",
  };
}

// ─── Upload API ──────────────────────────────────────────────────────────────
export async function uploadAvatar(file: File): Promise<{ url: string; publicId: string }> {
  // [Backend API reference]:
  // const form = new FormData();
  // form.append("avatar", file);
  // const { data } = await api.post("/upload/avatar", form, { headers: { "Content-Type": "multipart/form-data" } });
  // return data;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        publicId: "avatar_" + Date.now(),
      });
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function uploadDocument(file: File): Promise<{ url: string; publicId: string }> {
  // [Backend API reference]:
  // const form = new FormData();
  // form.append("document", file);
  // const { data } = await api.post("/upload/document", form);
  // return data;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        publicId: "doc_" + Date.now(),
      });
    };
    reader.onerror = () => reject(new Error("Failed to read document"));
    reader.readAsDataURL(file);
  });
}

// ─── Payment API ─────────────────────────────────────────────────────────────
export async function createPaymentOrder(feeId: string) {
  // [Backend API reference]:
  // const { data } = await api.post("/payments/create-order", { feeId });
  // return data;

  const fees = getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);
  const fee = fees.find((f) => f.id === feeId);
  const amount = fee ? (fee.amount - fee.paid) * 100 : 500000;

  return {
    orderId: "order_mock_" + Date.now(),
    amount,
    currency: "INR",
    keyId: "rzp_test_mock_frontend",
  };
}

export async function verifyPayment(payload: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  feeId: string;
}) {
  // [Backend API reference]:
  // const { data } = await api.post("/payments/verify", payload);
  // return data;

  const fees = getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);
  const receiptNo = "REC-2024-" + Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toISOString().split("T")[0];

  const updatedFees = fees.map((f) => {
    if (f.id === payload.feeId) {
      return {
        ...f,
        paid: f.amount,
        status: "paid" as const,
        paidDate: today,
        receiptNo,
      };
    }
    return f;
  });

  setStore(KEYS.FEES, updatedFees);
  const updatedFee = updatedFees.find((f) => f.id === payload.feeId);

  return {
    success: true,
    receiptNo,
    fee: updatedFee,
  };
}

// ─── Students API ────────────────────────────────────────────────────────────
export async function getStudents(): Promise<Student[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/students");
  // return data;

  return getStore<Student>(KEYS.STUDENTS, STUDENTS);
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  // [Backend API reference]:
  // const { data } = await api.get(`/students/${encodeURIComponent(id)}`);
  // return data;

  const students = getStore<Student>(KEYS.STUDENTS, STUDENTS);
  return students.find((s) => s.id === id);
}

export async function createStudent(data: CreateStudentInput): Promise<Student> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/students", data);
  // return result;

  const students = getStore<Student>(KEYS.STUDENTS, STUDENTS);
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const newStudent: Student = {
    id: "s_" + Date.now(),
    name: data.name,
    rollNo: data.rollNo,
    department: data.department,
    semester: Number(data.semester) || 1,
    email: data.email,
    phone: data.phone,
    avatar: data.avatar || initials || "ST",
    admissionDate: new Date().toISOString().split("T")[0],
    address: data.address || "",
    guardianName: data.guardianName || "",
    guardianPhone: data.guardianPhone || "",
    status: data.status || "active",
    enrolledCourses: data.enrolledCourses || [],
  };

  const updated = [newStudent, ...students];
  setStore(KEYS.STUDENTS, updated);
  return newStudent;
}

export async function updateStudent(id: string, data: UpdateStudentInput): Promise<Student> {
  // [Backend API reference]:
  // const { data: result } = await api.put(`/students/${encodeURIComponent(id)}`, data);
  // return result;

  const students = getStore<Student>(KEYS.STUDENTS, STUDENTS);
  let updatedStudent: Student | null = null;

  const updated = students.map((s) => {
    if (s.id === id) {
      updatedStudent = {
        ...s,
        ...data,
        semester: data.semester !== undefined ? Number(data.semester) : s.semester,
      };
      return updatedStudent;
    }
    return s;
  });

  setStore(KEYS.STUDENTS, updated);
  return updatedStudent || (students.find((s) => s.id === id) as Student);
}

export async function deleteStudent(id: string): Promise<{ success: boolean }> {
  // [Backend API reference]:
  // const { data: result } = await api.delete(`/students/${encodeURIComponent(id)}`);
  // return result;

  const students = getStore<Student>(KEYS.STUDENTS, STUDENTS);
  setStore(
    KEYS.STUDENTS,
    students.filter((s) => s.id !== id)
  );
  return { success: true };
}

// ─── Faculty API ─────────────────────────────────────────────────────────────
export async function getFaculty(): Promise<Faculty[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/faculty");
  // return data;

  return getStore<Faculty>(KEYS.FACULTY, FACULTY);
}

export async function getFacultyById(id: string): Promise<Faculty | undefined> {
  // [Backend API reference]:
  // const { data } = await api.get(`/faculty/${encodeURIComponent(id)}`);
  // return data;

  const list = getStore<Faculty>(KEYS.FACULTY, FACULTY);
  return list.find((f) => f.id === id);
}

export async function createFaculty(data: CreateFacultyInput): Promise<Faculty> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/faculty", data);
  // return result;

  const list = getStore<Faculty>(KEYS.FACULTY, FACULTY);
  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const newFaculty: Faculty = {
    id: "f_" + Date.now(),
    name: data.name,
    employeeId: data.employeeId,
    department: data.department,
    designation: data.designation,
    email: data.email,
    phone: data.phone,
    avatar: data.avatar || initials || "FC",
    assignedSubjects: data.assignedSubjects || [],
    assignedClasses: data.assignedClasses || [],
    qualification: data.qualification || "M.Tech / Ph.D",
    joinDate: data.joinDate || new Date().toISOString().split("T")[0],
  };

  const updated = [newFaculty, ...list];
  setStore(KEYS.FACULTY, updated);
  return newFaculty;
}

export async function updateFacultyById(id: string, data: UpdateFacultyInput): Promise<Faculty> {
  // [Backend API reference]:
  // const { data: result } = await api.put(`/faculty/${encodeURIComponent(id)}`, data);
  // return result;

  const list = getStore<Faculty>(KEYS.FACULTY, FACULTY);
  let updatedFaculty: Faculty | null = null;

  const updated = list.map((f) => {
    if (f.id === id) {
      updatedFaculty = { ...f, ...data };
      return updatedFaculty;
    }
    return f;
  });

  setStore(KEYS.FACULTY, updated);
  return updatedFaculty || (list.find((f) => f.id === id) as Faculty);
}

export async function deleteFacultyById(id: string): Promise<{ success: boolean }> {
  // [Backend API reference]:
  // const { data: result } = await api.delete(`/faculty/${encodeURIComponent(id)}`);
  // return result;

  const list = getStore<Faculty>(KEYS.FACULTY, FACULTY);
  setStore(
    KEYS.FACULTY,
    list.filter((f) => f.id !== id)
  );
  return { success: true };
}

// ─── Attendance API ──────────────────────────────────────────────────────────
export async function getAttendance(params?: { date?: string; subject?: string }): Promise<AttendanceRecord[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/attendance", { params });
  // return data;

  const list = getStore<AttendanceRecord>(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  return list.filter((a) => {
    const matchDate = !params?.date || a.date === params.date;
    const matchSubject = !params?.subject || a.subject === params.subject;
    return matchDate && matchSubject;
  });
}

export async function saveAttendance(payload: SaveAttendancePayload): Promise<{ success: boolean; count: number }> {
  // [Backend API reference]:
  // const { data } = await api.post("/attendance", payload);
  // return data;

  const list = getStore<AttendanceRecord>(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  // Remove existing records for the same date & subject
  const filtered = list.filter((a) => !(a.date === payload.date && a.subject === payload.subject));
  const newRecords: AttendanceRecord[] = payload.records.map((r) => ({
    studentId: r.studentId,
    date: payload.date,
    subject: payload.subject,
    status: r.status,
  }));

  setStore(KEYS.ATTENDANCE, [...newRecords, ...filtered]);
  return { success: true, count: newRecords.length };
}

// ─── Fees API ────────────────────────────────────────────────────────────────
export async function getFees(): Promise<FeeRecord[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/fees");
  // return data;

  return getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);
}

export async function createFee(data: CreateFeeInput): Promise<FeeRecord> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/fees", data);
  // return result;

  const list = getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);
  const paid = Number(data.paid) || 0;
  const amount = Number(data.amount) || 0;
  const status = data.status || (paid >= amount ? "paid" : paid > 0 ? "partial" : "pending");

  const newFee: FeeRecord = {
    id: "fee_" + Date.now(),
    studentId: data.studentId,
    type: data.type,
    amount,
    paid,
    dueDate: data.dueDate || new Date().toISOString().split("T")[0],
    paidDate: paid > 0 ? data.paidDate || new Date().toISOString().split("T")[0] : undefined,
    status,
    receiptNo: paid > 0 ? "REC-2024-" + Math.floor(1000 + Math.random() * 9000) : undefined,
  };

  const updated = [newFee, ...list];
  setStore(KEYS.FEES, updated);
  return newFee;
}

export async function updateFee(id: string, data: UpdateFeeInput): Promise<FeeRecord> {
  // [Backend API reference]:
  // const { data: result } = await api.put(`/fees/${encodeURIComponent(id)}`, data);
  // return result;

  const list = getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);
  let updatedFee: FeeRecord | null = null;

  const updated = list.map((f) => {
    if (f.id === id) {
      const amount = data.amount !== undefined ? Number(data.amount) : f.amount;
      const paid = data.paid !== undefined ? Number(data.paid) : f.paid;
      const status = data.status || (paid >= amount ? "paid" : paid > 0 ? "partial" : "pending");
      updatedFee = {
        ...f,
        ...data,
        amount,
        paid,
        status,
      };
      return updatedFee;
    }
    return f;
  });

  setStore(KEYS.FEES, updated);
  return updatedFee || (list.find((f) => f.id === id) as FeeRecord);
}

// ─── Exams API ───────────────────────────────────────────────────────────────
export async function getExamSchedules(): Promise<ExamSchedule[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/exams");
  // return data;

  return getStore<ExamSchedule>(KEYS.EXAMS, EXAM_SCHEDULES);
}

export async function createExamSchedule(data: CreateExamScheduleInput): Promise<ExamSchedule> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/exams", data);
  // return result;

  const list = getStore<ExamSchedule>(KEYS.EXAMS, EXAM_SCHEDULES);
  const newSchedule: ExamSchedule = {
    id: "e_" + Date.now(),
    subject: data.subject,
    date: data.date,
    time: data.time,
    room: data.room,
    department: data.department || "Computer Science",
    semester: Number(data.semester) || 4,
    type: data.type || "midterm",
  };

  const updated = [newSchedule, ...list];
  setStore(KEYS.EXAMS, updated);
  return newSchedule;
}

export async function getExamResults(params?: GetExamResultsParams): Promise<ExamResult[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/results", { params });
  // return data;

  const list = getStore<ExamResult>(KEYS.RESULTS, EXAM_RESULTS);
  return list.filter((r) => {
    if (params?.studentId && r.studentId !== params.studentId) return false;
    if (params?.subject && r.subject !== params.subject) return false;
    if (params?.examType && r.examType !== params.examType) return false;
    return true;
  });
}

export async function createExamResult(data: CreateExamResultInput): Promise<ExamResult> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/results", data);
  // return result;

  const list = getStore<ExamResult>(KEYS.RESULTS, EXAM_RESULTS);
  const marksObtained = Number(data.marksObtained);
  const totalMarks = Number(data.totalMarks) || 100;
  const percentage = (marksObtained / totalMarks) * 100;

  const newResult: ExamResult = {
    id: "r_" + Date.now(),
    studentId: data.studentId,
    subject: data.subject,
    examType: data.examType || "midterm",
    marksObtained,
    totalMarks,
    grade: calculateGrade(percentage),
  };

  const updated = [newResult, ...list];
  setStore(KEYS.RESULTS, updated);
  return newResult;
}

export async function updateExamResult(id: string, data: UpdateExamResultInput): Promise<ExamResult> {
  // [Backend API reference]:
  // const { data: result } = await api.put(`/results/${encodeURIComponent(id)}`, data);
  // return result;

  const list = getStore<ExamResult>(KEYS.RESULTS, EXAM_RESULTS);
  let updatedRes: ExamResult | null = null;

  const updated = list.map((r) => {
    if (r.id === id) {
      const marksObtained = data.marksObtained !== undefined ? Number(data.marksObtained) : r.marksObtained;
      const totalMarks = data.totalMarks !== undefined ? Number(data.totalMarks) : r.totalMarks;
      const grade = calculateGrade((marksObtained / totalMarks) * 100);
      updatedRes = {
        ...r,
        ...data,
        marksObtained,
        totalMarks,
        grade,
      };
      return updatedRes;
    }
    return r;
  });

  setStore(KEYS.RESULTS, updated);
  return updatedRes || (list.find((r) => r.id === id) as ExamResult);
}

export async function deleteExamResult(id: string): Promise<{ success: boolean }> {
  // [Backend API reference]:
  // const { data: result } = await api.delete(`/results/${encodeURIComponent(id)}`);
  // return result;

  const list = getStore<ExamResult>(KEYS.RESULTS, EXAM_RESULTS);
  setStore(
    KEYS.RESULTS,
    list.filter((r) => r.id !== id)
  );
  return { success: true };
}

// ─── Courses API ─────────────────────────────────────────────────────────────
export async function getCourses(): Promise<Course[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/courses");
  // return data;

  return getStore<Course>(KEYS.COURSES, COURSES);
}

export async function createCourse(data: CreateCourseInput): Promise<Course> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/courses", data);
  // return result;

  const list = getStore<Course>(KEYS.COURSES, COURSES);
  const newCourse: Course = {
    id: "c_" + Date.now(),
    name: data.name,
    code: data.code,
    department: data.department,
    credits: Number(data.credits) || 3,
    semester: Number(data.semester) || 1,
    teacher: data.teacher || "Faculty Member",
    description: data.description || "",
  };

  const updated = [newCourse, ...list];
  setStore(KEYS.COURSES, updated);
  return newCourse;
}

export async function updateCourse(id: string, data: UpdateCourseInput): Promise<Course> {
  // [Backend API reference]:
  // const { data: result } = await api.put(`/courses/${encodeURIComponent(id)}`, data);
  // return result;

  const list = getStore<Course>(KEYS.COURSES, COURSES);
  let updatedCourse: Course | null = null;

  const updated = list.map((c) => {
    if (c.id === id) {
      updatedCourse = {
        ...c,
        ...data,
        credits: data.credits !== undefined ? Number(data.credits) : c.credits,
        semester: data.semester !== undefined ? Number(data.semester) : c.semester,
      };
      return updatedCourse;
    }
    return c;
  });

  setStore(KEYS.COURSES, updated);
  return updatedCourse || (list.find((c) => c.id === id) as Course);
}

export async function deleteCourse(id: string): Promise<{ success: boolean }> {
  // [Backend API reference]:
  // const { data: result } = await api.delete(`/courses/${encodeURIComponent(id)}`);
  // return result;

  const list = getStore<Course>(KEYS.COURSES, COURSES);
  setStore(
    KEYS.COURSES,
    list.filter((c) => c.id !== id)
  );
  return { success: true };
}

// ─── Timetable API ───────────────────────────────────────────────────────────
export async function getTimetable(): Promise<TimetableEntry[]> {
  // [Backend API reference]:
  // const { data } = await api.get("/timetable");
  // return data;

  return getStore<TimetableEntry>(KEYS.TIMETABLE, INITIAL_TIMETABLE);
}

export async function createTimetableEntry(data: CreateTimetableEntryInput): Promise<TimetableEntry> {
  // [Backend API reference]:
  // const { data: result } = await api.post("/timetable", data);
  // return result;

  const list = getStore<TimetableEntry>(KEYS.TIMETABLE, INITIAL_TIMETABLE);
  const newEntry: TimetableEntry = {
    id: "tt_" + Date.now(),
    day: data.day,
    time: data.time,
    subject: data.subject,
    facultyId: data.facultyId,
    department: data.department,
    semester: Number(data.semester) || 1,
    room: data.room,
  };

  const updated = [newEntry, ...list];
  setStore(KEYS.TIMETABLE, updated);
  return newEntry;
}

export async function deleteTimetableEntry(id: string): Promise<{ success: boolean }> {
  // [Backend API reference]:
  // const { data: result } = await api.delete(`/timetable/${encodeURIComponent(id)}`);
  // return result;

  const list = getStore<TimetableEntry>(KEYS.TIMETABLE, INITIAL_TIMETABLE);
  setStore(
    KEYS.TIMETABLE,
    list.filter((t) => t.id !== id)
  );
  return { success: true };
}

// ─── Reports API ─────────────────────────────────────────────────────────────
export async function getReports(params?: { department?: string }): Promise<ReportData> {
  // [Backend API reference]:
  // const { data } = await api.get("/reports", { params });
  // return data;

  const allStudents = getStore<Student>(KEYS.STUDENTS, STUDENTS);
  const allAttendance = getStore<AttendanceRecord>(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  const allFees = getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);

  const students = params?.department && params.department !== "all"
    ? allStudents.filter((s) => s.department === params.department)
    : allStudents;

  const studentReport = students.map((s) => {
    const studentAtt = allAttendance.filter((a) => a.studentId === s.id);
    const presentClasses = studentAtt.filter((a) => a.status === "present").length;
    const totalClasses = studentAtt.length || 1;
    const attendanceRate = studentAtt.length > 0 ? Math.round((presentClasses / studentAtt.length) * 100) : 85;

    const studentFees = allFees.filter((f) => f.studentId === s.id);
    const totalFee = studentFees.reduce((sum, f) => sum + f.amount, 0);
    const paidFee = studentFees.reduce((sum, f) => sum + f.paid, 0);
    const feeStatus: "paid" | "partial" | "pending" =
      paidFee >= totalFee && totalFee > 0 ? "paid" : paidFee > 0 ? "partial" : "pending";

    return {
      id: s.id,
      name: s.name,
      rollNo: s.rollNo,
      department: s.department,
      semester: s.semester,
      email: s.email,
      phone: s.phone,
      avatar: s.avatar,
      admissionDate: s.admissionDate,
      address: s.address,
      guardianName: s.guardianName,
      guardianPhone: s.guardianPhone,
      status: s.status,
      enrolledCourses: s.enrolledCourses,
      attendanceRate,
      totalClasses: studentAtt.length || 10,
      presentClasses: studentAtt.length ? presentClasses : 8,
      totalFee: totalFee || 50000,
      paidFee: paidFee || (s.id === "s1" || s.id === "s4" ? 50000 : 25000),
      feeStatus,
    };
  });

  const subjects = Array.from(new Set(allAttendance.map((a) => a.subject)));
  const attendanceBySubject = subjects.map((subj) => {
    const recs = allAttendance.filter((a) => a.subject === subj);
    const present = recs.filter((a) => a.status === "present").length;
    const absent = recs.filter((a) => a.status === "absent").length;
    const late = recs.filter((a) => a.status === "late").length;
    const total = recs.length;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    return { subject: subj, total, present, absent, late, rate };
  });

  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];
  const feeByDept = departments.map((dept) => {
    const deptStudents = allStudents.filter((s) => s.department === dept);
    const deptStudentIds = new Set(deptStudents.map((s) => s.id));
    const deptFees = allFees.filter((f) => deptStudentIds.has(f.studentId));
    const total = deptFees.reduce((sum, f) => sum + f.amount, 0) || 50000;
    const collected = deptFees.reduce((sum, f) => sum + f.paid, 0) || 25000;
    const pending = total - collected;
    const rate = total > 0 ? Math.round((collected / total) * 100) : 50;
    return { department: dept, total, collected, pending, rate };
  });

  const totalFees = allFees.reduce((sum, f) => sum + f.amount, 0);
  const totalCollected = allFees.reduce((sum, f) => sum + f.paid, 0);

  return {
    studentReport,
    attendanceBySubject,
    feeByDept,
    totals: {
      totalFees: totalFees || 380000,
      totalCollected: totalCollected || 242000,
    },
  };
}

// ─── Placement & Career API ──────────────────────────────────────────────────
export async function getPlacementDrives(): Promise<PlacementDrive[]> {
  return getStore<PlacementDrive>(KEYS.PLACEMENT_DRIVES, INITIAL_PLACEMENT_DRIVES);
}

export async function createPlacementDrive(data: Omit<PlacementDrive, "id" | "registeredCount" | "shortlistedCount" | "placedCount">): Promise<PlacementDrive> {
  const drives = getStore<PlacementDrive>(KEYS.PLACEMENT_DRIVES, INITIAL_PLACEMENT_DRIVES);
  const newDrive: PlacementDrive = {
    ...data,
    id: "pd_" + Date.now(),
    registeredCount: 0,
    shortlistedCount: 0,
    placedCount: 0,
  };
  const updated = [newDrive, ...drives];
  setStore(KEYS.PLACEMENT_DRIVES, updated);
  return newDrive;
}

export async function updatePlacementDrive(id: string, data: Partial<PlacementDrive>): Promise<PlacementDrive> {
  const drives = getStore<PlacementDrive>(KEYS.PLACEMENT_DRIVES, INITIAL_PLACEMENT_DRIVES);
  let updatedDrive: PlacementDrive | null = null;
  const updated = drives.map((d) => {
    if (d.id === id) {
      updatedDrive = { ...d, ...data };
      return updatedDrive;
    }
    return d;
  });
  setStore(KEYS.PLACEMENT_DRIVES, updated);
  return updatedDrive || drives[0];
}

export async function getStudentPlacements(): Promise<StudentPlacementProfile[]> {
  return getStore<StudentPlacementProfile>(KEYS.STUDENT_PLACEMENTS, INITIAL_STUDENT_PLACEMENTS);
}

export async function getPlacementApplications(): Promise<PlacementApplication[]> {
  return getStore<PlacementApplication>(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
}

export async function applyForPlacementDrive(driveId: string, studentId: string): Promise<PlacementApplication> {
  const apps = getStore<PlacementApplication>(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  const drives = getStore<PlacementDrive>(KEYS.PLACEMENT_DRIVES, INITIAL_PLACEMENT_DRIVES);

  const existing = apps.find((a) => a.driveId === driveId && a.studentId === studentId);
  if (existing) return existing;

  const newApp: PlacementApplication = {
    id: "app_" + Date.now(),
    driveId,
    studentId,
    appliedDate: new Date().toISOString().split("T")[0],
    status: "Applied",
  };

  setStore(KEYS.APPLICATIONS, [newApp, ...apps]);

  // Update drive count
  const updatedDrives = drives.map((d) => (d.id === driveId ? { ...d, registeredCount: d.registeredCount + 1 } : d));
  setStore(KEYS.PLACEMENT_DRIVES, updatedDrives);

  return newApp;
}

export async function updateApplicationStatus(id: string, status: PlacementApplication["status"], notes?: string): Promise<PlacementApplication> {
  const apps = getStore<PlacementApplication>(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  let updatedApp: PlacementApplication | null = null;
  const updated = apps.map((a) => {
    if (a.id === id) {
      updatedApp = { ...a, status, notes: notes !== undefined ? notes : a.notes };
      return updatedApp;
    }
    return a;
  });
  setStore(KEYS.APPLICATIONS, updated);
  return updatedApp || apps[0];
}

// ─── AI Academic Intelligence & Student 360° API ─────────────────────────────
export interface AIStudentMetric {
  student: Student;
  attendanceRate: number;
  totalClasses: number;
  presentClasses: number;
  avgMarks: number;
  totalExams: number;
  feePaidRate: number;
  feeDue: number;
  riskScore: number; // 0 (Safe) to 100 (Critical High Risk)
  riskLevel: "High Risk" | "Moderate Risk" | "Safe / Good Standing" | "Top Performer";
  riskFactors: string[];
  recommendations: string[];
  radarData: { metric: string; score: number }[];
  placementEligibility: boolean;
}

export async function getAIStudentAnalytics(): Promise<{
  metrics: AIStudentMetric[];
  overview: {
    highRiskCount: number;
    moderateRiskCount: number;
    safeCount: number;
    topPerformerCount: number;
    avgAttendance: number;
    avgAcademicScore: number;
    remedialNeededCount: number;
  };
}> {
  const students = getStore<Student>(KEYS.STUDENTS, STUDENTS);
  const attendance = getStore<AttendanceRecord>(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  const results = getStore<ExamResult>(KEYS.RESULTS, EXAM_RESULTS);
  const fees = getStore<FeeRecord>(KEYS.FEES, INITIAL_FEES);

  const metrics: AIStudentMetric[] = students.map((s) => {
    const studentAtt = attendance.filter((a) => a.studentId === s.id);
    const presentCount = studentAtt.filter((a) => a.status === "present").length;
    const totalClasses = studentAtt.length || 10;
    const attendanceRate = studentAtt.length > 0 ? Math.round((presentCount / studentAtt.length) * 100) : (s.id === "s3" ? 50 : 88);

    const studentResults = results.filter((r) => r.studentId === s.id);
    const avgMarks = studentResults.length > 0
      ? Math.round(studentResults.reduce((sum, r) => sum + (r.marksObtained / r.totalMarks) * 100, 0) / studentResults.length)
      : (s.id === "s3" ? 58 : 82);

    const studentFees = fees.filter((f) => f.studentId === s.id);
    const totalFee = studentFees.reduce((sum, f) => sum + f.amount, 0) || 50000;
    const paidFee = studentFees.reduce((sum, f) => sum + f.paid, 0);
    const feeDue = totalFee - paidFee;
    const feePaidRate = totalFee > 0 ? Math.round((paidFee / totalFee) * 100) : 100;

    // Multi-factor Risk Algorithm
    // Attendance weight: 45%, Academics weight: 35%, Fee weight: 20%
    let riskScore = 0;
    const riskFactors: string[] = [];
    const recommendations: string[] = [];

    if (attendanceRate < 75) {
      riskScore += (75 - attendanceRate) * 1.4;
      riskFactors.push(`Critical Attendance Shortage (${attendanceRate}%)`);
      recommendations.push("Issue Low Attendance Warning to Guardian");
    }

    if (avgMarks < 60) {
      riskScore += (60 - avgMarks) * 1.2;
      riskFactors.push(`Weak Academic Performance (Avg: ${avgMarks}%)`);
      recommendations.push("Assign remedial coaching in weak core subjects");
    }

    if (feeDue > 25000) {
      riskScore += 20;
      riskFactors.push(`Pending Fee Balance (₹${feeDue.toLocaleString("en-IN")})`);
      recommendations.push("Send fee payment schedule reminder or evaluate installment");
    }

    riskScore = Math.min(100, Math.round(riskScore));

    let riskLevel: AIStudentMetric["riskLevel"] = "Safe / Good Standing";
    if (riskScore >= 45 || attendanceRate < 65) {
      riskLevel = "High Risk";
    } else if (riskScore >= 20 || attendanceRate < 75) {
      riskLevel = "Moderate Risk";
    } else if (avgMarks >= 85 && attendanceRate >= 85) {
      riskLevel = "Top Performer";
      recommendations.push("Nominate for Department Honors / Merit Scholarship");
    }

    if (recommendations.length === 0) {
      recommendations.push("Student is on-track; maintain current academic progression");
    }

    const radarData = [
      { metric: "Attendance", score: attendanceRate },
      { metric: "Academics", score: avgMarks },
      { metric: "Fee Clearance", score: feePaidRate },
      { metric: "Discipline", score: attendanceRate >= 80 ? 95 : 70 },
      { metric: "Consistency", score: Math.round((attendanceRate + avgMarks) / 2) },
    ];

    const placementEligibility = attendanceRate >= 75 && avgMarks >= 65 && feeDue === 0;

    return {
      student: s,
      attendanceRate,
      totalClasses,
      presentClasses: studentAtt.length ? presentCount : Math.round((attendanceRate / 100) * totalClasses),
      avgMarks,
      totalExams: studentResults.length || 2,
      feePaidRate,
      feeDue,
      riskScore,
      riskLevel,
      riskFactors,
      recommendations,
      radarData,
      placementEligibility,
    };
  });

  const highRiskCount = metrics.filter((m) => m.riskLevel === "High Risk").length;
  const moderateRiskCount = metrics.filter((m) => m.riskLevel === "Moderate Risk").length;
  const safeCount = metrics.filter((m) => m.riskLevel === "Safe / Good Standing").length;
  const topPerformerCount = metrics.filter((m) => m.riskLevel === "Top Performer").length;
  const avgAttendance = Math.round(metrics.reduce((s, m) => s + m.attendanceRate, 0) / (metrics.length || 1));
  const avgAcademicScore = Math.round(metrics.reduce((s, m) => s + m.avgMarks, 0) / (metrics.length || 1));
  const remedialNeededCount = metrics.filter((m) => m.avgMarks < 60 || m.attendanceRate < 75).length;

  return {
    metrics,
    overview: {
      highRiskCount,
      moderateRiskCount,
      safeCount,
      topPerformerCount,
      avgAttendance,
      avgAcademicScore,
      remedialNeededCount,
    },
  };
}

export async function askAICollegeHub(query: string): Promise<{
  answer: string;
  matchedStudents?: Student[];
  actionSuggestion?: string;
  category: "attendance" | "fees" | "academics" | "placement" | "general";
}> {
  const { metrics } = await getAIStudentAnalytics();
  const q = query.toLowerCase();

  if (q.includes("attendance") || q.includes("shortage") || q.includes("< 75") || q.includes("75%")) {
    const lowAtt = metrics.filter((m) => m.attendanceRate < 75);
    return {
      answer: `Found ${lowAtt.length} students with attendance below 75% threshold across departments. Immediate intervention recommended to prevent exam debarment.`,
      matchedStudents: lowAtt.map((m) => m.student),
      actionSuggestion: "Send Attendance Warning via Broadcast Center",
      category: "attendance",
    };
  }

  if (q.includes("fee") || q.includes("pending") || q.includes("due") || q.includes("unpaid")) {
    const pending = metrics.filter((m) => m.feeDue > 0);
    const totalPending = pending.reduce((s, m) => s + m.feeDue, 0);
    return {
      answer: `There are ${pending.length} students with outstanding fees totaling ₹${totalPending.toLocaleString("en-IN")}.`,
      matchedStudents: pending.map((m) => m.student),
      actionSuggestion: "Trigger 1-Click Fee Due Reminders",
      category: "fees",
    };
  }

  if (q.includes("top") || q.includes("merit") || q.includes("scholarship") || q.includes("best") || q.includes("a+")) {
    const top = metrics.filter((m) => m.avgMarks >= 80);
    return {
      answer: `${top.length} students qualify as Academic Honors / Top Performers with average marks >= 80%.`,
      matchedStudents: top.map((m) => m.student),
      actionSuggestion: "Generate Merit Certificates",
      category: "academics",
    };
  }

  if (q.includes("placement") || q.includes("eligible") || q.includes("job") || q.includes("drive")) {
    const eligible = metrics.filter((m) => m.placementEligibility);
    return {
      answer: `${eligible.length} students satisfy all placement criteria (Attendance >= 75%, Marks >= 65%, Zero Fee Dues).`,
      matchedStudents: eligible.map((m) => m.student),
      actionSuggestion: "Enroll in Upcoming Google & Microsoft Drives",
      category: "placement",
    };
  }

  const highRisk = metrics.filter((m) => m.riskLevel === "High Risk");
  return {
    answer: `Analysis complete: College health score is 84%. Currently ${highRisk.length} students require proactive faculty mentoring due to attendance and academic lag.`,
    matchedStudents: highRisk.map((m) => m.student),
    actionSuggestion: "Review 360° Student Dossiers in Early Warning Hub",
    category: "general",
  };
}

// ─── Broadcast Alert Center API ──────────────────────────────────────────────
export async function getBroadcastAlerts(): Promise<BroadcastAlert[]> {
  return getStore<BroadcastAlert>(KEYS.BROADCAST_ALERTS, INITIAL_BROADCAST_ALERTS);
}

export async function sendBroadcastAlert(alert: Omit<BroadcastAlert, "id" | "createdAt" | "sentCount" | "status"> & { recipientCount?: number }): Promise<BroadcastAlert> {
  const alerts = getStore<BroadcastAlert>(KEYS.BROADCAST_ALERTS, INITIAL_BROADCAST_ALERTS);
  const newAlert: BroadcastAlert = {
    ...alert,
    id: "ba_" + Date.now(),
    createdAt: new Date().toISOString().split("T")[0],
    sentCount: alert.recipientCount || 35,
    status: "Sent",
  };

  const updated = [newAlert, ...alerts];
  setStore(KEYS.BROADCAST_ALERTS, updated);
  return newAlert;
}

