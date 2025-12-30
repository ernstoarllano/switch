import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import { getDeviceById } from "@/lib/data";

export default async function Device({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const device = await getDeviceById(id);

  if (!device) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-4">{device.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          {device.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">${device.price}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" /> {device.rating}
          </span>
        </div>
      </div>
    </div>
  );
}