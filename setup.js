//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');


function insertDataPolitician(name, party,location,grade_current){
  db.serialize(function() {
    db.run(`INSERT INTO politicians (
              name,
              party,
              location,
              grade_current)
          VALUES(
            '${name}',
            '${party}',
            '${location}',
            '${grade_current}'
          );`);
  });
}

function insertDataVoters(first_name, last_name,gender,age){
  db.serialize(function() {
    db.run(`INSERT INTO voters (
              first_name,
              last_name,
              gender,
              age)
          VALUES(
            '${first_name}',
            '${last_name}',
            '${gender}',
            '${age}'
          );`);
  });
}

function insertDataVotes(voterId, politicianId){
  db.serialize(function() {
    db.run(`INSERT INTO votes (
              voterId,
              politicianId)
          VALUES(
            '${voterId}',
            '${politicianId}'
          );`);
  });
}

function updatePolitician(name, party,location,grade_current,idPolitician){
  db.serialize(function() {
    db.run(`UPDATE politicians SET
            name = '${name}',
            party = '${party}',
            location = '${location}',
            grade_current = '${grade_current}',
            WHERE politicianId = '${idPolitician}'`);
  });
}

function updateVoters(first_name, last_name,gender,age,idVoters){
  db.serialize(function() {
    db.run(`UPDATE voters SET
            first_name = '${first_name}',
            last_name = '${last_name}',
            gender = '${gender}',
            age = '${age}',
            WHERE voterId = '${idVoters}';`);
  });
}

function deletePolitician(id){
  db.serialize(function() {
    db.run(`DELETE FROM politicians
            WHERE
            politicianId = '${id}';`);
  });
  console.log('berhasil didelet');
}

function deleteVoters(id){
  db.serialize(function() {
    db.run(`DELETE FROM voters
            WHERE
            voterId = '${id}';`);
  });
}

// deletePolitician(20)

// db.serialize(function () {
//    const sqlite3 = require('sqlite3').verbose();
//    const db = new sqlite3.Database('./poll.db');
//     db.each(`SELECT * FROM politicians;`, function (err, table) {
//         console.log(table);
//         db.close();
//     });
// });

 db.serialize(function () {
      //Release 3 no 1
     db.each(`SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, function (err, rows) {
              console.log(rows);
     });
     //Release 3 no 2
     db.each(`SELECT COUNT(votes.politicianId) AS totalVote, politicians.name
            FROM votes
            JOIN politicians
            WHERE politicians.name = 'Olympia Snowe'
            AND
            votes.politicianId = politicians.politicianId`
            , function (err, rows) {
              console.log(rows);
     });
     //Release 3 no 3
     db.each(`SELECT COUNT(votes.politicianId) AS totalVote, politicians.name
              FROM politicians
              JOIN votes
              WHERE votes.politicianId = politicians.politicianId
              GROUP by politicians.name
              HAVING politicians.name like 'Adam %'`
            , function (err, rows) {
              console.log(rows);
     });
     //Release 3 no 4
     db.each(`SELECT COUNT(votes.politicianId) AS totalVote, politicians.name, politicians.party,politicians.location
              FROM votes
              JOIN politicians
              ON politicians.politicianId = votes.politicianId
              GROUP by politicians.politicianId
              ORDER by totalVote DESC limit 3`
            , function (err, rows) {
              console.log(rows);
     });
     //Release 3 no 5
     db.each(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age
              FROM voters
              JOIN votes ON votes.voterId = voters.voterId
              JOIN politicians ON politicians.politicianId = votes.politicianId
              WHERE politicians.name = "Olympia Snowe"`
            , function (err, rows) {
              console.log(rows);
     });
 });
 db.close();
// var argv =process.argv
//
// switch (argv[2]) {
//   case 'insertDataPolitician':
//     insertDataPolitician(argv[3],argv[4],argv[5],argv[6])
//     db.close();
//     break;
//   case 'insertDataVoters':
//     insertDataVoters(argv[3],argv[4],argv[5],argv[6])
//     db.close();
//     break;
//   case 'insertDataVotes':
//     insertDataVotes(argv[3],argv[4])
//     db.close();
//     break;
// }
