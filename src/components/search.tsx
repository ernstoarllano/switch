'use client'

import * as React from "react";
import { Search as SearchIcon } from "lucide-react";

import { Input, type InputProps } from "@/components/input";

import { cn } from "@/lib/utils";

export interface SearchProps extends Omit<InputProps, "type"> {
  onSearch?: (value: string) => void;
}

export function Search({ onSearch, className = "", ref, ...props }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 dark:text-zinc-400 pointer-events-none" />
      <Input
        ref={ref}
        type="search"
        className="pl-10"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
