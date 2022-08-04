const version = '0.02';

import * as arg from 'arg';
import logger from './logger.js';
import req from './request.js';
import progArgs from './args.js';

// test

const args = arg({
	'--list' : Boolean,
	'--all' : Boolean,
	'--help' : Boolean,
	'--verbose': Boolean,
	'--version': Boolean,
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
if (argsInterface.version){
	console.log(`Version: ${version}`);
	process.exit();
}


logger.log("info","Program started");

interface Message{
	message : string,

}

//now check if the db is running
logger.log("verbose","Check for db");
req('/').then((value)=>{
 const parsedData:Message = JSON.parse(value);
  //const loginfo = JSON.stringify(value);
  logger.log("verbose",`db up: ${parsedData.message}`);
  if (parsedData.message !== 'OK'){
	logger.error("DB check failed. DB running but return invalid message");
	process.exit();
  }
}).catch((error)=>{
  logger.error(error)
  process.exit();
})











































