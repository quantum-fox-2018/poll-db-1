const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const query = require('./setup.js');

const politicians_file = './politicians.csv';
const voters_file = './voters.csv';
const votes_file = './votes.csv';

const argv = process.argv;
const command = process.argv[2];


function getFileData(file_path, callback){
  fs.readFile(file_path, 'utf8', (err, data)=>{
    if(err){
      console.log(err);
    } else {
      data = data.split('\n');
      data.pop();
      data.shift();
      callback(data);
    }
  });
}

function insertAllFileData(){
  getFileData(politicians_file, (data)=>{
    query.insertIntoDatabase(data,'politicians',db);
    getFileData(voters_file, (data)=>{
      query.insertIntoDatabase(data,'voters',db);
      getFileData(votes_file, (data)=>{
        query.insertIntoDatabase(data,'votes',db);
        db.close();
      });
    });
  });
}

// COMMAND
// node seed-data.js createDB
// node seed-data.js newData table_name value1 value2 ...........
// node seed-data.js updateData table_name id colName value
// node seed-data.js deleteData table_name id
// node seed-data.js realese3 nomorSoal

switch(command){
  case 'createDB':
    query.createDatabase(db);
    insertAllFileData();
    break;

  case 'newData':
    switch(argv[3]){
      case 'politicians':
        query.insertNewData(argv, 'politicians', db);
        break;
      case 'voters':
        query.insertNewData(argv, 'voters', db);
        break;
      case 'votes':
        query.insertNewData(argv, 'votes', db);
        break;
    }
    break;

  case 'updateData':
    switch(argv[3]){
      case 'politicians':
        query.updateData(argv, 'politicians', db);
        break;
      case 'voters':
        query.updateData(argv, 'voters', db);
        break;
      case 'votes':
        query.updateData(argv, 'votes', db);
        break;
    }
    break;

  case 'deleteData':
    switch(argv[3]){
      case 'politicians':
        query.deleteData(argv, 'politicians', db);
        break;
      case 'voters':
        query.deleteData(argv, 'voters', db);
        break;
      case 'votes':
        query.deleteData(argv, 'votes', db);
        break;
    }
    break;

    case 'realese3':
      switch(parseInt(argv[3])){
        case 1:
          query.politicianR(db);
          break;
        case 2:
          query.jmlVoteOlympia(db);
          break;
        case 3:
          query.jmlVoteAdam(db);
          break;
        case 4:
          query.politicianMostVotes(db);
          break;
        case 5:
          query.votingOlympia(db);
          break;
      }
      break;
}
