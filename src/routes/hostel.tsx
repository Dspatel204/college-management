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
  getHostelRooms,
  getOutingPasses,
  createOutingPass,
  updateOutingPassStatus,
  getHostelComplaints,
  createHostelComplaint,
  getStudents,
  type Student,
} from "@/lib/api";
import {
  type HostelRoom,
  type OutingPass,
  type HostelComplaint,
} from "@/lib/college-data";
import {
  Building,
  Bed,
  DoorClosed,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  AlertTriangle,
  Utensils,
  Wrench,
  Users,
  Loader2,
  ArrowRight,
  Phone,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/hostel")({
  component: HostelPage,
});

function HostelPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<HostelRoom[]>([]);
  const [passes, setPasses] = useState<OutingPass[]>([]);
  const [complaints, setComplaints] = useState<HostelComplaint[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [blockFilter, setBlockFilter] = useState("all");

  // New Pass Dialog
  const [passDialog, setPassDialog] = useState(false);
  const [passReason, setPassReason] = useState("");
  const [passDest, setPassDest] = useState("");
  const [passDep, setPassDep] = useState("");
  const [passRet, setPassRet] = useState("");

  // New Complaint Dialog
  const [complaintDialog, setComplaintDialog] = useState(false);
  const [compRoom, setCompRoom] = useState("A-101");
  const [compCat, setCompCat] = useState<HostelComplaint["category"]>("WiFi / Internet");
  const [compTitle, setCompTitle] = useState("");
  const [compDesc, setCompDesc] = useState("");

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
      const [rData, pData, cData, stData] = await Promise.all([
        getHostelRooms(),
        getOutingPasses(),
        getHostelComplaints(),
        getStudents(),
      ]);
      setRooms(rData);
      setPasses(pData);
      setComplaints(cData);
      setStudents(stData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApplyPass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passReason || !passDest) return;
    try {
      const studentId = user?.role === "student" ? "s1" : students[0]?.id || "s1";
      const created = await createOutingPass({
        studentId,
        reason: passReason,
        destination: passDest,
        departureTime: passDep || new Date().toISOString().split("T")[0] + " 17:00",
        expectedReturn: passRet || new Date().toISOString().split("T")[0] + " 21:00",
        guardianNotified: true,
      });
      setPasses([created, ...passes]);
      setPassDialog(false);
      showToast("Outing gate pass submitted for Warden approval!");
      setPassReason("");
      setPassDest("");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePassStatus = async (passId: string, status: OutingPass["status"]) => {
    try {
      const updated = await updateOutingPassStatus(passId, status, user?.name || "Warden Admin");
      setPasses(passes.map((p) => (p.id === passId ? updated : p)));
      showToast(`Pass updated to ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compTitle || !compDesc) return;
    try {
      const studentId = user?.role === "student" ? "s1" : students[0]?.id || "s1";
      const created = await createHostelComplaint({
        studentId,
        roomNumber: compRoom,
        category: compCat,
        title: compTitle,
        description: compDesc,
      });
      setComplaints([created, ...complaints]);
      setComplaintDialog(false);
      showToast("Maintenance ticket logged successfully!");
      setCompTitle("");
      setCompDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
  const totalOccupied = rooms.reduce((s, r) => s + r.occupied, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  const filteredRooms = rooms.filter((r) => {
    if (blockFilter === "all") return true;
    return r.block.toLowerCase().includes(blockFilter.toLowerCase());
  });

  const getStudent = (id: string) => students.find((s) => s.id === id);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Hostel & Dormitory Management System</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Building className="h-3 w-3" /> Smart Campus Living
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Room allocation matrix, digital QR outing gate passes, maintenance grievance ticketing, and mess schedules.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setPassDialog(true)} className="gap-2">
            <QrCode className="h-4 w-4" /> Apply Outing Pass
          </Button>
          <Button variant="outline" onClick={() => setComplaintDialog(true)} className="gap-2">
            <Wrench className="h-4 w-4" /> Log Complaint
          </Button>
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
              <span className="text-xs font-medium">Total Rooms</span>
              <DoorClosed className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{rooms.length} Rooms</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Across Blocks A, B, C</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Occupancy Rate</span>
              <Bed className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{occupancyRate}%</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">{totalOccupied} / {totalCapacity} Beds Filled</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Active Outing Passes</span>
              <QrCode className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {passes.filter((p) => p.status === "Approved" || p.status === "Checked Out").length} Active
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Gate pass verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Open Complaints</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
              {complaints.filter((c) => c.status === "Open" || c.status === "In Progress").length} Tickets
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Maintenance in pipeline</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="rooms" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="rooms" className="gap-1.5 text-xs">
              <Bed className="h-3.5 w-3.5" /> Room Matrix
            </TabsTrigger>
            <TabsTrigger value="passes" className="gap-1.5 text-xs">
              <QrCode className="h-3.5 w-3.5" /> Outing Passes ({passes.length})
            </TabsTrigger>
            <TabsTrigger value="complaints" className="gap-1.5 text-xs">
              <Wrench className="h-3.5 w-3.5" /> Complaints ({complaints.length})
            </TabsTrigger>
            <TabsTrigger value="mess" className="gap-1.5 text-xs">
              <Utensils className="h-3.5 w-3.5" /> Mess Menu
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: ROOM MATRIX */}
          <TabsContent value="rooms" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-muted-foreground">Hostel Blocks &amp; Floor Allocation</h3>
              <Select value={blockFilter} onValueChange={setBlockFilter}>
                <SelectTrigger className="w-48 h-8 text-xs"><SelectValue placeholder="Block Filter" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hostel Blocks</SelectItem>
                  <SelectItem value="block a">Block A (Boys)</SelectItem>
                  <SelectItem value="block b">Block B (Boys)</SelectItem>
                  <SelectItem value="block c">Block C (Girls)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="border shadow-xs hover:border-primary/40 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-foreground">{room.roomNumber}</span>
                      <Badge
                        className={
                          room.status === "Available"
                            ? "bg-emerald-600 text-white"
                            : room.status === "Full"
                            ? "bg-muted text-muted-foreground"
                            : "bg-red-500 text-white"
                        }
                      >
                        {room.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{room.block} • Floor {room.floor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2.5 text-xs">
                    <div className="flex justify-between border-b pb-1.5 text-muted-foreground">
                      <span>Room Type:</span>
                      <span className="font-semibold text-foreground">{room.type}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1.5 text-muted-foreground">
                      <span>Occupancy:</span>
                      <span className="font-bold text-primary">{room.occupied} / {room.capacity} Beds</span>
                    </div>
                    <div className="flex justify-between border-b pb-1.5 text-muted-foreground">
                      <span>Monthly Rent:</span>
                      <span className="font-semibold text-foreground">₹{room.monthlyFee.toLocaleString("en-IN")}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground block mb-1">Current Occupants:</span>
                      <div className="flex flex-wrap gap-1">
                        {room.occupants.map((stId) => {
                          const st = getStudent(stId);
                          return (
                            <span key={stId} className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium">
                              {st?.name || "Student"} ({st?.rollNo || stId})
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2: OUTING PASSES */}
          <TabsContent value="passes">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Digital Outing &amp; Night Gate Passes</CardTitle>
                <CardDescription>Real-time Warden approval workflow &amp; departure-return logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Reason &amp; Destination</TableHead>
                        <TableHead>Departure Time</TableHead>
                        <TableHead>Expected Return</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {passes.map((p) => {
                        const st = getStudent(p.studentId);
                        return (
                          <TableRow key={p.id}>
                            <TableCell>
                              <div className="font-medium text-sm">{st?.name || "Student"}</div>
                              <div className="text-[11px] text-muted-foreground">{st?.rollNo} • {st?.phone}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-xs">{p.reason}</div>
                              <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                <ArrowRight className="h-3 w-3" /> {p.destination}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{p.departureTime}</TableCell>
                            <TableCell className="text-xs font-medium">{p.expectedReturn}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  p.status === "Approved"
                                    ? "bg-blue-600 text-white"
                                    : p.status === "Checked Out"
                                    ? "bg-amber-500 text-white"
                                    : p.status === "Returned"
                                    ? "bg-emerald-600 text-white"
                                    : p.status === "Rejected"
                                    ? "bg-red-500 text-white"
                                    : "bg-muted text-foreground"
                                }
                              >
                                {p.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {p.status === "Pending" && (
                                <div className="flex justify-end gap-1">
                                  <Button size="sm" onClick={() => handlePassStatus(p.id, "Approved")} className="h-7 text-xs">
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handlePassStatus(p.id, "Rejected")} className="h-7 text-xs">
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {p.status === "Approved" && (
                                <Button size="sm" variant="outline" onClick={() => handlePassStatus(p.id, "Checked Out")} className="h-7 text-xs">
                                  Gate Check-Out
                                </Button>
                              )}
                              {p.status === "Checked Out" && (
                                <Button size="sm" onClick={() => handlePassStatus(p.id, "Returned")} className="h-7 text-xs">
                                  Mark Returned
                                </Button>
                              )}
                              {p.status === "Returned" && (
                                <span className="text-xs text-emerald-600 font-medium">Completed</span>
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

          {/* TAB 3: COMPLAINTS */}
          <TabsContent value="complaints">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Maintenance Grievance Tickets</CardTitle>
                <CardDescription>Track room maintenance and facilities repairs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket Title</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complaints.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-semibold text-xs">{c.title}</TableCell>
                          <TableCell className="font-mono text-xs">{c.roomNumber}</TableCell>
                          <TableCell><Badge variant="outline" className="text-[10px]">{c.category}</Badge></TableCell>
                          <TableCell className="text-xs text-muted-foreground">{c.description}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{c.createdAt}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                c.status === "Resolved"
                                  ? "bg-emerald-600 text-white"
                                  : c.status === "In Progress"
                                  ? "bg-amber-500 text-white"
                                  : "bg-red-500 text-white"
                              }
                            >
                              {c.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: MESS MENU */}
          <TabsContent value="mess">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { time: "Breakfast (7:30 AM - 9:00 AM)", items: "Idli, Sambar, Coconut Chutney / Poha, Boiled Eggs, Tea & Milk", cal: "480 kcal" },
                { time: "Lunch (12:30 PM - 2:30 PM)", items: "Paneer Butter Masala / Chicken Curry, Dal Tadka, Jeera Rice, Chapati, Salad & Gulab Jamun", cal: "750 kcal" },
                { time: "Dinner (7:30 PM - 9:30 PM)", items: "Veg Biryani / Mixed Veg, Dal Makhani, Roti, Curd Rice & Seasonal Fruit", cal: "620 kcal" },
              ].map((meal, i) => (
                <Card key={i} className="border shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-primary" /> {meal.time}
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-emerald-600">Nutritional Est: {meal.cal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs leading-relaxed text-foreground">{meal.items}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Apply Outing Pass Dialog */}
      <Dialog open={passDialog} onOpenChange={setPassDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for Hostel Outing / Gate Pass</DialogTitle>
            <DialogDescription>Fill out trip details for digital Warden verification</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplyPass} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-semibold">Destination</label>
              <Input
                placeholder="E.g. Home / City Market / Tech Park"
                value={passDest}
                onChange={(e) => setPassDest(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Reason for Outing</label>
              <Input
                placeholder="E.g. Weekend Family Visit / Hackathon"
                value={passReason}
                onChange={(e) => setPassReason(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold">Departure Time</label>
                <Input
                  type="datetime-local"
                  value={passDep}
                  onChange={(e) => setPassDep(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Expected Return</label>
                <Input
                  type="datetime-local"
                  value={passRet}
                  onChange={(e) => setPassRet(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setPassDialog(false)}>Cancel</Button>
              <Button type="submit">Submit Pass</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Log Complaint Dialog */}
      <Dialog open={complaintDialog} onOpenChange={setComplaintDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Log Hostel Maintenance Complaint</DialogTitle>
            <DialogDescription>Submit maintenance or facility issues to the hostel warden</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateComplaint} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold">Room Number</label>
                <Input
                  value={compRoom}
                  onChange={(e) => setCompRoom(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Category</label>
                <Select value={compCat} onValueChange={(v: any) => setCompCat(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WiFi / Internet">WiFi / Internet</SelectItem>
                    <SelectItem value="Electricity">Electricity</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold">Issue Title</label>
              <Input
                placeholder="E.g. Tap leaking in bathroom"
                value={compTitle}
                onChange={(e) => setCompTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Description</label>
              <Textarea
                placeholder="Details of the issue..."
                value={compDesc}
                onChange={(e) => setCompDesc(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setComplaintDialog(false)}>Cancel</Button>
              <Button type="submit">Log Ticket</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
