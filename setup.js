//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Pool.db');

db.serialize(function(){
  db.run(`CREATE TABLE KANDIDAT( Kandidat_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 Name varchar(50),
                                 Party varchar(50),
                                 Location varchar(50),
                                 Grade_Current varchar(50));`)

  db.run(`CREATE TABLE VOTE_VOTER( Vote_Voter_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                   Kandidat_id varchar(50),
                                   Voter_id varchar(50));`)

  db.run(`CREATE TABLE VOTER( Voter_id INTEGER PRIMARY KEY AUTOINCREMENT,
                              First_name varchar(50),
                              Last_name varchar(50),
                              Gender varchar(2),
                              Age varchar(3));`)

})

db.close()
