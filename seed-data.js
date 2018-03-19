const fs = require('fs');
const politicians = fs.readFileSync('./politicians.csv', 'utf8')
const votes = fs.readFileSync('./votes.csv', 'utf8');
const voters = fs.readFileSync('./voters.csv', 'utf8')
const setup = require('./setup.js');
const sqlite3 = require('sqlite3').verbose();
var argv = process.argv;
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

function showPoliticianTable() {
  var split = politicians.trim().split('\n');
  for (var i = 1; i < split.length; i++) {
    var splitting = split[i].split(',')
    db.run(`INSERT INTO Politicians (name, party, location, grade_current) VALUES
    ('${splitting[0]}', '${splitting[1]}', '${splitting[2]}', '${splitting[3]}')`)
  }
}

function showVotersTable() {
  var split = voters.trim().split('\n');
  for (var i = 1; i < split.length; i++) {
    var splitting = split[i].split(',')
    db.run(`INSERT INTO Voters (first_name, last_name, gender, age) VALUES
    ('${splitting[0]}', '${splitting[1]}', '${splitting[2]}', ${splitting[3]})`)
  }
}

function showVotesTable() {
  var split = votes.trim().split('\n');
  for (var i = 1; i < split.length; i++) {
    var splitting = split[i].split(',')
    db.run(`INSERT INTO votes (voterID, politicianId) VALUES
    ('${splitting[0]}', '${splitting[1]}')`)
  }
}

function updateData(first_name, last_name, gender, age) {
  db.run(`UPDATE voters
         SET first_name = '${first_name}',
         last_name = '${last_name}',
         gender = '${gender}',
         age = '${age}'
         WHERE id = 3`)
}

function deleteData() {
  db.run(`DELETE FROM voters
      WHERE id = 2`)
}

db.run(`SELECT * FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`)

// updateData('asdsa', 'werwew', 'm', '23')
// deleteData()
// showVotesTable()
showPoliticianTable()
// showVotersTable()
