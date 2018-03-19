/*jshint esversion:6*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.run(`CREATE TABLE IF NOT EXISTS politicians (id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20)NOT NULL, party VARCHAR(5) NOT NULL,location VARCHAR(5)NOT NULL,grade_current FLOAT REAL NOT NULL)`);

db.run(`CREATE TABLE IF NOT EXISTS voters (id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname VARCHAR(20)NOT NULL, lastname VARCHAR(20) NOT NULL,gender VARCHAR(10) NOT NULL,age INTEGER)`);

db.run(`CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT,
  votersID INTEGER, politiciansID INTEGER )`);


db.close();
