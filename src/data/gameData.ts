import type { CardData, Difficulty } from '../types';

export const DIFFICULTY_CONFIG: Record<Difficulty, { grid: number; label: string; description: string; pairs: number }> = {
  focus:   { grid: 4,  label: 'Rookie',    description: '4×4 grid — A calm introduction to memory training.',   pairs: 8  },
  recall:  { grid: 6,  label: 'Pro',       description: '6×6 grid — Test your pattern recognition.',             pairs: 18 },
  master:  { grid: 8,  label: 'Master',    description: '8×8 grid — Challenge your working memory.',             pairs: 32 },
  legend:  { grid: 10, label: 'Legend',    description: '10×10 grid — The ultimate memory endurance test.',      pairs: 50 },
};

/**
 * Single colorful symbol set — each symbol has a unique vibrant color
 * that pops against the dark background.
 */
export const SYMBOLS: { id: string; color: string }[] = [
  { id: 'leaf',        color: '#4ade80' }, // green
  { id: 'flame',       color: '#f97316' }, // orange
  { id: 'moon',        color: '#a78bfa' }, // violet
  { id: 'sun',         color: '#fbbf24' }, // amber
  { id: 'wave',        color: '#38bdf8' }, // sky
  { id: 'mountain',    color: '#6ee7b7' }, // emerald
  { id: 'star',        color: '#f472b6' }, // pink
  { id: 'comet',       color: '#fb923c' }, // orange-light
  { id: 'diamond',     color: '#67e8f9' }, // cyan
  { id: 'bolt',        color: '#facc15' }, // yellow
  { id: 'drop',        color: '#60a5fa' }, // blue
  { id: 'spiral',      color: '#e879f9' }, // fuchsia
  { id: 'hexagon',     color: '#34d399' }, // teal-green
  { id: 'eye',         color: '#f87171' }, // red-light
  { id: 'infinity',    color: '#818cf8' }, // indigo
  { id: 'feather',     color: '#86efac' }, // light green
  { id: 'cloud',       color: '#93c5fd' }, // blue-light
  { id: 'crystal',     color: '#c084fc' }, // purple
  { id: 'anchor',      color: '#22d3ee' }, // cyan
  { id: 'tree',        color: '#a3e635' }, // lime
  { id: 'arrow',       color: '#fb7185' }, // rose
  { id: 'compass',     color: '#fcd34d' }, // yellow-light
  { id: 'crown',       color: '#fda4af' }, // rose-light
  { id: 'orbit',       color: '#7dd3fc' }, // sky-light
  { id: 'planet',      color: '#d8b4fe' }, // purple-light
  { id: 'snowflake',   color: '#bae6fd' }, // sky-pale
  { id: 'flower',      color: '#f9a8d4' }, // pink-light
  { id: 'hourglass',   color: '#fdba74' }, // orange-light
  { id: 'key',         color: '#86efac' }, // green-light
  { id: 'shield',      color: '#6366f1' }, // indigo
  { id: 'prism',       color: '#e11d48' }, // rose
  { id: 'nucleus',     color: '#06b6d4' }, // cyan-vivid
  { id: 'clover',      color: '#16a34a' }, // green-vivid
  { id: 'target',      color: '#dc2626' }, // red
  { id: 'vortex',      color: '#7c3aed' }, // violet-vivid
  { id: 'moth',        color: '#d97706' }, // amber-vivid
  { id: 'lantern',     color: '#ea580c' }, // orange-vivid
  { id: 'arc',         color: '#0284c7' }, // blue-vivid
  { id: 'wave2',       color: '#0891b2' }, // cyan-vivid2
  { id: 'lotus',       color: '#be185d' }, // pink-vivid
  { id: 'bolt2',       color: '#ca8a04' }, // yellow-vivid
  { id: 'seed',        color: '#15803d' }, // green-deep
  { id: 'dna',         color: '#9333ea' }, // purple-vivid
  { id: 'atom',        color: '#2563eb' }, // blue-vivid2
  { id: 'ring',        color: '#db2777' }, // pink-vivid2
  { id: 'web',         color: '#64748b' }, // slate
  { id: 'cube',        color: '#0e7490' }, // cyan-deep
  { id: 'arrow2',      color: '#b45309' }, // amber-deep
  { id: 'triangle',    color: '#1d4ed8' }, // blue-deep
  { id: 'dot',         color: '#be123c' }, // rose-deep
];

/**
 * Get color for a symbol by its id
 */
export function getSymbolColor(symbolId: string): string {
  return SYMBOLS.find(s => s.id === symbolId)?.color ?? '#14B8A6';
}

/**
 * Generate shuffled card pairs
 */
export function generateCards(pairs: number): CardData[] {
  const selected = SYMBOLS.slice(0, pairs);
  const cards: CardData[] = [];

  selected.forEach((sym, index) => {
    const pairId = `pair-${index}`;
    cards.push(
      { id: `${pairId}-a`, pairId, symbol: sym.id, isFlipped: false, isMatched: false },
      { id: `${pairId}-b`, pairId, symbol: sym.id, isFlipped: false, isMatched: false },
    );
  });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
