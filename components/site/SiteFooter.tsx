import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { ADDRESS, CONTACT_EMAIL, FOOTER_COLUMNS, TAGLINE } from '@/lib/site';
import VexaLogo from './VexaLogo';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <VexaLogo size={30} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {TAGLINE} Sensors, an offline-safe Edge Gateway, VexaOS Cloud with AI Insights, and apps for web, iOS
              and Android.
            </p>
            <address className="mt-6 space-y-3 not-italic">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-700"
              >
                <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={ADDRESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-slate-600 hover:text-blue-700"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                <span>
                  {ADDRESS.street}
                  <br />
                  {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
                </span>
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {col.title}
                </h2>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-slate-600 hover:text-blue-700">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">© {year} VexaOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
