import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { completeEmailConfirmation, recentlyConfirmed } from "@/lib/supabase/email-confirmation";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    if (code) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const { data: verified, error: claimsError } = await supabase.auth.getClaims(data.session?.access_token);
        const emailFlow = !claimsError && verified?.claims.amr?.some(entry => typeof entry === "string" ? entry === "otp" : entry.method === "otp");
        // Accept older signup links without a flow hint only when confirmation just occurred.
        if (emailFlow && (request.nextUrl.searchParams.get("flow") === "signup" || recentlyConfirmed(data.user))) {
          return await completeEmailConfirmation(request, supabase, data.session);
        }
        if (request.nextUrl.searchParams.get("flow") === "signup") return NextResponse.redirect(new URL("/auth/error", request.url));
        return NextResponse.redirect(new URL("/farms", request.url), { headers: { "Cache-Control": "private, no-store" } });
      }
    }
    return NextResponse.redirect(new URL("/auth/error", request.url), { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.redirect(new URL("/auth/error", request.url), { headers: { "Cache-Control": "private, no-store" } });
  }
}
