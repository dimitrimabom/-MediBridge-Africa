import { FAQItem } from "@/types";

export const MOCK_FAQ: FAQItem[] = [
  {
    id: "faq-1",
    question: "Quel est exactement le rôle de MediBridge Africa ?",
    answer:
      "MediBridge Africa est une agence d'assistance administrative et de facilitation logistique. Nous accompagnons les patients et familles du Cameroun et d'Afrique francophone dans l'organisation méthodologique de leur séjour médical en Inde : centralisation du dossier, mise en relation avec les bureaux internationaux des centres hospitaliers, aide à l'obtention de la lettre d'invitation médicale, assistance au visa consulaire, organisation des vols, de l'hébergement et des transferts sur place.",
    category: "Fonctionnement général",
  },
  {
    id: "faq-2",
    question: "MediBridge Africa garantit-elle la guérison ou le résultat médical ?",
    answer:
      "Absolument pas. MediBridge Africa n'est pas un établissement médical et ne pratique aucun acte de télémédecine ni aucun soin. Les avis thérapeutiques, diagnostics, prescriptions et résultats chirurgicaux relèvent exclusivement de la responsabilité déontologique des praticiens hospitaliers habilités en Inde. Nous déclinons expressément toute promesse de guérison.",
    category: "Garanties & Limites",
  },
  {
    id: "faq-3",
    question: "Garantissez-vous l'obtention du visa médical pour l'Inde ?",
    answer:
      "Non. La délivrance du visa (e-Medical Visa ou visa consulaire) relève de la compétence souveraine exclusive des autorités de la République d'Inde. Notre rôle consiste à vérifier la parfaite conformité de vos pièces justificatives, à valider l'invitation hospitalière officielle et à éviter les erreurs de saisie qui motivent généralement les rejets administratifs.",
    category: "Visa & Voyage",
  },
  {
    id: "faq-4",
    question: "Quels sont les délais moyens pour préparer un départ ?",
    answer:
      "En moyenne, un dossier complet requiert entre 10 et 21 jours ouvrés pour être instruit, validé par l'hôpital et obtenir l'accord de visa. Toutefois, ces délais sont strictement indicatifs et peuvent varier selon la réactivité des services hospitaliers indiens, les périodes d'affluence consulaire et la promptitude de la famille à fournir les pièces demandées. Pour les situations requérant un traitement accéléré, la formule Premium ou VIP permet un traitement prioritaire.",
    category: "Fonctionnement général",
  },
  {
    id: "faq-5",
    question: "Quelles pièces administratives faut-il préparer ?",
    answer:
      "Les pièces de base requises comprennent : la copie du passeport valide (au moins 6 mois après la date de retour prévue), les comptes rendus médicaux récents traduits ou à faire traduire, une photo d'identité au format consulaire indien (fond blanc, 5x5 cm), les justificatifs financiers ou de prise en charge, et les coordonnées complètes du patient et de ses éventuels accompagnateurs.",
    category: "Documents & Démarches",
  },
  {
    id: "faq-6",
    question: "Les frais d'hospitalisation sont-ils compris dans vos forfaits ?",
    answer:
      "Non. Nos forfaits d'accompagnement (Starter, Premium, VIP) couvrent exclusivement nos honoraires de gestion administrative, d'encadrement logistique et de conciergerie. L'ensemble des prestations médicales, frais de bloc opératoire, examens radiologiques et médicaments sont facturés directement par le centre hospitalier indien, selon le devis établi après consultation sur place.",
    category: "Frais & Paiements",
  },
  {
    id: "faq-7",
    question: "Quels sont les modes de règlement acceptés ?",
    answer:
      "Dans cette version de démonstration de la plateforme, les règlements sont simulés. Dans nos processus réels d'agence au Cameroun, nous acceptons les virements bancaires locaux, les chèques de banque certifiés, ainsi que les solutions de paiement mobile (Orange Money, MTN Mobile Money) avec délivrance immédiate d'une quittance officielle numérotée.",
    category: "Frais & Paiements",
  },
  {
    id: "faq-8",
    question: "Comment se déroule l'accueil à l'arrivée en Inde ?",
    answer:
      "Pour les souscripteurs des formules Premium et VIP, un chauffeur privé vous attend à la sortie de l'aéroport avec une pancarte à votre nom. Vous êtes ensuite conduit directement à votre résidence ou hôtel préalablement réservé. Une carte SIM locale activée vous est fournie pour vous permettre de communiquer sans surcoût d'itinérance.",
    category: "Visa & Voyage",
  },
  {
    id: "faq-9",
    question: "Que se passe-t-il en cas d'annulation du voyage ?",
    answer:
      "Si vous devez annuler votre voyage avant le dépôt consulaire du visa, nos frais de dossier sont remboursables déduction faite des frais administratifs déjà engagés. Les conditions d'annulation des billets d'avion et des réservations hôtelières dépendent des politiques respectives de chaque prestataire commercial.",
    category: "Frais & Paiements",
  },
  {
    id: "faq-10",
    question: "Un accompagnateur peut-il voyager avec le patient ?",
    answer:
      "Oui. Les autorités consulaires indiennes autorisent généralement jusqu'à deux accompagnateurs (Medical Attendant Visa - MED X) pour un même patient. Nos formules prennent en compte la constitution des dossiers pour les accompagnateurs.",
    category: "Visa & Voyage",
  },
];
