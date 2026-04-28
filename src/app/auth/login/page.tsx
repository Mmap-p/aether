'use client';

import { useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/stars/StarField';
import NebulaBlobs from '@/components/stars/NebulaBlobs';

const NEBULA_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/1280px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg';

const ease = { duration: 0.6, ease: 'easeOut' } as Transition;

const testimonials = [
  {
    initials: 'SC',
    color: '#7FECDC',
    name: 'Dr. Sarah Chen',
    role: 'MIT · Astrophysics',
    quote: 'ÆTHER changed how our lab shares findings. Real-time collaboration on JWST data has never felt this natural.',
  },
  {
    initials: 'RM',
    color: '#C084FC',
    name: 'Prof. R. Mehta',
    role: 'ISRO · Sr. Scientist',
    quote: 'The ArXiv integration alone is worth it. Every new paper on my targets lands directly in my feed within the hour.',
  },
  {
    initials: 'SR',
    color: '#FFD97D',
    name: '@stargazer_rx',
    role: 'Amateur · Pune',
    quote: 'I posted my first M42 capture and had three PhDs giving me feedback by morning. This community is extraordinary.',
  },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#05091A',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Global background layers */}
      <StarField />
      <NebulaBlobs />

      {/* Corner brackets */}
      {[
        { top: 16, left: 16,  borderTop: '1px solid rgba(255,255,255,0.18)', borderLeft: '1px solid rgba(255,255,255,0.18)' },
        { top: 16, right: 16, borderTop: '1px solid rgba(255,255,255,0.18)', borderRight: '1px solid rgba(255,255,255,0.18)' },
        { bottom: 16, left: 16,  borderBottom: '1px solid rgba(255,255,255,0.18)', borderLeft: '1px solid rgba(255,255,255,0.18)' },
        { bottom: 16, right: 16, borderBottom: '1px solid rgba(255,255,255,0.18)', borderRight: '1px solid rgba(255,255,255,0.18)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'fixed', width: '20px', height: '20px', zIndex: 50, ...s }} />
      ))}

      {/* Bottom accent line */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '1px', zIndex: 50,
        background: 'linear-gradient(to right, transparent, rgba(127,236,220,0.25), transparent)',
      }} />

      {/* ── LEFT PANEL ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...ease, delay: 0.1 } as Transition}
        style={{
          display: 'none',
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        className="auth-left-panel"
      >
        {/* Nebula image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={NEBULA_IMG}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        {/* Left-to-right gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,9,26,0.88) 0%, rgba(5,9,26,0.55) 55%, rgba(5,9,26,0.2) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '36px 44px',
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px', fontWeight: 300,
            color: '#7FECDC', letterSpacing: '0.25em',
          }}>ÆTHER</div>

          {/* Blockquote */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '40px 0' }}>
            <blockquote style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px', fontWeight: 300,
              fontStyle: 'italic',
              color: '#E8F0FF', lineHeight: 1.35,
              margin: 0, maxWidth: '440px',
              borderLeft: '2px solid rgba(127,236,220,0.35)',
              paddingLeft: '24px',
            }}>
              &ldquo;The cosmos is not cruel, it is indifferent.
              That is why we must find each other.&rdquo;
            </blockquote>
          </div>

          {/* Testimonials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {testimonials.map((t) => (
              <div key={t.initials} style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex', gap: '12px', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  background: `${t.color}18`, border: `1px solid ${t.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: t.color,
                }}>{t.initials}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#E8F0FF' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.35)', marginBottom: '6px' }}>
                    {t.role}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(232,240,255,0.55)', lineHeight: 1.55 }}>
                    {t.quote}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom label */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'rgba(232,240,255,0.22)', letterSpacing: '0.15em',
          }}>
            Scientific Protocol 08.24 // Deep Space Network
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT PANEL ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...ease, delay: 0.15 } as Transition}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Star icon */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...ease, delay: 0.2 } as Transition}
            style={{ textAlign: 'center', marginBottom: '28px' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2 L15.8 10.2 L24 14 L15.8 17.8 L14 26 L12.2 17.8 L4 14 L12.2 10.2 Z"
                fill="none" stroke="#7FECDC" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="14" cy="14" r="2.5" fill="#7FECDC" opacity="0.7" />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...ease, delay: 0.25 } as Transition}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '40px',
              fontWeight: 300, color: '#E8F0FF',
              margin: '0 0 8px', textAlign: 'center', lineHeight: 1.1,
            }}
          >Welcome Back</motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...ease, delay: 0.32 } as Transition}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: '#7FECDC', letterSpacing: '0.22em',
              textTransform: 'uppercase', textAlign: 'center',
              marginBottom: '40px',
            }}
          >Sign in to your observatory</motion.div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.35 } as Transition}
            >
              <label style={{
                display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: 'rgba(232,240,255,0.4)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginBottom: '10px',
              }}>Universal Identifier</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder="you@institution.edu"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: 'none',
                    borderBottom: emailFocus
                      ? '1px solid #7FECDC'
                      : '1px solid rgba(127,236,220,0.3)',
                    outline: 'none',
                    borderRadius: 0,
                    padding: '12px 36px 12px 4px',
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: '#E8F0FF',
                    transition: 'border-color 200ms ease',
                    boxShadow: emailFocus ? '0 4px 16px rgba(127,236,220,0.08)' : 'none',
                  }}
                />
                <svg style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', opacity: 0.35 }}
                  width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="#7FECDC" strokeWidth="1.2" />
                  <path d="M1 5l7 5 7-5" stroke="#7FECDC" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.42 } as Transition}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <label style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'rgba(232,240,255,0.4)', letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>Access Code</label>
                <Link href="/auth/forgot" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: 'rgba(127,236,220,0.55)', textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'color 200ms ease',
                }}>Forgot?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: 'none',
                    borderBottom: passwordFocus
                      ? '1px solid #7FECDC'
                      : '1px solid rgba(127,236,220,0.3)',
                    outline: 'none',
                    borderRadius: 0,
                    padding: '12px 36px 12px 4px',
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: '#E8F0FF',
                    transition: 'border-color 200ms ease',
                    boxShadow: passwordFocus ? '0 4px 16px rgba(127,236,220,0.08)' : 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                    opacity: 0.4, color: '#7FECDC',
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2l12 12M6.5 6.6A2 2 0 0 0 9.4 9.5" stroke="#7FECDC" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M4.2 4.3C2.8 5.2 1.7 6.5 1 8c1.3 2.8 4.2 5 7 5 1.3 0 2.5-.4 3.5-1" stroke="#7FECDC" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M8 3C10.8 3 13.7 5.2 15 8a7.9 7.9 0 0 1-2.2 2.8" stroke="#7FECDC" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="8" rx="2.5" ry="2.5" stroke="#7FECDC" strokeWidth="1.2" />
                      <path d="M1 8C2.3 5.2 5.2 3 8 3s5.7 2.2 7 5c-1.3 2.8-4.2 5-7 5S2.3 10.8 1 8Z" stroke="#7FECDC" strokeWidth="1.2" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Sign In button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.49 } as Transition}
            >
              <motion.button
                type="submit"
                whileHover={{
                  background: 'rgba(127,236,220,0.12)',
                  borderColor: 'rgba(127,236,220,0.55)',
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  background: 'rgba(127,236,220,0.05)',
                  border: '1px solid rgba(127,236,220,0.32)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '10px',
                  padding: '14px',
                  fontFamily: 'var(--font-body)', fontSize: '15px',
                  color: '#7FECDC', cursor: 'pointer',
                  transition: 'all 220ms ease',
                  letterSpacing: '0.03em',
                }}
              >Sign In</motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...ease, delay: 0.54 } as Transition}
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                color: 'rgba(232,240,255,0.25)', letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </motion.div>

            {/* Google button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.58 } as Transition}
            >
              <motion.button
                type="button"
                whileHover={{ background: 'rgba(255,255,255,0.055)', borderColor: 'rgba(255,255,255,0.16)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '10px',
                  padding: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  cursor: 'pointer', transition: 'all 220ms ease',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(232,240,255,0.7)',
                }}
              >
                {/* Google SVG */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616Z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
                </svg>
                Continue with Google
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...ease, delay: 0.65 } as Transition}
            style={{ textAlign: 'center', marginTop: '32px' }}
          >
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(232,240,255,0.35)' }}>
              Don&apos;t have an account?{' '}
            </span>
            <Link href="/auth/signup" style={{
              fontFamily: 'var(--font-body)', fontSize: '13px',
              color: '#7FECDC', textDecoration: 'none',
              transition: 'opacity 200ms ease',
            }}>
              Join Free →
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Inline styles for desktop left panel */}
      <style>{`
        @media (min-width: 768px) {
          .auth-left-panel { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
