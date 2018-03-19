const fs = require('fs');

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./Pool.db')

db.serialize(function(){

  fs.readFile('./politicians.csv','utf8',(err, dataPoliticians) =>{
      if(err){
        console.log(err)
      }
      else {

        let arrPoliticians = []
        let Politicians = dataPoliticians.split('\n')
        for(let i=0; i<Politicians.length-1; i++){
          arrPoliticians.push(Politicians[i].split(','))
        }
        // console.log(arrPoliticians)

        for(let j=1; j<arrPoliticians.length; j++){
          let arrNilai = arrPoliticians[j]
          var query = `INSERT INTO KANDIDAT(Kandidat_id, name, Party, Location, Grade_Current)
                        VALUES (null, ?, ?, ?, ?)`
          db.run(query,`${arrNilai[0]}`, `${arrNilai[1]}`, `${arrNilai[2]}`, `${arrNilai[3]}`)
        }
      }

      db.close()
  })

  fs.readFile('./voters.csv','utf8',(err, dataVoters) =>{
      if(err){
        console.log(err)
      }
      else {

        let arrVoters = []
        let Voters = dataVoters.split('\n')
        for(let i=0; i<Voters.length-1; i++){
          arrVoters.push(Voters[i].split(','))
        }
        // console.log(arrVoters)

        for(let j=1; j<arrVoters.length; j++){
          let arrNilai = arrVoters[j]
          var query = `INSERT INTO VOTER(Voter_id, First_name, Last_name, Gender, Age)
                        VALUES (null, ?, ?, ?, ?)`
          db.run(query,`${arrNilai[0]}`, `${arrNilai[1]}`, `${arrNilai[2]}`, `${arrNilai[3]}`)
        }
      }
  db.close()
  })

  fs.readFile('./votes.csv','utf8',(err, dataVotes) =>{
      if(err){
        console.log(err)
      }
      else {

        let arrVotes = []
        let Votes = dataVotes.split('\n')
        for(let i=0; i<Votes.length-1; i++){
          arrVotes.push(Votes[i].split(','))
        }
        // console.log(arrVotes)

        for(let j=1; j<arrVotes.length; j++){
          let arrNilai = arrVotes[j]
          var query = `INSERT INTO VOTE_VOTER(Vote_Voter_id, Kandidat_id, Voter_id)
                        VALUES (null, ?, ?)`
          db.run(query,`${arrNilai[0]}`, `${arrNilai[1]}`)
        }
      }

      db.close()
  })

})
