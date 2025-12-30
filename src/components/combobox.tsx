'use client'

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: ComboboxOption[];
  defaultValue?: ComboboxOption[];
  onValueChange?: (value: ComboboxOption[]) => void;
  placeholder?: string;
  className?: string;
  maxVisibleChips?: number;
}

export function Combobox({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "Select...",
  className,
  maxVisibleChips = 2,
}: ComboboxProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const id = React.useId();

  return (
    <div className={cn("relative", className)}>
      <BaseCombobox.Root
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        multiple
      >
        <BaseCombobox.Chips
          className={cn(
            "flex items-center gap-1.5 min-h-10 w-full rounded-lg border border-zinc-300 dark:border-zinc-700",
            "bg-white dark:bg-zinc-900",
            "px-3 py-2",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-100"
          )}
          ref={containerRef}
        >
          <BaseCombobox.Value>
            {(selectedItems: ComboboxOption[]) => {
              const visibleItems = selectedItems.slice(0, maxVisibleChips);
              const remainingCount = selectedItems.length - maxVisibleChips;

              return (
                <React.Fragment>
                  {visibleItems.map((item) => (
                    <BaseCombobox.Chip
                      key={item.value}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1",
                        "bg-zinc-100 dark:bg-zinc-800",
                        "rounded text-xs font-medium",
                        "text-zinc-900 dark:text-zinc-100"
                      )}
                      aria-label={item.label}
                    >
                      {item.label}
                      <BaseCombobox.ChipRemove
                        className={cn(
                          "inline-flex items-center justify-center",
                          "hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-sm",
                          "transition-colors"
                        )}
                        aria-label="Remove"
                      >
                        <X className="w-3 h-3" />
                      </BaseCombobox.ChipRemove>
                    </BaseCombobox.Chip>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-xs text-zinc-600 dark:text-zinc-400 px-2">
                      +{remainingCount} more
                    </span>
                  )}
                  <BaseCombobox.Input
                    id={id}
                    placeholder={selectedItems.length > 0 ? '' : placeholder}
                    className={cn(
                      "flex-1 max-w-[100px] text-sm bg-transparent",
                      "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
                      "outline-none"
                    )}
                  />
                </React.Fragment>
              );
            }}
          </BaseCombobox.Value>
        </BaseCombobox.Chips>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner sideOffset={4} anchor={containerRef}>
            <BaseCombobox.Popup
              className={cn(
                "w-(--anchor-width) rounded-lg",
                "border border-zinc-300 dark:border-zinc-700",
                "bg-white dark:bg-zinc-900",
                "shadow-lg",
                "z-50"
              )}
            >
              <BaseCombobox.List className="max-h-60 overflow-auto p-1">
                {(option: ComboboxOption) => (
                  <BaseCombobox.Item
                    key={option.value}
                    value={option}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer",
                      "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      "outline-none transition-colors"
                    )}
                  >
                    <BaseCombobox.ItemIndicator className="w-4 h-4 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </BaseCombobox.ItemIndicator>
                    <span className="flex-1">{option.label}</span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </div>
  );
}
