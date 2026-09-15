'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { MAIN_NAV, NAV_CTA, type NavGroup } from '@/lib/marketing/site';
import { trackEvent } from '@/lib/analytics';
import VexaLogo from './VexaLogo';

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Escape closes any open menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const open = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const onCta = (placement: string) => trackEvent('nav_build_system_click', { placement });

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#04070e]/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center shrink-0" aria-label="VexaOS — home">
            <VexaLogo markSize={30} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {MAIN_NAV.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => group.items && open(group.label)}
                onMouseLeave={() => group.items && scheduleClose()}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
                }}
              >
                <Link
                  href={group.href}
                  onFocus={() => group.items && open(group.label)}
                  aria-expanded={group.items ? openMenu === group.label : undefined}
                  aria-haspopup={group.items ? 'true' : undefined}
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(group.href)
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {group.label}
                  {group.items && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 opacity-70 transition-transform ${
                        openMenu === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>
                {group.items && openMenu === group.label && (
                  <DesktopDropdown group={group} onNavigate={() => setOpenMenu(null)} />
                )}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href={NAV_CTA.href}
              onClick={() => onCta('header')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition-colors"
            >
              {NAV_CTA.label}
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-gray-200 hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          onClick={(e) => {
            // Same-page anchor links don't change the pathname, so close explicitly.
            if ((e.target as HTMLElement).closest('a')) setMobileOpen(false);
          }}
          className="lg:hidden h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-[#04070e] border-t border-white/10"
        >
          <div className="px-4 py-4">
            <ul className="divide-y divide-white/[0.06]">
              {MAIN_NAV.map((group) => {
                const expanded = mobileSection === group.label;
                if (!group.items) {
                  return (
                    <li key={group.label}>
                      <Link
                        href={group.href}
                        className="flex items-center justify-between px-2 py-4 text-base font-medium text-gray-100"
                      >
                        {group.label}
                        <ArrowRight className="w-4 h-4 text-gray-500" />
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={group.label}>
                    <button
                      type="button"
                      onClick={() => setMobileSection(expanded ? null : group.label)}
                      aria-expanded={expanded}
                      className="w-full flex items-center justify-between px-2 py-4 text-base font-medium text-gray-100"
                    >
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expanded && (
                      <ul className="pb-3 space-y-0.5">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors"
                            >
                              <span className="block text-[15px] text-gray-200">{item.label}</span>
                              {item.description && (
                                <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={group.footer?.href ?? group.href}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-sky-300"
                          >
                            {group.footer?.label ?? `${group.label} overview`}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="pt-5 space-y-2.5">
              <Link
                href={NAV_CTA.href}
                onClick={() => onCta('mobile_menu')}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold"
              >
                Build My Business System
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blueprint"
                className="flex items-center justify-center px-4 py-3.5 rounded-xl border border-white/15 text-white font-medium"
              >
                Start with a Business Blueprint
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopDropdown({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const hasDescriptions = group.items?.some((i) => i.description);
  return (
    <div
      className={`absolute left-0 top-full pt-2 ${hasDescriptions ? 'w-[23rem]' : 'w-64'}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a')) onNavigate();
      }}
    >
      <div className="rounded-2xl border border-white/10 bg-[#070b14]/[0.98] backdrop-blur-xl shadow-2xl shadow-black/60 p-2">
        <ul>
          {group.items?.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2.5 rounded-xl hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none transition-colors"
              >
                <span className="block text-sm font-semibold text-white">{item.label}</span>
                {item.description && (
                  <span className="block text-xs text-gray-400 mt-0.5">{item.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={group.footer?.href ?? group.href}
          className="mt-1 flex items-center justify-between px-3 py-2.5 rounded-xl border-t border-white/10 text-sm font-medium text-sky-300 hover:bg-white/[0.06] transition-colors"
        >
          {group.footer?.label ?? `${group.label} overview`}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
