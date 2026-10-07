import type { Metadata } from "next";
import { mockFinancialSummary, mockTransactionCount } from "./mock-finances";

export const metadata: Metadata = {
  title: "Financial Records | Agriflow",
  description: "Track ROI, categorize expenses, monitor cash flow.",
};

export default function FinancesPage() {
  const metrics = [
    { label: "Revenue", value: mockFinancialSummary.revenue, color: "text-[#00a51a]" },
    { label: "Expenses", value: mockFinancialSummary.expenses, color: "text-[#b52b0b]" },
    { label: "Net Profit", value: mockFinancialSummary.netProfit, color: "text-[#b52b0b]" },
    { label: "Profit Margin", value: mockFinancialSummary.profitMargin, color: "text-[#b52b0b]" },
  ];

  return (
    <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:min-h-[calc(100dvh-96px)] xl:px-[22px] xl:pt-6">
      <div className="mb-1.5 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg leading-6 font-semibold">Financial Records</h1>
          <p className="text-sm leading-5">Track ROI, categorize expenses, monitor cash flow.</p>
        </div>
        <div className="mb-2 flex shrink-0 flex-wrap gap-3 sm:mb-0">
          <button type="button" disabled title="Export is coming soon" className="flex h-8 items-center gap-2 rounded-lg border border-[#CCCCCC] bg-white px-2.5 text-sm font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" /></svg>Export
          </button>
          <button type="button" disabled title="Add Transaction is coming soon" className="flex h-8 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>Add Transaction
          </button>
        </div>
      </div>

      <div className="mb-3.5 flex shrink-0 flex-col gap-3.5 xl:flex-row xl:items-start xl:justify-between">
        <div className="grid w-full min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 xl:max-w-[902px] xl:grid-cols-[repeat(4,minmax(0,215px))]">
          {metrics.map((metric) => (
            <section key={metric.label} aria-label={metric.label} className="min-h-[103px] min-w-0 rounded-[22px] border border-[#d6d6d6] bg-white px-3.5 py-3">
              <h2 className="text-[11px] leading-4 tracking-[0.1em] text-[#262626] uppercase">{metric.label}</h2>
              <p className={`mt-4 text-[20px] leading-6 font-extrabold ${metric.color}`}>{metric.value}</p>
            </section>
          ))}
        </div>
        <button type="button" disabled title="Financial calculator is coming soon" className="flex h-8 w-fit shrink-0 items-center gap-2 rounded-lg border border-[#CCCCCC] bg-white px-2 text-sm font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M3 3h18v18H3zM7 7h4M9 5v4M15 7h3M7 13l4 4M11 13l-4 4M15 13h3M15 17h3" /></svg>Fin Calc.
        </button>
      </div>

      <section aria-labelledby="recent-transactions-title" className="min-h-min min-w-0 flex-1 rounded-[28px] border border-[#CCCCCC] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d6d6d6] pb-5">
          <h2 id="recent-transactions-title" className="text-xl leading-7 font-semibold">Recent Transactions</h2>
          <p className="text-sm text-[#606060]">{mockTransactionCount} Record</p>
        </div>
        <p className="sr-only">No transaction records yet.</p>
      </section>
    </div>
  );
}
