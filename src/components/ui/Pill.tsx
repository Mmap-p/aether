interface PillProps {
  children: React.ReactNode;
  variant?: 'teal' | 'violet' | 'amber' | 'rose';
  size?: 'sm' | 'md';
}

const variants = {
  teal: {
    color: '#7FECDC',
    border: 'rgba(127,236,220,0.3)',
    background: 'rgba(127,236,220,0.06)',
  },
  violet: {
    color: '#C084FC',
    border: 'rgba(192,132,252,0.3)',
    background: 'rgba(192,132,252,0.06)',
  },
  amber: {
    color: '#FFD97D',
    border: 'rgba(255,217,125,0.3)',
    background: 'rgba(255,217,125,0.06)',
  },
  rose: {
    color: '#FF8FAB',
    border: 'rgba(255,143,171,0.3)',
    background: 'rgba(255,143,171,0.06)',
  },
};

export default function Pill({
  children,
  variant = 'teal',
  size = 'md',
}: PillProps) {
  const v = variants[variant];
  return (
    <span
      style={{
        display: 'inline-block',
        color: v.color,
        border: `1px solid ${v.border}`,
        background: v.background,
        borderRadius: '99px',
        padding: size === 'sm' ? '2px 8px' : '3px 10px',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.05em',
        fontWeight: 300,
        lineHeight: 1.6,
      }}
    >
      {children}
    </span>
  );
}
