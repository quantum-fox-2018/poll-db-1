/*jshint esversion:6*/
let argv = process.argv;
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

let request = argv[2];
if(request === 'addVoters'){
  addVoters();
}

function deleteVoters(id){
  db.run(`DELETE FROM voters WHERE id = ${id} `);
}

function updateVoters(id,firstname,lastname,gender,age){
  db.run(`UPDATE voters SET firstname = '${firstname}',
          lastname = '${lastname}',
          gender = '${gender}',
          age = ${age}
          WHERE id =${id}`);
}

function addVoters(){
  let addVoterss = (`INSERT INTO voters
    (id,firstname,lastname,gender,age)
    VALUES (null,?,?,?,?)`);
    db.run(addVoterss,`${argv[3]}`,`${argv[4]}`,`${argv[5]}`,`${argv[6]}`);
}





function readData(){
  fs.readFile('./politicians.csv','utf8',(err,data) =>{
    let politicianArrData =[];
    data = data.split('\n');
    for(let i = 1 ; i < data.length-1 ; i++){
      politicianArrData.push(data[i].split(','));
    }


    for(let j = 1 ; j < politicianArrData.length ; j++){
      let dataPol = politicianArrData[j];
      let query = `INSERT INTO politicians
                    (id,name,party,location,grade_current)
                      VALUES (null,?,?,?,?)`;
                      db.run(query, `${dataPol[0]}`,`${dataPol[1]}`,`${dataPol[2]}`,`${dataPol[3]}`);
    }

  });
}

function readDataVoters(){
  fs.readFile('./voters.csv','utf8',(err,data) =>{
    let votersArrData =[];
    data = data.split('\n');
    for(let i = 1 ; i < data.length-1 ; i++){
      votersArrData.push(data[i].split(','));
    }


    for(let j = 1 ; j < votersArrData.length ; j++){
      let dataVot = votersArrData[j];
      let query = `INSERT INTO voters
                    (id,firstname,lastname,gender,age)
                      VALUES (null,?,?,?,?)`;
                      db.run(query, `${dataVot[0]}`,`${dataVot[1]}`,`${dataVot[2]}`,`${dataVot[3]}`);
    }

  });
}

function readDataVotes(){
  fs.readFile('./votes.csv','utf8',(err,data) =>{
    let votesArrData =[];
    data = data.split('\n');
    for(let i = 1 ; i < data.length-1 ; i++){
      votesArrData.push(data[i].split(','));
    }


    for(let j = 1 ; j < votesArrData.length ; j++){
      let dataVote = votesArrData[j];
      let query = `INSERT INTO votes
                    (id,politiciansID,votersID)
                      VALUES (null,?,?)`;
                      db.run(query, `${dataVote[0]}`,`${dataVote[1]}`);
    }

  });
}

// readData();
// readDataVoters();
// readDataVotes();

// updateVoters(150,'dul','johnny','bencong',32);
deleteVoters(150);
db.close();
