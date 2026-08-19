/** One glowing stat tile: icon medallion, big number, uppercase label. */

interface Props {
  icon: string
  value: number
  label: string
  accent: string
  delay?: number
}

export default function StatTile({ icon, value, label, accent, delay = 0 }: Props) {
  return (
    <div
      className="card stat-tile anim-pop"
      style={{ ['--acc' as string]: accent, animationDelay: `${delay}ms` }}
    >
      <span className="stat-ico" aria-hidden>{icon}</span>
      <div>
        <div className="stat-value">{value.toLocaleString()}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}
