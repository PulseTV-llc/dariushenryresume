/**
 * Authorized admin emails. Only these accounts may access the private
 * admin quote calculator. Add or remove emails in the list below.
 *
 * This is enforced in three places:
 *   1. /admin/login          — client redirect after sign-in
 *   2. components/admin/AdminGuard — client route guard
 *   3. /api/admin/verify     — SERVER-SIDE Firebase ID-token + email check
 */
export const AUTHORIZED_ADMIN_EMAILS = [
  'darius.henry@gmail.com',
  'darius.henry@hotmail.com',
];

// Back-compat: primary authorized email (first in the list).
export const AUTHORIZED_ADMIN_EMAIL = AUTHORIZED_ADMIN_EMAILS[0];

export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.some((e) => e.toLowerCase() === normalized);
}
