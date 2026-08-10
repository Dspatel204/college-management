import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STUDENTS } from "@/lib/college-data";
import { MessageSquare, Send, Search } from "lucide-react";

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: "m1", from: "Dr. Sharma", to: "Rahul Kumar", content: "Please submit your assignment by Friday.", timestamp: "2024-03-25 10:30 AM", read: true },
  { id: "m2", from: "Prof. Gupta", to: "All CS Sem-4", content: "Tomorrow's Data Structures class will be held in Lab-1 instead of CS-101.", timestamp: "2024-03-25 09:15 AM", read: false },
  { id: "m3", from: "Rahul Kumar", to: "Prof. Gupta", content: "Sir, I have a doubt regarding linked list implementation. Can I visit during office hours?", timestamp: "2024-03-24 03:45 PM", read: true },
  { id: "m4", from: "Admin", to: "All", content: "College will remain closed on April 1st for Annual Day preparations.", timestamp: "2024-03-23 11:00 AM", read: true },
  { id: "m5", from: "Dr. Sharma", to: "All Faculty", content: "Faculty meeting scheduled for April 2nd at 3 PM. Attendance is mandatory.", timestamp: "2024-03-22 04:00 PM", read: false },
];

export const Route = createFileRoute("/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [search, setSearch] = useState("");
  const [newMsg, setNewMsg] = useState({ to: "", content: "" });
  const [composing, setComposing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const filtered = messages.filter(m =>
    m.content.toLowerCase().includes(search.toLowerCase()) ||
    m.from.toLowerCase().includes(search.toLowerCase()) ||
    m.to.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!newMsg.to || !newMsg.content) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      from: user?.name || "Unknown",
      to: newMsg.to,
      content: newMsg.content,
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    setMessages([msg, ...messages]);
    setNewMsg({ to: "", content: "" });
    setComposing(false);
  };

  const recipients = [
    "All", "All Students", "All Faculty",
    ...STUDENTS.map(s => s.name),
  ];

  return (
    <DashboardLayout>
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Internal communication system</p>
        </div>
        <Button onClick={() => setComposing(!composing)} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {composing ? "Cancel" : "New Message"}</Button>
      </div>

      {composing && (
        <Card className="mb-4 sm:mb-6 border-0 shadow-md">
          <CardHeader><CardTitle className="text-base sm:text-lg">Compose Message</CardTitle></CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">To</label>
              <select value={newMsg.to} onChange={e => setNewMsg({ ...newMsg, to: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
                <option value="">Select recipient</option>
                {recipients.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Message</label>
              <textarea value={newMsg.content} onChange={e => setNewMsg({ ...newMsg, content: e.target.value })}
                rows={4} placeholder="Type your message..."
                className="mt-1 w-full rounded-lg border border-input bg-background px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm" />
            </div>
            <Button onClick={handleSend} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Send Message</Button>
          </CardContent>
        </Card>
      )}

      <div className="mb-4 w-full">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-full" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(msg => (
          <Card key={msg.id} className={`border-0 shadow-sm hover:shadow-md transition-shadow ${!msg.read ? "ring-1 ring-primary/20" : ""}`}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{msg.from}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">→</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{msg.to}</span>
                    {!msg.read && <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5">New</Badge>}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground line-clamp-2">{msg.content}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">{msg.timestamp}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
