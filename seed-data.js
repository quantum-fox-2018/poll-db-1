const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db');
let file_politicians = './politicians.csv';
let file_voters = './voters.csv';
let file_votes = './votes.csv';

class Politicians {
  static readDataDB(file_politicians, callback) {
    fs.readFile(file_politicians, 'utf8', (err, rawData) => {
      rawData = rawData.split('\n');
      let arrData = [];
      for (let i = 1; i < rawData.length-1; i++) {
        arrData.push(rawData[i].split(','));
      }
      callback(arrData);
    });
  }

  static writeFileDB(file_politicians) {
    Politicians.readDataDB(file_politicians, dataPoliticians => {
      db.serialize(function() {
        for (let i in dataPoliticians) {
          let politician = dataPoliticians[i]
          db.run(`INSERT INTO Politicians
                  VALUES (NULL, ?, ?, ?, ?);`,
                  [politician[0], politician[1], politician[2], politician[3]]
                );
        }
      })
    })
  }

  static insertDataDB(name, party, location, grade_current) {
    db.run(`INSERT INTO Politicians
            VALUES (NULL, ?, ?, ?, ?);`,
            [name, party, location, grade_current]
          );
    console.log('Success!');
  }

  static updateDataDB(id, name, party, location, grade_current) {
    db.run(`UPDATE Politicians
            SET name = ?, party = ?, location = ?, grade_current = ?
            WHERE id = ?;`,
            [name, party, location, grade_current, id]
          );
  }

  static deleteDataDB(id) {
    db.run(`DELETE FROM Politicians
            WHERE id = ?`,
            [id]
          );
  }
}

class Voters {
  static readDataDB(file_voters, callback) {
    fs.readFile(file_voters, 'utf8', (err, rawData) => {
      rawData = rawData.split('\n');
      let arrData = [];
      for (let i = 1; i < rawData.length-1; i++) {
        arrData.push(rawData[i].split(','));
      }
      callback(arrData);
    });
  }

  static writeFileDB(file_voters) {
    Voters.readDataDB(file_voters, dataVoters => {
      db.serialize(function() {
        for (let i in dataVoters) {
          let voter = dataVoters[i]
          db.run(`INSERT INTO Voters
                  VALUES (NULL, ?, ?, ?, ?);`,
                  [voter[0], voter[1], voter[2], voter[3]]
                );
        }
      })
    })
  }

  static insertDataDB(first_name, last_name, gender, age) {
    db.run(`INSERT INTO Voters
            VALUES (NULL, ?, ?, ?, ?);`,
            [first_name, last_name, gender, age]
          );
    console.log('Success!');
  }

  static updateDataDB(id, first_name, last_name, gender, age) {
    db.run(`UPDATE Voters
            SET first_name = ?, last_name = ?, gender = ?, age = ?
            WHERE id = ?;`,
            [first_name, last_name, gender, age, id]
          );
  }

  static deleteDataDB(id) {
    db.run(`DELETE FROM Voters
            WHERE id = ?`,
            [id]
          );
  }
}

class Votes {
  static readDataDB(file_votes, callback) {
    fs.readFile(file_votes, 'utf8', (err, rawData) => {
      rawData = rawData.split('\n');
      let arrData = [];
      for (let i = 1; i < rawData.length-1; i++) {
        arrData.push(rawData[i].split(','));
      }
      callback(arrData);
    });
  }

  static writeFileDB(file_votes) {
    Voters.readDataDB(file_votes, dataVotes => {
      db.serialize(function() {
        for (let i in dataVotes) {
          let vote = dataVotes[i]
          db.run(`INSERT INTO Votes
                  VALUES (NULL, ?, ?);`,
                  [vote[0], vote[1]]
                );
        }
      })
    })
  }

  static insertDataDB(voterId, politicianId) {
    db.run(`INSERT INTO Votes
            VALUES (NULL, ?, ?);`,
            [voterId, politicianId]
          );
    console.log('Success!');
  }

  static updateDataDB(id, voterId, politicianId) {
    db.run(`UPDATE Votes
            SET voterId = ?, politicianId
            WHERE id = ?;`,
            [voterId, politicianId, id]
          );
  }

  static deleteDataDB(id) {
    db.run(`DELETE FROM Votes
            WHERE id = ?`,
            [id]
          );
  }
}

//CSV TO DB
// Politicians.writeFileDB(file_politicians);
// Voters.writeFileDB(file_voters);
// Votes.writeFileDB(file_votes);

//INSERT, UPDATE, DELETE
// Politicians.insertDataDB('Artour Babaev', 'D', 'CND', 322.322);
// Politicians.updateDataDB(21, 'Clinton Loomis', 'EG', 'NA', 322.420);
// Politicians.deleteDataDB(21);
// Voters.insertDataDB('Fandy', 'Barestu', 'male', 23);
// Voters.updateDataDB(151, 'Fandy', 'Babaevson', 'male', 23);
