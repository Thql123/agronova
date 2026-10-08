import "server-only";
import type { Session, User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./server";

export const confirmationCookie = "agriflow-email-confirmation";
const lifetime = 300;

export function authRedirect(request: NextRequest, path: "/auth/error" | "/auth/confirmed" | "/farms") {
  return NextResponse.redirect(new URL(path, request.url), { headers: { "Cache-Control": "private, no-store" } });
}

export async function completeEmailConfirmation(request: NextRequest, supabase: Awaited<ReturnType<typeof createClient>>, session: Session | null) {
  if (!session) return authRedirect(request, "/auth/error");
  const { data, error } = await supabase.auth.getUser(session.access_token);
  if (error || !data.user?.email_confirmed_at) return authRedirect(request, "/auth/error");
  const response = authRedirect(request, "/auth/confirmed");
  response.cookies.set(confirmationCookie, session.access_token, {
    httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax",
    path: "/auth/confirmed", maxAge: lifetime,
  });
  return response;
}

export async function validConfirmationReceipt(token: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) return false;
    const { iat } = data.claims;
    const age = Math.floor(Date.now() / 1000) - iat;
    // Supabase signs these claims; a URL parameter or unsigned cookie is insufficient.
    if (!(age >= 0 && age < lifetime)) return false;
    const { data: verified, error: userError } = await supabase.auth.getUser(token);
    return !userError && !!verified.user?.email_confirmed_at;
  } catch {
    return false;
  }
}

export function recentlyConfirmed(user: User | null) {
  if (!user?.email_confirmed_at) return false;
  const age = Date.now() - Date.parse(user.email_confirmed_at);
  return age >= 0 && age < 60_000;
}
