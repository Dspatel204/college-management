import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, b as MessageSquare } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, d as CardHeader, e as CardTitle, a as CardContent } from "./card-Cb1AW6bU.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Button } from "./button-CZKATw0i.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { S as STUDENTS } from "./college-data-C1ddpZzr.js";
import { S as Search } from "./search-Dw4EZ4s8.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const INITIAL_MESSAGES = [{
  id: "m1",
  from: "Dr. Sharma",
  to: "Rahul Kumar",
  content: "Please submit your assignment by Friday.",
  timestamp: "2024-03-25 10:30 AM",
  read: true
}, {
  id: "m2",
  from: "Prof. Gupta",
  to: "All CS Sem-4",
  content: "Tomorrow's Data Structures class will be held in Lab-1 instead of CS-101.",
  timestamp: "2024-03-25 09:15 AM",
  read: false
}, {
  id: "m3",
  from: "Rahul Kumar",
  to: "Prof. Gupta",
  content: "Sir, I have a doubt regarding linked list implementation. Can I visit during office hours?",
  timestamp: "2024-03-24 03:45 PM",
  read: true
}, {
  id: "m4",
  from: "Admin",
  to: "All",
  content: "College will remain closed on April 1st for Annual Day preparations.",
  timestamp: "2024-03-23 11:00 AM",
  read: true
}, {
  id: "m5",
  from: "Dr. Sharma",
  to: "All Faculty",
  content: "Faculty meeting scheduled for April 2nd at 3 PM. Attendance is mandatory.",
  timestamp: "2024-03-22 04:00 PM",
  read: false
}];
function MessagesPage() {
  const {
    isAuthenticated,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = reactExports.useState(INITIAL_MESSAGES);
  const [search, setSearch] = reactExports.useState("");
  const [newMsg, setNewMsg] = reactExports.useState({
    to: "",
    content: ""
  });
  const [composing, setComposing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const filtered = messages.filter((m) => m.content.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase()) || m.to.toLowerCase().includes(search.toLowerCase()));
  const handleSend = () => {
    if (!newMsg.to || !newMsg.content) return;
    const msg = {
      id: `m${Date.now()}`,
      from: user?.name || "Unknown",
      to: newMsg.to,
      content: newMsg.content,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleString(),
      read: false
    };
    setMessages([msg, ...messages]);
    setNewMsg({
      to: "",
      content: ""
    });
    setComposing(false);
  };
  const recipients = ["All", "All Students", "All Faculty", ...STUDENTS.map((s) => s.name)];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Messages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Internal communication system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setComposing(!composing), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
        " ",
        composing ? "Cancel" : "New Message"
      ] })
    ] }),
    composing && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-6 border-0 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Compose Message" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newMsg.to, onChange: (e) => setNewMsg({
            ...newMsg,
            to: e.target.value
          }), className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select recipient" }),
            recipients.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: newMsg.content, onChange: (e) => setNewMsg({
            ...newMsg,
            content: e.target.value
          }), rows: 4, placeholder: "Type your message...", className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSend, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
          " Send Message"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search messages...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `border-0 shadow-sm hover:shadow-md transition-shadow ${!msg.read ? "ring-1 ring-primary/20" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: msg.from }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "→" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: msg.to }),
        !msg.read && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-[10px] px-1.5", children: "New" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: msg.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: msg.timestamp })
    ] }) }) }) }, msg.id)) })
  ] });
}
export {
  MessagesPage as component
};
