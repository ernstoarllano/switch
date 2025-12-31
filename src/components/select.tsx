'use client'

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  className?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  className,
}: SelectProps) {
  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(value) => onValueChange?.(value as string | null)}
    >
      <BaseSelect.Trigger
        className={cn(
          "w-full rounded-lg border border-zinc-300 dark:border-zinc-700",
          "bg-white dark:bg-zinc-900",
          "px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100",
          "transition-colors",
          "flex items-center justify-between gap-2",
          className
        )}
      >
        <BaseSelect.Value className="flex-1 text-left" placeholder={placeholder}>
          {(val) => {
            const selectedOption = options.find(opt => opt.value === val);
            return selectedOption?.label || placeholder;
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon>
          <ChevronDown className="w-4 h-4" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8}>
          <BaseSelect.Popup
            className={cn(
              "w-[var(--anchor-width)] rounded-lg border border-zinc-300 dark:border-zinc-700",
              "bg-white dark:bg-zinc-900",
              "shadow-lg",
              "overflow-hidden",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-all duration-200"
            )}
          >
            <BaseSelect.List className="p-1">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "px-3 py-2 text-sm rounded cursor-pointer",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    "data-[selected]:bg-zinc-900 data-[selected]:text-white",
                    "dark:data-[selected]:bg-zinc-100 dark:data-[selected]:text-zinc-900",
                    "transition-colors"
                  )}
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
