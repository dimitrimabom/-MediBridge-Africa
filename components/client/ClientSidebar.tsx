"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLIENT_NAV_ITEMS } from "@/config/navigation";
import { BRAND_CONFIG } from "@/config/brand";
import { useAppStore } from "@/context/app-store";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { LogOut, Home, ShieldAlert } from "lucide-react";

interface ClientSidebarProps {
  onCloseMobile?: () => void;
}

export function ClientSidebar({ onCloseMobile }: ClientSidebarProps) {
  const pathname = usePathname();
  const { currentClient } = useAppStore();

  return (
    <aside className="w-64 bg-[#102A43] text-white flex flex-col justify-between h-full border-r border-[#173F5F]">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-[#173F5F] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#173F5F] flex items-center justify-center text-white font-black border border-[#C8A45D]">
              <span className="text-[#C8A45D]">M</span>
              <span className="text-white text-xs">B</span>
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block leading-none">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] text-[#C8A45D] font-bold uppercase tracking-wider">
                Espace Patient
              </span>
            </div>
          </Link>
        </div>

        {/* Client profile preview badge */}
        <div className="p-4 mx-3 my-3 rounded-lg bg-[#173F5F]/60 border border-[#173F5F] text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C8A45D] text-[#102A43] font-black flex items-center justify-center text-xs">
              {currentClient.fullName.charAt(0)}
            </div>
            <div className="truncate">
              <p className="font-bold text-white truncate">{currentClient.fullName}</p>
              <p className="text-[11px] text-slate-300 truncate">{currentClient.city}, {currentClient.country}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#102A43] flex items-center justify-between text-[10px] text-slate-300">
            <span>Dossier actif : 1</span>
            <span className="text-[#C8A45D] font-semibold">Mode Démo</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-3 py-2 space-y-1">
          {CLIENT_NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/espace-client" && pathname.startsWith(item.href));
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

      {/* Bottom actions */}
      <div className="p-4 border-t border-[#173F5F] space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-[#173F5F] hover:text-white transition-colors"
        >
          <Home className="w-4 h-4 text-[#C8A45D]" />
          <span>Retour au site public</span>
        </Link>
        <Link
          href="/connexion"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Déconnexion (Démo)</span>
        </Link>
      </div>
    </aside>
  );
}
