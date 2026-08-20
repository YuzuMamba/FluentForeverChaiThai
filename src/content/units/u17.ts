/**
 * Unit 17 — Health & Body. Thai pain grammar is beautifully bare: pick the
 * pain verb (ปวด for aches, เจ็บ for sharp hurts), name the body part, done —
 * no "my", no "have", no "is". Add เป็น for sicknesses and you can handle
 * any pharmacy counter in the country.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.hurt', thai: 'เจ็บ', roman: 'jèp', en: 'hurt', enAlt: ['hurts', 'sore', 'ouch'],
    syllables: [{ thai: 'เจ็บ', roman: 'jep', tone: 'low' }],
    pos: 'verb', emoji: '🤕', tags: ['core', 'standalone', 'feeling'],
    note: 'Sharp, surface pain: cuts, bruises, a sore throat (เจ็บคอ). On its own it\'s Thai for "ouch!". Dull inner aches use ปวด instead.',
  },
  {
    id: 'w.ache', thai: 'ปวด', roman: 'bpùat', en: 'ache', enAlt: ['aches', 'throbbing pain'],
    syllables: [{ thai: 'ปวด', roman: 'bpuat', tone: 'low' }],
    pos: 'verb', emoji: '😖', tags: ['core', 'feeling'],
    note: 'Dull, throbbing pain from inside — heads, stomachs, backs, teeth. ปวด + body part is a complete sentence: ปวดหัว "headache".',
  },
  {
    id: 'w.head', thai: 'หัว', roman: 'hǔa', en: 'head', enAlt: ['skull'],
    syllables: [{ thai: 'หัว', roman: 'hua', tone: 'rising' }],
    pos: 'noun', emoji: '👤', tags: ['core', 'body'],
    note: 'Also the "head" of many compounds: หัวใจ heart ("head of the mind"), หัวหอม onion. ปวดหัว is everyone\'s first health phrase.',
  },
  {
    id: 'w.stomach', thai: 'ท้อง', roman: 'tɔ́ɔng', en: 'stomach', enAlt: ['belly', 'tummy'],
    syllables: [{ thai: 'ท้อง', roman: 'tɔɔng', tone: 'high' }],
    pos: 'noun', emoji: '🤰', tags: ['core', 'body'],
    note: 'ปวดท้อง covers everything from hunger cramps to street-food regret. ท้อง is also the word for being pregnant — context decides.',
  },
  {
    id: 'w.tooth', thai: 'ฟัน', roman: 'fan', en: 'tooth', enAlt: ['teeth'],
    syllables: [{ thai: 'ฟัน', roman: 'fan', tone: 'mid' }],
    pos: 'noun', emoji: '🦷', tags: ['core', 'body'],
    note: 'One word for tooth AND teeth — Thai has no plurals. แปรงฟัน = brush your teeth.',
  },
  {
    id: 'w.back', thai: 'หลัง', roman: 'lǎng', en: 'back', enAlt: ['back (body)'],
    syllables: [{ thai: 'หลัง', roman: 'lang', tone: 'rising' }],
    pos: 'noun', emoji: '💆', tags: ['core', 'body'],
    note: 'ปวดหลัง is the office worker\'s national anthem. หลัง also means "behind/after" in other phrases — same idea of what\'s at your back.',
  },
  {
    id: 'w.leg', thai: 'ขา', roman: 'kǎa', en: 'leg', enAlt: ['legs'],
    syllables: [{ thai: 'ขา', roman: 'kaa', tone: 'rising' }],
    pos: 'noun', emoji: '🦵', tags: ['core', 'body'],
    note: 'เจ็บขา is what you say after a day of temple stairs. Also the "leg" of a journey: ขาไป the way there, ขากลับ the way back.',
  },
  {
    id: 'w.doctor', thai: 'หมอ', roman: 'mɔ̌ɔ', en: 'doctor', enAlt: ['doc'],
    syllables: [{ thai: 'หมอ', roman: 'mɔɔ', tone: 'rising' }],
    pos: 'noun', emoji: '🧑‍⚕️', tags: ['core', 'person'],
    note: 'The everyday word (แพทย์ is the formal one). ไปหาหมอ = go see the doctor. Fortune tellers are หมอดู — "looking doctors".',
  },
  {
    id: 'w.medicine', thai: 'ยา', roman: 'yaa', en: 'medicine', enAlt: ['medication', 'drug', 'pills'],
    syllables: [{ thai: 'ยา', roman: 'yaa', tone: 'mid' }],
    pos: 'noun', emoji: '💊', tags: ['core', 'object'],
    note: 'Pills, syrups, balms — all ยา. You "eat" it: กินยา. ร้านขายยา (medicine-selling shop) is a pharmacy, and Thai pharmacists can handle most small ailments on the spot.',
  },
  {
    id: 'w.hospital', thai: 'โรงพยาบาล', roman: 'roong-pá-yaa-baan', en: 'hospital',
    syllables: [
      { thai: 'โรง', roman: 'roong', tone: 'mid' },
      { thai: 'พะ', roman: 'pa', tone: 'high' },
      { thai: 'ยา', roman: 'yaa', tone: 'mid' },
      { thai: 'บาล', roman: 'baan', tone: 'mid' },
    ],
    pos: 'noun', emoji: '🏥', tags: ['core', 'place'],
    note: 'โรง building + พยาบาล nursing — same โรง as in โรงแรม hotel. Long word, but you\'ll hear taxi drivers repeat it back instantly.',
  },
  {
    id: 'w.sick', thai: 'ป่วย', roman: 'bpùai', en: 'sick', enAlt: ['ill', 'unwell'],
    syllables: [{ thai: 'ป่วย', roman: 'bpuai', tone: 'low' }],
    pos: 'adj', emoji: '🤒', tags: ['core', 'standalone', 'adjective', 'feeling'],
    note: 'The direct word for sick — ลาป่วย is calling in sick to work. Thais often soften it to ไม่สบาย, "not comfortable".',
  },
  {
    id: 'w.fever', thai: 'ไข้', roman: 'kâi', en: 'fever', enAlt: ['a fever'],
    syllables: [{ thai: 'ไข้', roman: 'kai', tone: 'falling' }],
    pos: 'noun', emoji: '🌡️', tags: ['core'],
    note: 'You ARE a fever in Thai: เป็นไข้ "be fever" = have a fever. The first thing a pharmacist will ask about.',
  },
  {
    id: 'w.rest', thai: 'พัก', roman: 'pák', en: 'rest', enAlt: ['take a break', 'break'],
    syllables: [{ thai: 'พัก', roman: 'pak', tone: 'high' }],
    pos: 'verb', emoji: '⏸️', tags: ['core', 'action'],
    note: 'Rest or take a break — the doctor\'s favorite prescription. The full-length version พักผ่อน means proper rest-and-relax.',
  },
  {
    id: 'w.better', thai: 'ดีขึ้น', roman: 'dii-kɯ̂n', en: 'better', enAlt: ['improved', 'getting better'],
    syllables: [
      { thai: 'ดี', roman: 'dii', tone: 'mid' },
      { thai: 'ขึ้น', roman: 'kɯn', tone: 'falling' },
    ],
    pos: 'adj', emoji: '📈', tags: ['core', 'standalone', 'adjective', 'feeling'],
    note: 'ดี good + ขึ้น up = "good going up". ดีขึ้นไหม is the question every sick friend gets — and ดีขึ้น the answer everyone hopes for.',
  },
  {
    id: 'w.find', thai: 'หา', roman: 'hǎa', en: 'look for', enAlt: ['find', 'visit', 'go see'],
    syllables: [{ thai: 'หา', roman: 'haa', tone: 'rising' }],
    pos: 'verb', emoji: '🔍', tags: ['core', 'action'],
    note: 'Look for things — but with people it means visit: ไปหาหมอ go see the doctor, มาหาเพื่อน come see a friend.',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.headache', wordIds: ['w.ache', 'w.head'],
    en: 'I have a headache.', enAlt: ['my head aches', 'my head hurts'],
    literal: 'ache | head', patternId: 'p.ache', tags: ['health'],
  },
  {
    id: 's.headache-very', wordIds: ['w.ache', 'w.head', 'w.very'],
    en: 'My head is pounding.', enAlt: ['i have a bad headache', 'my head really hurts'],
    literal: 'ache | head | very', patternId: 'p.ache', tags: ['health'],
  },
  {
    id: 's.stomachache', wordIds: ['w.ache', 'w.stomach'],
    en: 'My stomach hurts.', enAlt: ['i have a stomachache', 'my stomach aches'],
    literal: 'ache | stomach', patternId: 'p.ache', tags: ['health'],
  },
  {
    id: 's.toothache', wordIds: ['w.ache', 'w.tooth'],
    en: 'I have a toothache.', enAlt: ['my tooth hurts', 'my tooth aches'],
    literal: 'ache | tooth', patternId: 'p.ache', tags: ['health'],
  },
  {
    id: 's.backache-little', wordIds: ['w.ache', 'w.back', 'w.a-little'],
    en: 'My back aches a little.', enAlt: ['my back hurts a bit'],
    literal: 'ache | back | a-little', patternId: 'p.ache', tags: ['health'],
  },
  {
    id: 's.leg-hurts', wordIds: ['w.hurt', 'w.leg'],
    en: 'My leg hurts.', enAlt: ['my leg is sore'],
    literal: 'hurt | leg', patternId: 'p.hurt', tags: ['health'],
  },
  {
    id: 's.hurt-q', wordIds: ['w.hurt', 'w.q-mai'],
    en: 'Does it hurt?', enAlt: ['are you hurt?', 'is it sore?'],
    literal: 'hurt | ?', patternId: 'p.hurt', tags: ['health', 'question'],
  },
  {
    id: 's.whats-wrong', wordIds: ['w.be', 'w.what'],
    en: 'What\'s wrong?', enAlt: ['what\'s the matter?', 'what happened to you?'],
    literal: 'be | what', patternId: 'p.pen-sick', tags: ['health', 'question'],
  },
  {
    id: 's.sick-today', wordIds: ['w.today', 'w.sick'],
    en: 'I\'m sick today.', enAlt: ['i am ill today', 'i feel unwell today'],
    literal: 'today | sick', tags: ['health'],
  },
  {
    id: 's.fever-little', wordIds: ['w.be', 'w.fever', 'w.a-little'],
    en: 'I have a slight fever.', enAlt: ['i have a bit of a fever'],
    literal: 'be | fever | a-little', patternId: 'p.pen-sick', tags: ['health'],
  },
  {
    id: 's.go-doctor', wordIds: ['w.go', 'w.find', 'w.doctor'],
    en: 'I\'m going to see the doctor.', enAlt: ['go see a doctor', 'i am going to the doctor'],
    literal: 'go | see | doctor', tags: ['health'],
  },
  {
    id: 's.go-hospital-q', wordIds: ['w.go', 'w.hospital', 'w.q-mai'],
    en: 'Should we go to the hospital?', enAlt: ['do you want to go to the hospital?', 'are you going to the hospital?'],
    literal: 'go | hospital | ?', patternId: 'p.mai-question', tags: ['health', 'question'],
  },
  {
    id: 's.want-rest', wordIds: ['w.want', 'w.rest'],
    en: 'I just want to rest.', enAlt: ['i want to take a break', 'i want to rest'],
    literal: 'want | rest', patternId: 'p.want-to', tags: ['health'],
  },
  {
    id: 's.request-med-m', wordIds: ['w.request', 'w.medicine', 'w.a-bit', 'w.polite-m'],
    en: 'Could I get some medicine, please? (male speaker)', enAlt: ['may i have some medicine?'],
    literal: 'request | medicine | a-bit | ♂-polite', patternId: 'p.request', tags: ['health', 'request'],
  },
  {
    id: 's.med-every-day', wordIds: ['w.eat', 'w.medicine', 'w.every', 'w.day'],
    en: 'Take the medicine every day.', enAlt: ['eat the medicine every day', 'take your medicine daily'],
    literal: 'eat | medicine | every | day', tags: ['health'],
  },
  {
    id: 's.how-much-m', wordIds: ['w.how-much', 'w.polite-m'],
    en: 'How much? (male speaker)', enAlt: ['how much is it?'],
    literal: 'how-much | ♂-polite', patternId: 'p.how-much', tags: ['question'],
  },
  {
    id: 's.fifty-baht-f', wordIds: ['w.five', 'w.ten', 'w.baht', 'w.polite-f'],
    en: 'Fifty baht. (female speaker)', enAlt: ['50 baht'],
    literal: 'five | ten | baht | ♀-polite', patternId: 'p.price',
  },
  {
    id: 's.better-q', wordIds: ['w.better', 'w.q-mai'],
    en: 'Feeling better?', enAlt: ['are you better?', 'is it better?'],
    literal: 'better | ?', patternId: 'p.mai-question', tags: ['health', 'question'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.ache',
    name: 'ปวด + [body part]',
    parts: [{ fixed: ['w.ache'] }, { slot: 'part' }, { slot: 'degree' }],
    slots: [
      { name: 'part', accepts: { tags: ['body'] } },
      { name: 'degree', accepts: { wordIds: ['w.very', 'w.a-little'] }, optional: true },
    ],
    enTemplate: 'My {part} aches {degree}',
    explanation:
      'The whole diagnosis in two words: ปวด + the part that throbs. No "my" — everyone knows whose head. ' +
      'No "I have a" — the pain verb does everything. ปวดหัว, ปวดท้อง, ปวดหลัง: ' +
      'every body part you ever learn plugs straight in, and มาก or นิดหน่อย sets the volume.',
    literal: 'ache + [body part] + (very / a little)',
    exampleIds: ['s.headache', 's.stomachache', 's.toothache', 's.backache-little', 's.headache-very'],
  },
  {
    id: 'p.hurt',
    name: 'เจ็บ + [body part]',
    parts: [{ fixed: ['w.hurt'] }, { slot: 'part' }],
    slots: [{ name: 'part', accepts: { tags: ['body'] } }],
    enTemplate: 'My {part} hurts',
    explanation:
      'Same bare grammar as ปวด, different pain: เจ็บ is sharp and surface-level — a cut finger, a twisted ankle, ' +
      'a sore throat. เจ็บขา after too many stairs, เจ็บไหม "does it hurt?". ' +
      'Pick the verb that matches the pain, name the part, and you\'ve said it like a Thai.',
    literal: 'hurt + [body part]',
    exampleIds: ['s.leg-hurts', 's.hurt-q'],
  },
  {
    id: 'p.pen-sick',
    name: 'เป็น + [sickness]',
    parts: [{ fixed: ['w.be'] }, { slot: 'sickness' }],
    slots: [{ name: 'sickness', accepts: { wordIds: ['w.fever', 'w.what'] } }],
    enTemplate: 'I have {sickness}',
    explanation:
      'Thai uses เป็น — "to be" — for conditions you catch: เป็นไข้ "be fever" = have a fever, ' +
      'and later เป็นหวัด for a cold. Flip in อะไร and you get the all-purpose concern question ' +
      'เป็นอะไร "you are what?" = What\'s wrong? Every new illness word you learn slots into this frame.',
    literal: 'be + [sickness / what]',
    exampleIds: ['s.fever-little', 's.whats-wrong'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u17',
    order: 17,
    title: 'Health & Body',
    subtitle: 'When things hurt',
    emoji: '🩺',
    color: '#b48cff',
    outcome: 'Say exactly what hurts, buy medicine at a Thai pharmacy, and check on a sick friend.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'ปวด vs เจ็บ — two kinds of pain',
        body:
          'Thai splits pain by how it feels. ปวด is the dull, throbbing ache from inside: ปวดหัว headache, ปวดท้อง stomachache, ปวดหลัง backache. ' +
          'เจ็บ is sharp and surface-level: cuts, bruises, sore muscles, เจ็บคอ a sore throat. ' +
          'Pick the verb, add the body part — no "my", no "I have", no "is". The two words ARE the grammar.',
      },
      {
        title: 'Sickness is something you ARE',
        body:
          'For illnesses, Thai reaches for เป็น, the verb "to be": เป็นไข้ = "be fever" = to have a fever. ' +
          'That\'s also why เป็นอะไร — literally "you are what?" — means "What\'s wrong?". ' +
          'Answer with your condition (เป็นไข้) or wave it off with ไม่เป็นไร: "I am nothing" — no worries.',
      },
      {
        title: 'You "eat" medicine',
        body:
          'Thai has no separate verb for taking medicine — you eat it: กินยา. ' +
          'The pharmacy is ร้านขายยา, literally "shop-sell-medicine", three words you already know glued together. ' +
          'Thai pharmacists diagnose small ailments on the spot, so ปวดหัว + กินยา may save you a clinic visit.',
      },
    ],
    dialogues: [
      {
        id: 'd.u17-pharmacy',
        title: 'At the pharmacy',
        scene: 'Ken (♂) walks into a ร้านขายยา (pharmacy) in Chiang Mai. The pharmacist (♀) looks up.',
        lines: [
          { speaker: 'Ken', sentenceId: 's.request-med-m' },
          { speaker: 'Pharmacist', sentenceId: 's.whats-wrong' },
          { speaker: 'Ken', sentenceId: 's.headache-very' },
          { speaker: 'Ken', sentenceId: 's.fever-little' },
          { speaker: 'Pharmacist', sentenceId: 's.med-every-day' },
          { speaker: 'Ken', sentenceId: 's.how-much-m' },
          { speaker: 'Pharmacist', sentenceId: 's.fifty-baht-f' },
        ],
      },
      {
        id: 'd.u17-sick-friend',
        title: 'Checking on a sick friend',
        scene: 'Mali calls Nut, who didn\'t show up for lunch.',
        lines: [
          { speaker: 'Mali', sentenceId: 's.whats-wrong' },
          { speaker: 'Nut', sentenceId: 's.sick-today' },
          { speaker: 'Nut', sentenceId: 's.stomachache' },
          { speaker: 'Mali', sentenceId: 's.go-hospital-q' },
          { speaker: 'Nut', sentenceId: 's.want-rest' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
