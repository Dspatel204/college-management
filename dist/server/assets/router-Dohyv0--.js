import { r as rootRouteId, i as invariant, t as trimPathLeft, j as joinPaths, a as trimPathRight, b as redirect, R as React2, c as reactExports, d as dummyMatchContext, m as matchContext, u as useRouterState, e as useRouter, f as requireReactDom, g as isDangerousProtocol, h as exactPathTest, k as removeTrailingSlash, l as deepEqual, n as functionalUpdate, o as React, p as jsxRuntimeExports, q as isModuleNotFoundError, s as RouterCore, v as useHydrated, w as escapeHtml, O as Outlet } from "./worker-entry-DxW2Qu7l.js";
class BaseRoute {
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) {
        this._path = rootRouteId;
      } else if (!this.parentRoute) {
        invariant(
          false
        );
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") {
        path = trimPathLeft(path);
      }
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([
        this.parentRoute.id === rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === rootRouteId) {
        path = "/";
      }
      if (id !== rootRouteId) {
        id = joinPaths(["/", id]);
      }
      const fullPath = id === rootRouteId ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) {
        this.children = children;
      }
      if (typeof children === "object" && children !== null) {
        this.children = Object.values(children);
      }
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.redirect = (opts) => redirect({ from: this.fullPath, ...opts });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) {
      throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
    }
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class BaseRootRoute extends BaseRoute {
  constructor(options) {
    super(options);
  }
}
const REACT_USE = "use";
const reactUse = React2[REACT_USE];
function useForwardedRef(ref) {
  const innerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => innerRef.current, []);
  return innerRef;
}
function useMatch(opts) {
  const nearestMatchId = reactExports.useContext(
    opts.from ? dummyMatchContext : matchContext
  );
  const matchSelection = useRouterState({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      invariant(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return reactExports.useCallback(
    (options) => {
      return router2.navigate({
        ...options,
        from: options.from ?? _defaultOpts?.from
      });
    },
    [_defaultOpts?.from, router2]
  );
}
var reactDomExports = requireReactDom();
function useLinkProps(options, forwardedRef) {
  const router2 = useRouter();
  const innerRef = useForwardedRef(forwardedRef);
  const {
    // custom props
    activeProps,
    inactiveProps,
    activeOptions,
    to,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    hashScrollIntoView,
    replace,
    startTransition,
    resetScroll,
    viewTransition,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    // prevent these from being returned
    params: _params,
    search: _search,
    hash: _hash,
    state: _state,
    mask: _mask,
    reloadDocument: _reloadDocument,
    unsafeRelative: _unsafeRelative,
    from: _from,
    _fromLocation,
    ...propsSafeToSpread
  } = options;
  {
    const safeInternal = isSafeInternal(to);
    if (typeof to === "string" && !safeInternal && // Quick checks to avoid `new URL` in common internal-like cases
    to.indexOf(":") > -1) {
      try {
        new URL(to);
        if (isDangerousProtocol(to, router2.protocolAllowlist)) {
          if (false) ;
          return {
            ...propsSafeToSpread,
            ref: innerRef,
            href: void 0,
            ...children && { children },
            ...target && { target },
            ...disabled && { disabled },
            ...style && { style },
            ...className && { className }
          };
        }
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: to,
          ...children && { children },
          ...target && { target },
          ...disabled && { disabled },
          ...style && { style },
          ...className && { className }
        };
      } catch {
      }
    }
    const next2 = router2.buildLocation({ ...options, from: options.from });
    const hrefOptionPublicHref2 = next2.maskedLocation ? next2.maskedLocation.publicHref : next2.publicHref;
    const hrefOptionExternal2 = next2.maskedLocation ? next2.maskedLocation.external : next2.external;
    const hrefOption2 = getHrefOption(
      hrefOptionPublicHref2,
      hrefOptionExternal2,
      router2.history,
      disabled
    );
    const externalLink2 = (() => {
      if (hrefOption2?.external) {
        if (isDangerousProtocol(hrefOption2.href, router2.protocolAllowlist)) {
          return void 0;
        }
        return hrefOption2.href;
      }
      if (safeInternal) return void 0;
      if (typeof to === "string" && to.indexOf(":") > -1) {
        try {
          new URL(to);
          if (isDangerousProtocol(to, router2.protocolAllowlist)) {
            if (false) ;
            return void 0;
          }
          return to;
        } catch {
        }
      }
      return void 0;
    })();
    const isActive2 = (() => {
      if (externalLink2) return false;
      const currentLocation = router2.state.location;
      const exact = activeOptions?.exact ?? false;
      if (exact) {
        const testExact = exactPathTest(
          currentLocation.pathname,
          next2.pathname,
          router2.basepath
        );
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = removeTrailingSlash(
          currentLocation.pathname,
          router2.basepath
        );
        const nextPathSplit = removeTrailingSlash(
          next2.pathname,
          router2.basepath
        );
        const pathIsFuzzyEqual = currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/");
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      const includeSearch = activeOptions?.includeSearch ?? true;
      if (includeSearch) {
        if (currentLocation.search !== next2.search) {
          const currentSearchEmpty = !currentLocation.search || typeof currentLocation.search === "object" && Object.keys(currentLocation.search).length === 0;
          const nextSearchEmpty = !next2.search || typeof next2.search === "object" && Object.keys(next2.search).length === 0;
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            const searchTest = deepEqual(currentLocation.search, next2.search, {
              partial: !exact,
              ignoreUndefined: !activeOptions?.explicitUndefined
            });
            if (!searchTest) {
              return false;
            }
          }
        }
      }
      if (activeOptions?.includeHash) {
        return false;
      }
      return true;
    })();
    if (externalLink2) {
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: externalLink2,
        ...children && { children },
        ...target && { target },
        ...disabled && { disabled },
        ...style && { style },
        ...className && { className }
      };
    }
    const resolvedActiveProps2 = isActive2 ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
    const resolvedInactiveProps2 = isActive2 ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
    const resolvedStyle2 = (() => {
      const baseStyle = style;
      const activeStyle = resolvedActiveProps2.style;
      const inactiveStyle = resolvedInactiveProps2.style;
      if (!baseStyle && !activeStyle && !inactiveStyle) {
        return void 0;
      }
      if (baseStyle && !activeStyle && !inactiveStyle) {
        return baseStyle;
      }
      if (!baseStyle && activeStyle && !inactiveStyle) {
        return activeStyle;
      }
      if (!baseStyle && !activeStyle && inactiveStyle) {
        return inactiveStyle;
      }
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle
      };
    })();
    const resolvedClassName2 = (() => {
      const baseClassName = className;
      const activeClassName = resolvedActiveProps2.className;
      const inactiveClassName = resolvedInactiveProps2.className;
      if (!baseClassName && !activeClassName && !inactiveClassName) {
        return "";
      }
      let out = "";
      if (baseClassName) {
        out = baseClassName;
      }
      if (activeClassName) {
        out = out ? `${out} ${activeClassName}` : activeClassName;
      }
      if (inactiveClassName) {
        out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
      }
      return out;
    })();
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps2,
      ...resolvedInactiveProps2,
      href: hrefOption2?.href,
      ref: innerRef,
      disabled: !!disabled,
      target,
      ...resolvedStyle2 && { style: resolvedStyle2 },
      ...resolvedClassName2 && { className: resolvedClassName2 },
      ...disabled && STATIC_DISABLED_PROPS,
      ...isActive2 && STATIC_ACTIVE_PROPS
    };
  }
}
const STATIC_EMPTY_OBJECT = {};
const STATIC_ACTIVE_OBJECT = { className: "active" };
const STATIC_DISABLED_PROPS = { role: "link", "aria-disabled": true };
const STATIC_ACTIVE_PROPS = { "data-status": "active", "aria-current": "page" };
function getHrefOption(publicHref, external, history, disabled) {
  if (disabled) return void 0;
  if (external) {
    return { href: publicHref, external: true };
  }
  return {
    href: history.createHref(publicHref) || "/",
    external: false
  };
}
function isSafeInternal(to) {
  if (typeof to !== "string") return false;
  const zero = to.charCodeAt(0);
  if (zero === 47) return to.charCodeAt(1) !== 47;
  return zero === 46;
}
const Link = reactExports.forwardRef(
  (props, ref) => {
    const { _asChild, ...rest } = props;
    const { type: _type, ...linkProps } = useLinkProps(rest, ref);
    const children = typeof rest.children === "function" ? rest.children({
      isActive: linkProps["data-status"] === "active"
    }) : rest.children;
    if (!_asChild) {
      const { disabled: _, ...rest2 } = linkProps;
      return reactExports.createElement("a", rest2, children);
    }
    return reactExports.createElement(_asChild, linkProps, children);
  }
);
let Route$h = class Route extends BaseRoute {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => opts?.select ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { ref, from: this.fullPath, ...props });
      }
    );
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
};
function createRoute(options) {
  return new Route$h(
    // TODO: Help us TypeChris, you're our only hope!
    options
  );
}
class RootRoute extends BaseRootRoute {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => opts?.select ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { ref, from: this.fullPath, ...props });
      }
    );
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  if (typeof path === "object") {
    return new FileRoute(path, {
      silent: true
    }).createRoute(path);
  }
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return useMatch({
        select: opts2?.select,
        from: this.options.id,
        structuralSharing: opts2?.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return useMatch({
        from: this.options.id,
        select: (d) => opts2?.select ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return useSearch({
        select: opts2?.select,
        structuralSharing: opts2?.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return useParams({
        select: opts2?.select,
        structuralSharing: opts2?.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return useLoaderDeps({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return useLoaderData({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      const router2 = useRouter();
      return useNavigate({ from: router2.routesById[this.options.id].fullPath });
    };
    this.options = opts;
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
}
function createLazyFileRoute(id) {
  if (typeof id === "object") {
    return new LazyRoute(id);
  }
  return (opts) => new LazyRoute({ id, ...opts });
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) {
      loadPromise = importer().then((res) => {
        loadPromise = void 0;
        comp = res[exportName];
      }).catch((err) => {
        error = err;
        if (isModuleNotFoundError(error)) {
          if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
            const storageKey = `tanstack_router_reload:${error.message}`;
            if (!sessionStorage.getItem(storageKey)) {
              sessionStorage.setItem(storageKey, "1");
              reload = true;
            }
          }
        }
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) {
      throw error;
    }
    if (!comp) {
      if (reactUse) {
        reactUse(load());
      } else {
        throw load();
      }
    }
    return reactExports.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
const createRouter = (options) => {
  return new Router(options);
};
class Router extends RouterCore {
  constructor(options) {
    super(options);
  }
}
if (typeof globalThis !== "undefined") {
  globalThis.createFileRoute = createFileRoute;
  globalThis.createLazyFileRoute = createLazyFileRoute;
} else if (typeof window !== "undefined") {
  window.createFileRoute = createFileRoute;
  window.createLazyFileRoute = createLazyFileRoute;
}
function Asset({
  tag,
  attrs,
  children,
  nonce
}) {
  switch (tag) {
    case "title":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("title", { ...attrs, suppressHydrationWarning: true, children });
    case "meta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { ...attrs, suppressHydrationWarning: true });
    case "link":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("link", { ...attrs, nonce, suppressHydrationWarning: true });
    case "style":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          ...attrs,
          dangerouslySetInnerHTML: { __html: children },
          nonce
        }
      );
    case "script":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Script, { attrs, children });
    default:
      return null;
  }
}
function Script({
  attrs,
  children
}) {
  useRouter();
  useHydrated();
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  reactExports.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      const existingScript = Array.from(
        document.querySelectorAll("script[src]")
      ).find((el) => el.src === normSrc);
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) {
        if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) {
          script.setAttribute(
            key,
            typeof value === "boolean" ? "" : String(value)
          );
        }
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      const existingScript = Array.from(
        document.querySelectorAll("script:not([src])")
      ).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      });
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
          if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) {
            script.setAttribute(
              key,
              typeof value === "boolean" ? "" : String(value)
            );
          }
        }
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
    return void 0;
  }, [attrs, children, dataScript]);
  {
    if (attrs?.src) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("script", { ...attrs, suppressHydrationWarning: true });
    }
    if (typeof children === "string") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          ...attrs,
          dangerouslySetInnerHTML: { __html: children },
          suppressHydrationWarning: true
        }
      );
    }
    return null;
  }
}
const useTags = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const routeMeta = useRouterState({
    select: (state) => {
      return state.matches.map((match) => match.meta).filter(Boolean);
    }
  });
  const meta = reactExports.useMemo(() => {
    const resultMeta = [];
    const metaByAttribute = {};
    let title;
    for (let i = routeMeta.length - 1; i >= 0; i--) {
      const metas = routeMeta[i];
      for (let j = metas.length - 1; j >= 0; j--) {
        const m = metas[j];
        if (!m) continue;
        if (m.title) {
          if (!title) {
            title = {
              tag: "title",
              children: m.title
            };
          }
        } else if ("script:ld+json" in m) {
          try {
            const json = JSON.stringify(m["script:ld+json"]);
            resultMeta.push({
              tag: "script",
              attrs: {
                type: "application/ld+json"
              },
              children: escapeHtml(json)
            });
          } catch {
          }
        } else {
          const attribute = m.name ?? m.property;
          if (attribute) {
            if (metaByAttribute[attribute]) {
              continue;
            } else {
              metaByAttribute[attribute] = true;
            }
          }
          resultMeta.push({
            tag: "meta",
            attrs: {
              ...m,
              nonce
            }
          });
        }
      }
    }
    if (title) {
      resultMeta.push(title);
    }
    if (nonce) {
      resultMeta.push({
        tag: "meta",
        attrs: {
          property: "csp-nonce",
          content: nonce
        }
      });
    }
    resultMeta.reverse();
    return resultMeta;
  }, [routeMeta, nonce]);
  const links = useRouterState({
    select: (state) => {
      const constructed = state.matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
        tag: "link",
        attrs: {
          ...link,
          nonce
        }
      }));
      const manifest = router2.ssr?.manifest;
      const assets = state.matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map(
        (asset) => ({
          tag: "link",
          attrs: {
            ...asset.attrs,
            suppressHydrationWarning: true,
            nonce
          }
        })
      );
      return [...constructed, ...assets];
    },
    structuralSharing: true
  });
  const preloadLinks = useRouterState({
    select: (state) => {
      const preloadLinks2 = [];
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach(
        (route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
          preloadLinks2.push({
            tag: "link",
            attrs: {
              rel: "modulepreload",
              href: preload,
              nonce
            }
          });
        })
      );
      return preloadLinks2;
    },
    structuralSharing: true
  });
  const styles = useRouterState({
    select: (state) => state.matches.map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...attrs }) => ({
      tag: "style",
      attrs: {
        ...attrs,
        nonce
      },
      children
    })),
    structuralSharing: true
  });
  const headScripts = useRouterState({
    select: (state) => state.matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
      tag: "script",
      attrs: {
        ...script,
        nonce
      },
      children
    })),
    structuralSharing: true
  });
  return uniqBy(
    [
      ...meta,
      ...preloadLinks,
      ...links,
      ...styles,
      ...headScripts
    ],
    (d) => {
      return JSON.stringify(d);
    }
  );
};
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
function HeadContent() {
  const tags = useTags();
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: tags.map((tag) => /* @__PURE__ */ reactExports.createElement(Asset, { ...tag, key: `tsr-meta-${JSON.stringify(tag)}`, nonce })) });
}
const Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const assetScripts = useRouterState({
    select: (state) => {
      const assetScripts2 = [];
      const manifest = router2.ssr?.manifest;
      if (!manifest) {
        return [];
      }
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach(
        (route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
          assetScripts2.push({
            tag: "script",
            attrs: { ...asset.attrs, nonce },
            children: asset.children
          });
        })
      );
      return assetScripts2;
    },
    structuralSharing: true
  });
  const { scripts } = useRouterState({
    select: (state) => ({
      scripts: state.matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
        tag: "script",
        attrs: {
          ...script,
          suppressHydrationWarning: true,
          nonce
        },
        children
      }))
    }),
    structuralSharing: true
  });
  let serverBufferedScript = void 0;
  if (router2.serverSsr) {
    serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  }
  const allScripts = [...scripts, ...assetScripts];
  if (serverBufferedScript) {
    allScripts.unshift(serverBufferedScript);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: allScripts.map((asset, i) => /* @__PURE__ */ reactExports.createElement(Asset, { ...asset, key: `tsr-scripts-${asset.tag}-${i}` })) });
};
const AuthContext = reactExports.createContext(null);
const DEMO_USERS = {
  "admin@college.com": {
    password: "admin123",
    user: { id: "1", name: "Dr. Sharma", email: "admin@college.com", role: "admin" }
  },
  "teacher@college.com": {
    password: "teacher123",
    user: { id: "2", name: "Prof. Gupta", email: "teacher@college.com", role: "teacher" }
  },
  "student@college.com": {
    password: "student123",
    user: { id: "3", name: "Rahul Kumar", email: "student@college.com", role: "student" }
  }
};
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const login = (email, password) => {
    const entry = DEMO_USERS[email];
    if (entry && entry.password === password) {
      setUser(entry.user);
      return true;
    }
    return false;
  };
  const logout = () => setUser(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, isAuthenticated: !!user, login, logout }, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const appCss = "/assets/styles-BacgIUEQ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$g = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CollegeHub — College Management System" },
      { name: "description", content: "Complete college management system with attendance tracking, student management, and more." },
      { property: "og:title", content: "CollegeHub — College Management System" },
      { name: "twitter:title", content: "CollegeHub — College Management System" },
      { property: "og:description", content: "Complete college management system with attendance tracking, student management, and more." },
      { name: "twitter:description", content: "Complete college management system with attendance tracking, student management, and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68ad5d30-6f08-47f2-87aa-fc1d915e35e5/id-preview-0add97f6--4a010cc8-92ce-4665-92e5-d50ee0bd8534.lovable.app-1775280194286.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68ad5d30-6f08-47f2-87aa-fc1d915e35e5/id-preview-0add97f6--4a010cc8-92ce-4665-92e5-d50ee0bd8534.lovable.app-1775280194286.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$f = () => import("./transport-C4f9u7XI.js");
const Route$f = createFileRoute("/transport")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./subjects-CbznDnAl.js");
const Route$e = createFileRoute("/subjects")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./students-azhiVyrw.js");
const Route$d = createFileRoute("/students")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./settings-p29tFFxN.js");
const Route$c = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./reports-yShdH3Lr.js");
const Route$b = createFileRoute("/reports")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./notices-CDBL_R_c.js");
const Route$a = createFileRoute("/notices")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./messages-zNEXMIxv.js");
const Route$9 = createFileRoute("/messages")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./login-DaHgc91s.js");
const Route$8 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./library-C19yta3z.js");
const Route$7 = createFileRoute("/library")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./fees-sEU14Qb5.js");
const Route$6 = createFileRoute("/fees")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./faculty-E9ygMZaN.js");
const Route$5 = createFileRoute("/faculty")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./exams-DyjOTC0_.js");
const Route$4 = createFileRoute("/exams")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard-CkRMBarY.js");
const Route$3 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./courses-DM61beC0.js");
const Route$2 = createFileRoute("/courses")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./attendance-BxsN6XiX.js");
const Route$1 = createFileRoute("/attendance")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BUHgmlNf.js");
const Route2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TransportRoute = Route$f.update({
  id: "/transport",
  path: "/transport",
  getParentRoute: () => Route$g
});
const SubjectsRoute = Route$e.update({
  id: "/subjects",
  path: "/subjects",
  getParentRoute: () => Route$g
});
const StudentsRoute = Route$d.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => Route$g
});
const SettingsRoute = Route$c.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$g
});
const ReportsRoute = Route$b.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$g
});
const NoticesRoute = Route$a.update({
  id: "/notices",
  path: "/notices",
  getParentRoute: () => Route$g
});
const MessagesRoute = Route$9.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => Route$g
});
const LoginRoute = Route$8.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$g
});
const LibraryRoute = Route$7.update({
  id: "/library",
  path: "/library",
  getParentRoute: () => Route$g
});
const FeesRoute = Route$6.update({
  id: "/fees",
  path: "/fees",
  getParentRoute: () => Route$g
});
const FacultyRoute = Route$5.update({
  id: "/faculty",
  path: "/faculty",
  getParentRoute: () => Route$g
});
const ExamsRoute = Route$4.update({
  id: "/exams",
  path: "/exams",
  getParentRoute: () => Route$g
});
const DashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$g
});
const CoursesRoute = Route$2.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$g
});
const AttendanceRoute = Route$1.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => Route$g
});
const IndexRoute = Route2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const rootRouteChildren = {
  IndexRoute,
  AttendanceRoute,
  CoursesRoute,
  DashboardRoute,
  ExamsRoute,
  FacultyRoute,
  FeesRoute,
  LibraryRoute,
  LoginRoute,
  MessagesRoute,
  NoticesRoute,
  ReportsRoute,
  SettingsRoute,
  StudentsRoute,
  SubjectsRoute,
  TransportRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({
  error,
  reset
}) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Link as L,
  useNavigate as a,
  router as b,
  reactDomExports as r,
  useAuth as u
};
