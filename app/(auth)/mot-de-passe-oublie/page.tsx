"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-[#102A43]">
          Mot de passe oublié
        </h2>
        <p className="text-xs text-[#64748B]">
          Recevez les instructions de réinitialisation
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#102A43]">
            Lien simulé envoyé
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Un e-mail de réinitialisation a été simulé à destination de <strong>{email}</strong>.
          </p>
          <Button asChild variant="outline" className="w-full text-xs">
            <Link href="/connexion">Retour à la connexion</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#102A43] mb-1.5">
              Votre adresse e-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                placeholder="votre@email.cm"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full font-bold h-11 text-xs"
            disabled={isLoading}
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/connexion"
              className="text-xs font-semibold text-[#173F5F] hover:underline flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour à la page de connexion
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
