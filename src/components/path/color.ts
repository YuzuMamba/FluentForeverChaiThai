/** Tiny color helpers for tinting path UI with each unit's accent hex. */

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(v, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** rgba() string from hex + alpha. */
export function alpha(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

/** Mix toward white (f > 0) or black (f < 0). f in [-1, 1]. */
export function shade(hex: string, f: number): string {
  const [r, g, b] = hexToRgb(hex)
  const t = f > 0 ? 255 : 0
  const p = Math.abs(f)
  const m = (c: number) => Math.round(c + (t - c) * p)
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`
}
