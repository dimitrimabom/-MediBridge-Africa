import React from "react";
import { Container } from "./Container";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  badge,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="bg-[#102A43] text-white py-14 sm:py-20 border-b border-[#173F5F] relative overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C8A45D_1px,transparent_1px)] [background-size:20px_20px]" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="max-w-3xl">
            {badge && (
              <Badge
                variant="goldSolid"
                className="mb-4 text-xs tracking-wider uppercase font-semibold"
              >
                {badge}
              </Badge>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {title}
            </h1>
            {description && (
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
