import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { completeEmailConfirmation, recentlyConfirmed } from "@/lib/supabase/email-confirmation";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    if (code) {
      const supabase = await createClient();
      const flowId = request.nextUrl.searchParams.get("sb_flow_id");
      const { data, error } = await supabase.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
      if (error) console.warn("[email-confirmation] PKCE exchange failed", { code: error.code });
      if (!error) {
        // Accept older signup links without a flow hint only when confirmation just occurred.
        if (request.nextUrl.searchParams.get("flow") === "signup" || (data.user?.app_metadata.provider === "email" && recentlyConfirmed(data.user))) {
          return await completeEmailConfirmation(request, supabase, data.session);
        }
        return NextResponse.redirect(new URL("/farms", request.url), { headers: { "Cache-Control": "private, no-store" } });
      }
    }
    return NextResponse.redirect(new URL("/auth/error", request.url), { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.redirect(new URL("/auth/error", request.url), { headers: { "Cache-Control": "private, no-store" } });
  }
}
