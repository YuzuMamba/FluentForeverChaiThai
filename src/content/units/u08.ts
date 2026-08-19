/**
 * Unit 8 — Getting Around. ไปสนามบินครับ!
 * Bangkok survival on wheels: state your destination like a local, steer the
 * driver turn by turn, and know when the BTS beats a taxi stuck in traffic.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.car', thai: 'รถ', roman: 'rót', en: 'car', enAlt: ['vehicle'],
    syllables: [{ thai: 'รถ', roman: 'rot', tone: 'high' }],
    pos: 'noun', emoji: '🚗', tags: ['core', 'transport'],
    note: 'Any vehicle, not just cars — it prefixes them all: รถไฟ train, รถเมล์ bus. รถติด ("stuck cars") = traffic jam, Bangkok\'s favorite complaint.',
  },
  {
    id: 'w.taxi', thai: 'แท็กซี่', roman: 'tɛ́k-sîi', en: 'taxi', enAlt: ['cab'],
    syllables: [
      { thai: 'แท็ก', roman: 'tɛk', tone: 'high' },
      { thai: 'ซี่', roman: 'sii', tone: 'falling' },
    ],
    pos: 'noun', emoji: '🚕', tags: ['core', 'transport'],
    note: 'Straight from English. Flag one down, open the door, say ไป + destination + ครับ/ค่ะ. If the driver won\'t use the meter, close the door and take the next one.',
  },
  {
    id: 'w.train', thai: 'รถไฟฟ้า', roman: 'rót-fai-fáa', en: 'BTS / skytrain', enAlt: ['train', 'bts', 'skytrain', 'mrt'],
    syllables: [
      { thai: 'รถ', roman: 'rot', tone: 'high' },
      { thai: 'ไฟ', roman: 'fai', tone: 'mid' },
      { thai: 'ฟ้า', roman: 'faa', tone: 'high' },
    ],
    pos: 'noun', emoji: '🚈', tags: ['core', 'transport'],
    literal: 'vehicle + fire + sky/electric',
    note: 'Literally "electric vehicle" — the BTS Skytrain and MRT. รถไฟ alone is the old-school train; add ฟ้า and you\'re gliding above the traffic jam.',
  },
  {
    id: 'w.motorbike', thai: 'มอเตอร์ไซค์', roman: 'mɔɔ-dtəə-sai', en: 'motorbike', enAlt: ['motorcycle', 'motorbike taxi'],
    syllables: [
      { thai: 'มอ', roman: 'mɔɔ', tone: 'mid' },
      { thai: 'เตอร์', roman: 'dtəə', tone: 'mid' },
      { thai: 'ไซค์', roman: 'sai', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🏍️', tags: ['transport'],
    note: 'The orange-vest วินมอเตอร์ไซค์ (win) drivers weave through any jam for a few baht. In fast speech it shrinks to มอไซค์ (mɔɔ-sai).',
  },
  {
    id: 'w.turn', thai: 'เลี้ยว', roman: 'líao', en: 'turn',
    syllables: [{ thai: 'เลี้ยว', roman: 'liao', tone: 'high' }],
    pos: 'verb', emoji: '↪️', tags: ['core', 'action'],
    note: 'Taxi word number one. Bark เลี้ยวซ้าย / เลี้ยวขวา from the back seat and any driver in Thailand knows exactly what to do.',
  },
  {
    id: 'w.left', thai: 'ซ้าย', roman: 'sáai', en: 'left',
    syllables: [{ thai: 'ซ้าย', roman: 'saai', tone: 'high' }],
    pos: 'noun', emoji: '⬅️', tags: ['core', 'standalone'],
    note: 'Alone it\'s a complete instruction: ซ้ายครับ! = "left here!". มือซ้าย = left hand if you need to point without pointing.',
  },
  {
    id: 'w.right', thai: 'ขวา', roman: 'kwǎa', en: 'right',
    syllables: [{ thai: 'ขวา', roman: 'kwaa', tone: 'rising' }],
    pos: 'noun', emoji: '➡️', tags: ['core', 'standalone'],
    note: 'Rising tone — let it swoop up. Drill ซ้าย/ขวา as a pair until they\'re reflexes; you\'ll use them from the back of a motorbike.',
  },
  {
    id: 'w.straight', thai: 'ตรงไป', roman: 'dtrong-bpai', en: 'go straight', enAlt: ['straight ahead', 'straight'],
    syllables: [
      { thai: 'ตรง', roman: 'dtrong', tone: 'mid' },
      { thai: 'ไป', roman: 'bpai', tone: 'mid' },
    ],
    pos: 'verb', emoji: '⬆️', tags: ['core', 'action', 'standalone'],
    literal: 'straight + go',
    note: 'ตรง straight + ไป go. Also hear ตรงไปเรื่อยๆ = "keep going straight". Doubled ตรงๆ means "frankly" — Thais go straight in speech too.',
  },
  {
    id: 'w.stop', thai: 'จอด', roman: 'jɔ̀ɔt', en: 'stop / pull over', enAlt: ['park', 'stop'],
    syllables: [{ thai: 'จอด', roman: 'jɔɔt', tone: 'low' }],
    pos: 'verb', emoji: '🛑', tags: ['core', 'action'],
    note: 'For vehicles only — pulling over or parking. จอดที่นี่ ends every taxi ride. A person stopping walking is หยุด, a different word.',
  },
  {
    id: 'w.here', thai: 'ที่นี่', roman: 'tîi-nîi', en: 'here',
    syllables: [
      { thai: 'ที่', roman: 'tii', tone: 'falling' },
      { thai: 'นี่', roman: 'nii', tone: 'falling' },
    ],
    pos: 'noun', emoji: '📍', tags: ['core', 'place'],
    literal: 'place + this',
    note: 'ที่ place + นี่ this = "this place". In casual speech you\'ll also hear ตรงนี้ ("right at this spot") — both work when the driver asks where.',
  },
  {
    id: 'w.fast', thai: 'เร็ว', roman: 'reo', en: 'fast', enAlt: ['quick', 'quickly'],
    syllables: [{ thai: 'เร็ว', roman: 'reo', tone: 'mid' }],
    pos: 'adj', emoji: '💨', tags: ['core', 'adjective', 'standalone'],
    note: 'เร็วหน่อย = "a bit faster, please" — say it when the plane won\'t wait. เร็วๆ นี้ means "soon". Adjectives follow the noun: รถเร็ว = a fast car.',
  },
  {
    id: 'w.slow', thai: 'ช้า', roman: 'cháa', en: 'slow', enAlt: ['slowly'],
    syllables: [{ thai: 'ช้า', roman: 'chaa', tone: 'high' }],
    pos: 'adj', emoji: '🐢', tags: ['core', 'adjective', 'standalone'],
    note: 'Doubled ช้าๆ = "slowly, gently" — the phrase that saves you on a motorbike taxi. Also works on fast talkers: พูดช้าๆ = speak slowly.',
  },
  {
    id: 'w.far', thai: 'ไกล', roman: 'glai', en: 'far',
    syllables: [{ thai: 'ไกล', roman: 'glai', tone: 'mid' }],
    pos: 'adj', emoji: '⛰️', tags: ['core', 'adjective', 'standalone'],
    note: 'Mid tone, flat as a highway. Its evil twin ใกล้ (falling) means NEAR — one tone flips the meaning. ไกลไหม is the first thing to ask any driver.',
  },
  {
    id: 'w.near', thai: 'ใกล้', roman: 'glâi', en: 'near', enAlt: ['close'],
    syllables: [{ thai: 'ใกล้', roman: 'glai', tone: 'falling' }],
    pos: 'adj', emoji: '👣', tags: ['core', 'adjective'],
    note: 'Falling tone — drops like something landing close by. Thais often double it for clarity: ใกล้ๆ = "really close, walking distance".',
  },
  {
    id: 'w.get-off', thai: 'ลง', roman: 'long', en: 'get off', enAlt: ['get out', 'go down', 'descend'],
    syllables: [{ thai: 'ลง', roman: 'long', tone: 'mid' }],
    pos: 'verb', emoji: '⬇️', tags: ['core', 'action'],
    note: 'Literally "go down" — get off the bus, out of the car, down the stairs. ลงที่นี่ = "I\'m getting off here". Its opposite ขึ้น (kɯ̂n) means get on.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.taxi-go-where-m', wordIds: ['w.go', 'w.where', 'w.polite-m'],
    en: 'Where to? (male speaker)', enAlt: ['where are you going?'],
    literal: 'go | where | ♂-polite', tags: ['taxi'],
  },
  {
    id: 's.go-airport-m', wordIds: ['w.go', 'w.airport', 'w.polite-m'],
    en: 'To the airport, please. (male speaker)', enAlt: ['airport please', 'go to the airport'],
    literal: 'go | airport | ♂-polite', tags: ['taxi'],
  },
  {
    id: 's.go-market-f', wordIds: ['w.go', 'w.market', 'w.polite-f'],
    en: 'To the market, please. (female speaker)', enAlt: ['market please', 'go to the market'],
    literal: 'go | market | ♀-polite', tags: ['taxi'],
  },
  {
    id: 's.taxi-airport-how-much', wordIds: ['w.taxi', 'w.go', 'w.airport', 'w.how-much'],
    en: 'How much is a taxi to the airport?', enAlt: ['how much to the airport by taxi'],
    literal: 'taxi | go | airport | how-much', tags: ['taxi'],
  },
  {
    id: 's.turn-left', wordIds: ['w.turn', 'w.left'],
    en: 'Turn left.', enAlt: ['left turn', 'go left'],
    literal: 'turn | left', patternId: 'p.turn-dir', tags: ['directions'],
  },
  {
    id: 's.turn-right-m', wordIds: ['w.turn', 'w.right', 'w.polite-m'],
    en: 'Turn right. (male speaker)', enAlt: ['go right'],
    literal: 'turn | right | ♂-polite', patternId: 'p.turn-dir', tags: ['directions'],
  },
  {
    id: 's.go-straight', wordIds: ['w.straight'],
    en: 'Go straight.', enAlt: ['straight ahead', 'keep going straight'],
    literal: 'straight-go', tags: ['directions'],
  },
  {
    id: 's.stop-here-m', wordIds: ['w.stop', 'w.here', 'w.polite-m'],
    en: 'Stop here, please. (male speaker)', enAlt: ['pull over here'],
    literal: 'stop | here | ♂-polite', tags: ['taxi'],
  },
  {
    id: 's.get-off-here-f', wordIds: ['w.get-off', 'w.here', 'w.polite-f'],
    en: "I'm getting off here. (female speaker)", enAlt: ['getting off here', 'i get off here'],
    literal: 'get-off | here | ♀-polite', tags: ['taxi'],
  },
  {
    id: 's.slow-down-f', wordIds: ['w.slow', 'w.slow', 'w.a-bit', 'w.polite-f'],
    thaiOverride: 'ช้าๆ หน่อยค่ะ',
    en: 'Slow down a bit, please. (female speaker)', enAlt: ['slower please', 'please go slowly'],
    literal: 'slow | slow | a-bit | ♀-polite', tags: ['taxi'],
  },
  {
    id: 's.fast-a-bit-q-m', wordIds: ['w.fast', 'w.a-bit', 'w.can', 'w.q-mai', 'w.polite-m'],
    en: 'Can you go a bit faster? (male speaker)', enAlt: ['faster please, is that possible?', 'can we go faster'],
    literal: 'fast | a-bit | can | ? | ♂-polite', patternId: 'p.can-q', tags: ['taxi'],
  },
  {
    id: 's.taxi-ok-m', wordIds: ['w.can', 'w.polite-m'],
    en: 'Sure, can do. (male speaker)', enAlt: ['sure', 'ok', 'no problem'],
    literal: 'can | ♂-polite',
  },
  {
    id: 's.airport-far-q', wordIds: ['w.airport', 'w.far', 'w.q-mai'],
    en: 'Is the airport far?', enAlt: ['is it far to the airport'],
    literal: 'airport | far | ?', patternId: 'p.far-q', tags: ['taxi'],
  },
  {
    id: 's.hotel-far-q', wordIds: ['w.hotel', 'w.far', 'w.q-mai'],
    en: 'Is the hotel far?', enAlt: ['is it far to the hotel'],
    literal: 'hotel | far | ?', patternId: 'p.far-q',
  },
  {
    id: 's.not-far-m', wordIds: ['w.not', 'w.far', 'w.polite-m'],
    en: 'Not far. (male speaker)', enAlt: ["it's not far", 'close by'],
    literal: 'not | far | ♂-polite',
  },
  {
    id: 's.hotel-near-market', wordIds: ['w.hotel', 'w.stay', 'w.near', 'w.market'],
    en: 'The hotel is near the market.', enAlt: ['the hotel is close to the market'],
    literal: 'hotel | be-at | near | market',
  },
  {
    id: 's.train-fast-very', wordIds: ['w.train', 'w.fast', 'w.very'],
    en: 'The BTS is really fast.', enAlt: ['the skytrain is very fast'],
    literal: 'BTS | fast | very',
  },
  {
    id: 's.motorbike-fast-cheap', wordIds: ['w.motorbike', 'w.fast', 'w.and', 'w.cheap'],
    en: 'Motorbike taxis are fast and cheap.', enAlt: ['the motorbike is fast and cheap'],
    literal: 'motorbike | fast | and | cheap',
  },
  {
    id: 's.car-not-come', wordIds: ['w.car', 'w.not', 'w.come'],
    en: "The car isn't coming.", enAlt: ['the car never came', 'my ride is not coming'],
    literal: 'car | not | come',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.turn-dir',
    name: 'เลี้ยว + ซ้าย/ขวา (turn ___)',
    parts: [{ fixed: ['w.turn'] }, { slot: 'dir' }],
    slots: [{ name: 'dir', accepts: { wordIds: ['w.left', 'w.right'] } }],
    enTemplate: 'Turn {dir}!',
    explanation:
      'Verb first, direction second — that\'s a complete Thai instruction. ' +
      'No "please turn to the...", no subject, no politeness needed beyond a ครับ/ค่ะ if you like. ' +
      'From the back of a taxi or a motorbike, เลี้ยวซ้าย and เลี้ยวขวา are all the steering wheel you get — ' +
      'make them reflexes, not translations.',
    literal: 'เลี้ยว + [ซ้าย/ขวา]',
    exampleIds: ['s.turn-left', 's.turn-right-m'],
  },
  {
    id: 'p.far-q',
    name: '___ ไกลไหม (is ___ far?)',
    parts: [{ slot: 'place' }, { fixed: ['w.far'] }, { fixed: ['w.q-mai'] }],
    slots: [{ name: 'place', accepts: { tags: ['place'] } }],
    enTemplate: 'Is {place} far?',
    explanation:
      'Name the place, state the adjective, add ไหม — Thai needs no "is" at all. ' +
      'สนามบินไกลไหม is literally "airport far?", and that\'s a full, polite question. ' +
      'Every place word you ever learn drops straight in: the market, the hotel, a friend\'s house. ' +
      'Ask it BEFORE you get in — the answer decides between a motorbike and the BTS.',
    literal: '[place] + ไกล + ไหม',
    exampleIds: ['s.airport-far-q', 's.hotel-far-q'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u08',
    order: 8,
    title: 'Getting Around',
    subtitle: 'Taxis, trains & directions',
    emoji: '🛺',
    color: '#2ee6a8',
    outcome: 'Take taxis and the BTS, give directions, and never get lost in Bangkok.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Taxi Thai: drop everything obvious',
        body:
          'ไปสนามบินครับ is literally just "go airport" — no "I", no "want", no "to the". ' +
          'Thai drops every word that context already provides, and a taxi IS the context. ' +
          'Verb + destination + ครับ/ค่ะ is the entire transaction: ไปตลาดค่ะ, ไปโรงแรมครับ. ' +
          'Sounding "too short" in English is sounding exactly right in Thai.',
      },
      {
        title: 'ไกล vs ใกล้ — far and near, one tone apart',
        body:
          'ไกล (glai, flat mid tone) = FAR. ใกล้ (glâi, falling tone) = NEAR. ' +
          'Same consonants, same vowel — the tone is the entire difference, and getting it wrong sends the taxi the wrong way. ' +
          'Thais themselves hedge: they say ใกล้ๆ for "really close" and stretch ไกลลลล for "faaar". ' +
          'When in doubt, ask ไกลไหม and read the driver\'s face.',
      },
      {
        title: 'Big words are built from small ones',
        body:
          'ที่นี่ = ที่ (place) + นี่ (this) = "this place" = here. ' +
          'รถไฟฟ้า = รถ (vehicle) + ไฟ (fire) + ฟ้า (sky/electric) = the electric sky-train. ' +
          'สนามบิน = สนาม (field) + บิน (fly) = airport. ' +
          'Thai rarely invents a new word when it can stack old ones — so every word you learn starts unlocking others.',
      },
    ],
    dialogues: [
      {
        id: 'd.u08-taxi',
        title: 'Taxi to the airport',
        scene: 'Anan (♂) throws his bag into Lek\'s (♂) taxi. His flight is in two hours.',
        lines: [
          { speaker: 'Lek', sentenceId: 's.taxi-go-where-m' },
          { speaker: 'Anan', sentenceId: 's.go-airport-m' },
          { speaker: 'Anan', sentenceId: 's.airport-far-q' },
          { speaker: 'Lek', sentenceId: 's.not-far-m' },
          { speaker: 'Anan', sentenceId: 's.fast-a-bit-q-m' },
          { speaker: 'Lek', sentenceId: 's.taxi-ok-m' },
          { speaker: 'Anan', sentenceId: 's.stop-here-m' },
        ],
      },
      {
        id: 'd.u08-motorbike',
        title: 'Motorbike to the market',
        scene: 'Bua\'s (♀) ride-app car never shows, so she flags down Chai (♂) at the motorbike-taxi stand.',
        lines: [
          { speaker: 'Bua', sentenceId: 's.car-not-come' },
          { speaker: 'Bua', sentenceId: 's.go-market-f' },
          { speaker: 'Chai', sentenceId: 's.taxi-ok-m' },
          { speaker: 'Bua', sentenceId: 's.slow-down-f' },
          { speaker: 'Bua', sentenceId: 's.turn-left' },
          { speaker: 'Bua', sentenceId: 's.go-straight' },
          { speaker: 'Bua', sentenceId: 's.get-off-here-f' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
