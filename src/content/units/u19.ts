/**
 * Unit 19 — Opinions & Small Talk. คิดว่า…
 * The unit that turns transactions into conversations: giving opinions
 * with คิดว่า, agreeing and disagreeing, asking ทำไม and answering
 * เพราะ — plus the adjectives (สนุก, ยาก, น่าเบื่อ) opinions run on.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.think', thai: 'คิด', roman: 'kít', en: 'think', enAlt: ['think about'],
    syllables: [{ thai: 'คิด', roman: 'kit', tone: 'high' }],
    pos: 'verb', emoji: '🤔', tags: ['core', 'action'],
    note: 'Almost always paired with ว่า: คิดว่า… = "I think that…". The subject is usually dropped — context says who is thinking.',
  },
  {
    id: 'w.that-comp', thai: 'ว่า', roman: 'wâa', en: 'that (linker)', enAlt: ['that', 'saying that'],
    syllables: [{ thai: 'ว่า', roman: 'waa', tone: 'falling' }],
    pos: 'conj', emoji: '🔗', tags: ['core'],
    note: 'The hinge after verbs of thinking and saying: คิดว่า, บอกว่า. English drops "that"; Thai keeps ว่า every time.',
  },
  {
    id: 'w.probably', thai: 'น่าจะ', roman: 'nâa-jà', en: 'probably', enAlt: ['likely', 'should be'],
    syllables: [
      { thai: 'น่า', roman: 'naa', tone: 'falling' },
      { thai: 'จะ', roman: 'ja', tone: 'low' },
    ],
    pos: 'adv', emoji: '🎲', tags: ['core'],
    note: 'The same จะ as "will" (Unit 9) with น่า on front — "likely will". Sits right before a verb or adjective: น่าจะอร่อย.',
  },
  {
    id: 'w.really', thai: 'จริงๆ', roman: 'jing-jing', en: 'really', enAlt: ['truly', 'for real'],
    syllables: [
      { thai: 'จริง', roman: 'jing', tone: 'mid' },
      { thai: 'ๆ', roman: 'jing', tone: 'mid' },
    ],
    pos: 'adv', emoji: '‼️', tags: ['core', 'standalone'],
    note: 'ๆ is the repeat sign: จริงๆ = จริงจริง "truly". จริง alone means "true" — จริงเหรอ = "really?!"',
  },
  {
    id: 'w.why', thai: 'ทำไม', roman: 'tam-mai', en: 'why?', enAlt: ['why'],
    syllables: [
      { thai: 'ทำ', roman: 'tam', tone: 'mid' },
      { thai: 'ไม', roman: 'mai', tone: 'mid' },
    ],
    pos: 'question', emoji: '🤷', tags: ['core', 'question'],
    note: 'Unlike most Thai question words, ทำไม usually sits at the START: ทำไมไม่ไป = why aren\'t you going? Yet another mai — mid tone this time.',
  },
  {
    id: 'w.because', thai: 'เพราะ', roman: 'prɔ́', en: 'because', enAlt: ['since', 'cause'],
    syllables: [{ thai: 'เพราะ', roman: 'prɔ', tone: 'high' }],
    pos: 'conj', emoji: '🧩', tags: ['core'],
    note: 'The natural answer to ทำไม. Full form เพราะว่า — the same ว่า again. Bonus: เพราะ also means "melodious".',
  },
  {
    id: 'w.agree', thai: 'เห็นด้วย', roman: 'hěn-dûai', en: 'agree', enAlt: ['i agree'],
    syllables: [
      { thai: 'เห็น', roman: 'hen', tone: 'rising' },
      { thai: 'ด้วย', roman: 'duai', tone: 'falling' },
    ],
    pos: 'verb', emoji: '👍', tags: ['core', 'standalone'],
    note: 'Literally "see with (you)" — you see it the same way. Disagree: ไม่เห็นด้วย. Same ด้วย as in ด้วยกัน.',
  },
  {
    id: 'w.but', thai: 'แต่', roman: 'dtɛ̀ɛ', en: 'but', enAlt: ['however'],
    syllables: [{ thai: 'แต่', roman: 'dtɛɛ', tone: 'low' }],
    pos: 'conj', emoji: '↔️', tags: ['core'],
    note: 'Joins two clauses with no comma, no pause: อร่อยแต่แพง "delicious but expensive" — a full restaurant review in three words.',
  },
  {
    id: 'w.q-really', thai: 'เหรอ', roman: 'rə̌ə', en: 'really? (particle)', enAlt: ['oh really?', 'huh?'],
    syllables: [{ thai: 'เหรอ', roman: 'rəə', tone: 'rising' }],
    pos: 'question', emoji: '😮', tags: ['core', 'particle', 'question'],
    formality: 'casual',
    note: 'End particle of surprise and interest — in fast speech often lə̌ə. จริงเหรอ "really?!" is the glue of Thai small talk.',
  },
  {
    id: 'w.fun', thai: 'สนุก', roman: 'sà-nùk', en: 'fun', enAlt: ['enjoyable', 'have fun'],
    syllables: [
      { thai: 'สะ', roman: 'sa', tone: 'low' },
      { thai: 'หนุก', roman: 'nuk', tone: 'low' },
    ],
    pos: 'adj', emoji: '🎉', tags: ['core', 'adjective', 'feeling', 'standalone'],
    note: 'Both "fun" and "to have fun". สนุกไหม is the standard question after any trip, party, or movie.',
  },
  {
    id: 'w.boring', thai: 'น่าเบื่อ', roman: 'nâa-bɯ̀a', en: 'boring', enAlt: ['dull', 'tedious'],
    syllables: [
      { thai: 'น่า', roman: 'naa', tone: 'falling' },
      { thai: 'เบื่อ', roman: 'bɯa', tone: 'low' },
    ],
    pos: 'adj', emoji: '🥱', tags: ['adjective', 'standalone'],
    note: 'น่า turns a feeling into "-worthy": เบื่อ bored (Unit 11) → น่าเบื่อ boring. Same trick as น่ารัก "lovable" = cute.',
  },
  {
    id: 'w.hard', thai: 'ยาก', roman: 'yâak', en: 'difficult', enAlt: ['hard'],
    syllables: [{ thai: 'ยาก', roman: 'yaak', tone: 'falling' }],
    pos: 'adj', emoji: '🧗', tags: ['adjective', 'standalone'],
    note: 'One tone from อยาก: ยาก (falling) = hard, อยาก (low) = want to. Mix them up and "Thai is hard" becomes "Thai wants".',
  },
  {
    id: 'w.easy', thai: 'ง่าย', roman: 'ngâai', en: 'easy', enAlt: ['simple'],
    syllables: [{ thai: 'ง่าย', roman: 'ngaai', tone: 'falling' }],
    pos: 'adj', emoji: '🍰', tags: ['adjective', 'standalone'],
    note: 'Starts with the ng- sound English only allows at the ends of words (siNG). Practice: ง่ายๆ "easy-easy" = no big deal.',
  },
  {
    id: 'w.interesting', thai: 'น่าสนใจ', roman: 'nâa-sǒn-jai', en: 'interesting', enAlt: ['intriguing'],
    syllables: [
      { thai: 'น่า', roman: 'naa', tone: 'falling' },
      { thai: 'สน', roman: 'son', tone: 'rising' },
      { thai: 'ใจ', roman: 'jai', tone: 'mid' },
    ],
    pos: 'adj', emoji: '🧐', tags: ['adjective', 'standalone'],
    note: 'Same น่า trick again: สนใจ "be interested" → น่าสนใจ "interest-worthy". Alone it\'s a perfect nod in small talk: น่าสนใจ!',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.think-thai-fun', wordIds: ['w.i-f', 'w.think', 'w.that-comp', 'w.language', 'w.thai', 'w.fun'],
    en: 'I think Thai is fun. (female speaker)', enAlt: ['i think the thai language is fun'],
    literal: 'I♀ | think | that | language | Thai | fun', patternId: 'p.think-that', tags: ['opinion'],
  },
  {
    id: 's.think-somtam-delicious', wordIds: ['w.i-m', 'w.think', 'w.that-comp', 'w.som-tam', 'w.delicious', 'w.very'],
    en: 'I think som tam is really delicious. (male speaker)', enAlt: ['i think papaya salad is very tasty'],
    literal: 'I♂ | think | that | som-tam | delicious | very', patternId: 'p.think-that', tags: ['opinion'],
  },
  {
    id: 's.think-movie-fun-q', wordIds: ['w.think', 'w.that-comp', 'w.movie', 'w.fun', 'w.q-mai'],
    en: 'Do you think the movie was fun?', enAlt: ['did you think the movie was good?'],
    literal: 'think | that | movie | fun | ?', patternId: 'p.think-that', tags: ['opinion', 'question'],
  },
  {
    id: 's.thai-hard-q', wordIds: ['w.language', 'w.thai', 'w.hard', 'w.q-mai'],
    en: 'Is Thai hard?', enAlt: ['is the thai language difficult?'],
    literal: 'language | Thai | hard | ?', tags: ['small-talk', 'question'],
  },
  {
    id: 's.not-hard-fun', wordIds: ['w.not', 'w.hard', 'w.fun', 'w.very'],
    thaiOverride: 'ไม่ยาก สนุกมาก',
    en: "It's not hard — it's really fun!", enAlt: ['not hard, very fun'],
    literal: 'not | hard | fun | very', tags: ['opinion'],
  },
  {
    id: 's.thai-not-easy-but-fun', wordIds: ['w.language', 'w.thai', 'w.not', 'w.easy', 'w.but', 'w.fun'],
    en: "Thai isn't easy, but it's fun.", enAlt: ['thai is not easy but fun'],
    literal: 'language | Thai | not | easy | but | fun', tags: ['opinion'],
  },
  {
    id: 's.really-q', wordIds: ['w.really', 'w.q-really'],
    en: 'Really?!', enAlt: ['for real?', 'seriously?'],
    literal: 'real | really-?', tags: ['small-talk', 'question'],
  },
  {
    id: 's.agree-m', wordIds: ['w.agree', 'w.polite-m'],
    en: 'I agree. (male speaker)', enAlt: ['agreed'],
    literal: 'agree | ♂-polite', tags: ['opinion'],
  },
  {
    id: 's.not-agree', wordIds: ['w.not', 'w.agree'],
    en: 'I disagree.', enAlt: ["i don't agree"],
    literal: 'not | agree', tags: ['opinion'],
  },
  {
    id: 's.why-like-thailand', wordIds: ['w.why', 'w.like', 'w.thailand'],
    en: 'Why do you like Thailand?', enAlt: ['why do you like it here?'],
    literal: 'why | like | Thailand', patternId: 'p.why-q', tags: ['small-talk', 'question'],
  },
  {
    id: 's.because-thai-cute', wordIds: ['w.because', 'w.person', 'w.thai', 'w.cute'],
    en: 'Because Thai people are lovely.', enAlt: ['because thai people are cute'],
    literal: 'because | person | Thai | cute', tags: ['small-talk'],
  },
  {
    id: 's.why-not-go', wordIds: ['w.why', 'w.not', 'w.go'],
    en: "Why aren't you going?", enAlt: ['why not go?'],
    literal: 'why | not | go', patternId: 'p.why-q', tags: ['small-talk', 'question'],
  },
  {
    id: 's.probably-rain', wordIds: ['w.rain', 'w.probably', 'w.fall'],
    en: "It'll probably rain.", enAlt: ['it will probably rain'],
    literal: 'rain | probably | fall', patternId: 'p.probably', tags: ['small-talk'],
  },
  {
    id: 's.probably-delicious', wordIds: ['w.probably', 'w.delicious'],
    en: "It's probably delicious.", enAlt: ['probably tasty'],
    literal: 'probably | delicious', patternId: 'p.probably', tags: ['opinion'],
  },
  {
    id: 's.movie-boring-a-little', wordIds: ['w.movie', 'w.boring', 'w.a-little'],
    en: 'The movie was a bit boring.', enAlt: ['the movie was kind of boring'],
    literal: 'movie | boring | a-little', tags: ['opinion'],
  },
  {
    id: 's.so-fun', wordIds: ['w.fun', 'w.very'],
    en: 'It was so fun!', enAlt: ['very fun', 'so much fun'],
    literal: 'fun | very', tags: ['opinion'],
  },
  {
    id: 's.book-interesting', wordIds: ['w.book', 'w.interesting', 'w.very'],
    en: 'The book is really interesting.', enAlt: ['this book is very interesting'],
    literal: 'book | interesting | very', tags: ['opinion'],
  },
  {
    id: 's.go-somtam-together-q', wordIds: ['w.go', 'w.eat', 'w.som-tam', 'w.together', 'w.q-mai'],
    en: 'Shall we go eat som tam together?', enAlt: ['want to go get som tam together?'],
    literal: 'go | eat | som-tam | together | ?', patternId: 'p.together-invite', tags: ['plans', 'question'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.think-that',
    name: 'คิดว่า ___ (I think that…)',
    parts: [
      { slot: 'subject' }, { fixed: ['w.think'] }, { fixed: ['w.that-comp'] },
      { slot: 'topic' }, { slot: 'opinion' },
    ],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'] }, optional: true },
      { name: 'topic', accepts: { pos: ['noun'] }, optional: true },
      { name: 'opinion', accepts: { tags: ['adjective', 'flavor', 'feeling'] } },
    ],
    enTemplate: '{subject} think(s) {topic} is {opinion}',
    explanation:
      'คิดว่า is your opinion machine: think + ว่า + the thing + how it is. No "is" needed — Thai ' +
      'adjectives carry their own "to be", so ส้มตำอร่อย is already a full clause. Drop the subject ' +
      'when it is obviously you, and add ไหม at the end to ask what someone else thinks.',
    literal: '[subject] + think + that + [topic] + [opinion]',
    exampleIds: ['s.think-thai-fun', 's.think-somtam-delicious', 's.think-movie-fun-q'],
  },
  {
    id: 'p.why-q',
    name: 'ทำไม ___ (why…?)',
    parts: [{ fixed: ['w.why'] }, { slot: 'verb' }, { slot: 'object' }],
    slots: [
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'object', accepts: { tags: ['food', 'drink', 'object', 'activity', 'place', 'person'] }, optional: true },
    ],
    enTemplate: 'Why do you {verb} {object}?',
    explanation:
      'ทำไม at the front, then the plain statement — no "do", no inversion: ทำไมชอบเมืองไทย, ' +
      'literally "why like Thailand". Slip ไม่ before the verb for "why not…?": ทำไมไม่ไป. ' +
      'Answers start with เพราะ, and suddenly you are having a real conversation.',
    literal: 'why + [verb] + [object]',
    exampleIds: ['s.why-like-thailand', 's.why-not-go'],
  },
  {
    id: 'p.probably',
    name: 'น่าจะ ___ (probably…)',
    parts: [{ slot: 'topic' }, { fixed: ['w.probably'] }, { slot: 'state' }],
    slots: [
      { name: 'topic', accepts: { pos: ['noun'] }, optional: true },
      { name: 'state', accepts: { tags: ['adjective', 'flavor', 'feeling', 'action'] } },
    ],
    enTemplate: '{topic} probably {state}',
    explanation:
      'น่าจะ slides in front of any verb or adjective to hedge your bet: ตก falls → น่าจะตก will ' +
      'probably fall. Thai has no "maybe it will be" scaffolding — one word before the state does it ' +
      'all. You will use this constantly for weather, food, and whether your friend shows up on time.',
    literal: '[topic] + probably + [state]',
    exampleIds: ['s.probably-rain', 's.probably-delicious'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u19',
    order: 19,
    title: 'Opinions & Small Talk',
    subtitle: 'I think that...',
    emoji: '💬',
    color: '#ff8a3d',
    outcome: 'Share opinions with คิดว่า, agree and disagree politely, and ask and answer "why" — real small talk.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'ว่า — the hinge of every opinion',
        body:
          'After verbs of thinking, saying, and knowing, ว่า opens what comes next: คิดว่า "think that", ' +
          'เพราะว่า "because". English happily drops "that"; Thai keeps ว่า every time. ' +
          'Hear คิดว่า as one chunk — kít-wâa — and opinions start flowing.',
      },
      {
        title: 'Adjectives ARE verbs',
        body:
          'ส้มตำอร่อย has no "is" — Thai adjectives contain their own "to be". ' +
          'That is why คิดว่า + noun + adjective makes a complete opinion, ' +
          'and why ไม่ negates adjectives directly: ไม่ยาก not-hard, ไม่ง่าย not-easy. No "isn\'t" required.',
      },
      {
        title: 'ยาก vs อยาก — one tone apart',
        body:
          'ยาก (yâak, falling) = difficult. อยาก (yàak, low) = want to. ' +
          'ภาษาไทยยาก = Thai is hard; อยากเรียนภาษาไทย = I want to study Thai. ' +
          'Nothing sells tone practice like a pair you will say every single day.',
      },
    ],
    dialogues: [
      {
        id: 'd.u19-language-chat',
        title: 'Small talk over coffee',
        scene: 'Ton (♂, Thai) chats with Mia (♀), who has been learning Thai for a few months.',
        lines: [
          { speaker: 'Ton', sentenceId: 's.thai-hard-q' },
          { speaker: 'Mia', sentenceId: 's.not-hard-fun' },
          { speaker: 'Ton', sentenceId: 's.really-q' },
          { speaker: 'Mia', sentenceId: 's.think-thai-fun' },
          { speaker: 'Ton', sentenceId: 's.why-like-thailand' },
          { speaker: 'Mia', sentenceId: 's.because-thai-cute' },
          { speaker: 'Ton', sentenceId: 's.agree-m' },
        ],
      },
      {
        id: 'd.u19-movie-verdict',
        title: 'The verdict after the movie',
        scene: 'Nok (♀) and Ben (♂) walk out of the cinema, hungry and full of opinions.',
        lines: [
          { speaker: 'Nok', sentenceId: 's.think-movie-fun-q' },
          { speaker: 'Ben', sentenceId: 's.movie-boring-a-little' },
          { speaker: 'Nok', sentenceId: 's.not-agree' },
          { speaker: 'Nok', sentenceId: 's.so-fun' },
          { speaker: 'Ben', sentenceId: 's.go-somtam-together-q' },
          { speaker: 'Nok', sentenceId: 's.probably-delicious' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
