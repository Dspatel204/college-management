import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, F as FileText } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, a as CardContent, d as CardHeader, e as CardTitle } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iSHuvjEU.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DUfHuThk.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { E as EXAM_SCHEDULES, h as EXAM_RESULTS, c as getStudentById, g as getStudentName, S as STUDENTS, i as calculateGrade, b as SUBJECTS } from "./college-data-C1ddpZzr.js";
import { C as Calendar } from "./calendar-C_XGuBvJ.js";
import { P as Plus } from "./plus-BP6CXQQf.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
import "./x-Bk9ytnAn.js";
const __iconNode = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode);
function ExamsPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [schedules, setSchedules] = reactExports.useState(EXAM_SCHEDULES);
  const [results, setResults] = reactExports.useState(EXAM_RESULTS);
  const [addScheduleDialog, setAddScheduleDialog] = reactExports.useState(false);
  const [marksDialog, setMarksDialog] = reactExports.useState(false);
  const [reportCardStudent, setReportCardStudent] = reactExports.useState(null);
  const [newSubject, setNewSubject] = reactExports.useState("");
  const [newDate, setNewDate] = reactExports.useState("");
  const [newTime, setNewTime] = reactExports.useState("");
  const [newRoom, setNewRoom] = reactExports.useState("");
  const [newType, setNewType] = reactExports.useState("midterm");
  const [marksStudentId, setMarksStudentId] = reactExports.useState("");
  const [marksSubject, setMarksSubject] = reactExports.useState("");
  const [marksObtained, setMarksObtained] = reactExports.useState("");
  const [marksTotalMarks, setMarksTotalMarks] = reactExports.useState("100");
  const [marksExamType, setMarksExamType] = reactExports.useState("midterm");
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const handleAddSchedule = () => {
    if (!newSubject || !newDate || !newTime || !newRoom) return;
    const schedule = {
      id: `e${Date.now()}`,
      subject: newSubject,
      date: newDate,
      time: newTime,
      room: newRoom,
      department: "Computer Science",
      semester: 4,
      type: newType
    };
    setSchedules([...schedules, schedule]);
    setAddScheduleDialog(false);
    setNewSubject("");
    setNewDate("");
    setNewTime("");
    setNewRoom("");
  };
  const handleAddMarks = () => {
    if (!marksStudentId || !marksSubject || !marksObtained) return;
    const obtained = Number(marksObtained);
    const total = Number(marksTotalMarks);
    const result = {
      id: `r${Date.now()}`,
      studentId: marksStudentId,
      subject: marksSubject,
      examType: marksExamType,
      marksObtained: obtained,
      totalMarks: total,
      grade: calculateGrade(obtained / total * 100)
    };
    setResults([...results, result]);
    setMarksDialog(false);
    setMarksObtained("");
    setMarksStudentId("");
    setMarksSubject("");
  };
  const studentResults = reportCardStudent ? results.filter((r) => r.studentId === reportCardStudent) : [];
  const reportStudent = reportCardStudent ? getStudentById(reportCardStudent) : null;
  const typeBadge = (type) => {
    const variants = {
      midterm: "bg-info/10 text-info border-info/20",
      final: "bg-primary/10 text-primary border-primary/20",
      internal: "bg-success/10 text-success border-success/20"
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: variants[type], children: type });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Examination Module" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage exam schedules, marks, and report cards" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "schedule", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "schedule", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          " Exam Schedule"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "marks", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }),
          " Marks & Grades"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "report", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          " Report Cards"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "schedule", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setAddScheduleDialog(true), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add Exam"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Department" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: schedules.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-foreground", children: exam.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: exam.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: exam.time }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: exam.room }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: typeBadge(exam.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              exam.department,
              " — Sem ",
              exam.semester
            ] })
          ] }, exam.id)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "marks", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setMarksDialog(true), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Enter Marks"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Exam Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Marks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Grade" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: results.map((res) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: getStudentName(res.studentId) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: getStudentById(res.studentId)?.rollNo })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: res.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: typeBadge(res.examType) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              res.marksObtained,
              "/",
              res.totalMarks
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: res.grade.startsWith("A") ? "bg-success/10 text-success border-success/20" : res.grade.startsWith("B") ? "bg-info/10 text-info border-info/20" : "bg-warning/10 text-warning border-warning/20", children: res.grade }) })
          ] }, res.id)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "report", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: reportCardStudent ?? "", onValueChange: setReportCardStudent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a student to view report card" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STUDENTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
            s.name,
            " (",
            s.rollNo,
            ")"
          ] }, s.id)) })
        ] }) }),
        reportStudent && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground", children: reportStudent.avatar }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: reportStudent.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                reportStudent.rollNo,
                " • ",
                reportStudent.department,
                " • Semester ",
                reportStudent.semester
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: studentResults.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Subject" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Exam" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Marks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Percentage" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Grade" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: studentResults.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: r.examType }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  r.marksObtained,
                  "/",
                  r.totalMarks
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                  Math.round(r.marksObtained / r.totalMarks * 100),
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.grade }) })
              ] }, r.id)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-6 rounded-lg bg-secondary p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Marks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground", children: [
                  studentResults.reduce((s, r) => s + r.marksObtained, 0),
                  "/",
                  studentResults.reduce((s, r) => s + r.totalMarks, 0)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Average" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground", children: [
                  Math.round(studentResults.reduce((s, r) => s + r.marksObtained / r.totalMarks * 100, 0) / studentResults.length),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Overall Grade" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: calculateGrade(studentResults.reduce((s, r) => s + r.marksObtained / r.totalMarks * 100, 0) / studentResults.length) })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-muted-foreground", children: "No exam results found for this student" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addScheduleDialog, onOpenChange: setAddScheduleDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Exam Schedule" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newSubject, onValueChange: setNewSubject, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select subject" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: newDate, onChange: (e) => setNewDate(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newTime, onChange: (e) => setNewTime(e.target.value), placeholder: "10:00 AM - 1:00 PM" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newRoom, onChange: (e) => setNewRoom(e.target.value), placeholder: "Hall A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newType, onValueChange: (v) => setNewType(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "midterm", children: "Midterm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "final", children: "Final" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "internal", children: "Internal" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAddSchedule, className: "w-full", children: "Add Schedule" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: marksDialog, onOpenChange: setMarksDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Enter Marks" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: marksStudentId, onValueChange: setMarksStudentId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select student" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STUDENTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
              s.name,
              " (",
              s.rollNo,
              ")"
            ] }, s.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: marksSubject, onValueChange: setMarksSubject, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select subject" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Marks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: marksObtained, onChange: (e) => setMarksObtained(e.target.value), placeholder: "82" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: marksTotalMarks, onChange: (e) => setMarksTotalMarks(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: marksExamType, onValueChange: (v) => setMarksExamType(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "midterm", children: "Midterm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "final", children: "Final" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "internal", children: "Internal" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAddMarks, className: "w-full", children: "Save Marks" })
      ] })
    ] }) })
  ] });
}
export {
  ExamsPage as component
};
