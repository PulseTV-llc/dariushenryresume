import VexaMark from '@/components/site/VexaMark';
import { DISCLAIMERS } from '@/lib/quote-config';
import type { QuoteResult } from '@/lib/quote-engine';

/**
 * ============================================================================
 * QuoteDocument — the CLIENT-FACING, print-optimized proposal.
 *
 * This is a self-contained, deterministic layout intended to be printed to PDF
 * via the browser print dialog behind a locked `@media print` + `@page` rule
 * (see app/globals.css). It renders on a light, print-friendly background with
 * the VexaOS blue→cyan accent, and every block carries page-break rules so no
 * card, row, or section is ever split across a page boundary.
 *
 * It is rendered in two contexts:
 *   1. Hidden in the DOM and revealed only by the print stylesheet (real PDF).
 *   2. Inside an on-screen "Preview" sheet so the admin can see it before
 *      printing (and so it can be verified with screenshots).
 *
 * IMPORTANT: this document shows only client-appropriate content. All internal
 * pricing mechanics (country multipliers, minimum-floor math, profit-protection
 * warnings, pricing strategy) live in the on-screen calculator and never here.
 * ============================================================================
 */

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export interface QuoteDocumentProps {
  clientName: string;
  businessName: string;
  industryLabel: string;
  quoteNumber: string;
  dateLabel: string;
  r: QuoteResult;
}

