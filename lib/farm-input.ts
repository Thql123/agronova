import { farmTypes } from "./farm-types";

export const nigerianStates = [
  "Abia State", "Adamawa State", "Akwa Ibom State", "Anambra State", "Bauchi State",
  "Bayelsa State", "Benue State", "Borno State", "Cross River State", "Delta State",
  "Ebonyi State", "Edo State", "Ekiti State", "Enugu State", "Gombe State", "Imo State",
  "Jigawa State", "Kaduna State", "Kano State", "Katsina State", "Kebbi State", "Kogi State",
  "Kwara State", "Lagos State", "Nasarawa State", "Niger State", "Ogun State", "Ondo State",
  "Osun State", "Oyo State", "Plateau State", "Rivers State", "Sokoto State", "Taraba State",
  "Yobe State", "Zamfara State", "FCT",
] as const;

export type FarmInputErrors = Partial<Record<"name" | "farm_type" | "state" | "city", string>>;

export function validateFarmInput(data: FormData) {
  const text = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const name = text("name"), farmType = text("farm_type"), state = text("state"), city = text("city");
  const errors: FarmInputErrors = {};
  if (!name || name.length > 200) errors.name = "Enter a farm name of 1–200 characters.";
  if (!farmTypes.some(type => type === farmType)) errors.farm_type = "Select a valid farm type.";
  if (!nigerianStates.some(option => option === state)) errors.state = "Select a Nigerian state or FCT.";
  if (!city || city.length > 250) errors.city = "Enter a city or town of 1–250 characters.";
  return { name, farmType, location: `${city}, ${state}`, errors };
}
