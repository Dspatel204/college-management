import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AppSidebar, navGroups, navItems } from "./AppSidebar";
import { useAuth } from "@/lib/auth-context";
import { canAccessRoute } from "@/lib/permissions";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Command, GraduationCap, LogOut, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const campusAlerts = [
  { title: "Exam form deadline", detail: "End-semester forms close tomorrow at 5:00 PM.", tone: "bg-amber-500" },
  { title: "Placement drive", detail: "TCS aptitude round starts Friday in Lab 2.", tone: "bg-emerald-500" },
  { title: "Bus route update", detail: "Route 3 pickup moves to Gate 2 from Monday.", tone: "bg-sky-500" },
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
    const group = navGroups.find((candidate) => candidate.items.includes(item.to));
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
        <div className="relative mx-auto flex min-h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
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
          <span className="hidden font-bold tracking-tight text-foreground sm:block">CollegeHub</span>
        </Link>

        <div className="hidden min-w-0 items-center gap-2 border-l border-border pl-4 md:flex">
          <div className="truncate text-sm font-semibold text-foreground">{currentItem?.label ?? "Academic workspace"}</div>
          <span className="hidden rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 lg:block dark:text-emerald-300">Live campus</span>
        </div>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
          {navGroups.map((group) => {
            const groupActive = group.items.some((path) => isActive(path));
            return <details key={group.label} className="group relative">
              <summary className={`flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${groupActive ? "text-primary" : "text-muted-foreground"}`}>
                {group.label}<ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-2 grid min-w-64 gap-1 rounded-xl border border-border bg-popover p-2 shadow-xl">
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
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 w-44 justify-between gap-2 px-3 text-muted-foreground md:flex"
            onClick={() => { setSearchOpen(true); setNotificationsOpen(false); }}
            aria-label="Search college modules"
          >
            <span className="flex items-center gap-2"><Search className="h-4 w-4" />Search modules</span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">/</kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => { setSearchOpen(!searchOpen); setNotificationsOpen(false); }}
            aria-label="Search college modules"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={() => { setNotificationsOpen(!notificationsOpen); setSearchOpen(false); }}
            aria-label={`${unreadCount} unread campus notifications`}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">{unreadCount}</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 sm:inline-flex"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <span className="hidden max-w-28 truncate text-xs text-muted-foreground xl:block">{user?.name}</span>
          <Button variant="ghost" size="icon" aria-label="Log out" onClick={logout} className="h-9 w-9">
            <LogOut className="h-4 w-4" />
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

      <main className="min-h-[calc(100vh-8rem)] p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary"><GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" /></div>
            <div><p className="font-semibold text-foreground">CollegeHub</p><p>Academic operations, connected.</p></div>
          </div>
          <p>© {new Date().getFullYear()} CollegeHub Management System</p>
        </div>
      </footer>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
