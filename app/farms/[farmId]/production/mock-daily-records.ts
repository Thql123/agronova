export interface DailyRecord {
  id: string;
  batchId: string;
  date: string;
  stockLevel: number;
  feedType: string;
  feedIntakeKg: number;
  dailyWeightGain: number;
  medication: string;
  mortality: number;
  recordedBy: string;
  notes: string;
}

export const mockDailyRecords: readonly DailyRecord[] = [
  {
    id: "record-001",
    batchId: "POU-12124-001",
    date: "2026-12-01",
    stockLevel: 1200,
    feedType: "Starter Mash",
    feedIntakeKg: 37,
    dailyWeightGain: 0.62,
    medication: "CORYL SP",
    mortality: 2,
    recordedBy: "Jane",
    notes: "Healthy",
  },
];
