/**
 * ProfileScreen — the learner's player card: level ring, 14-day activity,
 * stat tiles, achievement medals, and settings. Night-market trophy room.
 */
import { useMemo } from 'react'
import { registry } from '@/content'
import { isMastered } from '@/srs/scheduler'
import { levelFromXp, useProgress } from '@/state/progress'
import TopHUD from '@/components/TopHUD'
import BottomNav from '@/components/BottomNav'
import Mascot from '@/components/Mascot'
import WorldBackdrop from '@/three/WorldBackdrop'
import LevelRing from '@/components/profile/LevelRing'
import ActivityChart from '@/components/profile/ActivityChart'
import StatTile from '@/components/profile/StatTile'
import SettingsCard from '@/components/profile/SettingsCard'
import { Badge, buildBadges } from '@/components/profile/Achievements'
import '@/components/profile/profile.css'

/** Playful rank titles keyed to level milestones. */
const RANKS: Array<{ min: number; title: string }> = [
  { min: 20, title: 'Golden Elephant' },
  { min: 16, title: 'Riverside Storyteller' },
  { min: 12, title: 'Market Haggler' },
  { min: 8, title: 'Tuk-Tuk Navigator' },
  { min: 5, title: 'Lantern Lighter' },
  { min: 3, title: 'Street Food Explorer' },
  { min: 1, title: 'Night Market Newcomer' },
]

export default function ProfileScreen() {
  const cards = useProgress((s) => s.cards)
  const xp = useProgress((s) => s.xp)
  const gems = useProgress((s) => s.gems)
  const streakDays = useProgress((s) => s.streakDays)
  const bestStreak = useProgress((s) => s.bestStreak)
  const history = useProgress((s) => s.history)
  const dailyGoalXp = useProgress((s) => s.dailyGoalXp)
  const completedUnits = useProgress((s) => s.completedUnits)
  const lessonProgress = useProgress((s) => s.lessonProgress)
  const completedScriptLessons = useProgress((s) => s.completedScriptLessons)

  const { level, into, needed } = levelFromXp(xp)
  const rank = RANKS.find((r) => level >= r.min)?.title ?? RANKS[RANKS.length - 1].title

  const stats = useMemo(() => {
    const all = Object.values(cards)
    const wordsLearning = all.filter((c) => c.itemType === 'word' && c.stage !== 'new').length
    const wordsMastered = all.filter((c) => c.itemType === 'word' && isMastered(c)).length
    const patternsUnlocked = registry.units
      .filter((u) => (lessonProgress[u.id] ?? 0) > 0)
      .reduce((sum, u) => sum + u.patternIds.length, 0)
    return {
      level,
      xp,
      gems,
      streakDays,
      bestStreak,
      wordsLearning,
      wordsMastered,
      patternsUnlocked,
      unitsCompleted: completedUnits.length,
      scriptLessonsDone: completedScriptLessons.length,
    }
  }, [cards, lessonProgress, completedUnits, completedScriptLessons, level, xp, gems, streakDays, bestStreak])

  const badges = useMemo(() => buildBadges(stats), [stats])
  const earnedCount = badges.filter((b) => b.earned).length

  const tiles = [
    { icon: '🔥', value: stats.streakDays, label: 'Day streak', accent: 'var(--mango)' },
    { icon: '🏆', value: stats.bestStreak, label: 'Best streak', accent: 'var(--gold)' },
    { icon: '📚', value: stats.wordsLearning, label: 'Words learning', accent: 'var(--sky)' },
    { icon: '✨', value: stats.wordsMastered, label: 'Words mastered', accent: 'var(--jade)' },
    { icon: '🧩', value: stats.patternsUnlocked, label: 'Patterns unlocked', accent: 'var(--orchid)' },
    { icon: '✅', value: stats.unitsCompleted, label: 'Units completed', accent: 'var(--lime)' },
  ]

  return (
    <div className="screen">
      <WorldBackdrop variant="deep" />
      <TopHUD />
      <main className="screen-content">
        {/* ── Player card hero ── */}
        <header className="profile-hero anim-slide-up">
          <div className="profile-hero-left">
            <Mascot mood={streakDays > 0 ? 'happy' : 'idle'} size={122} />
            <LevelRing level={level} into={into} needed={needed} size={132} />
          </div>
          <div className="profile-id">
            <div className="profile-eyebrow">
              <span className="thai">โปรไฟล์</span> · Your profile
            </div>
            <h1>{rank}</h1>
            <p className="profile-sub">
              <b>{(needed - into).toLocaleString()} XP</b> to level {level + 1}
            </p>
            <div className="profile-chips">
              <span className="profile-chip anim-pop" style={{ animationDelay: '80ms' }}>
                <span className="ico" aria-hidden>⚡</span>
                <span>
                  <span className="val" style={{ color: 'var(--gold)' }}>{xp.toLocaleString()}</span>
                  <span className="lbl" style={{ display: 'block' }}>Total XP</span>
                </span>
              </span>
              <span className="profile-chip anim-pop" style={{ animationDelay: '150ms' }}>
                <span className="ico" aria-hidden>💎</span>
                <span>
                  <span className="val" style={{ color: 'var(--sky)' }}>{gems.toLocaleString()}</span>
                  <span className="lbl" style={{ display: 'block' }}>Gems</span>
                </span>
              </span>
              <span className="profile-chip anim-pop" style={{ animationDelay: '220ms' }}>
                <span className="ico" aria-hidden>🏆</span>
                <span>
                  <span className="val" style={{ color: 'var(--mango)' }}>{bestStreak}</span>
                  <span className="lbl" style={{ display: 'block' }}>Best streak</span>
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* ── Activity + stats ── */}
        <div className="section-title">Progress</div>
        <div className="profile-cols">
          <ActivityChart
            history={history}
            goalXp={dailyGoalXp}
            className="anim-slide-up"
            style={{ animationDelay: '60ms' }}
          />
          <div className="stat-grid">
            {tiles.map((t, i) => (
              <StatTile key={t.label} {...t} delay={120 + i * 60} />
            ))}
          </div>
        </div>

        {/* ── Achievements ── */}
        <div className="section-title">
          Achievements
          <span style={{ color: 'var(--gold)', letterSpacing: '0.04em' }}>
            {earnedCount}/{badges.length}
          </span>
        </div>
        <div className="badge-grid">
          {badges.map((b, i) => (
            <Badge key={b.id} badge={b} delay={60 + i * 40} />
          ))}
        </div>

        {/* ── Settings ── */}
        <div className="section-title">Settings</div>
        <SettingsCard className="anim-slide-up" style={{ animationDelay: '80ms' }} />

        <p className="profile-foot">
          <span className="thai">สู้ ๆ นะ!</span> — keep lighting lanterns, one word at a time.
        </p>
      </main>
      <BottomNav />
    </div>
  )
}
