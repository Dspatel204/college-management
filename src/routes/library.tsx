import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/StatsCard";
import { STUDENTS, getStudentName } from "@/lib/college-data";
import { BookOpen, Plus, Search, ArrowRightLeft, AlertTriangle, BookMarked, Library, Undo2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelf: string;
}

interface BookIssue {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  status: "issued" | "returned" | "overdue";
}

const INITIAL_BOOKS: Book[] = [
  { id: "b1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848", category: "Computer Science", totalCopies: 5, availableCopies: 3, shelf: "CS-A1" },
  { id: "b2", title: "Operating System Concepts", author: "Silberschatz", isbn: "978-1118063330", category: "Computer Science", totalCopies: 4, availableCopies: 2, shelf: "CS-A2" },
  { id: "b3", title: "Database System Concepts", author: "Korth & Sudarshan", isbn: "978-0078022159", category: "Computer Science", totalCopies: 3, availableCopies: 1, shelf: "CS-B1" },
  { id: "b4", title: "Engineering Mathematics", author: "B.S. Grewal", isbn: "978-8174091154", category: "Mathematics", totalCopies: 8, availableCopies: 5, shelf: "MA-A1" },
  { id: "b5", title: "Electronic Devices & Circuits", author: "Boylestad", isbn: "978-0132622264", category: "Electronics", totalCopies: 4, availableCopies: 4, shelf: "EC-A1" },
  { id: "b6", title: "Strength of Materials", author: "R.K. Rajput", isbn: "978-8121935388", category: "Mechanical", totalCopies: 3, availableCopies: 2, shelf: "ME-A1" },
  { id: "b7", title: "Computer Networks", author: "Andrew Tanenbaum", isbn: "978-0132126953", category: "Computer Science", totalCopies: 5, availableCopies: 3, shelf: "CS-C1" },
  { id: "b8", title: "Design of Machine Elements", author: "V.B. Bhandari", isbn: "978-0070681798", category: "Mechanical", totalCopies: 3, availableCopies: 3, shelf: "ME-B1" },
];

const INITIAL_ISSUES: BookIssue[] = [
  { id: "i1", bookId: "b1", studentId: "s1", issueDate: "2024-03-01", dueDate: "2024-03-15", returnDate: "2024-03-14", fine: 0, status: "returned" },
  { id: "i2", bookId: "b2", studentId: "s2", issueDate: "2024-03-05", dueDate: "2024-03-19", fine: 0, status: "issued" },
  { id: "i3", bookId: "b3", studentId: "s3", issueDate: "2024-02-20", dueDate: "2024-03-05", fine: 50, status: "overdue" },
  { id: "i4", bookId: "b1", studentId: "s6", issueDate: "2024-03-10", dueDate: "2024-03-24", fine: 0, status: "issued" },
  { id: "i5", bookId: "b4", studentId: "s8", issueDate: "2024-03-12", dueDate: "2024-03-26", returnDate: "2024-03-25", fine: 0, status: "returned" },
  { id: "i6", bookId: "b7", studentId: "s10", issueDate: "2024-02-25", dueDate: "2024-03-10", fine: 100, status: "overdue" },
];

const FINE_PER_DAY = 5;

export const Route = createFileRoute("/library")({
  component: LibraryPage,
});

function LibraryPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [issues, setIssues] = useState<BookIssue[]>(INITIAL_ISSUES);
  const [search, setSearch] = useState("");
  const [addBookDialog, setAddBookDialog] = useState(false);
  const [issueDialog, setIssueDialog] = useState(false);
  const [bookForm, setBookForm] = useState({ title: "", author: "", isbn: "", category: "Computer Science", totalCopies: 1, shelf: "" });
  const [issueForm, setIssueForm] = useState({ bookId: "", studentId: "" });

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  const totalBooks = books.reduce((s, b) => s + b.totalCopies, 0);
  const issuedBooks = issues.filter(i => i.status === "issued" || i.status === "overdue").length;
  const overdueBooks = issues.filter(i => i.status === "overdue").length;
  const totalFines = issues.reduce((s, i) => s + i.fine, 0);

  const handleAddBook = () => {
    if (!bookForm.title || !bookForm.author) return;
    const newBook: Book = {
      id: `b${Date.now()}`, title: bookForm.title, author: bookForm.author,
      isbn: bookForm.isbn, category: bookForm.category,
      totalCopies: bookForm.totalCopies, availableCopies: bookForm.totalCopies, shelf: bookForm.shelf,
    };
    setBooks([newBook, ...books]);
    setAddBookDialog(false);
    setBookForm({ title: "", author: "", isbn: "", category: "Computer Science", totalCopies: 1, shelf: "" });
  };

  const handleIssueBook = () => {
    if (!issueForm.bookId || !issueForm.studentId) return;
    const book = books.find(b => b.id === issueForm.bookId);
    if (!book || book.availableCopies <= 0) return;

    const today = new Date();
    const due = new Date(today);
    due.setDate(due.getDate() + 14);

    const newIssue: BookIssue = {
      id: `i${Date.now()}`, bookId: issueForm.bookId, studentId: issueForm.studentId,
      issueDate: today.toISOString().split("T")[0],
      dueDate: due.toISOString().split("T")[0],
      fine: 0, status: "issued",
    };
    setIssues([newIssue, ...issues]);
    setBooks(books.map(b => b.id === issueForm.bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b));
    setIssueDialog(false);
    setIssueForm({ bookId: "", studentId: "" });
  };

  const handleReturn = (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue) return;

    const today = new Date();
    const due = new Date(issue.dueDate);
    const daysLate = Math.max(0, Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)));
    const fine = daysLate * FINE_PER_DAY;

    setIssues(issues.map(i => i.id === issueId ? {
      ...i, returnDate: today.toISOString().split("T")[0], fine, status: "returned" as const,
    } : i));
    setBooks(books.map(b => b.id === issue.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b));
  };

  const getBookTitle = (id: string) => books.find(b => b.id === id)?.title ?? "Unknown";

  const statusBadge = (status: BookIssue["status"]) => {
    const cls: Record<string, string> = {
      issued: "bg-info/10 text-info border-info/20",
      returned: "bg-success/10 text-success border-success/20",
      overdue: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={cls[status]}>{status}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Library Management</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Books, issues & returns</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button onClick={() => setAddBookDialog(true)} variant="outline" className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Add Book</Button>
          <Button onClick={() => setIssueDialog(true)} className="gap-2 w-full sm:w-auto text-xs sm:text-sm"><ArrowRightLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Issue Book</Button>
        </div>
      </div>

      <div className="mb-4 sm:mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatsCard title="Total Books" value={totalBooks} icon={BookOpen} subtitle={`${books.length} titles`} />
        <StatsCard title="Issued" value={issuedBooks} icon={BookMarked} colorClass="bg-info" subtitle="Currently out" />
        <StatsCard title="Overdue" value={overdueBooks} icon={AlertTriangle} colorClass="bg-destructive" subtitle="Need attention" />
        <StatsCard title="Total Fines" value={`₹${totalFines}`} icon={Library} colorClass="bg-warning" subtitle="Collected" />
      </div>

      <Tabs defaultValue="books">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="books" className="flex-1 sm:flex-none text-xs sm:text-sm">Book Catalog</TabsTrigger>
          <TabsTrigger value="issues" className="flex-1 sm:flex-none text-xs sm:text-sm">Issue/Return Log</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="mb-4">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search books..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-full" />
            </div>
          </div>
          <Card className="border-0 shadow-md">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Title</TableHead>
                    <TableHead className="text-xs sm:text-sm">Author</TableHead>
                    <TableHead className="text-xs sm:text-sm">ISBN</TableHead>
                    <TableHead className="text-xs sm:text-sm">Category</TableHead>
                    <TableHead className="text-xs sm:text-sm">Shelf</TableHead>
                    <TableHead className="text-xs sm:text-sm">Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map(book => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium text-foreground text-xs sm:text-sm">{book.title}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{book.author}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{book.isbn}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px] sm:text-xs">{book.category}</Badge></TableCell>
                      <TableCell className="text-xs sm:text-sm">{book.shelf}</TableCell>
                      <TableCell>
                        <span className={`text-xs sm:text-sm ${book.availableCopies > 0 ? "text-success font-medium" : "text-destructive font-medium"}`}>
                          {book.availableCopies}/{book.totalCopies}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card className="border-0 shadow-md">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Book</TableHead>
                    <TableHead className="text-xs sm:text-sm">Student</TableHead>
                    <TableHead className="text-xs sm:text-sm">Issue Date</TableHead>
                    <TableHead className="text-xs sm:text-sm">Due Date</TableHead>
                    <TableHead className="text-xs sm:text-sm">Return Date</TableHead>
                    <TableHead className="text-xs sm:text-sm">Fine</TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map(issue => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium text-foreground text-xs sm:text-sm">{getBookTitle(issue.bookId)}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{getStudentName(issue.studentId)}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{issue.issueDate}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{issue.dueDate}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{issue.returnDate || "—"}</TableCell>
                      <TableCell className={`text-xs sm:text-sm ${issue.fine > 0 ? "text-destructive font-medium" : ""}`}>₹{issue.fine}</TableCell>
                      <TableCell>{statusBadge(issue.status)}</TableCell>
                      <TableCell>
                        {issue.status !== "returned" && (
                          <Button variant="outline" size="sm" onClick={() => handleReturn(issue.id)} className="gap-1 text-xs">
                            <Undo2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Return
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Book Dialog */}
      <Dialog open={addBookDialog} onOpenChange={setAddBookDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader><DialogTitle className="text-base sm:text-lg">Add New Book</DialogTitle></DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Title *</label><Input value={bookForm.title} onChange={e => setBookForm({ ...bookForm, title: e.target.value })} /></div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Author *</label><Input value={bookForm.author} onChange={e => setBookForm({ ...bookForm, author: e.target.value })} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div><label className="text-xs sm:text-sm font-medium text-foreground">ISBN</label><Input value={bookForm.isbn} onChange={e => setBookForm({ ...bookForm, isbn: e.target.value })} /></div>
              <div><label className="text-xs sm:text-sm font-medium text-foreground">Shelf Location</label><Input value={bookForm.shelf} onChange={e => setBookForm({ ...bookForm, shelf: e.target.value })} /></div>
            </div>
            <div><label className="text-xs sm:text-sm font-medium text-foreground">Copies</label><Input type="number" min={1} value={bookForm.totalCopies} onChange={e => setBookForm({ ...bookForm, totalCopies: Number(e.target.value) })} /></div>
            <Button onClick={handleAddBook} className="w-full">Add Book</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Issue Book Dialog */}
      <Dialog open={issueDialog} onOpenChange={setIssueDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader><DialogTitle className="text-base sm:text-lg">Issue Book</DialogTitle></DialogHeader>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Book</label>
              <select value={issueForm.bookId} onChange={e => setIssueForm({ ...issueForm, bookId: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
                <option value="">Select book</option>
                {books.filter(b => b.availableCopies > 0).map(b => <option key={b.id} value={b.id}>{b.title} ({b.availableCopies} available)</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Student</label>
              <select value={issueForm.studentId} onChange={e => setIssueForm({ ...issueForm, studentId: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
                <option value="">Select student</option>
                {STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
              </select>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Due date: 14 days from issue. Fine: ₹{FINE_PER_DAY}/day after due date.</p>
            <Button onClick={handleIssueBook} className="w-full">Issue Book</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
