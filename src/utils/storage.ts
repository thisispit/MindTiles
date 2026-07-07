import type { Stats, AppSettings, GameSession } from '../types';

const STATS_KEY    = 'mindtiles_stats';
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
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch {}
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
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
}

export function recordSession(session: GameSession, current: Stats): Stats {
  const sessions  = [session, ...current.sessions].slice(0, 50);
  const wins      = session.won ? current.wins + 1 : current.wins;
  const streak    = session.won ? current.streak + 1 : 0;
  const bestStreak = Math.max(streak, current.bestStreak);
  const bestTimeSeconds =
    session.won
      ? current.bestTimeSeconds === null
        ? session.timeSeconds
        : Math.min(current.bestTimeSeconds, session.timeSeconds)
      : current.bestTimeSeconds;
  const gamesPlayed = current.gamesPlayed + 1;
  const totalAccuracy = (current.totalAccuracy * current.gamesPlayed + session.accuracy) / gamesPlayed;

  return {
    gamesPlayed,
    wins,
    streak,
    bestStreak,
    bestTimeSeconds,
    totalTimeSeconds: current.totalTimeSeconds + session.timeSeconds,
    totalMoves: current.totalMoves + session.moves,
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
  const winRate    = stats.wins / stats.gamesPlayed;
  const avgAcc     = stats.totalAccuracy / 100;
  const streakBonus = Math.min(stats.bestStreak * 5, 25);
  return Math.round(winRate * 50 + avgAcc * 25 + streakBonus);
}
