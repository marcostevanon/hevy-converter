export class Strong {
    date: Date = new Date();
    workoutName: string = "";
    duration: number = 0;
    exerciseName: string = "";
    setOrder: number = 0;
    weight: number = 0;
    reps: number = 0;
    distance: number = 0;
    seconds: number = 0;
    notes: string = "";
    workoutNotes: string = "";
    RPE: number = 0;
}

export class StrongRaw {
    "Date": string = "";
    "Workout Name": string = "";
    "Duration": string = "";
    "Exercise Name": string = "";
    "Set Order": number = 0;
    "Weight": number = 0;
    "Reps": number = 0;
    "Distance": string = "";
    "Seconds": number = 0;
    "Notes": string = "";
    "Workout Notes": string = "";
    "RPE": string = "";
}
