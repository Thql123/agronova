export interface ProductionBatch {
  id: string;
  speciesBreed: string;
  count: number;
  ageWeeks: number;
  averageWeightKg: number;
  status: "Healthy";
}

export const mockBatches: readonly ProductionBatch[] = [
  {
    id: "POU-12124-001",
    speciesBreed: "Poultry/Broiler",
    count: 1000,
    ageWeeks: 2,
    averageWeightKg: 0.72,
    status: "Healthy",
  },
];
