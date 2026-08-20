/**
 * 14-day XP activity chart — pure SVG. Gold gradient bars with rounded tops,
 * a dashed daily-goal line, subtle grid, and today lit up bright.
 */
import { useEffect, useMemo, useState } from 'react'
import { todayKey, type DayStat } from '@/state/progress'

interface Props {
  history: DayStat[]
  goalXp: number
  className?: string
  style?: React.CSSProperties
}

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

/** Bar with rounded top corners only, sitting flush on the baseline. */
function barPath(x: number, w: number, h: number, baseY: number): string {
  const r = Math.min(w / 2, 7, h)
  const top = baseY - h
  return [
    `M ${x} ${baseY}`,
    `L ${x} ${top + r}`,
    `Q ${x} ${top} ${x + r} ${top}`,
    `L ${x + w - r} ${top}`,
    `Q ${x + w} ${top} ${x + w} ${top + r}`,
    `L ${x + w} ${baseY}`,
    'Z',
  ].join(' ')
}

/** Narrower viewBox on small screens so SVG text stays legible when scaled. */
function useCompact(): boolean {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

export default function ActivityChart({ history, goalXp, className = '', style }: Props) {
  const compact = useCompact()
  const W = compact ? 372 : 600
  const H = compact ? 232 : 216
  const PAD_L = 8
  const PAD_R = 8
  const PAD_B = 26
  const PLOT_H = H - (compact ? 34 : 30) - PAD_B
  const PLOT_W = W - PAD_L - PAD_R
  const BASE_Y = H - PAD_B
  const days = useMemo(() => {
    const byDay = new Map(history.map((h) => [h.day, h]))
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (13 - i))
      const key = todayKey(d)
      return {
        key,
        dow: DOW[d.getDay()],
        xp: byDay.get(key)?.xp ?? 0,
        isToday: i === 13,
      }
    })
  }, [history])

  const totalXp = days.reduce((s, d) => s + d.xp, 0)
  const activeDays = days.filter((d) => d.xp > 0).length
  const maxV = Math.max(goalXp * 1.35, ...days.map((d) => d.xp), 10)
  const yOf = (v: number) => BASE_Y - (v / maxV) * PLOT_H

  const slotW = PLOT_W / 14
  const barW = Math.min(26, slotW * 0.58)
  const goalY = yOf(goalXp)

  return (
    <div className={`card chart-card ${className}`} style={style}>
      <div className="chart-head">
        <div>
          <div className="chart-kicker">Activity</div>
          <div className="chart-title">Last 14 days</div>
        </div>
        <div className="chart-figs">
          <div className="fig">
            <div className="v" style={{ color: 'var(--gold-bright)' }}>{totalXp.toLocaleString()} XP</div>
            <div className="k">earned</div>
          </div>
          <div className="fig">
            <div className="v">{activeDays}/14</div>
            <div className="k">days active</div>
          </div>
          <div className="fig">
            <div className="v" style={{ color: 'var(--jade)' }}>
              <span aria-hidden style={{ letterSpacing: '0.08em', marginRight: 4, opacity: 0.8 }}>┄</span>
              {goalXp} XP
            </div>
            <div className="k">daily goal</div>
          </div>
        </div>
      </div>

      <div className="chart-body">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`XP per day over the last 14 days, ${totalXp} XP total`}>
          <defs>
            <linearGradient id="act-bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffc94d" />
              <stop offset="1" stopColor="#c77b0a" />
            </linearGradient>
            <linearGradient id="act-bar-today" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe9a8" />
              <stop offset="0.4" stopColor="#ffc94d" />
              <stop offset="1" stopColor="#ff8a3d" />
            </linearGradient>
            <filter id="act-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle grid */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1={PAD_L}
              x2={W - PAD_R}
              y1={BASE_Y - PLOT_H * f}
              y2={BASE_Y - PLOT_H * f}
              stroke="rgba(148, 173, 224, 0.09)"
              strokeWidth="1"
            />
          ))}
          <line x1={PAD_L} x2={W - PAD_R} y1={BASE_Y} y2={BASE_Y} stroke="rgba(148, 173, 224, 0.22)" strokeWidth="1.5" />

          {/* Bars */}
          {days.map((d, i) => {
            const cx = PAD_L + slotW * i + slotW / 2
            const x = cx - barW / 2
            const h = d.xp > 0 ? Math.max(6, (d.xp / maxV) * PLOT_H) : 0
            return (
              <g key={d.key}>
                <title>{`${d.key} · ${d.xp} XP`}</title>
                {d.xp > 0 ? (
                  <path
                    className="chart-bar"
                    d={barPath(x, barW, h, BASE_Y)}
                    fill={d.isToday ? 'url(#act-bar-today)' : 'url(#act-bar)'}
                    opacity={d.isToday ? 1 : 0.82}
                    filter={d.isToday ? 'url(#act-glow)' : undefined}
                    style={{ animationDelay: `${120 + i * 45}ms` }}
                  />
                ) : (
                  /* Empty-day stub */
                  <rect
                    className="chart-bar"
                    x={x}
                    y={BASE_Y - 4}
                    width={barW}
                    height={4}
                    rx={2}
                    fill={d.isToday ? 'rgba(255, 176, 32, 0.4)' : 'rgba(148, 173, 224, 0.2)'}
                    style={{ animationDelay: `${120 + i * 45}ms` }}
                  />
                )}
                {/* Today's value floating above its bar */}
                {d.isToday && d.xp > 0 && (
                  <text
                    x={cx}
                    y={BASE_Y - h - 9}
                    textAnchor="middle"
                    fontSize={compact ? 11.5 : 12.5}
                    fontWeight="800"
                    fill="var(--gold-bright)"
                    fontFamily="var(--font-display)"
                  >
                    +{d.xp}
                  </text>
                )}
                <text
                  x={cx}
                  y={H - 8}
                  textAnchor="middle"
                  fontSize={compact ? 9.5 : 10.5}
                  fontWeight={d.isToday ? 800 : 700}
                  fill={d.isToday ? 'var(--gold)' : 'var(--text-3)'}
                  fontFamily="var(--font-display)"
                  letterSpacing="0.03em"
                >
                  {d.isToday ? 'NOW' : d.dow}
                </text>
              </g>
            )
          })}

          {/* Daily goal line (recedes when the chart is empty so the
              empty-state note stays legible) */}
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={goalY}
            y2={goalY}
            stroke="var(--jade)"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            opacity={totalXp === 0 ? 0.22 : 0.65}
          />
        </svg>

        {totalXp === 0 && (
          <div className="chart-empty-note">
            <span>
              Quiet nights so far — your first lesson
              <br />
              lights the first bar. ✨
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
