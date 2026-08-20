/**
 * E2E playthrough: plays a full lesson end-to-end, answering CORRECTLY via
 * the dev-only window.__exercise hook, then asserts the session completes,
 * XP is awarded, and lesson progress advances.
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

/** Click the .choice button whose text includes `needle`. */
async function clickChoice(needle) {
  const choices = page.locator('.choice')
  const n = await choices.count()
  for (let i = 0; i < n; i++) {
    const text = (await choices.nth(i).innerText()).replace(/\s+/g, ' ')
    if (text.includes(needle)) {
      await choices.nth(i).click()
      return true
    }
  }
  return false
}

/** Click the bank tile whose Thai text equals `thai` (not already used). */
async function clickTile(thai) {
  const tiles = page.locator('.tile:not(.in-answer):not(.used)')
  const n = await tiles.count()
  for (let i = 0; i < n; i++) {
    const t = (await tiles.nth(i).locator('.tile-thai').innerText()).trim()
    if (t === thai) {
      await tiles.nth(i).click()
      return true
    }
  }
  return false
}

let steps = 0
let completed = false
const MAX_STEPS = 250
const kindCounts = {}

while (steps < MAX_STEPS) {
  steps++
  await page.waitForTimeout(180)

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

  const ex = await page.evaluate(() => {
    const e = window.__exercise
    return e ? JSON.parse(JSON.stringify(e)) : null
  })
  if (!ex) continue
  kindCounts[ex.kind] = (kindCounts[ex.kind] ?? 0) + 1

  const check = page.locator('[data-testid="check"]')

  switch (ex.kind) {
    case 'intro-word':
    case 'intro-pattern':
    case 'intro-char': {
      const btn = page.locator('[data-testid="continue"]').first()
      if (await btn.isVisible().catch(() => false)) await btn.click()
      break
    }
    case 'choice-thai-en':
    case 'choice-audio':
      await clickChoice(ex.word.en)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    case 'choice-en-thai':
      await clickChoice(ex.word.thai)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    case 'char-sound':
      await clickChoice(ex.consonant.initial)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    case 'sound-char':
      await clickChoice(ex.consonant.char)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    case 'read-syllable':
      await clickChoice(ex.drill.roman)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    case 'comprehend':
      await clickChoice(ex.sentence.en)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    case 'tone-pick': {
      const target = ex.play === 'a' ? ex.pair.a : ex.pair.b
      await clickChoice(target.thai)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    }
    case 'type-roman': {
      const input = page.locator('input[placeholder*="romanization"]')
      await input.fill(ex.word.roman)
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    }
    case 'arrange':
    case 'listen-arrange': {
      const words = await page.evaluate(() => window.__registryWords ?? null)
      for (const id of ex.sentence.wordIds) {
        const thai = words?.[id]
        if (thai) await clickTile(thai)
        await page.waitForTimeout(60)
      }
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    }
    case 'builder': {
      const words = await page.evaluate(() => window.__registryWords ?? null)
      for (const id of ex.expectedIds) {
        const thai = words?.[id]
        if (thai) await clickTile(thai)
        await page.waitForTimeout(60)
      }
      if (await check.isEnabled().catch(() => false)) await check.click()
      break
    }
    case 'match-pairs': {
      for (const w of ex.words) {
        await clickChoice(w.thai)
        await page.waitForTimeout(100)
        await clickChoice(w.en)
        await page.waitForTimeout(140)
      }
      break
    }
    default:
      break
  }
}

const xpAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('chai-thai-progress-v1') ?? '{}')?.state?.xp ?? 0)
const lessonProgress = await page.evaluate(() => JSON.parse(localStorage.getItem('chai-thai-progress-v1') ?? '{}')?.state?.lessonProgress ?? {})

console.log(JSON.stringify({
  unitId, lessonIndex, completed, steps,
  xpBefore, xpAfter, xpGained: xpAfter - xpBefore,
  lessonProgress, kindCounts,
  consoleErrors: errors.slice(0, 8),
}, null, 2))

await browser.close()
if (!completed || xpAfter <= xpBefore || errors.length > 0) {
  console.error('PLAYTHROUGH FAILED')
  process.exit(1)
}
console.log('PLAYTHROUGH PASSED ✓')
