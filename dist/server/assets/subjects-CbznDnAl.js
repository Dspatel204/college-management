import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, a as BookOpen, U as Users } from "./DashboardLayout-CFboD7uh.js";
import { C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
import { C as Clock } from "./clock-0aCrobSL.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
const subjectDetails = [{
  name: "Data Structures",
  code: "CS301",
  credits: 4,
  teacher: "Prof. Gupta",
  students: 45,
  schedule: "Mon, Wed, Fri — 10:00 AM"
}, {
  name: "Operating Systems",
  code: "CS302",
  credits: 4,
  teacher: "Dr. Sharma",
  students: 42,
  schedule: "Tue, Thu — 11:00 AM"
}, {
  name: "DBMS",
  code: "CS303",
  credits: 3,
  teacher: "Prof. Mishra",
  students: 40,
  schedule: "Mon, Wed — 2:00 PM"
}, {
  name: "Computer Networks",
  code: "CS304",
  credits: 3,
  teacher: "Dr. Verma",
  students: 38,
  schedule: "Tue, Thu — 3:00 PM"
}, {
  name: "Mathematics",
  code: "MA201",
  credits: 4,
  teacher: "Prof. Rao",
  students: 50,
  schedule: "Mon, Wed, Fri — 9:00 AM"
}];
function SubjectsPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Subjects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage courses and subjects" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3", children: subjectDetails.map((subj) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: subj.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            subj.code,
            " • ",
            subj.credits,
            " Credits"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Teacher:" }),
          " ",
          subj.teacher
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
          subj.students,
          " students"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          subj.schedule
        ] })
      ] })
    ] }) }, subj.code)) })
  ] });
}
export {
  SubjectsPage as component
};
