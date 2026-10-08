import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { getBatches } from "@/lib/batches";
import { BatchList } from "./batch-list";
import { NewBatchDialog } from "./new-batch-dialog";

export const metadata: Metadata = { title: "Production Tracking | Agriflow", description: "Manage livestock batches, stock level, age, mortality, weights, feed intake and yield." };

async function Production({ params }: { params: Promise<{ farmId: string }> }) {
  await connection();
  const { farmId } = await params;
  const batches = await getBatches(farmId);
  const today = new Date().toISOString().slice(0, 10);
  return <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:min-h-[calc(100dvh-96px)] xl:px-[22px] xl:pt-6">
    <div className="mb-5 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0"><h1 className="text-lg leading-6 font-semibold">Production Tracking</h1><p className="text-sm leading-5">Manage livestock batches, stock level, age, mortality, weights, feed intake and yield.</p></div>
      <NewBatchDialog farmId={farmId} />
    </div>
    <BatchList batches={batches} farmId={farmId} today={today} />
  </div>;
}
export default function ProductionPage(props: { params: Promise<{ farmId: string }> }) {
  return <Suspense fallback={<p role="status" className="p-5 text-sm">Loading production batches...</p>}><Production {...props} /></Suspense>;
}
