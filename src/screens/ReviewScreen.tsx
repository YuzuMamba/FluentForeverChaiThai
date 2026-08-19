/** SRS review hub: shows due decks and runs review sessions. */
import { useMemo, useState } from 'react'
import { registry } from '@/content'
import { generateReviewSession } from '@/engine/lessons'
import { buildQueue } from '@/srs/scheduler'
import { useProgress, selectDeckStats } from '@/state/progress'
import { useRouter } from '@/state/router'
import SessionRunner from '@/components/SessionRunner'
import TopHUD from '@/components/TopHUD'
import BottomNav from '@/components/BottomNav'
import ChunkyButton from '@/components/ChunkyButton'
import Mascot from '@/components/Mascot'
import WorldBackdrop from '@/three/WorldBackdrop'

export default function ReviewScreen() {
  const go = useRouter((s) => s.go)
  const cards = useProgress((s) => s.cards)
  const [session, setSession] = useState<null | { deckId?: string }>(null)

  const allCards = useMemo(() => Object.values(cards), [cards])
  const dueNow = useMemo(() => buildQueue(allCards, Date.now(), { maxReviews: 40, maxNew: 0 }).due, [allCards])

  const decks = useMemo(() => {
    const deckIds = [...new Set(allCards.map((c) => c.deckId))]
    return deckIds
      .map((deckId) => {
        const unit = registry.units.find((u) => u.id === deckId)
        const scriptLesson = registry.scriptLessons.find((l) => l.id === deckId)
        return {
          deckId,
          title: unit?.title ?? scriptLesson?.title ?? deckId,
          emoji: unit?.emoji ?? scriptLesson?.emoji ?? '🗂️',
          color: unit?.color ?? '#4cc9ff',
          stats: selectDeckStats(cards, deckId),
        }
      })
      .filter((d) => d.stats.total > 0)
      .sort((a, b) => b.stats.due - a.stats.due)
  }, [allCards, cards])

  if (session) {
    const queue = session.deckId
      ? buildQueue(allCards, Date.now(), { maxReviews: 30, maxNew: 0, deckId: session.deckId }).due
      : dueNow
    const exercises = generateReviewSession(registry, queue, Date.now() % 1000000)
    return (
      <SessionRunner
        meta={{ type: 'review', title: 'Review' }}
        exercises={exercises}
        onExit={() => {
          setSession(null)
        }}
      />
    )
  }

  return (
    <div className="screen">
      <WorldBackdrop variant="deep" />
      <TopHUD />
      <main className="screen-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 18, flexWrap: 'wrap' }}>
          <Mascot mood={dueNow.length > 0 ? 'think' : 'happy'} size={110} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 style={{ fontSize: 30 }}>Review</h1>
            <p style={{ color: 'var(--text-1)', marginTop: 4 }}>
              {dueNow.length > 0
                ? `${dueNow.length} memories are fading — catch them before they slip away.`
                : 'All caught up! Your memories are strong right now. 💪'}
            </p>
          </div>
          {dueNow.length > 0 && (
            <ChunkyButton variant="gold" size="lg" onClick={() => setSession({})}>
              Review {dueNow.length} due
            </ChunkyButton>
          )}
        </div>

        <div className="section-title">Your decks</div>
        <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {decks.length === 0 && (
            <div className="card" style={{ padding: 26, color: 'var(--text-2)' }}>
              Complete a lesson first — every word you learn gets its own memory card here.
            </div>
          )}
          {decks.map((deck) => (
            <div key={deck.deckId} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 30 }}>{deck.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{deck.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
                    {deck.stats.mastered}/{deck.stats.total} mastered
                  </div>
                </div>
                {deck.stats.due > 0 && (
                  <span style={{
                    background: 'rgba(180,140,255,0.15)', color: 'var(--orchid)',
                    borderRadius: 'var(--r-full)', padding: '4px 12px', fontWeight: 800, fontSize: 14,
                  }}>
                    {deck.stats.due} due
                  </span>
                )}
              </div>
              {/* Memory strength bar */}
              <div style={{ marginTop: 14, height: 8, borderRadius: 4, background: 'rgba(148,173,224,0.12)', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.round(deck.stats.strength * 100)}%`, height: '100%',
                  borderRadius: 4, background: `linear-gradient(90deg, ${deck.color}88, ${deck.color})`,
                  transition: 'width 600ms var(--ease-out)',
                }} />
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <ChunkyButton size="sm" variant={deck.stats.due > 0 ? 'sky' : 'ghost'} onClick={() => setSession({ deckId: deck.deckId })}>
                  {deck.stats.due > 0 ? 'Review deck' : 'Practice anyway'}
                </ChunkyButton>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title">Ear training</div>
        <div className="card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, maxWidth: 560 }}>
          <span style={{ fontSize: 34 }}>👂</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800 }}>Tone minimal pairs</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)' }}>
              ใกล้ or ไกล — near or far? Train the five tones with sound-alike pairs.
            </div>
          </div>
          <ChunkyButton size="sm" variant="plain" style={{ ['--btn-bg' as any]: 'linear-gradient(180deg,#c5a4ff,#a478f0)', ['--btn-edge' as any]: '#5d3ba8', ['--btn-fg' as any]: '#221145' }} onClick={() => go({ name: 'ear' })}>
            Train
          </ChunkyButton>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
