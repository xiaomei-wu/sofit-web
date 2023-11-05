export type CreateSymptomDto = {
  date: Date;
  startTime: Date;
  name: string;
  notes?: string | null;
  intensityLevel: number;
  durationMinutes: number;
};
