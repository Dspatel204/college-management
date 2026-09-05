import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getAIStudentAnalytics,
  askAICollegeHub,
  type AIStudentMetric,
  type Student,
} from "@/lib/api";
import { DEPARTMENTS } from "@/lib/college-data";
import {
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Award,
  TrendingUp,
  Search,
  Bot,
  ArrowRight,
  BrainCircuit,
  Eye,
  Send,
  Loader2,
  CheckCircle2,
  FileText,
  UserCheck,
  Flame,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export const Route = createFileRoute("/ai-insights")({
  component: AIInsightsPage,
});

function AIInsightsPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<AIStudentMetric[]>([]);
  const [overview, setOverview] = useState<any>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");

  // 360 Dossier Modal
  const [selectedMetric, setSelectedMetric] = useState<AIStudentMetric | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // AI Assistant Box
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAIStudentAnalytics();
      setMetrics(data.metrics);
      setOverview(data.overview);
    } catch (e) {
      console.error("Failed to load AI analytics:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = async (queryText?: string) => {
    const textToQuery = queryText || aiQuery;
    if (!textToQuery.trim()) return;
    setAiLoading(true);
    try {
      const res = await askAICollegeHub(textToQuery);
      setAiResponse(res);
    } catch (e) {
      console.error("AI Query failed:", e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAction = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  if (!isAuthenticated) return null;

  const filteredMetrics = metrics.filter((m) => {
    const matchSearch =
      m.student.name.toLowerCase().includes(search.toLowerCase()) ||
      m.student.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || m.student.department === deptFilter;
    const matchRisk =
      riskFilter === "all" ||
      (riskFilter === "high" && m.riskLevel === "High Risk") ||
      (riskFilter === "moderate" && m.riskLevel === "Moderate Risk") ||
      (riskFilter === "safe" && m.riskLevel === "Safe / Good Standing") ||
      (riskFilter === "top" && m.riskLevel === "Top Performer");
    return matchSearch && matchDept && matchRisk;
  });

  const riskDistributionData = [
    { name: "High Risk", count: overview?.highRiskCount || 0, color: "hsl(0, 70%, 55%)" },
    { name: "Moderate", count: overview?.moderateRiskCount || 0, color: "hsl(38, 92%, 50%)" },
    { name: "Safe", count: overview?.safeCount || 0, color: "hsl(145, 60%, 45%)" },
    { name: "Top Performer", count: overview?.topPerformerCount || 0, color: "hsl(217, 91%, 60%)" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Academic Intelligence & Early Warning Hub</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Sparkles className="h-3 w-3" /> Predictive AI 2.0
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time dropout risk prediction, 360° student dossiers, and proactive remedial recommendations
          </p>
        </div>
        <Button onClick={() => navigate({ to: "/broadcast" })} variant="outline" className="gap-2">
          <Send className="h-4 w-4" /> Broadcast Alerts
        </Button>
      </div>

      {actionSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" /> {actionSuccess}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-red-600 dark:text-red-400">High Risk (At Risk)</span>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">{overview?.highRiskCount}</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Attendance &lt; 75% or Low Marks</p>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Moderate Risk</span>
                  <Flame className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">{overview?.moderateRiskCount}</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Needs Faculty Monitoring</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Safe Standing</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{overview?.safeCount}</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Consistent Progress</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Top Performers</span>
                  <Award className="h-4 w-4 text-blue-500" />
                </div>
                <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{overview?.topPerformerCount}</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Marks &ge; 85% &amp; Att &ge; 85%</p>
              </CardContent>
            </Card>

            <Card className="col-span-2 sm:col-span-4 lg:col-span-1 border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">Academic Health Index</span>
                  <BrainCircuit className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-2 text-2xl font-bold text-primary">84%</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">College-wide composite score</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive AI Query Box */}
          <Card className="border-primary/30 shadow-md bg-gradient-to-r from-primary/5 via-background to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-5 w-5 text-primary" /> Ask CollegeHub AI Copilot
              </CardTitle>
              <CardDescription>
                Ask questions in plain English to instantly analyze academic performance, attendance shortages, or fee bottlenecks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="E.g., Which students have attendance below 75%? Or Show top performers with zero fee dues"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                  disabled={aiLoading}
                  className="bg-background"
                />
                <Button onClick={() => handleAskAI()} disabled={aiLoading} className="gap-2 shrink-0">
                  {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Ask AI
                </Button>
              </div>

              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="text-muted-foreground self-center">Try:</span>
                {[
                  "Students with < 75% attendance",
                  "Students with pending fees",
                  "Academic Honors & Top performers",
                  "Placement eligible candidates",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setAiQuery(prompt);
                      handleAskAI(prompt);
                    }}
                    className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* AI Response Card */}
              {aiResponse && (
                <div className="rounded-lg border border-primary/20 bg-background/80 p-4 space-y-3 mt-3 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-sm space-y-2">
                      <p className="font-medium text-foreground">{aiResponse.answer}</p>
                      {aiResponse.actionSuggestion && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs text-muted-foreground">Recommended Action:</span>
                          <Badge variant="outline" className="text-primary border-primary/30">
                            {aiResponse.actionSuggestion}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {aiResponse.matchedStudents && aiResponse.matchedStudents.length > 0 && (
                    <div className="border-t pt-2 mt-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-1.5">Matched Students:</p>
                      <div className="flex flex-wrap gap-2">
                        {aiResponse.matchedStudents.map((st: Student) => (
                          <div
                            key={st.id}
                            className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs"
                          >
                            <span className="font-medium">{st.name}</span>
                            <span className="text-[10px] text-muted-foreground">({st.rollNo})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Matrix & 360 Student Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-lg">Student 360° Risk Matrix</CardTitle>
                  <CardDescription>Multi-factor predictive scoring based on attendance, academic exams, and fee clearance</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative w-48">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search student..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 h-9 text-xs"
                    />
                  </div>
                  <Select value={deptFilter} onValueChange={setDeptFilter}>
                    <SelectTrigger className="w-36 h-9 text-xs">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Depts</SelectItem>
                      {DEPARTMENTS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger className="w-36 h-9 text-xs">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="moderate">Moderate Risk</SelectItem>
                      <SelectItem value="safe">Safe Standing</SelectItem>
                      <SelectItem value="top">Top Performers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-center">Attendance %</TableHead>
                      <TableHead className="text-center">Academic Avg</TableHead>
                      <TableHead className="text-center">Fee Status</TableHead>
                      <TableHead>Predictive Risk Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMetrics.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground text-sm">
                          No students match the selected risk filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMetrics.map((m) => (
                        <TableRow key={m.student.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {m.student.avatar || m.student.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium text-sm text-foreground">{m.student.name}</div>
                                <div className="text-[11px] text-muted-foreground">{m.student.rollNo}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{m.student.department} (Sem {m.student.semester})</TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`font-semibold text-xs ${
                                m.attendanceRate < 75 ? "text-red-500 font-bold" : "text-foreground"
                              }`}
                            >
                              {m.attendanceRate}%
                            </span>
                          </TableCell>
                          <TableCell className="text-center font-medium text-xs">
                            {m.avgMarks}%
                          </TableCell>
                          <TableCell className="text-center">
                            {m.feeDue > 0 ? (
                              <Badge variant="outline" className="text-red-500 border-red-500/30 text-[10px]">
                                Due ₹{m.feeDue.toLocaleString("en-IN")}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 text-[10px]">
                                Paid
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {m.riskLevel === "High Risk" && (
                                <Badge className="bg-red-500 text-white hover:bg-red-600 gap-1 text-[11px]">
                                  <AlertTriangle className="h-3 w-3" /> High Risk ({m.riskScore}%)
                                </Badge>
                              )}
                              {m.riskLevel === "Moderate Risk" && (
                                <Badge className="bg-amber-500 text-white hover:bg-amber-600 text-[11px]">
                                  Moderate ({m.riskScore}%)
                                </Badge>
                              )}
                              {m.riskLevel === "Safe / Good Standing" && (
                                <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 text-[11px]">
                                  Safe Standing
                                </Badge>
                              )}
                              {m.riskLevel === "Top Performer" && (
                                <Badge className="bg-blue-600 text-white hover:bg-blue-700 gap-1 text-[11px]">
                                  <Award className="h-3 w-3" /> Top Performer
                                </Badge>
                              )}

                              {m.riskFactors.length > 0 && (
                                <p className="text-[10px] text-muted-foreground line-clamp-1">
                                  {m.riskFactors[0]}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedMetric(m)}
                              className="h-8 gap-1 text-xs"
                            >
                              <Eye className="h-3.5 w-3.5" /> 360° Dossier
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 360° Student Dossier Modal */}
      {selectedMetric && (
        <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                  {selectedMetric.student.avatar || selectedMetric.student.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    {selectedMetric.student.name}
                    {selectedMetric.riskLevel === "High Risk" && (
                      <Badge className="bg-red-500 text-white">High Risk</Badge>
                    )}
                    {selectedMetric.riskLevel === "Top Performer" && (
                      <Badge className="bg-blue-600 text-white">Top Performer</Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedMetric.student.rollNo} • {selectedMetric.student.department} • Semester {selectedMetric.student.semester}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              {/* Radar Chart & Key Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center rounded-lg border bg-muted/30 p-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={selectedMetric.radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} />
                      <Radar
                        name="Student Metric"
                        dataKey="score"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-muted-foreground">Attendance Rate:</span>
                    <span className="font-semibold">{selectedMetric.attendanceRate}% ({selectedMetric.presentClasses}/{selectedMetric.totalClasses} classes)</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-muted-foreground">Academic Average:</span>
                    <span className="font-semibold">{selectedMetric.avgMarks}%</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-muted-foreground">Fee Status:</span>
                    <span className="font-semibold">
                      {selectedMetric.feeDue > 0 ? `Pending ₹${selectedMetric.feeDue.toLocaleString("en-IN")}` : "Cleared (100%)"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-muted-foreground">Placement Eligibility:</span>
                    <span className="font-semibold">
                      {selectedMetric.placementEligibility ? "✅ Eligible" : "⚠️ Hold (Dues / Attendance)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guardian:</span>
                    <span className="font-medium">{selectedMetric.student.guardianName || "Not listed"} ({selectedMetric.student.guardianPhone || "N/A"})</span>
                  </div>
                </div>
              </div>

              {/* AI Risk Factors & Recommendations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Diagnostic Analysis & Recommendations
                </h4>

                {selectedMetric.riskFactors.length > 0 && (
                  <div className="rounded-lg bg-red-500/10 p-3 text-xs text-red-700 dark:text-red-300 border border-red-500/20 space-y-1">
                    <p className="font-semibold">Identified Risk Factors:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {selectedMetric.riskFactors.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-lg bg-primary/10 p-3 text-xs text-primary border border-primary/20 space-y-1">
                  <p className="font-semibold">Suggested Interventions:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {selectedMetric.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  onClick={() => {
                    handleAction(`Low attendance & progress alert dispatched to ${selectedMetric.student.guardianName || selectedMetric.student.name}`);
                    setSelectedMetric(null);
                  }}
                  className="gap-1.5 text-xs"
                >
                  <Send className="h-3.5 w-3.5" /> Send Guardian Alert
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleAction(`Remedial coaching session scheduled for ${selectedMetric.student.name}`);
                    setSelectedMetric(null);
                  }}
                  className="gap-1.5 text-xs"
                >
                  <UserCheck className="h-3.5 w-3.5" /> Assign Faculty Mentor
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedMetric(null)}
                  className="ml-auto text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
