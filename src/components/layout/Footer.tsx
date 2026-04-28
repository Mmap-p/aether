import Link from 'next/link';

const platformLinks = ['Feed', 'Discover', 'Tools', 'Pricing'];
const companyLinks = ['About', 'Blog', 'Careers', 'Press'];
const legalLinks = ['Privacy', 'Terms', 'Cookie Policy'];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: '#7FECDC',
          letterSpacing: '0.15em',
          marginBottom: '4px',
        }}
      >
        {title.toUpperCase()}
      </div>
      {links.map((link) => (
        <Link
          key={link}
          href={`/${link.toLowerCase().replace(' ', '-')}`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'rgba(232,240,255,0.45)',
            textDecoration: 'none',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.color = '#E8F0FF';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.color = 'rgba(232,240,255,0.45)';
          }}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(255,255,255,0.025)',
        borderTop: '1px solid rgba(127,236,220,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '48px 48px 32px',
      }}
    >
      {/* 4-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        {/* Col 1 — Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: '#E8F0FF',
            }}
          >
            ÆTHER
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(232,240,255,0.45)',
              lineHeight: 1.6,
              maxWidth: '200px',
            }}
          >
            Where space science becomes community
          </p>
        </div>

        <FooterLinkGroup title="Platform" links={platformLinks} />
        <FooterLinkGroup title="Company" links={companyLinks} />
        <FooterLinkGroup title="Legal" links={legalLinks} />
      </div>

      {/* Bottom row */}
      <div
        style={{
          borderTop: '1px solid rgba(127,236,220,0.07)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'rgba(232,240,255,0.22)',
            letterSpacing: '0.04em',
          }}
        >
          © 2025 ÆTHER. Built for those who look up.
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#7FECDC',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#7FECDC',
              letterSpacing: '0.08em',
            }}
          >
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
