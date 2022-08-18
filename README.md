# sh2file 
sh2file is part of the shamus project
it reads data from shamusdb on localhost:3000 and save the data into a file

A list of mazes will be saved in  ./ressources/mazes.json
Mazes will be saved in folder ./resources/mazes/myMaze.json

### build
run 'npm install' inside the procjet folder and then 'gulp build' to build in dist folder. 
inside dist run 'node sh2file --help' to get information about the available options. 

### dependency
this program depends on shamusdb running on localhost:3000 . 






