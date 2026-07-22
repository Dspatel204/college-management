import { p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
function StatsCard({ title, value, subtitle, icon: Icon, trend, colorClass = "bg-primary" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-bold text-foreground", children: value }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: subtitle }),
      trend && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-2 text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`, children: [
        trend.positive ? "↑" : "↓",
        " ",
        trend.value
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary-foreground" }) })
  ] }) }) });
}
export {
  StatsCard as S
};
