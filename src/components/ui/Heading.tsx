"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { TYPO, TONE } from "@/styles/typography";

type Variant = "hero" | "section" | "card";
type Tone =
  | "ink"
  | "strong"
  | "base"
  | "muted"
  | "subtle"
  | "accent"
  | "slate"
  | "slateMuted";

const MAP: Record<Variant, string> = {
  hero: TYPO.h1Hero,
  section: TYPO.h2Section,
  card: TYPO.h3Card,
};

export function Heading({
  level,
  variant,
  tone = "strong",
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h2"> & {
  level: 1 | 2 | 3;
  variant: Variant;
  tone?: Tone;
}) {
  const Tag = (`h${level}` as const);
  return (
    <Tag className={cn(MAP[variant], TONE[tone], className)} {...props}>
      {children}
    </Tag>
  );
}
