'use client';

import { useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/stars/StarField';
import NebulaBlobs from '@/components/stars/NebulaBlobs';

const NEBULA_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/1280px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg';

const ease = { duration: 0.6, ease: 'easeOut' } as Transition;

const ROLES = [
  'Astrophysicist',
  'Astronomer',
  'Astrologer',
  'Citizen Scientist',
  'Educator',
  'Mission Analyst',
] as const;

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [role, setRole]         = useState<string>('');
  const [nameFocus, setNameFocus]         = useState(false);
  const [emailFocus, setEmailFocus]       = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmFocus, setConfirmFocus]   = useState(false);

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    borderBottom: focused
      ? '1px solid #7FECDC'
      : '1px solid rgba(127,236,220,0.3)',
    outline: 'none', borderRadius: 0,
    padding: '12px 4px',
    fontFamily: 'var(--font-body)', fontSize: '14px',
    color: '#E8F0FF',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    boxShadow: focused ? '0 4px 16px rgba(127,236,220,0.08)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px',
    color: 'rgba(232,240,255,0.4)', letterSpacing: '0.15em',
    textTransform: 'uppercase', marginBottom: '10px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#05091A',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    }}>
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
        style={{ display: 'none', width: '50%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}
        className="auth-left-panel"
      >
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
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,9,26,0.88) 0%, rgba(5,9,26,0.55) 55%, rgba(5,9,26,0.2) 100%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '36px 44px',
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '22px',
            fontWeight: 300, color: '#7FECDC', letterSpacing: '0.25em',
          }}>ÆTHER</div>

          {/* Carl Sagan quote */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}>
            <blockquote style={{
              fontFamily: 'var(--font-display)', fontSize: '30px',
              fontWeight: 300, fontStyle: 'italic',
              color: '#E8F0FF', lineHeight: 1.4,
              margin: 0, maxWidth: '420px',
              borderLeft: '2px solid rgba(127,236,220,0.35)',
              paddingLeft: '24px',
            }}>
              &ldquo;The cosmos is within us. We are made of star-stuff.
              We are a way for the cosmos to know itself.&rdquo;
              <footer style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: 'rgba(232,240,255,0.35)', marginTop: '16px',
                fontStyle: 'normal', letterSpacing: '0.1em',
              }}>— Carl Sagan</footer>
            </blockquote>

            {/* Stacked avatar group */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                {[
                  { initials: 'SC', color: '#7FECDC' },
                  { initials: 'RM', color: '#C084FC' },
                  { initials: 'SR', color: '#FFD97D' },
                ].map((a, i) => (
                  <div key={a.initials} style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: `${a.color}18`, border: `2px solid ${a.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', color: a.color,
                    marginLeft: i === 0 ? 0 : '-10px',
                    position: 'relative', zIndex: 3 - i,
                    backdropFilter: 'blur(8px)',
                  }}>{a.initials}</div>
                ))}
                <div style={{ marginLeft: '14px' }}>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px',
                    color: '#E8F0FF', fontWeight: 500,
                  }}>Joined by 2,847+ researchers</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px',
                    color: 'rgba(232,240,255,0.35)', letterSpacing: '0.08em',
                  }}>this week alone</div>
                </div>
              </div>
            </div>
          </div>

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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 24px',
          position: 'relative', zIndex: 10,
          overflowY: 'auto',
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px', paddingTop: '20px', paddingBottom: '20px' }}>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...ease, delay: 0.2 } as Transition}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '40px',
              fontWeight: 300, color: '#E8F0FF',
              margin: '0 0 8px', textAlign: 'center', lineHeight: 1.1,
            }}
          >Create Your Observatory</motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...ease, delay: 0.27 } as Transition}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: '#7FECDC', letterSpacing: '0.2em',
              textTransform: 'uppercase', textAlign: 'center',
              marginBottom: '36px',
            }}
          >Join 2,847 scientists already inside</motion.div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.3 } as Transition}
            >
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
                placeholder="Dr. Jane Doe"
                style={inputStyle(nameFocus)}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.37 } as Transition}
            >
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="you@institution.edu"
                style={inputStyle(emailFocus)}
              />
            </motion.div>

            {/* Password row — side by side on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.44 } as Transition}
              className="password-row"
              style={{ display: 'flex', gap: '16px' }}
            >
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  placeholder="••••••••"
                  style={inputStyle(passwordFocus)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Confirm</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setConfirmFocus(true)}
                  onBlur={() => setConfirmFocus(false)}
                  placeholder="••••••••"
                  style={inputStyle(confirmFocus)}
                />
              </div>
            </motion.div>

            {/* Role selector */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.51 } as Transition}
            >
              <label style={labelStyle}>Scientific Role</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {ROLES.map((r) => {
                  const selected = role === r;
                  return (
                    <motion.button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        background: selected ? '#7FECDC' : 'rgba(127,236,220,0.04)',
                        border: `1px solid ${selected ? '#7FECDC' : 'rgba(127,236,220,0.22)'}`,
                        borderRadius: '99px',
                        padding: '6px 14px',
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        color: selected ? '#003731' : 'rgba(232,240,255,0.45)',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        boxShadow: selected ? '0 0 12px rgba(127,236,220,0.35)' : 'none',
                        letterSpacing: '0.04em',
                      }}
                    >{r}</motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Launch button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.58 } as Transition}
            >
              <motion.button
                type="submit"
                whileHover={{
                  boxShadow: '0 0 32px rgba(127,236,220,0.4), 0 4px 24px rgba(0,0,0,0.4)',
                  background: 'rgba(127,236,220,0.9)',
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  background: '#7FECDC',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '15px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500,
                  color: '#003731', cursor: 'pointer',
                  transition: 'all 220ms ease',
                  boxShadow: '0 0 20px rgba(127,236,220,0.22), 0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                Launch Observatory
                {/* Rocket icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1C8 1 11 3 11 7c0 1.5-.5 2.8-1.3 3.8L8 13l-1.7-2.2A5.9 5.9 0 0 1 5 7c0-4 3-6 3-6Z" stroke="#003731" strokeWidth="1.3" strokeLinejoin="round" />
                  <circle cx="8" cy="7" r="1.3" fill="#003731" />
                  <path d="M5 9.5 3 12M11 9.5l2 2.5" stroke="#003731" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...ease, delay: 0.63 } as Transition}
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                color: 'rgba(232,240,255,0.25)', letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            </motion.div>

            {/* Google button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...ease, delay: 0.67 } as Transition}
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
                  borderRadius: '10px', padding: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  cursor: 'pointer', transition: 'all 220ms ease',
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(232,240,255,0.7)',
                }}
              >
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
            transition={{ ...ease, delay: 0.72 } as Transition}
            style={{ textAlign: 'center', marginTop: '28px' }}
          >
            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(232,240,255,0.35)' }}>
                Already have an account?{' '}
              </span>
              <Link href="/auth/login" style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: '#7FECDC', textDecoration: 'none',
              }}>Sign In</Link>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'rgba(232,240,255,0.2)', lineHeight: 1.7,
            }}>
              By joining you agree to our{' '}
              <Link href="/legal/terms" style={{ color: 'rgba(127,236,220,0.45)', textDecoration: 'none' }}>Terms</Link>
              {' '}and{' '}
              <Link href="/legal/privacy" style={{ color: 'rgba(127,236,220,0.45)', textDecoration: 'none' }}>Privacy Policy</Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 768px) {
          .auth-left-panel { display: flex !important; }
        }
        @media (max-width: 600px) {
          .password-row { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
