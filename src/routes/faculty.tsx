import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getFaculty as fetchFaculty,
  createFaculty as apiCreateFaculty,
  updateFacultyById as apiUpdateFaculty,
  deleteFacultyById as apiDeleteFaculty,
  getTimetable as fetchTimetable,
  createTimetableEntry as apiCreateTimetable,
  deleteTimetableEntry as apiDeleteTimetable,
  getStudents as fetchStudents,
  type Faculty,
  type TimetableEntry,
  type Student,
} from "@/lib/api";
import { DEPARTMENTS, SUBJECTS, DAYS, TIME_SLOTS, getStudentById } from "@/lib/college-data";
import { Search, Plus, Pencil, Trash2, Mail, Phone, GraduationCap, Calendar, Clock, UserPlus, Loader2 } from "lucide-react";

export const Route = createFileRoute("/faculty")({
  component: FacultyPage,
});

function FacultyPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "assign" | "timetable" | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Faculty>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [ttDay, setTtDay] = useState(DAYS[0]);
  const [ttTime, setTtTime] = useState(TIME_SLOTS[0]);
  const [ttSubject, setTtSubject] = useState(SUBJECTS[0]);
  const [ttRoom, setTtRoom] = useState("");
  const [ttDept, setTtDept] = useState(DEPARTMENTS[0]);
  const [ttSem, setTtSem] = useState(4);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadFaculty();
    loadTimetable();
    loadStudents();
  }, []);

  const loadFaculty = async () => {
    setLoading(true);
    try {
      const data = await fetchFaculty();
      setFaculty(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load faculty:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadTimetable = async () => {
    try {
      const data = await fetchTimetable();
      setTimetable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load timetable:", e);
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

  const filtered = faculty.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || f.department === deptFilter;
    return matchSearch && matchDept;
  });

  const openAdd = () => {
    setForm({ department: DEPARTMENTS[0], designation: "Assistant Professor", assignedSubjects: [], assignedClasses: [] });
    setDialogMode("add");
  };

  const openEdit = (f: Faculty) => {
    setForm({ ...f });
    setSelectedFaculty(f);
    setDialogMode("edit");
  };

  const openAssign = (f: Faculty) => {
    setForm({ ...f });
    setSelectedFaculty(f);
    setDialogMode("assign");
  };

  const handleSave = async () => {
    if (!form.name || !form.employeeId || !form.email || !form.phone) return;
    setSaving(true);
    try {
      if (dialogMode === "add") {
        const newF = await apiCreateFaculty({
          name: form.name,
          employeeId: form.employeeId,
          department: form.department || DEPARTMENTS[0],
          designation: form.designation || "Assistant Professor",
          email: form.email,
          phone: form.phone,
          assignedSubjects: form.assignedSubjects || [],
          assignedClasses: form.assignedClasses || [],
          qualification: form.qualification || "",
        });
        setFaculty([newF as Faculty, ...faculty]);
      } else if (dialogMode === "edit" && selectedFaculty) {
        const updated = await apiUpdateFaculty(selectedFaculty.id, {
          name: form.name!,
          employeeId: form.employeeId!,
          department: form.department || selectedFaculty.department,
          designation: form.designation || selectedFaculty.designation,
          email: form.email!,
          phone: form.phone!,
          assignedSubjects: form.assignedSubjects || selectedFaculty.assignedSubjects,
          assignedClasses: form.assignedClasses || selectedFaculty.assignedClasses,
          qualification: form.qualification || selectedFaculty.qualification,
        });
        setFaculty(faculty.map((f) => (f.id === selectedFaculty.id ? (updated as Faculty) : f)));
      }
      setDialogMode(null);
      setForm({});
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleAssignSave = async () => {
    if (!selectedFaculty) return;
    setSaving(true);
    try {
      const updated = await apiUpdateFaculty(selectedFaculty.id, {
        assignedSubjects: form.assignedSubjects || [],
        assignedClasses: form.assignedClasses || [],
      });
      setFaculty(faculty.map((f) => (f.id === selectedFaculty.id ? (updated as Faculty) : f)));
      setDialogMode(null);
    } catch (e) {
      console.error("Assign failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDeleteFaculty(id);
      setFaculty(faculty.filter((f) => f.id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    }
    setDeleteConfirm(null);
  };

  const toggleSubject = (subj: string) => {
    const current = form.assignedSubjects || [];
    setForm({ ...form, assignedSubjects: current.includes(subj) ? current.filter((s) => s !== subj) : [...current, subj] });
  };

  const toggleClass = (cls: string) => {
    const current = form.assignedClasses || [];
    setForm({ ...form, assignedClasses: current.includes(cls) ? current.filter((c) => c !== cls) : [...current, cls] });
  };

  const addTimetableEntry = async () => {
    if (!selectedFaculty || !ttRoom) return;
    try {
      const entry = await apiCreateTimetable({
        day: ttDay, time: ttTime, subject: ttSubject,
        facultyId: selectedFaculty.id, department: ttDept, semester: ttSem, room: ttRoom,
      });
      setTimetable([...timetable, entry as TimetableEntry]);
      setTtRoom("");
    } catch (e) {
      console.error("Add timetable failed:", e);
    }
  };

  const deleteTimetableEntry = async (id: string) => {
    try {
      await apiDeleteTimetable(id);
      setTimetable(timetable.filter((t) => t.id !== id));
    } catch (e) {
      console.error("Delete timetable failed:", e);
    }
  };

  const classOptions = DEPARTMENTS.flatMap((d) => [2, 4, 6].map((s) => `${d.slice(0, 2).toUpperCase()} Sem-${s}`));

  return (
    <DashboardLayout>
      <Tabs defaultValue="faculty">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Faculty Management</h1>
            <p className="text-sm text-muted-foreground">Manage faculty, assignments & timetable</p>
          </div>
          <TabsList>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="faculty">
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search faculty..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-64" />
            </div>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <Button onClick={openAdd} className="gap-2 ml-auto"><UserPlus className="h-4 w-4" /> Add Faculty</Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((f) => (
                <Card key={f.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{f.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{f.name}</h3>
                        <p className="text-sm text-muted-foreground">{f.employeeId} • {f.designation}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge variant="secondary">{f.department}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {f.assignedSubjects.map((s) => <Badge key={s} variant="outline" className="text-xs bg-info/10 text-info border-info/20">{s}</Badge>)}
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{f.email}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{f.phone}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground"><GraduationCap className="h-3 w-3" />{f.qualification}</div>
                        </div>
                        <div className="mt-3 flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(f)} className="h-8 px-2"><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => openAssign(f)} className="h-8 px-2"><Calendar className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedFaculty(f); setDialogMode("timetable"); }} className="h-8 px-2"><Clock className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(f.id)} className="h-8 px-2 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="timetable">
          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle>Weekly Timetable</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[80px]">Time</TableHead>
                    {DAYS.map((d) => <TableHead key={d} className="min-w-[120px]">{d}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TIME_SLOTS.map((slot) => (
                    <TableRow key={slot}>
                      <TableCell className="text-xs font-medium text-muted-foreground whitespace-nowrap">{slot}</TableCell>
                      {DAYS.map((day) => {
                        const entry = timetable.find((t) => t.day === day && t.time === slot);
                        return (
                          <TableCell key={day} className="p-1">
                            {entry ? (
                              <div className="rounded-lg bg-primary/10 p-2 text-xs">
                                <p className="font-medium text-foreground">{entry.subject}</p>
                                <p className="text-muted-foreground">{getStudentById(entry.facultyId)?.name}</p>
                                <p className="text-muted-foreground">{entry.room}</p>
                              </div>
                            ) : (
                              <div className="rounded-lg bg-muted/30 p-2 text-xs text-muted-foreground text-center">—</div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Faculty Dialog */}
      <Dialog open={dialogMode === "add" || dialogMode === "edit"} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{dialogMode === "add" ? "Add Faculty" : "Edit Faculty"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="text-sm font-medium text-foreground">Full Name *</label><Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-foreground">Employee ID *</label><Input value={form.employeeId || ""} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></div>
            <div>
              <label className="text-sm font-medium text-foreground">Department</label>
              <Select value={form.department || DEPARTMENTS[0]} onValueChange={(v) => setForm({ ...form, department: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Designation</label>
              <Select value={form.designation || "Assistant Professor"} onValueChange={(v) => setForm({ ...form, designation: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label className="text-sm font-medium text-foreground">Qualification</label><Input value={form.qualification || ""} onChange={(e) => setForm({ ...form, qualification: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-foreground">Email *</label><Input type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="text-sm font-medium text-foreground">Phone *</label><Input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <Button onClick={handleSave} className="w-full mt-2" disabled={saving}>
            {saving ? "Saving..." : dialogMode === "add" ? "Add Faculty" : "Save Changes"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Assign Subjects & Classes */}
      <Dialog open={dialogMode === "assign"} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Assign — {selectedFaculty?.name}</DialogTitle></DialogHeader>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Subjects</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {SUBJECTS.map((s) => {
                const active = (form.assignedSubjects || []).includes(s);
                return (
                  <button key={s} onClick={() => toggleSubject(s)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                    {s}
                  </button>
                );
              })}
            </div>
            <h4 className="text-sm font-medium text-foreground mb-2">Classes</h4>
            <div className="flex flex-wrap gap-2">
              {classOptions.map((c) => {
                const active = (form.assignedClasses || []).includes(c);
                return (
                  <button key={c} onClick={() => toggleClass(c)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          <Button onClick={handleAssignSave} className="w-full mt-2" disabled={saving}>
            {saving ? "Saving..." : "Save Assignments"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Manage Timetable for Faculty */}
      <Dialog open={dialogMode === "timetable"} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Timetable — {selectedFaculty?.name}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              {timetable.filter((t) => t.facultyId === selectedFaculty?.id).map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.day} • {t.time}</p>
                    <p className="text-xs text-muted-foreground">{t.subject} — Room {t.room}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteTimetableEntry(t.id)} className="text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              ))}
              {timetable.filter((t) => t.facultyId === selectedFaculty?.id).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No timetable entries</p>
              )}
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Add Entry</h4>
              <div className="grid grid-cols-2 gap-3">
                <Select value={ttDay} onValueChange={setTtDay}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{DAYS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
                <Select value={ttTime} onValueChange={setTtTime}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TIME_SLOTS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                <Select value={ttSubject} onValueChange={setTtSubject}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                <Input value={ttRoom} onChange={(e) => setTtRoom(e.target.value)} placeholder="Room No." />
              </div>
              <Button onClick={addTimetableEntry} className="w-full mt-3 gap-2"><Plus className="h-4 w-4" /> Add to Timetable</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Faculty?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This will permanently remove this faculty record.</p>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" className="flex-1" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
