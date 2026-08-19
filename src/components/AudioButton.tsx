import { useCallback, useEffect, useRef, useState } from 'react'
import { tts } from '@/audio/tts'
import { useProgress } from '@/state/progress'

interface Props {
  thai: string
  small?: boolean
  slow?: boolean
  autoPlay?: boolean
  className?: string
  label?: string
}

/** Speaker button that voices Thai text; pulses while playing. */
export default function AudioButton({ thai, small, slow, autoPlay, className = '', label }: Props) {
  const [playing, setPlaying] = useState(false)
  const rate = useProgress((s) => s.settings.ttsRate)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const play = useCallback(() => {
    tts.speak(thai, {
      rate: slow ? rate * 0.62 : rate,
      onStart: () => mounted.current && setPlaying(true),
      onEnd: () => mounted.current && setPlaying(false),
    })
  }, [thai, slow, rate])

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(play, 350)
      return () => clearTimeout(t)
    }
  }, [autoPlay, play])

  return (
    <button
      type="button"
      className={`audio-btn ${small ? 'small' : ''} ${playing ? 'playing' : ''} ${className}`}
      onClick={play}
      aria-label={label ?? `Play audio: ${thai}`}
      title={slow ? 'Play slowly' : 'Play audio'}
    >
      {slow ? '🐢' : playing ? '🔊' : '🔉'}
    </button>
  )
}
