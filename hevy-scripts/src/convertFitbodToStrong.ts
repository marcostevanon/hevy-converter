import { exerciseMappings } from "./exercisesMapping"
import { Fitbod } from "./fitbodMapping"
import { Strong } from "./strongMapping"

export function convertFitbodToStrong(fitbod: Fitbod): Strong {
    const strong = new Strong()
    strong.date = fitbod.date

    const exerciseName = exerciseMappings[fitbod.exercise]
    if (exerciseName === '') {
        throw new Error('skipped - ' + fitbod.exercise)
    }
    if (!exerciseName) {
        console.log('parsing error -', fitbod.exercise)
    }
    strong.exerciseName = exerciseName
    strong.setOrder = 0 // TODO test this
    strong.weight = fitbod.weight
    strong.reps = fitbod.reps
    strong.notes = fitbod.note

    return strong
}