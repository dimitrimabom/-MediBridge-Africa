"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { EmptyState } from "@/components/common/EmptyState";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MOCK_FAQ } from "@/data/mock-faq";
import { HelpCircle, MessageSquare, PhoneCall } from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Toutes les questions" },
    { id: "Fonctionnement général", label: "Fonctionnement général" },
    { id: "Documents & Démarches", label: "Documents & Démarches" },
    { id: "Frais & Paiements", label: "Frais & Paiements" },
    { id: "Visa & Voyage", label: "Visa & Voyage" },
    { id: "Garanties & Limites", label: "Garanties & Limites" },
  ];

  const filteredFaq = MOCK_FAQ.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageHeader
        badge="Foire Aux Questions"
        title="Questions Fréquemment Posées"
        description="Retrouvez ici toutes les réponses à vos interrogations sur la préparation de votre dossier, les démarches de visa, la logistique et nos engagements légaux."
      />

      <section className="py-12 sm:py-16">
        <Container size="sm">
          {/* Filter & Search Bar */}
          <div className="space-y-6 mb-12">
            <SearchInput
              value={searchQuery}
              onChangeValue={setSearchQuery}
              placeholder="Rechercher une question (ex: visa, délais, frais, accompagnateur)..."
              className="w-full max-w-full"
            />

            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#102A43] text-white shadow-xs"
                      : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Questions */}
          {filteredFaq.length > 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaq.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-base font-bold text-[#102A43]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#172B4D] leading-relaxed pt-2">
                      {item.answer}
                      <div className="mt-3">
                        <span className="inline-block text-[11px] font-semibold text-[#173F5F] bg-slate-100 px-2 py-0.5 rounded">
                          Thématique : {item.category}
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <EmptyState
              title="Aucune réponse trouvée"
              description={`Aucune question ne correspond à "${searchQuery}". Essayez avec un autre mot-clé.`}
              actionLabel="Afficher toutes les questions"
              onAction={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            />
          )}

          {/* Bottom Help Box */}
          <div className="mt-16 p-8 rounded-xl bg-[#FAF6ED] border border-[#C8A45D]/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#102A43] text-[#C8A45D] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#102A43]">
              Votre question n'est pas répertoriée ?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              Nos conseillers sont disponibles par téléphone et par WhatsApp pour vous apporter une réponse personnalisée.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild variant="gold" size="sm" className="font-bold">
                <Link href="/contact">Nous envoyer un message</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
