import { ButtonSpinner } from "@/app/_components/loading";

export function FarmWorkspaceLoader() {
  return <div role="status" aria-busy="true" className="flex min-h-dvh min-w-0 items-center justify-center bg-[#f4f4f4] px-6 py-10 font-sans text-black [color-scheme:light]">
    <div className="flex max-w-sm flex-col items-center gap-6 text-center">
      <div aria-hidden="true" className="flex size-16 items-center justify-center rounded-xl bg-black text-3xl font-bold text-white motion-safe:animate-pulse motion-safe:[animation-duration:3s]">A</div>
      <div className="flex flex-col items-center gap-3 text-[#606060]">
        <ButtonSpinner />
        <p className="text-sm leading-6">Preparing your farm workspace...</p>
      </div>
    </div>
  </div>;
}
