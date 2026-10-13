"use client";

import React, { useState } from "react";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Lock, Globe, Shield, CheckCircle2 } from "lucide-react";

export default function ClientParametresPage() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <ClientHeader
        title="Paramètres & Préférences"
        subtitle="Gérez vos notifications de suivi de dossier et préférences de compte"
      />

      <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Préférences enregistrées avec succès !
          </div>
        )}

        <Card>
          <CardHeader className="border-b border-[#F1F5F9] pb-4">
            <CardTitle className="text-base text-[#102A43] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#C8A45D]" />
              Notifications d'avancement de dossier
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="notif-email"
                checked={notifEmail}
                onCheckedChange={(c) => setNotifEmail(!!c)}
              />
              <div>
                <label htmlFor="notif-email" className="text-xs font-bold text-[#102A43] cursor-pointer">
                  Recevoir des alertes par e-mail
                </label>
                <p className="text-[11px] text-[#64748B]">
                  Notifications à chaque changement d'étape de votre dossier et réception de devis hospitalier.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="notif-wa"
                checked={notifWhatsapp}
                onCheckedChange={(c) => setNotifWhatsapp(!!c)}
              />
              <div>
                <label htmlFor="notif-wa" className="text-xs font-bold text-[#102A43] cursor-pointer">
                  Alertes instantanées par WhatsApp
                </label>
                <p className="text-[11px] text-[#64748B]">
                  Rappels des rendez-vous et confirmation des invitations médicales directes sur votre numéro camerounais.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="gold"
                size="sm"
                className="font-bold text-xs"
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2500);
                }}
              >
                Sauvegarder les préférences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security & Language notice */}
        <Card>
          <CardHeader className="border-b border-[#F1F5F9] pb-4">
            <CardTitle className="text-base text-[#102A43] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#173F5F]" />
              Langue & Fuseau horaire
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3 text-xs text-[#172B4D]">
            <p><strong>Langue de l'interface :</strong> Français (Standard V1)</p>
            <p><strong>Fuseau horaire configuré :</strong> Douala / Yaoundé (GMT+1 / WAT)</p>
            <p><strong>Devise par défaut :</strong> Franc CFA (FCFA)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
