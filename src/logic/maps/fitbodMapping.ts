export class Fitbod {
    date: Date = new Date();
    exercise: string = "";
    reps: number = 0;
    weight: number = 0;
    duration: number = 0;
    distance: number = 0;
    incline: number = 0;
    resistance: number = 0;
    isWarmup: boolean = false;
    note: string = "";
    multiplier: number = 0;
}

export class FitbodRaw {
    "Date": string = "";
    "Exercise": string = "";
    "Reps": string = "";
    "Weight(kg)": string = "";
    "Duration(s)": string = "";
    "Distance(m)": string = "";
    "Incline": string = "";
    "Resistance": string = "";
    "isWarmup": string = "false";
    "Note": string = "";
    "multiplier": string = "";
}


export function createFitbodObject(fitbodRaw: FitbodRaw): Fitbod {
    const fitbod = new Fitbod()

    fitbod.exercise = fitbodRaw.Exercise
    fitbod.isWarmup = fitbodRaw.isWarmup === "true"
    fitbod.note = fitbodRaw.Note

    const date = new Date(fitbodRaw.Date)
    if (date) {
        fitbod.date = date
    } else {
        console.log('date prasing error', fitbodRaw.Date)
        fitbod.date = new Date();
    }

    const reps = parseInt(fitbodRaw.Reps)
    if (isNaN(reps)) {
        console.log('reps prasing error', fitbodRaw.Reps)
        fitbod.reps = 0
    } else {
        fitbod.reps = reps
    }

    const weight = + parseFloat(fitbodRaw["Weight(kg)"]).toFixed(1)
    if (isNaN(weight)) {
        console.log('weight prasing error', fitbodRaw["Weight(kg)"])
        fitbod.weight = 0
    } else {
        fitbod.weight = weight
    }

    const duration = parseInt(fitbodRaw["Duration(s)"])
    if (isNaN(duration)) {
        console.log('duration prasing error', fitbodRaw["Duration(s)"])
        fitbod.duration = 0
    } else {
        fitbod.duration = duration
    }

    const distance = parseInt(fitbodRaw["Distance(m)"])
    if (isNaN(distance)) {
        console.log('distance prasing error', fitbodRaw["Distance(m)"])
        fitbod.distance = 0
    } else {
        fitbod.distance = distance
    }

    const incline = parseInt(fitbodRaw.Incline)
    if (isNaN(incline)) {
        console.log('incline prasing error', fitbodRaw.Incline)
        fitbod.incline = 0
    } else {
        fitbod.incline = incline
    }

    const resistance = parseInt(fitbodRaw.Resistance)
    if (isNaN(resistance)) {
        console.log('resistance prasing error', fitbodRaw.Resistance)
        fitbod.resistance = 0
    } else {
        fitbod.resistance = resistance
    }

    const multiplier = parseInt(fitbodRaw.multiplier)
    if (isNaN(multiplier)) {
        console.log('multiplier prasing error', fitbodRaw.multiplier)
        fitbod.multiplier = 0
    } else {
        fitbod.multiplier = multiplier
    }

    return fitbod
}