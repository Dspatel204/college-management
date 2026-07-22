import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, a as BookOpen } from "./DashboardLayout-CFboD7uh.js";
import { b as cn, C as Card, a as CardContent, G as GraduationCap } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { C as COURSES, D as DEPARTMENTS } from "./college-data-C1ddpZzr.js";
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
const Textarea = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
function CoursesPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = reactExports.useState(COURSES);
  const [deptFilter, setDeptFilter] = reactExports.useState("all");
  const [addDialog, setAddDialog] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newCode, setNewCode] = reactExports.useState("");
  const [newDept, setNewDept] = reactExports.useState("");
  const [newCredits, setNewCredits] = reactExports.useState("3");
  const [newSemester, setNewSemester] = reactExports.useState("1");
  const [newTeacher, setNewTeacher] = reactExports.useState("");
  const [newDesc, setNewDesc] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const filtered = deptFilter === "all" ? courses : courses.filter((c) => c.department === deptFilter);
  const handleAdd = () => {
    if (!newName || !newCode || !newDept) return;
    const course = {
      id: `c${Date.now()}`,
      name: newName,
      code: newCode,
      department: newDept,
      credits: Number(newCredits),
      semester: Number(newSemester),
      teacher: newTeacher,
      description: newDesc
    };
    setCourses([...courses, course]);
    setAddDialog(false);
    setNewName("");
    setNewCode("");
    setNewDept("");
    setNewTeacher("");
    setNewDesc("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Course & Subject Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage courses, subjects, and class assignments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setAddDialog(true), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add Course"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: deptFilter, onValueChange: setDeptFilter, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by department" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Departments" }),
        DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: course.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: course.code })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
          course.credits,
          " Credits"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-muted-foreground line-clamp-2", children: course.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Teacher:" }),
          " ",
          course.teacher
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
          course.department,
          " — Semester ",
          course.semester
        ] })
      ] })
    ] }) }, course.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addDialog, onOpenChange: setAddDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Course" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Course Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newName, onChange: (e) => setNewName(e.target.value), placeholder: "Data Structures" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Course Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newCode, onChange: (e) => setNewCode(e.target.value), placeholder: "CS301" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Department" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newDept, onValueChange: setNewDept, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Credits" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newCredits, onChange: (e) => setNewCredits(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Semester" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: newSemester, onChange: (e) => setNewSemester(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Teacher" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newTeacher, onChange: (e) => setNewTeacher(e.target.value), placeholder: "Prof. Name" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: newDesc, onChange: (e) => setNewDesc(e.target.value), placeholder: "Course description" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAdd, className: "w-full", children: "Add Course" })
      ] })
    ] }) })
  ] });
}
export {
  CoursesPage as component
};
