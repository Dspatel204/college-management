import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatsCard } from "@/components/StatsCard";
import { STUDENTS, getStudentName } from "@/lib/college-data";
import { Bus, Plus, MapPin, User, Phone, Trash2, Pencil } from "lucide-react";

interface BusRoute {
  id: string;
  routeNo: string;
  from: string;
  to: string;
  via: string;
  driverName: string;
  driverPhone: string;
  busNo: string;
  capacity: number;
  assignedStudents: string[];
  departureTime: string;
  arrivalTime: string;
}

const INITIAL_ROUTES: BusRoute[] = [
  { id: "r1", routeNo: "RT-01", from: "Central Station", to: "College Campus", via: "MG Road, Park Street", driverName: "Ramesh Yadav", driverPhone: "9900000001", busNo: "KA-01-1234", capacity: 50, assignedStudents: ["s1", "s2", "s3"], departureTime: "8:00 AM", arrivalTime: "8:45 AM" },
  { id: "r2", routeNo: "RT-02", from: "East Town", to: "College Campus", via: "Ring Road, IT Park", driverName: "Sunil Kumar", driverPhone: "9900000002", busNo: "KA-01-5678", capacity: 45, assignedStudents: ["s4", "s5"], departureTime: "7:45 AM", arrivalTime: "8:40 AM" },
  { id: "r3", routeNo: "RT-03", from: "South Colony", to: "College Campus", via: "Temple Road, Market", driverName: "Manoj Singh", driverPhone: "9900000003", busNo: "KA-01-9012", capacity: 40, assignedStudents: ["s6", "s7", "s8", "s9"], departureTime: "7:30 AM", arrivalTime: "8:30 AM" },
  { id: "r4", routeNo: "RT-04", from: "North Hills", to: "College Campus", via: "Highway, Bridge Point", driverName: "Deepak Sharma", driverPhone: "9900000004", busNo: "KA-01-3456", capacity: 50, assignedStudents: ["s10"], departureTime: "7:15 AM", arrivalTime: "8:35 AM" },
];

export const Route = createFileRoute("/transport")({
  component: TransportPage,
});

function TransportPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<BusRoute[]>(INITIAL_ROUTES);
  const [addDialog, setAddDialog] = useState(false);
  const [editRoute, setEditRoute] = useState<BusRoute | null>(null);
  const [allocateDialog, setAllocateDialog] = useState<BusRoute | null>(null);
  const [form, setForm] = useState({ routeNo: "", from: "", to: "", via: "", driverName: "", driverPhone: "", busNo: "", capacity: 50, departureTime: "", arrivalTime: "" });

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const totalBuses = routes.length;
  const totalCapacity = routes.reduce((s, r) => s + r.capacity, 0);
  const totalAllocated = routes.reduce((s, r) => s + r.assignedStudents.length, 0);

  const handleSave = () => {
    if (!form.routeNo || !form.from || !form.to || !form.driverName) return;
    if (editRoute) {
      setRoutes(routes.map(r => r.id === editRoute.id ? { ...r, ...form } : r));
    } else {
      setRoutes([...routes, { id: `r${Date.now()}`, ...form, assignedStudents: [] }]);
    }
    setAddDialog(false);
    setEditRoute(null);
    setForm({ routeNo: "", from: "", to: "", via: "", driverName: "", driverPhone: "", busNo: "", capacity: 50, departureTime: "", arrivalTime: "" });
  };

  const openEdit = (r: BusRoute) => {
    setForm({ routeNo: r.routeNo, from: r.from, to: r.to, via: r.via, driverName: r.driverName, driverPhone: r.driverPhone, busNo: r.busNo, capacity: r.capacity, departureTime: r.departureTime, arrivalTime: r.arrivalTime });
    setEditRoute(r);
    setAddDialog(true);
  };

  const deleteRoute = (id: string) => setRoutes(routes.filter(r => r.id !== id));

  const toggleStudent = (routeId: string, studentId: string) => {
    setRoutes(routes.map(r => {
      if (r.id !== routeId) return r;
      const has = r.assignedStudents.includes(studentId);
      return { ...r, assignedStudents: has ? r.assignedStudents.filter(s => s !== studentId) : [...r.assignedStudents, studentId] };
    }));
  };

  return (
    <DashboardLayout>
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Transport Management</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Bus routes, drivers & student allocation</p>
        </div>
        <Button onClick={() => { setEditRoute(null); setForm({ routeNo: "", from: "", to: "", via: "", driverName: "", driverPhone: "", busNo: "", capacity: 50, departureTime: "", arrivalTime: "" }); setAddDialog(true); }} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Add Route</Button>
      </div>

      <div className="mb-4 sm:mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        <StatsCard title="Total Buses" value={totalBuses} icon={Bus} subtitle="Active routes" />
        <StatsCard title="Total Capacity" value={totalCapacity} icon={User} colorClass="bg-info" subtitle="Seats available" />
        <StatsCard title="Students Allocated" value={totalAllocated} icon={MapPin} colorClass="bg-success" subtitle={`${totalCapacity - totalAllocated} seats remaining`} />
      </div>

      <div className="space-y-4">
        {routes.map(route => (
          <Card key={route.id} className="border-0 shadow-md">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Badge className="bg-primary text-primary-foreground text-[10px] sm:text-xs">{route.routeNo}</Badge>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{route.from} → {route.to}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 truncate">Via: {route.via}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground"><Bus className="h-3.5 w-3.5 shrink-0" /> Bus: {route.busNo}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><User className="h-3.5 w-3.5 shrink-0" /> Driver: {route.driverName}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5 shrink-0" /> {route.driverPhone}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-3.5 w-3.5 shrink-0" /> {route.departureTime} — {route.arrivalTime}</div>
                  </div>
                  <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Students: {route.assignedStudents.length}/{route.capacity}</span>
                    <div className="h-1.5 sm:h-2 w-24 sm:w-32 rounded-full bg-secondary">
                      <div className="h-1.5 sm:h-2 rounded-full bg-primary" style={{ width: `${(route.assignedStudents.length / route.capacity) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <Button variant="outline" size="sm" onClick={() => setAllocateDialog(route)} className="flex-1 sm:flex-none text-xs">Allocate</Button>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(route)} className="h-8 w-8 sm:h-9 sm:w-9 p-0"><Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteRoute(route.id)} className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-destructive"><Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Route Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader><DialogTitle className="text-base sm:text-lg">{editRoute ? "Edit Route" : "Add New Route"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Route No *</label><Input value={form.routeNo} onChange={e => setForm({ ...form, routeNo: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Bus No</label><Input value={form.busNo} onChange={e => setForm({ ...form, busNo: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">From *</label><Input value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">To *</label><Input value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className="text-xs sm:text-sm font-medium text-foreground">Via</label><Input value={form.via} onChange={e => setForm({ ...form, via: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Driver Name *</label><Input value={form.driverName} onChange={e => setForm({ ...form, driverName: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Driver Phone</label><Input value={form.driverPhone} onChange={e => setForm({ ...form, driverPhone: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Departure</label><Input value={form.departureTime} onChange={e => setForm({ ...form, departureTime: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Arrival</label><Input value={form.arrivalTime} onChange={e => setForm({ ...form, arrivalTime: e.target.value })} /></div>
          </div>
          <Button onClick={handleSave} className="w-full mt-3 sm:mt-4">{editRoute ? "Save Changes" : "Add Route"}</Button>
        </DialogContent>
      </Dialog>

      {/* Allocate Students */}
      <Dialog open={!!allocateDialog} onOpenChange={() => setAllocateDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Allocate Students — {allocateDialog?.routeNo}</DialogTitle></DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {STUDENTS.map(student => {
              const allocated = allocateDialog?.assignedStudents.includes(student.id) ?? false;
              return (
                <button key={student.id} onClick={() => allocateDialog && toggleStudent(allocateDialog.id, student.id)}
                  className={`w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${allocated ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}>
                  <div>
                    <p className="text-sm font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.rollNo} • {student.department}</p>
                  </div>
                  {allocated && <Badge className="bg-primary text-primary-foreground">Allocated</Badge>}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
