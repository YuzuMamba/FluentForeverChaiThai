/**
 * Typing production: type the romanization for a Thai word you see & hear.
 * Tone-mark-tolerant matching (accepts answers without diacritics).
 */
import { useEffect, useRef, useState } from 'react'
import type { RendererProps } from './api'
import type { Exercise } from '@/engine/exercises'
import AudioButton from '../AudioButton'
import ChunkyButton from '../ChunkyButton'
import { useProgress } from '@/state/progress'
import { sfx } from '@/audio/sfx'

type TypeEx = Extract<Exercise, { kind: 'type-roman' }>

/** Strip tone diacritics + normalize special vowels for forgiving comparison. */
export function normalizeRoman(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ɛ/g, 'ae')
    .replace(/ɔ/g, 'o')
    .replace(/ə/g, 'oe')
    .replace(/ɯ/g, 'ue')
    .replace(/[-\s.']/g, '')
}

export default function TypeExercise({ exercise, api, exerciseKey }: RendererProps) {
  const ex = exercise as TypeEx
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const sound = useProgress((s) => s.settings.sound)

  useEffect(() => {
    setValue('')
    setSubmitted(false)
    const t = setTimeout(() => inputRef.current?.focus(), 350)
    return () => clearTimeout(t)
  }, [exerciseKey])

  const check = () => {
    if (submitted || !value.trim()) return
    setSubmitted(true)
    const accepted = [ex.word.roman, ...(ex.word.enAlt ?? [])].map(normalizeRoman)
    const correct = accepted.includes(normalizeRoman(value))
    api.submit(correct, {
      answerShown: correct ? undefined : { thai: ex.word.thai, roman: ex.word.roman, en: ex.word.en },
    })
  }

  return (
    <div className="anim-slide-up" key={exerciseKey}>
      <h2 style={{ fontSize: 24, margin: '10px 0 20px' }}>Type what it sounds like</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <AudioButton thai={ex.word.thai} autoPlay />
          <AudioButton thai={ex.word.thai} slow small />
        </div>
        <div>
          <div className="thai" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.35 }}>{ex.word.thai}</div>
          <div style={{ color: 'var(--text-2)', fontSize: 15 }}>{ex.word.emoji} {ex.word.en}</div>
        </div>
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (sound) sfx.play('type')
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') check()
        }}
        disabled={submitted}
        placeholder="Type the romanization… (tones optional)"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        style={{
          width: '100%',
          maxWidth: 480,
          marginTop: 16,
          padding: '16px 20px',
          fontSize: 20,
          fontWeight: 600,
          borderRadius: 'var(--r-md)',
          border: '2px solid var(--stroke-strong)',
          background: 'var(--surface-solid)',
          color: 'var(--text-0)',
          outline: 'none',
        }}
      />
      <div style={{ color: 'var(--text-3)', fontSize: 13.5, marginTop: 10 }}>
        Hint: “{ex.word.roman.slice(0, 1)}…” — tone marks not required.
      </div>
      {!submitted && (
        <div style={{ marginTop: 26 }}>
          <ChunkyButton variant="jade" size="lg" disabled={!value.trim()} onClick={check} data-testid="check">
            Check
          </ChunkyButton>
        </div>
      )}
    </div>
  )
}
