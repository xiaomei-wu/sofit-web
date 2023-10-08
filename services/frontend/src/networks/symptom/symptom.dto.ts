export type CreateSymptomDto = {
  date: Date;
  startTime: Date;
  name: string;
  notes?: string;
  intensityLevel: number;
  durationMinutes: string;
};
