"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  Building2,
  FileCheck2,
  Plane,
  Home,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function ProcessPage() {
  const steps = [
    {
      step: 1,
      title: "Prise de contact & Étude préliminaire",
      timing: "Jour 1 à 3",
      icon: FileText,
      description:
        "Vous déposez votre demande en ligne ou en agence à Douala/Yaoundé. Notre conseiller audite la conformité administrative de vos pièces d'identité et récapitule vos besoins généraux.",
      deliverables: [
        "Fiche de synthèse administrative",
        "Attribution d'un conseiller de dossier dédié",
        "Vérification de la validité de votre passeport",
      ],
    },
    {
      step: 2,
      title: "Coordination médicale & Traduction",
      timing: "Jour 3 à 7",
      icon: Building2,
      description:
        "Vos comptes rendus et bilans récents sont structurés chronologiquement et traduits en anglais médical professionnel pour être soumis aux départements internationaux des hôpitaux indiens ciblés.",
      deliverables: [
        "Dossier médical dématérialisé aux normes internationales",
        "Transmission officielle à 2 à 4 établissements réputés",
        "Accusé de réception des bureaux internationaux",
      ],
    },
    {
      step: 3,
      title: "Réception des estimations & Choix de l'établissement",
      timing: "Jour 7 à 12",
      icon: FileCheck2,
      description:
        "Les hôpitaux indiens transmettent leur protocole estimatif et leur devis indicatif. Nous vous présentons une synthèse comparative transparente afin que vous puissiez choisir l'établissement en toute clarté.",
      deliverables: [
        "Tableau comparatif des estimations hospitalières",
        "Émission de la Medical Invitation Letter officielle (invitation consulaire)",
        "Validation définitive des dates souhaitées",
      ],
    },
    {
      step: 4,
      title: "Assistance Visa e-Medical & Logistique du voyage",
      timing: "Jour 12 à 18",
      icon: Plane,
      description:
        "Nous vous guidons pas à pas pour la demande consulaire du visa médical indien (MED) et d'accompagnateur (MED X). Parallèlement, nous sélectionnons les meilleurs vols et pré-réservons votre logement à proximité de la clinique.",
      deliverables: [
        "Formulaire consulaire vérifié sans risque d'erreur de saisie",
        "Suivi consulaire de l'octroi du visa",
        "Réservation de vol adaptée et appartement meublé pré-réservé",
      ],
    },
    {
      step: 5,
      title: "Accueil en Inde, Séjour & Suivi après retour",
      timing: "Durée du séjour + Suivi post-retour",
      icon: ShieldCheck,
      description:
        "À votre atterrissage en Inde (Delhi, Mumbai, Chennai...), votre chauffeur vous accueille. Une carte SIM vous est remise et notre assistance francophone reste joignable. Au retour au Cameroun, nous vous aidons à rassembler vos factures finales.",
      deliverables: [
        "Transfert privé aéroport ↔ logement",
        "Ligne d'assistance francophone 7j/7",
        "Archivage des quittances pour mutuelles ou assurances",
        "Clôture administrative du dossier",
      ],
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Parcours Balisé"
        title="Notre Processus d'Accompagnement"
        description="Une démarche chronologique structurée en 5 étapes pour faire de votre séjour médical une expérience organisée, sécurisée et sereine."
      />

      <section className="py-16 sm:py-20">
        <Container size="sm">
          {/* Timeline steps */}
          <div className="relative pl-8 sm:pl-10 space-y-12 before:absolute before:left-3.5 sm:before:left-4.5 before:top-4 before:bottom-6 before:w-0.5 before:bg-[#E2E8F0]">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative group">
                  {/* Step circle indicator */}
                  <div className="absolute -left-8 sm:-left-10 mt-1 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#102A43] text-[#C8A45D] font-extrabold text-xs sm:text-sm ring-4 ring-white shadow-xs">
                    {item.step}
                  </div>

                  <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs hover:border-[#173F5F]/40 transition-all space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[#FAF6ED] text-[#173F5F]">
                          <Icon className="w-5 h-5 text-[#C8A45D]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#102A43]">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#173F5F] bg-slate-100 px-3 py-1 rounded-full shrink-0 flex items-center gap-1 w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        {item.timing}
                      </span>
                    </div>

                    <p className="text-sm text-[#172B4D] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                        Résultats concrets de l'étape :
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#172B4D]">
                        {item.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeframe variation alert */}
          <div className="mt-16 p-6 rounded-xl bg-[#FAF6ED] border border-[#C8A45D]/40 text-xs text-[#172B4D] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#102A43] text-sm">
              <AlertCircle className="w-4 h-4 text-[#C8A45D]" />
              Remarque essentielle sur les délais
            </div>
            <p className="leading-relaxed text-[#64748B]">
              Les durées indiquées ci-dessus (10 à 21 jours en moyenne) sont données à titre strictement indicatif. Les délais effectifs dépendent de la réactivité des départements hospitaliers indiens, des délais consulaires gouvernementaux d'attribution du visa, des disponibilités aériennes et de la promptitude à fournir les pièces d'identité requises.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button asChild variant="gold" size="lg" className="font-bold">
              <Link href="/espace-client/nouveau-dossier" className="flex items-center gap-2">
                Initier votre dossier dès maintenant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
