/**
 * Persistent learner state: SRS cards, XP, streak, unlocks, settings.
 * Everything derived (due counts, mastery, unlock gates) lives in selectors.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type CardState, type Grade, type ItemType, newCard, review, isDue, isMastered, memoryStrength } from '@/srs/scheduler'

export type RomanizationMode = 'full' | 'toneless' | 'hidden'

export interface Settings {
  sound: boolean
  ttsRate: number
  romanization: RomanizationMode
  reducedMotion: boolean
}

export interface DayStat {
  /** 'YYYY-MM-DD' */
  day: string
  xp: number
  reviews: number
}

interface ProgressState {
  cards: Record<string, CardState>
  xp: number
  gems: number
  streakDays: number
  bestStreak: number
  lastActiveDay: string
  history: DayStat[]
  /** unit ids with all lessons completed */
  completedUnits: string[]
  /** lessons completed per unit: { u01: 3 } */
  lessonProgress: Record<string, number>
  scriptProgress: Record<string, number>
  completedScriptLessons: string[]
  dailyGoalXp: number
  settings: Settings
  onboarded: boolean

  // actions
  ensureCards(items: Array<{ id: string; type: ItemType; deckId: string }>): void
  gradeCard(itemId: string, grade: Grade): void
  addXp(amount: number): void
  addGems(amount: number): void
  completeLesson(unitId: string, lessonIndex: number, totalLessons: number): void
  completeScriptLesson(lessonId: string, lessonIndex: number): void
  setSettings(patch: Partial<Settings>): void
  setOnboarded(v: boolean): void
  resetAll(): void
}

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return todayKey(d)
}

const defaultSettings: Settings = {
  sound: true,
  ttsRate: 0.92,
  romanization: 'full',
  reducedMotion: false,
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      cards: {},
      xp: 0,
      gems: 0,
      streakDays: 0,
      bestStreak: 0,
      lastActiveDay: '',
      history: [],
      completedUnits: [],
      lessonProgress: {},
      scriptProgress: {},
      completedScriptLessons: [],
      dailyGoalXp: 50,
      settings: defaultSettings,
      onboarded: false,

      ensureCards(items) {
        const cards = { ...get().cards }
        let changed = false
        for (const it of items) {
          if (!cards[it.id]) {
            cards[it.id] = newCard(it.id, it.type, it.deckId)
            changed = true
          }
        }
        if (changed) set({ cards })
      },

      gradeCard(itemId, grade) {
        const state = get()
        const card = state.cards[itemId]
        if (!card) return
        const updated = review(card, grade, Date.now())
        const day = todayKey()
        const history = [...state.history]
        const last = history[history.length - 1]
        if (last && last.day === day) {
          history[history.length - 1] = { ...last, reviews: last.reviews + 1 }
        } else {
          history.push({ day, xp: 0, reviews: 1 })
        }
        set({ cards: { ...state.cards, [itemId]: updated }, history })
      },

      addXp(amount) {
        const state = get()
        const day = todayKey()
        let { streakDays, bestStreak, lastActiveDay } = state
        if (lastActiveDay !== day) {
          streakDays = lastActiveDay === yesterdayKey() ? streakDays + 1 : 1
          bestStreak = Math.max(bestStreak, streakDays)
          lastActiveDay = day
        }
        const history = [...state.history]
        const last = history[history.length - 1]
        if (last && last.day === day) {
          history[history.length - 1] = { ...last, xp: last.xp + amount }
        } else {
          history.push({ day, xp: amount, reviews: 0 })
        }
        set({ xp: state.xp + amount, streakDays, bestStreak, lastActiveDay, history: history.slice(-90) })
      },

      addGems(amount) {
        set((s) => ({ gems: s.gems + amount }))
      },

      completeLesson(unitId, lessonIndex, totalLessons) {
        const state = get()
        const current = state.lessonProgress[unitId] ?? 0
        const next = Math.max(current, lessonIndex + 1)
        const completedUnits =
          next >= totalLessons && !state.completedUnits.includes(unitId)
            ? [...state.completedUnits, unitId]
            : state.completedUnits
        set({ lessonProgress: { ...state.lessonProgress, [unitId]: next }, completedUnits })
      },

      completeScriptLesson(lessonId, lessonIndex) {
        const state = get()
        if (!state.completedScriptLessons.includes(lessonId)) {
          set({ completedScriptLessons: [...state.completedScriptLessons, lessonId] })
        }
      },

      setSettings(patch) {
        set((s) => ({ settings: { ...s.settings, ...patch } }))
      },

      setOnboarded(v) {
        set({ onboarded: v })
      },

      resetAll() {
        set({
          cards: {}, xp: 0, gems: 0, streakDays: 0, bestStreak: 0, lastActiveDay: '',
          history: [], completedUnits: [], lessonProgress: {}, scriptProgress: {},
          completedScriptLessons: [], settings: defaultSettings, onboarded: false,
        })
      },
    }),
    { name: 'chai-thai-progress-v1' },
  ),
)

// ── Selectors ──

export function selectDueCount(cards: Record<string, CardState>): number {
  const now = Date.now()
  return Object.values(cards).filter((c) => isDue(c, now)).length
}

export function selectDeckStats(cards: Record<string, CardState>, deckId: string) {
  const now = Date.now()
  const deck = Object.values(cards).filter((c) => c.deckId === deckId)
  const due = deck.filter((c) => isDue(c, now)).length
  const mastered = deck.filter((c) => isMastered(c)).length
  const learning = deck.filter((c) => c.stage !== 'new').length
  const strength = deck.length
    ? deck.reduce((sum, c) => sum + memoryStrength(c, now), 0) / deck.length
    : 0
  return { total: deck.length, due, mastered, learning, strength }
}

export function selectTodayXp(history: DayStat[]): number {
  const last = history[history.length - 1]
  return last && last.day === todayKey() ? last.xp : 0
}

/** Level curve: level n needs 100 * n^1.35 cumulative XP. */
export function levelFromXp(xp: number): { level: number; into: number; needed: number } {
  let level = 1
  let cum = 0
  for (;;) {
    const req = Math.round(100 * Math.pow(level, 1.35))
    if (cum + req > xp) return { level, into: xp - cum, needed: req }
    cum += req
    level++
  }
}
