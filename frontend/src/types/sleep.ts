export interface Sleep {
  uuid: string;
  date: Date;
  startTime: Date;
  notes: string | null;
  durationMinutes: number;
  userId: string;
}
