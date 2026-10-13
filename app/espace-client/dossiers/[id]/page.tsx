"use client";

import React, { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ClientHeader } from "@/components/client/ClientHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ProgressTimeline } from "@/components/common/ProgressTimeline";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/context/app-store";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  FileText,
  Upload,
  Calendar,
  CreditCard,
  Phone,
  Sparkles,
} from "lucide-react";

function ClientDossierDetailContent() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { dossiers, currentClient } = useAppStore();
  const dossier = dossiers.find((d) => d.id === id);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!dossier) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto space-y-4">
        <h2 className="text-xl font-bold text-[#102A43]">Dossier introuvable</h2>
        <p className="text-xs text-[#64748B]">Le dossier demandé n'existe pas ou a été archivé.</p>
        <Button asChild variant="default">
          <Link href="/espace-client/dossiers">Retour aux dossiers</Link>
        </Button>
      </div>
    );
  }

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFileName.trim()) return;

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadDialogOpen(false);
      setUploadSuccess(false);
      setUploadedFileName("");
      alert("Document simulé ajouté à votre dossier avec succès !");
    }, 800);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Navigation & Status Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button asChild variant="outline" size="sm" className="w-fit text-xs">
          <Link href="/espace-client/dossiers" className="flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste des dossiers
          </Link>
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={dossier.status} />
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#FAF6ED] text-[#173F5F] border border-[#C8A45D]/30">
            Formule {dossier.packageType}
          </span>
        </div>
      </div>

      {/* Overview Information Box */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-[#64748B]">Date d'ouverture</span>
            <p className="text-sm font-bold text-[#102A43] mt-1">
              {formatDate(dossier.createdAt)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-[#64748B]">Spécialité visée</span>
            <p className="text-sm font-bold text-[#102A43] mt-1 truncate">
              {dossier.targetSpecialty}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-[#64748B]">Destination privilégiée</span>
            <p className="text-sm font-bold text-[#102A43] mt-1">
              {dossier.preferredCity || "Inde (Multiple)"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-[#64748B]">Coordinateur assigné</span>
            <p className="text-sm font-bold text-[#173F5F] mt-1 truncate">
              {dossier.assignedAgent}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Left Timeline & Tasks / Right Documents & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Timeline & Stage explanation */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="border-b border-[#F1F5F9] pb-4">
              <CardTitle className="text-base text-[#102A43]">
                Progression de l'accompagnement
              </CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                Étape en cours : <strong>{dossier.currentStage}</strong>
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <ProgressTimeline events={dossier.events} />
            </CardContent>
          </Card>

          {/* Internal Notes */}
          {dossier.notes.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#102A43]">
                  Notes et communications de l'équipe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dossier.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-[#102A43]">
                      <span>{note.author}</span>
                      <span className="text-[11px] font-normal text-[#64748B]">
                        {formatDate(note.date)}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{note.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right 5 cols: Documents, Actions & Team Contact */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-2 border-[#C8A45D]/50 bg-[#FAF6ED]/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#102A43] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A45D]" />
                Actions disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="gold"
                size="sm"
                className="w-full font-bold text-xs"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Transmettre un document administratif
              </Button>

              <Button asChild variant="outline" size="sm" className="w-full text-xs bg-white">
                <Link href="/espace-client/rendez-vous">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Prendre un rendez-vous d'orientation
                </Link>
              </Button>

              <Button asChild variant="outline" size="sm" className="w-full text-xs bg-white">
                <Link href="/espace-client/paiements">
                  <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                  Consulter la quittance de paiement
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base text-[#102A43]">
                Pièces administratives ({dossier.documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dossier.documents.length > 0 ? (
                dossier.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-lg border border-[#E2E8F0] text-xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="w-4 h-4 text-[#173F5F] shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-[#172B4D] truncate">{doc.name}</p>
                        <p className="text-[10px] text-[#64748B]">
                          {doc.category} • {doc.fileSize} • {doc.uploadDate}
                        </p>
                      </div>
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
                ))
              ) : (
                <p className="text-xs text-[#64748B] italic">
                  Aucune pièce enregistrée pour le moment.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#102A43]">
                Besoin d'aide sur ce dossier ?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-[#64748B] space-y-2">
              <p>
                Contactez votre coordinateur : <strong>{dossier.assignedAgent}</strong>
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:+237670000000"
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 font-bold text-[#102A43] hover:bg-slate-100"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>Appeler l'agence (+237 6 70 00 00 00)</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upload Document Modal Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transmettre un document (Simulation)</DialogTitle>
            <DialogDescription>
              Ajoutez une pièce administrative à votre dossier {dossier.reference}. (Version de démonstration sans stockage réel de fichiers confidentiels).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSimulateUpload} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-1">
                Catégorie du document
              </label>
              <select className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]">
                <option>Identité (Passeport, CNI)</option>
                <option>Administratif (Attestation, Justificatif)</option>
                <option>Voyage (Billet, Réservation)</option>
                <option>Hospitalier (Compte-rendu préliminaire)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-1">
                Nom ou intitulé du document *
              </label>
              <Input
                value={uploadedFileName}
                onChange={(e) => setUploadedFileName(e.target.value)}
                placeholder="Ex: Passeport_Page_Photo_HD.pdf"
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setUploadDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" variant="gold" className="font-bold">
                {uploadSuccess ? "Envoi..." : "Simuler l'envoi du document"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ClientDossierDetailPage() {
  return (
    <div>
      <Suspense fallback={<div className="p-16 text-center text-xs text-[#64748B]">Chargement du dossier...</div>}>
        <ClientDossierDetailContent />
      </Suspense>
    </div>
  );
}
