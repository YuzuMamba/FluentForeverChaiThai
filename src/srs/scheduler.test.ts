import { describe, expect, it } from 'vitest'
import { buildQueue, gradeFromResult, isDue, memoryStrength, newCard, review } from './scheduler'

const DAY = 24 * 60 * 60 * 1000

describe('SRS scheduler', () => {
  it('graduates through learning steps to review', () => {
    const t0 = Date.now()
    let c = newCard('w.eat', 'word', 'u04')
    expect(c.stage).toBe('new')
    c = review(c, 2, t0)
    expect(c.stage).toBe('learning')
    expect(c.due - t0).toBeLessThanOrEqual(11 * 60 * 1000)
    c = review(c, 2, t0 + 10 * 60 * 1000)
    expect(c.stage).toBe('review')
    expect(c.interval).toBeGreaterThanOrEqual(1)
  })

  it('intervals grow with Good and shrink ease on lapse', () => {
    const t0 = Date.now()
    let c = newCard('w.go', 'word', 'u07')
    c = review(c, 2, t0)
    c = review(c, 2, t0)
    const i1 = c.interval
    c = review(c, 2, c.due)
    expect(c.interval).toBeGreaterThan(i1)
    const easeBefore = c.ease
    c = review(c, 0, c.due)
    expect(c.stage).toBe('relearning')
    expect(c.ease).toBeLessThan(easeBefore)
    expect(c.lapses).toBe(1)
  })

  it('easy graduates immediately with a long interval', () => {
    let c = newCard('w.hot', 'word', 'u16')
    c = review(c, 3, Date.now())
    expect(c.stage).toBe('review')
    expect(c.interval).toBeGreaterThanOrEqual(4)
  })

  it('memory strength decays over time', () => {
    const t0 = Date.now()
    let c = newCard('w.rain', 'word', 'u16')
    c = review(c, 2, t0)
    c = review(c, 2, t0 + 10 * 60 * 1000)
    const fresh = memoryStrength(c, t0 + 11 * 60 * 1000)
    const stale = memoryStrength(c, t0 + 30 * DAY)
    expect(fresh).toBeGreaterThan(stale)
  })

  it('queue puts overdue first and tops up with new', () => {
    const now = Date.now()
    const cards = [
      { ...newCard('a', 'word', 'u01'), stage: 'review' as const, due: now - DAY, interval: 3 },
      { ...newCard('b', 'word', 'u01'), stage: 'review' as const, due: now - 2 * DAY, interval: 3 },
      newCard('c', 'word', 'u01'),
    ]
    const q = buildQueue(cards, now)
    expect(q.due.map((c) => c.itemId)).toEqual(['b', 'a'])
    expect(q.fresh.map((c) => c.itemId)).toEqual(['c'])
    expect(isDue(cards[2], now)).toBe(false)
  })

  it('maps exercise results to grades sensibly', () => {
    expect(gradeFromResult('recognition', false)).toBe(0)
    expect(gradeFromResult('recognition', true)).toBe(2)
    expect(gradeFromResult('production', true, { fast: true })).toBe(3)
    expect(gradeFromResult('production', true, { usedHint: true })).toBe(1)
  })
})
