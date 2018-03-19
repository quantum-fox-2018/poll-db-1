//your code here

/*jshint esversion:6*/

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('polling.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS Voters (
        voter_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        gender VARCHAR(10) NOT NULL,
        age INTEGER NOT NULL
      )`);
db.run(`CREATE TABLE IF NOT EXISTS Candidates (
        candidate_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        candidate_name TEXT NOT NULL,
        party VARCHAR(2) NOT NULL,
        location VARCHAR(3) NOT NULL,
        grade_current REAL NOT NULL
      )`);
db.run(`CREATE TABLE IF NOT EXISTS Votes (
        vote_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        voter_id INTEGER NOT NULL,
        candidate_id INTEGER NOT NULL,
        FOREIGN KEY (voter_id) REFERENCES Voters(voter_id),
        FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
      )`);

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
