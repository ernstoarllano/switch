import Link from "next/link";
import { Star } from "lucide-react";

import type { Device } from "@/types"

type HomeGridProps = {
    devices: Device[];
}

export function HomeGrid({ devices }: HomeGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
            >
              <Link href={`/devices/${device.id}`}>
                <h3 className="font-semibold mb-2">{device.name}</h3>
              </Link>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {device.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold">${device.price}</span>
                <span className="flex items-center gap-2 text-sm">
                  <Star className="w-3 h-3" /> {device.rating}</span>
              </div>
            </div>
          ))}
        </div>
    )
}