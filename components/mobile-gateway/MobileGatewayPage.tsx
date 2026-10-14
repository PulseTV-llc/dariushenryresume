import { Pause } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { LocateNodeLink } from '@/lib/locate-node/nav';
import type { MobileGatewayStrings } from '@/lib/mobile-gateway/strings';
import { motionBoot } from '@/lib/mobile-gateway/motion';
import MobileGatewayFx from './MobileGatewayFx';
import { BigIdea, EdgeIntelligence, FourNetworksExperience, LocationIntelligence, MobileGatewayHero, OfflineResilience, PortablePowerSection } from './StorySections';
import { GatewayCloudVisualization, IndustryStories, ScenarioSelector } from './IndustrySections';
import { ConnectivityJourney, EarlyAccess, GatewayClosingHero, GatewayComparison, GatewayFAQ, GatewaySecurity, HardwareDesignReveal, SensorCompatibility, TechnicalSpecifications, VexaOsEcosystem } from './PlatformSections';
import './mobile-gateway.css';

const ROOT = 'mg';

function SubNav({ t }: { t: MobileGatewayStrings }) {
  const s = t.subnav;
  const links: [string, string][] = [['overview', s.overview], ['technology', s.technology], ['industries', s.industries], ['design', s.design], ['specs', s.specs], ['faq', s.faq]];
  return (
    <nav aria-label={s.label} className="mg-subnav" data-mg-subnav>
      <div className="mx-auto flex h-full max-w-[76rem] items-center gap-4 px-4 sm:px-8">
        <p className="hidden flex-none items-center gap-2 text-sm font-semibold md:flex">Mobile Gateway<span className="mg-pill" data-s="inDevelopment">{t.common.comingSoon}</span></p>
        <ul className="mg-subnav-links flex min-w-0 flex-1 items-center gap-1 overflow-x-auto md:justify-end">
          {links.map(([id, label]) => (
            <li key={id} className="flex-none"><a href={`#${id}`} aria-current="false" className="block rounded-full px-3 py-1.5 text-[0.8125rem] font-medium text-[#9CA7B5] hover:text-white">{label}</a></li>
          ))}
        </ul>
        <button type="button" data-mg-pause data-pause={t.common.pauseMotion} data-play={t.common.playMotion} aria-pressed="false"
                className="hidden h-8 flex-none items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-[#9CA7B5] ring-1 ring-[#28313B] hover:text-white sm:inline-flex">
          <Pause className="h-3.5 w-3.5" aria-hidden="true" /><span data-label>{t.common.pauseMotion}</span>
        </button>
        <a href="#join" className="mg-btn mg-btn-primary mg-btn-sm flex-none">{s.cta}</a>
      </div>
    </nav>
  );
}

/**
 * The VexaOs Mobile Gateway launch page: intrigue (the reveal), desire (the idea, the technology), understanding
 * (power, location, offline, edge), relevance (nine industries), confidence (platform, sensors, security, design,
 * specifications, comparisons, the family), then the launch list. Server-rendered; only the interactive pieces
 * are client components.
 */
export default function MobileGatewayPage({ t, locale, locateNode, source }: { t: MobileGatewayStrings; locale: Locale; locateNode: LocateNodeLink | null; source: string }) {
  return (
    <div id={ROOT} className="mg pt-16" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: motionBoot(ROOT) }} />
      <SubNav t={t} />
      <MobileGatewayHero t={t} />
      <BigIdea t={t} />
      <FourNetworksExperience t={t} />
      <PortablePowerSection t={t} />
      <LocationIntelligence t={t} />
      <OfflineResilience t={t} />
      <EdgeIntelligence t={t} />
      <IndustryStories t={t} />
      <GatewayCloudVisualization t={t} />
      <SensorCompatibility t={t} />
      <GatewaySecurity t={t} />
      <HardwareDesignReveal t={t} />
      <TechnicalSpecifications t={t} />
      <ScenarioSelector t={t} />
      <GatewayComparison t={t} />
      <ConnectivityJourney t={t} />
      <VexaOsEcosystem t={t} locateNode={locateNode} />
      <EarlyAccess t={t} locale={locale} source={source} />
      <GatewayFAQ t={t} />
      <GatewayClosingHero t={t} />
      <p className="mx-auto max-w-3xl px-5 pb-20 text-center text-xs leading-relaxed text-[#657181]">{t.footnote}</p>
      <MobileGatewayFx root={ROOT} />
    </div>
  );
}
