/**
 * Tone teaser — the gateway card into the tone-rule lessons. Three real words
 * that sound like "maa" but mean come / dog / horse, each tap-to-hear, plus
 * the five tone badges and a chunky CTA into the first tones lesson.
 */
import { useState } from 'react'
import type { ScriptLesson, Tone } from '@/content/schema'
import { TONE_INFO } from '@/content/schema'
import { sfx } from '@/audio/sfx'
import { tts } from '@/audio/tts'
import { useProgress } from '@/state/progress'
import { alpha } from '@/components/path/color'
import ChunkyButton from '@/components/ChunkyButton'

const TONE_ORDER: Tone[] = ['mid', 'low', 'falling', 'high', 'rising']

/** มา / หมา / ม้า — the classic "maa" trio: come, dog, horse. */
const DEMO_WORDS: Array<{ thai: string; roman: string; en: string; emoji: string; tone: Tone }> = [
  { thai: 'มา', roman: 'maa', en: 'come', emoji: '🚶', tone: 'mid' },
  { thai: 'หมา', roman: 'mǎa', en: 'dog', emoji: '🐕', tone: 'rising' },
  { thai: 'ม้า', roman: 'máa', en: 'horse', emoji: '🐎', tone: 'high' },
]

function ToneWord({ w, delay }: { w: (typeof DEMO_WORDS)[number]; delay: number }) {
  const sound = useProgress((s) => s.settings.sound)
  const rate = useProgress((s) => s.settings.ttsRate)
  const [playing, setPlaying] = useState(false)
  const info = TONE_INFO[w.tone]
  const style: React.CSSProperties & Record<string, string> = {
    '--tw-color': info.color,
    '--tw-border': alpha(info.color, 0.5),
    '--tw-glow': alpha(info.color, 0.25),
    animationDelay: `${delay}ms`,
  }
  return (
    <button
      className={`tt-word anim-pop ${playing ? 'playing' : ''}`}
      style={style}
      onClick={() => {
        if (sound) sfx.play('pop')
        tts.speak(w.thai, {
          rate,
          onStart: () => setPlaying(true),
          onEnd: () => setPlaying(false),
        })
      }}
      aria-label={`Hear ${w.roman} — ${w.en}, ${info.label.toLowerCase()} tone`}
    >
      <span className="w-thai thai">{w.thai}</span>
      <span className="w-roman">
        <span className="w-contour" aria-hidden>{info.contour}</span> {w.roman}
      </span>
      <span className="w-en">{w.emoji} {w.en}</span>
    </button>
  )
}

interface Props {
  toneLesson: ScriptLesson | null
  unlocked: boolean
  onOpen: (lessonId: string) => void
}

export default function ToneTeaser({ toneLesson, unlocked, onOpen }: Props) {
  return (
    <div className="tone-teaser anim-slide-up" style={{ animationDelay: '80ms' }}>
      <div className="tt-main">
        <div className="tt-title">
          <span aria-hidden style={{ marginRight: 9 }}>🎵</span>
          The melody <i>is</i> the meaning
        </div>
        <div className="tt-sub">
          These three words all sound like <b>“maa”</b> — only the tone tells
          {' '}<i>come</i> from <i>dog</i> from <i>horse</i>. Tap to hear the difference:
        </div>
        <div className="tt-words">
          {DEMO_WORDS.map((w, i) => (
            <ToneWord key={w.thai} w={w} delay={120 + i * 90} />
          ))}
        </div>
        <div className="tt-chips" aria-label="The five Thai tones">
          {TONE_ORDER.map((t) => (
            <span key={t} className="tone-badge" style={{ color: TONE_INFO[t].color }}>
              <span style={{ fontSize: 14 }} aria-hidden>{TONE_INFO[t].contour}</span>
              {TONE_INFO[t].label}
            </span>
          ))}
        </div>
      </div>
      <div className="tt-cta">
        {toneLesson ? (
          <>
            <ChunkyButton
              variant={unlocked ? 'gold' : 'ghost'}
              disabled={!unlocked}
              onClick={() => unlocked && onOpen(toneLesson.id)}
              title={unlocked ? toneLesson.title : 'Unlock by finishing the earlier lessons'}
            >
              {unlocked ? '⚡ Learn the tone rules' : '🔒 Tone rules ahead'}
            </ChunkyButton>
            <div className="tt-hint">
              Letter class + tone mark + ending → the tone. Fully learnable — promise.
            </div>
          </>
        ) : (
          <>
            <span className="splash-stat" style={{ fontSize: 12.5 }}>
              🏮 Tone lessons arrive with the course
            </span>
            <div className="tt-hint">
              Letter class + tone mark + ending → the tone. Fully learnable — promise.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
