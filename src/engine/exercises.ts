/**
 * Exercise model. Every exercise is data — screens render them, the session
 * store advances them, and results feed the SRS as grades.
 */
import type { Word, Sentence, Pattern, MinimalPair, ThaiConsonant, ScriptLesson } from '@/content/schema'

export type Exercise =
  /** Introduce a new word: image-word card with audio. Not graded. */
  | { kind: 'intro-word'; word: Word }
  /** Introduce a pattern with explanation + examples. Not graded. */
  | { kind: 'intro-pattern'; pattern: Pattern }
  /** Thai (script+audio) → choose English meaning. Recognition. */
  | { kind: 'choice-thai-en'; word: Word; options: Word[] }
  /** English + emoji → choose the Thai. Recognition→recall bridge. */
  | { kind: 'choice-en-thai'; word: Word; options: Word[] }
  /** Audio only → choose meaning. Trains listening. */
  | { kind: 'choice-audio'; word: Word; options: Word[] }
  /** Tap matching Thai↔English pairs. */
  | { kind: 'match-pairs'; words: Word[] }
  /** English sentence → arrange Thai word tiles in order. Production. */
  | { kind: 'arrange'; sentence: Sentence; distractors: Word[] }
  /** Audio sentence → arrange the Thai tiles you heard. Listening. */
  | { kind: 'listen-arrange'; sentence: Sentence; distractors: Word[] }
  /** Type the romanization (early) for a word you see/hear. Production. */
  | { kind: 'type-roman'; word: Word }
  /** Sentence Builder: novel generated sentence, never seen before. */
  | {
      kind: 'builder'
      prompt: string
      patternId: string
      /** Expected Thai tokens in order (word ids). */
      expectedIds: string[]
      /** Tile bank: expected + distractors, shuffled by the screen. */
      bankIds: string[]
      literal: string
    }
  /** Minimal pair: hear one, pick which. Ear training (FF chapter 3). */
  | { kind: 'tone-pick'; pair: MinimalPair; play: 'a' | 'b' }
  /** Introduce a Thai letter. Not graded. */
  | { kind: 'intro-char'; consonant: ThaiConsonant }
  /** Letter → pick its sound. */
  | { kind: 'char-sound'; consonant: ThaiConsonant; options: ThaiConsonant[] }
  /** Sound → pick the letter. */
  | { kind: 'sound-char'; consonant: ThaiConsonant; options: ThaiConsonant[] }
  /** Read a syllable/word aloud (self-check) then reveal; pick romanization. */
  | { kind: 'read-syllable'; drill: ScriptLesson['readingDrills'][number]; options: string[] }
  /** Comprehension: hear/read a Thai sentence → pick what it means. */
  | { kind: 'comprehend'; sentence: Sentence; options: string[]; audioOnly: boolean }

export type ExerciseKind = Exercise['kind']

/** Which SRS item an exercise reviews (undefined → not graded). */
export function exerciseItemId(ex: Exercise): string | undefined {
  switch (ex.kind) {
    case 'choice-thai-en':
    case 'choice-en-thai':
    case 'choice-audio':
    case 'type-roman':
      return ex.word.id
    case 'arrange':
    case 'listen-arrange':
    case 'comprehend':
      return ex.sentence.id
    case 'builder':
      return ex.patternId
    case 'tone-pick':
      return ex.pair.id
    case 'char-sound':
    case 'sound-char':
      return ex.consonant.char
    default:
      return undefined
  }
}

/** Production exercises grade harder & teach more (FF: recall > recognition). */
export function exerciseMode(ex: Exercise): 'recognition' | 'production' {
  switch (ex.kind) {
    case 'arrange':
    case 'builder':
    case 'type-roman':
      return 'production'
    default:
      return 'recognition'
  }
}

// ── Deterministic shuffle & pick helpers (seeded so replays differ per session) ──

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffled<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pick n distractors for a word: same part of speech preferred, never itself. */
export function pickDistractors(target: Word, pool: Word[], n: number, rnd: () => number): Word[] {
  const others = pool.filter((w) => w.id !== target.id && w.en !== target.en)
  const samePos = others.filter((w) => w.pos === target.pos)
  const rest = others.filter((w) => w.pos !== target.pos)
  const ordered = [...shuffled(samePos, rnd), ...shuffled(rest, rnd)]
  return ordered.slice(0, n)
}
