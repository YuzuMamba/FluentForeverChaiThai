/**
 * Spaced-repetition scheduler — the backbone of the app (Fluent Forever).
 *
 * A refined SM-2 variant with short-term learning steps (Anki-style),
 * per-deck queues, and load balancing. Grades: 0 = Again, 1 = Hard,
 * 2 = Good, 3 = Easy. Exercise results map onto grades so every exercise
 * feeds the same memory model.
 */

export type Grade = 0 | 1 | 2 | 3

export type CardStage = 'new' | 'learning' | 'review' | 'relearning'

export type ItemType = 'word' | 'sentence' | 'pattern' | 'char' | 'pair'

export interface CardState {
  itemId: string
  itemType: ItemType
  /** Deck = unit id ('u03') or script lesson id ('sc02') or 'pairs'. */
  deckId: string
  stage: CardStage
  /** Epoch ms when due. New cards: 0 (due immediately once unlocked). */
  due: number
  /** Current interval in days (fractional while learning). */
  interval: number
  /** Ease factor, starts 2.5, floor 1.3. */
  ease: number
  reps: number
  lapses: number
  /** Consecutive correct answers (for mastery + combo display). */
  streak: number
  lastReviewed: number
}

/** Learning steps in minutes before a card graduates to review. */
const LEARNING_STEPS_MIN = [1, 10]
const GRADUATE_DAYS = 1
const EASY_GRADUATE_DAYS = 4
const MIN_EASE = 1.3
const MAX_INTERVAL_DAYS = 365
const DAY_MS = 24 * 60 * 60 * 1000
const MIN_MS = 60 * 1000

export function newCard(itemId: string, itemType: ItemType, deckId: string): CardState {
  return {
    itemId,
    itemType,
    deckId,
    stage: 'new',
    due: 0,
    interval: 0,
    ease: 2.5,
    reps: 0,
    lapses: 0,
    streak: 0,
    lastReviewed: 0,
  }
}

/**
 * Deterministic pseudo-random fuzz (±5%) keyed on itemId + reps, so cards
 * introduced together don't clump onto the same future day, and replaying
 * the same review yields the same schedule.
 */
function fuzz(card: CardState, days: number): number {
  if (days < 2) return days
  let h = card.reps * 31 + 7
  for (let i = 0; i < card.itemId.length; i++) h = (h * 33 + card.itemId.charCodeAt(i)) >>> 0
  const f = 0.95 + (h % 1000) / 10000 // 0.95 – 1.0499
  return days * f
}

export function review(card: CardState, grade: Grade, now: number): CardState {
  const c: CardState = { ...card, reps: card.reps + 1, lastReviewed: now }

  if (c.stage === 'new') c.stage = 'learning'

  if (c.stage === 'learning' || c.stage === 'relearning') {
    if (grade === 0) {
      c.streak = 0
      c.interval = 0
      c.due = now + LEARNING_STEPS_MIN[0] * MIN_MS
    } else if (grade === 3) {
      // Easy: skip remaining steps, graduate generously.
      c.stage = 'review'
      c.streak += 1
      c.interval = EASY_GRADUATE_DAYS
      c.due = now + fuzz(c, EASY_GRADUATE_DAYS) * DAY_MS
    } else {
      const stepIdx = Math.min(Math.floor(c.interval) + 1, LEARNING_STEPS_MIN.length)
      c.streak += 1
      if (stepIdx >= LEARNING_STEPS_MIN.length) {
        c.stage = 'review'
        c.interval = GRADUATE_DAYS
        c.due = now + fuzz(c, GRADUATE_DAYS) * DAY_MS
      } else {
        c.interval = stepIdx // store step index while learning
        c.due = now + LEARNING_STEPS_MIN[stepIdx] * MIN_MS
      }
    }
    return c
  }

  // Review stage
  if (grade === 0) {
    c.stage = 'relearning'
    c.lapses += 1
    c.streak = 0
    c.ease = Math.max(MIN_EASE, c.ease - 0.2)
    c.interval = 0
    c.due = now + LEARNING_STEPS_MIN[0] * MIN_MS
    return c
  }

  c.streak += 1
  if (grade === 1) {
    c.ease = Math.max(MIN_EASE, c.ease - 0.15)
    c.interval = Math.max(c.interval * 1.2, c.interval + 0.5)
  } else if (grade === 2) {
    c.interval = c.interval * c.ease
  } else {
    c.ease = c.ease + 0.15
    c.interval = c.interval * c.ease * 1.3
  }
  c.interval = Math.min(c.interval, MAX_INTERVAL_DAYS)
  c.due = now + fuzz(c, c.interval) * DAY_MS
  return c
}

/** Strength 0..1 for progress rings: how "alive" is this memory right now? */
export function memoryStrength(card: CardState, now: number): number {
  if (card.stage === 'new') return 0
  if (card.stage === 'learning' || card.stage === 'relearning') return 0.25 + 0.15 * card.streak
  // Exponential forgetting relative to scheduled interval.
  const elapsed = Math.max(0, now - card.lastReviewed)
  const scheduled = Math.max(card.interval * DAY_MS, DAY_MS)
  const r = Math.exp(-0.693 * (elapsed / scheduled)) // ~50% at the due date
  return Math.min(1, 0.4 + 0.6 * r)
}

export function isDue(card: CardState, now: number): boolean {
  return card.stage !== 'new' && card.due <= now
}

export function isMastered(card: CardState): boolean {
  return card.stage === 'review' && card.interval >= 21 && card.streak >= 3
}

/**
 * Build a review queue: due cards first (most overdue first), then
 * optionally top up with new cards from the given deck order.
 */
export function buildQueue(
  cards: CardState[],
  now: number,
  opts: { maxReviews?: number; maxNew?: number; deckId?: string } = {},
): { due: CardState[]; fresh: CardState[] } {
  const { maxReviews = 40, maxNew = 8, deckId } = opts
  const pool = deckId ? cards.filter((c) => c.deckId === deckId) : cards
  const due = pool
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.due - b.due)
    .slice(0, maxReviews)
  const fresh = pool.filter((c) => c.stage === 'new').slice(0, maxNew)
  return { due, fresh }
}

/**
 * Map an exercise result onto an SRS grade.
 * - Recognition exercises cap at Good (recognition is easier than recall).
 * - Production exercises (typing, sentence building) grade the full range.
 */
export function gradeFromResult(kind: 'recognition' | 'production', correct: boolean, opts: { fast?: boolean; usedHint?: boolean } = {}): Grade {
  if (!correct) return 0
  if (opts.usedHint) return 1
  if (kind === 'recognition') return 2
  return opts.fast ? 3 : 2
}
