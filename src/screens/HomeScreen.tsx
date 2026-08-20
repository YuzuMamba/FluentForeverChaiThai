/**
 * HomeScreen — the learning path. A lantern-lit road winding through every
 * unit of the course: unit banners, five chunky lesson nodes each, crowns for
 * finished units, Chang cheering you along the way.
 */
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { registry } from '@/content'
import { LESSONS_PER_UNIT } from '@/engine/lessons'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import TopHUD from '@/components/TopHUD'
import BottomNav from '@/components/BottomNav'
import Mascot from '@/components/Mascot'
import WorldBackdrop from '@/three/WorldBackdrop'
import UnitSection from '@/components/path/UnitSection'
import StickyUnitHeader from '@/components/path/StickyUnitHeader'
import LanternField, { KhomLoi } from '@/components/path/LanternField'
import '@/components/path/path.css'

/** Chang's trail-side encouragements, sprinkled between units. */
const CHEERS: Array<{ thai: string; en: string }> = [
  { thai: 'สู้ ๆ นะ!', en: 'Keep going — sûu sûu!' },
  { thai: 'เก่งมาก!', en: 'gèng mâak — so good!' },
  { thai: 'ไปกันต่อ!', en: 'Onward — bpai gan dtɔ̀ɔ!' },
  { thai: 'เยี่ยมเลย!', en: 'yîam ləəi — excellent!' },
]

function Divider() {
  return (
    <div className="path-divider" aria-hidden>
      <span className="line" />
      <span className="dia" style={{ fontSize: 9, opacity: 0.6 }}>◆</span>
      <span className="dia">◆</span>
      <span className="dia" style={{ fontSize: 9, opacity: 0.6 }}>◆</span>
      <span className="line" />
    </div>
  )
}

export default function HomeScreen() {
  const go = useRouter((s) => s.go)
  const lessonProgress = useProgress((s) => s.lessonProgress)
  const units = registry.units

  const unitStates = useMemo(
    () =>
      units.map((unit, i) => {
        const progress = Math.min(lessonProgress[unit.id] ?? 0, LESSONS_PER_UNIT)
        const unlocked = i === 0 || (lessonProgress[units[i - 1].id] ?? 0) >= LESSONS_PER_UNIT
        return { unit, index: i, progress, unlocked, complete: progress >= LESSONS_PER_UNIT }
      }),
    [lessonProgress, units],
  )

  const current = useMemo(() => unitStates.find((s) => s.unlocked && !s.complete) ?? null, [unitStates])
  const lessonsDone = unitStates.reduce((sum, s) => sum + s.progress, 0)
  const totalLessons = units.length * LESSONS_PER_UNIT
  const unitsDone = unitStates.filter((s) => s.complete).length

  // Auto-scroll so the current node lands center-screen on mount.
  const currentNodeEl = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = currentNodeEl.current
      if (!el) return
      const r = el.getBoundingClientRect()
      window.scrollTo({ top: Math.max(0, r.top + window.scrollY - window.innerHeight / 2), behavior: 'auto' })
    }, 90)
    return () => window.clearTimeout(id)
  }, [])

  // Sticky current-unit mini-header once the hero has scrolled away.
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 340)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const startLesson = (unitId: string, lessonIndex: number) => go({ name: 'lesson', unitId, lessonIndex })

  return (
    <div className="screen">
      <WorldBackdrop variant="dusk" lanterns={false} />
      <LanternField />
      <TopHUD />

      {stuck && current && (
        <StickyUnitHeader
          unit={current.unit}
          progress={current.progress}
          onContinue={() => startLesson(current.unit.id, current.progress)}
        />
      )}

      <main className="screen-content path-content">
        {/* ── Hero ── */}
        <div className="path-hero anim-slide-up">
          <div className="path-eyebrow">
            <span className="thai" style={{ marginRight: 8 }}>เส้นทางของคุณ</span>· Your journey
          </div>
          <h1>The Lantern Road</h1>
          <p className="path-hero-sub">
            {current
              ? `${lessonsDone} of ${totalLessons} lanterns lit · ${unitsDone} unit${unitsDone === 1 ? '' : 's'} complete`
              : 'Every lantern on the road is lit — the night market is yours! 🎉'}
          </p>
          <div className="path-overall" aria-hidden>
            <div className="fill" style={{ width: `${Math.max(3, (lessonsDone / totalLessons) * 100)}%` }} />
          </div>
        </div>

        {/* ── The winding path ── */}
        <div className="path-col">
          {unitStates.map((s) => (
            <Fragment key={s.unit.id}>
              {s.index > 0 && <Divider />}
              {s.index > 0 && s.index % 3 === 0 && (
                <div className="path-flourish" aria-hidden>
                  <Mascot mood={s.unlocked ? 'happy' : 'idle'} size={62} />
                  <div className="say">
                    <span className="say-thai thai">{CHEERS[(s.index / 3 - 1) % CHEERS.length].thai}</span>
                    <span className="say-en">{CHEERS[(s.index / 3 - 1) % CHEERS.length].en}</span>
                  </div>
                </div>
              )}
              <UnitSection
                unit={s.unit}
                index={s.index}
                progress={s.progress}
                unlocked={s.unlocked}
                complete={s.complete}
                onStartLesson={(k) => startLesson(s.unit.id, k)}
                currentNodeRef={
                  current && current.unit.id === s.unit.id ? (el) => (currentNodeEl.current = el) : undefined
                }
              />
            </Fragment>
          ))}

          {/* ── Finale ── */}
          <div className="path-finale">
            <span className="lantern" aria-hidden><KhomLoi id="finale" size={40} /></span>
            <div className="t">
              {current ? 'The road goes on…' : 'You walked the whole road!'}
            </div>
            <div style={{ fontSize: 13.5, marginTop: 2 }}>
              Every lantern you light is a conversation you can have.
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
