const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

class Select{
    constructor() {
        
    }

    static allPolitician(callback){
        
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            
            console.log('Successfully connected to poll.db')
            
            db.all('SELECT * FROM Politicians', (err, data) => {
                
                if(err){
                    console.log(err)
                }
                // console.log(data)
                callback(data)

            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static allVoter(callback){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')
            console.log('This is Voters Data List : ')
            db.all('SELECT * FROM Voters', (err, data) => {
                if(err){
                    console.log(err)
                }
                // console.log(data)
                callback(data)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static allVoting(){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')
            console.log('This is Votes Data List : ')
            db.all('SELECT * FROM Votes', (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log(data)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static release3(){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')
            db.all("SELECT name, party, grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11",
            (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log('==============================================')
                console.log(data)
            })
            
            db.all("SELECT COUNT(*) AS TotalVote, Politicians.name FROM Votes JOIN Politicians ON Politicians.politician_id = Votes.politician_id WHERE Politicians.name = 'Olympia Snowe'", (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log('==============================================')
                console.log(data)
            })

            db.all("SELECT Politicians.name, COUNT(*) AS TotalVote FROM Votes JOIN Politicians ON Politicians.politician_id = Votes.politician_id WHERE Politicians.name LIKE '%Adam%' GROUP BY Politicians.name", (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log('==============================================')
                console.log(data)
            })

            db.all("SELECT COUNT(*) AS TotalVote, Politicians.name, Politicians.party, Politicians.location FROM Votes JOIN Politicians ON Politicians.politician_id = Votes.politician_id GROUP BY Politicians.name ORDER BY TotalVote DESC LIMIT 3", (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log('==============================================')
                console.log(data)
            })

            db.all("SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Votes JOIN Politicians ON Politicians.politician_id = Votes.politician_id JOIN Voters ON Voters.voter_id = Votes.voter_id WHERE Politicians.name = 'Olympia Snowe'", (err, data) => {
                if(err){
                    console.log(err)
                }
                console.log('==============================================')
                console.log(data)
            })
            
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

}

module.exports = Select