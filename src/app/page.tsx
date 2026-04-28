'use client';

import { motion, type Transition } from 'framer-motion';
import PageWrapper from '@/components/layout/PageWrapper';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' } as Transition,
});

function TelescopeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ color: '#7FECDC' }}>
      <path d="M6 22l8-12 4 3-6 11H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 10l8-6 4 5-8 7-4-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 22v4M14 26h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SatelliteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ color: '#C084FC' }}>
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.17 9.17l2.83 2.83M20 20l2.83 2.83M9.17 22.83l2.83-2.83M20 12l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ color: '#FFD97D' }}>
      <rect x="7" y="4" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 10h10M11 15h10M11 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const samplePosts = [
  {
    initials: 'SC',
    color: '#7FECDC',
    name: 'Dr. Sarah Chen',
    role: 'Astrophysicist · MIT',
    time: '2h ago',
    content:
      'Captured M42 tonight through my 10″ Dobsonian. Exceptional seeing — could resolve the Trapezium cluster clearly. H-alpha filter reveals the ionisation front in striking detail. Linked to SIMBAD entry below.',
    tag: 'M42',
    tagVariant: 'teal' as const,
  },
  {
    initials: 'AW',
    color: '#C084FC',
    name: 'AstroWatch India',
    role: 'Sky Alert · Automated',
    time: '14m ago',
    content:
      '🛰 ISS PASS ALERT — Mumbai region. Visible pass tonight at 21:47 IST. Max elevation 78° NNW→SSE. Magnitude −3.4. Clear skies forecast. Set your reminder.',
    tag: 'ISS',
    tagVariant: 'violet' as const,
  },
  {
    initials: 'PM',
    color: '#FFD97D',
    name: 'Prof. R. Mehta',
    role: 'ISRO · Senior Scientist',
    time: '5h ago',
    content:
      "New JWST paper just dropped on arXiv: atmospheric characterisation of TRAPPIST-1e. CO₂ signature detection at 4.3μm is statistically significant. This is what we've been waiting for.",
    tag: 'TRAPPIST-1e',
    tagVariant: 'amber' as const,
  },
];

