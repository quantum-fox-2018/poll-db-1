const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');


function politiciansPartyR(){
    db.serialize(function(){
        db.each(`SELECT * FROM politicians WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11;`, function(err, row) {

            console.log(row)
        });
    });
}

function olympiaVotesCount(){
    db.serialize(function(){
        db.each("SELECT COUNT(v.politicianId) AS totalVote, p.name FROM politicians AS p JOIN votes AS v ON p.id = v.politicianId WHERE p.name LIKE '%Olympia Snowe%' GROUP BY v.politicianId", function(err,row){
            console.log(row)
        })
    });
}

function politiciansAdams(){
    db.serialize(function(){
        db.each("SELECT p.name, COUNT(v.politicianId) AS totalVote FROM politicians AS p JOIN votes AS v ON p.id = v.politicianId WHERE p.name LIKE '%Adam%' GROUP BY v.politicianId", function(err,row){
            console.log(row)
        })
    });
}

function politicianTopTree(){
    db.serialize(function(){
        db.each("SELECT COUNT(v.politicianId) AS totalVote, p.name, p.party, p.location FROM politicians AS p JOIN votes AS v ON p.id = v.politicianId GROUP BY v.politicianId ORDER BY totalVote DESC LIMIT 3;", function(err,row){
            console.log(row)
        })
    })
}

function olympiaVoters(){
    db.serialize(function(){
        db.each("SELECT voters.first_name, voters.last_name,voters.gender,voters.age FROM votes JOIN politicians ON votes.politicianId = politicians.id JOIN voters ON votes.voterId = voters.id WHERE politicians.name LIKE 'Olympia Snowe'", function(err, row){
            console.log(row)
        })
    })
    db.close();
}



politiciansPartyR()
olympiaVotesCount()
politiciansAdams()
politicianTopTree()
olympiaVoters()
