import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: "Scheduling So Labor Doesn't Eat Your Margin | VexaOS",
  description:
    'A practical guide to restaurant scheduling that protects your margin — building to demand, catching overtime before it happens, tracking labor as a percentage of sales, and giving staff a fair heads-up. Works with any tool.',
  keywords: [
    'restaurant scheduling',
    'labor cost percentage',
    'reduce overtime restaurant',
    'demand-based scheduling',
    'labor vs sales',
    'staff scheduling',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog/labor-scheduling' },
  openGraph: {
    title: "Scheduling So Labor Doesn't Eat Your Margin",
    description:
      'Build to demand, catch overtime before it happens, and track labor as a share of sales.',
    url: 'https://www.vexaos.io/blog/labor-scheduling',
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

export default function LaborSchedulingPost() {
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
            Scheduling so labor doesn&rsquo;t eat your margin
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Sep 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
          </div>

          <P>
            Labor is the cost you control in real time — and the one that quietly sinks otherwise-healthy restaurants.
            Overstaff a slow Tuesday and you&rsquo;ve given away the night&rsquo;s profit; understaff a rush and you&rsquo;ve
            traded reviews and burnout for a few saved dollars. The fix isn&rsquo;t working your team harder. It&rsquo;s
            scheduling to reality and watching one number.
          </P>

          <H2>Schedule to demand, not to habit</H2>
          <P>
            Most schedules are copied from last week, which was copied from the week before. Instead, build from what
            actually happens: pull the last 4–6 weeks of sales by day and by hour. You&rsquo;ll see your real peaks and
            lulls — and they&rsquo;re rarely evenly spread. Staff the peaks properly and trim the dead hours. A cook who
            starts at 4 instead of 3 on a slow day, times a month, is real money back.
          </P>

          <H2>Set a labor target as a percent of sales</H2>
          <P>
            &ldquo;How many people do I need&rdquo; is the wrong question. The right one is &ldquo;what should labor cost as
            a share of the sales this shift will do?&rdquo; Pick a target labor % for each daypart, forecast the shift&rsquo;s
            sales, and schedule to hit it. Now every scheduling decision has a yardstick instead of a gut feeling.
          </P>

          <H2>Catch overtime before it happens, not at payroll</H2>
          <P>
            Overtime discovered on the payroll run is money already gone. The habit that prevents it: before you publish,
            add up each person&rsquo;s scheduled hours for the week and flag anyone near the overtime line. Mid-week, glance
            at who&rsquo;s trending over. Almost all overtime is a scheduling oversight, not a staffing necessity —
            it&rsquo;s preventable if you see it a few days early.
          </P>

          <H2>Publish early and make swaps easy</H2>
          <P>
            A schedule posted the night before guarantees call-outs and no-shows. Publish at least a week out so people can
            plan their lives — you&rsquo;ll get better attendance and less turnover. And give staff a clean way to swap
            shifts <em>with approval</em>, so coverage stays intact without a flurry of group-chat messages you have to
            referee.
          </P>

          <H2>Watch coverage against the floor, live</H2>
          <P>
            The plan is only half of it. On the day, keep an eye on who&rsquo;s actually clocked in versus scheduled. A
            no-call during a rush needs a fast response; three people clocked in on a dead afternoon needs an early cut.
            The managers who protect margin are the ones watching coverage in the moment, not reconstructing it later.
          </P>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="mono-label text-gray-500">Where a connected system helps</p>
            <P>
              A spreadsheet and your POS reports can do all of this — it just takes discipline. Where a connected system
              helps is by closing the loop: the schedule is built beside real sales history, labor cost updates as you drag
              shifts, overtime is flagged before you publish, and clock-ins show against the schedule live. That&rsquo;s
              what VexaOS is built to make automatic — but the targets and the weekly rhythm above are what move the number.
            </P>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <P>
              More operator playbooks are in <Link href="/blog" className="text-cyan-300 hover:text-cyan-200">Insights</Link>.
              If you want to see scheduling, clock-in, and labor cost working as one system, we&rsquo;re happy to walk you
              through it — no pressure.
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
