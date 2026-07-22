import { c as reactExports, p as jsxRuntimeExports } from "./worker-entry-DxW2Qu7l.js";
import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { D as DashboardLayout, a as BookOpen, L as Library } from "./DashboardLayout-CFboD7uh.js";
import { c as createLucideIcon, C as Card, a as CardContent } from "./card-Cb1AW6bU.js";
import { B as Button } from "./button-CZKATw0i.js";
import { I as Input } from "./input-o-SMM1oI.js";
import { B as Badge } from "./badge-DKQ4srg4.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-D-Eosl7M.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DUfHuThk.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-iSHuvjEU.js";
import { S as StatsCard } from "./StatsCard-CfYHEYSm.js";
import { g as getStudentName, S as STUDENTS } from "./college-data-C1ddpZzr.js";
import { P as Plus } from "./plus-BP6CXQQf.js";
import { T as TriangleAlert } from "./triangle-alert-BgGnla9I.js";
import { S as Search } from "./search-Dw4EZ4s8.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "./index-Da756bPX.js";
import "./index-CfN3UdKT.js";
import "./x-Bk9ytnAn.js";
import "./index-C3P8y4QV.js";
const __iconNode$2 = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
];
const ArrowRightLeft = createLucideIcon("arrow-right-left", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M10 2v8l3-3 3 3V2", key: "sqw3rj" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
];
const BookMarked = createLucideIcon("book-marked", __iconNode$1);
const __iconNode = [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
];
const Undo2 = createLucideIcon("undo-2", __iconNode);
const INITIAL_BOOKS = [{
  id: "b1",
  title: "Introduction to Algorithms",
  author: "Thomas H. Cormen",
  isbn: "978-0262033848",
  category: "Computer Science",
  totalCopies: 5,
  availableCopies: 3,
  shelf: "CS-A1"
}, {
  id: "b2",
  title: "Operating System Concepts",
  author: "Silberschatz",
  isbn: "978-1118063330",
  category: "Computer Science",
  totalCopies: 4,
  availableCopies: 2,
  shelf: "CS-A2"
}, {
  id: "b3",
  title: "Database System Concepts",
  author: "Korth & Sudarshan",
  isbn: "978-0078022159",
  category: "Computer Science",
  totalCopies: 3,
  availableCopies: 1,
  shelf: "CS-B1"
}, {
  id: "b4",
  title: "Engineering Mathematics",
  author: "B.S. Grewal",
  isbn: "978-8174091154",
  category: "Mathematics",
  totalCopies: 8,
  availableCopies: 5,
  shelf: "MA-A1"
}, {
  id: "b5",
  title: "Electronic Devices & Circuits",
  author: "Boylestad",
  isbn: "978-0132622264",
  category: "Electronics",
  totalCopies: 4,
  availableCopies: 4,
  shelf: "EC-A1"
}, {
  id: "b6",
  title: "Strength of Materials",
  author: "R.K. Rajput",
  isbn: "978-8121935388",
  category: "Mechanical",
  totalCopies: 3,
  availableCopies: 2,
  shelf: "ME-A1"
}, {
  id: "b7",
  title: "Computer Networks",
  author: "Andrew Tanenbaum",
  isbn: "978-0132126953",
  category: "Computer Science",
  totalCopies: 5,
  availableCopies: 3,
  shelf: "CS-C1"
}, {
  id: "b8",
  title: "Design of Machine Elements",
  author: "V.B. Bhandari",
  isbn: "978-0070681798",
  category: "Mechanical",
  totalCopies: 3,
  availableCopies: 3,
  shelf: "ME-B1"
}];
const INITIAL_ISSUES = [{
  id: "i1",
  bookId: "b1",
  studentId: "s1",
  issueDate: "2024-03-01",
  dueDate: "2024-03-15",
  returnDate: "2024-03-14",
  fine: 0,
  status: "returned"
}, {
  id: "i2",
  bookId: "b2",
  studentId: "s2",
  issueDate: "2024-03-05",
  dueDate: "2024-03-19",
  fine: 0,
  status: "issued"
}, {
  id: "i3",
  bookId: "b3",
  studentId: "s3",
  issueDate: "2024-02-20",
  dueDate: "2024-03-05",
  fine: 50,
  status: "overdue"
}, {
  id: "i4",
  bookId: "b1",
  studentId: "s6",
  issueDate: "2024-03-10",
  dueDate: "2024-03-24",
  fine: 0,
  status: "issued"
}, {
  id: "i5",
  bookId: "b4",
  studentId: "s8",
  issueDate: "2024-03-12",
  dueDate: "2024-03-26",
  returnDate: "2024-03-25",
  fine: 0,
  status: "returned"
}, {
  id: "i6",
  bookId: "b7",
  studentId: "s10",
  issueDate: "2024-02-25",
  dueDate: "2024-03-10",
  fine: 100,
  status: "overdue"
}];
const FINE_PER_DAY = 5;
function LibraryPage() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = reactExports.useState(INITIAL_BOOKS);
  const [issues, setIssues] = reactExports.useState(INITIAL_ISSUES);
  const [search, setSearch] = reactExports.useState("");
  const [addBookDialog, setAddBookDialog] = reactExports.useState(false);
  const [issueDialog, setIssueDialog] = reactExports.useState(false);
  const [bookForm, setBookForm] = reactExports.useState({
    title: "",
    author: "",
    isbn: "",
    category: "Computer Science",
    totalCopies: 1,
    shelf: ""
  });
  const [issueForm, setIssueForm] = reactExports.useState({
    bookId: "",
    studentId: ""
  });
  reactExports.useEffect(() => {
    if (!isAuthenticated) navigate({
      to: "/login"
    });
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const filteredBooks = books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()) || b.isbn.includes(search));
  const totalBooks = books.reduce((s, b) => s + b.totalCopies, 0);
  const issuedBooks = issues.filter((i) => i.status === "issued" || i.status === "overdue").length;
  const overdueBooks = issues.filter((i) => i.status === "overdue").length;
  const totalFines = issues.reduce((s, i) => s + i.fine, 0);
  const handleAddBook = () => {
    if (!bookForm.title || !bookForm.author) return;
    const newBook = {
      id: `b${Date.now()}`,
      title: bookForm.title,
      author: bookForm.author,
      isbn: bookForm.isbn,
      category: bookForm.category,
      totalCopies: bookForm.totalCopies,
      availableCopies: bookForm.totalCopies,
      shelf: bookForm.shelf
    };
    setBooks([...books, newBook]);
    setAddBookDialog(false);
    setBookForm({
      title: "",
      author: "",
      isbn: "",
      category: "Computer Science",
      totalCopies: 1,
      shelf: ""
    });
  };
  const handleIssueBook = () => {
    if (!issueForm.bookId || !issueForm.studentId) return;
    const book = books.find((b) => b.id === issueForm.bookId);
    if (!book || book.availableCopies <= 0) return;
    const today = /* @__PURE__ */ new Date();
    const due = new Date(today);
    due.setDate(due.getDate() + 14);
    const newIssue = {
      id: `i${Date.now()}`,
      bookId: issueForm.bookId,
      studentId: issueForm.studentId,
      issueDate: today.toISOString().split("T")[0],
      dueDate: due.toISOString().split("T")[0],
      fine: 0,
      status: "issued"
    };
    setIssues([newIssue, ...issues]);
    setBooks(books.map((b) => b.id === issueForm.bookId ? {
      ...b,
      availableCopies: b.availableCopies - 1
    } : b));
    setIssueDialog(false);
    setIssueForm({
      bookId: "",
      studentId: ""
    });
  };
  const handleReturn = (issueId) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;
    const today = /* @__PURE__ */ new Date();
    const due = new Date(issue.dueDate);
    const daysLate = Math.max(0, Math.floor((today.getTime() - due.getTime()) / (1e3 * 60 * 60 * 24)));
    const fine = daysLate * FINE_PER_DAY;
    setIssues(issues.map((i) => i.id === issueId ? {
      ...i,
      returnDate: today.toISOString().split("T")[0],
      fine,
      status: "returned"
    } : i));
    setBooks(books.map((b) => b.id === issue.bookId ? {
      ...b,
      availableCopies: b.availableCopies + 1
    } : b));
  };
  const getBookTitle = (id) => books.find((b) => b.id === id)?.title ?? "Unknown";
  const statusBadge = (status) => {
    const cls = {
      issued: "bg-info/10 text-info border-info/20",
      returned: "bg-success/10 text-success border-success/20",
      overdue: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cls[status], children: status });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Library Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Books, issues & returns" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setAddBookDialog(true), variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add Book"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIssueDialog(true), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightLeft, { className: "h-4 w-4" }),
          " Issue Book"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Total Books", value: totalBooks, icon: BookOpen, subtitle: `${books.length} titles` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Issued", value: issuedBooks, icon: BookMarked, colorClass: "bg-info", subtitle: "Currently out" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Overdue", value: overdueBooks, icon: TriangleAlert, colorClass: "bg-destructive", subtitle: "Need attention" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsCard, { title: "Total Fines", value: `₹${totalFines}`, icon: Library, colorClass: "bg-warning", subtitle: "Collected" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "books", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "books", children: "Book Catalog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "issues", children: "Issue/Return Log" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "books", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search books...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Author" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ISBN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Shelf" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Available" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredBooks.map((book) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-foreground", children: book.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: book.author }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: book.isbn }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: book.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: book.shelf }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: book.availableCopies > 0 ? "text-success font-medium" : "text-destructive font-medium", children: [
              book.availableCopies,
              "/",
              book.totalCopies
            ] }) })
          ] }, book.id)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "issues", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Book" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Issue Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Return Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: issues.map((issue) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-foreground", children: getBookTitle(issue.bookId) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStudentName(issue.studentId) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: issue.issueDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: issue.dueDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: issue.returnDate || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: issue.fine > 0 ? "text-destructive font-medium" : "", children: [
            "₹",
            issue.fine
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: statusBadge(issue.status) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: issue.status !== "returned" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleReturn(issue.id), className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "h-3.5 w-3.5" }),
            " Return"
          ] }) })
        ] }, issue.id)) })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: addBookDialog, onOpenChange: setAddBookDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Book" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bookForm.title, onChange: (e) => setBookForm({
            ...bookForm,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Author *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bookForm.author, onChange: (e) => setBookForm({
            ...bookForm,
            author: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "ISBN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bookForm.isbn, onChange: (e) => setBookForm({
              ...bookForm,
              isbn: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Shelf Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bookForm.shelf, onChange: (e) => setBookForm({
              ...bookForm,
              shelf: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Copies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: bookForm.totalCopies, onChange: (e) => setBookForm({
            ...bookForm,
            totalCopies: Number(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAddBook, className: "w-full", children: "Add Book" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: issueDialog, onOpenChange: setIssueDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Issue Book" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Book" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: issueForm.bookId, onChange: (e) => setIssueForm({
            ...issueForm,
            bookId: e.target.value
          }), className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select book" }),
            books.filter((b) => b.availableCopies > 0).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: b.id, children: [
              b.title,
              " (",
              b.availableCopies,
              " available)"
            ] }, b.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: issueForm.studentId, onChange: (e) => setIssueForm({
            ...issueForm,
            studentId: e.target.value
          }), className: "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select student" }),
            STUDENTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.id, children: [
              s.name,
              " (",
              s.rollNo,
              ")"
            ] }, s.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Due date: 14 days from issue. Fine: ₹",
          FINE_PER_DAY,
          "/day after due date."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleIssueBook, className: "w-full", children: "Issue Book" })
      ] })
    ] }) })
  ] });
}
export {
  LibraryPage as component
};
