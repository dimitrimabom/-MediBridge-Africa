"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import {
  Check,
  X,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function ServiceDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const { services } = useAppStore();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold text-[#102A43] mb-4">Service non trouvé</h2>
        <p className="text-sm text-[#64748B] mb-6">
          La prestation demandée n'existe pas ou a été déplacée.
        </p>
        <Button asChild variant="default">
          <Link href="/services">Retour au catalogue des services</Link>
        </Button>
      </Container>
    );
  }

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div>
      <PageHeader
        badge={service.category}
        title={service.title}
        description={service.shortDescription}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Link href="/services" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Tous les services
            </Link>
          </Button>
          <Button asChild variant="gold" className="font-bold">
            <Link href={`/espace-client/nouveau-dossier?service=${service.slug}`}>
              Demander cet accompagnement
            </Link>
          </Button>
        </div>
      </PageHeader>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 cols: Detailed Description & Inclusions */}
            <div className="lg:col-span-8 space-y-10">
              {/* Detailed Description */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#102A43]">
                  Présentation détaillée de la prestation
                </h2>
                <p className="text-base text-[#172B4D] leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Included Items */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] space-y-4">
                <h3 className="text-lg font-bold text-[#102A43] flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  Ce qui est inclus dans cette prestation
                </h3>
                <ul className="space-y-3">
                  {service.includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#172B4D]">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations & Legal Boundaries */}
              <div className="bg-[#FAF6ED] rounded-xl p-6 sm:p-8 border border-[#C8A45D]/40 space-y-4">
                <h3 className="text-lg font-bold text-[#102A43] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#C8A45D]" />
                  Limites du service & Précisions contractuelles
                </h3>
                <p className="text-xs text-[#64748B]">
                  Afin de garantir une clarté absolue, voici ce qui ne relève pas de notre champ d'intervention :
                </p>
                <ul className="space-y-3">
                  {service.limitations.map((limit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#64748B]">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed">{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 4 cols: Sticky summary card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-xl p-6 border-2 border-[#173F5F]/20 shadow-md space-y-6">
                <div>
                  <Badge variant="outline" className="text-xs text-[#173F5F]">
                    {service.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-[#102A43] mt-2">
                    {service.title}
                  </h3>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-[#64748B]">Honoraires indicatifs démo</span>
                  <p className="text-2xl sm:text-3xl font-black text-[#102A43] mt-0.5">
                    {formatFCFA(service.indicativePriceFCFA)}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    Tarif d'accompagnement logistique (hors actes médicaux)
                  </p>
                </div>

                <div className="space-y-2.5">
                  <Button asChild variant="gold" className="w-full font-bold h-11 text-xs">
                    <Link
                      href={`/espace-client/nouveau-dossier?service=${service.slug}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Initier une demande avec ce service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full text-xs">
                    <Link href="/contact">Poser une question à un conseiller</Link>
                  </Button>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B] space-y-2">
                  <p className="flex items-center gap-2 font-medium text-[#102A43]">
                    <Sparkles className="w-4 h-4 text-[#C8A45D]" />
                    Ce service est également inclus dans :
                  </p>
                  <p className="text-slate-500">
                    Les forfaits <strong>Premium</strong> et <strong>VIP</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related services */}
          <div className="mt-20 pt-10 border-t border-[#E2E8F0]">
            <h3 className="text-xl font-bold text-[#102A43] mb-6">
              Autres services d'accompagnement recommandés
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <div
                  key={other.id}
                  className="p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#173F5F]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <Badge variant="outline" className="text-[11px] mb-2">
                      {other.category}
                    </Badge>
                    <h4 className="font-bold text-sm text-[#102A43] mb-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-[#64748B] line-clamp-2">
                      {other.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#102A43]">
                      {formatFCFA(other.indicativePriceFCFA)}
                    </span>
                    <Button asChild variant="ghost" size="sm" className="text-xs h-7 px-2">
                      <Link href={`/services/${other.slug}`}>Voir détails →</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default function ServiceDetailPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs text-[#64748B]">Chargement du service...</div>}>
      <ServiceDetailContent />
    </Suspense>
  );
}
