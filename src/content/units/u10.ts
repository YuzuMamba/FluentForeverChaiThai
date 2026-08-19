/**
 * Unit 10 — Family & Friends. The heart of Thai small talk:
 * who's in your family, how many siblings, whether you're single —
 * plus มี, the one word that covers have/has/there-is forever.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.mother', thai: 'แม่', roman: 'mɛ̂ɛ', en: 'mom', enAlt: ['mother', 'mum'],
    syllables: [{ thai: 'แม่', roman: 'mɛɛ', tone: 'falling' }],
    pos: 'noun', emoji: '👩‍👧', tags: ['core', 'family', 'person'],
    note: 'Also the respectful word for any motherly market lady: แม่ค้า = "vendor mom". Thais use แม่ for their own mother at every age — no switching to something formal.',
  },
  {
    id: 'w.father', thai: 'พ่อ', roman: 'pɔ̂ɔ', en: 'dad', enAlt: ['father'],
    syllables: [{ thai: 'พ่อ', roman: 'pɔɔ', tone: 'falling' }],
    pos: 'noun', emoji: '👨‍👦', tags: ['core', 'family', 'person'],
    note: 'พ่อแม่ (dad-mom, no "and" needed) = parents. Same falling tone as แม่ — they come as a matched pair.',
  },
  {
    id: 'w.older-sib', thai: 'พี่', roman: 'pîi', en: 'older sibling', enAlt: ['older brother', 'older sister', 'big sib'],
    syllables: [{ thai: 'พี่', roman: 'pii', tone: 'falling' }],
    pos: 'noun', emoji: '🥇', tags: ['core', 'family', 'person'],
    note: 'The word you\'ll say most in Thailand: any sibling born before you — AND any waiter, driver, or stranger slightly older than you. Calling someone พี่ is instant warmth.',
  },
  {
    id: 'w.younger-sib', thai: 'น้อง', roman: 'nɔ́ɔng', en: 'younger sibling', enAlt: ['younger brother', 'younger sister', 'little sib'],
    syllables: [{ thai: 'น้อง', roman: 'nɔɔng', tone: 'high' }],
    pos: 'noun', emoji: '🥈', tags: ['core', 'family', 'person'],
    note: 'Anyone born after you — and the standard way to call service staff: น้อง! gets your server\'s attention politely.',
  },
  {
    id: 'w.child', thai: 'ลูก', roman: 'lûuk', en: 'child', enAlt: ['kid', 'son', 'daughter', 'children'],
    syllables: [{ thai: 'ลูก', roman: 'luuk', tone: 'falling' }],
    pos: 'noun', emoji: '👶', tags: ['core', 'family', 'person'],
    note: 'YOUR child specifically (at any age — a 50-year-old is still someone\'s ลูก). มีลูกไหม "got kids?" is standard small talk with strangers.',
  },
  {
    id: 'w.partner', thai: 'แฟน', roman: 'fɛɛn', en: 'partner', enAlt: ['boyfriend', 'girlfriend', 'bf', 'gf', 'spouse'],
    syllables: [{ thai: 'แฟน', roman: 'fɛɛn', tone: 'mid' }],
    pos: 'noun', emoji: '💑', tags: ['core', 'family', 'person'],
    note: 'Borrowed from English "fan"! One word covers boyfriend, girlfriend, husband, and wife. มีแฟนไหม is the question every taxi driver will ask you.',
  },
  {
    id: 'w.have', thai: 'มี', roman: 'mii', en: 'have', enAlt: ['has', 'there is', 'got'],
    syllables: [{ thai: 'มี', roman: 'mii', tone: 'mid' }],
    pos: 'verb', emoji: '🤲', tags: ['core'],
    note: 'Have, has, AND "there is/are" — one unchanging syllable. In a shop, มีไหม = "do you have any?"; the sad answer is ไม่มี "none".',
  },
  {
    id: 'w.family', thai: 'ครอบครัว', roman: 'krɔ̂ɔp-krua', en: 'family',
    syllables: [
      { thai: 'ครอบ', roman: 'krɔɔp', tone: 'falling' },
      { thai: 'ครัว', roman: 'krua', tone: 'mid' },
    ],
    pos: 'noun', emoji: '👨‍👩‍👧‍👦', tags: ['core', 'family'],
    note: 'Contains ครัว (kitchen) — a Thai family is literally the people who share a kitchen. It stretches far past the nuclear household: cousins, aunts, grandmas, all in.',
  },
  {
    id: 'w.sibling', thai: 'พี่น้อง', roman: 'pîi-nɔ́ɔng', en: 'siblings', enAlt: ['brothers and sisters'],
    syllables: [
      { thai: 'พี่', roman: 'pii', tone: 'falling' },
      { thai: 'น้อง', roman: 'nɔɔng', tone: 'high' },
    ],
    pos: 'noun', emoji: '👫', tags: ['core', 'family', 'person'],
    note: 'Literally "older-younger" glued together. มีพี่น้องไหม "got siblings?" is a first-conversation classic — have your answer ready.',
  },
  {
    id: 'w.how-many', thai: 'กี่', roman: 'gìi', en: 'how many?', enAlt: ['how many'],
    syllables: [{ thai: 'กี่', roman: 'gii', tone: 'low' }],
    pos: 'question', emoji: '🔢', tags: ['core', 'question'],
    note: 'Never stands alone — it always grabs a counter word: กี่คน how many people, กี่บาท how many baht. You already know it from กี่โมง "what time?".',
  },
  {
    id: 'w.grandma', thai: 'ยาย', roman: 'yaai', en: 'grandma', enAlt: ['grandmother', 'granny'],
    syllables: [{ thai: 'ยาย', roman: 'yaai', tone: 'mid' }],
    pos: 'noun', emoji: '👵', tags: ['core', 'family', 'person'],
    note: 'Your mother\'s mother, specifically (dad\'s mom is ย่า — Thai names every grandparent differently). Also a friendly word for elderly women in general.',
  },
  {
    id: 'w.love', thai: 'รัก', roman: 'rák', en: 'love',
    syllables: [{ thai: 'รัก', roman: 'rak', tone: 'high' }],
    pos: 'verb', emoji: '❤️', tags: ['core'],
    note: 'The classic line is ผมรักคุณ / ฉันรักคุณ — but Thais actually say รัก most to family and in the cute short form รักนะ "love ya".',
  },
  {
    id: 'w.cute', thai: 'น่ารัก', roman: 'nâa-rák', en: 'cute', enAlt: ['adorable', 'lovable'],
    syllables: [
      { thai: 'น่า', roman: 'naa', tone: 'falling' },
      { thai: 'รัก', roman: 'rak', tone: 'high' },
    ],
    pos: 'adj', emoji: '🥰', tags: ['core', 'standalone', 'adjective'],
    note: 'Literally "worthy of love" — น่า + verb makes "-able" words. Use it for babies, pets, outfits, and kind gestures; it\'s the all-purpose compliment.',
  },
  {
    id: 'w.dog', thai: 'หมา', roman: 'mǎa', en: 'dog',
    syllables: [{ thai: 'หมา', roman: 'maa', tone: 'rising' }],
    pos: 'noun', emoji: '🐶', tags: ['object'],
    note: 'The everyday word (สุนัข is the formal one nobody says to friends). Rising tone — flat mǎa with a scoop, or you might say หมา wrong and confuse it with หมู pork.',
  },
  {
    id: 'w.cat', thai: 'แมว', roman: 'mɛɛo', en: 'cat',
    syllables: [{ thai: 'แมว', roman: 'mɛɛo', tone: 'mid' }],
    pos: 'noun', emoji: '🐱', tags: ['object'],
    note: 'Sounds like a meow — Thai cats named it themselves. Siamese cats are แมวไทย, "Thai cats", and yes, pets absolutely count as family here.',
  },
  {
    id: 'w.single', thai: 'โสด', roman: 'sòot', en: 'single', enAlt: ['unattached'],
    syllables: [{ thai: 'โสด', roman: 'soot', tone: 'low' }],
    pos: 'adj', emoji: '🕺', tags: ['standalone', 'adjective'],
    note: 'Say เป็นโสด "I\'m single" and watch the matchmaking begin — aunties and taxi drivers consider your relationship status public information.',
  },
  {
    id: 'w.kind', thai: 'ใจดี', roman: 'jai-dii', en: 'kind', enAlt: ['kind-hearted', 'nice'],
    syllables: [
      { thai: 'ใจ', roman: 'jai', tone: 'mid' },
      { thai: 'ดี', roman: 'dii', tone: 'mid' },
    ],
    pos: 'adj', emoji: '😇', tags: ['core', 'standalone', 'adjective'],
    note: 'Heart + good = kind. The highest everyday compliment for a person — Thais praise a good heart before looks or brains.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.who-this', wordIds: ['w.this', 'w.who'],
    en: "Who's this?", enAlt: ['who is this?'],
    literal: 'this | who', tags: ['family', 'question'],
  },
  {
    id: 's.this-my-mother', wordIds: ['w.this', 'w.is', 'w.mother', 'w.of', 'w.i-f'],
    en: 'This is my mom.', enAlt: ['this is my mother'],
    literal: 'this | is | mom | of | I♀', patternId: 'p.this-is', tags: ['family'],
  },
  {
    id: 's.this-my-father-m', wordIds: ['w.this', 'w.is', 'w.father', 'w.of', 'w.i-m'],
    en: 'This is my dad. (male speaker)', enAlt: ['this is my father'],
    literal: 'this | is | dad | of | I♂', patternId: 'p.this-is', tags: ['family'],
  },
  {
    id: 's.have-siblings-q', wordIds: ['w.you', 'w.have', 'w.sibling', 'w.q-mai'],
    en: 'Do you have brothers or sisters?', enAlt: ['do you have siblings?'],
    literal: 'you | have | siblings | ?', tags: ['family', 'question'],
  },
  {
    id: 's.have-sibs-count',
    wordIds: ['w.have', 'w.older-sib', 'w.one', 'w.person', 'w.and', 'w.younger-sib', 'w.two', 'w.person'],
    en: 'I have one older sibling and two younger ones.',
    enAlt: ['i have one older and two younger siblings'],
    literal: 'have | older-sib | one | person | and | younger-sib | two | person', tags: ['family'],
  },
  {
    id: 's.how-many-siblings', wordIds: ['w.have', 'w.sibling', 'w.how-many', 'w.person'],
    en: 'How many siblings do you have?', enAlt: ['how many brothers and sisters do you have?'],
    literal: 'have | siblings | how-many | person', patternId: 'p.have-how-many', tags: ['family', 'question'],
  },
  {
    id: 's.how-many-children', wordIds: ['w.you', 'w.have', 'w.child', 'w.how-many', 'w.person'],
    en: 'How many kids do you have?', enAlt: ['how many children do you have?'],
    literal: 'you | have | child | how-many | person', patternId: 'p.have-how-many', tags: ['family', 'question'],
  },
  {
    id: 's.have-three-kids-m', wordIds: ['w.i-m', 'w.have', 'w.child', 'w.three', 'w.person', 'w.polite-m'],
    en: 'I have three kids. (male speaker)', enAlt: ['i have three children'],
    literal: 'I♂ | have | child | three | person | ♂-polite', patternId: 'p.have', tags: ['family'],
  },
  {
    id: 's.have-partner-q-m', wordIds: ['w.you', 'w.have', 'w.partner', 'w.q-mai', 'w.polite-m'],
    en: 'Do you have a boyfriend or girlfriend? (male speaker)',
    enAlt: ['do you have a partner?', 'are you seeing someone?'],
    literal: 'you | have | partner | ? | ♂-polite', tags: ['small-talk', 'question'],
  },
  {
    id: 's.single-f', wordIds: ['w.not', 'w.have', 'w.partner', 'w.be', 'w.single', 'w.polite-f'],
    thaiOverride: 'ไม่มีแฟน เป็นโสดค่ะ',
    en: "No boyfriend — I'm single. (female speaker)", enAlt: ["i don't have a partner, i'm single"],
    literal: 'not | have | partner | be | single | ♀-polite', tags: ['small-talk'],
  },
  {
    id: 's.family-where', wordIds: ['w.family', 'w.of', 'w.you', 'w.stay', 'w.where'],
    en: 'Where does your family live?', enAlt: ['where is your family?'],
    literal: 'family | of | you | be-at | where', patternId: 'p.where-q', tags: ['family', 'question'],
  },
  {
    id: 's.mother-at-home', wordIds: ['w.mother', 'w.stay', 'w.at', 'w.home'],
    en: "Mom's at home.", enAlt: ['my mother is at home'],
    literal: 'mom | be-at | at | home', tags: ['family'],
  },
  {
    id: 's.love-mom', wordIds: ['w.i-f', 'w.love', 'w.mother', 'w.very'],
    en: 'I love my mom so much.', enAlt: ['i love my mother very much'],
    literal: 'I♀ | love | mom | very', tags: ['family'],
  },
  {
    id: 's.grandma-kind', wordIds: ['w.grandma', 'w.kind', 'w.very'],
    en: 'Grandma is so kind.', enAlt: ['my grandmother is very kind'],
    literal: 'grandma | kind | very', patternId: 'p.adj-maak', tags: ['family'],
  },
  {
    id: 's.child-cute', wordIds: ['w.child', 'w.of', 'w.you', 'w.cute', 'w.very'],
    en: 'Your kid is adorable.', enAlt: ['your child is very cute'],
    literal: 'child | of | you | cute | very', patternId: 'p.adj-maak', tags: ['family', 'small-talk'],
  },
  {
    id: 's.so-cute', wordIds: ['w.cute', 'w.very'],
    en: 'So cute!', enAlt: ['very cute', 'adorable'],
    literal: 'cute | very', patternId: 'p.adj-maak', tags: ['small-talk'],
  },
  {
    id: 's.have-cat-f', wordIds: ['w.i-f', 'w.have', 'w.cat'],
    en: 'I have a cat. (female speaker)', enAlt: ['i have cats'],
    literal: 'I♀ | have | cat', patternId: 'p.have', tags: ['family'],
  },
  {
    id: 's.he-has-dog', wordIds: ['w.he-she', 'w.have', 'w.dog'],
    en: 'He has a dog.', enAlt: ['she has a dog'],
    literal: 'he/she | have | dog', patternId: 'p.have', tags: ['family'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.have',
    name: 'มี___ (I have ___)',
    parts: [{ slot: 'subject' }, { fixed: ['w.have'] }, { slot: 'thing' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that'] }, optional: true },
      {
        name: 'thing',
        accepts: {
          tags: ['family', 'person', 'object'],
          exclude: ['w.i-m', 'w.i-f', 'w.you', 'w.he-she', 'w.we', 'w.person', 'w.farang'],
        },
      },
    ],
    enTemplate: '{subject} have {thing}',
    explanation:
      'มี is "have" and it never bends: ผมมี, เขามี, ยายมี — the same syllable forever. ' +
      'Say who, say มี, say the thing — and drop the who whenever it\'s obviously you, like Thais do. ' +
      'Stamp ไหม on the end for a question (มีแฟนไหม) or put ไม่ in front for "don\'t have" (ไม่มีเงิน). ' +
      'Every noun you learn from here on becomes something you can own, offer, or ask about with this one shape.',
    literal: '[who] + มี + [thing]',
    exampleIds: ['s.have-cat-f', 's.he-has-dog', 's.have-three-kids-m'],
  },
  {
    id: 'p.have-how-many',
    name: 'มี___กี่คน (how many ___?)',
    parts: [{ slot: 'subject' }, { fixed: ['w.have'] }, { slot: 'who' }, { fixed: ['w.how-many', 'w.person'] }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that'] }, optional: true },
      {
        name: 'who',
        accepts: {
          tags: ['family', 'person'],
          exclude: ['w.family', 'w.person', 'w.i-m', 'w.i-f', 'w.you', 'w.he-she', 'w.we', 'w.farang'],
        },
      },
    ],
    enTemplate: '{subject} have how many {who}?',
    explanation:
      'Thai counts people with a counter word: ลูกสามคน is literally "kids, three, person". ' +
      'To ask how many, swap the number for กี่ and leave everything else in place: มีลูกกี่คน. ' +
      'The answer comes back in the exact same shape, so listen for number + คน. ' +
      'This is Thailand\'s favorite small-talk question — taxi drivers ask it before you\'ve even buckled in.',
    literal: '[who] + มี + [people] + กี่ + คน',
    exampleIds: ['s.how-many-siblings', 's.how-many-children'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u10',
    order: 10,
    title: 'Family & Friends',
    subtitle: 'The people you love',
    emoji: '👨‍👩‍👧',
    color: '#ff5a78',
    outcome: 'Answer Thailand\'s favorite small-talk questions — family, siblings, kids, single or not — and ask them right back.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'มี never changes — have, has, there is',
        body:
          'มี covers "have", "has", and "there is" in one unchanging syllable. ผมมีลูก = I have kids; มีห้องน้ำไหม = is there a bathroom?; ' +
          'ไม่มี = don\'t have / there isn\'t / (as an answer) "nope, none". ' +
          'Learn one word, get an entire English verb table for free.',
      },
      {
        title: 'Counting people: ลูกสามคน',
        body:
          'Thai never says "three kids" — it says "kids three person": ลูกสามคน. The order is noun + number + classifier, ' +
          'and for people the classifier is always คน. To ask "how many?", put กี่ where the number would go: มีพี่น้องกี่คน. ' +
          'You already met this trick in กี่โมง — "how many o\'clock?".',
      },
      {
        title: 'พี่ and น้อง: age first, gender never',
        body:
          'Thai doesn\'t split siblings into brothers and sisters — it splits them by AGE: พี่ (older) and น้อง (younger). ' +
          'Then the words escape the family: call your server น้อง, your taxi driver พี่, anyone a bit older พี่. ' +
          'Get this habit right and all of Thailand becomes your extended family — which is exactly how Thais see it.',
      },
    ],
    dialogues: [
      {
        id: 'd.u10-photos',
        title: 'Photos on the phone',
        scene: 'Over iced coffee, Bua (♀) scrolls through her camera roll. Anan (♂) leans in.',
        lines: [
          { speaker: 'Anan', sentenceId: 's.who-this' },
          { speaker: 'Bua', sentenceId: 's.this-my-mother' },
          { speaker: 'Anan', sentenceId: 's.have-siblings-q' },
          { speaker: 'Bua', sentenceId: 's.have-sibs-count' },
          { speaker: 'Bua', sentenceId: 's.have-cat-f' },
          { speaker: 'Anan', sentenceId: 's.so-cute' },
        ],
      },
      {
        id: 'd.u10-taxi',
        title: 'The taxi interview',
        scene: 'Two minutes into the ride, the driver (♂) begins Thailand\'s standard passenger interview. At a red light he proudly shows Mali (♀) a photo of his kids.',
        lines: [
          { speaker: 'Driver', sentenceId: 's.have-partner-q-m' },
          { speaker: 'Mali', sentenceId: 's.single-f' },
          { speaker: 'Mali', sentenceId: 's.how-many-children' },
          { speaker: 'Driver', sentenceId: 's.have-three-kids-m' },
          { speaker: 'Mali', sentenceId: 's.child-cute' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
