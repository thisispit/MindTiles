import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Timer, Hash } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useGame } from '../hooks/useGame';
import { useTimer } from '../hooks/useTimer';
import { useSound } from '../hooks/useSound';
import { CardSymbol } from '../components/CardSymbol';
import { formatTime, recordSession, computeAccuracy } from '../utils/storage';
import { DIFFICULTY_CONFIG, getSymbolColor } from '../data/gameData';
import type { CardData } from '../types';
import confetti from 'canvas-confetti';

// ── Win Modal ──────────────────────────────────────────────────────────────

interface WinModalProps {
  moves: number;
  timeSeconds: number;
  accuracy: number;
  bestTime: number | null;
  onPlayAgain: () => void;
  onHome: () => void;
}

function WinModal({ moves, timeSeconds, accuracy, bestTime, onPlayAgain, onHome }: WinModalProps) {
  const isNewBest = bestTime !== null && timeSeconds <= bestTime;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(11,15,20,0.8)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(19, 26, 34, 0.98)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          padding: '36px 32px',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Game complete"
      >
        <div className="flex justify-center mb-6">
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(20,184,166,0.12)',
            border: '1px solid rgba(20,184,166,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14L11 20L23 8" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h2 className="text-center text-2xl font-semibold text-[#F8FAFC] mb-1" style={{ letterSpacing: '-0.02em' }}>
          Session Complete
        </h2>
        <p className="text-center text-sm text-[#94A3B8] mb-8">
          {isNewBest ? '🏆 New personal best!' : 'Well played. Keep training.'}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { label: 'Time',      value: formatTime(timeSeconds) },
            { label: 'Moves',     value: moves.toString() },
            { label: 'Accuracy',  value: `${accuracy}%` },
            { label: 'Best Time', value: bestTime !== null ? formatTime(Math.min(bestTime, timeSeconds)) : formatTime(timeSeconds) },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <p className="text-xs text-[#94A3B8] mb-1 font-medium tracking-wide">{label}</p>
              <p className="text-xl font-semibold text-[#F8FAFC]" style={{ letterSpacing: '-0.01em' }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#0B0F14] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: '#14B8A6' }}
          >
            Play Again
          </button>
          <button
            onClick={onHome}
            className="w-full py-3.5 rounded-xl text-sm font-medium text-[#94A3B8] transition-all duration-200 active:scale-[0.98]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Return Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Memory Card ─────────────────────────────────────────────────────────────

interface MemoryCardProps {
  card: CardData;
  onClick: (id: string) => void;
  disabled: boolean;
  size: number;
}

function MemoryCard({ card, onClick, disabled, size }: MemoryCardProps) {
  const isActive  = card.isFlipped || card.isMatched;
  const symColor  = getSymbolColor(card.symbol);

  return (
    <motion.div
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className="w-full h-full relative focus-visible:outline-none"
        style={{ perspective: '1000px', background: 'none', border: 'none', padding: 0,
          cursor: disabled || card.isMatched ? 'default' : 'pointer' }}
        onClick={() => !disabled && !card.isMatched && onClick(card.id)}
        aria-label={card.isMatched ? `Matched: ${card.symbol}` : card.isFlipped ? `Flipped: ${card.symbol}` : 'Hidden card'}
        aria-pressed={isActive}
        tabIndex={disabled || card.isMatched ? -1 : 0}
      >
        <motion.div
          animate={{ rotateY: isActive ? 180 : 0 }}
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
        >
          {/* Front — question mark */}
          <div
            className="card-face flex items-center justify-center"
            style={{
              background: 'rgba(19, 26, 34, 0.92)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.45)',
              backfaceVisibility: 'hidden',
              borderRadius: 14,
            }}
          >
            <span
              className="text-[#2D3748] font-light select-none"
              style={{ fontSize: size * 0.38, lineHeight: 1 }}
              aria-hidden="true"
            >?</span>
          </div>

          {/* Back — colorful symbol */}
          <div
            className="card-face card-back-face flex items-center justify-center"
            style={{
              background: card.isMatched
                ? `rgba(${hexToRgb(symColor)}, 0.08)`
                : 'rgba(22, 30, 40, 0.98)',
              border: card.isMatched
                ? `1px solid rgba(${hexToRgb(symColor)}, 0.3)`
                : '1px solid rgba(255,255,255,0.1)',
              boxShadow: card.isMatched
                ? `0 0 24px rgba(${hexToRgb(symColor)}, 0.15), 0 2px 8px rgba(0,0,0,0.35)`
                : '0 2px 10px rgba(0,0,0,0.45)',
              borderRadius: 14,
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              animate={card.isMatched ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <CardSymbol
                symbol={card.symbol}
                size={Math.round(size * 0.5)}
                color={card.isMatched ? symColor : `rgba(${hexToRgb(symColor)}, 0.55)`}
              />
            </motion.div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

/** Convert hex color to "r,g,b" for rgba() usage */
function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

// ── GamePage ───────────────────────────────────────────────────────────────

export function GamePage() {
  const { state, navigate, updateStats } = useApp();
  const { settings, stats, gameConfig } = state;
  const { playFlip, playMatch, playVictory } = useSound(settings.soundEnabled);
  const { elapsed, start: startTimer, pause: pauseTimer, reset: resetTimer } = useTimer();
  const elapsedRef = useRef(elapsed);
  const [resultTimeSeconds, setResultTimeSeconds] = useState<number | null>(null);
  const [resultBestTimeSeconds, setResultBestTimeSeconds] = useState<number | null>(null);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  const config = DIFFICULTY_CONFIG[gameConfig.difficulty];

  const handleWin = useCallback((moves: number, accuracy: number) => {
    const finalTimeSeconds = elapsedRef.current;
    playVictory();
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.5 },
      colors: ['#14B8A6', '#F97316', '#f472b6', '#fbbf24', '#60a5fa', '#a78bfa'],
      disableForReducedMotion: true,
    });
    const session = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      difficulty: gameConfig.difficulty,
      moves,
      timeSeconds: finalTimeSeconds,
      won: true,
      accuracy,
    };
    const nextStats = recordSession(session, stats);
    updateStats(nextStats);
    setResultTimeSeconds(finalTimeSeconds);
    setResultBestTimeSeconds(nextStats.bestTimeSeconds);
  }, [gameConfig.difficulty, playVictory, stats, updateStats]);

  const { gameState, flipCard, restart } = useGame({
    difficulty: gameConfig.difficulty,
    onFlip: () => {
      if (!gameState.gameStarted) startTimer();
      playFlip();
    },
    onMatch: playMatch,
    onWin: handleWin,
  });

  useEffect(() => {
    if (gameState.gameWon) {
      pauseTimer();
    }
  }, [gameState.gameWon, pauseTimer]);

  const handleRestart = () => {
    setResultTimeSeconds(null);
    setResultBestTimeSeconds(null);
    resetTimer();
    restart();
  };

  // Card size based on grid + viewport
  const gridCols = config.grid;
  const cardSize = Math.min(
    Math.floor((Math.min(window.innerWidth - 48, 740)) / gridCols) - 6,
    84,
  );

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: '#0B0F14' }}>
      <div className="noise-texture" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Top Bar */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(11,15,20,0.7)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('home')}
            className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 text-sm"
            aria-label="Go home">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <div className="w-px h-4 bg-[rgba(255,255,255,0.08)]" />
          <span className="text-[#F8FAFC] font-semibold text-sm" style={{ letterSpacing: '-0.01em' }}>MindTiles</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm">
            <Timer size={14} className="text-[#94A3B8]" />
            <span className="text-[#F8FAFC] font-mono font-medium tabular-nums">{formatTime(elapsed)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Hash size={14} className="text-[#94A3B8]" />
            <span className="text-[#F8FAFC] font-mono font-medium tabular-nums">{gameState.moves}</span>
          </div>
        </div>

        <button onClick={handleRestart}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 text-sm"
          aria-label="Restart game">
          <RotateCcw size={15} />
          <span className="hidden sm:inline">Restart</span>
        </button>
      </motion.header>

      {/* Progress bar */}
      <div className="relative z-10 h-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #14B8A6, #0ea5e9)', transformOrigin: 'left' }}
          animate={{ scaleX: gameState.matchedPairs / gameState.totalPairs }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Board */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-8 px-4">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs font-medium text-[#94A3B8] tracking-widest uppercase">
            {config.label} · {gameState.matchedPairs}/{gameState.totalPairs} pairs
          </span>
        </motion.div>

        <motion.div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${gridCols}, ${cardSize}px)` }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="grid"
          aria-label="Memory card game board"
        >
          {gameState.cards.map(card => (
            <MemoryCard
              key={card.id}
              card={card}
              onClick={flipCard}
              disabled={gameState.isLocked || gameState.gameWon}
              size={cardSize}
            />
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {gameState.gameWon && (
          <WinModal
            moves={gameState.moves}
            timeSeconds={resultTimeSeconds ?? elapsed}
            accuracy={computeAccuracy(gameState.moves, gameState.totalPairs)}
            bestTime={resultBestTimeSeconds ?? stats.bestTimeSeconds}
            onPlayAgain={handleRestart}
            onHome={() => navigate('home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
