import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
  titleAs = "h2",
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const HeadingTag = titleAs;

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12", alignClasses[align], className)}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase text-[#173F5F] bg-[#FAF6ED] border border-[#C8A45D]/40 rounded-full">
          {badge}
        </span>
      )}
      <HeadingTag className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102A43] tracking-tight leading-tight">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
