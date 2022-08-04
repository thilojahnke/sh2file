import * as winston from 'winston';


/* ---------------------- logger --------------------*/

// hello hello hello hello

const logger = winston.loggers.add('sh2fileLogger',
{ level: 'info',	
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.simple(),
		winston.format.colorize({all:true})
	),
		
	
	transports: [
		new winston.transports.Console()
	]
});


export default logger;