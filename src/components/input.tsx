import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ className = "", ref, ...props }: InputProps) {
  return (
    <BaseInput
      ref={ref}
      className={cn(`w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`)}
      {...props}
    />
  );
}
