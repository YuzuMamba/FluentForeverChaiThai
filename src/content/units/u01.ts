/**
 * Unit 1 — Greetings & Politeness. สวัสดี!
 * The exemplar unit: image-first words, real conversational Thai, particles
 * from day one (you cannot speak polite Thai without ครับ/ค่ะ).
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.hello', thai: 'สวัสดี', roman: 'sà-wàt-dii', en: 'hello', enAlt: ['hi', 'goodbye'],
    syllables: [
      { thai: 'สะ', roman: 'sa', tone: 'low' },
      { thai: 'หวัด', roman: 'wat', tone: 'low' },
      { thai: 'ดี', roman: 'dii', tone: 'mid' },
    ],
    pos: 'interj', emoji: '🙏', tags: ['core', 'standalone'],
    note: 'Used for both hello AND goodbye, any time of day. Pair it with a wai (palms together).',
  },
  {
    id: 'w.polite-m', thai: 'ครับ', roman: 'kráp', en: 'polite word ♂', enAlt: ['krap', 'khrap'],
    syllables: [{ thai: 'ครับ', roman: 'krap', tone: 'high' }],
    pos: 'particle', emoji: '🧑', tags: ['core', 'particle'],
    note: 'Male speakers end sentences with ครับ to be polite. In fast speech it often sounds like "káp".',
    formality: 'polite',
  },
  {
    id: 'w.polite-f', thai: 'ค่ะ', roman: 'kâ', en: 'polite word ♀', enAlt: ['ka', 'kha'],
    syllables: [{ thai: 'ค่ะ', roman: 'ka', tone: 'falling' }],
    pos: 'particle', emoji: '👩', tags: ['core', 'particle'],
    note: 'Female speakers end statements with ค่ะ (falling tone). In questions it becomes คะ (high tone).',
    formality: 'polite',
  },
  {
    id: 'w.thanks', thai: 'ขอบคุณ', roman: 'kɔ̀ɔp-kun', en: 'thank you', enAlt: ['thanks'],
    syllables: [
      { thai: 'ขอบ', roman: 'kɔɔp', tone: 'low' },
      { thai: 'คุณ', roman: 'kun', tone: 'mid' },
    ],
    pos: 'interj', emoji: '💛', tags: ['core', 'standalone'],
    note: 'For small everyday thanks, Thais often just smile — but ขอบคุณ ครับ/ค่ะ is always right.',
  },
  {
    id: 'w.sorry', thai: 'ขอโทษ', roman: 'kɔ̌ɔ-tôot', en: 'sorry', enAlt: ['excuse me'],
    syllables: [
      { thai: 'ขอ', roman: 'kɔɔ', tone: 'rising' },
      { thai: 'โทษ', roman: 'toot', tone: 'falling' },
    ],
    pos: 'interj', emoji: '🙇', tags: ['core', 'standalone'],
    note: 'Both "sorry" and "excuse me" — use it to get past someone or to get a server\'s attention.',
  },
  {
    id: 'w.yes', thai: 'ใช่', roman: 'châi', en: 'yes', enAlt: ['right', 'correct'],
    syllables: [{ thai: 'ใช่', roman: 'chai', tone: 'falling' }],
    pos: 'interj', emoji: '✅', tags: ['core', 'standalone'],
    note: 'Literally "that\'s right". Thais also answer yes by repeating the verb of the question.',
  },
  {
    id: 'w.not', thai: 'ไม่', roman: 'mâi', en: 'not', enAlt: ['no'],
    syllables: [{ thai: 'ไม่', roman: 'mai', tone: 'falling' }],
    pos: 'adv', emoji: '🚫', tags: ['core'],
    note: 'Negates whatever follows it: ไม่ใช่ = "not right" = no. The falling tone matters!',
  },
  {
    id: 'w.i-m', thai: 'ผม', roman: 'pǒm', en: 'I ♂', enAlt: ['i', 'me'],
    syllables: [{ thai: 'ผม', roman: 'pom', tone: 'rising' }],
    pos: 'pronoun', emoji: '🙋‍♂️', tags: ['core', 'person'],
    note: '"I" for male speakers. Also the word for "hair" — context makes it obvious.',
  },
  {
    id: 'w.i-f', thai: 'ฉัน', roman: 'chǎn', en: 'I ♀', enAlt: ['i', 'me'],
    syllables: [{ thai: 'ฉัน', roman: 'chan', tone: 'rising' }],
    pos: 'pronoun', emoji: '🙋‍♀️', tags: ['core', 'person'],
    note: '"I" for female speakers in everyday talk. Often dropped entirely once context is clear.',
  },
  {
    id: 'w.you', thai: 'คุณ', roman: 'kun', en: 'you', enAlt: ['khun'],
    syllables: [{ thai: 'คุณ', roman: 'kun', tone: 'mid' }],
    pos: 'pronoun', emoji: '👉', tags: ['core', 'person'],
    note: 'Polite "you", and the title before names: คุณ Anna = Ms. Anna. Same word as in ขอบคุณ.',
  },
  {
    id: 'w.fine', thai: 'สบายดี', roman: 'sà-baai-dii', en: 'fine', enAlt: ['well', "i'm fine"],
    syllables: [
      { thai: 'สะ', roman: 'sa', tone: 'low' },
      { thai: 'บาย', roman: 'baai', tone: 'mid' },
      { thai: 'ดี', roman: 'dii', tone: 'mid' },
    ],
    pos: 'adj', emoji: '😌', tags: ['core', 'standalone', 'feeling'],
    note: 'สบาย = comfortable, ดี = good. Together: "comfortably good" — the standard "I\'m fine".',
  },
  {
    id: 'w.q-mai', thai: 'ไหม', roman: 'mǎi', en: 'yes/no ?', enAlt: ['mai', 'question word'],
    syllables: [{ thai: 'ไหม', roman: 'mai', tone: 'rising' }],
    pos: 'question', emoji: '❓', tags: ['core', 'particle'],
    note: 'Turns a statement into a yes/no question. สบายดี = I\'m fine → สบายดีไหม = Are you well?',
  },
  {
    id: 'w.see-you', thai: 'เจอกัน', roman: 'jəə-gan', en: 'see you!', enAlt: ['see you later', 'bye'],
    syllables: [
      { thai: 'เจอ', roman: 'jəə', tone: 'mid' },
      { thai: 'กัน', roman: 'gan', tone: 'mid' },
    ],
    pos: 'phrase', emoji: '👋', tags: ['core', 'standalone'],
    note: 'Literally "meet each other" — the casual way friends say goodbye.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.hello-m', wordIds: ['w.hello', 'w.polite-m'],
    en: 'Hello! (male speaker)', enAlt: ['hello', 'hi'],
    literal: 'hello + ♂-polite', patternId: 'p.polite-m', tags: ['greeting'],
  },
  {
    id: 's.hello-f', wordIds: ['w.hello', 'w.polite-f'],
    en: 'Hello! (female speaker)', enAlt: ['hello', 'hi'],
    literal: 'hello + ♀-polite', patternId: 'p.polite-f', tags: ['greeting'],
  },
  {
    id: 's.thanks-m', wordIds: ['w.thanks', 'w.polite-m'],
    en: 'Thank you! (male speaker)', enAlt: ['thanks'],
    literal: 'thank-you + ♂-polite', patternId: 'p.polite-m',
  },
  {
    id: 's.thanks-f', wordIds: ['w.thanks', 'w.polite-f'],
    en: 'Thank you! (female speaker)', enAlt: ['thanks'],
    literal: 'thank-you + ♀-polite', patternId: 'p.polite-f',
  },
  {
    id: 's.sorry-m', wordIds: ['w.sorry', 'w.polite-m'],
    en: 'Excuse me. (male speaker)', enAlt: ['sorry'],
    literal: 'sorry + ♂-polite', patternId: 'p.polite-m',
  },
  {
    id: 's.how-are-you', wordIds: ['w.fine', 'w.q-mai'],
    en: 'How are you?', enAlt: ['are you well?', 'are you fine?'],
    literal: 'fine + ?', patternId: 'p.mai-question',
    tags: ['greeting'],
  },
  {
    id: 's.how-are-you-m', wordIds: ['w.fine', 'w.q-mai', 'w.polite-m'],
    en: 'How are you? (male speaker)', enAlt: ['are you well?'],
    literal: 'fine + ? + ♂-polite', patternId: 'p.mai-question',
  },
  {
    id: 's.im-fine-f', wordIds: ['w.fine', 'w.polite-f'],
    en: "I'm fine. (female speaker)", enAlt: ["i'm well"],
    literal: 'fine + ♀-polite', patternId: 'p.polite-f',
  },
  {
    id: 's.yes-m', wordIds: ['w.yes', 'w.polite-m'],
    en: 'Yes. (male speaker)', enAlt: ['yes', "that's right"],
    literal: 'right + ♂-polite',
  },
  {
    id: 's.no-f', wordIds: ['w.not', 'w.yes', 'w.polite-f'],
    en: 'No. (female speaker)', enAlt: ['no', "that's not right"],
    literal: 'not + right + ♀-polite',
  },
  {
    id: 's.see-you-m', wordIds: ['w.see-you', 'w.polite-m'],
    en: 'See you! (male speaker)', enAlt: ['see you later', 'bye'],
    literal: 'meet-each-other + ♂-polite',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.polite-m',
    name: '___ + ครับ (male politeness)',
    parts: [{ slot: 'phrase' }, { fixed: ['w.polite-m'] }],
    slots: [{ name: 'phrase', accepts: { tags: ['standalone'] } }],
    enTemplate: '{phrase} (polite, male speaker)',
    explanation:
      'Male speakers add ครับ (kráp) to the end of almost anything to make it polite. ' +
      'It has no meaning of its own — it is pure social warmth. Master this one habit ' +
      'and every phrase you know becomes polite Thai.',
    literal: '[anything] + ครับ',
    exampleIds: ['s.hello-m', 's.thanks-m', 's.sorry-m'],
  },
  {
    id: 'p.polite-f',
    name: '___ + ค่ะ (female politeness)',
    parts: [{ slot: 'phrase' }, { fixed: ['w.polite-f'] }],
    slots: [{ name: 'phrase', accepts: { tags: ['standalone'] } }],
    enTemplate: '{phrase} (polite, female speaker)',
    explanation:
      'Female speakers end statements with ค่ะ (kâ, falling tone). ' +
      'The same politeness habit as ครับ — attach it to anything you say.',
    literal: '[anything] + ค่ะ',
    exampleIds: ['s.hello-f', 's.thanks-f', 's.im-fine-f'],
  },
  {
    id: 'p.mai-question',
    name: '___ + ไหม (yes/no question)',
    parts: [{ slot: 'statement' }, { fixed: ['w.q-mai'] }],
    slots: [{ name: 'statement', accepts: { tags: ['standalone'], exclude: ['w.hello', 'w.thanks', 'w.sorry', 'w.see-you'] } }],
    enTemplate: 'Ask: “{statement}?”',
    explanation:
      'Thai has no word-order change for questions. Say the statement, add ไหม (mǎi) — done. ' +
      'สบายดี "I\'m fine" → สบายดีไหม "Are you fine?" Any statement you learn instantly becomes a question.',
    literal: '[statement] + ไหม',
    exampleIds: ['s.how-are-you', 's.how-are-you-m'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u01',
    order: 1,
    title: 'Greetings & Politeness',
    subtitle: 'สวัสดี — your first words',
    emoji: '🙏',
    color: '#ffb020',
    outcome: 'Greet anyone in Thailand, thank them, apologize, and ask how they are — politely.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Politeness particles: ครับ & ค่ะ',
        body:
          'Thai sentences end with a politeness particle based on the SPEAKER\'s gender: men say ครับ (kráp), women say ค่ะ (kâ). ' +
          'They mean nothing by themselves — they are pure politeness. Use them with strangers, elders, and service staff. ' +
          'Friends drop them.',
      },
      {
        title: 'Questions cost nothing',
        body:
          'To ask a yes/no question, say the statement and add ไหม (mǎi). ' +
          'No word-order gymnastics like English. สบายดี → สบายดีไหม = fine → are you fine?',
      },
      {
        title: 'Tones are the words',
        body:
          'ไม่ (mâi, falling) = not, ไหม (mǎi, rising) = question mark. Same letters to your ear at first — different words. ' +
          'This is why every word here shows its tone. Trust the audio, mimic the melody.',
      },
    ],
    dialogues: [
      {
        id: 'd.u01-meet',
        title: 'Meeting a neighbor',
        scene: 'Anan (♂) passes his neighbor Bua (♀) in the hallway.',
        lines: [
          { speaker: 'Anan', sentenceId: 's.hello-m' },
          { speaker: 'Bua', sentenceId: 's.hello-f' },
          { speaker: 'Anan', sentenceId: 's.how-are-you-m' },
          { speaker: 'Bua', sentenceId: 's.im-fine-f' },
          { speaker: 'Bua', sentenceId: 's.thanks-f' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
