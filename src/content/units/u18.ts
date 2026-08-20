/**
 * Unit 18 — Making Plans. ว่างไหม?
 * The unit that gets you OUT with Thai friends: checking who's free,
 * inviting with ด้วยกันไหม, pinning down a time with นัด, and the
 * softeners (นะ, เถอะ) that make plans sound friendly, not bossy.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.meet-up', thai: 'นัด', roman: 'nát', en: 'arrange to meet', enAlt: ['make an appointment', 'appointment', 'set a date'],
    syllables: [{ thai: 'นัด', roman: 'nat', tone: 'high' }],
    pos: 'verb', emoji: '🗓️', tags: ['core', 'action'],
    note: 'Verb AND noun: นัดกี่โมง = what time are we meeting? มีนัด = "I have plans" — the classic polite excuse.',
  },
  {
    id: 'w.free', thai: 'ว่าง', roman: 'wâang', en: 'free (not busy)', enAlt: ['available', 'not busy'],
    syllables: [{ thai: 'ว่าง', roman: 'waang', tone: 'falling' }],
    pos: 'adj', emoji: '🆓', tags: ['core', 'adjective', 'standalone'],
    note: 'ว่างไหม opens almost every Thai plan. Answer ว่าง (I\'m free) or ไม่ว่าง — the standard soft way to decline.',
  },
  {
    id: 'w.call', thai: 'โทร', roman: 'too', en: 'call (phone)', enAlt: ['phone', 'ring'],
    syllables: [{ thai: 'โทร', roman: 'too', tone: 'mid' }],
    pos: 'verb', emoji: '📞', tags: ['core', 'action'],
    note: 'Short for โทรศัพท์ (telephone). Thais say โทรมา "call (to) me" and โทรหา "call to (someone)".',
  },
  {
    id: 'w.together', thai: 'ด้วยกัน', roman: 'dûai-gan', en: 'together', enAlt: ['with each other'],
    syllables: [
      { thai: 'ด้วย', roman: 'duai', tone: 'falling' },
      { thai: 'กัน', roman: 'gan', tone: 'mid' },
    ],
    pos: 'adv', emoji: '👫', tags: ['core'],
    note: 'Goes AFTER the activity: กินข้าวด้วยกัน = eat together. Same กัน as in เจอกัน — in fast speech it shrinks to just กัน.',
  },
  {
    id: 'w.when', thai: 'เมื่อไหร่', roman: 'mɯ̂a-rài', en: 'when?', enAlt: ['when'],
    syllables: [
      { thai: 'เมื่อ', roman: 'mɯa', tone: 'falling' },
      { thai: 'ไหร่', roman: 'rai', tone: 'low' },
    ],
    pos: 'question', emoji: '🕰️', tags: ['core', 'question'],
    note: 'Sits at the END like other Thai question words: ว่างเมื่อไหร่ = when are you free? Never at the start.',
  },
  {
    id: 'w.weekend', thai: 'เสาร์อาทิตย์', roman: 'sǎo-aa-tít', en: 'weekend', enAlt: ['the weekend', 'saturday-sunday'],
    syllables: [
      { thai: 'เสาร์', roman: 'sao', tone: 'rising' },
      { thai: 'อา', roman: 'aa', tone: 'mid' },
      { thai: 'ทิตย์', roman: 'tit', tone: 'high' },
    ],
    pos: 'noun', emoji: '🏖️', tags: ['core', 'time'],
    note: 'Literally "Saturday(-)Sunday" mashed together — the everyday spoken word for the weekend.',
  },
  {
    id: 'w.invite', thai: 'ชวน', roman: 'chuan', en: 'invite', enAlt: ['ask along', 'ask out'],
    syllables: [{ thai: 'ชวน', roman: 'chuan', tone: 'mid' }],
    pos: 'verb', emoji: '💌', tags: ['action'],
    note: 'To pull a friend along: เพื่อนชวนไปกินข้าว = a friend asked me out to eat. You\'ll hear it constantly.',
  },
  {
    id: 'w.convenient', thai: 'สะดวก', roman: 'sà-dùak', en: 'convenient', enAlt: ['works for me', 'suits'],
    syllables: [
      { thai: 'สะ', roman: 'sa', tone: 'low' },
      { thai: 'ดวก', roman: 'duak', tone: 'low' },
    ],
    pos: 'adj', emoji: '👌', tags: ['adjective', 'standalone'],
    note: 'The polite hinge of Thai scheduling: สะดวกไหม = "does that work for you?" — softer than pushing a time on someone.',
  },
  {
    id: 'w.busy', thai: 'ยุ่ง', roman: 'yûng', en: 'busy', enAlt: ['swamped', 'hectic'],
    syllables: [{ thai: 'ยุ่ง', roman: 'yung', tone: 'falling' }],
    pos: 'adj', emoji: '😵‍💫', tags: ['adjective', 'feeling', 'standalone'],
    note: 'ไม่ว่าง says your schedule is full; ยุ่ง says you\'re swamped. ยุ่งมาก = crazy busy — say it with a sigh.',
  },
  {
    id: 'w.sure', thai: 'แน่นอน', roman: 'nɛ̂ɛ-nɔɔn', en: 'for sure', enAlt: ['certainly', 'definitely', 'of course'],
    syllables: [
      { thai: 'แน่', roman: 'nɛɛ', tone: 'falling' },
      { thai: 'นอน', roman: 'nɔɔn', tone: 'mid' },
    ],
    pos: 'adv', emoji: '💯', tags: ['core', 'standalone'],
    note: 'The enthusiastic yes to any invitation. แน่นอนครับ/ค่ะ = "absolutely!" — warmer than a plain ได้.',
  },
  {
    id: 'w.cinema', thai: 'โรงหนัง', roman: 'roong-nǎng', en: 'movie theater', enAlt: ['cinema', 'the movies'],
    syllables: [
      { thai: 'โรง', roman: 'roong', tone: 'mid' },
      { thai: 'หนัง', roman: 'nang', tone: 'rising' },
    ],
    pos: 'noun', emoji: '🎦', tags: ['place'],
    note: 'โรง building + หนัง movie. Same โรง as โรงแรม (hotel) and โรงพยาบาล (hospital) — spot the pattern.',
  },
  {
    id: 'w.lets', thai: 'เถอะ', roman: 'tə̀', en: "let's!", enAlt: ['come on', 'go ahead'],
    syllables: [{ thai: 'เถอะ', roman: 'tə', tone: 'low' }],
    pos: 'particle', emoji: '🙌', tags: ['particle'],
    formality: 'casual',
    note: 'End particle that nudges: ไปเถอะ = "come on, let\'s go / just go". Friendly encouragement, never bossy.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.today-free-q', wordIds: ['w.today', 'w.free', 'w.q-mai'],
    en: 'Are you free today?', enAlt: ['are you available today?'],
    literal: 'today | free | ?', patternId: 'p.free-q', tags: ['plans', 'question'],
  },
  {
    id: 's.weekend-free-q', wordIds: ['w.weekend', 'w.free', 'w.q-mai'],
    en: 'Are you free this weekend?', enAlt: ['are you free on the weekend?'],
    literal: 'weekend | free | ?', patternId: 'p.free-q', tags: ['plans', 'question'],
  },
  {
    id: 's.when-free-q', wordIds: ['w.free', 'w.when'],
    en: 'When are you free?', enAlt: ['when will you be free?'],
    literal: 'free | when', tags: ['plans', 'question'],
  },
  {
    id: 's.go-eat-together-q', wordIds: ['w.go', 'w.eat', 'w.rice', 'w.together', 'w.q-mai'],
    en: 'Shall we go eat together?', enAlt: ['want to go eat together?', 'shall we go get food together?'],
    literal: 'go | eat | rice | together | ?', patternId: 'p.together-invite', tags: ['plans', 'question'],
  },
  {
    id: 's.go-watch-movie-together-q', wordIds: ['w.go', 'w.watch', 'w.movie', 'w.together', 'w.q-mai'],
    en: 'Shall we go see a movie together?', enAlt: ['want to go watch a movie together?'],
    literal: 'go | watch | movie | together | ?', patternId: 'p.together-invite', tags: ['plans', 'question'],
  },
  {
    id: 's.go-together-lets', wordIds: ['w.go', 'w.together', 'w.lets'],
    en: "Come on, let's go together!", enAlt: ["let's go together"],
    literal: "go | together | let's", tags: ['plans'],
  },
  {
    id: 's.meet-what-time', wordIds: ['w.meet-up', 'w.what-time'],
    en: 'What time shall we meet?', enAlt: ['what time are we meeting?'],
    literal: 'arrange-meet | what-time', patternId: 'p.meet-time', tags: ['plans', 'question'],
  },
  {
    id: 's.meet-tomorrow-evening', wordIds: ['w.meet-up', 'w.tomorrow', 'w.evening', 'w.na'],
    en: "Let's make it tomorrow evening, okay?", enAlt: ['meet tomorrow evening, okay?'],
    literal: 'arrange-meet | tomorrow | evening | นะ', patternId: 'p.meet-time', tags: ['plans'],
  },
  {
    id: 's.meet-at-cinema', wordIds: ['w.meet-up', 'w.see-you', 'w.at', 'w.cinema'],
    en: "Let's meet at the movie theater.", enAlt: ['meet at the cinema'],
    literal: 'arrange | meet-each-other | at | movie-theater', tags: ['plans'],
  },
  {
    id: 's.today-busy-very', wordIds: ['w.today', 'w.busy', 'w.very'],
    en: "I'm really busy today.", enAlt: ['today is really busy'],
    literal: 'today | busy | very', tags: ['plans'],
  },
  {
    id: 's.tomorrow-free', wordIds: ['w.tomorrow', 'w.free'],
    en: "I'm free tomorrow.", enAlt: ['tomorrow i am free'],
    literal: 'tomorrow | free', tags: ['plans'],
  },
  {
    id: 's.friend-invite-eat', wordIds: ['w.friend', 'w.invite', 'w.go', 'w.eat', 'w.som-tam'],
    en: 'A friend invited me to go eat som tam.', enAlt: ['my friend asked me out for som tam'],
    literal: 'friend | invite | go | eat | som-tam', tags: ['plans'],
  },
  {
    id: 's.convenient-q', wordIds: ['w.convenient', 'w.q-mai'],
    en: 'Does that work for you?', enAlt: ['is that convenient?'],
    literal: 'convenient | ?', tags: ['plans', 'question'],
  },
  {
    id: 's.call-me-na', wordIds: ['w.call', 'w.come', 'w.na'],
    en: 'Call me, okay?', enAlt: ['give me a call'],
    literal: 'call | come | นะ', tags: ['plans'],
  },
  {
    id: 's.free-sure', wordIds: ['w.free', 'w.sure'],
    en: "I'm free for sure!", enAlt: ['definitely free'],
    literal: 'free | for-sure', tags: ['plans'],
  },
  {
    id: 's.sure-thing-m', wordIds: ['w.sure', 'w.polite-m'],
    en: 'For sure! (male speaker)', enAlt: ['absolutely', 'of course'],
    literal: 'for-sure | ♂-polite', tags: ['plans'],
  },
  {
    id: 's.evening-na', wordIds: ['w.evening', 'w.na'],
    en: 'In the evening, okay?', enAlt: ['evening, okay?'],
    literal: 'evening | นะ', tags: ['plans'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.together-invite',
    name: 'ไป ___ ด้วยกันไหม (invitation)',
    parts: [
      { fixed: ['w.go'] }, { slot: 'verb' }, { slot: 'object' },
      { fixed: ['w.together'] }, { fixed: ['w.q-mai'] },
    ],
    slots: [
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'object', accepts: { tags: ['food', 'drink', 'object', 'activity', 'place'] }, optional: true },
    ],
    enTemplate: 'Shall we go {verb} {object} together?',
    explanation:
      'The all-purpose Thai invitation: ไป + activity + ด้วยกัน + ไหม. Thai needs no "shall we" or ' +
      '"would you like to" — the ไหม question does the inviting for you. Swap in anything you have ' +
      'learned to do: กินข้าว, ดูหนัง, เที่ยว. One frame, endless plans.',
    literal: 'go + [verb] + [object] + together + ?',
    exampleIds: ['s.go-eat-together-q', 's.go-watch-movie-together-q'],
  },
  {
    id: 'p.free-q',
    name: '___ ว่างไหม (are you free?)',
    parts: [{ slot: 'time' }, { fixed: ['w.free'] }, { fixed: ['w.q-mai'] }],
    slots: [{ name: 'time', accepts: { tags: ['time'] }, optional: true }],
    enTemplate: 'Are you free {time}?',
    explanation:
      'ว่างไหม is how Thais open every plan. Put the time word in front — no "on", no "at", no ' +
      'preposition at all: วันนี้ว่างไหม, เสาร์อาทิตย์ว่างไหม. The answer is simply ว่าง or ไม่ว่าง, ' +
      'and ไม่ว่าง doubles as the standard gentle "no thanks".',
    literal: '[time] + free + ?',
    exampleIds: ['s.today-free-q', 's.weekend-free-q'],
  },
  {
    id: 'p.meet-time',
    name: 'นัด + time (set the meeting)',
    parts: [{ fixed: ['w.meet-up'] }, { slot: 'time' }],
    slots: [{ name: 'time', accepts: { tags: ['time'], wordIds: ['w.what-time', 'w.when'] } }],
    enTemplate: "Let's meet {time}",
    explanation:
      'นัด plants the meeting and the time follows straight after: นัดกี่โมง asks the time, ' +
      'นัดพรุ่งนี้ sets it. Thai time words attach directly — no "at", no "on". ' +
      'Add นะ on the end to turn it into a friendly confirmation.',
    literal: 'arrange-meet + [time]',
    exampleIds: ['s.meet-what-time', 's.meet-tomorrow-evening'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u18',
    order: 18,
    title: 'Making Plans',
    subtitle: "Let's meet up!",
    emoji: '📅',
    color: '#ffb020',
    outcome: "Invite friends out, check who's free, set a time and place, and lock in weekend plans.",
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'นัด — your whole social calendar in one syllable',
        body:
          'นัด is both the verb "arrange to meet" and the noun "appointment/date". ' +
          'นัดกี่โมง = what time are we meeting? นัดเจอกัน = let\'s arrange to meet. ' +
          'And มีนัด "I have an appointment" is the politest excuse in Thailand — no details required.',
      },
      {
        title: 'Inviting without "would you like to…"',
        body:
          'A Thai invitation is just the plan plus ไหม: ไปกินข้าวด้วยกันไหม, literally "go eat rice together ?". ' +
          'No conditionals, no "would/could". Accept with ได้ or แน่นอน; decline softly with ไม่ว่าง (not free). ' +
          'Thais rarely say a hard no — busy IS the no.',
      },
      {
        title: 'Softeners: นะ and เถอะ',
        body:
          'นะ (from Unit 2) asks for warm agreement: โทรมานะ = "call me, yeah?". ' +
          'เถอะ nudges everyone into action: ไปด้วยกันเถอะ = "come on, let\'s go". ' +
          'These particles are the difference between sounding like a textbook and sounding like a friend.',
      },
    ],
    dialogues: [
      {
        id: 'd.u18-movie-plan',
        title: 'Weekend movie plan',
        scene: 'Ploy (♀) catches Ben (♂) after work to plan the weekend.',
        lines: [
          { speaker: 'Ploy', sentenceId: 's.weekend-free-q' },
          { speaker: 'Ben', sentenceId: 's.free-sure' },
          { speaker: 'Ploy', sentenceId: 's.go-watch-movie-together-q' },
          { speaker: 'Ben', sentenceId: 's.go-together-lets' },
          { speaker: 'Ploy', sentenceId: 's.meet-what-time' },
          { speaker: 'Ben', sentenceId: 's.evening-na' },
          { speaker: 'Ploy', sentenceId: 's.meet-at-cinema' },
        ],
      },
      {
        id: 'd.u18-phone-call',
        title: 'Rescheduling by phone',
        scene: 'Nok (♀) calls Tan (♂) to grab dinner, but today is no good.',
        lines: [
          { speaker: 'Nok', sentenceId: 's.today-free-q' },
          { speaker: 'Tan', sentenceId: 's.today-busy-very' },
          { speaker: 'Tan', sentenceId: 's.tomorrow-free' },
          { speaker: 'Nok', sentenceId: 's.go-eat-together-q' },
          { speaker: 'Tan', sentenceId: 's.sure-thing-m' },
          { speaker: 'Nok', sentenceId: 's.meet-tomorrow-evening' },
          { speaker: 'Tan', sentenceId: 's.call-me-na' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
