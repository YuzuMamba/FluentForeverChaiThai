/**
 * E2E playthrough: plays a full lesson end-to-end by tapping through every
 * exercise (answers may be wrong — the requeue system must still converge),
 * then asserts the session completes and XP is awarded.
 *
 * Usage: node scripts/playthrough.mjs [unitId] [lessonIndex]
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:5173'
const unitId = process.argv[2] ?? 'u01'
const lessonIndex = Number(process.argv[3] ?? 0)

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
})
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => window.__seed?.({ onboarded: true }))
await page.evaluate(
  ([u, l]) => window.__nav?.({ name: 'lesson', unitId: u, lessonIndex: l }),
  [unitId, lessonIndex],
)
await page.waitForTimeout(1500)

const xpBefore = await page.evaluate(() => JSON.parse(localStorage.getItem('chai-thai-progress-v1') ?? '{}')?.state?.xp ?? 0)

let steps = 0
let completed = false
const MAX_STEPS = 400

while (steps < MAX_STEPS) {
  steps++
  await page.waitForTimeout(220)

  // Session complete? (end screen has "Lesson complete!"/"Perfect lesson!")
  const endVisible = await page.locator('text=/lesson complete|perfect lesson/i').first().isVisible().catch(() => false)
  if (endVisible) {
    completed = true
    break
  }

  // Feedback banner up → Continue.
  const feedbackContinue = page.locator('.feedback [data-testid="continue"]')
  if (await feedbackContinue.isVisible().catch(() => false)) {
    await feedbackContinue.click()
    continue
  }

  // Intro card → Got it / Continue.
  const intro = page.locator('[data-testid="continue"]').first()
  if (await intro.isVisible().catch(() => false)) {
    await intro.click()
    continue
  }

  // Match pairs: click cards until cleared (brute force pairing).
  const matchHeader = await page.locator('text=Match the pairs').isVisible().catch(() => false)
  if (matchHeader) {
    const cards = page.locator('.choice:not(.correct)')
    const n = await cards.count()
    if (n >= 2) {
      // Click first available, then try others until a pair clears.
      await cards.nth(0).click()
      for (let i = 1; i < n; i++) {
        await cards.nth(i).click()
        await page.waitForTimeout(140)
      }
    }
    continue
  }

  // Choice exercise: pick option 1, then Check.
  const check = page.locator('[data-testid="check"]')
  const choices = page.locator('.choice')
  if ((await choices.count()) > 0) {
    await choices.first().click()
    await page.waitForTimeout(120)
    if (await check.isEnabled().catch(() => false)) await check.click()
    continue
  }

  // Typing exercise: type the hinted romanization start (wrong is fine).
  const input = page.locator('input[placeholder*="romanization"]')
  if (await input.isVisible().catch(() => false)) {
    await input.fill('test')
    if (await check.isEnabled().catch(() => false)) await check.click()
    continue
  }

  // Arrange/builder: tap every bank tile then Check.
  const bankTiles = page.locator('.tile:not(.in-answer):not(.used)')
  const bankCount = await bankTiles.count()
  if (bankCount > 0) {
    for (let i = 0; i < bankCount; i++) {
      await page.locator('.tile:not(.in-answer):not(.used)').first().click().catch(() => {})
      await page.waitForTimeout(80)
    }
    if (await check.isEnabled().catch(() => false)) await check.click()
    continue
  }
}

const xpAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('chai-thai-progress-v1') ?? '{}')?.state?.xp ?? 0)
const lessonProgress = await page.evaluate(() => JSON.parse(localStorage.getItem('chai-thai-progress-v1') ?? '{}')?.state?.lessonProgress ?? {})

console.log(JSON.stringify({
  unitId,
  lessonIndex,
  completed,
  steps,
  xpBefore,
  xpAfter,
  xpGained: xpAfter - xpBefore,
  lessonProgress,
  consoleErrors: errors.slice(0, 8),
}, null, 2))

await browser.close()
if (!completed || xpAfter <= xpBefore || errors.length > 0) {
  console.error('PLAYTHROUGH FAILED')
  process.exit(1)
}
console.log('PLAYTHROUGH PASSED ✓')
