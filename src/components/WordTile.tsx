import type { Word } from '@/content/schema'
import { useProgress } from '@/state/progress'
import { sfx } from '@/audio/sfx'
import { tts } from '@/audio/tts'

interface Props {
  word: Word
  state?: 'idle' | 'used' | 'in-answer' | 'correct' | 'wrong'
  onClick?: () => void
  speakOnClick?: boolean
  showRoman?: boolean
  size?: 'md' | 'lg'
}

/** A tappable Thai word tile for word-bank exercises. */
export default function WordTile({ word, state = 'idle', onClick, speakOnClick = true, showRoman, size = 'md' }: Props) {
  const settings = useProgress((s) => s.settings)
  const roman = showRoman ?? settings.romanization !== 'hidden'
  const cls =
    state === 'used' ? 'used'
      : state === 'in-answer' ? 'in-answer'
        : state === 'correct' ? 'correct-flash'
          : state === 'wrong' ? 'wrong-flash'
            : ''
  return (
    <button
      type="button"
      className={`tile ${cls}`}
      onClick={() => {
        if (settings.sound) sfx.play(state === 'in-answer' ? 'deselect' : 'select')
        if (speakOnClick && state !== 'in-answer') tts.speak(word.thai)
        onClick?.()
      }}
    >
      <span className="tile-thai" style={size === 'lg' ? { fontSize: 26 } : undefined}>{word.thai}</span>
      {roman && <span className="tile-roman">{word.roman}</span>}
    </button>
  )
}
