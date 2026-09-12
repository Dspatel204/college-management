import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AppSidebar, navGroups, navItems } from "./AppSidebar";
import { useAuth } from "@/lib/auth-context";
import { canAccessRoute } from "@/lib/permissions";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Menu,
  ChevronDown,
  LogOut,
  Search,
  X,
  Command,
  ShieldCheck,
} from "lucide-react";

const campusAlerts = [
  {
    title: "Semester registration deadline",
    detail: "Final-year students must complete registration before Friday 5:00 PM.",
    tone: "bg-amber-500",
  },
  {
    title: "Transport schedule update",
    detail: "Route 7 has been rerouted due to maintenance near the east gate.",
    tone: "bg-emerald-500",
  },
  {
    title: "Fee reminder",
    detail: "Outstanding library dues of ₹1,250 were added to the student ledger.",
    tone: "bg-rose-500",
  },
] as const;

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(campusAlerts.length);
  const visibleItems = navItems.filter((item) => {
    const group = navGroups.find((candidate) => candidate.items.some((path) => path === item.to));
    return Boolean(group) && canAccessRoute(user?.role, item.to);
  });
  const getItem = (path: string) => visibleItems.find((item) => item.to === path);
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);
  const currentItem = visibleItems.find((item) => isActive(item.to));
  const searchResults = visibleItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  ).slice(0, 7);

  useEffect(() => {
    const closePanels = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", closePanels);
    return () => window.removeEventListener("keydown", closePanels);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/dashboard" className="flex shrink-0 items-center gap-2.5" aria-label="CollegeHub dashboard">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
            <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
        </Link>

        <div className="hidden min-w-0 items-center gap-2 border-l border-border pl-4 md:flex">
          <div className="truncate text-sm font-semibold text-foreground">{currentItem?.label ?? "Academic workspace"}</div>
          <span className="hidden rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 lg:block dark:text-emerald-300">Live campus</span>
        </div>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {navGroups.map((group) => {
            const groupActive = group.items.some((path) => isActive(path));
            return <details key={group.label} className="group relative">
              <summary className={`flex cursor-pointer list-none items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors hover:bg-muted xl:px-3 xl:text-sm ${groupActive ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                {group.label}<ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-1/2 top-full z-50 mt-2 grid min-w-72 -translate-x-1/2 gap-1 rounded-lg border border-border bg-popover p-2 shadow-xl">
                {group.items.map((path) => {
                  const item = getItem(path);
                  if (!item) return null;
                  const Icon = item.icon;
                  return <Link key={item.to} to={item.to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${isActive(item.to) ? "bg-primary/10 font-semibold text-primary" : "text-popover-foreground hover:bg-muted"}`}>
                    <Icon className="h-4 w-4 shrink-0" /><span className="min-w-0 flex-1 truncate">{item.label}</span>{"badge" in item && item.badge && <span className="text-[10px] text-muted-foreground">{item.badge}</span>}
                  </Link>;
                })}
              </div>
            </details>;
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <span className="hidden max-w-28 truncate text-xs text-muted-foreground xl:block">{user?.name}</span>
          <Button variant="ghost" size="icon" aria-label="Log out" onClick={logout} className="h-9 w-9">
            <LogOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {searchOpen && (
          <div className="absolute right-4 top-14 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-border bg-popover p-2 shadow-2xl sm:right-6 lg:right-8">
            <div className="flex items-center gap-2 border-b border-border px-2 pb-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Find students, fees, exams..." className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="py-1">
              {searchResults.length > 0 ? searchResults.map((item) => {
                const Icon = item.icon;
                return <Link key={item.to} to={item.to} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-popover-foreground hover:bg-muted"><Icon className="h-4 w-4 text-primary" /><span className="flex-1">{item.label}</span><Command className="h-3.5 w-3.5 text-muted-foreground" /></Link>;
              }) : <p className="px-3 py-4 text-sm text-muted-foreground">No module found. Try “fees” or “attendance”.</p>}
            </div>
          </div>
        )}

        {notificationsOpen && (
          <div className="absolute right-4 top-14 z-50 w-[min(23rem,calc(100vw-2rem))] rounded-xl border border-border bg-popover p-3 shadow-2xl sm:right-6 lg:right-8">
            <div className="flex items-center justify-between px-1 pb-2"><div><p className="text-sm font-semibold text-popover-foreground">Campus alerts</p><p className="text-xs text-muted-foreground">Important updates for your day</p></div><button className="text-xs font-medium text-primary hover:underline" onClick={() => setUnreadCount(0)}>Mark read</button></div>
            <div className="space-y-1">{campusAlerts.map((alert) => <div key={alert.title} className="flex gap-3 rounded-lg p-2.5 hover:bg-muted"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${alert.tone}`} /><div><p className="text-sm font-medium text-popover-foreground">{alert.title}</p><p className="text-xs leading-5 text-muted-foreground">{alert.detail}</p></div></div>)}</div>
          </div>
        )}
        </div>
      </header>

      <main className="min-h-[calc(100vh-8rem)]">
        <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link to="/dashboard" className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary"><GraduationCap className="h-5 w-5 text-primary-foreground" /></div>
                <div><p className="font-bold text-foreground">CollegeHub</p><p className="text-[10px] uppercase text-muted-foreground">Management System</p></div>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Academic operations, student services and campus management in one connected workspace.</p>
            </div>
            {navGroups.slice(1, 4).map((group) => {
              const links = group.items.map((path) => getItem(path)).filter((item) => item !== undefined).slice(0, 4);
              if (links.length === 0) return null;
              return <div key={group.label}>
                <h2 className="mb-3 text-xs font-bold uppercase text-foreground">{group.label}</h2>
                <nav className="grid gap-2" aria-label={`${group.label} footer navigation`}>
                  {links.map((item) => <Link key={item.to} to={item.to} className="text-xs text-muted-foreground transition-colors hover:text-primary">{item.label}</Link>)}
                </nav>
              </div>;
            })}
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} CollegeHub Management System</p>
            <p className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Secure role-based workspace</p>
          </div>
        </div>
      </footer>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
