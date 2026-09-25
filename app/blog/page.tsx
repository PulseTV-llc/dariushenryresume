import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  imageAlt?: string;
};

const blogPosts: Post[] = [
  {
    slug: 'restaurant-cafe-vexaos-system',
    title: 'How a Restaurant or Café Runs Its Entire Business on VexaOS',
    excerpt:
      'A vivid, in-depth walkthrough of a café + kitchen running its whole operation on one connected system — online ordering, QR table ordering, a self-order kiosk, handheld POS, a real-time Kitchen Display System, ingredient inventory, and a live owner dashboard — told as a single service day at "Ember & Oak," seen through the guest, the server, the kitchen line, and the owner.',
    date: '2026-07-02',
    readTime: '19 min read',
    category: 'Industry Deep Dive',
    tags: ['Restaurant POS', 'Kitchen Display System', 'QR Ordering', 'Self-Order Kiosk', 'Connected System'],
    featured: true,
    image: '/blog/ember-and-oak-vexaos.jpg',
    imageAlt:
      'Ember & Oak café + kitchen running VexaOS — self-order kiosk, live Kitchen Orders display, VexaOS POS, and QR order-and-pay',
  },
  {
    slug: 'barbershop-salon-vexaos-system',
    title: 'How a Barbershop or Salon Runs Its Entire Business on VexaOS',
    excerpt:
      'A complete, in-depth walkthrough of a barbershop or salon running its whole operation on one connected system — online booking, owner dashboard, iOS & Android apps, integrated POS, and a barcode inventory scanner — told through a vivid day at "Kingsman Cuts."',
    date: '2026-07-02',
    readTime: '16 min read',
    category: 'Industry Deep Dive',
    tags: ['Barbershop Software', 'Salon POS', 'Booking System', 'Inventory Scanner', 'Connected System'],
    featured: true,
    image: '/blog/kingsman-cuts-vexaos.jpg',
    imageAlt:
      'Kingsman Cuts barbershop running the VexaOS connected system — check-in kiosk, live schedule dashboard, and VexaOS POS',
  },
  {
    slug: 'lower-food-cost',
    title: 'How to Actually Lower Your Food Cost (Without Cutting Corners)',
    excerpt:
      'A practical, no-nonsense playbook any restaurant owner can run this week — theoretical vs actual food cost, recipe costing, the counts that matter, finding the real leak, and a 20-minute weekly ritual. Works with a clipboard or a connected system.',
    date: '2026-09-25',
    readTime: '8 min read',
    category: 'Operator Playbook',
    tags: ['Food Cost', 'Recipe Costing', 'Inventory', 'Waste', 'Prime Cost'],
  },
  {
    slug: 'prime-cost',
    title: "Prime Cost: The One Number That Tells You If You'll Make It",
    excerpt:
      'Food cost can look fine while labor sinks you. Prime cost combines the two — the costs you actually control — into a single honest read on profitability. What it is, how to calculate it, a healthy target, and how to track it weekly.',
    date: '2026-09-25',
    readTime: '7 min read',
    category: 'Operator Playbook',
    tags: ['Prime Cost', 'Profitability', 'Food & Labor', 'Weekly Numbers'],
  },
  {
    slug: 'labor-scheduling',
    title: "Scheduling So Labor Doesn't Eat Your Margin",
    excerpt:
      'Labor is the cost you control in real time — and the one that quietly sinks healthy restaurants. Build to demand instead of habit, set a labor target as a share of sales, catch overtime before payroll, and watch coverage live.',
    date: '2026-09-25',
    readTime: '8 min read',
    category: 'Operator Playbook',
    tags: ['Scheduling', 'Labor Cost', 'Overtime', 'Staffing'],
  },
  {
    slug: 'reduce-no-shows',
    title: 'Cutting No-Shows Without Treating Guests Like Suspects',
    excerpt:
      'Most no-shows are forgetfulness, not malice — so the fix is a gentle nudge and a one-tap cancel, not punitive fees. The reminder cadence that works, when deposits help vs. backfire, and using a live waitlist as a safety net.',
    date: '2026-09-25',
    readTime: '7 min read',
    category: 'Operator Playbook',
    tags: ['Reservations', 'No-Shows', 'Waitlist', 'Guest Experience'],
  },
  {
    slug: 'multi-location',
    title: 'Running Two Locations Without Living in Spreadsheets',
    excerpt:
      'Going from one restaurant to two breaks the informal systems that worked solo. Decide what stays central vs. local, standardize recipes and definitions, and compare locations fairly — without a spreadsheet relay every Sunday night.',
    date: '2026-09-25',
    readTime: '8 min read',
    category: 'Operator Playbook',
    tags: ['Multi-Location', 'Standardization', 'Reporting', 'Scaling'],
  },
  {
    slug: 'connected-tools',
    title: 'Why Your POS, Scheduling, and Inventory Not Talking Is Quietly Costing You',
    excerpt:
      "Most restaurants run five tools that never share data — and the gaps between them leak time and money through double entry, numbers that never agree, and decisions made on stale data. What the disconnection really costs, and what to fix first.",
    date: '2026-09-25',
    readTime: '7 min read',
    category: 'Operator Playbook',
    tags: ['Connected System', 'Integration', 'Operations', 'Data'],
  },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl"
          />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
                  The VexaOS Blog
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text tracking-tight">
                Connected Systems, Explained
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Deep dives, case studies, and field notes on running a real business on
                one connected system — web, mobile, touchscreen, and dashboards in sync.
              </p>
            </div>

            {/* Featured post */}
            <Link
              href={`/blog/${featured.slug}`}
              className="group block relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 via-blue-600/[0.06] to-transparent p-8 sm:p-10 mb-12 hover:border-cyan-400/40 transition-all"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-10 h-56 w-72 rounded-full bg-cyan-500/10 blur-3xl"
              />
              <div className="relative">
                {featured.image && (
                  <div className="relative mb-7 rounded-2xl overflow-hidden border border-cyan-500/20 ring-1 ring-white/5">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt ?? featured.title}
                      width={1600}
                      height={900}
                      priority
                      sizes="(max-width: 1024px) 100vw, 960px"
                      className="w-full h-auto"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured · {featured.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-300 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-3xl mb-6">
                  {featured.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                    Read the deep dive
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Rest of posts */}
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 p-7 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border border-cyan-500/20 p-10 sm:p-12">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Take what&rsquo;s useful here.
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Every playbook on this page works with whatever you run today — no software required.
                If you ever want to see how VexaOS makes these automatic, the door&rsquo;s open. No pitch.
              </p>
              <Link
                href="/restaurants"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
              >
                See how VexaOS helps
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
