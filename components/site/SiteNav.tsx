'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { PRIMARY_NAV, PRODUCT_NAV, APP_URL } from '@/lib/vexaos';
import VexaLogo from './VexaLogo';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };
  const scheduleCloseProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-[#04070e]/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center" aria-label="VexaOS — home">
            <VexaLogo markSize={30} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {PRIMARY_NAV.map((l) =>
              l.href === '/products' ? (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={openProducts}
                  onMouseLeave={scheduleCloseProducts}
                >
                  <Link
                    href="/products"
                    onFocus={openProducts}
                    aria-expanded={productsOpen}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(l.href)
                        ? 'text-white bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                    />
                  </Link>

                  {productsOpen && (
                    <div className="absolute left-0 top-full pt-2 w-[22rem]">
                      <div className="rounded-2xl border border-white/10 bg-[#070b14]/98 backdrop-blur-xl shadow-2xl shadow-black/60 p-2">
                        {PRODUCT_NAV.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="block px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors"
                          >
                            <span className="block text-sm font-semibold text-white">
                              {p.label}
                            </span>
                            <span className="block text-xs text-gray-400 mt-0.5">
                              {p.description}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/products"
                          className="mt-1 flex items-center justify-between px-3 py-2.5 rounded-xl border-t border-white/10 text-sm font-medium text-sky-300 hover:bg-white/[0.06] transition-colors"
                        >
                          Compare all products
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(l.href)
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href={APP_URL}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
            >
              Log in
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
            <Link
              href="/demo"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition-colors"
            >
              Book a demo
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-200 hover:bg-white/10 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#04070e]/98 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            <p className="px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Products
            </p>
            {PRODUCT_NAV.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="block px-4 py-2.5 rounded-lg text-gray-200 hover:bg-white/5 transition-colors"
              >
                <span className="block text-[15px] font-medium">{p.label}</span>
                <span className="block text-xs text-gray-500">{p.description}</span>
              </Link>
            ))}

            <p className="px-4 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Explore
            </p>
            {PRIMARY_NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                  isActive(l.href)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-2.5 rounded-lg text-[15px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Contact
            </Link>

            <div className="pt-3 space-y-2">
              <Link
                href="/demo"
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold"
              >
                Book a demo
              </Link>
              <a
                href={APP_URL}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-white/15 text-white font-medium"
              >
                Log in to VexaOS
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
