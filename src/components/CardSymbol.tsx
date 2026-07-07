import React from 'react';

/**
 * Minimal SVG card symbols — each symbol is a clean geometric/illustrative icon
 * These replace emojis and low-quality icons with precise vector artwork
 */

interface SymbolProps {
  size?: number;
  color?: string;
}

// A library of symbols keyed by name
// Each renders a distinct, elegant SVG for the card back

const symbols: Record<string, React.FC<SymbolProps>> = {
  // ── Nature ────────────────────────────────────────────────────────────────
  leaf: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 36C20 36 8 28 8 16C8 9 14 5 20 5C26 5 32 9 32 16C32 28 20 36 20 36Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 36L20 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 22L14 16" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M20 18L26 13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  tree: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6L29 20H11L20 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 14L27 26H13L20 14Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="18" y="26" width="4" height="8" rx="1" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  flower: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="10" rx="3" ry="5" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="20" cy="30" rx="3" ry="5" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="10" cy="20" rx="5" ry="3" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="30" cy="20" rx="5" ry="3" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="13" cy="13" rx="3" ry="5" transform="rotate(-45 13 13)" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="27" cy="27" rx="3" ry="5" transform="rotate(-45 27 27)" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="27" cy="13" rx="3" ry="5" transform="rotate(45 27 13)" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="13" cy="27" rx="3" ry="5" transform="rotate(45 13 27)" stroke={color} strokeWidth="1.3"/>
    </svg>
  ),
  mountain: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 32L14 14L20 22L26 16L36 32H4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M26 16L29 19" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  sun: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.5"/>
      {[0,45,90,135,180,225,270,315].map(angle => (
        <line key={angle}
          x1={20 + Math.cos(angle * Math.PI / 180) * 10}
          y1={20 + Math.sin(angle * Math.PI / 180) * 10}
          x2={20 + Math.cos(angle * Math.PI / 180) * 14}
          y2={20 + Math.sin(angle * Math.PI / 180) * 14}
          stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      ))}
    </svg>
  ),
  moon: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M28 22C25 26 19 28 14 25C9 22 8 16 11 12C8 14 7 18 8 22C10 28 17 32 24 30C28 29 31 26 32 22C31 22 29 22 28 22Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="27" cy="10" r="1.5" stroke={color} strokeWidth="1.2"/>
      <circle cx="31" cy="15" r="1" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  cloud: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M30 26H12C9 26 7 24 7 21C7 18 9 16 12 16C12 13 14 11 17 11C18 11 19 11 20 12C21 9 24 7 28 9C31 10 33 13 33 16C35 17 36 19 36 21C36 24 33 26 30 26Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  rain: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M28 20H12C9 20 7 18 7 15C7 12 10 10 13 11C13 8 16 6 20 7C23 7 25 9 26 11C28 11 30 13 30 15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="24" x2="12" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="24" x2="18" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="24" x2="24" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  snowflake: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="6" x2="20" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="9" x2="31" y2="31" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="31" y1="9" x2="9" y2="31" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="3" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  wave: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 20C7 16 11 16 14 20C17 24 21 24 24 20C27 16 31 16 36 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 28C7 24 11 24 14 28C17 32 21 32 24 28C27 24 31 24 36 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  seed: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="18" rx="8" ry="11" stroke={color} strokeWidth="1.5"/>
      <path d="M20 29L20 35" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 20L15 25" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 20L25 25" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  fern: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 35L20 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 28C17 25 13 24 11 20" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 22C23 19 27 18 29 14" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 16C17 13 15 10 13 8" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  fire: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6C20 6 26 12 26 20C26 24 23 27 20 28C17 27 14 24 14 20C14 16 16 13 18 11C18 14 20 15 21 13C22 11 21 8 20 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 28C12 30 12 33 14 35C16 33 18 30 20 28" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M26 28C28 30 28 33 26 35C24 33 22 30 20 28" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  // ── Space ──────────────────────────────────────────────────────────────────
  planet: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="16" ry="5" stroke={color} strokeWidth="1.3" transform="rotate(-15 20 20)"/>
    </svg>
  ),
  star: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6L23 16H34L25 22L28 32L20 26L12 32L15 22L6 16H17L20 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  comet: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="28" cy="12" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M24 16L8 32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <path d="M22 18L6 30" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      <path d="M24 19L10 34" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    </svg>
  ),
  galaxy: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 20 C24 16, 30 14, 32 18 C34 22, 30 28, 24 28 C18 28, 12 24, 10 20 C8 16, 12 10, 18 10 C24 10, 28 14, 28 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="20" r="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="26" cy="14" r="1" stroke={color} strokeWidth="1"/>
      <circle cx="14" cy="26" r="1" stroke={color} strokeWidth="1"/>
    </svg>
  ),
  nebula: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="1" opacity="0.4"/>
      <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="1.2" opacity="0.6"/>
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="12" cy="14" r="2" stroke={color} strokeWidth="1" opacity="0.6"/>
      <circle cx="28" cy="26" r="2" stroke={color} strokeWidth="1" opacity="0.6"/>
    </svg>
  ),
  rocket: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6C20 6 27 12 27 22L20 28L13 22C13 12 20 6 20 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 22L8 28L13 28" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M27 22L32 28L27 28" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="20" cy="18" r="2.5" stroke={color} strokeWidth="1.3"/>
      <path d="M20 28L20 34" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  satellite: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="16" y="16" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5"/>
      <rect x="6" y="18" width="8" height="4" rx="1" stroke={color} strokeWidth="1.3"/>
      <rect x="26" y="18" width="8" height="4" rx="1" stroke={color} strokeWidth="1.3"/>
      <path d="M10 10L16 16" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M30 30L24 24" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  orbit: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="5" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke={color} strokeWidth="1.3" transform="rotate(-30 20 20)"/>
      <circle cx="31" cy="14" r="2" stroke={color} strokeWidth="1.3"/>
    </svg>
  ),
  // ── Technology ─────────────────────────────────────────────────────────────
  chip: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="12" y="12" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5"/>
      <rect x="16" y="16" width="8" height="8" rx="1" stroke={color} strokeWidth="1.3"/>
      {[14,20,26].map(y => (
        <React.Fragment key={y}>
          <line x1="6" y1={y} x2="12" y2={y} stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="28" y1={y} x2="34" y2={y} stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
        </React.Fragment>
      ))}
      {[14,20,26].map(x => (
        <React.Fragment key={x}>
          <line x1={x} y1="6" x2={x} y2="12" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1={x} y1="28" x2={x} y2="34" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
        </React.Fragment>
      ))}
    </svg>
  ),
  circuit: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M6 20H14L14 12L26 12L26 20L34 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 28L14 20" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M26 20L26 28" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="14" cy="20" r="2" stroke={color} strokeWidth="1.3"/>
      <circle cx="26" cy="20" r="2" stroke={color} strokeWidth="1.3"/>
    </svg>
  ),
  node: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="8" cy="14" r="3" stroke={color} strokeWidth="1.3"/>
      <circle cx="8" cy="26" r="3" stroke={color} strokeWidth="1.3"/>
      <circle cx="32" cy="20" r="3" stroke={color} strokeWidth="1.3"/>
      <line x1="11" y1="14" x2="16" y2="18" stroke={color} strokeWidth="1.2"/>
      <line x1="11" y1="26" x2="16" y2="22" stroke={color} strokeWidth="1.2"/>
      <line x1="29" y1="20" x2="24" y2="20" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  code: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M14 14L6 20L14 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 14L34 20L26 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 12L18 28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  pixel: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {[
        [12,12],[20,12],[28,12],
        [12,20],[28,20],
        [12,28],[20,28],[28,28],
        [20,20],
      ].map(([x,y], i) => (
        <rect key={i} x={x-3} y={y-3} width="6" height="6" rx="1" stroke={color} strokeWidth="1.2"/>
      ))}
    </svg>
  ),
  data: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5"/>
      <path d="M10 12L10 20" stroke={color} strokeWidth="1.5"/>
      <path d="M30 12L30 20" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="10" ry="4" stroke={color} strokeWidth="1.5"/>
      <path d="M10 20L10 28" stroke={color} strokeWidth="1.5"/>
      <path d="M30 20L30 28" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="28" rx="10" ry="4" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  // ── Ocean ──────────────────────────────────────────────────────────────────
  coral: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 34L20 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 28L14 22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 28L26 22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 22L10 17" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M14 22L14 15" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M26 22L30 17" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M26 22L26 15" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 24L20 16" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="10" cy="15" r="2" stroke={color} strokeWidth="1.2"/>
      <circle cx="14" cy="13" r="2" stroke={color} strokeWidth="1.2"/>
      <circle cx="20" cy="14" r="2" stroke={color} strokeWidth="1.2"/>
      <circle cx="26" cy="13" r="2" stroke={color} strokeWidth="1.2"/>
      <circle cx="30" cy="15" r="2" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  kelp: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 36C20 36 16 30 18 24C20 18 16 12 18 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 36C22 36 26 30 24 24C22 18 26 12 24 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 20C14 19 12 16 14 12" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M22 14C26 13 28 10 26 7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  depth: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="0.8" opacity="0.3"/>
      <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="1" opacity="0.5"/>
      <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.3" opacity="0.7"/>
      <circle cx="20" cy="20" r="2" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  // ── Architecture ───────────────────────────────────────────────────────────
  arch: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M10 34L10 20C10 13 15 8 20 8C25 8 30 13 30 20L30 34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="34" x2="34" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  dome: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 26C8 17 13 10 20 10C27 10 32 17 32 26" stroke={color} strokeWidth="1.5"/>
      <line x1="6" y1="26" x2="34" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="26" x2="14" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="26" x2="26" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="34" x2="30" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  tower: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="14" y="14" width="12" height="22" rx="1" stroke={color} strokeWidth="1.5"/>
      <path d="M14 14L17 8L20 6L23 8L26 14" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <rect x="17" y="24" width="6" height="8" rx="1" stroke={color} strokeWidth="1.2"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  bridge: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="6" y1="24" x2="34" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 24C6 16 13 10 20 10C27 10 34 16 34 24" stroke={color} strokeWidth="1.5"/>
      <line x1="13" y1="10" x2="13" y2="24" stroke={color} strokeWidth="1.2" strokeDasharray="2 3"/>
      <line x1="20" y1="10" x2="20" y2="24" stroke={color} strokeWidth="1.2" strokeDasharray="2 3"/>
      <line x1="27" y1="10" x2="27" y2="24" stroke={color} strokeWidth="1.2" strokeDasharray="2 3"/>
    </svg>
  ),
  column: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="15" y="10" width="10" height="22" rx="1" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="10" rx="6" ry="2" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="20" cy="32" rx="7" ry="2.5" stroke={color} strokeWidth="1.3"/>
    </svg>
  ),
  // ── Animals ────────────────────────────────────────────────────────────────
  eagle: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 18C20 18 24 14 32 12C28 16 26 20 24 22L20 18Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M20 18C20 18 16 14 8 12C12 16 14 20 16 22L20 18Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M16 22L20 30L24 22L20 18L16 22Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M18 30L16 34" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M22 30L24 34" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="20" cy="15" r="3" stroke={color} strokeWidth="1.3"/>
      <path d="M22 14L24 13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  wolf: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M10 8L10 16L6 20L14 24L20 22L26 24L34 20L30 16L30 8L26 14L20 12L14 14L10 8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="15" cy="17" r="1.5" stroke={color} strokeWidth="1.2"/>
      <circle cx="25" cy="17" r="1.5" stroke={color} strokeWidth="1.2"/>
      <path d="M17 20C18 21 22 21 23 20" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="24" x2="12" y2="32" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="26" y1="24" x2="28" y2="32" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  owl: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M10 16C10 10 14 7 20 7C26 7 30 10 30 16L30 28C30 32 26 34 20 34C14 34 10 32 10 28L10 16Z" stroke={color} strokeWidth="1.5"/>
      <circle cx="15" cy="18" r="4" stroke={color} strokeWidth="1.3"/>
      <circle cx="25" cy="18" r="4" stroke={color} strokeWidth="1.3"/>
      <circle cx="15" cy="18" r="2" stroke={color} strokeWidth="1.5"/>
      <circle cx="25" cy="18" r="2" stroke={color} strokeWidth="1.5"/>
      <path d="M17 22C18 24 22 24 23 22" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 8L10 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M26 8L30 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  // ── Food ───────────────────────────────────────────────────────────────────
  bread: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 24C8 18 10 14 20 14C30 14 32 18 32 24L32 30C32 32 30 34 20 34C10 34 8 32 8 30L8 24Z" stroke={color} strokeWidth="1.5"/>
      <path d="M8 24C8 24 10 20 20 20C30 20 32 24 32 24" stroke={color} strokeWidth="1.3"/>
      <path d="M14 14C14 11 17 8 20 8C23 8 26 11 26 14" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  grain: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 34L20 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 20L14 14" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 16L26 10" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 24L14 18" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M20 28L26 22" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="20" cy="12" rx="4" ry="5" stroke={color} strokeWidth="1.3"/>
    </svg>
  ),
  // ── Minimal / Abstract ─────────────────────────────────────────────────────
  circle: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  square: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="10" y="10" width="20" height="20" rx="3" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  triangle: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 9L34 32H6L20 9Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  hex: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 8L32 15V29L20 36L8 29V15L20 8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  diamond: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6L34 20L20 34L6 20L20 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  vortex: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 20C24 16 30 16 30 20C30 24 26 28 20 28C14 28 8 24 8 18C8 12 14 8 22 8C28 8 32 12 32 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  spiral: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 20C20 18 22 17 24 18C26 19 26 22 24 24C22 26 18 26 16 24C14 22 14 18 16 16C18 14 22 14 24 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  infinity: ({ size = 40, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M14 20C14 16 16 14 20 14C24 14 26 16 26 20C26 24 28 26 32 26C36 26 36 14 32 14C28 14 26 16 26 20C26 24 24 26 20 26C16 26 14 24 14 20C14 16 12 14 8 14C4 14 4 26 8 26C12 26 14 24 14 20Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

// Default fallback for unknown symbols
const DefaultSymbol: React.FC<SymbolProps> = ({ size = 40, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="1.5"/>
    <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5"/>
  </svg>
);

interface CardSymbolProps {
  symbol: string;
  size?: number;
  color?: string;
}

export function CardSymbol({ symbol, size = 36, color = '#14B8A6' }: CardSymbolProps) {
  const Component = symbols[symbol] ?? DefaultSymbol;
  return <Component size={size} color={color} />;
}

export default symbols;
