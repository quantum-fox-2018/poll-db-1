const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');

class insert{

 static inserPoliticians(name, party, location, grade_current){
   db.run('INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)', name, party, location, grade_current);
   console.log('new Politician data has been inserted');
 }

 static insertVoter(first_name, last_name, gender, age){
   db.run('INSERT INTO Voters VALUES (NULL, ?, ?, ?, ?)', first_name, last_name, gender, age)
    console.log('new voters data has been inserted')
 }

}

//insert.inserPoliticians('faldhi','PSP','CNR','9.000002')
//insert.insertVoter('Andi','Dona','L','25')



class update{
  static updatePoliticians( name, party, address, grade_current, Politicians_id){
    db.run(`UPDATE Politicians SET name = ?, party = ?, address = ?, grade_current = ? WHERE Politicians_id = ?`, name, party, address, grade_current, Politicians_id);
    console.log('data table ');
  }
}

//update.updatePoliticians('ahmad dani','PMR','cinere','008.999',21)

class Delete{
   static deleteVoter(voters_id){
     db.run(`DELETE FROM Voters WHERE voters_id = ?`, voters_id);
     console.log('voters hasbeen deleted');
   }
}


//Delete.deleteVoter(90)



class GradeCurentRange{
  static queryGradecurrent(){
    db.all(`SELECT name, party, grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
  }

  static totalVote(){
    db.all(`SELECT COUNT(*) AS TotalVote, Politicians.name
                            FROM Votes
                            JOIN Politicians
	                          ON Politicians.Politicians_id = Votes.voters_id
                            WHERE Politicians.name = 'Olympia Snowe'`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
  }

  static AdamVote(){
    db.all(`SELECT Politicians.name, COUNT(*) AS TotalVote
                    FROM Politicians
                    JOIN Votes
                    ON Politicians.Politicians_id = Votes.voters_id
                    WHERE name LIKE 'Adam %'
                    GROUP BY Politicians.Politicians_id`, function(err, result){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(result);
                    }
                });
  }

  static threePoliticians(){
    db.all(`SELECT COUNT(Votes.Politicians_id) AS totalVote, Politicians.name, Politicians.party, Politicians.address
            FROM Politicians LEFT JOIN Votes on Politicians.Politicians_id = Votes.voters_id
            GROUP BY Politicians.Politicians_id
            ORDER BY totalVote Desc
            LIMIT 3`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
  }

  static olimpiavote(){
    db.all(`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
          FROM Voters
              JOIN Votes
                  ON Votes.voters_id = Voters.voters_id
              JOIN Politicians
                  ON Votes.Politicians_id = Politicians.Politicians_id
          WHERE Politicians.name = "Olympia Snowe"`, function(err, result){
              if(err){
                  console.log(err);
              }else{
                  console.log(result);
              }
          })

  }



}



//GradeCurentRange.queryGradecurrent()
//GradeCurentRange.totalVote()
//GradeCurentRange.AdamVote()
//GradeCurentRange.threePoliticians()
GradeCurentRange.olimpiavote()
