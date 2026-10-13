"use client";

import React, { useState } from "react";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BRAND_CONFIG } from "@/config/brand";
import { MessageSquare, Send, Phone, Clock, MessageCircle } from "lucide-react";

export default function ClientAssistancePage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Grace Fotso (Conseillère)",
      time: "Hier, 14:30",
      content:
        "Bonjour Samuel, nous avons bien reçu les résultats d'imagerie complémentaires. Le département international de New Delhi confirme l'analyse sous 48h.",
      isClient: false,
    },
    {
      id: 2,
      sender: "Samuel Eboa (Vous)",
      time: "Hier, 16:15",
      content:
        "Parfait, merci Grace. Pour le visa de mon accompagnateur, devons-nous fournir également une attestation d'hébergement ?",
      isClient: true,
    },
    {
      id: 3,
      sender: "Grace Fotso (Conseillère)",
      time: "Aujourd'hui, 09:10",
      content:
        "Absolument. Nous vous transmettrons l'attestation de réservation d'appartement dès que les dates de vol seront validées.",
      isClient: false,
    },
  ]);

  const [inputMsg, setInputMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Samuel Eboa (Vous)",
      time: "À l'instant",
      content: inputMsg.trim(),
      isClient: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");

    // Simulate coordinator reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "Grace Fotso (Conseillère)",
          time: "À l'instant",
          content:
            "Bien reçu ! Votre message a été pris en compte. Je consulte votre dossier et reviens vers vous rapidement.",
          isClient: false,
        },
      ]);
    }, 1000);
  };

  return (
    <div>
      <ClientHeader
        title="Messages & Assistance"
        subtitle="Ligne d'échange directe avec votre conseiller de parcours dédié"
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Chat thread: 8 cols */}
          <div className="md:col-span-8">
            <Card className="h-[600px] flex flex-col justify-between">
              <CardHeader className="py-3 px-6 border-b border-[#F1F5F9] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm text-[#102A43]">
                    Discussion continue avec Grace Fotso
                  </CardTitle>
                  <p className="text-[11px] text-[#64748B]">Coordinatrice de parcours Douala</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  En ligne (Démo)
                </span>
              </CardHeader>

              {/* Message thread body */}
              <CardContent className="p-6 overflow-y-auto space-y-4 flex-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.isClient ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                        m.isClient
                          ? "bg-[#102A43] text-white rounded-br-xs"
                          : "bg-slate-100 text-[#172B4D] rounded-bl-xs border border-slate-200"
                      }`}
                    >
                      <p className="font-bold mb-1 opacity-90">{m.sender}</p>
                      <p>{m.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {m.time}
                    </span>
                  </div>
                ))}
              </CardContent>

              {/* Message input */}
              <form
                onSubmit={handleSend}
                className="p-3 border-t border-[#F1F5F9] flex items-center gap-2"
              >
                <Input
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Écrivez votre message à votre conseiller..."
                  className="text-xs"
                />
                <Button type="submit" variant="gold" size="sm" className="font-bold px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </Card>
          </div>

          {/* Quick contact info: 4 cols */}
          <div className="md:col-span-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-[#102A43]">
                  Urgences & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-[#64748B]">
                <p>
                  Pour toute urgence ou question liée au départ immédiat, joignez directement l'agence par téléphone ou WhatsApp.
                </p>
                <a
                  href={BRAND_CONFIG.contacts.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#128C7E] text-white font-bold hover:bg-[#0c6b5e] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  WhatsApp Direct (+237 6 70 00 00 00)
                </a>
                <a
                  href="tel:+237670000000"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-100 text-[#102A43] font-bold hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C8A45D]" />
                  Appeler le standard
                </a>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-[#102A43]">Heures de permanence :</p>
              <p>Du lundi au vendredi : 8h00 - 18h00</p>
              <p>Samedi : 9h00 - 13h00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
