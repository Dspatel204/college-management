import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getReports as fetchReports, getExamResults, type ReportData } from "@/lib/api";
import { DEPARTMENTS } from "@/lib/college-data";
import { Users, ClipboardCheck, IndianRupee, BarChart3, Loader2 } from "lucide-react";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [deptFilter, setDeptFilter] = useState("all");
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadReports();
  }, [deptFilter]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await fetchReports(deptFilter !== "all" ? { department: deptFilter } : undefined);
      setReportData(data as ReportData);
    } catch (e) {
      console.error("Failed to load reports:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const studentReport = reportData?.studentReport || [];
  const attendanceBySubject = reportData?.attendanceBySubject || [];
  const feeByDept = reportData?.feeByDept || [];
  const totals = reportData?.totals || { totalFees: 0, totalCollected: 0 };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Comprehensive student, attendance, and fee reports</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs defaultValue="student" className="space-y-4">
          <TabsList>
            <TabsTrigger value="student" className="gap-2"><Users className="h-4 w-4" /> Student Report</TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2"><ClipboardCheck className="h-4 w-4" /> Attendance Report</TabsTrigger>
            <TabsTrigger value="fee" className="gap-2"><IndianRupee className="h-4 w-4" /> Fee Report</TabsTrigger>
          </TabsList>

          {/* STUDENT REPORT */}
          <TabsContent value="student">
            <div className="mb-4">
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-56"><SelectValue placeholder="Filter by department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Total Fee</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Fee Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentReport.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.rollNo}</p>
                          </div>
                        </TableCell>
                        <TableCell>{s.department}</TableCell>
                        <TableCell>{s.semester}</TableCell>
                        <TableCell>
                          <span className={s.attendanceRate >= 75 ? "text-success font-medium" : "text-destructive font-medium"}>
                            {s.attendanceRate}%
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">({s.presentClasses}/{s.totalClasses})</span>
                        </TableCell>
                        <TableCell>₹{s.totalFee.toLocaleString()}</TableCell>
                        <TableCell>₹{s.paidFee.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            s.feeStatus === "paid" ? "bg-success/10 text-success border-success/20" :
                            s.feeStatus === "partial" ? "bg-warning/10 text-warning border-warning/20" :
                            "bg-destructive/10 text-destructive border-destructive/20"
                          }>{s.feeStatus}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ATTENDANCE REPORT */}
          <TabsContent value="attendance">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Attendance by Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {attendanceBySubject.map((item) => (
                    <div key={item.subject}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.subject}</span>
                        <span className="text-sm font-semibold text-foreground">{item.rate}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-secondary">
                        <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${item.rate}%` }} />
                      </div>
                      <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                        <span>Present: {item.present}</span>
                        <span>Absent: {item.absent}</span>
                        <span>Late: {item.late}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FEE REPORT */}
          <TabsContent value="fee">
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-2xl font-bold text-foreground">₹{totals.totalFees.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="text-2xl font-bold text-success">₹{totals.totalCollected.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-destructive">₹{(totals.totalFees - totals.totalCollected).toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Fee Collection by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Collected</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Collection Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeByDept.map((d) => (
                      <TableRow key={d.department}>
                        <TableCell className="font-medium text-foreground">{d.department}</TableCell>
                        <TableCell>₹{d.total.toLocaleString()}</TableCell>
                        <TableCell className="text-success">₹{d.collected.toLocaleString()}</TableCell>
                        <TableCell className="text-destructive">₹{d.pending.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 rounded-full bg-secondary">
                              <div className="h-2 rounded-full bg-primary" style={{ width: `${d.rate}%` }} />
                            </div>
                            <span className="text-sm font-medium">{d.rate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
}
