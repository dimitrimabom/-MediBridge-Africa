import React from "react";
import { ServiceItem } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatFCFA } from "@/lib/utils";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons[service.iconName as keyof typeof Icons] as any) || Icons.CheckCircle;

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-xs hover:border-[#102A43]/40 hover:shadow-md transition-all group">
      <div>
        <div className="w-12 h-12 rounded-lg bg-[#F7F8FA] flex items-center justify-center text-[#102A43] mb-4 group-hover:bg-[#FAF6ED] transition-colors">
          <IconComponent className="w-6 h-6 text-[#C8A45D]" />
        </div>

        <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
          {service.category}
        </span>

        <h3 className="text-base font-bold text-[#102A43] group-hover:text-[#173F5F] transition-colors leading-snug mb-2">
          <Link href={`/services/${service.slug}`} className="hover:underline">
            {service.title}
          </Link>
        </h3>

        <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4">
          {service.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#64748B] block">À partir de</span>
          <span className="text-sm font-extrabold text-[#102A43]">
            {formatFCFA(service.indicativePriceFCFA)}
          </span>
        </div>

        <Button asChild variant="outline" size="sm" className="text-xs h-8 px-3 font-medium">
          <Link href={`/services/${service.slug}`} className="flex items-center gap-1">
            Détails
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
