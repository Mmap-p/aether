'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'teal' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

const variantStyles: Record<string, CSSProperties> = {
  primary: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(127,236,220,0.25)',
    color: '#7FECDC',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  },
  ghost: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(232,240,255,0.45)',
  },
  teal: {
    background: 'rgba(127,236,220,0.1)',
    border: '1px solid rgba(127,236,220,0.25)',
    color: '#7FECDC',
  },
  violet: {
    background: 'rgba(192,132,252,0.1)',
    border: '1px solid rgba(192,132,252,0.25)',
    color: '#C084FC',
  },
};

const sizeStyles: Record<string, CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: '12px' },
  md: { padding: '10px 22px', fontSize: '14px' },
  lg: { padding: '14px 30px', fontSize: '15px' },
};

const hoverBorder: Record<string, string> = {
  primary: 'rgba(127,236,220,0.5)',
  ghost: 'rgba(255,255,255,0.25)',
  teal: 'rgba(127,236,220,0.5)',
  violet: 'rgba(192,132,252,0.5)',
};

const hoverBg: Record<string, string> = {
  primary: 'rgba(255,255,255,0.08)',
  ghost: 'rgba(255,255,255,0.05)',
  teal: 'rgba(127,236,220,0.15)',
  violet: 'rgba(192,132,252,0.15)',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
  className = '',
}: ButtonProps) {
  const base: CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    fontFamily: 'var(--font-body)',
    borderRadius: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 400,
    transition: 'border-color 200ms ease, background 200ms ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const motionProps = {
    whileTap: disabled ? {} : { scale: 0.97 },
    whileHover: disabled
      ? {}
      : {
          borderColor: hoverBorder[variant],
          backgroundColor: hoverBg[variant],
        },
    style: base,
    className,
    onClick: disabled ? undefined : onClick,
  };

  if (href && !disabled) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} style={{ color: 'inherit', textDecoration: 'none', display: 'contents' }}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} disabled={disabled}>
      {children}
    </motion.button>
  );
}
