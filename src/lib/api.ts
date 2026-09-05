import axios, { type AxiosError, type AxiosResponse } from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://college-management-n6be.onrender.com/api";
const TOKEN_KEY = "college_token";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  // Render free tier can take 30-50s to wake up from cold start
  timeout: 60000,
});

// ─── Request interceptor: attach JWT Bearer token ────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ─── Retry logic for Render cold starts ──────────────────────────────────────
const MAX_RETRIES = 2;
const RETRY_DELAY = 3000; // 3 seconds

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable = (error: AxiosError): boolean => {
  // Retry on network errors (Render cold start / spin-down)
  if (!error.response && error.message === "Network Error") return true;
  // Retry on timeout
  if (error.code === "ECONNABORTED") return true;
  // Retry on 502/503/504 (Render spinning up)
  if (error.response && [502, 503, 504].includes(error.response.status)) return true;
  return false;
};

api.interceptors.response.use(
  undefined,
  async (error: AxiosError) => {
    const config = error.config as typeof error.config & { _retryCount?: number };
    if (!config) return Promise.reject(error);

    config._retryCount = config._retryCount || 0;

    if (isRetryable(error) && config._retryCount < MAX_RETRIES) {
      config._retryCount += 1;
      console.log(`🔄 Retrying API request (${config._retryCount}/${MAX_RETRIES}): ${config.url}`);
      await sleep(RETRY_DELAY * config._retryCount);
      return api(config);
    }

    return Promise.reject(error);
  }
);

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
    const data = error.response?.data as { message?: string } | string | undefined;
    let message =
      (typeof data === "object" && data?.message) ||
      (typeof data === "string" && data.replace(/<[^>]+>/g, " ").trim()) ||
      error.message ||
      "Something went wrong";

    const routeMissing =
      (typeof data === "string" && /Cannot (GET|POST|PUT|PATCH|DELETE)/i.test(data)) ||
      (typeof data === "object" &&
        typeof data?.message === "string" &&
        /Route .+ not found/i.test(data.message));

    if (routeMissing) {
      message =
        "API route not found. Redeploy the backend on Render (Root Directory = backend) with DATABASE_URL and JWT_SECRET. Login is POST /api/auth/login.";
    } else if (!error.response && error.message === "Network Error") {
      message = "Cannot reach the API server. The server may be starting up (Render free tier takes ~30s). Please wait and try again.";
    } else if (error.code === "ECONNABORTED") {
      message = "Request timed out. The server may be waking up from sleep. Please try again in a few seconds.";
    } else if (error.response?.status === 502) {
      message = "Server is starting up. Please wait a moment and try again.";
    } else if (error.response?.status === 503) {
      message = "Service temporarily unavailable. The server may be deploying or restarting.";
    }

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
    timeout: 30000, // uploads may take longer
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
