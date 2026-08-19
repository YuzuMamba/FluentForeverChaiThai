/**
 * Unit 9 — Time & Days. พรุ่งนี้เจอกัน!
 * Thai verbs never conjugate — time words and จะ carry the whole timeline.
 * Learn to say when, ask what time, and suddenly you can make real plans.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.today', thai: 'วันนี้', roman: 'wan-níi', en: 'today',
    syllables: [
      { thai: 'วัน', roman: 'wan', tone: 'mid' },
      { thai: 'นี้', roman: 'nii', tone: 'high' },
    ],
    pos: 'noun', emoji: '📅', tags: ['core', 'time'],
    literal: 'day + this',
    note: 'วัน day + นี้ this = "this day". Time words sit at the START or the END of a Thai sentence — both are natural: วันนี้ไปตลาด or ไปตลาดวันนี้.',
  },
  {
    id: 'w.tomorrow', thai: 'พรุ่งนี้', roman: 'prûng-níi', en: 'tomorrow',
    syllables: [
      { thai: 'พรุ่ง', roman: 'prung', tone: 'falling' },
      { thai: 'นี้', roman: 'nii', tone: 'high' },
    ],
    pos: 'noun', emoji: '🌅', tags: ['core', 'time'],
    note: 'เจอกันพรุ่งนี้ ("see you tomorrow") is the friendliest goodbye in Thai. A time word alone often implies the future — no จะ needed.',
  },
  {
    id: 'w.yesterday', thai: 'เมื่อวาน', roman: 'mɯ̂a-waan', en: 'yesterday',
    syllables: [
      { thai: 'เมื่อ', roman: 'mɯa', tone: 'falling' },
      { thai: 'วาน', roman: 'waan', tone: 'mid' },
    ],
    pos: 'noun', emoji: '⏪', tags: ['core', 'time'],
    note: 'Thai has NO past tense — เมื่อวาน does the job by itself. เมื่อวานไปตลาด = "yesterday (I) go market" = I went to the market yesterday.',
  },
  {
    id: 'w.day', thai: 'วัน', roman: 'wan', en: 'day',
    syllables: [{ thai: 'วัน', roman: 'wan', tone: 'mid' }],
    pos: 'noun', emoji: '☀️', tags: ['core', 'time'],
    note: 'The building block of the calendar: วันนี้ today, ทุกวัน every day, and every weekday name starts with it — วันจันทร์ Monday, วันศุกร์ Friday.',
  },
  {
    id: 'w.morning', thai: 'ตอนเช้า', roman: 'dtɔɔn-cháao', en: 'in the morning', enAlt: ['morning'],
    syllables: [
      { thai: 'ตอน', roman: 'dtɔɔn', tone: 'mid' },
      { thai: 'เช้า', roman: 'chaao', tone: 'high' },
    ],
    pos: 'noun', emoji: '🐓', tags: ['core', 'time'],
    literal: 'period + early',
    note: 'ตอน = "period of the day" — the prefix for every chunk of the Thai day: ตอนเช้า morning, ตอนเย็น evening, ตอนนี้ right now.',
  },
  {
    id: 'w.evening', thai: 'ตอนเย็น', roman: 'dtɔɔn-yen', en: 'in the evening', enAlt: ['evening'],
    syllables: [
      { thai: 'ตอน', roman: 'dtɔɔn', tone: 'mid' },
      { thai: 'เย็น', roman: 'yen', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🌆', tags: ['core', 'time'],
    literal: 'period + cool',
    note: 'เย็น literally means "cool" — evening is when the heat finally breaks, roughly 4–7pm. That\'s when Thai streets wake up and the food stalls come out.',
  },
  {
    id: 'w.what-time', thai: 'กี่โมง', roman: 'gìi-moong', en: 'what time?', enAlt: ['at what time'],
    syllables: [
      { thai: 'กี่', roman: 'gii', tone: 'low' },
      { thai: 'โมง', roman: 'moong', tone: 'mid' },
    ],
    pos: 'question', emoji: '⏰', tags: ['core', 'question'],
    literal: 'how-many + o\'clock',
    note: 'Literally "how many o\'clock". Like all Thai question words it stays at the END: จะไปกี่โมง = "will go what time?". Nobody uses the formal เวลาเท่าไร in speech.',
  },
  {
    id: 'w.will', thai: 'จะ', roman: 'jà', en: 'will', enAlt: ['going to', 'gonna'],
    syllables: [{ thai: 'จะ', roman: 'ja', tone: 'low' }],
    pos: 'adv', emoji: '🔮', tags: ['core'],
    note: 'The future marker — slots right before the verb: จะไป = will go, จะกิน = will eat. Thais drop it when a time word already makes the future obvious.',
  },
  {
    id: 'w.now', thai: 'ตอนนี้', roman: 'dtɔɔn-níi', en: 'now', enAlt: ['right now'],
    syllables: [
      { thai: 'ตอน', roman: 'dtɔɔn', tone: 'mid' },
      { thai: 'นี้', roman: 'nii', tone: 'high' },
    ],
    pos: 'noun', emoji: '⚡', tags: ['core', 'time'],
    literal: 'period + this',
    note: '"This period" = now. ตอนนี้กี่โมง = "what time is it right now?" — the phrase that replaces looking at your dead phone battery.',
  },
  {
    id: 'w.tonight', thai: 'คืนนี้', roman: 'kɯɯn-níi', en: 'tonight',
    syllables: [
      { thai: 'คืน', roman: 'kɯɯn', tone: 'mid' },
      { thai: 'นี้', roman: 'nii', tone: 'high' },
    ],
    pos: 'noun', emoji: '🌙', tags: ['core', 'time'],
    literal: 'night + this',
    note: 'คืน night + นี้ this. คืนนี้จะกินอะไร ("what are we eating tonight?") is Thailand\'s eternal question — food plans ARE evening plans.',
  },
  {
    id: 'w.o-clock', thai: 'โมง', roman: 'moong', en: "o'clock", enAlt: ['hour'],
    syllables: [{ thai: 'โมง', roman: 'moong', tone: 'mid' }],
    pos: 'classifier', emoji: '🕙', tags: ['core', 'time'],
    note: 'Number + โมง tells the daytime hour: สิบโมง = 10am. The full Thai clock splits the day into chunks (night hours use ทุ่ม), but number + โมง is always understood.',
  },
  {
    id: 'w.noon', thai: 'เที่ยง', roman: 'tîang', en: 'noon', enAlt: ['midday'],
    syllables: [{ thai: 'เที่ยง', roman: 'tiang', tone: 'falling' }],
    pos: 'noun', emoji: '🕛', tags: ['core', 'time', 'standalone'],
    note: '12 sharp — and by extension, lunch: เที่ยงแล้ว means "it\'s noon" AND "lunchtime!". Midnight is เที่ยงคืน, "the noon of the night".',
  },
  {
    id: 'w.late', thai: 'สาย', roman: 'sǎai', en: 'late', enAlt: ['late (morning)'],
    syllables: [{ thai: 'สาย', roman: 'saai', tone: 'rising' }],
    pos: 'adj', emoji: '🏃', tags: ['core', 'adjective'],
    note: 'Late for something: มาสาย = show up late, the national sport of "Thai time". Late at NIGHT is a different word, ดึก (dɯ̀k).',
  },
  {
    id: 'w.long-time', thai: 'นาน', roman: 'naan', en: 'a long time', enAlt: ['long (duration)'],
    syllables: [{ thai: 'นาน', roman: 'naan', tone: 'mid' }],
    pos: 'adj', emoji: '⏳', tags: ['core', 'adjective', 'standalone'],
    note: 'Duration, not distance: นานไหม = "will it take long?" — ask it at every taxi, food stall, and government office. The classic answer: ไม่นาน (then you wait an hour).',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.will-go-market-tomorrow-q', wordIds: ['w.tomorrow', 'w.will', 'w.go', 'w.market', 'w.q-mai'],
    en: 'Are you going to the market tomorrow?', enAlt: ['will you go to the market tomorrow'],
    literal: 'tomorrow | will | go | market | ?', patternId: 'p.will-verb', tags: ['plans'],
  },
  {
    id: 's.go-market-tomorrow-m', wordIds: ['w.i-m', 'w.will', 'w.go', 'w.market', 'w.tomorrow'],
    en: "I'm going to the market tomorrow. (male speaker)", enAlt: ['i will go to the market tomorrow'],
    literal: 'I-♂ | will | go | market | tomorrow', patternId: 'p.will-verb', tags: ['plans'],
  },
  {
    id: 's.go-morning-m', wordIds: ['w.go', 'w.morning', 'w.polite-m'],
    en: "I'm going in the morning. (male speaker)", enAlt: ['going in the morning'],
    literal: 'go | morning | ♂-polite', tags: ['plans'],
  },
  {
    id: 's.will-eat-tonight-q', wordIds: ['w.tonight', 'w.will', 'w.eat', 'w.what'],
    en: 'What are you eating tonight?', enAlt: ['what will you eat tonight'],
    literal: 'tonight | will | eat | what', patternId: 'p.will-verb', tags: ['plans'],
  },
  {
    id: 's.will-come-evening', wordIds: ['w.he-she', 'w.will', 'w.come', 'w.evening'],
    en: "He'll come in the evening.", enAlt: ['she will come in the evening'],
    literal: 'he/she | will | come | evening', patternId: 'p.will-verb',
  },
  {
    id: 's.go-what-time-q', wordIds: ['w.will', 'w.go', 'w.what-time'],
    en: 'What time are you going?', enAlt: ['what time will you go'],
    literal: 'will | go | what-time', patternId: 'p.what-time-q', tags: ['plans'],
  },
  {
    id: 's.eat-what-time-q', wordIds: ['w.will', 'w.eat', 'w.what-time'],
    en: 'What time are we eating?', enAlt: ['what time will you eat'],
    literal: 'will | eat | what-time', patternId: 'p.what-time-q', tags: ['plans'],
  },
  {
    id: 's.now-what-time', wordIds: ['w.now', 'w.what-time'],
    en: 'What time is it now?', enAlt: ['what time is it'],
    literal: 'now | what-time', tags: ['time'],
  },
  {
    id: 's.ten-o-clock-m', wordIds: ['w.ten', 'w.o-clock', 'w.polite-m'],
    en: "Ten o'clock. (male speaker)", enAlt: ['10 am', "it's ten"],
    literal: 'ten | o\'clock | ♂-polite', tags: ['time'],
  },
  {
    id: 's.noon-eat-rice-q', wordIds: ['w.noon', 'w.eat', 'w.rice', 'w.q-mai'],
    en: 'Lunch at noon?', enAlt: ['shall we eat at noon', 'eat at midday?'],
    literal: 'noon | eat | rice | ?', patternId: 'p.mai-question', tags: ['plans'],
  },
  {
    id: 's.yesterday-go-market', wordIds: ['w.yesterday', 'w.go', 'w.market'],
    en: 'I went to the market yesterday.', enAlt: ['yesterday i went to the market'],
    literal: 'yesterday | go | market', tags: ['time'],
  },
  {
    id: 's.today-what-day', wordIds: ['w.today', 'w.day', 'w.what'],
    en: 'What day is it today?', enAlt: ['what day is today'],
    literal: 'today | day | what', tags: ['time'],
  },
  {
    id: 's.he-come-late', wordIds: ['w.he-she', 'w.come', 'w.late'],
    en: "He's late.", enAlt: ['she is late', 'he came late'],
    literal: 'he/she | come | late',
  },
  {
    id: 's.long-q', wordIds: ['w.long-time', 'w.q-mai'],
    en: 'Will it take long?', enAlt: ['is it a long time', 'will it be long'],
    literal: 'long-time | ?', patternId: 'p.mai-question',
  },
  {
    id: 's.not-long', wordIds: ['w.not', 'w.long-time'],
    en: 'Not long.', enAlt: ["it won't take long"],
    literal: 'not | long-time',
  },
  {
    id: 's.see-you-tomorrow', wordIds: ['w.see-you', 'w.tomorrow'],
    en: 'See you tomorrow!', enAlt: ['see you tomorrow'],
    literal: 'meet-each-other | tomorrow', tags: ['plans'],
  },
  {
    id: 's.sure-m', wordIds: ['w.can', 'w.polite-m'],
    en: 'Sure! (male speaker)', enAlt: ['can do', 'ok', 'deal'],
    literal: 'can | ♂-polite',
  },
  {
    id: 's.sure-f', wordIds: ['w.can', 'w.polite-f'],
    en: 'Sure! (female speaker)', enAlt: ['can do', 'ok', 'deal'],
    literal: 'can | ♀-polite',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.will-verb',
    name: 'จะ + verb (+ time): making plans',
    parts: [{ slot: 'subject' }, { fixed: ['w.will'] }, { slot: 'verb' }, { slot: 'time' }],
    slots: [
      { name: 'subject', accepts: { tags: ['person'] }, optional: true },
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'time', accepts: { tags: ['time'] }, optional: true },
    ],
    enTemplate: '{subject} will {verb} {time}',
    explanation:
      'The entire Thai future tense is one syllable: put จะ in front of any verb and it points forward. ' +
      'No conjugation, no "am going to" — the verb itself never changes. ' +
      'Bolt a time word on either end and you have a plan: ผมจะไปตลาดพรุ่งนี้. ' +
      'Every verb and every time word you learn from now on snaps into this frame — this is how plans are made in Thai.',
    literal: '[subject] + จะ + [verb] + [time]',
    exampleIds: ['s.go-market-tomorrow-m', 's.will-eat-tonight-q', 's.will-come-evening', 's.will-go-market-tomorrow-q'],
  },
  {
    id: 'p.what-time-q',
    name: 'จะ ___ กี่โมง (what time will you ___?)',
    parts: [{ fixed: ['w.will'] }, { slot: 'verb' }, { fixed: ['w.what-time'] }],
    slots: [{ name: 'verb', accepts: { tags: ['action'] } }],
    enTemplate: 'What time will (you) {verb}?',
    explanation:
      'Thai question words don\'t jump to the front like English "what time" — they stay put at the END. ' +
      'So you say the plan first, then ask the hour: จะไปกี่โมง = "will go — what time?". ' +
      'Swap in any verb: จะกินกี่โมง, จะมากี่โมง. ' +
      'The answer comes back in the same shape: number + โมง.',
    literal: 'จะ + [verb] + กี่โมง',
    exampleIds: ['s.go-what-time-q', 's.eat-what-time-q'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u09',
    order: 9,
    title: 'Time & Days',
    subtitle: 'Today, tomorrow, when?',
    emoji: '🕐',
    color: '#b48cff',
    outcome: 'Say when things happen — today, tomorrow, morning or night — ask the time, and make plans with จะ.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Verbs never change — time words do the work',
        body:
          'ไป means go, went, going, and will go. Thai verbs NEVER conjugate. ' +
          'The timeline lives in the time words: เมื่อวานไปตลาด = went yesterday, พรุ่งนี้จะไปตลาด = going tomorrow. ' +
          'Same ไป, different day. This deletes the hardest part of European languages in one stroke — ' +
          'learn a verb once and you own it in every tense.',
      },
      {
        title: 'จะ: the one-syllable future',
        body:
          'จะ before a verb points it at the future: จะกิน = will eat, จะมา = will come. ' +
          'But Thais drop it whenever a time word already gives it away — พรุ่งนี้ไปตลาด is fine without จะ. ' +
          'Rule of thumb: use จะ for intentions and plans ("I\'m gonna..."), skip it when the "when" is already said.',
      },
      {
        title: 'The Thai clock comes in chunks',
        body:
          'Thais slice the day into named periods: ตอนเช้า morning, เที่ยง noon, ตอนเย็น evening — and the hour words change per chunk ' +
          '(daytime hours use โมง, night hours use ทุ่ม). Sounds scary, but number + โมง is understood everywhere: สิบโมง = 10am. ' +
          'Ask กี่โมง, answer with a number, add ตอนเช้า or ตอนเย็น if it\'s ambiguous. Done.',
      },
    ],
    dialogues: [
      {
        id: 'd.u09-plan',
        title: 'Market plans',
        scene: 'Bua (♀) catches Anan (♂) at the condo lift and invites herself along to the market.',
        lines: [
          { speaker: 'Bua', sentenceId: 's.will-go-market-tomorrow-q' },
          { speaker: 'Anan', sentenceId: 's.go-morning-m' },
          { speaker: 'Bua', sentenceId: 's.go-what-time-q' },
          { speaker: 'Anan', sentenceId: 's.ten-o-clock-m' },
          { speaker: 'Bua', sentenceId: 's.noon-eat-rice-q' },
          { speaker: 'Anan', sentenceId: 's.sure-m' },
          { speaker: 'Bua', sentenceId: 's.see-you-tomorrow' },
        ],
      },
      {
        id: 'd.u09-waiting',
        title: 'Waiting for Lek',
        scene: 'Nok (♀) and Anan (♂) wait at a coffee shop. Lek, as always, is on "Thai time".',
        lines: [
          { speaker: 'Nok', sentenceId: 's.now-what-time' },
          { speaker: 'Anan', sentenceId: 's.ten-o-clock-m' },
          { speaker: 'Nok', sentenceId: 's.he-come-late' },
          { speaker: 'Nok', sentenceId: 's.long-q' },
          { speaker: 'Anan', sentenceId: 's.will-come-evening' },
          { speaker: 'Nok', sentenceId: 's.noon-eat-rice-q' },
          { speaker: 'Anan', sentenceId: 's.sure-m' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
