/**
 * Settings — chunky sound switch, romanization segmented control, TTS speed
 * slider with live preview, and a guarded reset-everything danger row.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sfx } from '@/audio/sfx'
import { useProgress, type RomanizationMode } from '@/state/progress'
import { useRouter } from '@/state/router'
import AudioButton from '@/components/AudioButton'
import ChunkyButton from '@/components/ChunkyButton'
import Mascot from '@/components/Mascot'

const ROMAN_MODES: Array<{ mode: RomanizationMode; label: string; sub: string }> = [
  { mode: 'full', label: 'Full', sub: 'sà-wàt-dii' },
  { mode: 'toneless', label: 'No tones', sub: 'sa-wat-dii' },
  { mode: 'hidden', label: 'Hidden', sub: '· · ·' },
]

export default function SettingsCard({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const settings = useProgress((s) => s.settings)
  const setSettings = useProgress((s) => s.setSettings)
  const resetAll = useProgress((s) => s.resetAll)
  const go = useRouter((s) => s.go)
  const [confirming, setConfirming] = useState(false)

  const toggleSound = () => {
    const next = !settings.sound
    setSettings({ sound: next })
    if (next) sfx.play('pop')
  }

  const pickRoman = (mode: RomanizationMode) => {
    if (settings.sound) sfx.play('select')
    setSettings({ romanization: mode })
  }

  const ratePct = ((settings.ttsRate - 0.6) / (1.2 - 0.6)) * 100

  return (
    <>
      <div className={`card settings-card ${className}`} style={style}>
        <div className="setting-row">
          <span className="setting-ico" aria-hidden>🔊</span>
          <div className="setting-copy">
            <div className="setting-label">Sound effects</div>
            <div className="setting-desc">Taps, chimes and celebration jingles</div>
          </div>
          <div className="setting-control">
            <button
              type="button"
              role="switch"
              aria-checked={settings.sound}
              aria-label="Toggle sound effects"
              className={`switch ${settings.sound ? 'on' : ''}`}
              onClick={toggleSound}
            >
              <span className="knob" />
            </button>
          </div>
        </div>

        <div className="setting-row">
          <span className="setting-ico" aria-hidden>🔤</span>
          <div className="setting-copy">
            <div className="setting-label">Romanization</div>
            <div className="setting-desc">How much phonetic help you see</div>
          </div>
          <div className="setting-control">
            <div className="segmented" role="radiogroup" aria-label="Romanization mode">
              {ROMAN_MODES.map((opt) => {
                const active = settings.romanization === opt.mode
                return (
                  <button
                    key={opt.mode}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={`seg ${active ? 'active' : ''}`}
                    onClick={() => pickRoman(opt.mode)}
                  >
                    {active && (
                      <motion.span
                        layoutId="roman-seg-ind"
                        className="seg-ind"
                        transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                      />
                    )}
                    <span className="seg-label">{opt.label}</span>
                    <span className="seg-sub">{opt.sub}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="setting-row">
          <span className="setting-ico" aria-hidden>🗣️</span>
          <div className="setting-copy">
            <div className="setting-label">Voice speed</div>
            <div className="setting-desc">How fast Thai audio is spoken</div>
          </div>
          <div className="setting-control">
            <div className="range-wrap">
              <span className="range-cap" aria-hidden>🐢</span>
              <input
                type="range"
                className="range"
                min={0.6}
                max={1.2}
                step={0.02}
                value={settings.ttsRate}
                aria-label="Voice speed"
                style={{ ['--pct' as string]: `${ratePct}%` }}
                onChange={(e) => setSettings({ ttsRate: Number(e.target.value) })}
              />
              <span className="range-cap" aria-hidden>🐇</span>
              <span className="range-val">{settings.ttsRate.toFixed(2)}×</span>
            </div>
            <AudioButton small thai="สวัสดีครับ" label="Preview voice speed" />
          </div>
        </div>

        <div className="setting-row danger">
          <span className="setting-ico" aria-hidden>🗑️</span>
          <div className="setting-copy">
            <div className="setting-label">Reset progress</div>
            <div className="setting-desc">Erase XP, streaks and every word memory</div>
          </div>
          <div className="setting-control">
            <ChunkyButton variant="coral" size="sm" onClick={() => setConfirming(true)}>
              Reset
            </ChunkyButton>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {confirming && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setConfirming(false)}
          >
            <motion.div
              className="modal-card"
              role="alertdialog"
              aria-modal="true"
              aria-label="Confirm reset progress"
              initial={{ scale: 0.82, y: 26, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <Mascot mood="sad" size={112} />
              </div>
              <h2>Erase everything?</h2>
              <p>
                Your XP, streak and every word Chang helped you remember will be
                gone for good. There is no undo.
              </p>
              <div className="modal-actions">
                <ChunkyButton variant="ghost" onClick={() => setConfirming(false)}>
                  Keep it
                </ChunkyButton>
                <ChunkyButton
                  variant="coral"
                  onClick={() => {
                    if (settings.sound) sfx.play('whoosh')
                    resetAll()
                    setConfirming(false)
                    go({ name: 'home' })
                  }}
                >
                  Erase it all
                </ChunkyButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
