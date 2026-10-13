import React from "react";
import { PackageItem } from "@/types";
import { Button } from "@/components/ui/button";
import { formatFCFA, cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PackageCardProps {
  pkg: PackageItem;
  className?: string;
}

export function PackageCard({ pkg, className }: PackageCardProps) {
  const isPremium = pkg.popular;

  // Keep 4 essential inclusions for a clear, readable card
  const keyInclusions = pkg.inclusions.slice(0, 4);

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-7 border flex flex-col justify-between transition-all relative",
        isPremium
          ? "border-2 border-[#C8A45D] shadow-md ring-1 ring-[#C8A45D]/20"
          : "border-[#E2E8F0] shadow-xs hover:border-[#102A43]/30",
        className
      )}
    >
      {isPremium && (
        <span className="absolute -top-3 left-6 bg-[#C8A45D] text-[#102A43] font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
          Formule Recommandée
        </span>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-[#102A43]">
            Formule {pkg.name}
          </h3>
        </div>

        <p className="text-xs text-[#64748B] mb-5 leading-relaxed">
          {pkg.tagline}
        </p>

        <div className="mb-6 pb-6 border-b border-[#F1F5F9]">
          <span className="text-3xl font-black text-[#102A43] block">
            {formatFCFA(pkg.priceFCFA)}
          </span>
          <span className="text-[11px] text-[#64748B] block mt-0.5">
            Honoraires d'accompagnement logistique (démo)
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
            Ce qui est inclus :
          </p>
          <ul className="space-y-2.5 text-xs text-[#172B4D]">
            {keyInclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9]">
        <Button
          asChild
          variant={isPremium ? "gold" : "outline"}
          className="w-full font-bold h-11 text-xs"
        >
          <Link
            href={`/espace-client/nouveau-dossier?formule=${pkg.name}`}
            className="flex items-center justify-center gap-2"
          >
            Choisir cette formule
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
