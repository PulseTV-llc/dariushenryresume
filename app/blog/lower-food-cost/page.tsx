import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'How to Actually Lower Your Food Cost (Without Cutting Corners) | VexaOS',
  description:
    'A practical, no-nonsense playbook for restaurant owners to bring food cost down — recipe costing, the counts that matter, finding the real leaks, and making it a weekly habit. Works whether you run a clipboard or a connected system.',
  keywords: [
    'lower food cost',
    'restaurant food cost percentage',
    'recipe costing',
    'theoretical vs actual food cost',
    'restaurant inventory',
    'reduce food waste restaurant',
    'prime cost',
  ],
  alternates: { canonical: 'https://www.vexaos.io/blog/lower-food-cost' },
  openGraph: {
    title: 'How to Actually Lower Your Food Cost (Without Cutting Corners)',
    description:
      'A practical playbook to bring food cost down — recipe costing, the counts that matter, finding the real leaks, and making it a habit.',
    url: 'https://www.vexaos.io/blog/lower-food-cost',
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

export default function LowerFoodCostPost() {
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
            How to actually lower your food cost — without cutting corners
          </h1>

          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Sep 25, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
          </div>

          <P>
            Food cost is the number most owners feel in their gut and can&rsquo;t quite pin down. You know it&rsquo;s
            &ldquo;a little high,&rdquo; but where the money actually leaks is fuzzy. The good news: you don&rsquo;t
            need new software or a consultant to fix it. You need a repeatable habit and a few honest numbers. Here&rsquo;s
            the playbook we&rsquo;d hand any operator, whether you track it on paper or on a screen.
          </P>

          <H2>First, know the two food costs</H2>
          <P>
            There&rsquo;s <strong className="text-white">theoretical</strong> food cost — what your dishes <em>should</em>{' '}
            cost based on their recipes — and <strong className="text-white">actual</strong> food cost — what you truly
            spent, measured from inventory: opening stock + purchases − closing stock, divided by sales. The gap between
            the two is where your money is going. Most owners only ever see actual (from invoices) and guess at the rest.
            Closing that gap is the whole game.
          </P>

          <H2>Step 1 — Cost your recipes (the top 10 first)</H2>
          <P>
            You don&rsquo;t need to cost the whole menu on day one. Take your ten best-selling items and write down every
            ingredient, its quantity, and what you pay for it. That gives you a plate cost and a target food-cost % per
            dish. You&rsquo;ll almost always find one or two &ldquo;favorites&rdquo; that barely make money — and a couple
            of quiet winners worth pushing. That knowledge alone changes how you price and promote.
          </P>

          <H2>Step 2 — Count what matters, weekly</H2>
          <P>
            A full inventory count is painful, so people skip it — and then fly blind. Instead, count the 15–20 items
            that make up most of your spend and spoil fastest: proteins, dairy, produce, and anything expensive.
            A focused weekly count on the same day, at the same time, beats a perfect monthly count you never actually do.
          </P>

          <H2>Step 3 — Find the real leak</H2>
          <P>When actual runs higher than theoretical, it&rsquo;s almost always one of four things:</P>
          <ul className="mt-4 space-y-2 text-[17px] text-gray-300">
            <li className="flex gap-3"><span className="text-cyan-400">1.</span> <span><strong className="text-white">Over-portioning</strong> — the cook&rsquo;s &ldquo;generous&rdquo; hand adds up over hundreds of plates. Weigh a few portions against the spec.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">2.</span> <span><strong className="text-white">Waste &amp; spoilage</strong> — prep too much, trim carelessly, or let stock die in the walk-in. Log the trash for one week; it&rsquo;s eye-opening.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">3.</span> <span><strong className="text-white">Price creep</strong> — vendors nudge prices up and nobody notices. Spot-check your five biggest invoices month over month.</span></li>
            <li className="flex gap-3"><span className="text-cyan-400">4.</span> <span><strong className="text-white">Shrinkage</strong> — comps, voids, and the occasional theft. If comps aren&rsquo;t tracked, they&rsquo;re invisible.</span></li>
          </ul>

          <H2>Step 4 — Fix the biggest leak, not all of them</H2>
          <P>
            Pick the single largest gap and attack it for two weeks. Re-spec the over-portioned dish. Put a scale on the
            line. Renegotiate the one vendor whose prices crept. Small, focused fixes on high-volume items move the number
            far more than a dozen tiny changes you can&rsquo;t sustain.
          </P>

          <H2>Step 5 — Make it a 20-minute weekly ritual</H2>
          <P>
            Same day each week: quick count, compare actual vs theoretical, note the gap, pick one thing to fix. Food cost
            isn&rsquo;t a project you finish — it&rsquo;s a dial you keep your hand on. Owners who check it weekly quietly
            run 3–6 points lower than those who look at it quarterly, and that&rsquo;s often the difference between a
            profitable month and a scary one.
          </P>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <p className="mono-label text-gray-500">Where a connected system helps</p>
            <P>
              Everything above works with a clipboard and a calculator — genuinely. Where a connected system earns its
              keep is by removing the manual math: recipes are costed against live vendor prices, every sale deducts
              ingredients automatically, and the theoretical-vs-actual gap shows up on its own instead of once a quarter.
              That&rsquo;s the problem VexaOS is built to make automatic — but the habit matters more than the tool, and
              you can start it tomorrow.
            </P>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <P>
              Want the reservation and labor versions of this playbook? They&rsquo;re next in{' '}
              <Link href="/blog" className="text-cyan-300 hover:text-cyan-200">Insights</Link>. And if you&rsquo;d ever
              like to see how a single connected system handles the counting for you, we&rsquo;re happy to walk you
              through it — no pressure.
            </P>
            <Link
              href="/restaurants"
              className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              See how VexaOS runs a restaurant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
