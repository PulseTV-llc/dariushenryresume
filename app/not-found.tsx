import Link from 'next/link';
import VexaLogo from '@/components/site/VexaLogo';
import { common } from '@/content/en/common';

/** Global 404. Rendered outside the locale layout, so it brings its own <html>. */
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <Link href="/" aria-label={common.nav.home}>
            <VexaLogo />
          </Link>
          <p className="mono-label mt-10 text-blue-700">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{common.notFound.title}</h1>
          <p className="mt-3 text-slate-600">{common.notFound.body}</p>
          <Link href="/" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            {common.notFound.back}
          </Link>
        </main>
      </body>
    </html>
  );
}
