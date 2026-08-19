/**
 * Unit 11 — Feelings. Thai has no "I *am* tired" — the feeling IS the verb,
 * so one word is a whole sentence. Add มาก or นิดหน่อย to tune the volume,
 * and learn ไม่เป็นไร, the phrase that keeps Thailand running smoothly.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.happy', thai: 'ดีใจ', roman: 'dii-jai', en: 'happy', enAlt: ['glad', 'delighted'],
    syllables: [
      { thai: 'ดี', roman: 'dii', tone: 'mid' },
      { thai: 'ใจ', roman: 'jai', tone: 'mid' },
    ],
    pos: 'adj', emoji: '😄', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Good + heart = glad about something that just happened (good news, seeing a friend). For general life-happiness Thais say มีความสุข — ดีใจ is the in-the-moment spark.',
  },
  {
    id: 'w.sad', thai: 'เสียใจ', roman: 'sǐa-jai', en: 'sad', enAlt: ['upset', 'sorry', 'heartbroken'],
    syllables: [
      { thai: 'เสีย', roman: 'sia', tone: 'rising' },
      { thai: 'ใจ', roman: 'jai', tone: 'mid' },
    ],
    pos: 'adj', emoji: '😢', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Spoiled + heart = sad about something specific. เสียใจด้วย ("sad with you") is how Thais say condolences.',
  },
  {
    id: 'w.tired', thai: 'เหนื่อย', roman: 'nɯ̀ai', en: 'tired', enAlt: ['exhausted', 'worn out'],
    syllables: [{ thai: 'เหนื่อย', roman: 'nɯai', tone: 'low' }],
    pos: 'adj', emoji: '😫', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'The honest answer to สบายดีไหม after a long day. Body-tired from effort — for sleepy-tired, use ง่วง instead.',
  },
  {
    id: 'w.sleepy', thai: 'ง่วง', roman: 'ngûang', en: 'sleepy', enAlt: ['drowsy'],
    syllables: [{ thai: 'ง่วง', roman: 'nguang', tone: 'falling' }],
    pos: 'adj', emoji: '😪', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Specifically "my eyes are closing" — you can be ง่วง after lunch without being เหนื่อย at all. Thais announce it freely; napping carries no shame.',
  },
  {
    id: 'w.scared', thai: 'กลัว', roman: 'glua', en: 'scared', enAlt: ['afraid', 'frightened'],
    syllables: [{ thai: 'กลัว', roman: 'glua', tone: 'mid' }],
    pos: 'verb', emoji: '😨', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Takes its object directly, no "of": กลัวหมา = scared of dogs, กลัวผี = scared of ghosts — which most Thais will cheerfully admit to.',
  },
  {
    id: 'w.a-little', thai: 'นิดหน่อย', roman: 'nít-nɔ̀i', en: 'a little', enAlt: ['a bit', 'slightly'],
    syllables: [
      { thai: 'นิด', roman: 'nit', tone: 'high' },
      { thai: 'หน่อย', roman: 'nɔi', tone: 'low' },
    ],
    pos: 'adv', emoji: '🤏', tags: ['core'],
    note: 'The volume-down knob: sits after a feeling like มาก does. Thais downplay by default — เจ็บนิดหน่อย "hurts a little" can mean it really hurts.',
  },
  {
    id: 'w.full', thai: 'อิ่ม', roman: 'ìm', en: 'full', enAlt: ['full (from eating)', 'stuffed'],
    syllables: [{ thai: 'อิ่ม', roman: 'im', tone: 'low' }],
    pos: 'adj', emoji: '😮‍💨', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'The only polite way to stop a Thai host from refilling your plate: อิ่มมาก + a smile. English needs four words ("full from eating") — Thai needs one.',
  },
  {
    id: 'w.angry', thai: 'โกรธ', roman: 'gròot', en: 'angry', enAlt: ['mad'],
    syllables: [{ thai: 'โกรธ', roman: 'groot', tone: 'low' }],
    pos: 'adj', emoji: '😠', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'โกรธไหม = "are you mad at me?". Showing open anger loses face in Thailand — the word gets used far more in gentle teasing than in shouting.',
  },
  {
    id: 'w.bored', thai: 'เบื่อ', roman: 'bɯ̀a', en: 'bored', enAlt: ['fed up', 'sick of it'],
    syllables: [{ thai: 'เบื่อ', roman: 'bɯa', tone: 'low' }],
    pos: 'adj', emoji: '😑', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Bored AND fed-up in one word: เบื่อ about traffic, work, rain, or the same lunch again. A one-syllable sigh Thais use daily.',
  },
  {
    id: 'w.excited', thai: 'ตื่นเต้น', roman: 'dtɯ̀ɯn-dtên', en: 'excited', enAlt: ['nervous', 'thrilled'],
    syllables: [
      { thai: 'ตื่น', roman: 'dtɯɯn', tone: 'low' },
      { thai: 'เต้น', roman: 'dten', tone: 'falling' },
    ],
    pos: 'adj', emoji: '🎢', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Literally "wake up + dance" — your heart doing both. Covers excited AND nervous: the butterflies before a trip and before an exam are the same word.',
  },
  {
    id: 'w.stressed', thai: 'เครียด', roman: 'krîat', en: 'stressed', enAlt: ['stressed out', 'tense'],
    syllables: [{ thai: 'เครียด', roman: 'kriat', tone: 'falling' }],
    pos: 'adj', emoji: '🤯', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Modern Bangkok\'s word of the decade. อย่าเครียด "don\'t stress" is standard comfort between friends.',
  },
  {
    id: 'w.miss', thai: 'คิดถึง', roman: 'kít-tɯ̌ng', en: 'miss', enAlt: ['miss you', 'think of'],
    syllables: [
      { thai: 'คิด', roman: 'kit', tone: 'high' },
      { thai: 'ถึง', roman: 'tɯng', tone: 'rising' },
    ],
    pos: 'verb', emoji: '🥹', tags: ['core', 'standalone', 'feeling'],
    note: 'Literally "think + reach": your thoughts travel to someone. Thais text คิดถึงนะ to friends just to say hi — it\'s warmer and freer than English "I miss you".',
  },
  {
    id: 'w.okay', thai: 'โอเค', roman: 'oo-kee', en: 'okay', enAlt: ['ok', 'fine'],
    syllables: [
      { thai: 'โอ', roman: 'oo', tone: 'mid' },
      { thai: 'เค', roman: 'kee', tone: 'mid' },
    ],
    pos: 'adj', emoji: '👌', tags: ['core', 'standalone', 'feeling', 'adjective'],
    note: 'Borrowed straight from English and used constantly: โอเคไหม checks on a person, a plan, or the food. โอเคๆ means "fine, fine, deal".',
  },
  {
    id: 'w.no-worries', thai: 'ไม่เป็นไร', roman: 'mâi-bpen-rai', en: 'no worries', enAlt: ['never mind', "it's okay", "it's nothing", "you're welcome"],
    syllables: [
      { thai: 'ไม่', roman: 'mai', tone: 'falling' },
      { thai: 'เป็น', roman: 'bpen', tone: 'mid' },
      { thai: 'ไร', roman: 'rai', tone: 'mid' },
    ],
    pos: 'phrase', emoji: '🙆', tags: ['core', 'standalone'],
    note: 'THE Thai phrase — literally "it is nothing". Answers an apology, deflects thanks, shrugs off spilled noodles and missed buses. National philosophy in three syllables.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.okay-q', wordIds: ['w.okay', 'w.q-mai'],
    en: 'You okay?', enAlt: ['are you okay?', 'is it okay?'],
    literal: 'okay | ?', patternId: 'p.adj-mai', tags: ['feeling', 'question'],
  },
  {
    id: 's.tired-very', wordIds: ['w.tired', 'w.very'],
    en: "I'm exhausted.", enAlt: ['so tired', 'very tired', "i'm so tired"],
    literal: 'tired | very', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.sleepy-a-little', wordIds: ['w.sleepy', 'w.a-little'],
    en: "I'm a bit sleepy.", enAlt: ['a little sleepy'],
    literal: 'sleepy | a-little', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.hungry-a-little', wordIds: ['w.hungry', 'w.a-little'],
    en: "I'm a little hungry.", enAlt: ['a bit hungry'],
    literal: 'hungry | a-little', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.go-eat-q-m', wordIds: ['w.go', 'w.eat', 'w.rice', 'w.q-mai', 'w.polite-m'],
    en: 'Want to grab some food? (male speaker)', enAlt: ['shall we go eat?', 'wanna go eat?'],
    literal: 'go | eat | rice | ? | ♂-polite', patternId: 'p.mai-question', tags: ['invite'],
  },
  {
    id: 's.lets-go-f', wordIds: ['w.go', 'w.polite-f'],
    en: "Let's go! (female speaker)", enAlt: ['yes, let\'s go', 'going', 'sure, let\'s go'],
    literal: 'go | ♀-polite', tags: ['invite'],
  },
  {
    id: 's.happy-very-f', wordIds: ['w.i-f', 'w.happy', 'w.very', 'w.polite-f'],
    en: "I'm so happy! (female speaker)", enAlt: ['i am very glad'],
    literal: 'I♀ | happy | very | ♀-polite', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.full-very', wordIds: ['w.full', 'w.very'],
    en: "I'm stuffed.", enAlt: ['so full', "i'm full"],
    literal: 'full | very', patternId: 'p.feel', tags: ['feeling', 'food'],
  },
  {
    id: 's.bored-very', wordIds: ['w.bored', 'w.very'],
    en: "I'm so bored.", enAlt: ['really bored', 'so fed up'],
    literal: 'bored | very', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.excited-a-little', wordIds: ['w.excited', 'w.a-little'],
    en: "I'm a little nervous.", enAlt: ['a bit excited', "i'm a little excited"],
    literal: 'excited | a-little', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.stressed-very', wordIds: ['w.stressed', 'w.very'],
    en: "I'm so stressed.", enAlt: ['very stressed', 'stressed out'],
    literal: 'stressed | very', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.not-angry', wordIds: ['w.not', 'w.angry'],
    en: "I'm not mad.", enAlt: ['not angry', 'i am not angry'],
    literal: 'not | angry', patternId: 'p.not-adj', tags: ['feeling'],
  },
  {
    id: 's.not-scared-m', wordIds: ['w.i-m', 'w.not', 'w.scared', 'w.polite-m'],
    en: "I'm not scared. (male speaker)", enAlt: ['i am not afraid'],
    literal: 'I♂ | not | scared | ♂-polite', patternId: 'p.not-adj', tags: ['feeling'],
  },
  {
    id: 's.sad-a-little', wordIds: ['w.sad', 'w.a-little'],
    en: "I'm a little sad.", enAlt: ['a bit sad', 'a little upset'],
    literal: 'sad | a-little', patternId: 'p.feel', tags: ['feeling'],
  },
  {
    id: 's.miss-mom', wordIds: ['w.miss', 'w.mother'],
    en: 'I miss my mom.', enAlt: ['i miss my mother'],
    literal: 'miss | mom', patternId: 'p.miss', tags: ['feeling', 'family'],
  },
  {
    id: 's.miss-home', wordIds: ['w.miss', 'w.home'],
    en: 'I miss home.', enAlt: ["i'm homesick"],
    literal: 'miss | home', patternId: 'p.miss', tags: ['feeling'],
  },
  {
    id: 's.no-worries', wordIds: ['w.no-worries'],
    en: "It's okay — no worries.", enAlt: ['never mind', 'no problem', "it's nothing", "don't worry"],
    literal: 'not-be-anything', tags: ['feeling', 'comfort'],
  },
  {
    id: 's.thanks-very', wordIds: ['w.thanks', 'w.very'],
    en: 'Thanks so much.', enAlt: ['thank you very much', 'thanks a lot'],
    literal: 'thank-you | very', tags: ['comfort'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.feel',
    name: '___ มาก / นิดหน่อย (how you feel)',
    parts: [{ slot: 'subject' }, { slot: 'feeling' }, { slot: 'degree' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that'] }, optional: true },
      { name: 'feeling', accepts: { tags: ['feeling'] } },
      { name: 'degree', accepts: { wordIds: ['w.very', 'w.a-little'] }, optional: true },
    ],
    enTemplate: '{subject} feel {degree} {feeling}',
    explanation:
      'There is no "I *am* tired" in Thai — the feeling IS the verb, so เหนื่อย alone is a complete sentence. ' +
      'Say who (or don\'t — Thais usually skip it), name the feeling, then tune the volume after it: ' +
      'มาก turns it up, นิดหน่อย turns it down. ' +
      'Every feeling word you ever collect snaps straight into this frame: ง่วงมาก, เครียดนิดหน่อย, ดีใจมาก.',
    literal: '[who] + [feeling] + (มาก/นิดหน่อย)',
    exampleIds: ['s.tired-very', 's.sleepy-a-little', 's.happy-very-f', 's.sad-a-little'],
  },
  {
    id: 'p.miss',
    name: 'คิดถึง___ (missing someone)',
    parts: [{ slot: 'subject' }, { fixed: ['w.miss'] }, { slot: 'missed' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that'] }, optional: true },
      {
        name: 'missed',
        accepts: {
          tags: ['family', 'person', 'place'],
          exclude: ['w.i-m', 'w.i-f', 'w.we', 'w.person', 'w.farang', 'w.bathroom'],
        },
      },
    ],
    enTemplate: '{subject} miss {missed}',
    explanation:
      'คิดถึง is literally "think + reach" — your thoughts travel all the way to someone. ' +
      'Point it at anyone or anywhere, no preposition needed: คิดถึงแม่, คิดถึงเพื่อน, คิดถึงบ้าน (homesick), even คิดถึงเมืองไทย. ' +
      'Thais say it far more freely than English speakers say "I miss you" — it\'s an everyday warmth, not a confession.',
    literal: '[who] + คิดถึง + [person/place]',
    exampleIds: ['s.miss-mom', 's.miss-home'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u11',
    order: 11,
    title: 'Feelings',
    subtitle: 'Happy, tired, hungry',
    emoji: '💗',
    color: '#ff8a3d',
    outcome: 'Say how you feel — tired, happy, homesick — soften it like a Thai, and check in on a friend.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Feelings are verbs — no "am"',
        body:
          'English needs "I am tired"; Thai just says เหนื่อย. Feeling words work exactly like อร่อย and แพง did: ' +
          'the word IS the whole predicate, with no "to be" anywhere — never เป็น, never คือ. ' +
          'That\'s why one word plus มาก or ไหม is already a full, natural sentence: เหนื่อยมาก, ง่วงไหม.',
      },
      {
        title: 'นิดหน่อย — the art of downplaying',
        body:
          'Thais keep feelings at half-volume: hurt is เจ็บนิดหน่อย, upset is เสียใจนิดหน่อย. ' +
          'Understatement keeps the mood สบายๆ (easy-going) — big emotional declarations can make everyone uncomfortable. ' +
          'So when a Thai friend admits to feeling something นิดหน่อย, read it as "quite a lot".',
      },
      {
        title: 'ใจ — the heart inside the words',
        body:
          'ใจ means heart-mind, and Thai assembles feelings from it: ดี good + ใจ = happy; เสีย spoiled + ใจ = sad. ' +
          'Flip the order and the meaning flips: ใจดี = kind ("a good heart"), which you met in unit 10. ' +
          'Spot ใจ inside any new word and you can usually guess it\'s about character or emotion.',
      },
    ],
    dialogues: [
      {
        id: 'd.u11-long-day',
        title: 'After a long day',
        scene: 'Ton (♂) finds Mali (♀) slumped on the couch after work, still in her bag-over-shoulder pose.',
        lines: [
          { speaker: 'Ton', sentenceId: 's.okay-q' },
          { speaker: 'Mali', sentenceId: 's.tired-very' },
          { speaker: 'Mali', sentenceId: 's.hungry-a-little' },
          { speaker: 'Ton', sentenceId: 's.go-eat-q-m' },
          { speaker: 'Mali', sentenceId: 's.lets-go-f' },
        ],
      },
      {
        id: 'd.u11-missing-home',
        title: 'A little homesick',
        scene: 'Mind (♀) hangs up a video call with her family and goes quiet. Ton (♂) notices.',
        lines: [
          { speaker: 'Ton', sentenceId: 's.okay-q' },
          { speaker: 'Mind', sentenceId: 's.sad-a-little' },
          { speaker: 'Mind', sentenceId: 's.miss-home' },
          { speaker: 'Ton', sentenceId: 's.no-worries' },
          { speaker: 'Mind', sentenceId: 's.thanks-very' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
