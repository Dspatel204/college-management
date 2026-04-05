import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STUDENTS, INITIAL_ATTENDANCE, INITIAL_FEES, DEPARTMENTS, COURSES, FACULTY } from "@/lib/college-data";
import { Users, ClipboardCheck, BookOpen, TrendingUp, Clock, IndianRupee, FileText, UserCog } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = INITIAL_ATTENDANCE.filter((a) => a.date === today);
  const presentToday = todayAttendance.filter((a) => a.status === "present").length;
  const totalToday = todayAttendance.length;
  const attendanceRate = totalToday > 0 ? Math.round((presentToday / totalToday) * 100) : 0;

  const totalFees = INITIAL_FEES.reduce((s, f) => s + f.amount, 0);
  const collectedFees = INITIAL_FEES.reduce((s, f) => s + f.paid, 0);
  const pendingFees = totalFees - collectedFees;

  // Chart data
  const deptData = DEPARTMENTS.map((d) => ({
    name: d.length > 8 ? d.slice(0, 8) + "…" : d,
    students: STUDENTS.filter((s) => s.department === d).length,
    faculty: FACULTY.filter((f) => f.department === d).length,
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

  const semesterData = [1, 2, 3, 4, 5, 6, 7, 8].map(sem => ({
    semester: `Sem ${sem}`,
    students: STUDENTS.filter(s => s.semester === sem).length,
  }));

  const COLORS = ["hsl(145, 60%, 45%)", "hsl(0, 70%, 55%)", "hsl(45, 70%, 55%)"];
  const FEE_COLORS = ["hsl(145, 60%, 45%)", "hsl(0, 70%, 55%)"];

  const recentActivity = [
    { action: "Fee collected", detail: "Rahul Kumar — Tuition ₹50,000", time: "5 min ago", icon: IndianRupee },
    { action: "Attendance marked", detail: "Data Structures — Sem 4 CS", time: "10 min ago", icon: ClipboardCheck },
    { action: "New student enrolled", detail: "Kavita Nair — Civil Eng", time: "1 hour ago", icon: Users },
    { action: "Exam scheduled", detail: "DBMS Mid-term — 15 April", time: "2 hours ago", icon: FileText },
    { action: "Result published", detail: "Mathematics — Sem 2", time: "5 hours ago", icon: TrendingUp },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name} 👋</h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening at your college today.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Students" value={STUDENTS.length} subtitle="Across all departments" icon={Users} trend={{ value: "12% this semester", positive: true }} />
        <StatsCard title="Today's Attendance" value={`${attendanceRate}%`} subtitle={`${presentToday}/${totalToday} students`} icon={ClipboardCheck} colorClass="bg-success" />
        <StatsCard title="Fee Collected" value={`₹${(collectedFees / 1000).toFixed(0)}K`} subtitle={`₹${(pendingFees / 1000).toFixed(0)}K pending`} icon={IndianRupee} colorClass="bg-info" />
        <StatsCard title="Faculty Members" value={FACULTY.length} subtitle={`${COURSES.length} active courses`} icon={UserCog} colorClass="bg-accent" />
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
          <CardHeader><CardTitle className="text-lg">Today's Attendance</CardTitle></CardHeader>
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
                  <Pie data={feeData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ₹${(value/1000).toFixed(0)}K`}>
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
    </DashboardLayout>
  );
}
