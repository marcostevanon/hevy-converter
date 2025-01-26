import type { StrongV1 } from '@/models/StrongV1';

export class Strong {
  date: Date = new Date();
  workoutName: string = '';
  duration: number = 0;
  exerciseName: string = '';
  setOrder: number = 0;
  weight: number = 0;
  reps: number = 0;
  distance: number = 0;
  seconds: number = 0;
  notes: string = '';
  workoutNotes: string = '';
  RPE: number = 0;
}

export class StrongRaw {
  'Date': string = '';
  'Workout Name': string = 'Imported Workout';
  'Duration': string = '0s';
  'Exercise Name': string = '';
  'Set Order': number = 0;
  'Weight': number = 0;
  'Reps': number = 0;
  'Distance': number = 0;
  'Seconds': number = 0;
  'Notes': string = '';
  'Workout Notes': string = '';
  'RPE': string = '';
}

export function convertToStrongRaw(strong: StrongV1): StrongRaw {
  const strongRaw = new StrongRaw();
  strongRaw.Date = new Date(strong.date!).toISOString().replace('T', ' ').substring(0, 19);
  if (strong.workoutName) strongRaw['Workout Name'] = `"${strong.workoutName}"`;
  if (strong.duration) strongRaw.Duration = `${strong.duration}s`;
  strongRaw['Exercise Name'] = `"${strong.exerciseName}"`;
  strongRaw['Set Order'] = strong.setOrder!;
  strongRaw.Weight = strong.weight!;
  strongRaw.Reps = strong.reps!;
  strongRaw.Distance = strong.distance!;
  strongRaw.Seconds = strong.seconds!;
  if (strong.notes) strongRaw.Notes = `"${strong.notes}"`;
  if (strong.workoutNotes) strongRaw['Workout Notes'] = `"${strong.workoutNotes}"`;
  if (strong.RPE) strongRaw.RPE = `"${strong.RPE}"`;
  return strongRaw;
}
