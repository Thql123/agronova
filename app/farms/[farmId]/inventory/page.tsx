import type { Metadata } from "next";
import { mockInventoryItems, mockInventorySummary } from "./mock-inventory";

export const metadata: Metadata = {
  title: "Feed & Inventory | Agriflow",
  description: "Real-time stock tracking with predictive depletion alerts.",
};

export default function InventoryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:min-h-[calc(100dvh-96px)] xl:px-[22px] xl:pt-6">
      <div className="mb-1.5 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg leading-6 font-semibold">Feed &amp; Inventory</h1>
          <p className="text-sm leading-5">Real-time stock tracking with predictive depletion alerts.</p>
        </div>
        <div className="mb-2 flex shrink-0 flex-wrap gap-3 sm:mb-0">
          <button type="button" disabled title="Add Item is coming soon" className="flex h-8 items-center gap-2 rounded-lg border border-[#CCCCCC] bg-white px-2.5 text-sm font-medium">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>Add Item
          </button>
          <button type="button" disabled title="Log Delivery is coming soon" className="flex h-8 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>Log Delivery
          </button>
        </div>
      </div>

      <div className="mb-3.5 grid w-full max-w-[444px] shrink-0 grid-cols-1 gap-3.5 sm:grid-cols-[repeat(2,minmax(0,215px))]">
        <section aria-labelledby="total-items-title" className="min-h-[103px] rounded-[22px] border border-[#d6d6d6] bg-white px-3.5 py-3">
          <h2 id="total-items-title" className="text-[11px] leading-4 tracking-[0.1em] text-[#262626] uppercase">Total Items</h2>
          <p className="mt-4 text-[20px] leading-6 font-extrabold text-[#262626]">{mockInventorySummary.totalItems}</p>
        </section>
        <section aria-labelledby="needs-attention-title" className="min-h-[103px] rounded-[22px] border border-[#d6d6d6] bg-white px-3.5 py-3">
          <h2 id="needs-attention-title" className="text-[11px] leading-4 tracking-[0.1em] text-[#262626] uppercase">Needs Attention</h2>
          <p className="mt-4 text-[20px] leading-6 font-extrabold text-[#b20e13]">{mockInventorySummary.needsAttention}</p>
        </section>
      </div>

      <section aria-label="Inventory items" className="min-h-min min-w-0 flex-1 rounded-[28px] border border-[#CCCCCC] bg-white p-3.5">
        <div className="flex flex-wrap items-start gap-3.5">
          {mockInventoryItems.map((item) => (
            <article key={item.id} aria-labelledby={`${item.id}-title`} className="min-h-[172px] w-full min-w-0 max-w-full rounded-[22px] border border-[#d6d6d6] bg-white p-3 sm:w-[215px]">
              <h2 id={`${item.id}-title`} className="text-lg leading-6 font-semibold text-[#262626]">{item.name}</h2>
              <p className="mt-1 text-[9px] leading-3 text-[#606060]">{item.stockDisplay}</p>
              <div aria-hidden="true" className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#e5e5e5]">
                <div className="h-full rounded-full bg-black" style={{ width: `${item.progressFillPercent}%` }} />
              </div>
              <dl className="mt-5">
                <div className="flex items-center gap-2.5">
                  <dt className="sr-only">Quantity</dt>
                  <dd className="flex h-[34px] min-w-0 flex-1 items-center rounded-lg bg-[#f4f4f4] px-2.5 text-[10px]">{item.quantityDisplay}</dd>
                  <dt className="sr-only">Unit</dt>
                  <dd className="w-6 shrink-0 text-[9px]">{item.unit}</dd>
                </div>
                <div className="mt-3 flex gap-1 text-xs leading-4">
                  <dt>Cost:</dt><dd>{item.costDisplay}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
