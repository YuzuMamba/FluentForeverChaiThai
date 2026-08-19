/**
 * Unit 3 — This, That & What. นี่คืออะไร?
 * Point at the world and ask. Two "to be" verbs (คือ for naming things,
 * เป็น for being someone), plus the คน/ภาษา word-building trick that turns
 * one country word into a nationality and a language for free.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.this', thai: 'นี่', roman: 'nîi', en: 'this', enAlt: ['this one'],
    syllables: [{ thai: 'นี่', roman: 'nii', tone: 'falling' }],
    pos: 'pronoun', emoji: '👇', tags: ['core'],
    note: 'Points at something near you. Spoken Thai often skips "is" after it: นี่อะไร = what\'s this?',
  },
  {
    id: 'w.that', thai: 'นั่น', roman: 'nân', en: 'that', enAlt: ['that one'],
    syllables: [{ thai: 'นั่น', roman: 'nan', tone: 'falling' }],
    pos: 'pronoun', emoji: '👆', tags: ['core'],
    note: 'For things a bit away from you. นั่นใคร = "who\'s that?" — point with your chin, not your finger.',
  },
  {
    id: 'w.is', thai: 'คือ', roman: 'kɯɯ', en: 'is (=)', enAlt: ['is', 'be', 'equals'],
    syllables: [{ thai: 'คือ', roman: 'kɯɯ', tone: 'mid' }],
    pos: 'verb', emoji: '🟰', tags: ['core'],
    note: 'The equals sign of Thai: A คือ B identifies A as exactly B. Fast speech often drops it — นี่กระเป๋า works fine.',
  },
  {
    id: 'w.be', thai: 'เป็น', roman: 'bpen', en: 'be (a…)', enAlt: ['is', 'be', 'am'],
    syllables: [{ thai: 'เป็น', roman: 'bpen', tone: 'mid' }],
    pos: 'verb', emoji: '🪪', tags: ['core'],
    note: 'For BEING something — a nationality, a job, a role: เป็นคนไทย, เป็นครู. Its negative is ไม่ใช่, never ไม่เป็น.',
  },
  {
    id: 'w.who', thai: 'ใคร', roman: 'krai', en: 'who', enAlt: ['who?', 'whom'],
    syllables: [{ thai: 'ใคร', roman: 'krai', tone: 'mid' }],
    pos: 'question', emoji: '🕵️', tags: ['core', 'question'],
    note: 'Like อะไร, it sits where the answer will go: นั่นใคร = "that\'s WHO?". No word-order gymnastics.',
  },
  {
    id: 'w.language', thai: 'ภาษา', roman: 'paa-sǎa', en: 'language', enAlt: ['tongue'],
    syllables: [
      { thai: 'ภา', roman: 'paa', tone: 'mid' },
      { thai: 'ษา', roman: 'saa', tone: 'rising' },
    ],
    pos: 'noun', emoji: '💬', tags: ['core'],
    note: 'Prefix it to any country word: ภาษาไทย, ภาษาญี่ปุ่น. One noun unlocks the name of every language.',
  },
  {
    id: 'w.thai', thai: 'ไทย', roman: 'tai', en: 'Thai', enAlt: ['thailand'],
    syllables: [{ thai: 'ไทย', roman: 'tai', tone: 'mid' }],
    pos: 'noun', emoji: '🇹🇭', tags: ['core', 'place'],
    note: 'คนไทย = a Thai person, ภาษาไทย = the Thai language. One word, the whole identity kit.',
  },
  {
    id: 'w.speak', thai: 'พูด', roman: 'pûut', en: 'speak', enAlt: ['talk', 'say'],
    syllables: [{ thai: 'พูด', roman: 'puut', tone: 'falling' }],
    pos: 'verb', emoji: '🗣️', tags: ['core', 'action'],
    note: 'พูดภาษาไทย or just พูดไทย — both are everyday. Say one Thai sentence and you\'ll hear พูดเก่ง ("you speak well!").',
  },
  {
    id: 'w.english', thai: 'อังกฤษ', roman: 'ang-grìt', en: 'English', enAlt: ['england', 'british'],
    syllables: [
      { thai: 'อัง', roman: 'ang', tone: 'mid' },
      { thai: 'กฤษ', roman: 'grit', tone: 'low' },
    ],
    pos: 'noun', emoji: '🇬🇧', tags: ['place'],
    note: '"English" said the Thai way. ภาษาอังกฤษ = the language, คนอังกฤษ = a British person.',
  },
  {
    id: 'w.japan', thai: 'ญี่ปุ่น', roman: 'yîi-bpùn', en: 'Japan', enAlt: ['japanese'],
    syllables: [
      { thai: 'ญี่', roman: 'yii', tone: 'falling' },
      { thai: 'ปุ่น', roman: 'bpun', tone: 'low' },
    ],
    pos: 'noun', emoji: '🇯🇵', tags: ['place'],
    note: 'คนญี่ปุ่น = a Japanese person, ภาษาญี่ปุ่น = Japanese. Country words are Lego bricks in Thai.',
  },
  {
    id: 'w.understand', thai: 'เข้าใจ', roman: 'kâo-jai', en: 'understand', enAlt: ['get it', 'i understand'],
    syllables: [
      { thai: 'เข้า', roman: 'kao', tone: 'falling' },
      { thai: 'ใจ', roman: 'jai', tone: 'mid' },
    ],
    pos: 'verb', emoji: '💡', literal: 'enter heart', tags: ['core', 'standalone'],
    note: 'Literally "enter the heart". ไม่เข้าใจ ("I don\'t understand") is your lifesaver; เข้าใจไหม checks the other side.',
  },
  {
    id: 'w.farang', thai: 'ฝรั่ง', roman: 'fà-ràng', en: 'Westerner', enAlt: ['farang', 'foreigner'],
    syllables: [
      { thai: 'ฝะ', roman: 'fa', tone: 'low' },
      { thai: 'หรั่ง', roman: 'rang', tone: 'low' },
    ],
    pos: 'noun', emoji: '👱', tags: ['person'],
    note: 'What Thais call Western foreigners — you\'ll hear it daily. Not rude, just descriptive. Also the word for guava!',
  },
  {
    id: 'w.bag', thai: 'กระเป๋า', roman: 'grà-bpǎo', en: 'bag', enAlt: ['purse', 'wallet', 'suitcase'],
    syllables: [
      { thai: 'กระ', roman: 'gra', tone: 'low' },
      { thai: 'เป๋า', roman: 'bpao', tone: 'rising' },
    ],
    pos: 'noun', emoji: '👜', tags: ['core', 'object'],
    note: 'One word for bags, purses, wallets and suitcases. At any market you\'ll hear it shouted at you.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.what-is-this', wordIds: ['w.this', 'w.is', 'w.what'],
    en: 'What is this?', enAlt: ["what's this?"],
    literal: 'this | is | what', patternId: 'p.what-q', tags: ['question'],
  },
  {
    id: 's.what-is-this-m', wordIds: ['w.this', 'w.is', 'w.what', 'w.polite-m'],
    en: 'What is this? (male speaker)', enAlt: ["what's this?"],
    literal: 'this | is | what | ♂-polite', patternId: 'p.what-q', tags: ['question'],
  },
  {
    id: 's.that-is-bag', wordIds: ['w.that', 'w.is', 'w.bag', 'w.polite-f'],
    en: 'That is a bag. (female speaker)', enAlt: ["that's a bag"],
    literal: 'that | is | bag | ♀-polite', patternId: 'p.this-is',
  },
  {
    id: 's.this-my-friend', wordIds: ['w.this', 'w.is', 'w.friend', 'w.of', 'w.i-f'],
    en: 'This is my friend. (female speaker)', enAlt: ['this is a friend of mine'],
    literal: 'this | is | friend | of | I♀', patternId: 'p.this-is', tags: ['introduction'],
  },
  {
    id: 's.who-is-that', wordIds: ['w.that', 'w.who'],
    en: "Who's that?", enAlt: ['who is that?'],
    literal: 'that | who', tags: ['question'],
  },
  {
    id: 's.that-my-friend', wordIds: ['w.that', 'w.friend', 'w.of', 'w.i-f'],
    en: "That's my friend. (female speaker — no verb needed)", enAlt: ['that is my friend'],
    literal: 'that | friend | of | I♀',
  },
  {
    id: 's.he-thai-q', wordIds: ['w.he-she', 'w.be', 'w.person', 'w.thai', 'w.yes', 'w.q-mai'],
    en: "He's Thai, right?", enAlt: ['is he thai?', 'she is thai, right?'],
    literal: 'he/she | be | person | Thai | right | ?', patternId: 'p.be-person', tags: ['question'],
  },
  {
    id: 's.he-not-thai', wordIds: ['w.he-she', 'w.not', 'w.yes', 'w.person', 'w.thai'],
    en: "He's not Thai.", enAlt: ['she is not thai'],
    literal: 'he/she | not | is(ใช่) | person | Thai',
  },
  {
    id: 's.he-japanese', wordIds: ['w.he-she', 'w.be', 'w.person', 'w.japan'],
    en: "He's Japanese.", enAlt: ['she is japanese'],
    literal: 'he/she | be | person | Japan', patternId: 'p.be-person',
  },
  {
    id: 's.im-japanese', wordIds: ['w.i-m', 'w.be', 'w.person', 'w.japan', 'w.polite-m'],
    en: "I'm Japanese. (male speaker)", enAlt: ['i am japanese'],
    literal: 'I♂ | be | person | Japan | ♂-polite', patternId: 'p.be-person', tags: ['introduction'],
  },
  {
    id: 's.he-farang', wordIds: ['w.he-she', 'w.be', 'w.farang'],
    en: "He's a farang (Westerner).", enAlt: ['she is a westerner', 'he is a foreigner'],
    literal: 'he/she | be | Westerner',
  },
  {
    id: 's.speak-thai-q', wordIds: ['w.speak', 'w.language', 'w.thai', 'w.q-mai'],
    en: 'Do you speak Thai?', enAlt: ['can you speak thai?'],
    literal: 'speak | language | Thai | ?', tags: ['question'],
  },
  {
    id: 's.speak-english-q', wordIds: ['w.speak', 'w.language', 'w.english', 'w.q-mai'],
    en: 'Do you speak English?', enAlt: ['can you speak english?'],
    literal: 'speak | language | English | ?', tags: ['question'],
  },
  {
    id: 's.not-understand-m', wordIds: ['w.not', 'w.understand', 'w.polite-m'],
    en: "I don't understand. (male speaker)", enAlt: ['i do not understand'],
    literal: 'not | understand | ♂-polite',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.this-is',
    name: 'นี่/นั่น คือ ___ (this is ___)',
    parts: [{ slot: 'pointer' }, { fixed: ['w.is'] }, { slot: 'thing' }],
    slots: [
      { name: 'pointer', accepts: { wordIds: ['w.this', 'w.that'] } },
      { name: 'thing', accepts: { pos: ['noun'] } },
    ],
    enTemplate: '{pointer} is {thing}',
    explanation:
      'Point and name: นี่ or นั่น, then คือ, then any noun you know — a bag, a friend, a teacher. ' +
      'คือ is an equals sign, so both sides must be the same thing. ' +
      'Every noun you learn from now on plugs straight into this frame, and in fast speech Thais drop คือ entirely.',
    literal: 'นี่/นั่น + คือ + [noun]',
    exampleIds: ['s.that-is-bag', 's.this-my-friend'],
  },
  {
    id: 'p.what-q',
    name: 'นี่คืออะไร (what/who is this?)',
    parts: [{ slot: 'pointer' }, { fixed: ['w.is'] }, { slot: 'q' }],
    slots: [
      { name: 'pointer', accepts: { wordIds: ['w.this', 'w.that'] } },
      { name: 'q', accepts: { tags: ['question'], exclude: ['w.q-mai'] } },
    ],
    enTemplate: '{pointer} is {q}?',
    explanation:
      'Take the naming frame and drop a question word where the answer will go: นี่คืออะไร = "this is WHAT?". ' +
      'Swap in ใคร for people: นั่นคือใคร = "that is WHO?". ' +
      'The answer uses the identical shape — the noun simply lands in the slot the question word held open.',
    literal: 'นี่/นั่น + คือ + อะไร/ใคร',
    exampleIds: ['s.what-is-this', 's.what-is-this-m'],
  },
  {
    id: 'p.be-person',
    name: '___ เป็นคน ___ (nationality)',
    parts: [{ slot: 'person' }, { fixed: ['w.be'] }, { fixed: ['w.person'] }, { slot: 'nationality' }],
    slots: [
      { name: 'person', accepts: { tags: ['person'], exclude: ['w.person'] } },
      { name: 'nationality', accepts: { wordIds: ['w.thai', 'w.japan', 'w.english'] } },
    ],
    enTemplate: '{person} is {nationality}',
    explanation:
      'เป็น + คน + country says what someone IS: เขาเป็นคนไทย = "she is a Thai person". ' +
      'เป็น marks membership in a category — nationality here, jobs and roles later. ' +
      'Every new country word instantly gives you a nationality (คน___) and a language (ภาษา___) for free.',
    literal: '[person] + เป็น + คน + [country]',
    exampleIds: ['s.he-japanese', 's.im-japanese', 's.he-thai-q'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u03',
    order: 3,
    title: 'This, That & What',
    subtitle: 'Pointing at the world',
    emoji: '👆',
    color: '#b48cff',
    outcome: 'Point at anything and ask what it is, find out who people are, and say your nationality and language.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Two ways to "be": คือ vs เป็น',
        body:
          'คือ is an equals sign — it identifies: นี่คือกระเป๋า = this IS a bag. ' +
          'เป็น is for belonging to a category — nationality, job, role: เขาเป็นคนไทย, ฉันเป็นครู. ' +
          'And casual speech often skips the verb altogether: นั่นเพื่อนของฉัน = "that\'s my friend". ' +
          'If you forget which to use, dropping it is usually the most natural choice of all.',
      },
      {
        title: 'Never ไม่เป็น — say ไม่ใช่',
        body:
          'To deny being something, Thai does not negate เป็น. It uses ไม่ใช่ ("not so") instead: ' +
          'ผมไม่ใช่คนไทย = I\'m not Thai. เขาไม่ใช่เพื่อนของฉัน = he\'s not my friend. ' +
          'You already know both pieces from Unit 1 — ไม่ + ใช่ — so this rule costs you nothing new.',
      },
      {
        title: 'Build words like Lego: คน + ภาษา',
        body:
          'Thai builds vocabulary by stacking: คน + ไทย = Thai person, ภาษา + ไทย = Thai language, ' +
          'คน + ญี่ปุ่น = Japanese person. Learn ONE country word and you get its people and its language free. ' +
          'This compounding trick runs through all of Thai — watch for it and your vocabulary doubles itself.',
      },
    ],
    dialogues: [
      {
        id: 'd.u03-party',
        title: 'Who is that guy?',
        scene: 'At the same party — Nok (♂) spots a stranger across the room and asks Nuu (♀) about him.',
        lines: [
          { speaker: 'Nok', sentenceId: 's.who-is-that' },
          { speaker: 'Nuu', sentenceId: 's.that-my-friend' },
          { speaker: 'Nok', sentenceId: 's.he-thai-q' },
          { speaker: 'Nuu', sentenceId: 's.he-not-thai' },
          { speaker: 'Nuu', sentenceId: 's.he-japanese' },
        ],
      },
      {
        id: 'd.u03-market',
        title: 'Lost in translation',
        scene: 'Ken (♂), a Japanese tourist, points at a woven mystery object on Nuu\'s (♀) market table.',
        lines: [
          { speaker: 'Ken', sentenceId: 's.what-is-this-m' },
          { speaker: 'Nuu', sentenceId: 's.that-is-bag' },
          { speaker: 'Ken', sentenceId: 's.not-understand-m' },
          { speaker: 'Nuu', sentenceId: 's.speak-english-q' },
          { speaker: 'Ken', sentenceId: 's.im-japanese' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
