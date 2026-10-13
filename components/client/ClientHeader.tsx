"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, PlusCircle, ShieldCheck, ArrowRight, User } from "lucide-react";
import { useAppStore } from "@/context/app-store";

interface ClientHeaderProps {
  onToggleSidebar?: () => void;
  title: string;
  subtitle?: string;
}

export function ClientHeader({
  onToggleSidebar,
  title,
  subtitle,
}: ClientHeaderProps) {
  const { currentClient } = useAppStore();

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-4 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-[#102A43] hover:bg-slate-100"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#102A43] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6ED] border border-[#C8A45D]/40 text-xs text-[#173F5F] font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Accompagnement Actif
        </div>

        <Button asChild variant="gold" size="sm" className="font-bold text-xs gap-1.5 shadow-xs">
          <Link href="/espace-client/nouveau-dossier">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Nouveau Dossier</span>
            <span className="sm:hidden">Créer</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
