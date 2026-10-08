export const healthStatuses = ["Healthy", "Warning", "Critical"] as const;
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export interface Batch {
  id: string; farm_id: string; batch_code: string; species: "Poultry"; breed: string;
  initial_count: number; initial_age_weeks: number; initial_average_weight_kg: number;
  health_status: typeof healthStatuses[number]; lifecycle_status: "Active" | "Completed";
  date_added: string; created_at: string; updated_at: string;
}

export function batchAgeWeeks(batch: Pick<Batch, "date_added" | "initial_age_weeks">, today: string) {
  const days = Math.max(0, (Date.parse(today.slice(0, 10)) - Date.parse(batch.date_added)) / 86400000);
  return Number((Number(batch.initial_age_weeks) + days / 7).toFixed(2));
}

export type BatchErrors = Partial<Record<"species" | "breed" | "initial_count" | "initial_age_weeks" | "initial_average_weight_kg" | "health_status", string>>;
export function validateBatch(data: FormData) {
  const text = (key: string) => typeof data.get(key) === "string" ? String(data.get(key)).trim() : "";
  const errors: BatchErrors = {};
  const breed = text("breed");
  if (!breed || breed.length > 200) errors.breed = "Enter a breed of 1–200 characters.";
  if (text("species") !== "Poultry") errors.species = "Only Poultry is supported.";
  const number = (key: "initial_count" | "initial_age_weeks" | "initial_average_weight_kg", max: number, decimals: number) => {
    const raw = text(key), value = Number(raw);
    if (!/^\d+(\.\d+)?$/.test(raw) || !Number.isFinite(value) || value < 0 || value > max || (raw.split(".")[1]?.length ?? 0) > decimals || (key === "initial_count" && (!Number.isInteger(value) || value < 1))) {
      errors[key] = key === "initial_count" ? "Enter a positive whole number up to 2,147,483,647." : `Enter a nonnegative number up to ${max}, with at most ${decimals} decimal places.`;
    }
    return value;
  };
  const initial_count = number("initial_count", 2147483647, 0);
  const initial_age_weeks = number("initial_age_weeks", 999999.99, 2);
  const initial_average_weight_kg = number("initial_average_weight_kg", 9999999.999, 3);
  const health_status = text("health_status");
  if (!healthStatuses.some(status => status === health_status)) errors.health_status = "Select a valid health status.";
  return { errors, values: { species: "Poultry" as const, breed, initial_count, initial_age_weeks, initial_average_weight_kg, health_status } };
}
