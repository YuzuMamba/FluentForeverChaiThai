/**
 * Unit 2 — People & Names. คุณชื่ออะไร?
 * The first real conversation: ask a name, give yours, point out whose friend
 * is whose. Thai names run long, so nicknames (นก! หนู!) do the daily work.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.name', thai: 'ชื่อ', roman: 'chɯ̂ɯ', en: 'name', enAlt: ['be named', 'is named', 'named'],
    syllables: [{ thai: 'ชื่อ', roman: 'chɯɯ', tone: 'falling' }],
    pos: 'verb', emoji: '📛', tags: ['core'],
    note: 'Noun and verb in one word: ผมชื่อ... = "I am-named...". No "is", no "my name" — ชื่อ does the whole job.',
  },
  {
    id: 'w.what', thai: 'อะไร', roman: 'à-rai', en: 'what', enAlt: ['what?'],
    syllables: [
      { thai: 'อะ', roman: 'a', tone: 'low' },
      { thai: 'ไร', roman: 'rai', tone: 'mid' },
    ],
    pos: 'question', emoji: '🤷', tags: ['core', 'question'],
    note: 'Sits at the END of the sentence, right where the answer will go: คุณชื่ออะไร = "you named WHAT?".',
  },
  {
    id: 'w.he-she', thai: 'เขา', roman: 'kǎo', en: 'he / she', enAlt: ['he', 'she', 'him', 'her', 'they'],
    syllables: [{ thai: 'เขา', roman: 'kao', tone: 'rising' }],
    pos: 'pronoun', emoji: '👤', tags: ['core', 'person'],
    note: 'One word for he AND she — Thai pronouns skip gender here. In fast speech it often sounds like "káo".',
  },
  {
    id: 'w.we', thai: 'เรา', roman: 'rao', en: 'we', enAlt: ['us', 'i', 'me'],
    syllables: [{ thai: 'เรา', roman: 'rao', tone: 'mid' }],
    pos: 'pronoun', emoji: '👥', tags: ['core', 'person'],
    note: '"We" — but young Thais also use เรา as a warm, casual "I" with friends. You will hear this constantly.',
  },
  {
    id: 'w.friend', thai: 'เพื่อน', roman: 'pɯ̂an', en: 'friend', enAlt: ['friends'],
    syllables: [{ thai: 'เพื่อน', roman: 'pɯan', tone: 'falling' }],
    pos: 'noun', emoji: '🧑‍🤝‍🧑', tags: ['core', 'person'],
    note: 'Covers everything from "someone I just met" to best friend. Thais make เพื่อน fast — so will you.',
  },
  {
    id: 'w.person', thai: 'คน', roman: 'kon', en: 'person', enAlt: ['people'],
    syllables: [{ thai: 'คน', roman: 'kon', tone: 'mid' }],
    pos: 'noun', emoji: '🧍', tags: ['core', 'person'],
    note: 'Person — and later the counting word for people (สองคน = two people). คน + a country = nationality (Unit 3).',
  },
  {
    id: 'w.of', thai: 'ของ', roman: 'kɔ̌ɔng', en: 'of', enAlt: ['belonging to', "'s"],
    syllables: [{ thai: 'ของ', roman: 'kɔɔng', tone: 'rising' }],
    pos: 'prep', emoji: '🔗', tags: ['core'],
    note: 'The owner comes AFTER the thing: เพื่อนของฉัน = friend-of-me = my friend. Casual speech often drops it: เพื่อนฉัน.',
  },
  {
    id: 'w.nickname', thai: 'ชื่อเล่น', roman: 'chɯ̂ɯ-lên', en: 'nickname', enAlt: ['nick name'],
    syllables: [
      { thai: 'ชื่อ', roman: 'chɯɯ', tone: 'falling' },
      { thai: 'เล่น', roman: 'len', tone: 'falling' },
    ],
    pos: 'noun', emoji: '🏷️', literal: 'play name', tags: ['core'],
    note: 'Literally "play name". Real Thai names are long, so everyone goes by a short ชื่อเล่น — always ask for it.',
  },
  {
    id: 'w.bird', thai: 'นก', roman: 'nók', en: 'bird', enAlt: ['nok'],
    syllables: [{ thai: 'นก', roman: 'nok', tone: 'high' }],
    pos: 'noun', emoji: '🐦', tags: ['object'],
    note: 'Bird — and one of Thailand\'s most popular nicknames. Thai nicknames are everyday words: Bird, Frog, Red.',
  },
  {
    id: 'w.mouse', thai: 'หนู', roman: 'nǔu', en: 'mouse', enAlt: ['rat', 'nuu'],
    syllables: [{ thai: 'หนู', roman: 'nuu', tone: 'rising' }],
    pos: 'noun', emoji: '🐭', tags: ['object'],
    note: 'Mouse — a beloved nickname, AND how kids and young women say "I" when talking to elders.',
  },
  {
    id: 'w.na', thai: 'นะ', roman: 'ná', en: 'softener นะ', enAlt: ['na'],
    syllables: [{ thai: 'นะ', roman: 'na', tone: 'high' }],
    pos: 'particle', emoji: '😊', tags: ['core', 'particle'],
    note: 'A verbal smile — softens whatever it follows. After a question it means "again?": อะไรนะ = "what was that?".',
    formality: 'casual',
  },
  {
    id: 'w.la', thai: 'ล่ะ', roman: 'lâ', en: 'and…? ล่ะ', enAlt: ['la', 'what about'],
    syllables: [{ thai: 'ล่ะ', roman: 'la', tone: 'falling' }],
    pos: 'particle', emoji: '↩️', tags: ['core', 'particle'],
    note: 'Bounces the question back: สบายดี — คุณล่ะ = "I\'m fine — and you?". Pure conversation glue.',
    formality: 'casual',
  },
  {
    id: 'w.nice-to-meet', thai: 'ยินดีที่ได้รู้จัก', roman: 'yin-dii-tîi-dâai-rúu-jàk', en: 'nice to meet you',
    enAlt: ['pleased to meet you'],
    syllables: [
      { thai: 'ยิน', roman: 'yin', tone: 'mid' },
      { thai: 'ดี', roman: 'dii', tone: 'mid' },
      { thai: 'ที่', roman: 'tii', tone: 'falling' },
      { thai: 'ได้', roman: 'daai', tone: 'falling' },
      { thai: 'รู้', roman: 'ruu', tone: 'high' },
      { thai: 'จัก', roman: 'jak', tone: 'low' },
    ],
    pos: 'phrase', emoji: '🤝', literal: 'glad that (I) got to know (you)', tags: ['core', 'standalone'],
    note: 'The standard line right after introductions. It\'s a mouthful, but Thais light up when a foreigner says it.',
    formality: 'polite',
  },
  {
    id: 'w.teacher', thai: 'ครู', roman: 'kruu', en: 'teacher', enAlt: ['kru'],
    syllables: [{ thai: 'ครู', roman: 'kruu', tone: 'mid' }],
    pos: 'noun', emoji: '🧑‍🏫', tags: ['core', 'person'],
    note: 'Teachers say ครู for "I" and students say ครู for "you" — in Thai, roles replace pronouns all the time.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.your-name-q', wordIds: ['w.you', 'w.name', 'w.what'],
    en: "What's your name?", enAlt: ['what is your name?'],
    literal: 'you | name | what', patternId: 'p.name-q', tags: ['introduction'],
  },
  {
    id: 's.excuse-name-q', wordIds: ['w.sorry', 'w.polite-m', 'w.you', 'w.name', 'w.what', 'w.polite-m'],
    thaiOverride: 'ขอโทษครับ คุณชื่ออะไรครับ',
    en: "Excuse me, what's your name? (male speaker)", enAlt: ['excuse me, what is your name?'],
    literal: 'sorry | ♂-polite | you | name | what | ♂-polite', patternId: 'p.name-q', tags: ['introduction'],
  },
  {
    id: 's.my-name-f', wordIds: ['w.i-f', 'w.name', 'w.mouse', 'w.polite-f'],
    en: 'My name is Nuu. (female speaker)', enAlt: ["i'm nuu", 'my name is nuu'],
    literal: 'I♀ | named | Nuu | ♀-polite', patternId: 'p.my-name', tags: ['introduction'],
  },
  {
    id: 's.my-name-m', wordIds: ['w.i-m', 'w.name', 'w.bird', 'w.polite-m'],
    en: 'My name is Nok. (male speaker)', enAlt: ["i'm nok", 'my name is nok'],
    literal: 'I♂ | named | Nok | ♂-polite', patternId: 'p.my-name', tags: ['introduction'],
  },
  {
    id: 's.my-name-casual', wordIds: ['w.we', 'w.name', 'w.bird'],
    en: "I'm Nok. (casual — เรา as 'I')", enAlt: ['my name is nok', "i'm nok"],
    literal: 'we(=I) | named | Nok', patternId: 'p.my-name',
  },
  {
    id: 's.and-you-q', wordIds: ['w.you', 'w.la'],
    en: 'And you?', enAlt: ['what about you?', 'how about you?'],
    literal: 'you | what-about?',
  },
  {
    id: 's.his-name-again', wordIds: ['w.he-she', 'w.name', 'w.what', 'w.na'],
    en: "What's her name again?", enAlt: ["what's his name again?", 'what was her name?'],
    literal: 'he/she | named | what | soft-นะ', patternId: 'p.name-q',
  },
  {
    id: 's.nickname-q', wordIds: ['w.nickname', 'w.what'],
    en: "What's your nickname?", enAlt: ['what is your nickname?'],
    literal: 'nickname | what', tags: ['introduction'],
  },
  {
    id: 's.friend-name-q', wordIds: ['w.friend', 'w.of', 'w.you', 'w.name', 'w.what'],
    en: "What's your friend's name?", enAlt: ['what is your friend called?'],
    literal: 'friend | of | you | named | what', patternId: 'p.name-q',
  },
  {
    id: 's.not-my-friend', wordIds: ['w.he-she', 'w.not', 'w.yes', 'w.friend', 'w.of', 'w.i-f'],
    en: "He's not my friend. (female speaker)", enAlt: ['she is not my friend'],
    literal: 'he/she | not | is(ใช่) | friend | of | I♀', patternId: 'p.of-possession',
  },
  {
    id: 's.nice-to-meet-m', wordIds: ['w.nice-to-meet', 'w.polite-m'],
    en: 'Nice to meet you. (male speaker)', enAlt: ['pleased to meet you'],
    literal: 'glad-to-know-you | ♂-polite', tags: ['introduction'],
  },
  {
    id: 's.nice-to-meet-f', wordIds: ['w.nice-to-meet', 'w.polite-f'],
    en: 'Nice to meet you. (female speaker)', enAlt: ['pleased to meet you'],
    literal: 'glad-to-know-you | ♀-polite', tags: ['introduction'],
  },
  {
    id: 's.teacher-name-q', wordIds: ['w.teacher', 'w.name', 'w.what', 'w.polite-m'],
    en: "What's your name, Teacher? (male speaker)", enAlt: ["what is the teacher's name?"],
    literal: 'teacher(=you) | named | what | ♂-polite', patternId: 'p.name-q',
  },
  {
    id: 's.teacher-name', wordIds: ['w.teacher', 'w.name', 'w.mouse', 'w.polite-f'],
    en: "I'm Teacher Nuu. (teacher speaking)", enAlt: ["the teacher's name is nuu", 'my name is nuu'],
    literal: 'teacher(=I) | named | Nuu | ♀-polite', patternId: 'p.my-name',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.name-q',
    name: '___ ชื่ออะไร (what\'s ___\'s name?)',
    parts: [{ slot: 'person' }, { fixed: ['w.name'] }, { fixed: ['w.what'] }],
    slots: [
      { name: 'person', accepts: { tags: ['person'], exclude: ['w.i-m', 'w.i-f', 'w.person'] } },
    ],
    enTemplate: "What's {person}'s name?",
    explanation:
      'Point ชื่ออะไร at any person-word and you have a name question: คุณ, เขา, เพื่อน, ครู. ' +
      'อะไร sits exactly where the answer will go — Thai questions never rearrange the sentence. ' +
      'Ask it, then reuse the same frame to answer: swap อะไร for the name you hear.',
    literal: '[person] + ชื่อ + อะไร',
    exampleIds: ['s.your-name-q', 's.excuse-name-q', 's.his-name-again', 's.friend-name-q'],
  },
  {
    id: 'p.my-name',
    name: '___ ชื่อ ___ (introducing by name)',
    parts: [{ slot: 'person' }, { fixed: ['w.name'] }, { slot: 'name' }],
    slots: [
      { name: 'person', accepts: { tags: ['person'], exclude: ['w.person'] } },
      { name: 'name', accepts: { wordIds: ['w.bird', 'w.mouse'] } },
    ],
    enTemplate: '{person} is named {name}',
    explanation:
      'ชื่อ is a verb, so there is no "is" and nothing to conjugate: ผมชื่อนก = "I am-named Nok". ' +
      'The same three-beat frame introduces anyone — yourself, your friend, your teacher. ' +
      'It is the exact answer shape of คุณชื่ออะไร: the name drops into the slot where อะไร was.',
    literal: '[person] + ชื่อ + [name]',
    exampleIds: ['s.my-name-m', 's.my-name-f', 's.my-name-casual', 's.teacher-name'],
  },
  {
    id: 'p.of-possession',
    name: '___ ของ ___ (possession)',
    parts: [{ slot: 'thing' }, { fixed: ['w.of'] }, { slot: 'owner' }],
    slots: [
      { name: 'thing', accepts: { pos: ['noun'] } },
      { name: 'owner', accepts: { tags: ['person'] } },
    ],
    enTemplate: "{owner}'s {thing}",
    explanation:
      'Thai possession runs backwards from English: the thing first, then ของ, then the owner. ' +
      'เพื่อนของฉัน = friend-of-me = my friend. One frame covers every noun you will ever learn — ' +
      'and in relaxed speech Thais drop ของ entirely: เพื่อนฉัน.',
    literal: '[thing] + ของ + [owner]',
    exampleIds: ['s.not-my-friend', 's.friend-name-q'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u02',
    order: 2,
    title: 'People & Names',
    subtitle: 'Who are you? Who am I?',
    emoji: '🧑‍🤝‍🧑',
    color: '#4cc9ff',
    outcome: 'Ask anyone their name, introduce yourself and your friends, and say what belongs to whom.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'ชื่อ does the whole job',
        body:
          'English needs "my name IS..." — Thai just says ผมชื่อนก, "I named Nok". ' +
          'ชื่อ works as noun and verb at once, and like every Thai verb it never changes form: ' +
          'same word for I/you/she, today/yesterday. There is nothing to conjugate — ever.',
      },
      {
        title: 'Possession is backwards (and optional)',
        body:
          'The owner comes last: เพื่อนของฉัน = friend-of-me. ' +
          'Once that clicks, every possessive is free: ชื่อของเขา = his name, ครูของเรา = our teacher. ' +
          'In casual speech ของ often vanishes — เพื่อนฉัน means exactly the same thing.',
      },
      {
        title: 'Pronouns are social, not grammatical',
        body:
          'เขา = he AND she — Thai does not care about gender here. เรา = we, but friends use it as a cozy "I". ' +
          'Kids call themselves หนู ("mouse") with elders, and teachers call themselves ครู. ' +
          'Thais pick pronouns by relationship, not by grammar rules — listen for who calls themselves what.',
      },
    ],
    dialogues: [
      {
        id: 'd.u02-party',
        title: 'Making a friend at a party',
        scene: 'Nok (♂) works up the courage to talk to Nuu (♀) at a mutual friend\'s birthday party.',
        lines: [
          { speaker: 'Nok', sentenceId: 's.excuse-name-q' },
          { speaker: 'Nuu', sentenceId: 's.my-name-f' },
          { speaker: 'Nuu', sentenceId: 's.and-you-q' },
          { speaker: 'Nok', sentenceId: 's.my-name-m' },
          { speaker: 'Nuu', sentenceId: 's.nice-to-meet-f' },
          { speaker: 'Nok', sentenceId: 's.nice-to-meet-m' },
        ],
      },
      {
        id: 'd.u02-teacher',
        title: 'First day of Thai class',
        scene: 'A new student (♂) meets his Thai teacher (♀) — note how ครู replaces both "you" and "I".',
        lines: [
          { speaker: 'Student', sentenceId: 's.teacher-name-q' },
          { speaker: 'Teacher', sentenceId: 's.teacher-name' },
          { speaker: 'Student', sentenceId: 's.nice-to-meet-m' },
          { speaker: 'Teacher', sentenceId: 's.nice-to-meet-f' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
