import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, b as cn, C as Card, d as CardHeader, e as CardTitle, a as CardContent } from "./card-Cb1AW6bU.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Button } from "./button-CZKATw0i.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iSHuvjEU.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { u as useSize, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-dIILhMtw.js";
import { c as createContextScope, P as Primitive, a as composeEventHandlers, u as useControllableState } from "./index-CfN3UdKT.js";
import { u as useComposedRefs } from "./index-Da756bPX.js";
import { U as User } from "./user-B_g6wlaO.js";
import { C as Calendar } from "./calendar-C_XGuBvJ.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-C3P8y4QV.js";
import "./check-CZkjlZpK.js";
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProviderImpl, useSwitchContext] = createSwitchContext(SWITCH_NAME);
function SwitchProvider(props) {
  const {
    __scopeSwitch,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: SWITCH_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const [userInteractionCount, onUserInteraction] = reactExports.useReducer(
    (count) => count + 1,
    0
  );
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    setChecked,
    disabled,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    userInteractionCount,
    onUserInteraction,
    required,
    defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SwitchProviderImpl, { scope: __scopeSwitch, ...context, children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children });
}
__name(SwitchProvider, "SwitchProvider");
var TRIGGER_NAME = "SwitchTrigger";
var SwitchTrigger = /* @__PURE__ */ reactExports.forwardRef(
  /* @__PURE__ */ __name(function SwitchTrigger2({ __scopeSwitch, onClick, ...switchProps }, forwardedRef) {
    const {
      control,
      form,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      onUserInteraction,
      isFormControl,
      bubbleInput
    } = useSwitchContext(TRIGGER_NAME, __scopeSwitch);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const associatedForm = form ? control?.ownerDocument.getElementById(form) : control?.form;
      if (associatedForm instanceof HTMLFormElement) {
        const reset = /* @__PURE__ */ __name(() => setChecked(initialCheckedStateRef.current), "reset");
        associatedForm.addEventListener("reset", reset);
        return () => associatedForm.removeEventListener("reset", reset);
      }
    }, [control, form, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...switchProps,
        ref: composedRefs,
        onClick: composeEventHandlers(onClick, (event) => {
          onUserInteraction();
          setChecked((prevChecked) => !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }, "SwitchTrigger")
);
var Switch$1 = /* @__PURE__ */ reactExports.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function Switch2(props, forwardedRef) {
    const {
      __scopeSwitch,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchProvider,
      {
        __scopeSwitch,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SwitchTrigger,
            {
              ...switchProps,
              ref: forwardedRef,
              __scopeSwitch
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            SwitchBubbleInput,
            {
              __scopeSwitch
            }
          )
        ] })
      }
    );
  }, "Switch")
);
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = /* @__PURE__ */ reactExports.forwardRef(
  /* @__PURE__ */ __name(function SwitchThumb2(props, forwardedRef) {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }, "SwitchThumb")
);
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = /* @__PURE__ */ reactExports.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function SwitchBubbleInput2({ __scopeSwitch, onClick, ...props }, forwardedRef) {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      userInteractionCount,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useSwitchContext(BUBBLE_INPUT_NAME, __scopeSwitch);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const controlSize = useSize(control);
    const shouldStopClickPropagationRef = reactExports.useRef(false);
    const prevCheckedRef = reactExports.useRef(checked);
    const prevUserInteractionCountRef = reactExports.useRef(userInteractionCount);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const isUserInteraction = userInteractionCount !== prevUserInteractionCountRef.current;
      prevUserInteractionCountRef.current = userInteractionCount;
      const checkedChanged = prevCheckedRef.current !== checked;
      prevCheckedRef.current = checked;
      const bubbles = !(isUserInteraction && hasConsumerStoppedPropagationRef.current);
      if (checkedChanged && setChecked) {
        shouldStopClickPropagationRef.current = !isUserInteraction;
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
        shouldStopClickPropagationRef.current = false;
      }
    }, [bubbleInput, checked, hasConsumerStoppedPropagationRef, userInteractionCount]);
    const defaultCheckedRef = reactExports.useRef(checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        onClick: composeEventHandlers(onClick, (event) => {
          if (shouldStopClickPropagationRef.current) {
            event.stopPropagation();
          }
        }),
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }, "SwitchBubbleInput")
);
function isFunction(value) {
  return typeof value === "function";
}
__name(isFunction, "isFunction");
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
__name(getState, "getState");
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
  const {
    isAuthenticated,
    user
  } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = reactExports.useState(false);
  const [collegeName, setCollegeName] = reactExports.useState("CollegeHub Engineering College");
  const [collegeCode, setCollegeCode] = reactExports.useState("CHE-2024");
  const [academicYear, setAcademicYear] = reactExports.useState("2024-25");
  const [currentSemester, setCurrentSemester] = reactExports.useState("Even");
  const [emailNotif, setEmailNotif] = reactExports.useState(true);
  const [smsNotif, setSmsNotif] = reactExports.useState(false);
  const [attendanceAlert, setAttendanceAlert] = reactExports.useState(true);
  const [feeReminder, setFeeReminder] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated || !user) return null;
  const isAdmin = user.role === "admin";
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage profile, college, and system settings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
          " Profile"
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "college", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
          " College"
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "academic", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          " Academic"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "notifications", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
          " Notifications"
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "security", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
          " Security"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Profile Information" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground", children: user.name.split(" ").map((n) => n[0]).join("") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: user.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize", children: user.role })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: user.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: user.email, type: "email" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Enter phone number" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: user.role, disabled: true, className: "capitalize" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, children: saved ? "Saved ✓" : "Save Changes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Change Password" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Current Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "••••••••" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "New Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "••••••••" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Confirm Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", placeholder: "••••••••" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Update Password" })
          ] })
        ] })
      ] }) }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "college", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "College Branding" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "College Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: collegeName, onChange: (e) => setCollegeName(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "College Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: collegeCode, onChange: (e) => setCollegeCode(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Affiliation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "State University" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "123 College Road, City" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "+91 1234567890" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "https://collegehub.edu.in" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, children: saved ? "Saved ✓" : "Save Branding" })
        ] })
      ] }) }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "academic", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Academic Year Setup" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Academic Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: academicYear, onValueChange: setAcademicYear, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2023-24", children: "2023-24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2024-25", children: "2024-25" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2025-26", children: "2025-26" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Current Semester" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currentSemester, onValueChange: setCurrentSemester, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Odd", children: "Odd (Jul-Dec)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Even", children: "Even (Jan-Jun)" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Semester Start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", defaultValue: "2024-01-15" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Semester End" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", defaultValue: "2024-06-30" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Exam Start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", defaultValue: "2024-04-15" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Result Declaration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", defaultValue: "2024-05-30" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, children: saved ? "Saved ✓" : "Save Academic Settings" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Notification Preferences" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Email Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Receive updates via email" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: emailNotif, onCheckedChange: setEmailNotif })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "SMS Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Get SMS alerts for important updates" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: smsNotif, onCheckedChange: setSmsNotif })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Low Attendance Alerts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Alert when student attendance drops below 75%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: attendanceAlert, onCheckedChange: setAttendanceAlert })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Fee Payment Reminders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Remind students about pending fees" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: feeReminder, onCheckedChange: setFeeReminder })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, children: saved ? "Saved ✓" : "Save Preferences" })
        ] })
      ] }) }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "security", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Role-Based Permissions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-foreground", children: "Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/10 text-destructive", children: "Full Access" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Can manage all modules: students, faculty, fees, exams, reports, settings, and system configuration." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-foreground", children: "Faculty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-warning/10 text-warning", children: "Limited Access" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Can mark attendance, enter marks & grades, view student profiles, and manage assigned courses." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-foreground", children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-info/10 text-info", children: "View Only" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Can view own attendance, results, fee status, notices, and course details. Cannot modify any data." })
          ] })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  SettingsPage as component
};
