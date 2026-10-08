"use client";
import { useState } from "react";
import Link from "next/link";
import { batchAgeWeeks, type Batch } from "@/lib/batch-types";

export function BatchList({ batches, farmId, today }: { batches: Batch[]; farmId: string; today: string }) {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const filtered = batches.filter(batch => batch.batch_code.toLowerCase().includes(query) || batch.breed.toLowerCase().includes(query));
  return (
      <section aria-label="Livestock batches" className="min-h-min min-w-0 flex-1 overflow-hidden rounded-[28px] border border-[#CCCCCC] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5">
          <label className="block w-full min-w-0 sm:max-w-[366px] sm:flex-1">
            <span className="sr-only">Search batches by code or breed</span>
            <input
              type="search"
              placeholder="Search batches by code or breed"
              value={search}
              onChange={event => setSearch(event.target.value)}
              className="h-12 w-full min-w-0 rounded-[15px] border border-[#CCCCCC] bg-[#f2f2f2] px-3.5 text-sm text-[#606060] placeholder:text-[#606060] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            />
          </label>
          <p className="shrink-0 text-sm text-[#606060]">{filtered.length} {filtered.length === 1 ? "Batch" : "Batches"}</p>
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
              {filtered.map((batch) => (
                <tr key={batch.id} className="font-semibold">
                  <th scope="row" className="px-5 py-2.5 text-left font-semibold"><Link href={`/farms/${encodeURIComponent(farmId)}/production/${encodeURIComponent(batch.id)}`} className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">{batch.batch_code}</Link></th>
                  <td className="px-2 py-2.5 text-center">{`${batch.species}/${batch.breed}`}</td>
                  <td className="px-2 py-2.5 text-center">{batch.initial_count}</td>
                  <td className="px-2 py-2.5 text-center">{batchAgeWeeks(batch, today)}W</td>
                  <td className="px-2 py-2.5 text-center">{Number(batch.initial_average_weight_kg).toFixed(3)}KG</td>
                  <td className="px-2 py-2.5 text-center"><span className={`inline-flex rounded-full px-2 py-1 text-[11px] leading-[14px] font-medium ${batch.health_status === "Healthy" ? "bg-[#dcfce2] text-[#008017]" : batch.health_status === "Warning" ? "bg-[#fff0e6] text-[#ac4a00]" : "bg-[#fff2f4] text-[#b20e13]"}`}>{batch.health_status}</span></td>
                  <td className="px-2 py-2.5 text-center">
                    <button type="button" disabled aria-label={`Actions for batch ${batch.id} (coming soon)`} className="inline-flex size-6 items-center justify-center rounded-md bg-[#f4f4f4]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="4" cy="8" r="1.3" /><circle cx="8" cy="8" r="1.3" /><circle cx="12" cy="8" r="1.3" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={7} className="px-5 py-12 text-center text-[#606060]">{batches.length ? "No batches match your search." : "No batches yet. Create your first poultry batch to start tracking production."}</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
  );
}
