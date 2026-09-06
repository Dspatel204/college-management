import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DEPARTMENTS } from "@/lib/college-data";
import { getCourses, type Course } from "@/lib/api";
import { BookOpen, BookOpenCheck, CalendarClock, Check, ClipboardList, Filter, Plus, Target, Trash2 } from "lucide-react";

export const Route = createFileRoute("/academic-planner")({ component: AcademicPlannerPage });

type PlannerTask = {
  id: string;
  title: string;
  course: string;
  department: string;
  semester: number;
  type: "Assignment" | "Practical" | "Reading" | "Exam" | "Project";
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const seedTasks: PlannerTask[] = [
  { id: "task-1", title: "Submit SQL normalisation worksheet", course: "Database Management Systems", department: "Computer Science", semester: 4, type: "Assignment", dueDate: "2026-09-10", priority: "High", completed: false },
  { id: "task-2", title: "Thermodynamics lab observation record", course: "Thermodynamics", department: "Mechanical", semester: 4, type: "Practical", dueDate: "2026-09-12", priority: "Medium", completed: false },
  { id: "task-3", title: "Revise Fourier transform numericals", course: "Signal Processing", department: "Electronics", semester: 4, type: "Reading", dueDate: "2026-09-14", priority: "Low", completed: true },
  { id: "task-4", title: "Internal assessment: Structural Analysis", course: "Structural Analysis", department: "Civil", semester: 6, type: "Exam", dueDate: "2026-09-18", priority: "High", completed: false },
  { id: "task-5", title: "Power systems mini project proposal", course: "Power Systems", department: "Electrical", semester: 6, type: "Project", dueDate: "2026-09-20", priority: "Medium", completed: false },
];

const storageKey = "collegehub-academic-planner";
const registrationKey = "collegehub-course-registration";
const emptyTask = { title: "", course: "", department: DEPARTMENTS[0], semester: "1", type: "Assignment" as PlannerTask["type"], dueDate: "", priority: "Medium" as PlannerTask["priority"] };

function AcademicPlannerPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState(emptyTask);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [courseDepartment, setCourseDepartment] = useState("all");
  const [courseSemester, setCourseSemester] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setTasks(saved ? JSON.parse(saved) : seedTasks);
    getCourses().then(setCourses).catch((error) => console.error("Failed to load courses:", error));
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    const saved = localStorage.getItem(`${registrationKey}-${user.email}`);
    setSelectedCourseIds(saved ? JSON.parse(saved) : []);
  }, [user?.email]);

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (user?.email) localStorage.setItem(`${registrationKey}-${user.email}`, JSON.stringify(selectedCourseIds));
  }, [selectedCourseIds, user?.email]);

  const filteredTasks = useMemo(() => {
    const result = filter === "all" ? tasks : tasks.filter((task) => task.department === filter);
    return [...result].sort((a, b) => Number(a.completed) - Number(b.completed) || a.dueDate.localeCompare(b.dueDate));
  }, [filter, tasks]);

  const pending = tasks.filter((task) => !task.completed).length;
  const dueSoon = tasks.filter((task) => !task.completed && task.dueDate && (new Date(task.dueDate).getTime() - Date.now()) < 7 * 86400000).length;
  const canManage = user?.role === "admin" || user?.role === "teacher";
  const registrationCourses = courses.filter((course) =>
    (courseDepartment === "all" || course.department === courseDepartment) &&
    (courseSemester === "all" || String(course.semester) === courseSemester)
  );
  const selectedCourses = courses.filter((course) => selectedCourseIds.includes(course.id));
  const registeredCredits = selectedCourses.reduce((total, course) => total + course.credits, 0);

  const toggleTask = (id: string) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  const deleteTask = (id: string) => setTasks((current) => current.filter((task) => task.id !== id));
  const addTask = () => {
    if (!newTask.title.trim() || !newTask.course.trim() || !newTask.dueDate) return;
    setTasks((current) => [...current, { ...newTask, id: `task-${Date.now()}`, semester: Number(newTask.semester), completed: false }]);
    setNewTask(emptyTask);
    setShowForm(false);
  };

  const toggleCourse = (courseId: string) => {
    setSelectedCourseIds((current) => current.includes(courseId) ? current.filter((id) => id !== courseId) : [...current, courseId]);
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Academic operations</p><h1 className="text-2xl font-bold text-foreground">Academic Planner</h1><p className="mt-1 text-sm text-muted-foreground">One place for assignments, practicals, projects and exams across every department.</p></div>
        {canManage && <Button onClick={() => setShowForm((open) => !open)} className="gap-2"><Plus className="h-4 w-4" /> Add academic task</Button>}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[{ label: "Open tasks", value: pending, icon: ClipboardList, tone: "text-primary" }, { label: "Due this week", value: dueSoon, icon: CalendarClock, tone: "text-warning" }, { label: "Completed", value: tasks.length - pending, icon: Target, tone: "text-success" }].map(({ label, value, icon: Icon, tone }) => <Card key={label} className="border-0 shadow-sm"><CardContent className="flex items-center gap-3 p-4"><Icon className={`h-5 w-5 ${tone}`} /><div><p className="text-2xl font-bold text-foreground">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div></CardContent></Card>)}
      </div>

      <Card className="mb-6 border-primary/20 shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg"><BookOpen className="h-5 w-5 text-primary" /> My course registration</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">Choose subjects for any department and keep your semester credit load in one place.</p>
          </div>
          <div className="rounded-lg bg-primary/10 px-3 py-2 text-right">
            <p className="text-xl font-bold text-primary">{registeredCredits}</p>
            <p className="text-[11px] text-muted-foreground">registered credits</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-2 sm:grid-cols-2">
            <select aria-label="Filter registration by department" className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={courseDepartment} onChange={(event) => setCourseDepartment(event.target.value)}>
              <option value="all">All departments</option>
              {DEPARTMENTS.map((department) => <option key={department}>{department}</option>)}
            </select>
            <select aria-label="Filter registration by semester" className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={courseSemester} onChange={(event) => setCourseSemester(event.target.value)}>
              <option value="all">All semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => <option key={semester} value={semester}>Semester {semester}</option>)}
            </select>
          </div>
          {registrationCourses.length === 0 ? <p className="py-6 text-center text-sm text-muted-foreground">No courses match these filters.</p> : <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{registrationCourses.map((course) => {
            const selected = selectedCourseIds.includes(course.id);
            return <button key={course.id} type="button" onClick={() => toggleCourse(course.id)} className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{selected && <Check className="h-3.5 w-3.5" />}</span>
              <span className="min-w-0"><span className="block truncate text-sm font-medium text-foreground">{course.name}</span><span className="mt-1 block text-xs text-muted-foreground">{course.code} · {course.credits} credits · Sem {course.semester}</span></span>
            </button>;
          })}</div>}
          <p className={`mt-4 text-xs ${registeredCredits > 26 ? "text-destructive" : registeredCredits > 0 && registeredCredits < 16 ? "text-warning" : "text-muted-foreground"}`}>
            {registeredCredits > 26 ? "Credit load is high. Confirm with your academic office before submitting." : registeredCredits > 0 && registeredCredits < 16 ? "This is a light credit load. Check your programme handbook for the required minimum." : "Registration is saved on this device for your account."}
          </p>
        </CardContent>
      </Card>

      {showForm && canManage && <Card className="mb-6 border-primary/30 shadow-sm"><CardHeader><CardTitle className="text-base">Create task for a class</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input className="lg:col-span-2" placeholder="Task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} /><Input placeholder="Course / subject" value={newTask.course} onChange={(e) => setNewTask({ ...newTask, course: e.target.value })} /><Input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={newTask.department} onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}>{DEPARTMENTS.map((department) => <option key={department}>{department}</option>)}</select><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={newTask.semester} onChange={(e) => setNewTask({ ...newTask, semester: e.target.value })}>{[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => <option key={semester} value={semester}>Semester {semester}</option>)}</select><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={newTask.type} onChange={(e) => setNewTask({ ...newTask, type: e.target.value as PlannerTask["type"] })}>{["Assignment", "Practical", "Reading", "Exam", "Project"].map((type) => <option key={type}>{type}</option>)}</select><select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as PlannerTask["priority"] })}>{["High", "Medium", "Low"].map((priority) => <option key={priority}>{priority}</option>)}</select>
        <Button className="sm:col-span-2 lg:col-span-4" onClick={addTask}>Save task</Button>
      </CardContent></Card>}

      <Card className="border-0 shadow-md"><CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="flex items-center gap-2 text-lg"><BookOpenCheck className="h-5 w-5 text-primary" /> Course workload</CardTitle><p className="mt-1 text-xs text-muted-foreground">Filtered tasks stay saved on this device.</p></div><div className="flex items-center gap-2"><Filter className="h-4 w-4 text-muted-foreground" /><select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All departments</option>{DEPARTMENTS.map((department) => <option key={department}>{department}</option>)}</select></div></CardHeader><CardContent>
        {filteredTasks.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">No academic tasks match this filter.</p> : <div className="space-y-3">{filteredTasks.map((task) => <div key={task.id} className={`flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center ${task.completed ? "border-success/20 bg-success/5" : "border-border"}`}><button title={task.completed ? "Mark as open" : "Mark as completed"} onClick={() => toggleTask(task.id)} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${task.completed ? "border-success bg-success text-success-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}><Check className="h-4 w-4" /></button><div className="min-w-0 flex-1"><p className={`font-medium ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{task.course} · {task.department} · Sem {task.semester}</p></div><div className="flex items-center gap-2 text-xs"><Badge variant="outline">{task.type}</Badge><Badge className={task.priority === "High" ? "bg-destructive" : task.priority === "Medium" ? "bg-warning text-warning-foreground" : "bg-secondary text-secondary-foreground"}>{task.priority}</Badge><span className="whitespace-nowrap text-muted-foreground">Due {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>{canManage && <Button variant="ghost" size="icon" title="Delete task" onClick={() => deleteTask(task.id)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>}</div></div>)}</div>}
      </CardContent></Card>
    </DashboardLayout>
  );
}