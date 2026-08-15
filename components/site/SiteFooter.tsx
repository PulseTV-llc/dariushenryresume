import Link from 'next/link';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { FOOTER_NAV, APP_URL, CONTACT_EMAIL } from '@/lib/vexaos';
import VexaLogo from './VexaLogo';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#03060c] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <VexaLogo markSize={34} showTagline />
            <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-xs">
              One operating system for your entire business — workforce, commerce,
              inventory, customer experiences, and the hardware they run on.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                {CONTACT_EMAIL}
              </a>
              <a
                href="https://www.linkedin.com/in/darius-henry-292b21373/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                LinkedIn
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} VexaOS. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={APP_URL}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Log in to VexaOS
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
            <Link
              href="/about/founder"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Founded by Darius Henry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
