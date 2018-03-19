//your code here
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./pemilu.db');

db.serialize(()=>{
  db.run('DROP TABLE IF EXISTS politicians',
  err=>{
    if(err) console.log(err);
  })
  db.run('DROP TABLE IF EXISTS voters',
  err=>{
    if(err) console.log(err);
  })
  db.run('DROP TABLE IF EXISTS votes',
  err=>{
    if(err) console.log(err);
  })
  db.run('CREATE TABLE IF NOT EXISTS politicians (politicianId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,party TEXT,location TEXT,grade_current INTEGER)',
  err=>{
    if(err) console.log(err);
  })

  db.run('CREATE TABLE IF NOT EXISTS voters (voterId INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT,last_name TEXT,gender TEXT,age INTEGER)',
  err=>{
    if(err) console.log(err);
  })

  db.run('CREATE TABLE IF NOT EXISTS votes (voteId INTEGER PRIMARY KEY AUTOINCREMENT,voterId INTEGER, politicianId INTEGER)',
  err=>{
    if(err) console.log(err);
  })

})

db.close();
