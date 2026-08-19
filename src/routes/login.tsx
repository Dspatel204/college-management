import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate({ to: "/dashboard" });
    } else {
      setError(result.error || "Invalid email or password");
    }
    setLoading(false);
  };

  const fillDemo = (role: string) => {
    const creds: Record<string, { email: string; password: string }> = {
      admin: { email: "admin@college.com", password: "admin123" },
      teacher: { email: "teacher@college.com", password: "teacher123" },
      student: { email: "student@college.com", password: "student123" },
    };
    const c = creds[role];
    if (c) {
      setEmail(c.email);
      setPassword(c.password);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/5 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <GraduationCap className="h-9 w-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">CollegeHub</h1>
          <p className="mt-1 text-sm text-muted-foreground">College Management System</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 border-t pt-4">
              <p className="mb-3 text-center text-xs font-medium text-muted-foreground">DEMO ACCOUNTS</p>
              <div className="grid grid-cols-3 gap-2">
                {["admin", "teacher", "student"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => fillDemo(role)}
                    disabled={loading}
                    className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground capitalize hover:bg-accent transition-colors disabled:opacity-50"
                  >
                    {role}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                First run: <code className="text-xs">node seed.js</code> in the backend to create accounts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
