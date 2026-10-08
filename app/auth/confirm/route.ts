import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { completeEmailConfirmation } from "@/lib/supabase/email-confirmation";

export async function GET(request: NextRequest) {
  try {
    const tokenHash = request.nextUrl.searchParams.get("token_hash");
    const type = request.nextUrl.searchParams.get("type");
    if (tokenHash && (type === "email" || type === "signup")) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      if (error) console.warn("[email-confirmation] Token-hash verification failed", { code: error.code });
      if (!error) return await completeEmailConfirmation(request, supabase, data.session);
    }
    return NextResponse.redirect(new URL("/auth/error", request.url), { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.redirect(new URL("/auth/error", request.url), { headers: { "Cache-Control": "private, no-store" } });
  }
}
