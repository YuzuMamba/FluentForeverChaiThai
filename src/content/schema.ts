/**
 * Chai Thai content schema.
 *
 * Fluent Forever principles encoded in the data model:
 *  - Words carry images (emoji), native script, tones, and usage notes — not just translations.
 *  - Sentences are token arrays of word ids, so the engine always knows which
 *    building blocks a sentence uses and can gate content on what's learned.
 *  - Patterns are reusable sentence frames with typed slots, so the Sentence
 *    Builder can generate novel, never-seen sentences from learned pieces.
 *  - Script is its own progression (consonants, vowels, tone rules, reading).
 */

// ───────────────────────────── Tones & phonology ─────────────────────────────

export type Tone = 'mid' | 'low' | 'falling' | 'high' | 'rising'

export const TONE_INFO: Record<Tone, { label: string; mark: string; contour: string; color: string }> = {
  mid: { label: 'Mid', mark: '', contour: '→', color: '#8fa3bf' },
  low: { label: 'Low', mark: '̀', contour: '↘', color: '#4cc9ff' },
  falling: { label: 'Falling', mark: '̂', contour: '⤵', color: '#ff5a78' },
  high: { label: 'High', mark: '́', contour: '↗', color: '#ffb020' },
  rising: { label: 'Rising', mark: '̌', contour: '⤴', color: '#2ee6a8' },
}

export interface Syllable {
  thai: string
  /** Paiboon-style romanization WITHOUT tone mark (mark derived from tone). */
  roman: string
  tone: Tone
}

// ───────────────────────────────── Words ─────────────────────────────────────

export type Pos =
  | 'noun' | 'verb' | 'adj' | 'adv' | 'particle' | 'pronoun' | 'classifier'
  | 'number' | 'question' | 'prep' | 'conj' | 'interj' | 'phrase'

export interface Word {
  /** Stable id: 'w.' + english-ish slug, e.g. 'w.eat', 'w.rice', 'w.polite-m'. */
  id: string
  thai: string
  /** Full romanization with tone diacritics, e.g. 'gin', 'kâao', 'sà-wàt-dii'. */
  roman: string
  syllables: Syllable[]
  /** Primary English meaning, short, fits in a word tile: 'eat', 'rice', 'want to'. */
  en: string
  /** Extra accepted English answers for typing/matching. */
  enAlt?: string[]
  literal?: string
  pos: Pos
  /** Visual mnemonic (Fluent Forever: images beat translations). */
  emoji: string
  /** Why/when Thai people actually use it. 1–2 sentences max. */
  note?: string
  tags?: string[]
  formality?: 'casual' | 'neutral' | 'polite'
}

// ─────────────────────────────── Sentences ───────────────────────────────────

export interface Sentence {
  /** 's.' + slug, e.g. 's.want-eat-rice'. */
  id: string
  /** Ordered word ids. Thai text is derived by joining tokens (Thai is unspaced). */
  wordIds: string[]
  /** Optional display override (e.g. to add a space between clauses). */
  thaiOverride?: string
  /** Natural English meaning. */
  en: string
  /** Accepted alternative English renderings. */
  enAlt?: string[]
  /** Word-by-word gloss: 'I | want | eat | rice'. */
  literal?: string
  patternId?: string
  tags?: string[]
}

// ─────────────────────────────── Patterns ────────────────────────────────────

export interface SlotSpec {
  /** Slot name referenced by the template, e.g. 'verb', 'object', 'place'. */
  name: string
  /** Which learned words may fill this slot. */
  accepts: {
    pos?: Pos[]
    tags?: string[]
    wordIds?: string[]
    /** Word ids explicitly excluded even if pos/tags match. */
    exclude?: string[]
  }
  /** Whether the slot may be omitted (e.g. optional object). */
  optional?: boolean
}

export interface Pattern {
  /** 'p.' + slug, e.g. 'p.want-to'. */
  id: string
  /** Short display name: 'I want to ___'. */
  name: string
  /**
   * The frame as a mix of fixed word ids and slot references.
   * e.g. [{fixed:['w.i-m']},{fixed:['w.want']},{slot:'verb'},{slot:'object'}]
   */
  parts: Array<{ fixed?: string[]; slot?: string }>
  slots: SlotSpec[]
  /**
   * English template with {slot} placeholders: 'I want to {verb} {object}'.
   * Optional slots render as empty when unfilled; whitespace is normalized.
   */
  enTemplate: string
  /** Why the pattern works — the understanding, not the memorization. */
  explanation: string
  /** Literal gloss of the frame: 'I + want + [verb] + [object]'. */
  literal: string
  /** Ids of example sentences that showcase the pattern. */
  exampleIds: string[]
}

