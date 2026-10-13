"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND_CONFIG } from "@/config/brand";
import { Lock, Mail, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("samuel.eboa@example.cm");
  const [password, setPassword] = useState("demo123456");
  const [role, setRole] = useState<"client" | "admin">("client");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/espace-client");
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-[#102A43]">
          Connexion à votre espace
        </h2>
        <p className="text-xs text-[#64748B]">
          Accédez à vos dossiers d'accompagnement ou au back-office
        </p>
      </div>

      {/* Role selector for demo convenience */}
      <div className="p-1 rounded-lg bg-slate-100 flex items-center text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => {
            setRole("client");
            setEmail("samuel.eboa@example.cm");
          }}
          className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
            role === "client"
              ? "bg-white text-[#102A43] shadow-xs"
              : "text-[#64748B] hover:text-[#102A43]"
          }`}
        >
          Espace Patient / Client
        </button>
        <button
          type="button"
          onClick={() => {
            setRole("admin");
            setEmail("admin@medibridge-africa.com");
          }}
          className={`flex-1 py-2 rounded-md transition-all cursor-pointer ${
            role === "admin"
              ? "bg-[#102A43] text-white shadow-xs"
              : "text-[#64748B] hover:text-[#102A43]"
          }`}
        >
          Back-office Équipe (Admin)
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#102A43] mb-1.5">
            Adresse e-mail
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#102A43]">
              Mot de passe
            </label>
            <Link
              href="/mot-de-passe-oublie"
              className="text-[11px] text-[#173F5F] hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              placeholder="••••••••"
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
          {isLoading ? (
            "Connexion en cours..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Se connecter à l'espace {role === "admin" ? "Admin" : "Client"}
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="pt-2 text-center text-xs text-[#64748B]">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-bold text-[#102A43] hover:underline">
          Créer un compte
        </Link>
      </div>

      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
        <span>
          <strong>Démonstration :</strong> Les identifiants sont pré-remplis pour faciliter l'évaluation. Cliquez simplement sur « Se connecter ».
        </span>
      </div>
    </div>
  );
}
