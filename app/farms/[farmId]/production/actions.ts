"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { validateBatch, uuidPattern } from "@/lib/batch-types";
import { batchColumns } from "@/lib/batches";

export async function reserveBatchCode(farmId: string) {
  if (!uuidPattern.test(farmId)) return { success: false as const, message: "Invalid farm. Return to My farms and try again." };
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { success: false as const, message: "Your session has expired. Please log in again." };
    const { data: farm, error: farmError } = await supabase.from("farms").select("id").eq("id", farmId).eq("owner_id", user.id).maybeSingle();
    if (farmError || !farm) return { success: false as const, message: "This farm is unavailable or you do not have access." };
    const { data, error } = await supabase.rpc("reserve_batch_code", { p_farm_id: farm.id });
    const reservation = Array.isArray(data) ? (data.length === 1 ? data[0] : null) : data;
    if (error || typeof reservation?.batch_code !== "string" || !/^POU-\d{4}-\d+$/.test(reservation.batch_code) || typeof reservation?.expires_at !== "string" || !(Date.parse(reservation.expires_at) > Date.now())) {
      return { success: false as const, message: "Unable to reserve a batch ID. Please retry." };
    }
    return { success: true as const, batchCode: reservation.batch_code as string, expiresAt: reservation.expires_at as string };
  } catch {
    return { success: false as const, message: "Unable to reserve a batch ID. Check your connection and retry." };
  }
}

export async function createBatch(farmId: string, data: FormData) {
  const { errors, values } = validateBatch(data);
  if (Object.keys(errors).length) return { success: false as const, errors };
  const batchCode = data.get("batch_code");
  if (typeof batchCode !== "string" || !/^POU-\d{4}-\d+$/.test(batchCode)) return { success: false as const, message: "Reserve a batch ID before creating the batch." };
  if (!uuidPattern.test(farmId)) return { success: false as const, message: "Invalid farm. Return to My farms and try again." };
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { success: false as const, message: "Your session has expired. Please log in again." };
    const { data: farm, error: farmError } = await supabase.from("farms").select("id").eq("id", farmId).eq("owner_id", user.id).maybeSingle();
    if (farmError || !farm) return { success: false as const, message: "This farm is unavailable or you do not have access." };
    const { data: batch, error } = await supabase.from("batches").insert({ farm_id: farm.id, ...values, batch_code: batchCode }).select(batchColumns).single();
    if (error || !batch) return { success: false as const, message: "Unable to create the batch. Retry, or reserve a new ID if this reservation has expired or was already used." };
    revalidatePath(`/farms/${farmId}/production`);
    return { success: true as const, id: batch.id as string, batchCode: batch.batch_code as string };
  } catch {
    return { success: false as const, message: "Unable to reach the batch service. Check your connection and try again." };
  }
}
