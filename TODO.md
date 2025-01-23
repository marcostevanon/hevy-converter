TODO
- create a simple website for conversion (client-side)
- create a pre-export view where i can check/edit data before producing a csv
    - e.g. add workout duration so it can generate start and end time


next to do: only main flow with conversion from end to end, after that clean up code and make a decent version for web
then refactoring code to have a separation like: source schema, conversion mapping with exercises, output schema.
so in this way i can add new schema and just add them to the interface and decide the output for each in-out

different idea of conversion: page with left to right conversion (up to down in mobile version)
50% of the screen has the input and the other 50% has the output part where to download 
or 33-33-33 (where in the middle you decide the conversion you want to do)

create 2 ways to import
- export strong cvs
- use apis (only pro version)

with hevy api is better so you can import 
- warmups sets
- you can change/fix current workout in the account

https://api.hevyapp.com/docs/
https://gist.github.com/jfmlima/8f5e2a50b557c3a0345e217382c9d9d3
https://www.reddit.com/r/Hevy/s/FP93JoJkx3

TODO to fix scripts
- create a name for the workout
- add the duration cell and add an “s” after the duration, convert in second
- add a formula to calculate the set order value 
- remove RPE value from the column