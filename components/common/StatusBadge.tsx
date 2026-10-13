import React from "react";
import { DossierStatus, DOSSIER_STATUS_MAP } from "@/types";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: DossierStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const meta = DOSSIER_STATUS_MAP[status] || {
    label: status,
    variant: "outline",
    description: "",
  };

  return (
    <Badge variant={meta.variant} className={className} title={meta.description}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {meta.label}
    </Badge>
  );
}
