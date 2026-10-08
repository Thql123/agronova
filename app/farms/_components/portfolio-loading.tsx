import { Skeleton } from "@/app/_components/loading";
import "./portfolio.css";

export function PortfolioLoading({ mode }: { mode: "farms" | "overview" }) {
  const overview = mode === "overview";
  return <div role="status" aria-busy="true" className="portfolio-shell min-h-dvh bg-[#f4f4f4] text-[#292929]">
    <span className="sr-only">{overview ? "Loading your overview…" : "Loading your farms…"}</span>
    <aside aria-hidden="true" className="portfolio-desktop-sidebar gap-6 p-4">
      <Skeleton className="h-8 w-28" />
      <Skeleton className="mt-10 h-10 w-full" /><Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-auto h-28 w-full rounded-3xl" />
    </aside>
    <div className="portfolio-main" aria-hidden="true">
      <div className="portfolio-toolbar"><Skeleton className="size-5" /></div>
      {!overview && <div className="mb-6 flex items-start justify-between gap-4"><div className="w-2/3 space-y-3"><Skeleton className="h-8 w-36" /><Skeleton className="h-4 w-full max-w-md" /></div><Skeleton className="h-10 w-28" /></div>}
      <div className={`portfolio-summary ${overview ? "portfolio-summary-overview" : ""}`}>
        {Array.from({ length: overview ? 5 : 4 }, (_, i) => <section key={i} className="space-y-3"><Skeleton className="h-3 w-24 max-w-full" /><Skeleton className="h-7 w-28 max-w-full" /><Skeleton className="h-3 w-32 max-w-full" /></section>)}
      </div>
      {overview ? <div className="portfolio-overview-panels">{[0, 1].map(i => <section key={i}><Skeleton className="mb-6 h-6 w-44 max-w-full" /><div className="space-y-6">{[0, 1, 2].map(row => <div key={row} className="space-y-3"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-full" /></div>)}</div>{i === 1 && <div className="mt-6 space-y-3 border-t border-[#dedede] pt-4"><Skeleton className="h-3 w-36" /><Skeleton className="h-7 w-28" /></div>}</section>)}</div> : <>
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="mb-4 flex flex-wrap gap-3"><Skeleton className="h-10 min-w-0 grow basis-full sm:basis-0" /><Skeleton className="h-10 w-32" /><Skeleton className="h-10 w-44" /></div>
        <div className="portfolio-farm-grid">{[0, 1, 2].map(i => <article key={i} className="space-y-6 border border-[#d6d6d6] bg-[#f7f7f7] p-5"><Skeleton className="h-10 w-36 max-w-full" /><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-28" /><div className="grid grid-cols-2 gap-4"><Skeleton className="h-16" /><Skeleton className="h-16" /></div><Skeleton className="h-10 w-full" /></article>)}</div>
      </>}
    </div>
  </div>;
}
