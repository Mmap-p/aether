'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import Link from 'next/link';
import StarField from '@/components/stars/StarField';
import NebulaBlobs from '@/components/stars/NebulaBlobs';

// ─── Animation helpers ────────────────────────────────────────────────────────

const ease = { duration: 0.5, ease: 'easeOut' } as Transition;
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { ...ease, delay } as Transition,
});

// ─── Icons ────────────────────────────────────────────────────────────────────

const icons = {
  feed: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  discover: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M11.5 6.5L9.8 11.2 7 9.2l4.7-2.7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  explore: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M9 1.5v3M9 13.5v3M1.5 9h3M13.5 9h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  tools: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M10.5 3.5a4 4 0 0 1 0 5.5L5.5 14l-2 .5.5-2 5-5a4 4 0 0 1 .5-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M12 5l1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  profile: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 15.5c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M14.9 3.1l-1.4 1.4M4.5 13.5l-1.4 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  compose: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  image: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="4.5" cy="4.5" r="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M1 9l3.5-3 2.5 2.5 2-2 4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  paper: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 5h4M5 7.5h4M5 10h2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>,
  alert: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L13 12H1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M7 5.5v3M7 9.8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  dots: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.5" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="12.5" r="1.2" fill="currentColor"/></svg>,
};

const navItems = [
  { id: 'feed',     label: 'Feed',     icon: icons.feed,     href: '/feed',       badge: 3 },
  { id: 'discover', label: 'Discover', icon: icons.discover, href: '/discover',   badge: 0 },
  { id: 'explore',  label: 'Explore',  icon: icons.explore,  href: '/explore',    badge: 0 },
  { id: 'tools',    label: 'Tools',    icon: icons.tools,    href: '/tools',      badge: 0 },
  { id: 'profile',  label: 'Profile',  icon: icons.profile,  href: '/profile/me', badge: 0 },
  { id: 'settings', label: 'Settings', icon: icons.settings, href: '/settings',   badge: 0 },
];

const FEED_TABS = ['For You', 'Following', 'Trending', 'Alerts', 'Papers'];
const NEBULA_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/1280px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg';

// ─── Shared primitives ────────────────────────────────────────────────────────

function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.032)',
      border: '1px solid rgba(127,236,220,0.1)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '16px',
      ...style,
    }}>{children}</div>
  );
}

