/**
 * Capture real Control Center screenshots for the marketing site.
 *
 * Logs into control.vexaos.io and screenshots the dashboard + every page in the left nav at
 * retina resolution into public/screens/_new/. Credentials come from environment variables so
 * nothing is mangled by a prompt and nothing is stored.
 *
 * Run (put a leading space so it stays out of shell history):
 *    cd ~/Documents/dariusHenry/portfolio-site
 *    npm i -D playwright && npx playwright install chromium
 *     VEXAOS_EMAIL='you@example.com' VEXAOS_PASSWORD='your-password' node scripts/capture-screens.mjs
 *
 * The browser opens visibly so you can watch it log in (and handle any 2FA if prompted).
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const BASE = process.env.VEXAOS_BASE || 'https://control.vexaos.io';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'screens', '_new');
const EMAIL = process.env.VEXAOS_EMAIL;
const PASSWORD = process.env.VEXAOS_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error('Set credentials first, e.g.:');
  console.error("  VEXAOS_EMAIL='you@example.com' VEXAOS_PASSWORD='pw' node scripts/capture-screens.mjs");
  process.exit(1);
}

const slug = (p) =>
  'cc-' + (p.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'dashboard');

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: false, slowMo: 40 });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('→ opening login…');
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });

  // Fill by real typing (React-friendly), with fallbacks by placeholder/label.
  const emailField = page.locator('input[type="email"], input[name="email"], input[placeholder*="mail" i]').first();
  const passField = page.locator('input[type="password"], input[name="password"], input[placeholder*="pass" i]').first();
  await emailField.waitFor({ timeout: 15000 });
  await emailField.click();
  await emailField.fill(EMAIL);
  await passField.click();
  await passField.fill(PASSWORD);

  console.log('→ submitting…');
  // Submit via Enter first (most reliable), then fall back to a Sign in button.
  await passField.press('Enter').catch(() => {});
  await page.waitForTimeout(1500);
  if (/\/login/.test(page.url())) {
    await page.getByRole('button', { name: /sign in|log in|continue/i }).click().catch(() => {});
  }

  // Wait for either navigation away from /login, or an error to appear.
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle').catch(() => {});

  if (/\/login/.test(page.url())) {
    // Surface whatever the app is actually saying, so we know if it's creds vs. our flow.
    const bodyText = (await page.locator('body').innerText().catch(() => '')) || '';
    const errLine = bodyText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => /invalid|incorrect|wrong|error|failed|denied|not found|required/i.test(l))
      .slice(0, 5);
    await page.screenshot({ path: join(OUT, 'login-debug.png') }).catch(() => {});
    console.error('✗ Still on the login page after submit. Saved public/screens/_new/login-debug.png');
    if (errLine.length) console.error('  Page says:', errLine.join(' | '));
    console.error('  If the page shows no error, it may use a different sign-in flow (SSO/2FA) — tell me what you see.');
    await browser.close();
    process.exit(1);
  }

  console.log('✓ signed in:', page.url());

  // Expand collapsed sidebar groups so their links become discoverable.
  for (const label of ['People', 'Product', 'Money', 'Enterprise', 'PEOPLE', 'PRODUCT', 'MONEY', 'ENTERPRISE']) {
    try {
      await page.getByText(label, { exact: true }).first().click({ timeout: 1500 });
      await page.waitForTimeout(250);
    } catch {
      /* group missing or already open */
    }
  }

  const paths = await page.evaluate(() => {
    const set = new Set(['/']);
    document.querySelectorAll('a[href^="/"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href && !href.startsWith('//') && !href.startsWith('/login') && !href.includes('logout')) {
        set.add(href.split('?')[0].split('#')[0]);
      }
    });
    return [...set];
  });
  console.log(`→ capturing ${paths.length} pages:`, paths.join(', '));

  for (const p of paths) {
    try {
      await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1200);
      const file = join(OUT, `${slug(p)}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log('  ✓', p, '→', file);
    } catch (err) {
      console.warn('  ✗ skipped', p, '-', err.message);
    }
  }

  await browser.close();
  console.log('\nDone. Screenshots are in public/screens/_new/.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
