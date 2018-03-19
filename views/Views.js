const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('PollDB.db');

class Views {
  static ifUndefined(){
    console.log(`type 'node app.js help' for help`)
  }

  static help(){
    console.log(`type 'node app.js insert'`)
  }

  static insertData(input){
    console.log(input)
  }
}

module.exports = Views
