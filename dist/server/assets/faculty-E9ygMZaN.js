import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout } from "./DashboardLayout-CFboD7uh.js";
import { C as Card, a as CardContent, G as GraduationCap, d as CardHeader, e as CardTitle } from "./card-Cb1AW6bU.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Button } from "./button-CZKATw0i.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iSHuvjEU.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DUfHuThk.js";
import { F as FACULTY, d as INITIAL_TIMETABLE, e as DAYS, T as TIME_SLOTS, b as SUBJECTS, D as DEPARTMENTS, f as getFacultyById } from "./college-data-C1ddpZzr.js";
import { S as Search } from "./search-Dw4EZ4s8.js";
import { U as UserPlus, M as Mail } from "./user-plus-Df87-p8g.js";
import { P as Phone, a as Pencil } from "./phone-DLjWbDq3.js";
import { C as Calendar } from "./calendar-C_XGuBvJ.js";
import { C as Clock } from "./clock-0aCrobSL.js";
import { T as Trash2 } from "./trash-2-LT_Uh_mS.js";
import { P as Plus } from "./plus-BP6CXQQf.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./x-Bk9ytnAn.js";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
function FacultyPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [faculty, setFaculty] = reactExports.useState(FACULTY);
  const [timetable, setTimetable] = reactExports.useState(INITIAL_TIMETABLE);
  const [search, setSearch] = reactExports.useState("");
  const [deptFilter, setDeptFilter] = reactExports.useState("All");
  const [dialogMode, setDialogMode] = reactExports.useState(null);
  const [selectedFaculty, setSelectedFaculty] = reactExports.useState(null);
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({});
  const [ttDay, setTtDay] = reactExports.useState(DAYS[0]);
  const [ttTime, setTtTime] = reactExports.useState(TIME_SLOTS[0]);
  const [ttSubject, setTtSubject] = reactExports.useState(SUBJECTS[0]);
  const [ttRoom, setTtRoom] = reactExports.useState("");
  const [ttDept, setTtDept] = reactExports.useState(DEPARTMENTS[0]);
  const [ttSem, setTtSem] = reactExports.useState(4);
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const filtered = faculty.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || f.department === deptFilter;
    return matchSearch && matchDept;
  });
  const openAdd = () => {
    setForm({
      department: DEPARTMENTS[0],
      designation: "Assistant Professor",
      assignedSubjects: [],
      assignedClasses: []
    });
    setDialogMode("add");
  };
  const openEdit = (f) => {
    setForm({
      ...f
    });
    setSelectedFaculty(f);
    setDialogMode("edit");
  };
  const openAssign = (f) => {
    setForm({
      ...f
    });
    setSelectedFaculty(f);
    setDialogMode("assign");
  };
  const handleSave = () => {
    if (!form.name || !form.employeeId || !form.email || !form.phone) return;
    if (dialogMode === "add") {
      const newF = {
        id: `f${Date.now()}`,
        name: form.name,
        employeeId: form.employeeId,
        department: form.department || DEPARTMENTS[0],
        designation: form.designation || "Assistant Professor",
        email: form.email,
        phone: form.phone,
        avatar: form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        assignedSubjects: form.assignedSubjects || [],
        assignedClasses: form.assignedClasses || [],
        qualification: form.qualification || "",
        joinDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      setFaculty([newF, ...faculty]);
    } else if (dialogMode === "edit" && selectedFaculty) {
      setFaculty(faculty.map((f) => f.id === selectedFaculty.id ? {
        ...f,
        name: form.name,
        employeeId: form.employeeId,
        department: form.department || f.department,
        designation: form.designation || f.designation,
        email: form.email,
        phone: form.phone,
        avatar: form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        qualification: form.qualification || f.qualification
      } : f));
    }
    setDialogMode(null);
    setForm({});
  };
  const handleAssignSave = () => {
    if (!selectedFaculty) return;
    setFaculty(faculty.map((f) => f.id === selectedFaculty.id ? {
      ...f,
      assignedSubjects: form.assignedSubjects || [],
      assignedClasses: form.assignedClasses || []
    } : f));
    setDialogMode(null);
  };
  const handleDelete = (id) => {
    setFaculty(faculty.filter((f) => f.id !== id));
    setDeleteConfirm(null);
  };
  const toggleSubject = (subj) => {
    const current = form.assignedSubjects || [];
    setForm({
      ...form,
      assignedSubjects: current.includes(subj) ? current.filter((s) => s !== subj) : [...current, subj]
    });
  };
  const toggleClass = (cls) => {
    const current = form.assignedClasses || [];
    setForm({
      ...form,
      assignedClasses: current.includes(cls) ? current.filter((c) => c !== cls) : [...current, cls]
    });
  };
  const addTimetableEntry = () => {
    if (!selectedFaculty || !ttRoom) return;
    const entry = {
      id: `tt${Date.now()}`,
      day: ttDay,
      time: ttTime,
      subject: ttSubject,
      facultyId: selectedFaculty.id,
      department: ttDept,
      semester: ttSem,
      room: ttRoom
    };
    setTimetable([...timetable, entry]);
    setTtRoom("");
  };
  const deleteTimetableEntry = (id) => {
    setTimetable(timetable.filter((t) => t.id !== id));
  };
  const classOptions = DEPARTMENTS.flatMap((d) => [2, 4, 6].map((s) => `${d.slice(0, 2).toUpperCase()} Sem-${s}`));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "faculty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Faculty Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage faculty, assignments & timetable" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "faculty", children: "Faculty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "timetable", children: "Timetable" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "faculty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search faculty...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9 w-64" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: deptFilter, onChange: (e) => setDeptFilter(e.target.value), className: "rounded-lg border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Departments" }),
            DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, className: "gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
            " Add Faculty"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground", children: f.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: f.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              f.employeeId,
              " • ",
              f.designation
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: f.department }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: f.assignedSubjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs bg-info/10 text-info border-info/20", children: s }, s)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
                f.email
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                f.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3 w-3" }),
                f.qualification
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => openEdit(f), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => openAssign(f), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                setSelectedFaculty(f);
                setDialogMode("timetable");
              }, className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setDeleteConfirm(f.id), className: "h-8 px-2 text-destructive hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] })
        ] }) }) }, f.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timetable", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Weekly Timetable" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[80px]", children: "Time" }),
            DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[120px]", children: d }, d))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: TIME_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-medium text-muted-foreground whitespace-nowrap", children: slot }),
            DAYS.map((day) => {
              const entry = timetable.find((t) => t.day === day && t.time === slot);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "p-1", children: entry ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/10 p-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: entry.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: getFacultyById(entry.facultyId)?.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: entry.room })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/30 p-2 text-xs text-muted-foreground text-center", children: "—" }) }, day);
            })
          ] }, slot)) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogMode === "add" || dialogMode === "edit", onOpenChange: () => setDialogMode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: dialogMode === "add" ? "Add Faculty" : "Edit Faculty" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Full Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name || "", onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Employee ID *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.employeeId || "", onChange: (e) => setForm({
            ...form,
            employeeId: e.target.value
          }) })
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Designation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.designation || "Assistant Professor", onValueChange: (v) => setForm({
            ...form,
            designation: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Professor", children: "Professor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Associate Professor", children: "Associate Professor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Assistant Professor", children: "Assistant Professor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Lecturer", children: "Lecturer" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Qualification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.qualification || "", onChange: (e) => setForm({
            ...form,
            qualification: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email || "", onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone || "", onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, className: "w-full mt-2", children: dialogMode === "add" ? "Add Faculty" : "Save Changes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogMode === "assign", onOpenChange: () => setDialogMode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Assign — ",
        selectedFaculty?.name
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-foreground mb-2", children: "Subjects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: SUBJECTS.map((s) => {
          const active = (form.assignedSubjects || []).includes(s);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleSubject(s), className: `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`, children: s }, s);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-foreground mb-2", children: "Classes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: classOptions.map((c) => {
          const active = (form.assignedClasses || []).includes(c);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleClass(c), className: `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`, children: c }, c);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAssignSave, className: "w-full mt-2", children: "Save Assignments" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogMode === "timetable", onOpenChange: () => setDialogMode(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Timetable — ",
        selectedFaculty?.name
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          timetable.filter((t) => t.facultyId === selectedFaculty?.id).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                t.day,
                " • ",
                t.time
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                t.subject,
                " — Room ",
                t.room
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => deleteTimetableEntry(t.id), className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }, t.id)),
          timetable.filter((t) => t.facultyId === selectedFaculty?.id).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No timetable entries" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-foreground mb-3", children: "Add Entry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: ttDay, onValueChange: setTtDay, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: ttTime, onValueChange: setTtTime, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_SLOTS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: ttSubject, onValueChange: setTtSubject, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: ttRoom, onChange: (e) => setTtRoom(e.target.value), placeholder: "Room No." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addTimetableEntry, className: "w-full mt-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add to Timetable"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteConfirm, onOpenChange: () => setDeleteConfirm(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Faculty?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This will permanently remove this faculty record." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setDeleteConfirm(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", className: "flex-1", onClick: () => deleteConfirm && handleDelete(deleteConfirm), children: "Delete" })
      ] })
    ] }) })
  ] });
}
export {
  FacultyPage as component
};
