export const colors = {
  canvas: "#05091A",
  glass: "rgba(255, 255, 255, 0.035)",
  glassHover: "rgba(255, 255, 255, 0.055)",
  borderDefault: "rgba(127, 236, 220, 0.12)",
  borderHover: "rgba(127, 236, 220, 0.28)",
  accentTeal: "#7FECDC",
  accentViolet: "#C084FC",
  accentAmber: "#FFD97D",
  accentRose: "#FF8FAB",
  textPrimary: "#E8F0FF",
  textDim: "rgba(232, 240, 255, 0.45)",
  textMuted: "rgba(232, 240, 255, 0.22)",
} as const;

export const fonts = {
  display: "'Cormorant Garamond', serif",
  body: "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const fontSizes = {
  displayHero: "72px",
  sectionHeading: "36px",
  cardHeading: "22px",
  body: "14px",
  small: "12px",
  micro: "10px",
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
} as const;

export const radii = {
  glass: "16px",
  pill: "99px",
  button: "8px",
  input: "8px",
} as const;

export const blur = {
  glass: "blur(20px)",
  nebula: "blur(120px)",
} as const;

export const transitions = {
  default: "all 300ms ease",
  hover: "all 200ms ease",
} as const;
