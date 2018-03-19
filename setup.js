//your code here
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./dataPoll.db');
const fs = require('fs');

function readFilePolitician(callback){
    fs.readFile('./politicians.csv', 'utf8', function(err, dataPoliticians){
        if(err){
            console.log(err);
        }else{
            callback(dataPoliticians.split('\r\n'));
        }
    })
}

function readFileVoters(callback){
    fs.readFile('./voters.csv', 'utf8', function(err, dataVoters){
        if(err){
            console.log(err);
        }else{
            callback(dataVoters.split('\r\n'));
        }
    })
}

function readFileVotes(callback){
    fs.readFile('./votes.csv', 'utf8', function(err, dataVotes){
        if(err){
            console.log(err);
        }else{
            callback(dataVotes.split('\r\n'));
        }
    })
}

function createDatabase(){
    querryCreatePoliticians = `CREATE TABLE IF NOT EXISTS Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), party VARCHAR(50), location VARCHAR(100), grade_current FLOAT)`;
    querryCreateVoters = `CREATE TABLE IF NOT EXISTS Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(20), last_name VARCHAR(20), gender VARCHAR(7), age INTEGER)`;

    db.run(querryCreateVoters);
    db.run(querryCreateVotes);
}

function createVotes(){
    querryCreateVotes = `CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER)`
    db.run(querryCreateVotes);
}

function showPolitician(){
    db.all(`SELECT * FROM Politicians`, function(err, row){
        if(err){
            console.log(err);
        }else{
            console.log(row);
        }
    });
}

function showVotes(){
    db.all(`SELECT COUNT(*) FROM Votes WHERE politicianId = 5`, function(err, row){
        if(err){
            console.log(err);
        }else{
            console.log(row);
        }
    });
}

function showVoters(){
    db.all(`SELECT * FROM Voters`, function(err, row){
        if(err){
            console.log(err);
        }else{
            console.log(row);
        }
    });
    
}

function insertDataPolitician(callback){
    readFilePolitician(function(dataPoliticians){
        newDataPoliticians = dataPoliticians.slice(1, dataPoliticians.length);
        for(let indexRow = 0; indexRow<newDataPoliticians.length; indexRow++){
            let arrRow = [];
            arrRow = newDataPoliticians[indexRow].split(',');
            db.run('INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)', arrRow[0], arrRow[1], arrRow[2], arrRow[3])
        }
    })
}

function insertDataVoters(callback){
    readFileVoters(function(dataVoters){
        newDataVoters = dataVoters.slice(1, dataVoters.length);
        for(let indexRow = 0; indexRow<newDataVoters.length; indexRow++){
            let arrRow = [];
            arrRow = newDataVoters[indexRow].split(',');
            db.run('INSERT INTO Voters VALUES (NULL, ?, ?, ?, ?)', arrRow[0], arrRow[1], arrRow[2], arrRow[3])
        }
    })
}

function insertDataVotes(callback){
    readFileVotes(function(dataVotes){
        newDataVotes = dataVotes.slice(1, dataVotes.length);
        for(let indexRow = 0; indexRow<newDataVotes.length; indexRow++){
            let arrRow = [];
            arrRow = newDataVotes[indexRow].split(',');
            db.run('INSERT INTO Votes VALUES (NULL, ?, ?)', arrRow[0], arrRow[1])
        }
    })
}

function dropPoliticians(){
    db.run('DROP TABLE Politicians')
}

function insertPoliticianToDatabase(name, party, location, grade_current){
    db.run('INSERT INTO Politicians VALUES (NULL, ?, ?, ?, ?)', name, party, location, grade_current);
    console.log('Politician table has been inserted');
}

function insertVoterToDatabase(first_name, last_name, gender, age){
    db.run('INSERT INTO Voters VALUES (NULL, ?, ?, ?, ?)', first_name, last_name, gender, age)
}

function insertVotesToDatabase(voterId, politicianId){
    db.run('INSERT INTO Votes VALUES (NULL, ?, ?)', voterId, politicianId);
}

function deletePoliticians(id){
    db.run(`DELETE FROM Politicians WHERE id = ?`, id);
    console.log(`Data with id = ${id} has been deleted from the database`);
}

function deleteVoters(id){
    db.run(`DELETE FROM Voters WHERE id = ?`, id);
}

function deleteVoterTable(){
    db.run(`DELETE FROM Voters`);
    console.log('Table voters have been deleted!');
}

function updatePoliticians(name, party, location, grade_current,id){
    db.run(`UPDATE Politicians SET name = ?, party = ?, location = ?, grade_current = ? WHERE id = ?`, name, party, location, grade_current, id);
    console.log('Table has been updated!');
}

function dropTableVotes(){
    db.run(`DROP TABLE Votes`);
    console.log('Votes table has been dropped!');
}

//RELEASE 3
function number1(){
    db.all(`SELECT name, party, grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}

function number2(){
    db.all(`SELECT COUNT(*) AS totalVote, Politicians.name 
            FROM Politicians JOIN Votes on Politicians.id = Votes.politicianId
            WHERE Politicians.name = 'Olympia Snowe'`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
}

function number3(){
    db.all(`SELECT (Politicians.name), COUNT(Votes.politicianId) AS totalVote 
            FROM Politicians LEFT JOIN Votes on Politicians.id = Votes.politicianId
            WHERE Politicians.name LIKE "Adam %" AND Politicians.id = Votes.politicianId
            GROUP BY Politicians.id`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
}

function number4(){
    db.all(`SELECT COUNT(Votes.politicianId) AS totalVote, Politicians.name, Politicians.party, Politicians.location
            FROM Politicians LEFT JOIN Votes on Politicians.id = Votes.politicianId
            GROUP BY Politicians.id
            ORDER BY totalVote Desc
            LIMIT 3`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
}

function number5(){
    db.all(`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
            FROM Voters
                JOIN Votes
                    ON Votes.voterId = Voters.id
                JOIN Politicians
                    ON Votes.politicianId = Politicians.id
            WHERE Politicians.name = "Olympia Snowe"`, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            })
}

//Driver code
//================

// createDatabase();
// insertDataVoters();
// insertDataVotes();
// showVoters();
// showVotes(); 
// deleteVoterTable();
// dropPoliticians();
// insertPoliticianToDatabase('Tono', 'Gerindra', 'Jakarta', '8');
// showPolitician();
// updatePoliticians('Bob', 'G', 'NY', '6', 21);
// deletePoliticians(21);
// dropTableVotes();
// createVotes();
// number1();
// number2();
// number3();
// number5();


db.close();