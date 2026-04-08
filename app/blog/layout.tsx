import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - iOS Development, SaaS, MVP Guides | Darius Henry',
  description: 'Real stories from building revenue-ready apps in 7 days, rescuing broken projects, and shipping production SaaS platforms. Case studies, guides, and lessons learned.',
  keywords: [
    'iOS development blog',
    'SaaS development blog',
    'MVP development guide',
    'app rescue stories',
    '7-day MVP guide',
    'broken app fix',
    'React Native tutorials',
    'startup development',
  ],
  openGraph: {
    title: 'Blog - iOS Development & App Rescue Stories',
    description: 'Case studies, guides, and real stories from building apps fast and rescuing broken projects.',
    url: 'https://iamdariushenry.com/blog',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
