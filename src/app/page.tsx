'use client';

import { motion, type Transition } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';

const SpaceScene = dynamic(() => import('@/components/stars/SpaceScene'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'absolute', right: 0, top: 0, width: '60%', height: '100%',
      background: 'rgba(255,255,255,0.018)', borderRadius: '0 16px 16px 0',
    }} />
  ),
});

const JWSTPanel = dynamic(() => import('@/components/stars/JWSTPanel'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '400px', marginTop: '2px',
      background: 'rgba(255,255,255,0.018)',
      border: '1px solid rgba(127,236,220,0.12)',
      borderRadius: '16px',
    }} />
  ),
});

const MarsScene = dynamic(() => import('@/components/stars/MarsScene'), {
  ssr: false,
  loading: () => null,
});

// ─── Animation helpers ────────────────────────────────────────────────────────

const ease: Transition = { duration: 0.7, ease: 'easeOut' } as Transition;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { ...ease, delay } as Transition,
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { ...ease, delay } as Transition,
});

// ─── Feed data ────────────────────────────────────────────────────────────────

const posts = [
  {
    initials: 'SC', color: '#7FECDC',
    name: 'Dr. Sarah Chen', role: 'Astrophysicist · MIT', time: '2m',
    content: 'Exceptional seeing tonight. M42 through my 10″ Dobsonian — the Trapezium fully resolved. H-α filter reveals the ionisation front with stunning clarity.',
    tag: 'M42',
  },
  {
    initials: 'AW', color: '#C084FC',
    name: 'AstroWatch', role: 'Automated Alert', time: '8m',
    content: '🛰 ISS visible over Mumbai at 21:47 IST. Max elevation 78°, magnitude −3.4, NNW→SSE. Clear skies confirmed. 3 min 14 sec of visibility.',
    tag: 'ISS PASS',
  },
  {
    initials: 'PM', color: '#FFD97D',
    name: 'Prof. R. Mehta', role: 'ISRO · Sr. Scientist', time: '1h',
    content: 'New JWST result: CO₂ detection at 4.3μm in TRAPPIST-1e atmosphere at 3.7σ significance. This changes the atmospheric characterisation game entirely.',
    tag: 'arXiv 2026',
  },
  {
    initials: 'RX', color: '#FF8FAB',
    name: 'stargazer_rx', role: 'Amateur · Pune', time: '2h',
    content: 'NGC 7331 — first light with my new APO refractor. Spiral arms clearly defined. The Deer Lick Group visible in the same field of view. Incredible night.',
    tag: 'NGC 7331',
  },
  {
    initials: 'OB', color: '#7FECDC',
    name: 'Observatory Bot', role: 'Space Weather', time: '3h',
    content: '🌌 Aurora alert: Kp-index 6.2. Visible at latitudes 55°N and above. NOAA SWPC confirms activity window of 4 hours. Capture window open now.',
    tag: 'AURORA',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PostCard({ post }: { post: typeof posts[0] }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(127,236,220,0.09)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '12px',
      padding: '18px 20px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '11px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: `${post.color}18`, border: `1px solid ${post.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: post.color,
          flexShrink: 0,
        }}>
          {post.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#E8F0FF' }}>
            {post.name}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(232,240,255,0.3)' }}>
            {post.role}
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.2)' }}>
          {post.time}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '12px',
        color: 'rgba(232,240,255,0.6)', lineHeight: 1.65, margin: '0 0 11px',
      }}>
        {post.content}
      </p>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        color: post.color, border: `1px solid ${post.color}28`,
        background: `${post.color}08`, borderRadius: '99px', padding: '2px 8px',
      }}>
        {post.tag}
      </span>
    </div>
  );
}

function ConstellationDots() {
  const pts = [
    { x: 55, y: 35 }, { x: 115, y: 72 }, { x: 88, y: 138 },
    { x: 158, y: 118 }, { x: 198, y: 55 }, { x: 38, y: 98 },
  ];
  const lines = [[0,1],[1,2],[1,3],[3,4],[0,4],[2,5]];
  return (
    <svg width="240" height="175" viewBox="0 0 240 175" style={{ opacity: 0.65 }}>
      {lines.map(([a, b], i) => (
        <line key={i}
          x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
          stroke="rgba(192,132,252,0.18)" strokeWidth="0.6"
        />
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#C084FC"
          style={{ animation: `dotPulse 2.8s ease-in-out infinite ${(i * 0.38).toFixed(2)}s` }}
        />
      ))}
    </svg>
  );
}

function Spectrograph() {
  const bars = Array.from({ length: 34 }, (_, i) => ({
    h: 0.15 + Math.abs(Math.sin(i * 0.78 + 1)) * 0.85,
    d: `${(i * 0.042).toFixed(3)}s`,
  }));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '80px', paddingTop: '8px' }}>
      {bars.map((bar, i) => (
        <div key={i} style={{
          width: '4px',
          height: `${bar.h * 100}%`,
          background: `rgba(255,217,125,${0.25 + bar.h * 0.55})`,
          borderRadius: '2px 2px 0 0',
          animation: `lineWave 2.2s ease-in-out infinite ${bar.d}`,
          transformOrigin: 'bottom',
        }} />
      ))}
    </div>
  );
}

function TelescopeSVG() {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none"
      style={{ animation: 'telescopeTilt 7s ease-in-out infinite' }}>
      <rect x="18" y="55" width="76" height="16" rx="8"
        fill="rgba(127,236,220,0.1)" stroke="rgba(127,236,220,0.38)" strokeWidth="1" />
      <ellipse cx="94" cy="63" rx="10" ry="12"
        fill="rgba(127,236,220,0.07)" stroke="rgba(127,236,220,0.5)" strokeWidth="1" />
      <ellipse cx="94" cy="63" rx="5.5" ry="6.5" fill="rgba(127,236,220,0.3)"
        style={{ animation: 'eyepieceGlow 3.5s ease-in-out infinite' }} />
      <line x1="58" y1="71" x2="52" y2="104" stroke="rgba(127,236,220,0.28)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="104" x2="40" y2="104" stroke="rgba(127,236,220,0.28)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="104" x2="64" y2="104" stroke="rgba(127,236,220,0.28)" strokeWidth="1.5" strokeLinecap="round" />
      {[[12,14],[32,8],[52,22],[102,12],[115,30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="rgba(232,240,255,0.55)"
          style={{ animation: `dotPulse 2s ease-in-out infinite ${(i * 0.28).toFixed(2)}s` }} />
      ))}
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageWrapper>
      <style>{`
        @keyframes feedScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); opacity: 0.45; }
          50%       { transform: translateX(-50%) translateY(10px); opacity: 0.9; }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(127,236,220,0.08); }
          50%       { box-shadow: 0 0 48px rgba(127,236,220,0.22), 0 0 80px rgba(127,236,220,0.08); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.45); }
        }
        @keyframes lineWave {
          0%, 100% { transform: scaleY(0.25); opacity: 0.35; }
          50%       { transform: scaleY(1);    opacity: 0.9;  }
        }
        @keyframes telescopeTilt {
          0%, 100% { transform: rotate(-3deg); }
          50%       { transform: rotate(3deg);  }
        }
        @keyframes eyepieceGlow {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 1; filter: blur(1px); }
        }
        @keyframes livePulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        @media (max-width: 768px) {
          .planet-wrap   { width: 280px !important; height: 280px !important; right: -140px !important; opacity: 0.55; }
          .planet-sphere { width: 260px !important; height: 260px !important; top: 10px !important; left: 10px !important; }
          .pillars-grid  { grid-template-columns: 1fr !important; }
          .feed-layout   { flex-direction: column !important; height: auto !important; }
          .feed-left     { position: relative !important; top: auto !important; height: auto !important; width: 100% !important; padding: 56px 6vw 32px !important; }
          .feed-right    { width: 100% !important; height: 380px !important; padding-left: 6vw !important; }
          .tools-layout  { flex-direction: column !important; gap: 40px !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8vw',
        overflow: 'hidden',
      }}>
        <SpaceScene />

        {/* Left content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '580px', paddingTop: '64px', paddingBottom: '100px' }}>

          {/* Origin label */}
          <motion.div {...fadeUp(0)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: '#7FECDC', letterSpacing: '0.22em', marginBottom: '32px',
          }}>
            EST. 2025 · MUMBAI · EARTH
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' } as Transition}
            >
              <h1 style={{ margin: 0, padding: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 7.5vw, 96px)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.0,
                  color: '#E8F0FF',
                  marginBottom: '2px',
                }}>
                  THE COSMOS
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 7.5vw, 96px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.0,
                  background: 'linear-gradient(130deg, #7FECDC 0%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 48px rgba(127,236,220,0.28))',
                }}>
                  IS SOCIAL NOW
                </div>
              </h1>
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p {...fadeUp(0.55)} style={{
            fontFamily: 'var(--font-body)', fontSize: '18px',
            color: 'rgba(232,240,255,0.52)', maxWidth: '460px',
            lineHeight: 1.75, margin: '28px 0 0',
          }}>
            Join the scientists, astronomers, and dreamers mapping humanity&apos;s
            relationship with the universe.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.75)} style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ borderColor: 'rgba(127,236,220,0.52)', background: 'rgba(127,236,220,0.07)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(127,236,220,0.28)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  padding: '14px 34px',
                  fontFamily: 'var(--font-body)', fontSize: '16px',
                  color: '#7FECDC', cursor: 'pointer',
                  transition: 'all 220ms ease',
                }}
              >
                Enter ÆTHER
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ borderColor: 'rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('statement')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px 28px',
                fontFamily: 'var(--font-body)', fontSize: '16px',
                color: 'rgba(232,240,255,0.42)', cursor: 'pointer',
                transition: 'all 220ms ease',
              }}
            >
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                border: '1px solid rgba(232,240,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderStyle: 'solid',
                  borderWidth: '5px 0 5px 9px',
                  borderColor: 'transparent transparent transparent rgba(232,240,255,0.45)',
                  marginLeft: '2px',
                }} />
              </div>
              Watch the Story
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.95)} style={{
            display: 'flex',
            marginTop: '56px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { num: '2,847', label: 'Observers', color: '#7FECDC' },
              { num: '14K+',  label: 'Objects Logged', color: '#C084FC' },
              { num: '891',   label: 'Papers Discussed', color: '#FFD97D' },
            ].map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <div style={{
                    width: '1px', height: '38px',
                    background: 'rgba(255,255,255,0.07)',
                    margin: '0 28px',
                  }} />
                )}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '26px',
                    fontWeight: 300, color: s.color, lineHeight: 1,
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    color: 'rgba(232,240,255,0.32)', marginTop: '5px',
                  }}>{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px',
          animation: 'chevronBounce 2.2s ease-in-out infinite',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'rgba(127,236,220,0.38)', letterSpacing: '0.22em',
          }}>SCROLL</span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1l7 7 7-7" stroke="rgba(127,236,220,0.38)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — STATEMENT
      ════════════════════════════════════════════ */}
      <section
        id="statement"
        style={{
          minHeight: '80vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 6vw',
          background: 'linear-gradient(90deg, rgba(127,236,220,0.025) 0%, rgba(192,132,252,0.025) 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, ease: 'easeOut' } as Transition}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 7.5vw, 118px)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            lineHeight: 1.05,
          }}>
            <div style={{ color: 'rgba(232,240,255,0.07)' }}>SCIENCE IS BETTER</div>
            <div>
              <span style={{ color: 'rgba(232,240,255,0.07)' }}>WHEN IT&apos;S </span>
              <span style={{
                color: '#E8F0FF',
                filter: 'drop-shadow(0 0 60px rgba(127,236,220,0.5)) drop-shadow(0 0 20px rgba(127,236,220,0.3))',
              }}>
                SHARED
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...inView(0.3)}
          style={{
            marginTop: '52px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(127,236,220,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '99px',
            padding: '14px 32px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '15px',
            color: 'rgba(232,240,255,0.42)', margin: 0, lineHeight: 1.65,
            maxWidth: '400px',
          }}>
            Since the first telescope, science has been social. ÆTHER makes it digital.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — THREE PILLARS
      ════════════════════════════════════════════ */}
      <section style={{ overflow: 'hidden' }}>
        <div
          className="pillars-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
        >
          {/* 01 OBSERVE */}
          <motion.div
            {...inView(0)}
            style={{
              minHeight: '480px', padding: '48px 44px',
              background: 'rgba(127,236,220,0.018)',
              border: '1px solid rgba(127,236,220,0.1)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '-24px', left: '20px',
              fontFamily: 'var(--font-display)', fontSize: '170px', fontWeight: 300,
              color: 'rgba(127,236,220,0.055)', lineHeight: 1,
              userSelect: 'none', pointerEvents: 'none',
            }}>01</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <TelescopeSVG />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: '#7FECDC', letterSpacing: '0.2em', marginBottom: '14px',
              }}>OBSERVE</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '32px',
                fontWeight: 300, color: '#E8F0FF', margin: '0 0 14px',
              }}>Share what you see</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'rgba(232,240,255,0.42)', lineHeight: 1.75, margin: 0,
              }}>
                Structured observation posts linked to real catalog IDs. Your M42 is the M42.
              </p>
            </div>
          </motion.div>

          {/* 02 DISCOVER */}
          <motion.div
            {...inView(0.15)}
            style={{
              minHeight: '480px', padding: '48px 44px',
              background: 'rgba(192,132,252,0.018)',
              border: '1px solid rgba(192,132,252,0.1)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '-24px', left: '20px',
              fontFamily: 'var(--font-display)', fontSize: '170px', fontWeight: 300,
              color: 'rgba(192,132,252,0.055)', lineHeight: 1,
              userSelect: 'none', pointerEvents: 'none',
            }}>02</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <ConstellationDots />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: '#C084FC', letterSpacing: '0.2em', marginBottom: '14px',
              }}>DISCOVER</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '32px',
                fontWeight: 300, color: '#E8F0FF', margin: '0 0 14px',
              }}>Find your people</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'rgba(232,240,255,0.42)', lineHeight: 1.75, margin: 0,
              }}>
                Follow objects, not just people. Get notified when someone observes YOUR target.
              </p>
            </div>
          </motion.div>

          {/* 03 RESEARCH */}
          <motion.div
            {...inView(0.3)}
            style={{
              minHeight: '480px', padding: '48px 44px',
              background: 'rgba(255,217,125,0.018)',
              border: '1px solid rgba(255,217,125,0.1)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '-24px', left: '20px',
              fontFamily: 'var(--font-display)', fontSize: '170px', fontWeight: 300,
              color: 'rgba(255,217,125,0.055)', lineHeight: 1,
              userSelect: 'none', pointerEvents: 'none',
            }}>03</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Spectrograph />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: '#FFD97D', letterSpacing: '0.2em', marginBottom: '14px',
              }}>RESEARCH</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '32px',
                fontWeight: 300, color: '#E8F0FF', margin: '0 0 14px',
              }}>Stay at the frontier</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'rgba(232,240,255,0.42)', lineHeight: 1.75, margin: 0,
              }}>
                Latest ArXiv papers, discussion threads, and citations — all in one feed.
              </p>
            </div>
          </motion.div>
        </div>

        {/* JWST Pillars of Creation — full-width fourth card */}
        <div style={{ padding: '0 0' }}>
          <JWSTPanel />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — LIVE FEED STRIP
      ════════════════════════════════════════════ */}
      <section
        className="feed-layout"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left — sticky text */}
        <div
          className="feed-left"
          style={{
            width: '40%',
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '0 5vw',
            zIndex: 10,
          }}
        >
          <motion.div {...inView(0)}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: '#7FECDC', letterSpacing: '0.2em',
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '22px',
            }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px' }}>
                <span style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%', background: '#7FECDC', opacity: 0.45,
                  animation: 'livePulse 1.8s ease-out infinite',
                }} />
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#7FECDC', display: 'block', position: 'relative', zIndex: 1,
                }} />
              </span>
              LIVE FROM THE COMMUNITY
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 3.8vw, 54px)',
              fontWeight: 300, color: '#E8F0FF',
              lineHeight: 1.12, margin: '0 0 20px',
            }}>
              This is happening<br />right now
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '15px',
              color: 'rgba(232,240,255,0.42)', lineHeight: 1.75,
              margin: '0 0 32px', maxWidth: '300px',
            }}>
              Real scientists. Real observations. Real discoveries. Updated every minute.
            </p>
            <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ borderColor: 'rgba(127,236,220,0.38)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  border: '1px solid rgba(127,236,220,0.16)',
                  borderRadius: '10px', padding: '11px 22px',
                  fontFamily: 'var(--font-body)', fontSize: '14px', color: '#7FECDC',
                  transition: 'all 220ms ease',
                }}
              >
                Join the conversation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="#7FECDC" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Right — auto-scroll feed */}
        <div
          className="feed-right"
          style={{
            width: '60%',
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            paddingLeft: '24px',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '130px',
            background: 'linear-gradient(to bottom, #05091A, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '130px',
            background: 'linear-gradient(to top, #05091A, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <div style={{
            display: 'flex', flexDirection: 'column', gap: '14px',
            padding: '60px 40px 60px 0',
            animation: 'feedScroll 30s linear infinite',
          }}>
            {[...posts, ...posts].map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — TOOLS TEASER
      ════════════════════════════════════════════ */}
      <section style={{ padding: '120px 8vw', position: 'relative', overflow: 'hidden' }}>
        {/* Mars terrain background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <MarsScene />
        </div>
        <div
          className="tools-layout"
          style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '72px' }}
        >
          <motion.div {...inView(0)} style={{ flexShrink: 0 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5vw, 72px)',
              fontWeight: 300, color: '#E8F0FF',
              lineHeight: 1.1, margin: 0,
            }}>
              Seven tools.
              <br />
              <span style={{ color: 'rgba(232,240,255,0.35)' }}>Zero compromises.</span>
            </h2>
          </motion.div>

          <motion.div
            {...inView(0.2)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth: '520px' }}
          >
            {[
              { icon: '🛰', name: 'ISS Tracker',    tag: 'LIVE',        color: '#7FECDC' },
              { icon: '🌌', name: 'Sky Events',      tag: 'FREE',        color: '#C084FC' },
              { icon: '☀️', name: 'Space Weather',   tag: 'REALTIME',    color: '#FFD97D' },
              { icon: '🔭', name: 'Solar System',    tag: 'INTERACTIVE', color: '#7FECDC' },
              { icon: '📄', name: 'ArXiv Feed',      tag: 'DAILY',       color: '#C084FC' },
              { icon: '🌅', name: 'APOD',            tag: 'BEAUTIFUL',   color: '#FFD97D' },
              { icon: '📋', name: 'Obs. Planner',    tag: 'PRO',         color: '#FF8FAB' },
            ].map((tool) => (
              <motion.div
                key={tool.name}
                whileHover={{
                  borderColor: `${tool.color}38`,
                  background: `${tool.color}07`,
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(127,236,220,0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '12px', padding: '12px 18px',
                  cursor: 'default', transition: 'all 200ms ease',
                }}
              >
                <span style={{ fontSize: '18px' }}>{tool.icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#E8F0FF' }}>
                  {tool.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: tool.color,
                  border: `1px solid ${tool.color}28`,
                  borderRadius: '99px', padding: '2px 7px', letterSpacing: '0.06em',
                }}>{tool.tag}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p
          {...inView(0.4)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: 'rgba(232,240,255,0.28)',
            textAlign: 'center', marginTop: '72px', letterSpacing: '0.02em',
          }}
        >
          All powered by NASA, JPL, and ESA open data. Free forever for the basics.
        </motion.p>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 6 — FINAL CTA
      ════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 6vw',
        position: 'relative',
        background: 'radial-gradient(ellipse 80% 60% at center, rgba(127,236,220,0.04) 0%, transparent 70%)',
      }}>
        <motion.div
          {...inView(0)}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 7.5vw, 96px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            marginBottom: '24px',
          }}
        >
          <div style={{ color: '#E8F0FF' }}>YOUR OBSERVATORY</div>
          <div style={{
            background: 'linear-gradient(130deg, #7FECDC 0%, #C084FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 48px rgba(127,236,220,0.22))',
          }}>
            AWAITS.
          </div>
        </motion.div>

        <motion.div {...inView(0.2)} style={{
          fontFamily: 'var(--font-mono)', fontSize: '12px',
          color: '#7FECDC', letterSpacing: '0.1em', marginBottom: '52px',
        }}>
          Join 2,847 scientists already inside.
        </motion.div>

        <motion.div {...inView(0.38)}>
          <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{
                borderColor: 'rgba(127,236,220,0.52)',
                background: 'rgba(127,236,220,0.07)',
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(127,236,220,0.28)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '14px',
                padding: '18px 52px',
                fontFamily: 'var(--font-body)', fontSize: '17px',
                color: '#7FECDC', cursor: 'pointer',
                transition: 'all 250ms ease',
                animation: 'ctaPulse 3.2s ease-in-out infinite',
              }}
            >
              Create Your Free Account
            </motion.div>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          {...inView(0.55)}
          style={{
            display: 'flex', gap: '28px', flexWrap: 'wrap',
            justifyContent: 'center', alignItems: 'center',
            marginTop: '80px',
          }}
        >
          {['NASA', 'ISRO', 'ESA', 'MIT', 'CALTECH', 'HARVARD CfA'].map((org) => (
            <span
              key={org}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: 'rgba(232,240,255,0.18)', letterSpacing: '0.15em',
              }}
            >
              {org}
            </span>
          ))}
        </motion.div>
      </section>
    </PageWrapper>
  );
}
