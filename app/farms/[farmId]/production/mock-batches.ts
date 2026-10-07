export interface ProductionBatch {
  id: string;
  speciesBreed: string;
  count: number;
  ageWeeks: number;
  averageWeightKg: number;
  status: "Healthy";
  recordSummary: {
    species: string;
    breed: string;
    category: string;
    dateAdded: string;
    ageWeeks: number;
    averageWeightKg: number;
    totalMortality: number;
    assignedCount: number;
  };
}

export const mockBatches: readonly ProductionBatch[] = [
  {
    id: "POU-12124-001",
    speciesBreed: "Poultry/Broiler",
    count: 1000,
    ageWeeks: 2,
    averageWeightKg: 0.72,
    status: "Healthy",
    // Detail-screen snapshot supplied separately from the Production list fixture.
    recordSummary: {
      species: "Bird",
      breed: "Ross 308",
      category: "Broiler",
      dateAdded: "2026-01-01",
      ageWeeks: 4,
      averageWeightKg: 2,
      totalMortality: 4,
      assignedCount: 2,
    },
  },
];
