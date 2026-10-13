"use client";

import React, { useState } from "react";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppStore } from "@/context/app-store";
import { FileText, Download, Eye, ShieldAlert, FolderCheck } from "lucide-react";
import { DocumentItem } from "@/types";

export default function ClientDocumentsPage() {
  const { dossiers } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);

  // Flatten all documents from dossiers
  const allDocuments = dossiers.flatMap((d) => d.documents);

  const categories = ["all", "Identité", "Administratif", "Voyage", "Hospitalier", "Devis & Reçu"];

  const filteredDocs = allDocuments.filter((doc) =>
    selectedCategory === "all" ? true : doc.category === selectedCategory
  );

  return (
    <div>
      <ClientHeader
        title="Mes Documents & Pièces Justificatives"
        subtitle="Consultez l'ensemble des pièces administratives associées à vos dossiers"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Notice on demo documents */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <span>
            <strong>Version de démonstration sécurisée :</strong> Les documents affichés ci-dessous sont des fichiers fictifs de test. Aucune véritable donnée médicale confidentielle n'est stockée ni traitée dans cette interface.
          </span>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#102A43] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
              }`}
            >
              {cat === "all" ? "Tous les documents" : cat}
            </button>
          ))}
        </div>

        {/* Documents table / card grid */}
        <Card>
          <CardHeader className="pb-3 border-b border-[#F1F5F9]">
            <CardTitle className="text-base text-[#102A43]">
              Liste des pièces ({filteredDocs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E2E8F0]">
              {filteredDocs.map((doc, idx) => (
                <div
                  key={`${doc.id}-${idx}`}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6ED] text-[#173F5F] flex items-center justify-center shrink-0 border border-[#C8A45D]/30">
                      <FileText className="w-5 h-5 text-[#C8A45D]" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-[#102A43] truncate">{doc.name}</p>
                      <p className="text-xs text-[#64748B]">
                        Catégorie : <strong>{doc.category}</strong> • Taille : {doc.fileSize} • Déposé le {doc.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant={doc.status === "valide" ? "success" : "warning"}
                      className="text-xs capitalize"
                    >
                      {doc.status === "valide" ? "Conforme" : "En cours d'examen"}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setViewingDoc(doc)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      Visualiser
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simulated Document Preview Dialog */}
      <Dialog open={!!viewingDoc} onOpenChange={() => setViewingDoc(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="truncate">{viewingDoc?.name}</DialogTitle>
            <DialogDescription>
              Aperçu du document de démonstration
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-3">
            <FolderCheck className="w-12 h-12 text-[#173F5F] mx-auto" />
            <p className="text-xs font-bold text-[#102A43]">
              {viewingDoc?.name}
            </p>
            <p className="text-xs text-[#64748B]">
              Catégorie : {viewingDoc?.category} ({viewingDoc?.fileSize})
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Ce document de démonstration est certifié conforme pour l'instruction du dossier.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
