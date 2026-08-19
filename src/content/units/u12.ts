/**
 * Unit 12 — Likes & Hobbies. ชอบมาก!
 * The third flagship generative frame: ชอบ + verb (+ thing) turns every
 * activity you learn into small talk, invitations, and friendships.
 */
import type { UnitModule } from '../index'
import type { Pattern, Sentence, Word } from '../schema'

const words: Word[] = [
  {
    id: 'w.like', thai: 'ชอบ', roman: 'chɔ̂ɔp', en: 'like', enAlt: ['to like', 'enjoy', 'love'],
    syllables: [{ thai: 'ชอบ', roman: 'chɔɔp', tone: 'falling' }],
    pos: 'verb', emoji: '❤️', tags: ['core'],
    note: 'Takes a verb OR a noun directly: ชอบดูหนัง = like watching movies, ชอบกาแฟ = like coffee. No "to", no "-ing" — ever.',
  },
  {
    id: 'w.play', thai: 'เล่น', roman: 'lên', en: 'play', enAlt: ['to play'],
    syllables: [{ thai: 'เล่น', roman: 'len', tone: 'falling' }],
    pos: 'verb', emoji: '🤹', tags: ['core', 'action', 'activity'],
    note: 'Games, sports, instruments, even social media — Thais เล่น all of it: เล่นเกม, เล่นบอล, เล่นเฟซบุ๊ก. The all-purpose fun verb.',
  },
  {
    id: 'w.watch', thai: 'ดู', roman: 'duu', en: 'watch', enAlt: ['to watch', 'look at', 'look'],
    syllables: [{ thai: 'ดู', roman: 'duu', tone: 'mid' }],
    pos: 'verb', emoji: '👀', tags: ['core', 'action', 'activity'],
    note: 'Watch or look at anything: ดูหนัง movies, ดูบอล the match. Tacked after a verb it means "give it a try" — ลองดู!',
  },
  {
    id: 'w.movie', thai: 'หนัง', roman: 'nǎng', en: 'movie', enAlt: ['film', 'movies'],
    syllables: [{ thai: 'หนัง', roman: 'nang', tone: 'rising' }],
    pos: 'noun', emoji: '🎬', tags: ['core', 'object'],
    note: 'Literally "leather" — from the old shadow-puppet theater (หนังตะลุง) with its leather figures on a lit screen. Cinema kept the name.',
  },
  {
    id: 'w.listen', thai: 'ฟัง', roman: 'fang', en: 'listen', enAlt: ['to listen', 'hear'],
    syllables: [{ thai: 'ฟัง', roman: 'fang', tone: 'mid' }],
    pos: 'verb', emoji: '👂', tags: ['core', 'action', 'activity'],
    note: 'ฟังเพลง = listen to music, the number-one Thai pastime. ฟังนะ = "listen up!" between friends.',
  },
  {
    id: 'w.music', thai: 'เพลง', roman: 'pleeng', en: 'music', enAlt: ['song', 'songs'],
    syllables: [{ thai: 'เพลง', roman: 'pleeng', tone: 'mid' }],
    pos: 'noun', emoji: '🎵', tags: ['core', 'object'],
    note: 'Really means "song" — เพลงไทย Thai songs, เพลงนี้ this track. For music in general, Thais just say ฟังเพลง.',
  },
  {
    id: 'w.read', thai: 'อ่าน', roman: 'àan', en: 'read', enAlt: ['to read'],
    syllables: [{ thai: 'อ่าน', roman: 'aan', tone: 'low' }],
    pos: 'verb', emoji: '📖', tags: ['core', 'action', 'activity'],
    note: 'อ่านหนังสือ (read + book) also means "to study" — a student cramming for exams is "reading books" all night.',
  },
  {
    id: 'w.book', thai: 'หนังสือ', roman: 'nǎng-sɯ̌ɯ', en: 'book', enAlt: ['books'],
    syllables: [
      { thai: 'หนัง', roman: 'nang', tone: 'rising' },
      { thai: 'สือ', roman: 'sɯɯ', tone: 'rising' },
    ],
    pos: 'noun', emoji: '📚', tags: ['core', 'object'],
    note: 'Two rising tones in a row — a nice melody drill. Starts with the same หนัง as "movie", but the compound means book.',
  },
  {
    id: 'w.travel', thai: 'เที่ยว', roman: 'tîao', en: 'travel', enAlt: ['go out', 'hang out', 'take a trip'],
    syllables: [{ thai: 'เที่ยว', roman: 'tiao', tone: 'falling' }],
    pos: 'verb', emoji: '🏝️', tags: ['core', 'action', 'activity'],
    note: 'Much broader than English "travel": ไปเที่ยว is going ANYWHERE for fun — the beach, the mall, a night market, a friend\'s place.',
  },
  {
    id: 'w.game', thai: 'เกม', roman: 'geem', en: 'game', enAlt: ['games', 'video game'],
    syllables: [{ thai: 'เกม', roman: 'geem', tone: 'mid' }],
    pos: 'noun', emoji: '🎮', tags: ['object'],
    note: 'Borrowed from English. เล่นเกม = gaming, huge in Thailand — internet cafés full of teenagers are a national institution.',
  },
  {
    id: 'w.football', thai: 'บอล', roman: 'bɔɔn', en: 'football', enAlt: ['soccer', 'ball', 'the match'],
    syllables: [{ thai: 'บอล', roman: 'bɔɔn', tone: 'mid' }],
    pos: 'noun', emoji: '⚽', tags: ['object'],
    note: 'Short for ฟุตบอล. ดูบอล = watch the match — English Premier League runs deep here; half the country supports Liverpool or Man U.',
  },
  {
    id: 'w.sing', thai: 'ร้องเพลง', roman: 'rɔ́ɔng-pleeng', en: 'sing', enAlt: ['to sing', 'sing a song'],
    syllables: [
      { thai: 'ร้อง', roman: 'rɔɔng', tone: 'high' },
      { thai: 'เพลง', roman: 'pleeng', tone: 'mid' },
    ],
    pos: 'verb', emoji: '🎤', tags: ['action', 'activity'],
    note: 'Literally "cry out + song". Karaoke is serious social glue in Thailand — being invited to sing means you\'re in the group.',
  },
  {
    id: 'w.take-photo', thai: 'ถ่ายรูป', roman: 'tàai-rûup', en: 'take photos', enAlt: ['take a picture', 'photograph'],
    syllables: [
      { thai: 'ถ่าย', roman: 'taai', tone: 'low' },
      { thai: 'รูป', roman: 'ruup', tone: 'falling' },
    ],
    pos: 'verb', emoji: '📸', tags: ['action', 'activity'],
    note: 'ถ่าย capture + รูป picture. Thais photograph everything — especially the food before anyone may touch it.',
  },
  {
    id: 'w.likewise', thai: 'เหมือนกัน', roman: 'mɯ̌an-gan', en: 'too / same here', enAlt: ['likewise', 'me too', 'same'],
    syllables: [
      { thai: 'เหมือน', roman: 'mɯan', tone: 'rising' },
      { thai: 'กัน', roman: 'gan', tone: 'mid' },
    ],
    pos: 'adv', emoji: '🤝', tags: ['core', 'standalone'],
    note: 'Literally "same together" — tack it on the end: ชอบเหมือนกัน = "I like it too". Same กัน as in เจอกัน.',
  },
  {
    id: 'w.the-most', thai: 'ที่สุด', roman: 'tîi-sùt', en: 'the most', enAlt: ['most', 'most of all'],
    syllables: [
      { thai: 'ที่', roman: 'tii', tone: 'falling' },
      { thai: 'สุด', roman: 'sut', tone: 'low' },
    ],
    pos: 'adv', emoji: '🥇', tags: ['core'],
    note: 'The superlative, always at the end: ชอบ...ที่สุด = like ... the most, อร่อยที่สุด = the tastiest. สุด alone means "utmost".',
  },
]

