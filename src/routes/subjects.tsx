import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { SUBJECTS } from "@/lib/college-data";
import { BookOpen, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/subjects")({
  component: SubjectsPage,
});

const subjectDetails = [
  { name: "Data Structures", code: "CS301", credits: 4, teacher: "Prof. Gupta", students: 45, schedule: "Mon, Wed, Fri — 10:00 AM" },
  { name: "Operating Systems", code: "CS302", credits: 4, teacher: "Dr. Sharma", students: 42, schedule: "Tue, Thu — 11:00 AM" },
  { name: "DBMS", code: "CS303", credits: 3, teacher: "Prof. Mishra", students: 40, schedule: "Mon, Wed — 2:00 PM" },
  { name: "Computer Networks", code: "CS304", credits: 3, teacher: "Dr. Verma", students: 38, schedule: "Tue, Thu — 3:00 PM" },
  { name: "Mathematics", code: "MA201", credits: 4, teacher: "Prof. Rao", students: 50, schedule: "Mon, Wed, Fri — 9:00 AM" },
];

function SubjectsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Subjects</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Manage courses and subjects</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {subjectDetails.map((subj) => (
          <Card key={subj.code} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">{subj.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{subj.code} • {subj.credits} Credits</p>
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Teacher:</span> {subj.teacher}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {subj.students} students
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {subj.schedule}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
