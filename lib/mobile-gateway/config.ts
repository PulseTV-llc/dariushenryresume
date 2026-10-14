/**
 * Structure of the Mobile Gateway page: everything that is not words. The words are in ./i18n/<locale>.ts and are
 * matched to these lists by position (the tests check the lengths agree).
 */
import type { VendorKey } from './vendor';

export type NetworkId = 'ble' | 'lorawan' | 'wifi' | 'lte';
export const NETWORKS: NetworkId[] = ['ble', 'lorawan', 'wifi', 'lte'];
export type Tech = NetworkId | 'gnss';

export type StatusKey = 'planned' | 'target' | 'underEvaluation' | 'underDevelopment' | 'tbd' | 'roadmap' | 'pending' | 'notYetCertified' | 'notClaimed' | 'concept' | 'inDevelopment' | 'required';

/** The illustrated environments (components/mobile-gateway/scenes). */
export type SceneKey = 'truck' | 'field' | 'dock' | 'warehouse' | 'excavator' | 'water' | 'solar' | 'factory' | 'case';
/** Photographs that exist today (public/mobile-gateway, see ./images.ts). */
export type PhotoKey = 'medical';

/**
 * An image slot. Today every environment is an original illustration with the real gateway render composited on it.
 * To use commissioned photography instead, add the photo to ./images.ts and set `photo` here: the page then shows
 * the photo (with its credit) and keeps the illustration as nothing more than a fallback. No component changes.
 */
export interface ImageSlot {
  illustration: SceneKey;
  photo?: { key: PhotoKey | string; credit?: string; position?: string };
}

export interface StoryConfig {
  id: string;
  slot: ImageSlot;
  tech: Tech[];
  dashboard?: 'trip' | 'field' | 'medical';
  /** The supplied render is a concept image: show the medical disclosure on it. */
  concept?: boolean;
}

/** Part 9, in the order of strings industries.stories. */
export const STORIES: StoryConfig[] = [
  { id: 'trucking', slot: { illustration: 'truck' }, tech: ['ble', 'lte', 'gnss'], dashboard: 'trip' },
  { id: 'agriculture', slot: { illustration: 'field' }, tech: ['lorawan', 'lte', 'gnss'], dashboard: 'field' },
  { id: 'medical', slot: { illustration: 'case', photo: { key: 'medical', position: '62% 50%' } }, tech: ['ble', 'lte', 'gnss'], dashboard: 'medical', concept: true },
  { id: 'cold-chain', slot: { illustration: 'dock' }, tech: ['ble', 'lte', 'gnss'] },
  { id: 'industrial', slot: { illustration: 'factory' }, tech: ['ble', 'wifi', 'lte'] },
  { id: 'construction', slot: { illustration: 'excavator' }, tech: ['ble', 'lorawan', 'lte', 'gnss'] },
  { id: 'utilities', slot: { illustration: 'water' }, tech: ['lorawan', 'lte'] },
  { id: 'warehousing', slot: { illustration: 'warehouse' }, tech: ['ble', 'wifi', 'lte'] },
  { id: 'energy', slot: { illustration: 'solar' }, tech: ['lorawan', 'ble', 'lte'] },
];

/** Part 15 tabs, in the order of strings scenarios.tabs. */
export const SCENARIOS: { slot: ImageSlot; tech: Tech[]; concept?: boolean }[] = [
  { slot: { illustration: 'truck' }, tech: ['ble', 'lte', 'gnss'] },
  { slot: { illustration: 'field' }, tech: ['lorawan', 'lte'] },
  { slot: { illustration: 'dock' }, tech: ['ble', 'lte', 'gnss'] },
  { slot: { illustration: 'warehouse' }, tech: ['ble', 'wifi', 'lte'] },
  { slot: { illustration: 'factory' }, tech: ['ble', 'wifi', 'lte'] },
  { slot: { illustration: 'case', photo: { key: 'medical', position: '62% 50%' } }, tech: ['ble', 'lte', 'gnss'], concept: true },
  { slot: { illustration: 'water' }, tech: ['lorawan', 'lte'] },
  { slot: { illustration: 'excavator' }, tech: ['ble', 'lorawan', 'lte', 'gnss'] },
];

/** Part 5: the same device in four places, in the order of strings power.sequence. */
export const POWER_SEQUENCE: SceneKey[] = ['truck', 'field', 'water', 'case'];

/** Part 13 macro details, in the order of strings design.details: real crops of the renders. */
export const DETAILS = ['texture', 'fastener', 'led', 'pivot', 'usbc', 'mount'] as const;
/** Status light colours, in the order of strings design.light. */
export const LIGHTS = [
  { color: '#267DFF', pulse: false },
  { color: '#45B8FF', pulse: true },
  { color: '#F5A524', pulse: false },
  { color: '#F04438', pulse: false },
];

/** Part 14 rows, in the order of strings specs.groups[].rows. `pill`: the value is a description, so show the status beside it. */
export const SPEC_ROWS: { s: StatusKey; pill?: boolean; vendor?: VendorKey }[][] = [
  [{ s: 'planned' }, { s: 'planned' }, { s: 'planned' }, { s: 'planned' }, { s: 'planned' }],
  [{ s: 'underEvaluation', pill: true, vendor: 'cellular' }, { s: 'underEvaluation', pill: true, vendor: 'linux' }, { s: 'tbd' }],
  [{ s: 'underEvaluation', pill: true, vendor: 'sim' }, { s: 'tbd' }, { s: 'tbd' }, { s: 'required' }],
  [{ s: 'planned' }, { s: 'tbd' }, { s: 'tbd' }, { s: 'planned' }, { s: 'underEvaluation', pill: true }],
  [{ s: 'planned' }, { s: 'tbd' }],
  [{ s: 'concept' }, { s: 'tbd' }, { s: 'tbd' }, { s: 'notYetCertified' }, { s: 'planned' }],
  [{ s: 'planned' }, { s: 'planned' }, { s: 'underDevelopment' }, { s: 'roadmap' }],
  [{ s: 'planned' }, { s: 'planned' }, { s: 'planned' }, { s: 'planned' }, { s: 'roadmap' }],
  [{ s: 'pending' }, { s: 'pending' }, { s: 'notClaimed' }],
];

/** Part 18, in the order of strings ecosystem.items. 'locate' links to the Locate Node page while it exists. */
export const ECOSYSTEM: ('locate' | 'planned' | 'here')[] = ['locate', 'planned', 'planned', 'here'];

/** Page sections, for the sub-navigation and anchors. */
export const ANCHORS = { overview: 'overview', technology: 'technology', industries: 'industries', design: 'design', specs: 'specs', faq: 'faq', join: 'join' } as const;
