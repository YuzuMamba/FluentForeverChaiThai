/**
 * Chai Thai icon system — a bespoke 24px-grid SVG set with 2px rounded
 * strokes, replacing OS emoji in core chrome (nav, path nodes, unit tiles).
 * Two tones by convention: base #A78BFA, active #FBBF24 (set via CSS color).
 * Chang the elephant mascot stays the only illustrated character.
 */
import type { CSSProperties, ReactNode } from 'react'

export type IconName =
  | 'map' | 'brick' | 'cards' | 'elephant'
  | 'book' | 'puzzle' | 'headphones' | 'trophy' | 'crown'
  | 'lock' | 'target' | 'wai' | 'people' | 'point' | 'rice' | 'baht'
  | 'noodles' | 'tuktuk' | 'clock' | 'family' | 'heart' | 'bag'
  | 'chili' | 'sunrise' | 'weather' | 'health' | 'calendar' | 'chat'
  | 'flame' | 'bolt' | 'gem' | 'check' | 'sparkle' | 'sound' | 'letters' | 'trash'

/* All paths drawn on a 24×24 grid, stroke-first, 2px, round joins. */
const PATHS: Record<IconName, ReactNode> = {
  map: (
    <>
      <path d="M9 3.8 3.6 5.9v14l5.4-2 6 2 5.4-2v-14l-5.4 2-6-2.1z" />
      <path d="M9 3.8v14.1M15 5.9v14" opacity={0.55} />
    </>
  ),
  brick: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.7h18M3 14.4h18M9 5v4.7M15 9.7v4.7M9 14.4V19" opacity={0.7} />
    </>
  ),
  cards: (
    <>
      <path d="M8 6.5V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1.5" opacity={0.6} />
      <rect x="3" y="6.5" width="13.5" height="13.5" rx="2" />
      <path d="M6.5 11h6.5" opacity={0.7} />
    </>
  ),
  elephant: (
    <>
      <path d="M7.1 7.6a3.6 3.6 0 1 0 .5 7" opacity={0.6} />
      <path d="M16.9 7.6a3.6 3.6 0 1 1-.5 7" opacity={0.6} />
      <circle cx="12" cy="10.4" r="5.5" />
      <path d="M12 15.9v3a2.4 2.4 0 0 0 2.4 2.4" />
      <circle cx="9.9" cy="9.9" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="14.1" cy="9.9" r="0.95" fill="currentColor" stroke="none" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.2C10.5 4.9 8.3 4.2 6 4.2c-1 0-2 .1-3 .4v13.6c1-.3 2-.4 3-.4 2.3 0 4.5.7 6 2 1.5-1.3 3.7-2 6-2 1 0 2 .1 3 .4V4.6c-1-.3-2-.4-3-.4-2.3 0-4.5.7-6 2z" />
      <path d="M12 6.2v13.6" opacity={0.6} />
    </>
  ),
  puzzle: (
    <>
      <path d="M9.2 4.5h2v-.3a2.3 2.3 0 1 1 4.6 0v.3h3.7v4.2h-.8a2.3 2.3 0 1 0 0 4.6h.8v6.2h-4.2v-1.3a2.3 2.3 0 1 0-4.6 0v1.3H4.5v-5h.8a2.3 2.3 0 1 0 0-4.6h-.8V4.5h4.7z" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3.2" y="13.6" width="4.4" height="6.4" rx="2" />
      <rect x="16.4" y="13.6" width="4.4" height="6.4" rx="2" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 3.8h8v5.4a4 4 0 0 1-8 0V3.8z" />
      <path d="M8 5.4H5a3.2 3.2 0 0 0 3.2 3.8M16 5.4h3a3.2 3.2 0 0 1-3.2 3.8" opacity={0.7} />
      <path d="M12 13.2v3.2M8.6 20.2h6.8M10 16.4h4a1.6 1.6 0 0 1 1.6 1.6v2.2H8.4V18a1.6 1.6 0 0 1 1.6-1.6z" />
    </>
  ),
  crown: (
    <>
      <path d="M5.2 17.2 4 8.6l4.6 3.1L12 5.8l3.4 5.9L20 8.6l-1.2 8.6z" />
      <path d="M5.4 20h13.2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.6" width="14" height="9.4" rx="2.4" />
      <path d="M8 10.6V8a4 4 0 0 1 8 0v2.6" />
      <circle cx="12" cy="15.3" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.2" opacity={0.8} />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  wai: (
    <>
      <path d="M12 3.6c-2.4 2.6-5 6.2-5 9.6a5 5 0 0 0 10 0c0-3.4-2.6-7-5-9.6z" />
      <path d="M12 7.5v9.8" opacity={0.6} />
    </>
  ),
  people: (
    <>
      <circle cx="8.2" cy="8" r="3.1" />
      <circle cx="16.2" cy="8.6" r="2.5" opacity={0.7} />
      <path d="M3.2 19.4a5 5 0 0 1 10 0" />
      <path d="M15.4 15.2a4.2 4.2 0 0 1 5.4 4.2" opacity={0.7} />
    </>
  ),
  point: (
    <>
      <path d="M11.1 12.6V5.2a1.7 1.7 0 1 1 3.4 0v6l3 .8a2.3 2.3 0 0 1 1.6 2.6l-.5 2.7a3.8 3.8 0 0 1-3.7 3.1h-2.3c-1 0-2-.4-2.7-1.2l-3-3a1.8 1.8 0 0 1 2.5-2.5l1.7 1.6z" />
    </>
  ),
  rice: (
    <>
      <path d="M4 11.4c0 4.4 3.6 8 8 8s8-3.6 8-8H4z" />
      <path d="M7.6 11.4a4.4 3.6 0 0 1 8.8 0" opacity={0.7} />
      <path d="M12 4.2v2.4M8.6 5.4l1 2M15.4 5.4l-1 2" opacity={0.55} />
    </>
  ),
  baht: (
    <>
      <rect x="3" y="6.6" width="18" height="10.8" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6.4 12h.01M17.6 12h.01" />
    </>
  ),
  noodles: (
    <>
      <path d="M4 12.4c0 4.2 3.6 7.6 8 7.6s8-3.4 8-7.6H4z" />
      <path d="M7.2 3.2l3.4 8M18.4 2.6l-4.6 8.6" opacity={0.7} />
      <path d="M7.6 9.4c1.4-.8 2.8-1.2 4.4-1.2 1.6 0 3 .4 4.4 1.2" opacity={0.55} />
    </>
  ),
  tuktuk: (
    <>
      <path d="M3.6 15V9.6a3 3 0 0 1 3-3h6.2l3.6 3.8h2a2 2 0 0 1 2 2V15h-2.6" />
      <path d="M9.4 15h5.2M6.8 6.6V15" opacity={0.6} />
      <circle cx="7 " cy="16.8" r="2" />
      <circle cx="16.8" cy="16.8" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  family: (
    <>
      <circle cx="7" cy="7.4" r="2.6" />
      <circle cx="17" cy="7.4" r="2.6" />
      <circle cx="12" cy="11.4" r="2" opacity={0.8} />
      <path d="M2.8 18.8a4.2 4.2 0 0 1 6.6-3.4M21.2 18.8a4.2 4.2 0 0 0-6.6-3.4M8.6 20.4a3.4 3.4 0 0 1 6.8 0" />
    </>
  ),
  heart: (
    <>
      <path d="M12 19.8s-7.2-4.4-9-8.8c-1-2.6.6-5.4 3.3-6 2-.4 4.2.4 5.7 2.7 1.5-2.3 3.7-3.1 5.7-2.7 2.7.6 4.3 3.4 3.3 6-1.8 4.4-9 8.8-9 8.8z" />
    </>
  ),
  bag: (
    <>
      <path d="M6.2 8h11.6l1 11a1.6 1.6 0 0 1-1.6 1.8H6.8A1.6 1.6 0 0 1 5.2 19l1-11z" />
      <path d="M9 10.4V7a3 3 0 0 1 6 0v3.4" />
    </>
  ),
  chili: (
    <>
      <path d="M16.6 5.4c.4-1.2 1.4-2 2.8-2" opacity={0.8} />
      <path d="M16.6 5.4c1.6 4.4-2.2 11.6-8.8 13.8-2 .7-4-1.2-3.3-3.2C6.4 10.6 11 5.6 16.6 5.4z" />
    </>
  ),
  sunrise: (
    <>
      <path d="M3 18.4h18" />
      <path d="M7.4 18.4a4.6 4.6 0 0 1 9.2 0" />
      <path d="M12 9.8V6.6M5.6 12.8 4 11.2M18.4 12.8l1.6-1.6" opacity={0.8} />
    </>
  ),
  weather: (
    <>
      <path d="M17.3 14.6a3.4 3.4 0 0 0 0-6.8 5.4 5.4 0 0 0-10.5 1.5A3.9 3.9 0 0 0 7.6 14.6h9.7z" />
      <path d="M9 17.4v2.2M13 17.4v2.2M17 17.4v2.2" opacity={0.8} />
    </>
  ),
  health: (
    <>
      <path d="M6 3.8v5a4.4 4.4 0 0 0 8.8 0v-5" />
      <path d="M10.4 13.2v2.6a4.4 4.4 0 0 0 8.8 0v-1" />
      <circle cx="19.2" cy="12.2" r="2.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.6" y="5" width="16.8" height="15" rx="2" />
      <path d="M3.6 10h16.8M8.2 3v4M15.8 3v4" />
      <path d="M8 14h.01M12 14h.01M16 14h.01" opacity={0.8} />
    </>
  ),
  chat: (
    <>
      <path d="M20.8 11.4c0 3.9-3.9 7-8.8 7-1 0-2-.1-2.9-.4L4 20l1.3-3.5a6.5 6.5 0 0 1-2.1-4.7c0-3.9 3.9-7.4 8.8-7.4s8.8 3.1 8.8 7z" />
      <path d="M8.4 11.4h.01M12 11.4h.01M15.6 11.4h.01" opacity={0.8} />
    </>
  ),
  flame: (
    <>
      <path d="M12 3.4c.5 3-1.7 4.7-3.3 6.5a6.7 6.7 0 1 0 10 .5C16.6 7.6 13.4 6.6 12 3.4z" />
      <path d="M12 20.4c-1.9 0-3.2-1.4-3.2-3.1 0-1.8 1.5-2.6 3.2-4.4 1.7 1.8 3.2 2.6 3.2 4.4 0 1.7-1.3 3.1-3.2 3.1z" opacity={0.6} />
    </>
  ),
  bolt: (
    <>
      <path d="M13.2 3.2 5.8 13.3h4.4L10.8 20.8l7.4-10.1h-4.4l-.6-7.5z" />
    </>
  ),
  gem: (
    <>
      <path d="M7.2 4.4h9.6L20.6 9 12 19.8 3.4 9l3.8-4.6z" />
      <path d="M3.4 9h17.2M12 19.8 8.8 9l3.2-4.6L15.2 9 12 19.8" opacity={0.55} />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="m8.3 12.3 2.6 2.7 4.8-5.6" opacity={0.9} />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 4.2 12.7 9.3 17.8 11l-5.1 1.7L11 17.8l-1.7-5.1L4.2 11l5.1-1.7z" />
      <path d="M18.4 15.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" opacity={0.65} />
    </>
  ),
  sound: (
    <>
      <path d="M4 9.6h3l4.6-3.8v12.4L7 14.4H4z" />
      <path d="M15.2 9.6a3.6 3.6 0 0 1 0 4.8M17.8 7.2a7 7 0 0 1 0 9.6" opacity={0.65} />
    </>
  ),
  letters: (
    <>
      <path d="M3.4 17 7.5 6.6h.6L12.2 17M4.9 13.4h6" />
      <circle cx="17.2" cy="14" r="2.9" opacity={0.7} />
      <path d="M20.1 11.1V17" opacity={0.7} />
    </>
  ),
  trash: (
    <>
      <path d="M4.8 7h14.4M9.8 7V5.2A1.7 1.7 0 0 1 11.5 3.5h1a1.7 1.7 0 0 1 1.7 1.7V7" />
      <path d="M6.4 7l.8 11.8a1.9 1.9 0 0 0 1.9 1.7h5.8a1.9 1.9 0 0 0 1.9-1.7L17.6 7" />
      <path d="M10 10.6v6M14 10.6v6" opacity={0.6} />
    </>
  ),
}

