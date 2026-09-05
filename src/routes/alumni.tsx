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
  getAlumniList,
  getMentorshipSessions,
  bookMentorshipSession,
  getStudents,
  type Student,
} from "@/lib/api";
import {
  type AlumniProfile,
  type MentorshipSession,
  DEPARTMENTS,
} from "@/lib/college-data";
import {
  Globe,
  Users,
  Building2,
  Calendar,
  Video,
  CheckCircle2,
  Search,
  ExternalLink,
  MessageSquare,
  Sparkles,
  MapPin,
  GraduationCap,
  Loader2,
  Briefcase,
} from "lucide-react";

export const Route = createFileRoute("/alumni")({
  component: AlumniPage,
});

function AlumniPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  // Mentorship Booking Dialog
  const [bookDialog, setBookDialog] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [topic, setTopic] = useState("FAANG Mock Coding & System Design");
  const [preferredDate, setPreferredDate] = useState("");
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
      const [alData, sData, stData] = await Promise.all([
        getAlumniList(),
        getMentorshipSessions(),
        getStudents(),
      ]);
      setAlumni(alData);
      setSessions(sData);
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

  const handleOpenBooking = (al: AlumniProfile) => {
    setSelectedAlumni(al);
    setBookDialog(true);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlumni) return;
    try {
      const studentId = user?.role === "student" ? "s1" : students[0]?.id || "s1";
      const created = await bookMentorshipSession({
        alumniId: selectedAlumni.id,
        studentId,
        topic,
        preferredDate,
      });
      setSessions([created, ...sessions]);
      setBookDialog(false);
      showToast(`Mentorship session scheduled with ${selectedAlumni.name}! Google Meet link generated.`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  const filteredAlumni = alumni.filter((al) => {
    const matchSearch =
      al.name.toLowerCase().includes(search.toLowerCase()) ||
      al.currentCompany.toLowerCase().includes(search.toLowerCase()) ||
      al.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || al.department === deptFilter;
    return matchSearch && matchDept;
  });

  const getStudent = (id: string) => students.find((s) => s.id === id);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Alumni Network &amp; Mentorship Connect</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Globe className="h-3 w-3" /> Global Community
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Connect with accomplished graduates at Google, Apple, Microsoft, and Tesla for 1-on-1 career guidance.
          </p>
        </div>
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
              <span className="text-xs font-medium">Alumni Network</span>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">1,250+</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Global graduate pool</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Top Employers</span>
              <Building2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">FAANG &amp; Fortune 500</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Google, Apple, Microsoft, Tesla</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">1-on-1 Mentorships</span>
              <Video className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{sessions.length} Scheduled</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Active video sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Mentors Available</span>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
              {alumni.filter((a) => a.mentorshipAvailable).length} Ready
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">For Mock Interviews &amp; Referrals</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="directory" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-xs">
            <TabsTrigger value="directory" className="gap-1.5 text-xs">
              <Users className="h-3.5 w-3.5" /> Alumni Directory
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-1.5 text-xs">
              <Video className="h-3.5 w-3.5" /> Mentorship Calls ({sessions.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: DIRECTORY */}
          <TabsContent value="directory" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alumni or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-9 text-xs"
                />
              </div>
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-full sm:w-48 h-9 text-xs"><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAlumni.map((al) => (
                <Card key={al.id} className="border shadow-xs hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-lg">
                          {al.avatar}
                        </div>
                        <div>
                          <CardTitle className="text-base">{al.name}</CardTitle>
                          <CardDescription className="font-semibold text-primary text-xs">
                            {al.role} • {al.currentCompany}
                          </CardDescription>
                          <p className="text-[11px] text-muted-foreground">
                            Batch of {al.batchYear} • {al.department}
                          </p>
                        </div>
                      </div>
                      {al.mentorshipAvailable && (
                        <Badge className="bg-emerald-600 text-white text-[10px]">
                          Mentor Available
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">{al.bio}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {al.specialties.map((sp) => (
                        <span key={sp} className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
                          {sp}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {al.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleOpenBooking(al)}
                          disabled={!al.mentorshipAvailable}
                          className="h-8 gap-1 text-xs"
                        >
                          <Video className="h-3.5 w-3.5" /> Book 1-on-1 Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: SESSIONS */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Scheduled 1-on-1 Mentorship Calls</CardTitle>
                <CardDescription>Upcoming guidance sessions with alumni industry mentors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alumni Mentor</TableHead>
                        <TableHead>Student Mentee</TableHead>
                        <TableHead>Session Topic</TableHead>
                        <TableHead>Scheduled Date &amp; Time</TableHead>
                        <TableHead>Meeting Link</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((sess) => {
                        const al = alumni.find((a) => a.id === sess.alumniId);
                        const st = getStudent(sess.studentId);
                        return (
                          <TableRow key={sess.id}>
                            <TableCell>
                              <div className="font-semibold text-xs">{al?.name}</div>
                              <div className="text-[10px] text-muted-foreground">{al?.currentCompany}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold text-xs">{st?.name || "Student"}</div>
                              <div className="text-[10px] text-muted-foreground">{st?.rollNo}</div>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-foreground">{sess.topic}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{sess.sessionDate}</TableCell>
                            <TableCell>
                              <a
                                href={`https://${sess.meetingLink}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                              >
                                <Video className="h-3 w-3" /> Join Call
                              </a>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-600 text-white text-[10px]">
                                {sess.status}
                              </Badge>
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

      {/* Book Mentorship Dialog */}
      {selectedAlumni && (
        <Dialog open={bookDialog} onOpenChange={setBookDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" /> Book 1-on-1 with {selectedAlumni.name}
              </DialogTitle>
              <DialogDescription>
                {selectedAlumni.role} at {selectedAlumni.currentCompany} ({selectedAlumni.department} Alum)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleConfirmBooking} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold">Mentorship Topic</label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FAANG Mock Coding & System Design">FAANG Mock Coding &amp; System Design</SelectItem>
                    <SelectItem value="Resume Optimization & Review">Resume Optimization &amp; Review</SelectItem>
                    <SelectItem value="MS / Higher Studies Abroad Guidance">MS / Higher Studies Abroad Guidance</SelectItem>
                    <SelectItem value="Core Engineering Industry Career Path">Core Engineering Industry Career Path</SelectItem>
                    <SelectItem value="Startup & Product Development">Startup &amp; Product Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold">Preferred Date &amp; Slot</label>
                <Input
                  type="datetime-local"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setBookDialog(false)}>Cancel</Button>
                <Button type="submit">Confirm Mentorship Call</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
