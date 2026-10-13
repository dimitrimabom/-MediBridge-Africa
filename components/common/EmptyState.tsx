import React from "react";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  iconName?: keyof typeof Icons;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  iconName = "FileQuestion",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons[iconName] as any) || Icons.FileQuestion;

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-[#CBD5E1] bg-white/60">
      <div className="w-14 h-14 rounded-full bg-[#FAF6ED] border border-[#C8A45D]/30 flex items-center justify-center text-[#173F5F] mb-4">
        <IconComponent className="w-7 h-7 text-[#C8A45D]" />
      </div>
      <h3 className="text-lg font-bold text-[#102A43] mb-1">{title}</h3>
      <p className="text-sm text-[#64748B] max-w-md mb-6">{description}</p>

      {actionLabel && actionHref && (
        <Button asChild variant="default">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}

      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} variant="default">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
