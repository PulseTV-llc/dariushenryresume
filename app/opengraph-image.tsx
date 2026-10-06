import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VexaOs: monitor anything, anywhere.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STAGES = ['Sensors', 'Edge Gateway', 'Cloud & AI Insights', 'Web · iOS · Android'];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #eff6ff 0%, #f3f6fc 45%, #dbeafe 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              width: 84,
              height: 84,
              borderRadius: 20,
              background: '#081228',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 100 100">
              <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(35 50 50)" stroke="#2f8bff" strokeWidth="6" fill="none" />
              <ellipse cx="50" cy="50" rx="39" ry="16.5" transform="rotate(-35 50 50)" stroke="#67e8f9" strokeWidth="6" fill="none" />
              <circle cx="50" cy="50" r="10" fill="#bfe9ff" />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 46, fontWeight: 700, color: '#0f172a', letterSpacing: -1 }}>
            Vexa<span style={{ color: '#2563eb' }}>Os</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 86, fontWeight: 800, color: '#0f172a', letterSpacing: -3, lineHeight: 1.02 }}>
            Monitor anything,
          </div>
          <div style={{ display: 'flex', fontSize: 86, fontWeight: 800, color: '#2563eb', letterSpacing: -3, lineHeight: 1.02 }}>
            anywhere.
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 30, color: '#475569' }}>
            A vendor-neutral monitoring platform.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {STAGES.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  padding: '14px 22px',
                  borderRadius: 18,
                  background: '#ffffff',
                  border: '1px solid #bfdbfe',
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#0f172a',
                }}
              >
                {s}
              </div>
              {i < STAGES.length - 1 && <div style={{ display: 'flex', fontSize: 28, color: '#2563eb' }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
