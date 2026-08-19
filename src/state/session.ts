/**
 * Live lesson session state machine.
 * Wrong answers re-queue near the end (you must get everything right to
 * finish), combos build, XP accrues, and every graded exercise feeds the SRS.
 */
import { create } from 'zustand'
import { type Exercise, exerciseItemId, exerciseMode } from '@/engine/exercises'
import { gradeFromResult } from '@/srs/scheduler'
import { useProgress } from './progress'
import { sfx } from '@/audio/sfx'

export type SessionType = 'lesson' | 'review' | 'script' | 'builder' | 'ear'

export interface SessionMeta {
  type: SessionType
  unitId?: string
  lessonIndex?: number
  scriptLessonId?: string
  title: string
}

export interface SessionResult {
  correct: number
  wrong: number
  xp: number
  maxCombo: number
  perfect: boolean
  durationMs: number
}

interface SessionState {
  status: 'idle' | 'active' | 'complete'
  meta: SessionMeta | null
  queue: Exercise[]
  index: number
  /** Total answerable exercises for the progress bar (intros excluded). */
  totalGraded: number
  answered: number
  correct: number
  wrong: number
  combo: number
  maxCombo: number
  xpEarned: number
  startedAt: number
  requeued: Set<string>
  /** The current exercise's resolution, shown in the feedback banner. */
  feedback: { correct: boolean; detail?: string } | null

  start(meta: SessionMeta, exercises: Exercise[]): void
  submit(correct: boolean, opts?: { usedHint?: boolean; fastMs?: number }): void
  advance(): void
  abort(): void
  result(): SessionResult
}

function countGraded(queue: Exercise[]): number {
  return queue.filter((e) => e.kind !== 'intro-word' && e.kind !== 'intro-pattern' && e.kind !== 'intro-char').length
}

export const useSession = create<SessionState>()((set, get) => ({
  status: 'idle',
  meta: null,
  queue: [],
  index: 0,
  totalGraded: 0,
  answered: 0,
  correct: 0,
  wrong: 0,
  combo: 0,
  maxCombo: 0,
  xpEarned: 0,
  startedAt: 0,
  requeued: new Set<string>(),
  feedback: null,

  start(meta, exercises) {
    set({
      status: 'active',
      meta,
      queue: exercises,
      index: 0,
      totalGraded: countGraded(exercises),
      answered: 0,
      correct: 0,
      wrong: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      startedAt: Date.now(),
      requeued: new Set(),
      feedback: null,
    })
  },

  submit(isCorrect, opts = {}) {
    const s = get()
    const ex = s.queue[s.index]
    if (!ex || s.feedback) return

    const itemId = exerciseItemId(ex)
    const progress = useProgress.getState()
    if (itemId) {
      const grade = gradeFromResult(exerciseMode(ex), isCorrect, {
        usedHint: opts.usedHint,
        fast: opts.fastMs !== undefined && opts.fastMs < 6000,
      })
      progress.gradeCard(itemId, grade)
    }

    let { combo, maxCombo, xpEarned, correct, wrong, queue, requeued } = s
    if (isCorrect) {
      combo += 1
      maxCombo = Math.max(maxCombo, combo)
      correct += 1
      const comboBonus = combo >= 10 ? 5 : combo >= 5 ? 2 : 0
      const base = exerciseMode(ex) === 'production' ? 12 : 8
      xpEarned += base + comboBonus
      if (progress.settings.sound) sfx.play(combo > 0 && combo % 5 === 0 ? 'combo' : 'correct')
    } else {
      combo = 0
      wrong += 1
      if (progress.settings.sound) sfx.play('wrong')
      // Re-queue the missed exercise near the end (once per exercise).
      const key = `${ex.kind}:${itemId ?? s.index}`
      if (!requeued.has(key)) {
        requeued = new Set(requeued)
        requeued.add(key)
        queue = [...queue, ex]
      }
    }

    set({
      combo, maxCombo, xpEarned, correct, wrong, queue, requeued,
      answered: s.answered + 1,
      totalGraded: countGraded(queue),
      feedback: { correct: isCorrect },
    })
  },

  advance() {
    const s = get()
    const nextIndex = s.index + 1
    if (nextIndex >= s.queue.length) {
      const progress = useProgress.getState()
      const perfectBonus = s.wrong === 0 ? 10 : 0
      const total = s.xpEarned + perfectBonus
      progress.addXp(total)
      progress.addGems(Math.round(total / 10) + (s.wrong === 0 ? 5 : 0))
      if (s.meta?.type === 'lesson' && s.meta.unitId != null && s.meta.lessonIndex != null) {
        progress.completeLesson(s.meta.unitId, s.meta.lessonIndex, 5)
      }
      if (s.meta?.type === 'script' && s.meta.scriptLessonId) {
        progress.completeScriptLesson(s.meta.scriptLessonId, 0)
      }
      if (progress.settings.sound) sfx.play('complete')
      set({ status: 'complete', xpEarned: total, feedback: null })
      return
    }
    set({ index: nextIndex, feedback: null })
  },

  abort() {
    set({ status: 'idle', meta: null, queue: [], index: 0, feedback: null })
  },

  result() {
    const s = get()
    return {
      correct: s.correct,
      wrong: s.wrong,
      xp: s.xpEarned,
      maxCombo: s.maxCombo,
      perfect: s.wrong === 0 && s.answered > 0,
      durationMs: Date.now() - s.startedAt,
    }
  },
}))
