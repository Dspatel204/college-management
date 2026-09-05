import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  getNaacCriteria,
  updateNaacCriteriaScore,
} from "@/lib/api";
import {
  type NaacCriteriaScore,
} from "@/lib/college-data";
import {
  Landmark,
  Award,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Printer,
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  Building2,
  FileText,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export const Route = createFileRoute("/accreditation")({
  component: AccreditationPage,
});

function AccreditationPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [criteriaList, setCriteriaList] = useState<NaacCriteriaScore[]>([]);
  const [reportModal, setReportModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getNaacCriteria();
      setCriteriaList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const totalWeightage = criteriaList.reduce((s, c) => s + c.weightage, 0);
  const totalScore = criteriaList.reduce((s, c) => s + c.scoreObtained, 0);
  const naacCgpa = (totalScore / totalWeightage) * 4.0;

  const radarData = criteriaList.map((c) => ({
    criteria: `Criteria ${c.criteriaNumber}`,
    score: Math.round((c.scoreObtained / c.weightage) * 100),
    fullMark: 100,
  }));

  const nirfParameters = [
    { code: "TLR", name: "Teaching, Learning & Resources (Student-Faculty Ratio, PhD faculty)", weight: 30, score: 27.5, max: 30 },
    { code: "RPC", name: "Research & Professional Practice (Publications, Patents, FDP)", weight: 30, score: 25.8, max: 30 },
    { code: "GO", name: "Graduation Outcomes (Placement %, Median Salary ₹12.8L, Higher Studies)", weight: 20, score: 18.2, max: 20 },
    { code: "OI", name: "Outreach & Inclusivity (Girls 42%, EWS Freeships, Diversity)", weight: 10, score: 9.4, max: 10 },
    { code: "PR", name: "Peer Perception (Academic & Employer Survey Standing)", weight: 10, score: 8.6, max: 10 },
  ];

  const nirfComposite = nirfParameters.reduce((s, p) => s + p.score, 0).toFixed(1);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">National Accreditation &amp; NIRF Compliance Hub</h1>
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 gap-1">
              <Landmark className="h-3 w-3" /> NAAC Grade A++ (CGPA {naacCgpa.toFixed(2)})
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Official compliance matrix for UGC, NAAC 7-Criteria, NIRF All India Rankings, and AICTE Annual Quality Assurance Reports (AQAR).
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => window.print()} className="gap-2">
            <Printer className="h-4 w-4" /> Print SSR / AQAR Report
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Institutional Standing KPI Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-background to-background">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">NAAC Accreditation</span>
                  <Award className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-2xl font-extrabold text-foreground">Grade A++</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">CGPA {naacCgpa.toFixed(2)} / 4.00</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-background to-background">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">NIRF Ranking Score</span>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
                <div className="mt-2 text-2xl font-extrabold text-foreground">{nirfComposite} / 100</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">All India Rank Band: 51–100</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-background to-background">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Student-Faculty Ratio</span>
                  <Users className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="mt-2 text-2xl font-extrabold text-foreground">1 : 15.2</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Complies with UGC / AICTE Norm</p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-background to-background">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">PhD Faculty Ratio</span>
                  <GraduationCap className="h-4 w-4 text-purple-500" />
                </div>
                <div className="mt-2 text-2xl font-extrabold text-foreground">72.4%</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Doctorate Qualified Professors</p>
              </CardContent>
            </Card>
          </div>

          {/* NAAC Radar & Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">NAAC 7 Criteria Quality Radar</CardTitle>
                <CardDescription>Institutional score distribution across all mandatory evaluation pillars</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="criteria" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} />
                      <Radar
                        name="Compliance %"
                        dataKey="score"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center text-xs text-muted-foreground pt-2 border-t">
                  Overall Compliance: <strong className="text-emerald-600 font-bold">{Math.round((totalScore / totalWeightage) * 100)}%</strong> • Institutional Status: <strong className="text-amber-600 font-bold">Autonomous Category-1</strong>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-7">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">NIRF India Rankings Parameter Index</CardTitle>
                <CardDescription>Ministry of Education (MoE) 5-dimension benchmark weights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {nirfParameters.map((param) => (
                  <div key={param.code} className="space-y-1 rounded-lg bg-muted/40 p-3 border">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{param.code} • {param.name}</span>
                      <span className="text-primary font-bold">{param.score} / {param.max}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(param.score / param.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* NAAC 7-CRITERIA DETAILED SCORECARD */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">NAAC 7-Criteria Institutional Scorecard (SSR Evaluation)</CardTitle>
              <CardDescription>Official Self-Study Report (SSR) score breakdown validated for NAAC Peer Team Visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Criteria</TableHead>
                      <TableHead>Evaluation Dimension</TableHead>
                      <TableHead className="text-center">Weightage</TableHead>
                      <TableHead className="text-center">Score Obtained</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead>Key Compliance Indicators</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {criteriaList.map((c) => (
                      <TableRow key={c.criteriaNumber}>
                        <TableCell className="font-bold text-xs text-center font-mono">
                          Cr. {c.criteriaNumber}
                        </TableCell>
                        <TableCell className="font-semibold text-xs text-foreground">
                          {c.title}
                        </TableCell>
                        <TableCell className="text-center text-xs font-mono">{c.weightage}</TableCell>
                        <TableCell className="text-center font-bold text-xs text-primary font-mono">
                          {c.scoreObtained}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              c.grade === "A++"
                                ? "bg-amber-500 text-white"
                                : c.grade === "A+"
                                ? "bg-emerald-600 text-white"
                                : "bg-blue-600 text-white"
                            }
                          >
                            {c.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1.5">
                            {c.keyMetrics.map((km, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] font-medium"
                              >
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                {km.label}: <strong>{km.value}</strong>
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
