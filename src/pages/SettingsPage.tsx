import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Zap, ZapOff, Trash2, Info, Settings2, ExternalLink, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.69c-2.78.62-3.37-1.18-3.37-1.18-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.76 1.05a9.22 9.22 0 0 1 5.02 0c1.92-1.33 2.76-1.05 2.76-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.76 0 3.93-2.35 4.8-4.58 5.06.36.32.68.95.68 1.92v2.85c0 .26.18.58.69.48A10.23 10.23 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

// ── Toggle Switch ──────────────────────────────────────────────────────────

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

function Toggle({ enabled, onChange, id, label, description, icon }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-4"
      style={{ background: 'rgba(19,26,34,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px' }}>
      <div className="flex items-center gap-3">
        <div className="text-[#94A3B8]">{icon}</div>
        <div>
          <label htmlFor={id} className="text-sm font-medium text-[#F8FAFC] cursor-pointer">{label}</label>
          <p className="text-xs text-[#4A5568] font-light">{description}</p>
        </div>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className="relative flex-shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]"
        style={{
          width: 40, height: 22,
          background: enabled ? '#14B8A6' : 'rgba(255,255,255,0.1)',
          border: `1px solid ${enabled ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.12)'}`,
        }}
      >
        <motion.div
          className="absolute rounded-full bg-white shadow-sm"
          animate={{ left: enabled ? 17 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ width: 17, height: 17, top: '50%', transform: 'translateY(-50%)' }}
        />
      </button>
    </div>
  );
}

// ── Reset Confirm ──────────────────────────────────────────────────────────

function ResetConfirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0" style={{ background: 'rgba(11,15,20,0.8)', backdropFilter: 'blur(8px)' }} onClick={onCancel} />
      <motion.div className="relative z-10 w-full max-w-xs p-6 text-center"
        initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }}
        style={{ background: 'rgba(19,26,34,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl"
          style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
          <Trash2 size={20} color="#F97316" />
        </div>
        <h3 className="text-base font-semibold text-[#F8FAFC] mb-1">Reset all progress?</h3>
        <p className="text-xs text-[#94A3B8] font-light mb-6">This will permanently erase your stats and session history.</p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: '#F97316' }}>
            Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── SettingsPage ───────────────────────────────────────────────────────────

export function SettingsPage() {
  const { state, navigate, updateSettings, resetStats } = useApp();
  const { settings } = state;
  const [showReset, setShowReset] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  function handleReset() {
    resetStats();
    setShowReset(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  }

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: '#0B0F14' }}>
      <div className="noise-texture" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <motion.header
        className="relative z-10 flex items-center px-6 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(11,15,20,0.6)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate('home')}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 text-sm mr-6"
          aria-label="Go home">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-2">
          <Settings2 size={15} className="text-[#94A3B8]" />
          <div>
            <h1 className="text-[#F8FAFC] font-semibold text-sm" style={{ letterSpacing: '-0.01em' }}>Settings</h1>
            <p className="text-[#94A3B8] text-xs">Preferences & settings</p>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <motion.div className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

            {/* Experience */}
            <section>
              <p className="text-xs text-[#94A3B8] font-medium tracking-widest uppercase mb-3">Experience</p>
              <div className="flex flex-col gap-2">
                <Toggle
                  id="sound-toggle" label="Sound" description="Subtle audio feedback"
                  enabled={settings.soundEnabled} onChange={v => updateSettings({ soundEnabled: v })}
                  icon={settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                />
                <Toggle
                  id="anim-toggle" label="Animations" description="Motion and transitions"
                  enabled={settings.animationsEnabled} onChange={v => updateSettings({ animationsEnabled: v })}
                  icon={settings.animationsEnabled ? <Zap size={16} /> : <ZapOff size={16} />}
                />
              </div>
            </section>

            <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Data */}
            <section>
              <p className="text-xs text-[#94A3B8] font-medium tracking-widest uppercase mb-3">Data</p>
              <button onClick={() => setShowReset(true)}
                className="flex items-center gap-3 w-full p-4 text-left transition-all duration-200 hover:opacity-80"
                style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.12)', borderRadius: '14px' }}>
                <Trash2 size={16} color="#F97316" />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F97316' }}>Reset Progress</p>
                  <p className="text-xs text-[#4A5568] font-light">Permanently clear all stats and history</p>
                </div>
              </button>
              {resetDone && (
                <motion.p className="text-xs text-[#14B8A6] mt-2 ml-1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Progress reset successfully.
                </motion.p>
              )}
            </section>

            {/* About */}
            <section>
              <div
                className="p-4"
                style={{ background: 'rgba(19,26,34,0.52)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.18)', color: '#14B8A6' }}
                  >
                    <Info size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-[0.18em]">About MindTiles</p>
                    <p className="mt-2 text-xs text-[#4A5568] font-light leading-relaxed">
                      MindTiles is a calm memory game built around focus, pattern recall, and satisfying visual feedback.
                      It is designed to feel clean, responsive, and easy to return to for quick sessions.
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-[#94A3B8] font-light">
                      <p className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#14B8A6] flex-shrink-0" aria-hidden="true" />
                        <span>Choose a difficulty and match pairs at your own pace.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#0EA5E9] flex-shrink-0" aria-hidden="true" />
                        <span>Track wins, best time, streaks, and accuracy in Journey.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#F97316] flex-shrink-0" aria-hidden="true" />
                        <span>Built with React, Vite, TypeScript, and Framer Motion.</span>
                      </p>
                    </div>

                    <div className="mt-4 pt-3 grid grid-cols-1 gap-2 sm:grid-cols-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <a
                        href="mailto:notthewitcher@gmail.com"
                        aria-label="Email notthewitcher@gmail.com"
                        className="group flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <Mail size={13} className="text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]" />
                        <span className="text-[#F8FAFC] font-medium tracking-normal normal-case">Email</span>
                      </a>
                      <a
                        href="https://github.com/thisispit"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        className="group flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <GithubMark className="h-[14px] w-[14px] text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]" />
                        <span className="text-[#F8FAFC] font-medium tracking-normal normal-case">GitHub</span>
                      </a>
                      <a
                        href="https://github.com/thisispit/MindTiles"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="MindTiles repository"
                        className="group flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <GithubMark className="h-[14px] w-[14px] text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]" />
                        <span className="text-[#F8FAFC] font-medium tracking-normal normal-case">MT</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      {showReset && <ResetConfirm onConfirm={handleReset} onCancel={() => setShowReset(false)} />}
    </div>
  );
}
