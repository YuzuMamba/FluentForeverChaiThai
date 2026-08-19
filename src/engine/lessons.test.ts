import { describe, expect, it } from 'vitest'
import { registry } from '@/content'
import { generateUnitLesson, generateReviewSession, learnedWordPool, LESSONS_PER_UNIT } from './lessons'
import { exerciseItemId } from './exercises'
import { newCard, review } from '@/srs/scheduler'

describe('lesson generation', () => {
  it('generates a full 5-lesson arc for unit 1', () => {
    const u01 = registry.units.find((u) => u.id === 'u01')!
    for (let i = 0; i < LESSONS_PER_UNIT; i++) {
      const ex = generateUnitLesson(registry, u01, i, 42)
      expect(ex.length, `lesson ${i} should have exercises`).toBeGreaterThanOrEqual(6)
    }
  })

  it('lesson 1 introduces words before drilling them', () => {
    const u01 = registry.units.find((u) => u.id === 'u01')!
    const ex = generateUnitLesson(registry, u01, 0, 7)
    const firstIntro = ex.findIndex((e) => e.kind === 'intro-word')
    const firstDrill = ex.findIndex((e) => e.kind !== 'intro-word')
    expect(firstIntro).toBe(0)
    expect(firstDrill).toBeGreaterThan(0)
  })

  it('choice exercises always contain the right answer exactly once', () => {
    const u01 = registry.units.find((u) => u.id === 'u01')!
    for (let seed = 1; seed < 6; seed++) {
      for (const ex of generateUnitLesson(registry, u01, 0, seed)) {
        if (ex.kind === 'choice-thai-en' || ex.kind === 'choice-en-thai' || ex.kind === 'choice-audio') {
          const hits = ex.options.filter((o) => o.id === ex.word.id).length
          expect(hits).toBe(1)
          expect(new Set(ex.options.map((o) => o.en)).size).toBe(ex.options.length)
        }
      }
    }
  })

  it('review sessions produce an exercise per due card', () => {
    const u01 = registry.units.find((u) => u.id === 'u01')!
    const now = Date.now()
    const due = u01.wordIds.slice(0, 5).map((id) => {
      let c = newCard(id, 'word', 'u01')
      c = review(c, 2, now - 3 * 24 * 3600 * 1000)
      c = review(c, 2, now - 2 * 24 * 3600 * 1000)
      return { ...c, due: now - 1000 }
    })
    const ex = generateReviewSession(registry, due, 99)
    expect(ex.length).toBe(5)
    const covered = new Set(ex.map((e) => exerciseItemId(e)))
    for (const c of due) expect(covered.has(c.itemId)).toBe(true)
  })

  it('learned pool grows with unit order', () => {
    const units = registry.units
    if (units.length >= 2) {
      const a = learnedWordPool(registry, units[0], true).length
      const b = learnedWordPool(registry, units[units.length - 1], true).length
      expect(b).toBeGreaterThanOrEqual(a)
    }
  })
})
