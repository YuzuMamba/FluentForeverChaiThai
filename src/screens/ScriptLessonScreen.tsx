/**
 * ScriptLessonScreen — the pre-lesson tutorial splash for one script lesson
 * (new letters, tone-rule table, intro) and the exercise session it launches.
 */
import { useEffect, useMemo, useState } from 'react'
import { registry } from '@/content'
import { toneMarked, TONE_INFO } from '@/content/schema'
import { generateScriptLesson } from '@/engine/lessons'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import SessionRunner from '@/components/SessionRunner'
import ChunkyButton from '@/components/ChunkyButton'
import Mascot from '@/components/Mascot'
import ToneBadge from '@/components/ToneBadge'
import WorldBackdrop from '@/three/WorldBackdrop'
import { alpha } from '@/components/path/color'
import { KIND_META, classColor } from '@/components/script/kind'
import '@/components/script/script.css'

/** A newChars entry resolved against the alphabet (consonant char or vowel id). */
interface LetterInfo {
  key: string
  glyph: string
  name: string
  sound: string
  color: string
}

function resolveLetters(chars: string[]): LetterInfo[] {
  return chars.map((ch) => {
    const con = registry.consonants.find((c) => c.char === ch)
    if (con) {
      return {
        key: ch,
        glyph: con.char,
        name: `${con.name} · ${con.meaning} ${con.emoji}`,
        sound: con.initial ? `sounds like ${con.initial}` : 'silent starter',
        color: classColor(con.class),
      }
    }
    const vow = registry.vowels.find((v) => v.id === ch)
    if (vow) {
      return {
        key: ch,
        glyph: vow.display,
        name: `${vow.roman} · ${vow.length} vowel`,
        sound: `sits ${vow.position}`,
        color: '#b48cff',
      }
    }
    return { key: ch, glyph: ch, name: 'new letter', sound: '', color: '#8494b8' }
  })
}

export default function ScriptLessonScreen({ lessonId }: { lessonId: string }) {
  const go = useRouter((s) => s.go)
  const ensureCards = useProgress((s) => s.ensureCards)
  const [running, setRunning] = useState(false)

  const lesson = useMemo(
    () => registry.scriptLessons.find((l) => l.id === lessonId) ?? null,
    [lessonId],
  )

  useEffect(() => {
    if (!lesson) return
    // SRS cards for every consonant this lesson introduces.
    const chars = lesson.newChars.filter((ch) => registry.consonants.some((c) => c.char === ch))
    if (chars.length) {
      ensureCards(chars.map((ch) => ({ id: ch, type: 'char' as const, deckId: lesson.id })))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson])

  if (!lesson) {
    return (
      <div className="screen" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <WorldBackdrop variant="deep" />
        <div className="card anim-pop" style={{ position: 'relative', zIndex: 1, padding: 36, textAlign: 'center', maxWidth: 420, margin: 16 }}>
          <Mascot mood="think" size={120} />
          <h2 style={{ margin: '12px 0 8px' }}>This page hasn't been written yet</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: 22 }}>
            The lesson you're looking for isn't in the course scroll. Head back and pick
            another stone on the trail.
          </p>
          <ChunkyButton variant="sky" onClick={() => go({ name: 'script' })}>Back to script</ChunkyButton>
        </div>
      </div>
    )
  }

  if (running) {
    return (
      <SessionRunner
        meta={{ type: 'script', scriptLessonId: lesson.id, title: lesson.title }}
        exercises={generateScriptLesson(registry, lesson, Date.now() % 1000000)}
        onExit={() => go({ name: 'script' })}
      />
    )
  }

  const meta = KIND_META[lesson.kind]
  const letters = resolveLetters(lesson.newChars)
  const orderLabel = `Lesson ${lesson.order} · ${meta.label}`
  const spStyle: React.CSSProperties & Record<string, string> = { '--sp-color': meta.color }

  return (
    <div className="screen">
      <WorldBackdrop variant="deep" />
      <div className="splash-wrap">
        {/* ── Top bar ── */}
        <div className="splash-topbar anim-slide-up">
          <button className="splash-back" onClick={() => go({ name: 'script' })} aria-label="Back to the script course">
            ←
          </button>
          <span className="crumb">Read Thai</span>
          <span className="kind-chip" style={{ color: meta.color, marginLeft: 'auto' }}>
            <span className="dot" aria-hidden />
            {meta.label}
          </span>
        </div>

        {/* ── Tutorial card ── */}
        <div className="splash-card anim-pop" style={spStyle}>
          <div className="splash-glowbar" aria-hidden />
          <div className="splash-body">
            <div className="splash-head">
              <span className="splash-emoji" aria-hidden>{lesson.emoji}</span>
              <h1>{lesson.title}</h1>
              <div className="splash-sub">{lesson.subtitle}</div>
              <div className="splash-meta">
                <span className="splash-stat">🏷️ {orderLabel}</span>
                {letters.length > 0 && (
                  <span className="splash-stat">✍️ {letters.length} new letter{letters.length === 1 ? '' : 's'}</span>
                )}
                {lesson.readingDrills.length > 0 && (
                  <span className="splash-stat">📖 {Math.min(lesson.readingDrills.length, 8)} reading drills</span>
                )}
              </div>
            </div>

            {lesson.intro && (
              <div className="splash-intro">
                <span className="lightbulb" aria-hidden>💡</span>
                {lesson.intro}
              </div>
            )}

            {letters.length > 0 && (
              <>
                <div className="splash-section">Meet your new letters</div>
                <div className="splash-letters">
                  {letters.map((l, i) => {
                    const style: React.CSSProperties & Record<string, string> = {
                      '--sl-border': alpha(l.color, 0.55),
                      animationDelay: `${140 + i * 80}ms`,
                    }
                    return (
                      <div key={l.key} className="splash-letter" style={style}>
                        <div className="slchar thai">{l.glyph}</div>
                        <div className="slname">{l.name}</div>
                        {l.sound && <div className="slsound">{l.sound}</div>}
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {lesson.toneRules && lesson.toneRules.length > 0 && (
              <>
                <div className="splash-section">Tone rules in this lesson</div>
                <div className="tone-table">
                  <div className="trow thead" aria-hidden>
                    <span>When you see…</span>
                    <span>Tone</span>
                    <span className="tex">Example</span>
                  </div>
                  {lesson.toneRules.map((rule, i) => (
                    <div key={i} className="trow">
                      <span className="tcond">{rule.condition}</span>
                      <ToneBadge tone={rule.tone} />
                      <span className="tex">
                        <div className="xt thai">{rule.example.thai}</div>
                        <div className="xr">
                          {toneMarked(rule.example.roman, rule.tone)} · {rule.example.en}
                        </div>
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--text-3)', textAlign: 'center' }}>
                  Contours: {(['mid', 'low', 'falling', 'high', 'rising'] as const)
                    .map((t) => `${TONE_INFO[t].contour} ${TONE_INFO[t].label.toLowerCase()}`)
                    .join(' · ')}
                </div>
              </>
            )}

            <div className="splash-cta">
              <ChunkyButton variant="gold" size="lg" onClick={() => setRunning(true)}>
                🏮 Start lesson
              </ChunkyButton>
              <div className="cta-hint">Miss one? It comes back until you nail it.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
