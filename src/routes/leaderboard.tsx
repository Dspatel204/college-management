import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getLeaderboard,
  getBadges,
  awardBadgeToStudent,
  getStudents,
  type Student,
} from "@/lib/api";
import {
  type LeaderboardEntry,
  type BadgeItem,
  DEPARTMENTS,
} from "@/lib/college-data";
import {
  Trophy,
  Award,
  Flame,
  Zap,
  Sparkles,
  Crown,
  Medal,
  Star,
  Users,
  CheckCircle2,
  Plus,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [deptFilter, setDeptFilter] = useState("all");

  // Award Badge Dialog
  const [awardDialog, setAwardDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedBadgeId, setSelectedBadgeId] = useState("");
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
      const [lbData, bData, stData] = await Promise.all([
        getLeaderboard(),
        getBadges(),
        getStudents(),
      ]);
      setLeaderboard(lbData);
      setBadges(bData);
      setStudents(stData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAwardBadge = async () => {
    if (!selectedStudentId || !selectedBadgeId) return;
    try {
      await awardBadgeToStudent(selectedStudentId, selectedBadgeId);
      const updatedLb = await getLeaderboard();
      setLeaderboard(updatedLb);
      setAwardDialog(false);
      const st = students.find((s) => s.id === selectedStudentId);
      const b = badges.find((badge) => badge.id === selectedBadgeId);
      showToast(`Awarded "${b?.title}" to ${st?.name}! (+250 XP)`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return null;

  const filteredLeaderboard = leaderboard.filter((entry) => {
    const st = students.find((s) => s.id === entry.studentId);
    if (deptFilter === "all") return true;
    return st?.department === deptFilter;
  });

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const getStudent = (id?: string) => students.find((s) => s.id === id);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Student Gamification & Merit Leaderboard</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 gap-1">
              <Trophy className="h-3 w-3" /> Season XP Rewards
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Empowering student excellence through gamified XP points, attendance streaks, and verified co-curricular badges.
          </p>
        </div>

        {user?.role !== "student" && (
          <Button onClick={() => setAwardDialog(true)} className="gap-2">
            <Sparkles className="h-4 w-4" /> Award Achievement Badge
          </Button>
        )}
      </div>

      {toastMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" /> {toastMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* TOP 3 PODIUM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
            {/* Rank #2 */}
            {top2 && (
              <Card className="order-2 md:order-1 border-slate-300 dark:border-slate-700 bg-gradient-to-t from-slate-500/10 via-background to-background text-center shadow-md">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-300 text-slate-800 font-bold text-xl shadow-md border-2 border-slate-400">
                      {getStudent(top2.studentId)?.avatar || "S2"}
                    </div>
                    <div className="absolute -bottom-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-white font-bold text-xs shadow">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-base mt-2">{getStudent(top2.studentId)?.name}</h3>
                  <p className="text-xs text-muted-foreground">{getStudent(top2.studentId)?.department}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 font-bold text-xs text-foreground">
                      {top2.totalXp} XP • Lvl {top2.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                      <Flame className="h-3.5 w-3.5" /> {top2.attendanceStreak}d
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 italic">{top2.recentAchievement}</p>
                </CardContent>
              </Card>
            )}

            {/* Rank #1 (Champion) */}
            {top1 && (
              <Card className="order-1 md:order-2 border-amber-500/40 bg-gradient-to-t from-amber-500/15 via-background to-background text-center shadow-xl md:-translate-y-4">
                <CardContent className="p-6 flex flex-col items-center">
                  <Crown className="h-8 w-8 text-amber-500 animate-bounce mb-1" />
                  <div className="relative mb-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white font-extrabold text-2xl shadow-xl border-4 border-amber-300">
                      {getStudent(top1.studentId)?.avatar || "S1"}
                    </div>
                    <div className="absolute -bottom-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white font-extrabold text-sm shadow">
                      1
                    </div>
                  </div>
                  <h3 className="font-extrabold text-lg mt-2 text-foreground">{getStudent(top1.studentId)?.name}</h3>
                  <p className="text-xs text-muted-foreground">{getStudent(top1.studentId)?.department}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-amber-500/20 px-3.5 py-1 font-extrabold text-xs text-amber-600 dark:text-amber-400">
                      {top1.totalXp} XP • Grandmaster Lvl {top1.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Flame className="h-4 w-4" /> {top1.attendanceStreak}d Streak
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 font-medium">{top1.recentAchievement}</p>
                </CardContent>
              </Card>
            )}

            {/* Rank #3 */}
            {top3 && (
              <Card className="order-3 border-amber-800/30 bg-gradient-to-t from-amber-900/10 via-background to-background text-center shadow-md">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-700 text-white font-bold text-xl shadow-md border-2 border-amber-600">
                      {getStudent(top3.studentId)?.avatar || "S3"}
                    </div>
                    <div className="absolute -bottom-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white font-bold text-xs shadow">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-base mt-2">{getStudent(top3.studentId)?.name}</h3>
                  <p className="text-xs text-muted-foreground">{getStudent(top3.studentId)?.department}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-amber-900/20 px-3 py-1 font-bold text-xs text-foreground">
                      {top3.totalXp} XP • Lvl {top3.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                      <Flame className="h-3.5 w-3.5" /> {top3.attendanceStreak}d
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 italic">{top3.recentAchievement}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* TABS */}
          <Tabs defaultValue="rankings" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <TabsList>
                <TabsTrigger value="rankings" className="gap-1.5 text-xs">
                  <Trophy className="h-3.5 w-3.5" /> Full Leaderboard
                </TabsTrigger>
                <TabsTrigger value="badges" className="gap-1.5 text-xs">
                  <Award className="h-3.5 w-3.5" /> Achievement Badges ({badges.length})
                </TabsTrigger>
              </TabsList>

              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-44 h-8 text-xs">
                  <SelectValue placeholder="Department Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* TAB 1: FULL LEADERBOARD TABLE */}
            <TabsContent value="rankings">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16 text-center">Rank</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-center">Total XP</TableHead>
                        <TableHead className="text-center">Attendance Streak</TableHead>
                        <TableHead>Earned Badges</TableHead>
                        <TableHead>Recent Milestones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeaderboard.map((entry, index) => {
                        const st = getStudent(entry.studentId);
                        const isTop3 = index < 3;
                        return (
                          <TableRow key={entry.studentId} className={isTop3 ? "bg-muted/20 font-medium" : ""}>
                            <TableCell className="text-center font-bold">
                              {index === 0 ? "🥇 1" : index === 1 ? "🥈 2" : index === 2 ? "🥉 3" : `#${index + 1}`}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                  {st?.avatar || st?.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-sm">{st?.name}</div>
                                  <div className="text-[10px] text-muted-foreground">{st?.rollNo}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs">{st?.department} (Sem {st?.semester})</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="font-bold text-xs text-primary border-primary/30">
                                {entry.totalXp} XP (Lvl {entry.level})
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="flex items-center justify-center gap-1 text-xs font-bold text-amber-500">
                                <Flame className="h-3.5 w-3.5" /> {entry.attendanceStreak} days
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {entry.badges.map((bId) => {
                                  const b = badges.find((badge) => badge.id === bId);
                                  return (
                                    <span
                                      key={bId}
                                      title={`${b?.title}: ${b?.description}`}
                                      className="cursor-pointer rounded bg-muted p-1 text-base hover:scale-125 transition-transform"
                                    >
                                      {b?.icon || "🏅"}
                                    </span>
                                  );
                                })}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{entry.recentAchievement}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: BADGES REPOSITORY */}
            <TabsContent value="badges">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((b) => (
                  <Card key={b.id} className="border shadow-xs hover:border-primary/40 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{b.icon}</span>
                        <Badge
                          className={
                            b.rarity === "Legendary"
                              ? "bg-amber-500 text-white"
                              : b.rarity === "Diamond"
                              ? "bg-blue-600 text-white"
                              : b.rarity === "Gold"
                              ? "bg-yellow-600 text-white"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {b.rarity}
                        </Badge>
                      </div>
                      <CardTitle className="text-base mt-2">{b.title}</CardTitle>
                      <CardDescription className="text-xs">{b.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                        <span className="capitalize font-medium">Category: {b.category}</span>
                        <span className="font-semibold text-primary">+250 XP Award</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Award Badge Dialog */}
      <Dialog open={awardDialog} onOpenChange={setAwardDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Award Achievement Badge</DialogTitle>
            <DialogDescription>Select a deserving student and reward them with XP &amp; badge recognition</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold">Select Student</label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Choose student" /></SelectTrigger>
                <SelectContent>
                  {students.map((st) => (
                    <SelectItem key={st.id} value={st.id}>{st.name} ({st.rollNo})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold">Select Badge</label>
              <Select value={selectedBadgeId} onValueChange={setSelectedBadgeId}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Choose badge" /></SelectTrigger>
                <SelectContent>
                  {badges.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.icon} {b.title} ({b.rarity})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setAwardDialog(false)}>Cancel</Button>
              <Button onClick={handleAwardBadge} disabled={!selectedStudentId || !selectedBadgeId}>
                Award Badge (+250 XP)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
