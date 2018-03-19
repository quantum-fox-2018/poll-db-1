//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(function(){

  CREATE TABLE

  let createTablePoliticiansQuery = `CREATE TABLE politicians
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(50),
                party VARCHAR(50),
                location VARCHAR(50),
                grade_current INTEGER
              )`

  db.run(createTablePoliticiansQuery)

  let createTableVotersQuery = `CREATE TABLE voters
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                gender VARCHAR(10),
                age VARCHAR(5)
              )`

  db.run(createTableVotersQuery)

  let createTableVotesQuery = `CREATE TABLE votes
              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                voterId VARCHAR(15),
                politicianId VARCHAR(15)
              )`

  db.run(createTableVotesQuery)

})
db.close()
