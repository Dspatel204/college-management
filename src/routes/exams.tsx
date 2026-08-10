import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  getExamSchedules as fetchExamSchedules,
  createExamSchedule as apiCreateExamSchedule,
  getExamResults as fetchExamResults,
  createExamResult as apiCreateExamResult,
  updateExamResult as apiUpdateExamResult,
  deleteExamResult as apiDeleteExamResult,
  getStudents,
  type ExamSchedule,
  type ExamResult,
  type Student,
} from "@/lib/api";
import { DEPARTMENTS, SUBJECTS, getStudentName, getStudentById, calculateGrade } from "@/lib/college-data";
import { FileText, Calendar, Award, Plus, GraduationCap, Loader2 } from "lucide-react";

export const Route = createFileRoute("/exams")({
  component: ExamsPage,
});

function ExamsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<ExamSchedule[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [addScheduleDialog, setAddScheduleDialog] = useState(false);
  const [marksDialog, setMarksDialog] = useState(false);
  const [reportCardStudent, setReportCardStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newSubject, setNewSubject] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newType, setNewType] = useState<ExamSchedule["type"]>("midterm");

  const [marksStudentId, setMarksStudentId] = useState("");
  const [marksSubject, setMarksSubject] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [marksTotalMarks, setMarksTotalMarks] = useState("100");
  const [marksExamType, setMarksExamType] = useState<ExamResult["examType"]>("midterm");

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadSchedules();
    loadResults();
    loadStudents();
  }, []);

  const loadSchedules = async () => {
    setLoading(true);
    try {
      const data = await fetchExamSchedules();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load schedules:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadResults = async () => {
    try {
      const data = await fetchExamResults();
      setResults(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load results:", e);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load students:", e);
    }
  };

  if (!isAuthenticated) return null;

  const handleAddSchedule = async () => {
    if (!newSubject || !newDate || !newTime || !newRoom) return;
    setSaving(true);
    try {
      const schedule = await apiCreateExamSchedule({
        subject: newSubject,
        date: newDate,
        time: newTime,
        room: newRoom,
        department: "Computer Science",
        semester: 4,
        type: newType,
      });
      setSchedules([...schedules, schedule as ExamSchedule]);
      setAddScheduleDialog(false);
      setNewSubject(""); setNewDate(""); setNewTime(""); setNewRoom("");
    } catch (e) {
      console.error("Add schedule failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleAddMarks = async () => {
    if (!marksStudentId || !marksSubject || !marksObtained) return;
    const obtained = Number(marksObtained);
    const total = Number(marksTotalMarks);
    setSaving(true);
    try {
      const result = await apiCreateExamResult({
        studentId: marksStudentId,
        subject: marksSubject,
        examType: marksExamType,
        marksObtained: obtained,
        totalMarks: total,
      });
      setResults([...results, result as ExamResult]);
      setMarksDialog(false);
      setMarksObtained(""); setMarksStudentId(""); setMarksSubject("");
    } catch (e) {
      console.error("Add marks failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const studentResults = reportCardStudent ? results.filter((r) => r.studentId === reportCardStudent) : [];
  const reportStudent = reportCardStudent ? getStudentById(reportCardStudent) : null;

  const typeBadge = (type: string) => {
    const variants: Record<string, string> = {
      midterm: "bg-info/10 text-info border-info/20",
      final: "bg-primary/10 text-primary border-primary/20",
      internal: "bg-success/10 text-success border-success/20",
    };
    return <Badge variant="outline" className={variants[type]}>{type}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Examination Module</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Manage exam schedules, marks, and report cards</p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="schedule" className="gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Exam Schedule</TabsTrigger>
          <TabsTrigger value="marks" className="gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Marks & Grades</TabsTrigger>
          <TabsTrigger value="report" className="gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Report Cards</TabsTrigger>
        </TabsList>

        {/* SCHEDULE TAB */}
        <TabsContent value="schedule">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setAddScheduleDialog(true)} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Add Exam</Button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Subject</TableHead>
                      <TableHead className="text-xs sm:text-sm">Date</TableHead>
                      <TableHead className="text-xs sm:text-sm">Time</TableHead>
                      <TableHead className="text-xs sm:text-sm">Room</TableHead>
                      <TableHead className="text-xs sm:text-sm">Type</TableHead>
                      <TableHead className="text-xs sm:text-sm">Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium text-foreground text-xs sm:text-sm">{exam.subject}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{exam.date}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{exam.time}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{exam.room}</TableCell>
                        <TableCell>{typeBadge(exam.type)}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{exam.department} — Sem {exam.semester}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* MARKS TAB */}
        <TabsContent value="marks">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setMarksDialog(true)} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Enter Marks</Button>
          </div>
          <Card className="border-0 shadow-md">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Student</TableHead>
                    <TableHead className="text-xs sm:text-sm">Subject</TableHead>
                    <TableHead className="text-xs sm:text-sm">Exam Type</TableHead>
                    <TableHead className="text-xs sm:text-sm">Marks</TableHead>
                    <TableHead className="text-xs sm:text-sm">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground text-xs sm:text-sm">{getStudentName(res.studentId)}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">{getStudentById(res.studentId)?.rollNo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">{res.subject}</TableCell>
                      <TableCell>{typeBadge(res.examType)}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{res.marksObtained}/{res.totalMarks}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={res.grade.startsWith("A") ? "bg-success/10 text-success border-success/20" : res.grade.startsWith("B") ? "bg-info/10 text-info border-info/20" : "bg-warning/10 text-warning border-warning/20"}>
                          {res.grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORT CARD TAB */}
        <TabsContent value="report">
          <div className="mb-4">
            <Select value={reportCardStudent ?? ""} onValueChange={setReportCardStudent}>
              <SelectTrigger className="w-full sm:w-72"><SelectValue placeholder="Select a student to view report card" /></SelectTrigger>
              <SelectContent>
                {students.map((s) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNo})</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {reportStudent && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-primary text-base sm:text-lg font-bold text-primary-foreground">
                    {reportStudent.avatar}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">{reportStudent.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{reportStudent.rollNo} • {reportStudent.department} • Semester {reportStudent.semester}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {studentResults.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs sm:text-sm">Subject</TableHead>
                            <TableHead className="text-xs sm:text-sm">Exam</TableHead>
                            <TableHead className="text-xs sm:text-sm">Marks</TableHead>
                            <TableHead className="text-xs sm:text-sm">Percentage</TableHead>
                            <TableHead className="text-xs sm:text-sm">Grade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentResults.map((r) => (
                            <TableRow key={r.id}>
                              <TableCell className="font-medium text-xs sm:text-sm">{r.subject}</TableCell>
                              <TableCell className="capitalize text-xs sm:text-sm">{r.examType}</TableCell>
                              <TableCell className="text-xs sm:text-sm">{r.marksObtained}/{r.totalMarks}</TableCell>
                              <TableCell className="text-xs sm:text-sm">{Math.round((r.marksObtained / r.totalMarks) * 100)}%</TableCell>
                              <TableCell><Badge variant="outline" className="text-xs">{r.grade}</Badge></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 sm:gap-6 rounded-lg bg-secondary p-3 sm:p-4">
                      <div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Total Marks</p>
                        <p className="text-base sm:text-lg font-bold text-foreground">{studentResults.reduce((s, r) => s + r.marksObtained, 0)}/{studentResults.reduce((s, r) => s + r.totalMarks, 0)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Average</p>
                        <p className="text-base sm:text-lg font-bold text-foreground">{Math.round(studentResults.reduce((s, r) => s + (r.marksObtained / r.totalMarks) * 100, 0) / studentResults.length)}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Overall Grade</p>
                        <p className="text-base sm:text-lg font-bold text-foreground">{calculateGrade(studentResults.reduce((s, r) => s + (r.marksObtained / r.totalMarks) * 100, 0) / studentResults.length)}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="py-6 sm:py-8 text-center text-muted-foreground text-xs sm:text-sm">No exam results found for this student</p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Schedule Dialog */}
      <Dialog open={addScheduleDialog} onOpenChange={setAddScheduleDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader><DialogTitle className="text-base sm:text-lg">Add Exam Schedule</DialogTitle></DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Subject</label>
              <Select value={newSubject} onValueChange={setNewSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Date</label>
                <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Time</label>
                <Input value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="10:00 AM - 1:00 PM" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Room</label>
                <Input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} placeholder="Hall A" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Type</label>
                <Select value={newType} onValueChange={(v) => setNewType(v as ExamSchedule["type"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midterm">Midterm</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddSchedule} className="w-full" disabled={saving}>
              {saving ? "Adding..." : "Add Schedule"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enter Marks Dialog */}
      <Dialog open={marksDialog} onOpenChange={setMarksDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader><DialogTitle className="text-base sm:text-lg">Enter Marks</DialogTitle></DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Student</label>
              <Select value={marksStudentId} onValueChange={setMarksStudentId}>
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>{students.map((s) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNo})</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Subject</label>
              <Select value={marksSubject} onValueChange={setMarksSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Marks</label>
                <Input type="number" value={marksObtained} onChange={(e) => setMarksObtained(e.target.value)} placeholder="82" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Total</label>
                <Input type="number" value={marksTotalMarks} onChange={(e) => setMarksTotalMarks(e.target.value)} />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Type</label>
                <Select value={marksExamType} onValueChange={(v) => setMarksExamType(v as ExamResult["examType"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midterm">Midterm</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddMarks} className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Marks"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
