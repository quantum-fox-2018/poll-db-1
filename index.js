const Create = require('./create')
const Select = require('./select')
const Update = require('./update')
const Delete = require('./delete')
const View = require('./view')

let argv = process.argv
let syntax = argv[2]
let table = argv[3]
let value = argv.slice(4)
let value1 = value[0]
let value2 = value[1]
let value3 = value[2]
let value4 = value[3]

// console.log(syntax, table, value4)
if(syntax == 'select'){
    if(table == 'politicians'){
        Select.allPolitician(View.viewAllPolitician)
    }
    else if(table == 'voters'){
        Select.allVoter(View.viewAllVoter)
    }
    else if(table == 'votes'){
        Select.allVoting()
    }
    else{
        console.log('node index.js select <table_name>')
    }
}

else if(syntax == 'create'){
    if(table == 'politicians'){
        Create.createPolitician(value1, value2, value3, value4)
    }
    else if(table == 'voters'){
        Create.createVoter(value1, value2, value3, value4)
    }
    else if(table == 'votes'){
        Create.createVoting(value1, value2)
    }
    else{
        console.log('node index.js create <table_name>')
    }
}

else if(syntax == 'update'){
    if(table == 'politicians'){
        Update.updatePolitician(value1, value2)
    }
    else if(table == 'voters'){
        Update.updateVoter(value1, value2, value3)
    }
    else if(table == 'votes'){
        Update.updateVoting(value1, value2, value3)
    }
    else{
        console.log('node index.js update <table_name> <id>')
    }
}

else if(syntax == 'delete'){
    if(table == 'politicians'){
        Delete.deletePoltician(value1)
    }
    else if(table == 'voters'){
        Delete.deleteVoter(value1)
    }
    else if(table == 'votes'){
        Delete.deleteVoting(value1)
    }
    else{
        console.log('node index.js delete <table_name> <id>')
    }
}
