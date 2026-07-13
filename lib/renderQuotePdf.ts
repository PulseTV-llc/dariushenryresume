import { QUOTE_DOC_CSS } from '@/lib/quotePrintCss';

export function sanitizeFilename(s: string) {
  return (s || 'client').replace(/[^a-z0-9\-_]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'client';
}

async function launchBrowser() {
  const isServerless = !!process.env.VERCEL || process.env.NODE_ENV === 'production';
  const puppeteer = await import('puppeteer-core');

  if (isServerless) {
    // @sparticuz/chromium only extracts its bundled shared libraries (libnss3.so
    // et al., packed in al2/al2023.tar.br) when it detects an AWS Lambda runtime
    // via AWS_EXECUTION_ENV / AWS_LAMBDA_JS_RUNTIME. Vercel functions run on
    // Lambda but do not expose those vars, so the libs are never extracted and
    // Chromium fails to launch with "libnss3.so: cannot open shared object file".
    // Set the var the package looks for — matched to the running Node major so it
    // extracts the correct glibc pack — BEFORE importing it (its LD_LIBRARY_PATH
    // setup runs at module-load time).
    if (!process.env.AWS_EXECUTION_ENV && !process.env.AWS_LAMBDA_JS_RUNTIME) {
      const nodeMajor = Number(process.versions.node.split('.')[0]);
      if (nodeMajor >= 20) {
        process.env.AWS_LAMBDA_JS_RUNTIME = 'nodejs20.x'; // → extract al2023 libs
      } else {
        process.env.AWS_EXECUTION_ENV = 'AWS_Lambda_nodejs18.x'; // → extract al2 libs
      }
    }
    const chromium = (await import('@sparticuz/chromium')).default;
    // We only need PDF output — skip GPU/graphics to keep memory low.
    chromium.setGraphicsMode = false;
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  // Local development: use an installed Chrome/Chromium.
  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

/**
 * Render already-rendered QuoteDocument markup (the `.qd-root` outerHTML the
 * client is displaying) to a deterministic US-Letter PDF using headless
 * Chromium — @sparticuz/chromium on Vercel, a local Chrome in dev.
 *
 * Rendering the client's own DOM (rather than re-rendering React server-side)
 * guarantees the PDF is byte-identical to the on-screen preview / Print output,
 * and sidesteps the App Router's react-dom/server restrictions entirely. The
 * document is styled by the single-source QUOTE_DOC_CSS; Inter is loaded
 * explicitly so output is font-consistent regardless of the host system.
 */
export async function renderQuotePdfFromHtml(bodyHtml: string): Promise<Buffer> {
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; padding: 0; background: #ffffff; }
  .qd-root { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  /* The repeating footer is provided by Chromium's footerTemplate. */
  .qd-runfoot { display: none !important; }
${QUOTE_DOC_CSS}
</style></head>
<body>${bodyHtml}</body></html>`;

  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts && document.fonts.ready');

    const footer = `<div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:8px;color:#94a3b8;padding:0 0.5in;display:flex;justify-content:space-between;-webkit-print-color-adjust:exact;">
      <span>VexaOS &middot; Connected Business Systems</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>`;

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: footer,
      margin: { top: '0.5in', right: '0.5in', bottom: '0.6in', left: '0.5in' },
    });
    return Buffer.from(pdf);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}
