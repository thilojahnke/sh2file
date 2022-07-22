import * as winston from 'winston';


const logger = winston.createLogger({
	level: 'info',	
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.simple(),
		winston.format.colorize({all: true})
	),
		
	
	transports: [
		new winston.transports.Console()
	]
});

export default logger;