const sentences: Sentence[] = [
  {
    id: 's.like-watch-movie-f', wordIds: ['w.i-f', 'w.like', 'w.watch', 'w.movie', 'w.very'],
    en: 'I really like watching movies. (female speaker)', enAlt: ['i love watching movies'],
    literal: 'I♀ | like | watch | movie | very', patternId: 'p.like-verb', tags: ['hobby'],
  },
  {
    id: 's.i-like-read-book', wordIds: ['w.i-m', 'w.like', 'w.read', 'w.book'],
    en: 'I like reading. (male speaker)', enAlt: ['i like reading books', 'i like to read'],
    literal: 'I♂ | like | read | book', patternId: 'p.like-verb', tags: ['hobby'],
  },
  {
    id: 's.i-like-play-game-m', wordIds: ['w.i-m', 'w.like', 'w.play', 'w.game'],
    en: 'I like playing games. (male speaker)', enAlt: ['i like gaming'],
    literal: 'I♂ | like | play | game', patternId: 'p.like-verb', tags: ['hobby'],
  },
  {
    id: 's.like-travel-q', wordIds: ['w.you', 'w.like', 'w.travel', 'w.q-mai'],
    en: 'Do you like traveling?', enAlt: ['do you like to travel?', 'do you like going out?'],
    literal: 'you | like | travel | ?', patternId: 'p.like-q', tags: ['hobby', 'question'],
  },
  {
    id: 's.like-music-q-m', wordIds: ['w.like', 'w.listen', 'w.music', 'w.q-mai', 'w.polite-m'],
    en: 'Do you like listening to music? (male speaker)', enAlt: ['do you like music?'],
    literal: 'like | listen | music | ? | ♂-polite', patternId: 'p.like-q', tags: ['hobby', 'question'],
  },
  {
    id: 's.like-very', wordIds: ['w.like', 'w.very'],
    en: 'I love it!', enAlt: ['i really like it', 'i like it a lot', 'love it'],
    literal: 'like | very', tags: ['hobby'],
  },
  {
    id: 's.like-too', wordIds: ['w.like', 'w.likewise'],
    en: 'I like it too.', enAlt: ['me too', 'same here', 'likewise'],
    literal: 'like | same-too', tags: ['hobby'],
  },
  {
    id: 's.like-sing-most-f', wordIds: ['w.i-f', 'w.like', 'w.sing', 'w.the-most'],
    en: 'I like singing the most. (female speaker)', enAlt: ['singing is my favorite'],
    literal: 'I♀ | like | sing | the-most', patternId: 'p.like-most', tags: ['hobby'],
  },
  {
    id: 's.i-like-photo-m', wordIds: ['w.i-m', 'w.like', 'w.take-photo', 'w.the-most'],
    en: 'I like taking photos the most. (male speaker)', enAlt: ['photography is my favorite'],
    literal: 'I♂ | like | take-photo | the-most', patternId: 'p.like-most', tags: ['hobby'],
  },
  {
    id: 's.not-like-watch-movie-m', wordIds: ['w.i-m', 'w.not', 'w.like', 'w.watch', 'w.movie'],
    en: "I don't like watching movies. (male speaker)", enAlt: ["i don't like movies"],
    literal: 'I♂ | not | like | watch | movie', tags: ['hobby'],
  },
  {
    id: 's.tomorrow-watch-movie-q', wordIds: ['w.tomorrow', 'w.watch', 'w.movie', 'w.q-mai'],
    en: 'Want to see a movie tomorrow?', enAlt: ['movie tomorrow?', 'shall we watch a movie tomorrow?'],
    literal: 'tomorrow | watch | movie | ?', tags: ['question'],
  },
  {
    id: 's.tomorrow-play-game-q', wordIds: ['w.tomorrow', 'w.play', 'w.game', 'w.q-mai'],
    en: 'Play games tomorrow?', enAlt: ['want to game tomorrow?', 'shall we play games tomorrow?'],
    literal: 'tomorrow | play | game | ?', tags: ['question'],
  },
  {
    id: 's.like-game-too-f', wordIds: ['w.i-f', 'w.like', 'w.play', 'w.game', 'w.likewise'],
    en: 'I like playing games too! (female speaker)', enAlt: ['i also like gaming'],
    literal: 'I♀ | like | play | game | same-too', tags: ['hobby'],
  },
  {
    id: 's.watch-football-q', wordIds: ['w.watch', 'w.football', 'w.q-mai'],
    en: 'Wanna watch the match?', enAlt: ['want to watch football?', 'watch the game?'],
    literal: 'watch | football | ?', tags: ['question'],
  },
]

