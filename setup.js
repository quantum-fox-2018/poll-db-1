const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS Politicians
          (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50),
          party VARCHAR(50), location VARCHAR(2),
          grade_current VARCHAR(25))`)

db.run(`CREATE TABLE IF NOT EXISTS Voters
        (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50),
        last_name VARCHAR(50), gender VARCHAR(2), age INT(3))
        `)

db.run(`CREATE TABLE IF NOT EXISTS Votes
      (id INTEGER PRIMARY KEY AUTOINCREMENT, voterID VARCHAR(3),
      politicianId VARCHAR(3))
      `)

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
