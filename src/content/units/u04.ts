/**
 * Unit 4 — Eat & Drink. อยากกินอะไร?
 * The flagship generative unit: อยาก + verb + object is the single most
 * productive frame in spoken Thai. Every future verb and food multiplies it.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.eat', thai: 'กิน', roman: 'gin', en: 'eat', enAlt: ['to eat'],
    syllables: [{ thai: 'กิน', roman: 'gin', tone: 'mid' }],
    pos: 'verb', emoji: '🍽️', tags: ['core', 'action'],
    note: 'The everyday word between friends and at street stalls. The formal menus-and-TV word is รับประทาน — nobody says that over noodles.',
  },
  {
    id: 'w.drink', thai: 'ดื่ม', roman: 'dɯ̀ɯm', en: 'drink', enAlt: ['to drink'],
    syllables: [{ thai: 'ดื่ม', roman: 'dɯɯm', tone: 'low' }],
    pos: 'verb', emoji: '🥤', tags: ['core', 'action'],
    note: 'In fast casual speech Thais often just say กิน for drinks too (กินน้ำ). ดื่ม is the crisper, slightly tidier choice.',
  },
  {
    id: 'w.rice', thai: 'ข้าว', roman: 'kâao', en: 'rice', enAlt: ['food', 'meal'],
    syllables: [{ thai: 'ข้าว', roman: 'kaao', tone: 'falling' }],
    pos: 'noun', emoji: '🍚', tags: ['core', 'food'],
    note: 'Also means food or a meal in general — กินข้าว = "have a meal", even if the meal is noodles. Rice IS food in Thai.',
  },
  {
    id: 'w.water', thai: 'น้ำ', roman: 'náam', en: 'water', enAlt: ['nam'],
    syllables: [{ thai: 'น้ำ', roman: 'naam', tone: 'high' }],
    pos: 'noun', emoji: '💧', tags: ['core', 'drink'],
    note: 'The generic word for any liquid — it starts dozens of compounds (ice, juice, fish sauce). Ask for น้ำเปล่า to get plain water.',
  },
  {
    id: 'w.want', thai: 'อยาก', roman: 'yàak', en: 'want to', enAlt: ['want', 'would like to'],
    syllables: [{ thai: 'อยาก', roman: 'yaak', tone: 'low' }],
    pos: 'verb', emoji: '🤩', tags: ['core'],
    note: 'Glues straight onto a verb: อยากกิน = want to eat. For wanting a THING (no verb), Thais say เอา or อยากได้ instead — never อยาก + noun.',
  },
  {
    id: 'w.delicious', thai: 'อร่อย', roman: 'à-rɔ̀i', en: 'delicious', enAlt: ['tasty', 'yummy', 'good'],
    syllables: [
      { thai: 'อะ', roman: 'a', tone: 'low' },
      { thai: 'หร่อย', roman: 'rɔi', tone: 'low' },
    ],
    pos: 'adj', emoji: '😋', tags: ['core', 'standalone', 'adjective', 'flavor'],
    note: 'The word every street vendor hopes to hear. Say อร่อยมาก with a smile and you have made a friend for life.',
  },
  {
    id: 'w.hungry', thai: 'หิว', roman: 'hǐu', en: 'hungry', enAlt: ['starving'],
    syllables: [{ thai: 'หิว', roman: 'hiu', tone: 'rising' }],
    pos: 'adj', emoji: '🤤', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'A complete sentence on its own: หิว! = "I\'m hungry!" It also builds compounds — หิวน้ำ = thirsty.',
  },
  {
    id: 'w.coffee', thai: 'กาแฟ', roman: 'gaa-fɛɛ', en: 'coffee',
    syllables: [
      { thai: 'กา', roman: 'gaa', tone: 'mid' },
      { thai: 'แฟ', roman: 'fɛɛ', tone: 'mid' },
    ],
    pos: 'noun', emoji: '☕', tags: ['core', 'drink'],
    note: 'Street coffee comes iced and very sweet by default — condensed milk and all. A borrowed word, so it sounds like "café" flipped.',
  },
  {
    id: 'w.very', thai: 'มาก', roman: 'mâak', en: 'very', enAlt: ['a lot', 'so much', 'really'],
    syllables: [{ thai: 'มาก', roman: 'maak', tone: 'falling' }],
    pos: 'adv', emoji: '‼️', tags: ['core'],
    note: 'Comes AFTER the word it boosts: อร่อยมาก = "delicious very". Works on adjectives and verbs alike — ขอบคุณมาก = thanks a lot.',
  },
  {
    id: 'w.thirsty', thai: 'หิวน้ำ', roman: 'hǐu-náam', en: 'thirsty',
    syllables: [
      { thai: 'หิว', roman: 'hiu', tone: 'rising' },
      { thai: 'น้ำ', roman: 'naam', tone: 'high' },
    ],
    pos: 'adj', emoji: '🥵', tags: ['standalone', 'feeling', 'adjective'],
    note: 'Literally "hungry (for) water" — Thai builds new feelings by stacking words you already know. Two old words, one new meaning.',
  },
  {
    id: 'w.tea', thai: 'ชา', roman: 'chaa', en: 'tea',
    syllables: [{ thai: 'ชา', roman: 'chaa', tone: 'mid' }],
    pos: 'noun', emoji: '🍵', tags: ['drink'],
    note: 'ชาเย็น — the bright-orange sweet iced tea — is a Thai street icon. Same word family as "chai" in half the world\'s languages.',
  },
  {
    id: 'w.egg', thai: 'ไข่', roman: 'kài', en: 'egg',
    syllables: [{ thai: 'ไข่', roman: 'kai', tone: 'low' }],
    pos: 'noun', emoji: '🥚', tags: ['food'],
    note: 'ไข่ดาว ("star egg", a fried egg) upgrades any plate of rice for a few baht. Careful: ไข่ kài egg vs ไก่ gài chicken.',
  },
  {
    id: 'w.chicken', thai: 'ไก่', roman: 'gài', en: 'chicken',
    syllables: [{ thai: 'ไก่', roman: 'gai', tone: 'low' }],
    pos: 'noun', emoji: '🐔', tags: ['food'],
    note: 'gài (chicken) vs kài (egg) differ only in a puff of air on the first sound — the classic beginner tongue trap Thais love to test.',
  },
  {
    id: 'w.fried-rice', thai: 'ข้าวผัด', roman: 'kâao-pàt', en: 'fried rice',
    syllables: [
      { thai: 'ข้าว', roman: 'kaao', tone: 'falling' },
      { thai: 'ผัด', roman: 'pat', tone: 'low' },
    ],
    pos: 'noun', emoji: '🍛', tags: ['food'],
    note: 'The universal safe order at any Thai restaurant. The meat goes AFTER: ข้าวผัดไก่ = chicken fried rice.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.want-eat-rice', wordIds: ['w.want', 'w.eat', 'w.rice'],
    en: 'I want to eat.', enAlt: ['i want to eat rice', 'i want food'],
    literal: 'want | eat | rice', patternId: 'p.want-to', tags: ['food'],
  },
  {
    id: 's.want-drink-water', wordIds: ['w.want', 'w.drink', 'w.water'],
    en: 'I want to drink water.', enAlt: ['i want some water'],
    literal: 'want | drink | water', patternId: 'p.want-to', tags: ['drink'],
  },
  {
    id: 's.want-coffee-f', wordIds: ['w.i-f', 'w.want', 'w.drink', 'w.coffee', 'w.polite-f'],
    en: 'I want to drink coffee. (female speaker)', enAlt: ['i want coffee'],
    literal: 'I♀ | want | drink | coffee | ♀-polite', patternId: 'p.want-to', tags: ['drink'],
  },
  {
    id: 's.want-fried-rice-m', wordIds: ['w.i-m', 'w.want', 'w.eat', 'w.fried-rice', 'w.polite-m'],
    en: 'I want to eat fried rice. (male speaker)', enAlt: ['i want fried rice'],
    literal: 'I♂ | want | eat | fried-rice | ♂-polite', patternId: 'p.want-to', tags: ['food'],
  },
  {
    id: 's.want-drink-tea', wordIds: ['w.want', 'w.drink', 'w.tea'],
    en: 'I want to drink tea.', enAlt: ['i want tea'],
    literal: 'want | drink | tea', patternId: 'p.want-to', tags: ['drink'],
  },
  {
    id: 's.want-eat-what', wordIds: ['w.want', 'w.eat', 'w.what'],
    en: 'What do you want to eat?', enAlt: ['what do you want to eat?'],
    literal: 'want | eat | what', tags: ['food', 'question'],
  },
  {
    id: 's.eat-rice-q', wordIds: ['w.eat', 'w.rice', 'w.q-mai'],
    en: 'Want to grab some food?', enAlt: ['do you want to eat?', 'shall we eat?'],
    literal: 'eat | rice | ?', tags: ['food', 'question'],
  },
  {
    id: 's.want-egg-q', wordIds: ['w.want', 'w.eat', 'w.egg', 'w.q-mai'],
    en: 'Do you want eggs?', enAlt: ['do you want to eat egg?'],
    literal: 'want | eat | egg | ?', tags: ['food', 'question'],
  },
  {
    id: 's.hungry-very', wordIds: ['w.hungry', 'w.very'],
    en: "I'm starving.", enAlt: ["i'm so hungry", 'very hungry'],
    literal: 'hungry | very', patternId: 'p.adj-maak', tags: ['feeling'],
  },
  {
    id: 's.hungry-q', wordIds: ['w.hungry', 'w.q-mai'],
    en: 'Are you hungry?', enAlt: ['hungry?'],
    literal: 'hungry | ?', patternId: 'p.adj-mai', tags: ['feeling', 'question'],
  },
  {
    id: 's.thirsty-q', wordIds: ['w.thirsty', 'w.q-mai'],
    en: 'Are you thirsty?', enAlt: ['thirsty?'],
    literal: 'thirsty | ?', patternId: 'p.adj-mai', tags: ['feeling', 'question'],
  },
  {
    id: 's.not-hungry', wordIds: ['w.not', 'w.hungry'],
    en: "I'm not hungry.", enAlt: ['not hungry'],
    literal: 'not | hungry', tags: ['feeling'],
  },
  {
    id: 's.delicious-q', wordIds: ['w.delicious', 'w.q-mai'],
    en: 'Is it good?', enAlt: ['is it delicious?', 'tasty?'],
    literal: 'delicious | ?', patternId: 'p.adj-mai', tags: ['food', 'question'],
  },
  {
    id: 's.delicious-very', wordIds: ['w.delicious', 'w.very'],
    en: "It's delicious!", enAlt: ['very tasty', 'so good'],
    literal: 'delicious | very', patternId: 'p.adj-maak', tags: ['food'],
  },
  {
    id: 's.chicken-delicious', wordIds: ['w.chicken', 'w.delicious', 'w.very'],
    en: 'The chicken is really good.', enAlt: ['the chicken is delicious'],
    literal: 'chicken | delicious | very', patternId: 'p.adj-maak', tags: ['food'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.want-to',
    name: 'อยาก___ (want to ___)',
    parts: [{ slot: 'subject' }, { fixed: ['w.want'] }, { slot: 'verb' }, { slot: 'object' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that'] }, optional: true },
      { name: 'verb', accepts: { tags: ['action'], exclude: ['w.want'] } },
      { name: 'object', accepts: { tags: ['food', 'drink', 'object'] }, optional: true },
    ],
    enTemplate: '{subject} want to {verb} {object}',
    explanation:
      'อยาก bolts straight onto a verb — no "to", no endings, no conjugation, ever. ' +
      'Say who (or skip it — Thais usually do), then อยาก, then the action, then the thing. ' +
      'Every new verb and every new food multiplies this frame: five verbs times ten foods is fifty sentences from one shape. ' +
      'This single pattern carries you through every restaurant in Thailand.',
    literal: '[who] + อยาก + [verb] + [thing]',
    exampleIds: ['s.want-eat-rice', 's.want-drink-water', 's.want-coffee-f', 's.want-fried-rice-m'],
  },
  {
    id: 'p.adj-mai',
    name: '___ไหม? (Is it ___?)',
    parts: [{ slot: 'adjective' }, { fixed: ['w.q-mai'] }],
    slots: [{ name: 'adjective', accepts: { pos: ['adj'] } }],
    enTemplate: 'Is it {adjective}?',
    explanation:
      'Point at anything — the food, the price, your friend — say the adjective, add ไหม. ' +
      'อร่อยไหม tasty? หิวไหม hungry? Later: แพงไหม expensive? เผ็ดไหม spicy? ' +
      'Every adjective you ever learn instantly becomes a question you can ask.',
    literal: '[adjective] + ไหม',
    exampleIds: ['s.delicious-q', 's.hungry-q', 's.thirsty-q'],
  },
  {
    id: 'p.adj-maak',
    name: '___มาก (very ___)',
    parts: [{ slot: 'adjective' }, { fixed: ['w.very'] }],
    slots: [{ name: 'adjective', accepts: { pos: ['adj'] } }],
    enTemplate: 'Very {adjective}!',
    explanation:
      'มาก sits AFTER the word it intensifies — the mirror image of English "very". ' +
      'อร่อย good → อร่อยมาก so good. หิว hungry → หิวมาก starving. ' +
      'One little word turns every adjective you know into a compliment, a complaint, or a bargaining move.',
    literal: '[adjective] + มาก',
    exampleIds: ['s.delicious-very', 's.hungry-very', 's.chicken-delicious'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u04',
    order: 4,
    title: 'Eat & Drink',
    subtitle: 'Your first survival verbs',
    emoji: '🍚',
    color: '#2ee6a8',
    outcome: 'Say what you want to eat and drink — the pattern that unlocks a thousand sentences.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'One verb form, forever',
        body:
          'Thai verbs never change. กิน is eat, eats, ate, eating and will eat — context and small helper words do the rest. ' +
          'That is why อยากกิน works: อยาก simply sits in front of any verb, and no word ever bends. ' +
          'You will never memorize a conjugation table in this language.',
      },
      {
        title: 'ข้าว is more than rice',
        body:
          'ข้าว literally means rice, but it stands for food itself. กินข้าว = have a meal (even a noodle one). ' +
          'กินข้าวไหม "eaten yet? / want to eat?" is how friends greet each other — food is small talk in Thailand. ' +
          'Answer หิวมาก and you have made lunch plans.',
      },
      {
        title: 'No "is", and everything comes after',
        body:
          'Adjectives ARE the verb: ไก่อร่อย = "chicken delicious" = the chicken is good. No "is" needed, ever. ' +
          'Then the modifiers trail behind: มาก after (อร่อยมาก = very tasty), while ไม่ goes in front to negate (ไม่หิว = not hungry). ' +
          'Adjective first, seasoning after — like the food.',
      },
    ],
    dialogues: [
      {
        id: 'd.u04-street-stall',
        title: 'Lunch at a street stall',
        scene: 'Noon in Bangkok. Bua (♀) drags Anan (♂) to her favorite fried-rice cart.',
        lines: [
          { speaker: 'Bua', sentenceId: 's.hungry-q' },
          { speaker: 'Anan', sentenceId: 's.hungry-very' },
          { speaker: 'Bua', sentenceId: 's.want-eat-what' },
          { speaker: 'Anan', sentenceId: 's.want-fried-rice-m' },
          { speaker: 'Bua', sentenceId: 's.delicious-q' },
          { speaker: 'Anan', sentenceId: 's.delicious-very' },
        ],
      },
      {
        id: 'd.u04-cafe',
        title: 'Escaping the heat',
        scene: 'Anan (♂) and Mali (♀) duck into an air-con café on a hot afternoon.',
        lines: [
          { speaker: 'Anan', sentenceId: 's.thirsty-q' },
          { speaker: 'Mali', sentenceId: 's.want-coffee-f' },
          { speaker: 'Anan', sentenceId: 's.want-drink-tea' },
          { speaker: 'Mali', sentenceId: 's.delicious-very' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
