# 🇺🇦 Ukrainian Flashcards App

A modern, gamified, and highly interactive educational web application designed to help users learn Ukrainian vocabulary effectively. Built with **React**, **TypeScript**, and **Vite**.

## ✨ Key Features

- **🎯 Gamified Learning**: A vibrant, Duolingo-inspired UI with smooth animations and tactile feedback.
- **🎴 3D Flashcards**: Study mode with realistic 3D flip animations to reveal English translations.
- **🧩 Interactive Quizzes**: Test your knowledge with Multiple Choice and Fill-in-the-blank quiz types.
- **📉 Progress Tracking**: A detailed Statistics dashboard to monitor your accuracy and total cards answered across different categories.
- **🔄 Smart Redo**: Automatically queue cards you've missed for targeted practice later.
- **📱 Responsive Design**: Fully optimized for both desktop and mobile learning.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to see the app.

### Testing

Run the Playwright E2E tests:
```bash
npm run test:e2e
```

## 🛠️ Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS (CSS Modules)
- **Icons**: Emoji-based category representation
- **Testing**: Playwright

## 📂 Project Structure

- `src/data/`: Vocabulary datasets and categories.
- `src/components/`: Reusable UI components (Flashcards, Study Session).
- `src/pages/`: Main application views (Home, Stats, Quiz, etc.).
- `src/context/`: State management for user progress.
- `e2e/`: End-to-end testing suite.
