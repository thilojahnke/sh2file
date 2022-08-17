const version = '0.03';

import * as arg from 'arg';
import logger from './logger.js';
import req from './request.js';
import progArgs from './args.js';
import writer from './write.js';

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
};
interface MazeList{
  data: [{maze:string,rf:number,start:number,target:number}]
}
interface MazeRooms{
 data: [maze:string,Room:number,StartX:number,StartY:number,Provision:number]	
}



let error = Error();
async function sh2file(){
	try {
		const checkdb = await req('/');
		const parsedData:Message = JSON.parse(checkdb);
		logger.log("verbose",`db up: ${parsedData.message}`);
		if (parsedData.message !== 'OK'){
			logger.error("DB check failed. DB running but return invalid message");
			process.exit();
		}
		if (argsInterface.list || argsInterface.all ){
			logger.log("verbose", `Parameter LIST: ${argsInterface.list} ->  Read List of mazes from db`);
			logger.log("verbose", `Parameter ALL: ${argsInterface.all} ->  Write all mazes from db to file`);
			const mazelist = await req('/mazes');
			const mazes:MazeList = JSON.parse(mazelist);
			logger.info(`${mazes.data.length} mazes were detected`);
			
			mazes.data.forEach((element)=>{
				logger.verbose(JSON.stringify(element));
				logger.info(`${element.rf}. ${element.maze}`);
				if (argsInterface.all){
					singleMaze(element.maze);
				}
			})
		}
		if (argsInterface.name !== ''){
			singleMaze(String(argsInterface.name));
		}

	}
	catch (error){
		logger.error(error) 
		process.exit();
	}
};


async function singleMaze(maze:string){
	try {
	 logger.verbose(`Start processing of maze: ${ maze }`);
	 const mazeRooms  = await req('/rooms/'+maze);
	 if (mazeRooms.length === 0 ){
		logger.error(`Maze ${maze} not found `);
		return;
	 }
	 const rooms:MazeRooms = JSON.parse(mazeRooms);
	 logger.info(`${ rooms.data.length } entries received`)

	 
	}
	catch (error){
		logger.error(error);
		process.exit();
	}
}

sh2file();




























































