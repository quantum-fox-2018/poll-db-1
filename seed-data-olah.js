/*jshint esversion:6*/

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('polling.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

class InsertData {
  static insertDataCandidates(valueData1, valueData2, valueData3, valueData4) {
    db.run(`INSERT INTO Candidates (candidate_id, candidate_name, party, location, grade_current) VALUES (
         null, ?, ?, ?, ?)`, valueData1, valueData2, valueData3, valueData4);
  }
  static insertDataVoters(valueData1, valueData2, valueData3, valueData4) {
    db.run(`INSERT INTO Voters (voter_id, first_name, last_name, gender, age) VALUES (
          null, ?, ?, ?, ?)`, valueData1, valueData2, valueData3, valueData4);
  }
  static insertDataVotes(valueData1, valueData2) {
    db.run(`INSERT INTO Votes (vote_id, voter_id, candidate_id) VALUES (
          null, ?, ?)`, valueData1, valueData2);
  }
}
// InsertData.insertDataCandidates('David Joshua', 'R', 'LA', 9.99999999);
// InsertData.insertDataVoters('David', 'Joshua', 'male', 30);
// InsertData.insertDataVotes(21, 151);

class UpdateData {
  static updateDataCandidates(valueData1, valueData2, valueData3, valueData4, candidate_id) {
    db.run(`UPDATE Candidates SET candidate_name = '${valueData1}',
                                  party = '${valueData2}',
                                  location = '${valueData3}',
                                  grade_current = ${valueData4}
                                  WHERE candidate_id = ${candidate_id};`);
  }
  static updateDataVoters(valueData1, valueData2, valueData3, valueData4, voter_id) {
    db.run(`UPDATE Voters SET first_name = '${valueData1}',
                                  last_name = '${valueData2}',
                                  gender = '${valueData3}',
                                  age = ${valueData4}
                                  WHERE voter_id = ${voter_id};`);
  }
  static updateDataVotes(valueData1, valueData2, vote_id) {
    db.run(`UPDATE Votes SET voter_id = ${valueData1},
                                  candidate_id = ${valueData2}
                                  WHERE vote_id = ${vote_id};`);

  }
}
// UpdateData.updateDataCandidates('David Joshua', 'R', 'LA', 9.99999999, 1);


class DeleteData {
  static deleteDataCandidate(candidate_id) {
    db.run(`DELETE FROM Candidates WHERE candidate_id = ${candidate_id};`);
  }
  static deleteDataVoters(voter_id) {
    db.run(`DELETE FROM Voters WHERE voter_id = ${voter_id};`);
  }
  static deleteVotes(vote_id) {
    db.run(`DELETE FROM Votes WHERE vote_id = ${vote_id};`);
  }
}
// DeleteData.deleteDataCandidate(21);

//=========================
// 1.
db.all(`SELECT candidate_name, party, grade_current FROM Candidates
        WHERE party = ? AND grade_current BETWEEN ? AND ?`, ['R', 9, 11], (err, dataRows) => {
  if (err) throw err;
  else {
    console.log(dataRows);
  }
});

//=========================
// 2.
db.all(`SELECT COUNT(*) AS totalVotes, candidate_name AS name FROM Votes
        LEFT JOIN Candidates ON Candidates.candidate_id = Votes.candidate_id
        WHERE candidate_name = 'Olympia Snowe'`,(err, dataRows) => {
  if (err) throw err;
  else {
    console.log(dataRows);
  }
});

//=========================
// 3.
db.all(`SELECT candidate_name AS name, COUNT(*) AS totalVotes FROM Votes
        LEFT JOIN Candidates ON Candidates.candidate_id = Votes.candidate_id
        WHERE candidate_name LIKE 'Adam%' GROUP BY 1`, (err, dataRows) => {
  if (err) throw err;
  else {
    console.log(dataRows);
  }
});

//=========================
// 4.
db.all(`SELECT COUNT(*) AS totalVotes, candidate_name AS name, party, location FROM Votes
        LEFT JOIN Candidates ON Candidates.candidate_id = Votes.candidate_id
        GROUP BY name
        ORDER BY totalVotes DESC
        LIMIT 3`, (err, dataRows) => {
  if (err) throw err;
  else {
    console.log(dataRows);
  }
});

//=========================
// 5.
db.all(`SELECT first_name,last_name,gender,age,candidate_id FROM Voters
        JOIN Votes ON Voters.voter_id = Votes.voter_id
        WHERE candidate_id = (SELECT Votes.candidate_id
        FROM Candidates JOIN Votes ON Candidates.candidate_id = Votes.candidate_id WHERE
        candidate_name = 'Olympia Snowe');`, (err, dataRows) => {
  if (err) throw err;
  else {
    console.log(dataRows);
  }
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
