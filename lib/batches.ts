import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { requireFarm } from "./farms";
import { createClient } from "./supabase/server";
import { uuidPattern, type Batch } from "./batch-types";

export const batchColumns = "id,farm_id,batch_code,species,breed,initial_count,initial_age_weeks,initial_average_weight_kg,health_status,lifecycle_status,date_added,created_at,updated_at";
export const getBatches = cache(async (farmId: string) => {
  await requireFarm(farmId);
  const supabase = await createClient();
  const { data, error } = await supabase.from("batches").select(batchColumns).eq("farm_id", farmId).order("created_at", { ascending: false });
  if (error) throw new Error("Unable to load batches. Please try again.");
  return data as Batch[];
});
export const requireBatch = cache(async (farmId: string, batchId: string) => {
  await requireFarm(farmId);
  if (!uuidPattern.test(batchId)) notFound();
  const supabase = await createClient();
  const { data, error } = await supabase.from("batches").select(batchColumns).eq("farm_id", farmId).eq("id", batchId).maybeSingle();
  if (error) throw new Error("Unable to load this batch. Please try again.");
  if (!data) notFound();
  return data as Batch;
});
