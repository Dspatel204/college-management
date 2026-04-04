import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STUDENTS, INITIAL_ATTENDANCE, INITIAL_FEES, DEPARTMENTS, COURSES } from "@/lib/college-data";
import { Users, ClipboardCheck, BookOpen, Building2, TrendingUp, Clock, IndianRupee, FileText } from "lucide-react";

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

  const deptCounts = DEPARTMENTS.map((d) => ({
    name: d,
    count: STUDENTS.filter((s) => s.department === d).length,
  }));

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
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening at your college today.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Students" value={STUDENTS.length} subtitle="Across all departments" icon={Users} trend={{ value: "12% this semester", positive: true }} />
        <StatsCard title="Today's Attendance" value={`${attendanceRate}%`} subtitle={`${presentToday}/${totalToday} students`} icon={ClipboardCheck} colorClass="bg-success" />
        <StatsCard title="Fee Collected" value={`₹${(collectedFees / 1000).toFixed(0)}K`} subtitle={`₹${(pendingFees / 1000).toFixed(0)}K pending`} icon={IndianRupee} colorClass="bg-info" />
        <StatsCard title="Active Courses" value={COURSES.length} subtitle={`${DEPARTMENTS.length} departments`} icon={BookOpen} colorClass="bg-accent" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Department Distribution */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deptCounts.map((d) => (
                <div key={d.name} className="flex items-center gap-4">
                  <div className="w-36 text-sm font-medium text-foreground truncate">{d.name}</div>
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-secondary">
                      <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${(d.count / STUDENTS.length) * 100}%` }} />
                    </div>
                  </div>
                  <span className="w-8 text-right text-sm font-semibold text-foreground">{d.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
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
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
