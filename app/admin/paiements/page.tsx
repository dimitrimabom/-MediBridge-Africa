"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import { CreditCard, ShieldAlert } from "lucide-react";

export default function AdminPaiementsPage() {
  const { payments } = useAppStore();

  const totalCollectedFCFA = payments
    .filter((p) => p.status === "paye")
    .reduce((acc, curr) => acc + curr.amountFCFA, 0);

  return (
    <div>
      <AdminHeader
        title="Journal des Règlements (Démo)"
        subtitle="Suivi des transactions d'accompagnement simulées"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Simulation comptable :</strong> Ces écritures sont des données locales créées pour tester la gestion administrative. Aucun encaissement bancaire réel n'est connecté.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card>
            <CardContent className="p-5">
              <span className="text-xs text-[#64748B]">Volume Encaissé (Démo)</span>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {formatFCFA(totalCollectedFCFA)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <span className="text-xs text-[#64748B]">Transactions Réglées</span>
              <p className="text-2xl font-black text-[#102A43] mt-1">
                {payments.filter((p) => p.status === "paye").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <span className="text-xs text-[#64748B]">En Attente d'Encaissement</span>
              <p className="text-2xl font-black text-amber-700 mt-1">
                {payments.filter((p) => p.status === "en_attente").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="py-4 px-6 border-b border-[#F1F5F9]">
            <CardTitle className="text-base text-[#102A43]">
              Transactions Enregistrées ({payments.length})
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
                    <th className="p-3.5 font-bold">Libellé</th>
                    <th className="p-3.5 font-bold">Montant</th>
                    <th className="p-3.5 font-bold">Méthode</th>
                    <th className="p-3.5 pr-6 font-bold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-6 font-mono font-bold text-[#102A43]">
                        {p.reference}
                      </td>
                      <td className="p-3.5 font-mono text-[#173F5F]">
                        {p.dossierReference}
                      </td>
                      <td className="p-3.5 text-[#64748B]">
                        {p.date}
                      </td>
                      <td className="p-3.5 font-medium text-[#172B4D]">
                        {p.label}
                      </td>
                      <td className="p-3.5 font-black text-[#102A43]">
                        {formatFCFA(p.amountFCFA)}
                      </td>
                      <td className="p-3.5 text-[#173F5F] font-semibold">
                        {p.paymentMethod}
                      </td>
                      <td className="p-3.5 pr-6">
                        <Badge
                          variant={p.status === "paye" ? "success" : "warning"}
                          className="text-xs capitalize"
                        >
                          {p.status === "paye" ? "Encaissé" : "En attente"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
