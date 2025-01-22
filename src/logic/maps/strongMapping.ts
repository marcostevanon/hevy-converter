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

export function convertToStrongRaw(strong: Strong): StrongRaw {
    const strongRaw = new StrongRaw()
    strongRaw.Date = new Date(strong.date).toISOString().replace('T', ' ').substring(0, 19)
    strongRaw['Workout Name'] = `"${strong.workoutName}"`
    strongRaw.Duration = strong.duration.toString()
    strongRaw['Exercise Name'] = `"${strong.exerciseName}"`
    strongRaw['Set Order'] = strong.setOrder
    strongRaw.Weight = strong.weight
    strongRaw.Reps = strong.reps
    strongRaw.Distance = strong.distance.toString()
    strongRaw.Seconds = strong.seconds
    strongRaw.Notes =  `"${strong.notes}"`
    strongRaw['Workout Notes'] = `"${strong.workoutNotes}"`
    strongRaw.RPE = strong.RPE.toString()
    return strongRaw
}
