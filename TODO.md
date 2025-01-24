TODO

Priority
- Maybe try to add tome test to the app with jest, at least some unit tests
- Fix the conversion with the following
  - create a name for the workout
  - add the duration cell and add an “s” after the duration, convert in second
  - add a formula to calculate the set order value 
  - remove RPE value from the column
  - create a setOrder logic

Features
- refactoring code to have a separation like: source schema, conversion mapping with exercises, output schema.
  - so in this way i can add new schema and just add them to the interface and decide the output for each in-out
- create a pre-export view where i can check/edit data before producing a csv
    - e.g. add workout duration so it can generate start and end time
- create 2 ways to import
  - export strong cvs
  - use apis (only pro version)
  - with hevy api is better so you can import 
    - warmups sets
    - you can change/fix current workout in the account

Nice to Have
- Make icon transparent and adapt it with dark background

Infos
- Specify that the software only works client side, data are not sent over the internet
- Warmups sets are lost in the free version

https://api.hevyapp.com/docs/
https://gist.github.com/jfmlima/8f5e2a50b557c3a0345e217382c9d9d3
https://www.reddit.com/r/Hevy/s/FP93JoJkx3