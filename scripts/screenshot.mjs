/**
 * Screenshot harness for visual QA.
 *
 * Usage:
 *   node scripts/screenshot.mjs                    # all scenarios, desktop+mobile
 *   node scripts/screenshot.mjs home lesson        # only these scenarios
 *   BASE=http://localhost:4173 node scripts/screenshot.mjs
 *
 * Output: shots/<scenario>-<viewport>.png
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:5173'
const OUT = process.env.OUT ?? 'shots'

/** Seed: an engaged learner mid-course, so screens show real living state. */
/** SRS cards so Review/Profile show a living learner state. */
function seedCards() {
  const now = Date.now()
  const DAY = 86400000
  const words = [
    'w.hello', 'w.polite-m', 'w.polite-f', 'w.thanks', 'w.sorry', 'w.yes', 'w.not',
    'w.i-m', 'w.i-f', 'w.you', 'w.fine', 'w.q-mai', 'w.see-you',
    'w.name', 'w.what', 'w.he-she', 'w.we', 'w.friend', 'w.person', 'w.of',
  ]
  const cards = {}
  words.forEach((id, i) => {
    const mastered = i < 6
    const due = i >= 6 && i < 11
    cards[id] = {
      itemId: id,
      itemType: 'word',
      deckId: i < 13 ? 'u01' : 'u02',
      stage: 'review',
      due: due ? now - (i - 5) * DAY * 0.5 : now + (i + 2) * DAY,
      interval: mastered ? 25 + i : 2 + i,
      ease: 2.5,
      reps: mastered ? 9 : 4,
      lapses: i % 4 === 3 ? 1 : 0,
      streak: mastered ? 6 : 2,
      lastReviewed: now - DAY * (due ? 3 : 1),
    }
  })
  return cards
}

const SEED = {
  onboarded: true,
  cards: seedCards(),
  xp: 1240,
  gems: 86,
  streakDays: 12,
  bestStreak: 15,
  lastActiveDay: new Date().toISOString().slice(0, 10),
  dailyGoalXp: 50,
  lessonProgress: { u01: 5, u02: 5, u03: 3, u04: 1 },
  completedUnits: ['u01', 'u02'],
  completedScriptLessons: ['sc01'],
  history: Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    return {
      day: d.toISOString().slice(0, 10),
      xp: [55, 80, 0, 62, 120, 75, 58, 90, 66, 0, 104, 71, 88, 35][i],
      reviews: [12, 20, 0, 15, 31, 18, 14, 22, 16, 0, 26, 17, 21, 8][i],
    }
  }),
}

const SCENARIOS = {
  onboarding: { nav: { name: 'onboarding' }, seed: { onboarded: false } },
  home: { nav: { name: 'home' } },
  lesson: { nav: { name: 'lesson', unitId: 'u01', lessonIndex: 0 } },
  'lesson-mid': {
    nav: { name: 'lesson', unitId: 'u01', lessonIndex: 2 },
    after: async (page) => {
      // Advance past the intro card if a continue button exists.
      for (let i = 0; i < 2; i++) {
        const btn = page.locator('[data-testid="continue"], button:has-text("Continue")').first()
        if (await btn.isVisible().catch(() => false)) {
          await btn.click()
          await page.waitForTimeout(700)
        }
      }
    },
  },
  'session-end': {
    nav: { name: 'lesson', unitId: 'u01', lessonIndex: 0 },
    after: async (page) => {
      await page.evaluate(() => window.__sessionEnd?.())
      await page.waitForTimeout(1200)
    },
  },
  script: { nav: { name: 'script' } },
  'script-lesson': { nav: { name: 'script-lesson', lessonId: 'sc01' } },
  builder: { nav: { name: 'builder' } },
  review: { nav: { name: 'review' } },
  ear: { nav: { name: 'ear' } },
  profile: { nav: { name: 'profile' } },
}

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const names = only.length ? only : Object.keys(SCENARIOS)

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
})

for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })

  for (const name of names) {
    const sc = SCENARIOS[name]
    if (!sc) {
      console.error(`unknown scenario: ${name}`)
      continue
    }
    await page.goto(BASE, { waitUntil: 'networkidle' })
    await page.evaluate((seed) => {
      window.__seed?.(seed)
    }, { ...SEED, ...(sc.seed ?? {}) })
    await page.waitForTimeout(150)
    await page.evaluate((nav) => window.__nav?.(nav), sc.nav)
    await page.waitForTimeout(1800) // let animations settle, 3D warm up
    await sc.after?.(page)
    await page.screenshot({ path: `${OUT}/${name}-${vpName}.png` })
    console.log(`✓ ${name}-${vpName}`)
  }

  if (errors.length) {
    console.error(`\n[${vpName}] console/page errors:`)
    for (const e of errors.slice(0, 20)) console.error('  ' + e.split('\n')[0])
  }
  await ctx.close()
}

await browser.close()
console.log(`\nDone → ${OUT}/`)
