import Loading from "./loading";
import { Suspense } from "react";
import { connection } from "next/server";
import { requireUser } from "@/lib/supabase/require-user";
import { getFarms } from "@/lib/farms";
import { PortfolioShell } from "../farms/_components/portfolio-shell";

async function Overview() {
  await connection();
  const user = await requireUser();
  const farms = await getFarms();
  const userName = typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : user.email ?? "Your account";
  return <PortfolioShell farms={farms} userName={userName} active="overview">
    <h1 className="sr-only">Portfolio Overview</h1>
    <div className="portfolio-summary portfolio-summary-overview">{["Livestock Count", "Total Revenue", "Total Expenses", "Net Profit", "Daily Milk"].map((label) => <section key={label}><h2 className="text-[11px] tracking-[0.1em] uppercase">{label}</h2><p className="mt-3 text-xl font-bold">No data yet</p><p className="mt-2 text-xs text-[#606060]">{label === "Livestock Count" || label === "Daily Milk" ? "Production data not connected" : "Financial data not connected"}</p></section>)}</div>
    <div className="portfolio-overview-panels">{["Revenue by Farm", "Livestock by Farm"].map((title) => <section key={title}><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 text-xs text-[#606060]">{farms.length} {farms.length === 1 ? "farm" : "farms"} in your portfolio</p>
      {farms.length ? <ul className="mt-6 space-y-5">{farms.map((farm) => <li key={farm.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dedede] pb-3"><span className="min-w-0 text-sm font-semibold [overflow-wrap:anywhere]">{farm.name}</span><span className="text-sm text-[#606060]">No data yet</span></li>)}</ul> : <p className="mt-6 text-sm text-[#606060]">Add your first farm from My farms. {title === "Revenue by Farm" ? "Revenue" : "Livestock"} data will appear once tracking is connected.</p>}
      {title === "Livestock by Farm" && <div className="mt-6 border-t border-[#dedede] pt-4"><h3 className="text-xs tracking-[0.1em] uppercase">Portfolio Margin</h3><p className="mt-3 text-xl font-bold">No data yet</p><p className="mt-1 text-xs text-[#606060]">Net profit margin · Financial data not connected</p></div>}
    </section>)}</div>
  </PortfolioShell>;
}
export default function OverviewPage() {
  return <Suspense fallback={<Loading />}><Overview /></Suspense>;
}
