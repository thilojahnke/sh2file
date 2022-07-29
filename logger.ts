import * as winston from 'winston';


/* ---------------------- logger --------------------*/

/*const logger = winston.createLogger({
	level: 'info',	
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.simple(),
		winston.format.colorize({all: true})
	),
		
	
	transports: [
		new winston.transports.Console()
	]
});*/

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