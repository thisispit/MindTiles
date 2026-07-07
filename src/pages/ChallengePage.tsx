import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Difficulty } from '../types';
import { DIFFICULTY_CONFIG } from '../data/gameData';

// ── Level Icons ────────────────────────────────────────────────────────────

const LevelIcons: Record<Difficulty, React.FC> = {
  focus: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
    </svg>
  ),
  recall: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 12H8L10 6L14 18L16 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  master: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  legend: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.8 8.2H20.3L15 12L16.8 18.2L12 15L7.2 18.2L9 12L3.7 8.2H10.2L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 4L4 2M16 4L20 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
};

const difficulties: Difficulty[] = ['focus', 'recall', 'master', 'legend'];

const levelColors: Record<Difficulty, string> = {
  focus: '#14B8A6',
  recall: '#0ea5e9',
  master: '#F97316',
  legend: '#a855f7',
};

// ── ChallengePage ──────────────────────────────────────────────────────────

export function ChallengePage() {
  const { navigate, setGameConfig } = useApp();

  function handleSelect(difficulty: Difficulty) {
    const config = DIFFICULTY_CONFIG[difficulty];
    setGameConfig({ difficulty, gridSize: config.grid });
    navigate('game');
  }

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: '#0B0F14' }}
    >
      <div className="noise-texture" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center px-6 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(11,15,20,0.6)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 text-sm mr-6"
          aria-label="Go home"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex flex-col">
          <h1 className="text-[#F8FAFC] font-semibold text-sm" style={{ letterSpacing: '-0.01em' }}>
            Challenge
          </h1>
          <p className="text-[#94A3B8] text-xs">Select your difficulty</p>
        </div>
      </motion.header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-[#F8FAFC] mb-2" style={{ letterSpacing: '-0.02em' }}>
              Choose your level
            </h2>
            <p className="text-sm text-[#94A3B8] font-light">
              Each level is a different kind of challenge. Progress at your own pace.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {difficulties.map((diff, index) => {
              const config = DIFFICULTY_CONFIG[diff];
              const Icon = LevelIcons[diff];
              const color = levelColors[diff];

              return (
                <motion.button
                  key={diff}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.07, duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ x: 4, transition: { duration: 0.18, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelect(diff)}
                  aria-label={`Select ${config.label} difficulty`}
                  className="group flex items-center gap-5 p-5 text-left w-full transition-all duration-200"
                  style={{
                    background: 'rgba(19, 26, 34, 0.7)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{
                      background: `rgba(${color === '#14B8A6' ? '20,184,166' : color === '#0ea5e9' ? '14,165,233' : color === '#F97316' ? '249,115,22' : '168,85,247'}, 0.1)`,
                      border: `1px solid rgba(${color === '#14B8A6' ? '20,184,166' : color === '#0ea5e9' ? '14,165,233' : color === '#F97316' ? '249,115,22' : '168,85,247'}, 0.2)`,
                      color,
                    }}
                  >
                    <Icon />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[#F8FAFC] font-semibold text-base" style={{ letterSpacing: '-0.01em' }}>
                        {config.label}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `rgba(${color === '#14B8A6' ? '20,184,166' : color === '#0ea5e9' ? '14,165,233' : color === '#F97316' ? '249,115,22' : '168,85,247'}, 0.1)`, color }}>
                        {config.grid}×{config.grid}
                      </span>
                    </div>
                    <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                      {config.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#94A3B8]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
