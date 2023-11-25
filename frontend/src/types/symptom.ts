export interface Symptom {
  uuid: string;
  date: Date;
  startTime: Date;
  name: string;
  notes: string | null;
  intensityLevel: number;
  durationMinutes: number;
  userId: string;
}
