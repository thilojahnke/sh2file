

//const winston = require('winston');
// const http = require('http');

import * as winston from 'winston';
import * as http from 'http';
//import * as stream from 'stream';





// in
const logger = winston.createLogger({
	level: 'verbose',	
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.simple(),
		winston.format.colorize({all: true})
	),
		
	
	transports: [
		new winston.transports.Console()
	]
});

logger.log("info",'Programm started');


const args = process.argv.slice(2);

if (args.length !== 1 ){
	
 	logger.log("error","Please provide exact one argument: 'List' for only a list of mazes , 'All' for all mazes , 'Name' for the maze  ");
 	throw new Error("");
} 
args.forEach((element:string)=>{
	logger.log("verbose",element);
});

//now check if the db is running
logger.log("verbose","Check for db");

const dbOptions  = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
  }
  
  const req  = http.get(dbOptions,(res: http.IncomingMessage)=>{
	logger.verbose("Send Request");
	const statusCode  = res.statusCode;
	logger.verbose("Status: "+statusCode);
	
   const contentType = res.headers['content-type'];
   logger.verbose("Content-Type: "+contentType);
   //req.setEncoding('utf8');
   let rawData ='';
   res.on('data',(chunk:string)=>{
	rawData += chunk;
});
   res.on('end',()=>{
	 const parsedData = JSON.parse(rawData);

	
     logger.info(JSON.stringify(parsedData));
	 console.log(parsedData.toString().length);
})
})
 req.on('error',(err)=>{
	logger.error("DB returns error ");
	logger.verbose(err);
	return
})
 req.end();
 logger.verbose("Check List of Mazes");