/**
 * ScriptScreen — home of the Thai reading course. A stepping-stone trail of
 * script lessons, a tap-to-hear tone teaser, and the alphabet explorer
 * (consonants & vowels). อ่านได้! — you can read!
 */
import { useMemo } from 'react'
import { registry } from '@/content'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import TopHUD from '@/components/TopHUD'
import BottomNav from '@/components/BottomNav'
import WorldBackdrop from '@/three/WorldBackdrop'
import ScriptTrail from '@/components/script/ScriptTrail'
import AlphabetExplorer from '@/components/script/AlphabetExplorer'
import ProgressRing from '@/components/script/ProgressRing'
import ToneTeaser from '@/components/script/ToneTeaser'
import '@/components/script/script.css'

export default function ScriptScreen() {
  const go = useRouter((s) => s.go)
  const completed = useProgress((s) => s.completedScriptLessons)

  const lessons = registry.scriptLessons
  const doneCount = useMemo(
    () => lessons.filter((l) => completed.includes(l.id)).length,
    [lessons, completed],
  )

  /** Distinct consonants introduced by lessons the learner has finished. */
  const lettersMet = useMemo(() => {
    const done = new Set(completed)
    const met = new Set<string>()
    for (const l of lessons) {
      if (!done.has(l.id)) continue
      for (const ch of l.newChars) {
        if (registry.consonants.some((c) => c.char === ch)) met.add(ch)
      }
    }
    return met.size
  }, [lessons, completed])

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
        <header className="script-hero anim-slide-up">
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
            {(registry.consonants.length > 0 || registry.vowels.length > 0) && (
              <div className="script-hero-stats">
                {registry.consonants.length > 0 && (
                  <span className="splash-stat anim-pop" style={{ animationDelay: '220ms' }}>
                    ✍️ {lettersMet}/{registry.consonants.length} letters met
                  </span>
                )}
                {registry.vowels.length > 0 && (
                  <span className="splash-stat anim-pop" style={{ animationDelay: '300ms' }}>
                    🌀 {registry.vowels.length} vowels
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="script-hero-ring anim-pop" style={{ animationDelay: '160ms' }}>
            <ProgressRing done={doneCount} total={lessons.length} />
          </div>
        </header>

        {/* ── Lesson trail ── */}
        <div className="section-title">
          Reading lessons
          {lessons.length > 0 && <span className="count-pill">{doneCount} / {lessons.length}</span>}
        </div>
        <ScriptTrail
          lessons={lessons}
          completed={completed}
          onOpen={(lessonId) => go({ name: 'script-lesson', lessonId })}
        />

        {/* ── Tone teaser ── */}
        <div className="section-title" style={{ marginTop: 44 }}>The five tones</div>
        <ToneTeaser
          toneLesson={toneLesson}
          unlocked={toneUnlocked}
          onOpen={(lessonId) => go({ name: 'script-lesson', lessonId })}
        />

        {/* ── Alphabet explorer ── */}
        <div className="section-title" style={{ marginTop: 44 }}>Alphabet explorer</div>
        <AlphabetExplorer consonants={registry.consonants} vowels={registry.vowels} />
      </main>
      <BottomNav />
    </div>
  )
}
