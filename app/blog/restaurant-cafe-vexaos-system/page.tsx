import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  Bell,
  BookOpen,
  Boxes,
  Building2,
  Calendar,
  Clock,
  ChefHat,
  CheckCircle2,
  ConciergeBell,
  CreditCard,
  DollarSign,
  Flame,
  Gift,
  LayoutDashboard,
  Leaf,
  LineChart,
  MapPin,
  Monitor,
  Package,
  Percent,
  QrCode,
  Receipt,
  ScanBarcode,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Timer,
  Trash2,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Users,
  Wallet,
} from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'How a Restaurant or Café Runs Its Entire Business on VexaOS',
  description:
    'A vivid, in-depth walkthrough of a modern café + kitchen running its whole operation on one connected VexaOS system — online ordering, QR table ordering, self-order kiosk, handheld POS, a real-time Kitchen Display System, ingredient inventory, and a live owner dashboard — told as a single full service day at Ember & Oak, seen through the guest, the server, the kitchen line, and the owner.',
  keywords: [
    'restaurant POS system',
    'café ordering system',
    'kitchen display system',
    'KDS',
    'QR table ordering',
    'self-order kiosk',
    'restaurant management software',
    'connected restaurant system',
    'restaurant inventory software',
    'cost of goods per dish',
    'online ordering for restaurants',
    'restaurant reservations and waitlist',
    'restaurant loyalty program',
    'multi-location restaurant software',
    'café POS',
    'VexaOS',
  ],
  alternates: {
    canonical: 'https://www.vexaos.io/blog/restaurant-cafe-vexaos-system',
  },
  openGraph: {
    title: 'How a Restaurant or Café Runs Its Entire Business on VexaOS',
    description:
      'One connected system — online ordering, QR & kiosk, handheld POS, a real-time Kitchen Display System, ingredient inventory, and a live dashboard. Walk through a full service day at Ember & Oak on VexaOS.',
    url: 'https://www.vexaos.io/blog/restaurant-cafe-vexaos-system',
    type: 'article',
    siteName: 'VexaOS',
    images: [
      {
        url: 'https://www.vexaos.io/blog/ember-and-oak-vexaos.jpg',
        width: 1600,
        height: 900,
        alt: 'Ember & Oak café and kitchen running the VexaOS connected system — QR table ordering, self-order kiosk, handheld POS, and a live Kitchen Display System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How a Restaurant or Café Runs Its Entire Business on VexaOS',
    description:
      'Online ordering, QR & kiosk, handheld POS, a real-time KDS, ingredient inventory, and a live dashboard — one connected system. A full service day at Ember & Oak on VexaOS.',
    images: ['https://www.vexaos.io/blog/ember-and-oak-vexaos.jpg'],
  },
};

/* ---------- small presentational helpers (server-safe, no client JS) ---------- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
      {children}
    </span>
  );
}

/* A chapter opener keyed to a time of day and a point of view.
   This is the spine of the piece — each scene is one moment in the
   service day, seen from one side of the same connected system. */
function Chapter({
  time,
  vantage,
  icon: Icon,
  title,
}: {
  time: string;
  vantage: 'The Guest' | 'The Server' | 'The Kitchen Line' | 'The Owner' | 'The System';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-tight text-gray-300">
          <Clock className="w-3.5 h-3.5 text-cyan-300" />
          {time}
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-600/15 border border-cyan-500/30 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          <Icon className="w-3.5 h-3.5" />
          {vantage}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
        {title}
      </h2>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-white/10 mb-4">
        <Icon className="w-5 h-5 text-cyan-300" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <span className="text-gray-300 leading-relaxed">{children}</span>
    </li>
  );
}

/* The signature element of this post: whenever one action ripples across
   the whole system in real time, we surface the ripple itself — a single
   live pulse touching every screen at once. */
function ThreadPulse({
  trigger,
  children,
}: {
  trigger: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative my-8 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.08] via-blue-600/[0.04] to-transparent p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400/60 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
        </span>
        <Activity className="w-4 h-4 text-cyan-300" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          One action, everywhere at once
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        <span className="text-white font-medium">{trigger}</span> — and in the same
        instant, across the whole system:
      </p>
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function PulseItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
      <span className="text-gray-300 leading-relaxed">{children}</span>
    </li>
  );
}

