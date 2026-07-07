import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Zap, ZapOff, Trash2, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { CardTheme } from '../types';
import { THEME_LABELS } from '../data/gameData';

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
    <div
      className="flex items-center justify-between p-4"
      style={{
        background: 'rgba(19,26,34,0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-[#94A3B8]">{icon}</div>
        <div>
          <label htmlFor={id} className="text-sm font-medium text-[#F8FAFC] cursor-pointer">
            {label}
          </label>
          <p className="text-xs text-[#4A5568] font-light">{description}</p>
        </div>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className="relative flex-shrink-0 w-10 h-5.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6]"
        style={{
          width: 40, height: 22,
          background: enabled ? '#14B8A6' : 'rgba(255,255,255,0.1)',
          border: `1px solid ${enabled ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.12)'}`,
        }}
      >
        <motion.div
          className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm"
          animate={{ left: enabled ? 17 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ width: 17, height: 17, top: '50%', transform: 'translateY(-50%)' }}
        />
      </button>
    </div>
  );
}

// ── Theme Selector ─────────────────────────────────────────────────────────

const themes = Object.entries(THEME_LABELS) as [CardTheme, string][];

interface ThemeSelectorProps {
  current: CardTheme;
  onChange: (t: CardTheme) => void;
}

function ThemeSelector({ current, onChange }: ThemeSelectorProps) {
  return (
    <div>
      <p className="text-xs text-[#94A3B8] font-medium tracking-widest uppercase mb-3">
        Card Theme
      </p>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(([key, label]) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={current === key}
            className="py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-200 text-left"
            style={{
              background: current === key ? 'rgba(20,184,166,0.12)' : 'rgba(19,26,34,0.7)',
              border: current === key ? '1px solid rgba(20,184,166,0.35)' : '1px solid rgba(255,255,255,0.07)',
              color: current === key ? '#14B8A6' : '#94A3B8',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ResetConfirm ───────────────────────────────────────────────────────────

function ResetConfirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(11,15,20,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={onCancel}
      />
      <motion.div
        className="relative z-10 w-full max-w-xs p-6 text-center"
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        style={{
          background: 'rgba(19,26,34,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        }}
      >
        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl"
          style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
          <Trash2 size={20} color="#F97316" />
        </div>
        <h3 className="text-base font-semibold text-[#F8FAFC] mb-1">Reset all progress?</h3>
        <p className="text-xs text-[#94A3B8] font-light mb-6">
          This will permanently erase your stats and session history.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: '#F97316' }}
          >
            Reset
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── StudioPage ─────────────────────────────────────────────────────────────

export function StudioPage() {
  const { state, navigate, updateSettings, resetStats } = useApp();
  const { settings } = state;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  function handleReset() {
    resetStats();
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
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
        <div>
          <h1 className="text-[#F8FAFC] font-semibold text-sm" style={{ letterSpacing: '-0.01em' }}>Studio</h1>
          <p className="text-[#94A3B8] text-xs">Preferences & settings</p>
        </div>
      </motion.header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sound & Animations */}
            <section>
              <p className="text-xs text-[#94A3B8] font-medium tracking-widest uppercase mb-3">
                Experience
              </p>
              <div className="flex flex-col gap-2">
                <Toggle
                  id="sound-toggle"
                  label="Sound"
                  description="Subtle audio feedback"
                  enabled={settings.soundEnabled}
                  onChange={v => updateSettings({ soundEnabled: v })}
                  icon={settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                />
                <Toggle
                  id="anim-toggle"
                  label="Animations"
                  description="Motion and transitions"
                  enabled={settings.animationsEnabled}
                  onChange={v => updateSettings({ animationsEnabled: v })}
                  icon={settings.animationsEnabled ? <Zap size={16} /> : <ZapOff size={16} />}
                />
              </div>
            </section>

            {/* Theme */}
            <section>
              <ThemeSelector
                current={settings.theme}
                onChange={theme => updateSettings({ theme })}
              />
            </section>

            {/* Divider */}
            <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Reset */}
            <section>
              <p className="text-xs text-[#94A3B8] font-medium tracking-widest uppercase mb-3">
                Data
              </p>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-3 w-full p-4 text-left transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'rgba(249,115,22,0.05)',
                  border: '1px solid rgba(249,115,22,0.12)',
                  borderRadius: '14px',
                }}
              >
                <Trash2 size={16} color="#F97316" />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F97316' }}>Reset Progress</p>
                  <p className="text-xs text-[#4A5568] font-light">Permanently clear all stats and history</p>
                </div>
              </button>
              {resetDone && (
                <motion.p
                  className="text-xs text-[#14B8A6] mt-2 ml-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Progress reset successfully.
                </motion.p>
              )}
            </section>

            {/* About */}
            <section>
              <div
                className="flex items-start gap-3 p-4"
                style={{
                  background: 'rgba(19,26,34,0.5)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '14px',
                }}
              >
                <Info size={15} className="text-[#374151] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-[#94A3B8] mb-1">About MindTiles</p>
                  <p className="text-xs text-[#374151] font-light leading-relaxed">
                    Version 1.0 · Built with React, Vite, TypeScript, and Framer Motion.
                    A premium memory training experience designed for focus and flow.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Reset Confirm Dialog */}
      {showResetConfirm && (
        <ResetConfirm
          onConfirm={handleReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
}
