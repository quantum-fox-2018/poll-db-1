const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

class Update {
    constructor() {
        
    }

    static updatePolitician(id, name){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('UPDATE Politicians SET name = ? WHERE politician_id = ?')
            stmt1.run(name, id)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Update Data Politician : "${name}" , has been success`)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static updateVoter(id, first_name, last_name){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('UPDATE Voters SET first_name = ?, last_name = ? WHERE voter_id = ?')
            stmt1.run(first_name, last_name, id)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Update Data Voter : "${first_name} ${last_name}" , has been success`)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static updateVoting(id, voter_id, pol_id){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('UPDATE Votes SET voter_id = ?, politician_id = ? WHERE voting_id = ?')
            stmt1.run(voter_id, pol_id, id)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Update Data Votes ID : "${pol_id}" , has been success`)
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

module.exports = Update