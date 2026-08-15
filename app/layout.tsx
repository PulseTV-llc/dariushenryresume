import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { generateMetadata } from './metadata';
import { vexaosSchemas } from '@/lib/structured-data-vexaos';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = generateMetadata();

export const viewport = {
  themeColor: '#04070e',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="dark">
      <head>
        {/* Performance hints for third-party origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://app.vexaos.io" />
      </head>
      <body className={inter.className}>
        {/* JSON-LD structured data — one <script> per schema */}
        {vexaosSchemas.map((schema, i) => (
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
