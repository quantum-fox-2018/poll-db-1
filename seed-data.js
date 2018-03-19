const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

const politiciansCSV = './politicians.csv';
const votersCSV = './voters.csv';
const votesCSV = './votes.csv';

function seed(csvPoliticians,csvVoters,csvVotes){
    let data1 = fs.readFileSync(csvPoliticians, 'utf8');
    let dataArray1 = data1.split('\n')

    let data2 = fs.readFileSync(csvVoters, 'utf8');
    let dataArray2 = data2.split('\n')
    
    let data3 = fs.readFileSync(csvVotes, 'utf8');
    let dataArray3 = data3.split('\n')

    db.serialize(function(){

        // seeder Politicians
        let queryInsert1 = db.prepare("INSERT INTO politicians VALUES (?,?,?,?,?)");
        for(let i=1; i<dataArray1.length; i++){
            let politiciansData = dataArray1[i].split(',');
            queryInsert1.run(null, politiciansData[0],politiciansData[1],politiciansData[2],politiciansData[3]);
        }            
        queryInsert1.finalize();

        // seeder Voters
        let queryInsert2 = db.prepare("INSERT INTO voters VALUES (?,?,?,?,?)");
        for (let i=1; i<dataArray2.length; i++) {
            let votersData = dataArray2[i].split(',')
            queryInsert2.run(null,votersData[0],votersData[1],votersData[2],votersData[3])
        }
        queryInsert2.finalize();

        // seeder Votes
        let queryInsert3 = db.prepare("INSERT INTO votes VALUES (?,?,?)");
        for (let i=1; i<dataArray3.length; i++) {
            let votesData = dataArray3[i].split(',')
            queryInsert3.run(null,votesData[0],votesData[1])
        }
        queryInsert3.finalize();
    })
    db.close();
}


seed(politiciansCSV, votersCSV, votesCSV)