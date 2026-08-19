/** Shared metadata for script-lesson kinds + consonant classes. */
import type { ConsonantClass, ScriptLesson } from '@/content/schema'

export interface KindMeta {
  label: string
  color: string
  /** Dark edge for chunky 3D nodes. */
  edge: string
  icon: string
}

export const KIND_META: Record<ScriptLesson['kind'], KindMeta> = {
  consonants: { label: 'Consonants', color: '#4cc9ff', edge: '#0d5c8f', icon: 'ก' },
  vowels: { label: 'Vowels', color: '#b48cff', edge: '#5a3bab', icon: 'สระ' },
  tones: { label: 'Tones', color: '#ffb020', edge: '#8f5c00', icon: '🎵' },
  reading: { label: 'Reading', color: '#2ee6a8', edge: '#0a7a58', icon: '📖' },
}

export const CLASS_META: Record<ConsonantClass, { label: string; color: string; blurb: string }> = {
  mid: { label: 'Mid class', color: '#4cc9ff', blurb: 'the strict ones — all five tones, by the book' },
  high: { label: 'High class', color: '#b48cff', blurb: 'breathy starters — default to a rising voice' },
  low: { label: 'Low class', color: '#2ee6a8', blurb: 'the mellow majority — default to a level voice' },
}

export function classColor(cls: ConsonantClass): string {
  return CLASS_META[cls].color
}
