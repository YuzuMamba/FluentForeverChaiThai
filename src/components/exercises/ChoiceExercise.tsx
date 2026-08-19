/**
 * All multiple-choice exercise forms: word recognition (thai→en, en→thai,
 * audio→meaning), letter drills, syllable reading, sentence comprehension,
 * and minimal-pair tone picking.
 */
import { useEffect, useMemo, useState } from 'react'
import type { RendererProps } from './api'
import type { Exercise } from '@/engine/exercises'
import AudioButton from '../AudioButton'
import ChunkyButton from '../ChunkyButton'
import ToneBadge from '../ToneBadge'
import { useProgress } from '@/state/progress'
import { registry, sentenceThai, sentenceRoman, toneMarked, TONE_INFO } from '@/content'

type ChoiceEx = Extract<
  Exercise,
  { kind: 'choice-thai-en' | 'choice-en-thai' | 'choice-audio' | 'char-sound' | 'sound-char' | 'read-syllable' | 'comprehend' | 'tone-pick' }
>

interface Option {
  key: string
  /** Main label */
  label: string
  sub?: string
  thaiFont?: boolean
  big?: boolean
  correct: boolean
  speakThai?: string
}

function buildPrompt(ex: ChoiceEx, romanization: string): {
  instruction: string
  promptMain?: string
  promptSub?: string
  promptThai?: boolean
  audio?: string
  audioAuto?: boolean
  emoji?: string
  options: Option[]
} {
  switch (ex.kind) {
    case 'choice-thai-en':
      return {
        instruction: 'What does this mean?',
        promptMain: ex.word.thai,
        promptSub: romanization !== 'hidden' ? ex.word.roman : undefined,
        promptThai: true,
        audio: ex.word.thai,
        audioAuto: true,
        options: ex.options.map((o) => ({
          key: o.id, label: o.en, sub: undefined, correct: o.id === ex.word.id,
        })),
      }
    case 'choice-en-thai':
      return {
        instruction: 'Which one is…',
        promptMain: ex.word.en,
        emoji: ex.word.emoji,
        options: ex.options.map((o) => ({
          key: o.id, label: o.thai, sub: romanization !== 'hidden' ? o.roman : undefined,
          thaiFont: true, correct: o.id === ex.word.id, speakThai: o.thai,
        })),
      }
    case 'choice-audio':
      return {
        instruction: 'What do you hear?',
        audio: ex.word.thai,
        audioAuto: true,
        options: ex.options.map((o) => ({
          key: o.id, label: o.en, sub: romanization !== 'hidden' ? o.roman : undefined,
          correct: o.id === ex.word.id,
        })),
      }
    case 'char-sound':
      return {
        instruction: 'What sound does this letter make?',
        promptMain: ex.consonant.char,
        promptThai: true,
        audio: ex.consonant.char,
        options: ex.options.map((o) => ({
          key: o.char, label: o.initial || '—', sub: `like in “${o.meaning}”`, correct: o.char === ex.consonant.char,
        })),
      }
    case 'sound-char':
      return {
        instruction: `Which letter is “${ex.consonant.name}” (${ex.consonant.meaning} ${ex.consonant.emoji})?`,
        audio: ex.consonant.char,
        audioAuto: true,
        options: ex.options.map((o) => ({
          key: o.char, label: o.char, thaiFont: true, big: true, correct: o.char === ex.consonant.char,
        })),
      }
    case 'read-syllable':
      return {
        instruction: 'Read it. How does it sound?',
        promptMain: ex.drill.thai,
        promptThai: true,
        options: ex.options.map((r) => ({
          key: r, label: toneMarked(r, ex.drill.tone), correct: r === ex.drill.roman,
        })),
      }
    case 'comprehend': {
      const s = ex.sentence
      return {
        instruction: ex.audioOnly ? 'Listen. What does it mean?' : 'What does it mean?',
        promptMain: ex.audioOnly ? undefined : sentenceThai(s, registry.words),
        promptSub: !ex.audioOnly && romanization !== 'hidden' ? sentenceRoman(s, registry.words) : undefined,
        promptThai: true,
        audio: sentenceThai(s, registry.words),
        audioAuto: true,
        options: ex.options.map((en) => ({ key: en, label: en, correct: en === s.en })),
      }
    }
    case 'tone-pick': {
      const target = ex.play === 'a' ? ex.pair.a : ex.pair.b
      const opts = [ex.pair.a, ex.pair.b]
      return {
        instruction: 'Tune your ear. Which one do you hear?',
        audio: target.thai,
        audioAuto: true,
        options: opts.map((o, i) => ({
          key: `${i}`, label: o.thai, sub: `${o.roman} · ${o.en} ${o.emoji}`,
          thaiFont: true, big: true,
          correct: (ex.play === 'a' ? 0 : 1) === i,
        })),
      }
    }
  }
}