const patterns: Pattern[] = [
  {
    id: 'p.like-verb',
    name: 'ชอบ___ (like to ___)',
    parts: [{ slot: 'subject' }, { fixed: ['w.like'] }, { slot: 'verb' }, { slot: 'object' }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that', 'w.this-one'] }, optional: true },
      { name: 'verb', accepts: { tags: ['action', 'activity'], exclude: ['w.like', 'w.want'] } },
      { name: 'object', accepts: { tags: ['object', 'food', 'drink', 'place'] }, optional: true },
    ],
    enTemplate: '{subject} like to {verb} {object}',
    explanation:
      'ชอบ works exactly like อยาก: it bolts straight onto a verb — no "to", no "-ing", no endings. ' +
      'ชอบดูหนัง = "like watch movie" = I like watching movies. ' +
      'Every activity verb times every thing you know multiplies this frame, and swapping in ไม่ชอบ flips it to a dislike. ' +
      'This is the pattern friendships are built on: say what you love, then ask it back with ไหม.',
    literal: '[who] + ชอบ + [verb] + [thing]',
    exampleIds: ['s.like-watch-movie-f', 's.i-like-read-book', 's.i-like-play-game-m'],
  },
  {
    id: 'p.like-q',
    name: 'ชอบ___ไหม (do you like ___?)',
    parts: [{ fixed: ['w.like'] }, { slot: 'thing' }, { fixed: ['w.q-mai'] }],
    slots: [
      { name: 'thing', accepts: { tags: ['action', 'activity', 'object', 'food', 'drink', 'place'], exclude: ['w.like', 'w.want'] } },
    ],
    enTemplate: 'Do you like {thing}?',
    explanation:
      'Thais get to know you with a volley of ชอบ...ไหม questions: like spicy food? like Thailand? like football? ' +
      'Drop any activity or any noun in the middle — no "do", no word-order gymnastics. ' +
      'Answer with the verb itself, never "yes": ชอบ (love it), ชอบมาก (love it a lot), ไม่ชอบ (not for me). ' +
      'One frame in, one word out — instant small talk.',
    literal: 'ชอบ + [thing] + ไหม',
    exampleIds: ['s.like-travel-q', 's.like-music-q-m'],
  },
  {
    id: 'p.like-most',
    name: 'ชอบ___ที่สุด (like ___ the most)',
    parts: [{ slot: 'subject' }, { fixed: ['w.like'] }, { slot: 'thing' }, { fixed: ['w.the-most'] }],
    slots: [
      { name: 'subject', accepts: { pos: ['pronoun'], exclude: ['w.this', 'w.that', 'w.this-one'] }, optional: true },
      { name: 'thing', accepts: { tags: ['action', 'activity', 'object', 'food', 'drink', 'place'], exclude: ['w.like', 'w.want'] } },
    ],
    enTemplate: '{subject} like {thing} the most',
    explanation:
      'ที่สุด caps off a phrase to make it the superlative — always at the very end, where English puts "the most". ' +
      'ชอบร้องเพลงที่สุด = singing is my absolute favorite. ' +
      'It works far beyond ชอบ: later you can say อร่อยที่สุด (the tastiest) or แพงที่สุด (the priciest) with zero new grammar.',
    literal: '[who] + ชอบ + [thing] + ที่สุด',
    exampleIds: ['s.like-sing-most-f', 's.i-like-photo-m'],
  },
]

