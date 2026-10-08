import type { ReactNode } from "react";
import type { Farm } from "@/lib/farm-types";
import { PortfolioSidebar } from "./portfolio-sidebar";
import { MobileFarmNavigation } from "../[farmId]/_components/mobile-farm-navigation";
import "./portfolio.css";

export function PortfolioShell({ farms, userName, active, children }: { farms: Farm[]; userName: string; active: "farms" | "overview"; children: ReactNode }) {
  return <div className="portfolio-shell min-h-dvh min-w-0 bg-[#f4f4f4] font-sans text-[#292929] [color-scheme:light]">
    <PortfolioSidebar farms={farms} userName={userName} active={active} />
    <main className="portfolio-main">
      <div className="portfolio-toolbar"><MobileFarmNavigation><PortfolioSidebar farms={farms} userName={userName} active={active} mobile /></MobileFarmNavigation><span className="portfolio-menu-mark" aria-hidden="true">☰</span><span className="portfolio-mobile-brand">Agriflow</span></div>
      {children}
    </main>
  </div>;
}
