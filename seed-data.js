const fs = require('fs');


//============================================ RELEASE 2
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./Pool.db')

class Insert{
  static insertPolitican(id, name, Party, Loc, Grade_Current){
    var query = `INSERT INTO KANDIDAT(Kandidat_id, name, Party, Location, Grade_Current)
                    VALUES (null, ?, ?, ?, ?)`
    db.run(query,`${name}`, `${Party}`, `${Loc}`, `${Grade_Current}`)
    db.close()
  }

  static insertVoter(Voter_id, First_name, Last_name, Gender, Age){
    var query = `INSERT INTO KANDIDAT(Voter_id, First_name, Last_name, Gender, Age)
                    VALUES (null, ?, ?, ?, ?)`
    db.run(query,`${First_name}`, `${Last_name}`, `${Gender}`, `${Age}`)
    db.close()
  }

  static insertVotes(Vote_Voter_id, Kandidat_id, Voter_id){
    var query = `INSERT INTO KANDIDAT(Vote_Voter_id, Kandidat_id, Voter_id)
                    VALUES (null, ?, ?)`
    db.run(query,`${Kandidat_id}`, `${Voter_id}`)
    db.close()
  }

}
// Insert.insertPolitican('81', 'yasir', 'R', 'NY', 8.3423424)

class Update{
  static updatePolitican(par_id, par_name, par_party, loc, grade){
    var query = `UPDATE KANDIDAT  SET   name = '${par_name}',
                                        Party = '${par_party}',
                                        Location = '${loc}',
                                        Grade_Current = ${grade}
                                  WHERE Kandidat_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static updateVoter(par_id, par_fname, par_lname, par_gender, par_age){
    var query = `UPDATE VOTER SET  Frist_name = '${par_fname}',
                                    Last_name = '${par_lname}',
                                    Gender = '${par_gender}',
                                    Age = ${par_age}
                              WHERE Voter_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static updateVotes(par_VVid, par_Kid, par_Vid){
    var query = `UPDATE VOTE_VOTER  SET Kandidat_id = '${par_Kid}',
                                        Voter_id = '${par_Vid}',
                                  WHERE Vote_Voter_id = ${par_VVid};`
    db.run(query)
    db.close()
  }

}
// Update.updatePolitican(61,'maulana', 'D', 'NY', 9.00000)

class Delete{
  static deletePolitican(par_id){
    var query = `DELETE FROM KANDIDAT WHERE Kandidat_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static deleteVoter(par_id){
    var query = `DELETE FROM VOTER WHERE Voter_id = ${par_id};`
    db.run(query)
    db.close()
  }

  static deleteVotes(par_VVid, par_Kid, par_Vid){
    var query = `DELETE FROM VOTE_VOTER  WHERE Vote_Voter_id = ${par_VVid};`
    db.run(query)
    db.close()
  }

}
// Delete.deletePolitican(81)


//============================================ RELEASE 3
class Select{
  static PartyRgrad911(){ //NO 1
    db.all(`SELECT name, party, grade_current
            FROM kandidat
            WHERE party = ?
            AND grade_current between ? and ?;`,['R', 9, 11], (err, dataPartyR) => {
            if(err) throw err;
            else {
              console.log(dataPartyR)
            }
          })
    // db.close()
  }
}
Select.PartyRgrad911()
