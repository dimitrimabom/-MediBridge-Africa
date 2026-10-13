"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Dossier,
  DossierStatus,
  ServiceItem,
  PackageItem,
  ClientUser,
  PaymentRecord,
  AppointmentRecord,
  InternalNote,
  TimelineEvent,
  DOSSIER_STATUS_MAP,
} from "@/types";
import { INITIAL_DOSSIERS } from "@/data/mock-dossiers";
import { MOCK_SERVICES } from "@/data/mock-services";
import { MOCK_PACKAGES } from "@/data/mock-packages";
import { MOCK_CLIENTS } from "@/data/mock-clients";
import { MOCK_PAYMENTS, MOCK_APPOINTMENTS } from "@/data/mock-payments";
import { getStorageItem, setStorageItem } from "@/lib/storage";

interface AppContextType {
  dossiers: Dossier[];
  services: ServiceItem[];
  packages: PackageItem[];
  clients: ClientUser[];
  payments: PaymentRecord[];
  appointments: AppointmentRecord[];
  currentClient: ClientUser;
  // Actions
  updateDossierStatus: (id: string, newStatus: DossierStatus, noteContent?: string) => void;
  assignDossierAgent: (id: string, agentName: string) => void;
  addDossierNote: (id: string, content: string, author?: string) => void;
  createDossier: (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientCountry: string;
    clientCity: string;
    requestType: string;
    targetSpecialty: string;
    preferredCity?: string;
    packageType: "Starter" | "Premium" | "VIP";
    urgent?: boolean;
  }) => Dossier;
  updateService: (updated: ServiceItem) => void;
  toggleServiceAvailability: (id: string) => void;
  updatePackage: (updated: PackageItem) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DOSSIERS: "mba_demo_dossiers_v1",
  SERVICES: "mba_demo_services_v2",
  PACKAGES: "mba_demo_packages_v2",
  CLIENTS: "mba_demo_clients_v1",
  PAYMENTS: "mba_demo_payments_v1",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [dossiers, setDossiers] = useState<Dossier[]>(INITIAL_DOSSIERS);
  const [services, setServices] = useState<ServiceItem[]>(MOCK_SERVICES);
  const [packages, setPackages] = useState<PackageItem[]>(MOCK_PACKAGES);
  const [clients, setClients] = useState<ClientUser[]>(MOCK_CLIENTS);
  const [payments, setPayments] = useState<PaymentRecord[]>(MOCK_PAYMENTS);
  const [appointments] = useState<AppointmentRecord[]>(MOCK_APPOINTMENTS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage on client
  useEffect(() => {
    const storedDossiers = getStorageItem<Dossier[]>(STORAGE_KEYS.DOSSIERS, INITIAL_DOSSIERS);
    const storedServices = getStorageItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, MOCK_SERVICES);
    const storedPackages = getStorageItem<PackageItem[]>(STORAGE_KEYS.PACKAGES, MOCK_PACKAGES);
    const storedClients = getStorageItem<ClientUser[]>(STORAGE_KEYS.CLIENTS, MOCK_CLIENTS);
    const storedPayments = getStorageItem<PaymentRecord[]>(STORAGE_KEYS.PAYMENTS, MOCK_PAYMENTS);

    setDossiers(storedDossiers);
    setServices(storedServices);
    setPackages(storedPackages);
    setClients(storedClients);
    setPayments(storedPayments);
    setIsHydrated(true);
  }, []);

  // Sync back to localStorage
  useEffect(() => {
    if (isHydrated) {
      setStorageItem(STORAGE_KEYS.DOSSIERS, dossiers);
    }
  }, [dossiers, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      setStorageItem(STORAGE_KEYS.SERVICES, services);
    }
  }, [services, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      setStorageItem(STORAGE_KEYS.PACKAGES, packages);
    }
  }, [packages, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
    }
  }, [payments, isHydrated]);

  // Current authenticated demo client (defaulting to Samuel Eboa)
  const currentClient = clients[0] || MOCK_CLIENTS[0];

  const updateDossierStatus = (id: string, newStatus: DossierStatus, noteContent?: string) => {
    setDossiers((prev) =>
      prev.map((dossier) => {
        if (dossier.id !== id) return dossier;

        const statusMeta = DOSSIER_STATUS_MAP[newStatus];
        const newEvent: TimelineEvent = {
          id: `ev-${Date.now()}`,
          title: `Changement de statut : ${statusMeta.label}`,
          description: statusMeta.description,
          date: "À l'instant",
          status: "completed",
          actor: "Équipe MediBridge",
        };

        const updatedNotes = [...dossier.notes];
        if (noteContent && noteContent.trim()) {
          updatedNotes.push({
            id: `not-${Date.now()}`,
            author: "Administrateur (Démo)",
            date: new Date().toISOString(),
            content: noteContent.trim(),
          });
        }

        return {
          ...dossier,
          status: newStatus,
          currentStage: statusMeta.description,
          updatedAt: new Date().toISOString(),
          events: [newEvent, ...dossier.events],
          notes: updatedNotes,
        };
      })
    );
  };

  const assignDossierAgent = (id: string, agentName: string) => {
    setDossiers((prev) =>
      prev.map((dossier) => {
        if (dossier.id !== id) return dossier;
        return {
          ...dossier,
          assignedAgent: agentName,
          updatedAt: new Date().toISOString(),
          notes: [
            ...dossier.notes,
            {
              id: `not-${Date.now()}`,
              author: "Système",
              date: new Date().toISOString(),
              content: `Dossier assigné à ${agentName}.`,
            },
          ],
        };
      })
    );
  };

  const addDossierNote = (id: string, content: string, author: string = "Conseiller MediBridge") => {
    const newNote: InternalNote = {
      id: `not-${Date.now()}`,
      author,
      date: new Date().toISOString(),
      content: content.trim(),
    };

    setDossiers((prev) =>
      prev.map((dossier) => {
        if (dossier.id !== id) return dossier;
        return {
          ...dossier,
          updatedAt: new Date().toISOString(),
          notes: [...dossier.notes, newNote],
        };
      })
    );
  };

  const createDossier = (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientCountry: string;
    clientCity: string;
    requestType: string;
    targetSpecialty: string;
    preferredCity?: string;
    packageType: "Starter" | "Premium" | "VIP";
    urgent?: boolean;
  }): Dossier => {
    const referenceNum = Math.floor(1000 + Math.random() * 9000);
    const newReference = `MBA-${new Date().getFullYear()}-${referenceNum}`;
    const newId = `dos-${Date.now()}`;

    const costMap = {
      Starter: 250000,
      Premium: 650000,
      VIP: 1450000,
    };

    const newDossier: Dossier = {
      id: newId,
      reference: newReference,
      clientId: currentClient.id,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      clientCountry: data.clientCountry || "Cameroun",
      clientCity: data.clientCity || "Douala",
      requestType: data.requestType,
      targetSpecialty: data.targetSpecialty,
      preferredCity: data.preferredCity || "New Delhi",
      packageType: data.packageType,
      status: "demande_recue",
      currentStage: "Demande soumise avec succès - Première analyse de recevabilité en cours.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedAgent: "Grace Fotso (Coordinatrice)",
      urgent: !!data.urgent,
      estimatedCostFCFA: costMap[data.packageType],
      notes: [
        {
          id: `not-${Date.now()}`,
          author: "Système",
          date: new Date().toISOString(),
          content: "Dossier créé via le formulaire en ligne de l'espace client.",
        },
      ],
      events: [
        {
          id: `ev-${Date.now()}`,
          title: "Demande enregistrée sur la plateforme",
          description: "Dossier initialisé. Un conseiller va vérifier les coordonnées et la demande.",
          date: "Aujourd'hui",
          status: "current",
          actor: "Patient / Client",
        },
      ],
      documents: [
        {
          id: `doc-${Date.now()}`,
          name: "Formulaire_Demande_Initiale.pdf",
          category: "Administratif",
          uploadDate: new Date().toLocaleDateString("fr-FR"),
          status: "valide",
          fileSize: "245 Ko",
        },
      ],
    };

    setDossiers((prev) => [newDossier, ...prev]);

    // Also add a demo payment entry in pending
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      reference: `PAY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      dossierId: newId,
      dossierReference: newReference,
      date: new Date().toLocaleDateString("fr-FR"),
      label: `Forfait d'accompagnement logistique ${data.packageType}`,
      amountFCFA: costMap[data.packageType],
      paymentMethod: "Orange Money",
      status: "en_attente",
      receiptNumber: `REC-${newReference}-INIT`,
      isDemo: true,
    };
    setPayments((prev) => [newPayment, ...prev]);

    return newDossier;
  };

  const updateService = (updated: ServiceItem) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const toggleServiceAvailability = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isAvailable: !s.isAvailable } : s))
    );
  };

  const updatePackage = (updated: PackageItem) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const resetDemoData = () => {
    setDossiers(INITIAL_DOSSIERS);
    setServices(MOCK_SERVICES);
    setPackages(MOCK_PACKAGES);
    setClients(MOCK_CLIENTS);
    setPayments(MOCK_PAYMENTS);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.DOSSIERS);
      window.localStorage.removeItem(STORAGE_KEYS.SERVICES);
      window.localStorage.removeItem(STORAGE_KEYS.PACKAGES);
      window.localStorage.removeItem(STORAGE_KEYS.CLIENTS);
      window.localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    }
  };

  return (
    <AppContext.Provider
      value={{
        dossiers,
        services,
        packages,
        clients,
        payments,
        appointments,
        currentClient,
        updateDossierStatus,
        assignDossierAgent,
        addDossierNote,
        createDossier,
        updateService,
        toggleServiceAvailability,
        updatePackage,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
}
