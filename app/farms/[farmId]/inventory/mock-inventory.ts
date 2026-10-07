export interface InventoryItem {
  id: string;
  name: string;
  stockDisplay: string;
  quantityDisplay: string;
  unit: "units" | "kg";
  costDisplay: string;
  progressFillPercent: number;
}

// These are visual fixtures from Figma, not calculated inventory metrics.
export const mockInventorySummary = { totalItems: 1, needsAttention: 0 };

export const mockInventoryItems: readonly InventoryItem[] = [
  {
    id: "broiler-chick",
    name: "Broiler Chick",
    stockDisplay: "1,000/5,000 - 5%",
    quantityDisplay: "1,000",
    unit: "units",
    costDisplay: "₦12,000",
    progressFillPercent: 30,
  },
  {
    id: "broiler-starter",
    name: "Broiler Starter",
    stockDisplay: "100/500kg - 10%",
    quantityDisplay: "100",
    unit: "kg",
    costDisplay: "₦10,000",
    progressFillPercent: 30,
  },
];
