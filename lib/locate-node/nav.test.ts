import { describe, expect, it, vi } from 'vitest';
vi.mock('@/lib/store/catalog', () => ({ getProduct: async () => null }));
import { LOCALES } from '@/lib/i18n/config';
import { LOCATE_NODE_NAV, LOCATE_NODE_NAV_LABEL, locateNodeLink, locateNodeLinkFor } from './nav';

describe('the Locate Node in the navigation', () => {
  it('has one name, and words in every language', () => {
    expect(LOCATE_NODE_NAV_LABEL).toBe('Locate Node');
    expect(Object.keys(LOCATE_NODE_NAV).sort()).toEqual([...LOCALES].sort());
    for (const l of LOCALES) for (const v of Object.values(LOCATE_NODE_NAV[l])) expect(v).toBeTruthy();
  });

  it('the badge follows the product: coming soon, then new', () => {
    for (const l of LOCALES) {
      const soon = locateNodeLinkFor({ status: 'coming_soon' }, l)!, live = locateNodeLinkFor({ status: 'active' }, l)!;
      expect(soon.badge).toBe(LOCATE_NODE_NAV[l].soon);
      expect(live.badge).toBe(LOCATE_NODE_NAV[l].new);
      expect(soon.label).toBe(LOCATE_NODE_NAV_LABEL);
      expect(soon.href).toBe(l === 'en' ? '/locate-node' : `/${l}/locate-node`);
    }
  });

  it('is absent while the product is not public, like its page', async () => {
    expect(locateNodeLinkFor(null, 'en')).toBeNull();
    expect(await locateNodeLink('en')).toBeNull();
  });

  it('makes no claims of its own', () => {
    for (const l of LOCALES) expect(Object.values(LOCATE_NODE_NAV[l]).join(' ')).not.toMatch(/\d|Raspberry|MOKO|VexaOS/);
  });
});
