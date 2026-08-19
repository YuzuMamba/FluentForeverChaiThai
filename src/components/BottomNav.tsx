import { useRouter, type Screen } from '@/state/router'
import { sfx } from '@/audio/sfx'
import { useProgress } from '@/state/progress'

const ITEMS: Array<{ screen: Screen; icon: string; label: string; match: string[] }> = [
  { screen: { name: 'home' }, icon: '🗺️', label: 'LEARN', match: ['home', 'unit', 'lesson'] },
  { screen: { name: 'script' }, icon: 'ก', label: 'SCRIPT', match: ['script', 'script-lesson'] },
  { screen: { name: 'builder' }, icon: '🧱', label: 'BUILD', match: ['builder'] },
  { screen: { name: 'review' }, icon: '🗂️', label: 'REVIEW', match: ['review', 'ear'] },
  { screen: { name: 'profile' }, icon: '🐘', label: 'ME', match: ['profile'] },
]

/** Floating bottom navigation pill. */
export default function BottomNav() {
  const current = useRouter((s) => s.screen)
  const go = useRouter((s) => s.go)
  const sound = useProgress((s) => s.settings.sound)

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {ITEMS.map((item) => {
        const active = item.match.includes(current.name)
        return (
          <button
            key={item.label}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => {
              if (sound) sfx.play('pop')
              go(item.screen)
            }}
            aria-current={active ? 'page' : undefined}
          >
            <span className="nav-ico" style={item.label === 'SCRIPT' ? { fontFamily: 'var(--font-thai)', fontWeight: 700 } : undefined}>
              {item.icon}
            </span>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
