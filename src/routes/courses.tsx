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
import { COURSES, DEPARTMENTS, type Course } from "@/lib/college-data";
import { BookOpen, Users, Clock, Plus, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});

function CoursesPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [deptFilter, setDeptFilter] = useState("all");
  const [addDialog, setAddDialog] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newDept, setNewDept] = useState("");
  const [newCredits, setNewCredits] = useState("3");
  const [newSemester, setNewSemester] = useState("1");
  const [newTeacher, setNewTeacher] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const filtered = deptFilter === "all" ? courses : courses.filter((c) => c.department === deptFilter);

  const handleAdd = () => {
    if (!newName || !newCode || !newDept) return;
    const course: Course = {
      id: `c${Date.now()}`,
      name: newName,
      code: newCode,
      department: newDept,
      credits: Number(newCredits),
      semester: Number(newSemester),
      teacher: newTeacher,
      description: newDesc,
    };
    setCourses([...courses, course]);
    setAddDialog(false);
    setNewName(""); setNewCode(""); setNewDept(""); setNewTeacher(""); setNewDesc("");
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course & Subject Management</h1>
          <p className="text-sm text-muted-foreground">Manage courses, subjects, and class assignments</p>
        </div>
        <Button onClick={() => setAddDialog(true)} className="gap-2"><Plus className="h-4 w-4" /> Add Course</Button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Filter by department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <Card key={course.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
                    <BookOpen className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{course.name}</h3>
                    <p className="text-xs text-muted-foreground">{course.code}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">{course.credits} Credits</Badge>
              </div>
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Teacher:</span> {course.teacher}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {course.department} — Semester {course.semester}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Course</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Course Name</label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Data Structures" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Course Code</label>
                <Input value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="CS301" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Department</label>
                <Select value={newDept} onValueChange={setNewDept}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Credits</label>
                <Input type="number" value={newCredits} onChange={(e) => setNewCredits(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Semester</label>
                <Input type="number" value={newSemester} onChange={(e) => setNewSemester(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Teacher</label>
              <Input value={newTeacher} onChange={(e) => setNewTeacher(e.target.value)} placeholder="Prof. Name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Course description" />
            </div>
            <Button onClick={handleAdd} className="w-full">Add Course</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
