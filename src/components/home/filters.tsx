'use client';

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Search } from "@/components/search";
import { CheckboxGroup } from "@/components/checkbox-group";
import { Select } from "@/components/select";
import type { Category } from "@/types";

type FiltersProps = {
    categories: Category[];
}

export function Filters({ categories }: FiltersProps) {
    const [search, setSearch] = useQueryState("q", {
        defaultValue: "",
        shallow: false,
    });

    const [selectedCategoryIds, setSelectedCategoryIds] = useQueryState(
        "categories",
        parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false })
    );

    const [sort, setSort] = useQueryState("sort", {
        defaultValue: "",
        shallow: false,
    });

    const handleSearch = (value: string) => {
        setSearch(value || null);
    }

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleCategoryChange = (value: string[]) => {
        setSelectedCategoryIds(value.length > 0 ? value : null);
    }

    const sortOptions = [
        { value: "", label: "Default" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "rating-desc", label: "Rating: High to Low" },
        { value: "rating-asc", label: "Rating: Low to High" },
        { value: "name-asc", label: "Name: A-Z" },
        { value: "name-desc", label: "Name: Z-A" },
        { value: "category-asc", label: "Category: A-Z" },
    ];

    const handleSortChange = (value: string | null) => {
        setSort(value || null);
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <Search
                    value={search}
                    onSearch={handleSearch}
                    placeholder="e.g. Smartwatch"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Categories</label>
                <CheckboxGroup
                    options={categoryOptions}
                    value={selectedCategoryIds}
                    onValueChange={handleCategoryChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Sort by
                </label>
                <Select
                    options={sortOptions}
                    value={sort}
                    onValueChange={handleSortChange}
                />
            </div>
        </div>
    )
}