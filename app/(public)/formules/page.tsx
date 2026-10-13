"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { PackageCard } from "@/components/common/PackageCard";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import { Check, X, ShieldAlert, ArrowRight, HelpCircle } from "lucide-react";

export default function PackagesPage() {
  const { packages } = useAppStore();

  const comparisonFeatures = [
    {
      category: "Préparation & Constitution du dossier",
      items: [
        { name: "Audit de conformité des pièces administratives", starter: true, premium: true, vip: true },
        { name: "Coordination et traduction technique en anglais", starter: true, premium: true, vip: true },
        { name: "Dossier soumis à plusieurs hôpitaux de pointe", starter: "2 hôpitaux", premium: "4 hôpitaux", vip: "Accès illimité" },
        { name: "Délai de traitement administratif", starter: "Standard (5-7 j)", premium: "Prioritaire (48h)", vip: "Express (24h)" },
      ],
    },
    {
      category: "Démarches consulaires & Visa Médical",
      items: [
        { name: "Obtention de la Medical Invitation Letter officielle", starter: true, premium: true, vip: true },
        { name: "Assistance formulaire officiel e-Medical Visa", starter: true, premium: true, vip: true },
        { name: "Nombre de personnes couvertes (Patient + Accompagnateurs)", starter: "1 patient + 1 acc.", premium: "1 patient + 2 acc.", vip: "1 patient + 3 acc." },
      ],
    },
    {
      category: "Logistique & Accueil en Inde",
      items: [
        { name: "Conseils pour les réservations de vols", starter: true, premium: true, vip: true },
        { name: "Accueil personnalisé aéroport en Inde avec chauffeur", starter: false, premium: true, vip: "Véhicule Premium VIP" },
        { name: "Carte SIM indienne activée remise à l'arrivée", starter: false, premium: true, vip: true },
        { name: "Sélection d'appartements meublés sécurisés à proximité", starter: "Liste partenaire", premium: "Pré-réservation", vip: "Conciergerie Luxe" },
        { name: "Transferts quotidiens Logement ↔ Hôpital", starter: false, premium: false, vip: true },
      ],
    },
    {
      category: "Assistance sur place & Conciergerie",
      items: [
        { name: "Support francophone", starter: "Horaires bureau", premium: "7j/7 dédié", vip: "24h/24 personnel" },
        { name: "Accompagnateur présent aux consultations clés", starter: false, premium: false, vip: true },
        { name: "Aide au change de devises et démarches sur place", starter: false, premium: true, vip: true },
        { name: "Archivage et consolidation des reçus post-séjour", starter: false, premium: true, vip: true },
      ],
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Niveaux d'Accompagnement"
        title="Nos Formules d'Accompagnement Médical"
        description="Comparez nos 3 formules conçues pour répondre avec précision à vos exigences d'encadrement, de confort et de suivi personnalisé."
      />

      {/* 1. Formula Cards Grid */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Critical Disclaimer Notice */}
          <div className="p-6 rounded-2xl bg-[#FAF6ED] border-2 border-[#C8A45D]/50 text-xs text-[#172B4D] space-y-3 max-w-4xl mx-auto shadow-xs">
            <div className="flex items-center gap-2 font-black text-sm text-[#102A43]">
              <ShieldAlert className="w-5 h-5 text-[#C8A45D]" />
              Clarification essentielle sur le périmètre financier des formules
            </div>
            <p className="leading-relaxed">
              Les prix affichés (Starter : 250 000 FCFA, Premium : 650 000 FCFA, VIP : 1 450 000 FCFA) correspondent <strong>exclusivement à nos honoraires d'assistance logistique, administrative et de conciergerie</strong>.
            </p>
            <p className="leading-relaxed text-[#64748B]">
              <strong>Ne sont pas compris :</strong> Les consultations médicales, examens de laboratoire ou d'imagerie, interventions chirurgicales, médicaments, prothèses, droits de visa gouvernementaux officiels indiens, billets d'avion et loyers de logements en Inde. Ces éléments restent facturés directement par les établissements et transporteurs partenaires.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Detailed Comparative Table */}
      <section className="py-16 bg-white border-t border-[#E2E8F0]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
              Tableau comparatif détaillé des prestations
            </h2>
            <p className="mt-3 text-sm text-[#64748B]">
              Visualisez ligne par ligne les services inclus selon la formule choisie.
            </p>
          </div>

          {/* Desktop & Mobile Scrollable Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#102A43] text-white">
                  <th className="p-4 sm:p-5 font-bold w-2/5">Prestations & Engagements</th>
                  <th className="p-4 sm:p-5 font-bold text-center w-1/5">
                    Starter
                    <span className="block text-xs font-normal text-slate-300 mt-1">250 000 FCFA</span>
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-center w-1/5 bg-[#173F5F] text-[#C8A45D]">
                    Premium
                    <span className="block text-xs font-normal text-slate-200 mt-1">650 000 FCFA</span>
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-center w-1/5">
                    VIP
                    <span className="block text-xs font-normal text-slate-300 mt-1">1 450 000 FCFA</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] bg-white">
                {comparisonFeatures.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <tr className="bg-slate-100 font-bold text-[#102A43] text-xs uppercase tracking-wider">
                      <td colSpan={4} className="p-3.5 pl-5 bg-slate-100 text-[#173F5F]">
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-[#172B4D]">{item.name}</td>
                        <td className="p-4 text-center">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? (
                              <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 mx-auto" />
                            )
                          ) : (
                            <span className="font-semibold text-slate-700">{item.starter}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-[#FAF6ED]/40">
                          {typeof item.premium === "boolean" ? (
                            item.premium ? (
                              <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 mx-auto" />
                            )
                          ) : (
                            <span className="font-bold text-[#102A43]">{item.premium}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof item.vip === "boolean" ? (
                            item.vip ? (
                              <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 mx-auto" />
                            )
                          ) : (
                            <span className="font-black text-[#102A43]">{item.vip}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div className="mt-12 text-center">
            <Button asChild variant="gold" size="lg" className="font-black px-8">
              <Link href="/espace-client/nouveau-dossier" className="flex items-center gap-2">
                Ouvrir un dossier avec la formule de votre choix
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
