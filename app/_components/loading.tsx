import type { ComponentProps, ReactNode } from "react";

export function Skeleton({ className = "", ...props }: ComponentProps<"div">) {
  return <div {...props} aria-hidden="true" className={`rounded-lg bg-[#e5e5e5] motion-safe:animate-pulse ${className}`} />;
}

export function ButtonSpinner() {
  return <span aria-hidden="true" className="inline-block size-4 shrink-0 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin" />;
}

export function InlineLoading({ children }: { children: ReactNode }) {
  return <span role="status" className="inline-flex items-center gap-2 text-sm"><ButtonSpinner />{children}</span>;
}
