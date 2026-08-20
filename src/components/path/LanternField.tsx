/**
 * LanternField — hand-drawn khom loi (Thai floating lanterns) filling the
 * wings of the home screen in three parallax depth layers, plus a radial
 * vignette that pulls the eye to the center path column.
 *
 * Replaces the flat 3D trapezoid lanterns from the shared backdrop on Home.
 * Pure DOM/SVG: gradient-shaded paper body, darker mouth rim, inner flame
 * glow, hanging tassel. Spawn positions are clamped ≥5% inside the viewport.
 */
import { memo } from 'react'

/** A single khom loi. Gradient ids are namespaced per instance. */
export function KhomLoi({ id, size = 64 }: { id: string; size?: number }) {
  const g = (n: string) => `kl-${id}-${n}`
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 64 96"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={g('paper')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD166" />
          <stop offset="0.55" stopColor="#FCA23C" />
          <stop offset="1" stopColor="#F77F00" />
        </linearGradient>
        <radialGradient id={g('halo')} cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#FFB25C" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#FF8F3D" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FF8F3D" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={g('flame')} cx="0.5" cy="0.72" r="0.55">
          <stop offset="0" stopColor="#FFF7DC" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#FFDC8A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFC24D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('shade')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B84A00" stopOpacity="0.4" />
          <stop offset="0.35" stopColor="#B84A00" stopOpacity="0" />
          <stop offset="0.75" stopColor="#FFE9A8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ambient halo, brightest at the mouth where the flame sits */}
      <ellipse cx="32" cy="46" rx="30" ry="32" fill={`url(#${g('halo')})`} />

      {/* paper body: rounded shoulders tapering WIDER toward the mouth
          (classic khom loi trapezoid silhouette) */}
      <path
        d="M25 6
           C 27 3.8 37 3.8 39 6
           C 44 10 47.5 22 49.5 34
           C 51 43.5 52 52 52.5 58
           L 11.5 58
           C 12 52 13 43.5 14.5 34
           C 16.5 22 20 10 25 6 Z"
        fill={`url(#${g('paper')})`}
      />
      {/* side shading + right rim light */}
      <path
        d="M25 6 C 27 3.8 37 3.8 39 6 C 44 10 47.5 22 49.5 34 C 51 43.5 52 52 52.5 58 L 11.5 58 C 12 52 13 43.5 14.5 34 C 16.5 22 20 10 25 6 Z"
        fill={`url(#${g('shade')})`}
      />
      {/* rib lines */}
      <path d="M25 8 C 22 22 20.5 42 20 58" stroke="#D96A0A" strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
      <path d="M39 8 C 42 22 43.5 42 44 58" stroke="#D96A0A" strokeOpacity="0.35" strokeWidth="1.4" fill="none" />

      {/* inner flame glow bleeding through the paper */}
      <ellipse cx="32" cy="48" rx="16" ry="11" fill={`url(#${g('flame')})`} />

      {/* darker bamboo mouth rim */}
      <path d="M12.5 56.5 h39 a2.8 2.8 0 0 1 2.8 2.8 v1 a2.8 2.8 0 0 1 -2.8 2.8 h-39 a2.8 2.8 0 0 1 -2.8 -2.8 v-1 a2.8 2.8 0 0 1 2.8 -2.8 Z" fill="#B4470B" />
      <path d="M9.7 59.6 h44.6 v0.7 a2.8 2.8 0 0 1 -2.8 2.8 h-39 a2.8 2.8 0 0 1 -2.8 -2.8 Z" fill="#8A3208" opacity="0.55" />
      {/* flame peeking at the mouth */}
      <ellipse cx="32" cy="59.4" rx="9" ry="2.6" fill="#FFE9A8" opacity="0.95" />

      {/* short hanging tassel */}
      <path d="M32 63.4 V 71" stroke="#B4470B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 71 l -3 5.4 M32 71 l 0 6.6 M32 71 l 3 5.4" stroke="#D96A0A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="71" r="2.2" fill="#FFD166" />
    </svg>
  )
}

/* Layer recipe: front = big + heavily blurred (depth-of-field), back = small
   + faint. x/y in %, clamped ≥5% inside the viewport; wings only, so the
   560px center column keeps its focus. */
type Spec = { x: number; y: number; scale: number; blur: number; opacity: number; dur: number; delay: number; layer: 'back' | 'mid' | 'front' }

const FIELD: Spec[] = [
  // back layer — 0.5-0.65x, 40% opacity
  { x: 7, y: 16, scale: 0.6, blur: 1.2, opacity: 0.4, dur: 9, delay: 0, layer: 'back' },
  { x: 15, y: 46, scale: 0.5, blur: 1.2, opacity: 0.38, dur: 11, delay: 2.2, layer: 'back' },
  { x: 10, y: 76, scale: 0.62, blur: 1.2, opacity: 0.4, dur: 10, delay: 4.1, layer: 'back' },
  { x: 88, y: 12, scale: 0.55, blur: 1.2, opacity: 0.4, dur: 10.5, delay: 1.3, layer: 'back' },
  { x: 93, y: 44, scale: 0.65, blur: 1.2, opacity: 0.42, dur: 9.5, delay: 3.4, layer: 'back' },
  { x: 86, y: 74, scale: 0.5, blur: 1.2, opacity: 0.38, dur: 11.5, delay: 5.2, layer: 'back' },
  // mid layer — 0.85-1.05x
  { x: 17, y: 28, scale: 0.95, blur: 2.5, opacity: 0.72, dur: 12, delay: 1.8, layer: 'mid' },
  { x: 6, y: 55, scale: 0.85, blur: 2.5, opacity: 0.7, dur: 13, delay: 0.6, layer: 'mid' },
  { x: 83, y: 30, scale: 1.05, blur: 2.5, opacity: 0.75, dur: 12.5, delay: 3.1, layer: 'mid' },
  { x: 94, y: 62, scale: 0.9, blur: 2.5, opacity: 0.7, dur: 11.8, delay: 4.6, layer: 'mid' },
  // front layer — 1.4-1.5x at 8px blur, drifting bokeh
  { x: 9, y: 88, scale: 1.5, blur: 8, opacity: 0.85, dur: 15, delay: 2.4, layer: 'front' },
  { x: 91, y: 86, scale: 1.4, blur: 8, opacity: 0.8, dur: 16, delay: 0.9, layer: 'front' },
  { x: 12, y: 6, scale: 1.4, blur: 8, opacity: 0.7, dur: 15.5, delay: 5.8, layer: 'front' },
]

function LanternFieldInner() {
  return (
    <div className="lantern-field" aria-hidden>
      {FIELD.map((s, i) => (
        <div
          key={i}
          className={`lf-lantern lf-${s.layer}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            filter: `blur(${s.blur}px) drop-shadow(0 0 ${Math.round(14 * s.scale)}px rgba(247, 127, 0, 0.4))`,
            animationDuration: `${s.dur}s`,
            animationDelay: `-${s.delay}s`,
            ['--lf-scale' as string]: s.scale,
          }}
        >
          <KhomLoi id={`f${i}`} size={58} />
        </div>
      ))}
      {/* radial vignette pulling the eye to the center column */}
      <div className="lantern-vignette" />
    </div>
  )
}

const LanternField = memo(LanternFieldInner)
export default LanternField
