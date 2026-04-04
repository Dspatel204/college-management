import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "admin@college.com": {
    password: "admin123",
    user: { id: "1", name: "Dr. Sharma", email: "admin@college.com", role: "admin" },
  },
  "teacher@college.com": {
    password: "teacher123",
    user: { id: "2", name: "Prof. Gupta", email: "teacher@college.com", role: "teacher" },
  },
  "student@college.com": {
    password: "student123",
    user: { id: "3", name: "Rahul Kumar", email: "student@college.com", role: "student" },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const entry = DEMO_USERS[email];
    if (entry && entry.password === password) {
      setUser(entry.user);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
