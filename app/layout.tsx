import './globals.css';

/**
 * The <html> element is rendered by the nested layouts (app/[locale]/layout.tsx
 * and app/admin/layout.tsx) so each can set its own `lang`.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
