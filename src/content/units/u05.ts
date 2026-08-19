/**
 * Unit 5 — Numbers & Money. เท่าไหร่?
 * Ten digits + สิบ + ร้อย = every price in Thailand. Numbers stack biggest-first,
 * prices need no verb, and เท่าไหร่ at the end opens every market conversation.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.one', thai: 'หนึ่ง', roman: 'nɯ̀ng', en: 'one', enAlt: ['1'],
    syllables: [{ thai: 'หนึ่ง', roman: 'nɯng', tone: 'low' }],
    pos: 'number', emoji: '1️⃣', tags: ['core', 'number'],
    note: 'Becomes เอ็ด (èt) at the end of bigger numbers: 21 = ยี่สิบเอ็ด. Casual speech also flips it — หนึ่งร้อย becomes ร้อยนึง.',
  },
  {
    id: 'w.two', thai: 'สอง', roman: 'sɔ̌ɔng', en: 'two', enAlt: ['2'],
    syllables: [{ thai: 'สอง', roman: 'sɔɔng', tone: 'rising' }],
    pos: 'number', emoji: '2️⃣', tags: ['core', 'number'],
    note: 'For 20, Thai swaps สอง for ยี่ (ยี่สิบ). Everywhere else — 2, 200, 12 — สอง stays.',
  },
  {
    id: 'w.three', thai: 'สาม', roman: 'sǎam', en: 'three', enAlt: ['3'],
    syllables: [{ thai: 'สาม', roman: 'saam', tone: 'rising' }],
    pos: 'number', emoji: '3️⃣', tags: ['core', 'number'],
    note: 'Before สิบ it multiplies: สามสิบ = 30. After สิบ it adds: สิบสาม = 13. Position is arithmetic.',
  },
  {
    id: 'w.four', thai: 'สี่', roman: 'sìi', en: 'four', enAlt: ['4'],
    syllables: [{ thai: 'สี่', roman: 'sii', tone: 'low' }],
    pos: 'number', emoji: '4️⃣', tags: ['core', 'number'],
    note: 'สี่สิบ = 40, สิบสี่ = 14 — same two words, opposite order, very different bill.',
  },
  {
    id: 'w.five', thai: 'ห้า', roman: 'hâa', en: 'five', enAlt: ['5'],
    syllables: [{ thai: 'ห้า', roman: 'haa', tone: 'falling' }],
    pos: 'number', emoji: '5️⃣', tags: ['core', 'number'],
    note: 'Thais type 555 to laugh online — ห้าห้าห้า sounds like "hahaha".',
  },
  {
    id: 'w.six', thai: 'หก', roman: 'hòk', en: 'six', enAlt: ['6'],
    syllables: [{ thai: 'หก', roman: 'hok', tone: 'low' }],
    pos: 'number', emoji: '6️⃣', tags: ['core', 'number'],
    note: 'หก also means "to spill" — context keeps it clear. Short and clipped: hòk.',
  },
  {
    id: 'w.seven', thai: 'เจ็ด', roman: 'jèt', en: 'seven', enAlt: ['7'],
    syllables: [{ thai: 'เจ็ด', roman: 'jet', tone: 'low' }],
    pos: 'number', emoji: '7️⃣', tags: ['core', 'number'],
    note: '7-Eleven — the corner store of all Thailand — is just เซเว่น "seven" in Thai mouths.',
  },
  {
    id: 'w.eight', thai: 'แปด', roman: 'bpɛ̀ɛt', en: 'eight', enAlt: ['8'],
    syllables: [{ thai: 'แปด', roman: 'bpɛɛt', tone: 'low' }],
    pos: 'number', emoji: '8️⃣', tags: ['core', 'number'],
    note: 'That bp is one crisp sound between b and p — harder than English b, no puff of air like p.',
  },
  {
    id: 'w.nine', thai: 'เก้า', roman: 'gâao', en: 'nine', enAlt: ['9'],
    syllables: [{ thai: 'เก้า', roman: 'gaao', tone: 'falling' }],
    pos: 'number', emoji: '9️⃣', tags: ['core', 'number'],
    note: 'The lucky number — it sounds like ก้าว "to step forward". Thais pay extra for phone numbers full of nines.',
  },
  {
    id: 'w.ten', thai: 'สิบ', roman: 'sìp', en: 'ten', enAlt: ['10'],
    syllables: [{ thai: 'สิบ', roman: 'sip', tone: 'low' }],
    pos: 'number', emoji: '🔟', tags: ['core', 'number'],
    note: 'The workhorse of prices: ห้าสิบ 50, สิบห้า 15. Which side of สิบ a digit sits on changes everything.',
  },
  {
    id: 'w.hundred', thai: 'ร้อย', roman: 'rɔ́ɔi', en: 'hundred', enAlt: ['100'],
    syllables: [{ thai: 'ร้อย', roman: 'rɔɔi', tone: 'high' }],
    pos: 'number', emoji: '💯', tags: ['core', 'number'],
    note: 'Stack it like สิบ: ร้อยห้าสิบ = 150. In markets you\'ll hear the casual ร้อยนึง for "a hundred".',
  },
  {
    id: 'w.baht', thai: 'บาท', roman: 'bàat', en: 'baht',
    syllables: [{ thai: 'บาท', roman: 'baat', tone: 'low' }],
    pos: 'classifier', emoji: '💵', tags: ['core'],
    note: 'Goes AFTER the number: ยี่สิบบาท = 20 baht. Vendors often drop it entirely and just call out the bare number.',
  },
  {
    id: 'w.how-much', thai: 'เท่าไหร่', roman: 'tâo-rài', en: 'how much?', enAlt: ['how much', 'how many'],
    syllables: [
      { thai: 'เท่า', roman: 'tao', tone: 'falling' },
      { thai: 'ไหร่', roman: 'rai', tone: 'low' },
    ],
    pos: 'question', emoji: '🤷', tags: ['core', 'question'],
    note: 'Sits at the END of the sentence: กาแฟเท่าไหร่. The bookish spelling is เท่าไร, but everyone SAYS tâo-rài.',
  },
  {
    id: 'w.expensive', thai: 'แพง', roman: 'pɛɛng', en: 'expensive', enAlt: ['pricey'],
    syllables: [{ thai: 'แพง', roman: 'pɛɛng', tone: 'mid' }],
    pos: 'adj', emoji: '💎', tags: ['core', 'standalone', 'adjective'],
    note: 'Say แพง! with a grin at a market stall and the bargaining begins. Not at 7-Eleven or the mall — those prices are fixed.',
  },
  {
    id: 'w.cheap', thai: 'ถูก', roman: 'tùuk', en: 'cheap', enAlt: ['inexpensive'],
    syllables: [{ thai: 'ถูก', roman: 'tuuk', tone: 'low' }],
    pos: 'adj', emoji: '🏷️', tags: ['core', 'standalone', 'adjective'],
    note: 'Also means "correct" in other contexts — for prices it\'s simply cheap. ถูกมาก = a great deal.',
  },
  {
    id: 'w.money', thai: 'เงิน', roman: 'ngən', en: 'money', enAlt: ['silver', 'cash'],
    syllables: [{ thai: 'เงิน', roman: 'ngən', tone: 'mid' }],
    pos: 'noun', emoji: '💰', tags: ['core', 'object'],
    note: 'Also the word for "silver" — coins were once silver. Covers cash, money, even salary.',
  },
  {
    id: 'w.zero', thai: 'ศูนย์', roman: 'sǔun', en: 'zero', enAlt: ['0'],
    syllables: [{ thai: 'ศูนย์', roman: 'suun', tone: 'rising' }],
    pos: 'number', emoji: '0️⃣', tags: ['number'],
    note: 'You\'ll hear it digit-by-digit in phone numbers: 081 = ศูนย์-แปด-หนึ่ง.',
  },
  {
    id: 'w.twenty', thai: 'ยี่สิบ', roman: 'yîi-sìp', en: 'twenty', enAlt: ['20'],
    syllables: [
      { thai: 'ยี่', roman: 'yii', tone: 'falling' },
      { thai: 'สิบ', roman: 'sip', tone: 'low' },
    ],
    pos: 'number', emoji: '2️⃣0️⃣', tags: ['number'],
    note: 'The one irregular ten: ยี่สิบ, never สองสิบ. And 21 = ยี่สิบเอ็ด — เอ็ด replaces หนึ่ง after any ten.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.this-how-much', wordIds: ['w.this', 'w.how-much'],
    en: 'How much is this?', enAlt: ['how much?'],
    literal: 'this | how-much', patternId: 'p.how-much', tags: ['price', 'question'],
  },
  {
    id: 's.coffee-how-much', wordIds: ['w.coffee', 'w.how-much'],
    en: 'How much is the coffee?', enAlt: ['how much for the coffee?'],
    literal: 'coffee | how-much', patternId: 'p.how-much', tags: ['price', 'question'],
  },
  {
    id: 's.fried-rice-how-much', wordIds: ['w.fried-rice', 'w.how-much', 'w.polite-m'],
    en: 'How much is the fried rice? (male speaker)', enAlt: ['how much for the fried rice?'],
    literal: 'fried-rice | how-much | ♂-polite', patternId: 'p.how-much', tags: ['price', 'question'],
  },
  {
    id: 's.fifteen-baht', wordIds: ['w.ten', 'w.five', 'w.baht'],
    en: '15 baht.', enAlt: ['fifteen baht'],
    literal: 'ten | five | baht', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.fifty-baht', wordIds: ['w.five', 'w.ten', 'w.baht'],
    en: '50 baht.', enAlt: ['fifty baht'],
    literal: 'five | ten | baht', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.twenty-baht-f', wordIds: ['w.twenty', 'w.baht', 'w.polite-f'],
    en: '20 baht. (female speaker)', enAlt: ['twenty baht'],
    literal: 'twenty | baht | ♀-polite', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.thirty-baht', wordIds: ['w.three', 'w.ten', 'w.baht'],
    en: '30 baht.', enAlt: ['thirty baht'],
    literal: 'three | ten | baht', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.forty-baht-f', wordIds: ['w.four', 'w.ten', 'w.baht', 'w.polite-f'],
    en: '40 baht. (female speaker)', enAlt: ['forty baht'],
    literal: 'four | ten | baht | ♀-polite', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.ninety-nine-baht', wordIds: ['w.nine', 'w.ten', 'w.nine', 'w.baht'],
    en: '99 baht.', enAlt: ['ninety-nine baht'],
    literal: 'nine | ten | nine | baht', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.hundred-baht', wordIds: ['w.one', 'w.hundred', 'w.baht'],
    en: '100 baht.', enAlt: ['one hundred baht', 'a hundred baht'],
    literal: 'one | hundred | baht', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.fried-rice-forty', wordIds: ['w.fried-rice', 'w.four', 'w.ten', 'w.baht'],
    en: 'Fried rice is 40 baht.', enAlt: ['the fried rice costs forty baht'],
    literal: 'fried-rice | four | ten | baht', tags: ['price', 'food'],
  },
  {
    id: 's.expensive-very', wordIds: ['w.expensive', 'w.very'],
    en: "That's so expensive!", enAlt: ['very expensive', 'too expensive'],
    literal: 'expensive | very', patternId: 'p.adj-maak', tags: ['price', 'bargain'],
  },
  {
    id: 's.expensive-q', wordIds: ['w.expensive', 'w.q-mai'],
    en: 'Is it expensive?', enAlt: ['expensive?'],
    literal: 'expensive | ?', patternId: 'p.adj-mai', tags: ['price', 'question'],
  },
  {
    id: 's.not-expensive', wordIds: ['w.not', 'w.expensive'],
    en: "It's not expensive.", enAlt: ['not expensive'],
    literal: 'not | expensive', patternId: 'p.not-adj', tags: ['price'],
  },
  {
    id: 's.not-cheap', wordIds: ['w.not', 'w.cheap'],
    en: "It's not cheap.", enAlt: ['not cheap'],
    literal: 'not | cheap', patternId: 'p.not-adj', tags: ['price'],
  },
  {
    id: 's.cheap-very', wordIds: ['w.cheap', 'w.very'],
    en: 'Really cheap!', enAlt: ['very cheap', 'what a deal'],
    literal: 'cheap | very', patternId: 'p.adj-maak', tags: ['price'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.how-much',
    name: '___เท่าไหร่? (How much is ___?)',
    parts: [{ slot: 'object' }, { fixed: ['w.how-much'] }],
    slots: [
      { name: 'object', accepts: { tags: ['food', 'drink', 'object'], wordIds: ['w.this', 'w.that'] } },
    ],
    enTemplate: 'How much is {object}?',
    explanation:
      'Thai questions keep normal word order: name the thing, then drop เท่าไหร่ at the end. ' +
      'No "is", no inversion — กาแฟเท่าไหร่ is literally "coffee how-much". ' +
      'Point with นี่ and one question shops the entire market for you.',
    literal: '[thing] + เท่าไหร่',
    exampleIds: ['s.this-how-much', 's.coffee-how-much', 's.fried-rice-how-much'],
  },
  {
    id: 'p.price',
    name: '___บาท (saying prices)',
    parts: [{ slot: 'amount' }, { fixed: ['w.baht'] }],
    slots: [{ name: 'amount', accepts: { pos: ['number'] } }],
    enTemplate: '{amount} baht',
    explanation:
      'Answers come back as bare numbers plus บาท — no verb, no "it costs". ' +
      'Digits stack biggest-first: ห้าสิบ (five-ten) = 50, ห้าสิบห้า = 55, ร้อยห้าสิบ = 150. ' +
      'Ten digits plus สิบ and ร้อย, and you can say — and hear — every price in Thailand.',
    literal: '[number] + บาท',
    exampleIds: ['s.fifty-baht', 's.thirty-baht', 's.twenty-baht-f', 's.fried-rice-forty'],
  },
  {
    id: 'p.not-adj',
    name: 'ไม่___ (not ___)',
    parts: [{ fixed: ['w.not'] }, { slot: 'adjective' }],
    slots: [{ name: 'adjective', accepts: { pos: ['adj'], exclude: ['w.fine'] } }],
    enTemplate: 'Not {adjective}.',
    explanation:
      'ไม่ in front flips any adjective or verb — one word does the work of English "not / don\'t / isn\'t". ' +
      'ไม่แพง not expensive, ไม่หิว not hungry, ไม่อร่อย not tasty. ' +
      'No do-support, no agreement, nothing to memorize: ไม่ + word, done.',
    literal: 'ไม่ + [adjective]',
    exampleIds: ['s.not-expensive', 's.not-cheap', 's.not-hungry'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u05',
    order: 5,
    title: 'Numbers & Money',
    subtitle: 'Count it, pay it',
    emoji: '💸',
    color: '#ffb020',
    outcome: 'Count to 100, ask prices, and handle baht like a local.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Numbers stack like Lego',
        body:
          'Big pieces first: ห้าสิบ (five-ten) = 50, สิบห้า (ten-five) = 15 — order IS the arithmetic. ' +
          'Before สิบ a digit multiplies, after it it adds. ' +
          'ร้อย works the same: สองร้อยห้าสิบ = 250. Learn ten digits and two big pieces, count to 999.',
      },
      {
        title: 'The three rebels: 20, 21, and street-talk 100',
        body:
          'Twenty is ยี่สิบ — never สองสิบ. A final "one" becomes เอ็ด: 21 = ยี่สิบเอ็ด, 31 = สามสิบเอ็ด. ' +
          'And in markets, หนึ่งร้อย relaxes into ร้อยนึง. ' +
          'Three small exceptions — everything else is pure Lego.',
      },
      {
        title: 'Prices have no verb',
        body:
          'ข้าวผัดสี่สิบบาท = "fried rice forty baht". No "is", no "costs" — thing, number, บาท, done. ' +
          'Asking works the same way: thing + เท่าไหร่. ' +
          'When a vendor answers with just ห้าสิบ, that bare number IS the full sentence.',
      },
    ],
    dialogues: [
      {
        id: 'd.u05-market-bargain',
        title: 'The bargaining dance',
        scene: 'Chatuchak market. Anan (♂) eyes a souvenir; vendor Pui (♀) sizes him up.',
        lines: [
          { speaker: 'Anan', sentenceId: 's.this-how-much' },
          { speaker: 'Pui', sentenceId: 's.fifty-baht' },
          { speaker: 'Anan', sentenceId: 's.expensive-very' },
          { speaker: 'Pui', sentenceId: 's.not-expensive' },
          { speaker: 'Anan', sentenceId: 's.thirty-baht' },
          { speaker: 'Pui', sentenceId: 's.forty-baht-f' },
        ],
      },
      {
        id: 'd.u05-food-stall',
        title: 'Checking the menu prices',
        scene: 'Ton (♂) reads the hand-painted price board at Bua\'s (♀) food stall.',
        lines: [
          { speaker: 'Ton', sentenceId: 's.coffee-how-much' },
          { speaker: 'Bua', sentenceId: 's.twenty-baht-f' },
          { speaker: 'Ton', sentenceId: 's.fried-rice-how-much' },
          { speaker: 'Bua', sentenceId: 's.fried-rice-forty' },
          { speaker: 'Ton', sentenceId: 's.not-expensive' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
