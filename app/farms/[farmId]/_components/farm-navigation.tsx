"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { FarmIcon, type FarmIconName } from "./farm-icon";

const navigation: { label: string; segment: string; icon: FarmIconName; available?: boolean }[] = [
  { label: "Dashboard", segment: "dashboard", icon: "dashboard", available: true },
  { label: "Production", segment: "production", icon: "production" },
  { label: "Feed and Inventory", segment: "inventory", icon: "inventory" },
  { label: "Finances", segment: "finances", icon: "finances" },
  { label: "Analytics", segment: "analytics", icon: "analytics" },
  { label: "Meeting", segment: "meeting", icon: "meeting" },
  { label: "Team", segment: "team", icon: "team" },
  { label: "AI", segment: "ai", icon: "ai" },
  { label: "Marketplace", segment: "marketplace", icon: "marketplace" },
];

export function FarmNavigation({ farmId }: { farmId: string }) {
  const segment = useSelectedLayoutSegment();
  return (
    <nav aria-label="Farm navigation" className="space-y-[8px]">
      {navigation.map((item) => {
        const active = segment === item.segment;
        const classes = `flex h-[37px] items-center gap-2 rounded-[7px] px-3 ${active ? "bg-black text-[#FFFFFF] text-[20px] leading-[1] font-semibold tracking-normal" : "text-[#606060] text-sm leading-5 font-semibold"}`;
        const content = <><FarmIcon name={item.icon} className="size-4 shrink-0" />{item.label}</>;
        return item.available ? (
          <Link key={item.segment} href={`/farms/${encodeURIComponent(farmId)}/${item.segment}`} aria-current={active ? "page" : undefined} className={`${classes} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}>
            {content}
          </Link>
        ) : (
          <span key={item.segment} aria-disabled="true" title="Coming soon" className={`${classes} cursor-default`}>{content}</span>
        );
      })}
    </nav>
  );
}
