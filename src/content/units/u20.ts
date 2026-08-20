/**
 * Unit 20 — Telling Stories. เล่าหน่อย!
 * The narrator's toolkit: แล้ว stamps things done (Thai's entire past tense),
 * เคย claims life experiences, กำลัง...อยู่ pins actions to right now, and
 * แล้วก็ strings it all into a flowing story.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.already', thai: 'แล้ว', roman: 'lɛ́ɛo', en: 'already', enAlt: ['done', 'already did'],
    syllables: [{ thai: 'แล้ว', roman: 'lɛɛo', tone: 'high' }],
    pos: 'particle', emoji: '✔️', tags: ['core', 'particle'],
    note: 'After a verb it stamps the action DONE: กินแล้ว "eaten". This one syllable is most of Thai\'s past tense. It also marks new states: ง่วงแล้ว "getting sleepy now".',
  },
  {
    id: 'w.then', thai: 'แล้วก็', roman: 'lɛ́ɛo-gɔ̂ɔ', en: 'and then', enAlt: ['then', 'after that'], literal: 'already + also',
    syllables: [
      { thai: 'แล้ว', roman: 'lɛɛo', tone: 'high' },
      { thai: 'ก็', roman: 'gɔɔ', tone: 'falling' },
    ],
    pos: 'conj', emoji: '➡️', tags: ['core'],
    note: 'The storyteller\'s glue: chain clause after clause with แล้วก็ and the story flows. Thais happily use it three times in one breath — beads on a string.',
  },
  {
    id: 'w.ever', thai: 'เคย', roman: 'kəəi', en: 'ever (have done)', enAlt: ['ever', 'have ever', 'used to'],
    syllables: [{ thai: 'เคย', roman: 'kəəi', tone: 'mid' }],
    pos: 'adv', emoji: '🛂', tags: ['core', 'standalone'],
    note: 'Your experience passport: เคยไป = "I\'ve been (at least once)". Answer เคย questions with เคย (have) or ไม่เคย (never) — no yes/no words needed.',
  },
  {
    id: 'w.prog', thai: 'กำลัง', roman: 'gam-lang', en: '-ing (right now)', enAlt: ['currently', 'in the middle of'],
    syllables: [
      { thai: 'กำ', roman: 'gam', tone: 'mid' },
      { thai: 'ลัง', roman: 'lang', tone: 'mid' },
    ],
    pos: 'adv', emoji: '⏳', tags: ['core'],
    note: 'Goes BEFORE the verb, usually teamed with อยู่ after it: กำลังกินอยู่ "eating right now". Casual speech often drops กำลัง and keeps the อยู่.',
  },
  {
    id: 'w.before', thai: 'ก่อน', roman: 'gɔ̀ɔn', en: 'before / first', enAlt: ['first', 'before', 'earlier'],
    syllables: [{ thai: 'ก่อน', roman: 'gɔɔn', tone: 'low' }],
    pos: 'adv', emoji: '⏪', tags: ['core', 'time'],
    note: 'After a verb it means "first / ahead of you": ไปก่อน "I\'m off". In front of a verb it\'s plain "before": ก่อนนอน = before bed.',
  },
  {
    id: 'w.finished', thai: 'เสร็จ', roman: 'sèt', en: 'finished', enAlt: ['done', 'completed'],
    syllables: [{ thai: 'เสร็จ', roman: 'set', tone: 'low' }],
    pos: 'verb', emoji: '🏁', tags: ['core', 'action', 'standalone'],
    note: 'The all-purpose "done!". Waiters, mechanics, and colleagues all announce เสร็จแล้ว. เสร็จหรือยัง = "done yet?" — the gentle nag.',
  },
  {
    id: 'w.yet-q', thai: 'หรือยัง', roman: 'rɯ̌ɯ-yang', en: 'yet?', enAlt: ['or not yet?', 'already?'], literal: 'or + still',
    syllables: [
      { thai: 'หรือ', roman: 'rɯɯ', tone: 'rising' },
      { thai: 'ยัง', roman: 'yang', tone: 'mid' },
    ],
    pos: 'question', emoji: '❔', tags: ['core', 'particle', 'question'],
    note: 'Asks "…yet?": กินข้าวหรือยัง "eaten yet?" — Thailand\'s real "how are you". In fast speech it shrinks to รึยัง.',
  },
  {
    id: 'w.still', thai: 'ยัง', roman: 'yang', en: 'still / not yet', enAlt: ['not yet', 'still'],
    syllables: [{ thai: 'ยัง', roman: 'yang', tone: 'mid' }],
    pos: 'adv', emoji: '⏸️', tags: ['core', 'standalone'],
    note: 'Alone it answers "not yet": เสร็จหรือยัง — ยัง. Before ไม่ + verb it means "still haven\'t": ยังไม่กิน "haven\'t eaten yet".',
  },
  {
    id: 'w.just-now', thai: 'เมื่อกี้', roman: 'mɯ̂a-gîi', en: 'just now', enAlt: ['a moment ago', 'just'],
    syllables: [
      { thai: 'เมื่อ', roman: 'mɯa', tone: 'falling' },
      { thai: 'กี้', roman: 'gii', tone: 'falling' },
    ],
    pos: 'adv', emoji: '⏱️', tags: ['core', 'time'],
    note: 'Seconds-to-minutes ago: เมื่อกี้เพื่อนมา "a friend just came by". Completes the เมื่อ family: เมื่อกี้ just now → เมื่อคืน last night → เมื่อวาน yesterday.',
  },
  {
    id: 'w.last-night', thai: 'เมื่อคืน', roman: 'mɯ̂a-kɯɯn', en: 'last night', enAlt: ['yesterday night'], literal: 'when + night',
    syllables: [
      { thai: 'เมื่อ', roman: 'mɯa', tone: 'falling' },
      { thai: 'คืน', roman: 'kɯɯn', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🌙', tags: ['core', 'time'],
    note: 'Anything that starts with เมื่อคืน is instantly a story. Front the sentence with it and every verb after it happened last night — no tense needed.',
  },
  {
    id: 'w.times', thai: 'ครั้ง', roman: 'kráng', en: 'time (occasion)', enAlt: ['times', 'occasion'],
    syllables: [{ thai: 'ครั้ง', roman: 'krang', tone: 'high' }],
    pos: 'classifier', emoji: '🔂', tags: ['core'],
    note: 'Counts occasions: สองครั้ง twice, เคยไปหนึ่งครั้ง "been once". Number + ครั้ง after เคย states your whole track record.',
  },
  {
    id: 'w.tell', thai: 'เล่า', roman: 'lâo', en: 'tell (a story)', enAlt: ['narrate', 'recount'],
    syllables: [{ thai: 'เล่า', roman: 'lao', tone: 'falling' }],
    pos: 'verb', emoji: '🗣️', tags: ['core', 'action'],
    note: 'Tell as in narrate, not inform: เล่าหน่อย "tell me!" is how you demand the gossip. Different word from everyday บอก (tell someone a fact).',
  },
  {
    id: 'w.wait', thai: 'รอ', roman: 'rɔɔ', en: 'wait', enAlt: ['wait for', 'hold on'],
    syllables: [{ thai: 'รอ', roman: 'rɔɔ', tone: 'mid' }],
    pos: 'verb', emoji: '🧍', tags: ['core', 'action'],
    note: 'What you do a lot of in Thailand — for food, for rain, for friends. รอเพื่อนอยู่ "waiting for a friend" excuses any amount of loitering.',
  },
  {
    id: 'w.arrive', thai: 'ถึง', roman: 'tɯ̌ng', en: 'arrive', enAlt: ['reach', 'get to', 'get there'],
    syllables: [{ thai: 'ถึง', roman: 'tɯng', tone: 'rising' }],
    pos: 'verb', emoji: '📍', tags: ['core', 'action'],
    note: 'ถึงแล้ว "we\'re here!" — what every taxi driver says at journey\'s end, and what you text home to say you arrived safe.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.eaten-yet', wordIds: ['w.eat', 'w.rice', 'w.yet-q'],
    en: 'Have you eaten yet?', enAlt: ['did you eat yet?', 'have you had lunch?'],
    literal: 'eat | rice | or-yet?', tags: ['question', 'greeting'],
  },
  {
    id: 's.ate-already-m', wordIds: ['w.eat', 'w.already', 'w.polite-m'],
    en: 'I\'ve already eaten. (male speaker)', enAlt: ['already ate', 'i ate already'],
    literal: 'eat | already | ♂-polite', patternId: 'p.already',
  },
  {
    id: 's.not-yet-eat', wordIds: ['w.still', 'w.not', 'w.eat'],
    en: 'I haven\'t eaten yet.', enAlt: ['not yet', 'still haven\'t eaten'],
    literal: 'still | not | eat',
  },
  {
    id: 's.full-already', wordIds: ['w.full', 'w.already'],
    en: 'I\'m full.', enAlt: ['i\'m full already', 'i\'m stuffed'],
    literal: 'full | already', patternId: 'p.already',
  },
  {
    id: 's.finished-already-f', wordIds: ['w.finished', 'w.already', 'w.polite-f'],
    en: 'Done! (female speaker)', enAlt: ['finished!', 'it\'s done', 'all done'],
    literal: 'finished | already | ♀-polite', patternId: 'p.already',
  },
  {
    id: 's.arrive-home-already', wordIds: ['w.arrive', 'w.home', 'w.already'],
    en: 'I\'m home.', enAlt: ['i got home already', 'i arrived home', 'we\'re home'],
    literal: 'arrive | home | already', patternId: 'p.already',
  },
  {
    id: 's.just-now-friend-come', wordIds: ['w.just-now', 'w.friend', 'w.come'],
    en: 'A friend came by just now.', enAlt: ['my friend just came', 'a friend just stopped by'],
    literal: 'just now | friend | come', tags: ['story'],
  },
  {
    id: 's.ever-somtam-q', wordIds: ['w.ever', 'w.eat', 'w.som-tam', 'w.q-mai'],
    en: 'Have you ever eaten som tam?', enAlt: ['have you ever tried papaya salad?'],
    literal: 'ever | eat | som tam | ?', patternId: 'p.ever', tags: ['question'],
  },
  {
    id: 's.ever-thai-movie-q', wordIds: ['w.ever', 'w.watch', 'w.movie', 'w.thai', 'w.q-mai'],
    en: 'Have you ever watched a Thai movie?', enAlt: ['have you ever seen a thai film?'],
    literal: 'ever | watch | movie | Thai | ?', patternId: 'p.ever', tags: ['question'],
  },
  {
    id: 's.ever-twice', wordIds: ['w.ever', 'w.go', 'w.two', 'w.times'],
    en: 'I\'ve been twice.', enAlt: ['i have gone two times', 'i\'ve been there twice'],
    literal: 'ever | go | two | time(s)', patternId: 'p.ever',
  },
  {
    id: 's.never-m', wordIds: ['w.not', 'w.ever', 'w.polite-m'],
    en: 'Never have. (male speaker)', enAlt: ['never', 'i never have'],
    literal: 'not | ever | ♂-polite',
  },
  {
    id: 's.prog-doing-what', wordIds: ['w.prog', 'w.do', 'w.what', 'w.stay'],
    en: 'What are you doing right now?', enAlt: ['what are you doing?', 'whatcha up to right now?'],
    literal: '-ing | do | what | (อยู่ = right now)', patternId: 'p.progressive', tags: ['question'],
  },
  {
    id: 's.prog-eat-rice', wordIds: ['w.prog', 'w.eat', 'w.rice', 'w.stay'],
    en: 'I\'m eating right now.', enAlt: ['i\'m in the middle of eating', 'eating right now'],
    literal: '-ing | eat | rice | (อยู่ = right now)', patternId: 'p.progressive',
  },
  {
    id: 's.prog-wait-friend', wordIds: ['w.prog', 'w.wait', 'w.friend', 'w.stay'],
    en: 'I\'m waiting for a friend.', enAlt: ['waiting for a friend right now'],
    literal: '-ing | wait | friend | (อยู่ = right now)', patternId: 'p.progressive',
  },
  {
    id: 's.he-prog-work', wordIds: ['w.he-she', 'w.prog', 'w.work', 'w.stay'],
    en: 'He\'s working right now.', enAlt: ['she\'s working right now', 'he is in the middle of work'],
    literal: 'he/she | -ing | work | (อยู่ = right now)', patternId: 'p.progressive',
  },
  {
    id: 's.story-morning', wordIds: ['w.morning', 'w.wake', 'w.then', 'w.shower', 'w.then', 'w.eat', 'w.rice'],
    thaiOverride: 'ตอนเช้าตื่น แล้วก็อาบน้ำ แล้วก็กินข้าว',
    en: 'In the morning I got up, then showered, then had breakfast.',
    enAlt: ['this morning i woke up, showered, and ate'],
    literal: 'morning | wake | then | shower | then | eat | rice', tags: ['story'],
  },
  {
    id: 's.story-yesterday', wordIds: ['w.yesterday', 'w.go', 'w.market', 'w.then', 'w.buy', 'w.shirt'],
    thaiOverride: 'เมื่อวานไปตลาด แล้วก็ซื้อเสื้อ',
    en: 'Yesterday I went to the market and then bought a shirt.',
    enAlt: ['yesterday i went to the market, then i bought a shirt'],
    literal: 'yesterday | go | market | then | buy | shirt', tags: ['story'],
  },
  {
    id: 's.story-last-night', wordIds: ['w.last-night', 'w.watch', 'w.movie', 'w.then', 'w.sleep'],
    thaiOverride: 'เมื่อคืนดูหนัง แล้วก็นอน',
    en: 'Last night I watched a movie and then went to sleep.',
    enAlt: ['last night i watched a movie, then went to bed'],
    literal: 'last night | watch | movie | then | sleep', tags: ['story'],
  },
  {
    id: 's.tell-a-bit', wordIds: ['w.tell', 'w.a-bit'],
    en: 'Tell me!', enAlt: ['tell me about it', 'do tell'],
    literal: 'tell | a bit',
  },
  {
    id: 's.fun-q', wordIds: ['w.fun', 'w.q-mai'],
    en: 'Was it fun?', enAlt: ['is it fun?', 'did you have fun?'],
    literal: 'fun | ?', tags: ['question'],
  },
  {
    id: 's.fun-very', wordIds: ['w.fun', 'w.very'],
    en: 'It was so much fun!', enAlt: ['very fun', 'so fun'],
    literal: 'fun | very',
  },
  {
    id: 's.go-first-m', wordIds: ['w.go', 'w.before', 'w.polite-m'],
    en: 'I\'m off! (male speaker)', enAlt: ['i\'ll go first', 'gotta go', 'i\'m heading out'],
    literal: 'go | first | ♂-polite',
  },
  {
    id: 's.hungry-very-m', wordIds: ['w.hungry', 'w.very', 'w.polite-m'],
    en: 'I\'m starving. (male speaker)', enAlt: ['i\'m so hungry', 'very hungry'],
    literal: 'hungry | very | ♂-polite',
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.already',
    name: '___ + แล้ว (already / done)',
    parts: [{ slot: 'verb' }, { slot: 'object' }, { fixed: ['w.already'] }],
    slots: [
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'object', accepts: { tags: ['food', 'drink', 'object', 'place'] }, optional: true },
    ],
    enTemplate: '{verb} {object} already',
    explanation:
      'Thai has no past tense — แล้ว after the verb phrase does the whole job: ' +
      'กินแล้ว "eaten", ถึงบ้านแล้ว "got home". It really means "the situation has changed", ' +
      'so it works on states too: อิ่มแล้ว "I\'m full now". Say the action, stamp it with แล้ว, ' +
      'and the past takes care of itself.',
    literal: '[verb] + [object] + แล้ว',
    exampleIds: ['s.ate-already-m', 's.arrive-home-already', 's.finished-already-f', 's.full-already'],
  },
  {
    id: 'p.ever',
    name: 'เคย + ___ (ever done it?)',
    parts: [{ slot: 'subject' }, { fixed: ['w.ever'] }, { slot: 'verb' }, { slot: 'object' }],
    slots: [
      { name: 'subject', accepts: { tags: ['person'] }, optional: true },
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'object', accepts: { tags: ['food', 'drink', 'object', 'place'] }, optional: true },
    ],
    enTemplate: 'Have {subject} ever {verb} {object}?',
    explanation:
      'เคย in front of a verb turns it into a life experience: เคยกิน "I\'ve eaten it before". ' +
      'Add ไหม and you\'ve asked the classic traveler question: เคยกินส้มตำไหม. ' +
      'Answer with เคย ("have") or ไม่เคย ("never") — Thai doesn\'t need yes or no. ' +
      'Every action verb you know just became an interview question.',
    literal: '[subject] + เคย + [verb] + [object] (+ ไหม)',
    exampleIds: ['s.ever-somtam-q', 's.ever-thai-movie-q', 's.ever-twice'],
  },
  {
    id: 'p.progressive',
    name: 'กำลัง + ___ + อยู่ (happening right now)',
    parts: [{ slot: 'subject' }, { fixed: ['w.prog'] }, { slot: 'verb' }, { slot: 'object' }, { fixed: ['w.stay'] }],
    slots: [
      { name: 'subject', accepts: { tags: ['person'] }, optional: true },
      { name: 'verb', accepts: { tags: ['action'] } },
      { name: 'object', accepts: { tags: ['food', 'drink', 'object'] }, optional: true },
    ],
    enTemplate: '{subject} is {verb}ing {object} right now',
    explanation:
      'To pin an action to this very moment, Thai wraps the verb in a sandwich: กำลัง before, อยู่ after — ' +
      'กำลังกินข้าวอยู่ "eating right now". Note the order: อยู่ comes AFTER the verb, never before. ' +
      'อยู่ is the "be at" word from unit 7 — you are located AT the action. ' +
      'In fast casual speech either slice can drop (ทำงานอยู่), but the full sandwich is always clear and always correct.',
    literal: '[subject] + กำลัง + [verb] + [object] + อยู่',
    exampleIds: ['s.prog-eat-rice', 's.prog-wait-friend', 's.he-prog-work'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u20',
    order: 20,
    title: 'Telling Stories',
    subtitle: 'Past, present & flowing speech',
    emoji: '📖',
    color: '#ff5a78',
    outcome: 'Narrate your day and your trips — what you did, what you\'re doing right now, and what you\'ve done before — chained into one flowing story with แล้วก็.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'แล้ว is the past tense (all of it)',
        body:
          'Thai verbs never change form, so completion is a particle: verb + แล้ว = done. ' +
          'กินแล้ว eaten, ถึงแล้ว arrived, อิ่มแล้ว full now. To ask, swap in หรือยัง: ' +
          'กินข้าวหรือยัง "eaten yet?" — and answer with just แล้ว (already) or ยัง (not yet). ' +
          'Two little particles replace the entire English tense system.',
      },
      {
        title: 'เคย — the experience marker',
        body:
          'เคย before a verb claims a life experience: เคยไป "I\'ve been, at least once". ' +
          'Ask with เคย…ไหม; the answers are simply เคย or ไม่เคย. ' +
          'Count your record with ครั้ง: เคยไปสองครั้ง "been twice". ' +
          'English needs "have you ever gone" — Thai needs three short words.',
      },
      {
        title: 'แล้วก็, แล้วก็, แล้วก็ — how Thais tell a story',
        body:
          'Set the scene once with a time word (เมื่อวาน, เมื่อคืน, ตอนเช้า), then chain events with แล้วก็ "and then": ' +
          'ไปตลาด แล้วก็ซื้อเสื้อ แล้วก็กลับบ้าน. No tenses, no commas — just beads on a string. ' +
          'For scenes happening as you speak, sandwich the verb in กำลัง…อยู่: กำลังกินอยู่ "eating at this very moment".',
      },
    ],
    dialogues: [
      {
        id: 'd.u20-lunch-call',
        title: 'The lunchtime call',
        scene: 'Nok (♀) video-calls Mek (♂) at noon and opens with the most Thai question there is.',
        lines: [
          { speaker: 'Nok', sentenceId: 's.prog-doing-what' },
          { speaker: 'Mek', sentenceId: 's.prog-wait-friend' },
          { speaker: 'Nok', sentenceId: 's.eaten-yet' },
          { speaker: 'Mek', sentenceId: 's.not-yet-eat' },
          { speaker: 'Mek', sentenceId: 's.hungry-very-m' },
          { speaker: 'Nok', sentenceId: 's.prog-eat-rice' },
          { speaker: 'Mek', sentenceId: 's.go-first-m' },
        ],
      },
      {
        id: 'd.u20-trip-story',
        title: 'Back from the trip',
        scene: 'Fah (♀) drops her bag after a weekend away; her brother Dan (♂) wants every detail.',
        lines: [
          { speaker: 'Fah', sentenceId: 's.arrive-home-already' },
          { speaker: 'Dan', sentenceId: 's.fun-q' },
          { speaker: 'Fah', sentenceId: 's.fun-very' },
          { speaker: 'Dan', sentenceId: 's.tell-a-bit' },
          { speaker: 'Fah', sentenceId: 's.story-yesterday' },
          { speaker: 'Fah', sentenceId: 's.story-last-night' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
