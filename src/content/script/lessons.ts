/**
 * Thai script reading course — 12 lessons from zero to reading street signs.
 *
 * Sequencing philosophy (Fluent Forever): mid-class consonants first (the
 * smallest, most regular family), then long vowels so real syllables appear
 * immediately, then the other two consonant families, tone marks, and finally
 * the "special effects" (silent ห, clusters, hidden vowels). Every reading
 * drill uses ONLY characters taught in that lesson or earlier — the learner
 * can always genuinely read every drill.
 *
 * Romanization is Paiboon-style with tone diacritics (matching alphabet.ts).
 */
import type { ScriptLesson } from "../schema"

export const scriptLessons: ScriptLesson[] = [
  // ──────────────────────────── sc01 · mid class ─────────────────────────────
  {
    id: "sc01",
    order: 1,
    title: "Your First Letters",
    subtitle: "The mid-class seven — Thai's most reliable family",
    emoji: "🐔",
    kind: "consonants",
    newChars: ["ก", "จ", "ด", "ต", "บ", "ป", "อ"],
    intro:
      "Thai consonants come in three families — mid, high, and low class — and the family a letter belongs to helps decide the TONE of every syllable it starts. That sounds scary, but it's actually the key that makes Thai spelling logical instead of random. We start with the mid class: the smallest, best-behaved family, and these seven are its everyday members. Each letter has a nickname (ก is 'gɔɔ gài', the chicken letter) — Thais use these names the way we say 'B as in Banana'. Read alone, a letter says its name with an 'ɔɔ' sound, so you can already read out loud. Watch the look-alikes: บ and ป, ด and ต differ only in a small loop or a taller mast.",
    readingDrills: [
      { thai: "ก", roman: "gɔɔ", tone: "mid", en: "the chicken letter (gɔɔ gài)", emoji: "🐔" },
      { thai: "จ", roman: "jɔɔ", tone: "mid", en: "the plate letter (jɔɔ jaan)", emoji: "🍽️" },
      { thai: "ด", roman: "dɔɔ", tone: "mid", en: "the child letter (dɔɔ dèk)", emoji: "👶" },
      { thai: "ต", roman: "dtɔɔ", tone: "mid", en: "the turtle letter (dtɔɔ dtào)", emoji: "🐢" },
      { thai: "บ", roman: "bɔɔ", tone: "mid", en: "the leaf letter (bɔɔ bai-máai)", emoji: "🍃" },
      { thai: "ป", roman: "bpɔɔ", tone: "mid", en: "the fish letter (bpɔɔ bplaa)", emoji: "🐟" },
      { thai: "อ", roman: "ɔɔ", tone: "mid", en: "the basin letter (ɔɔ àang) — silent as an initial", emoji: "🥣" },
      { thai: "บ ป", roman: "bɔɔ · bpɔɔ", tone: "mid", en: "the twins: the fish (ป) has the taller mast", emoji: "👯" },
      { thai: "ด ต", roman: "dɔɔ · dtɔɔ", tone: "mid", en: "the twins: the turtle (ต) has a spiky head", emoji: "👯" },
    ],
  },

  // ──────────────────────────── sc02 · long vowels ───────────────────────────
  {
    id: "sc02",
    order: 2,
    title: "Long Vowels",
    subtitle: "Seven stretched sounds — and suddenly you read real words",
    emoji: "🌊",
    kind: "vowels",
    newChars: ["v.aa", "v.ii", "v.uu", "v.ee", "v.oo", "v.aae", "v.aaw"],
    intro:
      "Vowels in Thai are not letters that sit politely in a row — they orbit the consonant: after it (า), above it (ี), below it (ู), or even in FRONT of it (เ, โ, แ), though you always say the consonant first. These seven are the long vowels, held for a full beat, like singing the note instead of tapping it. Combine them with your mid-class letters and the tone rule is beautifully simple: mid-class consonant + long vowel = flat mid tone, every time. That means everything below is pronounced level, like a robot — resist the English urge to swoop. You are now reading real Thai words: crab, eye, year, good.",
    readingDrills: [
      { thai: "กา", roman: "gaa", tone: "mid", en: "crow", emoji: "🐦" },
      { thai: "ตา", roman: "dtaa", tone: "mid", en: "eye; maternal grandpa", emoji: "👁️" },
      { thai: "อา", roman: "aa", tone: "mid", en: "aunt/uncle (dad's side)", emoji: "👨‍👩‍👧" },
      { thai: "ปา", roman: "bpaa", tone: "mid", en: "to throw", emoji: "🤾" },
      { thai: "ดี", roman: "dii", tone: "mid", en: "good", emoji: "👍" },
      { thai: "ปี", roman: "bpii", tone: "mid", en: "year", emoji: "📅" },
      { thai: "ตี", roman: "dtii", tone: "mid", en: "to hit", emoji: "👊" },
      { thai: "ปู", roman: "bpuu", tone: "mid", en: "crab", emoji: "🦀" },
      { thai: "ดู", roman: "duu", tone: "mid", en: "to watch, look at", emoji: "👀" },
      { thai: "เจ", roman: "jee", tone: "mid", en: "vegetarian (jee food)", emoji: "🥦" },
      { thai: "โต", roman: "dtoo", tone: "mid", en: "big, grown-up", emoji: "🦒" },
      { thai: "แก", roman: "gɛɛ", tone: "mid", en: "you (very casual)", emoji: "🫵" },
      { thai: "จอ", roman: "jɔɔ", tone: "mid", en: "screen", emoji: "📺" },
      { thai: "ตอ", roman: "dtɔɔ", tone: "mid", en: "tree stump", emoji: "🪵" },
    ],
    toneRules: [
      {
        condition: "Mid class + live syllable (long vowel), no mark",
        tone: "mid",
        example: { thai: "กา", roman: "gaa", en: "crow" },
      },
    ],
  },

  // ──────────────────────────── sc03 · high class ────────────────────────────
  {
    id: "sc03",
    order: 3,
    title: "High Class Hiss",
    subtitle: "Seven breathy letters that make your voice rise",
    emoji: "🐯",
    kind: "consonants",
    newChars: ["ข", "ฉ", "ถ", "ผ", "ฝ", "ส", "ห"],
    intro:
      "Meet the second family: the high class, the breathy, hissy letters — lots of aspiration, lots of air. Their superpower is what they do to tone: a high-class letter starting an open, long-vowel syllable produces a RISING tone, the swoop you use in English for 'really?'. So the same vowels you just learned suddenly sound completely different: ขา 'leg' rises, while กา 'crow' stays flat. That contrast — same vowel, different family, different tone — is the whole engine of Thai spelling. One more secret for later: ห is a quiet schemer with a second job, which we expose in lesson 11.",
    readingDrills: [
      { thai: "ขา", roman: "kǎa", tone: "rising", en: "leg", emoji: "🦵" },
      { thai: "ขอ", roman: "kɔ̌ɔ", tone: "rising", en: "to ask for", emoji: "🙏" },
      { thai: "หา", roman: "hǎa", tone: "rising", en: "to look for", emoji: "🔍" },
      { thai: "หู", roman: "hǔu", tone: "rising", en: "ear", emoji: "👂" },
      { thai: "หอ", roman: "hɔ̌ɔ", tone: "rising", en: "dorm, tower", emoji: "🏢" },
      { thai: "สี", roman: "sǐi", tone: "rising", en: "color", emoji: "🎨" },
      { thai: "ผี", roman: "pǐi", tone: "rising", en: "ghost", emoji: "👻" },
      { thai: "ฝา", roman: "fǎa", tone: "rising", en: "lid", emoji: "🫙" },
      { thai: "ถู", roman: "tǔu", tone: "rising", en: "to scrub", emoji: "🧽" },
      { thai: "โถ", roman: "tǒo", tone: "rising", en: "lidded jar", emoji: "🏺" },
      { thai: "ฉา", roman: "chǎa", tone: "rising" },
    ],
    toneRules: [
      {
        condition: "High class + live syllable, no mark",
        tone: "rising",
        example: { thai: "ขา", roman: "kǎa", en: "leg" },
      },
    ],
  },

  // ──────────────────────────── sc04 · low sonorants ─────────────────────────
  {
    id: "sc04",
    order: 4,
    title: "The Workhorses",
    subtitle: "The low-class sonorants — and your first final consonants",
    emoji: "🐴",
    kind: "consonants",
    newChars: ["ง", "น", "ม", "ร", "ล", "ว", "ย"],
    intro:
      "The third family, the low class, is the biggest — and these seven are its humming, singing core: m, n, ng, r, l, w, y. Alone with a long vowel they behave gently: low class + live syllable = flat mid tone, just like the mid class. Their second job is even more important: these are the letters Thai loves at the END of syllables, where they keep a syllable 'live' (ringing, open-ended) — remember that word, because live vs dead syllables will soon decide tones. That unlocks a burst of real vocabulary: นอน 'sleep', แมว 'cat', ดาว 'star'. Note that ง starts syllables too — the 'ng' of 'singing' with the 'si' chopped off. Practice it: งู, snake.",
    readingDrills: [
      { thai: "มา", roman: "maa", tone: "mid", en: "to come", emoji: "🏃" },
      { thai: "นา", roman: "naa", tone: "mid", en: "rice field", emoji: "🌾" },
      { thai: "รอ", roman: "rɔɔ", tone: "mid", en: "to wait", emoji: "⏳" },
      { thai: "ยา", roman: "yaa", tone: "mid", en: "medicine", emoji: "💊" },
      { thai: "งู", roman: "nguu", tone: "mid", en: "snake", emoji: "🐍" },
      { thai: "ลา", roman: "laa", tone: "mid", en: "donkey; to say goodbye", emoji: "🫏" },
      { thai: "มี", roman: "mii", tone: "mid", en: "to have", emoji: "👜" },
      { thai: "นอน", roman: "nɔɔn", tone: "mid", en: "to sleep", emoji: "😴" },
      { thai: "แมว", roman: "mɛɛo", tone: "mid", en: "cat", emoji: "🐱" },
      { thai: "ดาว", roman: "daao", tone: "mid", en: "star", emoji: "⭐" },
      { thai: "จาน", roman: "jaan", tone: "mid", en: "plate", emoji: "🍽️" },
      { thai: "งาน", roman: "ngaan", tone: "mid", en: "work", emoji: "💼" },
      { thai: "ยาว", roman: "yaao", tone: "mid", en: "long", emoji: "📏" },
    ],
    toneRules: [
      {
        condition: "Low class + live syllable, no mark",
        tone: "mid",
        example: { thai: "มา", roman: "maa", en: "to come" },
      },
    ],
  },

  // ──────────────────────────── sc05 · low obstruents ────────────────────────
  {
    id: "sc05",
    order: 5,
    title: "Low Class Power",
    subtitle: "The heavy hitters: ค ช ท พ ฟ ฮ",
    emoji: "🐘",
    kind: "consonants",
    newChars: ["ค", "ช", "ท", "พ", "ฟ", "ฮ"],
    intro:
      "Here come the low class heavyweights — the aspirated k, ch, t, p, f, h that power everyday words like ชา 'tea' and คอ 'neck'. Notice something sneaky: ค sounds exactly like ข, ท like ถ, พ like ผ, ฮ like ห. Thai keeps both spellings not to torture you, but because the FAMILY carries tone information the sound alone can't: ขา rises, คา doesn't. So when you see a 'k' sound, the letter chosen tells you which tone machine is running. For now they follow the rule you already know — low class + live syllable = mid tone — and every drill below is a real word you can order, point at, or laugh with.",
    readingDrills: [
      { thai: "คอ", roman: "kɔɔ", tone: "mid", en: "neck, throat", emoji: "🧣" },
      { thai: "ชา", roman: "chaa", tone: "mid", en: "tea", emoji: "🍵" },
      { thai: "ทา", roman: "taa", tone: "mid", en: "to apply, smear", emoji: "🖌️" },
      { thai: "พา", roman: "paa", tone: "mid", en: "to take someone along", emoji: "👫" },
      { thai: "เท", roman: "tee", tone: "mid", en: "to pour", emoji: "🫗" },
      { thai: "แพ", roman: "pɛɛ", tone: "mid", en: "raft", emoji: "🛶" },
      { thai: "ชาม", roman: "chaam", tone: "mid", en: "bowl", emoji: "🥣" },
      { thai: "ทาง", roman: "taang", tone: "mid", en: "way, path", emoji: "🛤️" },
      { thai: "ฟอง", roman: "fɔɔng", tone: "mid", en: "bubble; egg classifier", emoji: "🫧" },
      { thai: "คอย", roman: "kɔɔi", tone: "mid", en: "to wait for", emoji: "⌛" },
      { thai: "คาง", roman: "kaang", tone: "mid", en: "chin", emoji: "🧔" },
      { thai: "ฮา", roman: "haa", tone: "mid", en: "hilarious (slang)", emoji: "😂" },
    ],
    toneRules: [
      {
        condition: "Mid class + live syllable, no mark",
        tone: "mid",
        example: { thai: "ดู", roman: "duu", en: "to watch" },
      },
      {
        condition: "High class + live syllable, no mark",
        tone: "rising",
        example: { thai: "หา", roman: "hǎa", en: "to look for" },
      },
      {
        condition: "Low class + live syllable, no mark",
        tone: "mid",
        example: { thai: "ชา", roman: "chaa", en: "tea" },
      },
    ],
  },

  // ──────────────────────────── sc06 · short vowels ──────────────────────────
  {
    id: "sc06",
    order: 6,
    title: "Short & Snappy",
    subtitle: "Short vowels, dead syllables, and their automatic tones",
    emoji: "⚡",
    kind: "vowels",
    newChars: ["v.a", "v.i", "v.ue", "v.u", "v.e", "v.ae", "v.o", "v.aw", "v.oe"],
    intro:
      "Every long vowel has a short twin — clipped, like the difference between 'seen' and 'sin' — and in Thai the length alone changes the word. A syllable that ends in a short vowel stops dead, with a little catch in the throat, so Thai calls it a DEAD syllable — no ringing, no echo. Dead syllables ignore the tones you learned and grab their own: mid or high class goes LOW (จะ jà), while low class snaps HIGH (เยอะ yə́). Feel the physics: a syllable that dies early has no time to swoop, so it slams to the bottom or pops at the top. Watch the spelling too — many short vowels wrap a ะ around the consonant (เตะ, แกะ, เกาะ), a two-piece costume for one sound.",
    readingDrills: [
      { thai: "จะ", roman: "jà", tone: "low", en: "will (future marker)", emoji: "🔮" },
      { thai: "กะ", roman: "gà", tone: "low", en: "work shift; to estimate", emoji: "⏰" },
      { thai: "ดุ", roman: "dù", tone: "low", en: "fierce, strict", emoji: "😠" },
      { thai: "ติ", roman: "dtì", tone: "low", en: "to criticize", emoji: "🗯️" },
      { thai: "อึ", roman: "ɯ̀", tone: "low", en: "poop (kid-speak)", emoji: "💩" },
      { thai: "เตะ", roman: "dtè", tone: "low", en: "to kick", emoji: "⚽" },
      { thai: "แกะ", roman: "gɛ̀", tone: "low", en: "sheep", emoji: "🐑" },
      { thai: "เกาะ", roman: "gɔ̀", tone: "low", en: "island", emoji: "🏝️" },
      { thai: "สิ", roman: "sì", tone: "low", en: "go on! (nudging particle)", emoji: "👉" },
      { thai: "เถอะ", roman: "tə̀", tone: "low", en: "let's (particle)", emoji: "🤙" },
      { thai: "และ", roman: "lɛ́", tone: "high", en: "and", emoji: "➕" },
      { thai: "เละ", roman: "lé", tone: "high", en: "mushy, messy", emoji: "🫠" },
      { thai: "เยอะ", roman: "yə́", tone: "high", en: "a lot", emoji: "💯" },
    ],
    toneRules: [
      {
        condition: "Mid class + dead syllable (short vowel)",
        tone: "low",
        example: { thai: "จะ", roman: "jà", en: "will" },
      },
      {
        condition: "High class + dead syllable (short vowel)",
        tone: "low",
        example: { thai: "สิ", roman: "sì", en: "go on! (particle)" },
      },
      {
        condition: "Low class + dead syllable, short vowel",
        tone: "high",
        example: { thai: "เยอะ", roman: "yə́", en: "a lot" },
      },
    ],
  },

  // ──────────────────────────── sc07 · tone marks I ──────────────────────────
  {
    id: "sc07",
    order: 7,
    title: "Tone Marks I",
    subtitle: "Mai ek (่) and mai tho (้) — the gear shifts, on mid class first",
    emoji: "🎚️",
    kind: "tones",
    newChars: [],
    intro:
      "So far tones happened automatically; now you take the wheel. Thai has four tiny marks that ride above a syllable's first consonant, and the two doing 95% of the work are mai ek (่) and mai tho (้). Think of them as gear shifts: on a mid-class letter, mai ek drops you into LOW gear and mai tho throws you into FALLING — that sharp high-to-low drop, like an emphatic 'No!'. Same letters, same vowels you already know, whole new words: ป่า 'forest', บ้าน 'home', อ่าน 'to read'. One catch we'll meet next lesson: the marks are gear shifts, not absolute labels — what gear you land in depends on which consonant family is driving.",
    readingDrills: [
      { thai: "ป่า", roman: "bpàa", tone: "low", en: "forest", emoji: "🌲" },
      { thai: "ด่า", roman: "dàa", tone: "low", en: "to scold", emoji: "😡" },
      { thai: "แต่", roman: "dtɛ̀ɛ", tone: "low", en: "but", emoji: "↩️" },
      { thai: "ต่อ", roman: "dtɔ̀ɔ", tone: "low", en: "to connect, extend", emoji: "🔗" },
      { thai: "ปู่", roman: "bpùu", tone: "low", en: "paternal grandpa", emoji: "👴" },
      { thai: "ก่อน", roman: "gɔ̀ɔn", tone: "low", en: "before, first", emoji: "⏮️" },
      { thai: "อ่าน", roman: "àan", tone: "low", en: "to read", emoji: "📖" },
      { thai: "จ่าย", roman: "jàai", tone: "low", en: "to pay", emoji: "💸" },
      { thai: "บ้าน", roman: "bâan", tone: "falling", en: "house, home", emoji: "🏠" },
      { thai: "ต้อง", roman: "dtɔ̂ɔng", tone: "falling", en: "must, have to", emoji: "❗" },
      { thai: "ก้อน", roman: "gɔ̂ɔn", tone: "falling", en: "lump, chunk", emoji: "🪨" },
      { thai: "จ้าง", roman: "jâang", tone: "falling", en: "to hire", emoji: "🤝" },
      { thai: "แป้ง", roman: "bpɛ̂ɛng", tone: "falling", en: "flour, powder", emoji: "🧁" },
      { thai: "ด้าย", roman: "dâai", tone: "falling", en: "thread", emoji: "🧵" },
    ],
    toneRules: [
      {
        condition: "Mid class + live syllable, no mark",
        tone: "mid",
        example: { thai: "ดี", roman: "dii", en: "good" },
      },
      {
        condition: "Mid class + mai ek (่)",
        tone: "low",
        example: { thai: "ป่า", roman: "bpàa", en: "forest" },
      },
      {
        condition: "Mid class + mai tho (้)",
        tone: "falling",
        example: { thai: "บ้าน", roman: "bâan", en: "house" },
      },
    ],
  },

  // ──────────────────────────── sc08 · tone marks II ─────────────────────────
  {
    id: "sc08",
    order: 8,
    title: "Tone Marks II",
    subtitle: "The same marks on high and low class — the full gear table",
    emoji: "🎢",
    kind: "tones",
    newChars: [],
    intro:
      "Now the twist that explains why Thai has three consonant families at all: the SAME mark lands on a different tone depending on who's driving. Mai ek on high class gives low tone (ข่าว 'news'), but on low class it gives FALLING (แม่ 'mother'). Mai tho on high class gives falling (ข้าว 'rice'), but on low class it gives HIGH (ม้า 'horse'). Between the classes, marked and unmarked, every one of the five tones is reachable — that's the whole system, and you now hold all of it. The famous triplet says it best: ขาว kǎao 'white', ข่าว kàao 'news', ข้าว kâao 'rice' — one squiggle between a color, a newspaper, and dinner.",
    readingDrills: [
      { thai: "ขาว", roman: "kǎao", tone: "rising", en: "white", emoji: "⚪" },
      { thai: "ข่าว", roman: "kàao", tone: "low", en: "news", emoji: "📰" },
      { thai: "ข้าว", roman: "kâao", tone: "falling", en: "rice", emoji: "🍚" },
      { thai: "ผ้า", roman: "pâa", tone: "falling", en: "cloth, fabric", emoji: "👘" },
      { thai: "ห้อง", roman: "hɔ̂ɔng", tone: "falling", en: "room", emoji: "🚪" },
      { thai: "ค่า", roman: "kâa", tone: "falling", en: "fee, value", emoji: "💰" },
      { thai: "ค้า", roman: "káa", tone: "high", en: "to trade", emoji: "📦" },
      { thai: "ม้า", roman: "máa", tone: "high", en: "horse", emoji: "🐴" },
      { thai: "แม่", roman: "mɛ̂ɛ", tone: "falling", en: "mother", emoji: "👩‍👧" },
      { thai: "พ่อ", roman: "pɔ̂ɔ", tone: "falling", en: "father", emoji: "👨‍👧" },
      { thai: "นี่", roman: "nîi", tone: "falling", en: "this", emoji: "👇" },
      { thai: "ช้าง", roman: "cháang", tone: "high", en: "elephant", emoji: "🐘" },
      { thai: "ร้อน", roman: "rɔ́ɔn", tone: "high", en: "hot", emoji: "🥵" },
      { thai: "น้อง", roman: "nɔ́ɔng", tone: "high", en: "younger sibling", emoji: "👧" },
    ],
    toneRules: [
      {
        condition: "High class + live syllable, no mark",
        tone: "rising",
        example: { thai: "ขาว", roman: "kǎao", en: "white" },
      },
      {
        condition: "High class + mai ek (่)",
        tone: "low",
        example: { thai: "ข่าว", roman: "kàao", en: "news" },
      },
      {
        condition: "High class + mai tho (้)",
        tone: "falling",
        example: { thai: "ข้าว", roman: "kâao", en: "rice" },
      },
      {
        condition: "Low class + live syllable, no mark",
        tone: "mid",
        example: { thai: "มา", roman: "maa", en: "to come" },
      },
      {
        condition: "Low class + mai ek (่)",
        tone: "falling",
        example: { thai: "แม่", roman: "mɛ̂ɛ", en: "mother" },
      },
      {
        condition: "Low class + mai tho (้)",
        tone: "high",
        example: { thai: "ม้า", roman: "máa", en: "horse" },
      },
    ],
  },

  // ──────────────────────────── sc09 · travel vowels ─────────────────────────
  {
    id: "sc09",
    order: 9,
    title: "Travel Vowels",
    subtitle: "ไ ใ เ-า -ำ and the gliding trio เ-ีย เ-ือ -ัว",
    emoji: "✈️",
    kind: "vowels",
    newChars: ["v.ai", "v.ai-m", "v.ao", "v.am", "v.ia", "v.uea", "v.ua"],
    intro:
      "These are the vowels that go places — literally: ไ and ใ jump in FRONT of their consonant, เ-า wraps around it, and -ำ carries a built-in 'm'. The two 'ai' shapes sound identical; ใ (the curly 'mai muan') survives in only twenty words, but they're superstars like ใจ 'heart' and ใหม่ 'new', so you'll meet it constantly. Then come the gliding diphthongs เ-ีย, เ-ือ, -ัว — two vowels melting into one motion: 'ia', 'ɯa', 'ua'. A tip for tones: ไ- ใ- เ-า -ำ end in a glide or an 'm', so they ring — they count as LIVE syllables despite being short. With this lesson you unlock the most-spoken words in the language: ไป 'go', ไม่ 'not', น้ำ 'water', เอา 'want it'.",
    readingDrills: [
      { thai: "ไป", roman: "bpai", tone: "mid", en: "to go", emoji: "🚶" },
      { thai: "ใจ", roman: "jai", tone: "mid", en: "heart, mind", emoji: "💛" },
      { thai: "ไม่", roman: "mâi", tone: "falling", en: "no, not", emoji: "🚫" },
      { thai: "ไข่", roman: "kài", tone: "low", en: "egg", emoji: "🥚" },
      { thai: "เรา", roman: "rao", tone: "mid", en: "we, us", emoji: "👥" },
      { thai: "เอา", roman: "ao", tone: "mid", en: "to take, want", emoji: "🤲" },
      { thai: "เก้า", roman: "gâo", tone: "falling", en: "nine", emoji: "9️⃣" },
      { thai: "น้ำ", roman: "náam", tone: "high", en: "water", emoji: "💧" },
      { thai: "ทำ", roman: "tam", tone: "mid", en: "to do, make", emoji: "🛠️" },
      { thai: "เสือ", roman: "sɯ̌a", tone: "rising", en: "tiger", emoji: "🐯" },
      { thai: "เรือ", roman: "rɯa", tone: "mid", en: "boat", emoji: "🛶" },
      { thai: "ตัว", roman: "dtua", tone: "mid", en: "body; animal classifier", emoji: "🧍" },
      { thai: "วัว", roman: "wua", tone: "mid", en: "cow", emoji: "🐄" },
      { thai: "เมือง", roman: "mɯang", tone: "mid", en: "city, town", emoji: "🏙️" },
    ],
  },

  // ──────────────────────────── sc10 · final stops ───────────────────────────
  {
    id: "sc10",
    order: 10,
    title: "Ends of Words",
    subtitle: "Stop finals -k -t -p, dead syllables, and the hidden ั",
    emoji: "🛑",
    kind: "reading",
    newChars: [],
    intro:
      "Thai syllables can end in only a handful of sounds, and the dramatic ones are the stops: -k, -t, -p — unreleased, like slamming a door on the syllable. A stopped syllable is DEAD, so the dead-tone machine from lesson 6 takes over, with one upgrade: low class splits by vowel length — short snaps HIGH (รัก rák), long slides FALLING (มาก mâak). Watch the spelling trap: at the end of a syllable many letters surrender to one of three sounds, so ท, ด, and even ถ all just say '-t' (บาท 'baht' ends in ท). One new costume: short 'a' inside a closed syllable isn't written ะ — it shrinks to a little hat, ั, as in รัก and กับ. Now you can read 'I love you very much': รัก... มาก!",
    readingDrills: [
      { thai: "มาก", roman: "mâak", tone: "falling", en: "very, a lot", emoji: "📈" },
      { thai: "จาก", roman: "jàak", tone: "low", en: "from", emoji: "🛫" },
      { thai: "ปาก", roman: "bpàak", tone: "low", en: "mouth", emoji: "👄" },
      { thai: "ออก", roman: "ɔ̀ɔk", tone: "low", en: "to go out, exit", emoji: "➡️" },
      { thai: "บาท", roman: "bàat", tone: "low", en: "baht (money)", emoji: "🪙" },
      { thai: "พูด", roman: "pûut", tone: "falling", en: "to speak", emoji: "🗣️" },
      { thai: "ถูก", roman: "tùuk", tone: "low", en: "cheap; correct", emoji: "🏷️" },
      { thai: "ลูก", roman: "lûuk", tone: "falling", en: "child (offspring)", emoji: "👶" },
      { thai: "รัก", roman: "rák", tone: "high", en: "to love", emoji: "❤️" },
      { thai: "กับ", roman: "gàp", tone: "low", en: "with", emoji: "🤝" },
      { thai: "จับ", roman: "jàp", tone: "low", en: "to grab, catch", emoji: "✊" },
      { thai: "นับ", roman: "náp", tone: "high", en: "to count", emoji: "🔢" },
      { thai: "ดิบ", roman: "dìp", tone: "low", en: "raw", emoji: "🥩" },
      { thai: "สิบ", roman: "sìp", tone: "low", en: "ten", emoji: "🔟" },
    ],
    toneRules: [
      {
        condition: "Mid class + dead syllable (stop final)",
        tone: "low",
        example: { thai: "จาก", roman: "jàak", en: "from" },
      },
      {
        condition: "High class + dead syllable (stop final)",
        tone: "low",
        example: { thai: "สิบ", roman: "sìp", en: "ten" },
      },
      {
        condition: "Low class + dead syllable, short vowel",
        tone: "high",
        example: { thai: "รัก", roman: "rák", en: "to love" },
      },
      {
        condition: "Low class + dead syllable, long vowel",
        tone: "falling",
        example: { thai: "มาก", roman: "mâak", en: "very" },
      },
    ],
  },

  // ──────────────────────────── sc11 · ห นำ & clusters ───────────────────────
  {
    id: "sc11",
    order: 11,
    title: "Silent Partners & Clusters",
    subtitle: "The invisible ห and consonants that travel in pairs",
    emoji: "🤫",
    kind: "reading",
    newChars: [],
    intro:
      "Remember ห's secret second job? Written before a low-class sonorant (ม น ง ล ย ว ร), it goes completely SILENT — its only purpose is to lend that letter high-class tone rules. That's how มา 'come' (mid tone) becomes หมา 'dog' (rising): the ห is a silent partner co-signing the tone. Second trick: true clusters, where กล- กร- ปล- คร- are pronounced together in one syllable, and the FIRST letter's class rules the tone of the pair. This lesson pays off the most famous tone trap in Thai — ไกล 'far' vs ใกล้ 'near' — and finally lets you read the word you've been saying since day one: ครับ.",
    readingDrills: [
      { thai: "หมา", roman: "mǎa", tone: "rising", en: "dog", emoji: "🐶" },
      { thai: "หมู", roman: "mǔu", tone: "rising", en: "pig, pork", emoji: "🐷" },
      { thai: "หนู", roman: "nǔu", tone: "rising", en: "mouse; I (young girl)", emoji: "🐭" },
      { thai: "หน้า", roman: "nâa", tone: "falling", en: "face; page; front", emoji: "🙂" },
      { thai: "ใหม่", roman: "mài", tone: "low", en: "new", emoji: "✨" },
      { thai: "ไหม", roman: "mǎi", tone: "rising", en: "question particle", emoji: "❓" },
      { thai: "หลาย", roman: "lǎai", tone: "rising", en: "many, several", emoji: "🧮" },
      { thai: "ปลา", roman: "bplaa", tone: "mid", en: "fish", emoji: "🐟" },
      { thai: "ครู", roman: "kruu", tone: "mid", en: "teacher", emoji: "🧑‍🏫" },
      { thai: "ไกล", roman: "glai", tone: "mid", en: "far", emoji: "🌄" },
      { thai: "ใกล้", roman: "glâi", tone: "falling", en: "near", emoji: "📍" },
      { thai: "กลัว", roman: "glua", tone: "mid", en: "afraid", emoji: "😨" },
      { thai: "ปลูก", roman: "bplùuk", tone: "low", en: "to plant, grow", emoji: "🌱" },
      { thai: "ครับ", roman: "kráp", tone: "high", en: "polite particle (men)", emoji: "🙏" },
    ],
    toneRules: [
      {
        condition: "Silent ห + low sonorant, live syllable, no mark",
        tone: "rising",
        example: { thai: "หมา", roman: "mǎa", en: "dog" },
      },
      {
        condition: "Silent ห + low sonorant + mai ek (่)",
        tone: "low",
        example: { thai: "ใหม่", roman: "mài", en: "new" },
      },
      {
        condition: "Silent ห + low sonorant + mai tho (้)",
        tone: "falling",
        example: { thai: "หน้า", roman: "nâa", en: "face" },
      },
    ],
  },

  // ──────────────────────────── sc12 · the payoff ────────────────────────────
  {
    id: "sc12",
    order: 12,
    title: "Read the Streets",
    subtitle: "Menus, signs, and the words you already speak",
    emoji: "🛵",
    kind: "reading",
    newChars: [],
    intro:
      "This is the payoff: every word below is something you'd actually see on a menu board, a shopfront, or a train station in Thailand — and you can now decode all of them, syllable by syllable. Two last quirks to spot in the wild: some words hide an unwritten vowel (รถ is r + hidden 'o' = rót; ตลาด hides an 'a' and borrows the ต's class for its second syllable: dtà-làat), and ก๋วยเตี๋ยว wears the rare fourth tone mark ๋ (mai jattawa), which forces a rising tone. ขอบคุณ sneaks in ณ, a rare twin of น, and ผัดไทย spells the country's name with a decorative ย. Don't rush — read each syllable with its tone, then hear the word you've been SAYING for weeks appear out of the squiggles. That moment is why you learned to read.",
    readingDrills: [
      { thai: "สวัสดี", roman: "sà-wàt-dii", tone: "mid", en: "hello", emoji: "👋" },
      { thai: "ขอบคุณ", roman: "kɔ̀ɔp-kun", tone: "mid", en: "thank you", emoji: "🙏" },
      { thai: "กาแฟ", roman: "gaa-fɛɛ", tone: "mid", en: "coffee", emoji: "☕" },
      { thai: "ส้มตำ", roman: "sôm-dtam", tone: "mid", en: "papaya salad", emoji: "🥗" },
      { thai: "ผัดไทย", roman: "pàt-tai", tone: "mid", en: "pad thai", emoji: "🍜" },
      { thai: "ข้าวผัด", roman: "kâao-pàt", tone: "low", en: "fried rice", emoji: "🍛" },
      { thai: "ไก่ย่าง", roman: "gài-yâang", tone: "falling", en: "grilled chicken", emoji: "🍗" },
      { thai: "หมูปิ้ง", roman: "mǔu-bpîng", tone: "falling", en: "grilled pork skewers", emoji: "🍢" },
      { thai: "ก๋วยเตี๋ยว", roman: "gǔai-dtǐao", tone: "rising", en: "noodle soup", emoji: "🥢" },
      { thai: "ตลาด", roman: "dtà-làat", tone: "low", en: "market", emoji: "🛒" },
      { thai: "ห้องน้ำ", roman: "hɔ̂ɔng-náam", tone: "high", en: "bathroom", emoji: "🚻" },
      { thai: "ทางออก", roman: "taang-ɔ̀ɔk", tone: "low", en: "exit", emoji: "🚪" },
      { thai: "โรงแรม", roman: "roong-rɛɛm", tone: "mid", en: "hotel", emoji: "🏨" },
      { thai: "รถไฟฟ้า", roman: "rót-fai-fáa", tone: "high", en: "skytrain (BTS)", emoji: "🚝" },
    ],
  },
]
