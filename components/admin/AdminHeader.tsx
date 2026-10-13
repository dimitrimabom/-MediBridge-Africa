"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, FolderKanban } from "lucide-react";
import { useAdminSidebar } from "@/app/admin/layout";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function AdminHeader({
  onToggleSidebar,
  title,
  subtitle,
  children,
}: AdminHeaderProps) {
  const sidebarCtx = useAdminSidebar();
  const toggleHandler = onToggleSidebar || sidebarCtx?.toggleSidebar;

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-3.5 sm:py-4 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {toggleHandler && (
          <button
            type="button"
            onClick={toggleHandler}
            className="md:hidden p-2 rounded-lg text-[#102A43] bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
            aria-label="Ouvrir le menu administration"
          >
            <Menu className="w-5 h-5 text-[#102A43]" />
          </button>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-2xl font-extrabold text-[#102A43] tracking-tight line-clamp-1">
              {title}
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wider shrink-0">
              Démo Équipe
            </span>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {children}
        <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex text-xs font-semibold">
          <Link href="/admin/dossiers" className="flex items-center gap-1.5">
            <FolderKanban className="w-3.5 h-3.5 text-[#173F5F]" />
            <span>Tous les dossiers</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

