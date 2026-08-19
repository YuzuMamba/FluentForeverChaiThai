/**
 * Contract between SessionRunner and exercise renderers.
 * A renderer shows the exercise, manages its own selection state, and calls
 * submit() exactly once; SessionRunner then shows feedback + Continue.
 */
import type { Exercise } from '@/engine/exercises'

export interface ExerciseApi {
  /** Submit the learner's answer. */
  submit: (correct: boolean, opts?: { usedHint?: boolean; answerShown?: { thai: string; roman?: string; en?: string }; detail?: string }) => void
  /** Advance intro-style cards that have no answer. */
  continueIntro: () => void
  /** True once feedback is showing (lock inputs). */
  locked: boolean
}

export interface RendererProps<E extends Exercise = Exercise> {
  exercise: E
  api: ExerciseApi
  /** Increments per exercise — reset internal state on change. */
  exerciseKey: number
}
