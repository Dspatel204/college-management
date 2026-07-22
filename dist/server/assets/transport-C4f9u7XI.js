import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, B as Bus } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { S as StatsCard } from "./StatsCard-CfYHEYSm.js";
import { S as STUDENTS } from "./college-data-C1ddpZzr.js";
import { P as Plus } from "./plus-BP6CXQQf.js";
import { U as User } from "./user-B_g6wlaO.js";
import { P as Phone, a as Pencil } from "./phone-DLjWbDq3.js";
import { T as Trash2 } from "./trash-2-LT_Uh_mS.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./x-Bk9ytnAn.js";
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
const INITIAL_ROUTES = [{
  id: "r1",
  routeNo: "RT-01",
  from: "Central Station",
  to: "College Campus",
  via: "MG Road, Park Street",
  driverName: "Ramesh Yadav",
  driverPhone: "9900000001",
  busNo: "KA-01-1234",
  capacity: 50,
  assignedStudents: ["s1", "s2", "s3"],
  departureTime: "8:00 AM",
  arrivalTime: "8:45 AM"
}, {
  id: "r2",
  routeNo: "RT-02",
  from: "East Town",
  to: "College Campus",
  via: "Ring Road, IT Park",
  driverName: "Sunil Kumar",
  driverPhone: "9900000002",
  busNo: "KA-01-5678",
  capacity: 45,
  assignedStudents: ["s4", "s5"],
  departureTime: "7:45 AM",
  arrivalTime: "8:40 AM"
}, {
  id: "r3",
  routeNo: "RT-03",
  from: "South Colony",
  to: "College Campus",
  via: "Temple Road, Market",
  driverName: "Manoj Singh",
  driverPhone: "9900000003",
  busNo: "KA-01-9012",
  capacity: 40,
  assignedStudents: ["s6", "s7", "s8", "s9"],
  departureTime: "7:30 AM",
  arrivalTime: "8:30 AM"
}, {
  id: "r4",
  routeNo: "RT-04",
  from: "North Hills",
  to: "College Campus",
  via: "Highway, Bridge Point",
  driverName: "Deepak Sharma",
  driverPhone: "9900000004",
  busNo: "KA-01-3456",
  capacity: 50,
  assignedStudents: ["s10"],
  departureTime: "7:15 AM",
  arrivalTime: "8:35 AM"
}];
function TransportPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [routes, setRoutes] = reactExports.useState(INITIAL_ROUTES);
  const [addDialog, setAddDialog] = reactExports.useState(false);
  const [editRoute, setEditRoute] = reactExports.useState(null);
  const [allocateDialog, setAllocateDialog] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    routeNo: "",
    from: "",
    to: "",
    via: "",
    driverName: "",
    driverPhone: "",
    busNo: "",
    capacity: 50,
    departureTime: "",
    arrivalTime: ""
  });
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const totalBuses = routes.length;
  const totalCapacity = routes.reduce((s, r) => s + r.capacity, 0);
  const totalAllocated = routes.reduce((s, r) => s + r.assignedStudents.length, 0);
  const handleSave = () => {
    if (!form.routeNo || !form.from || !form.to || !form.driverName) return;
    if (editRoute) {
      setRoutes(routes.map((r) => r.id === editRoute.id ? {
        ...r,
        ...form
      } : r));
    } else {
      setRoutes([...routes, {
        id: `r${Date.now()}`,
        ...form,
        assignedStudents: []
      }]);
    }
    setAddDialog(false);
    setEditRoute(null);
    setForm({
      routeNo: "",
      from: "",
      to: "",
      via: "",
      driverName: "",
      driverPhone: "",
      busNo: "",
      capacity: 50,
      departureTime: "",
      arrivalTime: ""
    });
  };
  const openEdit = (r) => {
    setForm({
      routeNo: r.routeNo,
      from: r.from,
      to: r.to,
      via: r.via,
      driverName: r.driverName,
      driverPhone: r.driverPhone,
      busNo: r.busNo,
      capacity: r.capacity,
      departureTime: r.departureTime,
      arrivalTime: r.arrivalTime
    });
    setEditRoute(r);
    setAddDialog(true);
  };
  const deleteRoute = (id) => setRoutes(routes.filter((r) => r.id !== id));
  const toggleStudent = (routeId, studentId) => {
    setRoutes(routes.map((r) => {
      if (r.id !== routeId) return r;
      const has = r.assignedStudents.includes(studentId);
      return {
        ...r,
        assignedStudents: has ? r.assignedStudents.filter((s) => s !== studentId) : [...r.assignedStudents, studentId]
      };
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Transport Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bus routes, drivers & student allocation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        setEditRoute(null);
        setForm({
          routeNo: "",
          from: "",
          to: "",
          via: "",
          driverName: "",
          driverPhone: "",
          busNo: "",
          capacity: 50,
          departureTime: "",
          arrivalTime: ""
        });
        setAddDialog(true);
      }, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add Route"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Total Buses", value: totalBuses, icon: Bus, subtitle: "Active routes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Total Capacity", value: totalCapacity, icon: User, colorClass: "bg-info", subtitle: "Seats available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Students Allocated", value: totalAllocated, icon: MapPin, colorClass: "bg-success", subtitle: `${totalCapacity - totalAllocated} seats remaining` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: routes.map((route) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground", children: route.routeNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground", children: [
            route.from,
            " → ",
            route.to
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: [
          "Via: ",
          route.via
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "h-3.5 w-3.5" }),
            " Bus: ",
            route.busNo
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
            " Driver: ",
            route.driverName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
            " ",
            route.driverPhone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            route.departureTime,
            " — ",
            route.arrivalTime
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Students: ",
            route.assignedStudents.length,
            "/",
            route.capacity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-32 rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-primary", style: {
            width: `${route.assignedStudents.length / route.capacity * 100}%`
          } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setAllocateDialog(route), children: "Allocate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => openEdit(route), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => deleteRoute(route.id), className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }) }) }, route.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addDialog, onOpenChange: setAddDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editRoute ? "Edit Route" : "Add New Route" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Route No *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.routeNo, onChange: (e) => setForm({
            ...form,
            routeNo: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Bus No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.busNo, onChange: (e) => setForm({
            ...form,
            busNo: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "From *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.from, onChange: (e) => setForm({
            ...form,
            from: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "To *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.to, onChange: (e) => setForm({
            ...form,
            to: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Via" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.via, onChange: (e) => setForm({
            ...form,
            via: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Driver Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.driverName, onChange: (e) => setForm({
            ...form,
            driverName: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Driver Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.driverPhone, onChange: (e) => setForm({
            ...form,
            driverPhone: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Departure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.departureTime, onChange: (e) => setForm({
            ...form,
            departureTime: e.target.value
          }), placeholder: "8:00 AM" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Arrival" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.arrivalTime, onChange: (e) => setForm({
            ...form,
            arrivalTime: e.target.value
          }), placeholder: "8:45 AM" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Capacity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.capacity, onChange: (e) => setForm({
            ...form,
            capacity: Number(e.target.value)
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, className: "w-full mt-2", children: editRoute ? "Save Changes" : "Add Route" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!allocateDialog, onOpenChange: () => setAllocateDialog(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Allocate Students — ",
        allocateDialog?.routeNo
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto", children: STUDENTS.map((student) => {
        const allocated = allocateDialog?.assignedStudents.includes(student.id) ?? false;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => allocateDialog && toggleStudent(allocateDialog.id, student.id), className: `w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${allocated ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              student.rollNo,
              " • ",
              student.department
            ] })
          ] }),
          allocated && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground", children: "Allocated" })
        ] }, student.id);
      }) })
    ] }) })
  ] });
}
export {
  TransportPage as component
};
