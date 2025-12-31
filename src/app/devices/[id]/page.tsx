import { notFound } from "next/navigation";

import { Detail } from "@/components/device/detail";

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
      <div className="mx-auto">
        <Detail device={device} />
      </div>
    </div>
  );
}