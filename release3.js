var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.all(`
  SELECT name, party, grade_current
  FROM Politicians
  WHERE party = 'R'
  AND grade_current BETWEEN 9 AND 11;
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 1=====');
      console.log(rows);
  });

  db.all(`
  SELECT COUNT(*) AS totalVote, Politicians.name
  FROM Votes
  JOIN Politicians
  ON Politicians.politicianId = Votes.politicianId
  WHERE Politicians.name = 'Olympia Snowe'
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 2=====');
      console.log(rows);
  });
  
  db.all(`
  SELECT Politicians.name, COUNT(*) AS totalVote
  FROM Votes
  JOIN Politicians
  ON Politicians.politicianId = Votes.politicianId
  GROUP BY Politicians.name
  HAVING Politicians.name LIKE "Adam%"
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 3=====');
      console.log(rows);
  });

  db.all(`
  SELECT COUNT(*) AS totalVote, Politicians.name, Politicians.party, Politicians.location
  FROM Votes
  JOIN Politicians
  ON Politicians.politicianId = Votes.politicianId
  GROUP BY Politicians.name
  ORDER BY totalVote DESC
  LIMIT 3`
  , function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 4=====');
      console.log(rows);
  });

  db.all(`
  SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
  FROM Voters
  JOIN Votes
  ON Votes.voterId = Voters.voterId
  JOIN Politicians
  ON Politicians.politicianId = Votes.politicianId
  WHERE Politicians.name = 'Olympia Snowe'
  `, function(err, rows) {
      if(err) throw err
      console.log('=====SOAL 5=====');
      console.log(rows);
  });
});

db.close();
