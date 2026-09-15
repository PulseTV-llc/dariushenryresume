import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VexaOS — Custom business operating systems, built around the way your company actually works.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default social card for every page without its own image. */
export default function OpengraphImage() {
  const chips = ['Web', 'iOS', 'Android', 'Workforce', 'Commerce', 'Inventory', 'AI', 'Hardware'];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #04070e 0%, #071226 60%, #0b2344 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'radial-gradient(circle, #ffffff 0%, #7dd3fc 35%, #2563eb 100%)',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, display: 'flex' }}>
            Vexa<span style={{ color: '#7dd3fc' }}>OS</span>
          </div>
        </div>
          <div style={{ fontSize: 20, color: '#9ca3af', display: 'flex' }}>Built in America · Delivered worldwide</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, letterSpacing: 5, color: '#7dd3fc', textTransform: 'uppercase', display: 'flex' }}>
            Custom Business Operating Systems
          </div>
          <div style={{ marginTop: 18, fontSize: 64, fontWeight: 700, lineHeight: 1.08, maxWidth: 980, display: 'flex' }}>
            Built around the way your company actually works.
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: 'flex',
                  padding: '8px 14px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.05)',
                  fontSize: 20,
                  color: '#d1d5db',
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
