/**
 * SessionRunner — hosts a full exercise session: header (quit, progress,
 * combo), the active exercise renderer, feedback banner, and the celebration
 * end screen. Used by lessons, script lessons, reviews, builder, ear training.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSession, type SessionMeta } from '@/state/session'
import { useRouter } from '@/state/router'
import type { Exercise } from '@/engine/exercises'
import type { ExerciseApi } from './exercises/api'
import FeedbackBanner from './FeedbackBanner'
import ChunkyButton from './ChunkyButton'
import Mascot from './Mascot'
import Confetti from './Confetti'
import IntroCard from './exercises/IntroCard'
import ChoiceExercise from './exercises/ChoiceExercise'
import ArrangeExercise from './exercises/ArrangeExercise'
import TypeExercise from './exercises/TypeExercise'
import MatchPairsExercise from './exercises/MatchPairsExercise'

interface Props {
  meta: SessionMeta
  exercises: Exercise[]
  /** Where to go when the session ends or is quit. */
  onExit: () => void
}

function ExerciseHost({ exercise, api, exerciseKey }: { exercise: Exercise; api: ExerciseApi; exerciseKey: number }) {
  switch (exercise.kind) {
    case 'intro-word':
    case 'intro-pattern':
    case 'intro-char':
      return <IntroCard exercise={exercise} api={api} exerciseKey={exerciseKey} />
    case 'choice-thai-en':
    case 'choice-en-thai':
    case 'choice-audio':
    case 'char-sound':
    case 'sound-char':
    case 'read-syllable':
    case 'comprehend':
    case 'tone-pick':
      return <ChoiceExercise exercise={exercise} api={api} exerciseKey={exerciseKey} />
    case 'arrange':
    case 'listen-arrange':
    case 'builder':
      return <ArrangeExercise exercise={exercise} api={api} exerciseKey={exerciseKey} />
    case 'type-roman':
      return <TypeExercise exercise={exercise} api={api} exerciseKey={exerciseKey} />
    case 'match-pairs':
      return <MatchPairsExercise exercise={exercise} api={api} exerciseKey={exerciseKey} />
    default:
      return null
  }
}

function SessionEnd({ onExit }: { onExit: () => void }) {
  // result() builds a fresh object each call, so it must not be used as a
  // zustand selector (unstable snapshots trip React's getSnapshot check).
  // The end screen is terminal — compute the result once on mount.
  const result = useMemo(() => useSession.getState().result(), [])
  const meta = useSession((s) => s.meta)
  const accuracy = result.correct + result.wrong > 0
    ? Math.round((result.correct / (result.correct + result.wrong)) * 100)
    : 100
  const minutes = Math.max(1, Math.round(result.durationMs / 60000))

  return (
    <div className="screen" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <Confetti count={result.perfect ? 180 : 110} />
      <div className="anim-pop" style={{ textAlign: 'center', padding: 24, maxWidth: 520 }}>
        <Mascot mood="celebrate" size={190} className="" />
        <h1 style={{ fontSize: 36, margin: '10px 0 6px' }}>
          {result.perfect ? 'Perfect lesson!' : 'Lesson complete!'}
        </h1>
        <p style={{ color: 'var(--text-1)', fontSize: 17, marginBottom: 26 }}>
          {meta?.title ?? 'Session'} · {result.perfect ? 'flawless — สุดยอด!' : 'keep the streak alive!'}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { label: 'XP EARNED', value: `⚡ ${result.xp}`, color: 'var(--gold)' },
            { label: 'ACCURACY', value: `🎯 ${accuracy}%`, color: 'var(--jade)' },
            { label: 'BEST COMBO', value: `🔥 ${result.maxCombo}`, color: 'var(--mango)' },
            { label: 'TIME', value: `⏱️ ${minutes}m`, color: 'var(--sky)' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="card anim-slide-up"
              style={{ padding: '14px 20px', minWidth: 116, animationDelay: `${i * 90}ms` }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-2)' }}>{stat.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, marginTop: 4 }}>{stat.value}</div>
            </div>
          ))}
        </div>
        <ChunkyButton variant="jade" size="lg" onClick={onExit} data-testid="continue">
          Continue
        </ChunkyButton>
      </div>
    </div>
  )
}

