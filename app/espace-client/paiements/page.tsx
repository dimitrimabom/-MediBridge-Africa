"use client";

import React, { useState } from "react";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import { CreditCard, CheckCircle2, Clock, Receipt, ShieldAlert, Download } from "lucide-react";
import { PaymentRecord } from "@/types";

export default function ClientPaiementsPage() {
  const { payments, currentClient } = useAppStore();
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  return (
    <div>
      <ClientHeader
        title="Mes Règlements & Quittances"
        subtitle="Visualisez l'historique de vos honoraires d'accompagnement de démonstration"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Important simulation banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Paiements 100% simulés :</strong> Les transactions listées ci-dessous représentent des quittances de démonstration pour illustrer l'expérience utilisateur. Aucun prélèvement financier réel n'est engagé.
          </span>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader className="pb-3 border-b border-[#F1F5F9]">
            <CardTitle className="text-base text-[#102A43]">
              Historique des transactions ({payments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[#102A43] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3.5 pl-6 font-bold">Référence</th>
                    <th className="p-3.5 font-bold">Dossier</th>
                    <th className="p-3.5 font-bold">Date</th>
                    <th className="p-3.5 font-bold">Prestation</th>
                    <th className="p-3.5 font-bold">Montant</th>
                    <th className="p-3.5 font-bold">Mode de règlement</th>
                    <th className="p-3.5 font-bold">Statut</th>
                    <th className="p-3.5 pr-6 font-bold text-right">Reçu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {payments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6 font-mono font-bold text-[#102A43]">
                        {pay.reference}
                      </td>
                      <td className="p-3.5 font-mono text-[#173F5F]">
                        {pay.dossierReference}
                      </td>
                      <td className="p-3.5 text-[#64748B]">
                        {pay.date}
                      </td>
                      <td className="p-3.5 font-medium text-[#172B4D] max-w-xs truncate">
                        {pay.label}
                      </td>
                      <td className="p-3.5 font-black text-[#102A43]">
                        {formatFCFA(pay.amountFCFA)}
                      </td>
                      <td className="p-3.5 text-[#173F5F] font-semibold">
                        {pay.paymentMethod}
                      </td>
                      <td className="p-3.5">
                        <Badge
                          variant={pay.status === "paye" ? "success" : "warning"}
                          className="text-xs capitalize"
                        >
                          {pay.status === "paye" ? "Réglé" : "En attente"}
                        </Badge>
                      </td>
                      <td className="p-3.5 pr-6 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => setSelectedReceipt(pay)}
                        >
                          <Receipt className="w-3.5 h-3.5 mr-1 text-[#C8A45D]" />
                          Quittance
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

      {/* Simulated Receipt Modal */}
      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-black text-xl text-[#102A43]">
              QUITTANCE DE PAIEMENT
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-[#64748B]">
              Document de démonstration • MediBridge Africa Hub Douala / Yaoundé
            </DialogDescription>
          </DialogHeader>

          {selectedReceipt && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">N° Quittance :</span>
                  <span className="font-mono font-bold text-[#102A43]">{selectedReceipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Référence transaction :</span>
                  <span className="font-mono">{selectedReceipt.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Dossier associé :</span>
                  <span className="font-bold text-[#173F5F]">{selectedReceipt.dossierReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Date d'émission :</span>
                  <span>{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Moyen de règlement :</span>
                  <span className="font-bold">{selectedReceipt.paymentMethod}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#C8A45D]/40 space-y-2">
                <div className="flex justify-between font-bold text-[#102A43]">
                  <span>Libellé :</span>
                  <span className="text-right max-w-xs">{selectedReceipt.label}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#102A43] pt-2 border-t border-[#C8A45D]/30">
                  <span>Montant total :</span>
                  <span>{formatFCFA(selectedReceipt.amountFCFA)}</span>
                </div>
              </div>

              <p className="text-[10px] text-center text-slate-500 italic">
                Cette quittance atteste le règlement des frais de dossier et d'assistance logistique. Les frais hospitaliers en Inde feront l'objet d'une facturation distincte directe.
              </p>

              <Button
                variant="outline"
                className="w-full text-xs font-semibold"
                onClick={() => {
                  alert("Téléchargement du reçu de démonstration simulé avec succès !");
                  setSelectedReceipt(null);
                }}
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Télécharger la quittance PDF (Simulé)
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
