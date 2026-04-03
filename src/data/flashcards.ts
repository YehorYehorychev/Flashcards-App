export type Category =
  | 'animals'
  | 'food'
  | 'verbs'
  | 'colors'
  | 'family'
  | 'numbers'
  | 'greetings'
  | 'places'
  | 'weather'

export type Quiz =
  | {
      type: 'multiple-choice'
      options: [string, string, string, string]
    }
  | {
      type: 'fill-in-the-blank'
    }

export type Flashcard = {
  id: string
  category: Category
  ukranian: string
  english: string
  quiz: Quiz
  xp?: number
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'animals', label: 'Animals', icon: '🐶' },
  { id: 'food', label: 'Food', icon: '🍎' },
  { id: 'verbs', label: 'Verbs', icon: '🏃' },
  { id: 'colors', label: 'Colors', icon: '🎨' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'numbers', label: 'Numbers', icon: '🔢' },
  { id: 'greetings', label: 'Greetings', icon: '👋' },
  { id: 'places', label: 'Places', icon: '📍' },
  { id: 'weather', label: 'Weather', icon: '☀️' },
]

export const flashcards: Flashcard[] = [
  // --- ANIMALS ---
  {
    id: 'animals-kot',
    category: 'animals',
    ukranian: 'кіт',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the bird', 'the fish'],
    },
    xp: 10,
  },
  {
    id: 'animals-sobaka',
    category: 'animals',
    ukranian: 'собака',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the horse', 'the dog', 'the cow', 'the rabbit'],
    },
    xp: 10,
  },
  {
    id: 'animals-ptah',
    category: 'animals',
    ukranian: 'птах',
    english: 'the bird',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'animals-kin',
    category: 'animals',
    ukranian: 'кінь',
    english: 'the horse',
    quiz: {
      type: 'multiple-choice',
      options: ['the horse', 'the cow', 'the pig', 'the sheep'],
    },
    xp: 10,
  },
  {
    id: 'animals-ryba',
    category: 'animals',
    ukranian: 'риба',
    english: 'the fish',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'animals-vedmid',
    category: 'animals',
    ukranian: 'ведмідь',
    english: 'the bear',
    quiz: {
      type: 'multiple-choice',
      options: ['the bear', 'the wolf', 'the fox', 'the rabbit'],
    },
    xp: 10,
  },
  {
    id: 'animals-vovk',
    category: 'animals',
    ukranian: 'вовк',
    english: 'the wolf',
    quiz: {
      type: 'multiple-choice',
      options: ['the wolf', 'the bear', 'the fox', 'the deer'],
    },
    xp: 10,
  },
  {
    id: 'animals-lysycya',
    category: 'animals',
    ukranian: 'лисиця',
    english: 'the fox',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'animals-zayets',
    category: 'animals',
    ukranian: 'заєць',
    english: 'the rabbit',
    quiz: {
      type: 'multiple-choice',
      options: ['the rabbit', 'the squirrel', 'the mouse', 'the rat'],
    },
    xp: 10,
  },

  // --- FOOD ---
  {
    id: 'food-hlib',
    category: 'food',
    ukranian: 'хліб',
    english: 'bread',
    quiz: {
      type: 'multiple-choice',
      options: ['milk', 'bread', 'cheese', 'water'],
    },
    xp: 10,
  },
  {
    id: 'food-moloko',
    category: 'food',
    ukranian: 'молоко',
    english: 'milk',
    quiz: {
      type: 'multiple-choice',
      options: ['milk', 'tea', 'coffee', 'juice'],
    },
    xp: 10,
  },
  {
    id: 'food-yabluko',
    category: 'food',
    ukranian: 'яблуко',
    english: 'apple',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'food-voda',
    category: 'food',
    ukranian: 'вода',
    english: 'water',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 10,
  },
  {
    id: 'food-syr',
    category: 'food',
    ukranian: 'сир',
    english: 'cheese',
    quiz: {
      type: 'multiple-choice',
      options: ['cheese', 'butter', 'yogurt', 'egg'],
    },
    xp: 10,
  },
  {
    id: 'food-yaytse',
    category: 'food',
    ukranian: 'яйце',
    english: 'egg',
    quiz: {
      type: 'multiple-choice',
      options: ['egg', 'meat', 'bread', 'salt'],
    },
    xp: 10,
  },
  {
    id: 'food-myaso',
    category: 'food',
    ukranian: 'м\'ясо',
    english: 'meat',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'food-sil',
    category: 'food',
    ukranian: 'сіль',
    english: 'salt',
    quiz: {
      type: 'multiple-choice',
      options: ['salt', 'sugar', 'pepper', 'oil'],
    },
    xp: 10,
  },
  {
    id: 'food-tsukor',
    category: 'food',
    ukranian: 'цукор',
    english: 'sugar',
    quiz: {
      type: 'multiple-choice',
      options: ['sugar', 'salt', 'honey', 'flour'],
    },
    xp: 10,
  },

  // --- VERBS ---
  {
    id: 'verbs-chytaty',
    category: 'verbs',
    ukranian: 'читати',
    english: 'to read',
    quiz: {
      type: 'multiple-choice',
      options: ['to write', 'to read', 'to run', 'to speak'],
    },
    xp: 10,
  },
  {
    id: 'verbs-pysaty',
    category: 'verbs',
    ukranian: 'писати',
    english: 'to write',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'verbs-idty',
    category: 'verbs',
    ukranian: 'йти',
    english: 'to go',
    quiz: {
      type: 'multiple-choice',
      options: ['to go', 'to stay', 'to sit', 'to stand'],
    },
    xp: 10,
  },
  {
    id: 'verbs-spaty',
    category: 'verbs',
    ukranian: 'спати',
    english: 'to sleep',
    quiz: {
      type: 'multiple-choice',
      options: ['to sleep', 'to wake up', 'to dream', 'to rest'],
    },
    xp: 10,
  },
  {
    id: 'verbs-isty',
    category: 'verbs',
    ukranian: 'їсти',
    english: 'to eat',
    quiz: {
      type: 'multiple-choice',
      options: ['to eat', 'to drink', 'to cook', 'to taste'],
    },
    xp: 10,
  },
  {
    id: 'verbs-pyty',
    category: 'verbs',
    ukranian: 'пити',
    english: 'to drink',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'verbs-bachyty',
    category: 'verbs',
    ukranian: 'бачити',
    english: 'to see',
    quiz: {
      type: 'multiple-choice',
      options: ['to see', 'to hear', 'to touch', 'to smell'],
    },
    xp: 10,
  },
  {
    id: 'verbs-chuty',
    category: 'verbs',
    ukranian: 'чути',
    english: 'to hear',
    quiz: {
      type: 'multiple-choice',
      options: ['to hear', 'to listen', 'to speak', 'to shout'],
    },
    xp: 10,
  },

  // --- COLORS ---
  {
    id: 'colors-bilyy',
    category: 'colors',
    ukranian: 'білий',
    english: 'white',
    quiz: {
      type: 'multiple-choice',
      options: ['white', 'black', 'red', 'green'],
    },
    xp: 10,
  },
  {
    id: 'colors-chornyy',
    category: 'colors',
    ukranian: 'чорний',
    english: 'black',
    quiz: {
      type: 'multiple-choice',
      options: ['black', 'white', 'grey', 'brown'],
    },
    xp: 10,
  },
  {
    id: 'colors-chervonyy',
    category: 'colors',
    ukranian: 'червоний',
    english: 'red',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'colors-syniy',
    category: 'colors',
    ukranian: 'синій',
    english: 'blue',
    quiz: {
      type: 'multiple-choice',
      options: ['blue', 'green', 'yellow', 'purple'],
    },
    xp: 10,
  },
  {
    id: 'colors-zelenyy',
    category: 'colors',
    ukranian: 'зелений',
    english: 'green',
    quiz: {
      type: 'multiple-choice',
      options: ['green', 'orange', 'pink', 'brown'],
    },
    xp: 10,
  },
  {
    id: 'colors-zhovtyy',
    category: 'colors',
    ukranian: 'жовтий',
    english: 'yellow',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },

  // --- FAMILY ---
  {
    id: 'family-mama',
    category: 'family',
    ukranian: 'мама',
    english: 'mother',
    quiz: {
      type: 'multiple-choice',
      options: ['mother', 'father', 'sister', 'brother'],
    },
    xp: 10,
  },
  {
    id: 'family-tato',
    category: 'family',
    ukranian: 'тато',
    english: 'father',
    quiz: {
      type: 'multiple-choice',
      options: ['father', 'grandfather', 'uncle', 'son'],
    },
    xp: 10,
  },
  {
    id: 'family-brat',
    category: 'family',
    ukranian: 'брат',
    english: 'brother',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'family-sestra',
    category: 'family',
    ukranian: 'сестра',
    english: 'sister',
    quiz: {
      type: 'multiple-choice',
      options: ['sister', 'aunt', 'cousin', 'daughter'],
    },
    xp: 10,
  },
  {
    id: 'family-babysya',
    category: 'family',
    ukranian: 'бабуся',
    english: 'grandmother',
    quiz: {
      type: 'multiple-choice',
      options: ['grandmother', 'mother', 'aunt', 'wife'],
    },
    xp: 10,
  },
  {
    id: 'family-didus',
    category: 'family',
    ukranian: 'дідусь',
    english: 'grandfather',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'family-syn',
    category: 'family',
    ukranian: 'син',
    english: 'son',
    quiz: {
      type: 'multiple-choice',
      options: ['son', 'daughter', 'child', 'baby'],
    },
    xp: 10,
  },
  {
    id: 'family-donka',
    category: 'family',
    ukranian: 'донька',
    english: 'daughter',
    quiz: {
      type: 'multiple-choice',
      options: ['daughter', 'niece', 'mother', 'sister'],
    },
    xp: 10,
  },

  // --- NUMBERS ---
  {
    id: 'numbers-odyn',
    category: 'numbers',
    ukranian: 'один',
    english: 'one',
    quiz: {
      type: 'multiple-choice',
      options: ['one', 'two', 'three', 'four'],
    },
    xp: 10,
  },
  {
    id: 'numbers-dva',
    category: 'numbers',
    ukranian: 'два',
    english: 'two',
    quiz: {
      type: 'multiple-choice',
      options: ['two', 'three', 'five', 'six'],
    },
    xp: 10,
  },
  {
    id: 'numbers-try',
    category: 'numbers',
    ukranian: 'три',
    english: 'three',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'numbers-chotyry',
    category: 'numbers',
    ukranian: 'чотири',
    english: 'four',
    quiz: {
      type: 'multiple-choice',
      options: ['four', 'five', 'seven', 'eight'],
    },
    xp: 10,
  },
  {
    id: 'numbers-pyat',
    category: 'numbers',
    ukranian: 'п\'ять',
    english: 'five',
    quiz: {
      type: 'multiple-choice',
      options: ['five', 'four', 'nine', 'ten'],
    },
    xp: 10,
  },
  {
    id: 'numbers-shist',
    category: 'numbers',
    ukranian: 'шість',
    english: 'six',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'numbers-sim',
    category: 'numbers',
    ukranian: 'сім',
    english: 'seven',
    quiz: {
      type: 'multiple-choice',
      options: ['seven', 'six', 'eight', 'ten'],
    },
    xp: 10,
  },
  {
    id: 'numbers-visim',
    category: 'numbers',
    ukranian: 'вісім',
    english: 'eight',
    quiz: {
      type: 'multiple-choice',
      options: ['eight', 'nine', 'ten', 'zero'],
    },
    xp: 10,
  },
  {
    id: 'numbers-devyat',
    category: 'numbers',
    ukranian: 'дев\'ять',
    english: 'nine',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'numbers-desyat',
    category: 'numbers',
    ukranian: 'десять',
    english: 'ten',
    quiz: {
      type: 'multiple-choice',
      options: ['ten', 'hundred', 'thousand', 'million'],
    },
    xp: 10,
  },

  // --- GREETINGS ---
  {
    id: 'greetings-pryvit',
    category: 'greetings',
    ukranian: 'привіт',
    english: 'hello',
    quiz: {
      type: 'multiple-choice',
      options: ['hello', 'goodbye', 'please', 'thanks'],
    },
    xp: 10,
  },
  {
    id: 'greetings-dobryy-den',
    category: 'greetings',
    ukranian: 'добрий день',
    english: 'good day',
    quiz: {
      type: 'multiple-choice',
      options: ['good day', 'good morning', 'good evening', 'good night'],
    },
    xp: 10,
  },
  {
    id: 'greetings-dyakuyu',
    category: 'greetings',
    ukranian: 'дякую',
    english: 'thank you',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'greetings-bud-laska',
    category: 'greetings',
    ukranian: 'будь ласка',
    english: 'please',
    quiz: {
      type: 'multiple-choice',
      options: ['please', 'you are welcome', 'excuse me', 'sorry'],
    },
    xp: 10,
  },
  {
    id: 'greetings-vubachte',
    category: 'greetings',
    ukranian: 'вибачте',
    english: 'excuse me',
    quiz: {
      type: 'multiple-choice',
      options: ['excuse me', 'hello', 'how are you', 'what is your name'],
    },
    xp: 10,
  },
  {
    id: 'greetings-yak-spravy',
    category: 'greetings',
    ukranian: 'як справи',
    english: 'how are you',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'greetings-do-pobachennya',
    category: 'greetings',
    ukranian: 'до побачення',
    english: 'goodbye',
    quiz: {
      type: 'multiple-choice',
      options: ['goodbye', 'see you later', 'good night', 'have a nice day'],
    },
    xp: 10,
  },

  // --- PLACES ---
  {
    id: 'places-dim',
    category: 'places',
    ukranian: 'дім',
    english: 'house',
    quiz: {
      type: 'multiple-choice',
      options: ['house', 'apartment', 'room', 'garden'],
    },
    xp: 10,
  },
  {
    id: 'places-misto',
    category: 'places',
    ukranian: 'місто',
    english: 'city',
    quiz: {
      type: 'multiple-choice',
      options: ['city', 'village', 'country', 'world'],
    },
    xp: 10,
  },
  {
    id: 'places-vulytsya',
    category: 'places',
    ukranian: 'вулиця',
    english: 'street',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'places-shkola',
    category: 'places',
    ukranian: 'школа',
    english: 'school',
    quiz: {
      type: 'multiple-choice',
      options: ['school', 'university', 'library', 'office'],
    },
    xp: 10,
  },
  {
    id: 'places-park',
    category: 'places',
    ukranian: 'парк',
    english: 'park',
    quiz: {
      type: 'multiple-choice',
      options: ['park', 'forest', 'lake', 'mountain'],
    },
    xp: 10,
  },
  {
    id: 'places-likarnya',
    category: 'places',
    ukranian: 'лікарня',
    english: 'hospital',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'places-mahazyn',
    category: 'places',
    ukranian: 'магазин',
    english: 'shop',
    quiz: {
      type: 'multiple-choice',
      options: ['shop', 'market', 'bank', 'restaurant'],
    },
    xp: 10,
  },

  // --- WEATHER ---
  {
    id: 'weather-sontse',
    category: 'weather',
    ukranian: 'сонце',
    english: 'sun',
    quiz: {
      type: 'multiple-choice',
      options: ['sun', 'moon', 'star', 'sky'],
    },
    xp: 10,
  },
  {
    id: 'weather-doshch',
    category: 'weather',
    ukranian: 'дощ',
    english: 'rain',
    quiz: {
      type: 'multiple-choice',
      options: ['rain', 'snow', 'wind', 'storm'],
    },
    xp: 10,
  },
  {
    id: 'weather-snih',
    category: 'weather',
    ukranian: 'сніг',
    english: 'snow',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
  {
    id: 'weather-viter',
    category: 'weather',
    ukranian: 'вітер',
    english: 'wind',
    quiz: {
      type: 'multiple-choice',
      options: ['wind', 'cloud', 'fog', 'ice'],
    },
    xp: 10,
  },
  {
    id: 'weather-teplo',
    category: 'weather',
    ukranian: 'тепло',
    english: 'warm',
    quiz: {
      type: 'multiple-choice',
      options: ['warm', 'hot', 'cold', 'cool'],
    },
    xp: 10,
  },
  {
    id: 'weather-kholodno',
    category: 'weather',
    ukranian: 'холодно',
    english: 'cold',
    quiz: {
      type: 'fill-in-the-blank',
    },
    xp: 15,
  },
]

export function flashcardsByCategory(category: Category): Flashcard[] {
  return flashcards.filter((c) => c.category === category)
}

