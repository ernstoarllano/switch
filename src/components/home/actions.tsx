'use client';

import { useQueryState } from "nuqs";
import { Search } from "@/components/search";

export function HomeActions() {
    const [search, setSearch] = useQueryState("q", {
        defaultValue: "",
        shallow: false,
    });

    const handleSearch = (value: string) => {
        setSearch(value || null);
    }

    return (
        <Search
            value={search}
            onSearch={handleSearch}
            placeholder="Smartwatch"
        />
    )
}