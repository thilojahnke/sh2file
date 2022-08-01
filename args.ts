
import * as arg from 'arg';
/* ---------------------- arguments --------------------*/
interface Arguments{
    list: boolean;
    all:boolean;
    help: boolean;
    verbose: boolean;
    version: boolean;
    name:String;
    message ?: String;
   };






 const progArgs = {
    check_arg: check_arg
 };

 function check_arg(arg:arg.Result<any>): Arguments{

    let fargs : Arguments = {list:false,all:false,help:false,verbose:false,version:false, name:''};
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
        case '--version': fargs.version = true;
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
  
   if ( (fargs.list && (fargs.all || fargs.help || fargs.version ))||
       (fargs.all && (fargs.list || fargs.help || fargs.version )) ||
       (fargs.version &&(fargs.list || fargs.help || fargs.all )) ||
        (fargs.help && (fargs.list||fargs.all || fargs.version )) ){
        fargs.message = 'Please provide only one parameter'
      return fargs;
        }
  
  
  };
  
    return fargs;
    
  }

  export default progArgs;