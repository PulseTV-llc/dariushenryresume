'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, DoorClosed, DoorOpen, Droplets, Factory, Forklift, Pause, Play, Plug, Radar, ShoppingCart, Thermometer, UtensilsCrossed, User, Wifi, Wrench, X, type LucideIcon } from 'lucide-react';
import {
  CLOUD, DEVICES, PROPS, ROOM_LABEL, DEVICE_IDS, DOCK_DOOR, LAYERS, LAYER_COLOR, NODES, NODE_IDS, NOTIFICATIONS, PHONE_EDGE, ROOM_IDS, ROOM_NODE, SIZE, TOUR, VIEW, Z,
  boxFaces, deviceAt, gridLines, heardBy, isNode, iso, notificationAt, packetAt, pct, roomAt, roomPolygon, wallPieces, wallPolygon,
  type DeviceId, type Layer, type NodeId, type Pt, type RoomId,
} from '@/lib/locate-node/facility';
import { layoutStrings, type FacilityLayout, type FacilityStrings } from '@/lib/locate-node/facility-strings';

type Target = DeviceId | NodeId | RoomId;
const ICON: Record<DeviceId, LucideIcon> = {
  temp: Thermometer, humidity: Droplets, doorWalkin: DoorOpen, doorDock: DoorClosed, plug: Plug, motion: Radar, vibration: Activity, cart: ShoppingCart, badge: User, toolkit: Wrench,
};
const MOVING = DEVICE_IDS.filter((d) => DEVICES[d].path);
const isRoom = (id: string): id is RoomId => (ROOM_IDS as string[]).includes(id);
const isDevice = (id: string): id is DeviceId => id in DEVICES;
const line = (a: Pt, b: Pt) => ({ x1: a[0], y1: a[1], x2: b[0], y2: b[1] });

/** The little Locate Node drawn on each node marker: a dark slab, an antenna, a blue light bar. */
function NodeGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <rect x="23" y="2" width="3" height="10" rx="1.5" fill="#0b1220" stroke="#64748b" strokeWidth=".8" />
      <rect x="3" y="9" width="26" height="18" rx="4" fill="#0b1220" stroke="#94a3b8" strokeWidth="1" />
      <rect className="lf-node-bar" x="9" y="19" width="14" height="2.6" rx="1.3" fill="#38bdf8" />
    </svg>
  );
}

/**
 * The interactive facility: an isometric plan (SVG, decorative) with real buttons laid over it for every node,
 * sensor, tag and room. One clock drives everything (lib/locate-node/facility.ts); a single animation frame loop
 * moves the tags and packets by writing transforms and attributes directly, so React only re-renders when a
 * selection, a tag's room or the phone's notification changes. It starts when scrolled into view and stops when
 * it leaves. With reduced motion there is no loop at all: a still, fully annotated plan that works the same way.
 */
