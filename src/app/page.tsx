'use client';

import { motion, type Transition } from 'framer-motion';
import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';

// ─── Animation helpers ────────────────────────────────────────────────────────

const ease = { duration: 0.7, ease: 'easeOut' } as Transition;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { ...ease, delay } as Transition,
});

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { ...ease, delay } as Transition,
});

// ─── Asset URLs ───────────────────────────────────────────────────────────────

const HERO_PLANET   = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1280px-The_Earth_seen_from_Apollo_17.jpg';

const CARD_OBSERVE  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/1280px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg';
const CARD_DISCOVER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Artemis_I_liftoff_from_LC-39B_%28NHQ202211160027%29.jpg/1280px-Artemis_I_liftoff_from_LC-39B_%28NHQ202211160027%29.jpg';
const CARD_RESEARCH = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/1280px-HST-SM4.jpeg';

const FEED_IMG_1    = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-0a-99.jpg/1280px-ESO-VLT-Laser-phot-0a-99.jpg';
const FEED_IMG_2    = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1280px-FullMoon2010.jpg';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageWrapper>
      <style>{`
        .hero-planet {
          mix-blend-mode: screen;
          opacity: 0.8;
          pointer-events: none;
          user-select: none;
        }
        .pillar-card {
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(127,236,220,0.1);
          transition: border-color 300ms ease, background 300ms ease, box-shadow 0.5s ease;
          cursor: default;
          box-shadow: none;
        }
        .pillar-card:hover {
          border-color: rgba(127,236,220,0.28);
          background: rgba(255,255,255,0.055);
        }
        .pillar-card .card-bg {
          transition: opacity 0.5s ease, filter 0.5s ease;
          opacity: 0.45;
          filter: brightness(0.7) saturate(0.8);
        }
        .pillar-card:hover .card-bg {
          opacity: 0.7;
          filter: brightness(1.1) saturate(1.3) contrast(1.05);
        }
        .pillar-observe:hover {
          box-shadow: inset 0 0 60px rgba(127,236,220,0.08), 0 0 30px rgba(127,236,220,0.05);
        }
        .pillar-discover:hover {
          box-shadow: inset 0 0 60px rgba(192,132,252,0.08);
        }
        .pillar-research:hover {
          box-shadow: inset 0 0 60px rgba(255,217,125,0.08);
        }
        .pillar-underline {
          display: block;
          height: 1.5px;
          width: 0;
          border-radius: 2px;
          margin-top: 12px;
          transition: width 400ms ease;
        }
        .pillar-card:hover .pillar-underline {
          width: 100%;
        }
        .feed-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(127,236,220,0.1);
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          width: 400px;
          transition: border-color 300ms ease;
        }
        .feed-card:hover {
          border-color: rgba(127,236,220,0.28);
        }
        @keyframes livePulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes ctaGlow {
          0%, 100% { box-shadow: 0 0 24px rgba(127,236,220,0.18), 0 4px 20px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 48px rgba(127,236,220,0.36), 0 4px 32px rgba(0,0,0,0.4); }
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
          50%       { transform: translateX(-50%) translateY(10px); opacity: 0.9; }
        }
        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; min-height: auto !important; padding-top: 100px !important; padding-bottom: 60px !important; }
          .hero-planet-wrap { position: relative !important; right: auto !important; top: auto !important; transform: none !important; width: 100% !important; height: 280px !important; margin-top: 40px !important; }
          .hero-planet { opacity: 0.5 !important; width: 100% !important; height: 100% !important; object-fit: cover !important; }
          .hero-gradient-overlay { display: none !important; }
          .stats-row { flex-wrap: wrap !important; gap: 24px 0 !important; }
          .stats-row > div { width: 50% !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .pillar-card { min-height: 360px !important; }
          .feed-scroll { padding-bottom: 12px !important; }
          .feed-scroll { -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; }
          .feed-card { scroll-snap-align: start; width: 85vw !important; min-width: 280px !important; }
          .cta-panel { padding: 48px 6vw !important; }
          .cta-heading { font-size: clamp(36px, 9vw, 60px) !important; }
          .hero-heading { font-size: clamp(44px, 11vw, 72px) !important; }
          .statement-text { font-size: clamp(32px, 8vw, 72px) !important; }
        }
        @media (min-width: 769px) {
          .hero-right-col { display: block !important; }
        }
      `}</style>

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════ */}
      <section
        className="hero-grid"
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6vw',
          overflow: 'hidden',
          gap: '0',
        }}
      >
        {/* Left column */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          flex: '0 0 auto',
          width: 'min(580px, 58%)',
          paddingTop: '80px',
          paddingBottom: '100px',
        }}>
          {/* Label */}
          <motion.div {...fadeUp(0)} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#7FECDC',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}>
            Est. 2025 · Mumbai · Earth
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' } as Transition}
            className="hero-heading"
            style={{
              margin: 0, padding: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 6.5vw, 88px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.0,
            }}
          >
            <div style={{ color: '#E8F0FF', marginBottom: '4px' }}>THE COSMOS IS</div>
            <div style={{
              fontStyle: 'italic',
              background: 'linear-gradient(130deg, #7FECDC 0%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(127,236,220,0.28))',
            }}>
              SOCIAL NOW
            </div>
          </motion.h1>

          {/* Subtext */}
          <motion.p {...fadeUp(0.4)} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            color: 'rgba(232,240,255,0.52)',
            maxWidth: '460px',
            lineHeight: 1.75,
            margin: '28px 0 0',
          }}>
            Join the scientists, astronomers, and dreamers mapping humanity&apos;s
            relationship with the universe. Real observations. Real discoveries.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.58)} style={{
            display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap',
          }}>
            <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ borderColor: 'rgba(127,236,220,0.55)', background: 'rgba(127,236,220,0.09)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(127,236,220,0.32)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  padding: '14px 34px',
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: '#7FECDC', cursor: 'pointer',
                  transition: 'all 220ms ease',
                  animation: 'ctaGlow 3.5s ease-in-out infinite',
                }}
              >
                Enter ÆTHER
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('statement')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px 28px',
                fontFamily: 'var(--font-body)', fontSize: '15px',
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
                  width: 0, height: 0, borderStyle: 'solid',
                  borderWidth: '5px 0 5px 9px',
                  borderColor: 'transparent transparent transparent rgba(232,240,255,0.5)',
                  marginLeft: '2px',
                }} />
              </div>
              Watch the Story
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.75)} className="stats-row" style={{
            display: 'flex',
            marginTop: '52px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[
              { num: '2,847', label: 'Observers',      color: '#7FECDC' },
              { num: '14K+',  label: 'Objects Logged', color: '#C084FC' },
              { num: '891',   label: 'Papers Discussed', color: '#FFD97D' },
            ].map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <div style={{ width: '1px', height: '38px', background: 'rgba(255,255,255,0.07)', margin: '0 24px' }} />
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

        {/* Right column — planet image */}
        <div
          className="hero-right-col hero-planet-wrap"
          style={{
            position: 'absolute',
            right: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '52%',
            maxWidth: '700px',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {/* Left-to-right gradient overlay so planet fades into page */}
          <div
            className="hero-gradient-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #05091A 0%, transparent 40%)',
              zIndex: 2,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_PLANET}
            alt="Space planet"
            crossOrigin="anonymous"
            className="hero-planet"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          animation: 'chevronBounce 2.2s ease-in-out infinite',
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'rgba(127,236,220,0.4)', letterSpacing: '0.22em',
          }}>SCROLL</span>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1l6 6 6-6" stroke="rgba(127,236,220,0.4)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — BOLD STATEMENT
      ════════════════════════════════════════════ */}
      <section
        id="statement"
        style={{
          background: '#080d1e',
          padding: '100px 8vw',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(127,236,220,0.04) 0%, transparent 70%)',
        }} />

        <motion.div {...inView(0)} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Mission label */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#7FECDC',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '40px',
            opacity: 0.8,
          }}>
            [ Mission Protocol ]
          </div>

          {/* Giant statement */}
          <div
            className="statement-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6.5vw, 96px)',
              fontWeight: 300,
              letterSpacing: '0.03em',
              lineHeight: 1.08,
              color: '#E8F0FF',
            }}
          >
            <span style={{ color: 'rgba(232,240,255,0.18)' }}>SCIENCE IS BETTER</span>
            <br />
            <span style={{ color: 'rgba(232,240,255,0.18)' }}>WHEN IT&apos;S </span>
            <span style={{
              color: '#7FECDC',
              filter: 'drop-shadow(0 0 40px rgba(127,236,220,0.5)) drop-shadow(0 0 16px rgba(127,236,220,0.3))',
            }}>SHARED.</span>
          </div>

          <motion.p
            {...inView(0.25)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(232,240,255,0.38)',
              maxWidth: '440px',
              margin: '40px auto 0',
              lineHeight: 1.75,
            }}
          >
            Since the first telescope, science has been social. ÆTHER makes it digital.
          </motion.p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — THREE TALL PILLAR CARDS
      ════════════════════════════════════════════ */}
      <section style={{ overflow: 'hidden' }}>
        <div
          className="pillars-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
        >
          {/* 01 — OBSERVE */}
          <motion.div {...inView(0)} className="pillar-card pillar-observe" style={{ minHeight: '600px' }}>
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CARD_OBSERVE}
              alt=""
              crossOrigin="anonymous"
              aria-hidden="true"
              className="card-bg"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
              }}
            />
            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,9,26,0.95) 0%, rgba(5,9,26,0.55) 60%, rgba(5,9,26,0.2) 100%)',
              zIndex: 1,
            }} />
            {/* Content */}
            <div style={{
              position: 'relative', zIndex: 2,
              height: '100%', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', padding: '40px 40px 48px',
            }}>
              {/* Number watermark */}
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '140px', fontWeight: 300,
                color: 'rgba(127,236,220,0.07)', lineHeight: 1, userSelect: 'none',
                marginTop: '-16px', marginLeft: '-8px',
              }}>01</div>

              <div>
                {/* Pill */}
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: '#7FECDC', border: '1px solid rgba(127,236,220,0.3)',
                  background: 'rgba(127,236,220,0.08)',
                  borderRadius: '99px', padding: '3px 12px',
                  letterSpacing: '0.08em', marginBottom: '20px',
                }}>01 / REAL-TIME</span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 3.8vw, 60px)',
                  fontWeight: 300, color: '#E8F0FF',
                  margin: '0 0 14px', lineHeight: 1.1,
                }}>OBSERVE</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(232,240,255,0.52)', lineHeight: 1.75, margin: 0,
                  maxWidth: '280px',
                }}>
                  Structured observation posts linked to real catalog IDs.
                  Your M42 is the M42. Share what you see.
                </p>
                <span className="pillar-underline" style={{ background: '#7FECDC' }} />
              </div>
            </div>
          </motion.div>

          {/* 02 — DISCOVER */}
          <motion.div {...inView(0.12)} className="pillar-card pillar-discover" style={{ minHeight: '600px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CARD_DISCOVER}
              alt=""
              crossOrigin="anonymous"
              aria-hidden="true"
              className="card-bg"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,9,26,0.95) 0%, rgba(5,9,26,0.55) 60%, rgba(5,9,26,0.2) 100%)',
              zIndex: 1,
            }} />
            <div style={{
              position: 'relative', zIndex: 2,
              height: '100%', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', padding: '40px 40px 48px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '140px', fontWeight: 300,
                color: 'rgba(192,132,252,0.07)', lineHeight: 1, userSelect: 'none',
                marginTop: '-16px', marginLeft: '-8px',
              }}>02</div>

              <div>
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: '#C084FC', border: '1px solid rgba(192,132,252,0.3)',
                  background: 'rgba(192,132,252,0.08)',
                  borderRadius: '99px', padding: '3px 12px',
                  letterSpacing: '0.08em', marginBottom: '20px',
                }}>02 / EXOPLANETS</span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 3.8vw, 60px)',
                  fontWeight: 300, color: '#E8F0FF',
                  margin: '0 0 14px', lineHeight: 1.1,
                }}>DISCOVER</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(232,240,255,0.52)', lineHeight: 1.75, margin: 0,
                  maxWidth: '280px',
                }}>
                  Follow objects, not just people. Get notified when someone
                  observes your target.
                </p>
                <span className="pillar-underline" style={{ background: '#C084FC' }} />
              </div>
            </div>
          </motion.div>

          {/* 03 — RESEARCH */}
          <motion.div {...inView(0.24)} className="pillar-card pillar-research" style={{ minHeight: '600px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CARD_RESEARCH}
              alt=""
              crossOrigin="anonymous"
              aria-hidden="true"
              className="card-bg"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,9,26,0.95) 0%, rgba(5,9,26,0.55) 60%, rgba(5,9,26,0.2) 100%)',
              zIndex: 1,
            }} />
            <div style={{
              position: 'relative', zIndex: 2,
              height: '100%', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', padding: '40px 40px 48px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '140px', fontWeight: 300,
                color: 'rgba(255,217,125,0.07)', lineHeight: 1, userSelect: 'none',
                marginTop: '-16px', marginLeft: '-8px',
              }}>03</div>

              <div>
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: '#FFD97D', border: '1px solid rgba(255,217,125,0.3)',
                  background: 'rgba(255,217,125,0.08)',
                  borderRadius: '99px', padding: '3px 12px',
                  letterSpacing: '0.08em', marginBottom: '20px',
                }}>03 / ACADEMIC</span>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 3.8vw, 60px)',
                  fontWeight: 300, color: '#E8F0FF',
                  margin: '0 0 14px', lineHeight: 1.1,
                }}>RESEARCH</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(232,240,255,0.52)', lineHeight: 1.75, margin: 0,
                  maxWidth: '280px',
                }}>
                  Latest ArXiv papers, discussion threads, and citations —
                  all in one live feed.
                </p>
                <span className="pillar-underline" style={{ background: '#FFD97D' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — LIVE FEED
      ════════════════════════════════════════════ */}
      <section style={{ padding: '100px 6vw', overflow: 'hidden' }}>
        {/* Header */}
        <motion.div {...inView(0)} style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: '#7FECDC', letterSpacing: '0.2em',
            textTransform: 'uppercase', marginBottom: '14px',
          }}>
            <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px' }}>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#7FECDC', opacity: 0.5,
                animation: 'livePulse 1.8s ease-out infinite',
              }} />
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#7FECDC', display: 'block', position: 'relative', zIndex: 1,
              }} />
            </span>
            Telemetry Stream
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 300, color: '#E8F0FF',
            margin: 0, lineHeight: 1.1,
          }}>Live Observation Feed</h2>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, row on desktop */}
        <motion.div
          {...inView(0.15)}
          className="feed-scroll"
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Card 1 — Dr. Sarah Vance */}
          <div className="feed-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FEED_IMG_1}
              alt="Solar flare observation"
              crossOrigin="anonymous"
              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '20px 20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'rgba(127,236,220,0.12)',
                  border: '1px solid rgba(127,236,220,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#7FECDC',
                  flexShrink: 0,
                }}>SV</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#E8F0FF' }}>
                    Dr. Sarah Vance
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(232,240,255,0.35)' }}>
                    Mauna Kea Observatory
                  </div>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: 'rgba(232,240,255,0.6)', lineHeight: 1.65, margin: '0 0 14px',
              }}>
                Unexpected solar flare activity detected at 0847 UTC. X2.3 class event
                with associated CME — likely Aurora visible at high latitudes this weekend.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'rgba(232,240,255,0.4)',
                }}>❤ 1.2k</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'rgba(232,240,255,0.4)',
                }}>💬 84</span>
              </div>
            </div>
          </div>

          {/* Card 2 — Project Voyager */}
          <div className="feed-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FEED_IMG_2}
              alt="Lunar south pole"
              crossOrigin="anonymous"
              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '20px 20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'rgba(192,132,252,0.12)',
                  border: '1px solid rgba(192,132,252,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#C084FC',
                  flexShrink: 0,
                }}>PV</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#E8F0FF' }}>
                    Project Voyager
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(232,240,255,0.35)' }}>
                    Deep Space Network
                  </div>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: 'rgba(232,240,255,0.6)', lineHeight: 1.65, margin: '0 0 14px',
              }}>
                New high-res composites of Lunar south pole ice deposits released.
                Permanently shadowed regions confirm water ice abundance exceeds
                prior estimates by ~23%.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'rgba(232,240,255,0.4)',
                }}>❤ 3.5k</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'rgba(232,240,255,0.4)',
                }}>💬 210</span>
              </div>
            </div>
          </div>

          {/* Card 3 — AstroMetric_001 (no image — data viz placeholder) */}
          <div className="feed-card">
            {/* Gravitational wave chirp visualization */}
            <div style={{
              width: '100%', height: '256px',
              background: '#020810',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Grid lines */}
              {[20,40,60,80].map(pct => (
                <div key={pct} style={{
                  position: 'absolute', left: 0, right: 0,
                  top: `${pct}%`, height: '1px',
                  background: 'rgba(255,255,255,0.03)',
                }} />
              ))}
              {/* Animated SVG wave */}
              <svg
                width="200%" height="100%"
                viewBox="0 0 800 256"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  animation: 'gwScroll 8s linear infinite',
                }}
              >
                {/* Noise baseline — teal faint */}
                <polyline
                  fill="none"
                  stroke="rgba(127,236,220,0.18)"
                  strokeWidth="1"
                  points={Array.from({length: 401}, (_, i) => {
                    const x = i * 2;
                    const y = 128 + (Math.sin(i * 0.8) * 3 + Math.sin(i * 2.1) * 1.5);
                    return `${x},${y}`;
                  }).join(' ')}
                />
                {/* Secondary chirp — violet */}
                <polyline
                  fill="none"
                  stroke="rgba(192,132,252,0.45)"
                  strokeWidth="1.2"
                  points={Array.from({length: 401}, (_, i) => {
                    const x = i * 2;
                    const phase = i * 0.04 + Math.pow(i / 400, 3) * 80;
                    const amp = 4 + Math.pow(i / 400, 2.5) * 30;
                    const y = 128 + Math.sin(phase) * amp * 0.6;
                    return `${x},${y}`;
                  }).join(' ')}
                />
                {/* Main chirp — teal */}
                <polyline
                  fill="none"
                  stroke="#7FECDC"
                  strokeWidth="1.8"
                  points={Array.from({length: 401}, (_, i) => {
                    const x = i * 2;
                    const phase = i * 0.04 + Math.pow(i / 400, 3) * 80;
                    const amp = 4 + Math.pow(i / 400, 2.5) * 30;
                    const y = 128 + Math.sin(phase) * amp;
                    return `${x},${y}`;
                  }).join(' ')}
                  style={{ filter: 'drop-shadow(0 0 3px rgba(127,236,220,0.6))' }}
                />
              </svg>
              {/* Labels */}
              <div style={{
                position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(127,236,220,0.55)',
                letterSpacing: '0.1em', whiteSpace: 'nowrap',
              }}>LIGO O4 · GW240428</div>
              <div style={{
                position: 'absolute', bottom: '8px', right: '12px',
                fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(232,240,255,0.25)',
                letterSpacing: '0.08em',
              }}>TIME (seconds)</div>
              <div style={{
                position: 'absolute', left: '8px', top: '50%',
                transform: 'translateY(-50%) rotate(-90deg)',
                fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(232,240,255,0.25)',
                letterSpacing: '0.08em', whiteSpace: 'nowrap',
              }}>STRAIN h(t)</div>
              <style>{`
                @keyframes gwScroll {
                  from { transform: translateX(0); }
                  to   { transform: translateX(-50%); }
                }
              `}</style>
            </div>
            <div style={{ padding: '20px 20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'rgba(255,217,125,0.12)',
                  border: '1px solid rgba(255,217,125,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#FFD97D',
                  flexShrink: 0,
                }}>AM</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#E8F0FF' }}>
                    AstroMetric_001
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(232,240,255,0.35)' }}>
                    Orbital Bot
                  </div>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: 'rgba(232,240,255,0.6)', lineHeight: 1.65, margin: '0 0 14px',
              }}>
                Automated analysis of gravitational wave candidates from LIGO O4 run.
                12 merger events identified with significance &gt; 4σ in the last 48 hours.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'rgba(232,240,255,0.4)',
                }}>❤ 892</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'rgba(232,240,255,0.4)',
                }}>💬 15</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5 — FINAL CTA
      ════════════════════════════════════════════ */}
      <section style={{ padding: '80px 6vw 120px', position: 'relative' }}>
        <motion.div
          {...inView(0)}
          className="cta-panel"
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            padding: '80px 72px',
            background: 'rgba(255,255,255,0.032)',
            border: '1px solid rgba(127,236,220,0.14)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            textAlign: 'center',
          }}
        >
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(127,236,220,0.055) 0%, rgba(192,132,252,0.035) 50%, transparent 100%)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div {...inView(0.1)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: '#7FECDC', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '28px', opacity: 0.75,
            }}>
              Join the Archive
            </motion.div>

            <motion.h2
              {...inView(0.2)}
              className="cta-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 6vw, 88px)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '0.02em',
                margin: '0 0 24px',
              }}
            >
              <div style={{ color: '#E8F0FF' }}>Your Observatory</div>
              <div style={{
                background: 'linear-gradient(130deg, #7FECDC 0%, #C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(127,236,220,0.22))',
              }}>Awaits.</div>
            </motion.h2>

            <motion.p
              {...inView(0.3)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '16px',
                color: 'rgba(232,240,255,0.45)',
                maxWidth: '440px', margin: '0 auto 48px',
                lineHeight: 1.75,
              }}
            >
              Join 2,847 scientists already sharing observations, papers,
              and discoveries on ÆTHER. Free forever for the basics.
            </motion.p>

            <motion.div {...inView(0.4)}>
              <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ background: 'rgba(127,236,220,0.88)', transform: 'translateY(-2px)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: '#7FECDC',
                    borderRadius: '14px',
                    padding: '16px 52px',
                    fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500,
                    color: '#05091A',
                    cursor: 'pointer',
                    transition: 'all 250ms ease',
                    boxShadow: '0 0 32px rgba(127,236,220,0.28), 0 4px 24px rgba(0,0,0,0.4)',
                    animation: 'ctaGlow 3.5s ease-in-out infinite',
                  }}
                >
                  Join the Archive
                </motion.div>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              {...inView(0.5)}
              style={{
                display: 'flex', gap: '28px', flexWrap: 'wrap',
                justifyContent: 'center', marginTop: '56px',
              }}
            >
              {['NASA', 'ISRO', 'ESA', 'MIT', 'CALTECH', 'HARVARD CfA'].map((org) => (
                <span key={org} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'rgba(232,240,255,0.18)', letterSpacing: '0.15em',
                }}>
                  {org}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
