/**
 * Lesson generation: turns curriculum content + learner state into exercise
 * queues. Progressive structure per unit (5 lessons):
 *   L1–L2  new vocabulary, image-first, recognition → recall
 *   L3     pattern intro + curriculum sentences (arrange)
 *   L4     listening: audio choice, listen-arrange, comprehension
 *   L5     production test: arrange, typing, novel Sentence Builder
 */
import type { ContentRegistry, Unit, Word, Sentence, ScriptLesson, MinimalPair } from '@/content/schema'
import type { CardState } from '@/srs/scheduler'
import { type Exercise, mulberry32, shuffled, pickDistractors } from './exercises'
import { generateBuilderSet, toBuilderExercise } from './builder'

export const LESSONS_PER_UNIT = 5

/** All words from units strictly before `unit`, plus optionally its own. */
export function learnedWordPool(reg: ContentRegistry, unit: Unit, includeSelf: boolean): Word[] {
  const out: Word[] = []
  for (const u of reg.units) {
    if (u.order > unit.order) continue
    if (u.order === unit.order && !includeSelf) continue
    for (const id of u.wordIds) {
      const w = reg.words.get(id)
      if (w) out.push(w)
    }
  }
  return out
}

function wordDrills(w: Word, pool: Word[], rnd: () => number, depth: 'light' | 'full'): Exercise[] {
  const out: Exercise[] = []
  out.push({ kind: 'choice-thai-en', word: w, options: shuffled([w, ...pickDistractors(w, pool, 3, rnd)], rnd) })
  if (depth === 'full') {
    out.push({ kind: 'choice-en-thai', word: w, options: shuffled([w, ...pickDistractors(w, pool, 3, rnd)], rnd) })
    out.push({ kind: 'choice-audio', word: w, options: shuffled([w, ...pickDistractors(w, pool, 3, rnd)], rnd) })
  }
  return out
}

function sentenceExercise(s: Sentence, reg: ContentRegistry, pool: Word[], rnd: () => number, kind: 'arrange' | 'listen-arrange'): Exercise {
  const used = new Set(s.wordIds)
  const distractors = shuffled(pool.filter((w) => !used.has(w.id)), rnd).slice(0, Math.min(3, Math.max(2, 7 - s.wordIds.length)))
  return { kind, sentence: s, distractors }
}

function comprehendExercise(s: Sentence, reg: ContentRegistry, rnd: () => number, audioOnly: boolean): Exercise {
  const others = [...reg.sentences.values()].filter((o) => o.id !== s.id && o.en !== s.en)
  const options = shuffled([s.en, ...shuffled(others, rnd).slice(0, 2).map((o) => o.en)], rnd)
  return { kind: 'comprehend', sentence: s, options, audioOnly }
}

export function generateUnitLesson(
  reg: ContentRegistry,
  unit: Unit,
  lessonIndex: number,
  seed: number,
): Exercise[] {
  const rnd = mulberry32(seed)
  const unitWords = unit.wordIds.map((id) => reg.words.get(id)!).filter(Boolean)
  const priorPool = learnedWordPool(reg, unit, false)
  const fullPool = learnedWordPool(reg, unit, true)
  const sentences = unit.sentenceIds.map((id) => reg.sentences.get(id)!).filter(Boolean)
  const patterns = unit.patternIds.map((id) => reg.patterns.get(id)!).filter(Boolean)
  const ex: Exercise[] = []

  const half = Math.ceil(unitWords.length / 2)
  const distractorPool = fullPool.length >= 8 ? fullPool : unitWords

  if (lessonIndex === 0 || lessonIndex === 1) {
    const chunk = lessonIndex === 0 ? unitWords.slice(0, half) : unitWords.slice(half)
    for (const w of chunk) ex.push({ kind: 'intro-word', word: w })
    // Interleave drills: first light pass in intro order, then full shuffled pass.
    for (const w of chunk) ex.push(...wordDrills(w, distractorPool, rnd, 'light'))
    for (const w of shuffled(chunk, rnd)) ex.push(...wordDrills(w, distractorPool, rnd, 'full').slice(1))
    if (chunk.length >= 3) {
      ex.push({ kind: 'match-pairs', words: shuffled(chunk, rnd).slice(0, Math.min(5, chunk.length)) })
    }
    // Weave in review of prior words (spaced interleaving).
    for (const w of shuffled(priorPool, rnd).slice(0, 2)) {
      ex.push(...wordDrills(w, distractorPool, rnd, 'light'))
    }
  } else if (lessonIndex === 2) {
    for (const p of patterns) ex.push({ kind: 'intro-pattern', pattern: p })
    const exampleSents = shuffled(sentences, rnd).slice(0, 5)
    for (const s of exampleSents) ex.push(sentenceExercise(s, reg, fullPool, rnd, 'arrange'))
    for (const w of shuffled(unitWords, rnd).slice(0, 3)) ex.push(...wordDrills(w, distractorPool, rnd, 'light'))
    if (sentences[0]) ex.push(comprehendExercise(shuffled(sentences, rnd)[0], reg, rnd, false))
  } else if (lessonIndex === 3) {
    const listenSents = shuffled(sentences, rnd).slice(0, 4)
    for (const w of shuffled(unitWords, rnd).slice(0, 4)) {
      ex.push({ kind: 'choice-audio', word: w, options: shuffled([w, ...pickDistractors(w, distractorPool, 3, rnd)], rnd) })
    }
    for (const s of listenSents) ex.push(sentenceExercise(s, reg, fullPool, rnd, 'listen-arrange'))
    for (const s of shuffled(sentences, rnd).slice(0, 2)) ex.push(comprehendExercise(s, reg, rnd, true))
  } else {
    // L5: production. Typing, arranging, then NOVEL builder sentences.
    for (const w of shuffled(unitWords, rnd).slice(0, 3)) ex.push({ kind: 'type-roman', word: w })
    for (const s of shuffled(sentences, rnd).slice(0, 3)) ex.push(sentenceExercise(s, reg, fullPool, rnd, 'arrange'))
    const knownSigs = new Set([...reg.sentences.values()].map((s) => s.wordIds.join('|')))
    const allPatterns = reg.units
      .filter((u) => u.order <= unit.order)
      .flatMap((u) => u.patternIds)
      .map((id) => reg.patterns.get(id)!)
      .filter(Boolean)
    const gens = generateBuilderSet(allPatterns, fullPool, 3, seed + 777, knownSigs)
    for (const g of gens) ex.push(toBuilderExercise(g, fullPool, rnd))
  }

  return ex
}

