import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { generateMetadata } from './metadata';
import {
  organizationSchema,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
  webPageSchema,
  serviceSchemas,
  serviceCatalogSchema,
  aggregateOfferSchema,
  industriesItemListSchema,
  howToSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/lib/structured-data';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = generateMetadata();

export const viewport = {
  themeColor: '#0ea5e9',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const schemas = [
  organizationSchema,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
  webPageSchema,
  serviceCatalogSchema,
  aggregateOfferSchema,
  industriesItemListSchema,
  howToSchema,
  faqSchema,
  breadcrumbSchema,
  ...serviceSchemas,
];

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
      </head>
      <body className={inter.className}>
        {/* JSON-LD Structured Data — emit one <script> per schema */}
        {schemas.map((schema, i) => (
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
