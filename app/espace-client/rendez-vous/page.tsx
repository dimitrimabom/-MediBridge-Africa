"use client";

import React from "react";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/context/app-store";
import { Calendar, Clock, Video, UserCheck, PlusCircle } from "lucide-react";

export default function ClientRendezVousPage() {
  const { appointments } = useAppStore();

  return (
    <div>
      <ClientHeader
        title="Mes Rendez-vous d'Orientation"
        subtitle="Échangez avec votre coordinateur de parcours par visioconférence ou téléphone"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#102A43]">
            Rendez-vous programmés ({appointments.length})
          </h2>
          <Button
            variant="gold"
            size="sm"
            className="text-xs font-bold"
            onClick={() => alert("Simulation : Demande de nouveau créneau d'orientation transmise à votre coordinateur.")}
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            Demander un rendez-vous
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <Card key={apt.id} className="hover:border-[#173F5F]/40 transition-all bg-white">
              <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <Badge variant={apt.status === "a_venir" ? "info" : "outline"} className="text-xs">
                    {apt.status === "a_venir" ? "À venir" : "Terminé"}
                  </Badge>
                  <span className="font-mono text-xs text-[#64748B]">{apt.dossierReference}</span>
                </div>
                <CardTitle className="text-base text-[#102A43] mt-2">
                  {apt.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs">
                <div className="space-y-2 text-[#172B4D]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C8A45D]" />
                    <span className="font-bold">{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#173F5F]" />
                    <span>{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    <span>Conseiller : {apt.advisorName}</span>
                  </div>
                </div>

                {apt.status === "a_venir" && apt.link && (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full text-xs font-bold gap-2"
                    onClick={() => alert("Simulation : Connexion au salon de visioconférence Google Meet démo.")}
                  >
                    <Video className="w-4 h-4" />
                    Rejoindre la visio (Démo)
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
