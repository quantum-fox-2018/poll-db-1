const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('poll-db-1.db');

db.all("SELECT * FROM politicians WHERE party = 'R' AND grade_curent > 9 AND grade_curent < 11 ", function (err, rows) {
  console.log(rows);
  console.log();
});


db.all(`SELECT COUNT(votes.politiciansId) AS totalVote,
        politicians.name FROM votes JOIN politicians WHERE politicians.name = 'Olympia Snowe' AND
        votes.politiciansId = politicians.id`, function (err, rows) {
        console.log(rows);
        console.log();
      });

db.all(`SELECT COUNT(votes.politiciansId) AS totalVote, politicians.name
              FROM politicians
              JOIN votes
              WHERE votes.politiciansId = politicians.id
              GROUP by politicians.name
              HAVING politicians.name like 'Adam %'`
            , function (err, rows) {
              console.log(rows);
              console.log();
     });

db.all(`SELECT COUNT(votes.politiciansId) AS totalVote, politicians.name, politicians.party,politicians.location
             FROM votes
             JOIN politicians
             ON politicians.id = votes.politiciansId
             GROUP by politicians.id
             ORDER by totalVote DESC limit 3`
           , function (err, rows) {
             console.log(rows);
             console.log();
    });

db.all(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age
              FROM voters
              JOIN votes ON votes.votersId = voters.id
              JOIN politicians ON politicians.id = votes.politiciansId
              WHERE politicians.name = "Olympia Snowe"`
            , function (err, rows) {
              console.log(rows);
              console.log();
     });
