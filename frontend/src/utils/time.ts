export const dateFormat = 'DD.MM.YYYY';
export const timeFormat = 'HH:mm';

export function calculateTotalMinutes(hours: number, minutes: number): number {
  if (hours < 0 || minutes < 0) {
    throw new Error('Hours and minutes should be non-negative.');
  }

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

export const calculateMinutesToHours = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  return `${hours} hr ${minutes} min`;
};

export const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  return { hours, minutes };
};
