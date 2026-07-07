import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { Page, GameConfig, AppSettings, Stats } from '../types';
import { loadStats, loadSettings, saveStats, saveSettings, defaultStats } from '../utils/storage';

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  currentPage: Page;
  gameConfig: GameConfig;
  settings: AppSettings;
  stats: Stats;
}

const initialState: AppState = {
  currentPage: 'home',
  gameConfig: {
    difficulty: 'focus',
    gridSize: 4,
  },
  settings: loadSettings(),
  stats: loadStats(),
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'NAVIGATE'; page: Page }
  | { type: 'SET_GAME_CONFIG'; config: Partial<GameConfig> }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<AppSettings> }
  | { type: 'UPDATE_STATS'; stats: Stats }
  | { type: 'RESET_STATS' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentPage: action.page };

    case 'SET_GAME_CONFIG':
      return { ...state, gameConfig: { ...state.gameConfig, ...action.config } };

    case 'UPDATE_SETTINGS': {
      const newSettings = { ...state.settings, ...action.settings };
      saveSettings(newSettings);
      return { ...state, settings: newSettings };
    }

    case 'UPDATE_STATS': {
      saveStats(action.stats);
      return { ...state, stats: action.stats };
    }

    case 'RESET_STATS': {
      saveStats(defaultStats);
      return { ...state, stats: { ...defaultStats } };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  navigate: (page: Page) => void;
  setGameConfig: (config: Partial<GameConfig>) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateStats: (stats: Stats) => void;
  resetStats: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate     = useCallback((page: Page) => dispatch({ type: 'NAVIGATE', page }), []);
  const setGameConfig = useCallback((config: Partial<GameConfig>) => dispatch({ type: 'SET_GAME_CONFIG', config }), []);
  const updateSettings = useCallback((settings: Partial<AppSettings>) => dispatch({ type: 'UPDATE_SETTINGS', settings }), []);
  const updateStats  = useCallback((stats: Stats) => dispatch({ type: 'UPDATE_STATS', stats }), []);
  const resetStats   = useCallback(() => dispatch({ type: 'RESET_STATS' }), []);

  return (
    <AppContext.Provider value={{ state, navigate, setGameConfig, updateSettings, updateStats, resetStats }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
