

import * as arg from 'arg';
import logger from './logger.js';
import req from './request.js';
import progArgs from './args.js';





logger.log("info","Program started");

const args = arg({
	'--list' : Boolean,
	'--all' : Boolean,
	'--help' : Boolean,
	'--verbose': Boolean,
	'--name' : String,
	'-h' : '--help',
	'-v' : '--verbose'
});


const argsInterface = progArgs.check_arg(args);
if (argsInterface.message && argsInterface.message.length > 0 ){
	throw Error(String(argsInterface.message))
}

if (argsInterface.verbose){
	logger.level = 'verbose';
}






//now check if the db is running
logger.log("verbose","Check for db");



req('/mazes').then((value)=>{
  logger.log("info",value);

}).catch((error)=>{

  logger.error(error)
})









































