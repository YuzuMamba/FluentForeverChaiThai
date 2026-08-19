/**
 * Confetti burst — DOM-based physics (gravity + drag), crisp and cheap.
 * Fire on lesson complete, streak milestones, unlocks.
 */
import { useEffect, useRef } from 'react'

const COLORS = ['#ffb020', '#2ee6a8', '#4cc9ff', '#b48cff', '#ff5a78', '#ffc94d', '#b8e94c']

interface Piece {
  x: number; y: number; vx: number; vy: number
  rot: number; vr: number; w: number; h: number
  color: string; shape: 'rect' | 'circle'
  wobble: number
}

export default function Confetti({ count = 120, origin }: { count?: number; origin?: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const ox = origin?.x ?? W / 2
    const oy = origin?.y ?? H * 0.35
    const pieces: Piece[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 6 + Math.random() * 13
      return {
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 7,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        w: 7 + Math.random() * 7,
        h: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() < 0.75 ? 'rect' : 'circle',
        wobble: Math.random() * Math.PI * 2,
      }
    })

    let raf = 0
    let frame = 0
    const tick = () => {
      frame++
      ctx.clearRect(0, 0, W, H)
      let alive = false
      for (const p of pieces) {
        p.vy += 0.32
        p.vx *= 0.985
        p.vy *= 0.985
        p.wobble += 0.12
        p.x += p.vx + Math.sin(p.wobble) * 0.6
        p.y += p.vy
        p.rot += p.vr
        if (p.y < H + 30) alive = true
        const fade = frame > 130 ? Math.max(0, 1 - (frame - 130) / 50) : 1
        ctx.save()
        ctx.globalAlpha = fade
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.scale(1, Math.sin(p.wobble) * 0.6 + 0.7)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        else {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2.4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
      if (alive && frame < 190) raf = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, W, H)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [count, origin])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 90, pointerEvents: 'none' }}
      aria-hidden
    />
  )
}
