/**
 * Minimal pairs for ear training.
 *
 * Fluent Forever: train your ears on the contrasts that actually change
 * meaning in Thai — tone, vowel length, and aspiration/voicing — using
 * real, high-frequency words. Romanizations are Paiboon-style with tone marks.
 */
import type { MinimalPair } from "../schema"

export const minimalPairs: MinimalPair[] = [
  // ───────────────────────────── Tone contrasts ─────────────────────────────
  {
    id: "mp.maa-come-horse",
    contrast: "tone",
    a: { thai: "มา", roman: "maa", tone: "mid", en: "come", emoji: "🚶" },
    b: { thai: "ม้า", roman: "máa", tone: "high", en: "horse", emoji: "🐴" },
    note: "The classic Thai triplet, part 1: flat mid tone vs a high tone that jumps up. Same maa, totally different word.",
  },
  {
    id: "mp.maa-horse-dog",
    contrast: "tone",
    a: { thai: "ม้า", roman: "máa", tone: "high", en: "horse", emoji: "🐴" },
    b: { thai: "หมา", roman: "mǎa", tone: "rising", en: "dog", emoji: "🐶" },
    note: "Part 2: high stays up; rising dips first then swoops up like a question ('maa?'). Mix these up and your horse becomes a dog.",
  },
  {
    id: "mp.maa-come-dog",
    contrast: "tone",
    a: { thai: "มา", roman: "maa", tone: "mid", en: "come", emoji: "🚶" },
    b: { thai: "หมา", roman: "mǎa", tone: "rising", en: "dog", emoji: "🐶" },
    note: "Part 3: หมามา 'the dog comes' uses both. The silent ห in หมา is what forces the rising tone.",
  },
  {
    id: "mp.kaao-white-news",
    contrast: "tone",
    a: { thai: "ขาว", roman: "kǎao", tone: "rising", en: "white", emoji: "⚪" },
    b: { thai: "ข่าว", roman: "kàao", tone: "low", en: "news", emoji: "📰" },
    note: "Rising swoops up; low sits flat at the bottom of your voice. One tiny mark (่) is the only spelling difference.",
  },
  {
    id: "mp.kaao-news-rice",
    contrast: "tone",
    a: { thai: "ข่าว", roman: "kàao", tone: "low", en: "news", emoji: "📰" },
    b: { thai: "ข้าว", roman: "kâao", tone: "falling", en: "rice", emoji: "🍚" },
    note: "You will say ข้าว 'rice' every day in Thailand — falling tone drops from high to low, like calling out 'Hey!'. Low tone stays down flat.",
  },
  {
    id: "mp.glai-near-far",
    contrast: "tone",
    a: { thai: "ใกล้", roman: "glâi", tone: "falling", en: "near", emoji: "📍" },
    b: { thai: "ไกล", roman: "glai", tone: "mid", en: "far", emoji: "🌄" },
    note: "The most famous trap in Thai: 'near' and 'far' differ ONLY by tone. Get this wrong in a taxi and you go the opposite distance.",
  },
  {
    id: "mp.suea-tiger-shirt",
    contrast: "tone",
    a: { thai: "เสือ", roman: "sɯ̌a", tone: "rising", en: "tiger", emoji: "🐯" },
    b: { thai: "เสื้อ", roman: "sɯ̂a", tone: "falling", en: "shirt", emoji: "👕" },
    note: "Rising tiger, falling shirt. Thais joke about tourists 'wearing a tiger' — the tone is the whole difference.",
  },
  {
    id: "mp.mai-new-burn",
    contrast: "tone",
    a: { thai: "ใหม่", roman: "mài", tone: "low", en: "new", emoji: "✨" },
    b: { thai: "ไหม้", roman: "mâi", tone: "falling", en: "burn", emoji: "🔥" },
    note: "From the tongue-twister mái mài mâi mâi mǎi ('new wood doesn't burn, does it?'). Low = flat bottom; falling = drops sharply.",
  },
  {
    id: "mp.paa-forest-aunt",
    contrast: "tone",
    a: { thai: "ป่า", roman: "bpàa", tone: "low", en: "forest", emoji: "🌲" },
    b: { thai: "ป้า", roman: "bpâa", tone: "falling", en: "aunt", emoji: "👩‍🦳" },
    note: "ป้า 'auntie' is also how you address older women at markets — say it falling, or you're talking about the woods.",
  },
  {
    id: "mp.yaa-medicine-grandma",
    contrast: "tone",
    a: { thai: "ยา", roman: "yaa", tone: "mid", en: "medicine", emoji: "💊" },
    b: { thai: "ย่า", roman: "yâa", tone: "falling", en: "grandma (dad's side)", emoji: "👵" },
    note: "Flat mid vs falling. Bonus: หญ้า 'grass' is ALSO yâa falling — context saves you there, but tone separates these two.",
  },
  {
    id: "mp.kao-he-knee",
    contrast: "tone",
    a: { thai: "เขา", roman: "kǎo", tone: "rising", en: "he, she", emoji: "🧑" },
    b: { thai: "เข่า", roman: "kào", tone: "low", en: "knee", emoji: "🦵" },
    note: "The everyday pronoun 'he/she' rises; the body part sits low. (In fast casual speech เขา often flattens, but learn the rising form.)",
  },

  // ─────────────────────────── Vowel-length contrasts ───────────────────────
  {
    id: "mp.fan-dream-slice",
    contrast: "vowel-length",
    a: { thai: "ฝัน", roman: "fǎn", tone: "rising", en: "dream", emoji: "💭" },
    b: { thai: "ฝาน", roman: "fǎan", tone: "rising", en: "slice thinly", emoji: "🔪" },
    note: "Same rising tone, same consonants — only the vowel stretches. Short a is a quick tap; long aa lasts about twice as long.",
  },
  {
    id: "mp.kao-he-white",
    contrast: "vowel-length",
    a: { thai: "เขา", roman: "kǎo", tone: "rising", en: "he, she", emoji: "🧑" },
    b: { thai: "ขาว", roman: "kǎao", tone: "rising", en: "white", emoji: "⚪" },
    note: "Both rise — the only difference is short ao vs long aao. Hold the long one noticeably longer; Thai ears count the milliseconds.",
  },
  {
    id: "mp.hat-practice-beach",
    contrast: "vowel-length",
    a: { thai: "หัด", roman: "hàt", tone: "low", en: "practice", emoji: "🏋️" },
    b: { thai: "หาด", roman: "hàat", tone: "low", en: "beach", emoji: "🏖️" },
    note: "Identical low tone, identical consonants. hàt is clipped; hàat lingers. Vowel length is a full-fledged meaning switch in Thai.",
  },
  {
    id: "mp.rak-love-root",
    contrast: "vowel-length",
    a: { thai: "รัก", roman: "rák", tone: "high", en: "love", emoji: "❤️" },
    b: { thai: "ราก", roman: "râak", tone: "falling", en: "root", emoji: "🌱" },
    note: "Length changes the tone too: for low-class consonants, a short dead syllable is high (rák) but a long dead one is falling (râak). Two clues to listen for at once.",
  },

  // ─────────────────────── Aspiration / consonant contrasts ─────────────────
  {
    id: "mp.bpaa-throw-lead",
    contrast: "consonant",
    a: { thai: "ปา", roman: "bpaa", tone: "mid", en: "throw", emoji: "🥏" },
    b: { thai: "พา", roman: "paa", tone: "mid", en: "lead, take (someone)", emoji: "🧑‍🤝‍🧑" },
    note: "bp is the unaspirated sound between English b and p — no puff of air. p in พา has a strong puff. Hold a tissue to your lips: it should only move for พา.",
  },
  {
    id: "mp.dtaa-eye-apply",
    contrast: "consonant",
    a: { thai: "ตา", roman: "dtaa", tone: "mid", en: "eye", emoji: "👁️" },
    b: { thai: "ทา", roman: "taa", tone: "mid", en: "apply, smear", emoji: "🖌️" },
    note: "dt = unaspirated (like the t in 'stop'); t = aspirated (like 'top'). ตา also means maternal grandpa — worth pronouncing right.",
  },
  {
    id: "mp.gai-kai",
    contrast: "consonant",
    a: { thai: "ไก่", roman: "gài", tone: "low", en: "chicken", emoji: "🐔" },
    b: { thai: "ไข่", roman: "kài", tone: "low", en: "egg", emoji: "🥚" },
    note: "Which came first? Same low tone, so only the initial decides: g is hard with no air puff, k comes with a burst. Order ไข่ไก่ 'chicken egg' to drill both.",
  },
  {
    id: "mp.bai-bpai",
    contrast: "consonant",
    a: { thai: "ใบ", roman: "bai", tone: "mid", en: "leaf", emoji: "🍃" },
    b: { thai: "ไป", roman: "bpai", tone: "mid", en: "go", emoji: "🚶" },
    note: "Thai splits what English hears as one b/p zone into three: b (voiced), bp (unaspirated), p (aspirated). This pair trains b vs bp.",
  },
  {
    id: "mp.dii-dtii",
    contrast: "consonant",
    a: { thai: "ดี", roman: "dii", tone: "mid", en: "good", emoji: "👍" },
    b: { thai: "ตี", roman: "dtii", tone: "mid", en: "hit", emoji: "👊" },
    note: "d (voiced, vocal cords buzzing) vs dt (unaspirated, no buzz). Saying 'hit' when you mean 'good' changes the mood fast.",
  },
]
