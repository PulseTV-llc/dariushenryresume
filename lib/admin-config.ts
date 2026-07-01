/**
 * The single authorized admin email. Only this account may access the private
 * admin quote calculator. Update here if the owner email ever changes.
 *
 * This is enforced in three places:
 *   1. /admin/login          — client redirect after sign-in
 *   2. components/admin/AdminGuard — client route guard
 *   3. /api/admin/verify     — SERVER-SIDE Firebase ID-token + email check
 */
export const AUTHORIZED_ADMIN_EMAIL = 'darius.henry@gmail.com';

export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  return !!email && email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
}
