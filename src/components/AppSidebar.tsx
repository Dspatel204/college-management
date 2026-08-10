import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-provider";
import {
  LayoutDashboard, Users, ClipboardCheck, BookOpen, Settings, LogOut,
  GraduationCap, IndianRupee, FileText, BarChart3, UserCog,
  Megaphone, Library, Bus, MessageSquare, Sun, Moon,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/faculty", label: "Faculty", icon: UserCog },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/fees", label: "Fee Management", icon: IndianRupee },
  { to: "/exams", label: "Examinations", icon: FileText },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/library", label: "Library", icon: Library },
  { to: "/transport", label: "Transport", icon: Bus },
  { to: "/notices", label: "Notice Board", icon: Megaphone },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
      `}
    >
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary">
          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-sidebar-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm sm:text-base font-bold tracking-tight truncate">CollegeHub</h1>
          <p className="text-[10px] sm:text-xs text-sidebar-accent-foreground/60 truncate">Management System</p>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-lg p-1.5 sm:p-2 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-2.5 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-all truncate ${isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3 sm:p-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-[10px] sm:text-xs font-bold text-sidebar-primary-foreground">
            {user?.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs sm:text-sm font-medium">{user?.name}</p>
            <p className="truncate text-[10px] sm:text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
          </div>
          <button onClick={logout} className="rounded-lg p-1.5 sm:p-2 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
