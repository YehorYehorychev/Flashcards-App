# Ukranian Flashcards Web App — Software Specification

## Overview

A premium, gamified Ukrainian-English flashcard learning application inspired by platforms like **Duolingo**. Built using **Vite**, **React**, and **TypeScript**, the app focuses on helping users reach basic fluency through a rich vocabulary (1000+ words), smooth animations, and engagement-building gamification.

---

## Tech Stack

- **Frontend Framework:** React (with Vite + TypeScript)
- **Data Storage:** Static JSON/TypeScript files
- **Animations:** Framer Motion or optimized CSS Transitions (for "Duolingo-style" fluidity)
- **State Management:** React Context / Zustand for progress tracking
- **Styling:** CSS Modules with a premium design system (custom tokens)
- **Persistence:** localStorage for Streaks, XP, and stats

---

## Features

### 1. Flashcard Study Mode
- **Duolingo-style Transitions:** Smooth, responsive card sliding and flipping.
- **Micro-interactions:** Delightful feedback on correct/incorrect answers.
- **Progressive Disclosure:** Options appear only when relevant (e.g., after flip).

### 2. Gamification & Engagement
- **Streaks:** Daily usage tracking to build learning habits.
- **XP/Points:** Gain points for completing sessions and getting correct answers.
- **Progress Bars:** Visual indication of session progress at the top of the screen.
- **Leveling:** Basic rank/level system based on total XP.

### 3. Vocabulary (The "1000 Word" Goal)
- Extensive library of 1000+ words across diverse categories:
  - Animals, Food, Verbs, Colors, Family, Travel, Business, etc.
- Smart distractors for Multiple-Choice quizzes.

### 4. Quiz Mode
- **Multiple Choice:** 1 word, 4 options.
- **Fill in the Blank:** Text input with case-insensitive validation.
- **Matching Pairs:** (Future) Match Ukrainian and English words in a grid.

### 5. Advanced Statistics Page
- Modern data visualization for:
  - Accuracy Trends
  - Cumulative XP
  - Category Mastery percentage

---

## UI Pages / Components

### 1. Home / Dashboard
- **Streak Overview:** Visible goal/habit tracker.
- **XP Counter:** Total points earned.
- **Category Grid:** Cards for different topics with progress indicators.

### 2. Study/Quiz Session
- **Progress Header:** Progress bar and session escape button.
- **The Flashcard:** Core learning component with premium animations.
- **Feedback Overlay:** Quick modal/overlay after each question (correct/wrong).

### 3. Statistics Page
- Detailed breakdown of learning history.

---

## Data Format Example

### Card JSON
```ts
{
  id: "animals-kot",
  category: "animals",
  ukranian: "кіт",
  english: "the cat",
  quiz: {
    type: "multiple-choice",
    options: ["the dog", "the house", "the cat", "the bird"]
  },
  xp: 10 // XP awarded for mastering this card
}
```

## Out of Scope
- No user accounts or cloud backend (all local).
- No social features or leaderboards (initially).
- No audio pronunciations (initially).