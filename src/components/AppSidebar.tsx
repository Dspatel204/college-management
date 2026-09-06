import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-provider";
import { canAccessRoute } from "@/lib/permissions";
import {
  LayoutDashboard, Users, ClipboardCheck, BookOpen, Settings, LogOut,
  GraduationCap, IndianRupee, FileText, BarChart3, UserCog,
  Megaphone, Library, Bus, MessageSquare, Sun, Moon,
  Sparkles, Briefcase, QrCode, Radio,
  Trophy, Building, Globe, HelpCircle, BookOpenCheck,
  Landmark, HandCoins, Laptop, ShieldAlert,
  PartyPopper, ClockCheck,
} from "lucide-react";

export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/academic-planner", label: "Academic Planner", icon: BookOpenCheck, badge: "Tasks" },
  { to: "/ai-insights", label: "AI 360° & Risk Hub", icon: Sparkles, badge: "AI" },
  { to: "/smart-attendance", label: "Smart Attendance & Leaves", icon: ClockCheck, badge: "Kiosk" },
  { to: "/events-clubs", label: "Clubs & Campus Fests", icon: PartyPopper, badge: "Life" },
  { to: "/library", label: "Digital Library & NDL", icon: Library, badge: "Books" },
  { to: "/transport", label: "Bus Fleet & Tracking", icon: Bus, badge: "GPS" },
  { to: "/leaderboard", label: "Leaderboard & Badges", icon: Trophy, badge: "XP" },
  { to: "/placement", label: "Placement Portal", icon: Briefcase, badge: "Career" },
  { to: "/internships", label: "NEP 2020 Internships", icon: Laptop, badge: "NEP" },
  { to: "/scholarships", label: "Govt & NSP Scholarships", icon: HandCoins, badge: "NSP" },
  { to: "/accreditation", label: "NAAC & NIRF Hub", icon: Landmark, badge: "NAAC" },
  { to: "/ai-quiz", label: "AI Quiz & Question Paper", icon: HelpCircle, badge: "AI" },
  { to: "/credentials", label: "Digital ID & Tickets", icon: QrCode },
  { to: "/broadcast", label: "Alert & Broadcast", icon: Radio },
  { to: "/grievance-cell", label: "Anti-Ragging & ICC", icon: ShieldAlert, badge: "UGC" },
  { to: "/hostel", label: "Hostel & Dormitory", icon: Building },
  { to: "/alumni", label: "Alumni & Mentorship", icon: Globe },
  { to: "/students", label: "Students", icon: Users },
  { to: "/faculty", label: "Faculty", icon: UserCog },
  { to: "/attendance", label: "Daily Attendance", icon: ClipboardCheck },
  { to: "/fees", label: "Fee Management", icon: IndianRupee },
  { to: "/exams", label: "Examinations", icon: FileText },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/notices", label: "Notice Board", icon: Megaphone },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export const navGroups = [
  { label: "Overview", items: ["/dashboard", "/academic-planner", "/ai-insights", "/reports"] },
  { label: "Academic", items: ["/students", "/faculty", "/attendance", "/smart-attendance", "/courses", "/exams", "/ai-quiz", "/library"] },
  { label: "Campus", items: ["/events-clubs", "/transport", "/hostel", "/credentials", "/notices", "/messages", "/grievance-cell"] },
  { label: "Career & Community", items: ["/placement", "/internships", "/scholarships", "/leaderboard", "/alumni", "/accreditation"] },
  { label: "Finance & Admin", items: ["/fees", "/broadcast", "/settings"] },
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
        sm:hidden
      `}
    >
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary">
          <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold tracking-tight truncate">CollegeHub</h1>
          <p className="text-xs text-sidebar-accent-foreground/60 truncate">Management System</p>
        </div>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          className="rounded-lg p-2 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.filter((item) => canAccessRoute(user?.role, item.to)).map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all truncate ${isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate flex-1">{item.label}</span>
              {"badge" in item && item.badge && (
                <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            {user?.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
          </div>
          <button aria-label="Log out" onClick={logout} className="rounded-lg p-2 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
