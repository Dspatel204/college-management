import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, U as Users, C as ClipboardCheck, I as IndianRupee } from "./DashboardLayout-CFboD7uh.js";
import { C as Card, a as CardContent, d as CardHeader, e as CardTitle } from "./card-Cb1AW6bU.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iSHuvjEU.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DUfHuThk.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { S as STUDENTS, I as INITIAL_ATTENDANCE, a as INITIAL_FEES, b as SUBJECTS, D as DEPARTMENTS } from "./college-data-C1ddpZzr.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-CfN3UdKT.js";
import "./index-Da756bPX.js";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
function ReportsPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [deptFilter, setDeptFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const filteredStudents = deptFilter === "all" ? STUDENTS : STUDENTS.filter((s) => s.department === deptFilter);
  const studentReport = filteredStudents.map((student) => {
    const attendance = INITIAL_ATTENDANCE.filter((a) => a.studentId === student.id);
    const present = attendance.filter((a) => a.status === "present").length;
    const total = attendance.length;
    const fees = INITIAL_FEES.filter((f) => f.studentId === student.id);
    const totalFee = fees.reduce((s, f) => s + f.amount, 0);
    const paidFee = fees.reduce((s, f) => s + f.paid, 0);
    return {
      ...student,
      attendanceRate: total > 0 ? Math.round(present / total * 100) : 0,
      totalClasses: total,
      presentClasses: present,
      totalFee,
      paidFee,
      feeStatus: paidFee >= totalFee ? "paid" : paidFee > 0 ? "partial" : "pending"
    };
  });
  const attendanceBySubject = SUBJECTS.map((subject) => {
    const records = INITIAL_ATTENDANCE.filter((a) => a.subject === subject);
    const present = records.filter((a) => a.status === "present").length;
    const absent = records.filter((a) => a.status === "absent").length;
    const late = records.filter((a) => a.status === "late").length;
    return {
      subject,
      total: records.length,
      present,
      absent,
      late,
      rate: records.length > 0 ? Math.round(present / records.length * 100) : 0
    };
  });
  const feeByDept = DEPARTMENTS.map((dept) => {
    const deptStudents = STUDENTS.filter((s) => s.department === dept).map((s) => s.id);
    const fees = INITIAL_FEES.filter((f) => deptStudents.includes(f.studentId));
    const total = fees.reduce((s, f) => s + f.amount, 0);
    const collected = fees.reduce((s, f) => s + f.paid, 0);
    return {
      department: dept,
      total,
      collected,
      pending: total - collected,
      rate: total > 0 ? Math.round(collected / total * 100) : 0
    };
  });
  const totalFees = INITIAL_FEES.reduce((s, f) => s + f.amount, 0);
  const totalCollected = INITIAL_FEES.reduce((s, f) => s + f.paid, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Comprehensive student, attendance, and fee reports" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "student", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "student", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          " Student Report"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "attendance", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-4 w-4" }),
          " Attendance Report"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "fee", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4" }),
          " Fee Report"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "student", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: deptFilter, onValueChange: setDeptFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by department" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Departments" }),
            DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d))
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Department" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Semester" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Attendance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Total Fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fee Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: studentReport.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.rollNo })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.department }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.semester }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: s.attendanceRate >= 75 ? "text-success font-medium" : "text-destructive font-medium", children: [
                s.attendanceRate,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                "(",
                s.presentClasses,
                "/",
                s.totalClasses,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              "₹",
              s.totalFee.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              "₹",
              s.paidFee.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: s.feeStatus === "paid" ? "bg-success/10 text-success border-success/20" : s.feeStatus === "partial" ? "bg-warning/10 text-warning border-warning/20" : "bg-destructive/10 text-destructive border-destructive/20", children: s.feeStatus }) })
          ] }, s.id)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "attendance", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Attendance by Subject" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: attendanceBySubject.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: item.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
              item.rate,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-primary transition-all", style: {
            width: `${item.rate}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Present: ",
              item.present
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Absent: ",
              item.absent
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Late: ",
              item.late
            ] })
          ] })
        ] }, item.subject)) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "fee", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Fees" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
              "₹",
              totalFees.toLocaleString()
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Collected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-success", children: [
              "₹",
              totalCollected.toLocaleString()
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-destructive", children: [
              "₹",
              (totalFees - totalCollected).toLocaleString()
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Fee Collection by Department" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Department" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Collected" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Collection Rate" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: feeByDept.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-foreground", children: d.department }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
                "₹",
                d.total.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-success", children: [
                "₹",
                d.collected.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-destructive", children: [
                "₹",
                d.pending.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-20 rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-primary", style: {
                  width: `${d.rate}%`
                } }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                  d.rate,
                  "%"
                ] })
              ] }) })
            ] }, d.department)) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ReportsPage as component
};
