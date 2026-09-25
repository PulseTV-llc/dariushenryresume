import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: "Prime Cost: The One Number That Tells You If You'll Make It | VexaOS",
  description:
    'Prime cost — food + labor combined — is the clearest signal of whether a restaurant will survive. Here is what it is, how to calculate it, what a healthy target looks like, and how to track it weekly instead of finding out too late.',
  keywords: [
    'prime cost',
    'restaurant prime cost',
    'food and labor cost',
    'prime cost percentage',
    'restaurant profitability',
    'COGS plus labor',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog/prime-cost' },
  openGraph: {
    title: "Prime Cost: The One Number That Tells You If You'll Make It",
    description: 'Food + labor, combined — what it is, how to calculate it, and how to track it weekly.',
    url: 'https://www.vexaos.io/blog/prime-cost',
    type: 'article',
    siteName: 'VexaOS',
  },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 mb-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[17px] leading-relaxed text-gray-300">{children}</p>;
}

export default function PrimeCostPost() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            Operator Playbook
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold gradient-text tracking-tight leading-[1.08]">
            Prime cost: the one number that tells you if you&rsquo;ll make it
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Sep 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>

          <P>
            If you could track only one number in your restaurant, it should be prime cost. Food cost alone can look fine
            while labor sinks you; labor can look fine while food creeps. Prime cost combines the two — the costs you most
            control — into a single honest read on whether the doors stay open.
          </P>

          <H2>What prime cost is</H2>
          <P>
            Prime cost = <strong className="text-white">cost of goods sold (food + beverage) + total labor</strong>{' '}
            (wages, salaries, payroll taxes, and benefits). Divide it by sales and you get your prime cost percentage.
            Everything left over after prime cost has to cover rent, utilities, equipment, marketing — and profit. That&rsquo;s
            why it&rsquo;s the number: it&rsquo;s the biggest slice, and the one you can actually change week to week.
          </P>

          <H2>What a healthy number looks like</H2>
          <P>
            For most full-service restaurants, a prime cost around <strong className="text-white">60% of sales or below</strong>{' '}
            is the target; quick-service can often run a little lower. Above ~65% and profit gets very thin very fast. These
            are guidelines, not gospel — a high-rent location or a premium concept shifts the math — but if your prime cost
            is drifting toward 70%, something needs attention now, not at year-end.
          </P>

          <H2>Calculate it (a worked example)</H2>
          <P>
            Say a week did <strong className="text-white">$40,000</strong> in sales. Food + beverage cost was{' '}
            <strong className="text-white">$12,000</strong> (30%) and total labor was <strong className="text-white">$13,000</strong>{' '}
            (32.5%). Prime cost is $25,000, or <strong className="text-white">62.5%</strong> of sales. That&rsquo;s close to
            target — a small trim in either lever pulls it under 60%. The power is in seeing both together: if you&rsquo;d
            only watched food (a healthy 30%), you&rsquo;d have missed that labor was doing the damage.
          </P>

          <H2>Track it weekly, not monthly</H2>
          <P>
            Monthly prime cost tells you what already happened. Weekly prime cost lets you steer. Same day each week, pull
            your food cost (from a focused inventory count) and your labor (from the schedule and timeclock), add them,
            divide by the week&rsquo;s sales. One number, one trend line. When it ticks up, you&rsquo;ll usually know which
            lever moved — and you can act while the month is still savable.
          </P>

          <H2>Move the number with the two levers</H2>
          <P>
            Prime cost only has two dials, which is what makes it manageable. If it&rsquo;s high, ask: is it food (portioning,
            waste, vendor prices) or labor (overstaffing, overtime, slow-hour coverage)? Diagnose which half is off, fix the
            bigger one first, and re-measure next week. You don&rsquo;t need to optimize everything — you need to know which
            dial to turn.
          </P>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="mono-label text-gray-500">Where a connected system helps</p>
            <P>
              You can compute prime cost with two reports and a calculator every week — and you absolutely should, even if
              that&rsquo;s all you do. Where a connected system helps is by keeping both halves live in one place: sales,
              food cost, and labor sit on the same data, so prime cost is a number you glance at rather than assemble.
              That&rsquo;s what VexaOS is built to surface automatically — but the weekly habit is the real edge.
            </P>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <P>
              More operator playbooks are in <Link href="/blog" className="text-cyan-300 hover:text-cyan-200">Insights</Link>.
              If you&rsquo;d like to see food, labor, and sales tracked together as one system, we&rsquo;re happy to show you —
              no pressure.
            </P>
            <Link href="/restaurants" className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold">
              See how VexaOS runs a restaurant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
