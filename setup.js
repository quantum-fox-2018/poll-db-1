//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

db.serialize(function(err) {
  if(err) {
    console.log(err);
  }

  db.run(`CREATE TABLE IF NOT EXISTS Politicians
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          party VARCHAR(10),
          location VARCHAR(10),
          grade_current REAL)`);

  db.run(`CREATE TABLE IF NOT EXISTS Voters
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name VARCHAR(50),
          last_name VARCHAR(10),
          gender VARCHAR(10),
          age INTEGER)`);

  db.run(`CREATE TABLE IF NOT EXISTS Votes
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          politiciansId INTEGER REFERENCES Politicians(id),
          votersId INTEGER REFERENCES Voters(id))`);
});

db.close();
