import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChangeValue,
  placeholder = "Rechercher...",
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-8 bg-white"
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChangeValue("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#64748B] hover:text-[#102A43] cursor-pointer"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Effacer la recherche</span>
        </button>
      )}
    </div>
  );
}
