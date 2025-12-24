"use client";

import React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-4 text-sm font-semibold transition active:scale-[0.98]";
  const styles: Record<Variant, string> = {
    primary:
      "bg-[#2B241C] text-white border border-[#1F1A14] shadow-[0_8px_22px_rgba(0,0,0,.22)] hover:-translate-y-[1px]",
    secondary:
      "bg-white/95 text-[#2B241C] border border-[#C2B7A6] shadow-[0_6px_18px_rgba(0,0,0,.14)] hover:-translate-y-[1px]",
    ghost: "bg-transparent text-[#2B241C] hover:bg-black/5 border border-transparent",
  };

  return <button className={cn(base, styles[variant], className)} {...props} />;
}
