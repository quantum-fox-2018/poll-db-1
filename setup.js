const fs= require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


//RELEASE0
/*
CREATE TABLE Politicians (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50),
  party VARCHAR(50),
  location VARCHAR(255),
  grade_current FLOAT
);

CREATE TABLE Votes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  voterId INT,
  politicianId INT
);

CREATE TABLE Voters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  gender VARCHAR(255),
  age INT
);
*/

//RELEASE1
db.serialize(function(){
  // fs.readFile('politicians.csv', 'utf8', (err, data) => {
  //   let arrPoliticians = data.split("\n");
  //   let insertData = db.prepare('INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)');
  //
  //   for(let i=1; i<arrPoliticians.length; i++){
  //     dataPolitician = arrPoliticians[i].split(",");
  //     insertData.run([dataPolitician[0], dataPolitician[1], dataPolitician[2], dataPolitician[3]])
  //   }
  //   insertData.finalize();
  //   db.close();
  //   // console.log(arrPoliticians.length);
  // });

  // fs.readFile('votes.csv', 'utf8', (err, data) => {
  //   let dataVotes = data.split("\n");
  //   let insertVotes = db.prepare(`INSERT INTO Votes VALUES (Null,?,?)`);
  //
  //   for(let i=1; i<dataVotes.length; i++){
  //     let recordVotes = dataVotes[i].split(",")
  //     insertVotes.run([recordVotes[0], recordVotes[1]])
  //   }
  //   insertVotes.finalize();
  //   db.close()
  //   // console.log(dataVotes);
  // });

  // db.each("SELECT * FROM Votes", (err, rows) => {
  //     if(err){
  //       console.log(err);
  //     }else{
  //       console.log(rows);
  //     }
  // });

  // db.each("SELECT * FROM Politicians", (err, rows) => {
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log(rows);
  //   }
  // });

  // fs.readFile('voters.csv', 'utf8', (err, data) => {
  //   let dataVoters = data.split("\n");
  //
  //   let insertVoters = db.prepare(`INSERT INTO voters VALUES(Null, ?, ?, ?, ?)`);
  //   for(let i=1; i< dataVoters.length; i++){
  //     let recordVoters = dataVoters[i].split(",");
  //     insertVoters.run([recordVoters[0], recordVoters[1], recordVoters[2], recordVoters[3]])
  //   }
  //   insertVoters.finalize()
  //   db.close()
  //   // console.log(data);
  // });

  // db.each("SELECT * FROM voters", (err, rows) => {
  //     if(err){
  //       console.log(err);
  //     }else{
  //       console.log(rows);
  //     }
  // });

  db.all("SELECT first_name, last_name, gender, age FROM Voters JOIN Votes WHERE Voters.id = Votes.voterId AND Votes.politicianId = (SELECT id FROM Politicians WHERE name = 'Olympia Snowe');", (err, rows) => {
    if(err){
      console.log(err);
    }else{
      console.log(rows);
    }
  });

});

/*RELEASE 2
1. Insert data ke tabel
INSERT INTO Politicians VALUES (Null, 'Draco James', 'A', 'JKT', 9.7832748324832);

2. Update data berdasar Id data
UPDATE Politicians SET party = 'BC' WHERE id = 44;

3. Delete data berdasar id data
DELETE FROM Politicians WHERE id = 43

//RELEASE 3
1. SELECT name, party, grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;

2.SELECT COUNT(*) AS 'TotalVote', Politicians.name  FROM Politicians JOIN Votes ON Politicians.id = politicianId WHERE Politicians.name = 'Olympia Snowe';

3. SELECT name, (SELECT count(*) FROM Votes WHERE Votes.PoliticianId = Politicians.id ) AS totalVote FROM Politicians WHERE name LIKE 'Adam %';

4. SELECT (SELECT count(*) FROM Votes WHERE Votes.PoliticianId = Politicians.id ) AS totalVote, name, party, location FROM Politicians ORDER BY totalVote Desc LIMIT 3 ;

5. SELECT first_name, last_name, gender, age FROM Voters JOIN Votes WHERE Voters.id = Votes.voterId AND Votes.politicianId = (SELECT id FROM Politicians WHERE name = 'Olympia Snowe');
*/
