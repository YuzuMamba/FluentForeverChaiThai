/**
 * Word-bank construction: translate (arrange), listening (listen-arrange),
 * and the Sentence Builder (novel generated sentences). The signature
 * tile-tapping interaction.
 */
import { useEffect, useMemo, useState } from 'react'
import type { RendererProps } from './api'
import type { Exercise } from '@/engine/exercises'
import type { Word } from '@/content/schema'
import AudioButton from '../AudioButton'
import ChunkyButton from '../ChunkyButton'
import WordTile from '../WordTile'
import { registry, sentenceThai, sentenceRoman } from '@/content'
import { mulberry32, shuffled } from '@/engine/exercises'
import { tts } from '@/audio/tts'

type ArrangeEx = Extract<Exercise, { kind: 'arrange' | 'listen-arrange' | 'builder' }>

interface BankTile {
  uid: number
  word: Word
}

export default function ArrangeExercise({ exercise, api, exerciseKey }: RendererProps) {
  const ex = exercise as ArrangeEx

  const model = useMemo(() => {
    if (ex.kind === 'builder') {
      const expected = ex.expectedIds
      const bankWords = ex.bankIds
        .map((id) => registry.words.get(id))
        .filter((w): w is Word => Boolean(w))
      return {
        instruction: '🧱 Build a brand-new sentence',
        sub: 'You have never seen this sentence — build it from what you know.',
        prompt: ex.prompt,
        audio: undefined as string | undefined,
        expected,
        bankWords,
        literal: ex.literal,
      }
    }
    const s = ex.sentence
    const thai = sentenceThai(s, registry.words)
    const expected = s.wordIds
    const bankWords = shuffled(
      [
        ...s.wordIds.map((id) => registry.words.get(id)).filter((w): w is Word => Boolean(w)),
        ...ex.distractors,
      ],
      mulberry32(exerciseKey * 31 + thai.length),
    )
    return ex.kind === 'arrange'
      ? {
          instruction: 'Say it in Thai',
          sub: undefined as string | undefined,
          prompt: s.en,
          audio: undefined as string | undefined,
          expected,
          bankWords,
          literal: s.literal,
        }
      : {
          instruction: 'Tap what you hear',
          sub: undefined as string | undefined,
          prompt: undefined as string | undefined,
          audio: thai,
          expected,
          bankWords,
          literal: s.literal,
        }
  }, [ex, exerciseKey])

  const [bank, setBank] = useState<BankTile[]>([])
  const [answer, setAnswer] = useState<BankTile[]>([])
  const [submitted, setSubmitted] = useState<null | boolean>(null)

  useEffect(() => {
    setBank(model.bankWords.map((word, uid) => ({ uid, word })))
    setAnswer([])
    setSubmitted(null)
  }, [exerciseKey, model])

  const pick = (tile: BankTile) => {
    if (submitted !== null) return
    setBank((b) => b.filter((t) => t.uid !== tile.uid))
    setAnswer((a) => [...a, tile])
  }
  const unpick = (tile: BankTile) => {
    if (submitted !== null) return
    setAnswer((a) => a.filter((t) => t.uid !== tile.uid))
    setBank((b) => [...b, tile].sort((x, y) => x.uid - y.uid))
  }

  const check = () => {
    if (submitted !== null || answer.length === 0) return
    const got = answer.map((t) => t.word.id)
    const correct = got.length === model.expected.length && got.every((id, i) => id === model.expected[i])
    setSubmitted(correct)
    const expectedThai = model.expected.map((id) => registry.words.get(id)?.thai ?? '').join('')
    const expectedRoman = model.expected.map((id) => registry.words.get(id)?.roman ?? '').join(' ')
    if (correct) tts.speak(expectedThai)
    api.submit(correct, {
      answerShown: correct ? undefined : { thai: expectedThai, roman: expectedRoman },
      detail: model.literal ? `Literally: ${model.literal}` : undefined,
    })
  }

  return (
    <div className="anim-slide-up" key={exerciseKey}>
      <h2 style={{ fontSize: 24, margin: '10px 0 6px' }}>{model.instruction}</h2>
      {model.sub && <p style={{ color: 'var(--orchid)', fontWeight: 600, fontSize: 14.5, marginBottom: 8 }}>{model.sub}</p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '14px 0 8px', flexWrap: 'wrap' }}>
        {model.audio && (
          <div style={{ display: 'flex', gap: 8 }}>
            <AudioButton thai={model.audio} autoPlay />
            <AudioButton thai={model.audio} slow small />
          </div>
        )}
        {model.prompt && (
          <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4 }}>
            “{model.prompt}”
          </div>
        )}
      </div>

      {/* Answer line */}
      <div
        style={{
          minHeight: 76,
          margin: '18px 0 6px',
          padding: '12px 4px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          borderBottom: '2px solid var(--stroke-strong)',
        }}
        aria-label="Your answer"
      >
        {answer.length === 0 && (
          <span style={{ color: 'var(--text-3)', fontWeight: 600, fontSize: 15 }}>
            Tap the tiles below to build the sentence…
          </span>
        )}
        {answer.map((tile) => (
          <span key={tile.uid} className="anim-pop">
            <WordTile
              word={tile.word}
              state={submitted === null ? 'in-answer' : submitted ? 'correct' : 'wrong'}
              onClick={() => unpick(tile)}
              speakOnClick={false}
            />
          </span>
        ))}
      </div>

      {/* Bank */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22, minHeight: 76 }}>
        {bank.map((tile) => (
          <WordTile key={tile.uid} word={tile.word} onClick={() => pick(tile)} />
        ))}
      </div>

      {submitted === null && (
        <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
          <ChunkyButton variant="jade" size="lg" disabled={answer.length === 0} onClick={check} data-testid="check">
            Check
          </ChunkyButton>
          {answer.length > 0 && (
            <ChunkyButton
              variant="ghost"
              onClick={() => {
                setBank((b) => [...b, ...answer].sort((x, y) => x.uid - y.uid))
                setAnswer([])
              }}
            >
              Clear
            </ChunkyButton>
          )}
        </div>
      )}
    </div>
  )
}
