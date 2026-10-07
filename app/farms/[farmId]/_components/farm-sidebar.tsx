import { FarmIcon } from "./farm-icon";
import { FarmNavigation } from "./farm-navigation";

export function FarmSidebar({ farmId, farmName, mobile = false }: { farmId: string; farmName: string; mobile?: boolean }) {
  return (
    <aside className={mobile ? "flex min-h-0 flex-1 flex-col bg-white" : "hidden border-r border-[#eeeeee] bg-white xl:fixed xl:inset-y-0 xl:left-0 xl:z-20 xl:flex xl:w-[215px] xl:flex-col"}>
      <div className="flex h-[62px] shrink-0 items-center gap-2 px-4 text-sm leading-5 font-semibold xl:items-start xl:pt-[13px]">
        <span className="flex size-7 items-center justify-center rounded bg-black text-base font-bold text-white">A</span>
        <span className="xl:pt-1">Agriflow</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-3 pb-6 xl:pt-[27px]"><FarmNavigation farmId={farmId} /></div>
      <div className="mx-4 mb-[15px] shrink-0 rounded-[22px] border border-[#d8d8d8] bg-[#f7f7f7] px-2.5 py-4 text-sm leading-5 text-[#606060] xl:min-h-[106px]">
        <p className="mb-1 font-semibold">Active Farm</p>
        <p className="mb-1 font-semibold">{farmName}</p>
        <button disabled className="flex items-center gap-2 py-1 text-[13px]" title="Sign out is not available in this preview"><FarmIcon name="logout" />Sign out</button>
      </div>
    </aside>
  );
}
