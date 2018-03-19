const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');
const {Politician, PoliticianParser} = require('./politician.js');
const {Voters, VotersParser} = require('./voters.js');
const {Votes, VotesParser} = require('./votes.js');

//Data politicians
PoliticianParser.generatePoliticians('./politicians.csv', addDataPolitician);

function addDataPolitician(dataPoliticians) {
  db.serialize(function() {
    let stmt = db.prepare("INSERT INTO Politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?)");
    for (var i = 0; i < dataPoliticians.length; i++) {
      stmt.run(dataPoliticians[i].name, dataPoliticians[i].party, dataPoliticians[i].location, dataPoliticians[i].grade_current);
    }
    stmt.finalize();
  });
}

//data voters
VotersParser.generateVoters('./voters.csv', addDataVoters);

function addDataVoters(dataVoters) {
  db.serialize(function() {
    let stmt = db.prepare("INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)");
    for (var i = 0; i < dataVoters.length; i++) {
      stmt.run(dataVoters[i].first_name, dataVoters[i].last_name, dataVoters[i].gender, dataVoters[i].age);
    }
    stmt.finalize();
  });
}

//data votes
VotesParser.generateVotes('./votes.csv', addDataVotes);

function addDataVotes(dataVotes) {
  db.serialize(function() {
    let stmt = db.prepare("INSERT INTO Votes (politiciansId, votersId) VALUES (?, ?)");
    for (var i = 0; i < dataVotes.length; i++) {
      stmt.run(dataVotes[i].politicians_id, dataVotes[i].voters_id);
    }
    stmt.finalize();
  });
  db.close();
}
