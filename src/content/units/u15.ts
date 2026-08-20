/**
 * Unit 15 — Daily Life. ตื่นกี่โมง?
 * The routine verbs (wake, shower, work, return, sleep) welded to the
 * time-of-day system from unit 9 — because Thai has no tenses, WHEN you say
 * a verb happens is the whole grammar of the day.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.wake', thai: 'ตื่น', roman: 'dtɯ̀ɯn', en: 'wake up', enAlt: ['wake', 'get up'],
    syllables: [{ thai: 'ตื่น', roman: 'dtɯɯn', tone: 'low' }],
    pos: 'verb', emoji: '⏰', tags: ['core', 'action'],
    note: 'Pairs straight with a time: ตื่นกี่โมง "what time do you get up?". ตื่นสาย = overslept — the universal Monday excuse.',
  },
  {
    id: 'w.sleep', thai: 'นอน', roman: 'nɔɔn', en: 'sleep', enAlt: ['go to bed', 'lie down'],
    syllables: [{ thai: 'นอน', roman: 'nɔɔn', tone: 'mid' }],
    pos: 'verb', emoji: '😴', tags: ['core', 'action'],
    note: 'Covers sleeping AND lying down. ไปนอน "off to bed" is how Thais end a late-night chat; นอนดึก = go to bed late.',
  },
  {
    id: 'w.shower', thai: 'อาบน้ำ', roman: 'àap-náam', en: 'shower', enAlt: ['bathe', 'take a shower'], literal: 'bathe + water',
    syllables: [
      { thai: 'อาบ', roman: 'aap', tone: 'low' },
      { thai: 'น้ำ', roman: 'naam', tone: 'high' },
    ],
    pos: 'verb', emoji: '🚿', tags: ['core', 'action'],
    note: 'In the Thai heat people อาบน้ำ twice a day — morning and evening — and absolutely notice when someone hasn\'t.',
  },
  {
    id: 'w.work', thai: 'ทำงาน', roman: 'tam-ngaan', en: 'work', enAlt: ['to work'], literal: 'do + work',
    syllables: [
      { thai: 'ทำ', roman: 'tam', tone: 'mid' },
      { thai: 'งาน', roman: 'ngaan', tone: 'mid' },
    ],
    pos: 'verb', emoji: '💼', tags: ['core', 'action', 'activity'],
    note: 'ทำ (do) + งาน (work). Watch out: งาน alone also means "party/event" — ไปงาน is going to a celebration, not the office.',
  },
  {
    id: 'w.study', thai: 'เรียน', roman: 'rian', en: 'study', enAlt: ['learn', 'take classes'],
    syllables: [{ thai: 'เรียน', roman: 'rian', tone: 'mid' }],
    pos: 'verb', emoji: '📚', tags: ['core', 'action', 'activity'],
    note: 'เรียนภาษาไทย "I\'m learning Thai" instantly makes vendors your ally — say it and smiles widen, prices soften.',
  },
  {
    id: 'w.return', thai: 'กลับ', roman: 'glàp', en: 'return', enAlt: ['go back', 'get back'],
    syllables: [{ thai: 'กลับ', roman: 'glap', tone: 'low' }],
    pos: 'verb', emoji: '🔙', tags: ['core', 'action'],
    note: 'กลับบ้าน "head home" is the phrase that ends every Thai evening. Also "to flip": กลับกัน = the other way around.',
  },
  {
    id: 'w.every', thai: 'ทุก', roman: 'túk', en: 'every', enAlt: ['each'],
    syllables: [{ thai: 'ทุก', roman: 'tuk', tone: 'high' }],
    pos: 'adj', emoji: '🔁', tags: ['core'],
    note: 'Glues onto any unit of time or people: ทุกวัน every day, ทุกเช้า every morning, ทุกคน everyone.',
  },
  {
    id: 'w.do', thai: 'ทำ', roman: 'tam', en: 'do', enAlt: ['make'],
    syllables: [{ thai: 'ทำ', roman: 'tam', tone: 'mid' }],
    pos: 'verb', emoji: '🛠️', tags: ['core', 'action'],
    note: 'Do AND make in one word: ทำอาหาร = cook ("make food"), ทำอะไร = "whatcha doing?" — the opener of every Thai chat.',
  },
  {
    id: 'w.afternoon', thai: 'ตอนบ่าย', roman: 'dtɔɔn-bàai', en: 'in the afternoon', enAlt: ['afternoon'], literal: 'period + afternoon',
    syllables: [
      { thai: 'ตอน', roman: 'dtɔɔn', tone: 'mid' },
      { thai: 'บ่าย', roman: 'baai', tone: 'low' },
    ],
    pos: 'noun', emoji: '🌤️', tags: ['core', 'time'],
    note: 'บ่าย is 1pm to about 4 — the hot, sleepy stretch when Thailand slows down. Completes the ตอน family: เช้า → บ่าย → เย็น.',
  },
  {
    id: 'w.night', thai: 'ตอนกลางคืน', roman: 'dtɔɔn-glaang-kɯɯn', en: 'at night', enAlt: ['night', 'nighttime'], literal: 'period + middle + night',
    syllables: [
      { thai: 'ตอน', roman: 'dtɔɔn', tone: 'mid' },
      { thai: 'กลาง', roman: 'glaang', tone: 'mid' },
      { thai: 'คืน', roman: 'kɯɯn', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🌌', tags: ['core', 'time'],
    note: 'กลางคืน "the middle of the night" = nighttime in general, after dark. Its daytime twin is กลางวัน.',
  },
  {
    id: 'w.late-night', thai: 'ดึก', roman: 'dɯ̀k', en: 'late at night', enAlt: ['late (night)'],
    syllables: [{ thai: 'ดึก', roman: 'dɯk', tone: 'low' }],
    pos: 'adj', emoji: '🌃', tags: ['adjective', 'time'],
    note: 'Deep-night late, roughly after 10pm: นอนดึก = went to bed late. Morning-late is a different word (สาย) — Thais never mix the two.',
  },
  {
    id: 'w.day-off', thai: 'วันหยุด', roman: 'wan-yùt', en: 'day off', enAlt: ['holiday', 'free day'], literal: 'day + stop',
    syllables: [
      { thai: 'วัน', roman: 'wan', tone: 'mid' },
      { thai: 'หยุด', roman: 'yut', tone: 'low' },
    ],
    pos: 'noun', emoji: '🏖️', tags: ['core', 'time'],
    note: 'Literally "stop day" — covers weekends and public holidays alike, and Thailand has a LOT of the latter.',
  },
  {
    id: 'w.usually', thai: 'ปกติ', roman: 'bpà-gà-dtì', en: 'usually', enAlt: ['normally'],
    syllables: [
      { thai: 'ปะ', roman: 'bpa', tone: 'low' },
      { thai: 'กะ', roman: 'ga', tone: 'low' },
      { thai: 'ติ', roman: 'dti', tone: 'low' },
    ],
    pos: 'adv', emoji: '🗓️', tags: ['core'],
    note: 'Front a sentence with it to talk habits: ปกติตื่นกี่โมง "what time do you normally get up?". Alone it answers "how are you": ปกติ = same as ever.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.usually-wake-what-time-m', wordIds: ['w.usually', 'w.wake', 'w.what-time', 'w.polite-m'],
    en: 'What time do you usually wake up? (male speaker)', enAlt: ['what time do you normally get up?'],
    literal: 'usually | wake | what time | ♂-polite', patternId: 'p.what-time-q', tags: ['routine'],
  },
  {
    id: 's.sleep-what-time', wordIds: ['w.sleep', 'w.what-time'],
    en: 'What time do you go to bed?', enAlt: ['what time do you sleep?'],
    literal: 'sleep | what time', patternId: 'p.what-time-q', tags: ['routine'],
  },
  {
    id: 's.today-wake-late-f', wordIds: ['w.today', 'w.wake', 'w.late', 'w.polite-f'],
    en: 'I woke up late today. (female speaker)', enAlt: ['i overslept today', 'today i got up late'],
    literal: 'today | wake | late | ♀-polite', tags: ['routine'],
  },
  {
    id: 's.yesterday-sleep-late', wordIds: ['w.yesterday', 'w.sleep', 'w.late-night'],
    en: 'I went to bed late last night.', enAlt: ['yesterday i slept late', 'i stayed up late last night'],
    literal: 'yesterday | sleep | late-at-night', tags: ['routine'],
  },
  {
    id: 's.shower-morning-m', wordIds: ['w.i-m', 'w.shower', 'w.morning', 'w.polite-m'],
    en: 'I shower in the morning. (male speaker)', enAlt: ['i take a shower in the morning'],
    literal: 'I ♂ | shower | in the morning | ♂-polite', patternId: 'p.verb-time', tags: ['routine'],
  },
  {
    id: 's.he-work-night', wordIds: ['w.he-she', 'w.work', 'w.night'],
    en: 'He works at night.', enAlt: ['she works at night', 'they work nights'],
    literal: 'he/she | work | at night', patternId: 'p.verb-time', tags: ['routine'],
  },
  {
    id: 's.we-study-afternoon', wordIds: ['w.we', 'w.study', 'w.afternoon'],
    en: 'We study in the afternoon.', enAlt: ['we have class in the afternoon'],
    literal: 'we | study | in the afternoon', patternId: 'p.verb-time', tags: ['routine'],
  },
  {
    id: 's.study-thai-evening-f', wordIds: ['w.i-f', 'w.study', 'w.language', 'w.thai', 'w.evening', 'w.polite-f'],
    en: 'I study Thai in the evening. (female speaker)', enAlt: ["i'm learning thai in the evenings"],
    literal: 'I ♀ | study | language | Thai | in the evening | ♀-polite', tags: ['routine'],
  },
  {
    id: 's.work-every-day-m', wordIds: ['w.i-m', 'w.work', 'w.every', 'w.day', 'w.polite-m'],
    en: 'I work every day. (male speaker)', enAlt: ['i work daily'],
    literal: 'I ♂ | work | every | day | ♂-polite', tags: ['routine'],
  },
  {
    id: 's.return-home-evening', wordIds: ['w.return', 'w.home', 'w.evening'],
    en: 'I get home in the evening.', enAlt: ['i go home in the evening', 'i get back home in the evening'],
    literal: 'return | home | in the evening', tags: ['routine'],
  },
  {
    id: 's.do-what-now-q', wordIds: ['w.do', 'w.what', 'w.stay'],
    en: 'What are you doing?', enAlt: ['whatcha doing?', 'what are you up to?'],
    literal: 'do | what | (อยู่ = right now)', tags: ['question'],
  },
  {
    id: 's.tomorrow-day-off', wordIds: ['w.tomorrow', 'w.day-off'],
    en: 'Tomorrow is a day off.', enAlt: ["tomorrow's a holiday", 'tomorrow is a holiday'],
    literal: 'tomorrow | day off',
  },
  {
    id: 's.day-off-want-sleep', wordIds: ['w.day-off', 'w.want', 'w.sleep'],
    en: 'On my day off I just want to sleep.', enAlt: ['on days off i want to sleep'],
    literal: 'day off | want to | sleep',
  },
  {
    id: 's.today-tired-very', wordIds: ['w.today', 'w.tired', 'w.very'],
    en: "I'm so tired today.", enAlt: ['today i am very tired', "i'm exhausted today"],
    literal: 'today | tired | very',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.verb-time',
    name: 'verb + time of day',
    parts: [{ slot: 'subject' }, { slot: 'verb' }, { slot: 'time' }],
    slots: [
      { name: 'subject', accepts: { tags: ['person'] }, optional: true },
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'time', accepts: { tags: ['time'], exclude: ['w.day', 'w.o-clock'] } },
    ],
    enTemplate: '{subject} {verb} {time}',
    explanation:
      'Thai verbs never change form, so WHEN something happens is said with a time word parked after the verb: ' +
      'อาบน้ำตอนเช้า = "shower in-the-morning". Any subject, any verb, any time word snaps together — ' +
      'and dropping the subject is completely normal once context makes it clear. ' +
      'This one frame narrates your entire day.',
    literal: '[subject] + [verb] + [time]',
    exampleIds: ['s.he-work-night', 's.shower-morning-m', 's.we-study-afternoon'],
  },
  {
    id: 'p.what-time-q',
    name: '___ + กี่โมง (what time do you ___?)',
    parts: [{ slot: 'verb' }, { fixed: ['w.what-time'] }],
    slots: [{ name: 'verb', accepts: { tags: ['action'] } }],
    enTemplate: 'What time do you {verb}?',
    explanation:
      'Thai puts the question word exactly where the answer will go — at the end. ' +
      'ตื่นกี่โมง = "wake up what-time?" No "do", no word-order flip. ' +
      'Every action verb you know instantly becomes a scheduling question: กินกี่โมง, ไปกี่โมง, กลับกี่โมง.',
    literal: '[verb] + กี่โมง',
    exampleIds: ['s.sleep-what-time', 's.usually-wake-what-time-m'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u15',
    order: 15,
    title: 'Daily Life',
    subtitle: 'Wake, work, sleep',
    emoji: '🌅',
    color: '#4cc9ff',
    outcome: 'Walk through your whole day in Thai — wake-up to bedtime — and ask about anyone else\'s.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'One verb form, every tense',
        body:
          'Thai verbs never conjugate: ตื่น is wake, woke, and will wake. Time words do the work instead — ' +
          'เมื่อวานนอนดึก = "yesterday sleep late" = I went to bed late last night. ' +
          'Say the time once (usually up front) and every verb after it inherits it. No endings to memorize, ever.',
      },
      {
        title: 'ตอน slices the day — and there are two "lates"',
        body:
          'ตอน ("period") builds the day\'s chapters: ตอนเช้า morning, ตอนบ่าย afternoon, ตอนเย็น evening, ตอนกลางคืน night. ' +
          'Park them after the verb: อาบน้ำตอนเช้า. Thai also splits English "late" in two: ' +
          'สาย = late in the morning (ตื่นสาย overslept), ดึก = late at night (นอนดึก up past midnight). Swapping them is a classic learner giggle.',
      },
      {
        title: 'อยู่ = happening right now',
        body:
          'The same อยู่ ("be at") from unit 7 doubles as a progress marker after a verb: ' +
          'ทำอะไรอยู่ = "what are you doing (right now)?" — THE Thai chat opener. ' +
          'Answer with verb + อยู่: ทำงานอยู่ "working", เรียนอยู่ "in class". Location and ongoing action share one word — you are "at" the activity.',
      },
    ],
    dialogues: [
      {
        id: 'd.u15-monday',
        title: 'Monday at the coffee machine',
        scene: 'Ploy (♀) drags herself into the office; Tan (♂) is already on his second coffee.',
        lines: [
          { speaker: 'Ploy', sentenceId: 's.today-tired-very' },
          { speaker: 'Tan', sentenceId: 's.sleep-what-time' },
          { speaker: 'Ploy', sentenceId: 's.yesterday-sleep-late' },
          { speaker: 'Ploy', sentenceId: 's.today-wake-late-f' },
          { speaker: 'Tan', sentenceId: 's.tomorrow-day-off' },
          { speaker: 'Ploy', sentenceId: 's.day-off-want-sleep' },
        ],
      },
      {
        id: 'd.u15-call',
        title: 'Evening phone call',
        scene: 'Mek (♂) calls his friend Fon (♀) after dinner.',
        lines: [
          { speaker: 'Mek', sentenceId: 's.do-what-now-q' },
          { speaker: 'Fon', sentenceId: 's.study-thai-evening-f' },
          { speaker: 'Mek', sentenceId: 's.work-every-day-m' },
          { speaker: 'Mek', sentenceId: 's.return-home-evening' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
