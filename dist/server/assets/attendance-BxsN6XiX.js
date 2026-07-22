import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, a as CardContent, d as CardHeader, e as CardTitle } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { I as INITIAL_ATTENDANCE, b as SUBJECTS, S as STUDENTS } from "./college-data-C1ddpZzr.js";
import { C as Clock } from "./clock-0aCrobSL.js";
import { X } from "./x-Bk9ytnAn.js";
import { C as Check } from "./check-CZkjlZpK.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function AttendancePage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = reactExports.useState(INITIAL_ATTENDANCE);
  const [selectedSubject, setSelectedSubject] = reactExports.useState(SUBJECTS[0]);
  const [selectedDate, setSelectedDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [marking, setMarking] = reactExports.useState({});
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login"
      });
      return;
    }
  }, [isAuthenticated, navigate]);
  reactExports.useEffect(() => {
    const existing = {};
    records.filter((r) => r.date === selectedDate && r.subject === selectedSubject).forEach((r) => {
      existing[r.studentId] = r.status;
    });
    setMarking(existing);
    setSaved(false);
  }, [selectedDate, selectedSubject, records]);
  if (!isAuthenticated) return null;
  const toggleStatus = (studentId) => {
    setMarking((prev) => {
      const current = prev[studentId] || "present";
      const next = current === "present" ? "absent" : current === "absent" ? "late" : "present";
      return {
        ...prev,
        [studentId]: next
      };
    });
    setSaved(false);
  };
  const saveAttendance = () => {
    const newRecords = records.filter((r) => !(r.date === selectedDate && r.subject === selectedSubject));
    Object.entries(marking).forEach(([studentId, status]) => {
      newRecords.push({
        studentId,
        date: selectedDate,
        status,
        subject: selectedSubject
      });
    });
    setRecords(newRecords);
    setSaved(true);
  };
  const markAll = (status) => {
    const all = {};
    STUDENTS.forEach((s) => {
      all[s.id] = status;
    });
    setMarking(all);
    setSaved(false);
  };
  const statusConfig = {
    present: {
      bg: "bg-success/10",
      text: "text-success",
      icon: Check,
      label: "Present"
    },
    absent: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      icon: X,
      label: "Absent"
    },
    late: {
      bg: "bg-warning/10",
      text: "text-warning",
      icon: Clock,
      label: "Late"
    }
  };
  const presentCount = Object.values(marking).filter((s) => s === "present").length;
  const absentCount = Object.values(marking).filter((s) => s === "absent").length;
  const lateCount = Object.values(marking).filter((s) => s === "late").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Attendance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Mark and manage student attendance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6 border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-wrap items-center gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: selectedSubject, onChange: (e) => setSelectedSubject(e.target.value), className: "mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm", children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), className: "mt-1 block rounded-lg border border-input bg-background px-3 py-2 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => markAll("present"), children: "Mark All Present" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => markAll("absent"), children: "Mark All Absent" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-success/10 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-success", children: presentCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-success/80", children: "Present" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-destructive/10 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-destructive", children: absentCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80", children: "Absent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-warning/10 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-warning", children: lateCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-warning/80", children: "Late" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: saveAttendance, size: "sm", disabled: saved, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          saved ? "Saved ✓" : "Save Attendance"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: STUDENTS.map((student) => {
        const status = marking[student.id] || "present";
        const config = statusConfig[status];
        const StatusIcon = config.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground", children: student.avatar }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: student.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                student.rollNo,
                " • ",
                student.department
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleStatus(student.id), className: `flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${config.bg} ${config.text}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "h-4 w-4" }),
            config.label
          ] })
        ] }, student.id);
      }) }) })
    ] })
  ] });
}
export {
  AttendancePage as component
};
