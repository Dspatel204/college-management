import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STUDENTS, SUBJECTS, INITIAL_ATTENDANCE, type AttendanceRecord } from "@/lib/college-data";
import { Check, X, Clock, Save } from "lucide-react";

export const Route = createFileRoute("/attendance")({
  component: AttendancePage,
});

function AttendancePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [marking, setMarking] = useState<Record<string, "present" | "absent" | "late">>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // Initialize marking from existing records
  useEffect(() => {
    const existing: Record<string, "present" | "absent" | "late"> = {};
    records
      .filter((r) => r.date === selectedDate && r.subject === selectedSubject)
      .forEach((r) => {
        existing[r.studentId] = r.status;
      });
    setMarking(existing);
    setSaved(false);
  }, [selectedDate, selectedSubject, records]);

  const toggleStatus = (studentId: string) => {
    setMarking((prev) => {
      const current = prev[studentId] || "present";
      const next = current === "present" ? "absent" : current === "absent" ? "late" : "present";
      return { ...prev, [studentId]: next };
    });
    setSaved(false);
  };

  const saveAttendance = () => {
    const newRecords = records.filter(
      (r) => !(r.date === selectedDate && r.subject === selectedSubject)
    );
    Object.entries(marking).forEach(([studentId, status]) => {
      newRecords.push({ studentId, date: selectedDate, status, subject: selectedSubject });
    });
    setRecords(newRecords);
    setSaved(true);
  };

  const markAll = (status: "present" | "absent") => {
    const all: Record<string, "present" | "absent" | "late"> = {};
    STUDENTS.forEach((s) => { all[s.id] = status; });
    setMarking(all);
    setSaved(false);
  };

  const statusConfig = {
    present: { bg: "bg-success/10", text: "text-success", icon: Check, label: "Present" },
    absent: { bg: "bg-destructive/10", text: "text-destructive", icon: X, label: "Absent" },
    late: { bg: "bg-warning/10", text: "text-warning", icon: Clock, label: "Late" },
  };

  const presentCount = Object.values(marking).filter((s) => s === "present").length;
  const absentCount = Object.values(marking).filter((s) => s === "absent").length;
  const lateCount = Object.values(marking).filter((s) => s === "late").length;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-sm text-muted-foreground">Mark and manage student attendance</p>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-0 shadow-md">
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" onClick={() => markAll("present")}>
              Mark All Present
            </Button>
            <Button variant="outline" size="sm" onClick={() => markAll("absent")}>
              Mark All Absent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-success/10 p-4 text-center">
          <p className="text-2xl font-bold text-success">{presentCount}</p>
          <p className="text-xs text-success/80">Present</p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{absentCount}</p>
          <p className="text-xs text-destructive/80">Absent</p>
        </div>
        <div className="rounded-xl bg-warning/10 p-4 text-center">
          <p className="text-2xl font-bold text-warning">{lateCount}</p>
          <p className="text-xs text-warning/80">Late</p>
        </div>
      </div>

      {/* Student List */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Students</CardTitle>
          <Button onClick={saveAttendance} size="sm" disabled={saved}>
            <Save className="mr-2 h-4 w-4" />
            {saved ? "Saved ✓" : "Save Attendance"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {STUDENTS.map((student) => {
              const status = marking[student.id] || "present";
              const config = statusConfig[status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {student.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.rollNo} • {student.department}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStatus(student.id)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${config.bg} ${config.text}`}
                  >
                    <StatusIcon className="h-4 w-4" />
                    {config.label}
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
