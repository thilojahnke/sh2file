const help:string = 'Usage: node sh2file.js [options] [name] \n'+
'Options: [--all|--list|--name] --verbose --help \n'+
'--all         creates one file for every maze \n'+
'--list        create a list of mazes \n'+
'--name [name] create a file for the maze with the given name \n'+
'--verbose     adds additonal infos \n' +
'--help        output this help \n' +
'\n\n'+
'sh2file is part of the shamus project \n'+
'it reads data from shamusdb on localhost:3000 and save the data into a file \n'+
'';


export default help;