//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function() {

// db.run("CREATE TABLE Politicians (Politicians_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20),party VARCHAR(10),address VARCHAR(10),grade_current FLOAT)");
//
// db.run("CREATE TABLE Voters (voters_id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(20),last_name VARCHAR(20),gender VARCHAR(10), age FLOAT)");

// db.run("CREATE TABLE Votes (votes_id INTEGER PRIMARY KEY AUTOINCREMENT,voters_id VARCHAR(5),Politicians_id VARCHAR(5))");
// })

function insertDataPolitician(callback){
    readFilePolitician(function(dataPoliticians){
        newDataPoliticians = dataPoliticians.slice(1, dataPoliticians.length);
        for(let indexRow = 0; indexRow<newDataPoliticians.length; indexRow++){
            let arrRow = [];
            arrRow = newDataPoliticians[indexRow].split(',');
            db.run('INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)', arrRow[0], arrRow[1], arrRow[2], arrRow[3])
        }
    })
}

db.close()
