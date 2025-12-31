'use client'

import type { Device, Category } from "@/types"

import { Detail } from '@/components/devices/detail'

import { useFavorite } from "@/hooks/useFavorite"

type DevicesProps = {
    devices: Device[];
    categories: Category[];
}

export function Devices({ devices, categories }: DevicesProps) {
    const { isFavorite, toggleFavorite } = useFavorite();

    if (devices.length === 0) {
        return <p className="text-zinc-600 dark:text-zinc-400">No devices found.</p>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {devices.map((device) => (
                <Detail
                    key={device.id}
                    device={device}
                    categories={categories}
                    isFavorite={isFavorite(device.id)}
                    onToggleFavorite={() => toggleFavorite(device.id)}
                />
            ))}
        </div>
    );
}