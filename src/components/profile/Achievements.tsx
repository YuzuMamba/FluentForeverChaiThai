/**
 * Achievement badges — playful trophies derived entirely from learner stats.
 * Earned = full color + glow; locked = grayscale medal with a lock + progress.
 */

export interface ProfileStats {
  level: number
  xp: number
  gems: number
  streakDays: number
  bestStreak: number
  wordsLearning: number
  wordsMastered: number
  patternsUnlocked: number
  unitsCompleted: number
  scriptLessonsDone: number
}

export interface BadgeSpec {
  id: string
  emoji: string
  name: string
  req: string
  accent: string
  earned: boolean
  /** e.g. '6/10' toward the goal, shown while locked. */
  progress: string
}

const fmt = (v: number, goal: number) => `${Math.min(v, goal)}/${goal}`

export function buildBadges(s: ProfileStats): BadgeSpec[] {
  return [
    {
      id: 'first-words', emoji: '🌱', name: 'First Words', req: 'Start learning 1 word',
      accent: 'var(--jade)', earned: s.wordsLearning >= 1, progress: fmt(s.wordsLearning, 1),
    },
    {
      id: 'first-lantern', emoji: '🏮', name: 'First Lantern', req: 'Complete a unit',
      accent: 'var(--gold)', earned: s.unitsCompleted >= 1, progress: fmt(s.unitsCompleted, 1),
    },
    {
      id: 'flame-7', emoji: '🔥', name: '7-Day Flame', req: 'Hit a 7-day streak',
      accent: 'var(--mango)', earned: s.bestStreak >= 7, progress: fmt(s.bestStreak, 7),
    },
    {
      id: 'blaze-14', emoji: '🌋', name: 'Fortnight Blaze', req: 'Hit a 14-day streak',
      accent: 'var(--coral)', earned: s.bestStreak >= 14, progress: fmt(s.bestStreak, 14),
    },
    {
      id: 'perfect-10', emoji: '🎯', name: 'Perfect 10', req: 'Master 10 words',
      accent: 'var(--sky)', earned: s.wordsMastered >= 10, progress: fmt(s.wordsMastered, 10),
    },
    {
      id: 'sentence-smith', emoji: '🔨', name: 'Sentence Smith', req: 'Unlock 5 patterns',
      accent: 'var(--orchid)', earned: s.patternsUnlocked >= 5, progress: fmt(s.patternsUnlocked, 5),
    },
    {
      id: 'script-scholar', emoji: '✍️', name: 'Script Scholar', req: 'Finish a script lesson',
      accent: 'var(--sky)', earned: s.scriptLessonsDone >= 1, progress: fmt(s.scriptLessonsDone, 1),
    },
    {
      id: 'gem-collector', emoji: '💎', name: 'Gem Collector', req: 'Hold 50 gems',
      accent: 'var(--sky)', earned: s.gems >= 50, progress: fmt(s.gems, 50),
    },
    {
      id: 'century-club', emoji: '💯', name: 'Century Club', req: 'Learn 100 words',
      accent: 'var(--gold)', earned: s.wordsLearning >= 100, progress: fmt(s.wordsLearning, 100),
    },
    {
      id: 'deep-memory', emoji: '🧠', name: 'Deep Memory', req: 'Master 25 words',
      accent: 'var(--orchid)', earned: s.wordsMastered >= 25, progress: fmt(s.wordsMastered, 25),
    },
    {
      id: 'road-warrior', emoji: '🗺️', name: 'Road Warrior', req: 'Complete 5 units',
      accent: 'var(--jade)', earned: s.unitsCompleted >= 5, progress: fmt(s.unitsCompleted, 5),
    },
    {
      id: 'lantern-legend', emoji: '🌟', name: 'Lantern Legend', req: 'Reach level 5',
      accent: 'var(--gold)', earned: s.level >= 5, progress: fmt(s.level, 5),
    },
  ]
}

export function Badge({ badge, delay = 0 }: { badge: BadgeSpec; delay?: number }) {
  return (
    <div
      className={`badge anim-pop ${badge.earned ? 'earned' : 'locked'}`}
      style={{ ['--acc' as string]: badge.accent, animationDelay: `${delay}ms` }}
      title={badge.earned ? `${badge.name} — earned!` : `${badge.name} — ${badge.req} (${badge.progress})`}
    >
      <span className="medal" aria-hidden>
        {badge.emoji}
        {!badge.earned && <span className="lock">🔒</span>}
      </span>
      <span className="badge-name">{badge.name}</span>
      <span className="badge-req">{badge.req}</span>
      {badge.earned ? (
        <span className="badge-earned-tag">Earned</span>
      ) : (
        <span className="badge-progress">{badge.progress}</span>
      )}
    </div>
  )
}
