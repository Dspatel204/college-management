import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
