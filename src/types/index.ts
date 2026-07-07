// Core type definitions for MindTiles

export type Page = 'home' | 'game' | 'challenge' | 'journey' | 'studio';

export type Difficulty = 'focus' | 'recall' | 'master' | 'legend';

export type CardTheme =
  | 'nature'
  | 'space'
  | 'technology'
  | 'ocean'
  | 'architecture'
  | 'animals'
  | 'food'
  | 'minimal'
  | 'abstract';

export interface CardData {
  id: string;
  pairId: string;
  symbol: string; // SVG component name
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameConfig {
  difficulty: Difficulty;
  theme: CardTheme;
  gridSize: number; // 4 | 6 | 8 | 10
}

export interface GameSession {
  id: string;
  date: string;
  difficulty: Difficulty;
  moves: number;
  timeSeconds: number;
  won: boolean;
  accuracy: number;
}

export interface Stats {
  gamesPlayed: number;
  wins: number;
  streak: number;
  bestStreak: number;
  bestTimeSeconds: number | null;
  totalTimeSeconds: number;
  totalMoves: number;
  totalAccuracy: number;
  sessions: GameSession[];
}

export interface AppSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  theme: CardTheme;
  colorScheme: 'dark'; // only dark for now
}

export interface AppState {
  currentPage: Page;
  gameConfig: GameConfig;
  settings: AppSettings;
  stats: Stats;
}
