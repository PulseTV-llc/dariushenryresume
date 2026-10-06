import { pageMeta } from '../../../metadata';
import {
  CTABand,
  CheckList,
  FeatureCard,
  GlassCard,
  HonestNote,
  PageHero,
  PrimaryButton,
  Section,
  SectionHeading,
  Shot,
  Split,
} from '@/components/site/ui';
import { SHOTS } from '@/lib/shots';

export const metadata = pageMeta({
  title: 'VexaOs Cloud & AI Insights',
  description:
    'VexaOs Cloud stores your sensor history and runs AI Insights: drift detection, time-to-limit forecasts, unusual door activity and plain-English explanations, always shown with the measured numbers.',
  path: '/products/cloud-ai-insights',
});

const FINDINGS = [
  { title: 'Drift', body: 'A steady rise or fall in temperature or humidity over the last six hours, even while readings are still in range.' },
  { title: 'Time to limit', body: 'When a sensor with an alert rule is heading for its limit, the hours left at the current rate.' },
  { title: 'Unusual reading', body: 'A reading far from what this sensor normally shows at this hour of the day.' },
  { title: 'Door left open', body: 'A door that has been open for 10 minutes or more, right now.' },
  { title: 'Door at unusual hours', body: 'A door opened at an hour that has been quiet for the last two weeks.' },
  { title: 'Door open longer than normal', body: 'Total open time today at least double the recent daily average.' },
  { title: 'Warm and humid together', body: 'Temperature and humidity rising together, a common sign of a door seal or cooling problem.' },
  { title: 'Battery', body: 'A low battery, or one on course to run out within 30 days.' },
  { title: 'Signal', body: 'Weak signal, or a sharp drop compared with the days before.' },
  { title: 'Sensor gone quiet', body: 'No reading for 15 minutes while the gateway is still online.' },
  { title: 'Gateway health', body: 'A gateway offline, short on power, or with a backlog waiting to upload.' },
];

export default function CloudPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Cloud & AI Insights"
        title={<>Spot the problem <span className="gradient-text">before it becomes a loss.</span></>}
        subtitle="VexaOs Cloud keeps your history, runs your alert rules, and checks every sensor for the patterns that come before a failure. Then it explains what it found in plain English."
      >
        <PrimaryButton href="/contact">Book a demo</PrimaryButton>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <Split
          eyebrow="Measured first"
          title="Detection is arithmetic. AI only does the explaining."
          body="Findings come from fixed rules run on your measurements every 30 minutes. Each one stores the numbers it was computed from. The AI model is used for one thing: turning a finding that already exists into a clear sentence."
          visual={<Shot {...SHOTS.sensorCharts} />}
        >
          <CheckList
            items={[
              <>Text is labelled <strong>Measured</strong> or <strong>AI-written</strong>, and AI text shows its confidence.</>,
              'AI text is never shown without the measured numbers beside it.',
              'The AI cannot create a finding, change its severity or close it.',
              'If AI explanations are switched off or unavailable, you still get every finding, described from the numbers.',
            ]}
          />
        </Split>
      </Section>

      <Section className="bg-white/60">
        <SectionHeading
          eyebrow="What it looks for"
          title="Eleven kinds of finding, checked every 30 minutes."
          subtitle="Each has a severity of info, warning or critical, and a status you control: open, acknowledged or resolved."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FINDINGS.map((f) => (
            <li key={f.title}>
              <GlassCard className="h-full !p-5">
                <h3 className="text-[15px] font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </GlassCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="The cloud underneath" title="History, rules and access in one place." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard title="History" body="Every summary is stored, with hourly roll-ups for fast charts over a day, a week or a month." />
          <FeatureCard title="Alert rules" body="Set limits per sensor. Alerts keep a history, and can be acknowledged and resolved." />
          <FeatureCard title="Live updates" body="Dashboards update as new readings arrive, without refreshing the page." />
          <FeatureCard title="Sites and roles" body="Organizations, sites, locations and equipment, with access decided by membership and role." />
        </div>
      </Section>

      <Section className="bg-white/60">
        <SectionHeading eyebrow="Privacy" title="What the AI model is sent, and what it is not." />
        <div className="grid gap-5 md:grid-cols-2">
          <GlassCard>
            <h3 className="text-base font-semibold text-slate-900">Sent</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The site name and time zone, and for each finding: its kind and severity, the sensor name, location and
              equipment, and the summary numbers the finding was computed from.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-base font-semibold text-slate-900">Never sent</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Your stream of raw readings, email addresses, user names, hardware addresses or keys. Every reply is
              checked before it is stored, and anything unexpected is discarded.
            </p>
          </GlassCard>
        </div>
        <div className="mt-8">
          <HonestNote>
            AI explanations are optional and use a third-party AI model. Findings appear in the web and mobile apps
            today. Sending findings and alerts by email or push notification is in development. Forecasts are
            estimates based on the recent trend, not guarantees.
          </HonestNote>
        </div>
      </Section>

      <CTABand placement="cloud-ai-insights" />
    </>
  );
}
