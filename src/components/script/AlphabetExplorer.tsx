/**
 * Alphabet explorer: tabbed Consonants | Vowels reference.
 * Consonant cards flip to reveal sounds + audio; vowels show length,
 * position, and an example word. Fully empty-tolerant while content lands.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ThaiConsonant, ThaiVowel } from '@/content/schema'
import { sfx } from '@/audio/sfx'
import { useProgress } from '@/state/progress'
import { alpha } from '@/components/path/color'
import AudioButton from '@/components/AudioButton'
import Mascot from '@/components/Mascot'
import { CLASS_META, classColor } from './kind'

function ConsonantCard({ c, index }: { c: ThaiConsonant; index: number }) {
  const sound = useProgress((s) => s.settings.sound)
  const [flipped, setFlipped] = useState(false)
  const color = classColor(c.class)

  const style: React.CSSProperties & Record<string, string> = {
    '--cc-border': alpha(color, flipped ? 0.85 : 0.5),
    '--cc-glow': alpha(color, 0.22),
    animationDelay: `${Math.min(index, 16) * 26}ms`,
  }

  return (
    <div
      className={`ccard anim-pop ${flipped ? 'flipped' : ''} ${c.freq === 3 ? 'rare' : ''}`}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`${c.name}, ${c.meaning}. ${flipped ? 'Hide' : 'Show'} details`}
      aria-pressed={flipped}
      onClick={() => {
        if (sound) sfx.play('flip')
        setFlipped((f) => !f)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (sound) sfx.play('flip')
          setFlipped((f) => !f)
        }
      }}
    >
      <div className="ccard-inner">
        <div className="face front">
          <div className="cchar thai">{c.char}</div>
          <div className="cemoji" aria-hidden>{c.emoji}</div>
          <div className="cname">{c.name}</div>
          <div className="cmeaning">“{c.meaning}”</div>
        </div>
        <div className="face back">
          <div className="bsound">
            {c.initial || '(silent)'}
            {c.final && <span className="fin"> · ends as {c.final}</span>}
          </div>
          <div className="bmeaning">{c.name} — {c.meaning} {c.emoji}</div>
          <span className="bclass" style={{ color }}>{CLASS_META[c.class].label.toUpperCase()}</span>
          <span onClick={(e) => e.stopPropagation()}>
            <AudioButton thai={c.char} small label={`Hear ${c.name}`} />
          </span>
        </div>
      </div>
    </div>
  )
}

function VowelCard({ v, index }: { v: ThaiVowel; index: number }) {
  const lenColor = v.length === 'long' ? 'var(--sky)' : 'var(--mango)'
  return (
    <div className="vcard anim-pop" style={{ animationDelay: `${Math.min(index, 16) * 26}ms` }}>
      <div className="vtop">
        <span className="vchar thai">{v.display}</span>
        <span className="vroman">{v.roman}</span>
        <span className="vchips" style={{ marginLeft: 'auto' }}>
          <span className="vlen" style={{ color: lenColor }}>{v.length.toUpperCase()}</span>
        </span>
      </div>
      <div className="vchips">
        <span className="vpos">sits {v.position}</span>
      </div>
      <div className="vex">
        <span className="vex-emoji" aria-hidden>{v.example.emoji}</span>
        <span>
          <span className="vex-thai thai">{v.example.thai}</span>
          <span> · {v.example.roman} · {v.example.en}</span>
        </span>
        <span className="vex-audio">
          <AudioButton thai={v.example.thai} small label={`Hear ${v.example.roman}`} />
        </span>
      </div>
    </div>
  )
}

function ExplorerEmpty({ what }: { what: string }) {
  return (
    <div className="card script-empty anim-pop">
      <Mascot mood="think" size={90} />
      <div>
        <div className="t">The {what} cards are still being carved</div>
        <div className="s">
          Chang is polishing every letter of the alphabet — they'll appear here the moment
          the ink dries.
        </div>
      </div>
    </div>
  )
}

interface Props {
  consonants: ThaiConsonant[]
  vowels: ThaiVowel[]
}

export default function AlphabetExplorer({ consonants, vowels }: Props) {
  const sound = useProgress((s) => s.settings.sound)
  const [tab, setTab] = useState<'consonants' | 'vowels'>('consonants')

  const tabs = [
    { id: 'consonants' as const, label: 'Consonants', count: consonants.length },
    { id: 'vowels' as const, label: 'Vowels', count: vowels.length },
  ]

  return (
    <div>
      <div className="alpha-tabs" role="tablist" aria-label="Alphabet explorer">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`alpha-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => {
              if (tab !== t.id && sound) sfx.play('pop')
              setTab(t.id)
            }}
          >
            {tab === t.id && (
              <motion.span
                layoutId="alpha-tab-bg"
                className="alpha-tab-bg"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="alpha-tab-label">
              {t.label}
              <span className="count">{t.count}</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === 'consonants' ? (
          <motion.div
            key="consonants"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="class-legend">
              {(['mid', 'high', 'low'] as const).map((cls) => (
                <span key={cls} className="leg">
                  <span className="swatch" style={{ color: CLASS_META[cls].color }} aria-hidden />
                  <span>
                    <b>{CLASS_META[cls].label}</b> — {CLASS_META[cls].blurb}
                  </span>
                </span>
              ))}
              <span className="leg" style={{ flexBasis: '100%', marginTop: -2 }}>
                <span style={{ fontSize: 13 }} aria-hidden>🗝️</span>
                <span>A letter's class + tone mark + syllable ending decide the tone — tap any card to flip it.</span>
              </span>
            </div>
            {consonants.length === 0 ? (
              <ExplorerEmpty what="consonant" />
            ) : (
              <div className="glyph-grid">
                {consonants.map((c, i) => (
                  <ConsonantCard key={c.char} c={c} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="vowels"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="class-legend">
              <span className="leg">
                <span className="swatch" style={{ color: 'var(--mango)' }} aria-hidden />
                <span><b>Short</b> — clipped, quick: ah!</span>
              </span>
              <span className="leg">
                <span className="swatch" style={{ color: 'var(--sky)' }} aria-hidden />
                <span><b>Long</b> — held, relaxed: aaah</span>
              </span>
              <span className="leg">
                <span style={{ fontSize: 13 }} aria-hidden>🧭</span>
                <span>Thai vowels orbit their consonant — before, after, above, below, even all around.</span>
              </span>
            </div>
            {vowels.length === 0 ? (
              <ExplorerEmpty what="vowel" />
            ) : (
              <div className="glyph-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))' }}>
                {vowels.map((v, i) => (
                  <VowelCard key={v.id} v={v} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
