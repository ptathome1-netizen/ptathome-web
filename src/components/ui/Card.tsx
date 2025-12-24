"use client";

import React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[#E7DCCB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
        className
      )}
      {...props}
    />
  );
}
