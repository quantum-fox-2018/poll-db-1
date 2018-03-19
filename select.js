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

}

module.exports = Select