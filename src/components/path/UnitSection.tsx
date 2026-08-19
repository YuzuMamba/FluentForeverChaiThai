/**
 * One unit on the journey: a color-tinted banner card followed by five lesson
 * nodes winding down a sine curve, joined by beaded dotted segments. Fully
 * complete units earn a glowing crown cap at the end.
 */
import type { Unit } from '@/content/schema'
import { LESSONS_PER_UNIT } from '@/engine/lessons'
import PathNode, { type NodeState } from './PathNode'
import { alpha, shade } from './color'

export const LESSON_META: Array<{ icon: string; label: string }> = [
  { icon: '📖', label: 'New Words I' },
  { icon: '📖', label: 'New Words II' },
  { icon: '🧩', label: 'Patterns' },
  { icon: '🎧', label: 'Listening' },
  { icon: '🏆', label: 'Produce It' },
]

const SPACING = 104
const TOP_PAD = 98
const BOTTOM_PAD = 80
/** Sine phase step between consecutive nodes (global, so the road flows). */
const PHASE = 0.85

interface Props {
  unit: Unit
  /** 0-based position in the course. */
  index: number
  /** Lessons completed in this unit, clamped to LESSONS_PER_UNIT. */
  progress: number
  unlocked: boolean
  complete: boolean
  onStartLesson: (lessonIndex: number) => void
  /** Attached to the current node's wrapper for auto-scroll centering. */
  currentNodeRef?: (el: HTMLDivElement | null) => void
}

export default function UnitSection({ unit, index, progress, unlocked, complete, onStartLesson, currentNodeRef }: Props) {
  const color = unit.color
  const rows = LESSONS_PER_UNIT + (complete ? 1 : 0)
  const height = TOP_PAD + (rows - 1) * SPACING + BOTTOM_PAD
  const xf = (k: number) => Math.sin((index * LESSONS_PER_UNIT + k) * PHASE)

  const points = Array.from({ length: rows }, (_, k) => ({
    x: xf(k),
    y: TOP_PAD + k * SPACING,
    crown: k === LESSONS_PER_UNIT,
  }))

  const chip = complete
    ? { text: '✓ DONE', color: shade(color, 0.35) }
    : unlocked
      ? { text: `${progress} / ${LESSONS_PER_UNIT}`, color: shade(color, 0.35) }
      : { text: '🔒 LOCKED', color: 'var(--text-3)' }

  return (
    <section aria-label={`Unit ${unit.order}: ${unit.title}`}>
      {/* ── Banner ── */}
      <header
        className={`unit-banner anim-slide-up ${unlocked ? '' : 'locked'}`}
        style={{
          background: `linear-gradient(135deg, ${alpha(color, 0.34)}, rgba(17, 25, 50, 0.8) 62%)`,
          borderColor: alpha(color, 0.35),
        }}
      >
        <div
          className="unit-emoji"
          aria-hidden
          style={{ background: `linear-gradient(180deg, ${shade(color, 0.18)}, ${shade(color, -0.22)})` }}
        >
          {unit.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="unit-eyebrow" style={{ color: shade(color, 0.4) }}>
            Unit {unit.order}
          </div>
          <h2>{unit.title}</h2>
          <div className="unit-sub">{unit.subtitle}</div>
          <div className="unit-outcome">
            <span className="tgt" aria-hidden>🎯</span>
            <span>{unit.outcome}</span>
          </div>
        </div>
        <span className="unit-chip" style={{ color: chip.color }}>{chip.text}</span>
        <div className="unit-strip" aria-hidden>
          <div
            className="fill"
            style={{
              width: `${(Math.min(progress, LESSONS_PER_UNIT) / LESSONS_PER_UNIT) * 100}%`,
              background: `linear-gradient(90deg, ${shade(color, -0.12)}, ${shade(color, 0.2)})`,
            }}
          />
        </div>
      </header>

      {/* ── Winding nodes ── */}
      <div className="path-canvas" style={{ height, ['--amp' as string]: 'min(150px, 26vw)' }}>
        {/* Beaded segments between consecutive stops */}
        {points.slice(0, -1).map((p, k) => {
          const q = points[k + 1]
          const walked = progress > k + (q.crown ? 0 : 1) || (q.crown && complete)
          return [0.22, 0.41, 0.6, 0.79].map((t, bi) => (
            <span
              key={`b${k}-${bi}`}
              className="bead"
              style={{
                left: `calc(50% + ${(p.x + (q.x - p.x) * t).toFixed(3)} * var(--amp))`,
                top: p.y + (q.y - p.y) * t,
                width: bi === 1 || bi === 2 ? 8 : 6,
                height: bi === 1 || bi === 2 ? 8 : 6,
                background: walked ? alpha(color, 0.85) : 'rgba(148, 173, 224, 0.38)',
                boxShadow: walked ? `0 0 9px ${alpha(color, 0.55)}` : 'none',
              }}
            />
          ))
        })}

        {points.map((p, k) =>
          p.crown ? (
            <div
              key="crown"
              className="node-pos"
              style={{ left: `calc(50% + ${p.x.toFixed(3)} * var(--amp))`, top: p.y }}
            >
              <div className="crown-node anim-pop" title={`${unit.title} — unit complete!`} aria-label={`${unit.title} complete`}>
                👑
              </div>
            </div>
          ) : (
            <PathNode
              key={k}
              state={(progress > k ? 'done' : unlocked && progress === k ? 'current' : 'locked') as NodeState}
              icon={LESSON_META[k].icon}
              label={`${unit.title} · Lesson ${k + 1}: ${LESSON_META[k].label}`}
              color={color}
              x={p.x}
              y={p.y}
              delayMs={k * 45}
              onActivate={() => onStartLesson(k)}
              nodeRef={unlocked && progress === k ? currentNodeRef : undefined}
            />
          ),
        )}
      </div>
    </section>
  )
}
