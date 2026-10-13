import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#102A43] text-white",
        secondary:
          "border-transparent bg-[#173F5F] text-white",
        gold:
          "border-transparent bg-[#FAF6ED] text-[#936E21] border-[#C8A45D]/40 font-medium",
        goldSolid:
          "border-transparent bg-[#C8A45D] text-[#102A43] font-semibold",
        outline:
          "border-[#E2E8F0] text-[#172B4D] bg-white",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800",
        info:
          "border-blue-200 bg-blue-50 text-blue-800",
        destructive:
          "border-red-200 bg-red-50 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
