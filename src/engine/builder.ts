/**
 * Sentence Builder — the generative heart of the app.
 *
 * Takes the learner's acquired patterns + vocabulary and generates NOVEL
 * sentences they have never seen: an English meaning to express, the expected
 * Thai token sequence, and a tile bank. Familiar words × familiar patterns
 * = combinatorial practice (Fluent Forever's "make your own sentences").
 */
import type { Pattern, Word, SlotSpec } from '@/content/schema'
import type { Exercise } from './exercises'
import { mulberry32, shuffled } from './exercises'

function slotCandidates(slot: SlotSpec, learned: Word[]): Word[] {
  const { pos, tags, wordIds, exclude } = slot.accepts
  return learned.filter((w) => {
    if (exclude?.includes(w.id)) return false
    if (wordIds?.length) return wordIds.includes(w.id)
    if (pos?.length && !pos.includes(w.pos)) return false
    if (tags?.length && !tags.some((t) => w.tags?.includes(t))) return false
    return Boolean(pos?.length || tags?.length)
  })
}

function renderEn(template: string, fills: Record<string, Word | undefined>): string {
  return template
    .replace(/\{(\w+)\}/g, (_, name: string) => fills[name]?.en ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?])/g, '$1')
    .trim()
}

export interface GeneratedSentence {
  pattern: Pattern
  fills: Record<string, Word | undefined>
  en: string
  expectedIds: string[]
  literal: string
}

/**
 * Generate one novel sentence from a learned pattern. Returns null when the
 * learner doesn't yet know enough words to fill the pattern's slots.
 */
export function generateSentence(
  pattern: Pattern,
  learnedWords: Word[],
  rnd: () => number,
  opts: { avoid?: Set<string> } = {},
): GeneratedSentence | null {
  const fills: Record<string, Word | undefined> = {}
  for (const slot of pattern.slots) {
    const candidates = slotCandidates(slot, learnedWords)
    if (!candidates.length) {
      if (slot.optional) { fills[slot.name] = undefined; continue }
      return null
    }
    // Optional slots are filled ~65% of the time for variety.
    if (slot.optional && rnd() < 0.35) { fills[slot.name] = undefined; continue }
    fills[slot.name] = shuffled(candidates, rnd)[0]
  }

  const expectedIds: string[] = []
  for (const part of pattern.parts) {
    if (part.fixed) expectedIds.push(...part.fixed)
    else if (part.slot) {
      const w = fills[part.slot]
      if (w) expectedIds.push(w.id)
    }
  }

  const signature = expectedIds.join('|')
  if (opts.avoid?.has(signature)) return null

  const en = renderEn(pattern.enTemplate, fills)
  if (!en) return null
  return { pattern, fills, en, expectedIds, literal: pattern.literal }
}

/**
 * Build a batch of unique novel sentences across the learner's patterns.
 * `knownSentenceSigs` excludes sentences the curriculum already taught,
 * guaranteeing genuinely new combinations.
 */
export function generateBuilderSet(
  patterns: Pattern[],
  learnedWords: Word[],
  count: number,
  seed: number,
  knownSentenceSigs: Set<string> = new Set(),
): GeneratedSentence[] {
  const rnd = mulberry32(seed)
  const avoid = new Set(knownSentenceSigs)
  const out: GeneratedSentence[] = []
  const pool = patterns.filter((p) => p.slots.length > 0)
  if (!pool.length) return out
  let attempts = 0
  while (out.length < count && attempts < count * 30) {
    attempts++
    const pattern = pool[Math.floor(rnd() * pool.length)]
    const gen = generateSentence(pattern, learnedWords, rnd, { avoid })
    if (gen) {
      avoid.add(gen.expectedIds.join('|'))
      out.push(gen)
    }
  }
  return out
}

/** Wrap a generated sentence as a builder exercise with a distractor bank. */
export function toBuilderExercise(
  gen: GeneratedSentence,
  learnedWords: Word[],
  rnd: () => number,
): Exercise {
  const expectedSet = new Set(gen.expectedIds)
  const distractorPool = learnedWords.filter((w) => !expectedSet.has(w.id))
  // Prefer confusable distractors: same pos as some expected word.
  const expectedPos = new Set(
    gen.expectedIds
      .map((id) => learnedWords.find((w) => w.id === id)?.pos)
      .filter(Boolean),
  )
  const confusable = distractorPool.filter((w) => expectedPos.has(w.pos))
  const fallback = distractorPool.filter((w) => !expectedPos.has(w.pos))
  const nDistract = Math.min(4, Math.max(2, 8 - gen.expectedIds.length))
  const distractors = [...shuffled(confusable, rnd), ...shuffled(fallback, rnd)].slice(0, nDistract)
  return {
    kind: 'builder',
    prompt: gen.en,
    patternId: gen.pattern.id,
    expectedIds: gen.expectedIds,
    bankIds: shuffled([...gen.expectedIds, ...distractors.map((d) => d.id)], rnd),
    literal: gen.literal,
  }
}

/** How many distinct sentences can the learner theoretically build right now? */
export function combinatorialPower(patterns: Pattern[], learnedWords: Word[]): number {
  let total = 0
  for (const p of patterns) {
    let combos = 1
    let viable = true
    for (const slot of p.slots) {
      const n = slotCandidates(slot, learnedWords).length
      if (!n && !slot.optional) { viable = false; break }
      combos *= Math.max(1, n) + (slot.optional ? 1 : 0)
    }
    if (viable && p.slots.length) total += combos
  }
  return total
}
