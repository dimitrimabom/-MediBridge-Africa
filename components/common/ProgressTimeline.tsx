import React from "react";
import { TimelineEvent } from "@/types";
import { CheckCircle2, Clock, CircleDot, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function ProgressTimeline({ events, className }: ProgressTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <p className="text-sm text-[#64748B] italic">Aucun événement enregistré.</p>
    );
  }

  return (
    <div className={cn("relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E2E8F0]", className)}>
      {events.map((event) => {
        const isCompleted = event.status === "completed";
        const isCurrent = event.status === "current";

        return (
          <div key={event.id} className="relative flex items-start gap-4 group">
            {/* Dot / Icon */}
            <div
              className={cn(
                "absolute -left-6 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all ring-4 ring-white",
                isCompleted && "text-emerald-600",
                isCurrent && "text-[#C8A45D]",
                !isCompleted && !isCurrent && "text-slate-300"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 fill-emerald-100" />
              ) : isCurrent ? (
                <CircleDot className="h-5 w-5 fill-amber-50 animate-pulse text-[#C8A45D]" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>

            {/* Content card */}
            <div
              className={cn(
                "w-full rounded-lg border p-4 transition-all",
                isCurrent
                  ? "border-[#C8A45D] bg-[#FAF6ED]/50 shadow-xs"
                  : "border-[#E2E8F0] bg-white"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4
                  className={cn(
                    "text-sm font-bold",
                    isCurrent ? "text-[#102A43]" : "text-[#172B4D]"
                  )}
                >
                  {event.title}
                </h4>
                <span className="text-xs font-medium text-[#64748B] bg-slate-50 px-2 py-0.5 rounded border border-slate-100 shrink-0">
                  {event.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {event.description}
              </p>

              {event.actor && (
                <p className="mt-2 text-xs text-[#173F5F] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173F5F]" />
                  Intervenant : {event.actor}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
