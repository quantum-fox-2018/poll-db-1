//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

db.serialize((err)=>{
  if(err){
    console.log(err)
  }
  console.log('Successfully connected to poll.db')

  db.run('CREATE TABLE IF NOT EXISTS Politicians (politician_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, location TEXT NOT NULL, grade_current REAL NOT NULL)');
  db.run('CREATE TABLE IF NOT EXISTS Voters (voter_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT, gender TEXT NOT NULL, age INTEGER NOT NULL)');
  db.run('CREATE TABLE IF NOT EXISTS Votes (voting_id INTEGER PRIMARY KEY AUTOINCREMENT, voter_id INTEGER NOT NULL, politician_id INTEGER NOT NULL, FOREIGN KEY (politician_id) REFERENCES Politicians(politician_id), FOREIGN KEY (voter_id) REFERENCES Voters(voter_id))');

})

db.close((err) => {
  if(err){
    console.log(err)
  }
  console.log('Close database poll.db connection')
})