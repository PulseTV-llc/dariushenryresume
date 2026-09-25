import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Running Two Locations Without Living in Spreadsheets | VexaOS',
  description:
    'Going from one restaurant to two breaks the systems that worked solo. A practical guide to standardizing recipes, prices, and reporting, defining what stays central vs. local, and comparing locations fairly — without a spreadsheet empire.',
  keywords: [
    'multi-location restaurant',
    'second restaurant location',
    'restaurant standardization',
    'multi-unit operations',
    'compare restaurant locations',
    'restaurant reporting',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog/multi-location' },
  openGraph: {
    title: 'Running Two Locations Without Living in Spreadsheets',
    description: 'Standardize recipes, prices, and reporting; decide what stays central vs. local.',
    url: 'https://www.vexaos.io/blog/multi-location',
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

export default function MultiLocationPost() {
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
            Running two locations without living in spreadsheets
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Sep 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
          </div>

          <P>
            The jump from one restaurant to two is deceptively brutal. When you had one location, you <em>were</em> the
            system — you knew the numbers, the staff, and the problems by walking the floor. With two, you can only be in
            one place at a time, and the informal ways you ran things quietly stop scaling. The trap most owners fall into
            is patching the gap with spreadsheets emailed back and forth. Here&rsquo;s how to grow without building a
            spreadsheet empire.
          </P>

          <H2>Decide what&rsquo;s central and what&rsquo;s local</H2>
          <P>
            The core question of multi-unit operations: what should be identical everywhere, and what should each location
            control? A useful split:
          </P>
          <ul className="mt-4 space-y-2 text-[17px] text-gray-300">
            <li className="flex gap-3"><span className="text-cyan-400">•</span> <span><strong className="text-white">Central:</strong> recipes and specs, menu and pricing structure, brand standards, roles and permissions, the definitions you report on.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">•</span> <span><strong className="text-white">Local:</strong> the schedule, daily ordering, local staffing, and day-to-day floor decisions.</span></li>
          </ul>
          <P>
            Write this down. Ambiguity here is what creates the &ldquo;every location does it differently&rdquo; chaos that
            makes numbers impossible to compare.
          </P>

          <H2>Standardize recipes and specs first</H2>
          <P>
            If a dish is plated one way in location A and another in B, your food cost, quality, and guest experience all
            drift apart — and you can&rsquo;t tell whether B is less profitable or just doing it differently. One master
            recipe book, one spec per dish, rolled out to both kitchens. This single move makes everything downstream
            comparable.
          </P>

          <H2>Report on the same definitions</H2>
          <P>
            &ldquo;Sales are up&rdquo; means nothing if the two locations count comps, voids, and hours differently. Agree
            on the exact definitions — net sales, labor %, food cost %, covers — and make sure both locations produce them
            the same way. Comparability is the entire point of having more than one location; without it, you&rsquo;re
            running two unrelated businesses that happen to share a logo.
          </P>

          <H2>Compare locations, don&rsquo;t just total them</H2>
          <P>
            The value of two locations is the ability to learn from the difference. Put them side by side on the same
            metrics every week. When A&rsquo;s labor runs 4 points lower than B&rsquo;s on similar sales, that&rsquo;s a
            lesson to carry over — not just a number to average away. A rollup that only sums both hides exactly the signal
            you opened a second location to get.
          </P>

          <H2>Kill the spreadsheet relay</H2>
          <P>
            The failure mode is predictable: each location keeps its own spreadsheet, emails it Sunday night, and you spend
            Monday reconciling versions that never quite agree. It&rsquo;s slow, error-prone, and always a few days stale.
            Whatever you use, the goal is one source of truth both locations write into — so &ldquo;the numbers&rdquo; are a
            single, current thing, not a pile of attachments.
          </P>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="mono-label text-gray-500">Where a connected system helps</p>
            <P>
              You can hold this together with strong templates and discipline for a while. Where a connected system helps is
              exactly the seam that breaks: recipes and prices set once and inherited by every location, one org-wide data
              layer so each location&rsquo;s numbers are defined identically, and a control center that compares them side by
              side in real time. That&rsquo;s the problem VexaOS is built for — but the central-vs-local discipline above is
              what makes any tool work.
            </P>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <P>
              More operator playbooks are in <Link href="/blog" className="text-cyan-300 hover:text-cyan-200">Insights</Link>.
              If you&rsquo;d like to see multi-location running on one system, we&rsquo;re happy to show you — no pressure.
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
