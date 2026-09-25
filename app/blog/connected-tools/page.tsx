import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Why Your POS, Scheduling, and Inventory Not Talking Is Quietly Costing You | VexaOS',
  description:
    'Most restaurants run five tools that never share data — and the gaps between them leak time and money. A plain look at the hidden cost of disconnected systems, and what to fix first, whether or not you ever change software.',
  keywords: [
    'disconnected restaurant systems',
    'restaurant software integration',
    'POS scheduling inventory',
    'connected restaurant system',
    'restaurant tech stack',
    'double entry restaurant',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog/connected-tools' },
  openGraph: {
    title: 'Why Your POS, Scheduling, and Inventory Not Talking Is Quietly Costing You',
    description: 'The hidden cost of disconnected restaurant systems — and what to fix first.',
    url: 'https://www.vexaos.io/blog/connected-tools',
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

export default function ConnectedToolsPost() {
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
            Why your POS, scheduling, and inventory not talking is quietly costing you
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Sep 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>

          <P>
            Walk into most restaurants and you&rsquo;ll find five or six separate tools: a POS, a scheduling app, an
            inventory sheet, a reservations service, a payroll system, maybe a loyalty app. Each one works. The problem
            isn&rsquo;t any single tool — it&rsquo;s the <em>gaps between them</em>, and those gaps are where time and money
            quietly disappear. This isn&rsquo;t a pitch to buy anything; it&rsquo;s a look at a cost most owners never put a
            number on.
          </P>

          <H2>The tax you pay in double entry</H2>
          <P>
            When systems don&rsquo;t share data, humans become the integration. A new menu item gets typed into the POS,
            then the recipe tool, then the online ordering menu. A new hire is entered in scheduling, then payroll, then the
            POS. Every one of these is a chance to fumble a price, a wage, or a spelling — and someone spends hours each
            week keeping the copies in sync. That labor is invisible on any report, but it&rsquo;s real.
          </P>

          <H2>Numbers that never quite agree</H2>
          <P>
            Your POS says one sales figure, your accounting another, your delivery apps a third. Nobody&rsquo;s lying —
            they&rsquo;re just counting differently, and none of them knows about the others. So you can&rsquo;t trust any
            single number without reconciling all of them, which means you reconcile late, or not at all, and make decisions
            on figures you&rsquo;re not sure of.
          </P>

          <H2>Decisions made on stale, partial data</H2>
          <P>
            The real cost isn&rsquo;t the busywork — it&rsquo;s the decisions you can&rsquo;t make. You can&rsquo;t see labor
            against sales <em>during</em> the shift because they live in different apps. You can&rsquo;t see food cost move
            when a dish sells because the POS and inventory don&rsquo;t speak. By the time the picture is assembled,
            it&rsquo;s a week old and the moment to act has passed. Disconnected tools don&rsquo;t just cost time; they cost
            the timing.
          </P>

          <H2>What to fix first (no new software required)</H2>
          <P>
            You don&rsquo;t have to replace everything tomorrow. Start here:
          </P>
          <ul className="mt-4 space-y-2 text-[17px] text-gray-300">
            <li className="flex gap-3"><span className="text-cyan-400">1.</span> <span><strong className="text-white">Pick one source of truth</strong> per fact — one place that owns the menu, one that owns the staff list — and make the others follow it.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">2.</span> <span><strong className="text-white">Agree on definitions</strong> so &ldquo;sales&rdquo; and &ldquo;labor&rdquo; mean the same thing across tools.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">3.</span> <span><strong className="text-white">Count the double entry</strong> — list every place the same fact is typed twice. That list is your integration wishlist.</span></li>
          </ul>
          <P>
            Do just this and you&rsquo;ll claw back hours and trust your numbers more — with the tools you already own.
          </P>

          <H2>When it&rsquo;s worth consolidating</H2>
          <P>
            At some point the seams cost more than the switch. The signal: you&rsquo;re paying someone to reconcile systems,
            decisions wait on assembling data, and growth (a second location, delivery, catering) keeps multiplying the
            copies. That&rsquo;s when one connected system stops being a nice-to-have and starts paying for itself — not
            because any tool was bad, but because the <em>gaps</em> finally cost more than the tools.
          </P>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="mono-label text-gray-500">Where a connected system helps</p>
            <P>
              This is the exact problem VexaOS was built to solve: one system where the POS, kitchen, scheduling, inventory,
              reservations, and financials share the same data — so a menu change happens once, sales and labor sit side by
              side live, and food cost moves as dishes sell. We&rsquo;re not saying rip out what works today. But if the
              gaps above sound familiar, that&rsquo;s the cost a single connected system removes.
            </P>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <P>
              More operator playbooks are in <Link href="/blog" className="text-cyan-300 hover:text-cyan-200">Insights</Link>.
              If you want to see what one connected system actually looks like, take a look — no pressure.
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
