import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCourses as fetchCourses, createCourse as apiCreateCourse, type Course } from "@/lib/api";
import { DEPARTMENTS } from "@/lib/college-data";
import { BookOpen, Plus, Loader2 } from "lucide-react";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});

function CoursesPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [deptFilter, setDeptFilter] = useState("all");
  const [addDialog, setAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newDept, setNewDept] = useState(DEPARTMENTS[0]);
  const [newCredits, setNewCredits] = useState("3");
  const [newSemester, setNewSemester] = useState("1");
  const [newTeacher, setNewTeacher] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await fetchCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load courses:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const filtered = deptFilter === "all" ? courses : courses.filter((c) => c.department === deptFilter);

  const handleAdd = async () => {
    if (!newName || !newCode || !newDept) return;
    setSaving(true);
    try {
      const course = await apiCreateCourse({
        name: newName,
        code: newCode,
        department: newDept,
        credits: Number(newCredits),
        semester: Number(newSemester),
        teacher: newTeacher,
        description: newDesc,
      });
      setCourses([course as Course, ...courses]);
      setAddDialog(false);
      setNewName(""); setNewCode(""); setNewDept(DEPARTMENTS[0]); setNewTeacher(""); setNewDesc("");
    } catch (e) {
      console.error("Add course failed:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Course & Subject Management</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage courses, subjects, and class assignments</p>
        </div>
        <Button onClick={() => setAddDialog(true)} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Add Course</Button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-full sm:w-56"><SelectValue placeholder="Filter by department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <Card key={course.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 sm:mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{course.name}</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{course.code}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] sm:text-xs shrink-0">{course.credits} Credits</Badge>
                </div>
                <p className="mb-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <p className="text-muted-foreground"><span className="font-medium">Dept:</span> {course.department}</p>
                  <p className="text-muted-foreground"><span className="font-medium">Semester:</span> {course.semester}</p>
                  <p className="text-muted-foreground"><span className="font-medium">Teacher:</span> {course.teacher}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Course Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader><DialogTitle className="text-base sm:text-lg">Add New Course</DialogTitle></DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-foreground">Course Name *</label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Data Structures" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Course Code *</label>
                <Input value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="e.g. CS301" />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Department</label>
                <Select value={newDept} onValueChange={setNewDept}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Credits</label>
                <Input type="number" value={newCredits} onChange={(e) => setNewCredits(e.target.value)} />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Semester</label>
                <Input type="number" value={newSemester} onChange={(e) => setNewSemester(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-foreground">Teacher</label>
                <Input value={newTeacher} onChange={(e) => setNewTeacher(e.target.value)} placeholder="Prof. Name" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-foreground">Description</label>
                <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Course description..." rows={3} />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full" disabled={saving}>
              {saving ? "Adding..." : "Add Course"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
