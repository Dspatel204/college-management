import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AppSidebar, navGroups, navItems } from "./AppSidebar";
import { useAuth } from "@/lib/auth-context";
import { canAccessRoute } from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, ChevronDown, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const visibleItems = navItems.filter((item) => {
    const group = navGroups.find((candidate) => candidate.items.some((path) => path === item.to));
    return Boolean(group) && canAccessRoute(user?.role, item.to);
  });
  const getItem = (path: string) => visibleItems.find((item) => item.to === path);
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="sticky top-0 z-30 border-b border-border bg-background/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto grid min-h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:flex lg:px-8">
        <Link to="/dashboard" className="flex min-w-0 items-center gap-3 lg:shrink-0" aria-label="CollegeHub dashboard">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-base font-bold text-foreground">CollegeHub</span>
            <span className="hidden truncate text-[10px] font-medium uppercase text-muted-foreground sm:block">Management System</span>
          </div>
        </Link>

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

        <div className="flex shrink-0 items-center gap-2 lg:ml-auto">
          <div className="hidden text-right xl:block">
            <p className="max-w-28 truncate text-xs font-semibold text-foreground">{user?.name}</p>
            <p className="text-[10px] capitalize text-muted-foreground">{user?.role}</p>
          </div>
          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground lg:flex">
            {user?.name.split(" ").map((part) => part[0]).join("")}
          </div>
          <Button variant="ghost" size="icon" aria-label="Log out" onClick={logout} className="hidden h-9 w-9 lg:inline-flex">
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
          className="fixed inset-0 z-40 bg-foreground/45 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
