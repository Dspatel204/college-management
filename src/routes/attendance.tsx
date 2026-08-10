import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STUDENTS, SUBJECTS, type AttendanceRecord } from "@/lib/college-data";
import { getStudents as fetchStudents, getAttendance, saveAttendance as apiSaveAttendance, type Student } from "@/lib/api";
import { Check, X, Clock, Save, Loader2 } from "lucide-react";

export const Route = createFileRoute("/attendance")({
  component: AttendancePage,
});

function AttendancePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [marking, setMarking] = useState<Record<string, "present" | "absent" | "late">>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadStudents();
    loadAttendance();
  }, [selectedDate, selectedSubject]);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load students:", e);
    }
  };

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await getAttendance({ date: selectedDate, subject: selectedSubject });
      setRecords(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load attendance:", e);
    } finally {
      setLoading(false);
    }
  };

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

  if (!isAuthenticated) return null;

  const toggleStatus = (studentId: string) => {
    setMarking((prev) => {
      const current = prev[studentId] || "present";
      const next = current === "present" ? "absent" : current === "absent" ? "late" : "present";
      return { ...prev, [studentId]: next };
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiSaveAttendance({
        date: selectedDate,
        subject: selectedSubject,
        records: Object.entries(marking).map(([studentId, status]) => ({ studentId, status })),
      });
      await loadAttendance();
      setSaved(true);
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const markAll = (status: "present" | "absent") => {
    const all: Record<string, "present" | "absent" | "late"> = {};
    students.forEach((s) => { all[s.id] = status; });
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
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Mark and manage student attendance</p>
      </div>

      {/* Filters */}
      <Card className="mb-4 sm:mb-6 border-0 shadow-md">
        <CardContent className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="w-full sm:w-auto">
            <label className="text-[10px] sm:text-xs font-medium text-muted-foreground">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-input bg-background px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="text-[10px] sm:text-xs font-medium text-muted-foreground">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-input bg-background px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
            />
          </div>
          <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => markAll("present")} className="flex-1 sm:flex-none text-xs">
              Mark All Present
            </Button>
            <Button variant="outline" size="sm" onClick={() => markAll("absent")} className="flex-1 sm:flex-none text-xs">
              Mark All Absent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-xl bg-success/10 p-2.5 sm:p-4 text-center">
          <p className="text-lg sm:text-2xl font-bold text-success">{presentCount}</p>
          <p className="text-[10px] sm:text-xs text-success/80">Present</p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-2.5 sm:p-4 text-center">
          <p className="text-lg sm:text-2xl font-bold text-destructive">{absentCount}</p>
          <p className="text-[10px] sm:text-xs text-destructive/80">Absent</p>
        </div>
        <div className="rounded-xl bg-warning/10 p-2.5 sm:p-4 text-center">
          <p className="text-lg sm:text-2xl font-bold text-warning">{lateCount}</p>
          <p className="text-[10px] sm:text-xs text-warning/80">Late</p>
        </div>
      </div>

      {/* Student List */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">Students</CardTitle>
          <Button onClick={handleSave} size="sm" disabled={saved || saving} className="w-full sm:w-auto text-xs">
            <Save className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save Attendance"}
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((student) => {
                const status = marking[student.id] || "present";
                const config = statusConfig[status];
                const StatusIcon = config.icon;
                return (
                  <div
                    key={student.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-border p-2.5 sm:p-3 hover:bg-secondary/50 transition-colors gap-2 sm:gap-0"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] sm:text-xs font-bold text-primary-foreground">
                        {student.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-foreground truncate">{student.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{student.rollNo} • {student.department}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStatus(student.id)}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium transition-colors w-full sm:w-auto ${config.bg} ${config.text}`}
                    >
                      <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      {config.label}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
