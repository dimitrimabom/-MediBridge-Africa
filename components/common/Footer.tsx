"use client";

import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";
import { Container } from "./Container";
import { Phone, Mail, MapPin, MessageCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#102A43] text-white pt-16 pb-8 border-t border-[#173F5F]">
      <Container>
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#173F5F]/80">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#173F5F] flex items-center justify-center text-white font-black text-lg border border-[#C8A45D]">
                <span className="text-[#C8A45D]">M</span>
                <span className="text-white text-xs">B</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                {BRAND_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {BRAND_CONFIG.description}
            </p>

            <div className="pt-2">
              <a
                href={BRAND_CONFIG.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Assistance WhatsApp directe
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C8A45D] mb-4">
              Services Clés
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/services/ouverture-etude-administrative" className="hover:text-white transition-colors">
                  Étude du dossier
                </Link>
              </li>
              <li>
                <Link href="/services/coordination-documents-medicaux" className="hover:text-white transition-colors">
                  Coordination médicale
                </Link>
              </li>
              <li>
                <Link href="/services/assistance-administrative-visa" className="hover:text-white transition-colors">
                  Assistance visa e-Medical
                </Link>
              </li>
              <li>
                <Link href="/services/organisation-du-voyage" className="hover:text-white transition-colors">
                  Organisation du vol
                </Link>
              </li>
              <li>
                <Link href="/services/recherche-organisation-hebergement" className="hover:text-white transition-colors">
                  Hébergement en Inde
                </Link>
              </li>
              <li>
                <Link href="/services/assistance-pendant-le-sejour" className="hover:text-white transition-colors">
                  Accueil & conciergerie
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Liens utiles & Démo */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C8A45D] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/formules" className="hover:text-white transition-colors">
                  Nos Formules (Starter, Premium, VIP)
                </Link>
              </li>
              <li>
                <Link href="/processus" className="hover:text-white transition-colors">
                  Notre Processus en 5 étapes
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Foire Aux Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Bureaux
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/espace-client"
                  className="text-[#C8A45D] hover:underline font-semibold"
                >
                  → Espace Client (Démonstration)
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-amber-300 hover:underline font-semibold"
                >
                  → Back-office Équipe (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Coordonnées Fictives */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C8A45D] mb-4">
              Bureaux au Cameroun
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>
                  <strong>Douala :</strong> Akwa, Blvd de la Liberté
                  <br />
                  <strong>Yaoundé :</strong> Bastos, Ave Rosa Parks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>{BRAND_CONFIG.contacts.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>{BRAND_CONFIG.contacts.email}</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {BRAND_CONFIG.contacts.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-[#173F5F]/60 border border-[#173F5F] text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#C8A45D]">
            <AlertTriangle className="w-4 h-4 text-[#C8A45D]" />
            Avis de non-responsabilité médicale et consulaire
          </div>
          <p className="leading-relaxed">
            {BRAND_CONFIG.legal.disclaimerMedical}
          </p>
          <p className="leading-relaxed">
            {BRAND_CONFIG.legal.disclaimerVisa}
          </p>
          <p className="leading-relaxed text-[11px] text-slate-400">
            {BRAND_CONFIG.legal.disclaimerPricing}
          </p>
        </div>

        {/* Copyright & bottom links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2025 {BRAND_CONFIG.name}. Tous droits réservés. (Version Démonstration Frontend V1).</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Conditions Générales d'Accompagnement</span>
            <span className="hover:underline cursor-pointer">Protection des Données</span>
            <span className="hover:underline cursor-pointer">Mentions Légales</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
