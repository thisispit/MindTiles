import { useEffect, useCallback } from 'react';


// Sound manager using Web Audio API for better control
class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.ctx;
  }

  setEnabled(val: boolean) {
    this.enabled = val;
  }

  playFlip() {
    if (!this.enabled) return;
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  playMatch() {
    if (!this.enabled) return;
    try {
      const ctx = this.getCtx();
      const times = [0, 0.1, 0.2];
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
      times.forEach((t, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freqs[i];
        gain.gain.setValueAtTime(0.06, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.2);
      });
    } catch {}
  }

  playVictory() {
    if (!this.enabled) return;
    try {
      const ctx = this.getCtx();
      const notes = [
        { freq: 523.25, t: 0 },
        { freq: 659.25, t: 0.15 },
        { freq: 783.99, t: 0.3 },
        { freq: 1046.5, t: 0.45 },
        { freq: 783.99, t: 0.7 },
        { freq: 1046.5, t: 0.9 },
      ];
      notes.forEach(({ freq, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.07, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.3);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.35);
      });
    } catch {}
  }
}

export const soundManager = new SoundManager();

export function useSound(enabled: boolean) {
  useEffect(() => {
    soundManager.setEnabled(enabled);
  }, [enabled]);

  const playFlip = useCallback(() => soundManager.playFlip(), []);
  const playMatch = useCallback(() => soundManager.playMatch(), []);
  const playVictory = useCallback(() => soundManager.playVictory(), []);

  return { playFlip, playMatch, playVictory };
}
