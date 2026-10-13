"use client";

import React from "react";
import Link from "next/link";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Container } from "@/components/common/Container";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ProgressTimeline } from "@/components/common/ProgressTimeline";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import {
  FolderKanban,
  FileText,
  Calendar,
  CreditCard,
  PlusCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  PhoneCall,
  User,
  CheckCircle2,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { dossiers, currentClient, appointments, payments } = useAppStore();

  // Find active dossier for this demo client or fallback to the first active
  const activeDossier = dossiers.find((d) => d.status !== "cloture" && d.status !== "annule") || dossiers[0];
  const pendingDocsCount = activeDossier?.documents.filter((d) => d.status === "en_attente" || d.status === "a_fournir").length || 0;
  const upcomingApt = appointments.find((a) => a.status === "a_venir");

  return (
    <div>
      <ClientHeader
        title={`Bonjour, ${currentClient.fullName}`}
        subtitle="Bienvenue dans votre espace d'accompagnement médical MediBridge"
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Welcome banner & CTA */}
        <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 border border-[#173F5F] relative overflow-hidden shadow-md">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 bg-[radial-gradient(#C8A45D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D] bg-[#173F5F] px-3 py-1 rounded-full border border-[#C8A45D]/30 inline-block">
                Parcours Actif en Cours
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Dossier {activeDossier ? activeDossier.reference : "MBA-2025-0841"}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeDossier?.currentStage || "Préparation du voyage en cours."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {activeDossier && (
                <Button asChild variant="gold" className="font-bold text-xs h-10 shadow-xs">
                  <Link href={`/espace-client/dossiers/${activeDossier.id}`}>
                    Voir les détails du dossier
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" className="border-slate-500 text-white hover:bg-white/10 text-xs h-10">
                <Link href="/espace-client/nouveau-dossier">
                  <PlusCircle className="w-4 h-4 mr-1.5" />
                  Nouveau dossier
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 4 KPI overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="hover:border-[#173F5F]/30 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Dossiers en cours</span>
                <div className="p-2 rounded-lg bg-[#FAF6ED] text-[#C8A45D]">
                  <FolderKanban className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-[#102A43] mt-2">
                {dossiers.filter((d) => d.status !== "cloture" && d.status !== "annule").length}
              </p>
              <p className="text-[11px] text-[#64748B] mt-1">
                Sur {dossiers.length} dossier(s) au total
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#173F5F]/30 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Statut actuel</span>
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                {activeDossier && <StatusBadge status={activeDossier.status} />}
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Formule {activeDossier?.packageType || "Premium"}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#173F5F]/30 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Documents à fournir</span>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-[#102A43] mt-2">
                {pendingDocsCount}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                {activeDossier?.documents.filter((d) => d.status === "valide").length || 0} validé(s)
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#173F5F]/30 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">Prochain rendez-vous</span>
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm font-black text-[#102A43] mt-2 truncate">
                {upcomingApt ? upcomingApt.date : "Aucun rdv prévu"}
              </p>
              <p className="text-[11px] text-[#64748B] mt-1 truncate">
                {upcomingApt ? upcomingApt.type : "Orientation"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Two-column section: Left (Next tasks & timeline) / Right (Advisor & Documents) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Active Dossier Timeline & Next Steps */}
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader className="border-b border-[#F1F5F9] pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Chronologie des étapes d'accompagnement
                    </CardTitle>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Dossier réf : {activeDossier?.reference}
                    </p>
                  </div>
                  {activeDossier && <StatusBadge status={activeDossier.status} />}
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {activeDossier && (
                  <ProgressTimeline events={activeDossier.events} />
                )}
              </CardContent>

              <CardFooter className="bg-slate-50 border-t border-[#F1F5F9] py-3 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">
                  Dernière mise à jour : {new Date(activeDossier?.updatedAt || "").toLocaleDateString("fr-FR")}
                </span>
                <Button asChild variant="ghost" size="sm" className="text-xs font-bold text-[#173F5F]">
                  <Link href={`/espace-client/dossiers/${activeDossier?.id}`}>
                    Détails complets du dossier →
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Next Tasks Box */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-[#102A43]">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D]" />
                  Prochaines démarches à accomplir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF6ED]/60 border border-[#C8A45D]/30 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#C8A45D] shrink-0 mt-1.5" />
                  <div>
                    <p className="font-bold text-[#102A43]">
                      Confirmer les dates d'embarquement pour l'e-Medical Visa
                    </p>
                    <p className="text-[#64748B] mt-0.5">
                      Veuillez valider l'option de vol Douala-Delhi avant le 20 octobre pour dépôt définitif consulaire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                  <div>
                    <p className="font-bold text-[#102A43]">
                      Entretien d'orientation préparatoire en visioconférence
                    </p>
                    <p className="text-[#64748B] mt-0.5">
                      Prévu le 20 oct. à 10h30 avec Mme Grace Fotso (Coordinatrice).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right 5 cols: Advisor Card, Pending Documents & Quick Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Assigned Advisor Card */}
            <Card className="border-2 border-[#173F5F]/20">
              <CardHeader className="pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A45D]">
                  Interlocuteur Dédié
                </span>
                <CardTitle className="text-base text-[#102A43]">
                  Votre Coordinateur de Dossier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#102A43] text-white flex items-center justify-center font-black text-sm">
                    GF
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#102A43]">
                      {activeDossier?.assignedAgent || "Grace Fotso"}
                    </h4>
                    <p className="text-xs text-[#64748B]">
                      Coordinatrice des séjours médicaux Inde (Douala Hub)
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 text-xs text-[#64748B] space-y-1.5">
                  <p>
                    <strong>Ligne directe :</strong> +237 6 70 00 00 00
                  </p>
                  <p>
                    <strong>Disponibilité :</strong> Lun - Ven de 8h à 18h
                  </p>
                </div>

                <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold">
                  <Link href="/espace-client/assistance">
                    Envoyer un message à mon coordinateur
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Expected Administrative Documents */}
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base text-[#102A43]">
                  Documents du dossier
                </CardTitle>
                <Button asChild variant="ghost" size="sm" className="text-xs font-bold text-[#173F5F] p-0 h-auto">
                  <Link href="/espace-client/documents">Voir tout</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {activeDossier?.documents.slice(0, 4).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[#E2E8F0] text-xs hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-[#173F5F] shrink-0" />
                      <span className="font-medium text-[#172B4D] truncate">
                        {doc.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                        doc.status === "valide"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {doc.status === "valide" ? "Validé" : "En cours"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Demo Payment receipt reminder */}
            <Card className="bg-[#FAF6ED]/70 border border-[#C8A45D]/40">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-[#102A43]">
                  <CreditCard className="w-4 h-4 text-[#C8A45D]" />
                  <span>Dernière quittance de démonstration</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Paiement de {formatFCFA(activeDossier?.estimatedCostFCFA || 650000)} réglé pour l'accompagnement {activeDossier?.packageType}.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full text-xs font-bold bg-white">
                  <Link href="/espace-client/paiements">
                    Consulter le reçu de paiement
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
