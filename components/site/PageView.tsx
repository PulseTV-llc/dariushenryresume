import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import {
  Button, CheckList, Eyebrow, GlassCard, HonestNote, IconTile, Section, SectionHeading, Shot, StatusBadge, rich,
} from './ui';
import TrackedLink from './TrackedLink';
import StackDiagram from './StackDiagram';
import SensorCatalog, { ConnectivitySection, SensorRequestCTA } from './SensorCatalog';
import DemoForm from './DemoForm';
import RegionContacts from './RegionContacts';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { Content } from '@/lib/i18n/content';
import type { Card, LinkT, Note, Page, Section as SectionT } from '@/lib/i18n/types';
import { ADDRESS, CONTACT_EMAIL, INDUSTRIES, PRODUCTS, RESTAURANT_OS_HREF, industryHref, productHref } from '@/lib/site';
import { SHOTS } from '@/lib/shots';

interface Ctx {
  locale: Locale;
  c: Content;
  placement: string;
}

const gridCols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' } as const;

function ArrowLink({ link, ctx, className = '' }: { link: LinkT; ctx: Ctx; className?: string }) {
  return (
    <Link href={localePath(ctx.locale, link.href)} className={`inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 ${className}`}>
      {link.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function NoteBox({ note, ctx }: { note: Note; ctx: Ctx }) {
  return <HonestNote title={note.title ?? ctx.c.common.labels.worthKnowing}>{rich(note.body)}</HonestNote>;
}

function CardView({ card, ctx }: { card: Card; ctx: Ctx }) {
  return (
    <GlassCard className="h-full">
      {card.icon && <IconTile name={card.icon} className="mb-4" />}
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
        {card.status && <StatusBadge status={card.status} labels={ctx.c.common.status} showAvailable />}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{rich(card.body)}</p>
    </GlassCard>
  );
}

function shotProps(key: keyof typeof SHOTS, ctx: Ctx) {
  return { ...SHOTS[key], ...ctx.c.common.shots[key] };
}

function SectionView({ s, ctx, first }: { s: SectionT; ctx: Ctx; first: boolean }) {
  const { locale, c } = ctx;
  const wrap = { id: s.id, tinted: s.tinted, className: first ? 'pt-4 sm:pt-6' : '' };
  const heading = <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />;

  switch (s.type) {
    case 'heroShots': {
      const [a, b, d] = [shotProps('dashboardSummary', ctx), shotProps('dashboardPanels', ctx), shotProps('doorActivity', ctx)];
      return (
        <Section {...wrap} className="pt-0 sm:pt-0">
          <figure>
            <div className="glass rounded-[2rem] p-2 sm:p-3">
              <Image src={a.src} width={a.width} height={a.height} alt={a.alt} priority sizes="(min-width: 1152px) 1120px, 100vw" className="h-auto w-full rounded-3xl" />
              <div className="mt-2 grid gap-2 sm:mt-3 sm:gap-3 md:grid-cols-[0.635fr_2.025fr]">
                <Image src={b.src} width={b.width} height={b.height} alt={b.alt} sizes="(min-width: 768px) 24vw, 100vw" className="hidden h-auto w-full rounded-3xl md:block" />
                <Image src={d.src} width={d.width} height={d.height} alt={d.alt} sizes="(min-width: 768px) 70vw, 100vw" className="h-auto w-full rounded-3xl" />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-xs text-slate-500">{s.caption}</figcaption>
          </figure>
        </Section>
      );
    }
    case 'stack':
      return (
        <Section {...wrap}>
          {heading}
          <StackDiagram locale={locale} c={c} />
          {s.link && <p className="mt-8 text-center"><ArrowLink link={s.link} ctx={ctx} /></p>}
        </Section>
      );
    case 'cards':
      return (
        <Section {...wrap}>
          {heading}
          <ul className={`grid gap-5 ${gridCols[s.cols]}`}>
            {s.items.map((card) => (
              <li key={card.title}><CardView card={card} ctx={ctx} /></li>
            ))}
          </ul>
          {s.note && <div className="mt-8"><NoteBox note={s.note} ctx={ctx} /></div>}
          {s.link && <p className="mt-8 text-center"><ArrowLink link={s.link} ctx={ctx} /></p>}
        </Section>
      );
    case 'steps':
      return (
        <Section {...wrap}>
          {heading}
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((step, i) => (
              <li key={step.title}>
                <GlassCard className="h-full">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{i + 1}</span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{rich(step.body)}</p>
                </GlassCard>
              </li>
            ))}
          </ol>
        </Section>
      );
    case 'split':
      return (
        <Section {...wrap}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className={s.flip ? 'lg:order-2' : ''}>
              {s.eyebrow && <div className="mb-4"><Eyebrow>{s.eyebrow}</Eyebrow></div>}
              {s.title && <h2 className="text-balance text-3xl font-bold leading-[1.18] tracking-tight text-slate-900">{rich(s.title)}</h2>}
              {s.body && <p className="mt-4 text-lg leading-relaxed text-slate-600">{rich(s.body)}</p>}
              {s.checks && <div className="mt-6"><CheckList items={s.checks} /></div>}
              {s.link && <ArrowLink link={s.link} ctx={ctx} className="mt-6" />}
            </div>
            <div className={s.flip ? 'lg:order-1' : ''}>
              <Shot {...shotProps(s.shot, ctx)} phone={s.phone} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
          {s.note && <div className="mt-10"><NoteBox note={s.note} ctx={ctx} /></div>}
        </Section>
      );
    case 'sensors':
      return (
        <Section {...wrap}>
          {heading}
          <SensorCatalog compact={s.compact} locale={locale} t={c.catalog.sensors} industries={INDUSTRIES.map((i) => ({ slug: i.slug, short: c.catalog.industries[i.slug].short }))} />
          {!s.compact && (
            <div className="mt-12">
              <SensorRequestCTA t={c.catalog.sensors.request} href={localePath(locale, '/contact')} />
            </div>
          )}
        </Section>
      );
    case 'connectivity':
      return (
        <Section {...wrap}>
          {heading}
          <ConnectivitySection t={c.catalog.sensors} />
        </Section>
      );
    case 'industries': {
      const primary = INDUSTRIES.filter((i) => i.primary);
      const secondary = INDUSTRIES.filter((i) => !i.primary);
      return (
        <Section {...wrap}>
          {heading}
          <div className="grid gap-5 lg:grid-cols-3">
            {primary.map((ind) => {
              const t = c.catalog.industries[ind.slug];
              return (
                <TrackedLink key={ind.slug} href={localePath(locale, industryHref(ind.slug))} event="industry_explore_click" eventProps={{ industry: ind.slug, locale }} className="group block h-full rounded-3xl">
                  <GlassCard className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
                    <IconTile name={ind.icon} className="mb-5" />
                    <h3 className="text-xl font-semibold text-slate-900">{t.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                      {c.common.labels.explore}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </GlassCard>
                </TrackedLink>
              );
            })}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((ind) => {
              const t = c.catalog.industries[ind.slug];
              return (
                <Link key={ind.slug} href={localePath(locale, industryHref(ind.slug))} className="group block rounded-3xl">
                  <GlassCard className="flex h-full items-start gap-4 transition group-hover:shadow-xl">
                    <IconTile name={ind.icon} />
                    <span>
                      <span className="block text-base font-semibold text-slate-900 group-hover:text-blue-700">{t.name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">{t.headline}</span>
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
            <Link href={localePath(locale, RESTAURANT_OS_HREF)} className="group block rounded-3xl">
              <GlassCard className="flex h-full items-start gap-4 transition group-hover:shadow-xl">
                <IconTile name="restaurant" />
                <span>
                  <span className="block text-base font-semibold text-slate-900 group-hover:text-blue-700">{c.catalog.restaurantOs.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">{c.catalog.restaurantOs.card}</span>
                </span>
              </GlassCard>
            </Link>
          </div>
        </Section>
      );
    }
    case 'products':
      return (
        <Section {...wrap}>
          <div className="grid gap-5 md:grid-cols-2">
            {PRODUCTS.map((p, i) => {
              const t = c.catalog.products[p.slug];
              return (
                <TrackedLink key={p.slug} href={localePath(locale, productHref(p.slug))} event="product_explore_click" eventProps={{ product: p.slug, locale }} className={`group block rounded-3xl ${i === PRODUCTS.length - 1 && PRODUCTS.length % 2 ? 'md:col-span-2' : ''}`}>
                  <GlassCard className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
                    <div className="flex items-center gap-3">
                      <IconTile name={p.icon} />
                      <p className="mono-label text-blue-700">{t.role}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-slate-900">{t.name}</h2>
                      <StatusBadge status={p.status} labels={c.common.status} />
                    </div>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{t.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                      {c.common.labels.learnMore}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </GlassCard>
                </TrackedLink>
              );
            })}
          </div>
        </Section>
      );
    case 'solutions':
      return (
        <>
          <Section {...wrap}>
            <div className="grid gap-5 md:grid-cols-2">
              {INDUSTRIES.map((ind) => {
                const t = c.catalog.industries[ind.slug];
                return (
                  <TrackedLink key={ind.slug} href={localePath(locale, industryHref(ind.slug))} event="industry_explore_click" eventProps={{ industry: ind.slug, locale }} className="group block rounded-3xl">
                    <GlassCard className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:shadow-xl">
                      <IconTile name={ind.icon} className="mb-5" />
                      <h2 className="text-xl font-semibold text-slate-900">{t.name}</h2>
                      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{t.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                        {c.common.labels.explore}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </GlassCard>
                  </TrackedLink>
                );
              })}
              <Link href={localePath(locale, '/contact')} className="group block rounded-3xl">
                <div className="flex h-full flex-col justify-center rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-7">
                  <h2 className="text-xl font-semibold text-slate-900">{s.other.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.other.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                    {s.other.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          </Section>
          <Section tinted>
            <SectionHeading eyebrow={s.restaurant.eyebrow} title={c.catalog.restaurantOs.name} subtitle={c.catalog.restaurantOs.summary} />
            <p className="text-center"><ArrowLink link={{ label: s.restaurant.label, href: RESTAURANT_OS_HREF }} ctx={ctx} /></p>
          </Section>
        </>
      );
    case 'prose':
      return (
        <Section {...wrap}>
          <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-slate-700">
            {s.paragraphs.map((p, i) => <p key={i}>{rich(p)}</p>)}
          </div>
        </Section>
      );
    case 'shot':
      return (
        <Section {...wrap}>
          <Shot {...shotProps(s.shot, ctx)} priority sizes="(min-width: 1152px) 1120px, 100vw" />
        </Section>
      );
    case 'note':
      return (
        <Section {...wrap}>
          <div className="mx-auto max-w-3xl space-y-5">
            <NoteBox note={s.note} ctx={ctx} />
            {s.link && (
              <p className="text-center text-sm text-slate-600">
                {s.linkLead}{' '}
                <Link href={localePath(locale, s.link.href)} className="font-semibold text-blue-700 hover:text-blue-900">{s.link.label}</Link>
              </p>
            )}
          </div>
        </Section>
      );
    case 'findUs':
      return (
        <Section {...wrap} className="pt-0 sm:pt-0">
          <GlassCard className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold text-slate-900">{s.title}</h2>
            <ContactLines locale={locale} className="mt-3 grid gap-3 sm:grid-cols-2" />
          </GlassCard>
        </Section>
      );
    case 'contact':
      return (
        <Section {...wrap}>
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <GlassCard className="!p-6 sm:!p-9">
              <DemoForm locale={locale} t={c.common.form} industries={INDUSTRIES.map((i) => c.catalog.industries[i.slug].name)} />
            </GlassCard>
            <div className="space-y-5">
              <GlassCard>
                <h2 className="text-base font-semibold text-slate-900">{s.next.title}</h2>
                <div className="mt-4"><CheckList items={s.next.items} /></div>
                {locale !== 'en' && <p className="mt-4 text-sm text-slate-500">{c.common.form.replyLanguage}</p>}
              </GlassCard>
              <GlassCard>
                <h2 className="text-base font-semibold text-slate-900">{s.email.title}</h2>
                <ContactLines locale={locale} className="mt-4 space-y-3" />
                <RegionContacts locale={locale} label={c.common.footer.messageUs} className="mt-4" />
              </GlassCard>
            </div>
          </div>
        </Section>
      );
  }
}

export function ContactLines({ locale, className = '' }: { locale: Locale; className?: string }) {
  void locale;
  return (
    <address className={`not-italic ${className}`}>
      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-700">
        <Mail className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
        {CONTACT_EMAIL}
      </a>
      <a href={ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-600 hover:text-blue-700">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
        <span>
          {ADDRESS.street}
          <br />
          {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
        </span>
      </a>
    </address>
  );
}

/** Closing call to action used at the bottom of most pages. */
function CTABand({ ctx, title, body }: { ctx: Ctx; title: string; body: string }) {
  const { locale, c } = ctx;
  return (
    <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-sky-500 px-6 py-14 text-center shadow-xl shadow-blue-900/20 sm:px-12">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-blue-50">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedLink href={localePath(locale, '/contact')} event="final_cta_click" eventProps={{ placement: ctx.placement, locale }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 sm:w-auto">
            {c.common.cta.primary}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
          <Link href={localePath(locale, '/platform')} className="inline-flex w-full items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
            {c.common.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Renders a whole page from its content: hero, sections, closing call to action. */
export default function PageView({ locale, c, page, placement, home = false }: { locale: Locale; c: Content; page: Page; placement: string; home?: boolean }) {
  const ctx: Ctx = { locale, c, placement };
  const { hero } = page;
  return (
    <>
      <section className={`relative overflow-hidden px-4 pt-32 sm:px-6 sm:pt-40 lg:px-8 ${home ? 'pb-12' : 'pb-12 sm:pb-16'}`}>
        <div className="page-wash pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center">
          {(hero.eyebrow || hero.status) && (
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
              {hero.eyebrow && <Eyebrow>{hero.eyebrow}</Eyebrow>}
              {hero.status && <StatusBadge status={hero.status} labels={c.common.status} />}
            </div>
          )}
          <h1 className={`text-balance font-bold tracking-tight text-slate-900 ${home ? 'text-5xl leading-[1.06] sm:text-6xl' : 'text-4xl leading-[1.1] sm:text-5xl'}`}>
            {rich(hero.title)}
          </h1>
          {hero.subtitle && <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-slate-600">{rich(hero.subtitle)}</p>}
          {hero.ctas && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {hero.ctas.map((cta) => (
                <Button
                  key={cta.href}
                  href={localePath(locale, cta.href)}
                  variant={cta.variant}
                  className="w-full sm:w-auto"
                  event={cta.variant === 'primary' ? 'hero_demo_click' : 'hero_platform_click'}
                  eventProps={{ placement, locale }}
                >
                  {cta.label}
                  {cta.variant === 'primary' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>

      {page.sections.map((s, i) => (
        <SectionView key={i} s={s} ctx={ctx} first={i === 0} />
      ))}

      {page.cta !== false && (
        <CTABand ctx={ctx} title={page.cta?.title ?? c.common.cta.title} body={page.cta?.body ?? c.common.cta.body} />
      )}
    </>
  );
}
