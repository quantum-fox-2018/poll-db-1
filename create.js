const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

class Create{
    constructor() {
        
    }

    static createPolitician(name, party, location, grade){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('INSERT INTO Politicians (name, party, location, grade_current) VALUES(?,?,?,?)')
            stmt1.run(name,party,location,grade)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Create Data Politician : "${name}" , has been success`)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static createVoter(first_name, last_name, gender, age){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt2 = db.prepare('INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?,?,?,?)')
            stmt2.run(first_name,last_name,gender,age)
            stmt2.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Create Voters Data : "${first_name} ${last_name} ", has been Success`)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static createVoting(voter_id, pol_id){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')
            let stmt3 = db.prepare('INSERT INTO Votes (voter_id, politician_id) VALUES (?,?)')
            stmt3.run(voter_id,pol_id)
            stmt3.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Create Voting Data has been Success`)
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


module.exports = Create
