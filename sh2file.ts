

//const winston = require('winston');
// const http = require('http');

import * as winston from 'winston';
import * as http from 'http';
import * as arg from 'arg';
import logger from './logger.js';

logger.log("info",'Programm started');


interface Arguments{
 list: Boolean;
 all:Boolean;
 help: Boolean;
 verbose: Boolean;
 name:String;
 message ?: String;
};





const args = arg({
	'--list' : Boolean,
	'--all' : Boolean,
	'--help' : Boolean,
	'--verbose': Boolean,
	'--name' : String,
	'-h' : '--help',
	'-v' : '--verbose'
});

for (const [key,value] of Object.entries(args)) {
	logger.log("verbose",key + ' : ' + value)
};

const argsInterface = check_arg(args);
if (argsInterface.message && argsInterface.message.length > 0 ){
	throw Error(String(argsInterface.message))
}

if (argsInterface.verbose){
	logger.level = 'verbose';
}

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


 function check_arg(arg:arg.Result<any>): Arguments{

  let fargs : Arguments = {list:false,all:false,help:false,verbose:false,name:''};
  if (Object.keys(arg).length=== 1){
	fargs.message = 'Missing arguments';
  }
  for (const [key,value] of Object.entries(arg)) {
	switch (key){
      case '--list': fargs.list = true;
	  break;
	  case '--all': fargs.all = true;
	  break;
	  case '--help': fargs.help = true;
	  break;
	  case '--verbose': fargs.verbose = true;
	  break;
	  case '--name': 
	  if (typeof(value) === 'string'){
		fargs.name = value;
	  }
	  

	  break;

	}

	


// when name is set all other options must be false
 if (fargs.name.length > 0 ){
     if (fargs.list || fargs.all || fargs.help ){
		fargs.message = 'Please provide only maze name'
		return fargs;
	 }
 }

 if ( (fargs.list && (fargs.all || fargs.help))||
     (fargs.all && (fargs.list || fargs.help)) ||
	  (fargs.help && (fargs.list||fargs.all)) ){
      fargs.message = 'Please provide only one parameter'
	return fargs;
	  }


};

  return fargs;
  
}
 
 