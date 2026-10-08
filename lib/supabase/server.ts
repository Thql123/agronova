import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch (error) {
            // Server Components can read cookies but cannot persist refreshed
            // sessions. Session refresh will need a proxy when auth is added.
            if (
              error instanceof Error &&
              error.message.startsWith(
                "Cookies can only be modified in a Server Action or Route Handler.",
              )
            ) {
              return;
            }

            throw error;
          }
        },
      },
    },
  );
}
