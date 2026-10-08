"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { validateFarmInput } from "@/lib/farm-input";

export async function createFarm(formData: FormData) {
  const { name, location, farmType, errors } = validateFarmInput(formData);
  if (Object.keys(errors).length) return { success: false as const, errors };
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { success: false as const, message: "Your session has expired. Please log in again." };
    const { error } = await supabase.from("farms").insert({ name, location, farm_type: farmType, owner_id: user.id });
    if (error) return { success: false as const, message: "Unable to create your farm. Please try again." };
  } catch {
    return { success: false as const, message: "Unable to reach the farm service. Please try again." };
  }
  revalidatePath("/farms", "layout");
  return { success: true as const };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw new Error("Unable to sign out. Please try again.");
  redirect("/login");
}
