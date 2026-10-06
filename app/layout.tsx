import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { generateMetadata } from './metadata';
import { siteSchemas } from '@/lib/structured-data';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = generateMetadata();

export const viewport = {
  themeColor: '#f3f6fc',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
      </head>
      <body className={inter.className}>
        {/* JSON-LD structured data — one <script> per schema */}
        {siteSchemas.map((schema, i) => (
          <script
            key={`schema-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
