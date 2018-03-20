//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Pool.db');

class CreateTable{
  static Politician(){
    let query = `CREATE TABLE IF NOT EXISTS POLITICIANS
                      ( Candidate_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Name varchar(50),
                        Party varchar(50),
                        Location varchar(50),
                        Grade_Current real);`
    db.run(query,(err, tablePoliticaians) => {
      if(err){
        console.log(err)
      }
      else {
        console.log('Table Politicians has created')
      }
    })
    db.close()
  }

  static Voter(){
    let query = `CREATE TABLE IF NOT EXISTS VOTERS
                    ( Voter_id INTEGER PRIMARY KEY AUTOINCREMENT,
                      First_name varchar(50),
                      Last_name varchar(50),
                      Gender varchar(2),
                      Age varchar(3));`
    db.run(query,(err, tableVoter) => {
      if(err){
        console.log(err)
      }
      else {
        console.log('Table Voters has created')
      }

    })
    db.close()
  }

  static Votes(){
    let query = `CREATE TABLE IF NOT EXISTS VOTES
                  ( Votes_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Voter_id varchar(50),
                    Politician_id varchar(50));`
    db.run(query,(err, tableVotes) => {
      if(err){
        console.log(err)
      }
      else {
        console.log('Table Votes has created')
      }
    })
    db.close()
  }
}
// CreateTable.Politician()
// CreateTable.Voter()
CreateTable.Votes()
