const model = require('./models/index')

class Controller {
    static manageCommand(command, optionArray){
        if(command == 'addPoliticians'){
            model.addPolitician(optionArray[0],optionArray[1],optionArray[2],optionArray[3])
        } else if(command == 'editPoliticians'){
            model.editPolitician(optionArray[0],optionArray[1],optionArray[2],optionArray[3],optionArray[4])
        } else if(command == 'deletePoliticians'){
            model.deletePolitician(optionArray[0])
        } else if(command == 'addVoter'){
            model.addVoter(optionArray[0],optionArray[1],optionArray[2],optionArray[3])
        } else if(command == 'editVoter'){
            model.editVoter(optionArray[0],optionArray[1],optionArray[2],optionArray[3],optionArray[4])
        } else if(command == 'deleteVoter'){
            model.deleteVoter(optionArray[0])
        } else if(command == 'addVote'){
            model.addVote(optionArray[0],optionArray[1])
        } else if(command == 'editVote'){
            model.editVote(optionArray[0],optionArray[1],optionArray[2])
        } else if(command == 'deleteVote'){
            model.deleteVote(optionArray[0])
        }
    }
}

module.exports = Controller;
