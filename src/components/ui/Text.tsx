"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { TYPO, TONE } from "@/styles/typography";

type Variant = "body" | "bodySm" | "caption" | "micro" | "label" | "labelCaps";
type Tone =
  | "ink"
  | "strong"
  | "base"
  | "muted"
  | "subtle"
  | "accent"
  | "slate"
  | "slateMuted";

export function Text<T extends React.ElementType = "p">({
  as,
  variant = "body",
  tone = "base",
  className,
  children,
  ...props
}: {
  as?: T;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">) {
  const Comp = (as ?? "p") as React.ElementType;

  return (
    <Comp className={cn(TYPO[variant], TONE[tone], className)} {...props}>
      {children}
    </Comp>
  );
}

export function NoWrap<T extends React.ElementType = "span">({
  as,
  className,
  children,
  ...props
}: {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">) {
  const Comp = (as ?? "span") as React.ElementType;
  return (
    <Comp className={cn("whitespace-nowrap", className)} {...props}>
      {children}
    </Comp>
  );
}
