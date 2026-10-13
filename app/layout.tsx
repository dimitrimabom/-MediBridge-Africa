import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/app-store";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "MediBridge Africa | Accompagnement Médical vers l'Inde",
    template: "%s | MediBridge Africa",
  },
  description:
    "Facilitateur d'accompagnement logistique et administratif pour votre parcours de soins en Inde au départ du Cameroun et d'Afrique francophone. Préparation de dossier, visa médical et hébergement.",
  keywords: [
    "accompagnement médical Inde",
    "visa médical Inde Cameroun",
    "parcours de soins Inde",
    "hôpital New Delhi Douala Yaoundé",
    "conciergerie médicale Afrique",
  ],
  authors: [{ name: "MediBridge Africa" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F7F8FA] text-[#172B4D] antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
