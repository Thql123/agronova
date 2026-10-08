import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { requireUser } from "@/lib/supabase/require-user";
import { getFarms, requireFarm } from "@/lib/farms";
import { signOut } from "../actions";
import { FarmIcon } from "./_components/farm-icon";
import { FarmSidebar } from "./_components/farm-sidebar";
import { MobileFarmNavigation } from "./_components/mobile-farm-navigation";
import { FarmWorkspaceLoader } from "./_components/farm-workspace-loader";

export const metadata: Metadata = { title: "Farm Dashboard | Agriflow", description: "Your farm at a glance." };

async function FarmShell({ children, params }: { children: React.ReactNode; params: Promise<{ farmId: string }> }) {
  await connection();
  const user = await requireUser();
  const { farmId } = await params;
  const farm = await requireFarm(farmId);
  const farms = await getFarms();
  const farmName = farm.name;
  const userName = typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : user.email ?? "Your account";
  return (
    <div className="min-h-dvh min-w-0 bg-[#f4f4f4] font-sans text-black [color-scheme:light] xl:pl-[215px]">
      <FarmSidebar farmId={farmId} farmName={farmName} farms={farms} />
      <header className="flex min-w-0 flex-wrap items-center gap-3 border-b border-[#f1f1f1] bg-white px-4 py-3 sm:px-5 xl:h-[62px] xl:flex-nowrap xl:gap-5 xl:pl-[50px] xl:pr-4 xl:py-0">
        <MobileFarmNavigation><FarmSidebar farmId={farmId} farmName={farmName} farms={farms} mobile /></MobileFarmNavigation>
        <p className="mr-auto min-w-0 flex-1 text-sm leading-5 font-semibold [overflow-wrap:anywhere] xl:flex-none">{farmName}</p>
        <div className="order-last flex h-[46px] w-full min-w-0 basis-full items-center gap-2 rounded-full bg-[#eeeeee] px-4 text-sm leading-5 text-[#606060] xl:order-none xl:mr-4 xl:ml-auto xl:w-auto xl:max-w-[366px] xl:flex-1 xl:basis-auto" aria-label="Ask Agriflow AI, coming soon">
          <FarmIcon name="search" /><span>Ask Agriflow AI</span>
        </div>
        <button disabled aria-label="Notifications (coming soon)" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4]"><FarmIcon name="bell" /></button>
        <div className="flex shrink-0 items-center gap-2 xl:gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-black text-sm text-white" aria-hidden="true">{userName.charAt(0).toUpperCase()}</span>
          <div className="sr-only max-w-[180px] text-xs leading-[14px] md:not-sr-only"><p className="truncate font-semibold">{userName}</p><p className="truncate text-[#606060]">{user.email}</p></div>
        </div>
        <form action={signOut} className="hidden shrink-0 xl:block"><button type="submit" aria-label="Sign out" className="text-[#999999]"><FarmIcon name="logout" /></button></form>
      </header>
      <main id="main-content" className="min-w-0 p-4 sm:p-5 lg:p-6 xl:pt-[14px] xl:pr-[clamp(16px,1.2vw,24px)] xl:pb-5 xl:pl-[clamp(9px,0.68vw,16px)]">{children}</main>
    </div>
  );
}

export default function FarmLayout(props: { children: React.ReactNode; params: Promise<{ farmId: string }> }) {
  return <Suspense fallback={<FarmWorkspaceLoader />}><FarmShell {...props} /></Suspense>;
}
