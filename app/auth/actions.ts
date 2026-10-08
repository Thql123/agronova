"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { confirmationCookie } from "@/lib/supabase/email-confirmation";

export async function returnToLogin() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) return { error: "Unable to sign out. Check your connection and try again." };
    (await cookies()).set(confirmationCookie, "", { path: "/auth/confirmed", maxAge: 0, httpOnly: true, sameSite: "lax" });
  } catch {
    return { error: "Unable to sign out. Check your connection and try again." };
  }
  redirect("/login");
}
