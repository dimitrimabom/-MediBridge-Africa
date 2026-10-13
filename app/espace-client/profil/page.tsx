"use client";

import React, { useState } from "react";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/context/app-store";
import { User, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

export default function ClientProfilPage() {
  const { currentClient } = useAppStore();

  const [formData, setFormData] = useState({
    fullName: currentClient.fullName,
    email: currentClient.email,
    phone: currentClient.phone,
    country: currentClient.country,
    city: currentClient.city,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <ClientHeader
        title="Mon Profil Patient"
        subtitle="Consultez et mettez à jour vos coordonnées administratives"
      />

      <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader className="border-b border-[#F1F5F9] pb-4">
            <CardTitle className="text-base text-[#102A43]">
              Informations du compte client
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-4">
              {saved && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Coordonnées mises à jour avec succès (Démo) !
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                  Nom et prénom
                </label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Adresse e-mail
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Téléphone
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Pays de résidence
                  </label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Ville
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="gold" size="sm" className="font-bold">
                  Enregistrer les modifications
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
