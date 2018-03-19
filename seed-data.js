const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./poll-db-1.db');


class Inputdb {
  constructor (){

  }

  static readPoliticians(callback){
    fs.readFile('politicians.csv', 'utf8', (err, data)=>{
      let politicians     = data.trim().split('\n');
      let arrPoliticians  = [];

      for(let i = 1; i < politicians.length; i++){
        let tmp = politicians[i].split(',');
        arrPoliticians.push(tmp);
      }

      for(let j = 0; j < arrPoliticians.length; j++){
        db.run(`INSERT INTO politicians (name, party, location, grade_current)
                VALUES ("${arrPoliticians[j][0]}", "${arrPoliticians[j][1]}",
                "${arrPoliticians[j][2]}", "${arrPoliticians[j][3]}")`);
      }

    })
  }

  static readVoters(callback){
    fs.readFile('voters.csv', 'utf8', (err, data)=>{
      let voters    = data.trim().split('\n');
      let arrVoters = [];

      for(let i = 1; i < voters.length; i++){
        let tmp = voters[i].split(',');
        arrVoters.push(tmp);
      }

      for(let j = 0; j < arrVoters.length; j++){
        db.run(`INSERT INTO voters (first_name, last_name, gender, age)
                VALUES ("${arrVoters[j][0]}", "${arrVoters[j][1]}",
                "${arrVoters[j][2]}", "${arrVoters[j][3]}")`)
      }

    })
  }

  static readVotes(callback){
    fs.readFile('votes.csv', 'utf8', (err, data)=>{
      let votes = data.split('\n');
      let arrVotes = [];

      for(let i = 1; i < votes.length; i++){
        let tmp = votes[i].split(',');
        arrVotes.push(tmp);
      }

      for(let j = 0; j < arrVotes.length; j++){
        db.run(`INSERT INTO votes (voterId, politicianId) VALUES ("${arrVotes[j][0]}", "${arrVotes[j][1]}")`)
      }

    })
  }

  static politicianPartyR(){
    db.each(`SELECT name, party, grade_current
            FROM politicians WHERE party = 'R'
            AND grade_current BETWEEN 9 AND 11`, function(err, row){
      console.log(row);
    })
  }

  static olympiaSnowe(){
    db.each(`SELECT count(*) AS totalVote, politicians.name
              FROM politicians JOIN votes ON politicians.id = votes.politicianId
              WHERE politicians.name = 'Olympia Snowe'`, function(err, row){
      console.log(row);
    })
  }

  static adam(){
    db.each(`SELECT politicians.name, count(*) AS totalVote
              FROM votes JOIN politicians ON votes.politicianID = politicians.id
              GROUP BY politicianID HAVING politicians.name LIKE 'Adam %'`, function(err, row){
      console.log(row);
    })

  }

  static mostVotes(){
    db.each(`SELECT count(*) AS totalVotes, politicians.name, politicians.party, politicians.location
              FROM votes JOIN politicians ON politicians.id = votes.politicianID
              GROUP BY politicianID ORDER BY totalVotes desc LIMIT 3`, function(err, row){
      console.log(row);
    })
  }

  static olympiaSnoweVoters(){
    db.each(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age
              FROM voters JOIN votes ON voters.id = votes.voterId
              WHERE politicianId = (SELECT politicians.id FROM politicians
              WHERE politicians.name = 'Olympia Snowe')`, function(err, row){
      console.log(row);
    })
  }
}


// Inputdb.readPoliticians();
// Inputdb.readVoters();
// Inputdb.readVotes();
// Inputdb.politicianPartyR();
// Inputdb.olympiaSnowe();
// Inputdb.adam();
// Inputdb.mostVotes();
Inputdb.olympiaSnoweVoters();
