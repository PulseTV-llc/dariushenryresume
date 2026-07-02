import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Connected Business Systems, Explained | VexaOS',
  description:
    'Deep dives, case studies, and field notes on running a real business on one connected VexaOS system — booking, POS, mobile apps, dashboards, and inventory in sync across web, iOS, Android, and touchscreen.',
  keywords: [
    'connected business system',
    'barbershop software',
    'salon booking system',
    'salon POS',
    'small business operating system',
    'inventory scanner system',
    'custom business software',
    'multi-location software',
    'VexaOS blog',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog' },
  openGraph: {
    title: 'The VexaOS Blog — Connected Systems, Explained',
    description:
      'Deep dives and case studies on running a real business on one connected system — booking, POS, apps, dashboards, and inventory in sync.',
    url: 'https://www.vexaos.io/blog',
    type: 'website',
    siteName: 'VexaOS',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
