"use client";

import React, { useState, Suspense, createContext, useContext } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { X } from "lucide-react";

interface AdminSidebarContextType {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export function useAdminSidebar() {
  return useContext(AdminSidebarContext);
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <AdminSidebarContext.Provider
      value={{
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toggleSidebar,
      }}
    >
      <div className="min-h-screen flex bg-[#F7F8FA]">
        {/* Desktop sidebar */}
        <div className="hidden md:block fixed inset-y-0 left-0 z-40">
          <Suspense fallback={<aside className="w-64 bg-[#102A43] h-full" />}>
            <AdminSidebar />
          </Suspense>
        </div>

        {/* Mobile drawer backdrop and sidebar */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#102A43] z-50">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white"
                aria-label="Fermer le menu administration"
              >
                <X className="w-5 h-5" />
              </button>
              <Suspense fallback={<div className="p-4 text-white text-xs">Menu...</div>}>
                <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </Suspense>
            </div>
          </div>
        )}

        {/* Main content wrapper */}
        <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
          <main className="flex-1 pb-16">{children}</main>
        </div>
      </div>
    </AdminSidebarContext.Provider>
  );
}

