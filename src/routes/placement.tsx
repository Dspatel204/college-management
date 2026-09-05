import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  getPlacementDrives,
  createPlacementDrive,
  getStudentPlacements,
  getPlacementApplications,
  applyForPlacementDrive,
  updateApplicationStatus,
  getStudents,
  type Student,
} from "@/lib/api";
import {
  DEPARTMENTS,
  type PlacementDrive,
  type StudentPlacementProfile,
  type PlacementApplication,
} from "@/lib/college-data";
import {
  Briefcase,
  Building2,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  IndianRupee,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Loader2,
  Code,
  FileCheck,
} from "lucide-react";

export const Route = createFileRoute("/placement")({
  component: PlacementPage,
});

function PlacementPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<StudentPlacementProfile[]>([]);
  const [applications, setApplications] = useState<PlacementApplication[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Add Drive Dialog
  const [addDriveDialog, setAddDriveDialog] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPackage, setNewPackage] = useState("12.0");
  const [newCgpa, setNewCgpa] = useState("7.0");
  const [newMinAtt, setNewMinAtt] = useState("75");
  const [newDept, setNewDept] = useState(DEPARTMENTS[0]);
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("Campus Auditorium");
  const [newDesc, setNewDesc] = useState("");

  // Notification
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
      const [drivesData, profilesData, appsData, studentsData] = await Promise.all([
        getPlacementDrives(),
        getStudentPlacements(),
        getPlacementApplications(),
        getStudents(),
      ]);
      setDrives(drivesData);
      setStudentProfiles(profilesData);
      setApplications(appsData);
      setStudents(studentsData);
    } catch (e) {
      console.error("Failed to load placement data:", e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;
    try {
      const created = await createPlacementDrive({
        companyName: newCompany,
        logo: newCompany.slice(0, 2).toUpperCase(),
        role: newRole,
        packageLPA: parseFloat(newPackage) || 10,
        eligibilityCgpa: parseFloat(newCgpa) || 7.0,
        minAttendanceRate: parseInt(newMinAtt) || 75,
        allowedBacklogs: 0,
        eligibleDepartments: [newDept],
        driveDate: newDate || new Date().toISOString().split("T")[0],
        location: newLocation,
        type: "Full-Time",
        status: "Upcoming",
        description: newDesc || "Campus recruitment drive for engineering graduates.",
      });
      setDrives([created, ...drives]);
      setAddDriveDialog(false);
      showToast(`Drive created for ${newCompany}!`);
      setNewCompany("");
      setNewRole("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (driveId: string) => {
    const studentId = user?.role === "student" ? "s1" : students[0]?.id || "s1";
    try {
      const app = await applyForPlacementDrive(driveId, studentId);
      setApplications([app, ...applications]);
      const updatedDrives = await getPlacementDrives();
      setDrives(updatedDrives);
      showToast("Application submitted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (appId: string, status: PlacementApplication["status"]) => {
    try {
      const updated = await updateApplicationStatus(appId, status);
      setApplications(applications.map((a) => (a.id === appId ? updated : a)));
      showToast(`Application marked as ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  const totalOffers = studentProfiles.filter((p) => p.placementStatus === "Placed").length;
  const highestPackage = Math.max(...drives.map((d) => d.packageLPA), 24.5);
  const avgPackage = (
    drives.reduce((s, d) => s + d.packageLPA, 0) / (drives.length || 1)
  ).toFixed(1);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Placement & Career Readiness Portal</h1>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 gap-1">
              <TrendingUp className="h-3 w-3" /> Season 2024-25
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage corporate campus drives, track student job applications, skill matrices, and placement offers.
          </p>
        </div>
        {user?.role !== "student" && (
          <Button onClick={() => setAddDriveDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Campus Drive
          </Button>
        )}
      </div>

      {toastMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" /> {toastMsg}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Active Drives</span>
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{drives.length}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Top tech &amp; core recruiters</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Offers Rolled</span>
              <Award className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalOffers + 12}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Students placed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Highest Package</span>
              <IndianRupee className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">₹{highestPackage} LPA</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Google Cloud / Microsoft</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Average Package</span>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">₹{avgPackage} LPA</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Across all branches</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="drives" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="drives" className="gap-1.5 text-xs">
              <Building2 className="h-3.5 w-3.5" /> Campus Drives
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-1.5 text-xs">
              <Code className="h-3.5 w-3.5" /> Skill Matrix
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-1.5 text-xs">
              <FileCheck className="h-3.5 w-3.5" /> Applications ({applications.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: CAMPUS DRIVES */}
          <TabsContent value="drives" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drives.map((d) => (
                <Card key={d.id} className="border shadow-sm hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-base">
                          {d.logo}
                        </div>
                        <div>
                          <CardTitle className="text-base">{d.companyName}</CardTitle>
                          <CardDescription className="font-medium text-foreground">{d.role}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={
                          d.status === "Upcoming"
                            ? "bg-blue-500 text-white"
                            : d.status === "Active"
                            ? "bg-emerald-600 text-white"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {d.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">{d.description}</p>

                    {/* Criteria Badges */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-1 rounded bg-muted px-2 py-1 font-semibold text-primary">
                        <IndianRupee className="h-3.5 w-3.5" /> ₹{d.packageLPA} LPA
                      </div>
                      <div className="flex items-center gap-1 rounded bg-muted px-2 py-1">
                        <Award className="h-3.5 w-3.5 text-muted-foreground" /> Min CGPA: {d.eligibilityCgpa}
                      </div>
                      <div className="flex items-center gap-1 rounded bg-muted px-2 py-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Att: &ge; {d.minAttendanceRate}%
                      </div>
                      <div className="flex items-center gap-1 rounded bg-muted px-2 py-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {d.driveDate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t text-xs">
                      <div className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{d.registeredCount}</span> registered • <span className="font-semibold text-emerald-600">{d.placedCount}</span> placed
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleApply(d.id)}
                        className="h-8 gap-1.5 text-xs"
                      >
                        Register / Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: SKILL MATRIX & PROFILES */}
          <TabsContent value="skills">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Student Technical Skill Matrix & Resume Score</CardTitle>
                <CardDescription>Tracks verified skills, certifications, and placement readiness index</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead className="text-center">CGPA</TableHead>
                        <TableHead className="text-center">Resume Score</TableHead>
                        <TableHead>Core Technical Skills</TableHead>
                        <TableHead>Certifications</TableHead>
                        <TableHead>Placement Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentProfiles.map((p) => {
                        const st = students.find((s) => s.id === p.studentId);
                        return (
                          <TableRow key={p.studentId}>
                            <TableCell>
                              <div className="font-medium text-sm">{st?.name || "Student " + p.studentId}</div>
                              <div className="text-[11px] text-muted-foreground">{st?.department}</div>
                            </TableCell>
                            <TableCell className="text-center font-bold text-xs">{p.cgpa}</TableCell>
                            <TableCell className="text-center">
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                {p.resumeScore}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {p.skills.map((sk) => (
                                  <span key={sk} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {p.certifications.join(", ") || "In progress"}
                            </TableCell>
                            <TableCell>
                              {p.placementStatus === "Placed" && (
                                <Badge className="bg-emerald-600 text-white text-[11px]">
                                  Placed ({p.placedCompany} • ₹{p.packageOffered} LPA)
                                </Badge>
                              )}
                              {p.placementStatus === "Shortlisted" && (
                                <Badge className="bg-blue-600 text-white text-[11px]">Shortlisted</Badge>
                              )}
                              {p.placementStatus === "Searching" && (
                                <Badge variant="outline" className="text-muted-foreground text-[11px]">Searching</Badge>
                              )}
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

          {/* TAB 3: APPLICATIONS TRACKER */}
          <TabsContent value="applications">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Live Drive Applications Pipeline</CardTitle>
                <CardDescription>Track candidates progressing through interview rounds and offers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Recruiter & Role</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Pipeline Stage</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="text-right">Update Stage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => {
                        const st = students.find((s) => s.id === app.studentId);
                        const dr = drives.find((d) => d.id === app.driveId);
                        return (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div className="font-medium text-sm">{st?.name || "Student"}</div>
                              <div className="text-[11px] text-muted-foreground">{st?.rollNo}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-xs">{dr?.companyName || "Company"}</div>
                              <div className="text-[11px] text-muted-foreground">{dr?.role}</div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{app.appliedDate}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  app.status === "Offered"
                                    ? "bg-emerald-600 text-white"
                                    : app.status === "Interview Scheduled"
                                    ? "bg-blue-600 text-white"
                                    : app.status === "Shortlisted"
                                    ? "bg-purple-600 text-white"
                                    : "bg-muted text-foreground"
                                }
                              >
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{app.notes || "—"}</TableCell>
                            <TableCell className="text-right">
                              <Select
                                value={app.status}
                                onValueChange={(val: any) => handleStatusChange(app.id, val)}
                              >
                                <SelectTrigger className="w-36 h-8 text-xs ml-auto">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Applied">Applied</SelectItem>
                                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                                  <SelectItem value="Offered">Offered 🎉</SelectItem>
                                  <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
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

      {/* Add Drive Modal */}
      <Dialog open={addDriveDialog} onOpenChange={setAddDriveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Campus Recruitment Drive</DialogTitle>
            <DialogDescription>Enter corporate details and candidate eligibility criteria</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateDrive} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-medium">Company Name</label>
              <Input
                placeholder="E.g. Amazon / Google / TCS"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium">Job Role</label>
              <Input
                placeholder="E.g. Software Engineer / Data Analyst"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium">Package (CTC in LPA)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={newPackage}
                  onChange={(e) => setNewPackage(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium">Min CGPA Required</label>
                <Input
                  type="number"
                  step="0.1"
                  value={newCgpa}
                  onChange={(e) => setNewCgpa(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium">Min Attendance %</label>
                <Input
                  type="number"
                  value={newMinAtt}
                  onChange={(e) => setNewMinAtt(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium">Eligible Dept</label>
                <Select value={newDept} onValueChange={setNewDept}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Drive Date &amp; Location</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
                <Input
                  placeholder="Location / Auditorium"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Job Description / Requirements</label>
              <Textarea
                placeholder="Brief job overview..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={2}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setAddDriveDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Drive</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
