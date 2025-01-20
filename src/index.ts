// import csv
// covert csv to json
// convert FitbodRaw to Fitbod
// convert Fitbod to Strong
// create csv with Strong data
// write csv to file

import { parse } from "csv-parse";
import fs from 'fs';
import { convertFitbodToStrong } from './convertFitbodToStrong';
import { createFitbodObject, FitbodRaw } from './fitbodMapping';

const file = fs.readFileSync('./data/FitBodWorkoutExport.csv')

parse(file, { delimiter: ",", from_line: 2, }, (err: any, data: string[][]) => {
    data.forEach(row => {
        const fitbodRaw = new FitbodRaw()
        fitbodRaw.Date = row[0].trim()
        fitbodRaw.Exercise = row[1].trim()
        fitbodRaw.Reps = row[2].trim()
        fitbodRaw['Weight(kg)'] = row[3].trim()
        fitbodRaw['Duration(s)'] = row[4].trim()
        fitbodRaw['Distance(m)'] = row[5].trim()
        fitbodRaw.Incline = row[6].trim()
        fitbodRaw.Resistance = row[7].trim()
        fitbodRaw.isWarmup = row[8].trim()
        fitbodRaw.Note = row[9].trim()
        fitbodRaw.multiplier = row[10].trim()
        const fitbod = createFitbodObject(fitbodRaw)
        try {
            const strong = convertFitbodToStrong(fitbod)
            // console.log(strong)
        } catch (err) {
            console.error((err as any).message)
        }
    });
})


