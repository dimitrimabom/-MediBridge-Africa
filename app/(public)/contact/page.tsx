"use client";

import React, { useState } from "react";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BRAND_CONFIG } from "@/config/brand";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCountryCode: "+237",
    phoneNumber: "",
    country: "Cameroun",
    subject: "Demande d'information générale",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Le nom complet est obligatoire.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Une adresse e-mail valide est obligatoire.";
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8) {
      errs.phoneNumber = "Un numéro de téléphone valide est obligatoire.";
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      errs.message = "Veuillez préciser votre message (minimum 15 caractères).";
    }
    if (!formData.consent) {
      errs.consent = "Vous devez consentir au traitement administratif de vos données de contact.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate frontend submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div>
      <PageHeader
        badge="Équipe à votre écoute"
        title="Contactez Notre Équipe au Cameroun"
        description="Nos conseillers vous reçoivent sur rendez-vous à Douala et Yaoundé ou vous répondent par téléphone, WhatsApp et formulaire."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 cols: Offices & Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-[#102A43] mb-3">
                  Nos bureaux au Cameroun
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Venez échanger directement avec un coordinateur de parcours dans l'un de nos centres d'accueil.
                </p>
              </div>

              {/* Office cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#102A43]">
                    <MapPin className="w-5 h-5 text-[#C8A45D]" />
                    <span>Agence de Douala (Littoral)</span>
                  </div>
                  <p className="text-xs text-[#64748B] pl-7">
                    Boulevard de la Liberté, Immeuble Horizon, Akwa, Douala
                  </p>
                  <p className="text-xs text-[#173F5F] font-semibold pl-7">
                    Tél : +237 6 70 00 00 00
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#102A43]">
                    <MapPin className="w-5 h-5 text-[#C8A45D]" />
                    <span>Antenne de Yaoundé (Centre)</span>
                  </div>
                  <p className="text-xs text-[#64748B] pl-7">
                    Avenue Rosa Parks, Face Ambassades, Bastos, Yaoundé
                  </p>
                  <p className="text-xs text-[#173F5F] font-semibold pl-7">
                    Tél : +237 6 90 00 00 00
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs text-[#172B4D] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#102A43]">
                  <Clock className="w-4 h-4 text-[#C8A45D]" />
                  <span>Horaires d'accueil physique & téléphonique</span>
                </div>
                <p className="text-slate-600">
                  {BRAND_CONFIG.contacts.hours}
                </p>
              </div>

              {/* WhatsApp direct box */}
              <div className="p-6 rounded-xl bg-[#128C7E]/10 border border-[#128C7E]/30 space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#128C7E]">
                  <MessageCircle className="w-5 h-5" />
                  <span>Assistance WhatsApp Immédiate</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Vous avez une question urgente concernant les démarches de visa ou les pièces à préparer ?
                </p>
                <a
                  href={BRAND_CONFIG.contacts.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#128C7E] hover:bg-[#0c6b5e] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Démarrer la discussion WhatsApp (+237 6 70 00 00 00)
                </a>
                <p className="text-[10px] text-slate-500 text-center italic">
                  Note : Ce lien ouvre l'application WhatsApp. Aucun envoi automatisé n'est simulé sans votre action.
                </p>
              </div>
            </div>

            {/* Right 7 cols: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E2E8F0] shadow-sm">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-[#102A43]">
                      Message transmis avec succès !
                    </h3>
                    <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                      Merci <strong>{formData.fullName}</strong>. Votre message a bien été enregistré dans le cadre de cette démonstration frontend. Un conseiller vous répondrait sous 24h ouvrées.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: "",
                            email: "",
                            phoneCountryCode: "+237",
                            phoneNumber: "",
                            country: "Cameroun",
                            subject: "Demande d'information générale",
                            message: "",
                            consent: false,
                          });
                        }}
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#102A43]">
                        Envoyez-nous un message
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1">
                        Tous les champs marqués d'un astérisque (*) sont obligatoires.
                      </p>
                    </div>

                    {/* Nom complet */}
                    <div>
                      <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                        Nom complet *
                      </label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Ex: Samuel Eboa"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                          Adresse e-mail *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="exemple@email.cm"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                          Téléphone *
                        </label>
                        <div className="flex gap-2">
                          <span className="inline-flex items-center px-3 rounded-md border border-[#E2E8F0] bg-slate-50 text-xs font-semibold text-slate-700 shrink-0">
                            +237
                          </span>
                          <Input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                            placeholder="6 70 00 00 00"
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-xs text-red-600 mt-1 font-medium">{errors.phoneNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Pays & Sujet */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                          Pays de résidence *
                        </label>
                        <Input
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                          Objet de votre demande *
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D] focus:border-[#173F5F] focus:outline-none"
                        >
                          <option>Demande d'information générale</option>
                          <option>Orientation hospitalière en Inde</option>
                          <option>Question sur les démarches de visa</option>
                          <option>Demande de devis pour une formule</option>
                          <option>Prise de rendez-vous en agence</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                        Votre message / Précisions *
                      </label>
                      <Textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Précisez la nature de votre projet d'accompagnement (dates envisagées, destination de préférence, nombre de personnes...)"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1 font-medium">{errors.message}</p>
                      )}
                    </div>

                    {/* Consent checkbox */}
                    <div className="space-y-1">
                      <div className="flex items-start gap-2.5">
                        <Checkbox
                          id="consent-check"
                          checked={formData.consent}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, consent: !!checked })
                          }
                        />
                        <label
                          htmlFor="consent-check"
                          className="text-xs text-[#64748B] leading-snug cursor-pointer select-none"
                        >
                          J'accepte que mes coordonnées soient utilisées par {BRAND_CONFIG.name} pour me recontacter dans le cadre exclusif de mon projet d'accompagnement. *
                        </label>
                      </div>
                      {errors.consent && (
                        <p className="text-xs text-red-600 font-medium">{errors.consent}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full font-bold h-12 text-sm shadow-xs"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          Envoyer ma demande d'information
                        </span>
                      )}
                    </Button>

                    <p className="text-[11px] text-[#64748B] text-center italic">
                      Démonstration frontend : les messages sont validés localement sans sauvegarde sur un serveur tiers.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
