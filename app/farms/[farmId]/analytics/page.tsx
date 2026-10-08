import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | Agriflow",
  description: "Track ROI, categorize expenses, monitor cash flow.",
};

const sections = [
  { id: "insight", title: "Insight" },
  { id: "production-efficiency", title: "Production Efficiency" },
  { id: "health-score", title: "Health Score" },
  { id: "revenue-vs-target", title: "Revenue vs Target" },
  { id: "mortality", title: "Mortality" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:min-h-[calc(100dvh-96px)] xl:px-[22px] xl:pt-6">
      <div className="mb-4 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg leading-6 font-semibold">Analytics</h1>
          <p className="text-sm leading-5">Track ROI, categorize expenses, monitor cash flow.</p>
        </div>
        <button
          type="button"
          disabled
          title="Credit Scoring is coming soon"
          className="flex h-9 w-fit shrink-0 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 8c-1-2-6-2-6 1 0 3 6 1 6 5 0 3-5 3-6 1M12 5v14" />
          </svg>
          Credit Scoring
        </button>
      </div>

      <div className="grid min-w-0 flex-1 grid-rows-[minmax(150px,1.6fr)_repeat(4,minmax(94px,1fr))] gap-1.5">
        {sections.map((section) => (
          <section
            key={section.id}
            aria-labelledby={`${section.id}-title`}
            className={`min-w-0 rounded-[28px] border border-[#CCCCCC] bg-white px-4 py-6 sm:px-[22px] sm:py-8 ${section.id === "insight" ? "min-h-[150px]" : "min-h-[94px]"}`}
          >
            <h2 id={`${section.id}-title`} className="text-sm leading-5 font-normal">{section.title}</h2>
          </section>
        ))}
      </div>
    </div>
  );
}