export default function Facility({ t: base }: { t: FacilityStrings }) {
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const pan = useRef<HTMLDivElement>(null);
  const clock = useRef(0);
  const tagEls = useRef<Partial<Record<DeviceId, HTMLDivElement | null>>>({});
  const packetEls = useRef<Partial<Record<DeviceId, SVGCircleElement | null>>>({});
  const linkEls = useRef<Partial<Record<DeviceId, SVGLineElement | null>>>({});
  const pingEls = useRef<Partial<Record<DeviceId, HTMLSpanElement | null>>>({});
  const phonePacket = useRef<SVGCircleElement>(null);

  const [layout, setLayout] = useState<FacilityLayout>('restaurant');
  const t = useMemo(() => layoutStrings(base, layout), [base, layout]);
  const [enter, setEnter] = useState(false);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState<Target | null>(null);
  const [pinned, setPinned] = useState(false);
  const [layers, setLayers] = useState<Set<Layer>>(() => new Set(LAYERS));
  const [tour, setTour] = useState(-1);
  const [zones, setZones] = useState<Record<string, RoomId>>(() => Object.fromEntries(MOVING.map((d) => [d, roomAt(deviceAt(d, 0))])));
  const [note, setNote] = useState(0);
  const [still, setStill] = useState(false);
  const [compact, setCompact] = useState(false);
  const [running, setRunning] = useState(false);

  // ---------------------------------------------------------------- environment: motion preference, size, visibility
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)'), narrow = window.matchMedia('(max-width: 767px)');
    const sync = () => { setStill(motion.matches); setCompact(narrow.matches); };
    sync();
    // the entrance is opt-in from here, so the plan is never hidden without script or with reduced motion
    setEnter(!motion.matches);
    motion.addEventListener('change', sync); narrow.addEventListener('change', sync);
    const watch = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.12 });
    if (section.current) watch.observe(section.current);
    // the plan assembles itself the first time a good part of it is on screen
    const arrive = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); arrive.disconnect(); } }, { threshold: 0.3 });
    if (scene.current) arrive.observe(scene.current);
    return () => { motion.removeEventListener('change', sync); narrow.removeEventListener('change', sync); watch.disconnect(); arrive.disconnect(); };
  }, []);

  // on a phone the plan is wider than the screen: start in the middle of it rather than at its left edge
  useEffect(() => { const el = pan.current; if (compact && el) el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.42; }, [compact]);

  // on a phone the details open in a sheet over the bottom of the screen: bring what was chosen into the space above it
  useEffect(() => {
    if (!compact || !active) return;
    const frame = requestAnimationFrame(() => {
      const el = scene.current?.querySelector<HTMLElement>(`[data-lf-id="${active}"]`), box = pan.current, sheet = section.current?.querySelector('.lf-sheet');
      if (!el || !box) return;
      const r = el.getBoundingClientRect(), behavior: ScrollBehavior = still ? 'auto' : 'smooth';
      box.scrollTo({ left: box.scrollLeft + r.left + r.width / 2 - window.innerWidth / 2, behavior });
      const top = 76, bottom = (sheet ? sheet.getBoundingClientRect().top : window.innerHeight) - 20;
      if (r.top < top || r.bottom > bottom) window.scrollBy({ top: r.top + r.height / 2 - (top + bottom) / 2, behavior });
    });
    return () => cancelAnimationFrame(frame);
  }, [active, compact, still]);

  /** Put a moving tag (and the line to its node) where it is at time `time`. */
  const place = useCallback((time: number) => {
    const box = scene.current;
    if (!box) return;
    const w = box.clientWidth, h = box.clientHeight;
    for (const id of MOVING) {
      const p = iso(...deviceAt(id, time), Z.device);
      const el = tagEls.current[id];
      if (el) el.style.transform = `translate3d(${(((p[0] - VIEW.x) / VIEW.w) * w).toFixed(1)}px, ${(((p[1] - VIEW.y) / VIEW.h) * h).toFixed(1)}px, 0)`;
      const node = heardBy(id, time).node, link = linkEls.current[id];
      if (link && node) { const n = iso(...NODES[node].at, Z.node); link.setAttribute('x1', p[0].toFixed(1)); link.setAttribute('y1', p[1].toFixed(1)); link.setAttribute('x2', n[0].toFixed(1)); link.setAttribute('y2', n[1].toFixed(1)); }
    }
  }, []);

  // ------------------------------------------------------------------------------------------ the one animation loop
  useEffect(() => {
    place(clock.current);
    const onResize = () => place(clock.current);
    window.addEventListener('resize', onResize);
    if (still || !running) return () => window.removeEventListener('resize', onResize);
    let frame = 0, last = performance.now();
    const rooms: Record<string, RoomId> = {}, flying: Record<string, boolean> = {};
    let shown = -2;
    const tick = (now: number) => {
      if (!document.hidden) clock.current += Math.min(0.1, (now - last) / 1000);
      last = now;
      const time = clock.current;
      place(time);
      for (const id of MOVING) {
        const room = heardBy(id, time).room;
        if (rooms[id] !== room) { rooms[id] = room; setZones((z) => (z[id] === room ? z : { ...z, [id]: room })); }
      }
      for (const id of DEVICE_IDS) {
        const dot = packetEls.current[id];
        if (!dot) continue;
        const p = packetAt(id, time);
        // a ring leaves the sensor the moment it speaks
        if (p && !flying[id]) pingEls.current[id]?.animate([{ transform: 'scale(0.7)', opacity: 0.9 }, { transform: 'scale(2.3)', opacity: 0 }], { duration: 1100, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' });
        flying[id] = !!p;
        if (p) { dot.setAttribute('cx', p[0].toFixed(1)); dot.setAttribute('cy', p[1].toFixed(1)); dot.style.opacity = '1'; } else dot.style.opacity = '0';
      }
      const n = notificationAt(time);
      if (n.index !== shown) { shown = n.index; setNote(n.index); }
      if (phonePacket.current) {
        if (n.packet) { phonePacket.current.setAttribute('cx', n.packet[0].toFixed(1)); phonePacket.current.setAttribute('cy', n.packet[1].toFixed(1)); phonePacket.current.style.opacity = '1'; } else phonePacket.current.style.opacity = '0';
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); };
  }, [still, running, place]);

  // ------------------------------------------------------------------------------------------------------- the tour
  useEffect(() => {
    if (tour < 0) return;
    setActive(TOUR[tour]);
    const timer = setTimeout(() => setTour((i) => (i + 1 >= TOUR.length ? -1 : i + 1)), 4200);
    return () => clearTimeout(timer);
  }, [tour]);
  useEffect(() => { if (tour < 0) { setActive((a) => (pinned ? a : null)); } }, [tour, pinned]);

  const stopTour = () => setTour(-1);
  const hover = (id: Target | null) => { if (tour >= 0 || pinned || compact) return; setActive(id); };
  const pick = (id: Target) => { stopTour(); if (active === id && pinned) { setPinned(false); setActive(null); } else { setActive(id); setPinned(true); } };
  const clear = () => { stopTour(); setPinned(false); setActive(null); };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setTour(-1); setPinned(false); setActive(null); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // ------------------------------------------------------------------------------- what is lit, and what the card says
  const roomOf = useCallback((id: DeviceId): RoomId => zones[id] ?? roomAt(DEVICES[id].at as Pt), [zones]);
  const nodeOf = useCallback((id: DeviceId): NodeId | null => (DEVICES[id].via === 'wifi' ? null : ROOM_NODE[roomOf(id)]), [roomOf]);
  const lit = useMemo(() => {
    const on = new Set<string>();
    if (!active) return on;
    on.add(active);
    if (isDevice(active)) { const n = nodeOf(active); if (n) on.add(n); on.add(roomOf(active)); }
    else if (isNode(active)) { DEVICE_IDS.filter((d) => nodeOf(d) === active).forEach((d) => on.add(d)); ROOM_IDS.filter((r) => ROOM_NODE[r] === active).forEach((r) => on.add(r)); }
    else if (isRoom(active)) { DEVICE_IDS.filter((d) => roomOf(d) === active).forEach((d) => on.add(d)); on.add(ROOM_NODE[active]); }
    return on;
  }, [active, nodeOf, roomOf]);
  const visible = (id: DeviceId) => layers.has(DEVICES[id].layer);
  const nodeName = (n: NodeId) => t.node.inRoom.replace('{room}', t.rooms[NODES[n].room]);

  const card = useMemo(() => {
    if (!active) return null;
    if (isDevice(active)) {
      const d = DEVICES[active], text = t.devices[active], n = nodeOf(active);
      return {
        title: text.name, color: LAYER_COLOR[d.layer], badge: d.integrating ? t.integrating : t.layers[d.layer],
        rows: [
          [t.card.measures, text.measures],
          ...(d.integrating ? [[t.integrating, t.integratingNote]] : [[`${t.card.reading} · ${t.card.example}`, text.reading.replace('{room}', t.rooms[roomOf(active)])]]),
          [t.card.heardBy, d.via === 'wifi' ? t.wifi : n ? nodeName(n) : '—'],
          [t.card.alert, text.alert],
        ] as [string, string][],
      };
    }
    if (isNode(active)) {
      const hears = DEVICE_IDS.filter((d) => nodeOf(d) === active && !DEVICES[d].integrating).map((d) => t.devices[d].name);
      return { title: nodeName(active), color: '#38bdf8', badge: t.node.name, rows: [[t.card.measures, t.node.measures], [t.node.hears, hears.length ? hears.join(' · ') : t.node.none], [t.card.alert, t.node.alert]] as [string, string][] };
    }
    const inRoom = DEVICE_IDS.filter((d) => roomOf(d) === active).map((d) => t.devices[d].name);
    return { title: t.rooms[active], color: '#7dd3fc', badge: t.card.zone, rows: [[t.room.heardBy, nodeName(ROOM_NODE[active])], [t.room.devices, inRoom.length ? inRoom.join(' · ') : t.room.empty]] as [string, string][] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, zones, t]);

  /** Which side of a marker the card opens on, so it stays inside the plan. */
  const side = (p: { left: number; top: number }) => `${p.left > 56 ? 'lf-left' : 'lf-right'} ${p.top > 52 ? 'lf-up' : 'lf-down'}`;
  // a plain function, not a component: a component declared here would be remounted (and re-animated) on every render
  const renderCard = (id: string, className = '') => card && (
    <div id={id} role="status" className={`lf-card ${className}`} style={{ ['--c' as string]: card.color }}>
      <p className="lf-card-badge">{card.badge}</p>
      <p className="lf-card-title">{card.title}</p>
      <dl>
        {card.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );

  const anchor = (id: DeviceId | NodeId): Pt => (isNode(id) ? iso(...NODES[id].at, Z.node) : iso(...deviceAt(id, 0), Z.device));
  const cloudPct = pct(CLOUD);

  return (
    <section ref={section} className={`lf ${active ? 'lf-has-active' : ''} ${still ? 'lf-still' : ''} ${running ? '' : 'lf-paused'} ${enter ? 'lf-enter' : ''} ${seen ? 'lf-seen' : ''}`} aria-labelledby="lf-title">
      <div className="mx-auto max-w-6xl">
        <p className="ln-eyebrow">{t.eyebrow}</p>
        <h2 id="lf-title" className="ln-h2 mt-4">{t.title.map((l, i) => <span key={i} className={`block ${i === t.title.length - 1 ? 'ln-shine' : ''}`}>{l}</span>)}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{t.intro}</p>

        <div className="lf-switch mt-8" role="group" aria-label={t.layouts.label}>
          {(['restaurant', 'factory'] as const).map((l) => {
            const Icon = l === 'restaurant' ? UtensilsCrossed : Factory;
            return (
              <button key={l} type="button" aria-pressed={layout === l} onClick={() => { clear(); setLayout(l); }}>
                <Icon className="h-4 w-4" aria-hidden="true" />{t.layouts[l]}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label={t.layersLabel}>
          {LAYERS.map((l) => (
            <button key={l} type="button" aria-pressed={layers.has(l)} className="lf-chip" style={{ ['--c' as string]: LAYER_COLOR[l] }}
                    onClick={() => setLayers((cur) => { const next = new Set(cur); if (next.has(l)) next.delete(l); else next.add(l); return next; })}>
              <span aria-hidden="true" />{t.layers[l]}
            </button>
          ))}
          {!still && (
            <button type="button" className="lf-tour" aria-pressed={tour >= 0} onClick={() => { setPinned(false); setTour((i) => (i >= 0 ? -1 : 0)); }}>
              {tour >= 0 ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              {tour >= 0 ? `${t.tour.stop} · ${t.tour.step.replace('{n}', String(tour + 1)).replace('{total}', String(TOUR.length))}` : t.tour.play}
            </button>
          )}
        </div>
        <p className="mt-3 text-sm text-slate-500">{still ? t.static : compact ? t.hint.touch : t.hint.desktop}</p>
      </div>

      <div className="lf-stage mx-auto mt-6 max-w-[88rem]">
        <div ref={pan} className="lf-pan">
          <div ref={scene} className="lf-scene" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }} onMouseLeave={() => hover(null)} onClick={(e) => { if (!(e.target as Element).closest('button')) clear(); }}>
            <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="lf-svg" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="lf-floor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1d4ed8" stopOpacity=".2" /><stop offset="1" stopColor="#0ea5e9" stopOpacity=".05" /></linearGradient>
                <linearGradient id="lf-cold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#67e8f9" stopOpacity=".26" /><stop offset="1" stopColor="#38bdf8" stopOpacity=".1" /></linearGradient>
                <linearGradient id="lf-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7dd3fc" stopOpacity=".3" /><stop offset="1" stopColor="#1e3a8a" stopOpacity=".1" /></linearGradient>
                <radialGradient id="lf-glow"><stop offset="0" stopColor="#2f8bff" stopOpacity=".5" /><stop offset="1" stopColor="#2f8bff" stopOpacity="0" /></radialGradient>
                <filter id="lf-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
                <filter id="lf-dot" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>

              {/* the building's shadow and glow on the ground */}
              <polygon points={[iso(0.4, 0.8, -26), iso(SIZE[0] + 0.4, 0.8, -26), iso(SIZE[0] + 0.4, SIZE[1] + 0.8, -26), iso(0.4, SIZE[1] + 0.8, -26)].map((p) => p.join(',')).join(' ')} fill="#000" opacity=".55" filter="url(#lf-soft)" />
              <ellipse cx={iso(7, 5)[0]} cy={iso(7, 5)[1] + 10} rx="430" ry="230" fill="url(#lf-glow)" opacity=".5" />

              {/* glass floors, one per room */}
              {ROOM_IDS.map((r) => <polygon key={r} points={roomPolygon(r)} className={`lf-room ${lit.has(r) ? 'is-on' : ''}`} fill={r === 'walkin' ? 'url(#lf-cold)' : 'url(#lf-floor)'} />)}
              <g className="lf-grid">{gridLines().map((g, i) => <line key={i} {...line(g[0], g[1])} />)}</g>

              {/* coverage ripples: a zone, drawn on the floor under each node */}
              {NODE_IDS.map((n, k) => {
                const c = iso(...NODES[n].at);
                return (
                  <g key={n} className={`lf-ripples ${lit.has(n) ? 'is-on' : ''}`} transform={`translate(${c[0].toFixed(1)} ${c[1].toFixed(1)})`}>
                    {[0, 1, 2].map((i) => <ellipse key={i} rx="150" ry="86.6" style={{ animationDelay: `${(i * 1.4 + k * 0.5).toFixed(1)}s` }} />)}
                  </g>
                );
              })}

              {/* back walls (tall), then interior walls (low, with doorways), then the open front edge */}
              <polygon points={wallPolygon([0, 0], [SIZE[0], 0], 40)} className="lf-wall" fill="url(#lf-wall)" />
              <polygon points={wallPolygon([0, 0], [0, SIZE[1]], 40)} className="lf-wall" fill="url(#lf-wall)" />
              {wallPieces().map(([a, b], i) => <polygon key={i} points={wallPolygon(a, b, 13)} className="lf-wall lf-wall-low" />)}
              {[...PROPS[layout]].sort((p, q) => p[2] + p[3] - (q[2] + q[3])).map((box, i) => {
                const f = boxFaces(box);
                // keyed by layout, so the furniture is rebuilt (and fades in) when the building changes
                return <g key={`${layout}-${i}`} className="lf-prop" style={{ ['--i' as string]: i }}><polygon points={f.left} className="is-left" /><polygon points={f.right} className="is-right" /><polygon points={f.top} className="is-top" /></g>;
              })}
              <polyline points={[iso(0, SIZE[1]), iso(SIZE[0], SIZE[1]), iso(SIZE[0], 0)].map((p) => p.join(',')).join(' ')} className="lf-edge" />
              <line {...line(iso(...DOCK_DOOR[0]), iso(...DOCK_DOOR[1]))} className="lf-dockdoor" />

              {/* who hears whom */}
              <g className="lf-links">
                {DEVICE_IDS.map((id) => {
                  const d = DEVICES[id], from = anchor(id), node = heardBy(id, 0).node;
                  const to = d.via === 'wifi' ? CLOUD : node ? iso(...NODES[node].at, Z.node) : from;
                  return <line key={id} ref={(el) => { if (d.path) linkEls.current[id] = el; }} {...line(from, to)}
                               className={`${lit.has(id) && active !== null ? 'is-on' : ''} ${d.integrating ? 'is-dashed' : ''} ${visible(id) ? '' : 'is-off'}`} style={{ ['--c' as string]: LAYER_COLOR[d.layer] }} />;
                })}
                {NODE_IDS.map((n) => <line key={n} {...line(iso(...NODES[n].at, Z.node), CLOUD)} className={`lf-uplink ${lit.has(n) ? 'is-on' : ''}`} />)}
                <line {...line(CLOUD, PHONE_EDGE)} className="lf-uplink is-on" />
              </g>

              {/* the cloud, at the edge of the scene */}
              <g transform={`translate(${CLOUD[0]} ${CLOUD[1]})`} className="lf-cloud">
                <ellipse rx="58" ry="30" fill="url(#lf-glow)" />
                <path d="M-26 10h46a15 15 0 0 0 2-29.8A21 21 0 0 0-18-14 13 13 0 0 0-26 10Z" />
              </g>

              {/* packets in flight */}
              {!still && DEVICE_IDS.filter((id) => DEVICES[id].every).map((id) => (
                <circle key={id} ref={(el) => { packetEls.current[id] = el; }} r="3.6" className={`lf-packet ${visible(id) ? '' : 'is-off'}`} fill={LAYER_COLOR[DEVICES[id].layer]} filter="url(#lf-dot)" style={{ opacity: 0 }} />
              ))}
              {!still && <circle ref={phonePacket} r="4.4" className="lf-packet" fill="#e0f2fe" filter="url(#lf-dot)" style={{ opacity: 0 }} />}
            </svg>

            <span className="lf-cloud-label" style={{ left: `${cloudPct.left}%`, top: `${cloudPct.top}%` }}>{t.cloud}</span>

            {/* rooms */}
            {ROOM_IDS.map((r) => {
              const p = pct(iso(...ROOM_LABEL[r]));
              return (
                <button key={r} type="button" data-lf-id={r} className={`lf-roomname ${lit.has(r) ? 'is-on' : ''}`} style={{ left: `${p.left}%`, top: `${p.top}%` }} aria-describedby={active === r ? 'lf-tip' : undefined}
                        onMouseEnter={() => hover(r)} onFocus={() => { if (!pinned) setActive(r); }} onBlur={() => { if (!pinned && tour < 0) setActive(null); }} onClick={() => pick(r)}>
                  {t.rooms[r]}
                </button>
              );
            })}

            {/* nodes and fixed sensors */}
            {[...NODE_IDS, ...DEVICE_IDS.filter((d) => !DEVICES[d].path)].map((id, i) => {
              const p = pct(anchor(id)), node = isNode(id), d = node ? null : DEVICES[id as DeviceId], Icon = node ? null : ICON[id as DeviceId];
              const off = d ? !visible(id as DeviceId) : false;
              return (
                <div key={id} className={`lf-marker ${node ? 'is-node' : ''} ${lit.has(id) ? 'is-on' : ''} ${active === id ? 'is-active' : ''} ${off ? 'is-off' : ''} ${d?.integrating ? 'is-integrating' : ''}`}
                     style={{ left: `${p.left}%`, top: `${p.top}%`, ['--c' as string]: d ? LAYER_COLOR[d.layer] : '#38bdf8', ['--i' as string]: i }}>
                  <button type="button" data-lf-id={id} tabIndex={off ? -1 : 0} aria-label={node ? nodeName(id as NodeId) : `${t.devices[id as DeviceId].name}. ${d?.integrating ? t.integrating : `${t.card.example}: ${t.devices[id as DeviceId].reading}`}`}
                          aria-describedby={active === id ? 'lf-tip' : undefined} aria-pressed={active === id && pinned}
                          onMouseEnter={() => hover(id)} onFocus={() => { if (!pinned) setActive(id); }} onBlur={() => { if (!pinned && tour < 0) setActive(null); }} onClick={() => pick(id)}>
                    {node ? <NodeGlyph /> : Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                    {d?.via === 'wifi' && <Wifi className="lf-wifi" aria-hidden="true" />}
                  </button>
                  {d && <span ref={(el) => { pingEls.current[id as DeviceId] = el; }} className="lf-ping" aria-hidden="true" />}
                  {!compact && active === id && renderCard('lf-tip', side(p))}
                </div>
              );
            })}

            {/* asset tags: they move, so they are positioned by the animation loop */}
            {MOVING.map((id, i) => {
              const Icon = id === 'cart' && layout === 'factory' ? Forklift : ICON[id], start = pct(iso(...deviceAt(id, 0), Z.device)), off = !visible(id);
              return (
                <div key={id} ref={(el) => { tagEls.current[id] = el; }} className={`lf-marker is-tag ${lit.has(id) ? 'is-on' : ''} ${active === id ? 'is-active' : ''} ${off ? 'is-off' : ''}`}
                     style={{ left: 0, top: 0, ['--c' as string]: LAYER_COLOR.assets, ['--i' as string]: 11 + i }}>
                  <button type="button" data-lf-id={id} tabIndex={off ? -1 : 0} aria-label={`${t.devices[id].name}. ${t.card.example}: ${t.devices[id].reading.replace('{room}', t.rooms[roomOf(id)])}`}
                          aria-describedby={active === id ? 'lf-tip' : undefined} aria-pressed={active === id && pinned}
                          onMouseEnter={() => hover(id)} onFocus={() => { if (!pinned) setActive(id); }} onBlur={() => { if (!pinned && tour < 0) setActive(null); }} onClick={() => pick(id)}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span ref={(el) => { pingEls.current[id] = el; }} className="lf-ping" aria-hidden="true" />
                  <span className="lf-zone" aria-hidden="true">{t.rooms[roomOf(id)]}</span>
                  {!compact && active === id && renderCard('lf-tip', side(start))}
                </div>
              );
            })}
          </div>
        </div>

        {/* the phone: what all of this turns into */}
        <aside className="lf-phone" aria-label={t.phone.label}>
          <div className="lf-phone-body">
            <span className="lf-phone-notch" aria-hidden="true" />
            <p className="lf-phone-tag">{t.card.example}</p>
            <ul aria-live="off">
              {(still ? NOTIFICATIONS.map((_, i) => i) : note >= 0 ? [note] : []).map((i) => {
                const n = NOTIFICATIONS[i];
                return (
                  <li key={i} className="lf-note" style={{ ['--c' as string]: LAYER_COLOR[DEVICES[n.device].layer] }}>
                    <span className="lf-note-app"><i aria-hidden="true" />{t.phone.title}<em>{t.phone.now}</em></span>
                    <span className="lf-note-text">{t.notifications[n.device]}</span>
                  </li>
                );
              })}
              {!still && note < 0 && <li className="lf-note is-idle">{t.phone.idle}</li>}
            </ul>
          </div>
        </aside>
      </div>

      <p className="mx-auto mt-8 max-w-3xl px-1 text-center text-xs leading-relaxed text-slate-500">{t.footnote}</p>

      {/* phones: the details open as a sheet at the bottom of the screen */}
      {compact && card && (
        <div className="lf-sheet">
          <button type="button" className="lf-sheet-close" onClick={clear} aria-label={t.card.close}><X className="h-4 w-4" aria-hidden="true" /></button>
          {renderCard('lf-tip')}
        </div>
      )}
    </section>
  );
}

