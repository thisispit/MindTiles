import type { Stats, AppSettings, GameSession } from '../types';

const STATS_KEY = 'mindtiles_stats';
const SETTINGS_KEY = 'mindtiles_settings';

export const defaultStats: Stats = {
  gamesPlayed: 0,
  wins: 0,
  streak: 0,
  bestStreak: 0,
  bestTimeSeconds: null,
  totalTimeSeconds: 0,
  totalMoves: 0,
  totalAccuracy: 0,
  sessions: [],
};

export const defaultSettings: AppSettings = {
  soundEnabled: true,
  animationsEnabled: true,
  theme: 'nature',
  colorScheme: 'dark',
};

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { ...defaultStats };
    return { ...defaultStats, ...JSON.parse(raw) };
  } catch {
    return { ...defaultStats };
  }
}

export function saveStats(stats: Stats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    console.warn('Failed to save stats to localStorage');
  }
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...defaultSettings };
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    console.warn('Failed to save settings to localStorage');
  }
}

export function recordSession(session: GameSession, currentStats: Stats): Stats {
  const sessions = [session, ...currentStats.sessions].slice(0, 50);
  const wins = session.won ? currentStats.wins + 1 : currentStats.wins;
  const streak = session.won ? currentStats.streak + 1 : 0;
  const bestStreak = Math.max(streak, currentStats.bestStreak);

  const bestTimeSeconds =
    session.won
      ? currentStats.bestTimeSeconds === null
        ? session.timeSeconds
        : Math.min(currentStats.bestTimeSeconds, session.timeSeconds)
      : currentStats.bestTimeSeconds;

  const gamesPlayed = currentStats.gamesPlayed + 1;
  const totalAccuracy =
    (currentStats.totalAccuracy * currentStats.gamesPlayed + session.accuracy) / gamesPlayed;

  return {
    gamesPlayed,
    wins,
    streak,
    bestStreak,
    bestTimeSeconds,
    totalTimeSeconds: currentStats.totalTimeSeconds + session.timeSeconds,
    totalMoves: currentStats.totalMoves + session.moves,
    totalAccuracy,
    sessions,
  };
}

export function clearStats(): void {
  localStorage.removeItem(STATS_KEY);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function computeAccuracy(moves: number, pairs: number): number {
  if (moves === 0) return 100;
  return Math.max(0, Math.round((pairs / moves) * 100));
}

export function computeMemoryScore(stats: Stats): number {
  if (stats.gamesPlayed === 0) return 0;
  const winRate = stats.wins / stats.gamesPlayed;
  const avgAccuracy = stats.totalAccuracy / 100;
  const streakBonus = Math.min(stats.bestStreak * 5, 25);
  return Math.round(winRate * 50 + avgAccuracy * 25 + streakBonus);
}
