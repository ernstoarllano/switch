import { getDevices, getCategories } from "@/lib/data";

import { HomeActions } from "@/components/home/actions"
import { HomeGrid } from "@/components/home/grid";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string[] }>;
}) {
  const { q, categories: selectedCategories } = await searchParams;

  const [devices, categories] = await Promise.all([
    getDevices(),
    getCategories(),
  ]);

  let filteredDevices = devices;

  // Filter by search query
  if (q) {
    filteredDevices = filteredDevices.filter((device) =>
      device.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Filter by selected categories
  if (selectedCategories && selectedCategories.length > 0) {
    filteredDevices = filteredDevices.filter((device) =>
      selectedCategories.includes(device.category)
    );
  }

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Mini Catalog</h1>
        <div className="flex items-center justify-between mb-8">
          <p className="text-zinc-600 dark:text-zinc-400">
            {filteredDevices.length} devices across {categories.length} categories
          </p>
          <HomeActions categories={categories} />
        </div>
        <HomeGrid devices={filteredDevices} />
      </main>
    </div>
  );
}
