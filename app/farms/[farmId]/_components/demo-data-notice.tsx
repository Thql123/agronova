export function DemoDataNotice({ module }: { module: string }) {
  return (
    <p className="mb-4 shrink-0 rounded-xl border border-[#d6d6d6] bg-white px-4 py-3 text-sm leading-5 text-[#606060]">
      <strong className="font-semibold text-[#262626]">Demo data.</strong>{" "}
      These sample figures do not reflect this farm. Live {module} data is not connected yet.
    </p>
  );
}
