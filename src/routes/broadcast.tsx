import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getBroadcastAlerts,
  sendBroadcastAlert,
  getAIStudentAnalytics,
  type Student,
} from "@/lib/api";
import {
  type BroadcastAlert,
  DEPARTMENTS,
} from "@/lib/college-data";
import {
  Radio,
  Send,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Users,
  Clock,
  Sparkles,
  ShieldAlert,
  BellRing,
  CheckCheck,
  Loader2,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/broadcast")({
  component: BroadcastPage,
});

function BroadcastPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<BroadcastAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Form State
  const [title, setTitle] = useState("Low Attendance Shortage Warning");
  const [category, setCategory] = useState<BroadcastAlert["category"]>("attendance");
  const [targetAudience, setTargetAudience] = useState<BroadcastAlert["targetAudience"]>("low_attendance");
  const [subject, setSubject] = useState("Urgent: Mandatory Attendance Threshold Notice");
  const [message, setMessage] = useState(
    "Dear Student/Parent, This is an official notice that your current attendance is below the mandatory 75% minimum threshold. Kindly meet your Department Head immediately to avoid exam debarment."
  );
  const [channels, setChannels] = useState<{ whatsapp: boolean; sms: boolean; email: boolean }>({
    whatsapp: true,
    sms: true,
    email: true,
  });

  // Preview Channel Tab
  const [previewTab, setPreviewTab] = useState<"whatsapp" | "sms" | "email">("whatsapp");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getBroadcastAlerts();
      setAlerts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const applyTemplate = (type: string) => {
    if (type === "attendance") {
      setTitle("Low Attendance Shortage Warning");
      setCategory("attendance");
      setTargetAudience("low_attendance");
      setSubject("Urgent: Mandatory Attendance Threshold Notice");
      setMessage(
        "Dear Student/Parent, This is an official notice that your current attendance is below the mandatory 75% minimum threshold. Kindly meet your Department Head immediately to avoid exam debarment."
      );
    } else if (type === "fee") {
      setTitle("Semester Tuition Fee Due Reminder");
      setCategory("fee");
      setTargetAudience("fee_pending");
      setSubject("Reminder: Semester Fee Payment Deadline");
      setMessage(
        "Dear Student, Please clear your pending semester fees before the 25th of this month to avoid late fee penalties and admit card hold."
      );
    } else if (type === "exam") {
      setTitle("Semester End Exam Hall Tickets Published");
      setCategory("exam");
      setTargetAudience("all");
      setSubject("Notification: Download Exam Admit Cards");
      setMessage(
        "Dear Student, Examination Hall Tickets for the upcoming semester finals are now available on the CollegeHub Digital Credentials portal. Please download and print your copy."
      );
    } else if (type === "placement") {
      setTitle("Google Cloud Campus Recruitment Drive");
      setCategory("placement");
      setTargetAudience("final_year");
      setSubject("Campus Recruitment: Google Cloud Associate Engineer");
      setMessage(
        "Eligible Final Year engineering candidates (CGPA >= 8.0, zero active backlogs) are invited to register for the Google Cloud campus drive on the Placement Portal."
      );
    }
  };

  const handleSendBroadcast = async () => {
    if (!title || !message) return;
    setSending(true);
    const selectedChannels = (Object.keys(channels) as ("whatsapp" | "sms" | "email")[]).filter(
      (k) => channels[k]
    );

    try {
      const created = await sendBroadcastAlert({
        title,
        category,
        subject,
        message,
        targetAudience,
        channels: selectedChannels.length ? selectedChannels : ["email"],
        recipientCount: targetAudience === "all" ? 120 : targetAudience === "low_attendance" ? 28 : 45,
      });

      setAlerts([created, ...alerts]);
      showToast(`Broadcast sent successfully to ${created.sentCount} recipients across ${selectedChannels.join(", ").toUpperCase()}!`);
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Automated Multi-Channel Alert & Broadcast Center</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Radio className="h-3 w-3" /> Live Dispatcher
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Send instant multi-channel notifications (WhatsApp, SMS, Email) for low attendance, fee clearance, and campus drives.
          </p>
        </div>
      </div>

      {toastMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" /> {toastMsg}
        </div>
      )}

      {/* Quick Trigger Preset Buttons */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-muted-foreground">Quick Triggers:</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyTemplate("attendance")}
          className="h-8 gap-1 text-xs"
        >
          <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> Low Attendance Warning
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyTemplate("fee")}
          className="h-8 gap-1 text-xs"
        >
          <BellRing className="h-3.5 w-3.5 text-amber-500" /> Fee Due Reminder
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyTemplate("exam")}
          className="h-8 gap-1 text-xs"
        >
          <Calendar className="h-3.5 w-3.5 text-blue-500" /> Exam Hall Tickets
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyTemplate("placement")}
          className="h-8 gap-1 text-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-500" /> Placement Drive Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: COMPOSE ALERT */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Compose Notification</CardTitle>
              <CardDescription>Select target recipients and dispatch channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold">Alert Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g. Attendance Shortage Notice"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Target Audience</label>
                  <Select
                    value={targetAudience}
                    onValueChange={(val: any) => setTargetAudience(val)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low_attendance">Low Attendance (&lt; 75% Students)</SelectItem>
                      <SelectItem value="fee_pending">Fee Pending Students</SelectItem>
                      <SelectItem value="final_year">Final Year Placement Students</SelectItem>
                      <SelectItem value="all">All Enrolled Students &amp; Guardians</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold">Email / Notification Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject line..."
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Message Body</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Write message content here..."
                  className="mt-1"
                />
              </div>

              {/* Delivery Channels */}
              <div>
                <label className="text-xs font-semibold mb-2 block">Delivery Channels:</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.whatsapp}
                      onChange={(e) => setChannels({ ...channels, whatsapp: e.target.checked })}
                      className="rounded text-primary h-4 w-4"
                    />
                    <MessageSquare className="h-4 w-4 text-emerald-500" /> WhatsApp Message
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                      className="rounded text-primary h-4 w-4"
                    />
                    <Smartphone className="h-4 w-4 text-blue-500" /> SMS Text Alert
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.email}
                      onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                      className="rounded text-primary h-4 w-4"
                    />
                    <Mail className="h-4 w-4 text-purple-500" /> Official Email
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleSendBroadcast}
                  disabled={sending || !title || !message}
                  className="gap-2 w-full sm:w-auto"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Dispatch Broadcast Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: MULTI-CHANNEL PREVIEW */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4 text-primary" /> Live Channel Preview
                </CardTitle>
                <div className="flex gap-1 bg-muted p-0.5 rounded-md">
                  <button
                    onClick={() => setPreviewTab("whatsapp")}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                      previewTab === "whatsapp" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setPreviewTab("sms")}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                      previewTab === "sms" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    SMS
                  </button>
                  <button
                    onClick={() => setPreviewTab("email")}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                      previewTab === "email" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Email
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* WhatsApp Simulator */}
              {previewTab === "whatsapp" && (
                <div className="rounded-xl bg-[#e5ddd5] dark:bg-zinc-900 border p-3.5 space-y-2 shadow-inner">
                  <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      CH
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">CollegeHub Official</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Verified Institution</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white dark:bg-zinc-800 p-3 shadow-xs text-xs space-y-1.5 text-zinc-900 dark:text-zinc-100 max-w-[90%] ml-auto">
                    <p className="font-bold text-primary">{title}</p>
                    <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{message}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-muted-foreground pt-1">
                      <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      <CheckCheck className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* SMS Simulator */}
              {previewTab === "sms" && (
                <div className="rounded-xl bg-muted/40 border p-4 space-y-3">
                  <div className="text-center">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] text-muted-foreground">
                      SMS • Today {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="rounded-2xl bg-blue-600 text-white p-3 text-xs leading-relaxed max-w-[85%] ml-auto shadow">
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-[11px] opacity-95">{message}</p>
                  </div>
                </div>
              )}

              {/* Email Simulator */}
              {previewTab === "email" && (
                <div className="rounded-xl border bg-card p-4 space-y-3 text-xs shadow-xs">
                  <div className="border-b pb-2 space-y-1 text-muted-foreground text-[11px]">
                    <div><strong className="text-foreground">From:</strong> CollegeHub Administration &lt;alerts@college.edu&gt;</div>
                    <div><strong className="text-foreground">Subject:</strong> {subject}</div>
                  </div>
                  <div className="space-y-2 text-foreground">
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">{message}</p>
                    <div className="border-t pt-3 mt-4 text-[10px] text-muted-foreground">
                      CollegeHub Academic Management System • Automated Notification Service
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RECENT BROADCAST LOGS */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Dispatched Broadcasts</CardTitle>
          <CardDescription>Archive of sent automated notices and recipient counts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Target Group</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead className="text-center">Delivered</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((al) => (
                  <TableRow key={al.id}>
                    <TableCell className="font-medium text-xs">{al.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {al.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground capitalize">
                      {al.targetAudience.replace("_", " ")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {al.channels.map((ch) => (
                          <span key={ch} className="rounded bg-muted px-1.5 py-0.5 text-[9px] uppercase font-bold text-muted-foreground">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-xs">
                      {al.sentCount} recipients
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{al.createdAt}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-600 text-white text-[10px]">
                        {al.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
