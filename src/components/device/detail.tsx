'use client';

import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link";

import type { Device } from "@/types"

import { useFavorite } from "@/hooks/useFavorite"

import { cn } from "@/lib/utils";

type DetailProps = {
    device: Device;
}

export function Detail({ device }: DetailProps) {
    const { isFavorite, toggleFavorite } = useFavorite();

    return (
        <>
            <Link className="flex items-center gap-2 mb-8" href="/">
                <ArrowLeft className="w-3 h-3" /> Back
            </Link>
            <h1 className="text-4xl font-bold mb-4">{device.name}</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{device.description}</p>
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">${device.price}</span>
                <button className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => toggleFavorite(device.id)}>
                    <Star className={cn('w-3 h-3', isFavorite(device.id) ? 'fill-amber-400' : '')} /> {device.rating}
                </button>
            </div>
        </>
    )
}