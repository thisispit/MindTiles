
import { motion } from 'framer-motion';

// The MindTiles logo mark — 4 tiles in a 2x2 grid
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="11" height="11" rx="3" fill="#14B8A6" />
      <rect x="16" y="1" width="11" height="11" rx="3" fill="#14B8A6" opacity="0.55" />
      <rect x="1" y="16" width="11" height="11" rx="3" fill="#14B8A6" opacity="0.55" />
      <rect x="16" y="16" width="11" height="11" rx="3" fill="#14B8A6" />
    </svg>
  );
}

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const sizeMap = {
  sm: { mark: 20, text: 'text-base', tag: 'text-xs' },
  md: { mark: 28, text: 'text-2xl', tag: 'text-sm' },
  lg: { mark: 40, text: 'text-4xl', tag: 'text-base' },
};

export function Logo({ showTagline = false, size = 'md', animated = false }: LogoProps) {
  const s = sizeMap[size];

  const Wrapper = animated ? motion.div : 'div';
  const wrapperProps = animated
    ? { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: 'easeOut' } }
    : {};

  return (
    <Wrapper className="flex flex-col items-center gap-2" {...(wrapperProps as object)}>
      <div className="flex items-center gap-2.5">
        <LogoMark size={s.mark} />
        <span
          className={`${s.text} font-semibold tracking-tight text-[#F8FAFC] letter-spacing-tight`}
          style={{ letterSpacing: '-0.02em' }}
        >
          MindTiles
        </span>
      </div>
      {showTagline && (
        <p className={`${s.tag} text-[#94A3B8] tracking-wide font-light`}>
          Sharpen your memory. One match at a time.
        </p>
      )}
    </Wrapper>
  );
}
