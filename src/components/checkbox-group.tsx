'use client'

import * as React from "react";
import { Checkbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

export function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onValueChange,
  className,
}: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("flex flex-col gap-3", className)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Checkbox.Root
            name={option.value}
            className={cn(
              "flex items-center justify-center w-5 h-5 rounded border border-zinc-300 dark:border-zinc-700",
              "bg-white dark:bg-zinc-900",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800",
              "data-[state=checked]:bg-zinc-900 data-[state=checked]:border-zinc-900",
              "dark:data-[state=checked]:bg-zinc-100 dark:data-[state=checked]:border-zinc-100",
              "transition-colors"
            )}
          >
            <Checkbox.Indicator
              className="flex items-center justify-center text-zinc-900 dark:text-white"
            >
              <Check className="w-3 h-3" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-sm group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </BaseCheckboxGroup>
  );
}
