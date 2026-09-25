import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Cutting No-Shows Without Treating Guests Like Suspects | VexaOS',
  description:
    'A practical guide to reducing restaurant no-shows — the reminder cadence that works, when deposits help vs. backfire, using a waitlist as a safety net, and how to measure your no-show rate. Guest-friendly, not punitive.',
  keywords: [
    'restaurant no-shows',
    'reduce no-shows',
    'reservation deposits',
    'restaurant waitlist',
    'reservation reminders',
    'no-show rate',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog/reduce-no-shows' },
  openGraph: {
    title: 'Cutting No-Shows Without Treating Guests Like Suspects',
    description:
      'The reminder cadence that works, when deposits help vs. backfire, and using a waitlist as a safety net.',
    url: 'https://www.vexaos.io/blog/reduce-no-shows',
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

export default function ReduceNoShowsPost() {
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
            Cutting no-shows without treating guests like suspects
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Sep 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7 min read</span>
          </div>

          <P>
            A no-show isn&rsquo;t just an empty table — it&rsquo;s food prepped, staff scheduled, and a table you turned
            other guests away from. But the usual &ldquo;fix&rdquo; — demanding a card and threatening a fee — can make
            loyal guests feel mistrusted and quietly send them elsewhere. The goal isn&rsquo;t to punish people; it&rsquo;s
            to make it easy to show up and easy to tell you when they can&rsquo;t. Here&rsquo;s how.
          </P>

          <H2>Understand why people flake</H2>
          <P>
            Most no-shows aren&rsquo;t malicious. People double-book, forget, or feel awkward canceling and just
            &hellip; don&rsquo;t. That&rsquo;s good news: the majority of no-shows are preventable with a gentle nudge and
            a frictionless way to cancel. Solve the forgetting and the awkwardness, and your rate drops before you ever
            touch deposits.
          </P>

          <H2>The reminder cadence that actually works</H2>
          <P>
            One confirmation at booking isn&rsquo;t enough, and five reminders is annoying. The pattern that consistently
            works:
          </P>
          <ul className="mt-4 space-y-2 text-[17px] text-gray-300">
            <li className="flex gap-3"><span className="text-cyan-400">•</span> <span><strong className="text-white">At booking:</strong> instant confirmation with the date, time, party size, and a one-tap &ldquo;change or cancel&rdquo; link.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">•</span> <span><strong className="text-white">~24 hours before:</strong> a friendly reminder with that same one-tap link. This is the one that saves the most covers.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">•</span> <span><strong className="text-white">A few hours before (optional):</strong> a short &ldquo;see you tonight&rdquo; for large parties or prime slots.</span></li>
          </ul>
          <P>
            The magic isn&rsquo;t the reminder — it&rsquo;s the effortless cancel. If backing out takes one tap, people
            do it, and you get the table back in time to rebook it.
          </P>

          <H2>When deposits help — and when they backfire</H2>
          <P>
            Deposits and card-holds are a tool, not a default. They earn their keep for the situations that actually hurt:
            large parties, holidays, tasting menus, and prime weekend windows. Applied there, guests understand it.
          </P>
          <P>
            Applied to a Tuesday two-top, they read as &ldquo;we don&rsquo;t trust you&rdquo; and cost you bookings. Rule
            of thumb: use a hold only where a no-show is expensive and hard to backfill, keep it modest, and make the terms
            plain at booking. A surprise fee creates a bad review; a clear, expected one doesn&rsquo;t.
          </P>

          <H2>Make the waitlist your safety net</H2>
          <P>
            Even with great reminders, some tables will open at the last minute. A live waitlist turns that loss into a
            win: when a cancel comes in, the freed table is offered to the next waiting party automatically. Same table,
            same night, no revenue lost. A waitlist quietly does more for your bottom line than any fee.
          </P>

          <H2>Measure it, or you&rsquo;re guessing</H2>
          <P>
            You can&rsquo;t improve what you don&rsquo;t track. Log your no-show rate weekly (no-shows ÷ total
            reservations). Watch it by day and by slot — you&rsquo;ll find the risky windows worth a deposit and the ones
            that are fine as-is. A rate under ~4–5% is healthy for most rooms; if you&rsquo;re well above that, the
            reminder cadence is usually the first fix, not fees.
          </P>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="mono-label text-gray-500">Where a connected system helps</p>
            <P>
              You can run all of this with a booking tool and a calendar. Where a connected system helps is by tying it
              together: reminders send themselves, a cancel instantly offers the table to the waitlist, and your no-show
              rate by slot is just there — no spreadsheet. That&rsquo;s the kind of thing VexaOS is built to automate, but
              the cadence above works with whatever you use today.
            </P>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <P>
              More operator playbooks are in <Link href="/blog" className="text-cyan-300 hover:text-cyan-200">Insights</Link>.
              If you&rsquo;d like to see how VexaOS handles reservations, waitlist, and reminders as one system, we&rsquo;re
              glad to show you — no pressure.
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
