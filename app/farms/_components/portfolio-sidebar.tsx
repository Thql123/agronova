import Link from "next/link";
import type { Farm } from "@/lib/farm-types";
import { signOut } from "../actions";
import { FarmIcon } from "../[farmId]/_components/farm-icon";

export function PortfolioSidebar({ farms, userName, active, mobile = false }: { farms: Farm[]; userName: string; active: "farms" | "overview"; mobile?: boolean }) {
  return <aside className={mobile ? "flex min-h-0 flex-1 flex-col bg-white" : "portfolio-desktop-sidebar"}>
    <div className="flex h-[70px] shrink-0 items-center gap-2 px-4 text-base font-semibold"><span className="flex size-8 items-center justify-center rounded bg-black text-white">A</span>Agriflow</div>
    <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-7 pb-6">
      <nav aria-label="Portfolio navigation" className="space-y-2">{[{ id: "overview", href: "/overview", label: "Overview", icon: "dashboard" as const }, { id: "farms", href: "/farms", label: "My farms", icon: "team" as const }].map((item) => <Link key={item.id} href={item.href} aria-current={active === item.id ? "page" : undefined} className={`flex h-[42px] items-center gap-2 rounded-lg px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${active === item.id ? "bg-black text-white" : "text-[#606060] hover:bg-[#f4f4f4]"}`}><FarmIcon name={item.icon} />{item.label}</Link>)}</nav>
      <div className="mt-4 border-t border-[#dedede] pt-3"><h2 className="text-xs tracking-[0.1em] uppercase">Quick Access</h2><nav aria-label="Quick access farms" className="mt-3 space-y-2">{farms.map((farm) => <Link key={farm.id} href={`/farms/${farm.id}/dashboard`} className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#606060] hover:bg-[#f4f4f4] focus-visible:outline-2 [overflow-wrap:anywhere]">{farm.name}</Link>)}</nav>{farms.length === 0 && <p className="mt-3 text-xs text-[#606060]">Your farms will appear here.</p>}</div>
    </div>
    <div className="mx-4 mb-4 shrink-0 rounded-[22px] border border-[#d8d8d8] bg-[#f7f7f7] p-3 text-sm leading-6 text-[#606060]"><p className="font-semibold [overflow-wrap:anywhere]">{userName}</p><p className="font-semibold">{farms.length} {farms.length === 1 ? "Farm" : "Farms"}</p><form action={signOut}><button type="submit" className="flex items-center gap-2 rounded py-1 focus-visible:outline-2"><FarmIcon name="logout" />Sign out</button></form></div>
  </aside>;
}
