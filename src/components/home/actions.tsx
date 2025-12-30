'use client';

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Search } from "@/components/search";
import { Combobox, type ComboboxOption } from "@/components/combobox";
import type { Category } from "@/types";

type HomeActionsProps = {
    categories: Category[];
}

export function HomeActions({ categories }: HomeActionsProps) {
    const [search, setSearch] = useQueryState("q", {
        defaultValue: "",
        shallow: false,
    });

    const [selectedCategoryIds, setSelectedCategoryIds] = useQueryState(
        "categories",
        parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false })
    );

    const handleSearch = (value: string) => {
        setSearch(value || null);
    }

    const categoryOptions: ComboboxOption[] = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const selectedCategories = categoryOptions.filter((option) =>
        selectedCategoryIds.includes(option.value)
    );

    console.log({ categoryOptions, selectedCategories })

    const handleCategoryChange = (value: ComboboxOption[]) => {
        const ids = value.map((item) => item.value);
        setSelectedCategoryIds(ids.length > 0 ? ids : null);
        console.log({ value, ids })
    }

    return (
        <div className="flex gap-4">
            <Search
                value={search}
                onSearch={handleSearch}
                placeholder="e.g. Smartwatch"
            />
            <Combobox
                options={categoryOptions}
                value={selectedCategories}
                onValueChange={handleCategoryChange}
                placeholder="e.g. Audio"
            />
        </div>
    )
}