/** Ear training — PLACEHOLDER, to be replaced with the real screen. */
import { useRouter } from '@/state/router'

export default function EarScreen() {
  const go = useRouter((s) => s.go)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div className="card anim-pop" style={{ padding: 40, textAlign: 'center', maxWidth: 480 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Ear training</h1>
        <p style={{ color: 'var(--text-2)', marginBottom: 24 }}>EarScreen placeholder</p>
        <button className="btn btn-gold" onClick={() => go({ name: 'home' })}>Home</button>
      </div>
    </div>
  )
}
