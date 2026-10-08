import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { confirmationCookie, validConfirmationReceipt } from "@/lib/supabase/email-confirmation";

async function Confirmation() {
  await connection();
  const token = (await cookies()).get(confirmationCookie)?.value;
  if (!token || !await validConfirmationReceipt(token)) redirect("/auth/error");
  return <main className="flex min-h-dvh items-center justify-center bg-[#f4f4f4] px-5 py-10 font-sans text-[#292929] [color-scheme:light]">
    <section className="w-full max-w-md rounded-3xl border border-[#dedede] bg-white p-8 text-center">
      <span aria-hidden="true" className="mx-auto flex size-14 items-center justify-center rounded-full bg-black text-white"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg></span>
      <h1 className="mt-6 text-2xl font-semibold">Email verified successfully!</h1>
      <p className="mt-3 text-sm leading-6 text-[#606060]">Your email address has been confirmed. You can now log in to your Agriflow account.</p>
      <Link href="/login" className="mt-6 flex min-h-11 items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2">Continue to Login</Link>
    </section>
  </main>;
}

export default function ConfirmedPage() {
  return <Suspense fallback={<p role="status" className="p-6 text-sm">Checking email confirmation...</p>}><Confirmation /></Suspense>;
}
