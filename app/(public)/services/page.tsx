"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { ServiceCard } from "@/components/common/ServiceCard";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/context/app-store";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ServicesPage() {
  const { services } = useAppStore();

  return (
    <div>
      <PageHeader
        badge="Accompagnement Médical"
        title="Nos 3 Services Essentiels"
        description="Une prise en charge ciblée pour organiser votre séjour médical en Inde sans surcharge ni complexité inutile."
      />

      <section className="py-16 sm:py-20">
        <Container>
          {/* The 3 Core Services in an elegant 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Clean banner linking to the 3 formulas */}
          <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D]">
                Formules Tout-en-un
              </span>
              <h3 className="text-lg font-bold text-[#102A43]">
                Vous préférez une formule complète clé en main ?
              </h3>
              <p className="text-xs text-[#64748B]">
                Nos forfaits Starter, Premium et VIP regroupent ces services avec un tarif forfaitaire clair en FCFA.
              </p>
            </div>

            <Button asChild variant="gold" className="shrink-0 font-bold px-6">
              <Link href="/formules" className="flex items-center gap-2">
                Comparer les 3 formules
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
