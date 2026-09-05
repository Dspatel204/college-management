import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getStudents,
  getExamSchedules,
  type Student,
  type ExamSchedule,
} from "@/lib/api";
import {
  QrCode,
  Printer,
  FileCheck2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Building2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  BadgeCheck,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/credentials")({
  component: CredentialsPage,
});

function CredentialsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<ExamSchedule[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [docType, setDocType] = useState<"id_card" | "hall_ticket" | "bonafide">("id_card");
  const [loading, setLoading] = useState(true);
  const [verifiedModal, setVerifiedModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [stList, schList] = await Promise.all([getStudents(), getExamSchedules()]);
      setStudents(stList);
      setSchedules(schList);
      if (stList.length > 0) {
        setSelectedStudentId(stList[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const studentExams = schedules.filter(
    (sch) => sch.department === currentStudent?.department || sch.semester === currentStudent?.semester
  );

  const handlePrint = () => {
    window.print();
  };

  // QR Code generator URL using public SVG QR code service for authentic visual scan
  const verificationUrl = `https://collegehub.demo/verify?id=${currentStudent?.id}&roll=${currentStudent?.rollNo}`;
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    verificationUrl
  )}`;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Smart Digital Credentials & Document Generator</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <ShieldCheck className="h-3 w-3" /> QR-Verified
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Instant generation of printable Student ID Cards, Examination Hall Tickets, and Bonafide Certificates with dynamic verification QR codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" /> Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Selector Toolbar */}
      <Card className="mb-6 print:hidden">
        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Select Student:</span>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger className="w-64 h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {students.map((st) => (
                  <SelectItem key={st.id} value={st.id}>
                    {st.name} ({st.rollNo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setDocType("id_card")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                docType === "id_card" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Student ID Card
            </button>
            <button
              onClick={() => setDocType("hall_ticket")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                docType === "hall_ticket" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Exam Hall Ticket
            </button>
            <button
              onClick={() => setDocType("bonafide")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                docType === "bonafide" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Bonafide Certificate
            </button>
          </div>
        </CardContent>
      </Card>

      {/* DOCUMENT PREVIEW AREA */}
      {currentStudent && (
        <div className="flex justify-center p-2 sm:p-6 bg-muted/20 rounded-xl border">
          {/* 1. STUDENT ID CARD */}
          {docType === "id_card" && (
            <div className="w-full max-w-sm rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-background to-card shadow-2xl overflow-hidden print:border-black print:shadow-none">
              {/* Header */}
              <div className="bg-primary px-5 py-4 text-primary-foreground text-center relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 h-16 w-16 rounded-full bg-white/10" />
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  <span className="font-extrabold text-base tracking-wider uppercase">CollegeHub Institute</span>
                </div>
                <p className="text-[10px] text-primary-foreground/80 tracking-widest uppercase mt-0.5">
                  Autonomous Academic Institution • Student Identity Card
                </p>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col items-center text-center space-y-3">
                {/* Photo & Badge */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary text-2xl font-bold text-primary shadow-md overflow-hidden">
                    {currentStudent.avatar && currentStudent.avatar.length > 3 ? (
                      <img src={currentStudent.avatar} alt="Student" className="h-full w-full object-cover" />
                    ) : (
                      <span>{currentStudent.avatar || currentStudent.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 right-0 rounded-full bg-emerald-500 p-1 text-white shadow">
                    <BadgeCheck className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">{currentStudent.name}</h3>
                  <Badge variant="outline" className="text-xs font-mono font-bold mt-1 text-primary border-primary/30">
                    {currentStudent.rollNo}
                  </Badge>
                </div>

                {/* Details Table */}
                <div className="w-full rounded-lg bg-muted/50 p-3 text-xs space-y-1.5 text-left border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Department:</span>
                    <span className="font-semibold text-foreground">{currentStudent.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Current Semester:</span>
                    <span className="font-semibold text-foreground">Semester {currentStudent.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Blood Group:</span>
                    <span className="font-semibold text-foreground">O +ve</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Emergency Contact:</span>
                    <span className="font-semibold text-foreground">{currentStudent.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Valid Upto:</span>
                    <span className="font-semibold text-foreground">June 2026</span>
                  </div>
                </div>

                {/* QR Code & Barcode */}
                <div className="pt-2 flex items-center justify-between w-full border-t border-dashed">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] text-muted-foreground">SCAN TO VERIFY</span>
                    <span className="text-[9px] font-mono text-muted-foreground">ID: {currentStudent.id.slice(0, 8)}</span>
                  </div>
                  <img
                    src={qrSvgUrl}
                    alt="Verification QR"
                    className="h-12 w-12 rounded border bg-white p-0.5"
                  />
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="bg-muted px-4 py-1.5 text-center text-[10px] text-muted-foreground font-medium">
                Authorized Signature • Dean of Student Affairs
              </div>
            </div>
          )}

          {/* 2. EXAM HALL TICKET / ADMIT CARD */}
          {docType === "hall_ticket" && (
            <div className="w-full max-w-2xl rounded-xl border bg-card p-6 shadow-lg print:border-none print:shadow-none space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-wide text-foreground">CollegeHub Institute of Technology</h2>
                    <p className="text-xs text-muted-foreground">OFFICIAL EXAMINATION HALL TICKET / ADMIT CARD</p>
                    <p className="text-[11px] font-semibold text-primary">Semester End Examinations — Session 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <img src={qrSvgUrl} alt="QR" className="h-14 w-14 rounded border bg-white p-0.5 ml-auto" />
                  <span className="text-[9px] font-mono text-muted-foreground block mt-1">SEAT: {currentStudent.rollNo}-A1</span>
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/40 p-4 border text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Candidate Name:</span>
                  <span className="font-bold text-sm text-foreground">{currentStudent.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Enrollment / Roll No:</span>
                  <span className="font-bold text-sm font-mono text-foreground">{currentStudent.rollNo}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Department &amp; Sem:</span>
                  <span className="font-semibold text-foreground">{currentStudent.department} (Sem {currentStudent.semester})</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Exam Center:</span>
                  <span className="font-semibold text-foreground">Main Campus • Block B</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Attendance Clearance:</span>
                  <span className="font-semibold text-emerald-600">Approved (&gt; 75%)</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Fee Clearance:</span>
                  <span className="font-semibold text-emerald-600">Verified &amp; Cleared</span>
                </div>
              </div>

              {/* Exam Schedule Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registered Examination Schedule:</h4>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-2.5">Date</th>
                        <th className="p-2.5">Time</th>
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5">Hall / Room</th>
                        <th className="p-2.5 text-center">Invigilator Sign</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {(studentExams.length > 0 ? studentExams : schedules.slice(0, 4)).map((sch, i) => (
                        <tr key={i} className="hover:bg-muted/20">
                          <td className="p-2.5 font-medium">{sch.date}</td>
                          <td className="p-2.5 text-muted-foreground">{sch.time}</td>
                          <td className="p-2.5 font-semibold text-foreground">{sch.subject}</td>
                          <td className="p-2.5 font-mono">{sch.room}</td>
                          <td className="p-2.5 text-center text-muted-foreground font-mono">___________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Instructions & Signatures */}
              <div className="pt-2 text-[11px] text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Important Instructions for Candidates:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Candidates must report 30 minutes prior to exam commencement with this Admit Card &amp; Student ID.</li>
                  <li>Electronic devices, smartwatches, and programmable calculators are strictly prohibited.</li>
                </ul>
              </div>

              <div className="flex justify-between items-end pt-6 border-t">
                <div className="text-center text-xs">
                  <div className="h-8 border-b border-dashed w-36 mb-1" />
                  <span className="text-muted-foreground font-medium">Candidate Signature</span>
                </div>
                <div className="text-center text-xs">
                  <div className="flex items-center justify-center h-8 font-bold text-primary font-serif italic">
                    Dr. S. K. Roy
                  </div>
                  <div className="border-t border-dashed w-44 pt-1">
                    <span className="text-foreground font-semibold">Controller of Examinations</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. OFFICIAL BONAFIDE CERTIFICATE */}
          {docType === "bonafide" && (
            <div className="w-full max-w-2xl rounded-xl border bg-card p-8 shadow-lg print:border-none print:shadow-none space-y-6 relative overflow-hidden">
              {/* College Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <GraduationCap className="h-96 w-96 text-foreground" />
              </div>

              {/* Letterhead */}
              <div className="text-center border-b-2 border-primary/40 pb-4 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <h1 className="text-xl font-extrabold uppercase tracking-wide text-foreground">CollegeHub Institute of Technology</h1>
                </div>
                <p className="text-xs text-muted-foreground">Approved by AICTE • Affiliated to State Technological University</p>
                <p className="text-[11px] text-muted-foreground">Campus Complex, University Enclave, Tech City — 560001</p>
              </div>

              {/* Ref & Date */}
              <div className="flex justify-between text-xs font-mono">
                <span>REF NO: CHUB/BON/2024/0{currentStudent.rollNo.slice(-3)}</span>
                <span>DATE: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
              </div>

              {/* Certificate Title */}
              <div className="text-center py-2">
                <h3 className="text-base font-bold uppercase tracking-widest underline decoration-primary decoration-2 underline-offset-4 text-foreground">
                  BONAFIDE CERTIFICATE
                </h3>
              </div>

              {/* Body */}
              <div className="text-sm leading-relaxed text-foreground space-y-4 text-justify">
                <p>
                  This is to certify that <strong className="text-primary font-bold">{currentStudent.name}</strong>, Son / Daughter of <strong className="font-semibold">{currentStudent.guardianName || "Shri Suresh Kumar"}</strong>, bearing Enrollment / Roll No. <strong className="font-mono font-bold">{currentStudent.rollNo}</strong> is a bonafide student of this Institute.
                </p>
                <p>
                  He/She is currently pursuing the 4-Year Bachelor of Technology (B.Tech) degree in the Department of <strong className="font-semibold">{currentStudent.department}</strong>, presently studying in <strong className="font-semibold">Semester {currentStudent.semester}</strong> during the academic session 2024–2025.
                </p>
                <p>
                  During his/her tenure at this Institute, his/her academic performance and general conduct have been found to be <strong className="font-semibold text-emerald-600">VERY GOOD</strong>. This certificate is issued upon the request of the student for official purposes.
                </p>
              </div>

              {/* Footer / Seals */}
              <div className="flex justify-between items-end pt-12">
                <div className="flex items-center gap-3">
                  <img src={qrSvgUrl} alt="QR" className="h-16 w-16 rounded border bg-white p-1" />
                  <div className="text-[10px] text-muted-foreground">
                    <span className="font-bold block text-foreground">DIGITALLY VERIFIABLE</span>
                    Scan QR code to verify validity on the official portal.
                  </div>
                </div>

                <div className="text-center">
                  <div className="h-10 font-bold text-primary font-serif italic flex items-center justify-center">
                    Prof. M. K. Narayanan
                  </div>
                  <div className="border-t border-foreground/50 w-44 pt-1 text-xs">
                    <span className="font-bold text-foreground block">Principal / Director</span>
                    <span className="text-[10px] text-muted-foreground">CollegeHub Institute</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
