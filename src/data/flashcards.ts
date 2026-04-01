export type Category = 'animals' | 'food' | 'verbs'

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
}

export const categories: { id: Category; label: string }[] = [
  { id: 'animals', label: 'Animals' },
  { id: 'food', label: 'Food' },
  { id: 'verbs', label: 'Verbs' },
]

export const flashcards: Flashcard[] = [
  {
    id: 'animals-kot',
    category: 'animals',
    ukranian: 'кіт',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the bird', 'the fish'],
    },
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
  },
  {
    id: 'animals-ptah',
    category: 'animals',
    ukranian: 'птах',
    english: 'the bird',
    quiz: {
      type: 'fill-in-the-blank',
    },
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
  },
  {
    id: 'animals-svynya',
    category: 'animals',
    ukranian: 'свиня',
    english: 'the pig',
    quiz: {
      type: 'multiple-choice',
      options: ['the pig', 'the dog', 'the chicken', 'the cat'],
    },
  },
  {
    id: 'animals-ryba',
    category: 'animals',
    ukranian: 'риба',
    english: 'the fish',
    quiz: {
      type: 'fill-in-the-blank',
    },
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
  },
  {
    id: 'food-hlib',
    category: 'food',
    ukranian: 'хліб',
    english: 'bread',
    quiz: {
      type: 'multiple-choice',
      options: ['milk', 'bread', 'cheese', 'water'],
    },
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
  },
  {
    id: 'food-yabluko',
    category: 'food',
    ukranian: 'яблуко',
    english: 'apple',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
  {
    id: 'food-myaso',
    category: 'food',
    ukranian: 'м\'ясо',
    english: 'meat',
    quiz: {
      type: 'multiple-choice',
      options: ['meat', 'bread', 'apple', 'fish'],
    },
  },
  {
    id: 'food-syr',
    category: 'food',
    ukranian: 'сир',
    english: 'cheese',
    quiz: {
      type: 'multiple-choice',
      options: ['cheese', 'milk', 'water', 'tea'],
    },
  },
  {
    id: 'food-voda',
    category: 'food',
    ukranian: 'вода',
    english: 'water',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
  {
    id: 'food-chay',
    category: 'food',
    ukranian: 'чай',
    english: 'tea',
    quiz: {
      type: 'multiple-choice',
      options: ['tea', 'coffee', 'juice', 'milk'],
    },
  },
  {
    id: 'food-kava',
    category: 'food',
    ukranian: 'кава',
    english: 'coffee',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
  {
    id: 'food-sik',
    category: 'food',
    ukranian: 'сік',
    english: 'juice',
    quiz: {
      type: 'multiple-choice',
      options: ['juice', 'water', 'tea', 'milk'],
    },
  },
  {
    id: 'verbs-chytaty',
    category: 'verbs',
    ukranian: 'читати',
    english: 'to read',
    quiz: {
      type: 'multiple-choice',
      options: ['to write', 'to read', 'to run', 'to speak'],
    },
  },
  {
    id: 'verbs-tydty',
    category: 'verbs',
    ukranian: 'йти',
    english: 'to go',
    quiz: {
      type: 'multiple-choice',
      options: ['to go', 'to eat', 'to sleep', 'to think'],
    },
  },
  {
    id: 'verbs-govoryty',
    category: 'verbs',
    ukranian: 'говорити',
    english: 'to speak',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
]

export function flashcardsByCategory(category: Category): Flashcard[] {
  return flashcards.filter((c) => c.category === category)
}