export default function ChoiceExercise({ exercise, api, exerciseKey }: RendererProps) {
  const ex = exercise as ChoiceEx
  const romanization = useProgress((s) => s.settings.romanization)
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setSelected(null)
    setSubmitted(false)
  }, [exerciseKey])

  const model = useMemo(() => buildPrompt(ex, romanization), [ex, romanization])

  const check = () => {
    if (selected == null || submitted) return
    setSubmitted(true)
    const opt = model.options.find((o) => o.key === selected)
    const correctOpt = model.options.find((o) => o.correct)!
    const answerShown =
      ex.kind === 'tone-pick'
        ? { thai: correctOpt.label, en: correctOpt.sub }
        : 'word' in ex
          ? { thai: (ex as any).word.thai, roman: (ex as any).word.roman, en: (ex as any).word.en }
          : ex.kind === 'comprehend'
            ? { thai: sentenceThai(ex.sentence, registry.words), en: ex.sentence.en }
            : { thai: correctOpt.label, en: correctOpt.sub }
    const detail =
      ex.kind === 'tone-pick'
        ? `${ex.pair.a.thai} (${TONE_INFO[ex.pair.a.tone].label.toLowerCase()}) = ${ex.pair.a.en} · ${ex.pair.b.thai} (${TONE_INFO[ex.pair.b.tone].label.toLowerCase()}) = ${ex.pair.b.en}`
        : undefined
    api.submit(Boolean(opt?.correct), { answerShown: opt?.correct ? undefined : answerShown, detail })
  }

  // Keyboard shortcuts 1-4 + Enter
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (submitted) return
      const n = Number(e.key)
      if (n >= 1 && n <= model.options.length) setSelected(model.options[n - 1].key)
      if (e.key === 'Enter' && selected != null) check()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, selected, submitted])

  const gridCols = model.options.some((o) => o.big) ? 'repeat(auto-fit, minmax(130px, 1fr))' : '1fr'

  return (
    <div className="anim-slide-up" key={exerciseKey}>
      <h2 style={{ fontSize: 24, margin: '10px 0 20px' }}>{model.instruction}</h2>

      {(model.promptMain || model.audio) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 26, flexWrap: 'wrap' }}>
          {model.audio && (
            <div style={{ display: 'flex', gap: 8 }}>
              <AudioButton thai={model.audio} autoPlay={model.audioAuto} />
              <AudioButton thai={model.audio} slow small />
            </div>
          )}
          {model.emoji && <span style={{ fontSize: 46 }}>{model.emoji}</span>}
          {model.promptMain && (
            <div>
              <div
                className={model.promptThai ? 'thai' : ''}
                style={{ fontSize: model.promptThai ? 38 : 30, fontWeight: 700, lineHeight: 1.35 }}
              >
                {model.promptMain}
              </div>
              {model.promptSub && <div style={{ color: 'var(--text-2)', fontSize: 16 }}>{model.promptSub}</div>}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: gridCols, maxWidth: 620 }}>
        {model.options.map((o, i) => {
          const state = submitted
            ? o.correct ? 'correct' : o.key === selected ? 'wrong' : 'dimmed'
            : o.key === selected ? 'selected' : ''
          return (
            <button
              key={o.key}
              className={`choice ${state}`}
              style={o.big ? { justifyContent: 'center', textAlign: 'center' } : undefined}
              onClick={() => {
                if (submitted) return
                setSelected(o.key)
                if (o.speakThai) import('@/audio/tts').then(({ tts }) => tts.speak(o.speakThai!))
              }}
            >
              {!o.big && <span className="choice-key">{i + 1}</span>}
              <span style={{ flex: o.big ? undefined : 1 }}>
                <span
                  className={o.thaiFont ? 'thai' : ''}
                  style={{ fontSize: o.big ? 34 : o.thaiFont ? 21 : 17, fontWeight: 700, display: 'block' }}
                >
                  {o.label}
                </span>
                {o.sub && <span style={{ color: 'var(--text-2)', fontSize: 13.5 }}>{o.sub}</span>}
              </span>
            </button>
          )
        })}
      </div>

      {ex.kind === 'read-syllable' && (
        <div style={{ marginTop: 18 }}>
          <ToneBadge tone={ex.drill.tone} />
          <span style={{ color: 'var(--text-3)', fontSize: 13.5, marginLeft: 10 }}>
            The tone is shown — say it out loud, then pick the reading.
          </span>
        </div>
      )}

      {!submitted && (
        <div style={{ marginTop: 30 }}>
          <ChunkyButton variant="jade" size="lg" disabled={selected == null} onClick={check} data-testid="check">
            Check
          </ChunkyButton>
        </div>
      )}
    </div>
  )
}
