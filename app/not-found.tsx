import Link from 'next/link';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main id="main" className="flex min-h-[70vh] items-center justify-center px-4 pt-24 text-center">
        <div>
          <p className="mono-label text-blue-700">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">We could not find that page.</h1>
          <p className="mt-3 text-slate-600">It may have moved when the site was rebuilt.</p>
          <Link href="/" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Back to the home page
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
