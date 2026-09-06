import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AppSidebar, navGroups, navItems } from "./AppSidebar";
import { useAuth } from "@/lib/auth-context";
import { canAccessRoute } from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const visibleItems = navItems.filter((item) => {
    const group = navGroups.find((candidate) => candidate.items.includes(item.to));
    return Boolean(group) && canAccessRoute(user?.role, item.to);
  });
  const getItem = (path: string) => visibleItems.find((item) => item.to === path);
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

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
          <span className="hidden font-bold tracking-tight text-foreground sm:block">CollegeHub</span>
        </Link>

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
          <span className="hidden max-w-28 truncate text-xs text-muted-foreground xl:block">{user?.name}</span>
          <Button variant="ghost" size="icon" aria-label="Log out" onClick={logout} className="h-9 w-9">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
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
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
