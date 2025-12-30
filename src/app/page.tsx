import { Star } from "lucide-react";
import Link from "next/link";

import { getDevices, getCategories } from "@/lib/data";

export default async function Home() {
  const [devices, categories] = await Promise.all([
    getDevices(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Mini Catalog</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          {devices.length} devices across {categories.length} categories
        </p>

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
      </main>
    </div>
  );
}
