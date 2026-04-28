'use client';

import { useState } from 'react';

interface GlassPanelProps {
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: string;
}

export default function GlassPanel({
  children,
  className = '',
  hover = false,
  onClick,
  padding = '24px',
}: GlassPanelProps) {
  const [hovered, setHovered] = useState(false);

  const active = hover && hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={hover ? () => setHovered(true) : undefined}
      onMouseLeave={hover ? () => setHovered(false) : undefined}
      className={className}
      style={{
        background: active
          ? 'rgba(255,255,255,0.055)'
          : 'rgba(255,255,255,0.035)',
        border: `1px solid ${active ? 'rgba(127,236,220,0.28)' : 'rgba(127,236,220,0.12)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding,
        transition: 'all 300ms ease',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {children}
    </div>
  );
}
