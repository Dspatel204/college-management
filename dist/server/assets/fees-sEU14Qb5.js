import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, I as IndianRupee } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DUfHuThk.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { a as INITIAL_FEES, g as getStudentName, c as getStudentById, S as STUDENTS } from "./college-data-C1ddpZzr.js";
import { S as StatsCard } from "./StatsCard-CfYHEYSm.js";
import { P as Plus } from "./plus-BP6CXQQf.js";
import { T as TriangleAlert } from "./triangle-alert-BgGnla9I.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
import "./x-Bk9ytnAn.js";
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
function FeesPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [fees, setFees] = reactExports.useState(INITIAL_FEES);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [receiptFee, setReceiptFee] = reactExports.useState(null);
  const [collectDialog, setCollectDialog] = reactExports.useState(false);
  const [collectStudentId, setCollectStudentId] = reactExports.useState("");
  const [collectType, setCollectType] = reactExports.useState("tuition");
  const [collectAmount, setCollectAmount] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const totalCollected = fees.reduce((s, f) => s + f.paid, 0);
  const totalPending = totalFees - totalCollected;
  const overdueCount = fees.filter((f) => f.status === "overdue").length;
  const filtered = statusFilter === "all" ? fees : fees.filter((f) => f.status === statusFilter);
  const statusBadge = (status) => {
    const variants = {
      paid: "bg-success/10 text-success border-success/20",
      partial: "bg-warning/10 text-warning border-warning/20",
      pending: "bg-info/10 text-info border-info/20",
      overdue: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: variants[status], children: status });
  };
  const handleCollect = () => {
    if (!collectStudentId || !collectAmount) return;
    const newFee = {
      id: `f${Date.now()}`,
      studentId: collectStudentId,
      type: collectType,
      amount: Number(collectAmount),
      paid: Number(collectAmount),
      dueDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      paidDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "paid",
      receiptNo: `REC-${Date.now().toString().slice(-6)}`
    };
    setFees([newFee, ...fees]);
    setCollectDialog(false);
    setCollectAmount("");
    setCollectStudentId("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Fee Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track fee collection, receipts, and pending payments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCollectDialog(true), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Collect Fee"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Total Fees", value: `₹${totalFees.toLocaleString()}`, icon: IndianRupee, subtitle: "This semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Collected", value: `₹${totalCollected.toLocaleString()}`, icon: CircleCheckBig, colorClass: "bg-success", subtitle: `${Math.round(totalCollected / totalFees * 100)}% collected` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Pending", value: `₹${totalPending.toLocaleString()}`, icon: TriangleAlert, colorClass: "bg-warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Overdue", value: overdueCount, icon: TriangleAlert, colorClass: "bg-destructive", subtitle: "Need immediate attention" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paid", children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "partial", children: "Partial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "overdue", children: "Overdue" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Due Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((fee) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: getStudentName(fee.studentId) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: getStudentById(fee.studentId)?.rollNo })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: fee.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          "₹",
          fee.amount.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          "₹",
          fee.paid.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: fee.dueDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: statusBadge(fee.status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: fee.receiptNo && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setReceiptFee(fee), className: "gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-3.5 w-3.5" }),
          " Receipt"
        ] }) })
      ] }, fee.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!receiptFee, onOpenChange: () => setReceiptFee(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-5 w-5" }),
        " Fee Receipt"
      ] }) }),
      receiptFee && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-b border-border pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground", children: "CollegeHub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fee Payment Receipt" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Receipt No:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: receiptFee.receiptNo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Date:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: receiptFee.paidDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Student:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: getStudentName(receiptFee.studentId) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Roll No:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: getStudentById(receiptFee.studentId)?.rollNo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Fee Type:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground capitalize", children: receiptFee.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
              "₹",
              receiptFee.paid.toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-border pt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This is a computer-generated receipt" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: collectDialog, onOpenChange: setCollectDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Collect Fee" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: collectStudentId, onValueChange: setCollectStudentId, children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Fee Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: collectType, onValueChange: (v) => setCollectType(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tuition", children: "Tuition" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "exam", children: "Exam" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "library", children: "Library" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hostel", children: "Hostel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lab", children: "Lab" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Amount (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: collectAmount, onChange: (e) => setCollectAmount(e.target.value), placeholder: "Enter amount" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCollect, className: "w-full", children: "Collect & Generate Receipt" })
      ] })
    ] }) })
  ] });
}
export {
  FeesPage as component
};
