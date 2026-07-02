import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Smartphone,
  Monitor,
  ScanLine,
  CreditCard,
  LayoutDashboard,
  Users,
  Bell,
  Star,
  TrendingUp,
  Package,
  CheckCircle2,
  Scissors,
  MapPin,
  Zap,
  Building2,
  ShoppingBag,
  Sparkles,
  Receipt,
  UserCheck,
  LineChart,
  Boxes,
} from 'lucide-react';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'How a Barbershop or Salon Runs Its Entire Business on VexaOS',
  description:
    'A complete, in-depth look at how a barbershop or salon runs booking, POS, staff and customer apps, and barcode inventory on one connected VexaOS system — with a vivid day-in-the-life at Kingsman Cuts.',
  keywords: [
    'barbershop software',
    'salon booking system',
    'salon POS',
    'barbershop app',
    'salon inventory scanner',
    'barcode inventory system for salons',
    'connected salon system',
    'barbershop management software',
    'salon management platform',
    'barbershop POS system',
    'stylist scheduling app',
    'salon loyalty program',
    'multi-location salon software',
    'VexaOS',
  ],
  alternates: {
    canonical: 'https://www.vexaos.io/blog/barbershop-salon-vexaos-system',
  },
  openGraph: {
    title: 'How a Barbershop or Salon Runs Its Entire Business on VexaOS',
    description:
      'Booking, POS, staff & customer apps, dashboards, and barcode inventory — one connected system. Walk through a full day at Kingsman Cuts on VexaOS.',
    url: 'https://www.vexaos.io/blog/barbershop-salon-vexaos-system',
    type: 'article',
    siteName: 'VexaOS',
    images: [
      {
        url: 'https://www.vexaos.io/blog/kingsman-cuts-vexaos.jpg',
        width: 1600,
        height: 900,
        alt: 'Kingsman Cuts barbershop running the VexaOS connected system — check-in kiosk, live schedule dashboard, and VexaOS POS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How a Barbershop or Salon Runs Its Entire Business on VexaOS',
    description:
      'One connected system for booking, POS, staff & customer apps, dashboards, and barcode inventory. A day at Kingsman Cuts on VexaOS.',
    images: ['https://www.vexaos.io/blog/kingsman-cuts-vexaos.jpg'],
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

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
          <Icon className="w-4 h-4 text-cyan-300" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
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

function TimelineStep({
  time,
  title,
  children,
}: {
  time: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-10 pb-10 last:pb-0">
      {/* connector line */}
      <span className="absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
      {/* node */}
      <span className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-black border-2 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
      </span>
      <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400/90 mb-1">
        {time}
      </div>
      <h4 className="text-lg font-semibold text-white mb-1.5">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}

export default function BarbershopSalonPost() {
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
                  <Scissors className="w-3.5 h-3.5" />
                  Industry Deep Dive
                </Pill>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Jul 2, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    16 min read
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                <span className="text-white">How a Barbershop or Salon Runs Its </span>
                <span className="gradient-text">Entire Business on VexaOS</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                One connected system — booking, apps, POS, dashboards, and barcode
                inventory — running the whole shop in real time. Here&apos;s exactly
                what that looks like, told through a single day at a shop we&apos;ll
                call <span className="text-white font-semibold">Kingsman Cuts</span>.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Online Booking',
                  'Owner Dashboard',
                  'iOS & Android Apps',
                  'Integrated POS',
                  'Barcode Inventory',
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
                src="/blog/kingsman-cuts-vexaos.jpg"
                alt="Kingsman Cuts barbershop running the VexaOS connected system — check-in kiosk, live schedule dashboard, and VexaOS POS"
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
                <span className="text-white font-semibold">Kingsman Cuts</span> — the
                whole shop running on one VexaOS system: check-in kiosk, live schedule
                dashboard, and VexaOS POS.
              </figcaption>
            </figure>

            {/* Intro */}
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-16">
              <p>
                Walk into most barbershops or salons and you&apos;ll find the same
                quiet chaos behind the polish: a booking app that doesn&apos;t talk to
                the card reader, a paper appointment book that only one person can
                read, a box of retail products nobody has counted since spring, and an
                owner who has no idea how the shop is doing until they sit down with a
                shoebox of receipts at the end of the month. Every tool works — just
                never <em>together</em>.
              </p>
              <p>
                VexaOS replaces that pile of disconnected tools with a single connected
                system built around the way your shop actually runs. The website
                customers book on, the app on your stylists&apos; phones, the
                touchscreen at the front desk, the card reader, the scanner that reads
                a bottle of pomade, and the dashboard you check from your couch at
                night — they&apos;re not separate products stitched together. They&apos;re
                one operating system, sharing one live source of truth, updating
                everywhere the instant anything changes.
              </p>
              <p>
                Let&apos;s build it out layer by layer, then watch a full day move
                through it.
              </p>
            </div>

            {/* 1. Customer-facing web app */}
            <section className="mb-20">
              <SectionHeading
                icon={Monitor}
                eyebrow="Layer 01 — For your customers"
                title="The Booking Website That Fills Your Chairs"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Kingsman Cuts&apos; website isn&apos;t a brochure — it&apos;s a
                storefront that&apos;s open 24 hours a day. A customer who finds the
                shop at 11pm doesn&apos;t hit a phone number and a &quot;we&apos;ll call
                you back.&quot; They see live, real availability and book the chair
                they want while they&apos;re still thinking about it.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={Calendar} title="Live availability, always accurate">
                  Open times come straight from every stylist&apos;s real schedule. When
                  a chair fills — online, at the desk, or in-app — it disappears
                  everywhere instantly. No double-bookings, no &quot;actually
                  we&apos;re full.&quot;
                </FeatureCard>
                <FeatureCard icon={Sparkles} title="A service menu that sells">
                  Every service — skin fade, beard sculpt, balayage, keratin
                  treatment — with real photos, clear pricing, and duration. Customers
                  see exactly what they&apos;re getting and what it costs before they
                  commit.
                </FeatureCard>
                <FeatureCard icon={UserCheck} title="Choose your stylist">
                  Regulars book the barber who knows their fade; new clients browse
                  profiles, specialties, and portfolios and pick with confidence.
                  Loyalty to a person becomes loyalty to the shop.
                </FeatureCard>
                <FeatureCard icon={CreditCard} title="Deposits that kill no-shows">
                  Optional deposits or card-on-file at booking. The customer who&apos;s
                  put money down shows up — and the chair that would&apos;ve sat empty
                  earns instead.
                </FeatureCard>
              </div>

              <ul className="space-y-3 mb-4">
                <Bullet>
                  <span className="text-white font-medium">Customer accounts</span> that
                  remember everything — past services, preferred stylist, saved card,
                  and history — so the second booking takes fifteen seconds.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">One-tap rebooking</span> and
                  smart prompts (&quot;time for your next trim?&quot;) that turn a single
                  visit into a standing appointment.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">Reviews and ratings</span>
                  collected automatically after each visit, building the public
                  reputation that pulls in the next wave of clients.
                </Bullet>
              </ul>
            </section>

            {/* 2. Owner dashboard */}
            <section className="mb-20">
              <SectionHeading
                icon={LayoutDashboard}
                eyebrow="Layer 02 — For you"
                title="The Owner Dashboard: Your Shop, Live"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                This is the view that changes how it feels to own a shop. Whether
                you&apos;re standing at the front desk or sitting at home, you open the
                dashboard and see Kingsman Cuts breathing in real time — every chair,
                every booking, every dollar, as it happens.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={Monitor} title="Floor view, in real time">
                  A live map of every station: who&apos;s in the chair, which service,
                  how long left, and which chairs are open right now. The whole floor
                  at a glance.
                </FeatureCard>
                <FeatureCard icon={LineChart} title="Today's bookings & revenue">
                  Bookings, walk-ins, services rendered, retail sold, and revenue —
                  updating live through the day, not reconstructed at month-end.
                </FeatureCard>
                <FeatureCard icon={Users} title="Staff performance">
                  Bookings per stylist, rebook rate, average ticket, retail attach
                  rate, and tips — clear, fair, per-person numbers instead of gut feel.
                </FeatureCard>
                <FeatureCard icon={TrendingUp} title="Reports & analytics">
                  No-show and rebook trends, busiest hours, top services, product
                  sell-through, and slow days you can fix with a promo — the story your
                  numbers were always trying to tell you.
                </FeatureCard>
              </div>

              <ul className="space-y-3">
                <Bullet>
                  <span className="text-white font-medium">Product sales</span> tracked
                  right alongside services, so you can see retail as the profit center
                  it should be.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">Multi-location roll-up:</span>{' '}
                  when Kingsman Cuts opens a second and third location, one screen rolls
                  every shop into a single picture — or drills into any one of them.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">Roles & permissions</span> so
                  front-desk staff, stylists, and managers each see exactly what they
                  should — and nothing they shouldn&apos;t.
                </Bullet>
              </ul>
            </section>

            {/* 3. iOS + Android apps */}
            <section className="mb-20">
              <SectionHeading
                icon={Smartphone}
                eyebrow="Layer 03 — In everyone's pocket"
                title="Two Apps: One for Your Staff, One for Your Clients"
              />

              <div className="grid md:grid-cols-2 gap-6">
                {/* Staff app */}
                <div className="rounded-2xl bg-gradient-to-br from-cyan-500/[0.07] to-transparent border border-cyan-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Scissors className="w-5 h-5 text-cyan-300" />
                    <h3 className="text-xl font-bold text-white">The Staff App</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-5">
                    iOS &amp; Android. Everything a stylist needs, in the chair, without
                    walking to the desk.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <Bullet>Their day&apos;s schedule, updating live as bookings change</Bullet>
                    <Bullet>Full client history &amp; notes — &quot;#2 on the sides, always books before a trip&quot;</Bullet>
                    <Bullet>Before/after photos saved to each client&apos;s profile</Bullet>
                    <Bullet>In-chair checkout &amp; tips without leaving the station</Bullet>
                    <Bullet>Toggle their own availability in seconds</Bullet>
                  </ul>
                </div>

                {/* Customer app */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-600/[0.07] to-transparent border border-blue-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-blue-300" />
                    <h3 className="text-xl font-bold text-white">The Customer App</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-5">
                    iOS &amp; Android. Your brand, on their home screen — the reason they
                    come back to you instead of the shop down the street.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <Bullet>Book in seconds from saved preferences</Bullet>
                    <Bullet>Loyalty points that add up and unlock rewards</Bullet>
                    <Bullet>Push reminders that quietly cut no-shows</Bullet>
                    <Bullet>One-tap rebook with their usual stylist</Bullet>
                    <Bullet>A digital membership card in Apple/Google Wallet</Bullet>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. POS */}
            <section className="mb-20">
              <SectionHeading
                icon={CreditCard}
                eyebrow="Layer 04 — At checkout"
                title="A POS That's Part of the System, Not Bolted On"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Most shops run a booking tool <em>and</em> a separate card reader that
                have no idea the other exists. On VexaOS, checkout is just the last
                step of the appointment — the service is already there, the client is
                already known, and the sale writes straight back into the same system
                everything else reads from.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <FeatureCard icon={CreditCard} title="Card, tap & digital wallets">
                  Modern payments built in — tap, chip, Apple Pay, Google Pay — with the
                  service already loaded from the appointment.
                </FeatureCard>
                <FeatureCard icon={ShoppingBag} title="Service + retail in one sale">
                  A haircut and the pomade the client just bought ring up on a single
                  ticket, one tap, one receipt.
                </FeatureCard>
                <FeatureCard icon={Receipt} title="Tips & split payments">
                  Tip prompts that go to the right stylist, and split payments across
                  cards or people without a workaround.
                </FeatureCard>
                <FeatureCard icon={Zap} title="Digital receipts & end-of-day">
                  Texted or emailed receipts, and an end-of-day reconciliation that adds
                  up on its own — because every sale was already in the system.
                </FeatureCard>
              </div>
            </section>

            {/* 5. Barcode inventory */}
            <section className="mb-20">
              <SectionHeading
                icon={ScanLine}
                eyebrow="Layer 05 — Behind the counter"
                title="Barcode Inventory That Counts Itself"
              />
              <p className="text-gray-300 leading-relaxed mb-8">
                Retail is where a lot of shops quietly leak money — shelves nobody
                tracks, products that walk out the door, and reorders placed from
                memory. VexaOS puts a scanner at the center of it. Every pomade,
                shampoo, blade, and tool has a barcode, and the system knows exactly how
                many you have at every moment.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <FeatureCard icon={Boxes} title="Scan at receiving">
                  A shipment arrives, you scan it in, and stock levels climb
                  automatically — no spreadsheet, no manual tally.
                </FeatureCard>
                <FeatureCard icon={ScanLine} title="Scan at sale">
                  Scan a product at checkout and it&apos;s added to the ticket and
                  decremented from stock in the same motion.
                </FeatureCard>
                <FeatureCard icon={Bell} title="Low-stock alerts & reorder suggestions">
                  When the sea-salt spray dips below your threshold, VexaOS flags it and
                  suggests a reorder before you ever run dry mid-Saturday.
                </FeatureCard>
                <FeatureCard icon={Package} title="Supplier management">
                  Suppliers, costs, and reorder history in one place, so restocking is a
                  confirmation, not a research project.
                </FeatureCard>
              </div>

              <ul className="space-y-3">
                <Bullet>
                  <span className="text-white font-medium">Shrinkage control:</span> when
                  counts and sales don&apos;t reconcile, you see it early instead of
                  discovering it at tax time.
                </Bullet>
                <Bullet>
                  <span className="text-white font-medium">Product sales by stylist:</span>{' '}
                  every retail sale is tied to who made it, so your best upseller gets
                  the credit — and everyone can see what &quot;good&quot; looks like.
                </Bullet>
              </ul>
            </section>

            {/* 6. A Day at Kingsman Cuts */}
            <section className="mb-20">
              <SectionHeading
                icon={Zap}
                eyebrow="Layer 06 — All of it, together"
                title="A Day at Kingsman Cuts"
              />
              <p className="text-gray-300 leading-relaxed mb-10">
                Individually, each layer is useful. Connected, they become something a
                pile of separate apps can never be. Here&apos;s a single Saturday
                flowing through the whole system — no one re-typing anything, every
                screen agreeing with every other screen, in real time.
              </p>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8">
                <TimelineStep time="7:42 AM · At home" title="The owner opens the dashboard over coffee">
                  Marcus, who owns Kingsman Cuts, checks his phone before he&apos;s even
                  out of the house. Saturday&apos;s book is 80% full, two stylists have
                  opened extra availability, and yesterday&apos;s numbers already
                  reconciled themselves. He doesn&apos;t drive in to find out how the
                  shop is doing — he already knows.
                </TimelineStep>

                <TimelineStep time="9:15 AM · Front door" title="A walk-in checks in at the kiosk">
                  A new client walks in without an appointment. He taps the touchscreen
                  kiosk at the front, picks &quot;skin fade + beard,&quot; and VexaOS
                  auto-assigns him to the first open chair — Devin&apos;s — and drops him
                  into the queue. No one had to stop mid-cut to handle him.
                </TimelineStep>

                <TimelineStep time="9:18 AM · Chair 3" title="The stylist sees the client before he sits down">
                  On Devin&apos;s iPhone, the new client surfaces in his schedule
                  instantly. For a returning regular in the next slot, Devin sees the
                  full history — last visit, guard numbers, the note &quot;likes it
                  tight on the sides.&quot; He greets him like he&apos;s known him for
                  years.
                </TimelineStep>

                <TimelineStep time="9:52 AM · Chair 3" title="Service done — checkout right in the chair">
                  Cut finished, Devin checks out from the staff app without walking
                  anywhere. He scans the beard oil the client liked with the phone&apos;s
                  camera — it lands on the ticket, service plus retail, one sale. The
                  client taps to pay, adds a tip that routes straight to Devin, and
                  chooses a texted receipt.
                </TimelineStep>

                <TimelineStep time="9:52 AM · Everywhere at once" title="One tap ripples through the whole system">
                  That single checkout does six things at once, automatically: loyalty
                  points post to the client&apos;s account; the beard oil is decremented
                  from inventory; a rebook reminder is scheduled for four weeks out;
                  Devin&apos;s retail attach and tips tick up; the day&apos;s revenue
                  climbs; and — if that oil was the last one — a low-stock alert fires
                  with a reorder suggestion.
                </TimelineStep>

                <TimelineStep time="1:30 PM · The back shelf" title="A shipment arrives and counts itself in">
                  A supplier drop-off lands mid-afternoon. The front-desk lead scans
                  each box in, and stock levels climb on their own. The low-stock flag
                  from that morning clears itself. Nobody opens a spreadsheet.
                </TimelineStep>

                <TimelineStep time="6:05 PM · Closing" title="End-of-day reconciles itself">
                  At close, there&apos;s no shoebox of receipts and no late-night math.
                  Every service, product, tip, and card payment was already in the
                  system, so end-of-day totals are simply <em>there</em>, correct,
                  waiting.
                </TimelineStep>

                <TimelineStep time="9:20 PM · At home again" title="The owner watches the whole day, already done">
                  Back on the couch, Marcus opens the dashboard. Total revenue, top
                  stylist, retail attach rate, no-shows (near zero, thanks to
                  deposits and push reminders), and tomorrow&apos;s nearly-full book —
                  all live. He didn&apos;t compile any of it. The shop ran itself onto
                  the screen.
                </TimelineStep>
              </div>
            </section>

            {/* 7. Benefits */}
            <section className="mb-20">
              <SectionHeading
                icon={TrendingUp}
                eyebrow="Why it matters"
                title="What One Connected System Actually Changes"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FeatureCard icon={Zap} title="One system, not seven tools">
                  No more booking app that ignores the card reader that ignores the
                  inventory sheet. One source of truth means nothing is ever re-typed,
                  and nothing quietly disagrees.
                </FeatureCard>
                <FeatureCard icon={Sparkles} title="A sharper, more professional brand">
                  A branded site, branded apps, and a slick front-desk kiosk make a
                  neighborhood shop feel like a national name — and clients feel it the
                  moment they book.
                </FeatureCard>
                <FeatureCard icon={Bell} title="Fewer no-shows">
                  Deposits, card-on-file, and automatic push reminders turn empty chairs
                  back into revenue without a single awkward phone call.
                </FeatureCard>
                <FeatureCard icon={ShoppingBag} title="More retail & upsell revenue">
                  When products are one scan away at checkout and tied to each stylist,
                  retail stops being an afterthought and starts being profit.
                </FeatureCard>
                <FeatureCard icon={Users} title="Real staff accountability">
                  Fair, transparent per-stylist numbers — bookings, rebooks, tickets,
                  retail — replace guesswork with a scoreboard everyone can see.
                </FeatureCard>
                <FeatureCard icon={Building2} title="Effortless growth to more locations">
                  The system that runs one shop runs ten. Adding a location is a rollout,
                  not a rebuild — every new shop plugs into the same live dashboard.
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
                    Your shop, on VexaOS
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Let&apos;s design the system your shop deserves
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Kingsman Cuts is an example — the system is real, and it&apos;s built
                  around <em>your</em> shop, not a template. Start with a Business
                  Blueprint: we map exactly how your barbershop or salon runs, then show
                  you the connected system that runs it better.
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
