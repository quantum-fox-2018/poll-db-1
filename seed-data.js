const fs = require('fs');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./Pool.db')

//============================================ RELEASE 1
class Import{
  static uploadPoliticians(){
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
          var query = `INSERT INTO POLITICIANS
                              ( Candidate_id, name, Party, Location, Grade_Current)
                        VALUES( null, ?, ?, ?, ?)`
          db.run(query,[`${arrNilai[0]}`, `${arrNilai[1]}`, `${arrNilai[2]}`, `${arrNilai[3]}`],(err, dataInsert) => {
            if(err){
              console.log(err)
            }
          })
        }
        console.log('Data Politicians in process...')
      }
      db.close()
    })
  }

  static uploadVoters(){
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
          var query = `INSERT INTO VOTERS
                              (Voter_id, First_name, Last_name, Gender, Age)
                       VALUES (null, ?, ?, ?, ?)`
          db.run(query,[`${arrNilai[0]}`, `${arrNilai[1]}`, `${arrNilai[2]}`, `${arrNilai[3]}`], (err, insertVoter) => {
            if(err){
              console.log(err)
            }
          })
        }
        console.log('Data Voters in process...')
      }
      db.close()
    })
  }

  static uploadVotes(){
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
        console.log(arrVotes)

        for(let j=1; j<arrVotes.length; j++){
          let arrNilai = arrVotes[j]
          var query = `INSERT INTO VOTES
                               ( Votes_id, Voter_id, Politician_id)
                        VALUES ( null, ?, ?)`
          db.run(query,[`${arrNilai[0]}`, `${arrNilai[1]}`], (err, insertVotes) => {
            if(err){
              console.log(err)
            }
          })
        }
        console.log('Data Votes in process...')
      }
      db.close()
    })

  }
}
// Import.uploadPoliticians()
// Import.uploadVoters()
// Import.uploadVotes()

//============================================ RELEASE 2

class Insert{
  static insertPolitican(name, Party, Loc, Grade_Current){
    var query = `INSERT INTO POLITICIANS(name, Party, Location, Grade_Current)
                    VALUES (?, ?, ?, ?)`
    db.run(query,[`${name}`, `${Party}`, `${Loc}`, `${Grade_Current}`])
    db.close()
  }

  static insertVoter(First_name, Last_name, Gender, Age){
    var query = `INSERT INTO VOTERS(First_name, Last_name, Gender, Age)
                    VALUES (?, ?, ?, ?)`
    db.run(query,`${First_name}`, `${Last_name}`, `${Gender}`, `${Age}`)
    db.close()
  }

  static insertVotes(Voter_id, Politician_id){
    var query = `INSERT INTO VOTES(Voter_id, Politician_id)
                    VALUES (?, ?)`
    db.run(query,`${Voter_id}`, `${Politician_id}`)
    db.close()
  }

}
// Insert.insertPolitican('81', 'yasir', 'R', 'NY', 8.3423424)
// Insert.insertVoter('MUHAMMAD', 'YASIR', 'L', 31)
// Insert.insertVotes(5,11)

class Update{
  static updatePolitican(par_id, par_name, par_party, loc, grade){
    var query = `UPDATE POLITICIANS SET name = '${par_name}',
                                        Party = '${par_party}',
                                        Location = '${loc}',
                                        Grade_Current = ${grade}
                                  WHERE Candidate_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static updateVoter(par_id, par_fname, par_lname, par_gender, par_age){
    var query = `UPDATE VOTERS SET  First_name = '${par_fname}',
                                    Last_name = '${par_lname}',
                                    Gender = '${par_gender}',
                                    Age = ${par_age}
                              WHERE Voter_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static updateVotes(par_VVid, par_Vid, par_Kid){
    var query = `UPDATE VOTES SET Voter_id = '${par_Vid}',
                                  Politician_id = '${par_Kid}'
                            WHERE Votes_id = ${par_VVid};`
    db.run(query)
    db.close()
  }

}
// Update.updatePolitican(21,'maulana', 'D', 'NY', 9.00000)
// Update.updateVoter(151,'yasir','maulana', 'male', 31)
// Update.updateVotes(164, 5, 12)

class Delete{
  static deletePolitican(par_id){
    var query = `DELETE FROM POLITICIANS WHERE Candidate_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static deleteVoter(par_id){
    var query = `DELETE FROM VOTERS WHERE Voter_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static deleteVotes(par_VVid){
    var query = `DELETE FROM VOTES  WHERE Votes_id = ${par_VVid};`
    db.run(query)
    db.close()
  }

}
// Delete.deletePolitican(27)
// Delete.deleteVoter(151)
// Delete.deleteVotes(164)

//============================================ RELEASE 3
class Select{
  static PartyRgrad911(){ //NO 1
    db.all(`SELECT name, party, grade_current
            FROM POLITICIANS
            WHERE party = ?
            AND grade_current between ? and ?;`,['R', 9, 11], (err, dataPartyR) => {
            if(err){
              console.log(err)
            }
            else {
              console.log(dataPartyR)
            }
          })
    db.close()
  }

  static TotVotOlympia(){ //NO 2
    db.all(`SELECT POLITICIANS.name, (SELECT COUNT(*) from VOTES WHERE VOTES.Politician_id = POLITICIANS.Candidate_id) as total_vote
            FROM POLITICIANS
            WHERE POLITICIANS.name = ?;`,['Olympia Snowe'],(err, dataTotVotOlympia) => {
            if(err){
              console.log(err)
            }
            else {
              console.log(dataTotVotOlympia)
            }
          })
  }

  static TigaPolTerbanyak(){ //NO 3
    db.all(`select (select count(*) from votes where votes.Politician_id = politicians.candidate_id )
                as totalVote ,name, party, location
            from politicians
            order by totalVote desc limit 3;`,(err, TigaPolTerbanyak) => {
            if(err){
              console.log(err)
            }
            else {
              console.log(TigaPolTerbanyak)
            }
          })
  }

  static VoterPilihOlympia(){ //NO 4
    db.all(`select voters.first_name, voters.last_name, voters.gender, voters.age
            from voters
            join votes on voters.voter_id = votes.voter_id
            join politicians on votes.politician_id = politicians.candidate_id
            where politicians.name = 'Olympia Snowe';`,(err, TigaPolTerbanyak) => {
            if(err){
              console.log(err)
            }
            else {
              console.log(TigaPolTerbanyak)
            }
          })
  }
}
// Select.PartyRgrad911()
// Select.TotVotOlympia()
// Select.TigaPolTerbanyak()
Select.VoterPilihOlympia()
