import { Suspense } from "react";
import { requireUser } from "@/lib/supabase/require-user";
import { signOut } from "./actions";

async function Welcome() {
  const user = await requireUser();
  return <main className="mx-auto w-full max-w-xl p-6 sm:p-10">
    <h1 className="text-2xl font-semibold">Welcome to Agriflow</h1>
    <p className="mt-3 text-sm text-[#606060]">You are signed in as {user.email}.</p>
    <p className="mt-3 text-sm text-[#606060]">Farm creation is coming next. Your farms will appear here once onboarding is available.</p>
    <form action={signOut}><button type="submit" className="mt-6 rounded-lg bg-black px-4 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Sign out</button></form>
  </main>;
}

export default function FarmsPage() {
  return <div className="min-h-dvh bg-white font-sans text-black [color-scheme:light]"><Suspense fallback={<p className="p-6" role="status">Loading your account…</p>}><Welcome /></Suspense></div>;
}
