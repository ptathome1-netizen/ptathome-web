export const TYPO = {
  // Headings
  h1Hero:
    "text-[28px] xs:text-[32px] sm:text-[46px] lg:text-[60px] leading-[1.23] tracking-[-0.01em] font-extrabold",
  h2Section:
    "text-2xl sm:text-3xl md:text-[2.1rem] leading-snug tracking-tight font-bold",
  h3Card: "text-[17px] sm:text-[18px] leading-snug font-semibold",

  // Body
  body: "text-[15px] sm:text-[17px] leading-[1.45]",
  bodySm: "text-[13px] sm:text-[13.5px] leading-relaxed",
  caption: "text-[12px] leading-tight",
  micro: "text-[11px] leading-tight",

  // Labels
  label: "text-[12px] font-medium",
  labelCaps: "text-[12px] font-semibold uppercase tracking-[0.18em]",
} as const;

export const TONE = {
  ink: "text-[#1F1711]",
  strong: "text-[#3B2F2F]",
  base: "text-[#5E5147]",
  muted: "text-[#8B7B68]",
  subtle: "text-[#B8A89A]",
  accent: "text-[#C69C72]",
  slate: "text-[#0F172A]",
  slateMuted: "text-[#6B7280]",
} as const;
