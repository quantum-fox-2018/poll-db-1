//your code here
const sqlite = require('sqlite3');
const db = new sqlite.Database('database.db');
let fs = require('fs');

function getPoliticians(namaFile, callback) {
  fs.readFile(namaFile, 'utf8', function(err, data) {
    var splitted = data.trim().split('\n');
    var arrData = [];
    for(var i = 0; i < splitted.length; i++) {
      var splitted2 = splitted[i].split(',');
      arrData.push(splitted2);
    }
    callback(arrData);
  });
}

function getVoters(namaFile, callback) {
  fs.readFile(namaFile, 'utf8', function(err, data) {
    var splitted = data.trim().split('\n');
    var arrData = [];
    for(var i = 0; i < splitted.length; i++) {
      var splitted2 = splitted[i].split(',');
      arrData.push(splitted2);
    }
    callback(arrData);
  });
}

function getVotes(namaFile, callback) {
  fs.readFile(namaFile, 'utf8', function(err, data) {
    var splitted = data.trim().split('\n');
    var arrData = [];
    for(var i = 0; i < splitted.length; i++) {
      var splitted2 = splitted[i].split(',');
      arrData.push(splitted2);
    }
    callback(arrData);
  });
}

function addPoliticians(data) {
  //console.log(data);
  db.serialize(function() {
    db.run(
      'CREATE TABLE IF NOT EXISTS politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), party VARCHAR(5), location VARCHAR(10), grade_current REAL)'
    );
    for(var i = 1; i < data.length; i++) {
      db.run(
        'INSERT INTO politicians (id, name, party, location, grade_current) VALUES (NULL, ?, ?, ?, ?)',
        data[i][0], data[i][1], data[i][2], data[i][3]
      );
    }
  });
  // db.close();
}

function addVoters(votersData) {
  // console.log(votersData);
  db.serialize(function() {
    db.run('CREATE TABLE IF NOT EXISTS voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), gender VARCHAR(6), age VARCHAR(2))');
    for(var i = 1; i < votersData.length; i++) {
      db.run(
        'INSERT INTO voters (id, first_name, last_name, gender, age) VALUES (NULL, ?, ?, ?, ?)',
        votersData[i][0], votersData[i][1], votersData[i][2], votersData[i][3]
      );
    }
  });
  // db.close();
}

function addVotes(votesData) {
  db.serialize(function() {
    db.run(
      'CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voter_id INTEGER, politician_id INTEGER)'
    );
    for(var i = 1; i < votesData.length; i++) {
      db.run(
        'INSERT INTO votes (id, voter_id, politician_id) VALUES (NULL, ?, ?)',
        votesData[i][0], votesData[i][1]
      );
    }
  });
}

// SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;

// SELECT COUNT(*) AS 'totalVote', politicians.name FROM politicians LEFT JOIN votes ON politician_id = politicians.id WHERE votes.politician_id = 17;

// SELECT name, (SELECT COUNT(*) FROM votes WHERE votes.politician_id = politicians.id) AS 'totalVote' FROM politicians WHERE name LIKE 'Adam %';

// SELECT (SELECT COUNT(*) FROM votes WHERE votes.politician_id = politicians.id) AS 'totalVotes', name, party, location FROM politicians ORDER BY totalVotes Desc LIMIT 3;

// SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM votes JOIN voters ON voters.id = votes.voter_id WHERE politician_id = (SELECT id FROM politicians WHERE name = 'Olympia Snowe'); 
getPoliticians('politicians.csv', addPoliticians);
getVoters('voters.csv', addVoters);
getVotes('votes.csv', addVotes);
