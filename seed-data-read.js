/*jshint esversion:6*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('polling.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class DataImport {
  static dataCandidates() {
    fs.readFile('./politicians.csv', 'utf8', (err, data) => {
      let dataCandidate = data.trim().split('\n').map(x => x.split(',')).splice(1);
      for (let i = 0; i < dataCandidate.length; i++) {

        let valueData1 = dataCandidate[i][0];
        let valueData2 = dataCandidate[i][1];
        let valueData3 = dataCandidate[i][2];
        let valueData4 = dataCandidate[i][3];
        db.run(`INSERT INTO Candidates (candidate_id, candidate_name, party, location, grade_current) VALUES (
             null, ?, ?, ?, ?)`, valueData1, valueData2, valueData3, valueData4);
      }
    });
  }
  static dataVoters() {
    fs.readFile('./voters.csv', 'utf8', (err, data) => {
      let dataVoters = data.trim().split('\n').map(x => x.split(',')).splice(1);
      for (let i = 0; i < dataVoters.length; i++) {

        let valueData1 = dataVoters[i][0];
        let valueData2 = dataVoters[i][1];
        let valueData3 = dataVoters[i][2];
        let valueData4 = dataVoters[i][3];
        db.run(`INSERT INTO Voters (voter_id, first_name, last_name, gender, age) VALUES (
              null, ?, ?, ?, ?)`, valueData1, valueData2, valueData3, valueData4);
      }
    });
  }
  static dataVotes() {
    fs.readFile('./votes.csv', 'utf8', (err, data) => {
      let dataVotes = data.trim().split('\n').map(x => x.split(',')).splice(1);
      for (let i = 0; i < dataVotes.length; i++) {

        let valueData1 = dataVotes[i][0];
        let valueData2 = dataVotes[i][1];
        db.run(`INSERT INTO Votes (vote_id, voter_id, candidate_id) VALUES (
              null, ?, ?)`, valueData1, valueData2);
      }
    });
  }
}

<<<<<<< HEAD
DataImport.dataCandidates();
DataImport.dataVoters();
DataImport.dataVotes();

=======
>>>>>>> 2a7363629c978ce5864071dce3ea8bcfb7d45ad0
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
<<<<<<< HEAD
=======

// DataImport.dataCandidates();
// DataImport.dataVoters();
// dataImport.dataVotes;
>>>>>>> 2a7363629c978ce5864071dce3ea8bcfb7d45ad0
