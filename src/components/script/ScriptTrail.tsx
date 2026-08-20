/**
 * The script course trail: a wrapping run of chunky stepping-stone nodes,
 * one per script lesson. Locked until the previous lesson is complete;
 * completed stones carry a jade check; the current stone pulses gold.
 * While the course content is still being authored, a ghost trail of unlit
 * lanterns keeps the path visible.
 */
import { useEffect, useRef, useState } from 'react'
import type { ScriptLesson } from '@/content/schema'
import { sfx } from '@/audio/sfx'
import { useProgress } from '@/state/progress'
import { alpha, shade } from '@/components/path/color'
import Mascot from '@/components/Mascot'
import { KIND_META } from './kind'

export type TrailState = 'done' | 'current' | 'open' | 'locked'

interface NodeProps {
  lesson: ScriptLesson
  index: number
  state: TrailState
  onOpen: (lessonId: string) => void
}

function TrailNode({ lesson, index, state, onOpen }: NodeProps) {
  const sound = useProgress((s) => s.settings.sound)
  const meta = KIND_META[lesson.kind]
  const locked = state === 'locked'
  const [shaking, setShaking] = useState(false)
  const [tip, setTip] = useState(false)
  const tipTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(tipTimer.current), [])

  const nodeStyle: React.CSSProperties & Record<string, string> = locked
    ? {}
    : {
        background:
          state === 'current'
            ? `linear-gradient(180deg, ${shade(meta.color, 0.3)}, ${meta.color})`
            : `linear-gradient(180deg, ${shade(meta.color, 0.16)}, ${shade(meta.color, -0.08)})`,
        '--node-edge': shade(meta.color, -0.5),
        '--node-glow': alpha(meta.color, state === 'current' ? 0.5 : 0.28),
      }

  function handleClick() {
    if (locked) {
      if (sound) sfx.play('deselect')
      setShaking(false)
      requestAnimationFrame(() => setShaking(true))
      setTip(true)
      window.clearTimeout(tipTimer.current)
      tipTimer.current = window.setTimeout(() => setTip(false), 2300)
      return
    }
    if (sound) sfx.play('tap')
    onOpen(lesson.id)
  }

  return (
    <div
      className={`trail-item anim-pop ${locked ? 'locked-item' : ''} ${state === 'done' ? 'seg-done' : ''}`}
      style={{ animationDelay: `${Math.min(index, 10) * 55}ms` }}
    >
      <button
        className={`trail-node ${locked ? 'is-locked' : state === 'done' ? 'is-done' : 'is-open'} ${shaking ? 'anim-shake' : ''}`}
        style={nodeStyle}
        onClick={handleClick}
        onAnimationEnd={() => shaking && setShaking(false)}
        aria-label={`${lesson.title}${locked ? ' (locked)' : state === 'done' ? ' (completed)' : ''}`}
        aria-disabled={locked || undefined}
      >
        {state === 'current' && <span className="trail-ring" aria-hidden />}
        <span className="trail-num" aria-hidden>{index + 1}</span>
        <span className="trail-ico" aria-hidden>{lesson.emoji}</span>
        {state === 'done' && (
          <span className="trail-check" aria-hidden>
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M4.5 12.8l4.8 4.8 10-11.2" fill="none" stroke="#04301f" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
        {locked && <span className="trail-lock" aria-hidden>🔒</span>}
        {state === 'current' && (
          <span className="trail-bubble" aria-hidden>
            <span className="bb">START</span>
          </span>
        )}
        {tip && (
          <span className="trail-tip" role="status">
            <span className="bb">Finish the previous lesson first</span>
          </span>
        )}
      </button>
      <div className="trail-title">{lesson.title}</div>
      <span className="kind-chip" style={{ color: meta.color }}>
        <span className="dot" aria-hidden />
        {meta.label}
      </span>
    </div>
  )
}

/** Unlit-lantern placeholder trail shown while the course is being authored. */
function GhostTrail() {
  return (
    <div className="trail-ghost-zone">
      <div className="script-trail ghost" aria-hidden>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="trail-item ghost-item anim-pop" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="trail-node is-ghost" style={{ animationDelay: `${(i % 3) * 600}ms` }}>
              <span className="trail-ico">🏮</span>
            </div>
            <span className="skel" style={{ width: 70, height: 11 }} />
            <span className="skel" style={{ width: 46, height: 8 }} />
          </div>
        ))}
      </div>
      <div className="card script-empty anim-pop" style={{ animationDelay: '240ms' }}>
        <Mascot mood="think" size={92} />
        <div>
          <div className="t">The scribes are still inking these pages…</div>
          <div className="s">
            The full reading course — every consonant, vowel, and tone rule — is on its
            way. The lanterns light up the moment each lesson lands. Meanwhile, keep
            stacking words on the Lantern Road!
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  lessons: ScriptLesson[]
  completed: string[]
  onOpen: (lessonId: string) => void
}

export default function ScriptTrail({ lessons, completed, onOpen }: Props) {
  if (lessons.length === 0) return <GhostTrail />

  const doneSet = new Set(completed)
  let currentFound = false
  return (
    <div className="script-trail">
      {lessons.map((lesson, i) => {
        const done = doneSet.has(lesson.id)
        const unlocked = i === 0 || doneSet.has(lessons[i - 1].id)
        let state: TrailState = 'locked'
        if (done) state = 'done'
        else if (unlocked && !currentFound) {
          state = 'current'
          currentFound = true
        } else if (unlocked) state = 'open'
        return <TrailNode key={lesson.id} lesson={lesson} index={i} state={state} onOpen={onOpen} />
      })}
    </div>
  )
}
