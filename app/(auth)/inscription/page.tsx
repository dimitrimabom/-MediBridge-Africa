"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Lock, ArrowRight, ShieldAlert } from "lucide-react";

export default function InscriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Douala",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Le nom complet est obligatoire.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Adresse e-mail invalide.";
    }
    if (!formData.phone.trim()) errs.phone = "Numéro de téléphone requis.";
    if (!formData.password || formData.password.length < 6) {
      errs.password = "Le mot de passe doit comporter au moins 6 caractères.";
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Les mots de passe ne correspondent pas.";
    }
    if (!formData.terms) {
      errs.terms = "Veuillez accepter les conditions d'utilisation.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/espace-client");
    }, 800);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-[#102A43]">
          Créer un compte
        </h2>
        <p className="text-xs text-[#64748B]">
          Pour suivre votre parcours médical vers l'Inde
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#102A43] mb-1.5">
            Nom et prénom *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="pl-9"
              placeholder="Ex: Samuel Eboa"
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#102A43] mb-1.5">
            Adresse e-mail *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-9"
              placeholder="exemple@email.cm"
            />
          </div>
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#102A43] mb-1.5">
              Téléphone *
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="6 70 00 00 00"
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102A43] mb-1.5">
              Ville de résidence
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
            >
              <option>Douala</option>
              <option>Yaoundé</option>
              <option>Bafoussam</option>
              <option>Garoua</option>
              <option>Bamenda</option>
              <option>Autre ville</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#102A43] mb-1.5">
            Mot de passe *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-9"
              placeholder="Au moins 6 caractères"
            />
          </div>
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#102A43] mb-1.5">
            Confirmer le mot de passe *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-9"
              placeholder="Répétez le mot de passe"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="terms"
              checked={formData.terms}
              onCheckedChange={(checked) => setFormData({ ...formData, terms: !!checked })}
            />
            <label htmlFor="terms" className="text-xs text-[#64748B] leading-snug cursor-pointer select-none">
              J'accepte les conditions d'utilisation et le traitement administratif de mes informations. *
            </label>
          </div>
          {errors.terms && <p className="text-xs text-red-600 font-medium">{errors.terms}</p>}
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full font-bold h-11 text-xs"
          disabled={isLoading}
        >
          {isLoading ? (
            "Création du compte..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              S'inscrire et accéder à mon espace
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="pt-2 text-center text-xs text-[#64748B]">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-bold text-[#102A43] hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
