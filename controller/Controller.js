const Views = require('../views/Views.js')
const Model = require('../model/Model.js')

class Controller {
  constructor(command,content) {
    this.command = command,
    this.content = content
  }

  execute(){
    if(this.command==undefined){
      Views.ifUndefined()
    } else if(this.command=='help'){
      Views.help()
    } else if(this.command=='insert'){
      Model.insertData(this.content,Views.insertData)
    }
  }
}

module.exports = Controller
