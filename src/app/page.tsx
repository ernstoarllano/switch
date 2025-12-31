import type { Device } from "@/types";

import { Filters } from "@/components/home/filters"
import { Devices } from "@/components/home/devices";
import { Header } from '@/components/home/header'

import { getDevices, getCategories } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categories?: string | string[]; sort?: string }>;
}) {
  const { q, categories, sort } = await searchParams;

  const [devices, categoryList] = await Promise.all([
    getDevices(),
    getCategories(),
  ]);

  // Normalize categories to array
  const selectedCategories = categories
    ? (Array.isArray(categories) ? categories : categories.split(','))
    : [];

  let filteredDevices = devices;

  // Filter by search query
  if (q) {
    filteredDevices = filteredDevices.filter((device) =>
      device.name.toLowerCase().includes(q.toLowerCase()) || device.description.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Filter by selected categories
  if (selectedCategories.length > 0) {
    filteredDevices = filteredDevices.filter((device) =>
      selectedCategories.includes(device.category)
    );
  }

  // Sort by selected option
  if (sort) {
    const [field, direction] = sort.split('-') as [string, 'asc' | 'desc'];

    filteredDevices = [...filteredDevices].sort((a, b) => {
      let comparison = 0;

      if (field === "name" || field === "category") {
        comparison = a[field as keyof Device].toString().localeCompare(
          b[field as keyof Device].toString()
        );
      } else if (field === "price" || field === "rating") {
        comparison = (a[field] as number) - (b[field] as number);
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto">
        <Header
          devices={filteredDevices.length}
          categories={categoryList.length}
          selectedCategories={selectedCategories.length}
        />

        <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="w-full lg:sticky lg:top-8 lg:w-64 lg:shrink-0 lg:self-start">
            <Filters categories={categoryList} />
          </aside>

          <main className="flex-1 min-w-0">
            <Devices devices={filteredDevices} categories={categoryList} />
          </main>
        </div>
      </div>
    </div>
  );
}
