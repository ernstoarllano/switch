import Link from "next/link"
import { Star } from "lucide-react"

import type { Device, Category } from "@/types"

import { cn } from "@/lib/utils";

type DetailProps = {
    device: Device;
    categories: Category[];
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export function Detail({ device, categories, isFavorite, onToggleFavorite }: DetailProps) {
    const categoryName = categories.find(cat => cat.id === device.category)?.name;

    return (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-2">
                <Link href={`/devices/${device.id}`}>
                    <h3 className="font-semibold">{device.name}</h3>
                </Link>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">{categoryName}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {device.description}
            </p>
            <div className="flex items-center justify-between">
                <span className="font-bold">${device.price}</span>
                <button className="flex items-center gap-2 text-sm cursor-pointer" onClick={onToggleFavorite}>
                    <Star className={cn('w-3 h-3', isFavorite ? 'fill-amber-400' : '')} /> {device.rating}
                </button>
            </div>
        </div>
    )
}