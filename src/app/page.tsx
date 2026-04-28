// TODO: page.tsx — Marketing homepage. Not yet built.
// See PAGES.md → SURFACE 1: MARKETING SITE → / (Homepage) for full spec.

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--canvas)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-display)",
      }}
    >
      <h1 style={{ fontSize: "72px", fontWeight: 300, letterSpacing: "0.1em" }}>
        ÆTHER
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-dim)",
          fontFamily: "var(--font-mono)",
          marginTop: "16px",
          letterSpacing: "0.2em",
        }}
      >
        SCAFFOLD COMPLETE — PHASE 0
      </p>
    </main>
  );
}
