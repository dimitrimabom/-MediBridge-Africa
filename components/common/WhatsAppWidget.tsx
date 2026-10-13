"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, ExternalLink, Sparkles } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const quickQuestions = [
    "Bonjour, je souhaite un devis pour un accompagnement en Inde.",
    "Comment se déroule la demande de visa médical ?",
    "Quelles pièces dois-je préparer pour mon dossier médical ?",
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    const encodedMsg = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/237670000000?text=${encodedMsg}`;

    // Open WhatsApp directly in a new tab
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }

    setTimeout(() => {
      setIsSending(false);
      setMessage("");
      setIsOpen(false);
    }, 600);
  };

  const handleSelectQuick = (q: string) => {
    setMessage(q);
  };

  return (
    <div
      id="floating-whatsapp-widget"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end"
    >
      {/* Dialog box popover when open */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-white text-[#075E54] font-black flex items-center justify-center text-sm shadow-xs">
                  GF
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  <span>Assistance MediBridge</span>
                  <span className="text-[10px] bg-emerald-700/80 text-emerald-100 px-1.5 py-0.2 rounded font-semibold">Cameroun</span>
                </h4>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  Grace Fotso • En ligne (Douala / Yaoundé)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer la boîte WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat message body */}
          <div className="p-3.5 sm:p-4 bg-[#EFEAE2] space-y-3 max-h-[290px] overflow-y-auto">
            {/* Advisor greeting message */}
            <div className="bg-white rounded-xl rounded-tl-xs p-3.5 shadow-xs text-xs text-[#172B4D] max-w-[92%] leading-relaxed">
              <p className="font-bold text-[#075E54] text-[11px] mb-1 flex items-center gap-1">
                <span>Conseillère MediBridge</span>
                <span className="text-slate-400 font-normal">• Douala</span>
              </p>
              <p>
                Bonjour ! 👋 Comment pouvons-nous vous accompagner aujourd'hui pour votre prise en charge médicale en Inde ?
              </p>
              <span className="text-[10px] text-slate-400 block text-right mt-1 font-medium">
                À l'instant
              </span>
            </div>

            {/* Quick direct WhatsApp link */}
            <a
              href={BRAND_CONFIG.contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Ouvrir WhatsApp sans taper</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </a>

            {/* Quick questions chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Questions fréquentes :
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectQuick(q)}
                  className="w-full text-left text-[11px] p-2 bg-white/95 hover:bg-white text-[#102A43] font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>

          {/* Message input & Send to WhatsApp */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 space-y-2">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Tapez votre question ici..."
              className="w-full p-2.5 text-xs text-[#172B4D] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#25D366] resize-none"
            />

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#128C7E] active:scale-[0.98] text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span className="truncate">
                  {isSending ? "Ouverture..." : "Envoyer sur WhatsApp"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white font-bold text-xs sm:text-xs shadow-xl transition-all cursor-pointer ring-4 ring-[#25D366]/20 shrink-0"
        aria-label="Discuter sur WhatsApp"
        aria-expanded={isOpen}
      >
        <MessageCircle className="w-5 h-5 fill-white shrink-0" />
        <span className="font-bold whitespace-nowrap">Discuter sur WhatsApp</span>
        <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
      </button>
    </div>
  );
}
