"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/context/app-store";
import { Users, Mail, Phone, MapPin, FolderKanban, PlusCircle } from "lucide-react";

export default function AdminClientsPage() {
  const { clients, dossiers } = useAppStore();
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader
        title="Gestion des Patients & Clients"
        subtitle="Répertoire des demandeurs d'accompagnement médical"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <SearchInput
            value={search}
            onChangeValue={setSearch}
            placeholder="Rechercher par nom, ville ou email..."
            className="w-full sm:w-80"
          />

          <span className="text-xs text-[#64748B]">
            <strong>{filteredClients.length}</strong> patient(s) répertorié(s)
          </span>
        </div>

        <Card>
          <CardHeader className="py-4 px-6 border-b border-[#F1F5F9]">
            <CardTitle className="text-base text-[#102A43]">
              Répertoire Clients Démo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[#102A43] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-3.5 pl-6 font-bold">Patient</th>
                    <th className="p-3.5 font-bold">Localisation</th>
                    <th className="p-3.5 font-bold">Téléphone</th>
                    <th className="p-3.5 font-bold">Email</th>
                    <th className="p-3.5 font-bold">Inscrit le</th>
                    <th className="p-3.5 font-bold">Dossiers associés</th>
                    <th className="p-3.5 pr-6 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredClients.map((client) => {
                    const clientDossiers = dossiers.filter(
                      (d) => d.clientName.toLowerCase() === client.fullName.toLowerCase()
                    );
                    return (
                      <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 pl-6 font-bold text-[#102A43]">
                          {client.fullName}
                        </td>
                        <td className="p-3.5 text-[#172B4D]">
                          {client.city}, {client.country}
                        </td>
                        <td className="p-3.5 text-[#173F5F] font-semibold">
                          {client.phone}
                        </td>
                        <td className="p-3.5 text-[#64748B]">
                          {client.email}
                        </td>
                        <td className="p-3.5 text-[#64748B]">
                          {client.registeredAt}
                        </td>
                        <td className="p-3.5 font-bold text-[#173F5F]">
                          {clientDossiers.length} dossier(s)
                        </td>
                        <td className="p-3.5 pr-6 text-right">
                          <Button asChild variant="outline" size="sm" className="text-xs h-7">
                            <Link href={`/admin/dossiers?ref=${clientDossiers[0]?.reference || ""}`}>
                              Voir dossiers
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
