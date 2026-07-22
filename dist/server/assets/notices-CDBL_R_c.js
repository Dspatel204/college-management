import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, M as Megaphone } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { P as Plus } from "./plus-BP6CXQQf.js";
import { C as Calendar } from "./calendar-C_XGuBvJ.js";
import { E as Eye } from "./eye-DjzbmpmP.js";
import { T as Trash2 } from "./trash-2-LT_Uh_mS.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./x-Bk9ytnAn.js";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
const __iconNode = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode);
const INITIAL_NOTICES = [{
  id: "n1",
  title: "Mid-Term Examination Schedule Released",
  content: "The mid-term examination for all departments will commence from April 15, 2024. Students are advised to collect their hall tickets from the examination cell. Bring your college ID card for verification.",
  category: "exam",
  postedBy: "Admin",
  date: "2024-03-25",
  pinned: true,
  audience: "all"
}, {
  id: "n2",
  title: "Annual Sports Day — Registration Open",
  content: "Annual Sports Day will be held on May 5th. Interested students can register at the sports department before April 20th. Events include: Athletics, Cricket, Basketball, Volleyball, Badminton.",
  category: "event",
  postedBy: "Sports Dept",
  date: "2024-03-22",
  pinned: true,
  audience: "students"
}, {
  id: "n3",
  title: "Library Timing Change",
  content: "From April 1st, the central library will remain open from 8:00 AM to 9:00 PM on all working days. Weekend hours: 9:00 AM to 5:00 PM.",
  category: "general",
  postedBy: "Librarian",
  date: "2024-03-20",
  pinned: false,
  audience: "all"
}, {
  id: "n4",
  title: "Faculty Meeting — April 2nd",
  content: "All faculty members are requested to attend the monthly faculty meeting on April 2nd at 3:00 PM in the Conference Hall. Agenda: Curriculum review and semester planning.",
  category: "academic",
  postedBy: "HOD",
  date: "2024-03-18",
  pinned: false,
  audience: "faculty"
}, {
  id: "n5",
  title: "Fee Payment Deadline Extended",
  content: "The last date for fee payment for the current semester has been extended to April 10th. Students with pending fees should clear their dues immediately to avoid late fee charges.",
  category: "urgent",
  postedBy: "Accounts Dept",
  date: "2024-03-15",
  pinned: false,
  audience: "students"
}, {
  id: "n6",
  title: "Workshop on Machine Learning",
  content: "A 3-day workshop on Machine Learning & AI will be conducted from April 8-10. Registration fee: ₹500. Limited seats available. Register at the CS Department.",
  category: "event",
  postedBy: "CS Department",
  date: "2024-03-12",
  pinned: false,
  audience: "all"
}];
function NoticesPage() {
  const {
    isAuthenticated,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = reactExports.useState(INITIAL_NOTICES);
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [addDialog, setAddDialog] = reactExports.useState(false);
  const [viewNotice, setViewNotice] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    content: "",
    category: "general",
    audience: "all"
  });
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const isAdmin = user?.role === "admin";
  const filtered = notices.filter((n) => categoryFilter === "all" || n.category === categoryFilter).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const handleAdd = () => {
    if (!form.title || !form.content) return;
    const newNotice = {
      id: `n${Date.now()}`,
      title: form.title,
      content: form.content,
      category: form.category,
      postedBy: user?.name || "Admin",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      pinned: false,
      audience: form.audience
    };
    setNotices([newNotice, ...notices]);
    setAddDialog(false);
    setForm({
      title: "",
      content: "",
      category: "general",
      audience: "all"
    });
  };
  const togglePin = (id) => {
    setNotices(notices.map((n) => n.id === id ? {
      ...n,
      pinned: !n.pinned
    } : n));
  };
  const deleteNotice = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };
  const categoryColors = {
    general: "bg-info/10 text-info border-info/20",
    academic: "bg-primary/10 text-primary border-primary/20",
    exam: "bg-warning/10 text-warning border-warning/20",
    event: "bg-success/10 text-success border-success/20",
    urgent: "bg-destructive/10 text-destructive border-destructive/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Notice Board" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Announcements & notifications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: "General" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "academic", children: "Academic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "exam", children: "Exam" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "event", children: "Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgent" })
          ] })
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setAddDialog(true), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Post Notice"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filtered.map((notice) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-0 shadow-md transition-shadow hover:shadow-lg ${notice.pinned ? "ring-2 ring-primary/20" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
          notice.pinned && /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: notice.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: categoryColors[notice.category], children: notice.category }),
          notice.audience !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: notice.audience })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mt-1", children: notice.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
            notice.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Posted by: ",
            notice.postedBy
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setViewNotice(notice), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => togglePin(notice.id), className: "h-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: `h-3.5 w-3.5 ${notice.pinned ? "text-primary" : ""}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => deleteNotice(notice.id), className: "h-8 px-2 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] })
    ] }) }) }, notice.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!viewNotice, onOpenChange: () => setViewNotice(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5" }),
        viewNotice?.title
      ] }) }),
      viewNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: categoryColors[viewNotice.category], children: viewNotice.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: viewNotice.audience })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap", children: viewNotice.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Posted by: ",
            viewNotice.postedBy
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Date: ",
            viewNotice.date
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addDialog, onOpenChange: setAddDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Post New Notice" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }), placeholder: "Notice title" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Content *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.content, onChange: (e) => setForm({
            ...form,
            content: e.target.value
          }), placeholder: "Write notice content...", rows: 5, className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.category, onValueChange: (v) => setForm({
              ...form,
              category: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: "General" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "academic", children: "Academic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "exam", children: "Exam" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "event", children: "Event" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgent" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Audience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.audience, onValueChange: (v) => setForm({
              ...form,
              audience: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Everyone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "students", children: "Students Only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "faculty", children: "Faculty Only" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAdd, className: "w-full", children: "Post Notice" })
      ] })
    ] }) })
  ] });
}
export {
  NoticesPage as component
};
