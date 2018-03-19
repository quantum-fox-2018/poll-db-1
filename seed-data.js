const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');
const fs = require('fs');

fs.readFile('./politicians.csv','utf8', (err, data) => {
  if (err) throw err;
  var politicians = data.trim().split('\n');
  var arrPoliticians = []
  db.serialize(function() {
    for(var i =0; i < politicians.length; i++ ){
            var politiciansSplited = politicians[i].split(',')
            var tempArr = []
            tempArr.push(politiciansSplited[0],politiciansSplited[1],politiciansSplited[2],politiciansSplited[3])
            arrPoliticians.push(tempArr)
            // console.log(i, tempArr)
            if (i === 0){
                db.run(`CREATE TABLE politicians (
                          politicianId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                          name VARCHAR(25),
                          party VARCHAR(25),
                          location VARCHAR(25),
                          grade_current INTEGER
                        );`);
            } else {
              db.run(`INSERT INTO politicians (
                        name,
                        party,
                        location,
                        grade_current)
                    VALUES(
                      '${tempArr[0]}',
                      '${tempArr[1]}',
                      '${tempArr[2]}',
                      '${tempArr[3]}'
                    );`);
            }

    }
  });

    fs.readFile('./voters.csv','utf8', (err, data) => {
      if (err) throw err;
      var voters = data.trim().split('\n');
      var arrVoters = []
      db.serialize(function() {
        console.log(voters.length)
        for(var i =0; i < voters.length; i++ ){
                var votersSplited = voters[i].split(',')
                var tempArr = []
                tempArr.push(votersSplited[0],votersSplited[1],votersSplited[2],votersSplited[3])
                if (i === 0){
                    db.run(`CREATE TABLE voters (
                              voterId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                              first_name VARCHAR(25),
                              last_name VARCHAR(25),
                              gender VARCHAR(25),
                              age INTEGER
                            );`);
                } else {
                  db.run(`INSERT INTO voters (
                            first_name,
                            last_name,
                            gender,
                            age)
                        VALUES(
                          '${tempArr[0]}',
                          '${tempArr[1]}',
                          '${tempArr[2]}',
                          '${tempArr[3]}'
                        );`);
                }

        }
      });
      fs.readFile('./votes.csv','utf8', (err, data) => {
        if (err) throw err;
        var votes = data.trim().split('\n');
        var arrVotes = []
        db.serialize(function() {
          for(var i =0; i < votes.length; i++ ){
                  var votesSplited = votes[i].split(',')
                  var tempArr = []
                  tempArr.push(votesSplited[0],votesSplited[1],votesSplited[2],votesSplited[3])
                  if (i === 0){
                      db.run(`CREATE TABLE votes (
                                voterId INTEGER NOT NULL ,
                                politicianId INTEGER NOT NULL,
                                FOREIGN KEY(voterId) REFERENCES voters(voterId),
                                FOREIGN KEY(politicianId) REFERENCES voters(politicianId)
                              );`);
                  } else {
                    db.run(`INSERT INTO votes (
                              voterId,
                              politicianId)
                          VALUES(
                            '${tempArr[0]}',
                            '${tempArr[1]}'
                          );`);
                  }
          }
        });
        db.close();
      });
    });
});




// db.close();
