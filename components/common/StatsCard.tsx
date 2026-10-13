import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  iconName: keyof typeof Icons;
  description?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  iconName,
  description,
  className,
}: StatsCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons[iconName] as any) || Icons.Activity;

  const changeColor = {
    positive: "text-emerald-700 bg-emerald-50",
    negative: "text-red-700 bg-red-50",
    neutral: "text-slate-600 bg-slate-100",
  }[changeType];

  return (
    <Card className={cn("hover:border-[#173F5F]/30 transition-all shadow-xs", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#64748B]">{title}</p>
          <div className="p-2.5 rounded-lg bg-[#FAF6ED] text-[#173F5F] border border-[#C8A45D]/30">
            <IconComponent className="w-5 h-5 text-[#C8A45D]" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
            {value}
          </div>
          {change && (
            <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", changeColor)}>
              {change}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-2 text-xs text-[#64748B]">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
