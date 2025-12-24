"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: {
  label?: string;
  title: React.ReactNode; // <><span className="block">...</span>...</>
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "text-left", className)}>
      {label ? (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-[#E6D8CB] bg-white px-3 py-1",
            isCenter ? "mx-auto" : "self-start"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C69C72]" />
          <Text as="span" variant="label" tone="accent" className="tracking-[0.02em]">
            {label}
          </Text>
        </div>
      ) : null}

      <div className={cn(label ? "mt-4" : "", isCenter ? "mx-auto" : "", "max-w-3xl")}>
        <Heading level={2} variant="section" tone="strong" className="leading-snug">
          {title}
        </Heading>

        {description ? (
          <Text
            variant="bodySm"
            tone="base"
            className={cn("mt-3", isCenter ? "mx-auto" : "", "max-w-2xl")}
          >
            {description}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
