import React from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#102A43] flex items-center justify-center text-white font-black text-sm border border-[#C8A45D]">
            <span className="text-[#C8A45D]">M</span>
            <span className="text-white text-xs">B</span>
          </div>
          <span className="text-lg font-black tracking-tight text-[#102A43]">
            {BRAND_CONFIG.name}
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-[#173F5F] hover:text-[#102A43] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour au site
        </Link>
      </div>

      {/* Main card container */}
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>

      {/* Footer warning */}
      <div className="p-6 text-center text-xs text-[#64748B]">
        <p>
          Version Démonstration Frontend V1 • L'authentification est simulée localement pour tester les parcours.
        </p>
      </div>
    </div>
  );
}
