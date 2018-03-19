//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // db.run(`CREATE TABLE Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), party VARCHAR(1), location VARCHAR(2), grade_current VARCHAR(15));`);
    // db.run(`CREATE TABLE Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), gender VARCHAR(1), age VARCHAR(3));`);
    db.run(`CREATE TABLE Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER);`);
});


db.close();