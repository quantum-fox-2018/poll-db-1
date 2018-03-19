const fs = require('fs');
const modelPoliticians = require('./model_politicians')

class Model {
    static addPoliticians(name,party,location,grade_current){
        let data = fs.readFileSync('./politicians.csv', 'utf8');
        let dataArray = data.split('\n')
        
        console.log('tambah berhasil')
    }
}

module.exports = Model;