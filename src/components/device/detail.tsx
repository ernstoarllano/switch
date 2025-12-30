import Link from "next/link"
import { Star } from "lucide-react"

import type { Device } from "@/types"

import { cn } from "@/lib/utils";

type DetailProps = {
    device: Device;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export function Detail({ device, isFavorite, onToggleFavorite }: DetailProps) {
    return (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <Link href={`/devices/${device.id}`}>
                <h3 className="font-semibold mb-2">{device.name}</h3>
            </Link>
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