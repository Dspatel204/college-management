import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, a as BookOpen } from "./DashboardLayout-CFboD7uh.js";
import { C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Button } from "./button-CZKATw0i.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { S as STUDENTS, D as DEPARTMENTS, C as COURSES } from "./college-data-C1ddpZzr.js";
import { S as Search } from "./search-Dw4EZ4s8.js";
import { U as UserPlus, M as Mail } from "./user-plus-Df87-p8g.js";
import { P as Phone, a as Pencil } from "./phone-DLjWbDq3.js";
import { T as Trash2 } from "./trash-2-LT_Uh_mS.js";
import { E as Eye } from "./eye-DjzbmpmP.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./x-Bk9ytnAn.js";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
function StudentsPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = reactExports.useState(STUDENTS);
  const [search, setSearch] = reactExports.useState("");
  const [deptFilter, setDeptFilter] = reactExports.useState("All");
  const [dialogMode, setDialogMode] = reactExports.useState(null);
  const [selectedStudent, setSelectedStudent] = reactExports.useState(null);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    return matchSearch && matchDept;
  });
  const openAdd = () => {
    setForm({
      department: DEPARTMENTS[0],
      semester: 1,
      status: "active",
      enrolledCourses: []
    });
    setDialogMode("add");
  };
  const openEdit = (s) => {
    setForm({
      ...s
    });
    setSelectedStudent(s);
    setDialogMode("edit");
  };
  const openView = (s) => {
    setSelectedStudent(s);
    setDialogMode("view");
  };
  const openEnroll = (s) => {
    setSelectedStudent(s);
    setForm({
      ...s
    });
    setDialogMode("enroll");
  };
  const handleSave = () => {
    if (!form.name || !form.rollNo || !form.email || !form.phone) return;
    if (dialogMode === "add") {
      const newStudent = {
        id: `s${Date.now()}`,
        name: form.name,
        rollNo: form.rollNo,
        department: form.department || DEPARTMENTS[0],
        semester: form.semester || 1,
        email: form.email,
        phone: form.phone,
        avatar: form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        admissionDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        address: form.address || "",
        guardianName: form.guardianName || "",
        guardianPhone: form.guardianPhone || "",
        status: "active",
        enrolledCourses: []
      };
      setStudents([newStudent, ...students]);
    } else if (dialogMode === "edit" && selectedStudent) {
      setStudents(students.map((s) => s.id === selectedStudent.id ? {
        ...s,
        name: form.name,
        rollNo: form.rollNo,
        department: form.department || s.department,
        semester: form.semester || s.semester,
        email: form.email,
        phone: form.phone,
        avatar: form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        address: form.address,
        guardianName: form.guardianName,
        guardianPhone: form.guardianPhone,
        status: form.status || s.status
      } : s));
    }
    setDialogMode(null);
    setForm({});
  };
  const handleEnrollSave = () => {
    if (!selectedStudent) return;
    setStudents(students.map((s) => s.id === selectedStudent.id ? {
      ...s,
      enrolledCourses: form.enrolledCourses
    } : s));
    setDialogMode(null);
  };
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };
  const toggleCourse = (courseId) => {
    const current = form.enrolledCourses || [];
    setForm({
      ...form,
      enrolledCourses: current.includes(courseId) ? current.filter((c) => c !== courseId) : [...current, courseId]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " students found"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search students...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9 w-64" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: deptFilter, onChange: (e) => setDeptFilter(e.target.value), className: "rounded-lg border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Departments" }),
          DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
          " Add Student"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((student) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground", children: student.avatar }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: student.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: student.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground", children: student.status || "active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: student.rollNo }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground", children: student.department }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent-foreground", children: [
            "Sem ",
            student.semester
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
            student.email
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
            student.phone
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => openView(student), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(View, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => openEdit(student), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => openEnroll(student), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setDeleteConfirm(student.id), className: "h-8 px-2 text-destructive hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] })
    ] }) }) }, student.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogMode === "view", onOpenChange: () => setDialogMode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Student Profile" }) }),
      selectedStudent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground", children: selectedStudent.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground", children: selectedStudent.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: selectedStudent.rollNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-1 bg-success/10 text-success border-success/20", children: selectedStudent.status || "active" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Department:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.department })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Semester:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.semester })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Email:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Phone:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Admission:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.admissionDate || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Address:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.address || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Guardian:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.guardianName || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Guardian Ph:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: selectedStudent.guardianPhone || "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-foreground mb-2", children: "Enrolled Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            (selectedStudent.enrolledCourses || []).map((cId) => {
              const course = COURSES.find((c) => c.id === cId);
              return course ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                course.code,
                " - ",
                course.name
              ] }, cId) : null;
            }),
            (!selectedStudent.enrolledCourses || selectedStudent.enrolledCourses.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No courses enrolled" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogMode === "add" || dialogMode === "edit", onOpenChange: () => setDialogMode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: dialogMode === "add" ? "New Student Admission" : "Edit Student" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Full Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name || "", onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), placeholder: "Enter full name" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Roll No *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.rollNo || "", onChange: (e) => setForm({
            ...form,
            rollNo: e.target.value
          }), placeholder: "CS2024006" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Department" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.department || DEPARTMENTS[0], onValueChange: (v) => setForm({
            ...form,
            department: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Semester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(form.semester || 1), onValueChange: (v) => setForm({
            ...form,
            semester: Number(v)
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(n), children: [
              "Semester ",
              n
            ] }, n)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email || "", onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), placeholder: "student@college.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone || "", onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }), placeholder: "9876543210" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Guardian Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.guardianName || "", onChange: (e) => setForm({
            ...form,
            guardianName: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Guardian Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.guardianPhone || "", onChange: (e) => setForm({
            ...form,
            guardianPhone: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.address || "", onChange: (e) => setForm({
            ...form,
            address: e.target.value
          }), placeholder: "Enter address" })
        ] }),
        dialogMode === "edit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status || "active", onValueChange: (v) => setForm({
            ...form,
            status: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "graduated", children: "Graduated" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, className: "w-full mt-2", children: dialogMode === "add" ? "Register Student" : "Save Changes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogMode === "enroll", onOpenChange: () => setDialogMode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Course Enrollment — ",
        selectedStudent?.name
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto", children: COURSES.filter((c) => !selectedStudent || c.department === selectedStudent.department || c.department === "Computer Science").map((course) => {
        const enrolled = (form.enrolledCourses || []).includes(course.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleCourse(course.id), className: `w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${enrolled ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
              course.code,
              " — ",
              course.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              course.credits,
              " credits • ",
              course.teacher
            ] })
          ] }),
          enrolled && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground", children: "Enrolled" })
        ] }, course.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleEnrollSave, className: "w-full", children: "Save Enrollment" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteConfirm, onOpenChange: () => setDeleteConfirm(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Student?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This action cannot be undone. The student record will be permanently removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setDeleteConfirm(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", className: "flex-1", onClick: () => deleteConfirm && handleDelete(deleteConfirm), children: "Delete" })
      ] })
    ] }) })
  ] });
}
function View(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { ...props });
}
export {
  StudentsPage as component
};
