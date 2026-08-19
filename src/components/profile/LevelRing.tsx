/**
 * Level ring — circular XP progress with a gold→mango gradient stroke and the
 * current level in the center. Animates the sweep in on mount.
 */
import { useEffect, useState } from 'react'

interface Props {
  level: number
  /** XP earned inside the current level. */
  into: number
  /** XP required to finish the current level. */
  needed: number
  size?: number
}

export default function LevelRing({ level, into, needed, size = 128 }: Props) {
  const stroke = 11
  const r = (size - stroke) / 2 - 2
  const c = 2 * Math.PI * r
  const pct = needed > 0 ? Math.min(1, Math.max(0, into / needed)) : 0
  // Keep a sliver visible so the ring never looks broken at 0 XP.
  const sweep = Math.max(0.02, pct)

  const [armed, setArmed] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setArmed(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className="level-ring"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Level ${level}, ${into} of ${needed} XP into this level`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="level-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffc94d" />
            <stop offset="0.55" stopColor="#ffb020" />
            <stop offset="1" stopColor="#ff8a3d" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="rgba(12, 20, 40, 0.55)"
          stroke="rgba(148, 173, 224, 0.16)"
          strokeWidth={stroke}
        />
        {/* Soft halo behind the lit arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255, 176, 32, 0.28)"
          strokeWidth={stroke + 6}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={armed ? c * (1 - sweep) : c}
          style={{ transition: 'stroke-dashoffset 1000ms var(--ease-out)', filter: 'blur(5px)' }}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#level-ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={armed ? c * (1 - sweep) : c}
          style={{ transition: 'stroke-dashoffset 1000ms var(--ease-out)' }}
        />
      </svg>
      <div className="center">
        <div>
          <div className="lvl-word">Level</div>
          <div className="lvl-num">{level}</div>
        </div>
      </div>
    </div>
  )
}