export default function HomePage() {
  return (
    <PageWrapper>
      {/* SECTION 1 — HERO */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 80px',
        }}
      >
        <motion.div {...fadeUp(0)}>
          <Pill variant="teal">NOW IN BETA</Pill>
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 300,
            letterSpacing: '0.02em',
            color: '#E8F0FF',
            lineHeight: 1.1,
            marginTop: '24px',
            maxWidth: '900px',
          }}
        >
          Where Space Science
          <br />
          <em>Becomes Community</em>
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'rgba(232,240,255,0.45)',
            maxWidth: '560px',
            lineHeight: 1.7,
            marginTop: '24px',
          }}
        >
          The social network and research hub built for astrophysicists,
          astronomers, and everyone who looks up at the night sky.
        </motion.p>

        <motion.div
          {...fadeUp(0.45)}
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '36px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button variant="primary" size="lg" href="/auth/signup">
            Join Free — No Credit Card
          </Button>
          <Button variant="ghost" size="lg" href="/feed">
            Explore the Platform
          </Button>
        </motion.div>

        <motion.div
          {...fadeUp(0.6)}
          style={{
            display: 'flex',
            marginTop: '48px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'rgba(232,240,255,0.45)',
            letterSpacing: '0.04em',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['2,847 Observers', '14,203 Objects Logged', '891 Papers Discussed'].map(
            (stat, i) => (
              <span key={stat} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span style={{ margin: '0 20px', color: 'rgba(127,236,220,0.3)' }}>|</span>
                )}
                {stat}
              </span>
            )
          )}
        </motion.div>
      </section>

      {/* SECTION 2 — SOCIAL PROOF */}
      <section style={{ padding: '0 48px 80px' }}>
        <GlassPanel padding="24px 48px">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(232,240,255,0.45)',
              }}
            >
              Trusted by researchers from
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '48px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {['NASA', 'ISRO', 'ESA', 'MIT', 'Caltech', 'Harvard CfA'].map((org) => (
              <span
                key={org}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  fontWeight: 300,
                  color: 'rgba(232,240,255,0.35)',
                  letterSpacing: '0.04em',
                }}
              >
                {org}
              </span>
            ))}
          </div>
        </GlassPanel>
      </section>

      {/* SECTION 3 — FEATURES */}
      <section style={{ padding: '80px 48px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 300,
            color: '#E8F0FF',
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '0.02em',
          }}
        >
          Everything a space scientist needs
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {[
            {
              icon: <TelescopeIcon />,
              title: 'Share Your Observations',
              body: 'Post structured observations tagged to real catalog IDs. Your M42 post links directly to SIMBAD data.',
              pill: { label: 'Instagram for Science', variant: 'teal' as const },
            },
            {
              icon: <SatelliteIcon />,
              title: 'Real-Time Space Data',
              body: 'ISS live tracker, sky events calendar, space weather dashboard — all powered by NASA and JPL APIs.',
              pill: { label: '7 Free Tools', variant: 'violet' as const },
            },
            {
              icon: <DocumentIcon />,
              title: 'ArXiv Meets Social',
              body: "Discuss the latest papers, share discoveries, cite observations. Science is better when it's social.",
              pill: { label: '10,000+ Papers', variant: 'amber' as const },
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <GlassPanel hover padding="28px">
                <div style={{ marginBottom: '16px' }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 300,
                    color: '#E8F0FF',
                    marginBottom: '12px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'rgba(232,240,255,0.45)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {card.body}
                </p>
                <Pill variant={card.pill.variant}>{card.pill.label}</Pill>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — FEED PREVIEW */}
      <section style={{ padding: '80px 48px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 300,
            color: '#E8F0FF',
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '0.02em',
          }}
        >
          See what&apos;s happening right now
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {samplePosts.map((post, i) => (
            <motion.div
              key={post.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassPanel hover padding="24px">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: `${post.color}22`,
                      border: `1px solid ${post.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: post.color,
                      flexShrink: 0,
                    }}
                  >
                    {post.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#E8F0FF',
                      }}
                    >
                      {post.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: 'rgba(232,240,255,0.35)',
                      }}
                    >
                      {post.role}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'rgba(232,240,255,0.25)',
                    }}
                  >
                    {post.time}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(232,240,255,0.7)',
                    lineHeight: 1.65,
                    marginBottom: '16px',
                  }}
                >
                  {post.content}
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <Pill variant={post.tagVariant}>{post.tag}</Pill>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(127,236,220,0.07)',
                  }}
                >
                  {['🔬 Peer Review', '🔁 Replicate', '📎 Cite'].map((r) => (
                    <button
                      key={r}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: 'rgba(232,240,255,0.35)',
                        cursor: 'pointer',
                        padding: '4px 0',
                        transition: 'color 200ms ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.color = '#7FECDC';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.color = 'rgba(232,240,255,0.35)';
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PRICING */}
      <section style={{ padding: '80px 48px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 300,
            color: '#E8F0FF',
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '0.02em',
          }}
        >
          Start free. Upgrade when you&apos;re ready.
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            maxWidth: '980px',
            margin: '0 auto',
          }}
        >
          <PricingCard
            tier="Free"
            price="$0"
            period="forever"
            features={[
              'All social features',
              'Basic space tools',
              'ArXiv feed',
              'Sky event alerts',
              'Object tagging',
              'Skipable video ads',
            ]}
            cta="Get Started"
            ctaHref="/auth/signup"
            accentVariant="ghost"
          />
          <PricingCard
            tier="Pro"
            price="$9"
            period="per month"
            features={[
              'Everything in Free',
              'No ads — ever',
              'Observation Planner',
              'Custom sky alerts',
              'Equipment tracker',
              'VOTable export',
              'Unlimited collections',
              'Verified badge',
            ]}
            cta="Go Pro"
            ctaHref="/auth/signup?plan=pro"
            accentVariant="violet"
            highlight
          />
          <PricingCard
            tier="Institution"
            price="$49"
            period="per month"
            features={[
              'Everything in Pro',
              'Team workspace',
              'Bulk data export',
              'Custom subdomain',
              'API access',
              'Priority support',
            ]}
            cta="Contact Us"
            ctaHref="/about"
            accentVariant="teal"
          />
        </div>
      </section>

      {/* SECTION 6 — CTA BANNER */}
      <section style={{ padding: '80px 48px 120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '860px', margin: '0 auto' }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(127,236,220,0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '64px 48px',
              textAlign: 'center',
              boxShadow:
                '0 0 60px rgba(127,236,220,0.05), 0 0 100px rgba(192,132,252,0.04)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 300,
                color: '#E8F0FF',
                letterSpacing: '0.02em',
                marginBottom: '20px',
              }}
            >
              Ready to join the cosmos?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'rgba(232,240,255,0.45)',
                maxWidth: '520px',
                margin: '0 auto 36px',
                lineHeight: 1.7,
              }}
            >
              Join 2,847 scientists, astronomers, and space enthusiasts already on
              ÆTHER.
            </p>
            <Button variant="primary" size="lg" href="/auth/signup">
              Create Your Observatory
            </Button>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}

function PricingCard({
  tier,
  price,
  period,
  features,
  cta,
  ctaHref,
  accentVariant,
  highlight = false,
}: {
  tier: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref: string;
  accentVariant: 'teal' | 'violet' | 'ghost';
  highlight?: boolean;
}) {
  const accentColor =
    accentVariant === 'teal'
      ? '#7FECDC'
      : accentVariant === 'violet'
      ? '#C084FC'
      : '#E8F0FF';
  const borderColor = highlight
    ? 'rgba(192,132,252,0.35)'
    : 'rgba(127,236,220,0.12)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <div
        style={{
          background: highlight
            ? 'rgba(192,132,252,0.05)'
            : 'rgba(255,255,255,0.025)',
          border: `1px solid ${borderColor}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '32px 28px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: highlight ? '0 0 40px rgba(192,132,252,0.08)' : 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: accentColor,
              letterSpacing: '0.15em',
              marginBottom: '12px',
            }}
          >
            {tier.toUpperCase()}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '40px',
                fontWeight: 300,
                color: '#E8F0FF',
                lineHeight: 1,
              }}
            >
              {price}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(232,240,255,0.35)',
              }}
            >
              {period}
            </span>
          </div>
        </div>

        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flex: 1,
          }}
        >
          {features.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(232,240,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: accentColor, fontSize: '10px' }}>◆</span>
              {f}
            </li>
          ))}
        </ul>

        <Button
          variant={
            accentVariant === 'ghost'
              ? 'ghost'
              : accentVariant === 'violet'
              ? 'violet'
              : 'teal'
          }
          size="md"
          href={ctaHref}
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
}
