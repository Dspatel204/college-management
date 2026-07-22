import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { B as Button } from "./button-CZKATw0i.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { c as createLucideIcon, G as GraduationCap, C as Card, d as CardHeader, e as CardTitle, f as CardDescription, a as CardContent } from "./card-Cb1AW6bU.js";
import { E as Eye } from "./eye-DjzbmpmP.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function LoginPage() {
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const success = login(email, password);
    if (success) {
      navigate({
        to: "/dashboard"
      });
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };
  const fillDemo = (role) => {
    const creds = {
      admin: {
        email: "admin@college.com",
        password: "admin123"
      },
      teacher: {
        email: "teacher@college.com",
        password: "teacher123"
      },
      student: {
        email: "student@college.com",
        password: "student123"
      }
    };
    const c = creds[role];
    if (c) {
      setEmail(c.email);
      setPassword(c.password);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-primary/5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-9 w-9 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "CollegeHub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "College Management System" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Sign in to your account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-destructive/10 p-3 text-sm text-destructive", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), required: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Signing in..." : "Sign In" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-center text-xs font-medium text-muted-foreground", children: "DEMO ACCOUNTS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["admin", "teacher", "student"].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => fillDemo(role), className: "rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground capitalize hover:bg-accent transition-colors", children: role }, role)) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
