import * as http from 'http';
import * as winston from 'winston';

const logger = winston.loggers.get('sh2fileLogger');








const req = (path:string):Promise<string>=>{
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
			 let rawData:string ='';
			 
			 res.on('data',(chunk:string)=>{
				rawData += chunk;
			 });
			 
			 res.on('end',()=>{
			  logger.verbose(`Request finished: Received :${ rawData.length } chars` );
			  resolve(rawData);
			   
			
			
			})
		})
		req.on('error',(err)=>{
			logger.error("DB returns error ");
			reject(err);


			
		})
		 req.end();
})
}

export default req;