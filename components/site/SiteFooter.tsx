'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/business-data';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand + pitch */}
          <div className="lg:col-span-1">
            <Image
              src="/vexaos-logo.png"
              alt="VexaOS — Connected Business Systems"
              width={340}
              height={191}
              className="w-[220px] h-auto -ml-2 mb-3"
              priority={false}
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Custom connected business systems across web, iOS, Android, and touchscreen —
              designed around the way your business actually works.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Founded &amp; built by{' '}
              <span className="text-gray-300 font-medium">Darius Henry</span>.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:support@vexaos.io"
                className="group flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                support@vexaos.io
              </a>
              <a
                href="https://www.linkedin.com/in/darius-henry-292b21373/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                LinkedIn
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/PulseTV-llc"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Github className="w-4 h-4 text-gray-300" />
                GitHub
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Start a Business Blueprint
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} VexaOS · Connected Business Systems · by Darius Henry
          </p>
          <p className="text-xs text-gray-600">
            Web · iOS · Android · Touchscreen · Dashboards · Real-Time Sync
          </p>
        </div>
      </div>
    </footer>
  );
}
