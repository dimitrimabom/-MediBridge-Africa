"use client";

import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";
import { Container } from "@/components/common/Container";
import { ServiceCard } from "@/components/common/ServiceCard";
import { PackageCard } from "@/components/common/PackageCard";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useAppStore } from "@/context/app-store";
import { MOCK_FAQ } from "@/data/mock-faq";
import {
  ShieldCheck,
  Plane,
  Building2,
  FileCheck2,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const { services, packages } = useAppStore();

  const previewServices = services.slice(0, 4);
  const homeFaq = MOCK_FAQ.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO BANNER SIMPLIFIÉ AVEC IMAGE DE FOND RÉELLE */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center text-white overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />

        {/* Navy Gradient Overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102A43]/95 via-[#102A43]/85 to-[#102A43]/70" />

        <Container className="relative z-10 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#C8A45D] bg-[#102A43]/80 px-3.5 py-1 rounded-full border border-[#C8A45D]/40">
              Accompagnement Médical Cameroun - Inde
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Votre séjour médical en Inde,{" "}
              <span className="text-[#C8A45D]">organisé en toute simplicité.</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl">
              Nous facilitons toutes vos démarches administratives, votre visa médical et votre séjour sur place au départ de Douala, Yaoundé et d'Afrique francophone.
            </p>

            {/* CTAs simples et clairs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                asChild
                variant="gold"
                size="lg"
                className="font-black text-sm h-12 px-8 shadow-md"
              >
                <Link href="/espace-client/nouveau-dossier" className="flex items-center justify-center gap-2">
                  Demander un accompagnement
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/40 font-semibold text-sm h-12 px-6"
              >
                <Link href="/formules">Découvrir les formules</Link>
              </Button>
            </div>

            {/* Reassurance points simples */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 border-t border-white/15">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C8A45D]" />
                <span>Bureaux à Douala & Yaoundé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C8A45D]" />
                <span>Assistance WhatsApp 7j/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C8A45D]" />
                <span>Transparence totale</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. LE PROCESSUS EN 3 ÉTAPES SIMPLES */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#173F5F] block mb-2">
              Comment ça marche ?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Un accompagnement clair en 3 étapes
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Nous prenons en charge la complexité administrative pour que vous puissiez voyager en confiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-[#C8A45D] font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-[#102A43]">
                1. Contact & Dossier
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Transmettez vos pièces en ligne ou en agence à Douala et Yaoundé pour analyse immédiate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-[#C8A45D] font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-[#102A43]">
                2. Visa & Logistique
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Nous obtenons votre lettre d'invitation hospitalière, votre visa et votre hébergement sécurisé.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] text-[#C8A45D] font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-[#102A43]">
                3. Arrivée & Suivi 7j/7
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Accueil avec chauffeur en Inde et accompagnement francophone continu pendant tout votre séjour.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. NOS 3 SERVICES ESSENTIELS */}
      <section className="py-16 sm:py-20 bg-[#F7F8FA]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#173F5F] block mb-1">
                Nos Prestations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
                Nos 3 services essentiels
              </h2>
            </div>
            <Button asChild variant="outline" size="sm" className="w-fit text-xs font-semibold">
              <Link href="/services">Voir les 3 services →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. NOS 3 FORMULES */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E2E8F0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#173F5F] block mb-2">
              Tarifs Transparents
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Des formules simples, adaptées à votre besoin
            </h2>
            <p className="text-sm text-[#64748B] mt-2">
              Des forfaits clairs en FCFA pour notre accompagnement logistique et administratif.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-[#64748B]">
              Les frais hospitaliers et de soins réels restent réglés directement aux hôpitaux indiens partenaires.
            </p>
          </div>
        </Container>
      </section>

      {/* 5. FAQ ESSENTIELLE */}
      <section className="py-16 sm:py-20 bg-[#F7F8FA]">
        <Container size="sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Questions fréquentes
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2">
              Les réponses directes aux interrogations les plus courantes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0]">
            <Accordion type="single" collapsible className="w-full">
              {homeFaq.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-sm sm:text-base font-bold text-[#102A43]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-[#64748B] leading-relaxed pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* 6. CONTACT & ACCÈS DIRECT */}
      <section className="py-16 bg-[#102A43] text-white">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Une question ? Besoin d'un conseil ?
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Nos coordinateurs vous répondent directement par WhatsApp ou par téléphone du lundi au samedi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={BRAND_CONFIG.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0c6b5e] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Parler sur WhatsApp (+237 6 70 00 00 00)
              </a>

              <Button asChild variant="gold" size="lg" className="w-full sm:w-auto font-bold h-12 px-6">
                <Link href="/espace-client/nouveau-dossier">
                  Ouvrir un dossier en ligne
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
