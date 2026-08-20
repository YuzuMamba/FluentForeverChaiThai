/**
 * Unit 6 — Ordering Food. ขอ...หน่อย!
 * The unit that pays for itself at the first street stall: request politely
 * with ขอ...หน่อย, order decisively with เอา, negotiate spice, get the bill.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.request', thai: 'ขอ', roman: 'kɔ̌ɔ', en: 'may I have', enAlt: ['request', 'ask for', 'can i have'],
    syllables: [{ thai: 'ขอ', roman: 'kɔɔ', tone: 'rising' }],
    pos: 'verb', emoji: '🤲', tags: ['core'],
    note: 'The all-purpose request opener. ขอ + thing = "may I have the thing" — works for food, the bill, directions, favors. Same ขอ as in ขอโทษ (requesting forgiveness).',
  },
  {
    id: 'w.a-bit', thai: 'หน่อย', roman: 'nɔ̀i', en: 'a bit (softener)', enAlt: ['a little', 'please'],
    syllables: [{ thai: 'หน่อย', roman: 'nɔi', tone: 'low' }],
    pos: 'particle', emoji: '🤏', tags: ['core', 'particle'],
    note: 'Tacked onto requests to soften them — "just a little (trouble for you)". It does NOT mean you want a small amount. ขอ...หน่อย is the politeness sandwich.',
  },
  {
    id: 'w.take', thai: 'เอา', roman: 'ao', en: "I'll take", enAlt: ['take', 'want', "i'll have"],
    syllables: [{ thai: 'เอา', roman: 'ao', tone: 'mid' }],
    pos: 'verb', emoji: '☝️', tags: ['core', 'action'],
    note: 'How Thais actually order: เอา + dish = "I\'ll take...". Direct but not rude — add ครับ/ค่ะ and it\'s perfectly polite. Point at what you want and say it.',
  },
  {
    id: 'w.can', thai: 'ได้', roman: 'dâai', en: 'can', enAlt: ['can do', 'ok', 'able to', 'may'],
    syllables: [{ thai: 'ได้', roman: 'daai', tone: 'falling' }],
    pos: 'verb', emoji: '👌', tags: ['core', 'standalone'],
    note: 'Placed AFTER the verb phrase: กินเผ็ดได้ = "can eat spicy". Alone it\'s a complete answer: ได้! = "Sure, can do!" — one of the most-heard words in Thailand.',
  },
  {
    id: 'w.spicy', thai: 'เผ็ด', roman: 'pèt', en: 'spicy', enAlt: ['hot (spicy)'],
    syllables: [{ thai: 'เผ็ด', roman: 'pet', tone: 'low' }],
    pos: 'adj', emoji: '🌶️', tags: ['core', 'flavor', 'adjective', 'standalone'],
    note: 'The word that saves foreigners daily. Thai "normal" spice is serious — say ไม่เผ็ด (not spicy) or เผ็ดนิดหน่อย early and often.',
  },
  {
    id: 'w.shop', thai: 'ร้าน', roman: 'ráan', en: 'shop', enAlt: ['store', 'restaurant', 'stall'],
    syllables: [{ thai: 'ร้าน', roman: 'raan', tone: 'high' }],
    pos: 'noun', emoji: '🏪', tags: ['core', 'place'],
    note: 'Any shop, stall, or small restaurant. Thais name them by what they sell: ร้านกาแฟ = coffee shop, ร้านข้าว = rice shop.',
  },
  {
    id: 'w.and', thai: 'และ', roman: 'lɛ́', en: 'and',
    syllables: [{ thai: 'และ', roman: 'lɛ', tone: 'high' }],
    pos: 'conj', emoji: '➕', tags: ['core'],
    note: 'The standard "and" — you\'ll see it on every menu and sign. In fast casual speech Thais often say กับ (gàp) instead, but และ is always understood.',
  },
  {
    id: 'w.pork', thai: 'หมู', roman: 'mǔu', en: 'pork', enAlt: ['pig'],
    syllables: [{ thai: 'หมู', roman: 'muu', tone: 'rising' }],
    pos: 'noun', emoji: '🐷', tags: ['core', 'food'],
    note: 'Both the animal and the meat — Thailand\'s default protein. หมู also means "easy" in slang: งานหมูๆ = "a piece-of-cake job".',
  },
  {
    id: 'w.ice', thai: 'น้ำแข็ง', roman: 'náam-kɛ̌ng', en: 'ice',
    syllables: [
      { thai: 'น้ำ', roman: 'naam', tone: 'high' },
      { thai: 'แข็ง', roman: 'kɛng', tone: 'rising' },
    ],
    pos: 'noun', emoji: '🧊', tags: ['drink', 'object'],
    note: 'Literally "hard water". In tropical heat everything comes with ice — ask ขอน้ำแข็งหน่อย and a bucket of it appears.',
  },
  {
    id: 'w.menu', thai: 'เมนู', roman: 'mee-nuu', en: 'menu',
    syllables: [
      { thai: 'เม', roman: 'mee', tone: 'mid' },
      { thai: 'นู', roman: 'nuu', tone: 'mid' },
    ],
    pos: 'noun', emoji: '📋', tags: ['object'],
    note: 'Borrowed straight from English — one of many loanwords that make restaurant Thai easier than you fear. ขอเมนูหน่อย gets you started at any table.',
  },
  {
    id: 'w.check-bill', thai: 'เช็คบิล', roman: 'chék-bin', en: 'check, please', enAlt: ['bill', 'the check'],
    syllables: [
      { thai: 'เช็ค', roman: 'chek', tone: 'high' },
      { thai: 'บิล', roman: 'bin', tone: 'mid' },
    ],
    pos: 'phrase', emoji: '🧾', tags: ['core', 'standalone'],
    note: 'English "check" + "bill" fused into one Thai phrase. Catch the server\'s eye, say เช็คบิลครับ/ค่ะ. At street stalls you\'ll also hear เก็บตังค์ (gèp dtang).',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.request-water', wordIds: ['w.request', 'w.water', 'w.a-bit'],
    en: 'Some water, please.', enAlt: ['may i have water', 'can i have some water'],
    literal: 'may-I-have | water | a-bit', patternId: 'p.request', tags: ['ordering'],
  },
  {
    id: 's.request-menu-f', wordIds: ['w.request', 'w.menu', 'w.a-bit', 'w.polite-f'],
    en: 'Could I get the menu? (female speaker)', enAlt: ['menu please', 'may i have the menu'],
    literal: 'may-I-have | menu | a-bit | ♀-polite', patternId: 'p.request', tags: ['ordering'],
  },
  {
    id: 's.request-tea-ice-m', wordIds: ['w.request', 'w.tea', 'w.and', 'w.ice', 'w.a-bit', 'w.polite-m'],
    en: 'Tea and ice, please. (male speaker)', enAlt: ['may i have tea and ice'],
    literal: 'may-I-have | tea | and | ice | a-bit | ♂-polite', patternId: 'p.request', tags: ['ordering'],
  },
  {
    id: 's.take-fried-rice-chicken-f', wordIds: ['w.take', 'w.fried-rice', 'w.chicken', 'w.polite-f'],
    en: "I'll have the chicken fried rice. (female speaker)", enAlt: ['chicken fried rice please'],
    literal: 'take | fried-rice | chicken | ♀-polite', patternId: 'p.take', tags: ['ordering'],
  },
  {
    id: 's.take-egg-fried-rice', wordIds: ['w.take', 'w.fried-rice', 'w.egg'],
    en: "I'll take egg fried rice.", enAlt: ['egg fried rice please'],
    literal: 'take | fried-rice | egg', patternId: 'p.take', tags: ['ordering'],
  },
  {
    id: 's.take-pork-not-spicy', wordIds: ['w.take', 'w.fried-rice', 'w.pork', 'w.not', 'w.spicy'],
    en: "I'll have pork fried rice, not spicy.", enAlt: ['pork fried rice not spicy'],
    literal: 'take | fried-rice | pork | not | spicy', patternId: 'p.take', tags: ['ordering'],
  },
  {
    id: 's.spicy-q', wordIds: ['w.spicy', 'w.q-mai'],
    en: 'Is it spicy?', enAlt: ['spicy?'],
    literal: 'spicy | ?', patternId: 'p.mai-question',
  },
  {
    id: 's.not-spicy-can-q', wordIds: ['w.not', 'w.spicy', 'w.can', 'w.q-mai'],
    en: 'Can you make it not spicy?', enAlt: ['not spicy, is that possible?', 'can it be not spicy'],
    literal: 'not | spicy | can | ?', patternId: 'p.can-q', tags: ['ordering'],
  },
  {
    id: 's.eat-spicy-can-q', wordIds: ['w.eat', 'w.spicy', 'w.can', 'w.q-mai'],
    en: 'Can you eat spicy food?', enAlt: ['can you handle spicy'],
    literal: 'eat | spicy | can | ?', patternId: 'p.can-q',
  },
  {
    id: 's.can-m', wordIds: ['w.can', 'w.polite-m'],
    en: 'Sure, can do. (male speaker)', enAlt: ['sure', 'yes i can', 'ok'],
    literal: 'can | ♂-polite',
  },
  {
    id: 's.can-f', wordIds: ['w.can', 'w.polite-f'],
    en: 'Sure, can do. (female speaker)', enAlt: ['sure', 'yes i can', 'ok'],
    literal: 'can | ♀-polite',
  },
  {
    id: 's.fried-rice-how-much-m', wordIds: ['w.fried-rice', 'w.how-much', 'w.polite-m'],
    en: 'How much is the fried rice? (male speaker)', enAlt: ['how much for fried rice'],
    literal: 'fried-rice | how-much | ♂-polite', tags: ['ordering'],
  },
  {
    id: 's.forty-baht-f', wordIds: ['w.four', 'w.ten', 'w.baht', 'w.polite-f'],
    en: 'Forty baht. (female speaker)', enAlt: ['40 baht'],
    literal: 'four | ten | baht | ♀-polite',
  },
  {
    id: 's.check-bill-m', wordIds: ['w.check-bill', 'w.a-bit', 'w.polite-m'],
    en: 'Check, please. (male speaker)', enAlt: ['the bill please', 'can i get the bill'],
    literal: 'check-bill | a-bit | ♂-polite', tags: ['ordering'],
  },
  {
    id: 's.delicious-very', wordIds: ['w.delicious', 'w.very'],
    en: 'So delicious!', enAlt: ['very delicious', 'really tasty'],
    literal: 'delicious | very',
  },
  {
    id: 's.this-friend-shop', wordIds: ['w.this', 'w.shop', 'w.of', 'w.friend'],
    en: "This is my friend's shop.", enAlt: ["this is a friend's shop"],
    literal: 'this | shop | of | friend',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.request',
    name: 'ขอ ___ หน่อย (may I have ___)',
    parts: [{ fixed: ['w.request'] }, { slot: 'thing' }, { fixed: ['w.a-bit'] }],
    slots: [{ name: 'thing', accepts: { tags: ['food', 'drink', 'object'] } }],
    enTemplate: 'May I have {thing}?',
    explanation:
      'ขอ opens the request and หน่อย closes it — a politeness sandwich around whatever you want. ' +
      'หน่อย literally means "a bit", but here it softens the imposition, not the amount. ' +
      'Every noun you ever learn drops straight into the middle: water, the menu, a discount, help. ' +
      'Add ครับ/ค่ะ and you can ask for anything in Thailand without offending anyone.',
    literal: 'ขอ + [thing] + หน่อย',
    exampleIds: ['s.request-water', 's.request-menu-f', 's.request-tea-ice-m'],
  },
  {
    id: 'p.take',
    name: 'เอา ___ (I\'ll take ___)',
    parts: [{ fixed: ['w.take'] }, { slot: 'thing' }],
    slots: [{ name: 'thing', accepts: { tags: ['food', 'drink', 'object'] } }],
    enTemplate: "I'll take {thing}.",
    explanation:
      'When the vendor is waiting and the wok is hot, Thais don\'t ask — they state: เอา + dish. ' +
      'It sounds abrupt in English ("Take fried rice!") but in Thai it\'s the normal way to order. ' +
      'Use ขอ...หน่อย for favors and extras; use เอา for the order itself.',
    literal: 'เอา + [thing]',
    exampleIds: ['s.take-fried-rice-chicken-f', 's.take-egg-fried-rice', 's.take-pork-not-spicy'],
  },
  {
    id: 'p.can-q',
    name: '___ ได้ไหม (can ___?)',
    parts: [{ slot: 'verb' }, { fixed: ['w.can'] }, { fixed: ['w.q-mai'] }],
    slots: [{ name: 'verb', accepts: { tags: ['action'] } }],
    enTemplate: 'Can (I/you) {verb}?',
    explanation:
      'Say what you want to happen, then stamp ได้ไหม on the end: กินเผ็ดได้ไหม = "eat spicy — possible?". ' +
      'ได้ comes AFTER the verb phrase, the opposite of English "can". ' +
      'The answer needs no yes/no word: ได้ means it\'s on, ไม่ได้ means it isn\'t. ' +
      'This one frame asks permission, possibility, and ability all at once.',
    literal: '[verb phrase] + ได้ + ไหม',
    exampleIds: ['s.eat-spicy-can-q', 's.not-spicy-can-q'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u06',
    order: 6,
    title: 'Ordering Food',
    subtitle: 'khɔ̌ɔ ... nɔ̀i!',
    emoji: '🍜',
    color: '#ff8a3d',
    outcome: 'Order food and drinks at any stall or restaurant, control the spice, and get the bill — politely.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'ขอ ... หน่อย: the request sandwich',
        body:
          'To request anything, wrap it: ขอ [thing] หน่อย. ขอ = "may I have", หน่อย = "a bit" — ' +
          'but หน่อย softens the ASK, not the amount; you\'ll still get a full glass of water. ' +
          'This is the single most reusable frame in Thai: ขอเมนูหน่อย, ขอน้ำแข็งหน่อย, เช็คบิลหน่อย. ' +
          'Finish with ครับ/ค่ะ and you sound both friendly and fluent.',
      },
      {
        title: 'The dish comes first, the details after',
        body:
          'Thai modifiers FOLLOW the noun: ข้าวผัดไก่ = fried rice + chicken, not "chicken fried rice". ' +
          'Order like you\'re building the plate: dish first (ข้าวผัด), then protein (ไก่/หมู/ไข่), then adjustments (ไม่เผ็ด). ' +
          'Once you feel this rhythm you can decode — and order — most of a Thai menu.',
      },
      {
        title: 'ได้: can, may, OK — one word does it all',
        body:
          'ได้ sits after the verb phrase and covers English "can", "may", and "it\'s possible". ' +
          'Ask with ...ได้ไหม, answer with ได้ ("can!") or ไม่ได้ ("can\'t"). ' +
          'No "yes" or "no" needed — Thai answers questions by echoing the key word. ' +
          'Listen for ได้ครับ/ได้ค่ะ everywhere: it\'s the sound of Thailand saying "no problem".',
      },
    ],
    dialogues: [
      {
        id: 'd.u06-stall',
        title: 'Fried rice at a street stall',
        scene: 'Bua (♀) grabs a plastic stool at Lek\'s (♂) fried-rice cart.',
        lines: [
          { speaker: 'Bua', sentenceId: 's.request-menu-f' },
          { speaker: 'Bua', sentenceId: 's.take-fried-rice-chicken-f' },
          { speaker: 'Lek', sentenceId: 's.spicy-q' },
          { speaker: 'Bua', sentenceId: 's.not-spicy-can-q' },
          { speaker: 'Lek', sentenceId: 's.can-m' },
          { speaker: 'Bua', sentenceId: 's.request-water' },
        ],
      },
      {
        id: 'd.u06-bill',
        title: 'Paying up',
        scene: 'Anan (♂) orders at Pim\'s (♀) shop, eats, and settles the bill.',
        lines: [
          { speaker: 'Anan', sentenceId: 's.fried-rice-how-much-m' },
          { speaker: 'Pim', sentenceId: 's.forty-baht-f' },
          { speaker: 'Anan', sentenceId: 's.take-pork-not-spicy' },
          { speaker: 'Pim', sentenceId: 's.can-f' },
          { speaker: 'Anan', sentenceId: 's.delicious-very' },
          { speaker: 'Anan', sentenceId: 's.check-bill-m' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
