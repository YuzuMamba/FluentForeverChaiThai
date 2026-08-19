/**
 * ScriptScreen — home of the Thai reading course. A stepping-stone trail of
 * script lessons, the alphabet explorer (consonants & vowels), and a teaser
 * for the tone rules. อ่านได้! — you can read!
 */
import { useMemo } from 'react'
import { registry } from '@/content'
import { TONE_INFO } from '@/content/schema'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import TopHUD from '@/components/TopHUD'
import BottomNav from '@/components/BottomNav'
import ChunkyButton from '@/components/ChunkyButton'
import WorldBackdrop from '@/three/WorldBackdrop'
import ScriptTrail from '@/components/script/ScriptTrail'
import AlphabetExplorer from '@/components/script/AlphabetExplorer'
import ProgressRing from '@/components/script/ProgressRing'
import '@/components/script/script.css'

const TONE_ORDER = ['mid', 'low', 'falling', 'high', 'rising'] as const

export default function ScriptScreen() {
  const go = useRouter((s) => s.go)
  const completed = useProgress((s) => s.completedScriptLessons)

  const lessons = registry.scriptLessons
  const doneCount = useMemo(
    () => lessons.filter((l) => completed.includes(l.id)).length,
    [lessons, completed],
  )

  // Tone teaser → the first tones lesson, if it exists and is reachable.
  const toneLessonIndex = lessons.findIndex((l) => l.kind === 'tones')
  const toneLesson = toneLessonIndex >= 0 ? lessons[toneLessonIndex] : null
  const toneUnlocked =
    toneLessonIndex === 0 ||
    (toneLessonIndex > 0 && completed.includes(lessons[toneLessonIndex - 1].id))

  return (
    <div className="screen">
      <WorldBackdrop variant="deep" />
      <TopHUD />
      <main className="screen-content">
        {/* ── Hero ── */}
        <div className="script-hero anim-slide-up">
          <div>
            <div className="script-eyebrow">
              <span className="thai" style={{ marginRight: 8 }}>ตัวอักษรไทย</span>· The Thai script
            </div>
            <h1>
              <span className="thai thai-accent" style={{ marginRight: 12 }}>อ่านได้!</span>
              Learn to Read Thai
            </h1>
            <p className="script-hero-sub">
              44 consonants, a constellation of vowels, five singing tones. Learn a few
              letters at a time — soon the street signs and night-market menus read themselves.
            </p>
          </div>
          <div className="script-hero-ring anim-pop" style={{ animationDelay: '160ms' }}>
            <ProgressRing done={doneCount} total={lessons.length} />
          </div>
        </div>

        {/* ── Lesson trail ── */}
        <div className="section-title">Reading lessons</div>
        <ScriptTrail
          lessons={lessons}
          completed={completed}
          onOpen={(lessonId) => go({ name: 'script-lesson', lessonId })}
        />

        {/* ── Tone teaser ── */}
        <div className="section-title" style={{ marginTop: 44 }}>The five tones</div>
        <div className="tone-teaser anim-slide-up" style={{ animationDelay: '80ms' }}>
          <div>
            <div className="tt-title">
              <span aria-hidden style={{ marginRight: 8 }}>🎵</span>
              Same letters, five meanings
            </div>
            <div className="tt-sub">
              <span className="thai" style={{ color: 'var(--gold-bright)' }}>มา ม่า ม้า</span> — maa, màa, máa:
              come, (a noodle brand), horse. In Thai, the melody <i>is</i> the meaning —
              and the script tells you exactly which tone to sing.
            </div>
            <div className="tt-chips" aria-label="The five Thai tones">
              {TONE_ORDER.map((t) => (
                <span key={t} className="tone-badge" style={{ color: TONE_INFO[t].color }}>
                  <span style={{ fontSize: 14 }}>{TONE_INFO[t].contour}</span>
                  {TONE_INFO[t].label}
                </span>
              ))}
            </div>
          </div>
          <div className="tt-cta">
            {toneLesson ? (
              <ChunkyButton
                variant={toneUnlocked ? 'gold' : 'ghost'}
                onClick={() => {
                  if (toneUnlocked) go({ name: 'script-lesson', lessonId: toneLesson.id })
                }}
                disabled={!toneUnlocked}
                title={toneUnlocked ? toneLesson.title : 'Unlock by finishing the earlier lessons'}
              >
                {toneUnlocked ? '⚡ Learn the tone rules' : '🔒 Tone rules ahead'}
              </ChunkyButton>
            ) : (
              <span
                className="splash-stat"
                style={{ fontSize: 12.5 }}
              >
                🏮 Tone lessons arrive with the course
              </span>
            )}
          </div>
        </div>

        {/* ── Alphabet explorer ── */}
        <div className="section-title" style={{ marginTop: 44 }}>Alphabet explorer</div>
        <AlphabetExplorer consonants={registry.consonants} vowels={registry.vowels} />
      </main>
      <BottomNav />
    </div>
  )
}
