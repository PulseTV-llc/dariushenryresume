#!/usr/bin/env node
// Safeguard: vexaos.io (production) is built only from `main`.
//
// Runs before every build (npm "prebuild"). On Vercel, a PRODUCTION build of any other branch fails here, so a
// `vercel deploy --prod`, `vercel redeploy --target production`, `vercel promote` or a dashboard "Promote to
// Production" of a feature-branch preview cannot replace the live site: the deployment errors and production stays
// on what it was. Previews (VERCEL_ENV=preview) and local builds are not affected.
//
// Deliberate exception: set ALLOW_NON_MAIN_PRODUCTION=1 for that one deployment (Vercel env var or CLI --build-env).
// Background: on 2026-10-11/12 four feature-branch previews were promoted to production (meta.action "promote").

const env = process.env.VERCEL_ENV;
const ref = process.env.VERCEL_GIT_COMMIT_REF || '';
const allowed = process.env.ALLOW_NON_MAIN_PRODUCTION === '1';

if (env === 'production' && ref !== 'main' && !allowed) {
  console.error(`\n✖ Refusing a PRODUCTION build of branch "${ref || 'unknown'}": vexaos.io is built only from main.`);
  console.error('  Feature branches deploy as previews. Merge to main to go live, or set ALLOW_NON_MAIN_PRODUCTION=1 on purpose.\n');
  process.exit(1);
}
console.log(`production-branch guard: ok (VERCEL_ENV=${env || 'local'}, branch=${ref || 'n/a'})`);
