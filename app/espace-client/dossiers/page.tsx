"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Container } from "@/components/common/Container";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SearchInput } from "@/components/common/SearchInput";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/context/app-store";
import { formatDate } from "@/lib/utils";
import { FolderKanban, PlusCircle, ArrowRight, Eye, Calendar, Sparkles } from "lucide-react";
import { DossierStatus } from "@/types";

export default function ClientDossiersPage() {
  const { dossiers } = useAppStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDossiers = dossiers.filter((d) => {
    const matchesSearch =
      d.reference.toLowerCase().includes(search.toLowerCase()) ||
      d.requestType.toLowerCase().includes(search.toLowerCase()) ||
      d.targetSpecialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <ClientHeader
        title="Mes Dossiers d'Accompagnement"
        subtitle="Consultez l'historique et le suivi détaillé de vos demandes"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Filters and search row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <SearchInput
            value={search}
            onChangeValue={setSearch}
            placeholder="Rechercher par référence ou motif..."
            className="w-full sm:w-80"
          />

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 py-2 text-xs font-semibold bg-slate-50 border border-[#E2E8F0] rounded-md text-[#172B4D] focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="demande_recue">Demande reçue</option>
              <option value="documents_a_completer">Documents à compléter</option>
              <option value="coordination_en_cours">Coordination en cours</option>
              <option value="preparation_voyage">Préparation du voyage</option>
              <option value="suivi_en_cours">Suivi en cours</option>
              <option value="cloture">Clôturé</option>
            </select>

            <Button asChild variant="gold" size="sm" className="font-bold text-xs shrink-0">
              <Link href="/espace-client/nouveau-dossier">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Nouveau
              </Link>
            </Button>
          </div>
        </div>

        {/* Dossiers list / table */}
        {filteredDossiers.length > 0 ? (
          <div className="space-y-4">
            {filteredDossiers.map((dossier) => (
              <Card
                key={dossier.id}
                className="hover:border-[#173F5F]/40 transition-all shadow-xs bg-white"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Info */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono font-black text-sm text-[#102A43] bg-slate-100 px-2.5 py-1 rounded">
                          {dossier.reference}
                        </span>
                        <StatusBadge status={dossier.status} />
                        <span className="text-xs font-bold text-[#173F5F] bg-[#FAF6ED] px-2 py-0.5 rounded border border-[#C8A45D]/30">
                          Formule {dossier.packageType}
                        </span>
                        {dossier.urgent && (
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded uppercase">
                            Prioritaire
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#102A43]">
                        {dossier.requestType}
                      </h3>

                      <p className="text-xs text-[#64748B]">
                        Étape active : {dossier.currentStage}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Créé le {formatDate(dossier.createdAt)}
                        </span>
                        <span>•</span>
                        <span>Coordinateur : {dossier.assignedAgent}</span>
                        <span>•</span>
                        <span>Destination : {dossier.preferredCity || "Inde"}</span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
                      <Button asChild variant="default" size="sm" className="font-bold text-xs">
                        <Link
                          href={`/espace-client/dossiers/${dossier.id}`}
                          className="flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Consulter le dossier
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun dossier trouvé"
            description="Aucun dossier ne correspond à vos critères de recherche ou de filtre."
            actionLabel="Réinitialiser les filtres"
            onAction={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          />
        )}
      </div>
    </div>
  );
}