function Avatar({ initials, color, size = 38 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `${color}18`, border: `1.5px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: size < 34 ? '9px' : '11px', color,
    }}>{initials}</div>
  );
}

function LivePulse({ color = '#FF8FAB' }: { color?: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px', flexShrink: 0 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color, opacity: 0.5, animation: 'livePulse 1.6s ease-out infinite' }} />
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, display: 'block', position: 'relative', zIndex: 1 }} />
    </span>
  );
}

function ReactionButton({ icon, label, count, color = 'rgba(232,240,255,0.45)' }: { icon: string; label: string; count: number; color?: string }) {
  const [active, setActive] = useState(false);
  const [n, setN] = useState(count);
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={() => { setActive(!active); setN(active ? n - 1 : n + 1); }}
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        background: active ? `${color}14` : 'transparent',
        border: `1px solid ${active ? `${color}40` : 'transparent'}`,
        borderRadius: '99px', padding: '5px 10px',
        cursor: 'pointer', transition: 'all 170ms ease',
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: active ? color : 'rgba(232,240,255,0.38)',
      }}
    >
      <span style={{ fontSize: '13px', lineHeight: 1 }}>{icon}</span>
      <span>{label}</span>
      <span style={{ opacity: 0.7 }}>{n}</span>
    </motion.button>
  );
}

// ─── Post 1: Observation ──────────────────────────────────────────────────────

function ObservationPost() {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div {...inView(0)}>
      <GlassCard>
        {/* Header */}
        <div style={{ padding: '18px 20px 0', display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
          <Avatar initials="SC" color="#7FECDC" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#E8F0FF' }}>Dr. Sarah Chen</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#7FECDC', border: '1px solid rgba(127,236,220,0.3)', background: 'rgba(127,236,220,0.07)', borderRadius: '99px', padding: '1px 7px' }}>ASTROPHYSICIST</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#7FECDC', background: 'rgba(127,236,220,0.1)', border: '1px solid rgba(127,236,220,0.25)', borderRadius: '99px', padding: '1px 8px' }}>M42</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '3px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(232,240,255,0.32)' }}>MIT · Cambridge, MA</span>
              <span style={{ color: 'rgba(232,240,255,0.18)' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(232,240,255,0.24)' }}>2h ago</span>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,240,255,0.22)', padding: '2px' }}>{icons.dots}</button>
        </div>

        {/* Body */}
        <div style={{ padding: '13px 20px 11px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(232,240,255,0.75)', lineHeight: 1.65, margin: 0 }}>
            Captured M42 tonight through 10&quot; Dobsonian at f/4.7. Trapezium cluster fully resolved —
            {!expanded
              ? <><span style={{ color: 'rgba(232,240,255,0.4)' }}>…</span><button onClick={() => setExpanded(true)} style={{ background: 'none', border: 'none', color: '#7FECDC', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', padding: '0 0 0 4px' }}>more</button></>
              : <span> the O-III emission nebulosity is extraordinary tonight. Seeing: 4.2/5. Transparency: excellent. H-α filter reveals the ionisation front with stunning clarity. RA 05h 35m / Dec −05° 23′.</span>
            }
          </p>
        </div>

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={NEBULA_IMG} alt="M42 Orion Nebula" style={{ width: '100%', height: '260px', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />

        {/* Metadata strip */}
        <div style={{ display: 'flex', gap: '20px', padding: '10px 20px', borderBottom: '1px solid rgba(127,236,220,0.06)', overflowX: 'auto' }}>
          {[['Object','M42 · NGC 1976'],['Scope','10″ Dobsonian'],['Seeing','4.2 / 5'],['Filter','H-α + O-III']].map(([k,v]) => (
            <div key={k} style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.26)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#7FECDC', marginTop: '2px' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Reactions */}
        <div style={{ padding: '9px 14px 12px', display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
          <ReactionButton icon="🔬" label="Peer Review" count={12} color="#7FECDC" />
          <ReactionButton icon="🔁" label="Replicate"   count={8}  color="#C084FC" />
          <ReactionButton icon="📎" label="Cite"        count={3}  color="#FFD97D" />
          <ReactionButton icon="❓" label="Question"    count={2}  color="rgba(232,240,255,0.5)" />
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Post 2: Sky Alert ────────────────────────────────────────────────────────

function SkyAlertPost() {
  const [secs, setSecs] = useState(243);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <motion.div {...inView(0.1)}>
      <GlassCard style={{ border: '1px solid rgba(255,143,171,0.2)' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar initials="AW" color="#FF8FAB" size={34} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#E8F0FF' }}>AstroWatch</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(232,240,255,0.32)' }}>Automated Alert</span>
            </div>
          </div>
          {/* LIVE badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,143,171,0.1)', border: '1px solid rgba(255,143,171,0.28)', borderRadius: '99px', padding: '4px 10px' }}>
            <LivePulse />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF8FAB', letterSpacing: '0.1em' }}>LIVE</span>
          </div>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: '#E8F0FF', margin: '0 0 7px', lineHeight: 1.2 }}>
            ISS passing over Mumbai
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(232,240,255,0.52)', margin: '0 0 14px', lineHeight: 1.6 }}>
            Magnitude −3.4 · Max elevation 78° · NNW → SSE · Clear skies confirmed
          </p>

          {/* Countdown + stats */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,143,171,0.07)', border: '1px solid rgba(255,143,171,0.18)', borderRadius: '10px', padding: '12px 20px', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,143,171,0.65)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>Visible in</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '30px', color: '#FF8FAB', lineHeight: 1, letterSpacing: '0.03em' }}>{mm}:{ss}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px 14px', flex: 1, minWidth: '160px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[['Duration','3m 14s'],['Elevation','78°'],['Rise Az','NNW 338°'],['Set Az','SSE 155°']].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#E8F0FF', marginTop: '2px' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Arc trajectory */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px 14px', marginBottom: '12px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Pass Trajectory · Mumbai 18.97°N 72.82°E
            </div>
            <svg width="100%" height="64" viewBox="0 0 480 64" preserveAspectRatio="none">
              <line x1="0" y1="60" x2="480" y2="60" stroke="rgba(232,240,255,0.08)" strokeWidth="1" />
              <path d="M 24 58 Q 240 6 456 52" stroke="rgba(255,143,171,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="5 4" />
              <circle cx="240" cy="6" r="6" fill="none" stroke="#FF8FAB" strokeWidth="1.5" />
              <circle cx="240" cy="6" r="3" fill="#FF8FAB" />
              <circle cx="240" cy="6" r="12" fill="rgba(255,143,171,0.1)" />
              <text x="6"  y="60" style={{ fontFamily: 'monospace', fontSize: '9px' }} fill="rgba(232,240,255,0.35)">NNW</text>
              <text x="438" y="58" style={{ fontFamily: 'monospace', fontSize: '9px' }} fill="rgba(232,240,255,0.35)">SSE</text>
              {[10,20,45,78,45,20,10].map((d, i) => (
                <text key={i} x={i * 66 + 30} y="56" style={{ fontFamily: 'monospace', fontSize: '8px' }} fill="rgba(232,240,255,0.18)">{d}°</text>
              ))}
            </svg>
          </div>

          {/* Expiry */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,143,171,0.55)', letterSpacing: '0.06em' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/><path d="M5 2.5v3l1.5 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            Alert expires in 24 hours · ISS pass events are time-sensitive
          </div>
        </div>

        <div style={{ padding: '8px 14px 12px', borderTop: '1px solid rgba(255,143,171,0.08)', display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
          <ReactionButton icon="👁" label="Watching"    count={847} color="#FF8FAB" />
          <ReactionButton icon="📍" label="My Location" count={34}  color="#7FECDC" />
          <ReactionButton icon="🔔" label="Remind"      count={156} color="#FFD97D" />
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Post 3: Paper Share ──────────────────────────────────────────────────────

function PaperPost() {
  return (
    <motion.div {...inView(0.2)}>
      <GlassCard>
        <div style={{ padding: '18px 20px 12px', display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
          <Avatar initials="PM" color="#FFD97D" />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#E8F0FF' }}>Prof. R. Mehta</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#FFD97D', border: '1px solid rgba(255,217,125,0.3)', background: 'rgba(255,217,125,0.07)', borderRadius: '99px', padding: '1px 7px' }}>ISRO</span>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(232,240,255,0.3)', marginTop: '3px' }}>1h ago · shared a paper</div>
          </div>
        </div>

        <div style={{ padding: '0 20px 13px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(232,240,255,0.72)', lineHeight: 1.65, margin: 0 }}>
            CO₂ detection at 4.3μm in TRAPPIST-1e atmosphere at 3.7σ significance — this changes atmospheric characterisation entirely. The implications for biosignature detection are profound.
          </p>
        </div>

        {/* ArXiv card */}
        <div style={{ margin: '0 16px 16px', background: 'rgba(255,217,125,0.04)', border: '1px solid rgba(255,217,125,0.18)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,217,125,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#FFD97D', border: '1px solid rgba(255,217,125,0.35)', borderRadius: '4px', padding: '2px 6px', letterSpacing: '0.08em' }}>arXiv</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.28)' }}>2026.04231 · astro-ph.EP</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,217,125,0.55)' }}>NEW</span>
          </div>
          <div style={{ padding: '13px 14px' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 400, color: '#E8F0FF', margin: '0 0 7px', lineHeight: 1.45 }}>
              Atmospheric CO₂ Detection in TRAPPIST-1e via JWST NIRSpec: Evidence for Carbon-Bearing Chemistry
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(232,240,255,0.4)', margin: '0 0 8px' }}>
              Lustig-Yaeger J., Fu G., May E. M. et al. · Submitted Apr 2026
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(232,240,255,0.48)', lineHeight: 1.6, margin: '0 0 10px' }}>
              We present detection of CO₂ absorption at 4.3μm in the transmission spectrum of TRAPPIST-1e using 12 transit observations with JWST NIRSpec. Detection significance is 3.7σ…
            </p>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {['TRAPPIST-1e','Biosignatures','JWST','Exoatmospheres'].map((t) => (
                <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,217,125,0.6)', border: '1px solid rgba(255,217,125,0.18)', borderRadius: '99px', padding: '2px 8px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '8px 14px 12px', display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
          <ReactionButton icon="🧬" label="Breakthrough" count={47} color="#FFD97D" />
          <ReactionButton icon="💬" label="Discuss"      count={23} color="#C084FC" />
          <ReactionButton icon="📎" label="Cite"         count={8}  color="#7FECDC" />
          <ReactionButton icon="🔖" label="Save"         count={89} color="rgba(232,240,255,0.5)" />
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Composer ─────────────────────────────────────────────────────────────────

function Composer({ onClose }: { onClose?: () => void }) {
  const [text, setText] = useState('');
  const [type, setType] = useState<'observation'|'paper'|'alert'>('observation');
  const typeButtons = [
    { t: 'observation' as const, icon: icons.image, label: 'Observe' },
    { t: 'paper'       as const, icon: icons.paper, label: 'Paper' },
    { t: 'alert'       as const, icon: icons.alert, label: 'Alert' },
  ];
  return (
    <GlassCard style={{ marginBottom: '14px' }}>
      <div style={{ padding: '15px 18px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Avatar initials="YO" color="#7FECDC" size={34} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your observation, discovery, or sky alert…"
            rows={3}
            style={{
              flex: 1, background: 'transparent', border: 'none',
              borderBottom: '1px solid rgba(127,236,220,0.15)',
              outline: 'none', resize: 'none',
              fontFamily: 'var(--font-body)', fontSize: '14px',
              color: '#E8F0FF', lineHeight: 1.6, paddingBottom: '10px',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '11px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {typeButtons.map(({ t, icon, label }) => (
              <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setType(t)} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: type === t ? 'rgba(127,236,220,0.1)' : 'transparent',
                border: `1px solid ${type === t ? 'rgba(127,236,220,0.32)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '99px', padding: '5px 11px',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: type === t ? '#7FECDC' : 'rgba(232,240,255,0.32)',
                cursor: 'pointer', transition: 'all 170ms ease',
              }}>{icon}{label}</motion.button>
            ))}
          </div>
          <motion.button whileHover={{ background: 'rgba(127,236,220,0.14)', borderColor: 'rgba(127,236,220,0.5)' }} whileTap={{ scale: 0.97 }}
            onClick={() => { setText(''); onClose?.(); }}
            style={{ background: 'rgba(127,236,220,0.07)', border: '1px solid rgba(127,236,220,0.28)', borderRadius: '10px', padding: '8px 22px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#7FECDC', cursor: 'pointer', transition: 'all 170ms ease' }}
          >Post</motion.button>
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Right panel widgets ──────────────────────────────────────────────────────

