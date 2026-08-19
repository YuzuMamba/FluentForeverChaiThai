/** Ear training: minimal-pair tone sessions (Fluent Forever chapter 3). */
import { useEffect, useMemo } from 'react'
import { registry } from '@/content'
import { generateEarTraining } from '@/engine/lessons'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import SessionRunner from '@/components/SessionRunner'

export default function EarScreen() {
  const go = useRouter((s) => s.go)
  const ensureCards = useProgress((s) => s.ensureCards)

  const exercises = useMemo(() => generateEarTraining(registry.minimalPairs, 10, Date.now() % 1000000), [])

  useEffect(() => {
    ensureCards(registry.minimalPairs.map((p) => ({ id: p.id, type: 'pair' as const, deckId: 'pairs' })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SessionRunner
      meta={{ type: 'ear', title: 'Ear Training · Tones' }}
      exercises={exercises}
      onExit={() => go({ name: 'review' })}
    />
  )
}
