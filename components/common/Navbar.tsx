"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/brand";
import { PUBLIC_NAV_ITEMS } from "@/config/navigation";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Top reassurance bar */}
      <div className="bg-[#102A43] text-white text-xs py-1.5 px-4">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#C8A45D] shrink-0" />
            <span className="font-medium text-slate-200 truncate">
              Accompagnement administratif & logistique vers l'Inde • Bureaux à Douala & Yaoundé
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300 text-xs shrink-0">
            <span>Tél : {BRAND_CONFIG.contacts.phoneDisplay}</span>
            <span className="text-slate-500">|</span>
            <Link
              href="/admin"
              className="text-[#C8A45D] hover:underline font-semibold flex items-center gap-1"
            >
              Accès Démo Admin
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <div className="py-3.5">
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-[#102A43] flex items-center justify-center text-white font-black text-lg border-2 border-[#C8A45D] group-hover:scale-105 transition-transform">
              <span className="text-[#C8A45D]">M</span>
              <span className="text-white text-xs">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#102A43] leading-none">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8A45D] mt-0.5">
                Mobilité Médicale Inde
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-[#102A43]",
                    isActive
                      ? "text-[#102A43] border-b-2 border-[#C8A45D] pb-0.5"
                      : "text-[#64748B]"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="font-semibold text-xs">
              <Link href="/connexion">Se connecter</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-semibold text-xs border-[#102A43] text-[#102A43]">
              <Link href="/espace-client">Espace Client</Link>
            </Button>
            <Button asChild variant="gold" size="sm" className="font-bold text-xs shadow-xs">
              <Link href="/espace-client/nouveau-dossier">
                Demander un accompagnement
              </Link>
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button asChild variant="gold" size="sm" className="text-xs font-bold px-3">
              <Link href="/espace-client/nouveau-dossier">Demander</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#102A43] hover:bg-slate-100 focus:outline-none"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-base font-semibold",
                  pathname === item.href
                    ? "bg-[#FAF6ED] text-[#102A43] font-bold"
                    : "text-[#64748B] hover:bg-slate-50"
                )}
              >
                {item.title}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Button asChild variant="outline" className="w-full justify-center">
                <Link href="/espace-client" onClick={() => setMobileMenuOpen(false)}>
                  Accéder à l'Espace Client (Démo)
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-center">
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  Accéder au Back-office Admin (Démo)
                </Link>
              </Button>
              <Button asChild variant="gold" className="w-full justify-center font-bold">
                <Link
                  href="/espace-client/nouveau-dossier"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Demander un accompagnement
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