function SkyTonightWidget() {
  return (
    <GlassCard style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="#7FECDC" strokeWidth="1.2"/><path d="M5.5 2v4l2 1.2" stroke="#7FECDC" strokeWidth="1.1" strokeLinecap="round"/></svg>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#7FECDC', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Sky Tonight</span>
      </div>
      {[
        { time: '21:47', name: 'ISS Pass',       detail: 'Mumbai · Mag −3.4',       color: '#FF8FAB' },
        { time: '23:12', name: 'Jupiter Rise',   detail: 'Alt 28° · SE horizon',    color: '#FFD97D' },
        { time: '00:34', name: 'Perseid Peak',   detail: '40 meteors/hr expected',  color: '#C084FC' },
      ].map((e) => (
        <div key={e.name} style={{ display: 'flex', gap: '10px', marginBottom: '11px', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: e.color, flexShrink: 0, width: '38px', marginTop: '1px' }}>{e.time}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#E8F0FF' }}>{e.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.3)' }}>{e.detail}</div>
          </div>
        </div>
      ))}
    </GlassCard>
  );
}

function SpaceWeatherWidget() {
  const kp = 4.2;
  const colors = ['#7FECDC','#7FECDC','#7FECDC','#7FECDC','#FFD97D','#FFD97D','#FF8FAB','#FF8FAB','#FF8FAB'];
  return (
    <GlassCard style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1L7 5h4L8 7l1 4L5.5 9 3 11l1-4L1 5h4Z" stroke="#FFD97D" strokeWidth="1.1" strokeLinejoin="round"/></svg>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FFD97D', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Space Weather</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: '#FFD97D', fontWeight: 300 }}>{kp}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(232,240,255,0.32)' }}>Kp-index</span>
      </div>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '8px' }}>
        {colors.map((c, i) => (
          <div key={i} style={{ flex: 1, height: '6px', borderRadius: '2px', background: i < Math.round(kp) ? c : 'rgba(255,255,255,0.07)' }} />
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.32)' }}>G1 Minor Storm · Aurora possible ≥55°N</div>
    </GlassCard>
  );
}

