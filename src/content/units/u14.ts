/**
 * Unit 14 — Street Food & Flavors. เผ็ดไหม?
 * The flavor vocabulary plus the real mechanics of ordering at a stall:
 * dish + topping stacking (ผัดไทยกุ้ง), spice levels, and ใส่/ไม่ใส่ customizing.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.sweet', thai: 'หวาน', roman: 'wǎan', en: 'sweet',
    syllables: [{ thai: 'หวาน', roman: 'waan', tone: 'rising' }],
    pos: 'adj', emoji: '🍬', tags: ['core', 'flavor', 'adjective', 'standalone'],
    note: 'Thai drinks come VERY sweet by default. หวานน้อย = "less sweet", ไม่หวาน = "no sugar" — say it when you order.',
  },
  {
    id: 'w.salty', thai: 'เค็ม', roman: 'kem', en: 'salty',
    syllables: [{ thai: 'เค็ม', roman: 'kem', tone: 'mid' }],
    pos: 'adj', emoji: '🧂', tags: ['flavor', 'adjective', 'standalone'],
    note: 'Saltiness in Thai food comes from fish sauce, not the salt shaker. Also slang for a stingy person!',
  },
  {
    id: 'w.sour', thai: 'เปรี้ยว', roman: 'bprîao', en: 'sour',
    syllables: [{ thai: 'เปรี้ยว', roman: 'bpriao', tone: 'falling' }],
    pos: 'adj', emoji: '🍋', tags: ['flavor', 'adjective', 'standalone'],
    note: 'The lime kick in som tam and tom yum. Also slang for a sassy, fashion-forward person.',
  },
  {
    id: 'w.bland', thai: 'จืด', roman: 'jɯ̀ɯt', en: 'bland', enAlt: ['plain', 'tasteless'],
    syllables: [{ thai: 'จืด', roman: 'jɯɯt', tone: 'low' }],
    pos: 'adj', emoji: '😐', tags: ['flavor', 'adjective', 'standalone'],
    note: 'The worst insult for Thai food — no punch at all. Also describes boring people and dull movies.',
  },
  {
    id: 'w.pad-thai', thai: 'ผัดไทย', roman: 'pàt-tai', en: 'pad thai', literal: 'stir-fry + Thai',
    syllables: [
      { thai: 'ผัด', roman: 'pat', tone: 'low' },
      { thai: 'ไทย', roman: 'tai', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🍝', tags: ['core', 'food'],
    note: 'Literally "Thai stir-fry". Order it by topping: ผัดไทยกุ้ง (shrimp), ผัดไทยไก่ (chicken).',
  },
  {
    id: 'w.som-tam', thai: 'ส้มตำ', roman: 'sôm-dtam', en: 'som tam', enAlt: ['papaya salad'], literal: 'sour + pound',
    syllables: [
      { thai: 'ส้ม', roman: 'som', tone: 'falling' },
      { thai: 'ตำ', roman: 'dtam', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🥗', tags: ['core', 'food'],
    note: 'Pounded green-papaya salad, made to order in a mortar — so you CAN ask for your exact spice level.',
  },
  {
    id: 'w.noodles', thai: 'ก๋วยเตี๋ยว', roman: 'gǔai-dtǐao', en: 'noodles', enAlt: ['noodle soup'],
    syllables: [
      { thai: 'ก๋วย', roman: 'guai', tone: 'rising' },
      { thai: 'เตี๋ยว', roman: 'dtiao', tone: 'rising' },
    ],
    pos: 'noun', emoji: '🍜', tags: ['core', 'food'],
    note: 'Chinese-style noodle soup, the everyday street lunch. Order it by meat: ก๋วยเตี๋ยวหมู = pork noodles.',
  },
  {
    id: 'w.order', thai: 'สั่ง', roman: 'sàng', en: 'order (food)',
    syllables: [{ thai: 'สั่ง', roman: 'sang', tone: 'low' }],
    pos: 'verb', emoji: '📝', tags: ['core', 'action'],
    note: 'Also means "to command" — when you สั่ง food, you\'re giving orders. Vendors ask: จะสั่งอะไร "what\'ll you order?"',
  },
  {
    id: 'w.sticky-rice', thai: 'ข้าวเหนียว', roman: 'kâao-nǐao', en: 'sticky rice', literal: 'rice + sticky',
    syllables: [
      { thai: 'ข้าว', roman: 'kaao', tone: 'falling' },
      { thai: 'เหนียว', roman: 'niao', tone: 'rising' },
    ],
    pos: 'noun', emoji: '🍚', tags: ['food'],
    note: 'Eaten with your hands: pinch off a ball, scoop up the som tam. ส้มตำ + ไก่ย่าง + ข้าวเหนียว is THE classic street set.',
  },
  {
    id: 'w.grilled', thai: 'ย่าง', roman: 'yâang', en: 'grilled', enAlt: ['grill', 'to grill'],
    syllables: [{ thai: 'ย่าง', roman: 'yaang', tone: 'falling' }],
    pos: 'verb', emoji: '🔥', tags: ['action'],
    note: 'A verb that rides after the meat, like toppings do: ไก่ย่าง grilled chicken, หมูย่าง grilled pork. Follow the charcoal smoke to find it.',
  },
  {
    id: 'w.shrimp', thai: 'กุ้ง', roman: 'gûng', en: 'shrimp', enAlt: ['prawn'],
    syllables: [{ thai: 'กุ้ง', roman: 'gung', tone: 'falling' }],
    pos: 'noun', emoji: '🦐', tags: ['food'],
    note: 'The classic pad thai topping: ผัดไทยกุ้ง. Falling tone — let it drop.',
  },
  {
    id: 'w.peanut', thai: 'ถั่ว', roman: 'tùa', en: 'peanuts', enAlt: ['beans', 'nuts'],
    syllables: [{ thai: 'ถั่ว', roman: 'tua', tone: 'low' }],
    pos: 'noun', emoji: '🥜', tags: ['food'],
    note: 'Covers peanuts, beans, and nuts in general. Crushed on som tam and pad thai — allergy? Say ไม่ใส่ถั่ว.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.order-what-m', wordIds: ['w.will', 'w.order', 'w.what', 'w.polite-m'],
    en: 'What will you order? (male speaker)', enAlt: ['what would you like to order?', 'what are you ordering?'],
    literal: 'will | order | what | ♂-polite', tags: ['ordering'],
  },
  {
    id: 's.take-pad-thai-shrimp-f', wordIds: ['w.take', 'w.pad-thai', 'w.shrimp', 'w.polite-f'],
    en: "I'll take shrimp pad thai. (female speaker)", enAlt: ['shrimp pad thai, please'],
    literal: 'take | pad thai | shrimp | ♀-polite', patternId: 'p.take-topping', tags: ['ordering'],
  },
  {
    id: 's.take-noodles-pork-m', wordIds: ['w.take', 'w.noodles', 'w.pork', 'w.polite-m'],
    en: "I'll take pork noodles. (male speaker)", enAlt: ['pork noodles, please'],
    literal: 'take | noodles | pork | ♂-polite', patternId: 'p.take-topping', tags: ['ordering'],
  },
  {
    id: 's.grilled-chicken-sticky-rice-f', wordIds: ['w.take', 'w.chicken', 'w.grilled', 'w.and', 'w.sticky-rice', 'w.polite-f'],
    en: 'And grilled chicken with sticky rice, please. (female speaker)', enAlt: ["i'll take grilled chicken and sticky rice"],
    literal: 'take | chicken | grill(ed) | and | sticky rice | ♀-polite', tags: ['ordering'],
  },
  {
    id: 's.spicy-level-q-m', wordIds: ['w.spicy', 'w.q-mai', 'w.polite-m'],
    en: 'Spicy? (male speaker)', enAlt: ['do you want it spicy?', 'is it spicy?'],
    literal: 'spicy | ? | ♂-polite', tags: ['ordering'],
  },
  {
    id: 's.spicy-a-little-f', wordIds: ['w.spicy', 'w.a-little', 'w.polite-f'],
    en: 'A little spicy. (female speaker)', enAlt: ['just a little spicy'],
    literal: 'spicy | a little | ♀-polite', tags: ['ordering'],
  },
  {
    id: 's.make-not-spicy-q', wordIds: ['w.not', 'w.spicy', 'w.can', 'w.q-mai'],
    en: 'Can you make it not spicy?', enAlt: ['can it be not spicy?', 'not spicy, possible?'],
    literal: 'not | spicy | can | ?', patternId: 'p.not-adj', tags: ['ordering'],
  },
  {
    id: 's.coffee-not-sweet-m', wordIds: ['w.request', 'w.coffee', 'w.not', 'w.sweet', 'w.polite-m'],
    en: 'Coffee, not sweet, please. (male speaker)', enAlt: ['can i have an unsweetened coffee?'],
    literal: 'request | coffee | not | sweet | ♂-polite', patternId: 'p.not-adj', tags: ['ordering'],
  },
  {
    id: 's.som-tam-no-peanut-f', wordIds: ['w.request', 'w.som-tam', 'w.not', 'w.wear', 'w.peanut', 'w.polite-f'],
    en: 'Som tam without peanuts, please. (female speaker)', enAlt: ['som tam, no peanuts please'],
    literal: 'request | som tam | not | put in (ใส่) | peanuts | ♀-polite', tags: ['ordering'],
  },
  {
    id: 's.add-egg-q', wordIds: ['w.wear', 'w.egg', 'w.can', 'w.q-mai'],
    en: 'Can you add an egg?', enAlt: ['can i get an egg in it?', 'add an egg?'],
    literal: 'put in (ใส่) | egg | can | ?', tags: ['ordering'],
  },
  {
    id: 's.can-do-m', wordIds: ['w.can', 'w.polite-m'],
    en: 'Sure, can do. (male speaker)', enAlt: ['sure', 'can', 'yes'],
    literal: 'can | ♂-polite',
  },
  {
    id: 's.som-tam-sour', wordIds: ['w.som-tam', 'w.sour', 'w.very'],
    en: 'The som tam is really sour.', enAlt: ['the som tam is very sour'],
    literal: 'som tam | sour | very', patternId: 'p.dish-flavor',
  },
  {
    id: 's.this-salty-q', wordIds: ['w.this-one', 'w.salty', 'w.q-mai'],
    en: 'Is this one salty?', enAlt: ['is this salty?'],
    literal: 'this one | salty | ?',
  },
  {
    id: 's.noodles-bland', wordIds: ['w.noodles', 'w.bland', 'w.a-little'],
    en: 'The noodles are a bit bland.', enAlt: ['the noodle soup is a little bland'],
    literal: 'noodles | bland | a little', patternId: 'p.dish-flavor',
  },
  {
    id: 's.taste-delicious-f', wordIds: ['w.delicious', 'w.very', 'w.polite-f'],
    en: 'So delicious! (female speaker)', enAlt: ['delicious', "it's really tasty"],
    literal: 'delicious | very | ♀-polite',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.not-adj',
    name: 'ไม่ + ___ (not ___)',
    parts: [{ fixed: ['w.not'] }, { slot: 'adj' }],
    slots: [{ name: 'adj', accepts: { tags: ['adjective'] } }],
    enTemplate: 'not {adj}',
    explanation:
      'Thai adjectives behave like verbs, so ไม่ negates them directly — no "is" needed. ' +
      'ไม่เผ็ด = not spicy, ไม่หวาน = not sweet, ไม่แพง = not expensive. ' +
      'Every adjective you ever learn instantly has a ready-made opposite.',
    literal: 'ไม่ + [adjective]',
    exampleIds: ['s.make-not-spicy-q', 's.coffee-not-sweet-m'],
  },
  {
    id: 'p.dish-flavor',
    name: 'dish + flavor (no "is" needed)',
    parts: [{ slot: 'dish' }, { slot: 'flavor' }, { slot: 'degree' }],
    slots: [
      { name: 'dish', accepts: { tags: ['food'] } },
      { name: 'flavor', accepts: { tags: ['flavor'] } },
      { name: 'degree', accepts: { wordIds: ['w.very', 'w.a-little'] }, optional: true },
    ],
    enTemplate: 'The {dish} is {degree} {flavor}.',
    explanation:
      'To describe food, just put the flavor word straight after the dish: ส้มตำเปรี้ยว = "the som tam (is) sour". ' +
      'Thai has no "is" for adjectives — the adjective IS the verb. ' +
      'Add มาก or นิดหน่อย after it to say how much.',
    literal: '[dish] + [flavor] (+ [degree])',
    exampleIds: ['s.som-tam-sour', 's.noodles-bland'],
  },
  {
    id: 'p.take-topping',
    name: 'เอา + dish + topping',
    parts: [{ fixed: ['w.take'] }, { slot: 'dish' }, { slot: 'topping' }],
    slots: [
      { name: 'dish', accepts: { tags: ['food'] } },
      { name: 'topping', accepts: { wordIds: ['w.chicken', 'w.pork', 'w.shrimp', 'w.egg'] }, optional: true },
    ],
    enTemplate: "I'll take {topping} {dish}.",
    explanation:
      'The street-stall ordering formula: เอา ("I\'ll take") + dish, with the meat stacked right after the dish name. ' +
      'ผัดไทยกุ้ง = shrimp pad thai, ก๋วยเตี๋ยวหมู = pork noodles. ' +
      'Thai builds these the opposite way from English: the main dish comes first, the topping second.',
    literal: 'เอา + [dish] (+ [topping])',
    exampleIds: ['s.take-pad-thai-shrimp-f', 's.take-noodles-pork-m'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u14',
    order: 14,
    title: 'Street Food & Flavors',
    subtitle: 'Spicy? A little!',
    emoji: '🌶️',
    color: '#ff5a78',
    outcome: 'Order som tam and pad thai exactly how you like them — spice level included.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Adjectives don\'t need "is"',
        body:
          'ส้มตำเปรี้ยว is a complete sentence: "the som tam (is) sour." Thai adjectives work like verbs, ' +
          'so there is no "is" to conjugate — and that is exactly why ไม่ negates them directly: ' +
          'ไม่เผ็ด = not spicy, ไม่หวาน = not sweet. Dish + flavor word. Done.',
      },
      {
        title: 'Say your spice level — or else',
        body:
          'At a street stall, "normal" means SPICY. Vendors ask เผ็ดไหม (spicy?), and you answer with a level: ' +
          'ไม่เผ็ด (not spicy) → เผ็ดนิดหน่อย (a little) → เผ็ดมาก (bring it on). ' +
          'Som tam is the danger zone: it is pounded to order, so your answer really is the recipe.',
      },
      {
        title: 'Build your plate: toppings & ใส่',
        body:
          'Thai stacks the topping AFTER the dish: ผัดไทยกุ้ง = "pad thai, shrimp". ' +
          'To customize, use ใส่ (put in — yes, the same word as "wear" from the clothes unit): ' +
          'ใส่ไข่ = add an egg, ไม่ใส่ถั่ว = no peanuts. The essential allergy phrase.',
      },
    ],
    dialogues: [
      {
        id: 'd.u14-somtam',
        title: 'Som tam, made to order',
        scene: 'Mali (♀) orders the classic som tam set from Lung Dam (♂) at his papaya-salad cart.',
        lines: [
          { speaker: 'Lung Dam', sentenceId: 's.order-what-m' },
          { speaker: 'Mali', sentenceId: 's.som-tam-no-peanut-f' },
          { speaker: 'Mali', sentenceId: 's.grilled-chicken-sticky-rice-f' },
          { speaker: 'Lung Dam', sentenceId: 's.spicy-level-q-m' },
          { speaker: 'Mali', sentenceId: 's.spicy-a-little-f' },
          { speaker: 'Lung Dam', sentenceId: 's.can-do-m' },
          { speaker: 'Mali', sentenceId: 's.taste-delicious-f' },
        ],
      },
      {
        id: 'd.u14-noodle-stall',
        title: 'Lunch at the noodle stall',
        scene: 'Nok (♀) and Ken (♂) grab lunch at a food-court noodle stall.',
        lines: [
          { speaker: 'Nok', sentenceId: 's.take-pad-thai-shrimp-f' },
          { speaker: 'Ken', sentenceId: 's.take-noodles-pork-m' },
          { speaker: 'Ken', sentenceId: 's.add-egg-q' },
          { speaker: 'Vendor', sentenceId: 's.can-do-m' },
          { speaker: 'Ken', sentenceId: 's.noodles-bland' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
