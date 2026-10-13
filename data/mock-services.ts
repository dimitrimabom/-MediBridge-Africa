import { ServiceItem } from "@/types";

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    slug: "visa-medical",
    title: "Visa Médical",
    shortDescription: "Invitation officielle d'hôpital et obtention rapide de votre visa e-Medical.",
    fullDescription:
      "Nous coordonnons l'obtention de votre lettre d'invitation hospitalière officielle auprès des centres médicaux indiens accrédités (Delhi, Mumbai, Chennai) et vous accompagnons pas à pas pour la demande de votre visa e-Medical.",
    category: "Assistance Consulaire",
    iconName: "FileCheck2",
    order: 1,
    indicativePriceFCFA: 250000,
    isAvailable: true,
    includedItems: [
      "Lettre d'invitation médicale officielle",
      "Assistance formulaire e-Medical Visa",
      "Contrôle de conformité des pièces consulaires",
      "Assistance pour 1 patient et 1 accompagnateur",
    ],
    limitations: [
      "L'octroi du visa relève de la souveraineté consulaire indienne",
      "Les droits de visa officiels sont réglés au consulat",
    ],
  },
  {
    id: "serv-2",
    slug: "accueil-aeroport",
    title: "Accueil Aéroport",
    shortDescription: "Accueil personnalisé à la descente d'avion et chauffeur privé vers votre logement.",
    fullDescription:
      "Dès votre arrivée à l'aéroport en Inde, notre chauffeur vous attend avec une pancarte nominative. Vous êtes conduit en toute sécurité vers votre lieu d'hébergement avec remise d'une carte SIM locale opérationnelle.",
    category: "Logistique & Voyage",
    iconName: "Plane",
    order: 2,
    indicativePriceFCFA: 400000,
    isAvailable: true,
    includedItems: [
      "Accueil nominatif dès la sortie du terminal",
      "Transfert privé direct vers votre logement",
      "Remise immédiate d'une carte SIM indienne locale",
      "Assistance bagages et installation initiale",
    ],
    limitations: [
      "Ne comprend pas l'achat du billet d'avion international",
      "Le tarif couvre le patient et ses accompagnateurs directs",
    ],
  },
  {
    id: "serv-3",
    slug: "transport-sejour",
    title: "Transport & Séjour",
    shortDescription: "Réservation des vols, hébergement sécurisé et navettes vers la clinique.",
    fullDescription:
      "Nous sélectionnons pour vous les meilleurs vols et des appart-hôtels confortables proches de votre hôpital de référence. Un véhicule privé est mis à disposition pour vos trajets quotidiens consultations et examens.",
    category: "Logistique & Voyage",
    iconName: "Building2",
    order: 3,
    indicativePriceFCFA: 650000,
    isAvailable: true,
    includedItems: [
      "Sélection des meilleurs vols adaptés à vos rendez-vous",
      "Appart-hôtel meublé et vérifié proche de l'hôpital",
      "Navettes privées quotidiennes hébergement ↔ hôpital",
      "Ligne d'assistance francophone locale disponible 7j/7",
    ],
    limitations: [
      "Les frais réels de billets d'avion et de loyer restent à la charge du client",
      "Notre agence n'exécute aucun acte ni traitement médical",
    ],
  },
];

