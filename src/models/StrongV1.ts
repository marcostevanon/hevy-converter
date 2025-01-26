// imported on 24/01/2025
// Strong IOS Version: 5.15.23 (7825)

import type { FitbodV1 } from './FitbodV1';

/**
 * Examples
 * 2025-01-18 18:05:28,"Training Title",200s,"Bench Press (Barbell)",1,20.0,20,0,0,"","",
 */

export const strongCsvHeadersV1 =
  'Date,Workout Name,Duration,Exercise Name,Set Order,Weight,Reps,Distance,Seconds,Notes,Workout Notes,RPE';

export class StrongV1 {
  private _date: Date | null = null;
  private _workoutName: string | null = null;
  private _duration: number | null = null;
  private _exerciseName: string | null = null;
  private _setOrder: number | null = null;
  private _weight: number | null = null;
  private _reps: number | null = null;
  private _distance: number | null = null;
  private _seconds: number | null = null;
  private _notes: string | null = null;
  private _workoutNotes: string | null = null;
  private _RPE: number | null = null;

  //#region getters
  get date(): Date | null {
    return this._date;
  }

  get workoutName(): string | null {
    return this._workoutName;
  }

  get duration(): number | null {
    return this._duration;
  }

  get exerciseName(): string | null {
    return this._exerciseName;
  }

  get setOrder(): number | null {
    return this._setOrder;
  }

  get weight(): number | null {
    return this._weight;
  }

  get reps(): number | null {
    return this._reps;
  }

  get distance(): number | null {
    return this._distance;
  }

  get seconds(): number | null {
    return this._seconds;
  }

  get notes(): string | null {
    return this._notes;
  }

  get workoutNotes(): string | null {
    return this._workoutNotes;
  }

  get RPE(): number | null {
    return this._RPE;
  }
  //#endregion

  importAsFitbodV1(fitbodV1: FitbodV1, exercisesMapping: any) {
    this._date = fitbodV1.date;
    // TODO generate a workout
    this._workoutName = 'test 1';
    this._duration = fitbodV1.duration;
    this._exerciseName = exercisesMapping[fitbodV1.exercise!];
    // TODO generate setOrder
    this._setOrder = 1;
    this._weight = fitbodV1.weight;
    this._reps = fitbodV1.reps;
    this._distance = fitbodV1.distance;
    // this._seconds = // TODO ignore
    this._notes = fitbodV1.note;
    // this._workoutNotes = // TODO ignore
    // this._RPE = // TODO ignore
  }

  isExerciseValid() {
    return !!this._exerciseName;
  }
}
