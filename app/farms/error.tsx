"use client";
export default function FarmsError({ reset }: { reset: () => void }) {
  return <main className="min-h-dvh bg-[#f4f4f4] p-6 text-black"><h1 className="text-xl font-semibold">Unable to load your farms</h1><p className="mt-2 text-sm">Please check your connection and try again.</p><button onClick={reset} className="mt-5 rounded-lg bg-black px-4 py-2 text-sm text-white">Try again</button></main>;
}
