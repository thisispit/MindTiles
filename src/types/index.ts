// Core type definitions for MindTiles

export type Page = 'home' | 'game' | 'challenge' | 'journey' | 'settings';

export type Difficulty = 'focus' | 'recall' | 'master' | 'legend';

export interface CardData {
  id: string;
  pairId: string;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameConfig {
  difficulty: Difficulty;
  gridSize: number;
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
}
