/**
 * OnboardingScreen — the first-run experience.
 * A four-act welcome over the living lantern backdrop:
 *   1. Hero — Chang says hello, the wordmark, the promise.
 *   2. How it works — the three pillars, staggered in.
 *   3. Daily goal — pick a pace, written straight into the progress store.
 *   4. Ready — celebration, confetti, and off to the night market.
 */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { registry } from '@/content'
import { sfx } from '@/audio/sfx'
import { useProgress } from '@/state/progress'
import { useRouter } from '@/state/router'
import ChunkyButton from '@/components/ChunkyButton'
import Confetti from '@/components/Confetti'
import Mascot from '@/components/Mascot'
import WorldBackdrop from '@/three/WorldBackdrop'

const TOTAL_STEPS = 4

const HOW_CARDS = [
  {
    emoji: '🧠',
    title: 'Spaced repetition',
    body: "We schedule each word right before you'd forget it.",
    color: '#2ee6a8',
    tint: 'rgba(46, 230, 168, 0.13)',
  },
  {
    emoji: '🧱',
    title: 'Sentence Builder',
    body: "Learn patterns, not phrases — build sentences you've never seen.",
    color: '#ffb020',
    tint: 'rgba(255, 176, 32, 0.13)',
  },
  {
    emoji: '👂',
    title: 'Ear first',
    body: 'Five tones, trained with real minimal pairs.',
    color: '#b48cff',
    tint: 'rgba(180, 140, 255, 0.14)',
  },
]

const GOALS = [
  { xp: 20, name: 'Chill', emoji: '🍵', minutes: 5, popular: false },
  { xp: 50, name: 'Steady', emoji: '🔥', minutes: 10, popular: true },
  { xp: 100, name: 'Serious', emoji: '⚡', minutes: 20, popular: false },
]

const stepVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 64, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -64, scale: 0.985 }),
}

