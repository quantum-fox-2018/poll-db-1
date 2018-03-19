//your code here

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('poll-db1.db');

db.serialize(function() {
  //CREATE table politicians
  db.run(`CREATE TABLE politicians (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(40), party VARCHAR(1), location VARCHAR(2),
          grade_current REAL);`);

  //CREATE table votes
  db.run(`CREATE TABLE votes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          voterID INTEGER, politicianId INTEGER);`);

  //CREATE table voters
  db.run(`CREATE TABLE voters (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name VARCHAR(30), last_name VARCHAR(30), gender VARCHAR(7),
          age INTEGER);`);

});



db.close();
