import { useMemo } from 'react'
import { useProgress, selectDueCount, selectTodayXp } from '@/state/progress'
import { useRouter } from '@/state/router'
import Mascot from '@/components/Mascot'

/** Daily-goal ring around the streak flame. */
function GoalRing({ pct, children }: { pct: number; children: React.ReactNode }) {
  const r = 17
  const c = 2 * Math.PI * r
  return (
    <span className="goal-ring" style={{ position: 'relative', display: 'inline-grid', placeItems: 'center', width: 40, height: 40 }}>
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(148,173,224,0.18)" strokeWidth="3.5" />
        <circle
          cx="20" cy="20" r={r} fill="none"
          stroke="var(--mango)" strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, pct))}
          style={{ transition: 'stroke-dashoffset 700ms var(--ease-spring)' }}
        />
      </svg>
      <span style={{ fontSize: 18, position: 'relative' }}>{children}</span>
    </span>
  )
}

/** Persistent top bar: streak (with daily-goal ring), XP, gems, review due. */
export default function TopHUD() {
  const { streakDays, xp, gems, cards, history, dailyGoalXp } = useProgress()
  const go = useRouter((s) => s.go)
  const dueCount = useMemo(() => selectDueCount(cards), [cards])
  const todayXp = selectTodayXp(history)

  return (
    <header className="hud">
      <div
        className="hud-logo"
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        onClick={() => go({ name: 'home' })}
        role="button"
        aria-label="Chai Thai home"
      >
        <Mascot size={36} />
        <span className="hud-wordmark" style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.01em' }}>
          Chai<span style={{ color: 'var(--gold)' }}>Thai</span>
        </span>
      </div>
      <div className="hud-spacer" />
      <div className="hud-stats">
        <span className="hud-stat streak" title={`Daily goal: ${todayXp}/${dailyGoalXp} XP · streak ${streakDays} days`}>
          <GoalRing pct={dailyGoalXp ? todayXp / dailyGoalXp : 0}>🔥</GoalRing>
          {streakDays}
        </span>
        <span className="hud-stat xp" title="Total XP">
          <span className="ico">⚡</span>
          {xp.toLocaleString()}
        </span>
        <span className="hud-stat gems" title="Gems">
          <span className="ico">💎</span>
          {gems}
        </span>
        {dueCount > 0 && (
          <button
            className="hud-stat"
            style={{ color: 'var(--orchid)', cursor: 'pointer', border: '1px solid rgba(180,140,255,0.4)' }}
            onClick={() => go({ name: 'review' })}
            title={`${dueCount} cards due for review`}
          >
            <span className="ico">🗂️</span>
            {dueCount}
          </button>
        )}
      </div>
    </header>
  )
}
