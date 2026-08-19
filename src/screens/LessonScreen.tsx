/** Lesson player: generates the unit lesson and runs it. */
import { useEffect, useMemo } from 'react'
import { registry } from '@/content'
import { generateUnitLesson, LESSONS_PER_UNIT } from '@/engine/lessons'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import SessionRunner from '@/components/SessionRunner'

const LESSON_NAMES = ['New Words I', 'New Words II', 'Patterns', 'Listening', 'Produce It']

export default function LessonScreen({ unitId, lessonIndex }: { unitId: string; lessonIndex: number }) {
  const go = useRouter((s) => s.go)
  const ensureCards = useProgress((s) => s.ensureCards)

  const { unit, exercises } = useMemo(() => {
    const unit = registry.units.find((u) => u.id === unitId)
    if (!unit) return { unit: null, exercises: [] }
    const seed = Date.now() % 1000000
    const exercises = generateUnitLesson(registry, unit, Math.min(lessonIndex, LESSONS_PER_UNIT - 1), seed)
    return { unit, exercises }
  }, [unitId, lessonIndex])

  useEffect(() => {
    if (!unit) {
      go({ name: 'home' })
      return
    }
    // Register SRS cards for everything this lesson touches.
    ensureCards([
      ...unit.wordIds.map((id) => ({ id, type: 'word' as const, deckId: unit.id })),
      ...unit.sentenceIds.map((id) => ({ id, type: 'sentence' as const, deckId: unit.id })),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  if (!unit) return null

  return (
    <SessionRunner
      meta={{
        type: 'lesson',
        unitId,
        lessonIndex,
        title: `${unit.title} · ${LESSON_NAMES[lessonIndex] ?? `Lesson ${lessonIndex + 1}`}`,
      }}
      exercises={exercises}
      onExit={() => go({ name: 'home' })}
    />
  )
}