export default function SessionRunner({ meta, exercises, onExit }: Props) {
  const session = useSession()
  const go = useRouter((s) => s.go)
  const [confirmQuit, setConfirmQuit] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    if (exercises.length) {
      useSession.getState().start(meta, exercises)
      setStartTime(Date.now())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = session.queue[session.index]
  const [feedbackExtras, setFeedbackExtras] = useState<{ answer?: { thai: string; roman?: string; en?: string }; detail?: string }>({})

  const api: ExerciseApi = useMemo(
    () => ({
      submit: (correct, opts) => {
        useSession.getState().submit(correct, { usedHint: opts?.usedHint, fastMs: Date.now() - startTime })
        if (opts?.answerShown || opts?.detail) {
          setFeedbackExtras({ answer: opts.answerShown, detail: opts.detail })
        } else {
          setFeedbackExtras({})
        }
      },
      continueIntro: () => useSession.getState().advance(),
      locked: session.feedback !== null,
    }),
    [session.feedback, startTime],
  )

  const handleContinue = useCallback(() => {
    setStartTime(Date.now())
    useSession.getState().advance()
  }, [])

  // Keyboard: Enter to continue when feedback is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && useSession.getState().feedback) handleContinue()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleContinue])

  if (session.status === 'complete') return <SessionEnd onExit={onExit} />
  if (!current) {
    return (
      <div className="screen" style={{ display: 'grid', placeItems: 'center' }}>
        <div className="card anim-pop" style={{ padding: 36, textAlign: 'center', maxWidth: 420 }}>
          <Mascot mood="think" size={120} />
          <h2 style={{ margin: '12px 0 8px' }}>Nothing to practice here yet</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: 20 }}>This session has no exercises right now.</p>
          <ChunkyButton onClick={onExit}>Back</ChunkyButton>
        </div>
      </div>
    )
  }

  const progressPct = session.totalGraded
    ? Math.min(100, (session.answered / session.totalGraded) * 100)
    : 0

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        maxWidth: 'var(--maxw-lesson)', width: '100%',
        margin: '0 auto', padding: '18px 22px 6px',
      }}>
        <button
          onClick={() => setConfirmQuit(true)}
          aria-label="Quit lesson"
          style={{
            border: 'none', background: 'transparent', color: 'var(--text-3)',
            fontSize: 26, cursor: 'pointer', lineHeight: 1, padding: 4,
            transition: 'color var(--dur-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
        >
          ✕
        </button>
        <div className="lesson-progress" role="progressbar" aria-valuenow={Math.round(progressPct)}>
          <div className="fill" style={{ width: `${Math.max(4, progressPct)}%` }} />
        </div>
        {session.combo >= 2 && (
          <span
            key={session.combo}
            className="anim-pop"
            style={{ fontWeight: 800, color: 'var(--mango)', fontSize: 17, whiteSpace: 'nowrap' }}
          >
            🔥 {session.combo}
          </span>
        )}
      </div>

      {/* Exercise */}
      <div style={{
        flex: 1, width: '100%', maxWidth: 'var(--maxw-lesson)',
        margin: '0 auto', padding: '10px 22px 170px',
      }}>
        <ExerciseHost exercise={current} api={api} exerciseKey={session.index} />
      </div>

      {/* Feedback */}
      {session.feedback && (
        <FeedbackBanner
          correct={session.feedback.correct}
          answer={feedbackExtras.answer}
          detail={feedbackExtras.detail}
          onContinue={handleContinue}
        />
      )}

      {/* Quit confirm */}
      {confirmQuit && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 80, display: 'grid', placeItems: 'center',
          background: 'rgba(3, 7, 18, 0.72)', backdropFilter: 'blur(6px)',
        }}>
          <div className="card anim-pop" style={{ padding: 32, textAlign: 'center', maxWidth: 380, margin: 16 }}>
            <Mascot mood="sad" size={110} />
            <h2 style={{ fontSize: 22, margin: '10px 0 6px' }}>Leave the lesson?</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: 22 }}>You'll lose this session's progress.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <ChunkyButton variant="ghost" onClick={() => setConfirmQuit(false)}>Keep going</ChunkyButton>
              <ChunkyButton
                variant="coral"
                onClick={() => {
                  useSession.getState().abort()
                  onExit()
                }}
              >
                Leave
              </ChunkyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
