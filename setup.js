//your code here
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const politicians = fs.readFileSync('politicians.csv', 'UTF-8')
const votes = fs.readFileSync('./votes.csv', 'UTF-8')
const voters = fs.readFileSync('voters.csv', 'UTF-8')

let db = new sqlite3.Database('poll-db-1.db');

function createPoliticiansTable() {

  db.run(`CREATE TABLE IF NOT EXISTS politicians(id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    party VARCHAR(50),
    location VARCHAR(50),
    grade_curent FLOAT)`);

}

function createVotesTable() {

  db.run(`CREATE TABLE IF NOT EXISTS votes(votesId INTEGER PRIMARY KEY AUTOINCREMENT,
    votersId INTEGER,
    politiciansId INTEGER)`);

}politicians

function createVotersTable() {

  db.run(`CREATE TABLE IF NOT EXISTS voters(id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    gender VARCHAR(20),
    age VARCHAR(10))`);

}

function insertPoliticiansToTable() {

  let splitted = politicians.trim().split('\n')

  for (var i = 1; i < splitted.length; i++) {

    let data = splitted[i].split(',')

    db.run(`INSERT INTO politicians(name, party, location, grade_curent) VALUES('${data[0]}','${data[1]}','${data[2]}','${data[3]}')`, function(err) {
     if (err) {
       return console.log(err.message);
     }

     console.log(`A row has been inserted with rowid ${this.lastID}`);

    });

  }

}

function insertVotersToTable() {

  let splitted = voters.trim().split('\n')

  for (var i = 1; i < splitted.length; i++) {

    let data = splitted[i].split(',')

    db.run(`INSERT INTO voters(first_name, last_name, gender, age) VALUES('${data[0]}','${data[1]}','${data[2]}','${data[3]}')`, function(err) {
     if (err) {
       return console.log(err.message);
     }

     console.log(`A row has been inserted with rowid ${this.lastID}`);

    });

  }

}

function insertVotesToTable() {

  let splitted = votes.trim().split('\n')

  for (var i = 1; i < splitted.length; i++) {

    let data = splitted[i].split(',')

    db.run(`INSERT INTO votes(votersId, politiciansId) VALUES('${data[0]}','${data[1]}')`, function(err) {
     if (err) {
       return console.log(err.message);
     }

     console.log(`A row has been inserted with rowid ${this.lastID}`);

    });

  }

}

function insertToPoliticians(obj) {

  db.run(`INSERT INTO politicians(name, party, location, grade_curent) VALUES('${obj.name}','${obj.party}','${obj.location}','${obj.grade_curent}')`, function(err) {
   if (err) {
     return console.log(err.message);
   }

   console.log(`Success add ${obj.name} to data !`);

  });

}

function insertToVoters(obj) {

  db.run(`INSERT INTO voters(first_name, last_name, gender, age) VALUES('${obj.first_name}','${obj.last_name}','${obj.gender}','${obj.age}')`, function(err) {
   if (err) {
     return console.log(err.message);
   }

   console.log(`Success add ${first_name} ${last_name} to data !`);

  });

}

function insertToVotes(obj) {
  db.run(`INSERT INTO votes(votersId, politiciansId) VALUES('${obj.votersId}','${obj.politiciansId}')`, function(err) {
   if (err) {
     return console.log(err.message);
   }

   console.log(`Success add votes to data !`);

  });
}

function insertToTable(tableName, obj) {

  switch (tableName) {
    case 'Politicians': {return insertToPoliticians(obj) ;break;}
    case 'Voters': {return insertToVoters(obj.first_name, obj.last_name, obj.gender, obj.age) ;break;}
    case 'Votes': {return insertToVotes(obj.voterId, obj.politicianId) ;break;}
    default : {return `Table is not defined !`}
  }

}

function updatePolitician(name, party,location,grade_current,idPolitician){

  db.run(`UPDATE politicians SET
          name = '${name}',
          party = '${party}',
          location = '${location}',
          grade_current = '${grade_current}',
          WHERE id = '${idPolitician}'`);

}

function updateVoters(first_name, last_name,gender,age,idVoters){

  db.run(`UPDATE voters SET
          first_name = '${first_name}',
          last_name = '${last_name}',
          gender = '${gender}',
          age = '${age}',
          WHERE id = '${idVoters}';`);

}

function deletePoliticians(id){

  db.run(`DELETE FROM politicians WHERE id = '${id}';`);

}

function deleteVoters(id){

    db.run(`DELETE FROM voters WHERE id = '${id}';`);

}

// deletePolitician(20)

// insert to table ==================================

insertToTable('Politicians', {
  name : 'Taufik',
  party : 'L',
  location : 'Jakarta',
  grade_curent : 10
})

// create table ====================================

// createPoliticiansTable()
// createVotersTable()
// createVotesTable()

// insert from csv to table ========================

insertPoliticiansToTable()
// insertVotersToTable()
// insertVotesToTable()



db.close()
