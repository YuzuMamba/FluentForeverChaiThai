import { TONE_INFO, type Tone } from '@/content/schema'

/** Small colored badge showing a tone's name + contour arrow. */
export default function ToneBadge({ tone, compact }: { tone: Tone; compact?: boolean }) {
  const info = TONE_INFO[tone]
  return (
    <span className="tone-badge" style={{ color: info.color }}>
      <span style={{ fontSize: 14 }}>{info.contour}</span>
      {!compact && info.label}
    </span>
  )
}
