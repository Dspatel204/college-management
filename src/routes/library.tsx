import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import {
  getLibraryBooks,
  createLibraryBook,
  getBookIssues,
  issueBook,
  returnBook,
  renewBook,
  getEResources,
  getStudents,
  type Student,
} from "@/lib/api";
import { type LibraryBook, type BookIssueRecord, type EResourceItem } from "@/lib/college-data";
import {
  Library,
  BookOpen,
  Search,
  Plus,
  ArrowRightLeft,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  BookmarkCheck,
  Building,
  Hash,
} from "lucide-react";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
});

function LibraryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"catalog" | "circulation" | "eresources">("catalog");
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [issues, setIssues] = useState<BookIssueRecord[]>([]);
  const [eresources, setEresources] = useState<EResourceItem[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Modals
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBookForIssue, setSelectedBookForIssue] = useState<LibraryBook | null>(null);

  // Form states
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Computer Science" as LibraryBook["category"],
    rackLocation: "Rack CS-01 / Shelf A",
    totalCopies: 5,
    edition: "1st Edition",
    publisher: "Standard Publisher",
    year: 2024,
  });

  const [issueForm, setIssueForm] = useState({
    studentId: "s1",
    days: 14,
  });

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [b, i, e, s] = await Promise.all([
        getLibraryBooks(),
        getBookIssues(),
        getEResources(),
        getStudents(),
      ]);
      setBooks(b);
      setIssues(i);
      setEresources(e);
      setStudents(s);
    } catch (err) {
      console.error(err);
    }
  }

  function getStudentName(studentId: string) {
    const s = students.find((st) => st.id === studentId);
    return s ? `${s.name} (${s.rollNo})` : studentId;
  }

  function getBookTitle(bookId: string) {
    const b = books.find((bk) => bk.id === bookId);
    return b ? b.title : bookId;
  }

  async function handleAddBook(e: React.FormEvent) {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;

    await createLibraryBook({
      ...newBook,
      availableCopies: newBook.totalCopies,
    });
    setShowAddBookModal(false);
    setActionSuccess(`Added "${newBook.title}" to Central Library Catalog`);
    setTimeout(() => setActionSuccess(null), 4000);
    loadData();
  }

  async function handleIssueBook(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBookForIssue) return;

    await issueBook({
      bookId: selectedBookForIssue.id,
      studentId: issueForm.studentId,
      days: issueForm.days,
    });
    setShowIssueModal(false);
    setSelectedBookForIssue(null);
    setActionSuccess(`Book issued successfully. Due in ${issueForm.days} days.`);
    setTimeout(() => setActionSuccess(null), 4000);
    loadData();
  }

  async function handleReturnBook(issueId: string) {
    await returnBook(issueId);
    setActionSuccess("Book returned successfully & catalog stock updated.");
    setTimeout(() => setActionSuccess(null), 4000);
    loadData();
  }

  async function handleRenewBook(issueId: string) {
    await renewBook(issueId);
    setActionSuccess("Book renewal extended by 14 days.");
    setTimeout(() => setActionSuccess(null), 4000);
    loadData();
  }

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Computer Science", "Electronics", "Management", "Mechanical", "Civil", "Basic Sciences"];

  const activeIssues = issues.filter((i) => i.status === "Issued" || i.status === "Overdue" || i.status === "Renewed");
  const totalOverdueFine = issues.reduce((sum, i) => sum + (i.overdueFine || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Library className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Smart Digital Library & E-Resources</h1>
              <p className="text-xs text-muted-foreground">
                Central Library Catalog, Physical Circulation, and National Digital Library (NDLI) E-Repositories
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user?.role === "admin" && (
            <button
              onClick={() => setShowAddBookModal(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add New Book
            </button>
          )}
        </div>
      </div>

      {actionSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{actionSuccess}</p>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Titles</span>
            <BookOpen className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-2 text-3xl font-bold">{books.length}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            {books.reduce((sum, b) => sum + b.totalCopies, 0)} physical copies in racks
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Issues</span>
            <ArrowRightLeft className="h-5 w-5 text-purple-500" />
          </div>
          <div className="mt-2 text-3xl font-bold">{activeIssues.length}</div>
          <p className="mt-1 text-xs text-purple-600 dark:text-purple-400 font-medium">Currently with students</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overdue Books</span>
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {issues.filter((i) => i.status === "Overdue").length}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Late fine collected: ₹{totalOverdueFine}</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">E-Resource Catalog</span>
            <ExternalLink className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-2 text-3xl font-bold">{eresources.length} Repositories</div>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">NDLI / NPTEL / IEEE Integrated</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-all ${
            activeTab === "catalog"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Book Catalog & Rack Locations
        </button>
        <button
          onClick={() => setActiveTab("circulation")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-all ${
            activeTab === "circulation"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowRightLeft className="h-4 w-4" />
          Issue & Return Desk ({activeIssues.length})
        </button>
        <button
          onClick={() => setActiveTab("eresources")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-all ${
            activeTab === "eresources"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookmarkCheck className="h-4 w-4" />
          National Digital Library & E-Journals
        </button>
      </div>

      {/* Tab 1: Book Catalog */}
      {activeTab === "catalog" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by book title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "border bg-card text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => {
              const isAvailable = book.availableCopies > 0;
              return (
                <div
                  key={book.id}
                  className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        {book.category}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isAvailable
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {isAvailable ? `${book.availableCopies} Available` : "Checked Out"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold tracking-tight line-clamp-2">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">By {book.author}</p>
                    </div>

                    <div className="space-y-1.5 text-xs rounded-xl bg-muted/40 p-3 border border-border/50">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-3.5 w-3.5" /> Shelf Location:
                        </span>
                        <span className="font-semibold text-foreground">{book.rackLocation}</span>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Hash className="h-3.5 w-3.5" /> ISBN:
                        </span>
                        <span className="font-mono text-[11px] text-foreground">{book.isbn}</span>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Edition & Publisher:</span>
                        <span className="text-foreground">
                          {book.edition} ({book.publisher})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Total Stock: <strong className="text-foreground">{book.totalCopies}</strong> copies
                    </span>
                    {user?.role !== "student" ? (
                      <button
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedBookForIssue(book);
                          setShowIssueModal(true);
                        }}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                          isAvailable
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        Issue Book
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {isAvailable ? "Available in Rack" : "Reserved"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Issue & Return Desk */}
      {activeTab === "circulation" && (
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Active Book Circulation Ledger</h3>
              <p className="text-xs text-muted-foreground">14-day standard borrowing window with ₹2/day late fine</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {issues.length} Total Circulation Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-5 py-3">Book Title</th>
                  <th className="px-5 py-3">Borrower Student</th>
                  <th className="px-5 py-3">Issue Date</th>
                  <th className="px-5 py-3">Due Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Overdue Fine</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {issues.map((rec) => {
                  const isOverdue = rec.status === "Overdue";
                  const isReturned = rec.status === "Returned";

                  return (
                    <tr key={rec.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4 font-semibold text-foreground">{getBookTitle(rec.bookId)}</td>
                      <td className="px-5 py-4 text-xs font-medium">{getStudentName(rec.studentId)}</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{rec.issueDate}</td>
                      <td className="px-5 py-4 text-xs font-medium">
                        <span className={isOverdue ? "text-rose-600 font-bold" : "text-foreground"}>
                          {rec.dueDate}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            isReturned
                              ? "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                              : isOverdue
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs">
                        {rec.overdueFine > 0 ? (
                          <span className="font-bold text-rose-600 dark:text-rose-400">₹{rec.overdueFine}</span>
                        ) : (
                          <span className="text-muted-foreground">₹0</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        {!isReturned && user?.role !== "student" && (
                          <>
                            <button
                              onClick={() => handleRenewBook(rec.id)}
                              className="rounded-lg border px-2.5 py-1 text-xs font-medium hover:bg-accent transition-colors"
                            >
                              Renew (+14d)
                            </button>
                            <button
                              onClick={() => handleReturnBook(rec.id)}
                              className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                            >
                              Return Book
                            </button>
                          </>
                        )}
                        {isReturned && (
                          <span className="text-xs text-muted-foreground italic">Returned on {rec.returnDate}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: National E-Resources */}
      {activeTab === "eresources" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
                <BookmarkCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">National Knowledge Network & Open Digital Library</h3>
                <p className="text-xs text-muted-foreground">
                  Institutional members have direct high-speed access to 50,000+ peer-reviewed video lectures, journals & standard textbooks.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {eresources.map((res) => (
              <div
                key={res.id}
                className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                      {res.provider}
                    </span>
                    <span className="text-xs font-medium text-amber-500">★ {res.rating} / 5.0</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold tracking-tight">{res.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{res.category} • {res.type}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    <Download className="inline h-3.5 w-3.5 mr-1" />
                    {res.downloadsCount.toLocaleString()} Accesses
                  </span>
                  <a
                    href={res.accessUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    Open Resource
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add New Book */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold">Add Book to Central Catalog</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Catalog a new textbook or reference volume</p>

            <form onSubmit={handleAddBook} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold">Book Title</label>
                <input
                  type="text"
                  required
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="e.g. Operating System Concepts"
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold">Author(s)</label>
                  <input
                    type="text"
                    required
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="e.g. Silberschatz, Galvin"
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">ISBN</label>
                  <input
                    type="text"
                    required
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    placeholder="978-0131103627"
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold">Category / Department</label>
                  <select
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value as LibraryBook["category"] })}
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Management">Management</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Basic Sciences">Basic Sciences</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold">Rack / Shelf Locator</label>
                  <input
                    type="text"
                    required
                    value={newBook.rackLocation}
                    onChange={(e) => setNewBook({ ...newBook, rackLocation: e.target.value })}
                    placeholder="Rack CS-02 / Shelf B"
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newBook.totalCopies}
                    onChange={(e) => setNewBook({ ...newBook, totalCopies: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Edition</label>
                  <input
                    type="text"
                    value={newBook.edition}
                    onChange={(e) => setNewBook({ ...newBook, edition: e.target.value })}
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Year</label>
                  <input
                    type="number"
                    value={newBook.year}
                    onChange={(e) => setNewBook({ ...newBook, year: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="rounded-xl border px-4 py-2 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Book to Student */}
      {showIssueModal && selectedBookForIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold">Issue Book</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Issuing <strong>{selectedBookForIssue.title}</strong>
            </p>

            <form onSubmit={handleIssueBook} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold">Select Student (Borrower)</label>
                <select
                  value={issueForm.studentId}
                  onChange={(e) => setIssueForm({ ...issueForm, studentId: e.target.value })}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNo}) - {s.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Borrowing Period</label>
                <select
                  value={issueForm.days}
                  onChange={(e) => setIssueForm({ ...issueForm, days: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value={7}>7 Days (1 Week)</option>
                  <option value={14}>14 Days (Standard 2 Weeks)</option>
                  <option value={30}>30 Days (Semester Special)</option>
                </select>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-xs text-blue-600 dark:text-blue-400">
                <Clock className="inline h-3.5 w-3.5 mr-1" />
                Due date will be automatically set to {issueForm.days} days from today.
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="rounded-xl border px-4 py-2 text-xs font-semibold hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