/* Kitchen ticket flow — used to walk a single order through the line. */
function TicketRow({
  station,
  icon: Icon,
  item,
  state,
}: {
  station: string;
  icon: React.ComponentType<{ className?: string }>;
  item: string;
  state: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-white/10 shrink-0">
        <Icon className="w-4 h-4 text-cyan-300" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-cyan-400/80">
          {station}
        </div>
        <div className="text-sm text-white truncate">{item}</div>
      </div>
      <span className="text-xs text-gray-400 shrink-0">{state}</span>
    </div>
  );
}

export default function RestaurantCafePost() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-black">
        {/* ambient gradient wash */}
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl"
          />

          <article className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-14">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Pill>
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  Industry Deep Dive
                </Pill>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Jul 2, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    19 min read
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                <span className="text-white">How a Restaurant or Café Runs Its </span>
                <span className="gradient-text">Entire Business on VexaOS</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Not a tour of features — a <span className="text-white font-semibold">day</span>.
                One full service, open to close, at a café + kitchen we&apos;ll call{' '}
                <span className="text-white font-semibold">Ember &amp; Oak</span> — seen
                from four sides of the same connected system: the guest, the server, the
                kitchen line, and the owner.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Online Ordering',
                  'QR Table Ordering',
                  'Self-Order Kiosk',
                  'Handheld POS',
                  'Kitchen Display System',
                  'Ingredient Inventory',
                  'Live Owner Dashboard',
                  'Real-Time Sync',
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </header>

            {/* Hero image */}
            <figure className="relative mb-16 rounded-3xl overflow-hidden border border-cyan-500/25 shadow-2xl shadow-cyan-500/10 ring-1 ring-white/5">
              <Image
                src="/blog/ember-and-oak-vexaos.jpg"
                alt="Ember & Oak café + kitchen running VexaOS — self-order kiosk, live Kitchen Orders display, VexaOS POS, and QR order-and-pay"
                width={1600}
                height={900}
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="w-full h-auto"
              />
              {/* subtle brand gradient edge + bottom scrim for caption legibility */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cyan-400/10 rounded-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
              />
              <figcaption className="absolute bottom-0 inset-x-0 px-5 py-4 text-sm text-gray-300">
                <span className="text-white font-semibold">Ember &amp; Oak</span> — one
                full service running on VexaOS: order-here kiosk, live kitchen display,
                POS, and QR table ordering.
              </figcaption>
            </figure>

            {/* Intro */}
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-16">
              <p>
                A restaurant is the hardest kind of software problem there is, disguised
                as a plate of food. Dozens of orders are alive at once. Every one has a
                different clock — a flat white takes ninety seconds, a brunch board takes
                nine minutes, and they have to land on the same table at the same time.
                The dining room, the pass, the kitchen, the card reader, the delivery
                apps, and the walk-in fridge all need to agree about reality, constantly,
                while it&apos;s loud and everyone is moving.
              </p>
              <p>
                Most kitchens hold that together with a drawer full of disconnected tools:
                one tablet for the delivery app, another for the second delivery app, a
                register that doesn&apos;t know what the kitchen is doing, a clipboard on
                the walk-in door, and a printer spitting tickets that are wrong the moment
                something sells out. Every device is an island. The staff <em>is</em> the
                integration — retyping, shouting across the pass, and hoping.
              </p>
              <p>
                VexaOS replaces the drawer of tablets with one connected system. The site
                a guest orders from, the QR code on the table, the kiosk by the door, the
                handheld in the server&apos;s apron, the screen on the line, the scale in
                the stockroom, and the dashboard on the owner&apos;s phone are not separate
                products stitched together. They are one operating system, reading and
                writing to a single live source of truth, updating everywhere the instant
                anything changes.
              </p>
              <p>
                The best way to feel that isn&apos;t a feature list. It&apos;s a day. So
                let&apos;s work one — from the first flat white to the final reconciliation
                — and watch the same moment from every side of the pass.
              </p>
            </div>

            {/* ============================ CHAPTER 1 ============================ */}
            <section className="mb-20">
              <Chapter
                time="6:40 AM"
                vantage="The Owner"
                icon={LayoutDashboard}
                title="Before the doors open, the day is already legible"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Nadia owns Ember &amp; Oak. She used to arrive to a paper puzzle: how did
                yesterday actually do, is anyone calling out, did the produce order go in,
                are we about to run out of oat milk on the busiest morning of the week. On
                VexaOS, she opens one screen and the whole restaurant is already legible —
                last night reconciled itself, today is laid out, and the kitchen knows
                what it has before the first cook ties an apron.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={LineChart} title="Yesterday, already closed">
                  Net sales, covers, average check, comps, voids, and tips — reconciled
                  overnight because every order and every payment already lived in the
                  same system. No morning spent rebuilding numbers from a Z-report and a
                  stack of delivery emails.
                </FeatureCard>
                <FeatureCard icon={Users} title="Labor laid against the forecast">
                  Today&apos;s schedule sits next to today&apos;s projected covers, so
                  Nadia can see she&apos;s one server heavy at 2pm and light on the line
                  at the 6pm rush — and fix it before it costs her.
                </FeatureCard>
                <FeatureCard icon={Package} title="Par levels checked overnight">
                  The system already compared last night&apos;s counts to par and flagged
                  what&apos;s short. Oat milk, cold-brew concentrate, and brioche buns are
                  low; the reorder is drafted and waiting for a tap.
                </FeatureCard>
                <FeatureCard icon={BookOpen} title="The menu, primed for the day">
                  Weekend brunch is live, the two sold-out specials from last night are
                  already hidden, and today&apos;s feature — a peach-and-burrata toast — is
                  scheduled to appear at open across every channel at once.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed">
                None of this is a report she ran. It&apos;s just the state of the
                restaurant, waiting for her. The day hasn&apos;t started and she&apos;s
                already ahead of it.
              </p>
            </section>

            {/* ============================ CHAPTER 2 ============================ */}
            <section className="mb-20">
              <Chapter
                time="7:55 AM"
                vantage="The Guest"
                icon={Smartphone}
                title="The first order arrives before anyone unlocks the door"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Across town, a regular named Theo is still on his couch. He opens the
                Ember &amp; Oak app — the café&apos;s own brand on his home screen, not a
                third-party marketplace that owns the relationship and rents it back. He
                orders his usual oat flat white and a peach toast for pickup at 8:15,
                pays with his saved card, and watches the order move from{' '}
                <span className="text-white">Received</span> to{' '}
                <span className="text-white">Making</span> to{' '}
                <span className="text-white">Ready</span> in real time. He never called,
                never waited on hold, never stood in a line.
              </p>

              <p className="text-gray-300 leading-relaxed mb-8">
                The digital menu he ordered from is doing far more than listing prices.
                It&apos;s the same menu the kitchen, the kiosk, and the QR codes all read
                from — so it is never out of date, never contradicting itself between
                channels.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={BookOpen} title="A menu that sells and informs">
                  Real photography, clear pricing, and honest descriptions — plus
                  modifiers that actually match the kitchen&apos;s reality: oat, almond, or
                  whole; single or double; add avocado. Every option maps to a real recipe
                  and a real cost.
                </FeatureCard>
                <FeatureCard icon={Leaf} title="Allergens & dietary, built in">
                  Gluten-free, vegan, nut-free, and allergen flags live on each item, so a
                  guest with a real restriction can order with confidence instead of a
                  hopeful guess — and the kitchen sees the same flags on the ticket.
                </FeatureCard>
                <FeatureCard icon={Truck} title="Pickup & delivery, tracked live">
                  One flow for pickup and delivery, with live status and an accurate
                  ready-time the guest can actually trust — because the clock comes from
                  the kitchen&apos;s real load, not a fixed guess.
                </FeatureCard>
                <FeatureCard icon={Gift} title="Loyalty that remembers him">
                  Points post automatically, a free-drink reward is two visits away, and
                  his usual order is one tap to reorder. The relationship compounds instead
                  of resetting every time.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed">
                For Theo it feels effortless. What he can&apos;t see is that his order
                didn&apos;t land in an inbox someone has to watch. It went straight onto
                the same live thread the whole restaurant runs on — and it&apos;s already
                on the kitchen&apos;s screen.
              </p>

              <ThreadPulse trigger="Theo taps “Place order” at 7:55">
                <PulseItem>
                  The ticket appears on the <span className="text-white">Kitchen Display</span>,
                  routed to the espresso and cold stations, timed to be ready at 8:15.
                </PulseItem>
                <PulseItem>
                  His oat milk, espresso, and brioche are decremented from{' '}
                  <span className="text-white">inventory</span> the moment the item is made.
                </PulseItem>
                <PulseItem>
                  <span className="text-white">Loyalty points</span> are reserved to his
                  account and his ready-time estimate starts ticking.
                </PulseItem>
                <PulseItem>
                  The sale posts to the <span className="text-white">owner dashboard</span>{' '}
                  as pre-open pickup revenue — no re-entry, no reconciliation later.
                </PulseItem>
              </ThreadPulse>
            </section>

            {/* ============================ CHAPTER 3 ============================ */}
            <section className="mb-20">
              <Chapter
                time="11:15 AM"
                vantage="The Guest"
                icon={QrCode}
                title="A full room, and nobody stuck waiting to order"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                By late morning the room is full and the door is busy. This is where most
                cafés bottleneck — one register, one line, and every guest funneling
                through it. Ember &amp; Oak doesn&apos;t have one front door into the
                system; it has several, and they all write to the same place.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* QR table ordering */}
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500/[0.07] to-transparent border border-cyan-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <QrCode className="w-5 h-5 text-cyan-300" />
                    <h3 className="text-xl font-bold text-white">Order from the table</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-5">
                    A couple takes a window seat, scans the QR code on the table, and the
                    café&apos;s real menu opens on their phones — tied to that exact table
                    number.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <Bullet>They browse with photos, allergens, and modifiers and order at their own pace</Bullet>
                    <Bullet>The order lands on the kitchen screen tagged to Table 12 — no server relay needed</Bullet>
                    <Bullet>They add a second round of coffees later without flagging anyone down</Bullet>
                    <Bullet>They pay from the phone when ready, or leave it on the tab for the server to close</Bullet>
                  </ul>
                </div>

                {/* Self-order kiosk */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-600/[0.07] to-transparent border border-blue-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="w-5 h-5 text-blue-300" />
                    <h3 className="text-xl font-bold text-white">Order at the kiosk</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-5">
                    A grab-and-go guest skips the line entirely at the self-order
                    touchscreen by the door — the same menu, the same system, no cashier in
                    the middle.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <Bullet>Big, photo-forward menu that makes choosing fast and obvious</Bullet>
                    <Bullet>Smart upsells at the perfect moment — &quot;make it a combo?&quot;, &quot;add a cookie?&quot;</Bullet>
                    <Bullet>Pays at the screen; the order fires straight to the line</Bullet>
                    <Bullet>Never mishears an order, never forgets the upsell, never calls in sick</Bullet>
                  </ul>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                And for the guests who&apos;d rather not stand and wait for a table at all,
                the same system runs the front of the house before they even arrive:
              </p>

              <ul className="space-y-3 mb-8">
                <Bullet>
                  <span className="text-white font-medium">Reservations</span> booked online
                  drop straight onto the floor plan, so the host always knows what&apos;s
                  coming and when.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">A digital waitlist</span> texts
                  guests when their table is ready, so they can wander the block instead of
                  crowding the door — and nobody loses their place.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">Table status</span> — open,
                  seated, ordered, check dropped, turning — is live for the host, the
                  server, and the owner at the same time.
                </Bullet>
              </ul>

              <p className="text-gray-300 leading-relaxed">
                Three different guests, three different front doors — app, QR, kiosk — and
                a fourth walking up to the host stand. Four ways in, and not one of them is
                a separate system to reconcile later. They are all the same thread.
              </p>
            </section>

            {/* ============================ CHAPTER 4 ============================ */}
            <section className="mb-20">
              <Chapter
                time="12:30 PM"
                vantage="The Server"
                icon={ConciergeBell}
                title="The floor, run from an apron pocket"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Marco is working a six-table section at the height of the lunch rush. He
                never walks to a wall-mounted terminal, never writes a ticket he has to
                re-key, never sprints to the kitchen to add a note. The whole floor runs
                from the handheld in his apron — and everything he touches is the same live
                thread the guest and the kitchen are already on.
              </p>

              <p className="text-gray-300 leading-relaxed mb-8">
                A four-top waves him over. He takes the order tableside, tapping through
                the same photo-forward menu the guests see, choosing modifiers as they
                speak — &quot;burger medium, no onion, add egg; the salad with dressing on
                the side; a kids&apos; grilled cheese.&quot; The moment he hits send, the
                food is already on the line. He didn&apos;t transcribe anything.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={UtensilsCrossed} title="Tableside ordering, straight to the line">
                  Orders fire to the correct kitchen stations the instant they&apos;re
                  entered — no paper ticket, no runner, no &quot;did the kitchen get that?&quot;
                </FeatureCard>
                <FeatureCard icon={Timer} title="Coursing the kitchen actually respects">
                  Marco marks apps to fire now and mains to hold. The kitchen sees the
                  coursing and times it, so starters land first and entrées hit when the
                  table&apos;s ready — not all at once.
                </FeatureCard>
                <FeatureCard icon={Users} title="Tables & tabs, always in sync">
                  Open a tab, move a guest from the bar to a table, merge or split parties
                  — the tab follows the guest, and every device shows the same state.
                </FeatureCard>
                <FeatureCard icon={Receipt} title="Split checks without the panic">
                  Split by guest, by item, or evenly by headcount in a few taps. The
                  awkward &quot;can we split this?&quot; becomes a non-event instead of a
                  five-minute math problem at the register.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed">
                When the four-top&apos;s ready, Marco drops the check right at the table.
                They split it three ways — two cards and a phone tap — each with its own
                tip prompt, each getting its own receipt. He never left the floor, and the
                whole thing took the time it used to take just to walk to the register.
              </p>

              <ThreadPulse trigger="Marco sends the four-top’s order">
                <PulseItem>
                  The burger routes to the <span className="text-white">grill</span>, the
                  salad to <span className="text-white">cold</span>, the grilled cheese to{' '}
                  <span className="text-white">flat-top</span> — each on its own station&apos;s screen.
                </PulseItem>
                <PulseItem>
                  Coursing is honored: <span className="text-white">apps fire, mains hold</span>{' '}
                  until Marco calls them.
                </PulseItem>
                <PulseItem>
                  The added egg, extra avocado, and every ingredient tick down in{' '}
                  <span className="text-white">inventory</span> as each dish is built.
                </PulseItem>
                <PulseItem>
                  Table 7 flips to <span className="text-white">&quot;ordered&quot;</span> for the
                  host and the owner, and the check total starts building itself.
                </PulseItem>
              </ThreadPulse>
            </section>

            {/* ============================ CHAPTER 5 ============================ */}
            <section className="mb-20">
              <Chapter
                time="12:31 PM"
                vantage="The Kitchen Line"
                icon={ChefHat}
                title="On the line, the ticket is alive"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                One second after Marco hit send, the order is on the line — but not as a
                curling paper ticket that&apos;s wrong the moment something changes. On the
                Kitchen Display System (KDS), the order is a living thing: routed by
                station, timed by the system, and updated in real time as the rest of the
                restaurant moves around it.
              </p>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-4 h-4 text-cyan-300" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Table 7 · fired 12:31 · coursing: apps now, mains on call
                  </span>
                </div>
                <div className="space-y-2.5">
                  <TicketRow station="Grill" icon={Flame} item="Burger · med · no onion · +egg" state="on call" />
                  <TicketRow station="Cold" icon={Leaf} item="House salad · dressing on side" state="firing" />
                  <TicketRow station="Flat-top" icon={UtensilsCrossed} item="Kids grilled cheese" state="firing" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={Monitor} title="Routed by station, automatically">
                  Every item lands where it&apos;s cooked. The grill sees grill items, cold
                  sees cold, espresso sees drinks — nobody reads a full ticket hunting for
                  their one line.
                </FeatureCard>
                <FeatureCard icon={Timer} title="Timed and coursed">
                  The system watches cook times so a 9-minute burger and a 2-minute salad
                  finish together, and held mains fire on the expo&apos;s call — not the
                  second they&apos;re rung in.
                </FeatureCard>
                <FeatureCard icon={ConciergeBell} title="Bump bar at the pass">
                  The expo bumps each item as it&apos;s plated with a physical bump bar or a
                  tap. Completed tickets clear the screen, and the guest&apos;s status moves
                  the same instant.
                </FeatureCard>
                <FeatureCard icon={Leaf} title="Modifiers and allergens front and center">
                  &quot;No onion,&quot; &quot;add egg,&quot; and a real nut allergy show
                  bold on the ticket — the same flags the guest chose, carried through
                  untouched.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                Then the moment every kitchen dreads: the walk-in is down to the last two
                portions of short rib, and they&apos;re already spoken for. The expo taps{' '}
                <span className="text-white font-semibold">86</span> on the short rib
                special. In a stack of disconnected tools, that&apos;s the start of a bad
                hour — orders still coming in for a dish that&apos;s gone, servers
                apologizing, guests disappointed. Here, it&apos;s one tap, and the whole
                system already knows.
              </p>

              <ThreadPulse trigger="The line 86’s the short rib">
                <PulseItem>
                  It vanishes from the <span className="text-white">online menu and the app</span>{' '}
                  — new orders can&apos;t include it.
                </PulseItem>
                <PulseItem>
                  It greys out on every <span className="text-white">QR menu and the kiosk</span>{' '}
                  mid-session, so no guest can pick it.
                </PulseItem>
                <PulseItem>
                  It disappears from every <span className="text-white">server&apos;s handheld</span>,
                  so Marco can&apos;t ring it in by accident.
                </PulseItem>
                <PulseItem>
                  The <span className="text-white">dashboard</span> logs the 86 with a
                  timestamp, and inventory can auto-86 the next item the instant it hits zero.
                </PulseItem>
              </ThreadPulse>

              <p className="text-gray-300 leading-relaxed">
                No announcement across the pass. No server selling a dish that no longer
                exists. The item was 86&apos;d in one place and it was 86&apos;d{' '}
                <em>everywhere</em>, at once. That single behavior — a change in one place
                becoming true in every place instantly — is the whole point of running on
                one system instead of seven.
              </p>
            </section>

            {/* ============================ CHAPTER 6 — Payments ============================ */}
            <section className="mb-20">
              <Chapter
                time="1:10 PM"
                vantage="The Server"
                icon={CreditCard}
                title="Paying is just the last line of the same story"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Because the order already lives in the system, checkout isn&apos;t a second
                app to reconcile — it&apos;s the final step of the same ticket. The guest is
                known, the items are already there, and the payment writes straight back to
                the one source of truth everything else reads from.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={CreditCard} title="Tap, chip & digital wallets">
                  Modern payments built in — tap, chip, Apple Pay, Google Pay — at the
                  table, the counter, the kiosk, or from the guest&apos;s own phone.
                </FeatureCard>
                <FeatureCard icon={Wallet} title="Split payments & tips, done right">
                  Split across cards and people, each with its own tip prompt, tips routed
                  fairly to the team by your rules — no workaround, no back-of-napkin math.
                </FeatureCard>
                <FeatureCard icon={ShoppingBag} title="Food + retail in one transaction">
                  The brunch <em>and</em> the bag of house beans and a branded mug ring up
                  on one check, one tap, one receipt — the café and the retail shelf share
                  a register.
                </FeatureCard>
                <FeatureCard icon={Receipt} title="Digital receipts & self-closing books">
                  Texted or emailed receipts, and an end-of-day reconciliation that simply
                  adds up — because every dine-in, pickup, delivery, and retail sale was
                  already on the same thread.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed">
                At the end of the night there&apos;s no drawer of receipts, no matching the
                delivery apps against the register by hand, no guessing where a hundred
                dollars went. Every payment method, every channel, and every tip already
                agrees — because there was only ever one system doing the counting.
              </p>
            </section>

            {/* ============================ CHAPTER 7 — Inventory ============================ */}
            <section className="mb-20">
              <Chapter
                time="3:00 PM"
                vantage="The System"
                icon={Boxes}
                title="The quiet hour, where the margins are actually made"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Between the lunch and dinner rushes, most of the restaurant&apos;s real
                money is being won or lost — not on the menu price, but on what it costs to
                make each plate and how much of it ends up in the bin. This is the part
                no guest sees and most systems ignore. On VexaOS it&apos;s been running
                quietly under the whole service, because every dish sold already told the
                system exactly what it consumed.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={Boxes} title="Ingredient-level tracking">
                  Recipes map dishes to ingredients, so selling a burger depletes a bun,
                  a patty, and a slice of cheese — not a vague &quot;burger&quot; count.
                  Stock reflects what the kitchen actually used, in real time.
                </FeatureCard>
                <FeatureCard icon={Bell} title="Low-stock alerts & auto-86">
                  When an ingredient dips below par, VexaOS flags it; when it hits zero,
                  it can automatically 86 every dish that needs it across all channels —
                  before a single guest orders something you can&apos;t make.
                </FeatureCard>
                <FeatureCard icon={Truck} title="Supplier reorder in a tap">
                  Suppliers, costs, and order history live in one place, so the produce
                  and dairy reorders are drafted against par and sent with a confirmation,
                  not rebuilt from memory every week.
                </FeatureCard>
                <FeatureCard icon={Trash2} title="Waste tracking that closes the loop">
                  Log spoilage, spills, and comps, and the numbers reconcile against what
                  was sold — so the gap between &quot;should have&quot; and &quot;did have&quot;
                  shows up as a number you can act on, not a mystery at inventory time.
                </FeatureCard>
                <FeatureCard icon={ScanBarcode} title="Barcode for retail & packaged goods">
                  Bags of beans, bottled cold brew, branded merch — scanned in at
                  receiving and scanned at sale, so the retail side counts itself the same
                  way the kitchen does.
                </FeatureCard>
                <FeatureCard icon={Percent} title="Cost-of-goods per dish">
                  Because every plate is tied to its ingredients and their real costs,
                  VexaOS knows the food cost and margin of every item — so you can see which
                  best-seller is quietly unprofitable and which quiet item is a gold mine.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed">
                This is the difference between running a restaurant on feel and running it
                on facts. Not counting cans at midnight and guessing — knowing your food
                cost per dish, your waste, and your true margin, updated by the same sales
                that were happening all day anyway.
              </p>
            </section>

            {/* ============================ The Thread ============================ */}
            <section className="mb-20">
              <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.08] via-blue-600/[0.04] to-transparent p-8 sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 right-0 h-56 w-72 rounded-full bg-cyan-500/10 blur-3xl"
                />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
                      The thread that ties it together
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
                    One live source of truth, touched from every side
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Look back at the day and notice what never happened. Nobody re-typed an
                    order. No screen disagreed with another screen. A sold-out dish never
                    got sold twice. The delivery total never had to be reconciled against
                    the register by hand. That&apos;s not discipline — it&apos;s
                    architecture. Guest, server, kitchen, and owner were never using four
                    systems that sync. They were using <em>one</em> system from four sides.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    A guest orders on the app, and the kitchen screen already knows. A cook
                    86&apos;s a dish, and the kiosk greys it out mid-session. A server splits
                    a check, and the dashboard&apos;s revenue moves. An ingredient hits
                    zero, and every menu everywhere stops offering it. Change one thing in
                    one place, and it becomes true in every place, instantly. Everything
                    downstream of that one behavior is why the day felt calm.
                  </p>
                </div>
              </div>
            </section>

            {/* ============================ CHAPTER 8 — Owner close ============================ */}
            <section className="mb-20">
              <Chapter
                time="9:30 PM"
                vantage="The Owner"
                icon={TrendingUp}
                title="Close, and the whole day is already on one screen"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Last table paid, line broken down, Nadia opens the dashboard one more time.
                She isn&apos;t compiling anything — the day ran itself onto the screen while
                she worked. Every number she needs to run the business tomorrow is already
                here, live and reconciled.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={Users} title="Covers & the shape of the day">
                  Total covers, guests by hour, and the exact peaks and lulls — so she can
                  staff next Saturday against what actually happened, not a hunch.
                </FeatureCard>
                <FeatureCard icon={Timer} title="Table turn times">
                  Average turn by section and by daypart, so she can see where the room got
                  stuck and where service flowed — and turn one more table next week.
                </FeatureCard>
                <FeatureCard icon={UtensilsCrossed} title="Best-sellers & true margin">
                  Top dishes ranked not just by count but by the cost-of-goods insight from
                  inventory — popularity and profit side by side, so the menu decisions
                  write themselves.
                </FeatureCard>
                <FeatureCard icon={DollarSign} title="Labor vs. sales, live">
                  Labor cost as a share of sales through the day, so the number that quietly
                  sinks restaurants is visible while she can still do something about it.
                </FeatureCard>
                <FeatureCard icon={Truck} title="Channel performance">
                  Dine-in, pickup, first delivery app, second delivery app, kiosk, and QR —
                  each channel&apos;s sales and share in one view, so she knows what to
                  lean into and what to cut.
                </FeatureCard>
                <FeatureCard icon={Building2} title="Multi-location roll-up">
                  When Ember &amp; Oak opens a second café, one screen rolls both into a
                  single picture — or drills into either one. Growth is a rollout, not a
                  rebuild.
                </FeatureCard>
              </div>

              <p className="text-gray-300 leading-relaxed">
                She closes her phone and goes home. There&apos;s no back-office marathon
                waiting, no shoebox, no spreadsheet to rebuild at 11pm. The restaurant told
                her its own story in real time, and it added up.
              </p>
            </section>

            {/* ============================ Benefits ============================ */}
            <section className="mb-20">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
                    Why it matters
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  What one connected system actually changes
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FeatureCard icon={Boxes} title="One system, not a drawer of tablets">
                  No more register that ignores the kitchen that ignores the delivery
                  tablets that ignore the inventory sheet. One source of truth means nothing
                  is re-typed and nothing quietly disagrees.
                </FeatureCard>
                <FeatureCard icon={Timer} title="Faster turns, calmer service">
                  Orders fire the instant they&apos;re taken, coursing lands right, and the
                  line never chases a paper ticket — so tables turn faster and a full room
                  feels handled instead of frantic.
                </FeatureCard>
                <FeatureCard icon={CheckCircle2} title="Fewer wrong & missed orders">
                  Modifiers and allergens carry through untouched, and a sold-out dish
                  disappears everywhere at once — so the kitchen makes what the guest
                  actually ordered, and never what it can&apos;t.
                </FeatureCard>
                <FeatureCard icon={TrendingUp} title="Higher checks, honestly earned">
                  Smart, well-timed upsells on the kiosk and app — &quot;make it a
                  combo,&quot; &quot;add a cookie&quot; — lift the average check without a
                  single pushy word from your staff.
                </FeatureCard>
                <FeatureCard icon={Percent} title="Real cost & margin insight">
                  Food cost per dish, waste, and true margin — from the same sales that
                  happened all day. You price and prune the menu on facts, not feel.
                </FeatureCard>
                <FeatureCard icon={Building2} title="Effortless scaling to more locations">
                  The system that runs one café runs ten. Every new location plugs into the
                  same live dashboard — so a second and third are expansion, not chaos.
                </FeatureCard>
              </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent p-8 sm:p-12 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-cyan-500/10 blur-3xl"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-5">
                  <MapPin className="w-4 h-4 text-cyan-300" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
                    Your restaurant, on VexaOS
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Let&apos;s design the system your restaurant deserves
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Ember &amp; Oak is an example — the system is real, and it&apos;s built
                  around <em>your</em> restaurant, not a template. Start with a Business
                  Blueprint: we map exactly how your café or kitchen runs — every station,
                  channel, and rush — then show you the connected system that runs it better.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
                >
                  Start a Business Blueprint
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
