const fs = require('fs');
const politiciansFile = './politicians.csv';
const votersFile = './voters.csv';
const votesFile = './votes.csv';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Files {
    static readFiles(path, callback) {
        fs.readFile(path, 'utf8', (err, data) => {
            let result = [];
            let files = data.split('\n');
            for (let i = 0; i < files.length; i++) {
                result.push(files[i].split(','));
            }
            callback(result);
        });
    }

    // Release 1
    static politicians() {
        Files.readFiles(politiciansFile, (data) => {
            db.serialize(() => {
                for (let i = 1; i < data.length; i++) {
                    let name = data[i][0];
                    let party = data[i][1];
                    let location = data[i][2];
                    let grade_current = data[i][3];
                    let politician = `INSERT INTO Politicians 
                                      VALUES (NULL, ?, ?, ?, ?);`;
                    db.run(politician, `${name}`, `${party}`, `${location}`, `${grade_current}`);
                }
            });
        });

        db.close();
    }

    static voters() {
        Files.readFiles(votersFile, (data) => {
            db.serialize(() => {
                for (let i = 1; i < data.length; i++) {
                    let first_name = data[i][0];
                    let last_name = data[i][1];
                    let gender = data[i][2];
                    let age = data[i][3];
                    let voter = `INSERT INTO Voters 
                                 VALUES (NULL, ?, ?, ?, ?);`;
                    db.run(voter, `${first_name}`, `${last_name}`, `${gender}`, `${age}`);
                }
            });
        });

        db.close();
    }

    static votes() {
        Files.readFiles(votesFile, (data) => {
            db.serialize(() => {
                for (let i = 1; i < data.length; i++) {
                    let voterId = data[i][0];
                    let politicianId = data[i][1];
                    let vote = `INSERT INTO Votes 
                                VALUES (NULL, ?, ?);`;
                    db.run(vote, `${voterId}`, `${politicianId}`);
                }
            });
        });

        db.close();
    }

    // Release 2
    static insert(tableName, param1, param2, param3, param4) {
        if (tableName === 'Politicians') {
            let insertData = `INSERT INTO ${tableName} 
                          VALUES (NULL, ?, ?, ?, ?);`;
            db.run(insertData, param1, param2, param3, param4);
        } else if (tableName === 'Voters') {
            let insertData = `INSERT INTO ${tableName} 
                          VALUES (NULL, ?, ?, ?, ?);`;
            db.run(insertData, param1, param2, param3, param4);
        } else if (tableName === 'Votes') {
            let insertData = `INSERT INTO ${tableName} 
                          VALUES (NULL, ?, ?);`;
            db.run(insertData, param1, param2);
        }
    }

    static update(tableName, setName, setValue, whereName, whereValue) {
        let updateData = `UPDATE ${tableName} 
                          SET ${setName} = "${setValue}" 
                          WHERE ${whereName} = ${whereValue};`;
        db.run(updateData);
    }

    static delete(tableName, whereName, whereValue) {
        let deleteData = `DELETE FROM ${tableName}
                          WHERE ${whereName} = ${whereValue};`;
        db.run(deleteData);
    }
}

// Files.politicians();
// Files.voters();
// Files.votes();

/*
- Release 3
1. SELECT name, party, grade_current 
   FROM Politicians 
   WHERE party = 'R' 
   AND grade_current > 9 
   AND grade_current < 11;

2. SELECT name, COUNT(*) AS totalVote 
   FROM Politicians 
   JOIN Votes 
   ON Politicians.id = Votes.politicianId 
   WHERE Politicians.name = 'Olympia Snowe';

3. SELECT name, (SELECT COUNT(politicianId) FROM Votes WHERE Politicians.id = Votes.politicianId) 
   AS totalVote 
   FROM Politicians 
   WHERE Politicians.name 
   LIKE 'adam %';

4. SELECT name, (SELECT COUNT(politicianId) FROM Votes WHERE Politicians.id = Votes.politicianId)
   AS totalVote
   FROM Politicians
   ORDER BY totalVote DESC 
   LIMIT 3;

5. SELECT first_name, last_name, gender, age 
   FROM Voters 
   LEFT JOIN Votes ON Voters.id = votes.voterId 
   LEFT JOIN Politicians 
   ON Politicians.id = Votes.politicianId 
   WHERE Politicians.name = 'Olympia Snowe';
*/