function SuggestedFollows() {
  const people = [
    { i: 'RV', c: '#C084FC', name: 'Dr. Raj Venkatesan', role: 'ISRO · Mars Mission' },
    { i: 'LK', c: '#7FECDC', name: 'Dr. Lena Kowalski',  role: 'ESA · Exoplanets' },
    { i: 'TX', c: '#FFD97D', name: 'TelescopeX',          role: 'Community · Amateur' },
  ];
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  return (
    <GlassCard style={{ padding: '16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#C084FC', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>Suggested Observers</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {people.map((p) => (
          <div key={p.i} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <Avatar initials={p.i} color={p.c} size={30} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#E8F0FF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.28)' }}>{p.role}</div>
            </div>
            <motion.button whileTap={{ scale: 0.95 }}
              onClick={() => setFollowed((prev) => { const n = new Set(prev); n.has(p.i) ? n.delete(p.i) : n.add(p.i); return n; })}
              style={{
                background: followed.has(p.i) ? 'rgba(127,236,220,0.1)' : 'transparent',
                border: `1px solid ${followed.has(p.i) ? 'rgba(127,236,220,0.38)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '99px', padding: '4px 11px',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: followed.has(p.i) ? '#7FECDC' : 'rgba(232,240,255,0.38)',
                cursor: 'pointer', transition: 'all 170ms ease',
              }}
            >{followed.has(p.i) ? 'Following' : 'Follow'}</motion.button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function TrendingWidget() {
  const tags = [
    { name: '#M42',     posts: '847 posts',  color: '#7FECDC' },
    { name: '#NGC7331', posts: '234 posts',  color: '#C084FC' },
    { name: '#ISS',     posts: '1.2k posts', color: '#FF8FAB' },
    { name: '#JWST',    posts: '3.4k posts', color: '#FFD97D' },
    { name: '#Aurora',  posts: '562 posts',  color: '#7FECDC' },
  ];
  return (
    <GlassCard style={{ padding: '16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(232,240,255,0.38)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Trending Objects</div>
      {tags.map((t, i) => (
        <motion.div key={t.name} whileHover={{ x: 3 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 4px', borderRadius: '7px', cursor: 'pointer', transition: 'background 180ms ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.2)', width: '12px' }}>{i + 1}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: t.color }}>{t.name}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.26)' }}>{t.posts}</span>
        </motion.div>
      ))}
    </GlassCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('For You');
  const [activeNav, setActiveNav] = useState('feed');
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#05091A', position: 'relative', overflowX: 'hidden' }}>
      <StarField />
      <NebulaBlobs />

      <style>{`
        @keyframes livePulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .feed-sidebar   { display: none !important; }
        .feed-right     { display: none !important; }
        .mobile-nav     { display: flex !important; }
        .mobile-fab     { display: flex !important; }
        .desktop-composer { display: none !important; }

        @media (min-width: 900px) {
          .feed-sidebar     { display: flex !important; }
          .feed-right       { display: flex !important; }
          .mobile-nav       { display: none !important; }
          .mobile-fab       { display: none !important; }
          .desktop-composer { display: block !important; }
        }
        textarea::placeholder { color: rgba(232,240,255,0.22); }
        .hide-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 10 }}>

        {/* ── Left Sidebar ─────────────────────────────────────────────────── */}
        <div
          className="feed-sidebar"
          style={{
            width: '240px', flexShrink: 0,
            position: 'sticky', top: 0, height: '100vh',
            flexDirection: 'column',
            padding: '28px 0',
            borderRight: '1px solid rgba(127,236,220,0.07)',
            background: 'rgba(5,9,26,0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 20,
          }}
        >
          <div style={{ padding: '0 24px', marginBottom: '36px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, color: '#7FECDC', letterSpacing: '0.2em' }}>ÆTHER</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(127,236,220,0.4)', letterSpacing: '0.14em', marginTop: '2px' }}>SPACE INTELLIGENCE</div>
            </Link>
          </div>

          <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navItems.map((item) => {
              const active = activeNav === item.id;
              return (
                <motion.div key={item.id} whileHover={{ x: 2 }}>
                  <Link href={item.href} style={{ textDecoration: 'none' }}>
                    <div onClick={() => setActiveNav(item.id)} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px', borderRadius: '10px',
                      background: active ? 'rgba(127,236,220,0.08)' : 'transparent',
                      border: `1px solid ${active ? 'rgba(127,236,220,0.18)' : 'transparent'}`,
                      color: active ? '#7FECDC' : 'rgba(232,240,255,0.42)',
                      cursor: 'pointer', transition: 'all 170ms ease',
                    }}>
                      {item.icon}
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>{item.label}</span>
                      {item.badge > 0 && (
                        <span style={{ marginLeft: 'auto', background: '#FF8FAB', borderRadius: '99px', fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#05091A', padding: '1px 6px' }}>{item.badge}</span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(127,236,220,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar initials="YO" color="#7FECDC" size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#E8F0FF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Your Observatory</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(232,240,255,0.28)' }}>@you · Pro</div>
              </div>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7FECDC', boxShadow: '0 0 8px rgba(127,236,220,0.6)', flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* ── Centre Feed ──────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 16px 88px' }}>
          <div style={{ width: '100%', maxWidth: '600px', paddingTop: '22px' }}>

            {/* Feed tabs */}
            <div className="hide-scroll" style={{ display: 'flex', gap: '4px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '2px' }}>
              {FEED_TABS.map((tab) => (
                <motion.button key={tab} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab(tab)} style={{
                  background: activeTab === tab ? 'rgba(127,236,220,0.1)' : 'transparent',
                  border: `1px solid ${activeTab === tab ? 'rgba(127,236,220,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '99px', padding: '6px 16px', flexShrink: 0,
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: activeTab === tab ? '#7FECDC' : 'rgba(232,240,255,0.35)',
                  cursor: 'pointer', transition: 'all 170ms ease',
                }}>{tab}</motion.button>
              ))}
            </div>

            {/* Composer — desktop only */}
            <div className="desktop-composer">
              <Composer />
            </div>

            {/* Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <ObservationPost />
              <SkyAlertPost />
              <PaperPost />
            </div>
          </div>
        </div>

        {/* ── Right Panel ──────────────────────────────────────────────────── */}
        <div
          className="feed-right hide-scroll"
          style={{
            width: '280px', flexShrink: 0,
            flexDirection: 'column', gap: '12px',
            padding: '22px 16px 80px',
            position: 'sticky', top: 0,
            height: '100vh', overflowY: 'auto',
          }}
        >
          <SkyTonightWidget />
          <SpaceWeatherWidget />
          <SuggestedFollows />
          <TrendingWidget />
        </div>
      </div>

      {/* ── Mobile Bottom Nav ─────────────────────────────────────────────── */}
      <div
        className="mobile-nav"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(5,9,26,0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(127,236,220,0.09)',
          padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
          alignItems: 'center', justifyContent: 'space-around',
        }}
      >
        {navItems.slice(0, 5).map((item) => {
          const active = activeNav === item.id;
          return (
            <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
              <div onClick={() => setActiveNav(item.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                padding: '5px 12px', position: 'relative',
                color: active ? '#7FECDC' : 'rgba(232,240,255,0.32)',
                cursor: 'pointer', transition: 'color 170ms ease',
              }}>
                {item.badge > 0 && (
                  <span style={{ position: 'absolute', top: 2, right: 8, width: '6px', height: '6px', borderRadius: '50%', background: '#FF8FAB' }} />
                )}
                {item.icon}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.04em' }}>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Mobile FAB ───────────────────────────────────────────────────── */}
      <motion.button
        className="mobile-fab"
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
        onClick={() => setShowCompose(true)}
        style={{
          position: 'fixed', bottom: '74px', right: '20px', zIndex: 40,
          width: '52px', height: '52px', borderRadius: '50%',
          background: '#7FECDC', border: 'none', cursor: 'pointer',
          alignItems: 'center', justifyContent: 'center', color: '#003731',
          boxShadow: '0 0 24px rgba(127,236,220,0.4), 0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        {icons.compose}
      </motion.button>

      {/* ── Mobile Compose Sheet ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showCompose && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowCompose(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(5,9,26,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'flex-end' }}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', borderRadius: '20px 20px 0 0', padding: '16px 16px 32px', background: 'rgba(8,13,30,0.98)', border: '1px solid rgba(127,236,220,0.12)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#7FECDC', letterSpacing: '0.12em' }}>NEW POST</span>
                <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', color: 'rgba(232,240,255,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>×</button>
              </div>
              <Composer onClose={() => setShowCompose(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
