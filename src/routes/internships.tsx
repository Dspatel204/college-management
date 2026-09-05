import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getInternshipOpportunities,
  getStudentInternships,
  enrollStudentInternship,
  updateInternshipProgress,
  getStudents,
  type Student,
} from "@/lib/api";
import {
  type InternshipOpportunity,
  type StudentInternshipEnrollment,
} from "@/lib/college-data";
import {
  Laptop,
  Briefcase,
  GraduationCap,
  Building2,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Award,
  Plus,
  Loader2,
  Printer,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  MapPin,
  IndianRupee,
} from "lucide-react";

export const Route = createFileRoute("/internships")({
  component: InternshipsPage,
});

function InternshipsPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<InternshipOpportunity[]>([]);
  const [enrollments, setEnrollments] = useState<StudentInternshipEnrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Apply & NOC Modal
  const [applyModal, setApplyModal] = useState(false);
  const [selectedInternshipId, setSelectedInternshipId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("2024-05-15");
  const [endDate, setEndDate] = useState("2024-07-15");

  // View NOC Modal
  const [nocModal, setNocModal] = useState(false);
  const [activeEnrollment, setActiveEnrollment] = useState<StudentInternshipEnrollment | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [inData, enData, stData] = await Promise.all([
        getInternshipOpportunities(),
        getStudentInternships(),
        getStudents(),
      ]);
      setInternships(inData);
      setEnrollments(enData);
      setStudents(stData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentId = user?.role === "student" ? "s1" : students[0]?.id || "s1";
      const created = await enrollStudentInternship({
        studentId,
        internshipId: selectedInternshipId,
        organizationName: companyName || "Industrial Partner",
        role: role || "Trainee Intern",
        startDate,
        endDate,
      });
      setEnrollments([created, ...enrollments]);
      setApplyModal(false);
      showToast("Internship registered and official NOC Certificate generated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveCredits = async (enId: string) => {
    try {
      const updated = await updateInternshipProgress(enId, 8, 4, "Credits Approved");
      setEnrollments(enrollments.map((en) => (en.id === enId ? updated : en)));
      showToast("4 NEP Academic Credits approved & mapped to university grade sheet!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  const totalCreditsAwarded = enrollments.reduce((s, e) => s + e.creditsAwarded, 0);
  const getStudent = (id: string) => students.find((s) => s.id === id);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">NEP 2020 Mandatory Internship &amp; Credit Portal</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Laptop className="h-3 w-3" /> Industry 4.0 &amp; CBCS Credits
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Mandatory 4–8 week industrial internships, NOC approvals, weekly industry logbooks, and NEP 2020 academic credits.
          </p>
        </div>

        <Button onClick={() => setApplyModal(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Register Internship / Request NOC
        </Button>
      </div>

      {toastMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-in fade-in print:hidden">
          <CheckCircle2 className="h-4 w-4" /> {toastMsg}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6 print:hidden">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Approved Drives</span>
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{internships.length} Partners</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">TCS, Deloitte, Apollo, ISRO</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">NEP Credits Awarded</span>
              <Award className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalCreditsAwarded + 16} Credits</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Mapped to Degree Transcript</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Active Interns</span>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{enrollments.length + 28} Students</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Currently on field training</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">NOC Clearance</span>
              <ShieldCheck className="h-4 w-4 text-purple-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">100% Digital</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Instant Principal signed letter</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="catalog" className="space-y-4 print:hidden">
          <TabsList className="grid w-full grid-cols-2 max-w-sm">
            <TabsTrigger value="catalog" className="gap-1.5 text-xs">
              <Building2 className="h-3.5 w-3.5" /> Industry Opportunities
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-1.5 text-xs">
              <FileCheck2 className="h-3.5 w-3.5" /> Student Logbooks &amp; Credits ({enrollments.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: INTERNSHIP CATALOG */}
          <TabsContent value="catalog" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internships.map((inItem) => (
                <Card key={inItem.id} className="border shadow-xs hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="text-[10px] font-semibold text-primary mb-1">
                          {inItem.stream}
                        </Badge>
                        <CardTitle className="text-base">{inItem.title}</CardTitle>
                        <CardDescription className="font-semibold text-foreground text-xs mt-0.5">
                          {inItem.organization} • {inItem.location}
                        </CardDescription>
                      </div>
                      <Badge className="bg-emerald-600 text-white text-[10px]">
                        {inItem.credits} NEP Credits
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="rounded-lg bg-muted/40 p-3 space-y-1.5 border">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Training Type:</span>
                        <span className="font-semibold text-foreground">{inItem.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Duration:</span>
                        <span className="font-semibold text-foreground">{inItem.durationWeeks} Weeks Mandatory</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Monthly Stipend:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{inItem.stipend}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Available Openings:</span>
                        <span className="font-semibold text-primary">{inItem.openings} Seats</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedInternshipId(inItem.id);
                          setCompanyName(inItem.organization);
                          setRole(inItem.title);
                          setApplyModal(true);
                        }}
                        className="h-8 gap-1.5 text-xs"
                      >
                        Register &amp; Get Official NOC
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: STUDENT INTERNSHIPS & LOGBOOKS */}
          <TabsContent value="students">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Student Industrial Logbooks &amp; Credit Awards</CardTitle>
                <CardDescription>Track weekly diary submissions, industry mentor sign-offs, and NEP 2020 credit allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Organization &amp; Role</TableHead>
                        <TableHead>Duration Period</TableHead>
                        <TableHead>NOC Reference</TableHead>
                        <TableHead>Weekly Logbook</TableHead>
                        <TableHead>NEP Credits</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollments.map((en) => {
                        const st = getStudent(en.studentId);
                        return (
                          <TableRow key={en.id}>
                            <TableCell>
                              <div className="font-medium text-sm">{st?.name || "Student"}</div>
                              <div className="text-[11px] text-muted-foreground">{st?.rollNo} • {st?.department}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold text-xs text-foreground">{en.organizationName}</div>
                              <div className="text-[11px] text-muted-foreground">{en.role}</div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {en.startDate} to {en.endDate}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-primary font-semibold">
                              {en.nocReferenceNo || "CHUB/NOC/2024/001"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs">{en.weeklyLogbookCompleted} / 8 wks</span>
                                <Badge
                                  className={
                                    en.status === "Credits Approved"
                                      ? "bg-emerald-600 text-white text-[10px]"
                                      : "bg-amber-500 text-white text-[10px]"
                                  }
                                >
                                  {en.status}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="font-bold text-xs font-mono text-emerald-600">
                              {en.creditsAwarded > 0 ? `+${en.creditsAwarded} Credits` : "Pending Eval"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1.5">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setActiveEnrollment(en);
                                    setNocModal(true);
                                  }}
                                  className="h-8 gap-1 text-xs"
                                >
                                  <FileText className="h-3.5 w-3.5" /> View NOC
                                </Button>
                                {en.status !== "Credits Approved" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleApproveCredits(en.id)}
                                    className="h-8 gap-1 text-xs bg-emerald-600 hover:bg-emerald-700"
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Award 4 Credits
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Register & NOC Modal */}
      <Dialog open={applyModal} onOpenChange={setApplyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Register Internship &amp; Request NOC</DialogTitle>
            <DialogDescription>Submit organization details for official No Objection Certificate generation</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnroll} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold">Company / Hospital / Institute Name</label>
              <Input
                placeholder="E.g. Tata Consultancy Services / Apollo Hospitals"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Role / Designation</label>
              <Input
                placeholder="E.g. Software Development Intern / Clinical Trainee"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">NEP 2020 Compliance:</span>
              <p className="mt-0.5">Upon 8-week completion &amp; diary submission, 4 Academic Credits will be mapped to the student transcript.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setApplyModal(false)}>Cancel</Button>
              <Button type="submit">Generate Official NOC</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Printable NOC Dialog */}
      {activeEnrollment && (
        <Dialog open={nocModal} onOpenChange={setNocModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="print:hidden">
              <div className="flex justify-between items-center w-full">
                <DialogTitle>Official No Objection Certificate (NOC)</DialogTitle>
                <Button size="sm" onClick={() => window.print()} className="gap-1.5 text-xs mr-4">
                  <Printer className="h-3.5 w-3.5" /> Print NOC Letter
                </Button>
              </div>
            </DialogHeader>

            {/* NOC LETTER CONTENT */}
            <div className="rounded-xl border bg-card p-8 shadow-sm space-y-6 text-sm text-foreground">
              {/* College Letterhead */}
              <div className="text-center border-b-2 border-primary pb-4 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <h2 className="text-xl font-extrabold uppercase tracking-wide">CollegeHub Institute of Technology</h2>
                </div>
                <p className="text-xs text-muted-foreground">Autonomous Institution • Approved by AICTE &amp; UGC • Affiliated to State Technological University</p>
                <p className="text-[11px] text-muted-foreground">Training &amp; Placement Cell • Corporate Relations Office</p>
              </div>

              {/* Ref & Date */}
              <div className="flex justify-between text-xs font-mono">
                <span>REF NO: {activeEnrollment.nocReferenceNo || "CHUB/NOC/2024/001"}</span>
                <span>DATE: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
              </div>

              <div className="text-center py-2">
                <h3 className="text-base font-bold uppercase tracking-widest underline decoration-primary decoration-2 underline-offset-4">
                  TO WHOMSOEVER IT MAY CONCERN
                </h3>
                <p className="text-xs font-semibold text-primary mt-1">NO OBJECTION CERTIFICATE FOR INDUSTRIAL INTERNSHIP (NEP 2020)</p>
              </div>

              {/* Body */}
              <div className="space-y-4 text-xs leading-relaxed text-justify">
                <p>
                  This is to certify that <strong className="text-foreground font-bold">{getStudent(activeEnrollment.studentId)?.name || "Rahul Kumar"}</strong> (Roll No: <strong className="font-mono">{getStudent(activeEnrollment.studentId)?.rollNo || "CS2024001"}</strong>) is a regular bonafide student of <strong className="font-semibold">{getStudent(activeEnrollment.studentId)?.department}</strong>, currently studying in <strong className="font-semibold">Semester {getStudent(activeEnrollment.studentId)?.semester}</strong> at this Institute.
                </p>
                <p>
                  The Institute has <strong className="text-emerald-600 font-bold">NO OBJECTION</strong> to the student undertaking industrial training / internship with <strong className="font-bold text-foreground">{activeEnrollment.organizationName}</strong> as <strong className="font-semibold">{activeEnrollment.role}</strong> during the period from <strong className="font-semibold">{activeEnrollment.startDate}</strong> to <strong className="font-semibold">{activeEnrollment.endDate}</strong>.
                </p>
                <p>
                  This internship aligns with the mandatory experiential learning guidelines of the National Education Policy (NEP 2020) and carries <strong className="font-bold text-primary">4 Academic Credits</strong> towards the award of the degree.
                </p>
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-end pt-8 border-t">
                <div className="text-center text-xs">
                  <div className="h-8 border-b border-dashed w-36 mb-1" />
                  <span className="text-muted-foreground font-medium">Head of Department</span>
                </div>

                <div className="text-center text-xs">
                  <div className="h-8 font-bold text-primary font-serif italic flex items-center justify-center">
                    Dr. P. K. Sharma
                  </div>
                  <div className="border-t border-dashed w-44 pt-1">
                    <span className="font-bold text-foreground block">Dean, Corporate Relations</span>
                    <span className="text-[10px] text-muted-foreground">CollegeHub Institute</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
