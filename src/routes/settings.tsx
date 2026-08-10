import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User, Building2, Calendar, Shield, Bell } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [collegeName, setCollegeName] = useState("CollegeHub Engineering College");
  const [collegeCode, setCollegeCode] = useState("CHE-2024");
  const [academicYear, setAcademicYear] = useState("2024-25");
  const [currentSemester, setCurrentSemester] = useState("Even");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [attendanceAlert, setAttendanceAlert] = useState(true);
  const [feeReminder, setFeeReminder] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const isAdmin = user.role === "admin";

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Manage profile, college, and system settings</p>
      </div>

      <Tabs defaultValue="profile" className="max-w-3xl">
        <TabsList className="w-full sm:w-auto flex-wrap">
          <TabsTrigger value="profile" className="gap-1.5 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><User className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Profile</TabsTrigger>
          {isAdmin && <TabsTrigger value="college" className="gap-1.5 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> College</TabsTrigger>}
          {isAdmin && <TabsTrigger value="academic" className="gap-1.5 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Academic</TabsTrigger>}
          <TabsTrigger value="notifications" className="gap-1.5 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="security" className="gap-1.5 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"><Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Security</TabsTrigger>}
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base sm:text-lg">Profile Information</CardTitle></CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary text-base sm:text-lg font-bold text-primary-foreground">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">{user.name}</h3>
                    <Badge variant="secondary" className="capitalize text-xs">{user.role}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Full Name</label><Input defaultValue={user.name} /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Email</label><Input defaultValue={user.email} type="email" /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Phone</label><Input placeholder="Enter phone number" /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Role</label><Input defaultValue={user.role} disabled className="capitalize" /></div>
                </div>
                <Button onClick={handleSave} className="w-full sm:w-auto text-xs sm:text-sm">{saved ? "Saved ✓" : "Save Changes"}</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base sm:text-lg">Change Password</CardTitle></CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div><label className="text-xs sm:text-sm font-medium text-foreground">Current Password</label><Input type="password" placeholder="••••••••" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">New Password</label><Input type="password" placeholder="••••••••" /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Confirm Password</label><Input type="password" placeholder="••••••••" /></div>
                </div>
                <Button className="w-full sm:w-auto text-xs sm:text-sm">Update Password</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* College Branding */}
        {isAdmin && (
          <TabsContent value="college">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base sm:text-lg">College Branding</CardTitle></CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div><label className="text-xs sm:text-sm font-medium text-foreground">College Name</label><Input value={collegeName} onChange={e => setCollegeName(e.target.value)} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">College Code</label><Input value={collegeCode} onChange={e => setCollegeCode(e.target.value)} /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Affiliation</label><Input defaultValue="State University" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Address</label><Input defaultValue="123 College Road, City" /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Phone</label><Input defaultValue="+91 1234567890" /></div>
                </div>
                <div><label className="text-xs sm:text-sm font-medium text-foreground">Website</label><Input defaultValue="https://collegehub.edu.in" /></div>
                <Button onClick={handleSave} className="w-full sm:w-auto text-xs sm:text-sm">{saved ? "Saved ✓" : "Save Branding"}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Academic Year */}
        {isAdmin && (
          <TabsContent value="academic">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base sm:text-lg">Academic Year Setup</CardTitle></CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground">Academic Year</label>
                    <Select value={academicYear} onValueChange={setAcademicYear}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2025-26">2025-26</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-foreground">Current Semester</label>
                    <Select value={currentSemester} onValueChange={setCurrentSemester}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Odd">Odd (Jul-Dec)</SelectItem>
                        <SelectItem value="Even">Even (Jan-Jun)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Semester Start</label><Input type="date" defaultValue="2024-01-15" /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Semester End</label><Input type="date" defaultValue="2024-06-30" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Exam Start</label><Input type="date" defaultValue="2024-04-15" /></div>
                  <div><label className="text-xs sm:text-sm font-medium text-foreground">Result Declaration</label><Input type="date" defaultValue="2024-05-30" /></div>
                </div>
                <Button onClick={handleSave} className="w-full sm:w-auto text-xs sm:text-sm">{saved ? "Saved ✓" : "Save Academic Settings"}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="text-base sm:text-lg">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-xs sm:text-sm font-medium text-foreground">Email Notifications</p><p className="text-[10px] sm:text-xs text-muted-foreground">Receive updates via email</p></div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-xs sm:text-sm font-medium text-foreground">SMS Notifications</p><p className="text-[10px] sm:text-xs text-muted-foreground">Get SMS alerts for important updates</p></div>
                <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-xs sm:text-sm font-medium text-foreground">Low Attendance Alerts</p><p className="text-[10px] sm:text-xs text-muted-foreground">Alert when student attendance drops below 75%</p></div>
                <Switch checked={attendanceAlert} onCheckedChange={setAttendanceAlert} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-xs sm:text-sm font-medium text-foreground">Fee Payment Reminders</p><p className="text-[10px] sm:text-xs text-muted-foreground">Remind students about pending fees</p></div>
                <Switch checked={feeReminder} onCheckedChange={setFeeReminder} />
              </div>
              <Button onClick={handleSave} className="w-full sm:w-auto text-xs sm:text-sm">{saved ? "Saved ✓" : "Save Preferences"}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        {isAdmin && (
          <TabsContent value="security">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base sm:text-lg">Role-Based Permissions</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="rounded-lg border border-border p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <h4 className="text-xs sm:text-sm font-medium text-foreground">Admin</h4>
                      <Badge className="bg-destructive/10 text-destructive text-[10px] sm:text-xs">Full Access</Badge>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Can manage all modules: students, faculty, fees, exams, reports, settings, and system configuration.</p>
                  </div>
                  <div className="rounded-lg border border-border p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <h4 className="text-xs sm:text-sm font-medium text-foreground">Faculty</h4>
                      <Badge className="bg-warning/10 text-warning text-[10px] sm:text-xs">Limited Access</Badge>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Can mark attendance, enter marks & grades, view student profiles, and manage assigned courses.</p>
                  </div>
                  <div className="rounded-lg border border-border p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <h4 className="text-xs sm:text-sm font-medium text-foreground">Student</h4>
                      <Badge className="bg-info/10 text-info text-[10px] sm:text-xs">View Only</Badge>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Can view own attendance, results, fee status, notices, and course details. Cannot modify any data.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </DashboardLayout>
  );
}
