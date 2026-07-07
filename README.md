# MindTiles

> **Sharpen your memory. One match at a time.**

A premium memory card game built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Designed to feel like a polished SaaS product — calm, elegant, and purposeful.

---

## Features

- 🎴 **4 Difficulty Levels** — Focus (4×4), Recall (6×6), Master (8×8), Legend (10×10)
- 🎨 **9 Card Themes** — Nature, Space, Technology, Ocean, Architecture, Animals, Food, Minimal, Abstract
- 🔄 **Smooth 3D Card Flip** — CSS perspective + Framer Motion animations
- 📊 **Journey Stats** — Games played, wins, streak, accuracy, memory score (localStorage)
- 🔊 **Procedural Audio** — Web Audio API flip, match, and victory sounds
- 🎉 **Confetti Win Modal** — Glassmorphism overlay with session stats
- ✨ **Micro-interactions** — Stagger animations, hover effects, page transitions

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — build tooling
- **Tailwind CSS 3** — utility styling
- **Framer Motion** — animations
- **Lucide React** — icons
- **canvas-confetti** — win celebration
- **localStorage** — persistent stats

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── components/       # CardSymbol, Logo, ParticleBackground
├── context/          # AppContext (global state)
├── data/             # Game configs, themes, symbol sets
├── hooks/            # useGame, useTimer, useSound
├── pages/            # Home, Game, Challenge, Journey, Studio
├── types/            # TypeScript interfaces
└── utils/            # localStorage, formatting, scoring
```

---

Built with ❤️ using React + Vite
