/**
 * One lesson node on the journey path: a chunky circular 3D button.
 * States: done (unit-color fill + check + glow), current (pulsing gold ring +
 * bouncing START bubble), locked (dark, padlock, shakes when tapped).
 */
import { useEffect, useRef, useState } from 'react'
import { sfx } from '@/audio/sfx'
import { useProgress } from '@/state/progress'
import { alpha, shade } from './color'

export type NodeState = 'done' | 'current' | 'locked'

interface Props {
  state: NodeState
  icon: string
  label: string
  color: string
  /** Sine factor in [-1, 1]; horizontal offset = x * var(--amp). */
  x: number
  /** Center y in px within the canvas. */
  y: number
  delayMs?: number
  onActivate: () => void
  /** Set on the current node so the screen can auto-scroll to it. */
  nodeRef?: (el: HTMLDivElement | null) => void
}

export default function PathNode({ state, icon, label, color, x, y, delayMs = 0, onActivate, nodeRef }: Props) {
  const sound = useProgress((s) => s.settings.sound)
  const [shaking, setShaking] = useState(false)
  const [tip, setTip] = useState(false)
  const tipTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(tipTimer.current), [])

  const locked = state === 'locked'

  const style: React.CSSProperties & Record<string, string> = locked
    ? { animationDelay: `${delayMs}ms` }
    : {
        animationDelay: `${delayMs}ms`,
        background:
          state === 'current'
            ? `linear-gradient(180deg, ${shade(color, 0.28)}, ${color})`
            : `linear-gradient(180deg, ${shade(color, 0.16)}, ${shade(color, -0.1)})`,
        '--node-edge': shade(color, -0.48),
        '--node-glow': alpha(color, state === 'current' ? 0.5 : 0.3),
      }

  function handleClick() {
    if (locked) {
      if (sound) sfx.play('deselect')
      setShaking(false)
      // Restart the shake even on rapid re-taps.
      requestAnimationFrame(() => setShaking(true))
      setTip(true)
      window.clearTimeout(tipTimer.current)
      tipTimer.current = window.setTimeout(() => setTip(false), 2300)
      return
    }
    if (sound) sfx.play('tap')
    onActivate()
  }

  return (
    <div
      className="node-pos"
      style={{ left: `calc(50% + ${x.toFixed(3)} * var(--amp))`, top: y }}
      ref={nodeRef}
    >
      <button
        className={`path-node ${locked ? 'is-locked' : `is-${state}`} ${shaking ? 'anim-shake' : 'anim-pop'}`}
        style={style}
        onClick={handleClick}
        onAnimationEnd={() => shaking && setShaking(false)}
        aria-label={label}
        title={label}
        aria-disabled={locked || undefined}
      >
        {state === 'current' && <span className="node-ring pulse" />}
        {state === 'done' ? (
          <svg className="check" width="32" height="32" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4.6 12.6l4.9 4.9 9.9-11"
              fill="none"
              stroke="#fff"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <span className="node-ico" aria-hidden>{icon}</span>
        )}
        {locked && <span className="lock-badge" aria-hidden>🔒</span>}
        {state === 'current' && (
          <span className="start-bubble" aria-hidden>
            <span className="bb">START</span>
          </span>
        )}
        {tip && (
          <span className="locked-tip" role="status">
            <span className="bb">Complete the previous lesson</span>
          </span>
        )}
      </button>
    </div>
  )
}
