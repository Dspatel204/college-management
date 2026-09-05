import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getGrievanceCases,
  submitGrievanceCase,
  updateGrievanceStatus,
} from "@/lib/api";
import {
  type GrievanceCase,
} from "@/lib/college-data";
import {
  ShieldAlert,
  ShieldCheck,
  PhoneCall,
  Scale,
  Users,
  AlertTriangle,
  Lock,
  EyeOff,
  CheckCircle2,
  Plus,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/grievance-cell")({
  component: GrievanceCellPage,
});

function GrievanceCellPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<GrievanceCase[]>([]);

  // Report Modal
  const [reportModal, setReportModal] = useState(false);
  const [category, setCategory] = useState<GrievanceCase["category"]>("Anti-Ragging Incident");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("Hostel Block A / Campus");
  const [description, setDescription] = useState("");
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
      const data = await getGrievanceCases();
      setCases(data);
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

  const handleSubmitCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    try {
      const created = await submitGrievanceCase({
        category,
        submittedBy: isAnonymous ? "Anonymous / Confidential" : user?.name || "Student",
        studentId: isAnonymous ? undefined : user?.id,
        incidentDate,
        location,
        description,
        confidentialityLevel: isAnonymous ? "Strictly Confidential" : "Standard",
      });
      setCases([created, ...cases]);
      setReportModal(false);
      showToast(`Incident logged confidentially under Ticket No: ${created.ticketNo}. Statutory Committee notified!`);
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (caseId: string, status: GrievanceCase["status"]) => {
    try {
      const updated = await updateGrievanceStatus(
        caseId,
        status,
        "Formal inquiry concluded. Preventive safeguards and disciplinary action documented in official ATR."
      );
      setCases(cases.map((c) => (c.id === caseId ? updated : c)));
      showToast(`Grievance ticket marked as ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">UGC Anti-Ragging &amp; Internal Complaints Cell (ICC)</h1>
            <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 gap-1">
              <ShieldAlert className="h-3 w-3" /> Zero Tolerance Mandate
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Supreme Court of India &amp; UGC Mandated Anti-Ragging Squad, Women Safety ICC, and Student Grievance Redressal (SGRC).
          </p>
        </div>

        <Button onClick={() => setReportModal(true)} variant="destructive" className="gap-2">
          <Lock className="h-4 w-4" /> Report Confidential Incident
        </Button>
      </div>

      {toastMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" /> {toastMsg}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">Total Grievances</span>
              <ShieldAlert className="h-4 w-4 text-red-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">{cases.length} Reported</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">All addressed by committees</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Resolution Rate</span>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">100% Resolved</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Within UGC stipulated 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Affidavits Verified</span>
              <Scale className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">98.4%</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Signed by Student &amp; Parent</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold text-primary">24/7 Helpline</span>
              <PhoneCall className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold text-primary">1800-180-5522</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">National Toll-Free UGC Desk</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="cases" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-sm">
            <TabsTrigger value="cases" className="gap-1.5 text-xs">
              <ShieldAlert className="h-3.5 w-3.5" /> Grievance Register ({cases.length})
            </TabsTrigger>
            <TabsTrigger value="committees" className="gap-1.5 text-xs">
              <Users className="h-3.5 w-3.5" /> Statutory Committees
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: GRIEVANCE REGISTER */}
          <TabsContent value="cases">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Statutory Grievance &amp; Disciplinary Register</CardTitle>
                <CardDescription>Investigation proceedings, committee assignments, and Action Taken Reports (ATR)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket No</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Complainant</TableHead>
                        <TableHead>Incident Location</TableHead>
                        <TableHead>Assigned Committee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cases.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-mono text-xs font-bold text-primary">
                            {c.ticketNo}
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-xs text-foreground block">{c.category}</span>
                            <span className="text-[10px] text-muted-foreground line-clamp-1">{c.description}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] gap-1">
                              <EyeOff className="h-3 w-3" /> {c.submittedBy}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{c.location}</TableCell>
                          <TableCell className="text-xs font-medium text-foreground">{c.committeeAssigned}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                c.status === "Closed & Resolved"
                                  ? "bg-emerald-600 text-white"
                                  : c.status === "Action Taken"
                                  ? "bg-blue-600 text-white"
                                  : c.status === "Inquiry Scheduled"
                                  ? "bg-amber-500 text-white"
                                  : "bg-red-500 text-white"
                              }
                            >
                              {c.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Select
                              value={c.status}
                              onValueChange={(val: any) => handleStatusUpdate(c.id, val)}
                            >
                              <SelectTrigger className="w-40 h-8 text-xs ml-auto">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Reported">Reported</SelectItem>
                                <SelectItem value="Inquiry Scheduled">Inquiry Scheduled</SelectItem>
                                <SelectItem value="Action Taken">Action Taken</SelectItem>
                                <SelectItem value="Closed & Resolved">Closed &amp; Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: STATUTORY COMMITTEES */}
          <TabsContent value="committees">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-red-500/30">
                <CardHeader className="pb-2">
                  <Badge className="bg-red-500 text-white w-fit text-[10px] mb-1">Mandatory Squad</Badge>
                  <CardTitle className="text-base">Anti-Ragging Squad</CardTitle>
                  <CardDescription className="text-xs">Chaired by Principal &amp; Senior HODs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p className="text-muted-foreground">Conducts surprise checks at hostels, canteen, and bus terminals.</p>
                  <div className="rounded bg-muted p-2 space-y-1 font-mono text-[11px]">
                    <div>Head: Dr. P. K. Sharma (Dean)</div>
                    <div>Phone: +91 98000 11223</div>
                    <div>Email: antiragging@college.edu</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30">
                <CardHeader className="pb-2">
                  <Badge className="bg-purple-600 text-white w-fit text-[10px] mb-1">POSH Act 2013</Badge>
                  <CardTitle className="text-base">Internal Complaints Committee (ICC)</CardTitle>
                  <CardDescription className="text-xs">Women Safety &amp; Prevention of Harassment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p className="text-muted-foreground">Headed by senior female professor with NGO representative.</p>
                  <div className="rounded bg-muted p-2 space-y-1 font-mono text-[11px]">
                    <div>Presiding Officer: Dr. S. Iyer</div>
                    <div>Phone: +91 98000 44556</div>
                    <div>Email: icc@college.edu</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30">
                <CardHeader className="pb-2">
                  <Badge className="bg-blue-600 text-white w-fit text-[10px] mb-1">UGC Redressal</Badge>
                  <CardTitle className="text-base">Student Grievance Redressal (SGRC)</CardTitle>
                  <CardDescription className="text-xs">Academic &amp; Evaluation Redressal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p className="text-muted-foreground">Addresses exam re-evaluations, fee installment, and campus disputes.</p>
                  <div className="rounded bg-muted p-2 space-y-1 font-mono text-[11px]">
                    <div>Ombudsperson: Prof. R. Rao</div>
                    <div>Phone: +91 98000 77889</div>
                    <div>Email: sgrc@college.edu</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Confidential Incident Modal */}
      <Dialog open={reportModal} onOpenChange={setReportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Lock className="h-5 w-5" /> Report Confidential Incident
            </DialogTitle>
            <DialogDescription>
              Your identity will be strictly protected under the Whistleblower Protection guidelines.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCase} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold">Incident Category</label>
              <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anti-Ragging Incident">Anti-Ragging Incident</SelectItem>
                  <SelectItem value="Internal Complaints (ICC - Women Safety)">Internal Complaints (ICC - Women Safety)</SelectItem>
                  <SelectItem value="Academic & Exam Evaluation">Academic &amp; Exam Evaluation Dispute</SelectItem>
                  <SelectItem value="Hostel & Campus Facility">Hostel &amp; Campus Safety Grievance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold">Incident Location on Campus</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g. Hostel Block A / Library / College Bus"
                required
              />
            </div>

            <div className="flex items-center gap-2 p-2 bg-muted/40 rounded-lg text-xs">
              <input
                type="checkbox"
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-primary h-4 w-4"
              />
              <label htmlFor="anon" className="font-medium cursor-pointer">
                Submit Anonymously (Do not reveal my name / roll number)
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold">Describe the Incident in Detail</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide accurate description of what happened..."
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setReportModal(false)}>Cancel</Button>
              <Button type="submit" variant="destructive">Submit Confidential Report</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
