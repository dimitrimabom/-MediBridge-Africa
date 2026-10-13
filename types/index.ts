export type DossierStatus =
  | "demande_recue"
  | "paiement_attente"
  | "documents_a_completer"
  | "examen_administratif"
  | "coordination_en_cours"
  | "proposition_a_examiner"
  | "preparation_voyage"
  | "suivi_en_cours"
  | "cloture"
  | "annule";

export interface StatusMeta {
  label: string;
  variant: "default" | "secondary" | "gold" | "goldSolid" | "outline" | "success" | "warning" | "info" | "destructive";
  description: string;
}

export const DOSSIER_STATUS_MAP: Record<DossierStatus, StatusMeta> = {
  demande_recue: {
    label: "Demande reçue",
    variant: "info",
    description: "Votre dossier a été enregistré et est en attente de premier contact par l'équipe.",
  },
  paiement_attente: {
    label: "Paiement en attente",
    variant: "warning",
    description: "Le règlement des frais de dossier d'accompagnement est requis pour engager les démarches.",
  },
  documents_a_completer: {
    label: "Documents à compléter",
    variant: "warning",
    description: "Des pièces administratives complémentaires sont requises pour finaliser votre dossier.",
  },
  examen_administratif: {
    label: "Examen administratif",
    variant: "secondary",
    description: "Vérification de la conformité du dossier par nos conseillers.",
  },
  coordination_en_cours: {
    label: "Coordination en cours",
    variant: "secondary",
    description: "Échanges avec les départements internationaux des hôpitaux indiens partenaires.",
  },
  proposition_a_examiner: {
    label: "Proposition à examiner",
    variant: "gold",
    description: "Une estimation logistique et une orientation hospitalière vous ont été soumises pour validation.",
  },
  preparation_voyage: {
    label: "Préparation du voyage",
    variant: "default",
    description: "Accompagnement pour le visa médical, les billets d'avion et l'accueil en Inde.",
  },
  suivi_en_cours: {
    label: "Suivi en cours",
    variant: "success",
    description: "Patient sur place ou parcours en cours de réalisation avec assistance active.",
  },
  cloture: {
    label: "Clôturé",
    variant: "outline",
    description: "Mission d'accompagnement achevée avec bilan administratif complet.",
  },
  annule: {
    label: "Annulé",
    variant: "destructive",
    description: "Le dossier a été annulé par le demandeur ou suite à une impossibilité administrative.",
  },
};

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  actor?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: "Identité" | "Administratif" | "Voyage" | "Hospitalier" | "Devis & Reçu";
  uploadDate: string;
  status: "valide" | "en_attente" | "a_fournir";
  fileSize: string;
}

export interface InternalNote {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface Dossier {
  id: string;
  reference: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  clientCity: string;
  requestType: string;
  targetSpecialty: string;
  preferredCity?: string;
  packageType: "Starter" | "Premium" | "VIP";
  status: DossierStatus;
  currentStage: string;
  createdAt: string;
  updatedAt: string;
  assignedAgent: string;
  notes: InternalNote[];
  events: TimelineEvent[];
  documents: DocumentItem[];
  estimatedCostFCFA: number;
  urgent: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "Dossier & Orientation" | "Assistance Consulaire" | "Logistique & Voyage" | "Assistance sur place";
  iconName: string;
  includedItems: string[];
  limitations: string[];
  indicativePriceFCFA: number;
  isAvailable: boolean;
  order: number;
}

export interface PackageItem {
  id: string;
  name: "Starter" | "Premium" | "VIP";
  badge?: string;
  tagline: string;
  priceFCFA: number;
  popular?: boolean;
  targetAudience: string;
  inclusions: string[];
  exclusions: string[];
  serviceLimits: string;
}

export interface ClientUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  registeredAt: string;
  activeDossiersCount: number;
  totalDossiersCount: number;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  dossierId: string;
  dossierReference: string;
  date: string;
  label: string;
  amountFCFA: number;
  paymentMethod: "Orange Money" | "MTN Mobile Money" | "Virement Bancaire" | "Carte Bancaire";
  status: "paye" | "en_attente" | "annule";
  receiptNumber: string;
  isDemo: true;
}

export interface AppointmentRecord {
  id: string;
  dossierReference: string;
  title: string;
  date: string;
  time: string;
  type: "Entretien visio d'orientation" | "Point d'étape téléphonique" | "Revue documentaire consulaire";
  advisorName: string;
  link?: string;
  status: "a_venir" | "termine" | "annule";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Fonctionnement général" | "Documents & Démarches" | "Frais & Paiements" | "Visa & Voyage" | "Garanties & Limites";
}
