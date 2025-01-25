// imported on 24/01/2025
// FitBod IOS Version 6.49.0 9883

/**
 * Examples
 * 2024-11-26 17:18:41 +0000,Hack Squat, 6,20.0,0.0,0.0,0.0,0.0,true,, 1.0
 * 2024-11-26 17:18:41 +0000,Running - Treadmill, 0,0.0,240.0,1000.0,0.0,0.0,false,, 0.0
 */

export const fitBodCsvHeadersV1 =
  'Date,Exercise,Reps,Weight(kg),Duration(s),Distance(m),Incline,Resistance,isWarmup,Note,multiplier';

export class FitbodV1 {
  private _date: Date | null = null;
  private _exercise: string | null = null;
  private _reps: number | null = null;
  private _weight: number | null = null;
  private _duration: number | null = null;
  private _distance: number | null = null;
  private _incline: number | null = null;
  private _resistance: number | null = null;
  private _isWarmup: boolean | null = null;
  private _note: string | null = null;
  private _multiplier: number | null = null;

  //#region getters
  get date(): Date | null {
    return this._date;
  }

  get exercise(): string | null {
    return this._exercise;
  }

  get reps(): number | null {
    return this._reps;
  }

  get weight(): number | null {
    return this._weight;
  }

  get duration(): number | null {
    return this._duration;
  }

  get distance(): number | null {
    return this._distance;
  }

  get incline(): number | null {
    return this._incline;
  }

  get resistance(): number | null {
    return this._resistance;
  }

  get isWarmup(): boolean | null {
    return this._isWarmup;
  }

  get note(): string | null {
    return this._note;
  }

  get multiplier(): number | null {
    return this._multiplier;
  }
  //#endregion

  //#region setters
  set date(date: string) {
    const parsedDate = new Date(date.replace(/-/g, '/'));
    if (!parsedDate) throw new FitbodV1Error('date', date);
    this._date = parsedDate;
  }

  set exercise(exercise: string) {
    this._exercise = exercise;
  }

  set reps(reps: string) {
    const parsedReps = parseInt(reps);
    if (isNaN(parsedReps)) throw new FitbodV1Error('reps', reps);
    this._reps = parsedReps;
  }

  set weight(weight: string) {
    const parseWeight = +parseFloat(weight).toFixed(1);
    if (isNaN(parseWeight)) throw new FitbodV1Error('weight', weight);
    this._weight = parseWeight;
  }

  set duration(duration: string) {
    const parsedDuration = parseInt(duration);
    if (isNaN(parsedDuration)) throw new FitbodV1Error('duration', duration);
    this._duration = parsedDuration;
  }

  set distance(distance: string) {
    const parsedDistance = parseInt(distance);
    if (isNaN(parsedDistance)) throw new FitbodV1Error('distance', distance);
    this._distance = parsedDistance;
  }

  set incline(incline: string) {
    const parsedIncline = parseInt(incline);
    if (isNaN(parsedIncline)) throw new FitbodV1Error('incline', incline);
    this._incline = parsedIncline;
  }

  set resistance(resistance: string) {
    const parsedResistance = parseInt(resistance);
    if (isNaN(parsedResistance)) throw new FitbodV1Error('resistance', resistance);
    this._resistance = parsedResistance;
  }

  set isWarmup(isWarmup: string) {
    this._isWarmup = isWarmup === 'true';
  }

  set note(note: string) {
    this._note = note;
  }

  set multiplier(multiplier: string) {
    const parsedMultiplier = parseInt(multiplier);
    if (isNaN(parsedMultiplier)) throw new FitbodV1Error('multiplier', multiplier);
    this._multiplier = parsedMultiplier;
  }
  //#endregion

  isValid() {
    return (
      this.date !== null &&
      this.exercise !== null &&
      this.reps !== null &&
      this.weight !== null &&
      this.duration !== null &&
      this.distance !== null &&
      this.incline !== null &&
      this.resistance !== null &&
      this.isWarmup !== null &&
      this.note !== null &&
      this.multiplier !== null
    );
  }
}

export class FitbodV1Error extends Error {
  constructor(message: string, data: any) {
    super(message + '' + data);
    this.name = 'FitbodV1ParseError';
  }
}

// TODO test error
