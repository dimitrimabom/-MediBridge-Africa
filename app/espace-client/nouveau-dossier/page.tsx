"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAppStore } from "@/context/app-store";
import { formatFCFA } from "@/lib/utils";
import {
  User,
  MapPin,
  Stethoscope,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

function NouveauDossierForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFormule = (searchParams.get("formule") as "Starter" | "Premium" | "VIP") || "Premium";

  const { createDossier, currentClient } = useAppStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Wizard state
  const [formData, setFormData] = useState({
    // Step 1: Informations personnelles
    fullName: currentClient?.fullName || "Samuel Eboa",
    gender: "Homme",
    birthDate: "1982-05-14",
    profession: "Cadre d'entreprise",

    // Step 2: Résidence & coordonnées
    country: "Cameroun",
    city: currentClient?.city || "Douala",
    phone: currentClient?.phone || "+237 6 77 12 34 56",
    email: currentClient?.email || "samuel.eboa@example.cm",
    address: "Akwa, Douala",

    // Step 3: Objet d'accompagnement
    requestType: "Intervention Orthopédique & Remplacement Articulaire",
    targetSpecialty: "Orthopédie & Traumatologie",
    preferredCity: "New Delhi",
    packageType: initialFormule,

    // Step 4: Informations administratives
    hasValidPassport: "yes",
    passportExpiry: "2027-10-20",
    companionsCount: "1 accompagnateur",
    urgent: false,
    notes: "Souhaite un départ si possible dans les 30 prochains jours.",

    // Step 5: Consentements
    consentAdministrative: false,
    consentNoMedicalGuarantee: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreated, setIsCreated] = useState(false);
  const [createdDossierRef, setCreatedDossierRef] = useState("");
  const [createdDossierId, setCreatedDossierId] = useState("");

  const stepsList = [
    { num: 1, title: "Identité", icon: User },
    { num: 2, title: "Coordonnées", icon: MapPin },
    { num: 3, title: "Demande", icon: Stethoscope },
    { num: 4, title: "Formalités", icon: FileCheck2 },
    { num: 5, title: "Validation", icon: CheckCircle2 },
  ];

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = "Le nom complet est obligatoire.";
      if (!formData.birthDate) errs.birthDate = "La date de naissance est obligatoire.";
    }

    if (step === 2) {
      if (!formData.phone.trim()) errs.phone = "Le numéro de téléphone est obligatoire.";
      if (!formData.email.trim() || !formData.email.includes("@")) {
        errs.email = "Une adresse e-mail valide est obligatoire.";
      }
      if (!formData.city.trim()) errs.city = "La ville de résidence est obligatoire.";
    }

    if (step === 3) {
      if (!formData.requestType.trim()) errs.requestType = "Veuillez préciser le motif général.";
    }

    if (step === 4) {
      if (formData.hasValidPassport === "no") {
        errs.passport = "Un passeport valide au moins 6 mois est indispensable pour les démarches en Inde.";
      }
    }

    if (step === 5) {
      if (!formData.consentAdministrative) {
        errs.consentAdministrative = "Vous devez consentir au traitement administratif de vos informations.";
      }
      if (!formData.consentNoMedicalGuarantee) {
        errs.consentNoMedicalGuarantee =
          "Vous devez reconnaître que MediBridge Africa est une agence logistique et non un dispensateur de soins médicaux.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(5)) return;

    const newDossier = createDossier({
      clientName: formData.fullName,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      clientCountry: formData.country,
      clientCity: formData.city,
      requestType: formData.requestType,
      targetSpecialty: formData.targetSpecialty,
      preferredCity: formData.preferredCity,
      packageType: formData.packageType,
      urgent: formData.urgent,
    });

    setCreatedDossierRef(newDossier.reference);
    setCreatedDossierId(newDossier.id);
    setIsCreated(true);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Progress Stepper Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
            Étape {currentStep} sur {totalSteps} : {stepsList[currentStep - 1].title}
          </span>
          <span className="text-xs font-bold text-[#C8A45D]">
            {Math.round((currentStep / totalSteps) * 100)}% complété
          </span>
        </div>

        {/* Stepper bubbles */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {stepsList.map((st) => {
            const isPast = st.num < currentStep;
            const isCur = st.num === currentStep;

            return (
              <div key={st.num} className="flex flex-col items-center text-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                    isPast
                      ? "bg-emerald-600 text-white"
                      : isCur
                      ? "bg-[#102A43] text-[#C8A45D] ring-2 ring-[#C8A45D] shadow-xs"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isPast ? <CheckCircle2 className="w-5 h-5" /> : st.num}
                </div>
                <span className="hidden sm:inline-block text-[11px] font-semibold text-[#172B4D] mt-1.5 truncate max-w-full">
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Screen */}
      {isCreated ? (
        <Card className="border-2 border-emerald-500 shadow-xl bg-white text-center p-8 sm:p-12 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Dossier Initialisé avec Succès
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Référence : {createdDossierRef}
            </h2>
            <p className="text-sm text-[#64748B] max-w-lg mx-auto leading-relaxed">
              Votre dossier d'accompagnement pour <strong>{formData.requestType}</strong> ({formData.packageType}) a été enregistré. Un conseiller dédié va vérifier la recevabilité de votre demande.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs text-left space-y-2 text-[#172B4D]">
            <p>
              <strong>Patient :</strong> {formData.fullName} ({formData.city}, {formData.country})
            </p>
            <p>
              <strong>Destination envisagée :</strong> {formData.preferredCity} (Inde)
            </p>
            <p>
              <strong>Statut actuel :</strong> Demande reçue en attente de vérification
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="gold" size="lg" className="font-bold">
              <a href={`/espace-client/dossiers/${createdDossierId}`}>
                Consulter mon nouveau dossier
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/espace-client/dossiers">Voir tous mes dossiers</a>
            </Button>
          </div>
        </Card>
      ) : (
        /* Form Card */
        <Card className="shadow-sm">
          <CardHeader className="border-b border-[#F1F5F9] pb-4">
            <CardTitle className="text-lg text-[#102A43]">
              {currentStep === 1 && "Étape 1 : Informations personnelles du demandeur"}
              {currentStep === 2 && "Étape 2 : Pays de résidence et coordonnées de contact"}
              {currentStep === 3 && "Étape 3 : Objet général de la demande d'accompagnement"}
              {currentStep === 4 && "Étape 4 : Informations administratives & Logistique"}
              {currentStep === 5 && "Étape 5 : Récapitulatif, engagements et confirmation"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Nom complet du patient ou demandeur *
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ex: Samuel Eboa"
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Genre
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
                    >
                      <option>Homme</option>
                      <option>Femme</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Date de naissance *
                    </label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    />
                    {errors.birthDate && <p className="text-xs text-red-600 mt-1">{errors.birthDate}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Profession / Activité
                  </label>
                  <Input
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="Ex: Cadre, Commerçant, Retraité..."
                  />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Pays de résidence *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
                    >
                      <option>Cameroun</option>
                      <option>Gabon</option>
                      <option>Congo</option>
                      <option>Tchad</option>
                      <option>Côte d'Ivoire</option>
                      <option>Autre pays d'Afrique francophone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Ville de résidence *
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex: Douala, Yaoundé, Bafoussam..."
                    />
                    {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Numéro de téléphone joignable (WhatsApp) *
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+237 6 70 00 00 00"
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Adresse e-mail de contact *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="exemple@email.cm"
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Adresse géographique / Quartier
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Ex: Akwa, Bastos, Bonapriso..."
                  />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Objet général de l'accompagnement médical *
                  </label>
                  <Input
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    placeholder="Ex: Chirurgie orthopédique du genou, Bilan cardiologique..."
                  />
                  {errors.requestType && <p className="text-xs text-red-600 mt-1">{errors.requestType}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Spécialité médicale concernée
                    </label>
                    <select
                      value={formData.targetSpecialty}
                      onChange={(e) => setFormData({ ...formData, targetSpecialty: e.target.value })}
                      className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
                    >
                      <option>Orthopédie & Traumatologie</option>
                      <option>Cardiologie & Chirurgie Cardiaque</option>
                      <option>Oncologie & Cancérologie</option>
                      <option>Neurochirurgie & Rachis</option>
                      <option>Ophtalmologie de pointe</option>
                      <option>Néphrologie & Urologie</option>
                      <option>Chirurgie Métabolique & Bariatrique</option>
                      <option>Autre spécialité</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Ville indienne de préférence
                    </label>
                    <select
                      value={formData.preferredCity}
                      onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                      className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
                    >
                      <option>New Delhi (Pôle Nord)</option>
                      <option>Chennai (Capitale de la santé)</option>
                      <option>Mumbai (Côte Ouest)</option>
                      <option>Bangalore (Haute technologie)</option>
                      <option>Hyderabad</option>
                      <option>Selon recommandation de l'équipe</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-2">
                    Formule d'accompagnement souhaitée *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(["Starter", "Premium", "VIP"] as const).map((pkg) => {
                      const isSel = formData.packageType === pkg;
                      const prices = { Starter: "250 000 FCFA", Premium: "650 000 FCFA", VIP: "1 450 000 FCFA" };
                      return (
                        <div
                          key={pkg}
                          onClick={() => setFormData({ ...formData, packageType: pkg })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSel
                              ? "border-[#C8A45D] bg-[#FAF6ED] ring-2 ring-[#C8A45D]/30"
                              : "border-[#E2E8F0] bg-white hover:border-slate-300"
                          }`}
                        >
                          <span className="text-xs font-black text-[#102A43] block">
                            Formule {pkg}
                          </span>
                          <span className="text-sm font-extrabold text-[#173F5F] block mt-1">
                            {prices[pkg]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Disposez-vous d'un passeport valide au moins 6 mois ? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-[#172B4D] cursor-pointer">
                      <input
                        type="radio"
                        name="passport"
                        value="yes"
                        checked={formData.hasValidPassport === "yes"}
                        onChange={() => setFormData({ ...formData, hasValidPassport: "yes" })}
                      />
                      <span>Oui, passeport en cours de validité</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#172B4D] cursor-pointer">
                      <input
                        type="radio"
                        name="passport"
                        value="no"
                        checked={formData.hasValidPassport === "no"}
                        onChange={() => setFormData({ ...formData, hasValidPassport: "no" })}
                      />
                      <span>Non / En cours de renouvellement</span>
                    </label>
                  </div>
                  {errors.passport && <p className="text-xs text-red-600 mt-1">{errors.passport}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                      Nombre d'accompagnateurs envisagés
                    </label>
                    <select
                      value={formData.companionsCount}
                      onChange={(e) => setFormData({ ...formData, companionsCount: e.target.value })}
                      className="w-full h-10 px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-md text-[#172B4D]"
                    >
                      <option>Aucun (Patient voyageant seul)</option>
                      <option>1 accompagnateur (Recommandé)</option>
                      <option>2 accompagnateurs</option>
                      <option>Plus de 2 accompagnateurs</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id="urgent-check"
                        checked={formData.urgent}
                        onCheckedChange={(checked) => setFormData({ ...formData, urgent: !!checked })}
                      />
                      <label htmlFor="urgent-check" className="text-xs font-bold text-[#102A43] cursor-pointer select-none">
                        Traitement prioritaire demandé (Sous 48h)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1.5">
                    Précisions logistiques / Remarques pour votre conseiller
                  </label>
                  <Textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ex: préférence de dates, contraintes de mobilité, etc."
                  />
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                {/* Summary recap table */}
                <div className="p-5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-3 text-xs">
                  <h4 className="font-bold text-[#102A43] text-sm border-b border-slate-200 pb-2">
                    Récapitulatif de votre demande d'accompagnement
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#172B4D]">
                    <p><strong>Patient :</strong> {formData.fullName}</p>
                    <p><strong>Ville / Pays :</strong> {formData.city}, {formData.country}</p>
                    <p><strong>Téléphone :</strong> {formData.phone}</p>
                    <p><strong>Email :</strong> {formData.email}</p>
                    <p><strong>Spécialité :</strong> {formData.targetSpecialty}</p>
                    <p><strong>Ville Inde :</strong> {formData.preferredCity}</p>
                    <p><strong>Formule retenue :</strong> {formData.packageType}</p>
                    <p><strong>Accompagnateur(s) :</strong> {formData.companionsCount}</p>
                  </div>
                </div>

                {/* Consents */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="consent-admin"
                      checked={formData.consentAdministrative}
                      onCheckedChange={(c) =>
                        setFormData({ ...formData, consentAdministrative: !!c })
                      }
                    />
                    <label htmlFor="consent-admin" className="text-xs text-[#172B4D] leading-snug cursor-pointer select-none">
                      J'autorise MediBridge Africa à traiter administrativement mes pièces d'identité et de contact pour la constitution du dossier. *
                    </label>
                  </div>
                  {errors.consentAdministrative && (
                    <p className="text-xs text-red-600 pl-6">{errors.consentAdministrative}</p>
                  )}

                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="consent-med"
                      checked={formData.consentNoMedicalGuarantee}
                      onCheckedChange={(c) =>
                        setFormData({ ...formData, consentNoMedicalGuarantee: !!c })
                      }
                    />
                    <label htmlFor="consent-med" className="text-xs text-[#172B4D] leading-snug cursor-pointer select-none">
                      Je reconnais expressément que MediBridge Africa est une agence logistique et administrative, et ne délivre aucun diagnostic médical, promesse de guérison ni garantie consulaire de visa. *
                    </label>
                  </div>
                  {errors.consentNoMedicalGuarantee && (
                    <p className="text-xs text-red-600 pl-6">{errors.consentNoMedicalGuarantee}</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-[#F1F5F9] p-4 sm:p-6 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePrev} size="sm" className="gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                Étape précédente
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button variant="gold" onClick={handleNext} size="sm" className="font-bold gap-1.5">
                Continuer
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="gold" onClick={handleSubmit} size="sm" className="font-bold gap-1.5 px-6">
                Confirmer et ouvrir mon dossier
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default function NouveauDossierPage() {
  return (
    <div>
      <ClientHeader
        title="Ouvrir un Nouveau Dossier"
        subtitle="Formulaire guidé en 5 étapes pour préparer votre accompagnement vers l'Inde"
      />
      <Suspense fallback={<div className="p-12 text-center text-xs text-[#64748B]">Chargement du formulaire...</div>}>
        <NouveauDossierForm />
      </Suspense>
    </div>
  );
}
