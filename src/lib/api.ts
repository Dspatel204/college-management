import axios, { type AxiosError, type AxiosResponse } from "axios";

const API_BASE = "https://college-management-n6be.onrender.com/api";
const TOKEN_KEY = "college_token";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor: attach JWT Bearer token ────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor: error handling + 401 auto-logout ─────────────────
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Auto logout if token is expired / invalid
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("college_user");
      // Redirect to login without hard page reload when possible
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// ─── Auth API calls ──────────────────────────────────────────────────────────
export async function loginUser(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function registerUser(payload: { name: string; email: string; password: string; role?: string }) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

// ─── Upload API ──────────────────────────────────────────────────────────────
export async function uploadAvatar(file: File): Promise<{ url: string; publicId: string }> {
  const form = new FormData();
  form.append("avatar", file);
  const { data } = await api.post("/upload/avatar", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// ─── Payment API ─────────────────────────────────────────────────────────────
export async function createPaymentOrder(feeId: string) {
  const { data } = await api.post("/payments/create-order", { feeId });
  return data;
}

export async function verifyPayment(payload: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  feeId: string;
}) {
  const { data } = await api.post("/payments/verify", payload);
  return data;
}

export async function getStudents() {
  const { data } = await api.get("/students");
  return data;
}

export async function getStudentById(id: string) {
  const { data } = await api.get(`/students/${encodeURIComponent(id)}`);
  return data;
}

export async function createStudent(data: CreateStudentInput) {
  const { data: result } = await api.post("/students", data);
  return result;
}

export async function updateStudent(id: string, data: UpdateStudentInput) {
  const { data: result } = await api.put(`/students/${encodeURIComponent(id)}`, data);
  return result;
}

export async function deleteStudent(id: string) {
  const { data: result } = await api.delete(`/students/${encodeURIComponent(id)}`);
  return result;
}

export async function getFaculty() {
  const { data } = await api.get("/faculty");
  return data;
}

export async function getFacultyById(id: string) {
  const { data } = await api.get(`/faculty/${encodeURIComponent(id)}`);
  return data;
}

export async function createFaculty(data: CreateFacultyInput) {
  const { data: result } = await api.post("/faculty", data);
  return result;
}

export async function updateFacultyById(id: string, data: UpdateFacultyInput) {
  const { data: result } = await api.put(`/faculty/${encodeURIComponent(id)}`, data);
  return result;
}

export async function deleteFacultyById(id: string) {
  const { data: result } = await api.delete(`/faculty/${encodeURIComponent(id)}`);
  return result;
}

export async function getAttendance(params?: { date?: string; subject?: string }) {
  const { data } = await api.get("/attendance", { params });
  return data;
}

export async function saveAttendance(payload: SaveAttendancePayload) {
  const { data } = await api.post("/attendance", payload);
  return data;
}

export async function getFees() {
  const { data } = await api.get("/fees");
  return data;
}

export async function createFee(data: CreateFeeInput) {
  const { data: result } = await api.post("/fees", data);
  return result;
}

export async function updateFee(id: string, data: UpdateFeeInput) {
  const { data: result } = await api.put(`/fees/${encodeURIComponent(id)}`, data);
  return result;
}

export async function getExamSchedules() {
  const { data } = await api.get("/exams");
  return data;
}

export async function createExamSchedule(data: CreateExamScheduleInput) {
  const { data: result } = await api.post("/exams", data);
  return result;
}

export async function getExamResults(params?: GetExamResultsParams) {
  const { data } = await api.get("/results", { params });
  return data;
}

export async function createExamResult(data: CreateExamResultInput) {
  const { data: result } = await api.post("/results", data);
  return result;
}

export async function updateExamResult(id: string, data: UpdateExamResultInput) {
  const { data: result } = await api.put(`/results/${encodeURIComponent(id)}`, data);
  return result;
}

export async function deleteExamResult(id: string) {
  const { data: result } = await api.delete(`/results/${encodeURIComponent(id)}`);
  return result;
}

export async function getCourses() {
  const { data } = await api.get("/courses");
  return data;
}

export async function createCourse(data: CreateCourseInput) {
  const { data: result } = await api.post("/courses", data);
  return result;
}

export async function updateCourse(id: string, data: UpdateCourseInput) {
  const { data: result } = await api.put(`/courses/${encodeURIComponent(id)}`, data);
  return result;
}

export async function deleteCourse(id: string) {
  const { data: result } = await api.delete(`/courses/${encodeURIComponent(id)}`);
  return result;
}

export async function getReports(params?: { department?: string }) {
  const { data } = await api.get("/reports", { params });
  return data;
}

export async function getTimetable() {
  const { data } = await api.get("/timetable");
  return data;
}

export async function createTimetableEntry(data: CreateTimetableEntryInput) {
  const { data: result } = await api.post("/timetable", data);
  return result;
}

export async function deleteTimetableEntry(id: string) {
  const { data: result } = await api.delete(`/timetable/${encodeURIComponent(id)}`);
  return result;
}

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
