"use client";
import Link from "next/link";
import { useState } from "react";
import { farmTypes, type Farm } from "@/lib/farm-types";
import { FarmIcon } from "../[farmId]/_components/farm-icon";
import { CreateFarmDialog } from "./create-farm-dialog";

export function FarmPortfolio({ farms }: { farms: Farm[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("name");
  const visible = farms.filter((farm) => farm.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()) && (!type || farm.farm_type === type)).sort((a, b) => sort === "newest" ? b.created_at.localeCompare(a.created_at) || a.id.localeCompare(b.id) : a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
  const metrics = [{ label: "My Farms", value: String(farms.length), detail: "Farms in your portfolio" }, { label: "Livestock Count", value: "No data yet", detail: "Livestock tracking not connected" }, { label: "Total Revenue", value: "No data yet", detail: "Across all farms" }, { label: "Net Profit", value: "No data yet", detail: "Across all farms" }];
  return <>
    <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-[26px] leading-8 font-semibold">My Farms</h1><p className="mt-1 text-sm text-[#606060]">Manage your farms and review livestock and financial performance.</p></div><CreateFarmDialog /></div>
    <div className="portfolio-summary">{metrics.map((metric) => <section key={metric.label}><h2 className="text-[11px] tracking-[0.08em] text-[#606060] uppercase">{metric.label}</h2><p className={`mt-2 font-bold ${metric.label === "My Farms" ? "text-2xl" : "text-lg"}`}>{metric.value}</p><p className="mt-1 text-xs text-[#606060]">{metric.detail}</p></section>)}</div>
    <section aria-labelledby="your-farms-title">
      <h2 id="your-farms-title" className="mb-4 flex items-center gap-3 text-lg font-semibold">Your farms <span className="rounded bg-[#e5e5e5] px-2 py-0.5 text-xs text-[#606060]">{farms.length}</span></h2>
      <div className="mb-4 flex min-w-0 flex-col gap-3 lg:flex-row">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#d6d6d6] bg-white px-3 text-[#606060]"><FarmIcon name="search" /><span className="sr-only">Search farms by name</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search farms by name" className="h-full w-full min-w-0 text-sm text-black focus:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-black" /></label>
        <label><span className="sr-only">Filter by farm type</span><select value={type} onChange={(event) => setType(event.target.value)} className="h-10 w-full rounded-lg border border-[#d6d6d6] bg-[#f7f7f7] px-3 text-sm lg:w-40"><option value="">All farms</option>{farmTypes.map((farmType) => <option key={farmType}>{farmType}</option>)}</select></label>
        <label><span className="sr-only">Sort farms</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 w-full rounded-lg border border-[#d6d6d6] bg-[#f7f7f7] px-3 text-sm lg:w-44"><option value="name">Sort: Farm name</option><option value="newest">Sort: Newest first</option></select></label>
      </div>
      {visible.length ? <div className="portfolio-farm-grid">{visible.map((farm) => <article key={farm.id} className="min-w-0 rounded-[26px] border border-[#d6d6d6] bg-[#f7f7f7] p-5">
        <div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e5e5e5]"><FarmIcon name="marketplace" /></span><h3 className="text-xl font-semibold [overflow-wrap:anywhere]">{farm.name}</h3></div>
        <p className="mt-3 text-xs text-[#606060] [overflow-wrap:anywhere]">{farm.location} · {farm.farm_type}</p>
        <div className="mt-4 border-t border-[#dedede] pt-4"><p className="text-[11px] tracking-[0.08em] text-[#606060] uppercase">Livestock Count</p><p className="mt-2 text-lg font-semibold">No data yet</p></div>
        <div className="mt-5 grid grid-cols-2 gap-3">{["Revenue", "Net Profit"].map((label) => <div key={label}><p className="text-[11px] tracking-[0.08em] text-[#606060] uppercase">{label}</p><p className="mt-2 text-base font-semibold">No data yet</p></div>)}</div>
        <div className="mt-5 flex flex-wrap justify-between gap-2 border-y border-[#dedede] py-3 text-xs text-[#606060]"><span>of Total Revenue</span><span>No data yet</span></div>
        <Link href={`/farms/${farm.id}/dashboard`} className="mt-5 flex items-center justify-between rounded-lg border border-[#888888] px-3 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2">View farm <span aria-hidden="true">→</span></Link>
      </article>)}</div> : <div className="rounded-[26px] border border-[#d6d6d6] bg-white p-8 text-center"><h3 className="text-lg font-semibold">{farms.length ? "No matching farms" : "Create your first farm"}</h3><p className="mt-2 text-sm text-[#606060]">{farms.length ? "Try another search or farm type." : "Use Add farm to begin managing your farm in Agriflow."}</p></div>}
      <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-[#606060]"><p role="status">Showing {visible.length} of {farms.length} farms</p><p>Financial and livestock data not connected yet.</p></div>
    </section>
  </>;
}
