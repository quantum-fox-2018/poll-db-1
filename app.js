let argv = process.argv;

const Controller = require('./controller')

if(argv[2] == null){
    console.log('null')
} else {
    console.log(Controller.manageCommand(argv[2], argv.slice(3)))
}