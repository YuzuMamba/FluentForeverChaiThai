/**
 * Sound design engine — every UI sound is synthesized with WebAudio.
 * Warm, marimba-like tones with soft attack; designed as a coherent palette
 * (pentatonic, evoking Thai ranat xylophone) rather than generic beeps.
 */

type SfxName =
  | 'tap' | 'select' | 'deselect' | 'correct' | 'wrong' | 'combo'
  | 'complete' | 'levelup' | 'unlock' | 'whoosh' | 'flip' | 'xp'
  | 'streak' | 'pop' | 'type'

class SfxEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  enabled = true

  private ensure(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as any).webkitAudioContext
      if (!AC) return null
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.5
      const comp = this.ctx.createDynamicsCompressor()
      comp.threshold.value = -18
      comp.ratio.value = 6
      this.master.connect(comp)
      comp.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  setVolume(v: number) {
    if (this.master) this.master.gain.value = Math.max(0, Math.min(1, v))
  }

  /** Marimba-ish note: sine fundamental + 4th harmonic ping, fast decay. */
  private note(freq: number, t0: number, dur = 0.35, vol = 1, type: OscillatorType = 'sine') {
    const ctx = this.ctx!
    const g = this.ctx!.createGain()
    g.connect(this.master!)
    g.gain.setValueAtTime(0, t0)
    g.gain.linearRampToValueAtTime(0.32 * vol, t0 + 0.008)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)

    const o = ctx.createOscillator()
    o.type = type
    o.frequency.setValueAtTime(freq, t0)
    o.connect(g)
    o.start(t0)
    o.stop(t0 + dur + 0.05)

    const g2 = ctx.createGain()
    g2.connect(this.master!)
    g2.gain.setValueAtTime(0, t0)
    g2.gain.linearRampToValueAtTime(0.07 * vol, t0 + 0.004)
    g2.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 0.4)
    const o2 = ctx.createOscillator()
    o2.type = 'sine'
    o2.frequency.setValueAtTime(freq * 4, t0)
    o2.connect(g2)
    o2.start(t0)
    o2.stop(t0 + dur * 0.5)
  }

  private noiseBurst(t0: number, dur = 0.12, vol = 0.25, hp = 1200) {
    const ctx = this.ctx!
    const len = Math.floor(ctx.sampleRate * dur)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
    const src = ctx.createBufferSource()
    src.buffer = buf
    const f = ctx.createBiquadFilter()
    f.type = 'highpass'
    f.frequency.value = hp
    const g = ctx.createGain()
    g.gain.setValueAtTime(vol, t0)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    src.connect(f); f.connect(g); g.connect(this.master!)
    src.start(t0)
  }

  play(name: SfxName) {
    if (!this.enabled) return
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime + 0.01
    // Pentatonic palette (A major pent-ish): warm and Thai-ranat flavored.
    const P = { c4: 261.6, d4: 293.7, e4: 329.6, g4: 392, a4: 440, c5: 523.3, d5: 587.3, e5: 659.3, g5: 784, a5: 880, c6: 1046.5, e6: 1318.5 }
    switch (name) {
      case 'tap': this.note(P.a4, t, 0.12, 0.5); break
      case 'type': this.note(P.e5, t, 0.06, 0.22); break
      case 'pop': this.note(P.c5, t, 0.1, 0.45); this.noiseBurst(t, 0.05, 0.1, 2500); break
      case 'select': this.note(P.c5, t, 0.14, 0.5); this.note(P.e5, t + 0.03, 0.14, 0.35); break
      case 'deselect': this.note(P.e4, t, 0.12, 0.4); break
      case 'flip': this.noiseBurst(t, 0.14, 0.12, 900); this.note(P.g4, t + 0.02, 0.18, 0.3); break
      case 'whoosh': this.noiseBurst(t, 0.25, 0.18, 500); break
      case 'correct':
        this.note(P.c5, t, 0.3, 0.8)
        this.note(P.e5, t + 0.07, 0.3, 0.7)
        this.note(P.g5, t + 0.14, 0.42, 0.65)
        break
      case 'wrong':
        this.note(233.1, t, 0.28, 0.6, 'triangle')
        this.note(207.7, t + 0.12, 0.4, 0.55, 'triangle')
        break
      case 'combo':
        this.note(P.e5, t, 0.18, 0.6)
        this.note(P.g5, t + 0.05, 0.18, 0.55)
        this.note(P.c6, t + 0.1, 0.3, 0.5)
        break
      case 'xp': this.note(P.a5, t, 0.12, 0.4); this.note(P.c6, t + 0.04, 0.16, 0.3); break
      case 'streak':
        this.note(P.d5, t, 0.16, 0.6)
        this.note(P.a5, t + 0.06, 0.2, 0.5)
        this.noiseBurst(t + 0.02, 0.1, 0.08, 3000)
        break
      case 'complete': {
        const seq = [P.c5, P.e5, P.g5, P.c6, P.e6]
        seq.forEach((f, i) => this.note(f, t + i * 0.09, 0.5, 0.75 - i * 0.06))
        this.noiseBurst(t + 0.36, 0.3, 0.1, 4000)
        break
      }
      case 'levelup': {
        const seq = [P.g4, P.c5, P.e5, P.g5, P.c6]
        seq.forEach((f, i) => this.note(f, t + i * 0.11, 0.6, 0.8 - i * 0.07))
        this.note(P.c6, t + 0.6, 1.1, 0.5)
        this.note(P.e6, t + 0.6, 1.1, 0.35)
        break
      }
      case 'unlock':
        this.note(P.g4, t, 0.2, 0.6)
        this.note(P.d5, t + 0.08, 0.25, 0.55)
        this.note(P.g5, t + 0.16, 0.5, 0.5)
        this.noiseBurst(t + 0.16, 0.2, 0.08, 5000)
        break
    }
  }
}

export const sfx = new SfxEngine()
