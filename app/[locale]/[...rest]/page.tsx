import { notFound } from 'next/navigation';

/** Any unknown path inside a language shows that language's "not found" page (app/[locale]/not-found.tsx). */
export default function CatchAll() {
  notFound();
}
