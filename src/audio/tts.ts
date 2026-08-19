/**
 * Thai text-to-speech service.
 *
 * Uses the Web Speech API with the best available th-TH voice. Every surface
 * that plays Thai goes through here, so real native recordings can be dropped
 * in later by routing ids to audio files without touching call sites.
 */

export interface SpeakOptions {
  rate?: number // 1 = normal, 0.7 = slow replay
  onStart?: () => void
  onEnd?: () => void
}

class TtsService {
  private voice: SpeechSynthesisVoice | null = null
  private loaded = false
  private listeners = new Set<(available: boolean) => void>()

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.pickVoice()
      window.speechSynthesis.addEventListener?.('voiceschanged', () => this.pickVoice())
    }
  }

  private pickVoice() {
    const voices = window.speechSynthesis.getVoices()
    if (!voices.length) return
    this.loaded = true
    // Prefer explicit th-TH; fall back to any 'th' voice. Prefer non-default
    // "natural"/"premium" voices when the platform exposes several.
    const thai = voices.filter((v) => v.lang?.toLowerCase().startsWith('th'))
    this.voice =
      thai.find((v) => /natural|premium|enhanced/i.test(v.name)) ??
      thai.find((v) => /google/i.test(v.name)) ??
      thai[0] ??
      null
    this.listeners.forEach((l) => l(this.voice !== null))
  }

  get available(): boolean {
    return this.voice !== null
  }

  /** True until the voices list has loaded at least once. */
  get pending(): boolean {
    return !this.loaded
  }

  onAvailability(cb: (available: boolean) => void): () => void {
    this.listeners.add(cb)
    return () => this.listeners.delete(cb)
  }

  speak(thai: string, opts: SpeakOptions = {}): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      opts.onEnd?.()
      return
    }
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(thai)
    u.lang = 'th-TH'
    if (this.voice) u.voice = this.voice
    u.rate = opts.rate ?? 0.92
    u.pitch = 1
    u.onstart = () => opts.onStart?.()
    u.onend = () => opts.onEnd?.()
    u.onerror = () => opts.onEnd?.()
    synth.speak(u)
  }

  stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }
}

export const tts = new TtsService()