const CSS = `
.ob-top {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 68px;
  padding: 0 16px;
  max-width: var(--maxw);
  margin: 0 auto;
}
.ob-iconbtn {
  justify-self: start;
  width: 42px;
  height: 42px;
  border-radius: var(--r-full);
  border: 2px solid var(--stroke-strong);
  background: rgba(22, 33, 62, 0.55);
  color: var(--text-1);
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform var(--dur-fast) var(--ease-spring),
              color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              opacity var(--dur-med) var(--ease-out);
}
.ob-iconbtn:hover { transform: scale(1.08); color: var(--text-0); border-color: rgba(148, 173, 224, 0.5); }
.ob-iconbtn:active { transform: scale(0.9); }
.ob-skip {
  justify-self: end;
  border: none;
  background: transparent;
  color: var(--text-2);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 13.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 9px 14px;
  border-radius: var(--r-full);
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-out),
              background var(--dur-fast) var(--ease-out),
              opacity var(--dur-med) var(--ease-out);
}
.ob-skip:hover { color: var(--text-0); background: rgba(148, 173, 224, 0.12); }
.ob-hidden { opacity: 0; pointer-events: none; }

.ob-dots { display: flex; align-items: center; gap: 8px; }
.ob-dot {
  width: 9px;
  height: 9px;
  border-radius: var(--r-full);
  background: rgba(148, 173, 224, 0.25);
  transition: all 400ms var(--ease-spring);
}
.ob-dot.done { background: rgba(255, 176, 32, 0.45); }
.ob-dot.active {
  width: 30px;
  background: linear-gradient(90deg, var(--gold-bright), var(--gold));
  box-shadow: 0 0 12px rgba(255, 176, 32, 0.55);
}

.ob-main {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  min-height: calc(100vh - 68px);
  min-height: calc(100dvh - 68px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px 22px 52px;
}

/* ── Hero / Ready stage ── */
.ob-stage { position: relative; display: inline-block; }
.ob-glow {
  position: absolute;
  left: 50%;
  top: 46%;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255, 176, 32, 0.26), rgba(255, 138, 61, 0.10) 45%, transparent 68%);
  filter: blur(6px);
  pointer-events: none;
}
.ob-shadow {
  width: 112px;
  height: 16px;
  margin: -6px auto 0;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(3, 7, 18, 0.65), transparent 70%);
  filter: blur(4px);
}
.ob-bubble {
  position: absolute;
  top: -14px;
  right: -60px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(180deg, #fffdf6, #ffedc2);
  color: #4a3208;
  padding: 8px 14px 6px;
  border-radius: 16px 16px 16px 4px;
  box-shadow: 0 8px 24px rgba(3, 7, 18, 0.45);
  animation: pop-in var(--dur-med) var(--ease-spring) 450ms both,
             float-y 3.2s ease-in-out 1.4s infinite;
}
.ob-bubble .thai { font-size: 18px; font-weight: 700; line-height: 1.35; }
.ob-bubble small { font-size: 10.5px; font-weight: 700; color: #a07818; letter-spacing: 0.02em; }

.ob-wordmark {
  margin-top: 20px;
  font-size: clamp(46px, 8vw, 72px);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.02em;
  background: linear-gradient(180deg, #ffe9a8 0%, var(--gold-bright) 45%, var(--mango) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 6px 26px rgba(255, 150, 32, 0.28));
}
.ob-promise {
  color: var(--text-1);
  font-size: clamp(16px, 2.4vw, 19.5px);
  font-weight: 600;
  line-height: 1.6;
  max-width: 460px;
  margin: 12px auto 30px;
}
.ob-cta {
  display: inline-block;
  border-radius: var(--r-md);
  animation: slide-up var(--dur-med) var(--ease-out) 240ms both,
             pulse-glow 2.6s var(--ease-out) 1.4s infinite;
}
.ob-chips { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 30px; }
.ob-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: var(--r-full);
  border: 1px solid var(--stroke);
  background: rgba(12, 20, 40, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--text-1);
  font-size: 13.5px;
  font-weight: 700;
  white-space: nowrap;
}

/* ── Shared step typography ── */
.ob-kicker {
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
}
.ob-title { font-size: clamp(28px, 4.4vw, 40px); margin-top: 8px; }
.ob-sub {
  color: var(--text-1);
  font-size: 16px;
  line-height: 1.55;
  max-width: 460px;
  margin: 10px auto 0;
}

/* ── How it works ── */
.ob-how-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 920px;
  margin: 30px 0 36px;
}
.ob-how-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 22px;
  text-align: left;
  transition: transform var(--dur-fast) var(--ease-spring),
              box-shadow var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out);
}
.ob-how-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-pop); border-color: var(--stroke-strong); }
.ob-how-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 22px;
  right: 22px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: var(--hc);
  opacity: 0.75;
}
.ob-how-num {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--text-3);
}
.ob-how-ico {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  font-size: 29px;
}
.ob-how-title { font-size: 18px; font-weight: 800; }
.ob-how-body { margin-top: 5px; font-size: 14.5px; line-height: 1.55; color: var(--text-1); }

/* ── Daily goal ── */
.ob-goal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 860px;
  margin: 30px 0 34px;
}
.ob-goal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 28px 18px 22px;
  border-radius: var(--r-lg);
  border: 2px solid var(--stroke-strong);
  border-bottom-width: 5px;
  background: var(--surface-raised);
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-spring),
              border-color var(--dur-fast) var(--ease-out),
              background var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.ob-goal:hover { transform: translateY(-3px); border-color: rgba(148, 173, 224, 0.5); }
.ob-goal:active { transform: translateY(1px) scale(0.98); }
.ob-goal.selected {
  border-color: var(--gold);
  background: rgba(255, 176, 32, 0.10);
  box-shadow: var(--glow-gold);
}
.ob-goal-emoji { font-size: 36px; line-height: 1.2; }
.ob-goal-info { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.ob-goal-name { font-size: 19px; font-weight: 800; }
.ob-goal-min { font-size: 13px; font-weight: 600; color: var(--text-2); }
.ob-goal-xp {
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 30px;
  font-weight: 800;
  color: var(--gold);
  line-height: 1;
}
.ob-goal-xp em { font-style: normal; font-size: 13px; letter-spacing: 0.08em; color: var(--text-2); }
.ob-goal-check {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 30px;
  height: 30px;
  border-radius: var(--r-full);
  background: linear-gradient(180deg, #ffc94d, #ffb020);
  color: #3a2500;
  display: grid;
  place-items: center;
  font-size: 15px;
  font-weight: 900;
  box-shadow: 0 3px 0 #b06f00, 0 0 18px rgba(255, 176, 32, 0.4);
}
.ob-goal-ribbon {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #43f0b6, #23d698);
  color: #03301f;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 11px;
  border-radius: var(--r-full);
  box-shadow: 0 2px 0 #0a7a58;
  white-space: nowrap;
}

/* ── Ready ── */
.ob-ready-thai {
  margin-top: 16px;
  font-size: clamp(42px, 7vw, 58px);
  font-weight: 700;
  line-height: 1.3;
  background: linear-gradient(180deg, #ffe9a8 0%, var(--gold-bright) 45%, var(--mango) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 6px 26px rgba(255, 150, 32, 0.28));
}
.ob-ready-en { font-size: 24px; font-weight: 800; color: var(--text-0); margin-top: 2px; }

/* ── Mobile ── */
@media (max-width: 720px) {
  .ob-main { padding: 4px 18px 40px; }
  .ob-glow { width: 300px; height: 300px; }
  .ob-how-grid { grid-template-columns: 1fr; gap: 12px; margin: 24px 0 28px; }
  .ob-how-card { flex-direction: row; align-items: center; gap: 15px; padding: 16px; }
  .ob-how-ico { width: 50px; height: 50px; font-size: 25px; border-radius: 15px; flex-shrink: 0; }
  .ob-how-title { font-size: 16.5px; }
  .ob-how-body { font-size: 13.5px; }
  .ob-how-num { top: 14px; right: 16px; }
  .ob-goal-grid { grid-template-columns: 1fr; gap: 14px; margin: 26px 0 28px; max-width: 420px; }
  .ob-goal { flex-direction: row; align-items: center; gap: 14px; padding: 16px 20px; text-align: left; }
  .ob-goal-emoji { font-size: 30px; }
  .ob-goal-info { align-items: flex-start; }
  .ob-goal-xp { margin: 0 4px 0 auto; font-size: 26px; }
  .ob-goal-ribbon { left: auto; right: 16px; transform: none; }
  .ob-goal-check { top: -10px; right: auto; left: -10px; }
}
`

