/**
 * Sentence Builder Mode — the generative heart. Shows your combinatorial
 * power (how many sentences you can build) and runs novel-sentence sessions.
 */
import { useMemo, useState } from 'react'
import { registry } from '@/content'
import { generateBuilderSet, toBuilderExercise, combinatorialPower } from '@/engine/builder'
import { mulberry32 } from '@/engine/exercises'
import type { Word } from '@/content/schema'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import SessionRunner from '@/components/SessionRunner'
import TopHUD from '@/components/TopHUD'
import BottomNav from '@/components/BottomNav'
import ChunkyButton from '@/components/ChunkyButton'
import Mascot from '@/components/Mascot'
import WorldBackdrop from '@/three/WorldBackdrop'

/** Words the learner has actually started learning (has cards / unit progress). */
function useLearnedState() {
  const lessonProgress = useProgress((s) => s.lessonProgress)
  return useMemo(() => {
    const startedUnits = registry.units.filter((u) => (lessonProgress[u.id] ?? 0) > 0)
    const unitsForVocab = startedUnits.length ? startedUnits : registry.units.slice(0, 1)
    const words: Word[] = unitsForVocab
      .flatMap((u) => u.wordIds)
      .map((id) => registry.words.get(id)!)
      .filter(Boolean)
    const patterns = unitsForVocab
      .flatMap((u) => u.patternIds)
      .map((id) => registry.patterns.get(id)!)
      .filter(Boolean)
    return { words, patterns, startedUnits: unitsForVocab }
  }, [lessonProgress])
}

export default function BuilderScreen() {
  const go = useRouter((s) => s.go)
  const { words, patterns } = useLearnedState()
  const [running, setRunning] = useState(false)

  const power = useMemo(() => combinatorialPower(patterns, words), [patterns, words])

  if (running) {
    const seed = Date.now() % 1000000
    const known = new Set([...registry.sentences.values()].map((s) => s.wordIds.join('|')))
    const gens = generateBuilderSet(patterns, words, 8, seed, known)
    const rnd = mulberry32(seed + 5)
    const exercises = gens.map((g) => toBuilderExercise(g, words, rnd))
    return (
      <SessionRunner
        meta={{ type: 'builder', title: 'Sentence Builder' }}
        exercises={exercises}
        onExit={() => setRunning(false)}
      />
    )
  }

  const ready = power >= 6 && patterns.length >= 1

  return (
    <div className="screen">
      <WorldBackdrop variant="deep" />
      <TopHUD />
      <main className="screen-content" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', paddingTop: 26 }}>
          <Mascot mood={ready ? 'happy' : 'think'} size={140} />
          <h1 style={{ fontSize: 34, margin: '8px 0 10px' }}>Sentence Builder</h1>
          <p style={{ color: 'var(--text-1)', fontSize: 16.5, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Don't memorize sentences — <b style={{ color: 'var(--gold)' }}>build</b> them.
            Every pattern you learn multiplies with every word you know.
          </p>

          <div
            className="card anim-pop"
            style={{ margin: '30px auto 0', padding: '26px 34px', maxWidth: 460 }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-2)' }}>
              SENTENCES YOU CAN BUILD RIGHT NOW
            </div>
            <div style={{
              fontSize: 56, fontWeight: 800, lineHeight: 1.15, marginTop: 6,
              background: 'linear-gradient(90deg, var(--gold-bright), var(--mango))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {power.toLocaleString()}
            </div>
            <div style={{ color: 'var(--text-2)', fontSize: 14.5, marginTop: 4 }}>
              from {words.length} words × {patterns.length} patterns
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            {ready ? (
              <ChunkyButton variant="gold" size="lg" onClick={() => setRunning(true)}>
                🧱 Build novel sentences
              </ChunkyButton>
            ) : (
              <>
                <p style={{ color: 'var(--text-2)', marginBottom: 14 }}>
                  Learn a few more units first — you need patterns and words to combine.
                </p>
                <ChunkyButton variant="sky" onClick={() => go({ name: 'home' })}>
                  Back to lessons
                </ChunkyButton>
              </>
            )}
          </div>

          {patterns.length > 0 && (
            <>
              <div className="section-title" style={{ textAlign: 'left' }}>Your sentence machines</div>
              <div style={{ display: 'grid', gap: 10, textAlign: 'left' }}>
                {patterns.map((p) => (
                  <div key={p.id} className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 22 }}>🧩</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15.5 }}>{p.name}</div>
                      <div style={{ color: 'var(--text-2)', fontSize: 13 }}>{p.literal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
