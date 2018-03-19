const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('PollDB.db');

class Model {
  // static basicInput(){
  //
  // }

  static insertData(input,callback){
    db.serialize(function(){
      if(input[0]=='politician'){
        let insertPolitician = db.prepare(`INSERT INTO Politicians (name,party,location,
          gradeCurrent) VALUES (?,?,?,?)`)
        insertPolitician.run(input[1],input[2],input[3],input[4])
        insertPolitician.finalize()
        db.each(`SELECT * FROM Politicians`,function(err, rows){
          callback(rows)
        })
      } else if(input[0]=='voter'){
        let insertVoter = db.prepare(`INSERT INTO Voters (firstName,lastName,gender,
          age) VALUES (?,?,?,?)`)
        insertVoter.run(input[1],input[2],input[3],input[4])
        insertVoter.finalize()
        db.each(`SELECT * FROM Voters`,function(err, rows){
          callback(rows)
        })
      } else if(input[0]=='vote'){
        let insertVote = db.prepare(`INSERT INTO Votes (politicianId,voterId) VALUES (?,?)`)
        insertVote.run(input[1],input[2])
        insertVote.finalize()
        db.each(`SELECT * FROM Votes`,function(err, rows){
          callback(rows)
        })
      }
    })
    db.close()
  }
}

module.exports = Model