function HeroStep({ onStart }: { onStart: () => void }) {
  const units = registry.units.length
  return (
    <>
      <div className="ob-stage anim-pop">
        <div className="ob-glow" />
        <div className="ob-bubble">
          <span className="thai">สวัสดี!</span>
          <small>sà-wàt-dii · hello!</small>
        </div>
        <Mascot mood="happy" size={172} />
        <div className="ob-shadow" />
      </div>
      <h1 className="ob-wordmark anim-slide-up" style={{ animationDelay: '80ms' }}>Chai Thai</h1>
      <p className="ob-promise anim-slide-up" style={{ animationDelay: '160ms' }}>
        Speak real Thai. Order noodles. Make friends. Tell stories.
      </p>
      <div className="ob-cta">
        <ChunkyButton variant="gold" size="lg" onClick={onStart}>Get started</ChunkyButton>
      </div>
      <div className="ob-chips anim-slide-up" style={{ animationDelay: '340ms' }}>
        <span className="ob-chip">🏮 {units} story units</span>
        <span className="ob-chip">🎵 5 tones</span>
        <span className="ob-chip">🧱 Endless sentences</span>
      </div>
    </>
  )
}

function HowStep({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="ob-kicker anim-slide-up">Why it sticks</div>
      <h2 className="ob-title anim-slide-up" style={{ animationDelay: '60ms' }}>How Chai Thai works</h2>
      <div className="ob-how-grid">
        {HOW_CARDS.map((c, i) => (
          <div
            key={c.title}
            className="card ob-how-card anim-slide-up"
            style={{ animationDelay: `${150 + i * 110}ms`, '--hc': c.color } as React.CSSProperties}
          >
            <span className="ob-how-num">0{i + 1}</span>
            <div className="ob-how-ico" style={{ background: c.tint }}>{c.emoji}</div>
            <div>
              <div className="ob-how-title">{c.title}</div>
              <div className="ob-how-body">{c.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="anim-slide-up" style={{ animationDelay: '500ms' }}>
        <ChunkyButton variant="gold" size="lg" onClick={onNext}>Continue</ChunkyButton>
      </div>
    </>
  )
}

function GoalStep({ selected, onPick, onNext }: {
  selected: number
  onPick: (xp: number) => void
  onNext: () => void
}) {
  return (
    <>
      <div className="ob-kicker anim-slide-up">Daily goal</div>
      <h2 className="ob-title anim-slide-up" style={{ animationDelay: '60ms' }}>Pick your pace</h2>
      <p className="ob-sub anim-slide-up" style={{ animationDelay: '120ms' }}>
        Streaks are built on small promises. You can change this anytime.
      </p>
      <div className="ob-goal-grid">
        {GOALS.map((g, i) => (
          <button
            key={g.xp}
            className={`ob-goal anim-slide-up${selected === g.xp ? ' selected' : ''}`}
            style={{ animationDelay: `${190 + i * 100}ms` }}
            onClick={() => onPick(g.xp)}
            aria-pressed={selected === g.xp}
          >
            {g.popular && <span className="ob-goal-ribbon">Most popular</span>}
            <span className="ob-goal-emoji">{g.emoji}</span>
            <span className="ob-goal-info">
              <span className="ob-goal-name">{g.name}</span>
              <span className="ob-goal-min">~{g.minutes} min a day</span>
            </span>
            <span className="ob-goal-xp">{g.xp}<em>XP</em></span>
            {selected === g.xp && <span className="ob-goal-check anim-pop">✓</span>}
          </button>
        ))}
      </div>
      <div className="anim-slide-up" style={{ animationDelay: '520ms' }}>
        <ChunkyButton variant="gold" size="lg" onClick={onNext}>Continue</ChunkyButton>
      </div>
    </>
  )
}

function ReadyStep({ goalXp, onFinish }: { goalXp: number; onFinish: () => void }) {
  const goal = GOALS.find((g) => g.xp === goalXp)
  return (
    <>
      <div className="ob-stage anim-pop">
        <div className="ob-glow" />
        <Mascot mood="celebrate" size={164} />
        <div className="ob-shadow" />
      </div>
      <h1 className="ob-ready-thai thai anim-slide-up" style={{ animationDelay: '80ms' }}>พร้อมไหม?</h1>
      <div className="ob-ready-en anim-slide-up" style={{ animationDelay: '150ms' }}>Ready?</div>
      <p className="ob-sub anim-slide-up" style={{ animationDelay: '220ms', marginBottom: 30 }}>
        Your first words are waiting at the night market — Chang saved you a lantern.
      </p>
      <div className="ob-cta">
        <ChunkyButton variant="gold" size="lg" onClick={onFinish}>Start learning</ChunkyButton>
      </div>
      {goal && (
        <div className="ob-chips anim-slide-up" style={{ animationDelay: '400ms' }}>
          <span className="ob-chip">{goal.emoji} Daily goal: {goal.xp} XP · change anytime in Profile</span>
        </div>
      )}
    </>
  )
}

export default function OnboardingScreen() {
  const go = useRouter((s) => s.go)
  const dailyGoalXp = useProgress((s) => s.dailyGoalXp)
  const [{ step, dir }, setNav] = useState({ step: 0, dir: 1 })

  const goStep = (next: number) =>
    setNav((cur) => ({ step: next, dir: next >= cur.step ? 1 : -1 }))
  const next = () => goStep(Math.min(TOTAL_STEPS - 1, step + 1))
  const back = () => {
    if (useProgress.getState().settings.sound) sfx.play('deselect')
    goStep(Math.max(0, step - 1))
  }

  const finish = () => {
    useProgress.getState().setOnboarded(true)
    go({ name: 'home' })
  }
  const skip = () => {
    if (useProgress.getState().settings.sound) sfx.play('tap')
    finish()
  }
  const pickGoal = (xp: number) => {
    if (useProgress.getState().settings.sound) sfx.play('select')
    useProgress.setState({ dailyGoalXp: xp })
  }

  // Celebration fanfare when the final step lands.
  useEffect(() => {
    if (step === TOTAL_STEPS - 1 && useProgress.getState().settings.sound) {
      sfx.play('complete')
    }
  }, [step])

  return (
    <div className="screen">
      <style>{CSS}</style>
      <WorldBackdrop variant="dusk" />

      <header className="ob-top">
        <button
          className={`ob-iconbtn${step === 0 ? ' ob-hidden' : ''}`}
          onClick={back}
          aria-label="Back"
          tabIndex={step === 0 ? -1 : 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className="ob-dots"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
          aria-label={`Step ${step + 1} of ${TOTAL_STEPS}`}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <span key={i} className={`ob-dot${i === step ? ' active' : i < step ? ' done' : ''}`} />
          ))}
        </div>
        <button
          className={`ob-skip${step === TOTAL_STEPS - 1 ? ' ob-hidden' : ''}`}
          onClick={skip}
          tabIndex={step === TOTAL_STEPS - 1 ? -1 : 0}
        >
          Skip
        </button>
      </header>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.main
          key={step}
          className="ob-main"
          custom={dir}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.9 }}
        >
          {step === 0 && <HeroStep onStart={next} />}
          {step === 1 && <HowStep onNext={next} />}
          {step === 2 && <GoalStep selected={dailyGoalXp} onPick={pickGoal} onNext={next} />}
          {step === 3 && <ReadyStep goalXp={dailyGoalXp} onFinish={finish} />}
        </motion.main>
      </AnimatePresence>

      {step === TOTAL_STEPS - 1 && <Confetti count={150} />}
    </div>
  )
}
