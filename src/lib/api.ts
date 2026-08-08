import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_BASE = "https://college-management-n6be.onrender.com/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
});

async function requestData<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data ?? error.message;
      throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }

    throw error instanceof Error ? error : new Error("Unknown API error");
  }
}

type Creatable<T extends { id: string }> = Omit<T, "id">;
type Updatable<T extends { id: string }> = Partial<Omit<T, "id">>;

export type StudentQueryParams = {
  department?: string;
  semester?: number;
  status?: "active" | "inactive" | "graduated";
};

export type AttendanceQueryParams = {
  date?: string;
  subject?: string;
};

export type ExamResultQueryParams = {
  studentId?: string;
  subject?: string;
  examType?: string;
  department?: string;
  semester?: string;
};

export type ReportQueryParams = {
  department?: string;
};

export type CreateStudentPayload = Creatable<Student>;
export type UpdateStudentPayload = Updatable<Student>;
export type CreateFacultyPayload = Creatable<Faculty>;
export type UpdateFacultyPayload = Updatable<Faculty>;
export type CreateFeePayload = Creatable<FeeRecord>;
export type UpdateFeePayload = Updatable<FeeRecord>;
export type CreateExamSchedulePayload = Creatable<ExamSchedule>;
export type CreateExamResultPayload = Creatable<ExamResult>;
export type UpdateExamResultPayload = Updatable<ExamResult>;
export type CreateCoursePayload = Creatable<Course>;
export type UpdateCoursePayload = Updatable<Course>;
export type CreateTimetableEntryPayload = Creatable<TimetableEntry>;

export type AttendanceRecordPayload = {
  studentId: string;
  status: "present" | "absent" | "late";
};

export type SaveAttendancePayload = {
  date: string;
  subject: string;
  records: AttendanceRecordPayload[];
};

export async function getStudents(): Promise<Student[]> {
  return requestData(apiClient.get<Student[]>("/students"));
}

export async function getStudentById(id: string): Promise<Student> {
  return requestData(apiClient.get<Student>(`/students/${encodeURIComponent(id)}`));
}

export async function createStudent(data: CreateStudentPayload): Promise<Student> {
  return requestData(apiClient.post<Student>("/students", data));
}

export async function updateStudent(id: string, data: UpdateStudentPayload): Promise<Student> {
  return requestData(apiClient.put<Student>(`/students/${encodeURIComponent(id)}`, data));
}

export async function deleteStudent(id: string): Promise<void> {
  return requestData(apiClient.delete<void>(`/students/${encodeURIComponent(id)}`));
}

export async function getFaculty(): Promise<Faculty[]> {
  return requestData(apiClient.get<Faculty[]>("/faculty"));
}

export async function getFacultyById(id: string): Promise<Faculty> {
  return requestData(apiClient.get<Faculty>(`/faculty/${encodeURIComponent(id)}`));
}

export async function createFaculty(data: CreateFacultyPayload): Promise<Faculty> {
  return requestData(apiClient.post<Faculty>("/faculty", data));
}

export async function updateFacultyById(id: string, data: UpdateFacultyPayload): Promise<Faculty> {
  return requestData(apiClient.put<Faculty>(`/faculty/${encodeURIComponent(id)}`, data));
}

export async function deleteFacultyById(id: string): Promise<void> {
  return requestData(apiClient.delete<void>(`/faculty/${encodeURIComponent(id)}`));
}

export async function getAttendance(params?: AttendanceQueryParams): Promise<AttendanceRecord[]> {
  return requestData(apiClient.get<AttendanceRecord[]>("/attendance", { params }));
}

export async function saveAttendance(data: SaveAttendancePayload): Promise<AttendanceRecord[]> {
  return requestData(apiClient.post<AttendanceRecord[]>("/attendance", data));
}

export async function getFees(): Promise<FeeRecord[]> {
  return requestData(apiClient.get<FeeRecord[]>("/fees"));
}

export async function createFee(data: CreateFeePayload): Promise<FeeRecord> {
  return requestData(apiClient.post<FeeRecord>("/fees", data));
}

export async function updateFee(id: string, data: UpdateFeePayload): Promise<FeeRecord> {
  return requestData(apiClient.put<FeeRecord>(`/fees/${encodeURIComponent(id)}`, data));
}

export async function getExamSchedules(): Promise<ExamSchedule[]> {
  return requestData(apiClient.get<ExamSchedule[]>("/exams"));
}

export async function createExamSchedule(data: CreateExamSchedulePayload): Promise<ExamSchedule> {
  return requestData(apiClient.post<ExamSchedule>("/exams", data));
}

export async function getExamResults(params?: ExamResultQueryParams): Promise<ExamResult[]> {
  return requestData(apiClient.get<ExamResult[]>("/results", { params }));
}

export async function createExamResult(data: CreateExamResultPayload): Promise<ExamResult> {
  return requestData(apiClient.post<ExamResult>("/results", data));
}

export async function updateExamResult(id: string, data: UpdateExamResultPayload): Promise<ExamResult> {
  return requestData(apiClient.put<ExamResult>(`/results/${encodeURIComponent(id)}`, data));
}

export async function deleteExamResult(id: string): Promise<void> {
  return requestData(apiClient.delete<void>(`/results/${encodeURIComponent(id)}`));
}

export async function getCourses(): Promise<Course[]> {
  return requestData(apiClient.get<Course[]>("/courses"));
}

export async function createCourse(data: CreateCoursePayload): Promise<Course> {
  return requestData(apiClient.post<Course>("/courses", data));
}

export async function updateCourse(id: string, data: UpdateCoursePayload): Promise<Course> {
  return requestData(apiClient.put<Course>(`/courses/${encodeURIComponent(id)}`, data));
}

export async function deleteCourse(id: string): Promise<void> {
  return requestData(apiClient.delete<void>(`/courses/${encodeURIComponent(id)}`));
}

export async function getReports(params?: ReportQueryParams): Promise<ReportData> {
  return requestData(apiClient.get<ReportData>("/reports", { params }));
}

export async function getTimetable(): Promise<TimetableEntry[]> {
  return requestData(apiClient.get<TimetableEntry[]>("/timetable"));
}

export async function createTimetableEntry(data: CreateTimetableEntryPayload): Promise<TimetableEntry> {
  return requestData(apiClient.post<TimetableEntry>("/timetable", data));
}

export async function deleteTimetableEntry(id: string): Promise<void> {
  return requestData(apiClient.delete<void>(`/timetable/${encodeURIComponent(id)}`));
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
