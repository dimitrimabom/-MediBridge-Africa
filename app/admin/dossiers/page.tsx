"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SearchInput } from "@/components/common/SearchInput";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAppStore } from "@/context/app-store";
import { formatDate } from "@/lib/utils";
import {
  Edit,
  CheckCircle2,
} from "lucide-react";
import { Dossier, DossierStatus, DOSSIER_STATUS_MAP } from "@/types";

function AdminDossiersContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const {
    dossiers,
    updateDossierStatus,
    assignDossierAgent,
    addDossierNote,
  } = useAppStore();

  const [search, setSearch] = useState(initialRef);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);

  // Edit form state inside modal
  const [editStatus, setEditStatus] = useState<DossierStatus>("demande_recue");
  const [editAgent, setEditAgent] = useState("");
  const [newNote, setNewNote] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const filteredDossiers = dossiers.filter((d) => {
    const matchesSearch =
      d.reference.toLowerCase().includes(search.toLowerCase()) ||
      d.clientName.toLowerCase().includes(search.toLowerCase()) ||
      d.requestType.toLowerCase().includes(search.toLowerCase()) ||
      d.clientCity.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (dossier: Dossier) => {
    setSelectedDossier(dossier);
    setEditStatus(dossier.status);
    setEditAgent(dossier.assignedAgent);
    setNewNote("");
    setFeedbackMsg("");
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDossier) return;

    if (editStatus !== selectedDossier.status) {
      updateDossierStatus(selectedDossier.id, editStatus, newNote || undefined);
    } else if (newNote.trim()) {
      addDossierNote(selectedDossier.id, newNote.trim(), "Superviseur Démo");
    }

    if (editAgent !== selectedDossier.assignedAgent) {
      assignDossierAgent(selectedDossier.id, editAgent);
    }

    setFeedbackMsg("Modifications enregistrées ! Mise à jour immédiate.");
    setTimeout(() => {
      setSelectedDossier(null);
    }, 600);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs">
        <SearchInput
          value={search}
          onChangeValue={setSearch}
          placeholder="Rechercher par référence, patient ou motif..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 py-2 text-xs font-semibold bg-slate-50 border border-[#E2E8F0] rounded-md text-[#172B4D] focus:outline-none"
          >
            <option value="all">Tous les statuts ({dossiers.length})</option>
            <option value="demande_recue">Demande reçue</option>
            <option value="documents_a_completer">Documents à compléter</option>
            <option value="examen_administratif">Examen administratif</option>
            <option value="coordination_en_cours">Coordination en cours</option>
            <option value="proposition_a_examiner">Proposition à examiner</option>
            <option value="preparation_voyage">Préparation du voyage</option>
            <option value="suivi_en_cours">Suivi en cours</option>
            <option value="cloture">Clôturé</option>
            <option value="annule">Annulé</option>
          </select>
        </div>
      </div>

      {/* Dossiers Data Table */}
      <Card className="shadow-xs bg-white">
        <CardHeader className="py-4 px-6 border-b border-[#F1F5F9] flex flex-row items-center justify-between">
          <CardTitle className="text-base text-[#102A43]">
            Dossiers ({filteredDossiers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredDossiers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[#102A43] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3.5 pl-6 font-bold">Référence</th>
                    <th className="p-3.5 font-bold">Patient</th>
                    <th className="p-3.5 font-bold">Ville / Tél</th>
                    <th className="p-3.5 font-bold">Demande</th>
                    <th className="p-3.5 font-bold">Formule</th>
                    <th className="p-3.5 font-bold">Statut</th>
                    <th className="p-3.5 font-bold">Coordinateur</th>
                    <th className="p-3.5 pr-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredDossiers.map((dos) => (
                    <tr key={dos.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6 font-mono font-bold text-[#102A43]">
                        {dos.reference}
                      </td>
                      <td className="p-3.5 font-bold text-[#172B4D]">
                        {dos.clientName}
                      </td>
                      <td className="p-3.5 text-[#64748B]">
                        <div>{dos.clientCity}</div>
                        <div className="text-[10px] text-slate-400">{dos.clientPhone}</div>
                      </td>
                      <td className="p-3.5 font-medium text-[#172B4D] max-w-xs truncate">
                        {dos.requestType}
                      </td>
                      <td className="p-3.5 font-semibold text-[#173F5F]">
                        {dos.packageType}
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={dos.status} />
                      </td>
                      <td className="p-3.5 text-xs text-[#64748B] max-w-[140px] truncate">
                        {dos.assignedAgent}
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <Button
                          variant="gold"
                          size="sm"
                          className="h-8 text-xs font-bold"
                          onClick={() => handleOpenEdit(dos)}
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          Gérer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="Aucun dossier trouvé"
              description="Aucun dossier ne correspond à vos filtres actuels."
              actionLabel="Réinitialiser les filtres"
              onAction={() => {
                setSearch("");
                setStatusFilter("all");
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Edit Dossier Modal Dialog */}
      <Dialog open={!!selectedDossier} onOpenChange={() => setSelectedDossier(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Gestion du Dossier {selectedDossier?.reference}</span>
              {selectedDossier && <StatusBadge status={selectedDossier.status} />}
            </DialogTitle>
            <DialogDescription>
              Patient : {selectedDossier?.clientName} • {selectedDossier?.clientCity} ({selectedDossier?.clientCountry})
            </DialogDescription>
          </DialogHeader>

          {selectedDossier && (
            <form onSubmit={handleSaveChanges} className="space-y-6 py-2 text-xs">
              {feedbackMsg && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {feedbackMsg}
                </div>
              )}

              {/* Dossier Quick Info */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-[#172B4D]">
                <div>
                  <span className="text-[#64748B] block">Demande :</span>
                  <strong>{selectedDossier.requestType}</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block">Spécialité & Ville :</span>
                  <strong>{selectedDossier.targetSpecialty} ({selectedDossier.preferredCity})</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block">Formule d'accompagnement :</span>
                  <strong className="text-[#173F5F]">{selectedDossier.packageType}</strong>
                </div>
                <div>
                  <span className="text-[#64748B] block">Date de création :</span>
                  <span>{formatDate(selectedDossier.createdAt)}</span>
                </div>
              </div>

              {/* Status Update Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#102A43]">
                  Modifier le statut d'accompagnement *
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as DossierStatus)}
                  className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D] font-bold focus:border-[#173F5F]"
                >
                  {Object.entries(DOSSIER_STATUS_MAP).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.label} — ({meta.description})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#64748B]">
                  La modification met à jour instantanément la timeline du patient dans son espace personnel.
                </p>
              </div>

              {/* Assign Agent */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#102A43]">
                  Assigner à un coordinateur de parcours
                </label>
                <select
                  value={editAgent}
                  onChange={(e) => setEditAgent(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
                >
                  <option value="Grace Fotso (Coordinatrice Douala)">Grace Fotso (Coordinatrice Douala)</option>
                  <option value="Arnaud Nkembe (Superviseur Yaoundé)">Arnaud Nkembe (Superviseur Yaoundé)</option>
                  <option value="Dr. David Mvondo (Coordination)">Dr. David Mvondo (Coordination)</option>
                  <option value="Non assigné">Non assigné</option>
                </select>
              </div>

              {/* Add Internal Note */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#102A43]">
                  Ajouter une note interne d'équipe (ou notification)
                </label>
                <Textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Ex: Invitation reçue de Fortis Hospital. Billet d'avion à confirmer par le patient..."
                />
              </div>

              {/* Existing Notes list */}
              {selectedDossier.notes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="font-bold text-[#102A43] block">
                    Historique des notes internes ({selectedDossier.notes.length}) :
                  </span>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedDossier.notes.map((n) => (
                      <div key={n.id} className="p-2.5 rounded bg-slate-100 text-[11px]">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>{n.author}</span>
                          <span className="font-normal text-slate-500">{formatDate(n.date)}</span>
                        </div>
                        <p className="mt-1 text-slate-800">{n.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedDossier(null)}
                >
                  Fermer
                </Button>
                <Button type="submit" variant="gold" className="font-bold">
                  Enregistrer et appliquer les modifications
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminDossiersPage() {
  return (
    <div>
      <AdminHeader
        title="Gestion Administrative des Dossiers"
        subtitle="Mise à jour des statuts, assignation des coordinateurs et suivi des pièces"
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-[#64748B]">Chargement des dossiers...</div>}>
        <AdminDossiersContent />
      </Suspense>
    </div>
  );
}
