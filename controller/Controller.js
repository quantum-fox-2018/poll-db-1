const Views = require('../views/Views.js')

class Controller {
  constructor(command,content) {
    this.command = command,
    this.content = content
  }

  execute(){
    if(this.command==undefined){
      Views.ifUndefined()
    } else if(this.command=='help'){
      
    }
  }
}

module.exports = Controller
