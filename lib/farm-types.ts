export const farmTypes = ["Poultry", "Cattle", "Fishery", "Mixed farming", "Other"] as const;
export interface Farm {
  id: string;
  name: string;
  location: string;
  farm_type: string;
  created_at: string;
}
