//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');
 
db.serialize(function() {
  db.run("DROP TABLE IF EXISTS Politicians");
  db.run("DROP TABLE IF EXISTS Voters");
  db.run("DROP TABLE IF EXISTS Votes");

  db.run("CREATE TABLE Politicians (politicianId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current INTEGER)");
  db.run("CREATE TABLE Voters (voterId INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER)");
  db.run("CREATE TABLE Votes (voteId INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY (voterId) REFERENCES Voters (voterId), FOREIGN KEY (politicianId) REFERENCES Politicians (politicianId))");

  console.log('Table Politicians, Table Voters, Table Votes berhasil dibuat!')
});
 
db.close();