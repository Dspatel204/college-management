import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, Plus, Pin, Trash2, Calendar, Eye } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  category: "general" | "academic" | "exam" | "event" | "urgent";
  postedBy: string;
  date: string;
  pinned: boolean;
  audience: "all" | "students" | "faculty";
}

const INITIAL_NOTICES: Notice[] = [
  { id: "n1", title: "Mid-Term Examination Schedule Released", content: "The mid-term examination for all departments will commence from April 15, 2024. Students are advised to collect their hall tickets from the examination cell. Bring your college ID card for verification.", category: "exam", postedBy: "Admin", date: "2024-03-25", pinned: true, audience: "all" },
  { id: "n2", title: "Annual Sports Day — Registration Open", content: "Annual Sports Day will be held on May 5th. Interested students can register at the sports department before April 20th. Events include: Athletics, Cricket, Basketball, Volleyball, Badminton.", category: "event", postedBy: "Sports Dept", date: "2024-03-22", pinned: true, audience: "students" },
  { id: "n3", title: "Library Timing Change", content: "From April 1st, the central library will remain open from 8:00 AM to 9:00 PM on all working days. Weekend hours: 9:00 AM to 5:00 PM.", category: "general", postedBy: "Librarian", date: "2024-03-20", pinned: false, audience: "all" },
  { id: "n4", title: "Faculty Meeting — April 2nd", content: "All faculty members are requested to attend the monthly faculty meeting on April 2nd at 3:00 PM in the Conference Hall. Agenda: Curriculum review and semester planning.", category: "academic", postedBy: "HOD", date: "2024-03-18", pinned: false, audience: "faculty" },
  { id: "n5", title: "Fee Payment Deadline Extended", content: "The last date for fee payment for the current semester has been extended to April 10th. Students with pending fees should clear their dues immediately to avoid late fee charges.", category: "urgent", postedBy: "Accounts Dept", date: "2024-03-15", pinned: false, audience: "students" },
  { id: "n6", title: "Workshop on Machine Learning", content: "A 3-day workshop on Machine Learning & AI will be conducted from April 8-10. Registration fee: ₹500. Limited seats available. Register at the CS Department.", category: "event", postedBy: "CS Department", date: "2024-03-12", pinned: false, audience: "all" },
];

export const Route = createFileRoute("/notices")({
  component: NoticesPage,
});

function NoticesPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addDialog, setAddDialog] = useState(false);
  const [viewNotice, setViewNotice] = useState<Notice | null>(null);
  const [form, setForm] = useState({ title: "", content: "", category: "general" as Notice["category"], audience: "all" as Notice["audience"] });

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const isAdmin = user?.role === "admin";

  const filtered = notices
    .filter(n => categoryFilter === "all" || n.category === categoryFilter)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleAdd = () => {
    if (!form.title || !form.content) return;
    const newNotice: Notice = {
      id: `n${Date.now()}`,
      title: form.title,
      content: form.content,
      category: form.category,
      postedBy: user?.name || "Admin",
      date: new Date().toISOString().split("T")[0],
      pinned: false,
      audience: form.audience,
    };
    setNotices([newNotice, ...notices]);
    setAddDialog(false);
    setForm({ title: "", content: "", category: "general", audience: "all" });
  };

  const togglePin = (id: string) => {
    setNotices(notices.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const categoryColors: Record<string, string> = {
    general: "bg-info/10 text-info border-info/20",
    academic: "bg-primary/10 text-primary border-primary/20",
    exam: "bg-warning/10 text-warning border-warning/20",
    event: "bg-success/10 text-success border-success/20",
    urgent: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notice Board</h1>
          <p className="text-sm text-muted-foreground">Announcements & notifications</p>
        </div>
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
          {isAdmin && <Button onClick={() => setAddDialog(true)} className="gap-2"><Plus className="h-4 w-4" /> Post Notice</Button>}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(notice => (
          <Card key={notice.id} className={`border-0 shadow-md transition-shadow hover:shadow-lg ${notice.pinned ? "ring-2 ring-primary/20" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {notice.pinned && <Pin className="h-4 w-4 text-primary" />}
                    <h3 className="font-semibold text-foreground">{notice.title}</h3>
                    <Badge variant="outline" className={categoryColors[notice.category]}>{notice.category}</Badge>
                    {notice.audience !== "all" && <Badge variant="secondary" className="text-xs">{notice.audience}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{notice.content}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{notice.date}</span>
                    <span>Posted by: {notice.postedBy}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setViewNotice(notice)} className="h-8 px-2"><Eye className="h-3.5 w-3.5" /></Button>
                  {isAdmin && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => togglePin(notice.id)} className="h-8 px-2"><Pin className={`h-3.5 w-3.5 ${notice.pinned ? "text-primary" : ""}`} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteNotice(notice.id)} className="h-8 px-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Notice */}
      <Dialog open={!!viewNotice} onOpenChange={() => setViewNotice(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5" />{viewNotice?.title}</DialogTitle></DialogHeader>
          {viewNotice && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="outline" className={categoryColors[viewNotice.category]}>{viewNotice.category}</Badge>
                <Badge variant="secondary">{viewNotice.audience}</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{viewNotice.content}</p>
              <div className="text-xs text-muted-foreground border-t border-border pt-3">
                <p>Posted by: {viewNotice.postedBy}</p>
                <p>Date: {viewNotice.date}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Notice */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Post New Notice</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Title *</label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Notice title" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Content *</label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Write notice content..." rows={5}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v as Notice["category"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Audience</label>
                <Select value={form.audience} onValueChange={v => setForm({ ...form, audience: v as Notice["audience"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Everyone</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="faculty">Faculty Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full">Post Notice</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
