"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, CheckCircle2 } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const quickQuestions = [
    "Bonjour, je souhaite un devis pour un accompagnement en Inde.",
    "Comment se déroule la demande de visa médical ?",
    "Quelles pièces dois-je préparer pour mon dossier ?",
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dialog box popover when open */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-[#075E54] font-black flex items-center justify-center text-sm">
                  GF
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">
                  Assistance MediBridge Africa
                </h4>
                <p className="text-[11px] text-emerald-200 mt-0.5">
                  Grace Fotso • En ligne (Douala/Yaoundé)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fermer la boîte WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat message body */}
          <div className="p-4 bg-[#EFEAE2] space-y-3 max-h-[300px] overflow-y-auto">
            {/* Advisor greeting message */}
            <div className="bg-white rounded-xl rounded-tl-xs p-3.5 shadow-xs text-xs text-[#172B4D] max-w-[90%] leading-relaxed">
              <p className="font-bold text-[#075E54] text-[11px] mb-1">
                Conseiller MediBridge
              </p>
              <p>
                Bonjour ! 👋 Comment pouvons-nous vous aider aujourd'hui pour votre projet de soins en Inde ?
              </p>
              <span className="text-[10px] text-slate-400 block text-right mt-1">
                À l'instant
              </span>
            </div>

            {/* Quick questions chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Questions rapides :
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectQuick(q)}
                  className="w-full text-left text-[11px] p-2 bg-white/90 hover:bg-white text-[#102A43] font-medium rounded-lg border border-slate-200 transition-colors cursor-pointer"
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
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Tapez votre message ici..."
              className="w-full p-2.5 text-xs text-[#172B4D] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#25D366] resize-none"
              required
            />

            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>
                {isSending ? "Ouverture..." : "Envoyer le message sur WhatsApp"}
              </span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs shadow-xl transition-all hover:scale-105 cursor-pointer ring-4 ring-[#25D366]/20"
        aria-label="Ouvrir le chat WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white shrink-0" />
        <span className="hidden sm:inline">Discuter sur WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shrink-0" />
      </button>
    </div>
  );
}
