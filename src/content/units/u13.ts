/**
 * Unit 13 — Shopping. ลดหน่อยได้ไหม?
 * Markets are Thailand's living rooms: ask the price, try it on, pick a
 * color, and haggle with a smile using pieces you already own.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.buy', thai: 'ซื้อ', roman: 'sɯ́ɯ', en: 'buy', enAlt: ['to buy'],
    syllables: [{ thai: 'ซื้อ', roman: 'sɯɯ', tone: 'high' }],
    pos: 'verb', emoji: '🛒', tags: ['core', 'action'],
    note: 'ซื้อของ ("buy things") is the everyday word for shopping. Pairs with อยาก and จะ instantly: อยากซื้อ = I want to buy.',
  },
  {
    id: 'w.sell', thai: 'ขาย', roman: 'kǎai', en: 'sell', enAlt: ['to sell'],
    syllables: [{ thai: 'ขาย', roman: 'kaai', tone: 'rising' }],
    pos: 'verb', emoji: '🧺', tags: ['core', 'action'],
    note: 'The mirror of ซื้อ — and tone practice gold: ซื้อ high, ขาย rising. ขายดี = "sells well"; ขายหมด = sold out.',
  },
  {
    id: 'w.reduce', thai: 'ลด', roman: 'lót', en: 'discount', enAlt: ['reduce', 'lower the price', 'come down'],
    syllables: [{ thai: 'ลด', roman: 'lot', tone: 'high' }],
    pos: 'verb', emoji: '📉', tags: ['core', 'action'],
    note: 'The bargaining verb — ลดหน่อยได้ไหม opens every negotiation. Mall signs shout ลด 50% during sales season.',
  },
  {
    id: 'w.this-one', thai: 'อันนี้', roman: 'an-níi', en: 'this one', enAlt: ['this thing', 'this'],
    syllables: [
      { thai: 'อัน', roman: 'an', tone: 'mid' },
      { thai: 'นี้', roman: 'nii', tone: 'high' },
    ],
    pos: 'pronoun', emoji: '👇', tags: ['core', 'object'],
    note: 'อัน is the classifier for "item" — point at anything on a market table and อันนี้ does the rest. The universal shopper\'s word.',
  },
  {
    id: 'w.color', thai: 'สี', roman: 'sǐi', en: 'color', enAlt: ['colour'],
    syllables: [{ thai: 'สี', roman: 'sii', tone: 'rising' }],
    pos: 'noun', emoji: '🌈', tags: ['core'],
    note: 'Color names ride on สี: สีแดง = "color red". Also means paint — a hardware store is a ร้านขายสี.',
  },
  {
    id: 'w.wear', thai: 'ใส่', roman: 'sài', en: 'wear', enAlt: ['to wear', 'put on', 'put in'],
    syllables: [{ thai: 'ใส่', roman: 'sai', tone: 'low' }],
    pos: 'verb', emoji: '🧥', tags: ['core', 'action'],
    note: 'One verb for wearing clothes AND putting things in: ใส่เสื้อ = put on a shirt, ไม่ใส่น้ำแข็ง = no ice, please.',
  },
  {
    id: 'w.try', thai: 'ลอง', roman: 'lɔɔng', en: 'try', enAlt: ['to try', 'try out', 'test'],
    syllables: [{ thai: 'ลอง', roman: 'lɔɔng', tone: 'mid' }],
    pos: 'verb', emoji: '🪞', tags: ['core', 'action'],
    note: 'Glues onto any verb: ลองใส่ = try wearing, ลองกิน = try eating. ลองดู = "give it a shot" — Thailand\'s favorite encouragement.',
  },
  {
    id: 'w.shirt', thai: 'เสื้อ', roman: 'sɯ̂a', en: 'shirt', enAlt: ['top', 'blouse'],
    syllables: [{ thai: 'เสื้อ', roman: 'sɯa', tone: 'falling' }],
    pos: 'noun', emoji: '👕', tags: ['core', 'object'],
    note: 'Any top — shirt, blouse, jacket. เสื้อผ้า ("shirts and cloth") means clothes in general.',
  },
  {
    id: 'w.pants', thai: 'กางเกง', roman: 'gaang-geeng', en: 'pants', enAlt: ['trousers'],
    syllables: [
      { thai: 'กาง', roman: 'gaang', tone: 'mid' },
      { thai: 'เกง', roman: 'geeng', tone: 'mid' },
    ],
    pos: 'noun', emoji: '👖', tags: ['object'],
    note: 'A bouncy double-mid-tone word. Shorts are กางเกงขาสั้น — "short-leg pants". Thai names clothes by describing them.',
  },
  {
    id: 'w.shoes', thai: 'รองเท้า', roman: 'rɔɔng-táao', en: 'shoes', enAlt: ['shoe'],
    syllables: [
      { thai: 'รอง', roman: 'rɔɔng', tone: 'mid' },
      { thai: 'เท้า', roman: 'taao', tone: 'high' },
    ],
    pos: 'noun', emoji: '👟', tags: ['object'],
    note: 'Literally "foot supporter". You\'ll take them off constantly — homes, temples, some shops. Slip-ons are the smart buy.',
  },
  {
    id: 'w.red', thai: 'แดง', roman: 'dɛɛng', en: 'red',
    syllables: [{ thai: 'แดง', roman: 'dɛɛng', tone: 'mid' }],
    pos: 'adj', emoji: '🔴', tags: ['color', 'adjective'],
    note: 'Follows สี: เสื้อสีแดง = red shirt. Every day of the week has a color in Thailand — red belongs to Sunday.',
  },
  {
    id: 'w.black', thai: 'ดำ', roman: 'dam', en: 'black',
    syllables: [{ thai: 'ดำ', roman: 'dam', tone: 'mid' }],
    pos: 'adj', emoji: '⚫', tags: ['color', 'adjective'],
    note: 'In set phrases the สี drops: กาแฟดำ = black coffee, แมวดำ = black cat. With clothes, keep it: เสื้อสีดำ.',
  },
  {
    id: 'w.beautiful', thai: 'สวย', roman: 'sǔai', en: 'beautiful', enAlt: ['pretty', 'lovely'],
    syllables: [{ thai: 'สวย', roman: 'suai', tone: 'rising' }],
    pos: 'adj', emoji: '🌺', tags: ['core', 'standalone', 'adjective'],
    note: 'For things, places, and people — vendors will say it about everything you touch. Mind the tone: สวย rising = pretty, ซวย mid = unlucky!',
  },
  {
    id: 'w.small', thai: 'เล็ก', roman: 'lék', en: 'small', enAlt: ['little', 'tiny'],
    syllables: [{ thai: 'เล็ก', roman: 'lek', tone: 'high' }],
    pos: 'adj', emoji: '🐜', tags: ['core', 'standalone', 'adjective'],
    note: 'Clothing sizes are เล็ก/กลาง/ใหญ่ (S/M/L). เล็กไปหน่อย = "a bit too small" — the fitting-room phrase you\'ll need.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.want-buy-shirt', wordIds: ['w.want', 'w.buy', 'w.shirt'],
    en: 'I want to buy a shirt.', enAlt: ["i'm looking for a shirt"],
    literal: 'want | buy | shirt', patternId: 'p.want-to', tags: ['shopping'],
  },
  {
    id: 's.buy-pants-shoes-m', wordIds: ['w.i-m', 'w.will', 'w.buy', 'w.pants', 'w.and', 'w.shoes'],
    en: "I'm going to buy pants and shoes. (male speaker)", enAlt: ['i will buy trousers and shoes'],
    literal: 'I♂ | will | buy | pants | and | shoes', patternId: 'p.buy', tags: ['shopping'],
  },
  {
    id: 's.this-one-how-much-m', wordIds: ['w.this-one', 'w.how-much', 'w.polite-m'],
    en: 'How much is this one? (male speaker)', enAlt: ['how much is this?'],
    literal: 'this-one | how-much | ♂-polite', patternId: 'p.how-much', tags: ['price', 'question'],
  },
  {
    id: 's.two-hundred-baht-f', wordIds: ['w.two', 'w.hundred', 'w.baht', 'w.polite-f'],
    en: 'Two hundred baht. (female speaker)', enAlt: ['200 baht'],
    literal: 'two | hundred | baht | ♀-polite', patternId: 'p.price', tags: ['price'],
  },
  {
    id: 's.reduce-q-m', wordIds: ['w.reduce', 'w.a-bit', 'w.can', 'w.q-mai', 'w.polite-m'],
    en: 'Can you come down a little? (male speaker)', enAlt: ['can you give a discount?', 'discount, please?'],
    literal: 'reduce | a-bit | can | ? | ♂-polite', patternId: 'p.can-q', tags: ['bargain', 'question'],
  },
  {
    id: 's.reduce-not-can-f', wordIds: ['w.reduce', 'w.not', 'w.can', 'w.polite-f'],
    en: "I can't go lower. (female speaker)", enAlt: ['no discount, sorry'],
    literal: 'reduce | not | can | ♀-polite', tags: ['bargain'],
  },
  {
    id: 's.hundred-baht-q', wordIds: ['w.one', 'w.hundred', 'w.baht', 'w.can', 'w.q-mai'],
    en: 'How about a hundred baht?', enAlt: ['can you do 100 baht?', '100 baht, ok?'],
    literal: 'one | hundred | baht | can | ?', tags: ['bargain', 'question'],
  },
  {
    id: 's.hundred-baht-ok-f', wordIds: ['w.one', 'w.hundred', 'w.baht', 'w.can', 'w.polite-f'],
    en: 'A hundred baht works. (female speaker)', enAlt: ['ok, 100 baht', 'deal — 100 baht'],
    literal: 'one | hundred | baht | can | ♀-polite', tags: ['bargain'],
  },
  {
    id: 's.beautiful-very-f', wordIds: ['w.beautiful', 'w.very', 'w.polite-f'],
    en: 'Very pretty! (female speaker)', enAlt: ["it's beautiful", 'so pretty'],
    literal: 'beautiful | very | ♀-polite', patternId: 'p.adj-maak', tags: ['shopping'],
  },
  {
    id: 's.take-shirt-red', wordIds: ['w.take', 'w.shirt', 'w.color', 'w.red'],
    en: "I'll take the red shirt.", enAlt: ['the red one, please'],
    literal: 'take | shirt | color | red', patternId: 'p.take-color', tags: ['shopping'],
  },
  {
    id: 's.take-shoes-black', wordIds: ['w.take', 'w.shoes', 'w.color', 'w.black'],
    en: "I'll take the black shoes.", enAlt: ['the black shoes, please'],
    literal: 'take | shoes | color | black', patternId: 'p.take-color', tags: ['shopping'],
  },
  {
    id: 's.have-red-q', wordIds: ['w.have', 'w.color', 'w.red', 'w.q-mai'],
    en: 'Do you have it in red?', enAlt: ['do you have red?', 'is there a red one?'],
    literal: 'have | color | red | ?', tags: ['shopping', 'question'],
  },
  {
    id: 's.have-f', wordIds: ['w.have', 'w.polite-f'],
    en: 'Yes, we do. (female speaker)', enAlt: ['we have it', 'yes, there is'],
    literal: 'have | ♀-polite', tags: ['shopping'],
  },
  {
    id: 's.try-wear-q', wordIds: ['w.try', 'w.wear', 'w.can', 'w.q-mai'],
    en: 'Can I try it on?', enAlt: ['may i try it on?'],
    literal: 'try | wear | can | ?', patternId: 'p.try-q', tags: ['shopping', 'question'],
  },
  {
    id: 's.try-eat-q', wordIds: ['w.try', 'w.eat', 'w.can', 'w.q-mai'],
    en: 'Can I try a taste?', enAlt: ['can i taste it?', 'may i try it?'],
    literal: 'try | eat | can | ?', patternId: 'p.try-q', tags: ['question'],
  },
  {
    id: 's.try-can-f', wordIds: ['w.try', 'w.can', 'w.polite-f'],
    en: 'Sure, go ahead. (female speaker)', enAlt: ['you can try it', 'of course, try it'],
    literal: 'try | can | ♀-polite', tags: ['shopping'],
  },
  {
    id: 's.a-bit-small', wordIds: ['w.small', 'w.go', 'w.a-bit'],
    en: "It's a bit too small.", enAlt: ['a little too small', 'too small'],
    literal: 'small | too(go) | a-bit', tags: ['shopping'],
  },
  {
    id: 's.sell-cheap-very', wordIds: ['w.sell', 'w.cheap', 'w.very'],
    en: 'They sell it so cheap!', enAlt: ['such a cheap price', 'you sell it really cheap'],
    literal: 'sell | cheap | very', tags: ['shopping'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.buy',
    name: 'ซื้อ___ (buy ___)',
    parts: [{ slot: 'subject' }, { fixed: ['w.buy'] }, { slot: 'thing' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that', 'w.this-one'] }, optional: true },
      { name: 'thing', accepts: { tags: ['object', 'food', 'drink'] } },
    ],
    enTemplate: '{subject} buy {thing}',
    explanation:
      'ซื้อ + thing — that\'s the whole grammar of shopping. ' +
      'Everything you can point at, you can now buy: ซื้อเสื้อ, ซื้อกาแฟ, ซื้ออันนี้. ' +
      'Stack it with frames you own: อยากซื้อ = want to buy, จะซื้อ = going to buy, ซื้อได้ไหม = can I buy it? ' +
      'Old patterns plus one new verb equals a whole mall of sentences.',
    literal: '[who] + ซื้อ + [thing]',
    exampleIds: ['s.buy-pants-shoes-m', 's.want-buy-shirt'],
  },
  {
    id: 'p.try-q',
    name: 'ลอง___ได้ไหม (can I try ___?)',
    parts: [{ fixed: ['w.try'] }, { slot: 'verb' }, { fixed: ['w.can', 'w.q-mai'] }],
    slots: [
      { name: 'verb', accepts: { tags: ['action'], exclude: ['w.try'] }, optional: true },
    ],
    enTemplate: 'Can I try {verb}?',
    explanation:
      'ลอง sits in front of any verb to mean "try doing it": ลองใส่ try wearing, ลองกิน try tasting. ' +
      'Close with ได้ไหม and you have polite permission to test-drive anything in the shop. ' +
      'Skip the verb and ลองได้ไหม alone still works — point at the thing and ask. ' +
      'The answer comes back in one word: ได้ (go ahead) or ไม่ได้ (sorry, no).',
    literal: 'ลอง + [verb] + ได้ + ไหม',
    exampleIds: ['s.try-wear-q', 's.try-eat-q'],
  },
  {
    id: 'p.take-color',
    name: 'เอา___สี___ (the ___ one, please)',
    parts: [{ fixed: ['w.take'] }, { slot: 'thing' }, { fixed: ['w.color'] }, { slot: 'color' }],
    slots: [
      { name: 'thing', accepts: { tags: ['object'] } },
      { name: 'color', accepts: { tags: ['color'] } },
    ],
    enTemplate: "I'll take the {color} {thing}.",
    explanation:
      'Build the phrase the way you\'d hand items across the table: thing first, then สี, then the color. ' +
      'เอาเสื้อสีแดง = "take shirt color red" — the exact mirror of English "the red shirt". ' +
      'Description always trails the noun in Thai, so every color you learn snaps onto every object you own. ' +
      'Two colors and five things is already ten precise orders.',
    literal: 'เอา + [thing] + สี + [color]',
    exampleIds: ['s.take-shirt-red', 's.take-shoes-black'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u13',
    order: 13,
    title: 'Shopping',
    subtitle: 'Bargain like a pro',
    emoji: '🛍️',
    color: '#ffb020',
    outcome: 'Shop any Thai market: ask prices, try things on, pick colors, and bargain with a smile.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Colors trail the noun, riding on สี',
        body:
          'Thai describes after naming: เสื้อสีแดง = shirt + color + red. First the thing, then สี, then which color. ' +
          'English says "red shirt"; Thai hands you the shirt first and paints it after. ' +
          'This is the same follow-the-noun rule as ข้าวผัดไก่ and อร่อยมาก — one rhythm across the whole language.',
      },
      {
        title: 'Bargaining: three old words, one new skill',
        body:
          'ลดหน่อยได้ไหม is ลด (reduce) + หน่อย (softener) + ได้ไหม (possible?) — nothing new, just assembly. ' +
          'Haggling is expected at markets and a friendly game: smile, counter with a number (ร้อยบาทได้ไหม), and walking away slowly is the strongest move. ' +
          'But prices in malls, 7-Elevens, and food stalls are fixed — bargain there and you\'ll only get a puzzled smile.',
      },
      {
        title: 'ไป turns adjectives into "too ___"',
        body:
          'เล็กไป = too small, แพงไป = too expensive — ไป ("go") after an adjective means it went past the right amount. ' +
          'Soften it with หน่อย: เล็กไปหน่อย = "a wee bit too small", the polite fitting-room verdict. ' +
          'Another free upgrade: every adjective you know just learned to complain politely.',
      },
    ],
    dialogues: [
      {
        id: 'd.u13-bargain',
        title: 'Bargaining at Chatuchak',
        scene: 'Weekend market, Bangkok. Anan (♂) spots a shirt at Pim\'s (♀) stall.',
        lines: [
          { speaker: 'Anan', sentenceId: 's.this-one-how-much-m' },
          { speaker: 'Pim', sentenceId: 's.two-hundred-baht-f' },
          { speaker: 'Anan', sentenceId: 's.reduce-q-m' },
          { speaker: 'Pim', sentenceId: 's.reduce-not-can-f' },
          { speaker: 'Pim', sentenceId: 's.beautiful-very-f' },
          { speaker: 'Anan', sentenceId: 's.hundred-baht-q' },
          { speaker: 'Pim', sentenceId: 's.hundred-baht-ok-f' },
        ],
      },
      {
        id: 'd.u13-try-on',
        title: 'Trying it on',
        scene: 'Fon (♀) hunts for a shirt at Bee\'s (♀) clothing stall.',
        lines: [
          { speaker: 'Fon', sentenceId: 's.want-buy-shirt' },
          { speaker: 'Fon', sentenceId: 's.try-wear-q' },
          { speaker: 'Bee', sentenceId: 's.try-can-f' },
          { speaker: 'Fon', sentenceId: 's.a-bit-small' },
          { speaker: 'Fon', sentenceId: 's.have-red-q' },
          { speaker: 'Bee', sentenceId: 's.have-f' },
          { speaker: 'Fon', sentenceId: 's.take-shirt-red' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
