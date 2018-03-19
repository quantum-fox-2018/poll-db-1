//your code here
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.run("CREATE TABLE Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), party VARCHAR(10), location VARCHAR(10), grade_current REAL)");

  db.run("CREATE TABLE Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(30), last_name VARCHAR(30), gender VARCHAR, age INTEGER)");

  db.run("CREATE TABLE Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER)");
});

db.close();
