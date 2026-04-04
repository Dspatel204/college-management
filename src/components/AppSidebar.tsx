import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { LayoutDashboard, Users, ClipboardCheck, BookOpen, Settings, LogOut, GraduationCap } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight">CollegeHub</h1>
          <p className="text-xs text-sidebar-accent-foreground/60">Management System</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            {user?.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
          </div>
          <button onClick={logout} className="rounded-lg p-2 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
