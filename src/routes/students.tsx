import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getStudents as fetchStudents,
  createStudent as apiCreateStudent,
  updateStudent as apiUpdateStudent,
  deleteStudent as apiDeleteStudent,
  getStudentById as fetchStudentById,
  getCourses,
  type Student,
  type Course,
} from "@/lib/api";
import { DEPARTMENTS, SUBJECTS } from "@/lib/college-data";
import { Search, Mail, Phone, Plus, Pencil, Trash2, Eye, UserPlus, BookOpen, MapPin, Shield, Loader2 } from "lucide-react";

export const Route = createFileRoute("/students")({
  component: StudentsPage,
});

function StudentsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view" | "enroll" | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Partial<Student>>({});

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load students:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load courses:", e);
    }
  };

  if (!isAuthenticated) return null;

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  const openAdd = () => {
    setForm({ department: DEPARTMENTS[0], semester: 1, status: "active", enrolledCourses: [] });
    setDialogMode("add");
  };

  const openEdit = (s: Student) => {
    setForm({ ...s });
    setSelectedStudent(s);
    setDialogMode("edit");
  };

  const openView = async (s: Student) => {
    setSelectedStudent(s);
    setDialogMode("view");
  };

  const openEnroll = (s: Student) => {
    setSelectedStudent(s);
    setForm({ ...s });
    setDialogMode("enroll");
  };

  const handleSave = async () => {
    if (!form.name || !form.rollNo || !form.email || !form.phone) return;
    setSaving(true);
    try {
      if (dialogMode === "add") {
        const newStudent = await apiCreateStudent({
          name: form.name,
          rollNo: form.rollNo,
          department: form.department || DEPARTMENTS[0],
          semester: form.semester || 1,
          email: form.email,
          phone: form.phone,
          address: form.address || "",
          guardianName: form.guardianName || "",
          guardianPhone: form.guardianPhone || "",
          status: form.status || "active",
          enrolledCourses: form.enrolledCourses || [],
        });
        setStudents([newStudent as Student, ...students]);
      } else if (dialogMode === "edit" && selectedStudent) {
        const updated = await apiUpdateStudent(selectedStudent.id, {
          name: form.name!,
          rollNo: form.rollNo!,
          department: form.department || selectedStudent.department,
          semester: form.semester || selectedStudent.semester,
          email: form.email!,
          phone: form.phone!,
          address: form.address,
          guardianName: form.guardianName,
          guardianPhone: form.guardianPhone,
          status: form.status || selectedStudent.status,
          enrolledCourses: form.enrolledCourses || selectedStudent.enrolledCourses,
        });
        setStudents(students.map(s => s.id === selectedStudent.id ? (updated as Student) : s));
      }
      setDialogMode(null);
      setForm({});
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleEnrollSave = async () => {
    if (!selectedStudent) return;
    setSaving(true);
    try {
      const updated = await apiUpdateStudent(selectedStudent.id, {
        enrolledCourses: form.enrolledCourses || [],
      });
      setStudents(students.map(s => s.id === selectedStudent.id ? (updated as Student) : s));
      setDialogMode(null);
    } catch (e) {
      console.error("Enroll failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDeleteStudent(id);
      setStudents(students.filter(s => s.id !== id));
    } catch (e) {
      console.error("Delete failed:", e);
    }
    setDeleteConfirm(null);
  };

  const toggleCourse = (courseId: string) => {
    const current = form.enrolledCourses || [];
    setForm({
      ...form,
      enrolledCourses: current.includes(courseId) ? current.filter(c => c !== courseId) : [...current, courseId],
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} students found</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-64" />
          </div>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <Button onClick={openAdd} className="gap-2"><UserPlus className="h-4 w-4" /> Add Student</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((student) => (
            <Card key={student.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <Badge variant="outline" className={student.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}>
                        {student.status || "active"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{student.department}</span>
                      <span className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">Sem {student.semester}</span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{student.email}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{student.phone}</div>
                    </div>
                    <div className="mt-3 flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openView(student)} className="h-8 px-2"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(student)} className="h-8 px-2"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => openEnroll(student)} className="h-8 px-2"><BookOpen className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(student.id)} className="h-8 px-2 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Profile Dialog */}
      <Dialog open={dialogMode === "view"} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Student Profile</DialogTitle></DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{selectedStudent.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.rollNo}</p>
                  <Badge variant="outline" className="mt-1 bg-success/10 text-success border-success/20">{selectedStudent.status || "active"}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Department:</span> <span className="font-medium text-foreground">{selectedStudent.department}</span></div>
                <div><span className="text-muted-foreground">Semester:</span> <span className="font-medium text-foreground">{selectedStudent.semester}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{selectedStudent.email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{selectedStudent.phone}</span></div>
                <div><span className="text-muted-foreground">Admission:</span> <span className="font-medium text-foreground">{selectedStudent.admissionDate || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Address:</span> <span className="font-medium text-foreground">{selectedStudent.address || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Guardian:</span> <span className="font-medium text-foreground">{selectedStudent.guardianName || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Guardian Ph:</span> <span className="font-medium text-foreground">{selectedStudent.guardianPhone || "N/A"}</span></div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Enrolled Courses</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedStudent.enrolledCourses || []).map(cId => {
                    const course = courses.find(c => c.id === cId);
                    return course ? <Badge key={cId} variant="secondary">{course.code} - {course.name}</Badge> : null;
                  })}
                  {(!selectedStudent.enrolledCourses || selectedStudent.enrolledCourses.length === 0) && (
                    <p className="text-sm text-muted-foreground">No courses enrolled</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogMode === "add" || dialogMode === "edit"} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{dialogMode === "add" ? "New Student Admission" : "Edit Student"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Roll No *</label>
              <Input value={form.rollNo || ""} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} placeholder="CS2024006" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Department</label>
              <Select value={form.department || DEPARTMENTS[0]} onValueChange={(v) => setForm({ ...form, department: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Semester</label>
              <Select value={String(form.semester || 1)} onValueChange={(v) => setForm({ ...form, semester: Number(v) })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{[1,2,3,4,5,6,7,8].map(n => <SelectItem key={n} value={String(n)}>Semester {n}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email *</label>
              <Input type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="student@college.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone *</label>
              <Input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Guardian Name</label>
              <Input value={form.guardianName || ""} onChange={(e) => setForm({ ...form, guardianName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Guardian Phone</label>
              <Input value={form.guardianPhone || ""} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-foreground">Address</label>
              <Input value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Enter address" />
            </div>
            {dialogMode === "edit" && (
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <Select value={form.status || "active"} onValueChange={(v) => setForm({ ...form, status: v as Student["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <Button onClick={handleSave} className="w-full mt-2" disabled={saving}>
            {saving ? "Saving..." : dialogMode === "add" ? "Register Student" : "Save Changes"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Course Enrollment Dialog */}
      <Dialog open={dialogMode === "enroll"} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Course Enrollment — {selectedStudent?.name}</DialogTitle></DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {courses.filter(c => !selectedStudent || c.department === selectedStudent.department || c.department === "Computer Science").map(course => {
              const enrolled = (form.enrolledCourses || []).includes(course.id);
              return (
                <button key={course.id} onClick={() => toggleCourse(course.id)}
                  className={`w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${enrolled ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}>
                  <div>
                    <p className="text-sm font-medium text-foreground">{course.code} — {course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.credits} credits • {course.teacher}</p>
                  </div>
                  {enrolled && <Badge className="bg-primary text-primary-foreground">Enrolled</Badge>}
                </button>
              );
            })}
          </div>
          <Button onClick={handleEnrollSave} className="w-full" disabled={saving}>
            {saving ? "Saving..." : "Save Enrollment"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Student?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone. The student record will be permanently removed.</p>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" className="flex-1" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
