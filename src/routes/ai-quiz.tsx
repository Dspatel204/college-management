import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getQuizQuestions,
  generateAIQuestionPaper,
} from "@/lib/api";
import {
  SUBJECTS,
  type QuizQuestion,
} from "@/lib/college-data";
import {
  HelpCircle,
  Sparkles,
  FileText,
  Printer,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  BookOpen,
  GraduationCap,
  Loader2,
  BrainCircuit,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/ai-quiz")({
  component: AIQuizPage,
});

function AIQuizPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Tab 1: AI Question Paper State
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [semester, setSemester] = useState("4");
  const [totalMarks, setTotalMarks] = useState("100");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard" | "Balanced">("Balanced");
  const [generatedPaper, setGeneratedPaper] = useState<any>(null);

  // Tab 2: Timed Quiz State
  const [quizSubject, setQuizSubject] = useState(SUBJECTS[0]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [quizActive, setQuizActive] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadQuestions();
  }, [quizSubject]);

  useEffect(() => {
    let timer: any;
    if (quizActive && !quizSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && quizActive && !quizSubmitted) {
      setQuizSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [quizActive, quizSubmitted, timeLeft]);

  const loadQuestions = async () => {
    try {
      const qList = await getQuizQuestions(quizSubject);
      setQuestions(qList);
      setCurrentQIndex(0);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setTimeLeft(300);
      setQuizActive(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGeneratePaper = async () => {
    setLoading(true);
    try {
      const paper = await generateAIQuestionPaper({
        subject,
        semester: parseInt(semester),
        totalMarks: parseInt(totalMarks),
        difficulty,
      });
      setGeneratedPaper(paper);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optionIdx });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handlePrintPaper = () => {
    window.print();
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Question Paper &amp; Practice Quiz Engine</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Sparkles className="h-3 w-3" /> GenAI 2.0
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Generate printable university exam papers with Bloom&apos;s Taxonomy and simulate timed practice tests for students.
          </p>
        </div>
      </div>

      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-sm print:hidden">
          <TabsTrigger value="generator" className="gap-1.5 text-xs">
            <BrainCircuit className="h-3.5 w-3.5" /> AI Paper Builder
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" /> Practice Quiz Test
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: AI QUESTION PAPER GENERATOR */}
        <TabsContent value="generator" className="space-y-4">
          <Card className="print:hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Exam Blueprint Configuration
              </CardTitle>
              <CardDescription>Select academic parameters to instantly generate a balanced university examination paper.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-semibold">Subject</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="mt-1 h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold">Semester</label>
                  <Select value={semester} onValueChange={setSemester}>
                    <SelectTrigger className="mt-1 h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={String(sem)}>Semester {sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold">Total Marks</label>
                  <Select value={totalMarks} onValueChange={setTotalMarks}>
                    <SelectTrigger className="mt-1 h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 Marks (3 Hours)</SelectItem>
                      <SelectItem value="50">50 Marks (1.5 Hours)</SelectItem>
                      <SelectItem value="25">25 Marks (Mid-term)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold">Difficulty Weight</label>
                  <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                    <SelectTrigger className="mt-1 h-9 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Balanced">Balanced (Standard)</SelectItem>
                      <SelectItem value="Easy">Easy (Conceptual)</SelectItem>
                      <SelectItem value="Hard">Hard (Analytical)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={handleGeneratePaper} disabled={loading} className="gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Generate AI Question Paper
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* GENERATED PAPER PREVIEW */}
          {generatedPaper && (
            <div className="rounded-xl border bg-card p-8 shadow-lg print:border-none print:shadow-none space-y-6">
              <div className="flex justify-between items-center border-b pb-4 print:hidden">
                <span className="text-xs text-muted-foreground font-semibold uppercase">Official Examination Blueprint</span>
                <Button size="sm" onClick={handlePrintPaper} className="gap-1.5">
                  <Printer className="h-4 w-4" /> Print / Save Paper
                </Button>
              </div>

              {/* Header */}
              <div className="text-center space-y-1 border-b-2 border-primary pb-3">
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-7 w-7 text-primary" />
                  <h2 className="text-xl font-extrabold uppercase tracking-wide">CollegeHub Institute of Technology</h2>
                </div>
                <p className="text-xs font-semibold uppercase">{generatedPaper.paperTitle}</p>
                <div className="flex justify-between text-xs font-mono font-medium pt-2 text-muted-foreground">
                  <span>Semester: {generatedPaper.semester}</span>
                  <span>Duration: {generatedPaper.duration}</span>
                  <span>Max Marks: {generatedPaper.totalMarks}</span>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6 text-sm text-foreground">
                {generatedPaper.sections.map((sec: any, sIdx: number) => (
                  <div key={sIdx} className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-1 font-bold text-xs uppercase tracking-wide text-primary">
                      <span>{sec.sectionTitle}</span>
                      <span className="text-[11px] text-muted-foreground">{sec.instructions}</span>
                    </div>

                    <div className="space-y-2.5 pl-2">
                      {sec.questions.map((q: string, qIdx: number) => (
                        <div key={qIdx} className="flex gap-3 text-xs leading-relaxed">
                          <span className="font-bold min-w-[20px]">Q{qIdx + 1}.</span>
                          <span className="flex-1">{q}</span>
                          <span className="font-mono font-bold text-muted-foreground">[{sec.marksPerQuestion}M]</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center border-t pt-4 text-[10px] text-muted-foreground">
                *** End of Question Paper • Autonomous Board of Studies Approved ***
              </div>
            </div>
          )}
        </TabsContent>

        {/* TAB 2: INTERACTIVE PRACTICE QUIZ */}
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Timed Practice Test Simulator</CardTitle>
                  <CardDescription>Test your conceptual understanding with instant score analytics</CardDescription>
                </div>
                <Select value={quizSubject} onValueChange={setQuizSubject}>
                  <SelectTrigger className="w-48 h-9 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {!quizActive && !quizSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Ready for {quizSubject} Mock Quiz?</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {questions.length} Questions • 5 Minutes Timer • Instant Explanations
                    </p>
                  </div>
                  <Button onClick={() => setQuizActive(true)} className="gap-2">
                    Start Test Now
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Timer & Progress Bar */}
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="text-muted-foreground">Question</span>
                      <span className="text-primary font-bold">{currentQIndex + 1} of {questions.length}</span>
                    </div>

                    {!quizSubmitted && (
                      <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-amber-500">
                        <Clock className="h-4 w-4" />
                        <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
                      </div>
                    )}

                    {quizSubmitted && (
                      <Badge className="bg-emerald-600 text-white font-bold text-xs">
                        Final Score: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
                      </Badge>
                    )}
                  </div>

                  {/* Question Card */}
                  {questions[currentQIndex] && (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted/40 p-4 text-sm font-semibold text-foreground">
                        {currentQIndex + 1}. {questions[currentQIndex].question}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {questions[currentQIndex].options.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[currentQIndex] === oIdx;
                          const isCorrect = questions[currentQIndex].correctAnswer === oIdx;

                          let optionStyle = "border hover:border-primary/40 bg-card";
                          if (isSelected) optionStyle = "border-primary bg-primary/10 font-semibold";
                          if (quizSubmitted) {
                            if (isCorrect) optionStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold";
                            else if (isSelected) optionStyle = "border-red-500 bg-red-500/15 text-red-700 dark:text-red-300";
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(currentQIndex, oIdx)}
                              className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                              {quizSubmitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                              {quizSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation (Shown when submitted) */}
                      {quizSubmitted && (
                        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs text-primary space-y-1">
                          <p className="font-bold">Explanation:</p>
                          <p>{questions[currentQIndex].explanation}</p>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentQIndex((i) => Math.max(0, i - 1))}
                          disabled={currentQIndex === 0}
                        >
                          Previous
                        </Button>

                        <div className="flex gap-2">
                          {!quizSubmitted ? (
                            <>
                              {currentQIndex < questions.length - 1 ? (
                                <Button
                                  size="sm"
                                  onClick={() => setCurrentQIndex((i) => i + 1)}
                                >
                                  Next Question
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => setQuizSubmitted(true)}
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                >
                                  Submit Test
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={loadQuestions}
                              className="gap-1 text-xs"
                            >
                              <RotateCcw className="h-3.5 w-3.5" /> Retake Quiz
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