// ── Script lessons ──

export function generateScriptLesson(reg: ContentRegistry, lesson: ScriptLesson, seed: number): Exercise[] {
  const rnd = mulberry32(seed)
  const ex: Exercise[] = []
  const allCons = reg.consonants
  const newCons = lesson.newChars
    .map((ch) => allCons.find((c) => c.char === ch))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  for (const c of newCons) {
    ex.push({ kind: 'intro-char', consonant: c })
    const distractors = shuffled(allCons.filter((o) => o.char !== c.char && o.initial !== c.initial), rnd).slice(0, 3)
    ex.push({ kind: 'char-sound', consonant: c, options: shuffled([c, ...distractors], rnd) })
  }
  for (const c of shuffled(newCons, rnd)) {
    const distractors = shuffled(allCons.filter((o) => o.char !== c.char && o.initial !== c.initial), rnd).slice(0, 3)
    ex.push({ kind: 'sound-char', consonant: c, options: shuffled([c, ...distractors], rnd) })
  }
  for (const drill of shuffled(lesson.readingDrills, rnd).slice(0, 8)) {
    const wrong = shuffled(
      lesson.readingDrills.filter((d) => d.roman !== drill.roman).map((d) => d.roman),
      rnd,
    ).slice(0, 3)
    while (wrong.length < 3) wrong.push(drill.roman.split('').reverse().join(''))
    ex.push({ kind: 'read-syllable', drill, options: shuffled([drill.roman, ...wrong], rnd) })
  }
  if (lesson.kind === 'tones' && reg.minimalPairs.length) {
    for (const pair of shuffled(reg.minimalPairs, rnd).slice(0, 4)) {
      ex.push({ kind: 'tone-pick', pair, play: rnd() < 0.5 ? 'a' : 'b' })
    }
  }
  return ex
}

// ── Ear training (minimal pairs session) ──

export function generateEarTraining(pairs: MinimalPair[], count: number, seed: number): Exercise[] {
  const rnd = mulberry32(seed)
  return shuffled(pairs, rnd)
    .slice(0, count)
    .map((pair): Exercise => ({ kind: 'tone-pick', pair, play: rnd() < 0.5 ? 'a' : 'b' }))
}

// ── Review session from due SRS cards ──

export function generateReviewSession(reg: ContentRegistry, due: CardState[], seed: number): Exercise[] {
  const rnd = mulberry32(seed)
  const allWords = [...reg.words.values()]
  const ex: Exercise[] = []
  for (const card of due) {
    if (card.itemType === 'word') {
      const w = reg.words.get(card.itemId)
      if (!w) continue
      const variants: Exercise[] = [
        { kind: 'choice-thai-en', word: w, options: shuffled([w, ...pickDistractors(w, allWords, 3, rnd)], rnd) },
        { kind: 'choice-en-thai', word: w, options: shuffled([w, ...pickDistractors(w, allWords, 3, rnd)], rnd) },
        { kind: 'choice-audio', word: w, options: shuffled([w, ...pickDistractors(w, allWords, 3, rnd)], rnd) },
        { kind: 'type-roman', word: w },
      ]
      // Stronger memories get harder exercise forms.
      const idx = Math.min(variants.length - 1, Math.floor(card.streak / 2) + (rnd() < 0.4 ? 1 : 0))
      ex.push(variants[idx])
    } else if (card.itemType === 'sentence') {
      const s = reg.sentences.get(card.itemId)
      if (!s) continue
      const pool = allWords
      ex.push(
        rnd() < 0.5
          ? sentenceExercise(s, reg, pool, rnd, 'arrange')
          : sentenceExercise(s, reg, pool, rnd, 'listen-arrange'),
      )
    } else if (card.itemType === 'char') {
      const c = reg.consonants.find((c) => c.char === card.itemId)
      if (!c) continue
      const distractors = shuffled(reg.consonants.filter((o) => o.char !== c.char && o.initial !== c.initial), rnd).slice(0, 3)
      ex.push(
        rnd() < 0.5
          ? { kind: 'char-sound', consonant: c, options: shuffled([c, ...distractors], rnd) }
          : { kind: 'sound-char', consonant: c, options: shuffled([c, ...distractors], rnd) },
      )
    } else if (card.itemType === 'pair') {
      const pair = reg.minimalPairs.find((p) => p.id === card.itemId)
      if (pair) ex.push({ kind: 'tone-pick', pair, play: rnd() < 0.5 ? 'a' : 'b' })
    }
  }
  return shuffled(ex, rnd)
}
