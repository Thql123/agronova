import { Suspense } from "react";
import { ConfirmationScreen } from "../_components/confirmation-screen";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { confirmationCookie, validConfirmationReceipt } from "@/lib/supabase/email-confirmation";

async function Confirmation() {
  await connection();
  const token = (await cookies()).get(confirmationCookie)?.value;
  if (!token || !await validConfirmationReceipt(token)) redirect("/auth/error");
  return <ConfirmationScreen success />;
}

export default function ConfirmedPage() {
  return <Suspense fallback={<p role="status" className="p-6 text-sm">Checking email confirmation...</p>}><Confirmation /></Suspense>;
}
