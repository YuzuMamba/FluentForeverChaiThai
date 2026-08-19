/**
 * Match pairs: tap a Thai word and its English meaning to clear them.
 * Session-graded as one exercise (correct if finished with few mistakes).
 */
import { useEffect, useMemo, useState } from 'react'
import type { RendererProps } from './api'
import type { Exercise } from '@/engine/exercises'
import { mulberry32, shuffled } from '@/engine/exercises'
import { useProgress } from '@/state/progress'
import { sfx } from '@/audio/sfx'
import { tts } from '@/audio/tts'

type MatchEx = Extract<Exercise, { kind: 'match-pairs' }>

interface Card {
  id: string
  wordId: string
  label: string
  sub?: string
  thaiFont: boolean
}

export default function MatchPairsExercise({ exercise, api, exerciseKey }: RendererProps) {
  const ex = exercise as MatchEx
  const romanization = useProgress((s) => s.settings.romanization)
  const sound = useProgress((s) => s.settings.sound)

  const cards = useMemo(() => {
    const rnd = mulberry32(exerciseKey * 977 + ex.words.length)
    const thaiCards: Card[] = ex.words.map((w) => ({
      id: `t-${w.id}`, wordId: w.id, label: w.thai,
      sub: romanization !== 'hidden' ? w.roman : undefined, thaiFont: true,
    }))
    const enCards: Card[] = ex.words.map((w) => ({
      id: `e-${w.id}`, wordId: w.id, label: w.en, thaiFont: false,
    }))
    return shuffled([...thaiCards, ...enCards], rnd)
  }, [ex, exerciseKey, romanization])

  const [selected, setSelected] = useState<string | null>(null)
  const [cleared, setCleared] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<Set<string>>(new Set())
  const [mistakes, setMistakes] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setSelected(null)
    setCleared(new Set())
    setWrongFlash(new Set())
    setMistakes(0)
    setDone(false)
  }, [exerciseKey])

  const tap = (card: Card) => {
    if (done || cleared.has(card.wordId)) return
    if (card.thaiFont) tts.speak(card.label)
    if (sound) sfx.play('select')
    if (selected === null) {
      setSelected(card.id)
      return
    }
    if (selected === card.id) {
      setSelected(null)
      return
    }
    const prev = cards.find((c) => c.id === selected)!
    if (prev.wordId === card.wordId && prev.id !== card.id) {
      const next = new Set(cleared)
      next.add(card.wordId)
      setCleared(next)
      setSelected(null)
      if (sound) sfx.play('pop')
      if (next.size === ex.words.length) {
        setDone(true)
        api.submit(mistakes <= 1)
      }
    } else {
      setMistakes((m) => m + 1)
      const flash = new Set([prev.id, card.id])
      setWrongFlash(flash)
      setSelected(null)
      if (sound) sfx.play('wrong')
      setTimeout(() => setWrongFlash(new Set()), 450)
    }
  }

  return (
    <div className="anim-slide-up" key={exerciseKey}>
      <h2 style={{ fontSize: 24, margin: '10px 0 20px' }}>Match the pairs</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 12,
        maxWidth: 640,
      }}>
        {cards.map((card) => {
          const isCleared = cleared.has(card.wordId)
          const state = isCleared
            ? 'correct'
            : wrongFlash.has(card.id) ? 'wrong'
              : selected === card.id ? 'selected' : ''
          return (
            <button
              key={card.id}
              className={`choice ${state}`}
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                opacity: isCleared ? 0.35 : 1,
                pointerEvents: isCleared ? 'none' : undefined,
                transition: 'opacity 400ms var(--ease-out), transform var(--dur-fast) var(--ease-spring)',
                padding: '14px 10px',
              }}
              onClick={() => tap(card)}
            >
              <span>
                <span className={card.thaiFont ? 'thai' : ''} style={{ fontSize: card.thaiFont ? 21 : 16, fontWeight: 700, display: 'block' }}>
                  {card.label}
                </span>
                {card.sub && <span style={{ color: 'var(--text-2)', fontSize: 12.5 }}>{card.sub}</span>}
              </span>
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: 16, color: 'var(--text-3)', fontSize: 14, fontWeight: 600 }}>
        {cleared.size}/{ex.words.length} matched{mistakes > 0 && ` · ${mistakes} slip${mistakes > 1 ? 's' : ''}`}
      </div>
    </div>
  )
}
