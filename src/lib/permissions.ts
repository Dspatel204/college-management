/**
 * Permission definitions for role-based UI rendering.
 * Each permission maps to a set of roles that are allowed.
 */

export type Role = "admin" | "teacher" | "student";

export type Permission =
  | "students:write"
  | "students:read"
  | "faculty:write"
  | "faculty:read"
  | "attendance:write"
  | "attendance:read"
  | "fees:write"
  | "fees:pay"
  | "fees:read"
  | "exams:write"
  | "exams:read"
  | "results:write"
  | "results:read"
  | "courses:write"
  | "courses:read"
  | "reports:read"
  | "settings:write"
  | "timetable:write";

const PERMISSIONS: Record<Permission, Role[]> = {
  "students:read": ["admin", "teacher", "student"],
  "students:write": ["admin"],
  "faculty:read": ["admin", "teacher", "student"],
  "faculty:write": ["admin"],
  "attendance:read": ["admin", "teacher", "student"],
  "attendance:write": ["admin", "teacher"],
  "fees:read": ["admin", "teacher", "student"],
  "fees:write": ["admin"],
  "fees:pay": ["admin", "student"],
  "exams:read": ["admin", "teacher", "student"],
  "exams:write": ["admin", "teacher"],
  "results:read": ["admin", "teacher", "student"],
  "results:write": ["admin", "teacher"],
  "courses:read": ["admin", "teacher", "student"],
  "courses:write": ["admin"],
  "reports:read": ["admin"],
  "settings:write": ["admin"],
  "timetable:write": ["admin", "teacher"],
};

export function hasPermission(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  return PERMISSIONS[permission]?.includes(role) ?? false;
}

/** Nav items visible per role */
export const NAV_PERMISSIONS: Record<string, Role[]> = {
  "/dashboard": ["admin", "teacher", "student"],
  "/students": ["admin", "teacher"],
  "/faculty": ["admin", "teacher"],
  "/courses": ["admin", "teacher", "student"],
  "/attendance": ["admin", "teacher"],
  "/exams": ["admin", "teacher", "student"],
  "/fees": ["admin", "student"],
  "/library": ["admin", "teacher", "student"],
  "/transport": ["admin", "student"],
  "/notices": ["admin", "teacher", "student"],
  "/messages": ["admin", "teacher", "student"],
  "/reports": ["admin"],
  "/settings": ["admin"],
};

export function canAccessRoute(role: Role | undefined, path: string): boolean {
  if (!role) return false;
  const allowed = NAV_PERMISSIONS[path];
  if (!allowed) return true; // unknown route → allow (guarded at API level)
  return allowed.includes(role);
}
