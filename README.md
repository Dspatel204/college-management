# CollegeHub - College Management System

A full-stack college management system built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**. Deploy-ready for **Vercel**.

## Features

- **Dashboard** - Overview with stats and charts
- **Student Management** - Track student records and details
- **Faculty Management** - Manage teachers and staff
- **Course Management** - Organize courses and subjects
- **Attendance Tracking** - Monitor daily attendance
- **Fee Management** - Handle fee records and payments
- **Exam Management** - Schedule and manage exams
- **Library Management** - Track books and issued items
- **Transport Management** - Manage routes and vehicles
- **Notices & Messages** - Internal communication
- **Reports & Settings** - Generate reports and configure

## Tech Stack

- **Framework**: TanStack Start + React 19
- **Router**: TanStack Router
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State**: TanStack Query v5
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite 7 + Nitro (Vercel deployment)

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@college.com | admin123 |
| Teacher | teacher@college.com | teacher123 |
| Student | student@college.com | student123 |

## Local Development

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

### Build

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

## Vercel Deployment (Fixed)

Ye app pehle Cloudflare Workers ke liye tha. Isko Vercel par deploy karne ke liye neeche diye gaye changes kiye gaye hain:

### Kya Fix Kiya Hai

1. **vite.config.ts** mein `nitro` plugin add kiya gaya hai - TanStack Start ko Vercel par chlane ke liye Nitro zaroori hai
2. **vercel.json** banaya gaya hai taaki Vercel framework ko sahi se detect kar sake
3. Cloudflare-specific plugin Vercel build par automatically skip ho jata hai

### Deploy Steps

1. Is repository ko Vercel par import karein
2. Vercel automatically `tanstack-start` framework detect karega
3. Deploy karein

Agar framework detect na ho to:

```bash
vercel project update <project-name> --framework tanstack-start
```

### Important Notes

- Node.js version 20+ use karein
- Build command: `npm run build` (Vercel auto-detect karta hai)
- Output directory: Vercel auto-detect karta hai
- Environment variables `VITE_` prefix ke saath set karein agar client-side accessible chahiye

## Project Structure

```
src/
├── components/        # Reusable UI components + shadcn/ui
├── hooks/           # Custom React hooks
├── lib/             # Utils, data, auth context
├── routes/          # TanStack Router pages
│   ├── __root.tsx   # Root layout
│   ├── index.tsx    # Landing page
│   ├── login.tsx    # Login page
│   └── ...          # Other pages
├── router.tsx       # Router configuration
└── styles.css       # Global styles
```

## License

MIT
