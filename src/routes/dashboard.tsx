import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudents as fetchStudents, getFaculty as fetchFaculty, getAttendance, getFees, getCourses, getTimetable, type Student, type Faculty, type AttendanceRecord, type FeeRecord, type TimetableEntry } from "@/lib/api";
import { DEPARTMENTS, SUBJECTS } from "@/lib/college-data";
import { Users, ClipboardCheck, BookOpen, TrendingUp, Clock, IndianRupee, FileText, UserCog, Loader2, CalendarDays, AlertTriangle, ArrowRight, WalletCards, UserPlus, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [courses, setCourses] = useState<{ id: string; name: string; code: string; department: string }[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [studentsData, facultyData, attendanceData, feesData, coursesData, timetableData] = await Promise.all([
        fetchStudents(),
        fetchFaculty(),
        getAttendance(),
        getFees(),
        getCourses(),
        getTimetable(),
      ]);
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setFaculty(Array.isArray(facultyData) ? facultyData : []);
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
      setFees(Array.isArray(feesData) ? feesData : []);
      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setTimetable(Array.isArray(timetableData) ? timetableData : []);
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = attendance.filter((a) => a.date === today);
  const presentToday = todayAttendance.filter((a) => a.status === "present").length;
  const totalToday = todayAttendance.length;
  const attendanceRate = totalToday > 0 ? Math.round((presentToday / totalToday) * 100) : 0;

  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const collectedFees = fees.reduce((s, f) => s + f.paid, 0);
  const pendingFees = totalFees - collectedFees;

  const deptData = DEPARTMENTS.map((d) => ({
    name: d.length > 8 ? d.slice(0, 8) + "…" : d,
    students: students.filter((s) => s.department === d).length,
    faculty: faculty.filter((f) => f.department === d).length,
  }));

  const feeData = [
    { name: "Collected", value: collectedFees },
    { name: "Pending", value: pendingFees },
  ];

  const attendanceData = [
    { name: "Present", value: todayAttendance.filter(a => a.status === "present").length },
    { name: "Absent", value: todayAttendance.filter(a => a.status === "absent").length },
    { name: "Late", value: todayAttendance.filter(a => a.status === "late").length },
  ];

  const semesterData = [1, 2, 3, 4, 5, 6, 7, 8].map((sem) => ({
    semester: `Sem ${sem}`,
    students: students.filter((s) => s.semester === sem).length,
  }));

  const COLORS = ["hsl(145, 60%, 45%)", "hsl(0, 70%, 55%)", "hsl(45, 70%, 55%)"];
  const FEE_COLORS = ["hsl(145, 60%, 45%)", "hsl(0, 70%, 55%)"];

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = dayNames[new Date().getDay()];
  const dayIndex = (day: string) => dayNames.indexOf(day);
  const todaySchedule = timetable
    .filter((entry) => entry.day === todayName)
    .sort((a, b) => a.time.localeCompare(b.time));
  const nextClasses = todaySchedule.length > 0
    ? todaySchedule.slice(0, 4)
    : timetable
        .filter((entry) => dayIndex(entry.day) >= new Date().getDay())
        .sort((a, b) => dayIndex(a.day) - dayIndex(b.day) || a.time.localeCompare(b.time))
        .slice(0, 4);

  const studentRisk = students
    .map((student) => {
      const records = attendance.filter((record) => record.studentId === student.id);
      const rate = records.length > 0
        ? Math.round((records.filter((record) => record.status === "present").length / records.length) * 100)
        : 100;
      const pending = fees
        .filter((fee) => fee.studentId === student.id)
        .reduce((sum, fee) => sum + Math.max(fee.amount - fee.paid, 0), 0);
      return { student, rate, pending };
    })
    .filter(({ rate, pending }) => rate < 75 || pending > 0)
    .sort((a, b) => (a.rate - b.rate) || (b.pending - a.pending))
    .slice(0, 5);

  const recentActivity = [
    { action: "Fee collected", detail: `${students[0]?.name || "Student"} — Tuition ₹50,000`, time: "5 min ago", icon: IndianRupee },
    { action: "Attendance marked", detail: `${SUBJECTS[0]} — Sem 4 CS`, time: "10 min ago", icon: ClipboardCheck },
    { action: "New student enrolled", detail: `${students[students.length - 1]?.name || "Student"} — ${DEPARTMENTS[0]}`, time: "1 hour ago", icon: Users },
    { action: "Exam scheduled", detail: `${SUBJECTS[2]} Mid-term — 15 April`, time: "2 hours ago", icon: FileText },
    { action: "Result published", detail: `${SUBJECTS[1]} — Sem 2`, time: "5 hours ago", icon: TrendingUp },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name} 👋</h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening at your college today.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Students" value={students.length} subtitle="Across all departments" icon={Users} trend={{ value: "12% this semester", positive: true }} />
            <StatsCard title="Today's Attendance" value={`${attendanceRate}%`} subtitle={`${presentToday}/${totalToday} students`} icon={ClipboardCheck} colorClass="bg-success" />
            <StatsCard title="Fee Collected" value={`₹${(collectedFees / 1000).toFixed(0)}K`} subtitle={`₹${(pendingFees / 1000).toFixed(0)}K pending`} icon={IndianRupee} colorClass="bg-info" />
            <StatsCard title="Faculty Members" value={faculty.length} subtitle={`${courses.length} active courses`} icon={UserCog} colorClass="bg-accent" />
          </div>

          {/* Daily operations */}
          <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_1fr]">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Next classes
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {todaySchedule.length > 0 ? `${todayName} schedule` : "Upcoming timetable entries"}
                  </p>
                </div>
                <Link to="/courses" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  Manage <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardHeader>
              <CardContent>
                {nextClasses.length === 0 ? (
                  <p className="rounded-lg bg-muted/50 px-3 py-4 text-sm text-muted-foreground">No timetable entries yet.</p>
                ) : (
                  <div className="space-y-2">
                    {nextClasses.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-3 rounded-lg border border-border/70 px-3 py-2.5">
                        <div className="w-20 shrink-0 text-xs font-semibold text-primary">
                          <p>{entry.day.slice(0, 3)}</p>
                          <p className="font-normal text-muted-foreground">{entry.time}</p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">{entry.subject}</p>
                          <p className="truncate text-xs text-muted-foreground">{entry.department} · Sem {entry.semester}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{entry.room}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Needs attention
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">Attendance below 75% or unpaid balance</p>
                </div>
                <Link to="/reports" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  Full report <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardHeader>
              <CardContent>
                {studentRisk.length === 0 ? (
                  <p className="rounded-lg bg-success/10 px-3 py-4 text-sm text-success">All students are on track.</p>
                ) : (
                  <div className="space-y-2">
                    {studentRisk.map(({ student, rate, pending }) => (
                      <div key={student.id} className="flex items-center gap-3 rounded-lg border border-border/70 px-3 py-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">{student.avatar}</div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">{student.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{student.rollNo} · {student.department}</p>
                        </div>
                        <div className="shrink-0 text-right text-xs">
                          {rate < 75 && <p className="font-semibold text-destructive">{rate}% attendance</p>}
                          {pending > 0 && <p className="text-warning">₹{pending.toLocaleString()} due</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Mark attendance", to: "/attendance", icon: ClipboardCheck },
              { label: "Collect fees", to: "/fees", icon: WalletCards },
              { label: "Add student", to: "/students", icon: UserPlus },
              { label: "Plan exams", to: "/exams", icon: FileText },
            ].map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:text-sm">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
                <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-lg">Department Overview</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={deptData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    <Legend />
                    <Bar dataKey="students" fill="hsl(220, 70%, 50%)" name="Students" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="faculty" fill="hsl(45, 70%, 55%)" name="Faculty" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-lg">Today&apos;s Attendance</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                        {attendanceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-lg">Fee Collection</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={feeData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ₹${(value / 1000).toFixed(0)}K`}>
                        {feeData.map((_, i) => <Cell key={i} fill={FEE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-lg">Students by Semester</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={semesterData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="semester" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="students" fill="hsl(260, 50%, 50%)" name="Students" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />{item.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}
