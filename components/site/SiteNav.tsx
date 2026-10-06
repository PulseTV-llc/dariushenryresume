'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { MAIN_NAV, NAV_CTA } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';
import VexaLogo from './VexaLogo';

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'border-b border-slate-200/70 bg-white/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-blue-700"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="VexaOs home" className="rounded-lg">
          <VexaLogo />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((group) => (
            <li key={group.label} className="group relative">
              <Link
                href={group.href}
                aria-current={isActive(group.href) ? 'page' : undefined}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(group.href) ? 'text-blue-700' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {group.label}
                {group.items && <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
              </Link>
              {group.items && (
                <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-900/10">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="block rounded-xl px-3 py-2.5 hover:bg-blue-50">
                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                            {item.label}
                            {item.badge && (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 ring-1 ring-amber-200">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          {item.description && (
                            <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-slate-500">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={NAV_CTA.href}
            onClick={() => trackEvent('nav_demo_click')}
            className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 sm:inline-flex"
          >
            {NAV_CTA.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-800 hover:bg-slate-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-6 pt-2 lg:hidden">
          {MAIN_NAV.map((group) => (
            <div key={group.label} className="border-b border-slate-100 py-3">
              <Link href={group.href} className="block py-1.5 text-base font-semibold text-slate-900">
                {group.label}
              </Link>
              {group.items && (
                <ul className="mt-1 space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="flex items-center gap-2 py-1.5 pl-3 text-sm text-slate-600">
                        {item.label}
                        {item.badge && (
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-800 ring-1 ring-amber-200">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link
            href={NAV_CTA.href}
            onClick={() => trackEvent('nav_demo_click')}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
          >
            {NAV_CTA.label}
          </Link>
        </div>
      )}
    </header>
  );
}
