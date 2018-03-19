const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

class Delete{
    constructor() {
        
    }

    static deletePoltician(pol_id){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('DELETE FROM Politicians WHERE politician_id = ?')
            stmt1.run(pol_id)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Data Politician ID : "${pol_id}" , has been deleted`)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static deleteVoter(voter_id){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('DELETE FROM Voters WHERE voter_id = ?')
            stmt1.run(voter_id)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Data Voter ID : "${voter_id}" , has been deleted`)
            })
        })

        db.close((err) => {
            if(err){
              console.log(err)
            }
            console.log('Close database poll.db connection')
        })
    }

    static deleteVoting(voting_id){
        db.serialize((err) => {
            if(err){
                console.log(err)
            }
            console.log('Successfully connected to poll.db')

            let stmt1 = db.prepare('DELETE FROM Votes WHERE voting_id = ?')
            stmt1.run(voting_id)
            stmt1.finalize((err) => {
                if(err){
                    console.log(err)
                }
                console.log(`Data Voting ID : "${voting_id}" , has been deleted`)
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

module.exports =  Delete