import { PackageItem } from "@/types";

export const MOCK_PACKAGES: PackageItem[] = [
  {
    id: "pkg-starter",
    name: "Starter",
    badge: "Essentiel",
    tagline: "Dossier médical et obtention du visa.",
    priceFCFA: 250000,
    popular: false,
    targetAudience: "Patients autonomes souhaitant une préparation administrative rigoureuse pour l'Inde.",
    inclusions: [
      "Dossier médical traduit en anglais",
      "Lettre d'invitation d'hôpital officiel",
      "Assistance visa e-Medical (patient + accompagnateur)",
    ],
    exclusions: [
       "Frais d'hospitalisation et soins médicaux",
       "Droits officiels de visa consulaire",
       "Billets d'avion et hébergement",
       "Accueil à l'aéroport en Inde",
    ],
    serviceLimits:
       "Couvre l'encadrement administratif et le visa. La logistique sur place reste gérée par le voyageur.",
  },
  {
    id: "pkg-premium",
    name: "Premium",
    badge: "Recommandée",
    tagline: "Dossier, visa et accueil aéroport avec chauffeur.",
    priceFCFA: 650000,
    popular: true,
    targetAudience: "Premier voyage médical en Inde, pour un séjour serein et encadré de bout en bout.",
    inclusions: [
      "Toutes les options du pack Starter",
      "Accueil à l'aéroport avec chauffeur privé",
      "Carte SIM locale et assistance 7j/7",
    ],
    exclusions: [
       "Frais hospitaliers réels et soins médicaux",
       "Droits officiels de visa et billets d'avion",
       "Loyer du logement en Inde",
    ],
    serviceLimits:
       "Comprend l'accueil et le suivi francophone 7j/7 à distance. N'inclut pas de présence médicale.",
  },
  {
    id: "pkg-vip",
    name: "VIP",
    badge: "Sur-mesure",
    tagline: "Prise en charge complète & coordinateur 24h/24.",
    priceFCFA: 1450000,
    popular: false,
    targetAudience: "Patients et familles exigeant une assistance continue et un confort optimal.",
    inclusions: [
      "Toutes les options du pack Premium",
      "Véhicule avec chauffeur au quotidien",
      "Coordinateur personnel dédié 24h/24",
    ],
    exclusions: [
       "Actes chirurgicaux et factures hospitalières directes",
       "Billets d'avion internationaux",
    ],
    serviceLimits:
       "Dédié à la conciergerie logistique. Aucun acte médical ne relève de notre agence.",
  },
];

