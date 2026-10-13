"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/config/navigation";
import { BRAND_CONFIG } from "@/config/brand";
import { useAppStore } from "@/context/app-store";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { RotateCcw, Home, UserCheck, Shield } from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { resetDemoData } = useAppStore();

  const handleReset = () => {
    if (confirm("Réinitialiser toutes les données de démonstration aux valeurs par défaut ?")) {
      resetDemoData();
      alert("Données réinitialisées avec succès !");
    }
  };

  return (
    <aside className="w-64 bg-[#102A43] text-white flex flex-col justify-between h-full border-r border-[#173F5F]">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-[#173F5F] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-black">
              <Shield className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block leading-none">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                Back-office Équipe
              </span>
            </div>
          </Link>
        </div>

        {/* Admin Coordinator Info Badge */}
        <div className="p-4 mx-3 my-3 rounded-lg bg-[#173F5F]/60 border border-[#173F5F] text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-[#102A43] font-black flex items-center justify-center text-xs">
              AD
            </div>
            <div className="truncate">
              <p className="font-bold text-white truncate">Équipe Coordination</p>
              <p className="text-[11px] text-slate-300 truncate">Douala / Yaoundé Hub</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#102A43] flex items-center justify-between text-[10px] text-slate-300">
            <span>Rôle : Superviseur</span>
            <span className="text-emerald-400 font-bold">Connecté (Démo)</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-3 py-2 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (Icons[item.iconName as keyof typeof Icons] as any) || Icons.Circle;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-[#C8A45D] text-[#102A43] font-bold shadow-xs"
                    : "text-slate-300 hover:bg-[#173F5F] hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-[#102A43]" : "text-[#C8A45D]")} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom tools & reset */}
      <div className="p-4 border-t border-[#173F5F] space-y-2">
        <button
          type="button"
          onClick={handleReset}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-amber-200 bg-amber-950/40 border border-amber-800/40 hover:bg-amber-900/40 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Réinitialiser les données démo</span>
        </button>

        <Link
          href="/espace-client"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-[#173F5F] hover:text-white transition-colors"
        >
          <UserCheck className="w-4 h-4 text-[#C8A45D]" />
          <span>Voir l'Espace Client</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-[#173F5F] hover:text-white transition-colors"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>Retour au site public</span>
        </Link>
      </div>
    </aside>
  );
}
