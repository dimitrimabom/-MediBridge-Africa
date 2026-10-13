"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import { Briefcase, Edit, PlusCircle, CheckCircle2, ToggleLeft, ToggleRight } from "lucide-react";
import { ServiceItem } from "@/types";

export default function AdminServicesPage() {
  const { services, updateService, toggleServiceAvailability } = useAppStore();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [indicativePrice, setIndicativePrice] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService(s);
    setIndicativePrice(s.indicativePriceFCFA);
    setTitle(s.title);
    setShortDesc(s.shortDescription);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService({
      ...editingService,
      title,
      shortDescription: shortDesc,
      indicativePriceFCFA: Number(indicativePrice),
    });

    setEditingService(null);
    alert("Service mis à jour avec succès dans le catalogue local !");
  };

  return (
    <div>
      <AdminHeader
        title="Catalogue des Services"
        subtitle="Gestion des tarifs indicatifs et activation des prestations"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#64748B]">
            {services.length} services configurés • Tarifs en FCFA modifiables localement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col justify-between bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => toggleServiceAvailability(service.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    {service.isAvailable ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Actif
                      </span>
                    ) : (
                      <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Désactivé
                      </span>
                    )}
                  </button>
                </div>
                <CardTitle className="text-base text-[#102A43] mt-2">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 space-y-4 text-xs">
                <p className="text-[#64748B] line-clamp-3">
                  {service.shortDescription}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Tarif indicatif :</span>
                  <span className="font-black text-[#102A43] text-sm">
                    {formatFCFA(service.indicativePriceFCFA)}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold"
                  onClick={() => handleOpenEdit(service)}
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Modifier le service & prix
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Service Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier la prestation (Démo)</DialogTitle>
            <DialogDescription>
              Ajustez l'intitulé et le prix indicatif dans le catalogue.
            </DialogDescription>
          </DialogHeader>

          {editingService && (
            <form onSubmit={handleSave} className="space-y-4 py-2 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Titre du service
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Description courte
                </label>
                <Textarea
                  rows={3}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Honoraires indicatifs (FCFA)
                </label>
                <Input
                  type="number"
                  value={indicativePrice}
                  onChange={(e) => setIndicativePrice(Number(e.target.value))}
                  required
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingService(null)}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="gold" className="font-bold">
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
