/**
 * Unit 16 — Weather & Seasons. Thai weather talk needs no "it" and no "is":
 * ร้อน is a full sentence, rain is a thing that falls (ฝนตก), and the whole
 * country bonds over complaining about the heat. This unit is Thai small talk.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.hot', thai: 'ร้อน', roman: 'rɔ́ɔn', en: 'hot', enAlt: ['warm'],
    syllables: [{ thai: 'ร้อน', roman: 'rɔɔn', tone: 'high' }],
    pos: 'adj', emoji: '🥵', tags: ['core', 'standalone', 'adjective', 'feeling'],
    note: 'The most-said adjective in Thailand — ร้อนมาก works as small talk all year. Hot temperature only; spicy food is เผ็ด, never ร้อน.',
  },
  {
    id: 'w.cold', thai: 'หนาว', roman: 'nǎao', en: 'cold', enAlt: ['chilly', 'freezing'],
    syllables: [{ thai: 'หนาว', roman: 'naao', tone: 'rising' }],
    pos: 'adj', emoji: '🥶', tags: ['core', 'standalone', 'adjective', 'feeling'],
    note: 'Cold weather or feeling cold yourself. Cold THINGS (water, beer) are เย็น instead. Bangkok declares a หนาว emergency at anything under 20°C.',
  },
  {
    id: 'w.rain', thai: 'ฝน', roman: 'fǒn', en: 'rain', enAlt: ['the rain'],
    syllables: [{ thai: 'ฝน', roman: 'fon', tone: 'rising' }],
    pos: 'noun', emoji: '🌧️', tags: ['core'],
    note: 'Rain is a noun — a thing that falls. "It\'s raining" is ฝนตก, literally "rain falls". No "it" anywhere.',
  },
  {
    id: 'w.fall', thai: 'ตก', roman: 'dtòk', en: 'fall', enAlt: ['drop', 'falls'],
    syllables: [{ thai: 'ตก', roman: 'dtok', tone: 'low' }],
    pos: 'verb', emoji: '⬇️', tags: ['core', 'action'],
    note: 'A busy little verb: ฝนตก rain falls, พระอาทิตย์ตก the sun sets, ตกปลา go fishing (make the fish fall for it).',
  },
  {
    id: 'w.weather', thai: 'อากาศ', roman: 'aa-gàat', en: 'weather', enAlt: ['air', 'climate'],
    syllables: [
      { thai: 'อา', roman: 'aa', tone: 'mid' },
      { thai: 'กาศ', roman: 'gaat', tone: 'low' },
    ],
    pos: 'noun', emoji: '🌤️', tags: ['core'],
    note: 'Weather AND air in one word: อากาศดี is both "nice weather" and "fresh air" — which is why Thais say it on mountains.',
  },
  {
    id: 'w.sunshine', thai: 'แดด', roman: 'dɛ̀ɛt', en: 'sunshine', enAlt: ['sunlight', 'sun'],
    syllables: [{ thai: 'แดด', roman: 'dɛɛt', tone: 'low' }],
    pos: 'noun', emoji: '☀️', tags: ['core'],
    note: 'The sunlight that hits you, not the sun in the sky (that\'s พระอาทิตย์). แดดแรง "strong sun" is why Thais walk on the shady side and carry umbrellas in April.',
  },
  {
    id: 'w.wind', thai: 'ลม', roman: 'lom', en: 'wind', enAlt: ['breeze'],
    syllables: [{ thai: 'ลม', roman: 'lom', tone: 'mid' }],
    pos: 'noun', emoji: '💨', tags: ['core'],
    note: 'Wind or breeze. Hiding inside other words too: เป็นลม "become wind" = to faint — usually from too much แดด.',
  },
  {
    id: 'w.cool', thai: 'เย็น', roman: 'yen', en: 'cool', enAlt: ['cold (things)', 'chilled'],
    syllables: [{ thai: 'เย็น', roman: 'yen', tone: 'mid' }],
    pos: 'adj', emoji: '🧊', tags: ['core', 'adjective'],
    note: 'Cool/cold for things and weather: น้ำเย็น cold water, อากาศเย็น cool air. It\'s the เย็น in ตอนเย็น — evening, the cool part of the day. Feeling cold yourself is หนาว.',
  },
  {
    id: 'w.strong', thai: 'แรง', roman: 'rɛɛng', en: 'strong (force)', enAlt: ['strong', 'forceful', 'hard'],
    syllables: [{ thai: 'แรง', roman: 'rɛɛng', tone: 'mid' }],
    pos: 'adj', emoji: '💪', tags: ['core', 'adjective'],
    note: 'Strong in FORCE: แดดแรง blazing sun, ลมแรง strong wind. Muscle-strong and healthy is แข็งแรง — a different word built on this one.',
  },
  {
    id: 'w.season', thai: 'หน้า', roman: 'nâa', en: 'season', enAlt: ['face', 'front'],
    syllables: [{ thai: 'หน้า', roman: 'naa', tone: 'falling' }],
    pos: 'noun', emoji: '🗓️', tags: ['core', 'time'],
    note: 'Literally "face/front", but in everyday speech it means season: หน้าร้อน hot season, หน้าฝน rainy season, หน้าหนาว cool season. The formal word ฤดู lives in textbooks.',
  },
  {
    id: 'w.aircon', thai: 'แอร์', roman: 'ɛɛ', en: 'AC', enAlt: ['aircon', 'air conditioning', 'air con'],
    syllables: [{ thai: 'แอร์', roman: 'ɛɛ', tone: 'mid' }],
    pos: 'noun', emoji: '❄️', tags: ['core', 'object'],
    note: 'Borrowed from English "air (con)" and used constantly: ห้องแอร์ air-con room, รถแอร์ air-con bus. Thailand\'s two climates are outside and แอร์.',
  },
  {
    id: 'w.open', thai: 'เปิด', roman: 'bpə̀ət', en: 'open / turn on', enAlt: ['open', 'turn on', 'switch on'],
    syllables: [{ thai: 'เปิด', roman: 'bpəət', tone: 'low' }],
    pos: 'verb', emoji: '💡', tags: ['core', 'action'],
    note: 'One verb for open AND switch on: เปิดร้าน open the shop, เปิดแอร์ turn on the AC, เปิดเพลง put on music. The opposite is ปิด (bpìt).',
  },
  {
    id: 'w.umbrella', thai: 'ร่ม', roman: 'rôm', en: 'umbrella', enAlt: ['shade'],
    syllables: [{ thai: 'ร่ม', roman: 'rom', tone: 'falling' }],
    pos: 'noun', emoji: '☂️', tags: ['core', 'object'],
    note: 'Also means shade — ในร่ม is "in the shade". Used against rain AND sun; vendors materialize selling them the second the sky darkens.',
  },
  {
    id: 'w.wet', thai: 'เปียก', roman: 'bpìak', en: 'wet', enAlt: ['soaked', 'drenched'],
    syllables: [{ thai: 'เปียก', roman: 'bpiak', tone: 'low' }],
    pos: 'adj', emoji: '💦', tags: ['core', 'adjective'],
    note: 'Soaked through: เปียกฝน caught in the rain. During Songkran, everyone and everything is เปียก — happily.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.today-hot', wordIds: ['w.today', 'w.hot', 'w.very'],
    en: 'It\'s so hot today.', enAlt: ['today is very hot', 'it is really hot today'],
    literal: 'today | hot | very', patternId: 'p.today-weather', tags: ['weather'],
  },
  {
    id: 's.today-hot-m', wordIds: ['w.today', 'w.hot', 'w.very', 'w.polite-m'],
    en: 'It\'s so hot today. (male speaker)', enAlt: ['today is very hot'],
    literal: 'today | hot | very | ♂-polite', patternId: 'p.today-weather', tags: ['weather'],
  },
  {
    id: 's.rain-falling', wordIds: ['w.rain', 'w.fall'],
    en: 'It\'s raining.', enAlt: ['it rains', 'the rain is falling'],
    literal: 'rain | fall', tags: ['weather'],
  },
  {
    id: 's.rain-q', wordIds: ['w.rain', 'w.will', 'w.fall', 'w.q-mai'],
    en: 'Is it going to rain?', enAlt: ['will it rain?'],
    literal: 'rain | will | fall | ?', patternId: 'p.mai-question', tags: ['weather', 'question'],
  },
  {
    id: 's.weather-cool', wordIds: ['w.today', 'w.weather', 'w.cool'],
    en: 'The weather is nice and cool today.', enAlt: ['today the weather is cool', 'the air is cool today'],
    literal: 'today | weather | cool', patternId: 'p.noun-adj', tags: ['weather'],
  },
  {
    id: 's.cold-little', wordIds: ['w.cold', 'w.a-little'],
    en: 'I\'m a little cold.', enAlt: ['a bit cold', 'it is a little cold'],
    literal: 'cold | a-little', patternId: 'p.feel', tags: ['weather', 'feeling'],
  },
  {
    id: 's.agree-sun', wordIds: ['w.yes', 'w.sunshine', 'w.strong', 'w.very'],
    thaiOverride: 'ใช่ แดดแรงมาก',
    en: 'Yeah, the sun is brutal.', enAlt: ['right, the sun is really strong'],
    literal: 'yes | sunshine | strong | very', patternId: 'p.noun-adj', tags: ['weather'],
  },
  {
    id: 's.wind-strong', wordIds: ['w.wind', 'w.strong', 'w.very'],
    en: 'It\'s really windy.', enAlt: ['the wind is very strong'],
    literal: 'wind | strong | very', patternId: 'p.noun-adj', tags: ['weather'],
  },
  {
    id: 's.open-aircon', wordIds: ['w.open', 'w.aircon', 'w.a-bit', 'w.can', 'w.q-mai'],
    en: 'Could you turn on the AC?', enAlt: ['can you turn on the air conditioning?', 'turn on the ac please'],
    literal: 'turn-on | AC | a-bit | can | ?', patternId: 'p.please-request', tags: ['request'],
  },
  {
    id: 's.can-do-f', wordIds: ['w.can', 'w.polite-f'],
    en: 'Sure. (female speaker)', enAlt: ['can do', 'okay', 'yes I can'],
    literal: 'can | ♀-polite',
  },
  {
    id: 's.stop-here-please', wordIds: ['w.stop', 'w.here', 'w.a-bit', 'w.can', 'w.q-mai'],
    en: 'Could you stop here, please?', enAlt: ['can you pull over here?'],
    literal: 'stop | here | a-bit | can | ?', patternId: 'p.please-request', tags: ['request', 'transport'],
  },
  {
    id: 's.rainy-season', wordIds: ['w.season', 'w.rain', 'w.rain', 'w.fall', 'w.every', 'w.day'],
    thaiOverride: 'หน้าฝน ฝนตกทุกวัน',
    en: 'In the rainy season it rains every day.', enAlt: ['rainy season — it rains every day'],
    literal: 'season | rain | rain | fall | every | day', tags: ['weather'],
  },
  {
    id: 's.umbrella-q', wordIds: ['w.have', 'w.umbrella', 'w.q-mai'],
    en: 'Do you have an umbrella?', enAlt: ['got an umbrella?'],
    literal: 'have | umbrella | ?', patternId: 'p.have', tags: ['question'],
  },
  {
    id: 's.no-umbrella', wordIds: ['w.not', 'w.have', 'w.umbrella'],
    en: 'I don\'t have an umbrella.', enAlt: ['no umbrella'],
    literal: 'not | have | umbrella',
  },
  {
    id: 's.shirt-wet', wordIds: ['w.shirt', 'w.wet'],
    en: 'My shirt is soaked.', enAlt: ['the shirt is wet', 'my shirt is wet'],
    literal: 'shirt | wet', patternId: 'p.noun-adj',
  },
  {
    id: 's.cold-water', wordIds: ['w.want', 'w.drink', 'w.water', 'w.cool'],
    en: 'I want to drink some cold water.', enAlt: ['i want a cold drink of water'],
    literal: 'want | drink | water | cool', patternId: 'p.want-to', tags: ['drink'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.today-weather',
    name: 'วันนี้ + ___ (weather talk)',
    parts: [{ fixed: ['w.today'] }, { slot: 'quality' }, { slot: 'degree' }],
    slots: [
      { name: 'quality', accepts: { pos: ['adj'], exclude: ['w.fine', 'w.delicious'] } },
      { name: 'degree', accepts: { wordIds: ['w.very', 'w.a-little'] }, optional: true },
    ],
    enTemplate: 'Today it\'s {degree} {quality}',
    explanation:
      'English weather talk needs a fake "it": IT\'s hot. Thai just names the day and states the quality — ' +
      'วันนี้ร้อน "today hot", done. Add มาก to complain properly or นิดหน่อย to downplay. ' +
      'This one frame plus any adjective you ever learn is instant small talk.',
    literal: 'today + [adjective] + (very / a little)',
    exampleIds: ['s.today-hot', 's.today-hot-m', 's.weather-cool'],
  },
  {
    id: 'p.noun-adj',
    name: '[thing] + [adjective] — no "is"',
    parts: [{ slot: 'thing' }, { slot: 'quality' }, { slot: 'degree' }],
    slots: [
      { name: 'thing', accepts: { pos: ['noun'] } },
      { name: 'quality', accepts: { pos: ['adj'], exclude: ['w.fine'] } },
      { name: 'degree', accepts: { wordIds: ['w.very', 'w.a-little'] }, optional: true },
    ],
    enTemplate: 'The {thing} is {degree} {quality}',
    explanation:
      'Thai adjectives behave like verbs, so nothing links the thing to its quality: ' +
      'ลมแรง "wind strong" IS the whole sentence "the wind is strong". ' +
      'Glue any noun to any adjective you know — เสื้อเปียก, น้ำเย็น, อากาศดี — and it just works.',
    literal: '[thing] + [adjective] + (very / a little)',
    exampleIds: ['s.wind-strong', 's.shirt-wet', 's.weather-cool'],
  },
  {
    id: 'p.please-request',
    name: '___ + หน่อยได้ไหม (soft request)',
    parts: [{ slot: 'action' }, { slot: 'thing' }, { fixed: ['w.a-bit', 'w.can', 'w.q-mai'] }],
    slots: [
      { name: 'action', accepts: { tags: ['action'], exclude: ['w.want', 'w.like', 'w.have'] } },
      { name: 'thing', accepts: { tags: ['object', 'place', 'food', 'drink'] }, optional: true },
    ],
    enTemplate: 'Could you {action} {thing} for me?',
    explanation:
      'The politest everyday way to get anything done. หน่อย shrinks the request ("just a little"), ' +
      'ได้ไหม asks "possible?" — together they turn a bare command like เปิดแอร์ into a gentle ' +
      'เปิดแอร์หน่อยได้ไหม. Taxi drivers, waiters, and friends all hear this a hundred times a day.',
    literal: '[verb] + [thing] + a-bit + can + ?',
    exampleIds: ['s.open-aircon', 's.stop-here-please'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u16',
    order: 16,
    title: 'Weather & Seasons',
    subtitle: 'Hot, hotter, rainy',
    emoji: '🌦️',
    color: '#2ee6a8',
    outcome: 'Make real Thai small talk: complain about the heat, ask for the AC, and survive rainy season.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'No "it" in weather talk',
        body:
          'English props up weather sentences with a dummy "it": it\'s hot, it\'s raining. Thai names the actual thing. ' +
          'Hot? Just ร้อน. Raining? ฝนตก — "rain falls". ' +
          'Say what is happening and skip the scaffolding; there is no "it" to translate.',
      },
      {
        title: 'Adjectives don\'t need "to be"',
        body:
          'Thai adjectives are verbs in disguise: ลมแรง = "the wind is strong", เสื้อเปียก = "my shirt is wet". ' +
          'No word for "is" appears — the adjective does that job itself. ' +
          'This is why วันนี้ร้อนมาก is a complete, natural sentence with just three words.',
      },
      {
        title: 'Three seasons, one word: หน้า',
        body:
          'Thailand runs on three seasons, all built from words you know: หน้าร้อน hot season (March–May), ' +
          'หน้าฝน rainy season (June–October), หน้าหนาว cool season (November–February). ' +
          'หน้า literally means "face/front" — the formal word ฤดู (rɯ́-duu) exists, but street Thai says หน้า.',
      },
    ],
    dialogues: [
      {
        id: 'd.u16-taxi',
        title: 'Hot taxi ride',
        scene: 'Ken (♂) flags down a taxi in the Bangkok afternoon heat. Pi Nok (♀) is driving.',
        lines: [
          { speaker: 'Ken', sentenceId: 's.today-hot-m' },
          { speaker: 'Pi Nok', sentenceId: 's.agree-sun' },
          { speaker: 'Ken', sentenceId: 's.open-aircon' },
          { speaker: 'Pi Nok', sentenceId: 's.can-do-f' },
          { speaker: 'Ken', sentenceId: 's.stop-here-please' },
        ],
      },
      {
        id: 'd.u16-rain',
        title: 'Caught in the rain',
        scene: 'Mali and Nut duck under a market awning as the sky opens up.',
        lines: [
          { speaker: 'Mali', sentenceId: 's.rain-q' },
          { speaker: 'Nut', sentenceId: 's.rain-falling' },
          { speaker: 'Mali', sentenceId: 's.umbrella-q' },
          { speaker: 'Nut', sentenceId: 's.no-umbrella' },
          { speaker: 'Mali', sentenceId: 's.shirt-wet' },
          { speaker: 'Nut', sentenceId: 's.rainy-season' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
