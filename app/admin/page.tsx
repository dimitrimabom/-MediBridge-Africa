"use client";

import React from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/context/app-store";
import { formatDate, formatFCFA } from "@/lib/utils";
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { dossiers, clients, payments } = useAppStore();

  const totalDossiers = dossiers.length;
  const pendingDossiers = dossiers.filter(
    (d) =>
      d.status === "demande_recue" ||
      d.status === "paiement_attente" ||
      d.status === "documents_a_completer"
  ).length;

  const inProgressDossiers = dossiers.filter(
    (d) =>
      d.status === "examen_administratif" ||
      d.status === "coordination_en_cours" ||
      d.status === "proposition_a_examiner" ||
      d.status === "preparation_voyage" ||
      d.status === "suivi_en_cours"
  ).length;

  const closedDossiers = dossiers.filter((d) => d.status === "cloture").length;

  const totalRevenueFCFA = payments
    .filter((p) => p.status === "paye")
    .reduce((acc, curr) => acc + curr.amountFCFA, 0);

  const recentDossiers = dossiers.slice(0, 5);

  return (
    <div>
      <AdminHeader
        title="Tableau de Bord Coordinateur"
        subtitle="Supervision globale des parcours médicaux Cameroun - Inde"
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* 4 Main KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard
            title="Total Dossiers Enregistrés"
            value={totalDossiers}
            iconName="FolderKanban"
            change="+2 cette semaine"
            description="Patients au Cameroun et Afrique francophone"
          />

          <StatsCard
            title="Dossiers en Attente d'Action"
            value={pendingDossiers}
            iconName="Clock"
            changeType="neutral"
            change="À instruire"
            description="Demandes reçues ou pièces manquantes"
          />

          <StatsCard
            title="Parcours en Cours en Inde"
            value={inProgressDossiers}
            iconName="Activity"
            changeType="positive"
            change="Actifs"
            description="Coordination hospitalière ou sur place"
          />

          <StatsCard
            title="Volume Financier Démo"
            value={formatFCFA(totalRevenueFCFA)}
            iconName="CreditCard"
            changeType="positive"
            change="Quittances démo"
            description="Frais d'accompagnement simulés encaissés"
          />
        </div>

        {/* Status Distribution Bar / Grid */}
        <Card>
          <CardHeader className="pb-3 border-b border-[#F1F5F9]">
            <CardTitle className="text-base text-[#102A43] flex items-center justify-between">
              <span>Répartition des dossiers par statut d'avancement</span>
              <span className="text-xs text-[#64748B] font-normal">
                {totalDossiers} dossiers suivis
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                <span className="text-xs font-semibold text-blue-900">Demandes Reçues</span>
                <p className="text-2xl font-black text-blue-950 mt-1">
                  {dossiers.filter((d) => d.status === "demande_recue").length}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-xs font-semibold text-amber-900">Pièces à Compléter</span>
                <p className="text-2xl font-black text-amber-950 mt-1">
                  {dossiers.filter((d) => d.status === "documents_a_completer").length}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200">
                <span className="text-xs font-semibold text-indigo-900">Coordination Inde</span>
                <p className="text-2xl font-black text-indigo-950 mt-1">
                  {dossiers.filter((d) => d.status === "coordination_en_cours").length}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
                <span className="text-xs font-semibold text-sky-900">Préparation Voyage</span>
                <p className="text-2xl font-black text-sky-950 mt-1">
                  {dossiers.filter((d) => d.status === "preparation_voyage").length}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs font-semibold text-emerald-900">Séjour en Cours</span>
                <p className="text-2xl font-black text-emerald-950 mt-1">
                  {dossiers.filter((d) => d.status === "suivi_en_cours").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Dossiers Table + Activity Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 8 cols: Recent Dossiers */}
          <div className="lg:col-span-8">
            <Card>
              <CardHeader className="py-4 px-6 border-b border-[#F1F5F9] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base text-[#102A43]">
                    Dernières demandes enregistrées
                  </CardTitle>
                  <p className="text-xs text-[#64748B]">Accès rapide aux dossiers actifs</p>
                </div>
                <Button asChild variant="outline" size="sm" className="text-xs font-semibold">
                  <Link href="/admin/dossiers">Gérer tous les dossiers</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-[#102A43] border-b border-[#E2E8F0]">
                      <tr>
                        <th className="p-3.5 pl-6 font-bold">Référence</th>
                        <th className="p-3.5 font-bold">Patient</th>
                        <th className="p-3.5 font-bold">Ville</th>
                        <th className="p-3.5 font-bold">Formule</th>
                        <th className="p-3.5 font-bold">Statut</th>
                        <th className="p-3.5 pr-6 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {recentDossiers.map((dos) => (
                        <tr key={dos.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 pl-6 font-mono font-bold text-[#102A43]">
                            {dos.reference}
                          </td>
                          <td className="p-3.5 font-bold text-[#172B4D]">
                            {dos.clientName}
                          </td>
                          <td className="p-3.5 text-[#64748B]">
                            {dos.clientCity}
                          </td>
                          <td className="p-3.5 font-semibold text-[#173F5F]">
                            {dos.packageType}
                          </td>
                          <td className="p-3.5">
                            <StatusBadge status={dos.status} />
                          </td>
                          <td className="p-3.5 pr-6 text-right">
                            <Button asChild variant="ghost" size="sm" className="h-7 text-xs font-bold text-[#102A43]">
                              <Link href={`/admin/dossiers?ref=${dos.reference}`}>
                                Éditer →
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right 4 cols: Activity Feed */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                <CardTitle className="text-base text-[#102A43]">
                  Activité récente de l'équipe
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3.5">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#102A43]">
                      Grace Fotso (Douala)
                    </p>
                    <p className="text-[#64748B]">
                      Invitation Fortis reçue pour dossier MBA-2025-0841.
                    </p>
                    <span className="text-[10px] text-slate-400">Il y a 2h</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#102A43]">
                      Arnaud Nkembe (Yaoundé)
                    </p>
                    <p className="text-[#64748B]">
                      Dossier transmis au département Apollo Chennai (MBA-2025-0912).
                    </p>
                    <span className="text-[10px] text-slate-400">Hier à 16h20</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#102A43]">
                      Portail Public
                    </p>
                    <p className="text-[#64748B]">
                      Nouvelle demande créée en ligne (Christian Kouam).
                    </p>
                    <span className="text-[10px] text-slate-400">Hier à 14h30</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#C8A45D]/40 text-xs text-[#172B4D] space-y-2">
              <p className="font-bold text-[#102A43]">
                Mode Démonstration Actif
              </p>
              <p className="text-slate-600 leading-relaxed">
                Toute modification de statut ou d'agent effectuée dans le back-office se répercute instantanément dans l'espace client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
