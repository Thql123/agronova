import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { requireBatch } from "@/lib/batches";
import { requireFarm } from "@/lib/farms";
import { batchAgeWeeks } from "@/lib/batch-types";

export const metadata: Metadata = { title: "Batch Record | Agriflow" };

const exportControls = [
  { label: "CSV", path: "M12 3v12m-4-4 4 4 4-4M5 19h14" },
  { label: "Print", path: "M7 8V3h10v5M7 17H3V8h18v9h-4M7 14h10v7H7zM17 11h1" },
  { label: "Share", path: "m6 12 12-7M6 12l12 7M4 10h4v4H4zM16 3h4v4h-4zM16 17h4v4h-4z" },
];

async function BatchRecord({ params }: { params: Promise<{ farmId: string; batchId: string }> }) {
  await connection();
  const { farmId, batchId } = await params;
  const farm = await requireFarm(farmId);
  const batch = await requireBatch(farmId, batchId);
  const age = batchAgeWeeks(batch, new Date().toISOString().slice(0, 10));
  const productionUrl = `/farms/${encodeURIComponent(farmId)}/production`;
  const summaryFields = [
    { label: "Species", value: batch.species },
    { label: "Breed", value: batch.breed },
    { label: "Status", value: batch.health_status },
    { label: "Date Added", value: batch.date_added },
    { label: "Age", value: `${age} wks` },
    { label: "Avg. Weight", value: `${batch.initial_average_weight_kg}kg` },
    { label: "Total Mortality", value: "Not recorded yet" },
  ];

  return (
    <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:min-h-[calc(100dvh-96px)] xl:px-[22px] xl:pt-6">
      <h1 className="sr-only">Batch Record: {batch.batch_code}</h1>
      <div className="mb-5 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-2 text-[11px] leading-4 font-medium">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href={`/farms/${encodeURIComponent(farmId)}/dashboard`} className="rounded-sm text-[#808080] hover:underline focus-visible:outline-2">{farm.name}</Link></li>
              <li aria-hidden="true" className="text-[#808080]">········</li>
              <li><Link href={productionUrl} className="rounded-sm text-[#808080] hover:underline focus-visible:outline-2">Production</Link></li>
              <li aria-hidden="true" className="text-[#808080]">········</li>
              <li aria-current="page" className="font-semibold">Batch Record</li>
            </ol>
          </nav>
          <p className="text-sm leading-5">Manage livestock batches, stock level, age, mortality, weights, feed intake and yield.</p>
          <Link href={productionUrl} className="mt-2.5 flex h-8 w-fit items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg>Back
          </Link>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.1em] uppercase">Assigned:</span>
            <button type="button" disabled aria-label={`${"Not assigned"} (assignment controls coming soon)`} className="flex items-center gap-2 rounded-full bg-white p-1 text-[11px] font-semibold">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#dedede]"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg></span>
              {"Not assigned"}
              <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-black text-white"><svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="m2 3 3 4 3-4Z" /></svg></span>
            </button>
          </div>
          <button type="button" disabled aria-label={`Selected batch ${batch.batch_code} (switching coming soon)`} className="flex h-[42px] w-[152px] max-w-full items-center justify-between gap-3 rounded-lg border border-[#CCCCCC] bg-white px-3 text-[11px] font-semibold">
            {batch.batch_code}<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="m1 3 4 4 4-4Z" /></svg>
          </button>
        </div>
      </div>

      <section aria-label="Batch summary and daily records" className="min-h-min min-w-0 flex-1 overflow-hidden rounded-[28px] border border-[#CCCCCC] bg-white">
        <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-5">
          <div className="min-w-0">
            <dl className="flex flex-wrap gap-x-7 gap-y-3">
              {summaryFields.map((field) => <div key={field.label}><dt className="mb-1 text-[9px] leading-3 tracking-[0.1em] uppercase">{field.label}</dt><dd className="text-[11px] leading-4 font-semibold">{field.value}</dd></div>)}
            </dl>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {exportControls.map((control) => <button key={control.label} type="button" disabled aria-label={`${control.label} (coming soon)`} className="flex h-6 items-center gap-1 rounded-lg border border-[#aaaaaa] bg-[#dedede] px-1.5 text-[10px] font-medium"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={control.path} /></svg>{control.label}</button>)}
            </div>
          </div>
          <button type="button" disabled title="Add Daily Record is coming soon" className="flex h-8 shrink-0 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>Add Daily Record
          </button>
        </div>
        <div className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px]" tabIndex={0} role="region" aria-label="Daily records table, scroll horizontally on smaller screens">
          <table className="w-full min-w-[1040px] border-collapse whitespace-nowrap text-[10px] leading-4">
            <caption className="sr-only">Daily records for batch {batch.batch_code}</caption>
            <thead className="border-y border-[#d6d6d6] bg-[#f2f2f2] text-[9px] tracking-[0.1em]">
              <tr>{["Date", "Stock Level", "Feed Type", "Feed Intake", "Daily Weight Gain", "Medication", "Mortality", "Recorded By", "Notes", "Actions"].map((label, index) => <th key={label} scope="col" className={`py-3 font-normal uppercase ${index === 0 ? "px-5 text-left" : "px-2 text-center"}`}>{label}</th>)}</tr>
            </thead>
            <tbody>
              <tr><td colSpan={10} className="px-5 py-8 text-center text-[#606060]">No daily records yet. Daily recording is not connected.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function BatchRecordPage(props: { params: Promise<{ farmId: string; batchId: string }> }) {
  return <Suspense fallback={<p role="status" className="p-5 text-sm">Loading batch details...</p>}><BatchRecord {...props} /></Suspense>;
}
