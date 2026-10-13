"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import { Layers, Edit, Check, CheckCircle2 } from "lucide-react";
import { PackageItem } from "@/types";

export default function AdminFormulesPage() {
  const { packages, updatePackage } = useAppStore();
  const [editingPkg, setEditingPkg] = useState<PackageItem | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [tagline, setTagline] = useState("");

  const handleOpenEdit = (p: PackageItem) => {
    setEditingPkg(p);
    setPrice(p.priceFCFA);
    setTagline(p.tagline);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    updatePackage({
      ...editingPkg,
      priceFCFA: Number(price),
      tagline,
    });

    setEditingPkg(null);
    alert("Formule mise à jour avec succès !");
  };

  return (
    <div>
      <AdminHeader
        title="Gestion des Formules d'Accompagnement"
        subtitle="Configuration des forfaits Starter, Premium et VIP"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
        <p className="text-xs text-[#64748B]">
          Modifiez les tarifs et descriptions des 3 formules d'accompagnement proposées au public.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col justify-between bg-white shadow-xs">
              <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-[#173F5F]">
                    {pkg.name}
                  </span>
                  {pkg.popular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C8A45D] text-[#102A43]">
                      Recommandée
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl font-black text-[#102A43] mt-2">
                  {formatFCFA(pkg.priceFCFA)}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 space-y-4 text-xs">
                <p className="text-[#64748B] min-h-[40px]">
                  {pkg.tagline}
                </p>

                <div>
                  <span className="font-bold text-[#102A43] block mb-2">
                    Inclusions ({pkg.inclusions.length}) :
                  </span>
                  <ul className="space-y-1.5 text-slate-700">
                    {pkg.inclusions.slice(0, 4).map((inc, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-bold"
                  onClick={() => handleOpenEdit(pkg)}
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Modifier le tarif & description
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Formula Dialog */}
      <Dialog open={!!editingPkg} onOpenChange={() => setEditingPkg(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Éditer la formule {editingPkg?.name}</DialogTitle>
            <DialogDescription>
              Ajustez le tarif indicatif en FCFA et l'accroche publique.
            </DialogDescription>
          </DialogHeader>

          {editingPkg && (
            <form onSubmit={handleSave} className="space-y-4 py-2 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Accroche descriptive
                </label>
                <Textarea
                  rows={3}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Prix forfaitaire (FCFA)
                </label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPkg(null)}
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
