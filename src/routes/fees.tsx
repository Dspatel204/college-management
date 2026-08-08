import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  getFees as fetchFees,
  createFee as apiCreateFee,
  updateFee as apiUpdateFee,
  getStudents as fetchStudents,
  type FeeRecord,
  type Student,
} from "@/lib/api";
import { getStudentName, getStudentById } from "@/lib/college-data";
import { StatsCard } from "@/components/StatsCard";
import { IndianRupee, Receipt, AlertTriangle, CheckCircle, Printer, Plus, Loader2 } from "lucide-react";

export const Route = createFileRoute("/fees")({
  component: FeesPage,
});

function FeesPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [receiptFee, setReceiptFee] = useState<FeeRecord | null>(null);
  const [collectDialog, setCollectDialog] = useState(false);
  const [collectStudentId, setCollectStudentId] = useState("");
  const [collectType, setCollectType] = useState<FeeRecord["type"]>("tuition");
  const [collectAmount, setCollectAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadFees();
    loadStudents();
  }, []);

  const loadFees = async () => {
    setLoading(true);
    try {
      const data = await fetchFees();
      setFees(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load fees:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load students:", e);
    }
  };

  if (!isAuthenticated) return null;

  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const totalCollected = fees.reduce((s, f) => s + f.paid, 0);
  const totalPending = totalFees - totalCollected;
  const overdueCount = fees.filter((f) => f.status === "overdue").length;

  const filtered = statusFilter === "all" ? fees : fees.filter((f) => f.status === statusFilter);

  const statusBadge = (status: FeeRecord["status"]) => {
    const variants: Record<string, string> = {
      paid: "bg-success/10 text-success border-success/20",
      partial: "bg-warning/10 text-warning border-warning/20",
      pending: "bg-info/10 text-info border-info/20",
      overdue: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={variants[status]}>{status}</Badge>;
  };

  const handleCollect = async () => {
    if (!collectStudentId || !collectAmount) return;
    setSaving(true);
    try {
      const newFee = await apiCreateFee({
        studentId: collectStudentId,
        type: collectType,
        amount: Number(collectAmount),
        paid: Number(collectAmount),
        dueDate: new Date().toISOString().split("T")[0],
        paidDate: new Date().toISOString().split("T")[0],
        status: "paid",
        receiptNo: `REC-${Date.now().toString().slice(-6)}`,
      });
      setFees([newFee as FeeRecord, ...fees]);
      setCollectDialog(false);
      setCollectAmount("");
      setCollectStudentId("");
    } catch (e) {
      console.error("Collect fee failed:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Management</h1>
          <p className="text-sm text-muted-foreground">Track fee collection, receipts, and pending payments</p>
        </div>
        <Button onClick={() => setCollectDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Collect Fee
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Fees" value={`₹${totalFees.toLocaleString()}`} icon={IndianRupee} subtitle="This semester" />
        <StatsCard title="Collected" value={`₹${totalCollected.toLocaleString()}`} icon={CheckCircle} colorClass="bg-success" subtitle={`${Math.round((totalCollected / totalFees) * 100)}% collected`} />
        <StatsCard title="Pending" value={`₹${totalPending.toLocaleString()}`} icon={AlertTriangle} colorClass="bg-warning" />
        <StatsCard title="Overdue" value={overdueCount} icon={AlertTriangle} colorClass="bg-destructive" subtitle="Need immediate attention" />
      </div>

      {/* Filter */}
      <div className="mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{getStudentName(fee.studentId)}</p>
                        <p className="text-xs text-muted-foreground">{getStudentById(fee.studentId)?.rollNo}</p>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{fee.type}</TableCell>
                    <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell>₹{fee.paid.toLocaleString()}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>{statusBadge(fee.status)}</TableCell>
                    <TableCell>
                      {fee.receiptNo && (
                        <Button variant="ghost" size="sm" onClick={() => setReceiptFee(fee)} className="gap-1">
                          <Printer className="h-3.5 w-3.5" /> Receipt
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Receipt Dialog */}
      <Dialog open={!!receiptFee} onOpenChange={() => setReceiptFee(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Receipt className="h-5 w-5" /> Fee Receipt</DialogTitle>
          </DialogHeader>
          {receiptFee && (
            <div className="space-y-4 rounded-lg border border-border p-6">
              <div className="text-center border-b border-border pb-4">
                <h3 className="text-lg font-bold text-foreground">CollegeHub</h3>
                <p className="text-xs text-muted-foreground">Fee Payment Receipt</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Receipt No:</span> <span className="font-medium text-foreground">{receiptFee.receiptNo}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="font-medium text-foreground">{receiptFee.paidDate}</span></div>
                <div><span className="text-muted-foreground">Student:</span> <span className="font-medium text-foreground">{getStudentName(receiptFee.studentId)}</span></div>
                <div><span className="text-muted-foreground">Roll No:</span> <span className="font-medium text-foreground">{getStudentById(receiptFee.studentId)?.rollNo}</span></div>
                <div><span className="text-muted-foreground">Fee Type:</span> <span className="font-medium text-foreground capitalize">{receiptFee.type}</span></div>
                <div><span className="text-muted-foreground">Amount:</span> <span className="font-bold text-foreground">₹{receiptFee.paid.toLocaleString()}</span></div>
              </div>
              <div className="mt-4 border-t border-border pt-4 text-center">
                <p className="text-xs text-muted-foreground">This is a computer-generated receipt</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Collect Fee Dialog */}
      <Dialog open={collectDialog} onOpenChange={setCollectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Collect Fee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Student</label>
              <Select value={collectStudentId} onValueChange={setCollectStudentId}>
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNo})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Fee Type</label>
              <Select value={collectType} onValueChange={(v) => setCollectType(v as FeeRecord["type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuition">Tuition</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="lab">Lab</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Amount (₹)</label>
              <Input type="number" value={collectAmount} onChange={(e) => setCollectAmount(e.target.value)} placeholder="Enter amount" />
            </div>
            <Button onClick={handleCollect} className="w-full" disabled={saving}>
              {saving ? "Processing..." : "Collect & Generate Receipt"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
