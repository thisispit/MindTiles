import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ParticleBackground } from '../components/ParticleBackground';

// ── Tile definitions ───────────────────────────────────────────────────────

interface NavTile {
  id: string;
  label: string;
  sublabel: string;
  page: 'game' | 'challenge' | 'journey' | 'settings';
  position: 'tl' | 'tr' | 'bl' | 'br';
  icon: React.ReactNode;
}

const BeginIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M10 7L21 14L10 21V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const ChallengeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4L17 10L24 11L19 16L20 23L14 20L8 23L9 16L4 11L11 10L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const JourneyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 22L10 14L16 18L22 10L24 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 4.5V6.8M14 21.2V23.5M4.5 14H6.8M21.2 14H23.5M7.1 7.1L8.7 8.7M19.3 19.3L20.9 20.9M7.1 20.9L8.7 19.3M19.3 8.7L20.9 7.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const tiles: NavTile[] = [
  {
    id: 'begin',
    label: 'Begin',
    sublabel: 'Start a new session',
    page: 'game',
    position: 'tl',
    icon: <BeginIcon />,
  },
  {
    id: 'challenge',
    label: 'Challenge',
    sublabel: 'Choose your difficulty',
    page: 'challenge',
    position: 'tr',
    icon: <ChallengeIcon />,
  },
  {
    id: 'journey',
    label: 'Journey',
    sublabel: 'Your progress & stats',
    page: 'journey',
    position: 'bl',
    icon: <JourneyIcon />,
  },
  {
    id: 'settings',
    label: 'Settings',
    sublabel: 'Preferences & about',
    page: 'settings',
    position: 'br',
    icon: <SettingsIcon />,
  },
];

// ── Tile component ─────────────────────────────────────────────────────────

function NavTileButton({ tile, index, onClick }: { tile: NavTile; index: number; onClick: () => void }) {
  return (
    <motion.button
      key={tile.id}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.08,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.035,
        y: -3,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.1 },
      }}
      onClick={onClick}
      aria-label={`Navigate to ${tile.label}`}
      className="group relative flex flex-col items-start justify-between p-6 w-full h-full text-left focus-visible:outline-none"
      style={{
        background: 'rgba(19, 26, 34, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        minHeight: '180px',
      }}
    >
      {/* Background hover glow */}
      <motion.div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100"
        style={{
          background: 'rgba(255,255,255,0.025)',
          transition: 'opacity 220ms ease-out',
        }}
      />

      {/* Subtle top border highlight on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.3), transparent)',
          transition: 'opacity 220ms ease-out',
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 flex items-center justify-center w-11 h-11 rounded-xl mb-auto"
        style={{
          background: 'rgba(20,184,166,0.08)',
          border: '1px solid rgba(20,184,166,0.15)',
          color: '#14B8A6',
          transition: 'background 220ms ease-out, border-color 220ms ease-out',
        }}
      >
        {tile.icon}
      </div>

      {/* Text */}
      <div className="relative z-10 mt-8">
        <p
          className="text-xl font-semibold text-[#F8FAFC] mb-1"
          style={{ letterSpacing: '-0.01em' }}
        >
          {tile.label}
        </p>
        <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
          {tile.sublabel}
        </p>
      </div>

      {/* Arrow indicator */}
      <div
        className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 text-[#14B8A6]"
        style={{ transition: 'opacity 220ms ease-out, transform 220ms ease-out' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.button>
  );
}

// ── HomePage ───────────────────────────────────────────────────────────────

export function HomePage() {
  const { navigate } = useApp();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0B0F14' }}>

      {/* Layered backgrounds */}
      <ParticleBackground />
      <div className="noise-texture" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-12">

        {/* Logo & Heading */}
        <motion.div
          className="flex flex-col items-center mb-14"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Logomark */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="19" height="19" rx="5" fill="#14B8A6" />
              <rect x="27" y="2" width="19" height="19" rx="5" fill="#14B8A6" opacity="0.5" />
              <rect x="2" y="27" width="19" height="19" rx="5" fill="#14B8A6" opacity="0.5" />
              <rect x="27" y="27" width="19" height="19" rx="5" fill="#14B8A6" />
            </svg>
          </motion.div>

          <motion.h1
            className="text-[42px] font-bold tracking-tight text-[#F8FAFC] mb-3"
            style={{ letterSpacing: '-0.03em', lineHeight: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            MINDTILES
          </motion.h1>

          <motion.p
            className="text-[#94A3B8] text-base font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Sharpen your memory. One match at a time.
          </motion.p>
        </motion.div>

        {/* 2×2 Tile Grid */}
        <div
          className="grid grid-cols-2 gap-3 w-full mb-10"
          role="navigation"
          aria-label="Main navigation"
        >
          {tiles.map((tile, index) => (
            <NavTileButton
              key={tile.id}
              tile={tile}
              index={index}
              onClick={() => navigate(tile.page)}
            />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.span
            className="h-px w-10 bg-gradient-to-r from-transparent via-[#374151] to-transparent"
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
          />
          <motion.p
            className="text-center text-[11px] text-[#4A5568] font-light tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ letterSpacing: '0.22em' }}
            animate={{
              color: ['#4A5568', '#94A3B8', '#4A5568'],
              textShadow: [
                '0 0 0px rgba(20,184,166,0)',
                '0 0 12px rgba(20,184,166,0.28)',
                '0 0 0px rgba(20,184,166,0)',
              ],
            }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
          >
            Every tile tells a story.
          </motion.p>
          <motion.span
            className="h-px w-10 bg-gradient-to-r from-transparent via-[#374151] to-transparent"
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut', delay: 0.15 }}
          />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setShowHowToPlay(true)}
          className="mt-5 rounded-full px-4 py-2 text-xs font-medium text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
          }}
          aria-label="Open how to play instructions"
        >
          How to Play
        </motion.button>
      </main>

      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(11,15,20,0.78)', backdropFilter: 'blur(8px)' }}
              onClick={() => setShowHowToPlay(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-sm rounded-[18px] p-6"
              initial={{ y: 12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                background: 'rgba(19,26,34,0.96)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-[0.18em]">How to Play</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHowToPlay(false)}
                  className="text-xs text-[#4A5568] hover:text-[#94A3B8] transition-colors"
                  aria-label="Close how to play instructions"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 rounded-[14px] px-4 py-3.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/10 text-xs font-semibold text-[#14B8A6]">1</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F8FAFC]">Start a game</p>
                    <p className="text-xs text-[#94A3B8] font-light leading-relaxed mt-0.5">Open <span className="text-[#F8FAFC]">Begin</span> and flip two tiles to find matching pairs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-[14px] px-4 py-3.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0EA5E9]/10 text-xs font-semibold text-[#0EA5E9]">2</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F8FAFC]">Pick a level</p>
                    <p className="text-xs text-[#94A3B8] font-light leading-relaxed mt-0.5">Use <span className="text-[#F8FAFC]">Challenge</span> to choose the difficulty that fits you best.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-[14px] px-4 py-3.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-xs font-semibold text-[#F97316]">3</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F8FAFC]">Track progress</p>
                    <p className="text-xs text-[#94A3B8] font-light leading-relaxed mt-0.5">Check <span className="text-[#F8FAFC]">Journey</span> for stats and use <span className="text-[#F8FAFC]">Settings</span> anytime.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="relative z-10 flex items-center gap-4 py-6 text-xs text-[#374151]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span>MindTiles v1.0</span>
        <span>·</span>
        <a
          href="https://github.com/thisispit/MindTiles"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-[#94A3B8] transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>GitHub</span>
        </a>
      </motion.footer>
    </div>
  );
}
