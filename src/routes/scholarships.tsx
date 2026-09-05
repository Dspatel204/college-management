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
  getScholarshipSchemes,
  getScholarshipApplications,
  submitScholarshipApplication,
  updateScholarshipStatus,
  getStudents,
  type Student,
} from "@/lib/api";
import {
  type ScholarshipScheme,
  type StudentScholarshipApplication,
} from "@/lib/college-data";
import {
  HandCoins,
  IndianRupee,
  FileCheck,
  ShieldCheck,
  Calendar,
  Users,
  CheckCircle2,
  Building2,
  Clock,
  Plus,
  Loader2,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [schemes, setSchemes] = useState<ScholarshipScheme[]>([]);
  const [applications, setApplications] = useState<StudentScholarshipApplication[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Apply Modal
  const [applyModal, setApplyModal] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState("");
  const [income, setIncome] = useState("200000");
  const [categoryClaimed, setCategoryClaimed] = useState("OBC");
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
      const [scData, appData, stData] = await Promise.all([
        getScholarshipSchemes(),
        getScholarshipApplications(),
        getStudents(),
      ]);
      setSchemes(scData);
      setApplications(appData);
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

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchemeId) return;
    try {
      const studentId = user?.role === "student" ? "s1" : students[0]?.id || "s1";
      const sc = schemes.find((s) => s.id === selectedSchemeId);
      const created = await submitScholarshipApplication({
        schemeId: selectedSchemeId,
        studentId,
        annualFamilyIncome: parseInt(income) || 200000,
        categoryClaimed,
        sanctionedAmount: 50000,
      });
      setApplications([created, ...applications]);
      setApplyModal(false);
      showToast(`Application submitted for ${sc?.name}! College verification initiated.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (appId: string, status: StudentScholarshipApplication["status"]) => {
    try {
      const updated = await updateScholarshipStatus(appId, status);
      setApplications(applications.map((a) => (a.id === appId ? updated : a)));
      showToast(`Application status updated to ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  const totalSanctioned = applications.reduce((s, a) => s + a.sanctionedAmount, 0) || 125000;
  const dbtDisbursedCount = applications.filter((a) => a.status === "DBT Disbursed").length;

  const getStudent = (id: string) => students.find((s) => s.id === id);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Govt &amp; Institutional Scholarship Portal</h1>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 gap-1">
              <HandCoins className="h-3 w-3" /> NSP &amp; State DBT Verified
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Central National Scholarship Portal (NSP), State Social Welfare DBT, AICTE Pragati, and Institutional EWS Freeships.
          </p>
        </div>

        <Button onClick={() => setApplyModal(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Apply for Scholarship
        </Button>
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
              <span className="text-xs font-medium">Available Schemes</span>
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{schemes.length} Schemes</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">NSP, State DBT, AICTE, EWS</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Total Aid Disbursed</span>
              <IndianRupee className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ₹{totalSanctioned.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Govt DBT + Fee Freeships</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Beneficiary Students</span>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {applications.length + 42} Students
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Tuition fee subsidized</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">College Verification</span>
              <ShieldCheck className="h-4 w-4 text-purple-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">100% Online</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Aadhaar-seeded portal</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="schemes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-sm">
            <TabsTrigger value="schemes" className="gap-1.5 text-xs">
              <Building2 className="h-3.5 w-3.5" /> Scholarship Schemes
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-1.5 text-xs">
              <FileCheck className="h-3.5 w-3.5" /> Applications &amp; Verification ({applications.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: SCHEMES CATALOG */}
          <TabsContent value="schemes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.map((sc) => (
                <Card key={sc.id} className="border shadow-xs hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="text-[10px] font-semibold text-primary mb-1">
                          {sc.provider}
                        </Badge>
                        <CardTitle className="text-base">{sc.name}</CardTitle>
                      </div>
                      <Badge className="bg-emerald-600 text-white text-[10px]">
                        {sc.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 border">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Financial Benefit:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{sc.benefitAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Target Category:</span>
                        <span className="font-semibold text-foreground">{sc.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Max Family Income:</span>
                        <span className="font-semibold text-foreground">&le; ₹{(sc.maxAnnualIncome / 100000).toFixed(1)} Lakh / year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Min CGPA / Grade:</span>
                        <span className="font-semibold text-foreground">&ge; {sc.eligibilityCgpa} CGPA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Application Deadline:</span>
                        <span className="font-semibold text-red-500">{sc.deadline}</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedSchemeId(sc.id);
                          setApplyModal(true);
                        }}
                        className="h-8 gap-1.5 text-xs"
                      >
                        Apply / Upload Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: APPLICATIONS PIPELINE */}
          <TabsContent value="applications">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Student Scholarship Verification &amp; Disbursal Pipeline</CardTitle>
                <CardDescription>Verify Aadhaar income/caste certificates and track direct benefit transfer (DBT)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Scheme</TableHead>
                        <TableHead>Family Income</TableHead>
                        <TableHead>Verified Documents</TableHead>
                        <TableHead>Sanctioned Amount</TableHead>
                        <TableHead>Pipeline Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => {
                        const st = getStudent(app.studentId);
                        const sc = schemes.find((s) => s.id === app.schemeId);
                        return (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div className="font-medium text-sm">{st?.name || "Student"}</div>
                              <div className="text-[11px] text-muted-foreground">{st?.rollNo} • {app.categoryClaimed}</div>
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-foreground max-w-xs truncate">
                              {sc?.name || "Scholarship Scheme"}
                            </TableCell>
                            <TableCell className="text-xs font-mono">
                              ₹{app.annualFamilyIncome.toLocaleString("en-IN")}/yr
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-0.5 text-[10px]">
                                {app.verifiedDocuments.map((doc, dIdx) => (
                                  <span key={dIdx} className="flex items-center gap-1 text-muted-foreground">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {doc.docName}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="font-bold text-xs text-emerald-600 font-mono">
                              ₹{app.sanctionedAmount.toLocaleString("en-IN")}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  app.status === "DBT Disbursed"
                                    ? "bg-emerald-600 text-white"
                                    : app.status === "Govt Approved"
                                    ? "bg-blue-600 text-white"
                                    : app.status === "College Verified"
                                    ? "bg-amber-500 text-white"
                                    : "bg-muted text-foreground"
                                }
                              >
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Select
                                value={app.status}
                                onValueChange={(val: any) => handleStatusUpdate(app.id, val)}
                              >
                                <SelectTrigger className="w-36 h-8 text-xs ml-auto">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Applied">Applied</SelectItem>
                                  <SelectItem value="College Verified">College Verified</SelectItem>
                                  <SelectItem value="Govt Approved">Govt Approved</SelectItem>
                                  <SelectItem value="DBT Disbursed">DBT Disbursed 💰</SelectItem>
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

      {/* Apply Scholarship Modal */}
      <Dialog open={applyModal} onOpenChange={setApplyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for Govt / Institutional Scholarship</DialogTitle>
            <DialogDescription>Submit your socio-economic details for mandatory verification</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold">Select Scholarship Scheme</label>
              <Select value={selectedSchemeId} onValueChange={setSelectedSchemeId}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Choose Scheme" /></SelectTrigger>
                <SelectContent>
                  {schemes.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.provider})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold">Annual Family Income (in INR)</label>
              <Input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="E.g. 250000"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold">Category / Quota</label>
              <Select value={categoryClaimed} onValueChange={setCategoryClaimed}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SC / ST">SC / ST</SelectItem>
                  <SelectItem value="OBC (Non-Creamy Layer)">OBC (Non-Creamy Layer)</SelectItem>
                  <SelectItem value="Minority Community">Minority Community</SelectItem>
                  <SelectItem value="EWS (Economically Weaker Section)">EWS (Economically Weaker Section)</SelectItem>
                  <SelectItem value="Girls in Tech (Pragati)">Girls in Tech (Pragati)</SelectItem>
                  <SelectItem value="General Merit">General Merit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
              <span className="font-semibold text-foreground">Mandatory Documents Attached:</span>
              <p>✓ Income Certificate by Tehsildar / Competent Authority</p>
              <p>✓ Caste Validity / Domicile Certificate</p>
              <p>✓ Aadhaar Linked Bank Passbook (DBT Enabled)</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setApplyModal(false)}>Cancel</Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
