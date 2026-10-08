import { cache } from "react";
import { notFound } from "next/navigation";
import { createClient } from "./supabase/server";
import { requireUser } from "./supabase/require-user";
import type { Farm } from "./farm-types";

const columns = "id,name,location,farm_type,created_at";
export const getFarms = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.from("farms").select(columns).eq("owner_id", user.id).order("name");
  if (error) throw new Error("Unable to load your farms. Please try again.");
  return data as Farm[];
});
export const requireFarm = cache(async (farmId: string) => {
  const user = await requireUser();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(farmId)) notFound();
  const supabase = await createClient();
  const { data, error } = await supabase.from("farms").select(columns).eq("id", farmId).eq("owner_id", user.id).maybeSingle();
  if (error) throw new Error("Unable to load this farm. Please try again.");
  if (!data) notFound();
  return data as Farm;
});
