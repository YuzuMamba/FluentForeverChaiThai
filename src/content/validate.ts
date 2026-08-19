/**
 * Content integrity validation. Run in tests and at dev-time so content
 * authored in parallel can never silently break the engine.
 */
import type { ContentRegistry, Pattern, Sentence, Unit } from './schema'

export function validateRegistry(reg: ContentRegistry): string[] {
  const errors: string[] = []
  const wordIds = new Set(reg.words.keys())

  const checkSentence = (s: Sentence, where: string) => {
    for (const id of s.wordIds) {
      if (!wordIds.has(id)) errors.push(`${where}: sentence '${s.id}' references unknown word '${id}'`)
    }
    if (!s.wordIds.length) errors.push(`${where}: sentence '${s.id}' has no words`)
    if (!s.en) errors.push(`${where}: sentence '${s.id}' missing English`)
  }

  const checkPattern = (p: Pattern, where: string) => {
    const slotNames = new Set(p.slots.map((s) => s.name))
    for (const part of p.parts) {
      if (part.fixed) {
        for (const id of part.fixed) {
          if (!wordIds.has(id)) errors.push(`${where}: pattern '${p.id}' fixed word '${id}' unknown`)
        }
      }
      if (part.slot && !slotNames.has(part.slot)) {
        errors.push(`${where}: pattern '${p.id}' part references undeclared slot '${part.slot}'`)
      }
    }
    for (const slot of p.slots) {
      if (!p.enTemplate.includes(`{${slot.name}}`) && !slot.optional) {
        errors.push(`${where}: pattern '${p.id}' template missing required slot '{${slot.name}}'`)
      }
      for (const id of slot.accepts.wordIds ?? []) {
        if (!wordIds.has(id)) errors.push(`${where}: pattern '${p.id}' slot '${slot.name}' unknown word '${id}'`)
      }
    }
    for (const exId of p.exampleIds) {
      if (!reg.sentences.has(exId)) errors.push(`${where}: pattern '${p.id}' unknown example '${exId}'`)
    }
  }

  const checkUnit = (u: Unit) => {
    for (const id of u.wordIds) if (!wordIds.has(id)) errors.push(`unit ${u.id}: unknown word '${id}'`)
    for (const id of u.sentenceIds) if (!reg.sentences.has(id)) errors.push(`unit ${u.id}: unknown sentence '${id}'`)
    for (const id of u.patternIds) if (!reg.patterns.has(id)) errors.push(`unit ${u.id}: unknown pattern '${id}'`)
    for (const d of u.dialogues) {
      for (const line of d.lines) {
        if (!reg.sentences.has(line.sentenceId)) errors.push(`unit ${u.id}: dialogue '${d.id}' unknown sentence '${line.sentenceId}'`)
      }
    }
  }

  for (const s of reg.sentences.values()) checkSentence(s, 'sentences')
  for (const p of reg.patterns.values()) checkPattern(p, 'patterns')
  for (const u of reg.units) checkUnit(u)

  // Unit ordering sane & unique
  const orders = reg.units.map((u) => u.order)
  if (new Set(orders).size !== orders.length) errors.push('duplicate unit order values')

  // Duplicate word ids across units (words may be REUSED in sentences, but
  // should only be INTRODUCED once).
  const introduced = new Map<string, string>()
  for (const u of reg.units) {
    for (const id of u.wordIds) {
      const prev = introduced.get(id)
      if (prev) errors.push(`word '${id}' introduced in both ${prev} and ${u.id}`)
      introduced.set(id, u.id)
    }
  }

  // Progressive unlocking: a unit's sentences may only use words introduced
  // in that unit or earlier ones (Fluent Forever: new material reuses old).
  const introducedByOrder = new Map<string, number>()
  for (const u of reg.units) {
    for (const id of u.wordIds) introducedByOrder.set(id, u.order)
  }
  for (const u of reg.units) {
    for (const sid of u.sentenceIds) {
      const s = reg.sentences.get(sid)
      if (!s) continue
      for (const wid of s.wordIds) {
        const introducedAt = introducedByOrder.get(wid)
        if (introducedAt !== undefined && introducedAt > u.order) {
          errors.push(`unit ${u.id}: sentence '${sid}' uses word '${wid}' not introduced until unit order ${introducedAt}`)
        }
      }
    }
  }

  // Words must have required display fields.
  for (const w of reg.words.values()) {
    if (!w.thai) errors.push(`word '${w.id}' missing thai`)
    if (!w.roman) errors.push(`word '${w.id}' missing roman`)
    if (!w.en) errors.push(`word '${w.id}' missing en`)
    if (!w.emoji) errors.push(`word '${w.id}' missing emoji`)
    if (!w.syllables?.length) errors.push(`word '${w.id}' missing syllables`)
  }

  // Script lessons reference known consonants (vowel ids are free-form).
  const consSet = new Set(reg.consonants.map((c) => c.char))
  const vowelSet = new Set(reg.vowels.map((v) => v.id))
  for (const sl of reg.scriptLessons) {
    if (sl.kind === 'consonants') {
      for (const ch of sl.newChars) {
        if (!consSet.has(ch)) errors.push(`script lesson ${sl.id}: unknown consonant '${ch}'`)
      }
    }
    if (sl.kind === 'vowels') {
      for (const ch of sl.newChars) {
        if (!vowelSet.has(ch) && !consSet.has(ch)) errors.push(`script lesson ${sl.id}: unknown vowel id '${ch}'`)
      }
    }
  }

  return errors
}
