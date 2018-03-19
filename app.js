const argv = process.argv

const Controller = require('./controller/Controller.js')

let execute = new Controller(argv[2],argv[3])

execute.execute()
