/**
 * Content registry — aggregates the full curriculum.
 * Each unit module exports { unit, words, sentences, patterns }.
 */
import type { ContentRegistry, Pattern, Sentence, Unit, Word } from './schema'
import { validateRegistry } from './validate'

import u01 from './units/u01'
import u02 from './units/u02'
import u03 from './units/u03'
import u04 from './units/u04'
import u05 from './units/u05'
import u06 from './units/u06'
import u07 from './units/u07'
import u08 from './units/u08'
import u09 from './units/u09'
import u10 from './units/u10'
import u11 from './units/u11'
import u12 from './units/u12'
import u13 from './units/u13'
import u14 from './units/u14'
import u15 from './units/u15'
import u16 from './units/u16'
import u17 from './units/u17'
import u18 from './units/u18'
import u19 from './units/u19'
import u20 from './units/u20'

import { consonants, vowels } from './script/alphabet'
import { scriptLessons } from './script/lessons'
import { minimalPairs } from './script/minimalPairs'

export interface UnitModule {
  unit: Unit
  words: Word[]
  sentences: Sentence[]
  patterns: Pattern[]
}

const unitModules: UnitModule[] = [
  u01, u02, u03, u04, u05, u06, u07, u08, u09, u10,
  u11, u12, u13, u14, u15, u16, u17, u18, u19, u20,
]

function buildRegistry(): ContentRegistry {
  const words = new Map<string, Word>()
  const sentences = new Map<string, Sentence>()
  const patterns = new Map<string, Pattern>()
  const units: Unit[] = []

  for (const m of unitModules) {
    for (const w of m.words) words.set(w.id, w)
    for (const s of m.sentences) sentences.set(s.id, s)
    for (const p of m.patterns) patterns.set(p.id, p)
    units.push(m.unit)
  }
  units.sort((a, b) => a.order - b.order)

  return { words, sentences, patterns, units, scriptLessons, consonants, vowels, minimalPairs }
}

export const registry: ContentRegistry = buildRegistry()

if (import.meta.env?.DEV) {
  const errors = validateRegistry(registry)
  if (errors.length) {
    // eslint-disable-next-line no-console
    console.warn(`[content] ${errors.length} validation issue(s):\n` + errors.slice(0, 40).join('\n'))
  }
}

export * from './schema'
