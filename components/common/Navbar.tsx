"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/brand";
import { PUBLIC_NAV_ITEMS } from "@/config/navigation";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  MessageCircle,
  FilePlus2,
  User,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and notify body attribute when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-mobile-menu-open", "true");
    } else {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-mobile-menu-open");
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Top reassurance bar - responsive, clean & highly readable */}
      <div className="bg-[#102A43] text-white border-b border-[#173F5F]/40 py-1.5 px-3 sm:px-4">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          {/* Main reassurance text */}
          <div className="flex items-center justify-center gap-1.5 text-center w-full sm:w-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] shrink-0 animate-pulse" />
            <p className="text-slate-200 text-[10.5px] sm:text-xs font-medium leading-tight whitespace-nowrap">
              <span className="hidden sm:inline">Accompagnement administratif &amp; logistique vers l'Inde • </span>
              <span className="sm:hidden">Soins vers l'Inde • </span>
              <strong className="text-white font-semibold">Douala &amp; Yaoundé</strong>
            </p>
          </div>

          {/* Quick contact & shortcuts */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-slate-300 shrink-0 text-[10.5px] sm:text-xs font-medium">
            <a
              href={`tel:${BRAND_CONFIG.contacts.phone}`}
              className="text-slate-200 hover:text-white flex items-center gap-1 transition-colors whitespace-nowrap"
              title="Appeler MediBridge"
            >
              <Phone className="w-3 h-3 text-[#C8A45D] shrink-0" />
              <span className="font-semibold text-slate-100 whitespace-nowrap">
                {BRAND_CONFIG.contacts.phoneDisplay}
              </span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={BRAND_CONFIG.contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-emerald-300 flex items-center gap-1 font-semibold transition-colors whitespace-nowrap"
              title="Discuter sur WhatsApp"
            >
              <MessageCircle className="w-3 h-3 fill-[#25D366] shrink-0" />
              <span>WhatsApp</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/admin"
              className="text-[#C8A45D] hover:underline font-semibold flex items-center gap-0.5 whitespace-nowrap"
              title="Accès Démo Administration"
            >
              <span className="hidden sm:inline">Démo Admin</span>
              <span className="sm:hidden">Démo</span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <div className="py-2 sm:py-3.5">
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#102A43] flex items-center justify-center text-white font-black text-sm sm:text-lg border-2 border-[#C8A45D] group-hover:scale-105 transition-transform shrink-0">
              <span className="text-[#C8A45D]">M</span>
              <span className="text-white text-[10px] sm:text-xs">B</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] sm:text-lg font-black tracking-tight text-[#102A43] leading-none truncate">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[8.5px] sm:text-[10px] uppercase font-bold tracking-wider text-[#C8A45D] mt-0.5 whitespace-nowrap">
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

          {/* Mobile hamburger button & quick CTA */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button asChild variant="gold" size="sm" className="text-[11px] sm:text-xs font-bold px-2 sm:px-3 h-7 sm:h-9 shadow-xs">
              <Link href="/espace-client/nouveau-dossier">Demander</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="p-1.5 sm:p-2 rounded-lg text-[#102A43] bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#173F5F]/20"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#102A43]" />
              ) : (
                <Menu className="w-5 h-5 text-[#102A43]" />
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[88px] sm:top-[88px] bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-50 border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-12 shadow-2xl max-h-[calc(100vh-90px)] overflow-y-auto">
          <nav className="flex flex-col space-y-1.5">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-[#FAF6ED] text-[#102A43] font-bold border-l-4 border-[#C8A45D]"
                      : "text-[#64748B] hover:bg-slate-50 hover:text-[#102A43]"
                  )}
                >
                  <span>{item.title}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
                  )}
                </Link>
              );
            })}

            {/* Dedicated WhatsApp Button in Mobile Menu */}
            <div className="pt-3 pb-1">
              <a
                href={BRAND_CONFIG.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Discuter sur WhatsApp (+237 670 00 00 00)</span>
              </a>
            </div>

            {/* Quick action buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Button asChild variant="gold" className="w-full justify-center font-bold text-xs h-10 shadow-xs">
                <Link
                  href="/espace-client/nouveau-dossier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5"
                >
                  <FilePlus2 className="w-4 h-4" />
                  <span>Demander un accompagnement</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-center text-xs h-9 text-[#102A43] border-[#102A43]">
                <Link
                  href="/espace-client"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Accéder à l'Espace Client (Démo)</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-center text-xs h-9 text-[#64748B] hover:text-[#102A43]">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>Accéder au Back-office Admin (Démo)</span>
                </Link>
              </Button>
            </div>

            {/* Office footer inside mobile menu */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-[#64748B] space-y-1">
              <p className="font-semibold text-[#102A43]">Bureaux au Cameroun :</p>
              <p>• Douala : Akwa, Boulevard de la Liberté</p>
              <p>• Yaoundé : Bastos, Avenue Rosa Parks</p>
              <p className="pt-1">
                Tél : <a href={`tel:${BRAND_CONFIG.contacts.phone}`} className="text-[#102A43] font-bold hover:underline">{BRAND_CONFIG.contacts.phoneDisplay}</a>
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
