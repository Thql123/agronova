import type { Metadata } from "next";
import { mockBatches } from "./mock-batches";

export const metadata: Metadata = {
  title: "Production Tracking | Agriflow",
  description: "Manage livestock batches, stock level, age, mortality, weights, feed intake and yield.",
};

export default function ProductionPage() {
  return (
    <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:min-h-[calc(100dvh-96px)] xl:px-[22px] xl:pt-6">
      <div className="mb-5 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg leading-6 font-semibold">Production Tracking</h1>
          <p className="text-sm leading-5">
            Manage livestock batches, stock level, age, mortality, weights, feed intake and yield.
          </p>
        </div>
        <button
          type="button"
          disabled
          title="New Batch is coming soon"
          className="flex h-8 w-fit shrink-0 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>
          New Batch
        </button>
      </div>

      <section aria-label="Livestock batches" className="min-h-min min-w-0 flex-1 overflow-hidden rounded-[28px] border border-[#CCCCCC] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5">
          <label className="block w-full min-w-0 sm:max-w-[366px] sm:flex-1">
            <span className="sr-only">Search batches or species</span>
            <input
              type="search"
              placeholder="Search batches or species"
              readOnly
              title="Batch search is coming soon"
              className="h-12 w-full min-w-0 rounded-[15px] border border-[#CCCCCC] bg-[#f2f2f2] px-3.5 text-sm text-[#606060] placeholder:text-[#606060] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            />
          </label>
          <p className="shrink-0 text-sm text-[#606060]">{mockBatches.length} {mockBatches.length === 1 ? "Batch" : "Batches"}</p>
        </div>

        <div className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px]" tabIndex={0} role="region" aria-label="Batch table, scroll horizontally on smaller screens">
          <table className="w-full min-w-[900px] table-fixed border-collapse text-xs">
            <caption className="sr-only">Production batches with species, stock count, age, average weight, and health status</caption>
            <colgroup>
              <col className="w-[24%]" />
              <col className="w-[16%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[15%]" />
              <col className="w-[12%]" />
              <col className="w-[7%]" />
            </colgroup>
            <thead className="border-y border-[#d6d6d6] bg-[#f2f2f2] text-[11px] leading-4 tracking-[0.1em]">
              <tr>
                <th scope="col" className="px-5 py-3 text-left font-normal">BATCH ID</th>
                <th scope="col" className="px-2 py-3 text-center font-normal">SPECIES/BREED</th>
                <th scope="col" className="px-2 py-3 text-center font-normal">COUNT</th>
                <th scope="col" className="px-2 py-3 text-center font-normal">AGE (WEEKS)</th>
                <th scope="col" className="px-2 py-3 text-center font-normal">AVG. WEIGHT</th>
                <th scope="col" className="px-2 py-3 text-center font-normal">STATUS</th>
                <th scope="col" className="px-2 py-3 text-center font-normal">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockBatches.map((batch) => (
                <tr key={batch.id} className="font-semibold">
                  <th scope="row" className="px-5 py-2.5 text-left font-semibold">{batch.id}</th>
                  <td className="px-2 py-2.5 text-center">{batch.speciesBreed}</td>
                  <td className="px-2 py-2.5 text-center">{batch.count}</td>
                  <td className="px-2 py-2.5 text-center">{batch.ageWeeks}W</td>
                  <td className="px-2 py-2.5 text-center">{batch.averageWeightKg.toFixed(2)}KG</td>
                  <td className="px-2 py-2.5 text-center"><span className="inline-flex rounded-full bg-[#dcfce2] px-2 py-1 text-[11px] leading-[14px] font-medium text-[#008017]">{batch.status}</span></td>
                  <td className="px-2 py-2.5 text-center">
                    <button type="button" disabled aria-label={`Actions for batch ${batch.id} (coming soon)`} className="inline-flex size-6 items-center justify-center rounded-md bg-[#f4f4f4]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="4" cy="8" r="1.3" /><circle cx="8" cy="8" r="1.3" /><circle cx="12" cy="8" r="1.3" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
