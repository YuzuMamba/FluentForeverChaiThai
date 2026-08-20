/**
 * Floating mini-header pinned under the HUD while scrolling the path.
 * Shows the current unit's identity and a CONTINUE shortcut to its next lesson.
 */
import type { Unit } from '@/content/schema'
import { LESSONS_PER_UNIT } from '@/engine/lessons'
import ChunkyButton from '@/components/ChunkyButton'
import { alpha, shade } from './color'
import { UnitIcon } from './icons'

interface Props {
  unit: Unit
  progress: number
  onContinue: () => void
}

export default function StickyUnitHeader({ unit, progress, onContinue }: Props) {
  const color = unit.color
  return (
    <div className="path-sticky" style={{ border: `1px solid ${alpha(color, 0.4)}` }}>
      <div
        className="mini-emoji"
        aria-hidden
        style={{ background: `linear-gradient(180deg, ${shade(color, 0.18)}, ${shade(color, -0.22)})`, color: '#fff' }}
      >
        <UnitIcon emoji={unit.emoji} size={22} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="mini-eyebrow" style={{ color: shade(color, 0.4) }}>
          Unit {unit.order} · Lesson {Math.min(progress + 1, LESSONS_PER_UNIT)} of {LESSONS_PER_UNIT}
        </div>
        <div className="mini-title">{unit.title}</div>
      </div>
      <ChunkyButton size="sm" variant="gold" onClick={onContinue}>
        Continue
      </ChunkyButton>
    </div>
  )
}
