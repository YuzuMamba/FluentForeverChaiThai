import { Suspense, lazy, useEffect } from 'react'
import { useRouter } from '@/state/router'
import { useProgress } from '@/state/progress'

const HomeScreen = lazy(() => import('@/screens/HomeScreen'))
const LessonScreen = lazy(() => import('@/screens/LessonScreen'))
const ScriptScreen = lazy(() => import('@/screens/ScriptScreen'))
const ScriptLessonScreen = lazy(() => import('@/screens/ScriptLessonScreen'))
const BuilderScreen = lazy(() => import('@/screens/BuilderScreen'))
const ReviewScreen = lazy(() => import('@/screens/ReviewScreen'))
const EarScreen = lazy(() => import('@/screens/EarScreen'))
const ProfileScreen = lazy(() => import('@/screens/ProfileScreen'))
const OnboardingScreen = lazy(() => import('@/screens/OnboardingScreen'))

function ScreenRouter() {
  const screen = useRouter((s) => s.screen)
  const onboarded = useProgress((s) => s.onboarded)

  if (!onboarded && screen.name === 'home') return <OnboardingScreen />

  switch (screen.name) {
    case 'onboarding': return <OnboardingScreen />
    case 'home': return <HomeScreen />
    case 'lesson': return <LessonScreen unitId={screen.unitId} lessonIndex={screen.lessonIndex} />
    case 'script': return <ScriptScreen />
    case 'script-lesson': return <ScriptLessonScreen lessonId={screen.lessonId} />
    case 'builder': return <BuilderScreen />
    case 'review': return <ReviewScreen />
    case 'ear': return <EarScreen />
    case 'profile': return <ProfileScreen />
    default: return <HomeScreen />
  }
}

function LoadingFallback() {
  return (
    <div style={{
      height: '100vh', display: 'grid', placeItems: 'center',
      background: 'var(--bg-0)',
    }}>
      <div className="anim-pop" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56, animation: 'float-y 2s ease-in-out infinite' }}>🐘</div>
        <div style={{ color: 'var(--text-2)', fontWeight: 700, letterSpacing: '0.08em', marginTop: 12 }}>
          LOADING…
        </div>
      </div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    document.title = 'Chai Thai — Learn Thai for Real Life'
    // Test/screenshot hooks: navigate and seed state from automation.
    ;(window as any).__nav = (screen: unknown) => useRouter.getState().go(screen as any)
    ;(window as any).__seed = (patch: Record<string, unknown>) => useProgress.setState(patch as any)
    if (import.meta.env.DEV) {
      // e2e bot needs word-id → Thai to click the right tiles.
      void import('@/content').then(({ registry }) => {
        ;(window as any).__registryWords = Object.fromEntries(
          [...registry.words].map(([id, w]) => [id, w.thai]),
        )
      })
    }
    ;(window as any).__sessionEnd = () => {
      void import('@/state/session').then(({ useSession }) => {
        useSession.setState({
          status: 'complete',
          meta: { type: 'lesson', unitId: 'u01', lessonIndex: 2, title: 'Greetings & Politeness · Patterns' },
          correct: 14, wrong: 1, xpEarned: 156, maxCombo: 9, answered: 15,
          totalGraded: 15, startedAt: Date.now() - 4 * 60 * 1000,
        })
      })
    }
  }, [])
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScreenRouter />
    </Suspense>
  )
}
