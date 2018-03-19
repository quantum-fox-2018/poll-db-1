//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./congress.db');

db.serialize (function(){


    // db.run("CREATE TABLE politicians (id_politician INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), party VARCHAR(20), location VARCHAR(20), grade_current INTEGER)")
    // db.run(`CREATE TABLE voters (id_voter INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(20), lastName VARCHAR(20), gender VARCHAR(20), age INTEGER)`)
    // db.run(`CREATE TABLE votes (id_politician INTEGER, id_voter INTEGER)`)

    // 1.==================================================================================
    // db.each(`SELECT name, party, grade_current FROM politicians 
    //          WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, function (err,row) {
    //     console.log(row);
        
    // })

    // 2.==================================================================================
    // db.each(`SELECT COUNT(*) AS totalVote, politicians.name 
    //          FROM votes JOIN politicians WHERE politicians.name = 'Olympia Snowe'
    //          AND votes.id_voter = politicians.id_politician`, function(err,row){

    //     console.log(row);
        
    // })

    // 3===================================================================================
    // db.each(`SELECT politicians.name, COUNT(*) AS totalVote FROM politicians 
    //          JOIN votes ON politicians.id_politician = votes.id_voter
    //          WHERE politicians.name LIKE 'Adam%'
    //          GROUP BY politicians.id_politician`,function(err, row){

    //     console.log(row);
        
    // })

    // 4===================================================================================
        // db.each(`SELECT COUNT(*) AS totalVote, politicians.name, politicians.party, politicians.location
        //         FROM votes JOIN politicians ON politicians.id_politician = id_voter
        //         GROUP BY politicians.id_politician ORDER BY totalVote DESC LIMIT 3`, function(err, row){

        //     console.log(row);
            
        // })
    
    // 5===================================================================================
        // db.each(`SELECT voters.firstName, voters.lastName, voters.gender, voters.age 
        //         FROM voters JOIN votes ON votes.id_politician = voters.id_voter
        //         JOIN politicians ON politicians.id_politician = votes.id_voter
        //         WHERE politicians.name = 'Olympia Snowe'`,function(err, row){

        //     console.log(row);
            
        // }) 
})

db.close();