/**
 * Game-style screen router (zustand). Full-screen scenes with transitions —
 * no URL routing needed; the app is a self-contained experience.
 */
import { create } from 'zustand'

export type Screen =
  | { name: 'onboarding' }
  | { name: 'home' }
  | { name: 'unit'; unitId: string }
  | { name: 'lesson'; unitId: string; lessonIndex: number }
  | { name: 'script' }
  | { name: 'script-lesson'; lessonId: string }
  | { name: 'builder' }
  | { name: 'review' }
  | { name: 'ear' }
  | { name: 'profile' }
  | { name: 'session-end' }

interface RouterState {
  screen: Screen
  prev: Screen | null
  go(screen: Screen): void
  back(): void
}

export const useRouter = create<RouterState>()((set, get) => ({
  screen: { name: 'home' },
  prev: null,
  go(screen) {
    set({ prev: get().screen, screen })
    window.scrollTo({ top: 0 })
  },
  back() {
    const { prev } = get()
    set({ screen: prev ?? { name: 'home' }, prev: null })
  },
}))
