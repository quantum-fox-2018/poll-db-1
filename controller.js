const model = require('./models/index')

class Controller {
    static manageCommand(command, optionArray){
        if(command == 'add'){
            model.addPoliticians(optionArray[0],optionArray[1],optionArray[2],optionArray[3])
        } else if(command == 'edit'){
            console.log('ini edit')
        } else if(command == 'delete'){
            console.log('ini delete')
        }
    }
}

module.exports = Controller;