export default function QuoteDocument({
  clientName,
  businessName,
  industryLabel,
  quoteNumber,
  dateLabel,
  r,
}: QuoteDocumentProps) {
  const scopeLines = [
    ...r.platform.lines.map((l) => ({ ...l, group: 'Platform' })),
    ...r.feature.lines.map((l) => ({ ...l, group: 'Feature' })),
    ...r.quantity.lines.map((l) => ({ ...l, group: 'Quantity' })),
    ...r.touchBoard.lines.map((l) => ({
      label: `Touch Board — ${l.size} × ${l.qty}`,
      price: l.price,
      group: 'Hardware',
    })),
  ];
  const activePhases = r.phases.filter((p) => p.amount > 0);

  return (
    <div className="qd-root">
      {/* Repeating running footer (fixed → repeats on every printed page). */}
      <footer className="qd-runfoot" aria-hidden>
        <span className="qd-runfoot-brand">
          Vexa<span className="qd-accent-text">OS</span> · Connected Business Systems
        </span>
        <span>vexaos.io · Confidential proposal</span>
      </footer>

      {/* ================= HEADER ================= */}
      <header className="qd-block qd-header">
        <div className="qd-header-top">
          <div className="qd-brand">
            <VexaMark size={44} />
            <div className="qd-brand-text">
              <div className="qd-wordmark">
                Vexa<span className="qd-accent-text">OS</span>
              </div>
              <div className="qd-tagline">Connected Business Systems</div>
            </div>
          </div>
          <div className="qd-doclabel">
            <div className="qd-doclabel-title">Proposal &amp; Quote</div>
            <div className="qd-doclabel-meta">
              <div>
                <span>Quote No.</span>
                <strong>{quoteNumber}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{dateLabel}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="qd-accentbar" />

        <div className="qd-parties">
          <div>
            <div className="qd-eyebrow">Prepared for</div>
            <div className="qd-party-name">{businessName || clientName || 'Prospective Client'}</div>
            {businessName && clientName && <div className="qd-party-sub">Attn: {clientName}</div>}
            <div className="qd-party-sub">{industryLabel}</div>
          </div>
          <div className="qd-parties-right">
            <div className="qd-eyebrow">Prepared by</div>
            <div className="qd-party-name">VexaOS</div>
            <div className="qd-party-sub">Custom Connected Business Systems</div>
            <div className="qd-party-sub">support@vexaos.io</div>
          </div>
        </div>
      </header>

      {/* ================= INVESTMENT SUMMARY (hero) ================= */}
      <section className="qd-block qd-hero">
        <div className="qd-hero-main">
          <div className="qd-hero-eyebrow">Total investment</div>
          <div className="qd-hero-figure">
            {money(r.finalSetup)}
            <span className="qd-hero-figure-unit">one-time setup</span>
          </div>
          <div className="qd-hero-monthly">
            + {money(r.finalMonthly)}/mo · {r.supportTier.label} support
          </div>
        </div>
        <div className="qd-hero-grid">
          <div className="qd-hero-stat">
            <span>Package</span>
            <strong>{r.pkg.label}</strong>
          </div>
          <div className="qd-hero-stat">
            <span>Estimated timeline</span>
            <strong>{r.timelineEstimate}</strong>
          </div>
          <div className="qd-hero-stat">
            <span>Support tier</span>
            <strong>{r.supportTier.label}</strong>
          </div>
        </div>
      </section>

      {/* ================= SCOPE ================= */}
      <section className="qd-section">
        <h2 className="qd-h2 qd-keepnext">What&apos;s included</h2>
        <p className="qd-section-intro qd-keepnext">
          Your custom build includes the following platforms, feature modules, and configured
          quantities — designed and delivered end-to-end by VexaOS.
        </p>
        <div className="qd-linetable">
          {scopeLines.length === 0 && (
            <div className="qd-lineitem qd-block">
              <span className="qd-line-label">Custom scope — to be finalized</span>
              <span className="qd-line-price">—</span>
            </div>
          )}
          {scopeLines.map((l, i) => (
            <div key={i} className="qd-lineitem qd-block">
              <span className="qd-line-label">
                <span className="qd-line-dot" />
                {l.label}
              </span>
              <span className="qd-line-price">{money(l.price)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INVESTMENT BREAKDOWN ================= */}
      <section className="qd-section">
        <h2 className="qd-h2 qd-keepnext">Investment breakdown</h2>
        <div className="qd-block qd-breakdown">
          <div className="qd-breakdown-row">
            <span>Build &amp; configuration ({r.pkg.label})</span>
            <span>{money(r.buildFeeBase)}</span>
          </div>
          <div className="qd-breakdown-row">
            <span>Engineering, delivery &amp; market adjustment</span>
            <span>{money(Math.max(0, r.setupBuild - r.buildFeeBase))}</span>
          </div>
          {r.hardwareSubtotal > 0 && (
            <div className="qd-breakdown-row">
              <span>Touch board hardware</span>
              <span>{money(r.hardwareSubtotal)}</span>
            </div>
          )}
          <div className="qd-breakdown-row qd-breakdown-total">
            <span>Setup investment (one-time)</span>
            <span>{money(r.finalSetup)}</span>
          </div>
          <div className="qd-breakdown-row qd-breakdown-monthly">
            <span>Ongoing support — {r.supportTier.label}</span>
            <span>{money(r.finalMonthly)}/mo</span>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE & PHASES ================= */}
      {activePhases.length > 0 && (
        <section className="qd-section">
          <h2 className="qd-h2 qd-keepnext">Delivery timeline &amp; phased build</h2>
          <p className="qd-section-intro qd-keepnext">
            Estimated delivery: <strong>{r.timelineEstimate}</strong>. Larger builds can be
            delivered in value-first phases so you launch sooner and expand with confidence.
          </p>
          <div className="qd-phases">
            {activePhases.map((p) => (
              <div key={p.name} className="qd-phase qd-block">
                <div className="qd-phase-name">{p.name}</div>
                <div className="qd-phase-detail">{p.detail}</div>
                <div className="qd-phase-amount">{money(p.amount)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PAYMENT SCHEDULE ================= */}
      <section className="qd-section">
        <h2 className="qd-h2 qd-keepnext">Payment schedule</h2>
        <p className="qd-section-intro qd-keepnext">{r.schedule.label}</p>
        <div className="qd-linetable">
          {r.paymentPlan.map((p, i) => (
            <div key={i} className="qd-lineitem qd-block">
              <span className="qd-line-label">
                <span className="qd-line-dot" />
                {p.label} <span className="qd-line-pct">({Math.round(p.pct * 100)}%)</span>
              </span>
              <span className="qd-line-price">{money(p.amount)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TERMS & ACCEPTANCE ================= */}
      <section className="qd-section">
        <h2 className="qd-h2 qd-keepnext">Terms &amp; notes</h2>
        <ul className="qd-terms">
          <li className="qd-block">{DISCLAIMERS.scopeWarning}</li>
          <li className="qd-block">{DISCLAIMERS.thirdPartyFees}</li>
          <li className="qd-block">
            This proposal is valid for 30 days from the date above. Pricing is in USD. Work begins
            once the initial payment is received and scope is confirmed in writing.
          </li>
        </ul>

        <div className="qd-block qd-accept">
          <div className="qd-accept-col">
            <div className="qd-accept-line" />
            <div className="qd-accept-label">Client signature</div>
          </div>
          <div className="qd-accept-col">
            <div className="qd-accept-line" />
            <div className="qd-accept-label">Date</div>
          </div>
        </div>
      </section>

      {/* Static end-of-document footer (visible on screen; the fixed running
          footer above handles per-page repetition when printed). */}
      <div className="qd-endfoot qd-block">
        <span>
          Vexa<span className="qd-accent-text">OS</span> · Connected Business Systems
        </span>
        <span>Thank you for the opportunity to build with you.</span>
      </div>
    </div>
  );
}
