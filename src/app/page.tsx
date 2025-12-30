import { getDevices, getCategories } from "@/lib/data";

import { HomeActions } from "@/components/home/actions"
import { HomeGrid } from "@/components/home/grid";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const [devices, categories] = await Promise.all([
    getDevices(),
    getCategories(),
  ]);

  const filteredDevices = q
    ? devices.filter((device) =>
        device.name.toLowerCase().includes(q.toLowerCase())
      )
    : devices;

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Mini Catalog</h1>
        <div className="flex items-center justify-between mb-8">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {filteredDevices.length} devices across {categories.length} categories
          </p>
          <HomeActions />
        </div>
        <HomeGrid devices={filteredDevices} />
      </main>
    </div>
  );
}