const unitModule: UnitModule = {
  unit: {
    id: 'u12',
    order: 12,
    title: 'Likes & Hobbies',
    subtitle: 'chɔ̂ɔp mâak!',
    emoji: '🎧',
    color: '#2ee6a8',
    outcome: 'Share what you love doing, ask anyone about their hobbies, and turn small talk into weekend plans.',
    wordIds: words.map((w) => w.id),
    patternIds: patterns.map((p) => p.id),
    sentenceIds: sentences.map((s) => s.id),
    grammarNotes: [
      {
        title: 'Verbs stack — no "to", no "-ing"',
        body:
          'Thai chains verbs directly: ชอบดูหนัง is literally "like watch movie". ' +
          'Where English needs "like TO watch" or "like watchING", Thai just lines the verbs up and lets order do the work. ' +
          'This is the same trick as อยากกิน and ไปเที่ยว — one habit, used everywhere in the language.',
      },
      {
        title: 'Answer with the word, not with "yes"',
        body:
          'ชอบไหม? has no "yes/no" answer — you echo the key word: ชอบ (I do), ไม่ชอบ (I don\'t), ชอบมาก (love it). ' +
          'To agree with someone, add เหมือนกัน: ชอบเหมือนกัน = "I like it too". ' +
          'Echoing the verb is how Thai answers EVERY yes/no question — master it here and you\'ll never sound like a textbook.',
      },
      {
        title: 'ที่สุด: instant superlatives',
        body:
          'There are no word changes like good/better/best. Put ที่สุด after any phrase and it becomes the top of the list: ' +
          'ชอบเพลงนี้ที่สุด = I like this song the most. ' +
          'Thai grammar keeps handing you these free upgrades: one particle, attached at the end, and a whole new meaning unlocks.',
      },
    ],
    dialogues: [
      {
        id: 'd.u12-hobby-talk',
        title: 'Getting to know you',
        scene: 'Ton (♂) and Fon (♀) just met at a language exchange night in Bangkok.',
        lines: [
          { speaker: 'Ton', sentenceId: 's.like-music-q-m' },
          { speaker: 'Fon', sentenceId: 's.like-very' },
          { speaker: 'Fon', sentenceId: 's.like-sing-most-f' },
          { speaker: 'Ton', sentenceId: 's.i-like-photo-m' },
          { speaker: 'Fon', sentenceId: 's.like-travel-q' },
          { speaker: 'Ton', sentenceId: 's.like-too' },
        ],
      },
      {
        id: 'd.u12-weekend',
        title: 'Movie or games?',
        scene: 'Mai (♀) wants plans for tomorrow. Nat (♂) has a counter-offer.',
        lines: [
          { speaker: 'Mai', sentenceId: 's.tomorrow-watch-movie-q' },
          { speaker: 'Nat', sentenceId: 's.not-like-watch-movie-m' },
          { speaker: 'Nat', sentenceId: 's.i-like-play-game-m' },
          { speaker: 'Nat', sentenceId: 's.tomorrow-play-game-q' },
          { speaker: 'Mai', sentenceId: 's.like-game-too-f' },
        ],
      },
    ],
  },
  words,
  sentences,
  patterns,
}

export default unitModule
