/**
 * Chang — the Chai Thai elephant mascot. Pure SVG, fully animated:
 * blinks, bobs, emotes. Wears a golden Thai chada. The soul of the app.
 */

export type Mood = 'idle' | 'happy' | 'sad' | 'celebrate' | 'think'

interface Props {
  mood?: Mood
  size?: number
  className?: string
}

export default function Mascot({ mood = 'idle', size = 160, className = '' }: Props) {
  const bounce = mood === 'celebrate' ? 'chang-bounce 0.6s var(--ease-spring) infinite' : 'chang-bob 3.2s ease-in-out infinite'
  const trunkAnim = mood === 'celebrate' ? 'chang-trunk-up 0.6s ease-in-out infinite alternate' : undefined

  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }} aria-label="Chang the elephant">
      <style>{`
        @keyframes chang-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes chang-bounce { 0%,100% { transform: translateY(0) scale(1) } 40% { transform: translateY(-14px) scale(1.04) } 70% { transform: translateY(0) scale(0.98,0.96) } }
        @keyframes chang-blink { 0%, 92%, 100% { transform: scaleY(1) } 95% { transform: scaleY(0.08) } }
        @keyframes chang-ear { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-5deg) } }
        @keyframes chang-trunk-up { 0% { transform: rotate(0deg) } 100% { transform: rotate(-14deg) } }
        @keyframes chang-sparkle { 0% { opacity: 0; transform: scale(0.4) rotate(0deg) } 50% { opacity: 1; transform: scale(1) rotate(20deg) } 100% { opacity: 0; transform: scale(0.5) rotate(45deg) } }
      `}</style>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ animation: bounce, overflow: 'visible' }}>
        <defs>
          <linearGradient id="chang-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a8bff0" />
            <stop offset="1" stopColor="#809fd8" />
          </linearGradient>
          <linearGradient id="chang-ear-in" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2b8d0" />
            <stop offset="1" stopColor="#d890b8" />
          </linearGradient>
          <linearGradient id="chang-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd970" />
            <stop offset="1" stopColor="#f0a020" />
          </linearGradient>
        </defs>

        {/* Ears */}
        <g style={{ animation: 'chang-ear 3.2s ease-in-out infinite', transformOrigin: '55px 95px' }}>
          <circle cx="42" cy="98" r="34" fill="url(#chang-body)" />
          <circle cx="44" cy="99" r="24" fill="url(#chang-ear-in)" />
        </g>
        <g style={{ animation: 'chang-ear 3.2s ease-in-out infinite reverse', transformOrigin: '145px 95px' }}>
          <circle cx="158" cy="98" r="34" fill="url(#chang-body)" />
          <circle cx="156" cy="99" r="24" fill="url(#chang-ear-in)" />
        </g>

        {/* Head */}
        <ellipse cx="100" cy="112" rx="62" ry="58" fill="url(#chang-body)" />

        {/* Chada (golden Thai crown) */}
        <g>
          <path d="M100 18 C104 34 112 40 116 52 L84 52 C88 40 96 34 100 18 Z" fill="url(#chang-gold)" />
          <path d="M78 52 Q100 42 122 52 L118 62 Q100 54 82 62 Z" fill="url(#chang-gold)" />
          <circle cx="100" cy="20" r="4" fill="#ffe9a8" />
        </g>

        {/* Eyes */}
        <g style={{ animation: 'chang-blink 4.4s infinite', transformOrigin: '100px 102px' }}>
          {mood === 'happy' || mood === 'celebrate' ? (
            <>
              <path d="M68 102 Q76 92 84 102" stroke="#1d2b52" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M116 102 Q124 92 132 102" stroke="#1d2b52" strokeWidth="5" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'sad' ? (
            <>
              <circle cx="76" cy="104" r="7" fill="#1d2b52" />
              <circle cx="124" cy="104" r="7" fill="#1d2b52" />
              <circle cx="78" cy="101" r="2.4" fill="#fff" />
              <circle cx="126" cy="101" r="2.4" fill="#fff" />
              <path d="M64 92 L86 97" stroke="#1d2b52" strokeWidth="4" strokeLinecap="round" />
              <path d="M136 92 L114 97" stroke="#1d2b52" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="76" cy="102" r="8" fill="#1d2b52" />
              <circle cx="124" cy="102" r="8" fill="#1d2b52" />
              <circle cx="79" cy="99" r="2.8" fill="#fff" />
              <circle cx="127" cy="99" r="2.8" fill="#fff" />
            </>
          )}
        </g>

        {/* Blush */}
        <ellipse cx="62" cy="120" rx="9" ry="6" fill="#f2a0c0" opacity="0.65" />
        <ellipse cx="138" cy="120" rx="9" ry="6" fill="#f2a0c0" opacity="0.65" />

        {/* Trunk */}
        <g style={trunkAnim ? { animation: trunkAnim, transformOrigin: '100px 118px' } : undefined}>
          <path
            d={
              mood === 'sad'
                ? 'M100 118 C100 138 96 150 84 156 C78 159 72 158 70 154'
                : 'M100 118 C100 138 104 150 116 156 C124 160 132 156 132 148'
            }
            stroke="url(#chang-body)" strokeWidth="17" fill="none" strokeLinecap="round"
          />
          <path
            d={
              mood === 'sad'
                ? 'M100 118 C100 138 96 150 84 156 C78 159 72 158 70 154'
                : 'M100 118 C100 138 104 150 116 156 C124 160 132 156 132 148'
            }
            stroke="#b8cbf5" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.5"
          />
        </g>

        {/* Mouth */}
        {mood === 'happy' || mood === 'celebrate' ? (
          <path d="M86 128 Q100 140 114 128" stroke="#1d2b52" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        ) : mood === 'sad' ? (
          <path d="M88 136 Q100 128 112 136" stroke="#1d2b52" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        ) : mood === 'think' ? (
          <path d="M92 132 L110 130" stroke="#1d2b52" strokeWidth="4.5" strokeLinecap="round" />
        ) : (
          <path d="M90 130 Q100 136 110 130" stroke="#1d2b52" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        )}

        {/* Celebrate sparkles */}
        {mood === 'celebrate' && (
          <g fill="#ffd970">
            <path d="M30 50 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" style={{ animation: 'chang-sparkle 1.2s infinite' }} />
            <path d="M168 44 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" style={{ animation: 'chang-sparkle 1.2s 0.4s infinite' }} />
            <path d="M160 150 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" style={{ animation: 'chang-sparkle 1.2s 0.8s infinite' }} />
          </g>
        )}

        {/* Think bubble */}
        {mood === 'think' && (
          <g fill="rgba(244,247,255,0.9)">
            <circle cx="150" cy="60" r="5" />
            <circle cx="162" cy="46" r="8" />
            <circle cx="178" cy="28" r="11" />
          </g>
        )}
      </svg>
    </div>
  )
}
