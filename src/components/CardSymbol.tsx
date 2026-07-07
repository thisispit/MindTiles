import type { ReactElement } from 'react';

/**
 * MindTiles card symbol library — one per unique symbol id.
 * Each renders a clean minimal SVG. Color is passed in from the symbol config.
 */

interface SymbolProps {
  size?: number;
  color: string;
}

type SymbolComponent = (props: SymbolProps) => ReactElement;

const defs: Record<string, SymbolComponent> = {
  leaf: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 36C20 36 8 27 8 16C8 9 13 5 20 5C27 5 32 9 32 16C32 27 20 36 20 36Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 36V14" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M20 22L14 17" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 17L26 13" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  flame: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6C20 6 27 13 27 21C27 26 24 30 20 31C16 30 13 26 13 21C13 16 15 13 17 11C17 14 19 15 21 13C22 11 21 8 20 6Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M16 31C14 33 14 36 16 37" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M24 31C26 33 26 36 24 37" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  moon: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M29 23C26 28 19 30 14 26C9 22 8 15 12 11C8 13 7 19 9 24C12 30 19 33 26 31C30 29 32 26 33 22C31 22 30 23 29 23Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="27" cy="10" r="1.5" fill={color}/>
      <circle cx="31" cy="16" r="1" fill={color}/>
    </svg>
  ),

  sun: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.8"/>
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
          x1={20 + Math.cos(a * Math.PI/180) * 10} y1={20 + Math.sin(a * Math.PI/180) * 10}
          x2={20 + Math.cos(a * Math.PI/180) * 14} y2={20 + Math.sin(a * Math.PI/180) * 14}
          stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      ))}
    </svg>
  ),

  wave: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 18C7 14 11 14 14 18C17 22 21 22 24 18C27 14 31 14 36 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 26C7 22 11 22 14 26C17 30 21 30 24 26C27 22 31 22 36 26" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),

  mountain: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 33L14 14L20 23L26 15L36 33H4Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M26 15L29 19" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  star: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6L23 16H34L25 22L28 33L20 27L12 33L15 22L6 16H17L20 6Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),

  comet: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="28" cy="11" r="4" stroke={color} strokeWidth="1.8"/>
      <path d="M25 15L8 33" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M23 17L7 30" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M25 18L10 34" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
    </svg>
  ),

  diamond: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5L35 20L20 35L5 20L20 5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M5 20H35" stroke={color} strokeWidth="1" opacity="0.35"/>
      <path d="M12 12L20 20M28 12L20 20" stroke={color} strokeWidth="1" opacity="0.35"/>
    </svg>
  ),

  bolt: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M23 5L10 22H20L17 35L30 18H20L23 5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),

  drop: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 7C20 7 10 18 10 25C10 31 15 35 20 35C25 35 30 31 30 25C30 18 20 7 20 7Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M15 27C16 30 19 32 21 31" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),

  spiral: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 20C20 17 22 16 24 17C26 18 27 21 25 24C23 27 19 27 16 25C13 23 12 18 14 15C16 12 20 12 23 14"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  hexagon: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6L33 13.5V26.5L20 34L7 26.5V13.5L20 6Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 6V34M7 13.5L33 26.5M33 13.5L7 26.5" stroke={color} strokeWidth="0.8" opacity="0.25"/>
    </svg>
  ),

  eye: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 20C4 20 10 10 20 10C30 10 36 20 36 20C36 20 30 30 20 30C10 30 4 20 4 20Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="20" cy="20" r="5" stroke={color} strokeWidth="1.6"/>
      <circle cx="20" cy="20" r="2" fill={color}/>
    </svg>
  ),

  infinity: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M15 20C15 16 17 14 20 14C23 14 25 16 26 20C27 24 29 26 32 26C35 26 36 14 32 14C28 14 26 16 25 20C24 24 22 26 20 26C17 26 15 24 14 20C13 16 11 14 8 14C5 14 4 26 8 26C12 26 14 24 15 20Z"
        stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),

  feather: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M10 34L28 8C30 5 35 7 33 12L20 34" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 34L10 34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M27 11L18 26" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
      <path d="M25 14L16 28" stroke={color} strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>
    </svg>
  ),

  cloud: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M30 28H11C8 28 6 26 6 23C6 20 8 18 11 18C11 14 14 12 18 12C20 12 22 13 23 14C24 11 27 9 31 11C34 12 36 15 36 18C37 19 38 21 38 23C38 26 35 28 30 28Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),

  crystal: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5L28 14L25 32H15L12 14L20 5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 14H28" stroke={color} strokeWidth="1.3"/>
      <path d="M20 5L15 14M20 5L25 14" stroke={color} strokeWidth="1" opacity="0.45"/>
    </svg>
  ),

  anchor: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="11" r="4" stroke={color} strokeWidth="1.6"/>
      <path d="M20 15V34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 21H8C8 28 14 33 20 34C26 33 32 28 32 21H28" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M14 21H26" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),

  tree: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5L30 20H10L20 5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 13L28 26H12L20 13Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <rect x="18" y="26" width="4" height="9" rx="1" stroke={color} strokeWidth="1.6"/>
    </svg>
  ),

  arrow: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 20H32M22 10L32 20L22 30" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  compass: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.6"/>
      <path d="M20 6V10M20 30V34M6 20H10M30 20H34" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M20 20L15 15L20 12L25 15L20 20Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M20 20L25 25L20 28L15 25L20 20Z" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  ),

  crown: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M6 28L10 14L20 22L30 14L34 28H6Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M6 32H34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="10" cy="13" r="2" fill={color}/>
      <circle cx="20" cy="10" r="2" fill={color}/>
      <circle cx="30" cy="13" r="2" fill={color}/>
    </svg>
  ),

  orbit: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="4.5" stroke={color} strokeWidth="1.8"/>
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke={color} strokeWidth="1.4" transform="rotate(-30 20 20)"/>
      <ellipse cx="20" cy="20" rx="14" ry="6" stroke={color} strokeWidth="0.7" transform="rotate(30 20 20)" opacity="0.4"/>
      <circle cx="31" cy="13" r="2" fill={color}/>
    </svg>
  ),

  planet: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="1.8"/>
      <ellipse cx="20" cy="20" rx="16" ry="5" stroke={color} strokeWidth="1.4" transform="rotate(-15 20 20)"/>
    </svg>
  ),

  snowflake: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="5" x2="20" y2="35" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="5" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8.4" y1="8.4" x2="31.6" y2="31.6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="31.6" y1="8.4" x2="8.4" y2="31.6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="3" fill={color}/>
    </svg>
  ),

  flower: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="3.5" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="11" rx="3" ry="5" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="20" cy="29" rx="3" ry="5" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="11" cy="20" rx="5" ry="3" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="29" cy="20" rx="5" ry="3" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="13.4" cy="13.4" rx="3" ry="5" transform="rotate(-45 13.4 13.4)" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="26.6" cy="26.6" rx="3" ry="5" transform="rotate(-45 26.6 26.6)" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="26.6" cy="13.4" rx="3" ry="5" transform="rotate(45 26.6 13.4)" stroke={color} strokeWidth="1.3"/>
      <ellipse cx="13.4" cy="26.6" rx="3" ry="5" transform="rotate(45 13.4 26.6)" stroke={color} strokeWidth="1.3"/>
    </svg>
  ),

  hourglass: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M10 6H30L20 20L30 34H10L20 20L10 6Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 6H30" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10 34H30" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M13 28H27" stroke={color} strokeWidth="1" opacity="0.4"/>
    </svg>
  ),

  key: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="14" cy="16" r="7" stroke={color} strokeWidth="1.8"/>
      <path d="M19 20L34 35" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M27 28L30 25" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M31 32L34 29" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),

  shield: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5L33 10V22C33 29 27 34 20 36C13 34 7 29 7 22V10L20 5Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 20L18 24L26 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  prism: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 5L35 33H5L20 5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 5L20 33" stroke={color} strokeWidth="1" opacity="0.3"/>
      <path d="M9 24L31 24" stroke={color} strokeWidth="1" opacity="0.3"/>
      <path d="M35 33L27 24" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M35 33L32 28" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),

  nucleus: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="3.5" fill={color}/>
      <ellipse cx="20" cy="20" rx="14" ry="5" stroke={color} strokeWidth="1.4"/>
      <ellipse cx="20" cy="20" rx="14" ry="5" stroke={color} strokeWidth="1.4" transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="14" ry="5" stroke={color} strokeWidth="1.4" transform="rotate(120 20 20)"/>
    </svg>
  ),

  clover: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="14" r="6" stroke={color} strokeWidth="1.6"/>
      <circle cx="14" cy="22" r="6" stroke={color} strokeWidth="1.6"/>
      <circle cx="26" cy="22" r="6" stroke={color} strokeWidth="1.6"/>
      <path d="M20 26V34" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),

  target: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.4" opacity="0.4"/>
      <circle cx="20" cy="20" r="9" stroke={color} strokeWidth="1.5" opacity="0.65"/>
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.8"/>
      <circle cx="20" cy="20" r="1.5" fill={color}/>
    </svg>
  ),

  vortex: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 20C24 15 32 15 32 20C32 25 27 30 20 30C13 30 7 25 7 18C7 11 13 7 21 7C27 7 32 11 33 18"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  moth: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 20C20 20 10 14 8 10C12 8 16 12 20 20Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 20C20 20 30 14 32 10C28 8 24 12 20 20Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 20C20 20 12 26 10 32C14 34 18 28 20 20Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" opacity="0.7"/>
      <path d="M20 20C20 20 28 26 30 32C26 34 22 28 20 20Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" opacity="0.7"/>
      <line x1="20" y1="20" x2="17" y2="12" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="20" y1="20" x2="23" y2="12" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  lantern: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="13" y="14" width="14" height="18" rx="3" stroke={color} strokeWidth="1.8"/>
      <path d="M16 14V10C16 8 18 7 20 7C22 7 24 8 24 10V14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="7" x2="20" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 32H27" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="17" y1="18" x2="17" y2="28" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      <line x1="20" y1="16" x2="20" y2="30" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      <line x1="23" y1="18" x2="23" y2="28" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
    </svg>
  ),

  arc: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M7 30C7 18 12 10 20 10C28 10 33 18 33 30" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 30C12 22 15 16 20 16C25 16 28 22 28 30" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),

  wave2: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M4 14C7 10 11 10 14 14C17 18 21 18 24 14C27 10 31 10 36 14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 22C7 18 11 18 14 22C17 26 21 26 24 22C27 18 31 18 36 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M4 30C7 26 11 26 14 30C17 34 21 34 24 30C27 26 31 26 36 30" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    </svg>
  ),

  lotus: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 30C20 30 14 24 14 18C14 13 17 10 20 10C23 10 26 13 26 18C26 24 20 30 20 30Z"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M20 30C20 30 10 26 8 20C7 15 10 11 13 11C16 12 17 16 14 18"
        stroke={color} strokeWidth="1.4" strokeLinejoin="round" opacity="0.7"/>
      <path d="M20 30C20 30 30 26 32 20C33 15 30 11 27 11C24 12 23 16 26 18"
        stroke={color} strokeWidth="1.4" strokeLinejoin="round" opacity="0.7"/>
      <path d="M20 30V35" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  bolt2: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M22 5L14 21H21L18 35L28 17H21L22 5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),

  seed: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="18" rx="8" ry="11" stroke={color} strokeWidth="1.8"/>
      <path d="M20 29V35" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M20 21L15 26" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M20 21L25 26" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  dna: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M13 5C13 5 27 10 27 20C27 30 13 35 13 35" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M27 5C27 5 13 10 13 20C13 30 27 35 27 35" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="12" x2="27" y2="10" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="13" y1="28" x2="27" y2="30" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  atom: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="3" fill={color}/>
      <ellipse cx="20" cy="20" rx="14" ry="5.5" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="20" rx="14" ry="5.5" stroke={color} strokeWidth="1.5" transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="14" ry="5.5" stroke={color} strokeWidth="1.5" transform="rotate(-60 20 20)"/>
    </svg>
  ),

  ring: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="2.5"/>
      <path d="M16 16L24 24M24 16L16 24" stroke={color} strokeWidth="0.8" opacity="0.3"/>
    </svg>
  ),

  web: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="1.4"/>
      <ellipse cx="20" cy="20" rx="7" ry="13" stroke={color} strokeWidth="1.2"/>
      <line x1="7" y1="20" x2="33" y2="20" stroke={color} strokeWidth="1.2"/>
      <path d="M9 13C13 15 17 16 20 16C23 16 27 15 31 13" stroke={color} strokeWidth="1" opacity="0.6"/>
      <path d="M9 27C13 25 17 24 20 24C23 24 27 25 31 27" stroke={color} strokeWidth="1" opacity="0.6"/>
    </svg>
  ),

  cube: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 6L33 13V27L20 34L7 27V13L20 6Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 6V20M7 13L20 20M33 13L20 20" stroke={color} strokeWidth="1.2" opacity="0.45"/>
      <path d="M20 20V34" stroke={color} strokeWidth="1.2" opacity="0.45"/>
    </svg>
  ),

  arrow2: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 8V32M10 22L20 32L30 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  triangle: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 7L35 33H5L20 7Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M20 7L20 33" stroke={color} strokeWidth="1" opacity="0.3"/>
      <path d="M12.5 20H27.5" stroke={color} strokeWidth="1" opacity="0.3"/>
    </svg>
  ),

  dot: ({ size = 40, color }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="8" fill={color} opacity="0.9"/>
      <circle cx="20" cy="20" r="13" stroke={color} strokeWidth="1.2" opacity="0.4"/>
      <circle cx="20" cy="20" r="3" fill="rgba(0,0,0,0.3)"/>
    </svg>
  ),
};

// Fallback
const Fallback: SymbolComponent = ({ size = 40, color }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="11" stroke={color} strokeWidth="1.8"/>
    <circle cx="20" cy="20" r="4" fill={color}/>
  </svg>
);

interface CardSymbolProps {
  symbol: string;
  color: string;
  size?: number;
}

export function CardSymbol({ symbol, color, size = 36 }: CardSymbolProps) {
  const Component = defs[symbol] ?? Fallback;
  return (
    <span style={{ display: 'inline-flex', transform: 'scale(1.14)', transformOrigin: 'center' }}>
      <Component size={size} color={color} />
    </span>
  );
}
