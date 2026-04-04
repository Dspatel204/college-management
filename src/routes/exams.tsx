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
import { EXAM_SCHEDULES, EXAM_RESULTS, STUDENTS, SUBJECTS, getStudentName, getStudentById, calculateGrade, type ExamResult, type ExamSchedule } from "@/lib/college-data";
import { FileText, Calendar, Award, Plus, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/exams")({
  component: ExamsPage,
});

function ExamsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<ExamSchedule[]>(EXAM_SCHEDULES);
  const [results, setResults] = useState<ExamResult[]>(EXAM_RESULTS);
  const [addScheduleDialog, setAddScheduleDialog] = useState(false);
  const [marksDialog, setMarksDialog] = useState(false);
  const [reportCardStudent, setReportCardStudent] = useState<string | null>(null);

  // Schedule form
  const [newSubject, setNewSubject] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newType, setNewType] = useState<ExamSchedule["type"]>("midterm");

  // Marks form
  const [marksStudentId, setMarksStudentId] = useState("");
  const [marksSubject, setMarksSubject] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [marksTotalMarks, setMarksTotalMarks] = useState("100");
  const [marksExamType, setMarksExamType] = useState<ExamResult["examType"]>("midterm");

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleAddSchedule = () => {
    if (!newSubject || !newDate || !newTime || !newRoom) return;
    const schedule: ExamSchedule = {
      id: `e${Date.now()}`,
      subject: newSubject,
      date: newDate,
      time: newTime,
      room: newRoom,
      department: "Computer Science",
      semester: 4,
      type: newType,
    };
    setSchedules([...schedules, schedule]);
    setAddScheduleDialog(false);
    setNewSubject(""); setNewDate(""); setNewTime(""); setNewRoom("");
  };

  const handleAddMarks = () => {
    if (!marksStudentId || !marksSubject || !marksObtained) return;
    const obtained = Number(marksObtained);
    const total = Number(marksTotalMarks);
    const result: ExamResult = {
      id: `r${Date.now()}`,
      studentId: marksStudentId,
      subject: marksSubject,
      examType: marksExamType,
      marksObtained: obtained,
      totalMarks: total,
      grade: calculateGrade((obtained / total) * 100),
    };
    setResults([...results, result]);
    setMarksDialog(false);
    setMarksObtained(""); setMarksStudentId(""); setMarksSubject("");
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
        <h1 className="text-2xl font-bold text-foreground">Examination Module</h1>
        <p className="text-sm text-muted-foreground">Manage exam schedules, marks, and report cards</p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule" className="gap-2"><Calendar className="h-4 w-4" /> Exam Schedule</TabsTrigger>
          <TabsTrigger value="marks" className="gap-2"><Award className="h-4 w-4" /> Marks & Grades</TabsTrigger>
          <TabsTrigger value="report" className="gap-2"><FileText className="h-4 w-4" /> Report Cards</TabsTrigger>
        </TabsList>

        {/* SCHEDULE TAB */}
        <TabsContent value="schedule">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setAddScheduleDialog(true)} className="gap-2"><Plus className="h-4 w-4" /> Add Exam</Button>
          </div>
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium text-foreground">{exam.subject}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>{exam.room}</TableCell>
                      <TableCell>{typeBadge(exam.type)}</TableCell>
                      <TableCell>{exam.department} — Sem {exam.semester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MARKS TAB */}
        <TabsContent value="marks">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setMarksDialog(true)} className="gap-2"><Plus className="h-4 w-4" /> Enter Marks</Button>
          </div>
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{getStudentName(res.studentId)}</p>
                          <p className="text-xs text-muted-foreground">{getStudentById(res.studentId)?.rollNo}</p>
                        </div>
                      </TableCell>
                      <TableCell>{res.subject}</TableCell>
                      <TableCell>{typeBadge(res.examType)}</TableCell>
                      <TableCell>{res.marksObtained}/{res.totalMarks}</TableCell>
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
              <SelectTrigger className="w-72"><SelectValue placeholder="Select a student to view report card" /></SelectTrigger>
              <SelectContent>
                {STUDENTS.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNo})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reportStudent && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {reportStudent.avatar}
                  </div>
                  <div>
                    <CardTitle>{reportStudent.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{reportStudent.rollNo} • {reportStudent.department} • Semester {reportStudent.semester}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {studentResults.length > 0 ? (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Exam</TableHead>
                          <TableHead>Marks</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentResults.map((r) => (
                          <TableRow key={r.id}>
                            <TableCell className="font-medium">{r.subject}</TableCell>
                            <TableCell className="capitalize">{r.examType}</TableCell>
                            <TableCell>{r.marksObtained}/{r.totalMarks}</TableCell>
                            <TableCell>{Math.round((r.marksObtained / r.totalMarks) * 100)}%</TableCell>
                            <TableCell><Badge variant="outline">{r.grade}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex gap-6 rounded-lg bg-secondary p-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Marks</p>
                        <p className="text-lg font-bold text-foreground">{studentResults.reduce((s, r) => s + r.marksObtained, 0)}/{studentResults.reduce((s, r) => s + r.totalMarks, 0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Average</p>
                        <p className="text-lg font-bold text-foreground">{Math.round(studentResults.reduce((s, r) => s + (r.marksObtained / r.totalMarks) * 100, 0) / studentResults.length)}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Overall Grade</p>
                        <p className="text-lg font-bold text-foreground">{calculateGrade(studentResults.reduce((s, r) => s + (r.marksObtained / r.totalMarks) * 100, 0) / studentResults.length)}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">No exam results found for this student</p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Schedule Dialog */}
      <Dialog open={addScheduleDialog} onOpenChange={setAddScheduleDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Exam Schedule</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Select value={newSubject} onValueChange={setNewSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Time</label>
                <Input value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="10:00 AM - 1:00 PM" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Room</label>
                <Input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} placeholder="Hall A" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
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
            <Button onClick={handleAddSchedule} className="w-full">Add Schedule</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enter Marks Dialog */}
      <Dialog open={marksDialog} onOpenChange={setMarksDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Enter Marks</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Student</label>
              <Select value={marksStudentId} onValueChange={setMarksStudentId}>
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>{STUDENTS.map((s) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNo})</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Select value={marksSubject} onValueChange={setMarksSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Marks</label>
                <Input type="number" value={marksObtained} onChange={(e) => setMarksObtained(e.target.value)} placeholder="82" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Total</label>
                <Input type="number" value={marksTotalMarks} onChange={(e) => setMarksTotalMarks(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
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
            <Button onClick={handleAddMarks} className="w-full">Save Marks</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
