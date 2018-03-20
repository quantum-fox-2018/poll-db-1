const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('PollDB.db');

class Model {
  static readData(input,callback){
    if(input[0]=='politician'){
      db.all(`SELECT * FROM Politicians`,function(err,politicianData){
        if (err) throw err
        callback(input[0],politicianData)
      })
    } else if(input[0]=='voter'){
      db.all(`SELECT * FROM Voters`,function(err,voterData){
        if (err) throw err
        callback(input[0],voterData)
      })
    } else if(input[0]=='vote'){
      db.all(`SELECT Votes.votesId,
             Politicians.name,
             Voters.firstName||' '||Voters.lastName AS vName
             FROM Votes
             JOIN Politicians
              ON Votes.politicianId = Politicians.politicianId
             JOIN Voters
              ON Votes.voterId = Voters.votersId`,
        function(err,voteData){
        if (err) throw err
        callback(input[0],voteData)
      })
    }
  }

  static insertData(input,callback){
    if(input[0]=='politician'){
      let insertPolitician = db.prepare(`INSERT INTO Politicians (name,party,location,
        gradeCurrent) VALUES (?,?,?,?)`)
      insertPolitician.run(input[1],input[2],input[3],input[4])
      insertPolitician.finalize()
    } else if(input[0]=='voter'){
      let insertVoter = db.prepare(`INSERT INTO Voters (firstName,lastName,gender,
        age) VALUES (?,?,?,?)`)
      insertVoter.run(input[1],input[2],input[3],input[4])
      insertVoter.finalize()
    } else if(input[0]=='vote'){
      let insertVote = db.prepare(`INSERT INTO Votes (politicianId,voterId) VALUES (?,?)`)
      insertVote.run(input[1],input[2])
      insertVote.finalize()
    }
    callback(input[0])
  }

  static updateData(input,callback){
    if(input[0]=='politician'){
      db.run(`UPDATE Politicians SET ${input[2]} = ? WHERE politicianId = ?`,input[3],input[1])
    } else if(input[0]=='voter'){
      db.run(`UPDATE Voters SET ${input[2]} = ? WHERE votersId = ?`,input[3],input[1])
    } else if(input[0]=='vote'){
      db.run(`UPDATE Votes SET ${input[2]} = ? WHERE votesId = ?`,input[3],input[1])
    }
    callback(input[0],input[1])
  }

  static deleteData(input,callback){
    if(input[0]=='politician'){
      db.run(`DELETE FROM Politicians WHERE politicianId = ${input[1]}`)
    } else if(input[0]=='voter'){
      db.run(`DELETE FROM Voters WHERE votersId = ${input[1]}`)
    } else if(input[0]=='vote'){
      db.run(`DELETE FROM Votes WHERE votesId = ${input[1]}`)
    }
    callback(input[0],input[1])
  }
}

module.exports = Model
