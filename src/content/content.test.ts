import { describe, expect, it } from 'vitest'
import { registry } from './index'
import { validateRegistry } from './validate'
import { generateBuilderSet } from '@/engine/builder'
import { learnedWordPool } from '@/engine/lessons'

describe('content integrity', () => {
  it('registry validates with zero errors', () => {
    const errors = validateRegistry(registry)
    expect(errors, errors.join('\n')).toEqual([])
  })

  it('every unit has substantial content', () => {
    for (const u of registry.units) {
      expect(u.wordIds.length, `${u.id} needs >= 8 words`).toBeGreaterThanOrEqual(8)
      expect(u.sentenceIds.length, `${u.id} needs >= 6 sentences`).toBeGreaterThanOrEqual(6)
      expect(u.grammarNotes.length, `${u.id} needs grammar notes`).toBeGreaterThanOrEqual(1)
      expect(u.dialogues.length, `${u.id} needs a dialogue`).toBeGreaterThanOrEqual(1)
    }
  })

  it('curriculum reaches conversational scale', () => {
    expect(registry.words.size).toBeGreaterThanOrEqual(280)
    expect(registry.sentences.size).toBeGreaterThanOrEqual(160)
    expect(registry.patterns.size).toBeGreaterThanOrEqual(24)
  })

  it('script course is complete', () => {
    expect(registry.consonants.length).toBeGreaterThanOrEqual(42)
    expect(registry.vowels.length).toBeGreaterThanOrEqual(16)
    expect(registry.scriptLessons.length).toBeGreaterThanOrEqual(10)
    expect(registry.minimalPairs.length).toBeGreaterThanOrEqual(10)
  })

  it('sentence builder can generate novel sentences at every stage', () => {
    for (const u of registry.units) {
      if (u.order < 4) continue
      const pool = learnedWordPool(registry, u, true)
      const patterns = registry.units
        .filter((x) => x.order <= u.order)
        .flatMap((x) => x.patternIds)
        .map((id) => registry.patterns.get(id)!)
        .filter(Boolean)
      const known = new Set([...registry.sentences.values()].map((s) => s.wordIds.join('|')))
      const gens = generateBuilderSet(patterns, pool, 5, 42, known)
      expect(gens.length, `unit ${u.id} should support novel generation`).toBeGreaterThanOrEqual(3)
      for (const g of gens) {
        expect(known.has(g.expectedIds.join('|')), `generated sentence must be novel`).toBe(false)
      }
    }
  })
})
