export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { title: "Accueil", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Nos Formules", href: "/formules" },
  { title: "Notre Processus", href: "/processus" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

export const CLIENT_NAV_ITEMS = [
  { title: "Tableau de bord", href: "/espace-client", iconName: "LayoutDashboard" },
  { title: "Mes Dossiers", href: "/espace-client/dossiers", iconName: "FolderKanban" },
  { title: "Nouveau Dossier", href: "/espace-client/nouveau-dossier", iconName: "PlusCircle" },
  { title: "Mes Documents", href: "/espace-client/documents", iconName: "FileText" },
  { title: "Mes Rendez-vous", href: "/espace-client/rendez-vous", iconName: "Calendar" },
  { title: "Mes Paiements", href: "/espace-client/paiements", iconName: "CreditCard" },
  { title: "Messages & Assistance", href: "/espace-client/assistance", iconName: "MessageSquare" },
  { title: "Mon Profil", href: "/espace-client/profil", iconName: "User" },
  { title: "Paramètres", href: "/espace-client/parametres", iconName: "Settings" },
];

export const ADMIN_NAV_ITEMS = [
  { title: "Vue d'ensemble", href: "/admin", iconName: "LayoutDashboard" },
  { title: "Gestion des Dossiers", href: "/admin/dossiers", iconName: "FolderKanban" },
  { title: "Clients", href: "/admin/clients", iconName: "Users" },
  { title: "Catalogue Services", href: "/admin/services", iconName: "Briefcase" },
  { title: "Formules", href: "/admin/formules", iconName: "Layers" },
  { title: "Paiements de démo", href: "/admin/paiements", iconName: "CreditCard" },
];
