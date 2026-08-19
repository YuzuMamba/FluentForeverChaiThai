/**
 * Unit 7 — Places & Going. ไป! มา! อยู่!
 * Movement and location: tell a driver where you're going with ไป, say where
 * anything is with อยู่, and never lose the bathroom again with อยู่ที่ไหน.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.go', thai: 'ไป', roman: 'bpai', en: 'go', enAlt: ['going', 'go to'],
    syllables: [{ thai: 'ไป', roman: 'bpai', tone: 'mid' }],
    pos: 'verb', emoji: '🚶‍♂️', tags: ['core', 'action'],
    note: 'Movement AWAY from the speaker. ไปไหน "where ya going?" doubles as a street greeting like "what\'s up" — answer vaguely, no one is prying.',
  },
  {
    id: 'w.come', thai: 'มา', roman: 'maa', en: 'come', enAlt: ['coming', 'arrive'],
    syllables: [{ thai: 'มา', roman: 'maa', tone: 'mid' }],
    pos: 'verb', emoji: '🛬', tags: ['core', 'action'],
    note: 'Movement TOWARD the speaker — the mirror of ไป. มาเมืองไทย = come to Thailand. You\'ll hear มาๆ ("come, come!") waving you into shops and homes.',
  },
  {
    id: 'w.stay', thai: 'อยู่', roman: 'yùu', en: 'be at', enAlt: ['live', 'stay', 'be located', 'at'],
    syllables: [{ thai: 'อยู่', roman: 'yuu', tone: 'low' }],
    pos: 'verb', emoji: '📍', tags: ['core', 'action'],
    note: 'The "to be" of LOCATION, and also "to live": อยู่ที่ไหน = where is it / where do you live. Thai splits English "is" — เป็น/คือ for identity, อยู่ for place.',
  },
  {
    id: 'w.where', thai: 'ที่ไหน', roman: 'tîi-nǎi', en: 'where', enAlt: ['where?', 'which place'],
    syllables: [
      { thai: 'ที่', roman: 'tii', tone: 'falling' },
      { thai: 'ไหน', roman: 'nai', tone: 'rising' },
    ],
    pos: 'question', emoji: '🧭', tags: ['core', 'question'],
    note: 'Literally "at which place". Sits at the END of the sentence, right where the answer will go: ห้องน้ำอยู่ที่ไหน. In fast speech often shortened to just ไหน: ไปไหน?',
  },
  {
    id: 'w.home', thai: 'บ้าน', roman: 'bâan', en: 'home', enAlt: ['house'],
    syllables: [{ thai: 'บ้าน', roman: 'baan', tone: 'falling' }],
    pos: 'noun', emoji: '🏠', tags: ['core', 'place'],
    note: 'House AND home in one word. อยู่บ้าน "staying home" is also the standard soft excuse for skipping plans — no explanation needed.',
  },
  {
    id: 'w.market', thai: 'ตลาด', roman: 'dtà-làat', en: 'market',
    syllables: [
      { thai: 'ตะ', roman: 'dta', tone: 'low' },
      { thai: 'หลาด', roman: 'laat', tone: 'low' },
    ],
    pos: 'noun', emoji: '🧺', tags: ['core', 'place'],
    note: 'The morning heart of every Thai neighborhood — food, clothes, gossip. A fresh market is ตลาดสด; the famous floating ones are ตลาดน้ำ.',
  },
  {
    id: 'w.bathroom', thai: 'ห้องน้ำ', roman: 'hɔ̂ng-náam', en: 'bathroom', enAlt: ['toilet', 'restroom'],
    syllables: [
      { thai: 'ห้อง', roman: 'hɔng', tone: 'falling' },
      { thai: 'น้ำ', roman: 'naam', tone: 'high' },
    ],
    pos: 'noun', emoji: '🚻', tags: ['core', 'place'],
    note: 'Literally "water room" — ห้อง room + น้ำ water. ห้องน้ำอยู่ที่ไหน may be the single most useful sentence in this app; any shop or stall will point you somewhere.',
  },
  {
    id: 'w.hotel', thai: 'โรงแรม', roman: 'roong-rɛɛm', en: 'hotel',
    syllables: [
      { thai: 'โรง', roman: 'roong', tone: 'mid' },
      { thai: 'แรม', roman: 'rɛɛm', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🏨', tags: ['place'],
    note: 'โรง (big building) + แรม (stay overnight). That โรง prefix builds many places — โรงเรียน school, โรงพยาบาล hospital. Spot it and decode signs for free.',
  },
  {
    id: 'w.at', thai: 'ที่', roman: 'tîi', en: 'at', enAlt: ['in', 'place'],
    syllables: [{ thai: 'ที่', roman: 'tii', tone: 'falling' }],
    pos: 'prep', emoji: '📌', tags: ['core'],
    note: 'The location glue: อยู่ที่บ้าน = at home. It builds ที่ไหน (which place? = where) and ที่นั่น (that place = there). Casual speech often drops it entirely.',
  },
  {
    id: 'w.school', thai: 'โรงเรียน', roman: 'roong-rian', en: 'school',
    syllables: [
      { thai: 'โรง', roman: 'roong', tone: 'mid' },
      { thai: 'เรียน', roman: 'rian', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🏫', tags: ['place'],
    note: 'โรง building + เรียน study = "study building". Mention you\'re studying Thai (เรียนภาษาไทย) and watch faces light up everywhere you go.',
  },
  {
    id: 'w.temple', thai: 'วัด', roman: 'wát', en: 'temple',
    syllables: [{ thai: 'วัด', roman: 'wat', tone: 'high' }],
    pos: 'noun', emoji: '🛕', tags: ['place'],
    note: 'Part temple, part park, part community hall — every neighborhood has one. Visit any time; just cover shoulders and knees and slip off your shoes.',
  },
  {
    id: 'w.sea', thai: 'ทะเล', roman: 'tá-lee', en: 'sea', enAlt: ['beach', 'ocean'],
    syllables: [
      { thai: 'ทะ', roman: 'ta', tone: 'high' },
      { thai: 'เล', roman: 'lee', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🏖️', tags: ['place'],
    note: 'Thais say ไปทะเล "go to the sea" for any beach trip. The beach itself is ชายหาด, but nobody invites you there — they invite you to the ทะเล.',
  },
  {
    id: 'w.airport', thai: 'สนามบิน', roman: 'sà-nǎam-bin', en: 'airport',
    syllables: [
      { thai: 'สะ', roman: 'sa', tone: 'low' },
      { thai: 'หนาม', roman: 'naam', tone: 'rising' },
      { thai: 'บิน', roman: 'bin', tone: 'mid' },
    ],
    pos: 'noun', emoji: '✈️', tags: ['place'], literal: 'field + fly',
    note: 'สนาม (field) + บิน (fly) = "flying field". Bangkok has two — สุวรรณภูมิ (Suvarnabhumi) and ดอนเมือง (Don Mueang) — so check your ticket twice.',
  },
  {
    id: 'w.bangkok', thai: 'กรุงเทพฯ', roman: 'grung-têep', en: 'Bangkok',
    syllables: [
      { thai: 'กรุง', roman: 'grung', tone: 'mid' },
      { thai: 'เทพ', roman: 'teep', tone: 'falling' },
    ],
    pos: 'noun', emoji: '🌆', tags: ['place'],
    note: 'What Thais actually call their capital — "Bangkok" (บางกอก) is the old village name foreigners kept. The full ceremonial name is the longest city name on Earth.',
  },
  {
    id: 'w.thailand', thai: 'เมืองไทย', roman: 'mɯang-tai', en: 'Thailand',
    syllables: [
      { thai: 'เมือง', roman: 'mɯang', tone: 'mid' },
      { thai: 'ไทย', roman: 'tai', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🇹🇭', tags: ['place'],
    note: 'เมือง (city/land) + ไทย. In conversation Thais say เมืองไทย — the formal ประเทศไทย is for the news. You\'ll hear มาเมืองไทย "come to Thailand" in every warm welcome.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.go-where-m', wordIds: ['w.go', 'w.where', 'w.polite-m'],
    en: 'Where are you going? (male speaker)', enAlt: ['where to?', 'where are you off to?'],
    literal: 'go | where | ♂-polite', tags: ['greeting', 'travel'],
  },
  {
    id: 's.go-market-m', wordIds: ['w.go', 'w.market', 'w.polite-m'],
    en: "I'm going to the market. (male speaker)", enAlt: ['going to the market', 'i go to the market'],
    literal: 'go | market | ♂-polite', patternId: 'p.go-to',
  },
  {
    id: 's.go-airport-f', wordIds: ['w.go', 'w.airport', 'w.polite-f'],
    en: 'To the airport, please. (female speaker)', enAlt: ["i'm going to the airport", 'airport please'],
    literal: 'go | airport | ♀-polite', patternId: 'p.go-to', tags: ['travel'],
  },
  {
    id: 's.we-go-sea', wordIds: ['w.we', 'w.go', 'w.sea'],
    en: "We're going to the beach.", enAlt: ['we go to the sea', 'we are going to the beach'],
    literal: 'we | go | sea', patternId: 'p.go-to',
  },
  {
    id: 's.go-eat-rice-q', wordIds: ['w.go', 'w.eat', 'w.rice', 'w.q-mai'],
    en: 'Want to go eat?', enAlt: ['shall we go eat?', 'go eat rice?', 'wanna grab food?'],
    literal: 'go | eat | rice | ?', patternId: 'p.mai-question', tags: ['invite'],
  },
  {
    id: 's.lets-go', wordIds: ['w.go'],
    en: "Let's go!", enAlt: ['go', "sure, let's go", "i'm in"],
    literal: 'go',
  },
  {
    id: 's.want-go-sea', wordIds: ['w.want', 'w.go', 'w.sea'],
    en: 'I want to go to the beach.', enAlt: ['i wanna go to the beach', 'i want to go to the sea'],
    literal: 'want | go | sea',
  },
  {
    id: 's.not-go', wordIds: ['w.not', 'w.go'],
    en: "I'm not going.", enAlt: ['not going', 'no, not going'],
    literal: 'not | go',
  },
  {
    id: 's.bathroom-where', wordIds: ['w.bathroom', 'w.stay', 'w.where'],
    en: "Where's the bathroom?", enAlt: ['where is the toilet', 'where is the restroom'],
    literal: 'bathroom | be-at | where', patternId: 'p.where-q', tags: ['survival'],
  },
  {
    id: 's.excuse-bathroom-where-m',
    wordIds: ['w.sorry', 'w.polite-m', 'w.bathroom', 'w.stay', 'w.where', 'w.polite-m'],
    thaiOverride: 'ขอโทษครับ ห้องน้ำอยู่ที่ไหนครับ',
    en: "Excuse me, where's the bathroom? (male speaker)", enAlt: ['excuse me, where is the toilet'],
    literal: 'sorry | ♂-polite | bathroom | be-at | where | ♂-polite', patternId: 'p.where-q', tags: ['survival'],
  },
  {
    id: 's.hotel-stay-where-m', wordIds: ['w.hotel', 'w.stay', 'w.where', 'w.polite-m'],
    en: 'Where is the hotel? (male speaker)', enAlt: ['where is my hotel'],
    literal: 'hotel | be-at | where | ♂-polite', patternId: 'p.where-q', tags: ['travel'],
  },
  {
    id: 's.you-stay-where', wordIds: ['w.you', 'w.stay', 'w.where'],
    en: 'Where do you live?', enAlt: ['where are you?', 'where do you stay'],
    literal: 'you | be-at | where', patternId: 'p.where-q',
  },
  {
    id: 's.i-stay-bangkok-f', wordIds: ['w.i-f', 'w.stay', 'w.bangkok', 'w.polite-f'],
    en: 'I live in Bangkok. (female speaker)', enAlt: ['i stay in bangkok'],
    literal: 'I♀ | be-at | Bangkok | ♀-polite',
  },
  {
    id: 's.friend-stay-home', wordIds: ['w.friend', 'w.stay', 'w.at', 'w.home'],
    en: 'My friend is at home.', enAlt: ['a friend is at home', 'my friend stays home'],
    literal: 'friend | be-at | at | home',
  },
  {
    id: 's.stay-there-f', wordIds: ['w.stay', 'w.at', 'w.that', 'w.polite-f'],
    en: "It's over there. (female speaker)", enAlt: ['over there', 'it is there'],
    literal: 'be-at | at | that(there) | ♀-polite',
  },
  {
    id: 's.friend-come-thailand', wordIds: ['w.friend', 'w.come', 'w.thailand'],
    en: 'My friend is coming to Thailand.', enAlt: ['my friend comes to thailand'],
    literal: 'friend | come | Thailand',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.go-to',
    name: '(___) ไป ___ (going to ___)',
    parts: [{ slot: 'subject' }, { fixed: ['w.go'] }, { slot: 'place' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'] }, optional: true },
      { name: 'place', accepts: { tags: ['place'] } },
    ],
    enTemplate: '{subject} go to {place}',
    explanation:
      'ไป + place — that\'s the whole sentence. No "to", no conjugation: ไป is go, goes, went, and going all at once. ' +
      'Drop the subject whenever context makes it obvious — Thais usually do. ' +
      'Every place you ever learn plugs straight in: ตลาด, โรงแรม, ทะเล, กรุงเทพฯ. ' +
      'Stamp ไหม on the end and it becomes an invitation: ไปทะเลไหม = "beach?"',
    literal: '[subject] + ไป + [place]',
    exampleIds: ['s.go-market-m', 's.go-airport-f', 's.we-go-sea'],
  },
  {
    id: 'p.where-q',
    name: '___ อยู่ที่ไหน (where is ___?)',
    parts: [{ slot: 'thing' }, { fixed: ['w.stay'] }, { fixed: ['w.where'] }],
    slots: [{ name: 'thing', accepts: { tags: ['place', 'person', 'object'] } }],
    enTemplate: 'Where is {thing}?',
    explanation:
      'Name the thing first, then ask where it lives: ห้องน้ำอยู่ที่ไหน = "bathroom — is at — which place?". ' +
      'Thai keeps question words where the ANSWER would sit, so ที่ไหน goes at the end — exactly where ที่ตลาด will go in the reply. ' +
      'It works for things, places, and people alike: the bathroom, your hotel, your friend. ' +
      'Learn this one frame and you can never really be lost in Thailand.',
    literal: '[thing] + อยู่ + ที่ไหน',
    exampleIds: ['s.bathroom-where', 's.hotel-stay-where-m', 's.you-stay-where'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u07',
    order: 7,
    title: 'Places & Going',
    subtitle: 'bpai! maa! yùu!',
    emoji: '🗺️',
    color: '#4cc9ff',
    outcome: 'Tell any driver where you\'re going, say where you live, and find anything — bathroom included — by asking where it is.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'ไป or มา? It depends on where YOU are',
        body:
          'ไป = motion away from the speaker, มา = motion toward the speaker. ' +
          'Your friend in Bangkok says มาเมืองไทย "come to Thailand"; you at home say ไปเมืองไทย "go to Thailand" — same trip, different anchor. ' +
          'And ไปไหน "where ya going?" is an everyday greeting like "what\'s up" — a vague answer like ไปตลาด is a perfectly polite reply.',
      },
      {
        title: 'อยู่: the "to be" of location',
        body:
          'English "is" does two jobs Thai keeps separate: เป็น/คือ say what something IS (unit 3), อยู่ says WHERE it is. ' +
          'อยู่ also means live/stay: ฉันอยู่กรุงเทพฯ = "I live in Bangkok". ' +
          'Put anything before อยู่ที่ไหน and you have the survival question: ห้องน้ำอยู่ที่ไหน, โรงแรมอยู่ที่ไหน. ' +
          'The answer swaps ที่ไหน for a place — question and answer share one shape.',
      },
      {
        title: 'Places snap on — no "to", no "in", no verb endings',
        body:
          'ไปตลาด = "go market". Thai needs no preposition after motion verbs, and verbs never change form — ' +
          'ไป covers go, went, and going; time comes from context. ' +
          'ที่ marks location (อยู่ที่บ้าน "at home") and builds ที่ไหน "where" and ที่นั่น "there", ' +
          'but in fast speech Thais drop it: อยู่บ้าน, ไปไหน. Understand it, then relax and drop it like a local.',
      },
    ],
    dialogues: [
      {
        id: 'd.u07-street',
        title: 'ไปไหน? — the street hello',
        scene: 'Lek (♂) spots his friend Anan (♂) walking through the neighborhood.',
        lines: [
          { speaker: 'Lek', sentenceId: 's.go-where-m' },
          { speaker: 'Anan', sentenceId: 's.go-market-m' },
          { speaker: 'Lek', sentenceId: 's.go-eat-rice-q' },
          { speaker: 'Anan', sentenceId: 's.lets-go' },
        ],
      },
      {
        id: 'd.u07-taxi',
        title: 'To the airport',
        scene: 'Bua (♀) flags down a taxi; Lek (♂) is driving. Her friend lands today, then it\'s straight to the sea.',
        lines: [
          { speaker: 'Lek', sentenceId: 's.go-where-m' },
          { speaker: 'Bua', sentenceId: 's.go-airport-f' },
          { speaker: 'Bua', sentenceId: 's.friend-come-thailand' },
          { speaker: 'Bua', sentenceId: 's.we-go-sea' },
          { speaker: 'Lek', sentenceId: 's.want-go-sea' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
