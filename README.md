# 🐘 Chai Thai — Learn Thai for Real Life

A production-quality Thai learning app built on the **Fluent Forever** method:
sounds first, images over translations, spaced repetition as the backbone, and
**generative** sentence building instead of phrase memorization. If you finish
the course, you can hold casual everyday conversations in Thai — ordering
food, taking taxis, making plans, telling stories.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm test           # engine + content integrity tests
npm run shots      # Playwright screenshots of every screen (needs dev server)
```

## The method (Fluent Forever → features)

| Principle | Implementation |
| --- | --- |
| Train your ears first | Ear-training mode with tone minimal pairs (ใกล้/ไกล, ขาว/ข่าว/ข้าว) |
| Images beat translations | Every word carries a visual mnemonic and a usage note |
| Spaced repetition backbone | Every word, sentence, letter, and pair is an SRS card (SM-2 with learning steps); decks per unit with memory-strength meters |
| Understand, don't memorize | Patterns are taught as "sentence machines" with the *why*, then drilled |
| Production over recognition | Exercises escalate: recognize → match → arrange → type → **build novel sentences** |
| Generative language ability | **Sentence Builder** recombines learned patterns × vocabulary into sentences the learner has *never seen* — the combinatorial power meter shows how many sentences you can build right now |
| Script is its own journey | 12-lesson reading course: consonant classes, vowels, tone rules, clusters, then reading real street signs & menus |

## Curriculum

20 conversational units (greetings → food → taxis → feelings → plans →
stories), ~450+ words, ~40 sentence patterns, ~250 curriculum sentences, a
complete 44-consonant/25-vowel script course, and tone minimal pairs — all
validated by machine-checked integrity tests (progressive unlocking is
enforced: a unit's sentences may only use words already introduced).

## Architecture

- **Vite + React 19 + TypeScript**, strict.
- **three.js / react-three-fiber** — living world backdrop (lantern dusk sky,
  firefly shaders, bloom), mouse parallax.
- **zustand** — persisted progress store (SRS cards, XP, streak, settings) +
  live session state machine.
- **WebAudio sound design** — every UI sound synthesized on a pentatonic
  ranat-inspired palette; no audio assets.
- **Web Speech API** — Thai TTS for every word and sentence (best available
  th-TH voice; slow-replay turtle button). The audio layer is a service, so
  native recordings can be dropped in without touching call sites.
- **Content as typed data** — words/sentences/patterns are validated
  TypeScript modules; sentences are token arrays of word ids, which is what
  makes the generative Sentence Builder (and honest distractor selection)
  possible.

## Testing

- `src/content/content.test.ts` — registry integrity: every reference
  resolves, progressive unlocking holds, curriculum scale thresholds, novel
  generation works at every stage.
- `src/srs/scheduler.test.ts` — scheduler behavior (graduation, lapses,
  strength decay, queueing).
- `src/engine/lessons.test.ts` — generator invariants.
- `scripts/screenshot.mjs` — full-app visual regression harness
  (desktop + mobile), used by the AAA visual-review loop during development.
