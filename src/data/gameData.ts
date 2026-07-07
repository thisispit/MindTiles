import type { CardData, CardTheme, Difficulty } from '../types';

export const DIFFICULTY_CONFIG: Record<Difficulty, { grid: number; label: string; description: string; pairs: number }> = {
  focus: { grid: 4, label: 'Focus', description: '4×4 grid — A calm introduction to memory training.', pairs: 8 },
  recall: { grid: 6, label: 'Recall', description: '6×6 grid — Test your pattern recognition.', pairs: 18 },
  master: { grid: 8, label: 'Master', description: '8×8 grid — Challenge your working memory.', pairs: 32 },
  legend: { grid: 10, label: 'Legend', description: '10×10 grid — The ultimate memory endurance test.', pairs: 50 },
};

export const THEME_LABELS: Record<CardTheme, string> = {
  nature: 'Nature',
  space: 'Space',
  technology: 'Technology',
  ocean: 'Ocean',
  architecture: 'Architecture',
  animals: 'Animals',
  food: 'Food',
  minimal: 'Minimal Icons',
  abstract: 'Abstract',
};

// SVG symbol sets per theme — each entry is a unique symbol ID
export const THEME_SYMBOLS: Record<CardTheme, string[]> = {
  nature: ['leaf', 'tree', 'flower', 'mountain', 'sun', 'moon', 'cloud', 'rain', 'snowflake', 'wind',
    'seed', 'fern', 'wave', 'fire', 'stone', 'branch', 'petal', 'root', 'hill', 'dew',
    'forest', 'meadow', 'glacier', 'canyon', 'delta', 'spring', 'aurora', 'desert', 'reef', 'glade',
    'valley', 'fjord', 'tundra', 'savanna', 'lagoon', 'moor', 'heath', 'steppe', 'fen', 'copse',
    'grove', 'brook', 'mist', 'dune', 'cliff', 'pebble', 'pool', 'rime', 'haze', 'silt'],
  space: ['planet', 'star', 'comet', 'galaxy', 'nebula', 'asteroid', 'rocket', 'satellite', 'orbit', 'cosmos',
    'quasar', 'pulsar', 'void', 'event', 'corona', 'flare', 'nova', 'cluster', 'ring', 'debris',
    'probe', 'station', 'capsule', 'booster', 'crater', 'mare', 'rift', 'surge', 'warp', 'singularity',
    'lens', 'spectrum', 'photon', 'gamma', 'xray', 'flux', 'plasma', 'magnet', 'ion', 'muon',
    'dark', 'light', 'redshift', 'blueshift', 'zenith', 'nadir', 'apsis', 'focus', 'axis', 'pole'],
  technology: ['chip', 'circuit', 'node', 'data', 'signal', 'code', 'pixel', 'byte', 'wire', 'grid',
    'server', 'cache', 'loop', 'stack', 'queue', 'tree', 'hash', 'link', 'port', 'bus',
    'clock', 'gate', 'logic', 'bit', 'flag', 'mask', 'frame', 'packet', 'thread', 'core',
    'shader', 'buffer', 'index', 'cursor', 'token', 'parse', 'compile', 'debug', 'deploy', 'sync',
    'ping', 'trace', 'audit', 'patch', 'build', 'fork', 'merge', 'push', 'pull', 'branch'],
  ocean: ['wave', 'coral', 'kelp', 'depth', 'tide', 'current', 'abyss', 'trench', 'shoal', 'crest',
    'swell', 'surge', 'eddy', 'gyre', 'plume', 'brine', 'froth', 'foam', 'drift', 'lagoon',
    'atoll', 'reef', 'bank', 'seamount', 'basin', 'sill', 'ridge', 'shelf', 'slope', 'plain',
    'vent', 'spring', 'pool', 'inlet', 'cove', 'bay', 'strait', 'sound', 'estuary', 'delta',
    'tidal', 'benthic', 'pelagic', 'abyssal', 'hadal', 'photic', 'aphotic', 'neritic', 'oceanic', 'littoral'],
  architecture: ['arch', 'dome', 'tower', 'column', 'bridge', 'vault', 'spire', 'facade', 'portal', 'wall',
    'beam', 'slab', 'truss', 'footing', 'lintel', 'pier', 'corbel', 'parapet', 'balcony', 'cornice',
    'frieze', 'plinth', 'capital', 'keystone', 'voussoir', 'quoin', 'transom', 'mullion', 'soffit', 'coffer',
    'atrium', 'rotunda', 'nave', 'apse', 'transept', 'narthex', 'porch', 'loggia', 'arcade', 'colonnade',
    'peristyle', 'propylon', 'stoa', 'temenos', 'cella', 'pronaos', 'opisthodomos', 'peribolos', 'tempietto', 'pantheon'],
  animals: ['eagle', 'wolf', 'fox', 'bear', 'deer', 'owl', 'hawk', 'crane', 'heron', 'falcon',
    'lynx', 'otter', 'seal', 'whale', 'dolphin', 'shark', 'ray', 'turtle', 'salmon', 'trout',
    'raven', 'dove', 'sparrow', 'swift', 'martin', 'swallow', 'finch', 'wren', 'robin', 'thrush',
    'badger', 'mole', 'vole', 'shrew', 'stoat', 'weasel', 'pine', 'marten', 'polecat', 'ferret',
    'bison', 'elk', 'moose', 'caribou', 'ibex', 'chamois', 'roe', 'fallow', 'muntjac', 'reindeer'],
  food: ['bread', 'olive', 'citrus', 'berry', 'grain', 'herb', 'seed', 'root', 'bloom', 'leaf',
    'fig', 'grape', 'peach', 'plum', 'pear', 'apple', 'quince', 'mango', 'lime', 'lemon',
    'walnut', 'almond', 'hazel', 'chestnut', 'pine', 'pistachio', 'cashew', 'pecan', 'macadamia', 'brazil',
    'ginger', 'turmeric', 'saffron', 'vanilla', 'cardamom', 'clove', 'pepper', 'cumin', 'fennel', 'thyme',
    'basil', 'mint', 'sage', 'rosemary', 'oregano', 'tarragon', 'dill', 'parsley', 'chive', 'bay'],
  minimal: ['circle', 'square', 'triangle', 'hex', 'cross', 'diamond', 'arrow', 'dot', 'line', 'curve',
    'ring', 'arc', 'spiral', 'wave', 'grid', 'mesh', 'bar', 'dash', 'plus', 'minus',
    'multiply', 'divide', 'equals', 'infinity', 'delta', 'sigma', 'pi', 'phi', 'omega', 'theta',
    'alpha', 'beta', 'gamma', 'lambda', 'mu', 'nu', 'xi', 'rho', 'tau', 'upsilon',
    'epsilon', 'zeta', 'eta', 'iota', 'kappa', 'chi', 'psi', 'nabla', 'partial', 'integral'],
  abstract: ['vortex', 'flux', 'pulse', 'echo', 'ripple', 'bloom', 'fade', 'shift', 'drift', 'flow',
    'surge', 'break', 'fold', 'twist', 'bend', 'warp', 'stretch', 'compress', 'expand', 'contract',
    'merge', 'split', 'scatter', 'gather', 'radiate', 'converge', 'diverge', 'oscillate', 'resonate', 'decay',
    'emerge', 'dissolve', 'crystallize', 'liquify', 'solidify', 'vaporize', 'condense', 'sublime', 'ionize', 'fuse',
    'reflect', 'refract', 'diffract', 'scatter', 'absorb', 'emit', 'transmit', 'conduct', 'insulate', 'catalyze'],
};

/**
 * Generate a shuffled array of card pairs for the game
 */
export function generateCards(pairs: number, theme: CardTheme): CardData[] {
  const symbols = THEME_SYMBOLS[theme].slice(0, pairs);
  const cards: CardData[] = [];

  symbols.forEach((symbol, index) => {
    const pairId = `pair-${index}`;
    cards.push(
      { id: `${pairId}-a`, pairId, symbol, isFlipped: false, isMatched: false },
      { id: `${pairId}-b`, pairId, symbol, isFlipped: false, isMatched: false },
    );
  });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
