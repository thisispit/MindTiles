
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTime, computeMemoryScore } from '../utils/storage';

// ── Stat Card ──────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  index: number;
}

function StatCard({ label, value, subtext, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.35, ease: 'easeOut' }}
      style={{
        background: 'rgba(19, 26, 34, 0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <p className="text-xs text-[#94A3B8] font-medium tracking-wide uppercase mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold text-[#F8FAFC] mb-0.5" style={{ letterSpacing: '-0.02em' }}>
        {value}
      </p>
      {subtext && (
        <p className="text-xs text-[#4A5568] font-light">{subtext}</p>
      )}
    </motion.div>
  );
}

// ── JourneyPage ─────────────────────────────────────────────────────────────

export function JourneyPage() {
  const { state, navigate } = useApp();
  const { stats } = state;
  const memScore = computeMemoryScore(stats);
  const hasData = stats.gamesPlayed > 0;
  const avgTime = stats.gamesPlayed > 0 ? Math.round(stats.totalTimeSeconds / stats.gamesPlayed) : null;
  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;

  const statCards = [
    { label: 'Games Played', value: stats.gamesPlayed.toString(), subtext: 'total sessions' },
    { label: 'Wins', value: stats.wins.toString(), subtext: `${winRate}% win rate` },
    { label: 'Current Streak', value: stats.streak.toString(), subtext: `Best: ${stats.bestStreak}` },
    {
      label: 'Best Time',
      value: stats.bestTimeSeconds !== null ? formatTime(stats.bestTimeSeconds) : '—',
      subtext: 'fastest completion',
    },
    {
      label: 'Average Time',
      value: avgTime !== null ? formatTime(avgTime) : '—',
      subtext: 'per session',
    },
    {
      label: 'Accuracy',
      value: stats.gamesPlayed > 0 ? `${Math.round(stats.totalAccuracy)}%` : '—',
      subtext: 'matches per move',
    },
  ];

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
        <div>
          <h1 className="text-[#F8FAFC] font-semibold text-sm" style={{ letterSpacing: '-0.01em' }}>Journey</h1>
          <p className="text-[#94A3B8] text-xs">Your progress</p>
        </div>
      </motion.header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-xl">

          {!hasData ? (
            /* Empty state */
            <motion.div
              className="flex flex-col items-center justify-center text-center py-24"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl mb-6"
                style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 22L10 14L16 18L22 10L24 12" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="8" r="2.5" stroke="#14B8A6" strokeWidth="1.5"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#F8FAFC] mb-2" style={{ letterSpacing: '-0.02em' }}>
                Your journey begins here.
              </h2>
              <p className="text-sm text-[#94A3B8] font-light leading-relaxed max-w-xs">
                Complete your first session to unlock your progress and start tracking your memory journey.
              </p>
              <button
                onClick={() => navigate('game')}
                className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold text-[#0B0F14] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: '#14B8A6' }}
              >
                Begin First Session
              </button>
            </motion.div>
          ) : (
            <>
              {/* Memory Score Hero */}
              <motion.div
                className="mb-8 p-7 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'rgba(20,184,166,0.06)',
                  border: '1px solid rgba(20,184,166,0.15)',
                  borderRadius: '20px',
                }}
              >
                <p className="text-xs text-[#14B8A6] font-medium tracking-widest uppercase mb-3">
                  Memory Score
                </p>
                <p
                  className="text-6xl font-bold text-[#F8FAFC] mb-2"
                  style={{ letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {memScore}
                </p>
                <p className="text-sm text-[#94A3B8] font-light">
                  {memScore >= 80 ? 'Exceptional focus' : memScore >= 60 ? 'Strong performance' : memScore >= 40 ? 'Building momentum' : 'Just getting started'}
                </p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {statCards.map((card, i) => (
                  <StatCard key={card.label} {...card} index={i} />
                ))}
              </div>

              {/* Recent Sessions */}
              {stats.sessions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.35 }}
                >
                  <h3 className="text-xs text-[#94A3B8] font-medium tracking-widest uppercase mb-3">
                    Recent Sessions
                  </h3>
                  <div className="flex flex-col gap-2">
                    {stats.sessions.slice(0, 5).map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                          background: 'rgba(19,26,34,0.6)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '12px',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: session.won ? '#14B8A6' : '#374151' }}
                          />
                          <span className="text-sm text-[#F8FAFC] font-medium capitalize">
                            {session.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                          <span className="font-mono">{formatTime(session.timeSeconds)}</span>
                          <span>{session.moves} moves</span>
                          <span>{session.accuracy}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
