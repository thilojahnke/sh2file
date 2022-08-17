import {writeFile} from 'fs/promises';
import {Buffer} from 'buffer';
import * as path from 'path';
import {existsSync} from 'node:fs';
import * as winston from 'winston';
const logger = winston.loggers.get('sh2fileLogger');

function writer(filecontent:string, filename:string, filepath='./'  ){
try {
// if path doesn't exits then reject 



const mazepath = path.resolve(filepath,filename);

  if (filepath){
    if (!existsSync(filepath)){
        throw new Error(`path doesn't exits and will never be created`);
    }
  }
    
    
    
     
    
    //const data = new Uint8Array(Buffer.from('Hello Node.js'));
    const promise = writeFile('message.txt', filecontent ,{});
    
    return promise;
} catch (err) {

    console.error(err);
}
}
//writer("Hello Node","myFirstMaze.txt");


export default writer;

