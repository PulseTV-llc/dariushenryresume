/** Zoom and pan maths for the photo viewer. Pure; positions are measured from the centre of the stage. */
export interface View { scale: number; x: number; y: number }
export interface Size { width: number; height: number }
export const MIN_SCALE = 1;
export const MAX_SCALE = 4;
export const TAP_SCALE = 2.5;
export const FIT: View = { scale: 1, x: 0, y: 0 };

/** Keep the picture covering the stage: it can be dragged only as far as its own edges. */
export function clampView(v: View, image: Size, stage: Size): View {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale));
  if (scale <= 1.001) return FIT;
  const maxX = Math.max(0, (image.width * scale - stage.width) / 2), maxY = Math.max(0, (image.height * scale - stage.height) / 2);
  return { scale, x: Math.min(maxX, Math.max(-maxX, v.x)), y: Math.min(maxY, Math.max(-maxY, v.y)) };
}
/** Zoom to `scale` keeping the point under the cursor or fingers (px, py) where it is. */
export function zoomAt(v: View, scale: number, px: number, py: number, image: Size, stage: Size): View {
  const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
  const cx = (px - v.x) / v.scale, cy = (py - v.y) / v.scale;
  return clampView({ scale: s, x: px - cx * s, y: py - cy * s }, image, stage);
}
/** A horizontal flick at normal size turns the page: -1 previous, 1 next, 0 neither. */
export function swipeDirection(dx: number, dy: number, threshold = 56): -1 | 0 | 1 {
  if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.2) return 0;
  return dx < 0 ? 1 : -1;
}
export const wrap = (i: number, n: number) => ((i % n) + n) % n;
