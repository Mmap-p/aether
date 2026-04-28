'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const navLinks = ['Features', 'Pricing', 'About', 'Community'];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(5,9,26,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(127,236,220,0.07)',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: '#E8F0FF',
              lineHeight: 1,
            }}
          >
            ÆTHER
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: '#7FECDC',
              letterSpacing: '0.18em',
              marginTop: '2px',
              lineHeight: 1,
            }}
          >
            SPACE INTELLIGENCE
          </div>
        </div>
      </Link>

      {/* Centre links — desktop only */}
      <nav
        style={{
          display: 'flex',
          gap: '32px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        className="hidden-mobile"
      >
        {navLinks.map((link) => (
          <NavLink key={link} href={`/${link.toLowerCase()}`}>
            {link}
          </NavLink>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
              width: '7px',
              height: '7px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#7FECDC',
                opacity: 0.4,
                animation: 'pulse-ring 1.8s ease-out infinite',
              }}
            />
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#7FECDC',
                display: 'block',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: '#7FECDC',
              letterSpacing: '0.12em',
            }}
          >
            LIVE
          </span>
        </div>

        <Button variant="ghost" size="sm" href="/auth/signin">
          Sign In
        </Button>
        <Button variant="primary" size="sm" href="/auth/signup">
          Join Free
        </Button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        fontWeight: 300,
        color: 'rgba(232,240,255,0.45)',
        textDecoration: 'none',
        transition: 'color 200ms ease',
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLAnchorElement).style.color = '#7FECDC';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLAnchorElement).style.color = 'rgba(232,240,255,0.45)';
      }}
    >
      {children}
    </Link>
  );
}
