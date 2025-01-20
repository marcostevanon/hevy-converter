Fitbod to Hevy CSV converter

Developed with the current apps versions:
Fitbod: 6.48.0 (9587)
Hevy: 2.0.17 (1335712)
Strong: 5.15.23 (7825) (used for CSV schema)

Developed with the following CSV schemas

Fitbod
```csv
Date,Exercise,Reps,Weight(kg),Duration(s),Distance(m),Incline,Resistance,isWarmup,Note,multiplier
```

Strong
```csv
Date,Workout Name,Duration,Exercise Name,Set Order,Weight,Reps,Distance,Seconds,Notes,Workout Notes,RPE
```


Notes
FitBod unit Weight(kg) are converted to integer (if you logged your workouts in 'lbs' the file export will be in kg anyway) 
this means that here you will lose the decimals
e.g. 100 lbs (logged) = 45,359237 kgs (exported) and is going to be converted to 45kg (new hevy file)


TODO 
- create a simple website for conversion (client-side)
- create a pre-export view where i can check/edit data before producing a csv
    - e.g. add workout duration so it can generate start and end time