// ──────────────────────────────── Dialogues ──────────────────────────────────

export interface DialogueLine {
  speaker: string
  sentenceId: string
}

export interface Dialogue {
  id: string
  title: string
  /** Scene-setting in English: 'Ordering noodles at a street stall'. */
  scene: string
  lines: DialogueLine[]
}

// ───────────────────────────────── Units ─────────────────────────────────────

export interface GrammarNote {
  title: string
  /** Markdown-ish body (plain text + line breaks). Explain WHY, briefly. */
  body: string
}

export interface Unit {
  /** 'u01' … 'u22'. */
  id: string
  order: number
  title: string
  subtitle: string
  emoji: string
  /** Accent color hex for the unit node on the path. */
  color: string
  /** What you can DO after: 'Greet people and be polite anywhere in Thailand.' */
  outcome: string
  wordIds: string[]
  patternIds: string[]
  sentenceIds: string[]
  grammarNotes: GrammarNote[]
  dialogues: Dialogue[]
}

// ─────────────────────────────── Thai script ─────────────────────────────────

export type ConsonantClass = 'mid' | 'high' | 'low'

export interface ThaiConsonant {
  char: string
  /** Acrophonic name: 'gɔɔ gài'. */
  name: string
  /** The mnemonic word: 'chicken'. */
  meaning: string
  emoji: string
  class: ConsonantClass
  /** Sound at syllable start, e.g. 'g'. */
  initial: string
  /** Sound at syllable end ('' if unused as final), e.g. 'k'. */
  final: string
  /** 1 = very common, 2 = common, 3 = rare. */
  freq: 1 | 2 | 3
}

export interface ThaiVowel {
  id: string
  /** Display with dotted-circle placeholder: 'อา' style uses อ as carrier. */
  display: string
  roman: string
  length: 'short' | 'long'
  /** Where it sits relative to the consonant. */
  position: 'after' | 'before' | 'above' | 'below' | 'around'
  /** Example word id from the vocab (preferred) or literal Thai. */
  example: { thai: string; roman: string; en: string; emoji: string }
}

export interface ToneRuleCase {
  /** e.g. 'Mid-class + live syllable, no mark'. */
  condition: string
  tone: Tone
  example: { thai: string; roman: string; en: string }
}

export interface ScriptLesson {
  /** 'sc01' … */
  id: string
  order: number
  title: string
  subtitle: string
  emoji: string
  kind: 'consonants' | 'vowels' | 'tones' | 'reading'
  /** New consonant chars or vowel ids introduced. */
  newChars: string[]
  /** Concept explanation shown before drills. */
  intro: string
  /** Syllables/words the learner can now read: drilled in exercises. */
  readingDrills: Array<{ thai: string; roman: string; tone: Tone; en?: string; emoji?: string }>
  toneRules?: ToneRuleCase[]
}

// ───────────────────────────── Minimal pairs ─────────────────────────────────

export interface MinimalPair {
  id: string
  /** What contrasts: 'tone', 'vowel-length', 'aspiration'. */
  contrast: 'tone' | 'vowel-length' | 'consonant'
  a: { thai: string; roman: string; tone: Tone; en: string; emoji: string }
  b: { thai: string; roman: string; tone: Tone; en: string; emoji: string }
  note?: string
}

// ─────────────────────────────── Registry ────────────────────────────────────

export interface ContentRegistry {
  words: Map<string, Word>
  sentences: Map<string, Sentence>
  patterns: Map<string, Pattern>
  units: Unit[]
  scriptLessons: ScriptLesson[]
  consonants: ThaiConsonant[]
  vowels: ThaiVowel[]
  minimalPairs: MinimalPair[]
}

/** Derive display Thai for a sentence (Thai script is unspaced). */
export function sentenceThai(s: Sentence, words: Map<string, Word>): string {
  if (s.thaiOverride) return s.thaiOverride
  return s.wordIds.map((id) => words.get(id)?.thai ?? '?').join('')
}

/** Derive spaced romanization for a sentence. */
export function sentenceRoman(s: Sentence, words: Map<string, Word>): string {
  return s.wordIds.map((id) => words.get(id)?.roman ?? '?').join(' ')
}

/** Apply tone mark to a romanized syllable's first vowel (display helper). */
export function toneMarked(roman: string, tone: Tone): string {
  const mark = TONE_INFO[tone].mark
  if (!mark) return roman
  const idx = roman.search(/[aeiouɛɔəɯ]/i)
  if (idx === -1) return roman
  return roman.slice(0, idx + 1) + mark + roman.slice(idx + 1)
}
