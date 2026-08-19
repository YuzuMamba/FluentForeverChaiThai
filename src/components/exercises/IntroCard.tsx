/**
 * Intro cards: new word (image-first, Fluent Forever style), new pattern
 * (the "why it works" explanation), new Thai letter.
 */
import type { RendererProps } from './api'
import AudioButton from '../AudioButton'
import ChunkyButton from '../ChunkyButton'
import ToneBadge from '../ToneBadge'
import { useProgress } from '@/state/progress'
import { registry, sentenceThai, sentenceRoman } from '@/content'

export default function IntroCard({ exercise, api }: RendererProps) {
  const romanization = useProgress((s) => s.settings.romanization)

  if (exercise.kind === 'intro-word') {
    const w = exercise.word
    return (
      <div className="anim-pop" style={{ textAlign: 'center', paddingTop: 12 }}>
        <div style={{
          fontSize: 13, fontWeight: 800, letterSpacing: '0.14em', color: 'var(--jade)',
          textTransform: 'uppercase', marginBottom: 18,
        }}>
          ✨ New word
        </div>
        <div className="card" style={{ padding: '38px 30px 30px', maxWidth: 460, margin: '0 auto' }}>
          <div style={{ fontSize: 84, lineHeight: 1, marginBottom: 14, animation: 'float-y 3s ease-in-out infinite' }}>
            {w.emoji}
          </div>
          <div className="thai" style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.3 }}>{w.thai}</div>
          {romanization !== 'hidden' && (
            <div style={{ fontSize: 20, color: 'var(--text-1)', fontWeight: 600, marginTop: 2 }}>{w.roman}</div>
          )}
          <div style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 800, marginTop: 10 }}>{w.en}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
            {w.syllables.map((syl, i) => (
              <span key={i} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span className="thai" style={{ fontSize: 15, color: 'var(--text-2)' }}>{syl.thai}</span>
                <ToneBadge tone={syl.tone} compact />
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
            <AudioButton thai={w.thai} autoPlay />
            <AudioButton thai={w.thai} slow small />
          </div>
          {w.note && (
            <p style={{
              marginTop: 20, padding: '12px 16px', borderRadius: 'var(--r-md)',
              background: 'rgba(76, 201, 255, 0.08)', border: '1px solid rgba(76, 201, 255, 0.2)',
              color: 'var(--text-1)', fontSize: 14.5, textAlign: 'left', lineHeight: 1.55,
            }}>
              💡 {w.note}
            </p>
          )}
        </div>
        <ChunkyButton variant="jade" size="lg" style={{ marginTop: 26 }} onClick={api.continueIntro} data-testid="continue">
          Got it
        </ChunkyButton>
      </div>
    )
  }

  if (exercise.kind === 'intro-pattern') {
    const p = exercise.pattern
    const examples = p.exampleIds
      .map((id) => registry.sentences.get(id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .slice(0, 2)
    return (
      <div className="anim-pop" style={{ paddingTop: 12 }}>
        <div style={{
          fontSize: 13, fontWeight: 800, letterSpacing: '0.14em', color: 'var(--orchid)',
          textTransform: 'uppercase', marginBottom: 18, textAlign: 'center',
        }}>
          🧩 New pattern — a sentence machine
        </div>
        <div className="card" style={{ padding: 30, maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 26, textAlign: 'center', color: 'var(--gold)' }}>{p.name}</h2>
          <div style={{
            textAlign: 'center', margin: '10px 0 18px', color: 'var(--text-2)',
            fontWeight: 700, letterSpacing: '0.04em', fontSize: 15,
          }}>
            {p.literal}
          </div>
          <p style={{ color: 'var(--text-1)', lineHeight: 1.65, fontSize: 15.5 }}>{p.explanation}</p>
          {examples.length > 0 && (
            <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
              {examples.map((s) => (
                <div key={s.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  borderRadius: 'var(--r-md)', background: 'rgba(22, 33, 62, 0.55)',
                  border: '1px solid var(--stroke)',
                }}>
                  <AudioButton thai={sentenceThai(s, registry.words)} small />
                  <div>
                    <div className="thai" style={{ fontSize: 19, fontWeight: 600 }}>{sentenceThai(s, registry.words)}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                      {romanization !== 'hidden' && <>{sentenceRoman(s, registry.words)} · </>}{s.en}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <ChunkyButton variant="jade" size="lg" style={{ marginTop: 26 }} onClick={api.continueIntro} data-testid="continue">
            Let's use it
          </ChunkyButton>
        </div>
      </div>
    )
  }

  if (exercise.kind !== 'intro-char') return null
  const c = exercise.consonant
  const classColor = c.class === 'mid' ? 'var(--sky)' : c.class === 'high' ? 'var(--orchid)' : 'var(--jade)'
  return (
    <div className="anim-pop" style={{ textAlign: 'center', paddingTop: 12 }}>
      <div style={{
        fontSize: 13, fontWeight: 800, letterSpacing: '0.14em', color: 'var(--sky)',
        textTransform: 'uppercase', marginBottom: 18,
      }}>
        ✍️ New letter
      </div>
      <div className="card" style={{ padding: '36px 30px 30px', maxWidth: 440, margin: '0 auto' }}>
        <div className="thai" style={{ fontSize: 110, lineHeight: 1.15, fontWeight: 500, color: 'var(--text-0)' }}>
          {c.char}
        </div>
        <div style={{ fontSize: 21, fontWeight: 700, marginTop: 6 }}>
          {c.name} <span style={{ fontSize: 30, marginLeft: 6 }}>{c.emoji}</span>
        </div>
        <div style={{ color: 'var(--text-2)', marginTop: 2, fontSize: 15 }}>
          “{c.meaning}” — sounds like <b style={{ color: 'var(--gold)' }}>{c.initial || '(silent)'}</b>
          {c.final && <> · ends syllables as <b style={{ color: 'var(--gold)' }}>{c.final}</b></>}
        </div>
        <div style={{ marginTop: 14 }}>
          <span className="tone-badge" style={{ color: classColor }}>
            {c.class.toUpperCase()} CLASS
          </span>
        </div>
        <div style={{ marginTop: 18 }}>
          <AudioButton thai={c.char} autoPlay />
        </div>
      </div>
      <ChunkyButton variant="jade" size="lg" style={{ marginTop: 26 }} onClick={api.continueIntro} data-testid="continue">
        Got it
      </ChunkyButton>
    </div>
  )
}
