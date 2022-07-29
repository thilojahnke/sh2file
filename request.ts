import * as http from 'http';
import * as winston from 'winston';

const logger = winston.loggers.get('sh2fileLogger');








const req = (path:string)=>{
	logger.verbose(`Request path: ${path}`);
    return  new Promise((resolve,reject)=>{
		
		let dbOptions  = {
			hostname: 'localhost',
			port: 3000,
			path: path,
			method: 'GET'
			};
			
			
			//dbOptions.path = path;
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
			  const received:string = JSON.stringify(parsedData);
			  logger.verbose(`Request finished: Received :${ received.length } chars` );
			  resolve(received);
			   
			
			
			})
		})



	
})
}




export default req;