/** Unit emoji (content data) → bespoke glyph. Falls back to the emoji. */
const UNIT_GLYPHS: Record<string, IconName> = {
  '🙏': 'wai',
  '🧑‍🤝‍🧑': 'people',
  '👆': 'point',
  '🍚': 'rice',
  '💸': 'baht',
  '🍜': 'noodles',
  '🗺️': 'map',
  '🛺': 'tuktuk',
  '🕐': 'clock',
  '👨‍👩‍👧': 'family',
  '💗': 'heart',
  '🎧': 'headphones',
  '🛍️': 'bag',
  '🌶️': 'chili',
  '🌅': 'sunrise',
  '🌦️': 'weather',
  '🩺': 'health',
  '📅': 'calendar',
  '💬': 'chat',
  '📖': 'book',
}

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
  style?: CSSProperties
}

export function Icon({ name, size = 24, strokeWidth = 2, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  )
}

/** Bespoke glyph for a unit's emoji identity (banner / sticky header tiles). */
export function UnitIcon({ emoji, size = 28, style }: { emoji: string; size?: number; style?: CSSProperties }) {
  const name = UNIT_GLYPHS[emoji]
  if (!name) return <span style={{ fontSize: size * 0.9, ...style }}>{emoji}</span>
  return <Icon name={name} size={size} strokeWidth={2} style={style} />
}
