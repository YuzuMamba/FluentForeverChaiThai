/** Overall course progress ring for the script hero. */

interface Props {
  done: number
  total: number
  size?: number
}

export default function ProgressRing({ done, total, size = 128 }: Props) {
  const pct = total > 0 ? done / total : 0
  const stroke = 9
  const r = (size - stroke) / 2 - 2
  const c = 2 * Math.PI * r
  return (
    <div className="pring" style={{ width: size, height: size }} role="img" aria-label={`${done} of ${total} script lessons complete`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="pring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#43f0b6" />
            <stop offset="1" stopColor="#1a8fd0" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="rgba(12,20,40,0.6)" stroke="rgba(148,173,224,0.18)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#pring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(pct, total > 0 ? 0.015 : 0))}
          style={{
            transition: 'stroke-dashoffset 900ms var(--ease-spring)',
            filter: 'drop-shadow(0 0 8px rgba(46,230,168,0.45))',
          }}
        />
      </svg>
      <div className="pring-center">
        {total > 0 ? (
          <>
            <div className="pring-big">
              {done}<span className="of"> / {total}</span>
            </div>
            <div className="pring-label">lessons</div>
          </>
        ) : (
          <>
            <div className="pring-big" aria-hidden>🖋️</div>
            <div className="pring-label">soon</div>
          </>
        )}
      </div>
    </div>
  )
}
